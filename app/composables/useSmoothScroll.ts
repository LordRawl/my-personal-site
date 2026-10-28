import type Lenis from 'lenis'

let instance: Lenis | null = null

export const useSmoothScroll = () => ({
  register: (lenis: Lenis | null) => {
    instance = lenis
  },
  active: () => Boolean(instance),
  stop: () => instance?.stop(),
  start: () => instance?.start(),
})
