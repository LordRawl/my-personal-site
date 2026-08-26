<script setup lang="ts">
import { skillCategories, everydaySkills, marqueeItems } from '~/data/skills'
</script>

<template>
  <section
    id="stack"
    class="screen grid-lines border-t border-border px-6 py-24 md:px-14 md:py-32 lg:py-10"
  >
    <SectionHeading index="02" eyebrow="Стек и навыки">
      <template #title> Инструменты, которыми <span class="text-primary">работаю</span> </template>
    </SectionHeading>

    <div class="reveal rounded-md border border-border bg-card" style="transition-delay: 120ms">
      <div class="divide-y divide-border">
        <div
          v-for="(cat, i) in skillCategories"
          :key="cat.id"
          class="reveal flex flex-col gap-4 px-[clamp(1rem,2.4vh,1.75rem)] py-[clamp(0.65rem,1.4vh,1rem)] lg:flex-row lg:items-start lg:gap-10"
          :style="{ transitionDelay: `${50 + i * 90}ms` }"
        >
          <div
            class="flex w-full flex-none items-center gap-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:w-[220px]"
          >
            <AppIcon :name="cat.icon" :size="15" class="text-primary" />
            {{ cat.title }}
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in cat.items"
              :key="item"
              class="inline-flex cursor-default items-center gap-2 rounded-md bg-secondary px-3 py-1.5 font-display text-[13px] font-medium text-foreground transition-colors duration-300 hover:text-primary"
            >
              <span
                v-if="everydaySkills.includes(item)"
                class="hero-mark-dot block h-1.5 w-1.5 flex-none rounded-[2px] bg-primary"
              />
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="marquee reveal relative mt-[clamp(1.5rem,4vh,3rem)] overflow-hidden border-y border-border py-4"
      style="transition-delay: 590ms"
    >
      <div class="marquee-track">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0 items-center">
          <span
            v-for="item in marqueeItems"
            :key="`${copy}-${item}`"
            class="flex items-center gap-6 whitespace-nowrap px-6 font-display text-sm uppercase tracking-[0.18em] text-muted-foreground"
          >
            {{ item }}
            <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
              <rect width="7" height="7" rx="1.5" class="fill-primary spin-slow" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
