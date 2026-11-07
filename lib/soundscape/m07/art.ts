// Restrained, transparent, painterly atmosphere washes (native vector). Atmosphere only: these hues are an ART palette and carry NO interval meaning.
// They are separate from every factual figure and are never captioned as showing a count, an interval or a measurement.
import { LABEL_INK } from '../resources/interval-identity'
import { esc } from '../m03/native-svg'

const ART_PALETTE = { amber: '#f2c08a', orchid: '#cdb0e2', rose: '#eba9bb', teal: '#9fd3cc', plum: LABEL_INK }
function rng(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }

type Bloom = { x: number; y: number; r: number; c: keyof typeof ART_PALETTE; o: number }
function wash(id: string, title: string, desc: string, seed: number, blooms: Bloom[], rings: [number, number, number][]) {
  const R = rng(seed), W = 1200, H = 360
  let g = ''
  blooms.forEach((b, i) => { g += `<circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="url(#${id}-g${i})" filter="url(#${id}-soft)"/>` })
  const defs = blooms.map((b, i) => `<radialGradient id="${id}-g${i}"><stop offset="0" stop-color="${ART_PALETTE[b.c]}" stop-opacity="${b.o}"/><stop offset=".62" stop-color="${ART_PALETTE[b.c]}" stop-opacity="${(b.o * 0.45).toFixed(2)}"/><stop offset="1" stop-color="${ART_PALETTE[b.c]}" stop-opacity="0"/></radialGradient>`).join('')
  // fine contour rings and petal arcs (delicate, low contrast)
  let line = ''
  for (const [cx, cy, r] of rings) {
    for (let k = 0; k < 4; k++) line += `<circle cx="${cx}" cy="${cy}" r="${r * (0.5 + k * 0.17)}" fill="none" stroke="${ART_PALETTE.plum}" stroke-opacity="${0.16 - k * 0.025}" stroke-width="1.1"/>`
    for (let p = 0; p < 12; p++) { const a = (p / 12) * Math.PI * 2 + R() * 0.08; line += `<ellipse cx="${cx + Math.cos(a) * r * 0.46}" cy="${cy + Math.sin(a) * r * 0.46}" rx="${r * 0.26}" ry="${r * 0.07}" transform="rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * r * 0.46} ${cy + Math.sin(a) * r * 0.46})" fill="none" stroke="${ART_PALETTE.plum}" stroke-opacity=".12" stroke-width="1"/>` }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="${id}-t ${id}-d"><title id="${id}-t">${esc(title)}</title><desc id="${id}-d">${esc(desc)}</desc><defs>${defs}<filter id="${id}-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>${g}${line}</svg>\n`
  return { id, title, w: W, h: H, svg }
}
const D = 'Decorative atmosphere only. No notes, intervals or measurements; the colours carry no meaning.'
export const ART = [
  { ...wash('wash-hub', 'Hub atmosphere wash', D, 71, [{ x: 330, y: 190, r: 260, c: 'amber', o: 0.5 }, { x: 600, y: 160, r: 240, c: 'orchid', o: 0.46 }, { x: 860, y: 200, r: 250, c: 'rose', o: 0.4 }, { x: 600, y: 250, r: 190, c: 'teal', o: 0.34 }], [[600, 180, 250]]), group: 'hub' },
  { ...wash('wash-2a', 'Lesson 2A atmosphere wash', D, 72, [{ x: 420, y: 180, r: 270, c: 'amber', o: 0.52 }, { x: 640, y: 200, r: 200, c: 'rose', o: 0.38 }, { x: 800, y: 150, r: 160, c: 'orchid', o: 0.32 }], [[470, 180, 230]]), group: '2A' },
  { ...wash('wash-2b', 'Lesson 2B atmosphere wash', D, 73, [{ x: 300, y: 190, r: 230, c: 'orchid', o: 0.48 }, { x: 900, y: 170, r: 240, c: 'teal', o: 0.42 }, { x: 600, y: 200, r: 170, c: 'amber', o: 0.3 }], [[330, 190, 210], [880, 170, 210]]), group: '2B' },
  { ...wash('wash-2c', 'Lesson 2C atmosphere wash', D, 74, [{ x: 220, y: 200, r: 190, c: 'teal', o: 0.4 }, { x: 520, y: 170, r: 220, c: 'orchid', o: 0.4 }, { x: 820, y: 190, r: 230, c: 'amber', o: 0.42 }, { x: 1020, y: 160, r: 170, c: 'rose', o: 0.34 }], [[560, 180, 220]]), group: '2C' },
]
