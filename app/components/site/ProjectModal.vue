<script setup lang="ts">
import type { Project } from '~/types/site'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{ close: [] }>()

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  (value) => {
    if (import.meta.client) {
      document.body.style.overflow = value ? 'hidden' : ''
    }
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-overlay">
      <div v-if="project" class="fixed inset-0 z-50 bg-black/80" @click.self="emit('close')" />
    </Transition>

    <Transition name="modal-content">
      <div
        v-if="project"
        role="dialog"
        aria-modal="true"
        class="fixed left-[50%] top-[50%] z-50 grid max-h-[86vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto border border-border bg-card p-6 shadow-lg sm:rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <span
            class="mb-2 inline-flex w-fit items-center rounded-full border border-primary/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-primary"
          >
            {{ project.tag }}
          </span>
          <h2
            class="text-left font-display text-2xl font-bold leading-snug tracking-tight text-foreground"
          >
            {{ project.title }}
          </h2>
          <p class="text-sm text-left text-muted-foreground">
            {{ project.company }} · {{ project.year }}
          </p>
        </div>

        <p class="text-[15px] leading-relaxed text-foreground/90">{{ project.summary }}</p>

        <div class="rounded-md border border-border bg-secondary px-5 py-4">
          <div class="font-display text-2xl font-bold text-primary">{{ project.metric.value }}</div>
          <div class="mt-1 text-sm text-muted-foreground">{{ project.metric.label }}</div>
        </div>

        <p class="leading-snug tracking-tight text-foreground font-bold text-sm">Мой вклад:</p>

        <ul class="space-y-3">
          <li
            v-for="detail in project.details"
            :key="detail"
            class="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <AppIcon name="chevron-right" :size="16" class="mt-0.5 flex-none text-primary" />
            <span>{{ detail }}</span>
          </li>
        </ul>

        <div class="flex flex-wrap gap-2 border-t border-border pt-5">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-sm bg-secondary px-2.5 py-1.5 text-xs text-foreground"
          >
            {{ tech }}
          </span>
        </div>

        <AppButton
          variant="bare"
          icon="x"
          class="absolute right-4 top-4"
          aria-label="Закрыть"
          @click="emit('close')"
        />
      </div>
    </Transition>
  </Teleport>
</template>
