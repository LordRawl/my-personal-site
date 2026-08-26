export const scrollToSection = (id: string, options?: { fullpage?: boolean }) => {
  if (options?.fullpage && window.matchMedia('(min-width: 1024px)').matches) {
    window.dispatchEvent(new CustomEvent('fullpage-nav', { detail: id }))
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
