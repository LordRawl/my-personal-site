export const useTheme = () => {
  const isDark = useState('theme-dark', () => true)

  const apply = (dark: boolean) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
  }

  const init = () => {
    if (!import.meta.client) return
    let stored: string | null
    try {
      stored = localStorage.getItem('theme')
    } catch {
      stored = null
    }
    isDark.value = stored !== 'light'
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  return { isDark, init, toggle }
}
