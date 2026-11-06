// AUTHORITATIVE, VERSIONED source for the Interval Palette identity colours and the historic Plogger di-chord lens.
// Standard: AJOURNE_INTERVAL_PALETTE_CANONICAL_COLOR_AND_THREE_FACTOR_DESIGN_STANDARD_V1 (2026-11-06).
// Nothing else in the repo may hard-code these hexes; figures import from here. Changing a value is a controlled, documented migration.
//
// Identity colours are an agreed ARTISTIC identifier. They are not a property of the sound. A label (name, number, notes) always accompanies them.
// Namespaces: source cards IP-00..IP-12 (semitones 0..12); illustration ids IPV-10..IPV-22; Plogger brackets [1]..[11] are a third, separate field.

export const IDENTITY_VERSION = '1.0'
export const PAPER = '#F9F5ED'
export const LABEL_INK = '#4C2748'

export type IdentityColor = { hex: string; accent: string; previousHex: string }
/** INTERVAL_IDENTITY_COLORS_V1, keyed by source id. `previousHex` is the earlier candidate still stored in interval-data.json (kept, not overwritten). */
export const INTERVAL_IDENTITY_COLORS_V1: Record<string, IdentityColor> = {
  'IP-00': { hex: '#76848C', accent: 'Pearl slate', previousHex: '#8D9BA4' },
  'IP-01': { hex: '#C25562', accent: 'Soft coral', previousHex: '#D96569' },
  'IP-02': { hex: '#C17D41', accent: 'Apricot ochre', previousHex: '#CE8748' },
  'IP-03': { hex: '#8964A4', accent: 'Orchid violet', previousHex: '#926DA7' },
  'IP-04': { hex: '#AB812D', accent: 'Antique amber', previousHex: '#CB9B35' },
  'IP-05': { hex: '#4F816B', accent: 'Sage teal', previousHex: '#5D9075' },
  'IP-06': { hex: '#5366A0', accent: 'Deep periwinkle', previousHex: '#5869A6' },
  'IP-07': { hex: '#347B97', accent: 'Lake blue', previousHex: '#447FA4' },
  'IP-08': { hex: '#A95E86', accent: 'Rose orchid', previousHex: '#B26A91' },
  'IP-09': { hex: '#B47752', accent: 'Warm terracotta', previousHex: '#C98D69' },
  'IP-10': { hex: '#367C79', accent: 'Deep sea teal', previousHex: '#48858A' },
  'IP-11': { hex: '#7978B3', accent: 'Dusty lilac', previousHex: '#8A8FC6' },
  'IP-12': { hex: '#89845D', accent: 'Silver olive gold', previousHex: '#A7A078' },
}
export const identityHex = (semitones: number) => INTERVAL_IDENTITY_COLORS_V1['IP-' + String(semitones).padStart(2, '0')].hex

export type Shape = 'jagged' | 'rounded' | 'straight'
export type Dir = 'F' | 'both' | 'O'
export type Fill = 'dark' | 'light' | 'neutral' | 'half'
export type PloggerEntry = { shape: Shape; dir: Dir; fill: Fill }
/** PLOGGER_LENS_V1: the 11-entry historic mapping from the archived printed pictograph and app/DiChordPictograph.tsx. Bracket [n] = n semitones.
 *  Disputed in older code: [6] (shape/family) and [10] (family). This table deliberately follows the printed original and says so in every legend. */
export const PLOGGER_LENS_V1: Record<number, PloggerEntry> = {
  1: { shape: 'jagged', dir: 'F', fill: 'dark' },
  2: { shape: 'jagged', dir: 'F', fill: 'light' },
  3: { shape: 'rounded', dir: 'F', fill: 'dark' },
  4: { shape: 'rounded', dir: 'F', fill: 'light' },
  5: { shape: 'straight', dir: 'F', fill: 'dark' },
  6: { shape: 'straight', dir: 'both', fill: 'neutral' },
  7: { shape: 'straight', dir: 'O', fill: 'light' },
  8: { shape: 'rounded', dir: 'O', fill: 'dark' },
  9: { shape: 'rounded', dir: 'O', fill: 'half' },
  10: { shape: 'jagged', dir: 'O', fill: 'light' },
  11: { shape: 'jagged', dir: 'O', fill: 'dark' },
}
export const PLOGGER_LINEAGE = 'Archived printed pictograph (R2_pictograph_reference.html) and app/DiChordPictograph.tsx'
export const hasPlogger = (semitones: number) => semitones >= 1 && semitones <= 11
export const SHAPE_LABEL: Record<Shape, string> = { jagged: 'Dissonant family (jagged)', rounded: 'Modal family (rounded)', straight: 'Perfect-group family (straight)' }
export const SHAPE_SHORT: Record<Shape, string> = { jagged: 'jagged', rounded: 'rounded', straight: 'straight' }
export const DIR_LABEL: Record<Dir, string> = { F: '← Fundamental', both: '↔ Both (midpoint)', O: '→ Octave' }
export const DIR_SHORT: Record<Dir, string> = { F: '← F', both: '↔ both', O: '→ O' }
export const FILL_LABEL: Record<Fill, string> = { dark: 'Non-harmonic (Plogger), dense/dark', light: 'Harmonic (Plogger), open/light', neutral: 'Neutral (Plogger), midtone dotted', half: 'False-harmonic (Plogger), half-filled/hatched' }
export const FILL_SHORT: Record<Fill, string> = { dark: 'dark', light: 'light', neutral: 'midtone', half: 'hatched' }

/** Which of the three Plogger factors are the same or different between two intervals. null when either interval is a boundary (0 or 12). */
export function ploggerDiff(a: number, b: number) {
  if (!hasPlogger(a) || !hasPlogger(b)) return null
  const x = PLOGGER_LENS_V1[a], y = PLOGGER_LENS_V1[b]
  return { shape: x.shape === y.shape, dir: x.dir === y.dir, fill: x.fill === y.fill }
}

// ---- colour maths (used by figures and by the contrast check) ----
const h2r = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
export const r2h = (r: number[]) => '#' + r.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
/** `t` is the share of `hex`; the rest is `base` (default white). */
export const tint = (hex: string, t: number, base = '#ffffff') => { const a = h2r(hex), b = h2r(base); return r2h(a.map((v, i) => v * t + b[i] * (1 - t))) }
const lin = (v: number) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }
export const luminance = (hex: string) => { const [r, g, b] = h2r(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) }
export const contrast = (a: string, b: string) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
