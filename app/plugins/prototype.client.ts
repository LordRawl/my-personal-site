import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const $ = <T extends Element = Element>(sel: string, root?: ParentNode): T | null =>
  (root ?? document).querySelector(sel) as T | null
const $$ = <T extends Element = Element>(sel: string, root?: ParentNode): T[] =>
  Array.from((root ?? document).querySelectorAll(sel)) as T[]

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lenis: Lenis | null = null

  const sref = () => ScrollTrigger.refresh()

  nuxtApp.hook('app:mounted', () => {
    const me = $<HTMLImageElement>('#me')
    const pic = $('.hero__pic')
    if (me && pic) pic.style.setProperty('--ph', `url(${me.src})`)

    const bar = $('.bar')
    const header = $('.header')
    const hbu = () => {
      const on = window.scrollY > window.innerHeight * 0.85
      bar?.classList.toggle('bar--on', on)
      header?.classList.toggle('header--solid', on)
    }
    window.addEventListener('scroll', hbu, { passive: true })
    hbu()

    // quickTo держит один рAF-таймер на ось: CSS-transition, перезапускаемая на
    // каждом pointermove, стартует заново сотни раз в секунду и не успевает
    // дойти до цели — отсюда и рывок.
    const plate = $<HTMLElement>('.hero__plate')
    const hero = $('.hero')
    if (!reduce && plate && hero && window.matchMedia('(hover:hover)').matches) {
      const toX = gsap.quickTo(plate, 'x', { duration: 0.5, ease: 'power4.out' })
      const toY = gsap.quickTo(plate, 'y', { duration: 0.5, ease: 'power4.out' })
      hero.addEventListener('pointermove', (e) => {
        const t = e.clientX / window.innerWidth
        toX((0.5 - t) * 20)
        toY((e.clientY / window.innerHeight - 0.5) * -3)
      })
      hero.addEventListener('pointerleave', () => {
        toX(0)
        toY(0)
      })
    }

    const pt = $<SVGSVGElement>('#pt')
    const ptb = $<SVGPathElement>('#ptb')
    const ptp = $<SVGPathElement>('#ptp')
    const ptd = $<SVGCircleElement>('#ptd')
    let ptl = 0

    const ptSet = (p: number) => {
      if (!ptp || !ptd) return
      ;(pt as unknown as Record<string, number>)._p = p
      ptp.style.strokeDashoffset = String(ptl * (1 - p))
      const q = ptp.getPointAtLength(ptl * p)
      ptd.setAttribute('cx', String(q.x))
      ptd.setAttribute('cy', String(q.y))
    }

    const ptBuild = () => {
      if (!pt || !ptb || !ptp) return
      const h = document.documentElement.scrollHeight
      let d = 'M10,0'
      let y = 0
      while (y < h) {
        d += ` C2,${y + 200} 18,${y + 400} 10,${y + 600}`
        y += 600
      }
      pt.setAttribute('height', String(h))
      pt.setAttribute('viewBox', `0 0 20 ${h}`)
      ptb.setAttribute('d', d)
      ptp.setAttribute('d', d)
      ptl = ptp.getTotalLength()
      ptp.style.strokeDasharray = String(ptl)
      ptSet(reduce ? 1 : ((pt as unknown as Record<string, number>)._p ?? 0))
    }

    ptBuild()
    window.addEventListener('load', ptBuild)
    window.addEventListener('resize', ptBuild)

    $$('h2').forEach((h) => {
      h.insertAdjacentHTML(
        'beforeend',
        '<svg class="ul" viewBox="0 0 200 12" aria-hidden="true"><path pathLength="1" d="M2 7 Q27 -1 52 7 T102 7 T152 7 T198 7"/></svg>',
      )
    })

    const tl = $('#tl')
    const tb = $<SVGPathElement>('#tbase')
    const tp = $<SVGPathElement>('#tprog')
    const dot = $<SVGCircleElement>('#tdot')
    const tsvg = $<SVGSVGElement>('#tsvg')
    let tlen = 0

    const setP = (p: number) => {
      if (!tp || !dot || !tl) return
      ;(tl as unknown as Record<string, number>)._p = p
      tp.style.strokeDashoffset = String(tlen * (1 - p))
      const q = tp.getPointAtLength(tlen * p)
      dot.setAttribute('cx', String(q.x))
      dot.setAttribute('cy', String(q.y))
    }

    const build = () => {
      if (!tl || !tb || !tp || !tsvg) return
      const h = tl.offsetHeight
      let d = 'M30,0'
      let y = 0
      while (y < h) {
        d += ` C6,${y + 80} 54,${y + 170} 30,${y + 250}`
        y += 250
      }
      tsvg.setAttribute('width', '60')
      tsvg.setAttribute('height', String(h))
      tsvg.setAttribute('viewBox', `0 0 60 ${h}`)
      tb.setAttribute('d', d)
      tp.setAttribute('d', d)
      tlen = tp.getTotalLength()
      tp.style.strokeDasharray = String(tlen)
      setP(reduce ? 1 : ((tl as unknown as Record<string, number>)._p ?? 0))
    }

    const tornD = () => {
      let d = `M0,${60 * Math.random() + 20}`
      for (let i = 1; i <= 36; i++) {
        d += ` L${i * 40},${i % 2 ? 10 + Math.random() * 30 : 50 + Math.random() * 40}`
      }
      $<SVGPathElement>('#tornl')?.setAttribute('d', d)
      $<SVGPathElement>('#tornp')?.setAttribute('d', `${d} L1440,100 L0,100 Z`)
    }

    tornD()
    build()
    window.addEventListener('resize', build)
    window.addEventListener('load', build)

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 })
      useSmoothScroll().register(lenis)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t) => lenis?.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href')
        if (!id) return
        const el = id === '#top' ? null : document.getElementById(id.slice(1))
        if (id !== '#top' && !el) return
        e.preventDefault()
        if (lenis) {
          if (el) lenis.scrollTo(el)
          else lenis.scrollTo(0)
        } else if (el) {
          el.scrollIntoView()
        } else {
          window.scrollTo(0, 0)
        }
        history.pushState(null, '', id)
      })
    })

    if (reduce) return

    const wp = $<SVGPathElement>('#wavepath')
    const ws = $<SVGPathElement>('#wavestroke')
    const Wv = { ph: 0, base: 185, amp: 10 }
    const wave = () => {
      let d = ''
      for (let i = 0; i <= 48; i++) {
        d += `${i ? ' L' : 'M'}${i * 30},${(Wv.base + Wv.amp * Math.sin(i * 0.35 + Wv.ph)).toFixed(1)}`
      }
      ws?.setAttribute('d', d)
      wp?.setAttribute('d', `${d} L1440,200 L0,200 Z`)
    }
    wave()

    const NS = 'http://www.w3.org/2000/svg'
    const drops: SVGCircleElement[] = []
    const rims: SVGCircleElement[] = []
    const PT: [number, number][] = [[8, 28], [22, 30], [36, 27], [50, 31], [64, 28], [78, 30], [92, 27], [15, 34], [43, 34], [71, 34], [99, 34], [1, 34]]
    const dropsvg = $('#dropsvg')
    ;[true, false].forEach((rim) => {
      PT.forEach((p) => {
        const c = document.createElementNS(NS, 'circle')
        c.setAttribute('cx', String(p[0]))
        c.setAttribute('cy', String(p[1]))
        c.setAttribute('r', '0')
        if (rim) c.setAttribute('fill', '#E73228')
        dropsvg?.appendChild(c)
        ;(rim ? rims : drops).push(c)
      })
    })

    const mm = gsap.matchMedia()
    const S = (trigger: string, start: string, end: string) => ({ trigger, start, end, scrub: true })

    mm.add('(min-width:0px)', () => {
      gsap.from('.hero__gl', { clipPath: 'inset(0 0 100% 0)', yPercent: 30, duration: 1.5, ease: 'power4.out', stagger: 0.18, delay: 0.1, clearProps: 'clipPath,transform' })
      gsap.from('.hero__pic img', { clipPath: 'inset(100% 0 0 0)', y: 40, duration: 1.5, ease: 'power3.out', delay: 0.3, clearProps: 'clipPath,transform' })
      gsap.from('.hero__plate', { opacity: 0, duration: 1.2, ease: 'power2.out', delay: 1.1 })
      gsap.from('.hero__eyebrow,.hero__copy>*', { y: 20, opacity: 0, duration: 1, stagger: 0.12, delay: 0.8, ease: 'power3.out', clearProps: 'transform,opacity' })
      gsap.to('.hero__gl--a', { xPercent: -5, ease: 'none', scrollTrigger: S('.hero', 'top top', 'bottom top') })
      gsap.to('.hero__gl--b', { xPercent: 5, ease: 'none', scrollTrigger: S('.hero', 'top top', 'bottom top') })
      gsap.to('.hero__pic', { y: 60, ease: 'none', scrollTrigger: S('.hero', 'top top', 'bottom top') })
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => ptSet(s.progress) })
      ScrollTrigger.addEventListener('refresh', ptBuild)
      $$('.ul path').forEach((p) => {
        gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: p, start: 'top 92%', once: true } })
      })
      gsap.to('.about__curtain path', { y: -112, stagger: 0.12, ease: 'none', scrollTrigger: S('.about', 'top 95%', 'top -10%') })
      $$<HTMLElement>('[data-count]').forEach((el) => {
        const to = Number(el.dataset.count)
        const o = { v: 0 }
        gsap.to(o, { v: to, ease: 'none', onUpdate: () => { el.textContent = String(Math.round(o.v)) }, scrollTrigger: S('.about__stats', 'top 90%', 'top 50%') })
      })
      const dtl = gsap.timeline({ scrollTrigger: S('.works', 'top 100%', 'top 35%'), defaults: { ease: 'none' } })
      ;[3, 9, 0, 6, 11, 2, 8, 5, 1, 10, 4, 7].forEach((k, i) => {
        dtl.to(rims[k], { attr: { r: 24.35 }, duration: 1 }, i * 0.06).to(drops[k], { attr: { r: 24 }, duration: 1 }, i * 0.06)
      })
      gsap.to(Wv, { ph: 6, base: 70, amp: 34, ease: 'none', onUpdate: wave, scrollTrigger: S('.works__wave', 'top 105%', 'bottom 55%') })
      $$('.stack__mq').forEach((r) => {
        const d = Number((r as HTMLElement).dataset.dir)
        gsap.fromTo(r, { xPercent: d > 0 ? -50 : 0 }, { xPercent: d > 0 ? 0 : -50, ease: 'none', scrollTrigger: S('.stack', 'top bottom', 'bottom top') })
      })
      gsap.fromTo('.xp__torn', { yPercent: 100 }, { yPercent: 0, ease: 'none', scrollTrigger: S('.xp', 'top 100%', 'top 55%') })
      ScrollTrigger.create({
        trigger: '#tl', start: 'top 65%', end: 'bottom 55%', scrub: true, invalidateOnRefresh: true,
        onUpdate: (s) => setP(s.progress),
      })
      gsap.fromTo('.contacts', { clipPath: 'polygon(0 100%,100% 100%,100% 100%,0 100%)' }, { clipPath: 'polygon(0 12%,100% 0%,100% 100%,0 100%)', ease: 'none', scrollTrigger: S('.contacts', 'top 100%', 'top 30%') })
      gsap.fromTo('.footer__shut path', { y: 100 }, { y: 0, stagger: 0.1, ease: 'none', scrollTrigger: S('.footer', 'top 100%', 'top 55%') })
      $$('.works__card,.stack__isle,.xp__job').forEach((c) => {
        gsap.from(c, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: c, start: 'top 92%', once: true } })
      })
    })

    mm.add('(min-width:801px) and (hover:hover)', () => {
      $$<HTMLButtonElement>('[data-magnet]').forEach((b) => {
        b.addEventListener('mousemove', (e) => {
          const r = b.getBoundingClientRect()
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 })
        })
        b.addEventListener('mouseleave', () => {
          gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' })
        })
      })
      $$('.stack__isle').forEach((c, i) => {
        gsap.to(c, { y: (i % 2 ? -1 : 1) * 30, ease: 'none', scrollTrigger: S('.stack__isles', 'top bottom', 'bottom top') })
      })
    })

    window.addEventListener('load', sref)
  })

  nuxtApp.hook('app:beforeUnmount', () => {
    lenis?.destroy()
    lenis = null
    useSmoothScroll().register(null)
    gsap.matchMedia().revert()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })
})
