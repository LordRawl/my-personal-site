import { navLinks } from '~/data/profile.ts'

const SECTION_IDS = ['hero', ...navLinks.map(({ id }) => id)]

type Point = { el: HTMLElement; top: number }

export const useFullpageScroll = () => {
  if (import.meta.server) return

  const desktop = window.matchMedia('(min-width: 1024px)')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  let enabled = false
  let animating = false
  let rafId = 0
  let cooldownUntil = 0

  let cachedPoints: Point[] = []
  let cachedMaxScroll = 0
  let cachedDocHeight = 0
  let cachedHeaderH = 76

  const applyHeaderVar = (h: number) => {
    document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`)
  }

  const measure = () => {
    const sy = window.scrollY
    const vh = window.innerHeight
    cachedPoints = SECTION_IDS.map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .map((el) => ({ el, top: el.getBoundingClientRect().top + sy }))
    cachedMaxScroll = document.documentElement.scrollHeight - vh
    cachedDocHeight = document.documentElement.scrollHeight
    cachedHeaderH = (document.querySelector('header') as HTMLElement | null)?.offsetHeight ?? 76
    applyHeaderVar(cachedHeaderH)
  }

  const maxScroll = () => cachedMaxScroll
  const docHeight = () => cachedDocHeight
  const headerH = () => cachedHeaderH
  const points = (): Point[] => cachedPoints

  const targetFor = (p: Point) => {
    const vh = window.innerHeight
    const header = Math.max(headerH(), 0)
    // Всегда прижимаем верх секции к нижней границе шапки,
    // чтобы заголовок секции не прятался под фиксированной шапкой.
    const base = p.top - header
    // Если секция целиком помещается в область под шапкой — позиционируем
    // её верх ровно под шапкой (без обрезки снизу), иначе верх остаётся под шапкой.
    return Math.round(Math.max(0, Math.min(base, maxScroll())))
  }

  const currentIndex = (list: Point[]) => {
    const sy = window.scrollY + headerH()
    let idx = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i]!.top <= sy + 1) idx = i
    }
    return idx
  }

  const nextTarget = (list: Point[], from: number): number | null => {
    for (let i = from + 1; i < list.length; i++) return targetFor(list[i]!)
    return null
  }

  const prevTarget = (list: Point[], from: number): number | null => {
    for (let i = from - 1; i >= 0; i--) return targetFor(list[i]!)
    return null
  }

  const decide = (dir: 1 | -1): number | null => {
    measure()
    const sy = window.scrollY
    const vh = window.innerHeight
    const list = points()
    const item = list[currentIndex(list)]
    if (!item) return null

    if (dir === 1) {
      if (sy >= maxScroll() - 1) return null
      const bottomLine = item.top + item.el.offsetHeight - vh
      const atPageBottom = sy + vh >= docHeight() - 1
      // Native-скролл внутри секции допускаем только для секций, чей контент
      // выше области вьюпорта под шапкой (vh - header), где низ не помещается
      // даже при снапе верха под шапку. Обычные секции (min-height: vh - header)
      // помещаются целиком — один тик = один снап.
      const area = vh - headerH()
      // Секция считается «высокой» (нужен native-скролл внутри) только если её
      // контент заметно (более чем на 20%) выше области под шапкой. Секции,
      // чуть-чуть не влезающие (случайные паддинги), всё равно снапятся за один
      // тик — нижние отступы обычно не критичны.
      const isTall = item.el.offsetHeight > area * 1.2
      if (isTall && sy < bottomLine - 1 && !atPageBottom) return null
      const idx = currentIndex(list)
      const target = nextTarget(list, idx)
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
    const idx = currentIndex(list)
    const target = prevTarget(list, idx)
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
    measure()
    const p = cachedPoints.find((x) => x.el === el)
    animateTo(targetFor(p ?? { el, top: el.getBoundingClientRect().top + window.scrollY }))
  }

  const onResize = () => {
    measure()
  }

  const attach = () => {
    enabled = true
    measure()
    applyHeaderVar(cachedHeaderH)
    measure()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('fullpage-nav', onNav)
    window.addEventListener('resize', onResize)
  }

  const detach = () => {
    enabled = false
    stop()
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('fullpage-nav', onNav)
    window.removeEventListener('resize', onResize)
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
