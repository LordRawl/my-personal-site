<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section class="hero" aria-labelledby="h1">
    <h1 id="h1" class="sr">
      Frontend под ключ — разработка и проектирование интерфейсов, резюме Ивана Есина
    </h1>
    <p class="mono hero__eyebrow">Frontend-разработчик · Vue 3 · Nuxt · TypeScript</p>

    <div class="hero__stage">
      <div class="hero__gl hero__gl--a" aria-hidden="true">FRONTEND</div>
      <div class="hero__pic">
        <i class="hero__plate" aria-hidden="true" />
        <img
          id="me"
          src="/portrait.webp"
          width="800"
          height="1586"
          alt="Иван Есин, frontend-разработчик"
          fetchpriority="high"
        />
      </div>
      <div class="hero__gl hero__gl--b" aria-hidden="true">ПОД КЛЮЧ</div>
    </div>

    <div class="hero__copy">
      <p>
        Беру задачу целиком: от макета и архитектуры до продакшена. Vue&nbsp;3, Nuxt,
        TypeScript&nbsp;— 9+ лет и 80+ проектов в&nbsp;проде.
      </p>
      <div class="hero__cta">
        <a class="btn btn--big" data-magnet href="#works">Смотреть проекты ↓</a>
        <a class="hero__link" :href="profile.telegram">Написать в Telegram</a>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  --fs: min(12.6vw, 21svh);
  position: relative;
  height: max(100svh, 38rem);
  overflow: hidden;
  isolation: isolate;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 6.2rem var(--pad) 2rem;
}
.hero__eyebrow {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  position: relative;
  z-index: 5;
}
.hero__stage {
  grid-column: 1;
  grid-row: 2 / 4;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 calc(var(--pad) * -1);
  min-height: 0;
}
.hero__gl {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  font: 900 var(--fs) / 0.92 var(--fd);
  letter-spacing: -0.04em;
  white-space: nowrap;
  text-align: center;
  pointer-events: none;
  user-select: none;
}
.hero__gl--a {
  top: 2%;
  color: var(--ink);
  z-index: 1;
}
.hero__gl--b {
  top: 50%;
  color: var(--acc);
  z-index: 3;
}
.hero__pic {
  position: relative;
  z-index: 2;
  height: 92%;
  aspect-ratio: 800 / 1586;
  margin-left: 14vw;
}
.hero__pic::after {
  content: '';
  position: absolute;
  left: -40px;
  right: -40px;
  bottom: -2px;
  height: 26%;
  background: linear-gradient(to bottom, rgba(11, 7, 5, 0), var(--bg) 92%);
  z-index: 3;
  pointer-events: none;
}
.hero__pic img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  filter: grayscale(1) contrast(1.14) brightness(1.04);
}
.hero__plate {
  position: absolute;
  inset: 0;
  background: var(--acc);
  -webkit-mask: var(--ph) center / 100% 100% no-repeat;
  mask: var(--ph) center / 100% 100% no-repeat;
  translate: clamp(5px, 0.75vw, 11px) 0;
}
.hero__copy {
  grid-column: 1;
  grid-row: 3;
  position: relative;
  z-index: 5;
  max-width: 31rem;
  align-self: end;
}
.hero__copy p {
  margin: 0 0 1.4rem;
  font-size: clamp(0.95rem, 1.25vw, 1.1rem);
}
.hero__cta {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem 1.6rem;
}
.hero__link {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 5px;
}
@media (max-width: 800px) {
  .hero {
    --fs: min(15.4vw, 13svh);
    padding-top: 5.6rem;
    height: auto;
    min-height: max(100svh, 38rem);
  }
  .hero__eyebrow {
    font-size: 0.64rem;
  }
  .hero__stage {
    grid-row: 2;
    height: clamp(22rem, calc(100svh - 24rem), 48rem);
    margin-top: 1.2rem;
  }
  .hero__copy {
    grid-row: 3;
    max-width: none;
    margin-top: 0.8rem;
  }
  .hero__copy p {
    margin-bottom: 1rem;
  }
  .hero__cta {
    flex-wrap: wrap;
  }
  .hero__pic {
    margin-left: 0;
  }
  .hero__gl--a {
    top: 0;
  }
}
</style>
