<script setup lang="ts">
import { projects } from '~/data/projects'
import type { Project } from '~/types/site'

const { open } = useProjectDialog()
const { show: showGame } = useGameDialog()

type Slot = { project: Project; index: number } | null

const slots = computed<Slot[]>(() => {
  const pattern = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  const list: Slot[] = []
  let cursor = 0
  for (const filled of pattern) {
    if (filled && cursor < projects.length) {
      list.push({ project: projects[cursor], index: cursor })
      cursor += 1
    } else {
      list.push(null)
    }
  }
  while (cursor < projects.length) {
    list.push({ project: projects[cursor], index: cursor })
    cursor += 1
  }
  return list
})

const aim = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--x', `${event.clientX - rect.left}px`)
  card.style.setProperty('--y', `${event.clientY - rect.top}px`)
}
</script>

<template>
  <section id="works" class="works page-section tone tone--dark" aria-labelledby="works-heading">
    <SectionSeam fx="ridge" num="02" from="light" to="dark" flip />

    <div class="container section-pad">
      <p class="mono">(02) Проекты</p>
      <h2 id="works-heading" class="section-title">Что я делал руками</h2>

      <div class="works__tiles">
        <i class="works__glow" aria-hidden="true" />
        <ul class="works__grid">
          <li
            v-for="(slot, i) in slots"
            :key="slot ? slot.project.title : `empty-${i}`"
            class="works__item"
            :class="{ 'works__item--empty': !slot }"
            :aria-hidden="slot ? undefined : 'true'"
          >
            <button
              v-if="slot"
              class="works__card"
              type="button"
              @pointerenter="aim"
              @pointerleave="aim"
              @click="open(slot.project, $event)"
            >
              <span class="works__card-index">{{ `0${slot.index + 1}` }}</span>
              <span class="works__tag">{{ slot.project.tag }}</span>
              <h3 class="works__card-title">{{ slot.project.title }}</h3>
              <p class="works__card-text">{{ slot.project.summary }}</p>
              <span class="works__card-stack">
                <i v-for="tool in slot.project.stack" :key="tool">{{ tool }}</i>
              </span>
              <span class="works__card-foot">
                <span>{{ slot.project.company }} · {{ slot.project.period }}</span>
                <b class="works__card-more">
                  Подробнее
                  <svg
                    class="arrow"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </b>
              </span>
              <span class="works__card-rev" aria-hidden="true">
                <span class="works__card-rev-value">{{ slot.project.metric.value }}</span>
                <b class="works__card-rev-label">{{ slot.project.metric.label }}</b>
                <b class="works__card-rev-more">
                  Подробнее
                  <svg
                    class="arrow"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </b>
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div class="works__egg">
        <button
          class="works__coin"
          type="button"
          aria-haspopup="dialog"
          aria-label="Хочешь поиграть? Открыть мини-игру"
          @click="showGame($event)"
        >
            <span class="works__coin-say" aria-hidden="true">Поиграем?</span>
          <svg class="works__coin-icon" viewBox="0 0 64 64" width="58" height="58" aria-hidden="true">
            <rect
              x="7"
              y="38"
              width="50"
              height="19"
              rx="9.5"
              fill="#e9dccb"
              stroke="#0b0705"
              stroke-width="2.5"
            />
            <circle
              class="works__coin-button"
              cx="19"
              cy="47.5"
              r="3.8"
              fill="#E73228"
              stroke="#0b0705"
              stroke-width="1.8"
            />
            <circle cx="45" cy="47.5" r="3.8" fill="#0b0705" />
            <g class="works__coin-stick">
              <rect
                x="29.5"
                y="17"
                width="5"
                height="25"
                rx="2"
                fill="#e9dccb"
                stroke="#0b0705"
                stroke-width="2"
              />
              <circle
                cx="32"
                cy="13"
                r="9.5"
                fill="#E73228"
                stroke="#0b0705"
                stroke-width="2.5"
              />
              <circle cx="28.5" cy="9.5" r="2.6" fill="#fff" opacity=".7" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes stick {
  0%,
  86%,
  100% {
    transform: rotate(0);
  }
  89% {
    transform: rotate(-16deg);
  }
  92% {
    transform: rotate(16deg);
  }
  95% {
    transform: rotate(-9deg);
  }
  98% {
    transform: rotate(3deg);
  }
}

@keyframes press {
  0%,
  90%,
  100% {
    transform: scale(1);
  }
  93% {
    transform: scale(0.7);
  }
  96% {
    transform: scale(1);
  }
}

.works__tiles {
  position: relative;
  margin-top: 4rem;
  overflow: hidden;
  --bs: min(1200px, 80svw);
}
.works__glow {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--bs);
  height: var(--bs);
  margin: calc(var(--bs) / -2) 0 0 calc(var(--bs) / -2);
  border-radius: 50%;
  background: radial-gradient(
    closest-side,
    rgba(255, 110, 92, 0.95),
    rgba(231, 50, 40, 0.5) 45%,
    rgba(231, 50, 40, 0)
  );
  will-change: transform;
  pointer-events: none;
}
.works__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
@media (min-width: 700px) {
  .works__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .works__grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-flow: dense;
  }
  .works__grid > li:nth-child(1) {
    grid-column: 1/6;
  }
  .works__grid > li:nth-child(2) {
    grid-column: 6/9;
  }
  .works__grid > li:nth-child(3) {
    grid-column: 9/13;
  }
  .works__grid > li:nth-child(4) {
    grid-column: 1/4;
  }
  .works__grid > li:nth-child(5) {
    grid-column: 4/9;
  }
  .works__grid > li:nth-child(6) {
    grid-column: 9/13;
  }
  .works__grid > li:nth-child(7) {
    grid-column: 1/5;
  }
  .works__grid > li:nth-child(8) {
    grid-column: 5/8;
  }
  .works__grid > li:nth-child(9) {
    grid-column: 8/13;
  }
  .works__grid > li:nth-child(10) {
    grid-column: 1/5;
  }
  .works__grid > li:nth-child(11) {
    grid-column: 5/10;
  }
  .works__grid > li:nth-child(12) {
    grid-column: 10/13;
  }
}
.works__item {
  position: relative;
  min-height: 22rem;
  background: var(--bg);
}
.works__item--empty {
  display: none;
}
@media (min-width: 1024px) {
  .works__item--empty {
    display: block;
  }
}
.works__card {
  --x: 50%;
  --y: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  padding: 2rem;
  background: var(--bg);
  color: var(--fg);
  font: inherit;
}
.works__card-index {
  position: absolute;
  right: 1.5rem;
  top: 1.1rem;
  font: 700 1.9rem var(--disp);
  color: #6b5a50;
}
.works__tag {
  display: inline-block;
  align-self: flex-start;
  border: 2px solid #ff6b61;
  color: #ff6b61;
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font: 700 0.7rem var(--fm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.works__card-title {
  margin: 1.25rem 0 0.75rem;
  max-width: 22ch;
  font: 700 clamp(1.05rem, 1.5vw, 1.3rem)/1.25 var(--fd);
}
.works__card-text {
  margin: 0;
  line-height: 1.55;
  color: #b9a99a;
}
.works__card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
}
.works__card-stack i {
  font-style: normal;
  background: #2a1a12;
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font: 700 0.75rem var(--fm);
}
.works__card-foot {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  border-top: 1px solid #3d2a22;
  padding-top: 1rem;
  font-size: 0.75rem;
  color: #b9a99a;
}
.works__card-more {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font: 700 0.9rem var(--disp);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ff6b61;
  white-space: nowrap;
}
.works__card-rev {
  position: absolute;
  inset: 0;
  padding: 2rem;
  background: #f3e9df;
  color: #0b0705;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.1rem;
  clip-path: circle(0% at var(--x) var(--y));
  transition: clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}
.works__card-rev-value {
  font: 700 clamp(2.2rem, 3.8vw, 3.6rem)/1.08 var(--disp);
  color: #d92b20;
  text-wrap: balance;
}
.works__card-rev-label,
.works__card-rev-more {
  font: 700 0.9rem/1.2 var(--disp);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #b83c00;
}
.works__card-rev .works__card-rev-label {
  display: block;
  max-width: 34ch;
  font: 600 0.95rem/1.5 var(--fm);
  text-transform: none;
  letter-spacing: 0;
  color: #0b0705;
}
.works__card-rev-more {
  margin-top: 0.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
@media (hover: hover) {
  .works__card:hover .works__card-rev,
  .works__card:focus-visible .works__card-rev {
    clip-path: circle(150% at var(--x) var(--y));
  }
}
@media (hover: none) {
  .works__card-rev {
    display: none;
  }
}
html.reveal .works__card > :not(.works__card-rev) {
  clip-path: inset(0 100% 0 0);
}
html.reveal .works__item.is-on .works__card > :not(.works__card-rev) {
  animation: rin 0.8s var(--ease) calc(var(--d, 0ms) + 0.1s) forwards;
}
.works__egg {
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
}
.works__coin {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: 0;
  padding: 6px;
  border-radius: 999px;
  color: var(--fg);
}
.works__coin-icon {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.works__coin-say {
  order: -1;
  font: 700 0.75rem var(--fm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateX(8px);
  transition:
    opacity 0.3s,
    transform 0.4s var(--ease);
  white-space: nowrap;
}
.works__coin:focus-visible .works__coin-say {
  opacity: 1;
  transform: none;
}
.works__coin:focus-visible .works__coin-icon {
  transform: rotate(-6deg) scale(1.06);
}
@media (hover: hover) {
  .works__coin:hover .works__coin-say {
    opacity: 1;
    transform: none;
  }
  .works__coin:hover svg {
    transform: rotate(-6deg) scale(1.06);
  }
  .works__coin:hover .works__coin-stick {
    animation: none;
    transform: rotate(14deg);
  }
}
@media (hover: none) {
  .works__coin-say {
    opacity: 0.8;
    transform: none;
  }
}
.works__coin-stick {
  transform-origin: 32px 42px;
  animation: stick 9s infinite;
}
.works__coin-button {
  transform-box: fill-box;
  transform-origin: center;
  animation: press 9s infinite;
}
.works__coin-stick,
.works__coin-button {
  transition: transform 0.3s;
}
@media (max-width: 1023px) {
  .works__tiles {
    margin-inline: calc(var(--pad) * -1);
    background: none;
  }
  .works__glow {
    display: none;
  }
  .works__grid {
    gap: 0;
  }
  .works__item {
    background: none;
    border-bottom: 1px solid var(--hot);
  }
  .works__item:first-child {
    border-top: 1px solid var(--hot);
  }
  .works__card {
    padding-inline: var(--pad);
    background: none;
  }
}
@media (max-width: 700px) {
  .works__card:hover .works__card-rev {
    clip-path: none;
  }
  .works__card:active .works__card-rev {
    clip-path: circle(150% at var(--x) var(--y));
  }
}
</style>
