export const useReveal = (reduce: boolean) => {
  const reveal = new IntersectionObserver(
    (entries) => {
      let k = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.style.setProperty('--d', `${k++ * 110}ms`)
        el.classList.add('is-on')
        reveal.unobserve(el)
      }
    },
    { threshold: 0.2 },
  )

  const counters = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const value = el.querySelector<HTMLElement>('.about__num-value')
        const to = Number(value?.dataset.n)
        counters.unobserve(el)
        if (reduce || !value || !Number.isFinite(to)) continue
        const start = performance.now()
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / 1500)
          value.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('ru-RU')}+`
          if (k < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    },
    { threshold: 0.5 },
  )

  const arm = (selector: string) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (reduce) el.classList.add('is-on')
      else reveal.observe(el)
    })
  }

  const count = (selector: string) => {
    if (reduce) return
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => counters.observe(el))
  }

  const disconnect = () => {
    reveal.disconnect()
    counters.disconnect()
  }

  return { arm, count, disconnect }
}
