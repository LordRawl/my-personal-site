<script setup lang="ts">
const jobs = [
  { meta: 'Краснодар · окт. 2024 — наст. время', company: 'Cognitech', text: 'Ключевой ревьюер, миграция на FSD.' },
  { meta: 'Санкт-Петербург · июнь 2021 — сент. 2024', company: 'Skycoach', text: 'Запуск маркетплейса, JWT, SSR ради SEO, админ-панель.' },
  { meta: 'Москва · нояб. 2017 — май 2021', company: 'Like Центр', text: 'Десятки лендингов, ключевая роль в ERP, наставничество.' },
  { meta: 'Удалённо · янв. — нояб. 2017', company: 'Начало пути', text: 'HTML-верстальщик.' },
]
</script>

<template>
  <section id="experience" class="xp" aria-labelledby="xh">
    <div class="xp__torn" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path id="tornp" fill="#170d08" d="" />
        <path
          id="tornl"
          fill="none"
          stroke="#E73228"
          stroke-width="3"
          vector-effect="non-scaling-stroke"
          d=""
        />
      </svg>
    </div>

    <div class="xp__grid">
      <div class="xp__head">
        <p class="mono">(04) Опыт</p>
        <h2 id="xh" class="xp__heading">Девять лет в проде</h2>
      </div>

      <div id="tl" class="xp__tl">
        <svg id="tsvg" aria-hidden="true">
          <path id="tbase" fill="none" stroke="rgba(243,233,223,.2)" stroke-width="3" />
          <path id="tprog" fill="none" stroke="#E73228" stroke-width="3" />
          <circle id="tdot" r="10" fill="#E73228" />
        </svg>

        <article v-for="j in jobs" :key="j.company" class="xp__job">
          <p class="mono xp__job-meta">{{ j.meta }}</p>
          <h3 class="xp__job-title">{{ j.company }}</h3>
          <p class="xp__job-text">{{ j.text }}</p>
        </article>
      </div>

      <div class="xp__meta">
        <div class="xp__meta-card">
          <p class="mono xp__meta-label">Образование</p>
          <p class="xp__meta-value">Уральский федеральный университет, 2015</p>
        </div>
        <div class="xp__meta-card">
          <p class="mono xp__meta-label">Курсы</p>
          <p class="xp__meta-value">Vue 3 (JavaScript.Ninja, 2022), HTML Academy (2021) и другие</p>
        </div>
        <div class="xp__meta-card">
          <p class="mono xp__meta-label">Языки</p>
          <p class="xp__meta-value">Русский (родной), английский (A2). Рекомендации по запросу.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.xp {
  position: relative;
  background: var(--bg2);
  padding: 14vh var(--pad) 36vh;
}
.xp__torn {
  position: absolute;
  left: 0;
  right: 0;
  top: -13vh;
  height: 14vh;
  pointer-events: none;
}
.xp__torn svg {
  width: 100%;
  height: 100%;
  display: block;
}
.xp__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}
.xp__head {
  grid-column: 1 / 6;
}
.xp__heading {
  grid-column: 1 / 6;
  align-self: start;
  position: sticky;
  top: 18vh;
  margin: 1rem 0 0;
  font: 900 clamp(2rem, 5.4vw, 5rem) / 1 var(--fd);
}
.xp__tl {
  grid-column: 6 / 13;
  position: relative;
  padding-left: 5rem;
}
.xp__tl svg {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  overflow: visible;
}
.xp__job {
  padding: 0 0 4.5rem;
}
.xp__job-title {
  margin: 0.3rem 0 0.6rem;
  font: 700 clamp(1.2rem, 2vw, 1.7rem) / 1.15 var(--fd);
}
.xp__job-meta,
.xp__job-text {
  margin: 0;
  max-width: 34rem;
}
.xp__meta {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 3rem;
}
.xp__meta-card {
  border: 1px solid rgba(243, 233, 223, 0.2);
  border-radius: 1.2rem;
  padding: 1.4rem;
}
.xp__meta-label,
.xp__meta-value {
  margin: 0.4rem 0 0;
}
@media (max-width: 800px) {
  .xp__head,
  .xp__tl {
    grid-column: 1 / -1;
  }
  .xp__heading {
    position: static;
  }
  .xp__meta {
    grid-template-columns: 1fr;
  }
  .xp__tl {
    padding-left: 3.5rem;
  }
}
</style>
