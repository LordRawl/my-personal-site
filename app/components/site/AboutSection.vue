<script setup lang="ts">
import { approach, facts } from '~/data/about'
import { profile } from '~/data/profile'
import { formatCount } from '~/utils/format'
</script>

<template>
  <section id="about" class="about page-section tone tone--light" aria-labelledby="about-heading">
    <span class="section-num" aria-hidden="true">01</span>

    <div class="container about__inner">
      <p class="mono">(01) Обо мне</p>
      <h2 id="about-heading" class="section-title">
        От интерфейса до архитектуры: закрываю frontend-задачи целиком
      </h2>

      <div class="about__cv">
        <a class="btn btn--big" :href="profile.resumeUrl">Скачать резюме PDF ↓</a>
      </div>

      <div class="about__stats">
        <article v-for="card in approach" :key="card.title" class="about__stat">
          <i class="about__stat-node" />
          <h3 class="about__stat-title">{{ card.title }}</h3>
          <p class="about__stat-text">{{ card.text }}</p>
        </article>
      </div>

      <div class="about__nums">
        <div
          v-for="(fact, i) in facts"
          :key="fact.value"
          class="about__num"
          :class="`about__num--${i + 1}`"
        >
          <b class="about__num-value" :data-n="fact.value">{{ formatCount(fact.value) }}</b>
          <p class="about__num-text">{{ fact.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.about__inner {
  padding-block: calc(var(--H0) * 0.9 + 1.5rem) calc(var(--H0) + 1rem);
}
.about__cv {
  margin: 0 0 5rem;
}
.about__stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding-top: 3.2rem;
  margin-bottom: 9vh;
}
.about__stats::before,
.about__stats::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0.55rem;
  height: 2px;
  background: var(--bd);
}
.about__stats::after {
  background: var(--hot);
  transform-origin: left;
  transform: scaleX(var(--p, 0));
}
.about__stat:nth-child(1) {
  --i: 0;
}
.about__stat:nth-child(2) {
  --i: 1;
}
.about__stat:nth-child(3) {
  --i: 2;
}
.about__stat:nth-child(4) {
  --i: 3;
}
.about__stat {
  position: relative;
  padding: 1.5rem;
  border-radius: 1.2rem;
  border: 1.5px solid var(--bd);
  background: var(--card);
}
.about__stat > .about__stat-node {
  left: 1.4rem;
  top: calc(-3.25rem + 1px);
}
.about__stat.is-on > .about__stat-node {
  transition-delay: calc(var(--i) * 0.18s);
}
.about__stat.is-on > .about__stat-node::after {
  animation-delay: calc(var(--i) * 0.18s);
}
.about__stat-title {
  margin: 0 0 0.8rem;
  font: 700 clamp(1.1rem, 1.6vw, 1.4rem)/1.15 var(--fd);
}
.about__stat-text {
  margin: 0;
  color: var(--mut);
}
.about__stat-node {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid var(--hot);
  background: var(--bg);
  z-index: 2;
  transition:
    background 0.2s var(--ease),
    transform 0.2s var(--ease);
}
.about__stat-node::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid var(--hot);
  opacity: 0;
}
.about__stat.is-on > .about__stat-node {
  background: var(--hot);
  transform: scale(1.25);
}
.about__stat.is-on > .about__stat-node::after {
  animation: pulse2 1s var(--ease) 1 forwards;
}
html.reveal .about__stats .about__stat {
  background: transparent;
  border-color: var(--bd);
  transition: background 0.5s calc(1s + var(--i) * 0.18s);
}
html.reveal .about__stats .about__stat.is-on {
  background: var(--card);
}
html.reveal .about__stats .about__stat > .about__stat-title,
html.reveal .about__stats .about__stat > .about__stat-text {
  clip-path: inset(0 100% 0 0);
}
html.reveal .about__stats .about__stat.is-on > .about__stat-title,
html.reveal .about__stats .about__stat.is-on > .about__stat-text {
  animation: rin 0.48s var(--ease) forwards;
}
html.reveal .about__stats .about__stat.is-on > .about__stat-title {
  animation-delay: calc(1.05s + var(--i) * 0.18s);
}
html.reveal .about__stats .about__stat.is-on > .about__stat-text {
  animation-delay: calc(1.2s + var(--i) * 0.18s);
}
html.reveal .about__stats .about__stat::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  z-index: 3;
  border-radius: inherit;
  padding: 1.5px;
  pointer-events: none;
  background: conic-gradient(
    from 0deg,
    var(--ringc, var(--hot)) var(--a),
    transparent calc(var(--a) + 0.4deg)
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
  opacity: 0;
}
html.reveal .about__stats .about__stat.is-on::before {
  animation: lap 0.9s var(--ease) calc(var(--i) * 0.18s) forwards;
}
.about__nums {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.2rem 1.5rem;
  align-items: start;
}
.about__num {
  --c: var(--fg);
}
.about__num--2 {
  --c: var(--hot);
}
.about__num-value {
  display: block;
  white-space: nowrap;
  font: 900 var(--sz)/0.95 var(--fd);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--c);
  transition: opacity 0.6s var(--ease);
}
.about__num-text {
  margin: 0.8rem 0 0;
  max-width: 30rem;
  color: var(--mut);
}
.about__num--1 .about__num-text {
  max-width: 46rem;
}
.about__num--1 {
  grid-column: 1/8;
  --sz: clamp(3rem, 8.4vw, 8rem);
}
.about__num--2 {
  grid-column: 8/13;
  --sz: clamp(3rem, 8.4vw, 8rem);
}
.about__num--3 {
  grid-column: 1/8;
  --sz: clamp(2.6rem, 6vw, 5.6rem);
}
.about__num--4 {
  grid-column: 8/13;
  --sz: clamp(2.6rem, 6vw, 5.6rem);
}
@media (max-width: 900px) {
  .about__stats {
    grid-template-columns: 1fr;
    padding: 0 0 0 2.6rem;
    gap: 2.4rem;
  }
  .about__stats::before,
  .about__stats::after {
    left: 0.55rem;
    right: auto;
    top: 0;
    bottom: 0;
    width: 2px;
    height: auto;
  }
  .about__stats::after {
    transform-origin: top;
    transform: scaleY(var(--p, 0));
  }
  .about__stat:nth-child(n) {
    --i: 0;
  }
  .about__stat > .about__stat-node {
    left: calc(-2.65rem + 1px);
    top: 1.4rem;
  }
  .about__nums {
    grid-template-columns: 1fr;
  }
  .about__num:nth-child(n) {
    grid-column: 1/-1;
  }
  .about__num--1,
  .about__num--2 {
    --sz: min(12.5vw, 5rem);
  }
  .about__num--3,
  .about__num--4 {
    --sz: min(14vw, 4.5rem);
  }
}
</style>
