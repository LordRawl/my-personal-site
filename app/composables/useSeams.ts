import { clamp01, easeInOut3, easeOut3, smoothstep } from '~/utils/ease'

let seed = 11
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
const jitter: number[] = []
for (let i = 0; i < 64; i++) jitter.push(random() * 2 - 1)

const NS = 'http://www.w3.org/2000/svg'

const profiles: Record<
  string,
  (x: number, p: number, H: number, i: number, low: number) => number
> = {
  slash(x, p, H, _i, low) {
    const t = p * p * (3 - 2 * p)
    return H - (H - H * x * (1 + (low || 0))) * t
  },
  ridge(x, p, H, i) {
    const yf = Math.max(
      H * 0.06,
      H * (0.16 + 0.84 * smoothstep(0.5, 0.85, x)) +
        jitter[i] * H * 0.07 * smoothstep(0.05, 0.5, 1 - Math.abs(x - 0.5) * 1.4),
    )
    const e = easeOut3(clamp01((p - x * 0.55) / 0.45))
    return Math.max(
      H * 0.05,
      H -
        (H - yf) * e +
        jitter[i] * H * 0.025 * Math.sin(p * 9 + i) * e +
        H * 0.16 * Math.sin(x * Math.PI * 5.2 + 1.1) * e * (1 - smoothstep(0.55, 0.95, x)) +
        H * 0.05 * Math.sin(x * Math.PI * 13 + p * 3) * e,
    )
  },
  wave(x, p, H) {
    const e = easeInOut3(p)
    return (
      H * (1 - e) +
      H * 0.3 * Math.sin(x * Math.PI * 3 + p * 5) * (0.55 + 0.45 * Math.sin(Math.PI * e))
    )
  },
}

const strokeOf: Record<string, string> = {
  dark: '#f3e9df',
  light: '#0b0705',
  red: '#0b0705',
}
const tones: Record<string, string> = { dark: '#0b0705', light: '#f3e9df' }

const bezier = (pts: [number, number][]) => {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, pts.length - 1)]
    d +=
      ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)}` +
      ` ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)}` +
      ` ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export interface Seam {
  box: HTMLElement
  size: () => void
  draw: (p: number, reduce: boolean) => void
}

export const createSeams = (): Seam[] => {
  const make = (name: string, attrs: Record<string, string> = {}) => {
    const el = document.createElementNS(NS, name)
    for (const key in attrs) el.setAttribute(key, attrs[key])
    return el
  }

  return Array.from(document.querySelectorAll<HTMLElement>('.seam')).map((box) => {
    const fx = box.dataset.fx || 'ridge'
    const num = box.dataset.num || ''
    const from = box.dataset.from || 'dark'
    const to = box.dataset.to || 'dark'
    const flip = box.dataset.flip === '1'
    const bare = box.dataset.bare === '1'

    const svg = make('svg')
    svg.setAttribute('class', 'seam__svg')
    box.appendChild(svg)

    const cid = `c${Math.random().toString(36).slice(2, 8)}`
    const clip = make('clipPath', { id: cid })
    const clipPath = make('path')
    clip.appendChild(clipPath)
    const defs = make('defs')
    defs.appendChild(clip)
    svg.appendChild(defs)

    const fill = make('path', { class: 'seam__fill' })
    const textPrev = make('text', { class: 'seam__text', stroke: strokeOf[from] })
    const textNext = make('text', {
      class: 'seam__text',
      stroke: strokeOf[to],
      'clip-path': `url(#${cid})`,
    })

    const caret = fx === 'caret'
    const line1 = make('polyline', {
      fill: 'none',
      stroke: '#E73228',
      'stroke-width': '5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    })
    const line2 = make('polyline', {
      fill: 'none',
      stroke: '#E73228',
      'stroke-width': '5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    })
    const back = make('rect', { x: '0', y: '0', fill: tones[from] })

    if (caret) {
      svg.appendChild(textPrev)
      textPrev.textContent = num
      svg.appendChild(line1)
      svg.appendChild(line2)
    } else if (bare) {
      if (num) {
        svg.appendChild(textPrev)
        textPrev.textContent = num
      }
    } else {
      svg.appendChild(back)
      if (num) {
        svg.appendChild(textPrev)
        svg.appendChild(fill)
        svg.appendChild(textNext)
        textPrev.textContent = num
        textNext.textContent = num
      } else {
        svg.appendChild(fill)
      }
    }

    let W = 0
    let H = 0

    const size = () => {
      const r = box.getBoundingClientRect()
      W = Math.round(r.width)
      H = Math.round(r.height)
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      back.setAttribute('width', String(W))
      back.setAttribute('height', String(H * 1.6))
      for (const t of [textPrev, textNext]) {
        const fontSize = H * 0.77 * (window.innerWidth < 700 ? 0.8 : 1)
        t.setAttribute('font-size', String(fontSize))
        t.setAttribute('x', String(Math.min(W * 0.7, W - 16 - fontSize * 1.15)))
        t.setAttribute('y', String(H + (caret ? H * 0.557 + 16 : 0)))
      }
    }

    const draw = (p: number, reduce: boolean) => {
      if (caret) {
        const half = Math.min(640, Math.max(240, W * 0.4)) / 2
        const dd = easeInOut3(clamp01(p / 0.5)) * 72
        const yc = H * 0.621 + 8 - 25
        const y2 = yc + easeInOut3(clamp01((p - 0.5) / 0.5)) * 50
        const points = (y: number) =>
          `${W / 2 - half},${y - dd / 2} ${W / 2},${y + dd / 2} ${W / 2 + half},${y - dd / 2}`
        line1.setAttribute('points', points(yc))
        line2.setAttribute('points', points(y2))
        line2.style.opacity = p > 0.5 ? '1' : '0'
        textPrev.style.opacity = reduce ? '1' : String(smoothstep(0.3, 0.85, p))
        return
      }

      const opacity = reduce ? 1 : smoothstep(0.3, 0.85, p)
      textPrev.style.opacity = String(opacity)
      if (bare) return
      textNext.style.opacity = String(opacity)

      const n = fx === 'slash' ? 2 : 56
      const profile = profiles[fx] || profiles.ridge
      let ys: number[] = []
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1)
        ys.push(
          profile(flip ? 1 - x : x, p, H, i % 64, Number(box.dataset.low) || 0) * 0.5,
        )
      }
      if (n > 2) {
        for (let k = 0; k < 2; k++) {
          ys = ys.map(
            (y, i) => (ys[Math.max(i - 1, 0)] + y * 2 + ys[Math.min(i + 1, n - 1)]) / 4,
          )
        }
      }
      const pts: [number, number][] = []
      for (let i = 0; i < n; i++) pts.push([(i / (n - 1)) * W, ys[i]])
      const d = `${bezier(pts)}L${W} ${H * 2}L0 ${H * 2}Z`
      fill.setAttribute('d', d)
      clipPath.setAttribute('d', d)
    }

    size()
    draw(0, false)
    return { box, size, draw }
  })
}
