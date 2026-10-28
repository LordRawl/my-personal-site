export const useSiteMenu = () => {
  const open = useState('site-menu-open', () => false)
  const active = useState('site-menu-active', () => '')
  const origin = useState('site-menu-origin', () => ({ x: 0, y: 0 }))

  const toggle = (ev?: MouseEvent) => {
    const el = ev?.currentTarget as HTMLElement | undefined
    if (el) {
      const r = el.getBoundingClientRect()
      origin.value = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    }
    open.value = !open.value
  }

  const close = () => {
    open.value = false
  }

  return { open, active, origin, toggle, close }
}
