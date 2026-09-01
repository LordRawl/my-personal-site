<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="hero" class="hero-scene grid-lines">
    <div
      class="grid flex-1 items-center gap-12 px-6 pb-16 pt-28 md:gap-[72px] md:px-14 md:pb-10 md:pt-24 lg:grid-cols-[1.06fr_0.94fr]"
    >
      <div class="copy">
        <div class="hero-eyebrow hero-fade hero-d2 mb-7 text-muted-foreground">
          <span>
            {{ profile.role }} ·
            <nobr>Vue 3 / Nuxt</nobr>
          </span>
        </div>

        <h1 class="hero-title font-display font-bold text-foreground">
          <span class="ln">
            <span> Разработка</span>
          </span>

          <span class="ln">
            <span>и&nbsp;проектирование</span>
          </span>

          <span class="ln">
            <span> <em class="not-italic text-primary">интерфейсов</em></span>
          </span>

          <span class="sr-only">
            &nbsp;— резюме Ивана Есина, фронтенд-разработчика на&nbsp;Vue и&nbsp;Nuxt
          </span>
        </h1>

        <p
          class="hero-fade hero-d3 mt-7 max-w-[53ch] text-lg leading-relaxed text-muted-foreground font-bold"
        >
          9&nbsp;лет в&nbsp;frontend-разработке, 80+&nbsp;проектов — от&nbsp;одностраничных
          лендингов до&nbsp;высоконагруженных систем с&nbsp;тысячами элементов на&nbsp;экране.
        </p>

        <div class="hero-fade hero-d4 mt-10 flex flex-wrap items-center gap-5">
          <AppButton :href="profile.telegram" external size="lg" suffix-icon="arrow-right">
            Написать в&nbsp;Telegram
          </AppButton>
        </div>
      </div>

      <div class="stage-wrap mx-auto hidden lg:block" aria-hidden="true">
        <div class="stage">
          <div
            class="flex items-baseline justify-between border-b border-border pb-3.5 text-[0.7em] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span>Сетка</span>
            <b class="font-bold tracking-[0.12em] text-accent">идёт пересборка</b>
          </div>
          <div class="stage-row r1">
            <div class="stage-cell c1" />
            <div class="stage-cell c2" />
          </div>
          <div class="stage-row r2">
            <div class="stage-cell c1" />
            <div class="stage-cell c2" />
            <div class="stage-cell c3" />
          </div>
          <div class="stage-row r3">
            <div class="stage-cell c1" />
            <div class="stage-cell c2" />
          </div>
          <div
            class="flex justify-between border-t border-border pt-3 text-[0.72em] text-muted-foreground"
          >
            <span>1280 → 320</span>
            <span>60 fps</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hero-fade hero-d4 flex items-center justify-between border-t border-border px-6 py-5 text-xs uppercase tracking-[0.22em] text-muted-foreground md:px-14"
    >
      <a
        href="#about"
        aria-label="Листать к разделу «Обо мне»"
        class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground ml-auto"
        @click.prevent="scrollToSection('about')"
      >
        <span class="hidden sm:inline">Листать</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
          <path
            class="float-y"
            d="M6 2v14M1.5 11.5 6 16.5l4.5-5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>
</template>
