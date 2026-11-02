export type Theme = 'light' | 'dark'

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<unknown> }
}

const systemTheme = (): Theme =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const storedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem('theme')
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

const paint = (value: Theme, persist = false) => {
  document.documentElement.dataset.theme = value
  if (persist) {
    try {
      localStorage.setItem('theme', value)
    } catch {
      /* в приватном режиме запись в хранилище запрещена */
    }
  }
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = value === 'light' ? '#f6eee4' : '#0b0705'
}

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')
  const isLight = computed(() => theme.value === 'light')

  const set = (value: Theme, event?: MouseEvent) => {
    if (import.meta.server) return
    const apply = () => {
      theme.value = value
      paint(value, true)
    }
    const doc = document as ViewTransitionDocument
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply()
      return
    }
    const target = event?.currentTarget
    const rect = target instanceof HTMLElement ? target.getBoundingClientRect() : null
    const x = rect ? rect.left + rect.width / 2 : innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : innerHeight / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = doc.startViewTransition(apply)
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(.16,1,.3,1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})
  }

  const toggle = (event?: MouseEvent) => set(isLight.value ? 'dark' : 'light', event)

  onMounted(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      const value = storedTheme() ?? systemTheme()
      theme.value = value
      paint(value)
    }
    sync()
    media.addEventListener('change', sync)
    onBeforeUnmount(() => media.removeEventListener('change', sync))
  })

  return { theme: readonly(theme), isLight, set, toggle }
}
