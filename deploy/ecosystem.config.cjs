// Конфигурация PM2 для production-сервера.
//
// Сборку (.output) делает GitHub Actions, здесь Node только запускает готовый
// артефакт. node_modules на сервере не нужны: внутри .output/server лежат
// рантайм-зависимости, собранные Nitro.
//
// Запуск:  pm2 startOrReload deploy/ecosystem.config.cjs --env production
// Логи:    pm2 logs devivan

// Секреты (токен Telegram-бота, chat id) PM2 сам не читает: переменные
// подставляет deploy/deploy.sh, который источник .env и передаёт их в
// окружение перед стартом. Держи .env в режиме 600 и не добавляй в git.
const env = {
  NODE_ENV: 'production',
  // Слушаем только localhost: наружу отдаёт nginx. Прямой доступ к порту
  // обошёл бы TLS и лимиты nginx на /api/.
  HOST: '127.0.0.1',
  PORT: '3001',
  NITRO_PORT: '3001',
}

module.exports = {
  apps: [
    {
      name: 'devivan',
      script: '.output/server/index.mjs',
      cwd: '/var/www/devivan',
      instances: 1,
      exec_mode: 'fork',

      // Приложение в простое занимает ~40 МБ. Лимит 300 МБ: перезапуск
      // процесса при превышении лучше, чем OOM-killer всей системы.
      max_memory_restart: '300M',

      autorestart: true,
      max_restarts: 5,
      restart_delay: 3000,
      min_uptime: '20s',

      listen_timeout: 8000,
      kill_timeout: 5000,

      error_file: '/var/log/devivan/error.log',
      out_file: '/var/log/devivan/out.log',
      merge_logs: true,
      time: true,

      env,

      // `pm2 startOrReload ... --env production` ищет секцию env_production.
      // Без неё pm2 печатает предупреждение "Environment [production] is
      // not defined" и всё равно берёт env.
      env_production: { ...env },
    },
  ],
}
