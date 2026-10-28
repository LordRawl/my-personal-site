export const useGameDialog = () => {
  const open = useState('game-dialog', () => false)
  const origin = useState('game-dialog-origin', () => ({ x: 0, y: 0 }))

  const show = (ev?: MouseEvent) => {
    if (ev) {
      origin.value = { x: ev.clientX, y: ev.clientY }
    }
    open.value = true
  }

  const close = () => {
    open.value = false
  }

  return { open, origin, show, close }
}
