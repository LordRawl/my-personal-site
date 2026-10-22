import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const $ = <T extends Element = Element>(sel: string, root?: ParentNode): T | null =>
  (root ?? document).querySelector(sel) as T | null
const $$ = <T extends Element = Element>(sel: string, root?: ParentNode): T[] =>
  Array.from((root ?? document).querySelectorAll(sel)) as T[]

type Project = {
  tag: string
  company: string
  year: string
  title: string
  summary: string
  metric: { value: string; label: string }
  details: string[]
  stack: string[]
}

const PROJECTS: Project[] = [
  {
    tag: 'Highload SPA',
    company: 'Cognitech',
    year: '2024 — сейчас',
    title: 'Панель управления сетевым оборудованием',
    summary:
      'Коммерческий высоконагруженный веб-сервис для настройки сетевого оборудования: дашборды, таблицы и формы с одновременным выводом 10 000+ элементов.',
    metric: { value: '10 000+', label: 'элементов в одном экране' },
    details: [
      'Сложные экраны с большим объёмом данных: виртуализация таблиц, отложенный рендер, аккуратная работа с реактивностью.',
      'Автономные модули со сложной бизнес-логикой и реальным временем на WebSockets.',
      'Миграция существующего кода на архитектуру FSD без остановки поставки фич.',
      'Участие в проектировании архитектуры и технических решений для ключевых модулей.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Quasar', 'Pinia', 'WebSockets'],
  },
  {
    tag: 'Design System',
    company: 'Cognitech',
    year: '2025',
    title: 'Внутренняя библиотека UI-компонентов',
    summary:
      'Развивал внутреннюю дизайн-систему для продуктовой команды: проектировал API компонентов, документацию и тестовую инфраструктуру.',
    metric: { value: 'Единый UI', label: 'одна библиотека компонентов для всей команды' },
    details: [
      'Проектирование публичного API компонентов: предсказуемые пропсы, слоты и события.',
      'Документация (README) и примеры использования для каждой единицы библиотеки.',
      'Покрытие тестами на Vitest и Vue Test Utils.',
      'Ревью внедрений и помощь командам при переходе на общие компоненты.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vitest', 'Vue Test Utils', 'SCSS'],
  },
  {
    tag: 'MARKETPLACE · SSR',
    company: 'Skycoach',
    year: '2023 — 2024',
    title: 'Маркетплейс игровых товаров',
    summary:
      'Запуск маркетплейса игровых товаров с каталогом, сделками, личным кабинетом и SEO-ориентированными страницами.',
    metric: { value: 'SSR', label: 'SEO + быстрый первый экран' },
    details: [
      'Запуск с нуля на Vue 3, Nuxt 3, Pinia и Tailwind CSS.',
      'Аутентификация и авторизация на основе JWT.',
      'Оптимизация загрузки: ленивые компоненты и SSR для SEO и быстрого первого экрана.',
      'Конструктор витрины маркетплейса и аналитика продаж для продавцов.',
    ],
    stack: ['Nuxt 3', 'Vue 3', 'Pinia', 'Tailwind', 'JWT', 'SSR'],
  },
  {
    tag: 'PRODUCT · PLATFORM',
    company: 'Skycoach',
    year: '2021 — 2023',
    title: 'Крупный онлайн-сервис внутриигровых услуг',
    summary:
      'Единая платформа для продажи внутриигровых услуг с четырьмя крупными модулями: публичный каталог, личный кабинет клиента, кабинет продавца и административная панель.',
    metric: {
      value: '4 крупных модуля',
      label: 'каталог · кабинет клиента · кабинет продавца · админ-панель',
    },
    details: [
      'Разработал кабинет клиента с нуля: управление заказами, коммуникация с исполнителями, чаты и система чаевых.',
      'Развивал кабинет исполнителя: поиск и ведение заказов, мультичаты, работа с офферами и маркетплейсом, управление выплатами.',
      'Разрабатывал внутреннюю админ-панель для управления продуктами, контентом, отзывами, маркетплейсом и финансовой отчётностью.',
      'Поддерживал и развивал публичную часть платформы: статические страницы, редизайн и развитие UI-компонентов, блог и SSR.',
    ],
    stack: ['Vue 2', 'Vuex', 'Vue Router', 'SCSS', 'Webpack', 'SSR'],
  },
  {
    tag: 'ERP · B2C',
    company: 'Like Центр',
    year: '2019 — 2021',
    title: 'ERP-система',
    summary:
      'Коммерческая бизнес-платформа, объединяющая 10+ модулей: календарь гипотез, дашборды, CRM, маркетинговую и финансовую отчётность, учёт сотрудников и базу знаний.',
    metric: { value: '10+ модулей', label: 'единая коммерческая ERP-платформа' },
    details: [
      'Единолично разработал MVP платформы на jQuery за ~1 месяц во внерабочее время.',
      'После MVP участвовал в полной переработке и масштабировании платформы на Vue 2 + Vuex + Vue Router совместно с расширенной командой разработки.',
      'Играл ключевую роль в развитии продукта: от проектирования и прототипирования новых модулей до реализации и выпуска релизов.',
      'Развивал продукт в тесном взаимодействии с маркетингом, дизайном и backend-разработчиками.',
      'Участвовал в онбординге новых разработчиков и проведении технических собеседований.',
    ],
    stack: ['Vue 2', 'Vuex', 'Vue Router', 'jQuery', 'SCSS'],
  },
  {
    tag: 'LANDING · MOTION',
    company: 'Like Центр',
    year: '2017 — 2021',
    title: 'Лендинги и анимации для образовательных курсов',
    summary:
      'Разрабатывал и поддерживал продающие страницы для крупных образовательных проектов — от вёрстки и анимации до интеграции с backend-шаблонизаторами.',
    metric: { value: '80+', label: 'лендингов за четыре года' },
    details: [
      'Живые CSS и SVG-анимации, точечное использование GSAP и Animate.css.',
      'Перенос вёрстки на шаблонизаторы Twig и Blade.',
      'Техподдержка и постоянная оптимизация уже работающих решений.',
      '80+ страниц за 4 года при параллельной поддержке существующих проектов.',
    ],
    stack: ['HTML', 'Pug', 'Sass', 'jQuery', 'БЭМ', 'SVG'],
  },
]

const MQ_A = ['Vue 3', 'Nuxt', 'TypeScript', 'Pinia', 'Quasar', 'Tailwind', 'Vite', 'Vitest']
const MQ_B = ['WebSockets', 'REST API', 'FSD', 'Figma', 'SSR', 'Design System', 'Pixel Perfect', 'БЭМ']

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lenis: Lenis | null = null
  const t0 = Date.now()

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

    $$('.about__card').forEach((c) => {
      const b = $<HTMLButtonElement>('button', c)
      b?.addEventListener('click', () => {
        const o = c.classList.toggle('about__card--open')
        b.setAttribute('aria-expanded', String(o))
        window.setTimeout(sref, 480)
      })
    })

    const gr = $('#grid')
    const meta = (p: Project) => `${p.tag} · ${p.company} · ${p.year}`

    PROJECTS.forEach((p, i) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'works__card' + (i === 3 ? ' works__card--dark' : '')
      b.innerHTML =
        `<span><span class="mono works__meta">${esc(meta(p))}</span>` +
        `<h3 class="works__title">${esc(p.title)}</h3>` +
        `<span class="works__desc">${esc(p.summary)}</span></span>` +
        `<span class="works__peek">${esc(p.stack.join(' · '))}</span>` +
        `<span class="works__go">Подробнее →</span>`
      gr?.appendChild(b)

      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect()
        b.style.setProperty('--x', `${e.clientX - r.left}px`)
        b.style.setProperty('--y', `${e.clientY - r.top}px`)
      })

      b.addEventListener('click', (e) => {
        const d = $<HTMLDialogElement>('#dlg')
        if (!d) return
        const dm = $('#dm'); const dt = $('#dt'); const dd = $('#dd'); const dc = $('#dc')
        const dmtr = $('#dmetric'); const ddet = $('#ddetails')
        if (dm) dm.textContent = meta(p)
        if (dt) dt.textContent = p.title
        if (dd) dd.textContent = p.summary
        if (dmtr) {
          dmtr.hidden = false
          dmtr.innerHTML =
            `<b class="dialog__metric-value">${esc(p.metric.value)}</b>` +
            `<span class="dialog__metric-label">${esc(p.metric.label)}</span>`
        }
        if (ddet) ddet.innerHTML = p.details.map((s) => `<li class="dialog__detail">${esc(s)}</li>`).join('')
        if (dc) dc.innerHTML = p.stack.map((s) => `<li class="dialog__chip">${esc(s)}</li>`).join('')
        d.showModal()
        lenis?.stop()
        if (!reduce) {
          const r = d.getBoundingClientRect()
          gsap.fromTo(
            d,
            { clipPath: `circle(0px at ${e.clientX - r.left}px ${e.clientY - r.top}px)` },
            {
              clipPath: `circle(150% at ${e.clientX - r.left}px ${e.clientY - r.top}px)`,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'clipPath',
            },
          )
        }
      })
    })

    const dlg = $<HTMLDialogElement>('#dlg')
    $('#dx')?.addEventListener('click', () => dlg?.close())
    dlg?.addEventListener('close', () => lenis?.start())
    dlg?.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close()
    })

    const mq = (el: Element | null, items: string[]) => {
      if (!el) return
      const h = items.map((s) => `<li class="stack__mq-tag">${esc(s)}</li>`).join('')
      el.innerHTML = `<ul class="stack__mq-track">${h}</ul><ul class="stack__mq-track">${h}</ul>`
    }
    mq($('.stack__mq:not(.stack__mq--reverse)'), MQ_A)
    mq($('.stack__mq--reverse'), MQ_B)

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

    const form = $<HTMLFormElement>('#form')
    const st = $('#st')
    form?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const f = form.elements as unknown as Record<string, HTMLInputElement | HTMLTextAreaElement>
      let bad = false
      ;([['name', 2], ['contact', 3], ['message', 10]] as const).forEach(([key, min]) => {
        const ok = f[key].value.trim().length >= min
        f[key].setAttribute('aria-invalid', String(!ok))
        if (!ok && !bad) f[key].focus()
        bad = bad || !ok
      })
      if (bad) {
        if (st) st.textContent = 'Проверьте поля: имя от 2, контакт от 3, задача от 10 символов.'
        return
      }
      if (st) st.textContent = 'Отправляю…'
      try {
        const res = await $fetch('/api/contact', {
          method: 'POST',
          body: {
            name: f.name.value,
            contact: f.contact.value,
            message: f.message.value,
            website: f.website.value,
            loadTime: t0,
          },
        })
        if (!(res as { ok?: boolean }).ok) throw new Error('send failed')
        if (st) st.textContent = 'Готово: заявка отправлена. Отвечу в ближайшее время.'
        form.reset()
      } catch {
        if (st) st.textContent = 'Не получилось отправить. Напишите в Telegram: @lordrawl'
      }
    })

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 })
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
    gsap.matchMedia().revert()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })
})
