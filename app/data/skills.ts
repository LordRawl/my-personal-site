import type { SkillGroup } from '~/types/site'

export const marqueeRows = [
  ['Vue 3', 'Nuxt 3', 'TypeScript', 'Vite', 'Pinia', 'Quasar', 'SCSS', 'Tailwind'],
  ['WebSockets', 'REST API', 'FSD', 'Vitest', 'Figma', 'Node.js', 'Git Flow', 'SVG'],
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: [
      'Vue 2/3',
      'Nuxt 2/3',
      'TypeScript',
      'Pinia',
      'Quasar',
      'Tailwind',
      'React',
      'jQuery',
      'Bootstrap',
      'SVG-анимации',
    ],
  },
  { title: 'Сборка', items: ['Vite', 'Webpack', 'Gulp', 'Parcel'] },
  {
    title: 'Тесты и данные',
    items: ['Vitest', 'Vue Test Utils', 'REST API', 'WebSockets'],
  },
  { title: 'Дизайн', items: ['Figma', 'Photoshop', 'Zeplin', 'Illustrator'] },
  {
    title: 'Дополнительно',
    items: ['Node.js', 'Twig', 'Blade', 'Tilda', 'GetCourse', 'Git Flow'],
  },
  { title: 'Методологии', items: ['БЭМ', 'Pixel Perfect', 'FSD'] },
]
