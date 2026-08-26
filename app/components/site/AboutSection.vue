<script setup lang="ts">
import { stats, features } from '~/data/about'
</script>

<template>
  <section
    id="about"
    class="screen grid-lines border-t border-border px-6 py-24 md:px-14 md:py-32 lg:py-10"
  >
    <SectionHeading index="01" eyebrow="Обо мне">
      <template #title>
        От вёрстки до <span class="text-primary">архитектуры</span>: что я приношу команде
      </template>
      <template #note>
        Фронтенд-разработчик с 9+ годами опыта: прошёл путь от вёрстки до продуктовой разработки и
        реализовал больше 80 проектов — от лендингов до порталов.
      </template>
    </SectionHeading>

    <div class="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
      <div class="space-y-[clamp(0.75rem,2vh,1.5rem)]">
        <p
          class="reveal text-[1.05rem] leading-relaxed text-foreground/90"
          style="transition-delay: 90ms"
        >
          Убеждён, что отличный интерфейс — это сочетание продуманного UX, живой ненавязчивой
          анимации и чистого, протестированного кода. Стремлюсь к минималистичным и производительным
          решениям, минимизируя количество сторонних библиотек.
        </p>
        <p class="reveal leading-relaxed text-muted-foreground" style="transition-delay: 180ms">
          Понимаю баланс между техническим перфекционизмом и необходимостью быстро закрывать
          бизнес-потребности. Рассматриваю Senior-позиции в продуктовых командах: углубление в
          архитектуру с перспективой Tech Lead.
        </p>

        <div
          class="reveal grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4"
          style="transition-delay: 270ms"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-card px-5 py-[clamp(0.9rem,2.4vh,1.5rem)]"
          >
            <div class="font-display text-2xl font-bold tracking-tight text-primary">
              {{ stat.value }}
            </div>
            <div class="mt-2 text-xs leading-snug text-muted-foreground">{{ stat.label }}</div>
          </div>
        </div>

        <div class="reveal flex flex-wrap items-center gap-4 pt-2" style="transition-delay: 360ms">
          <AppButton
            size="md"
            variant="outline-muted"
            href="https://cdn.poehali.dev/projects/9373486b-8e69-4402-921f-18c7875ec1f7/bucket/e83e94cf-dad1-4c79-ba4b-ad83582fe97b.pdf"
            external
            prefix-icon="file-text"
          >
            Скачать резюме PDF
          </AppButton>
        </div>
      </div>

      <div
        class="reveal grid gap-px overflow-hidden rounded-md border transition-colors duration-300 border-border sm:grid-cols-2 lg:grid-cols-1"
      >
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="reveal group relative bg-card p-[clamp(1rem,2.4vh,1.5rem)] transition-colors duration-300 hover:bg-secondary"
          :style="{ transitionDelay: `${50 + i * 90}ms` }"
        >
          <div class="flex items-start gap-4">
            <span
              class="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-md border border-border text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <AppIcon :name="feature.icon" />
            </span>
            <div>
              <h3 class="font-display text-base font-semibold text-foreground">
                {{ feature.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
