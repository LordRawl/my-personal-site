<script setup lang="ts">
import { courses, education, jobs, languages } from '~/data/experience'
</script>

<template>
  <section id="experience" class="xp page-section tone tone--dark" aria-labelledby="experience-heading">
    <SectionSeam fx="caret" num="04" />

    <div class="container xp__inner">
      <div class="xp__head">
        <p class="mono">(04) Опыт</p>
        <h2 id="experience-heading" class="section-title">Девять лет в проде</h2>
      </div>

      <div class="xp__timeline">
        <div class="xp__rail" />
        <i class="xp__dot" />

        <article v-for="job in jobs" :key="job.company + job.period" class="xp__job">
          <i class="xp__job-node" />
          <div class="xp__job-meta">
            <p class="mono xp__job-meta-item">{{ job.period }}</p>
            <p class="mono xp__job-meta-item">{{ job.place }}</p>
          </div>
          <div class="xp__job-body">
            <h3 class="xp__job-company">{{ job.company }}</h3>
            <p class="xp__job-role">{{ job.role }}</p>
            <ul class="xp__job-list">
              <li v-for="point in job.points" :key="point" class="xp__job-point">{{ point }}</li>
            </ul>
            <p class="xp__job-stack">{{ job.stack }}</p>
          </div>
        </article>
      </div>

      <div class="xp__edu">
        <div class="xp__edu-row">
          <p class="mono">Образование</p>
          <div>
            <b class="xp__edu-year">{{ education.year }}</b>
            <p class="xp__edu-text">{{ education.university }}</p>
            <p class="xp__edu-text xp__edu-muted">{{ education.faculty }}</p>
          </div>
        </div>

        <div class="xp__edu-row">
          <p class="mono">Курсы</p>
          <ul class="xp__courses">
            <li v-for="course in courses" :key="course.title" class="xp__course">
              <span class="xp__course-year">{{ course.year }}</span>{{ course.title }}
            </li>
          </ul>
        </div>

        <div class="xp__edu-row">
          <p class="mono">Языки</p>
          <div class="xp__langs">
            <p v-for="language in languages" :key="language.name" class="xp__lang">
              {{ language.name }}<small class="xp__lang-level">{{ language.level }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.xp__inner {
  padding-block: calc(var(--H0) * 1.34 + 2rem) calc(var(--H0) + 1rem);
}
.xp__head {
  margin-bottom: 4.5rem;
}
.xp__timeline {
  position: relative;
  padding-left: 3.2rem;
}
.xp__rail {
  position: absolute;
  left: 0.55rem;
  top: 0;
  bottom: 0;
  width: 2px;
  overflow: hidden;
  background: var(--bd);
  clip-path: inset(0.9rem 0 0 0);
}
.xp__rail::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--hot);
  transform: translateY(calc(var(--fy, 0px) - 100%));
}
.xp__dot {
  position: absolute;
  left: calc(0.55rem - 5px);
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--hot);
  box-shadow: 0 0 0 4px var(--bg);
  transform: translateY(calc(max(var(--fy, 0px), 0.9rem) - 6px));
}
.xp__job {
  position: relative;
  display: grid;
  grid-template-columns: minmax(9rem, 16rem) 1fr;
  gap: 0.6rem 3rem;
  padding: 0 0 4.5rem;
}
.xp__job-node {
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
  left: calc(-3.25rem + 1px);
  top: 0.3rem;
}
.xp__job-node::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid var(--hot);
  opacity: 0;
}
.xp__job.is-on > .xp__job-node {
  background: var(--hot);
  transform: scale(1.25);
}
.xp__job.is-on > .xp__job-node::after {
  animation: pulse2 1s var(--ease) 1 forwards;
}
.xp__job-meta-item {
  margin: 0 0 0.3rem;
}
.xp__job-company {
  margin: 0 0 0.3rem;
  font: 700 clamp(1.4rem, 2.6vw, 2.4rem)/1.1 var(--fd);
}
.xp__job-role {
  margin: 0 0 1rem;
  color: var(--mut);
}
.xp__job-list {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  max-width: 46rem;
}
.xp__job-point {
  position: relative;
  margin: 0.55rem 0;
  padding-left: 1.4rem;
}
.xp__job-point::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 0.7rem;
  height: 2px;
  background: var(--hot);
}
.xp__job-stack {
  margin: 0;
  font: 500 0.8rem var(--fm);
  color: var(--mut);
}
.xp__job:last-child {
  padding-bottom: 1rem;
}
html.reveal .xp__job .xp__job-meta,
html.reveal .xp__job .xp__job-body {
  clip-path: inset(0 100% 0 0);
}
html.reveal .xp__job.is-on .xp__job-meta {
  animation: rin 0.8s var(--ease) forwards;
}
html.reveal .xp__job.is-on .xp__job-body {
  animation: rin 0.9s var(--ease) 0.12s forwards;
}
.xp__edu {
  margin-top: 3rem;
  padding-left: 3.2rem;
}
.xp__edu-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(9rem, 16rem) 1fr;
  gap: 1rem 3rem;
  padding: 2rem 0;
}
.xp__edu-row::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--bd);
  transform-origin: left;
}
.xp__edu-text {
  margin: 0;
}
.xp__edu-muted {
  margin-top: 0.4rem;
  color: var(--mut);
}
.xp__edu-year {
  display: block;
  margin: 0 0 1rem;
  font: 900 clamp(3rem, 9vw, 8rem)/0.9 var(--fd);
  color: var(--hot);
}
.xp__courses {
  margin: 0;
  padding: 0;
  list-style: none;
}
.xp__course {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--bd);
}
.xp__course:last-child {
  border: 0;
}
.xp__course-year {
  padding-top: 0.25em;
  font: 700 0.85rem var(--fm);
  color: var(--acc);
}
.xp__langs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3.5rem;
}
.xp__lang {
  font: 700 clamp(1.4rem, 3vw, 2.6rem)/1.1 var(--fd);
}
.xp__lang-level {
  display: block;
  margin-top: 0.5rem;
  font: 500 0.85rem var(--fm);
  color: var(--mut);
}
html.reveal .xp__edu-row::before {
  transform: scaleX(0);
}
html.reveal .xp__edu-row.is-on::before {
  transform: scaleX(1);
  transition: transform 1s var(--ease) var(--d, 0ms);
}
html.reveal .xp__edu-row > * {
  clip-path: inset(0 100% 0 0);
}
html.reveal .xp__edu-row.is-on > * {
  animation: rin 0.8s var(--ease) calc(var(--d, 0ms) + 0.3s) forwards;
}
@media (max-width: 800px) {
  .xp__job,
  .xp__edu-row {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  .xp__timeline {
    padding-left: 2.8rem;
  }
  .xp__job-node {
    left: calc(-2.85rem + 1px);
  }
  .xp__edu {
    padding-left: 0;
  }
}
</style>
