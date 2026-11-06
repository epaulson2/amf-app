// Contrast + colour-vision report for INTERVAL_IDENTITY_COLORS_V1. Run: node --experimental-strip-types --no-warnings --import ./tests/register.mjs docs/m05/tools/check_contrast.mts
import { writeFileSync } from 'node:fs'
import { INTERVAL_IDENTITY_COLORS_V1 as T, PAPER, LABEL_INK, contrast, tint } from '../../../lib/soundscape/resources/interval-identity'
const r2 = (x: number) => Math.round(x * 100) / 100
const per: Record<string, any> = {}
for (const [id, v] of Object.entries(T)) per[id] = { hex: v.hex, accent_on_paper: r2(contrast(v.hex, PAPER)), ink_on_paper: r2(contrast(LABEL_INK, PAPER)), ink_on_key_tint: r2(contrast(LABEL_INK, tint(v.hex, .34))), ink_on_pill_tint: r2(contrast(LABEL_INK, tint(v.hex, .22))), marker_on_key_tint: r2(contrast(v.hex, tint(v.hex, .34))) }
// colour-vision simulation (Viénot 1999 protan/deutan matrices in linear RGB; tritan approximated) and CIELAB distance
const h2r = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = (v: number) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
const M: Record<string, number[][]> = {
  none: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  protan: [[0.11238, 0.88762, 0], [0.11238, 0.88762, 0], [0.00401, -0.00401, 1]],
  deutan: [[0.29275, 0.70725, 0], [0.29275, 0.70725, 0], [-0.02234, 0.02234, 1]],
  tritan: [[1, 0.1273, -0.1273], [0, 0.8739, 0.1261], [0, 0.8739, 0.1261]],
}
const lab = (rgb: number[]) => {
  const [r, g, b] = rgb, X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b, Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]
}
const sim = (hex: string, m: number[][]) => { const c = h2r(hex).map(lin); return lab(m.map(row => Math.max(0, Math.min(1, row[0] * c[0] + row[1] * c[1] + row[2] * c[2])))) }
const ids = Object.keys(T), cvd: Record<string, any> = {}
for (const [name, m] of Object.entries(M)) {
  const L = ids.map(i => sim(T[i].hex, m)); let worst = { d: 1e9, a: '', b: '' }, worstAdj = { d: 1e9, a: '', b: '' }
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const d = Math.hypot(L[i][0] - L[j][0], L[i][1] - L[j][1], L[i][2] - L[j][2])
    if (d < worst.d) worst = { d, a: ids[i], b: ids[j] }
    if (j === i + 1 && d < worstAdj.d) worstAdj = { d, a: ids[i], b: ids[j] }
  }
  cvd[name] = { min_pair_deltaE76: r2(worst.d), min_pair: `${worst.a}/${worst.b}`, min_adjacent_deltaE76: r2(worstAdj.d), min_adjacent: `${worstAdj.a}/${worstAdj.b}` }
}
const fails = Object.entries(per).filter(([, v]) => v.accent_on_paper < 3 || v.ink_on_key_tint < 4.5 || v.ink_on_pill_tint < 4.5).map(([k]) => k)
const out = { standard: 'accent/graphic >= 3:1 on paper; label ink >= 4.5:1 on tints', paper: PAPER, label_ink: LABEL_INK, per_interval: per, failing: fails, colour_vision_simulation: cvd, note: 'Colour is never the sole signal: every mark also carries a text label, note name and semitone count. Simulations are approximate (Vienot protan/deutan; crude tritan).' }
writeFileSync('/home/elderle/amf-work/amf-ajourne-m05/docs/m05/contrast_report.json', JSON.stringify(out, null, 1))
console.log('failing:', fails.join(',') || 'none'); console.log(JSON.stringify(cvd, null, 1)); console.log('min accent/paper', Math.min(...Object.values(per).map((v: any) => v.accent_on_paper)), 'min ink/key tint', Math.min(...Object.values(per).map((v: any) => v.ink_on_key_tint)))
