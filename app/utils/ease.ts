export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from))
  return t * t * (3 - 2 * t)
}

export const easeOut3 = (p: number) => 1 - Math.pow(1 - p, 3)

export const easeInOut3 = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
