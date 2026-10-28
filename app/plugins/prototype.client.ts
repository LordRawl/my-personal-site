import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import { useSiteMenu } from '~/composables/useSiteMenu'
import { useReveal } from '~/composables/useReveal'
import { createSeams } from '~/composables/useSeams'
import { applyTypography } from '~/utils/typography'
import { clamp01, smoothstep } from '~/utils/ease'

gsap.registerPlugin(ScrollTrigger)

const headingLine =
  '<svg class="heading-line" viewBox="0 0 200 12" aria-hidden="true"><path pathLength="1" d="M2 7 Q27 -1 52 7 T102 7 T152 7 T198 7"/></svg>'

export default defineNuxtPlugin((nuxtApp) => {
  const reduce =
    import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let dispose: (() => void) | undefined

  nuxtApp.hook('app:mounted', () => {
    if (!import.meta.client) return

    if (!reduce) document.documentElement.classList.add('reveal')

    const smooth = useSmoothScroll()
    const menu = useSiteMenu()
    const reveal = useReveal(reduce)
    const seams = createSeams()
    const listeners: Array<() => void> = []

    const listen = (
      target: Window | HTMLElement,
      type: string,
      handler: EventListener,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, options)
      listeners.push(() => target.removeEventListener(type, handler, options))
    }

    applyTypography(document.body)

    const photo = document.querySelector<HTMLImageElement>('.hero__photo')
    const pic = document.querySelector<HTMLElement>('.hero__pic')
    if (photo && pic) pic.style.setProperty('--ph', `url(${photo.src})`)

    const plate = document.querySelector<HTMLElement>('.hero__plate')
    const hero = document.querySelector<HTMLElement>('.hero')
    if (plate && hero && !reduce && window.matchMedia('(hover: hover)').matches) {
      const moveX = gsap.quickTo(plate, 'x', { duration: 0.5, ease: 'power2.out' })
      listen(hero, 'pointermove', (e) => {
        const event = e as PointerEvent
        const rx = (event.clientX / window.innerWidth - 0.5) * -12
        moveX(rx)
      })
      listen(hero, 'pointerleave', () => {
        moveX(0)
      })
    }

    document.querySelectorAll<HTMLElement>('.section-title, .contacts__heading').forEach((heading) => {
      heading.insertAdjacentHTML('beforeend', headingLine)
    })

    reveal.arm('.works__item, .stack__group, .xp__edu-row, .section-title, .contacts__heading')
    reveal.count('.about__num')

    const stats = document.querySelector<HTMLElement>('.about__stats')
    const statCards = Array.from(
      document.querySelectorAll<HTMLElement>('.about__stat'),
    )
    const statsTick = () => {
      if (!stats) return
      const rect = stats.getBoundingClientRect()
      const progress = reduce
        ? 1
        : clamp01((window.innerHeight * 0.78 - rect.top) / (rect.height + window.innerHeight * 0.1))
      stats.style.setProperty('--p', String(progress))
      statCards.forEach((card, i) => {
        if (progress >= i / statCards.length + 0.04) card.classList.add('is-on')
      })
    }

    const timeline = document.querySelector<HTMLElement>('.xp__timeline')
    const jobs = Array.from(document.querySelectorAll<HTMLElement>('.xp__job'))
    let lastScroll = window.scrollY
    let lastTime = performance.now()
    const timelineTick = () => {
      if (!timeline) return
      const now = performance.now()
      const velocity = Math.abs(window.scrollY - lastScroll) / Math.max(8, now - lastTime)
      lastScroll = window.scrollY
      lastTime = now
      const lead = Math.min(180, velocity * 240)
      const rect = timeline.getBoundingClientRect()
      const fullHeight = reduce
        ? rect.height
        : Math.min(rect.height, Math.max(0, window.innerHeight * 0.7 - rect.top))
      timeline.style.setProperty('--fy', `${fullHeight}px`)
      const dotY = rect.top + Math.max(fullHeight, 14.4)
      jobs.forEach((job) => {
        if (job.classList.contains('is-on')) return
        const node = job.querySelector<HTMLElement>('.xp__job-node')
        if (!node) return
        if (reduce || dotY + lead >= node.getBoundingClientRect().top - 2) {
          job.classList.add('is-on')
        }
      })
    }

    const tiles = document.querySelector<HTMLElement>('.works__tiles')
    const glow = document.querySelector<HTMLElement>('.works__glow')
    let glowX = 0
    let glowY = 0
    let targetX = 0
    let targetY = 0
    let pointerX = 0
    let pointerY = 0
    let pointerSeen = false
    let glowFrame = 0
    const placeGlow = () => {
      if (!glow) return
      glow.style.transform = `translate3d(${glowX.toFixed(1)}px,${glowY.toFixed(1)}px,0)`
    }
    const glowStep = () => {
      glowFrame = 0
      glowX += (targetX - glowX) * 0.14
      glowY += (targetY - glowY) * 0.14
      placeGlow()
      if (Math.abs(targetX - glowX) + Math.abs(targetY - glowY) > 0.5) {
        glowFrame = requestAnimationFrame(glowStep)
      }
    }
    const aimGlow = () => {
      if (!tiles || !pointerSeen) return
      const rect = tiles.getBoundingClientRect()
      targetX = pointerX - rect.left
      targetY = pointerY - rect.top
      if (!glowFrame) glowFrame = requestAnimationFrame(glowStep)
    }
    const centerGlow = () => {
      if (!tiles) return
      const rect = tiles.getBoundingClientRect()
      targetX = glowX = rect.width * 0.5
      targetY = glowY = rect.height * 0.4
      placeGlow()
    }
    if (tiles && !reduce && window.matchMedia('(hover: hover)').matches) {
      listen(
        window,
        'pointermove',
        (e) => {
          const event = e as PointerEvent
          pointerX = event.clientX
          pointerY = event.clientY
          pointerSeen = true
          aimGlow()
        },
        { passive: true },
      )
      listen(window, 'scroll', aimGlow, { passive: true })
    }
    centerGlow()
    listen(window, 'resize', centerGlow)

    const tracks = Array.from(document.querySelectorAll<HTMLElement>('[data-mq]'))
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main > section'),
    )
    const about = document.querySelector<HTMLElement>('#about')
    const sectionNums = Array.from(document.querySelectorAll<HTMLElement>('.section-num'))
    let lastProgress = -1

    const sweep = () => {
      if (!about) return
      const height = window.innerHeight
      const unit = Math.min(210, Math.max(130, window.innerWidth * 0.15))
      const depth = unit * 0.9
      const progress = reduce ? 1 : clamp01((height - about.getBoundingClientRect().top) / (height * 0.7))
      if (progress === 1 && lastProgress === 1) return
      lastProgress = progress
      const right = height * 0.54 * (1 - progress)
      const left = right + depth * progress
      about.style.clipPath =
        progress >= 1
          ? `polygon(0 ${depth.toFixed(1)}px,100% 0,100% 100%,0 100%)`
          : `polygon(0 ${left.toFixed(1)}px,100% ${right.toFixed(1)}px,100% 100%,0 100%)`
      sectionNums.forEach((num) => {
        num.style.opacity = String(smoothstep(0.55, 1, progress))
      })
    }

    const tick = () => {
      const height = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - height
      sweep()

      let activeId = ''
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= height * 0.45) activeId = section.id
      }
      if (activeId !== menu.active.value) menu.active.value = activeId

      seams.forEach((seam) => {
        const rect = seam.box.getBoundingClientRect()
        const end = Math.max(height * 0.38, rect.top + window.scrollY - maxScroll + height * 0.1)
        seam.draw(reduce ? 1 : clamp01((height - rect.top) / (height - end)), reduce)
      })

      tracks.forEach((track) => {
        const row = track.parentElement
        if (!row) return
        const rect = row.getBoundingClientRect()
        const progress = clamp01((height - rect.top) / (height + rect.height))
        const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80)
        track.style.transform = reduce
          ? ''
          : `translate3d(${-(Number(track.dataset.mq) ? 1 - progress : progress) * distance}px,0,0)`
      })
    }

    let frame = 0
    const requestTick = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          tick()
        })
      }
    }

    const onResize = () => {
      lastProgress = -1
      seams.forEach((seam) => seam.size())
      tick()
    }

    listen(window, 'scroll', requestTick, { passive: true })
    listen(window, 'resize', onResize)

    const fonts = document.fonts as FontFaceSet | undefined
    fonts?.ready.then(() => {
      seams.forEach((seam) => seam.size())
      tick()
    })

    let lenis: Lenis | null = null
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 })
      lenis.on('scroll', () => {
        ScrollTrigger.update()
        requestTick()
      })
      const raf = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      smooth.register(lenis)
      listeners.push(() => {
        gsap.ticker.remove(raf)
        lenis?.destroy()
        smooth.register(null)
      })
    }

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href') || ''
        const target = id === '#top' ? null : document.getElementById(id.slice(1))
        if (id !== '#top' && !target) return
        e.preventDefault()
        const go = () => {
          if (lenis) lenis.scrollTo(target ?? 0, { force: true })
          else if (target) target.scrollIntoView()
          else window.scrollTo(0, 0)
          history.pushState(null, '', id)
        }
        if (menu.open.value) {
          menu.close()
          window.setTimeout(go, 80)
        } else {
          go()
        }
      })
    })

    tick()
    statsTick()
    timelineTick()
    listen(window, 'scroll', statsTick, { passive: true })
    listen(window, 'scroll', timelineTick, { passive: true })
    listen(window, 'resize', statsTick)
    listen(window, 'resize', timelineTick)

    const media = gsap.matchMedia()
    if (!reduce)
      media.add('(min-width: 0px)', () => {
        gsap.from('.hero__word', {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 30,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.18,
          delay: 0.1,
          clearProps: 'clipPath,transform',
        })
        gsap.from('.hero__photo', {
          clipPath: 'inset(100% 0 0 0)',
          y: 40,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3,
          clearProps: 'clipPath,transform',
        })
        gsap.from('.hero__plate', {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 1.1,
        })
        gsap.from('.hero__eyebrow,.hero__copy>*', {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          delay: 0.8,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })
        const scrub = (trigger: string, start: string, end: string) => ({
          trigger,
          start,
          end,
          scrub: true,
        })
        gsap.to('.hero__word--back', {
          xPercent: -5,
          ease: 'none',
          scrollTrigger: scrub('.hero', 'top top', 'bottom top'),
        })
        gsap.to('.hero__word--front', {
          xPercent: 5,
          ease: 'none',
          scrollTrigger: scrub('.hero', 'top top', 'bottom top'),
        })
        gsap.to('.hero__pic', {
          y: 60,
          ease: 'none',
          scrollTrigger: scrub('.hero', 'top top', 'bottom top'),
        })
        window.setTimeout(() => ScrollTrigger.refresh(), 1200)
      })

    dispose = () => {
      reveal.disconnect()
      media.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      listeners.forEach((off) => off())
      listeners.length = 0
      if (glowFrame) cancelAnimationFrame(glowFrame)
      if (frame) cancelAnimationFrame(frame)
      menu.open.value = false
      menu.active.value = ''
    }
  })

  nuxtApp.hook('app:unmounted', () => dispose?.())
})
