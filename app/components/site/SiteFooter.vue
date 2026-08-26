<script setup lang="ts">
import { navLinks, profile } from '~/data/profile'
</script>

<template>
  <footer class="grid-lines border-t border-border px-6 py-14 md:px-14">
    <div class="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div>
        <div
          class="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-foreground"
        >
          <span class="hero-mark-dot block h-2.5 w-2.5 rounded-[2px] bg-primary" />
          {{ profile.name }}
        </div>
        <p class="mt-3 max-w-[38ch] text-sm text-muted-foreground">
          {{ profile.role }} · Vue 3, Nuxt, TypeScript. {{ profile.city }}.
        </p>
      </div>

      <nav class="flex flex-wrap gap-x-7 gap-y-3">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <AppButton
          variant="outline-muted"
          size="icon-lg"
          :href="profile.github"
          external
          icon="github"
          aria-label="GitHub"
        />

        <AppButton
          variant="outline-muted"
          size="icon-lg"
          :href="profile.telegram"
          external
          icon="send"
          aria-label="Telegram"
        />

        <AppButton
          variant="outline-muted"
          size="icon-lg"
          :href="`mailto:${profile.email}`"
          icon="mail"
          aria-label="Почта"
        />

        <AppButton
          variant="primary"
          size="icon-lg"
          icon="arrow-up"
          aria-label="Наверх"
          @click="scrollToTop"
        />
      </div>
    </div>

    <div
      class="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
    >
      <span>© 2017 - {{ new Date().getFullYear() }} {{ profile.fullName }}</span>
    </div>
  </footer>
</template>
