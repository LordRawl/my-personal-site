import type Lenis from 'lenis'

let instance: Lenis | null = null

export const useSmoothScroll = () => ({
  register: (lenis: Lenis | null) => {
    instance = lenis
  },
  stop: () => instance?.stop(),
  start: () => instance?.start(),
})
