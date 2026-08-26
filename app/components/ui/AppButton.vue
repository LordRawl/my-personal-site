<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'outline-muted' | 'bare'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-lg'
  href?: string
  external?: boolean
  type?: 'button' | 'submit'
  icon?: string
  prefixIcon?: string
  suffixIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  href: undefined,
  external: false,
  type: 'button',
  icon: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
})

const ICON_SIZE_BY_SIZE: Record<NonNullable<Props['size']>, string | number | undefined> = {
  sm: 'calc(var(--text-xs--line-height) * 1em)',
  md: 'calc(var(--text-sm--line-height) * 1em)',
  lg: 'calc(var(--text-base--line-height) * 1em)',
  icon: 'var(--text-base)',
  'icon-lg': 'var(--text-lg)',
}

const iconSize = computed(() => ICON_SIZE_BY_SIZE[props.size])

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
  outline:
    'border border-border text-foreground hover:border-primary/50 hover:text-primary-foreground hover:bg-primary',
  'outline-muted':
    'border border-border text-muted-foreground hover:border-primary/50 hover:text-primary-foreground hover:bg-primary',
  bare: 'rounded-sm opacity-70 hover:opacity-100 ',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'gap-2 px-4 py-3 font-display text-xs',
  md: 'gap-2.5 px-6 py-3.5 font-display text-sm',
  lg: 'gap-3 px-6 py-4 font-display text-base tracking-tight',
  icon: 'h-10 w-10',
  'icon-lg': 'h-11 w-11',
}
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noreferrer noopener' : undefined"
    :type="props.href ? undefined : props.type"
    :class="[
      'rounded-md font-semibold inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
      variantClasses[props.variant],
      sizeClasses[props.size],
    ]"
  >
    <AppIcon v-if="props.prefixIcon" :name="props.prefixIcon" :size="iconSize" />

    <AppIcon v-if="props.icon" :name="props.icon" :size="iconSize" />

    <slot v-else />

    <AppIcon v-if="props.suffixIcon" :name="props.suffixIcon" :size="iconSize" />
  </component>
</template>
