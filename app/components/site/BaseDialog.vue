<script setup lang="ts">
import { gsap } from 'gsap'
import { applyTypography } from '~/utils/typography'

const open = defineModel<boolean>({ default: false })

const props = defineProps<{
  labelledby: string
  origin?: { x: number; y: number }
}>()

const smooth = useSmoothScroll()
const el = ref<HTMLDialogElement | null>(null)
const reduce = import.meta.client
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

watch(open, async (value) => {
  const dialog = el.value
  if (!dialog) return
  if (!value) {
    if (dialog.open) dialog.close()
    document.body.style.overflow = ''
    smooth.start()
    return
  }

  await nextTick()
  if (!dialog.open) dialog.showModal()
  document.body.style.overflow = 'hidden'
  smooth.stop()
  applyTypography(dialog)
  if (reduce) return

  const rect = dialog.getBoundingClientRect()
  const x = (props.origin?.x ?? 0) - rect.left
  const y = (props.origin?.y ?? 0) - rect.top
  gsap.fromTo(
    dialog,
    { clipPath: `circle(0px at ${x}px ${y}px)` },
    {
      clipPath: `circle(150% at ${x}px ${y}px)`,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'clipPath',
    },
  )
})

onMounted(() => {
  const dialog = el.value
  if (!dialog) return
  dialog.addEventListener('close', () => {
    open.value = false
    document.body.style.overflow = ''
    smooth.start()
  })
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) open.value = false
  })
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  smooth.start()
})
</script>

<template>
  <dialog ref="el" class="dialog" data-lenis-prevent :aria-labelledby="labelledby">
    <slot />
  </dialog>
</template>

<style>
.dialog {
  border: 0;
  padding: 0;
  margin: auto;
  background: #f3e9df;
  color: #0b0705;
  width: min(46rem, 92vw);
  border-radius: 1.5rem;
  max-height: 88vh;
  overflow: auto;
}
.dialog--game {
  background: transparent;
  color: var(--cream);
  overflow: visible;
}
.dialog--game::backdrop {
  background: rgba(11, 7, 5, 0.9);
}
.dialog::backdrop {
  background: rgba(11, 7, 5, 0.78);
}
.dialog__body {
  padding: 2.4rem;
}
.dialog__close {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  float: right;
  background: #0b0705;
  color: #f3e9df;
  border: 0;
  border-radius: 99px;
  padding: 0.6rem 1.1rem;
  font: 700 0.75rem var(--fm);
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.4s;
}
.dialog__close::before {
  content: '';
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: 0;
  height: 180%;
  background: #e73228;
  border-radius: 50% 50% 0 0;
  transform: translateY(102%);
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.5s;
  z-index: -1;
}
.dialog__close:hover::before,
.dialog__close:focus-visible::before {
  transform: translateY(0);
  border-radius: 0;
}
.dialog__close:hover,
.dialog__close:focus-visible {
  color: #fff;
}
.dialog__meta {
  color: #5a4637;
}
.dialog__title {
  margin: 0.6rem 0 1rem;
  font: 900 clamp(1.4rem, 3vw, 2.2rem) / 1.1 var(--fd);
}
@media (max-width: 700px) {
  .dialog {
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
    border-radius: 0;
  }
  .dialog--game {
    height: auto;
    max-height: 100dvh;
    align-self: end;
  }
  .dialog__body {
    padding: 1.6rem 1.2rem;
  }
  .dialog--game .dialog__body {
    padding: 0;
  }
}
</style>
