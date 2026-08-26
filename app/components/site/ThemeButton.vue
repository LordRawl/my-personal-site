<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<template>
  <AppButton
    variant="outline"
    size="icon"
    :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
    :title="isDark ? 'Светлая тема' : 'Тёмная тема'"
    @click="toggle"
  >
    <svg
      width="var(--text-base)"
      height="var(--text-base)"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      aria-hidden="true"
      :style="{
        transform: isDark ? 'rotate(0deg)' : 'rotate(90deg)',
        transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)',
      }"
    >
      <g
        :style="{
          opacity: isDark ? 0 : 1,
          transformOrigin: 'center',
          transform: isDark ? 'scale(0.4)' : 'scale(1)',
          transition: 'opacity 0.3s ease, transform 0.5s cubic-bezier(.2,.7,.2,1)',
        }"
      >
        <circle cx="12" cy="12" r="4.3" />
        <path
          d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        />
      </g>
      <path
        d="M20 13.2A8.2 8.2 0 0 1 10.8 4a8.6 8.6 0 1 0 9.2 9.2Z"
        fill="currentColor"
        stroke="none"
        :style="{
          opacity: isDark ? 1 : 0,
          transformOrigin: 'center',
          transform: isDark ? 'scale(1)' : 'scale(0.4)',
          transition: 'opacity 0.3s ease, transform 0.5s cubic-bezier(.2,.7,.2,1)',
        }"
      />
    </svg>
  </AppButton>
</template>

<style scoped></style>
