<script setup lang="ts">
import { nav } from '~/data/navigation'
import { profile } from '~/data/profile'

const nameEl = ref<HTMLElement | null>(null)
const shown = ref(false)

const letters = computed(() => {
  let letter = 0
  return Array.from(profile.name).map((char) => {
    const space = char === ' '
    return { char, space, index: space ? -1 : letter++ }
  })
})

let fitTimer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | undefined

const fit = () => {
  const fn = nameEl.value
  const parent = fn?.parentElement
  if (!fn || !parent) return
  fn.style.marginLeft = ''
  fn.style.marginRight = ''
  fn.style.fontSize = '100px'
  const style = getComputedStyle(fn)
  const canvas = document.createElement('canvas').getContext('2d')
  if (!canvas) return
  const chars = Array.from(fn.textContent?.toUpperCase() ?? '')
  canvas.font = `${style.fontWeight} 100px ${style.fontFamily}`
  const advance = Array.from(fn.children).reduce(
    (sum, child) => sum + child.getBoundingClientRect().width,
    0,
  )
  const first = canvas.measureText(chars[0])
  const last = canvas.measureText(chars[chars.length - 1])
  const leftGap = -first.actualBoundingBoxLeft
  const rightGap = last.width - last.actualBoundingBoxRight
  const parentStyle = getComputedStyle(parent)
  const width =
    parent.clientWidth -
    parseFloat(parentStyle.paddingLeft) -
    parseFloat(parentStyle.paddingRight)
  const size = (100 * width) / (advance - leftGap - rightGap)
  fn.style.fontSize = `${size}px`
  fn.style.marginLeft = `${(-leftGap * size) / 100}px`
  fn.style.marginRight = `${(-rightGap * size) / 100}px`
}

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  document.fonts?.ready.then(fit)
  fitTimer = setTimeout(fit, 1500)

  const fn = nameEl.value
  if (!fn) return
  observer = new IntersectionObserver(
    (entries, instance) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        shown.value = true
        instance.disconnect()
      }
    },
    { threshold: 0.5 },
  )
  observer.observe(fn)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', fit)
  if (fitTimer) clearTimeout(fitTimer)
  observer?.disconnect()
})
</script>

<template>
  <footer id="footer" class="footer tone tone--dark">
    <SectionSeam fx="wave" from="light" to="dark" flip shift="calc(var(--H) * .12)" />

    <div class="container">
      <div class="footer__top">
        <p class="footer__copyright">© 2017 - 2026 Есин Иван Павлович</p>
        <nav class="footer__nav" aria-label="Футер">
          <a
            v-for="item in nav"
            :key="item.id"
            class="footer__nav-link"
            :href="`#${item.id}`"
            >{{ item.label }}</a
          >
        </nav>
      </div>

      <div
        ref="nameEl"
        class="footer__name"
        :class="{ 'is-on': shown }"
        aria-hidden="true"
      >
        <span v-for="(letter, i) in letters" :key="i" class="footer__char">
          <i v-if="!letter.space" :style="{ '--i': letter.index }">{{ letter.char }}</i>
          <template v-else>&nbsp;</template>
        </span>
      </div>
    </div>
  </footer>
</template>

<style>
.footer__top {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'cp nav';
  align-items: center;
  gap: 0.6rem 2rem;
  padding: 2rem 0 0;
}
.footer__copyright {
  grid-area: cp;
  margin: 0;
  color: var(--mut);
  font: 500 0.8rem var(--fm);
}
.footer__nav {
  grid-area: nav;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-self: flex-start;
}
.footer__nav-link {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  border: 2px solid var(--bd);
  font: 700 0.8rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: color 0.4s;
}
.footer__nav-link::before {
  content: '';
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: 0;
  height: 180%;
  background: var(--fg);
  border-radius: 50% 50% 0 0;
  transform: translateY(102%);
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.5s;
  z-index: -1;
}
.footer__nav-link:hover::before,
.footer__nav-link:focus-visible::before {
  transform: none;
  border-radius: 0;
}
.footer__nav-link:hover,
.footer__nav-link:focus-visible {
  color: var(--bg);
}
.footer__name {
  overflow: clip;
  margin: 0.5rem 0 0;
  padding-bottom: 0;
  font: 700 100px/0.86 var(--disp);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  user-select: none;
  color: var(--fg);
}
.footer__char {
  display: inline-block;
  clip-path: inset(-0.6em -0.3em 0 -0.3em);
}
.footer__char i {
  display: inline-block;
  font-style: normal;
  transform: translateY(110%);
}
.footer__name.is-on .footer__char i {
  transform: none;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 0.07s);
}
@media (max-width: 800px) {
  .footer__top {
    grid-template-columns: 1fr;
    grid-template-areas: 'nav' 'cp';
  }
}
</style>
