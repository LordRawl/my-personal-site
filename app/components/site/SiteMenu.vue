<script setup lang="ts">
import { nav } from '~/data/navigation'
import { profile } from '~/data/profile'

const { open, active, origin } = useSiteMenu()
const smooth = useSmoothScroll()
const panel = ref<HTMLElement | null>(null)

const focusables = () =>
  Array.from(
    panel.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
  )

const lock = (locked: boolean) => {
  if (import.meta.server) return
  if (smooth.active()) {
    if (locked) smooth.stop()
    else smooth.start()
  } else {
    document.body.style.overflow = locked ? 'hidden' : ''
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    open.value = false
    return
  }
  if (e.key !== 'Tab') return
  const items = focusables()
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

let media: MediaQueryList | null = null
const onMedia = (e: MediaQueryListEvent) => {
  if (e.matches) open.value = false
}

watch(open, async (isOpen) => {
  if (import.meta.server) return
  lock(isOpen)
  if (isOpen) {
    await nextTick()
    window.setTimeout(() => focusables()[0]?.focus(), 120)
  } else {
    document.querySelector<HTMLElement>('.header__burger')?.focus()
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  media = window.matchMedia('(min-width: 1024px)')
  media.addEventListener('change', onMedia)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  media?.removeEventListener('change', onMedia)
  lock(false)
})
</script>

<template>
  <div
    id="site-menu"
    ref="panel"
    class="menu"
    :class="{ 'is-open': open }"
    :inert="open ? null : ''"
    :style="{ '--bx': `${origin.x}px`, '--by': `${origin.y}px` }"
    role="dialog"
    aria-modal="true"
    aria-label="Навигация по разделам"
  >
    <nav class="menu__nav" aria-label="Разделы">
      <ol class="menu__list">
        <li v-for="(item, i) in nav" :key="item.id" class="menu__item">
          <a
            class="menu__link"
            :class="{ 'is-current': active === item.id }"
            :style="{ '--i': i }"
            :href="`#${item.id}`"
            :aria-current="active === item.id ? 'true' : undefined"
          >
            <small class="menu__num">{{ item.num }}</small>
            <span class="menu__label">{{ item.label }}</span>
          </a>
        </li>
      </ol>
    </nav>

    <div class="menu__footer">
      <a class="btn" :href="profile.telegram" target="_blank" rel="noreferrer">
        Написать в Telegram
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
    </div>
  </div>
</template>

<style>
.menu {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: var(--bg2);
  color: var(--cream);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 6.5rem max(20px, env(safe-area-inset-right, 0px))
    max(1.75rem, env(safe-area-inset-bottom, 0px))
    max(20px, env(safe-area-inset-left, 0px));
  clip-path: circle(0px at var(--bx, 85%) var(--by, 40px));
  visibility: hidden;
  transition:
    clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1),
    visibility 0s 0.85s;
  overflow-y: auto;
}
.menu.is-open {
  clip-path: circle(160vmax at var(--bx, 85%) var(--by, 40px));
  visibility: visible;
  transition:
    clip-path 0.95s cubic-bezier(0.76, 0, 0.24, 1),
    visibility 0s;
}
@media (min-width: 1024px) {
  .menu {
    display: none;
  }
}
.menu__nav {
  display: block;
}
.menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.1rem;
}
.menu__item {
  display: block;
}
.menu__link {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding: 0.2rem 0;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
}
.menu__num {
  font: 700 0.8rem var(--fm);
  letter-spacing: 0.06em;
  min-width: 1.6rem;
  color: var(--hot);
}
.menu__label {
  display: block;
  font: 900 clamp(2.2rem, 10vw, 5rem)/1.08 var(--fd);
  text-transform: uppercase;
  color: var(--cream);
  transition: color 0.45s ease;
  transform: translateY(105%);
}
.menu.is-open .menu__label {
  transform: none;
  transition:
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) calc(0.28s + var(--i) * 0.06s),
    color 0.45s ease;
}
.menu__link.is-current .menu__label,
.menu__link:focus-visible .menu__label {
  color: var(--hot);
}
@media (hover: hover) {
  .menu__link:hover .menu__label {
    color: var(--hot);
  }
}
.menu__footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.menu.is-open .menu__footer {
  opacity: 1;
  transition: opacity 0.6s ease 0.7s;
}
@media (prefers-reduced-motion: reduce) {
  .menu,
  .menu.is-open {
    transition: none;
    clip-path: none;
  }
  .menu:not(.is-open) {
    display: none;
  }
  .menu__label,
  .menu.is-open .menu__label {
    transform: none;
    transition: none;
  }
}
</style>
