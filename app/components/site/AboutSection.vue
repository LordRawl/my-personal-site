<script setup lang="ts">
const { refresh } = useScrollRefresh()

const cards = [
  {
    title: 'Продуктовый подход',
    text: 'Вхожу в задачу как в продукт: цель и результат раньше первой строки кода. Пример: запуск маркетплейса в Skycoach с SSR ради SEO.',
  },
  {
    title: 'Самостоятельный frontend',
    text: 'Закрываю задачу целиком: вёрстка, состояние, работа с API, JWT-авторизация, админ-панель. Не жду, пока всё разжуют.',
  },
  {
    title: 'Производительность',
    text: 'SSR, lazy loading, виртуализация, контроль бандла. Панель сетевого оборудования выводит 10 000+ элементов одновременно.',
  },
  {
    title: 'Качество кода',
    text: 'Code review, рефакторинг, миграция. В Cognitech — ключевой ревьюер и миграция проекта на FSD.',
  },
]

const open = ref<boolean[]>(cards.map(() => false))

const toggle = (i: number) => {
  open.value[i] = !open.value[i]
  // Карточка меняет высоту и сдвигает всё ниже — ScrollTrigger держит старые позиции.
  window.setTimeout(() => refresh(), 500)
}
</script>

<template>
  <section id="about" class="about" aria-labelledby="ab">
    <div class="about__curtain" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#E73228" d="M0 0H20.3V88Q10 100 0 88Z" />
        <path fill="#7a1710" d="M20 0H40.3V94Q30 104 20 94Z" />
        <path fill="#E73228" d="M40 0H60.3V86Q50 98 40 86Z" />
        <path fill="#7a1710" d="M60 0H80.3V96Q70 106 60 96Z" />
        <path fill="#E73228" d="M80 0H100V90Q90 102 80 90Z" />
      </svg>
    </div>

    <p class="mono">(01) Обо мне</p>
    <h2 id="ab" class="about__heading">От интерфейса до архитектуры: закрываю frontend-задачи целиком</h2>

    <div class="about__cv">
      <a
        class="btn btn--big"
        href="https://cdn.poehali.dev/projects/9373486b-8e69-4402-921f-18c7875ec1f7/bucket/e83e94cf-dad1-4c79-ba4b-ad83582fe97b.pdf"
      >
        Скачать резюме PDF ↓
      </a>
    </div>

    <ul class="about__stats">
      <li class="about__stat">
        <b class="about__value"><span data-count="9">9</span>+</b>
        <span class="mono">лет в разработке</span>
      </li>
      <li class="about__stat">
        <b class="about__value"><span data-count="80">80</span>+</b>
        <span class="mono">проектов в проде</span>
      </li>
      <li class="about__stat">
        <b class="about__value"><span data-count="3">3</span>+</b>
        <span class="mono">года средний срок в команде</span>
      </li>
      <li class="about__stat">
        <b class="about__value about__value--stack">Vue / Nuxt</b>
        <span class="mono">основной стек</span>
      </li>
    </ul>

    <div class="about__cards">
      <article
        v-for="(c, i) in cards"
        :key="c.title"
        class="about__card"
        :class="{ 'about__card--open': open[i] }"
      >
        <button
          type="button"
          class="about__toggle"
          :aria-expanded="open[i]"
          :aria-controls="`abody-${i}`"
          @click="toggle(i)"
        >
          {{ c.title }}
          <i class="about__icon" aria-hidden="true" />
        </button>
        <div :id="`abody-${i}`" class="about__body"><div><p>{{ c.text }}</p></div></div>
      </article>
    </div>
  </section>
</template>

<style>
.about {
  position: relative;
  background: var(--bg);
  padding: 22vh var(--pad) 44vh;
  overflow: hidden;
  isolation: isolate;
}
.about__curtain {
  position: absolute;
  inset: 0 0 auto;
  height: 100vh;
  z-index: 20;
  pointer-events: none;
}
.about__curtain svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
.about__heading {
  margin: 1rem 0 2.2rem 6vw;
  max-width: 17ch;
  font: 700 clamp(1.8rem, 4.6vw, 4.2rem) / 1.08 var(--fd);
}
.about__cv {
  margin: 0 0 5rem 6vw;
}
.about__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 0 0 5rem;
  padding: 2rem 0 0;
  list-style: none;
  border-top: 1px solid rgba(243, 233, 223, 0.2);
}
.about__stat {
  min-width: 0;
}
.about__value {
  display: block;
  white-space: nowrap;
  font: 900 clamp(2rem, 4.4vw, 4rem) / 1 var(--fd);
  color: var(--acc);
  font-variant-numeric: tabular-nums;
}
.about__value--stack {
  font-size: clamp(1.3rem, 2.6vw, 2.4rem);
  padding-top: 0.6em;
}
.about__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  align-items: start;
}
.about__card {
  background: var(--bg2);
  border: 1px solid rgba(243, 233, 223, 0.2);
  border-radius: 1.2rem;
  overflow: hidden;
  transition:
    border-color 0.3s,
    background 0.3s;
}
.about__card:nth-child(even) {
  margin-top: 3rem;
}
.about__card:hover {
  border-color: var(--acc);
}
.about__toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: 0;
  text-align: left;
  font: 700 1.1rem var(--fd);
}
.about__icon {
  flex: none;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 1.5px solid var(--acc);
  position: relative;
  transition:
    transform 0.4s var(--ease),
    background 0.3s;
}
.about__icon::before,
.about__icon::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.9rem;
  height: 2px;
  background: var(--acc);
  transform: translate(-50%, -50%);
}
.about__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
.about__card--open {
  background: var(--acc);
  color: var(--dk);
}
.about__card--open .about__icon {
  transform: rotate(45deg);
  border-color: var(--dk);
}
.about__card--open .about__icon::before,
.about__card--open .about__icon::after {
  background: var(--dk);
}
.about__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease);
}
.about__body > div {
  overflow: hidden;
}
.about__card--open .about__body {
  grid-template-rows: 1fr;
}
.about__body p {
  margin: 0;
  padding: 0 1.5rem 1.5rem;
}
@media (max-width: 800px) {
  .about__stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .about__cards {
    grid-template-columns: 1fr;
  }
  .about__card:nth-child(even) {
    margin-top: 0;
  }
  .about__heading,
  .about__cv {
    margin-left: 0;
  }
}
</style>
