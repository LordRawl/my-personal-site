<script setup lang="ts">
import { projects } from '~/data/projects'

const { open } = useProjectDialog()

const trackPointer = (e: PointerEvent) => {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - r.left}px`)
  el.style.setProperty('--y', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="works" class="works" aria-labelledby="wk">
    <div class="works__drops" aria-hidden="true">
      <svg id="dropsvg" viewBox="0 0 100 34" preserveAspectRatio="xMidYMax slice" fill="#f3e9df" />
    </div>

    <p class="mono works__kicker">(02) Проекты</p>
    <h2 id="wk" class="works__heading">Что я делал руками</h2>

    <div id="grid" class="works__grid">
      <article
        v-for="(p, i) in projects"
        :key="p.id"
        class="works__card"
        :class="{ 'works__card--dark': i === 3 }"
        @pointermove="trackPointer"
      >
        <span>
          <span class="mono works__meta">{{ p.tag }} · {{ p.company }} · {{ p.year }}</span>
          <h3 class="works__title">{{ p.title }}</h3>
          <span class="works__desc">{{ p.summary }}</span>
        </span>
        <span class="works__peek">{{ p.stack.join(' · ') }}</span>
        <span class="works__go">Подробнее →</span>
        <button
          type="button"
          class="works__hit"
          :aria-label="`Подробнее: ${p.title}`"
          @click="open(p, $event)"
        />
      </article>
    </div>

    <div class="works__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path id="wavepath" fill="#0b0705" d="" />
        <path
          id="wavestroke"
          fill="none"
          stroke="#E73228"
          stroke-width="3"
          vector-effect="non-scaling-stroke"
          d=""
        />
      </svg>
    </div>
  </section>
</template>

<style>
.works {
  position: relative;
  background: var(--cream);
  color: var(--dk);
  padding: 18vh var(--pad) 28vh;
  isolation: isolate;
}
.works__drops {
  position: absolute;
  left: 0;
  right: 0;
  top: -34vh;
  height: 34vh;
  pointer-events: none;
  overflow: hidden;
}
.works__drops svg {
  width: 100%;
  height: 100%;
  display: block;
}
.works__kicker {
  color: #5a4637;
}
.works__heading {
  margin: 1rem 0 4rem;
  font: 900 clamp(2rem, 6.4vw, 6rem) / 0.98 var(--fd);
  max-width: 12ch;
}
.works__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
.works__card {
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: left;
  border-radius: 1.4rem;
  padding: 1.6rem;
  min-height: 16rem;
  background: #fff8f1;
  border: 1.5px solid var(--dk);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.35s var(--ease);
  --x: 50%;
  --y: 50%;
  color: var(--dk);
}
.works__card:hover {
  transform: translateY(-6px) rotate(-0.4deg);
}
.works__meta {
  position: relative;
  display: block;
  color: #5a4637;
}
.works__title {
  position: relative;
  display: block;
  margin: 0.5rem 0;
  font: 700 clamp(1.05rem, 1.6vw, 1.45rem) / 1.15 var(--fd);
}
.works__desc {
  position: relative;
  display: block;
}
.works__go {
  position: relative;
  display: block;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.works__peek {
  position: absolute;
  inset: 0;
  background: var(--acc);
  padding: 1.6rem;
  display: flex;
  align-items: flex-end;
  font-weight: 700;
  clip-path: circle(0 at var(--x) var(--y));
  transition: clip-path 0.6s var(--ease);
  pointer-events: none;
}
.works__card:hover .works__peek,
.works__card:has(.works__hit:focus-visible) .works__peek {
  clip-path: circle(150% at var(--x) var(--y));
}
.works__hit {
  position: absolute;
  inset: 0;
  z-index: 3;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: 1.4rem;
}
.works__hit:focus-visible {
  outline: 3px solid var(--acc);
  outline-offset: -4px;
}
.works__card--dark {
  background: var(--dk);
  color: var(--cream);
}
.works__card--dark .works__meta {
  color: var(--mute);
}
.works__card:nth-child(1) {
  grid-column: 1 / 8;
}
.works__card:nth-child(2) {
  grid-column: 8 / 13;
  margin-top: 4rem;
}
.works__card:nth-child(3) {
  grid-column: 2 / 7;
}
.works__card:nth-child(4) {
  grid-column: 7 / 12;
  margin-top: 3rem;
}
.works__card:nth-child(5) {
  grid-column: 1 / 6;
  margin-top: 1rem;
}
.works__card:nth-child(6) {
  grid-column: 6 / 13;
}
.works__wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 22vh;
  pointer-events: none;
}
.works__wave svg {
  width: 100%;
  height: 100%;
  display: block;
}
@media (max-width: 800px) {
  .works__card:nth-child(n) {
    grid-column: 1 / -1;
    margin: 0;
  }
  .works__peek {
    position: static;
    clip-path: none;
    padding: 0.8rem 0 0;
    background: none;
    display: block;
  }
}
</style>
