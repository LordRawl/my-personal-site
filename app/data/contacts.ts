import { profile } from '~/data/profile'

export const contacts = [
  {
    icon: 'send',
    label: 'Telegram',
    value: profile.telegramHandle,
    href: profile.telegram,
    note: 'Предпочтительный способ связи',
  },
  {
    icon: 'github',
    label: 'GitHub',
    value: 'lordrawl',
    href: profile.github,
    note: 'Пет-проекты и эксперименты',
  },
  {
    icon: 'mail',
    label: 'Почта',
    value: profile.email,
    href: `mailto:${profile.email}`,
    note: 'Для офферов и документов',
  },
  {
    icon: 'phone',
    label: 'Телефон',
    value: profile.phone,
    href: 'tel:+79530397341',
    note: 'Звонок по договорённости',
  },
]
