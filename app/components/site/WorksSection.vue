<script setup lang="ts">
import { projects } from '~/data/projects'
import type { Project } from '~/types/site'

const emit = defineEmits<{ open: [project: Project] }>()
</script>

<template>
  <section
    id="works"
    class="screen grid-lines border-t border-border px-6 py-24 md:px-14 md:py-32 lg:py-10"
  >
    <SectionHeading index="03" eyebrow="Проекты / портфолио">
      <template #title> Что я <span class="text-primary">делал</span> руками </template>
      <template #note>
        Шесть ключевых проектов 2017—2026 годов. Нажмите на карточку — внутри детали задачи и стек.
      </template>
    </SectionHeading>

    <div
      class="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        class="reveal"
        :style="{ transitionDelay: `${90 + i * 90}ms` }"
      >
        <button
          class="min-h-full min-w-full group cursor-pointer relative flex flex-col items-start gap-[clamp(0.7rem,1.8vh,1.25rem)] bg-card p-7 text-left transition-colors duration-300 hover:bg-secondary md:p-[clamp(1.1rem,2.6vh,2rem)]"
          @click="emit('open', project)"
        >
          <span
            class="absolute right-6 top-6 font-display text-xs tabular-nums text-muted-foreground/60"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <span
            class="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-primary"
          >
            {{ project.tag }}
          </span>

          <h3
            class="max-w-[22ch] font-display text-xl font-semibold leading-snug tracking-tight text-foreground"
          >
            {{ project.title }}
          </h3>

          <p class="text-sm leading-relaxed text-muted-foreground">{{ project.summary }}</p>

          <div class="mt-auto w-full space-y-4 pt-4">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.stack.slice(0, 4)"
                :key="tech"
                class="rounded-sm bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground transition-colors group-hover:text-foreground"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex items-center justify-between border-t border-border pt-4">
              <span class="text-xs text-muted-foreground"
                >{{ project.company }} · {{ project.year }}</span
              >
              <span
                class="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-primary"
              >
                Подробнее

                <AppIcon
                  name="arrow-right"
                  :size="13"
                  class="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
