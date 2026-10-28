export interface Project {
  tag: string
  company: string
  period: string
  title: string
  summary: string
  description: string
  points: string[]
  stack: string[]
  metric: { value: string; label: string }
}

export interface NavItem {
  id: string
  num: string
  label: string
}

export interface ApproachCard {
  title: string
  text: string
}

export interface Fact {
  value: number
  text: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Job {
  period: string
  place: string
  company: string
  role: string
  points: string[]
  stack: string
}

export interface Course {
  year: string
  title: string
}

export interface Language {
  name: string
  level: string
}
