#!/usr/bin/env bash
# ВАЖНО: этот файл выполняется на сервере, а не локально.
# В CI его копируют на сервер: scp deploy/deploy.sh deploy@server:/var/www/devivan/deploy.sh
#
# Деплой собранного бандла. Сборка выполняется в GitHub Actions, здесь мы
# только раскладываем готовые файлы и перезапускаем процесс.
#
# Ожидаемая структура бандла (её собирает .github/workflows/ci.yml):
#   BUNDLE/.output                    собранное приложение
#   BUNDLE/deploy/ecosystem.config.cjs конфигурация PM2
#
# Порядок действий важен: сначала новый артефакт кладём рядом со старым и
# переключаемся одним переименованием. Копирование поверх работающего каталога
# оставило бы приложение с наполовину новыми файлами, если сбой пришёлся бы
# посередине.

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/devivan}"
BUNDLE="${BUNDLE:?BUNDLE не задан: путь к распакованному бандлу}"
BRANCH="${BRANCH:-main}"
ARTIFACT="$BUNDLE/.output"
PORT="${PORT:-3001}"

cd "$APP_DIR"

log() { echo "[deploy $(date -u +%H:%M:%S)] $*"; }
die() { echo "[deploy $(date -u +%H:%M:%S)] ОШИБКА: $*" >&2; exit 1; }

[ -d "$ARTIFACT" ] || die "в бандле нет .output: $ARTIFACT"
[ -f "$ARTIFACT/server/index.mjs" ] || die "в .output нет server/index.mjs"

rollback() {
  if [ -d .output.prev ]; then
    log "откатываю артефакт на предыдущую версию"
    rm -rf .output
    mv .output.prev .output
    pm2 restart devivan --update-env || true
  else
    log "откатываться не на что: .output.prev отсутствует"
  fi
}

# 1. Конфигурация PM2 обновляется до переключения кода: если в ней опечатка,
#    pm2 упадёт уже на этом шаге, и мы успеем откатиться, не трогая .output.
if [ -f "$BUNDLE/deploy/ecosystem.config.cjs" ]; then
  mkdir -p deploy
  cp -a "$BUNDLE/deploy/ecosystem.config.cjs" deploy/ecosystem.config.cjs
  log "обновлён deploy/ecosystem.config.cjs"
fi

# 2. Копируем артефакт в .output.new. Сам .output пока не трогаем: работающее
#    приложение продолжает читать старые файлы.
log "распаковываю артефакт в .output.new"
rm -rf .output.new
cp -a "$ARTIFACT" .output.new

# 3. Переключение одним переименованием. Предыдущую версию сохраняем: она
#    нужна для отката.
log "переключаюсь на новую версию"
[ -d .output ] && mv .output .output.prev
mv .output.new .output

# 4. Права. nginx работает от www-data и не входит в группу deploy, поэтому
#    ему нужен доступ на чтение статики и хотя бы o+x на сам каталог:
#    без o+x www-data не пройдёт внутрь /var/www/devivan и получит 404 на
#    файлы, которые на диске есть. Каталог открываем только на проход (751),
#    чтобы www-data не мог его перечислить, а .env остаётся 600.
chmod 751 "$APP_DIR"
chmod -R a+rX,go-w .output

# 4. Перезапуск.
#    Секреты берём из .env: PM2 сам его не читает.
log "перезапускаю приложение"
set -a
# shellcheck disable=SC1091
[ -f .env ] && . ./.env
set +a

pm2 startOrReload deploy/ecosystem.config.cjs --env production --update-env
pm2 save

# 5. Проверка живости.
#    Если сайт не ответил, откатываемся на прошлую версию: лучше отвечать
#    старой версией, чем не отвечать вовсе.
log "проверяю http://127.0.0.1:$PORT/"
HEALTHY=0
for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS --max-time 5 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    HEALTHY=1
    break
  fi
  sleep 2
done

if [ "$HEALTHY" -ne 1 ]; then
  log "ПРИЛОЖЕНИЕ НЕ ОТВЕЧАЕТ. Откат на предыдущую версию."
  rollback
  sleep 5
  if curl -fsS --max-time 5 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    die "откат удался, сайт работает на прошлой версии - разберись с новой"
  fi
  die "откат не помог, смотри: pm2 logs devivan"
fi

log "деплой завершён успешно (ветка $BRANCH)"
