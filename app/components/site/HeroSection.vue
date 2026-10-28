<template>
  <section class="hero page-section" aria-labelledby="hero-title">
    <h1 id="hero-title" class="sr">
      Frontend под ключ — разработка и проектирование интерфейсов, резюме Ивана Есина
    </h1>
    <p class="mono hero__eyebrow">Frontend-разработчик · Vue 3 · Nuxt · TypeScript</p>

    <div class="hero__stage">
      <div class="hero__word hero__word--back" aria-hidden="true">FRONTEND</div>
      <div class="hero__pic" style="--ph: url(/portrait.webp)">
        <i class="hero__plate" aria-hidden="true" />
        <img
          id="me"
          class="hero__photo"
          src="/portrait.webp"
          width="800"
          height="1586"
          alt="Иван Есин, frontend-разработчик"
        />
      </div>
      <div class="hero__word hero__word--front" aria-hidden="true">ПОД КЛЮЧ</div>
    </div>

    <div class="hero__copy">
      <p class="hero__text">
        Беру задачу целиком: от макета и архитектуры до продакшена. Vue 3, Nuxt,
        TypeScript — 9+ лет и 80+ проектов в проде.
      </p>
      <div class="hero__cta">
        <a class="btn btn--big" href="#works">Смотреть проекты ↓</a>
      </div>
    </div>

    <span class="section-num section-num--hero" aria-hidden="true">01</span>
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
  padding: 6.2rem var(--pad) 1.6rem;
}
.hero__eyebrow {
  color: var(--fg);
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 5;
}
.hero__stage {
  grid-column: 1;
  grid-row: 2/4;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 calc(var(--pad) * -1);
  min-height: 0;
}
.hero__word {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  font: 900 var(--fs)/0.92 var(--fd);
  letter-spacing: -0.04em;
  white-space: nowrap;
  text-align: center;
  pointer-events: none;
  user-select: none;
}
.hero__word--back {
  top: 2%;
  color: var(--ink);
  z-index: 1;
}
.hero__word--front {
  top: 50%;
  color: var(--acc);
  z-index: 3;
}
.hero__pic {
  position: relative;
  z-index: 2;
  height: 92%;
  aspect-ratio: 800/1586;
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
.hero__photo {
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
  -webkit-mask: var(--ph) center/100% 100% no-repeat;
  mask: var(--ph) center/100% 100% no-repeat;
  transform: translateX(0);
  will-change: transform;
}
.hero__copy {
  grid-column: 1;
  grid-row: 3;
  position: relative;
  z-index: 5;
  max-width: 31rem;
  align-self: end;
}
.hero__copy::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: -1.2rem -4rem -1rem calc(var(--pad) * -1);
  background: linear-gradient(90deg, rgba(11, 7, 5, 0.92) 38%, rgba(11, 7, 5, 0));
  pointer-events: none;
}
.hero__text {
  margin: 0 0 1.4rem;
  font-size: clamp(0.95rem, 1.25vw, 1.1rem);
}
.hero__cta {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem 1.6rem;
}
@media (max-width: 800px) {
  .hero {
    --fs: min(12vw, 13svh);
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
  .hero__text {
    margin-bottom: 1rem;
  }
  .hero__cta {
    flex-wrap: wrap;
  }
  .hero__pic {
    margin-left: 0;
  }
  .hero__word--back {
    top: 0;
  }
  .hero__word--front {
    top: 50%;
  }
}
</style>
