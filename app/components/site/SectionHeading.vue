<script setup lang="ts">
defineProps<{
  index: string
  eyebrow: string
}>()
</script>

<template>
  <div class="reveal mb-12 md:mb-16 lg:mb-[clamp(1.5rem,4vh,3rem)]" style="transition-delay: 0ms">
    <div
      class="flex items-center gap-4 text-[0.72rem] font-bold uppercase tracking-[0.26em] text-muted-foreground"
    >
      <span class="text-primary">{{ index }}</span>
      <span class="block h-px w-12 bg-border" />
      {{ eyebrow }}
    </div>
    <h2
      class="mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.06] tracking-[-0.035em] text-foreground lg:mt-[clamp(0.75rem,2vh,1.5rem)]"
    >
      <slot name="title" />
    </h2>
    <p
      v-if="$slots.note"
      class="mt-4 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted-foreground lg:mt-[clamp(0.5rem,1.6vh,1.25rem)]"
    >
      <slot name="note" />
    </p>
  </div>
</template>
