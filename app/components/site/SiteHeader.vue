<script setup lang="ts">
import { nav } from '~/data/navigation'
import { profile } from '~/data/profile'

const { open: menuOpen, active, toggle } = useSiteMenu()
const { isLight, toggle: toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <a class="header__logo" href="#top" aria-label="На главную">
      <span class="header__roll"><b class="header__roll-text" data-t="ИЕ">ИЕ</b></span>
    </a>

    <nav class="header__nav" aria-label="Основная навигация">
      <a
        v-for="item in nav"
        :key="item.id"
        class="header__nav-link"
        :class="{ 'is-on': active === item.id }"
        :href="`#${item.id}`"
        :aria-current="active === item.id ? 'true' : undefined"
        >{{ item.label }}</a
      >
    </nav>

    <div class="header__actions">
      <button
        class="header__theme"
        type="button"
        :aria-label="isLight ? 'Включить тёмную тему' : 'Включить светлую тему'"
        :aria-pressed="isLight"
        @click="toggleTheme"
      >
        <svg
          class="header__theme-sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path
            d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7"
          />
        </svg>
        <svg
          class="header__theme-moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.2 8.2 0 1 0 20 14.2z" />
        </svg>
      </button>
      <a
        class="btn btn--sm"
        :href="profile.telegram"
        target="_blank"
        rel="noreferrer"
      >
        Telegram
        <svg
          class="arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
      <button
        class="header__burger"
        type="button"
        aria-controls="site-menu"
        :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="menuOpen"
        @click="toggle"
      >
        <span class="header__burger-bars" aria-hidden="true">
          <i class="header__burger-bar" />
          <i class="header__burger-bar" />
          <i class="header__burger-bar" />
        </span>
      </button>
    </div>
  </header>
</template>

<style>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: calc(1rem + env(safe-area-inset-top, 0px)) var(--pad) 0;
  pointer-events: none;
}
.header > * {
  pointer-events: auto;
  background: rgba(11, 7, 5, 0.78);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: var(--cream);
  border-radius: 999px;
}
.header__logo {
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 0.95rem;
  border-radius: 16px;
  font: 700 1.15rem var(--fd);
  letter-spacing: -0.02em;
  text-decoration: none;
  overflow: hidden;
  transition:
    background-color 0.35s,
    color 0.35s;
}
.header__roll {
  display: block;
  overflow: hidden;
  line-height: 1.25;
}
.header__roll-text {
  display: block;
  position: relative;
  font-weight: inherit;
  transition: transform 0.5s var(--ease);
}
.header__roll-text::after {
  content: attr(data-t);
  position: absolute;
  left: 0;
  top: 100%;
}
.header__logo:focus-visible .header__roll-text {
  transform: translateY(-100%);
}
@media (hover: hover) {
  .header__logo:hover {
    background: var(--hot);
    color: #fff;
  }
  .header__logo:hover .header__roll-text {
    transform: translateY(-100%);
  }
}
.header__nav {
  display: none;
  padding: 6px;
  gap: 2px;
}
.header__nav-link {
  display: inline-flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 1.1rem;
  border-radius: 999px;
  font: 700 0.8rem var(--fm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mute);
  text-decoration: none;
  transition:
    background-color 0.35s,
    color 0.35s;
}
@media (hover: hover) {
  .header__nav-link:hover {
    background: rgba(243, 233, 223, 0.12);
    color: #fff;
  }
}
.header__nav-link:focus-visible {
  outline-offset: 0;
}
.header__nav-link.is-on {
  background: var(--hot);
  color: #fff;
}
@media (min-width: 1024px) {
  .header__nav {
    display: flex;
  }
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
}
.header__theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 2px solid rgba(243, 233, 223, 0.28);
  border-radius: 50%;
  background: transparent;
  color: var(--cream);
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;
}
.header__theme svg {
  width: 18px;
  height: 18px;
}
.header__theme-sun {
  display: none;
}
html[data-theme='light'] .header__theme-sun {
  display: block;
}
html[data-theme='light'] .header__theme-moon {
  display: none;
}
@media (hover: hover) {
  .header__theme:hover {
    background: var(--hot);
    border-color: var(--hot);
    color: #fff;
  }
}
.header__theme:focus-visible {
  outline: 2px solid var(--hot);
  outline-offset: 2px;
}
.header__burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 2px solid rgba(243, 233, 223, 0.28);
  border-radius: 50%;
  background: transparent;
  color: var(--cream);
}
.header__burger-bars {
  position: relative;
  width: 18px;
  height: 14px;
}
.header__burger-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition:
    transform 0.5s var(--ease),
    top 0.5s var(--ease);
}
.header__burger-bar:nth-child(1) {
  top: 0;
}
.header__burger-bar:nth-child(2) {
  top: 6px;
}
.header__burger-bar:nth-child(3) {
  top: 12px;
}
.header__burger[aria-expanded='true'] .header__burger-bar:nth-child(2) {
  transform: scaleX(0);
}
.header__burger[aria-expanded='true'] .header__burger-bar:nth-child(1) {
  top: 6px;
  transform: rotate(45deg);
}
.header__burger[aria-expanded='true'] .header__burger-bar:nth-child(3) {
  top: 6px;
  transform: rotate(-45deg);
}
@media (max-width: 1023px) {
  .header__burger {
    display: inline-flex;
  }
}
html[data-theme='light'] .header > * {
  background: rgba(246, 238, 228, 0.82);
  color: var(--dk);
}
html[data-theme='light'] .header__theme,
html[data-theme='light'] .header__burger {
  border-color: rgba(11, 7, 5, 0.28);
  color: var(--dk);
}
@media (hover: hover) {
  html[data-theme='light'] .header__logo:hover,
  html[data-theme='light'] .header__theme:hover {
    background: var(--hot);
    border-color: var(--hot);
    color: #fff;
  }
  html[data-theme='light'] .header__nav-link:hover {
    background: rgba(11, 7, 5, 0.08);
    color: var(--dk);
  }
}
</style>
