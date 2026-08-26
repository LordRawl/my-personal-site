const SECTION_IDS = ['hero', 'about', 'stack', 'works', 'experience', 'contacts']

type Point = { el: HTMLElement; top: number }

export const useFullpageScroll = () => {
  if (import.meta.server) return

  const desktop = window.matchMedia('(min-width: 1024px)')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  let enabled = false
  let animating = false
  let rafId = 0
  let cooldownUntil = 0

  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
  const docHeight = () => document.documentElement.scrollHeight
  const headerH = () => (document.querySelector('header') as HTMLElement | null)?.offsetHeight ?? 76

  const points = (): Point[] => {
    const sy = window.scrollY
    return SECTION_IDS.map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .map((el) => ({ el, top: el.getBoundingClientRect().top + sy }))
  }

  const targetFor = (p: Point) => {
    const vh = window.innerHeight
    return Math.round(p.el.offsetHeight > vh ? p.top - headerH() : p.top)
  }

  const currentIndex = (list: Point[]) => {
    const sy = window.scrollY + headerH()
    let idx = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i]!.top <= sy + 1) idx = i
    }
    return idx
  }

  const nextTarget = (sy: number, list: Point[]): number | null => {
    for (const p of list) {
      if (p.top > sy + 2) return targetFor(p)
    }
    return null
  }

  const prevTarget = (sy: number, list: Point[]): number | null => {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i]!.top < sy - 2) return targetFor(list[i]!)
    }
    return null
  }

  const decide = (dir: 1 | -1): number | null => {
    const sy = window.scrollY
    const vh = window.innerHeight
    const list = points()
    const item = list[currentIndex(list)]
    if (!item) return null

    if (dir === 1) {
      if (sy >= maxScroll() - 1) return null
      const bottomLine = item.top + item.el.offsetHeight - vh
      if (sy < bottomLine - 1 && !(sy + vh >= docHeight() - 1)) return null
      const target = nextTarget(sy, list)
      if (target !== null) {
        if (target <= sy + 1) return null
        return target
      }
      const bottom = Math.round(maxScroll())
      return bottom > sy + 1 ? bottom : null
    }

    if (sy <= 1) return null
    const atPageBottom = sy + vh >= docHeight() - 1
    if (!atPageBottom && sy > item.top + 1) return null
    const target = prevTarget(sy, list)
    if (target === null) return null
    return target
  }

  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
    animating = false
  }

  const emitName = (name: string) => {
    window.dispatchEvent(new CustomEvent(name))
  }

  const animateTo = (targetY: number) => {
    const endY = Math.max(0, Math.min(Math.round(targetY), maxScroll()))
    const startY = window.scrollY
    if (Math.abs(endY - startY) < 2) {
      emitName('fullpage-done')
      return
    }
    stop()
    if (reducedMotion.matches) {
      window.scrollTo(0, endY)
      cooldownUntil = performance.now() + 200
      emitName('fullpage-done')
      return
    }
    animating = true
    const dist = endY - startY
    const duration = Math.min(900, Math.max(480, Math.abs(dist) * 0.55))
    const t0 = performance.now()
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      window.scrollTo(0, Math.round(startY + dist * ease(p)))
      if (p < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        animating = false
        rafId = 0
        cooldownUntil = performance.now() + 260
        emitName('fullpage-done')
      }
    }
    rafId = requestAnimationFrame(step)
  }

  const blockedByUi = () => {
    const active = document.activeElement as HTMLElement | null
    return (
      Boolean(document.querySelector('[role="dialog"]')) ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(active?.tagName ?? '') ||
      active?.isContentEditable === true
    )
  }

  const onWheel = (e: WheelEvent) => {
    if (!enabled) return
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
    if (animating || performance.now() < cooldownUntil) {
      e.preventDefault()
      return
    }
    if (blockedByUi()) return
    const target = decide(e.deltaY > 0 ? 1 : -1)
    if (target === null) return
    emitName('fullpage-manual')
    e.preventDefault()
    animateTo(target)
  }

  const onKey = (e: KeyboardEvent) => {
    if (!enabled || e.metaKey || e.ctrlKey || e.altKey) return
    if (blockedByUi()) return
    let dir: 1 | -1
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1
    else if (e.key === 'Home') {
      e.preventDefault()
      emitName('fullpage-manual')
      animateTo(0)
      return
    } else if (e.key === 'End') {
      e.preventDefault()
      emitName('fullpage-manual')
      animateTo(maxScroll())
      return
    } else return

    if (e.key === ' ' && e.shiftKey) dir = -1
    const target = decide(dir)
    if (target === null) return
    emitName('fullpage-manual')
    e.preventDefault()
    animateTo(target)
  }

  const onNav = (e: Event) => {
    const id = (e as CustomEvent<string>).detail
    const el = document.getElementById(id)
    if (!el) return
    animateTo(targetFor({ el, top: el.getBoundingClientRect().top + window.scrollY }))
  }

  const attach = () => {
    enabled = true
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('fullpage-nav', onNav)
  }

  const detach = () => {
    enabled = false
    stop()
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('fullpage-nav', onNav)
  }

  const onMediaChange = () => {
    detach()
    if (desktop.matches) attach()
  }

  onMounted(() => {
    if (desktop.matches) attach()
    desktop.addEventListener('change', onMediaChange)
  })

  onBeforeUnmount(() => {
    desktop.removeEventListener('change', onMediaChange)
    detach()
  })
}
