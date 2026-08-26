const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const parseDate = (value: string) => {
  const [d, m, y] = value.split('.').map(Number)
  return { d: d ?? 1, m: m ?? 1, y: y ?? 1970 }
}

const pluralRu = (n: number, one: string, few: string, many: string) => {
  const mod100 = Math.abs(n) % 100
  const mod10 = mod100 % 10
  if (mod100 >= 11 && mod100 <= 14) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
}

export const periodLabel = (period: string): string => {
  const fmt = (value: string) => {
    const { m, y } = parseDate(value)
    return `${MONTH_NAMES[m - 1]} ${y}`
  }
  const [start, end] = period.split('-').map((part) => part.trim())
  return end ? `${fmt(start!)} — ${fmt(end)}` : `${fmt(start!)} — настоящее время`
}

export const periodDuration = (period: string): string => {
  const [startStr, endStr] = period.split('-').map((part) => part.trim())
  const start = parseDate(startStr!)
  const now = new Date()
  const end = endStr
    ? parseDate(endStr)
    : { d: now.getDate(), m: now.getMonth() + 1, y: now.getFullYear() }

  let totalMonths = (end.y - start.y) * 12 + (end.m - start.m)
  totalMonths += end.d >= start.d ? 1 : 0
  totalMonths = Math.max(totalMonths, 1)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${pluralRu(years, 'год', 'года', 'лет')}`)
  if (months > 0) parts.push(`${months} ${pluralRu(months, 'месяц', 'месяца', 'месяцев')}`)
  return parts.join(' ') || `1 ${pluralRu(1, 'месяц', 'месяца', 'месяцев')}`
}
