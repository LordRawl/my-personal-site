<script setup lang="ts">
import { nav } from '~/data/navigation'
import { profile } from '~/data/profile'

const { open: menuOpen, active, toggle } = useSiteMenu()
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
</style>
