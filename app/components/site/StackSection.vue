<script setup lang="ts">
import { marqueeRows, skillGroups } from '~/data/skills'
</script>

<template>
  <section id="stack" class="stack page-section tone tone--dark" aria-labelledby="stack-heading">
    <SectionSeam fx="wave" num="03" bare />

    <div class="stack__inner section-pad">
      <div class="container">
        <p class="mono">(03) Стек</p>
        <h2 id="stack-heading" class="section-title">Инструменты, которыми работаю</h2>
      </div>

      <div class="stack__marquee" aria-hidden="true">
        <div v-for="(row, i) in marqueeRows" :key="i" class="stack__marquee-row">
          <div
            class="stack__track"
            :class="{ 'stack__track--outline': i % 2 === 1 }"
            :data-mq="i"
          >
            <template v-for="word in row" :key="word">
              <span>{{ word }}</span>
              <i />
            </template>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="stack__groups">
          <div v-for="group in skillGroups" :key="group.title" class="stack__group">
            <h3 class="stack__group-title">{{ group.title }}</h3>
            <ul class="stack__list">
              <li v-for="item in group.items" :key="item" class="stack__item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.stack__marquee {
  margin: 3.5rem 0 0;
  overflow: clip;
}
.stack__marquee-row {
  overflow: clip;
  padding-block: 0.25rem;
}
.stack__track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 2.5rem;
  white-space: nowrap;
  font: 700 clamp(3rem, 8vw, 8rem)/1.1 var(--disp);
  text-transform: uppercase;
  letter-spacing: -0.005em;
  will-change: transform;
}
.stack__track i {
  flex: none;
  width: 0.2em;
  height: 0.2em;
  border-radius: 0.04em;
  background: var(--hot);
}
.stack__track--outline {
  color: transparent;
  -webkit-text-stroke: 2px var(--fg);
}
.stack__groups {
  margin: 6rem 0 0;
  border-top: 1px solid var(--bd);
}
.stack__group {
  display: grid;
  grid-template-columns: minmax(9rem, 18rem) 1fr;
  gap: 1rem 3rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid var(--bd);
}
.stack__group-title {
  margin: 0;
  padding-top: 0.6em;
  font: 700 0.8rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--acc);
}
.stack__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  font: 500 clamp(1.1rem, 2.2vw, 2rem)/1.35 var(--fd);
}
.stack__inner {
  position: relative;
  z-index: 1;
}
.stack__item {
  display: flex;
  transition: color 0.25s;
}
.stack__item:hover {
  color: var(--hot);
}
.stack__item:not(:last-child)::after {
  content: '/';
  color: var(--hot);
  margin: 0 0.55em;
}
html.reveal .stack__group > * {
  clip-path: inset(0 100% 0 0);
}
html.reveal .stack__group.is-on > * {
  animation: rin 0.8s var(--ease) var(--d, 0ms) forwards;
}
@media (max-width: 800px) {
  .stack__group {
    grid-template-columns: 1fr;
  }
}
</style>
