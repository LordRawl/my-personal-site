export const scrollToSection = (id: string, options?: { fullpage?: boolean }) => {
  if (options?.fullpage && window.matchMedia('(min-width: 1024px)').matches) {
    window.dispatchEvent(new CustomEvent('fullpage-nav', { detail: id }))
  } else {
    const el = document.getElementById(id)
    if (!el) return
    // Используем --header-h (высота свернутой шапки), а не offsetHeight в момент
    // клика: при открытом мобильном меню шапка имеет h-full, и замер дал бы полный
    // экран вместо реальной высоты, сломав позицию секции.
    const headerH =
      Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) ||
      ((document.querySelector('header') as HTMLElement | null)?.offsetHeight ?? 76)
    const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerH)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
