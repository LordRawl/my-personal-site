<script setup lang="ts">
import { experience, education } from '~/data/experience'

const openIndex = ref<number | null>(0)

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section
    id="experience"
    class="screen grid-lines border-t border-border px-6 py-24 md:px-14 md:py-32 lg:py-10"
  >
    <SectionHeading index="04" eyebrow="Опыт работы">
      <template #title> Девять лет <span class="text-primary">в проде</span> </template>
      <template #note>
        Таймлайн: от вёрстки сайтов до высоконагруженных интерфейсов и внутренней дизайн-системы.
      </template>
    </SectionHeading>

    <div class="relative">
      <span
        class="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-border md:block"
        aria-hidden="true"
      />

      <div class="space-y-4">
        <div
          v-for="(item, i) in experience"
          :key="item.company"
          class="reveal relative border-b-0 md:pl-12"
          :style="{ transitionDelay: `${90 + i * 90}ms` }"
        >
          <span
            class="absolute left-0 top-7 hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-border bg-background md:flex"
            aria-hidden="true"
          >
            <span
              :class="
                openIndex === i
                  ? 'hero-mark-dot block h-[7px] w-[7px] rounded-full bg-primary'
                  : 'block h-[7px] w-[7px] rounded-full bg-border'
              "
            />
          </span>

          <div
            class="overflow-hidden rounded-md border transition-colors duration-300 hover:border-primary/40"
            :class="openIndex === i ? 'border-border bg-card' : 'border-border bg-card'"
          >
            <h3 class="flex">
              <button
                type="button"
                :aria-expanded="openIndex === i"
                class="flex flex-1 items-center justify-between px-6 py-[clamp(0.9rem,2.2vh,1.5rem)] cursor-pointer text-left font-medium transition-all hover:no-underline md:px-8 [&[aria-expanded=true]>svg]:rotate-180"
                @click="toggle(i)"
              >
                <div
                  class="flex w-full flex-col gap-3 pr-4 md:flex-row md:items-center md:justify-between md:gap-8"
                >
                  <div>
                    <div class="flex flex-wrap items-center gap-3">
                      <span
                        class="font-display text-lg font-semibold tracking-tight text-foreground"
                      >
                        {{ item.company }}
                      </span>
                      <span
                        v-if="item.current"
                        class="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground"
                      >
                        сейчас
                      </span>
                    </div>
                    <p class="mt-1.5 text-sm text-muted-foreground">
                      {{ item.role }} · {{ item.place }}
                    </p>
                  </div>
                  <div class="text-left md:text-right">
                    <div class="font-body text-sm text-foreground">
                      {{ periodLabel(item.period) }}
                    </div>
                    <div class="mt-1 text-xs text-muted-foreground">
                      {{ periodDuration(item.period) }}
                    </div>
                  </div>
                </div>
                <AppIcon
                  name="chevron-down"
                  :size="16"
                  class="h-4 w-4 shrink-0 transition-transform duration-200"
                />
              </button>
            </h3>

            <div
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :style="{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }"
            >
              <div class="overflow-hidden">
                <div class="px-6 pb-7 pt-0 md:px-8">
                  <div
                    class="mb-5 border-t border-border pt-5 font-display text-xs uppercase tracking-[0.14em] text-primary"
                  >
                    {{ item.stack }}
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="point in item.points"
                      :key="point"
                      class="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <AppIcon name="minus" :size="15" class="mt-1 flex-none text-primary" />
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="reveal mt-[clamp(1.5rem,4vh,3.5rem)] grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3"
      style="transition-delay: 450ms"
    >
      <div class="bg-card p-[clamp(1.1rem,2.6vh,1.75rem)]">
        <div class="flex items-center gap-3 text-primary">
          <AppIcon name="graduation-cap" />
          <span class="font-display text-sm font-semibold uppercase tracking-[0.14em]"
            >Образование</span
          >
        </div>
        <p class="mt-4 text-sm leading-relaxed text-foreground">{{ education.university }}</p>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ education.faculty }}, {{ education.year }}
        </p>
      </div>

      <div class="bg-card p-[clamp(1.1rem,2.6vh,1.75rem)]">
        <div class="flex items-center gap-3 text-primary">
          <AppIcon name="book-open" />
          <span class="font-display text-sm font-semibold uppercase tracking-[0.14em]">Курсы</span>
        </div>
        <ul class="mt-4 space-y-2">
          <li
            v-for="course in education.courses"
            :key="course"
            class="text-sm leading-relaxed text-muted-foreground"
          >
            {{ course }}
          </li>
        </ul>
      </div>

      <div class="bg-card p-[clamp(1.1rem,2.6vh,1.75rem)]">
        <div class="flex items-center gap-3 text-primary">
          <AppIcon name="languages" />
          <span class="font-display text-sm font-semibold uppercase tracking-[0.14em]">Языки</span>
        </div>
        <ul class="mt-4 space-y-2">
          <li v-for="lang in education.languages" :key="lang" class="text-sm text-muted-foreground">
            {{ lang }}
          </li>
        </ul>
        <p class="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
          Рекомендации от руководителей Skycoach и Like Центр — по запросу.
        </p>
      </div>
    </div>
  </section>
</template>
