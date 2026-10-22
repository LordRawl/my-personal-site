import type { Project } from '~/types/site'

export const useProjectDialog = () => {
  const project = useState<Project | null>('project-dialog', () => null)
  const origin = useState('project-dialog-origin', () => ({ x: 0, y: 0 }))

  const open = (p: Project, ev?: MouseEvent) => {
    if (ev) {
      origin.value.x = ev.clientX
      origin.value.y = ev.clientY
    }
    project.value = p
  }

  const close = () => {
    project.value = null
  }

  return { project, origin, open, close }
}
