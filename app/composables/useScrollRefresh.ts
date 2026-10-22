export const useScrollRefresh = () => {
  const refresh = async () => {
    if (import.meta.server) return
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.refresh()
  }

  return { refresh }
}
