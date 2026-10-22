<script setup lang="ts">
import { marqueeRows } from '~/data/skills'

const isles = [
  { title: 'Frontend', items: ['Vue 2/3', 'Nuxt 2/3', 'TypeScript', 'Pinia', 'Quasar', 'Tailwind', 'React', 'jQuery', 'Bootstrap', 'SVG-анимации'] },
  { title: 'Сборка', items: ['Vite', 'Webpack', 'Gulp', 'Parcel'] },
  { title: 'Тесты и данные', items: ['Vitest', 'Vue Test Utils', 'REST API', 'WebSockets'] },
  { title: 'Дизайн', items: ['Figma', 'Photoshop', 'Zeplin', 'Illustrator'] },
  { title: 'Дополнительно', items: ['Node.js', 'Twig', 'Blade', 'Tilda', 'GetCourse', 'Git Flow'] },
  { title: 'Методологии', items: ['БЭМ', 'Pixel Perfect', 'FSD'] },
]
</script>

<template>
  <section id="stack" class="stack" aria-labelledby="st1">
    <p class="mono stack__kicker">(03) Стек</p>
    <h2 id="st1" class="stack__heading">Инструменты, которыми работаю</h2>

    <!-- Строка едет на -50%, поэтому список продублирован: на стыке копий нет шва. -->
    <div class="stack__mq" data-dir="-1" aria-hidden="true">
      <ul v-for="copy in 2" :key="copy" class="stack__mq-track">
        <li v-for="item in marqueeRows[0]" :key="item" class="stack__mq-tag">{{ item }}</li>
      </ul>
    </div>
    <div class="stack__mq stack__mq--reverse" data-dir="1" aria-hidden="true">
      <ul v-for="copy in 2" :key="copy" class="stack__mq-track">
        <li v-for="item in marqueeRows[1]" :key="item" class="stack__mq-tag">{{ item }}</li>
      </ul>
    </div>

    <div class="stack__isles">
      <div v-for="i in isles" :key="i.title" class="stack__isle">
        <h3 class="stack__isle-title">{{ i.title }}</h3>
        <ul class="stack__isle-tags">
          <li v-for="item in i.items" :key="item" class="stack__isle-tag">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.stack {
  position: relative;
  background: var(--bg);
  padding: 14vh 0 26vh;
}
.stack__kicker {
  padding: 0 var(--pad);
}
.stack__heading {
  padding: 0 var(--pad);
  margin: 1rem 0 3rem;
  font: 900 clamp(1.6rem, 4vw, 3.4rem) / 1.05 var(--fd);
}
.stack__mq {
  display: flex;
  width: max-content;
  margin-bottom: 1rem;
  will-change: transform;
}
.stack__mq-track {
  display: flex;
  gap: 0.8rem;
  padding: 0 0.4rem;
  margin: 0;
  list-style: none;
}
.stack__mq-tag {
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(243, 233, 223, 0.35);
  border-radius: 99px;
  font: 500 1.05rem var(--fm);
  white-space: nowrap;
}
.stack__mq--reverse .stack__mq-tag {
  background: var(--acc);
  border-color: var(--acc);
  color: var(--dk);
  font-weight: 700;
}
.stack__isles {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.2rem;
  padding: 4rem var(--pad) 0;
}
.stack__isle {
  background: var(--bg2);
  border: 1px solid rgba(243, 233, 223, 0.2);
  border-radius: 2rem;
  padding: 1.6rem;
}
.stack__isle-title {
  margin: 0 0 1rem;
  font: 700 1rem var(--fd);
  color: var(--acc);
}
.stack__isle-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
.stack__isle-tag {
  padding: 0.35rem 0.8rem;
  border-radius: 99px;
  border: 1px solid rgba(243, 233, 223, 0.3);
  font-size: 0.9rem;
  transition:
    background 0.25s,
    color 0.25s;
}
.stack__isle-tag:hover {
  background: var(--ink);
  color: var(--dk);
}
.stack__isle:nth-child(1) {
  grid-column: 1 / 8;
}
.stack__isle:nth-child(2) {
  grid-column: 8 / 13;
  margin-top: 2.5rem;
}
.stack__isle:nth-child(3) {
  grid-column: 2 / 7;
}
.stack__isle:nth-child(4) {
  grid-column: 7 / 12;
  margin-top: 2rem;
}
.stack__isle:nth-child(5) {
  grid-column: 1 / 7;
  margin-top: -0.5rem;
}
.stack__isle:nth-child(6) {
  grid-column: 7 / 13;
  margin-top: 1.5rem;
}
@media (max-width: 800px) {
  .stack__isle:nth-child(n) {
    grid-column: 1 / -1;
    margin: 0;
  }
}
</style>
