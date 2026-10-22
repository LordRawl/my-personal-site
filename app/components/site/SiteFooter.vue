<script setup lang="ts">
import { profile } from '~/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__shut" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#0b0705" d="M0 12Q10 0 20 12V100H0Z" />
        <path fill="#0b0705" d="M20 6Q30 -4 40 6V100H20Z" />
        <path fill="#0b0705" d="M40 14Q50 2 60 14V100H40Z" />
        <path fill="#0b0705" d="M60 8Q70 -2 80 8V100H60Z" />
        <path fill="#0b0705" d="M80 12Q90 0 100 12V100H80Z" />
      </svg>
    </div>

    <div class="footer__row">
      <strong class="footer__brand">Иван Есин</strong>
      <span class="mono">Frontend-разработчик · Vue 3, Nuxt, TypeScript</span>
    </div>

    <nav class="mono footer__nav" aria-label="Футер">
      <a href="#about">Обо мне</a>
      <a href="#works">Проекты</a>
      <a href="#stack">Стек</a>
      <a href="#experience">Опыт</a>
      <a href="#contacts">Контакты</a>
    </nav>

    <p class="mono footer__copy">© 2017 - {{ year }} {{ profile.fullName }}</p>
  </footer>
</template>

<style>
.footer {
  position: relative;
  background: var(--bg);
  padding: 3rem var(--pad) 2rem;
  display: grid;
  gap: 1.4rem;
}
.footer__shut {
  position: absolute;
  left: 0;
  right: 0;
  top: -20vh;
  height: 20vh;
  pointer-events: none;
  overflow: hidden;
}
.footer__shut svg {
  width: 100%;
  height: 100%;
  display: block;
}
.footer__row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer__brand {
  font-family: var(--fd);
}
.footer__nav {
  display: flex;
  flex-wrap: wrap;
}
</style>
