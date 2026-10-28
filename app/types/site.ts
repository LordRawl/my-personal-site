export interface Project {
  id: string
  title: string
  company: string
  year: string
  tag: string
  summary: string
  details: string[]
  stack: string[]
  metric: { value: string; label: string }
}
