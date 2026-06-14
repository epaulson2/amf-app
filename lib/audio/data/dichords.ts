export interface SoundFactorMix {
  pulsation: number    // 0–10: 0=masked (short+wet), 10=exposed (long+dry)
  harmonicity: number  // 0–10: 0=clean (Chebyshev order 1), 10=harmonically rich (order 5)
  foFactor: number     // 0–10: 0=balanced (no doubling), 10=shadow note prominent
}

export const DEFAULT_MIX: SoundFactorMix = { pulsation: 5, harmonicity: 3, foFactor: 3 }

export type PulsationFamily = 'dissonant' | 'modal' | 'perfect'
export type FODirection = 'down' | 'both' | 'up'
export type HarmonicityLevel = 'very-low' | 'low' | 'med-low' | 'medium' | 'med-high' | 'high'
export type Timbre = 'sine' | 'triangle' | 'sawtooth' | 'complex'

// ── Instrument presets ────────────────────────────────────────────────────────
export type InstrumentId = 'pad' | 'piano' | 'guitar' | 'strings' | 'organ'

export interface InstrumentPreset {
  id: InstrumentId
  label: string
  icon: string
  description: string
  oscillatorType: OscillatorType
  envelope: { attack: number; decay: number; sustain: number; release: number }
}

export const INSTRUMENT_PRESETS: Record<InstrumentId, InstrumentPreset> = {
  pad: {
    id: 'pad', label: 'Synth Pad', icon: '◎',
    description: 'Neutral — pure analysis mode',
    oscillatorType: 'sine',
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.85, release: 1.2 },
  },
  piano: {
    id: 'piano', label: 'Piano', icon: '♪',
    description: 'Fast attack, natural percussive decay',
    oscillatorType: 'triangle',
    envelope: { attack: 0.01, decay: 0.8, sustain: 0.3, release: 1.5 },
  },
  guitar: {
    id: 'guitar', label: 'Guitar', icon: '♩',
    description: 'Pluck — sharp attack, fast decay',
    oscillatorType: 'sawtooth',
    envelope: { attack: 0.005, decay: 0.4, sustain: 0.1, release: 0.8 },
  },
  strings: {
    id: 'strings', label: 'Strings', icon: '≋',
    description: 'Slow bow — long attack, sustained',
    oscillatorType: 'sawtooth',
    envelope: { attack: 0.4, decay: 0.2, sustain: 0.8, release: 1.8 },
  },
  organ: {
    id: 'organ', label: 'Organ', icon: '⊞',
    description: 'Instant on/off — Hammond feel',
    oscillatorType: 'square',
    envelope: { attack: 0.01, decay: 0.01, sustain: 1.0, release: 0.05 },
  },
}

export const DEFAULT_INSTRUMENT: InstrumentId = 'pad'

export interface DiChord {
  bracket: number
  name: string
  semitones: number
  pulsationHz: 2 | 4 | 8
  pulsationFamily: PulsationFamily
  harmonicity: HarmonicityLevel
  harmonicityScore: number       // 0–100, for positioning marker on bar
  isHarmonic: boolean            // true = open/light; false = closed/dark; [6] = false
  foDirection: FODirection
  feel: string
  foLabel: string                // plain-English F/O explanation
  discriminationHint: string     // shown after wrong drill answer
  color: string                  // CSS hex for pulsation-family accent
}

export const DICHORDS: DiChord[] = [
  {
    bracket: 1,
    name: 'Minor 2nd',
    semitones: 1,
    pulsationHz: 8,
    pulsationFamily: 'dissonant',
    harmonicity: 'very-low',
    harmonicityScore: 5,
    isHarmonic: false,
    foDirection: 'down',
    feel: 'Harsh, biting — maximum tension',
    foLabel: 'The lower note pulls your ear strongly downward',
    discriminationHint: '[1] is the harshest di-chord — fastest beating, maximum roughness. Almost painful at close range.',
    color: '#dc2626',
  },
  {
    bracket: 2,
    name: 'Major 2nd',
    semitones: 2,
    pulsationHz: 8,
    pulsationFamily: 'dissonant',
    harmonicity: 'low',
    harmonicityScore: 22,
    isHarmonic: true,
    foDirection: 'down',
    feel: 'Buzzy, energetic — wants to move',
    foLabel: 'The lower note pulls your ear downward',
    discriminationHint: '[2] has fast 8Hz beating but more open color than [1] — buzzy, energetic, not quite as harsh.',
    color: '#dc2626',
  },
  {
    bracket: 3,
    name: 'Minor 3rd',
    semitones: 3,
    pulsationHz: 4,
    pulsationFamily: 'modal',
    harmonicity: 'medium',
    harmonicityScore: 48,
    isHarmonic: false,
    foDirection: 'down',
    feel: 'Warm, shadowed — the minor sound',
    foLabel: 'The lower note pulls your ear downward',
    discriminationHint: '[3] is darker and more shadowed than [4] — same 4Hz pulsation family, but the color is minor, closed.',
    color: '#7c3aed',
  },
  {
    bracket: 4,
    name: 'Major 3rd',
    semitones: 4,
    pulsationHz: 4,
    pulsationFamily: 'modal',
    harmonicity: 'med-high',
    harmonicityScore: 65,
    isHarmonic: true,
    foDirection: 'down',
    feel: 'Bright, warm — the major sound',
    foLabel: 'The lower note pulls your ear downward',
    discriminationHint: '[4] is brighter and warmer than [3] — same 4Hz beating, but the color opens up. This is the major sound.',
    color: '#7c3aed',
  },
  {
    bracket: 5,
    name: 'Perfect 4th',
    semitones: 5,
    pulsationHz: 2,
    pulsationFamily: 'perfect',
    harmonicity: 'high',
    harmonicityScore: 80,
    isHarmonic: false,
    foDirection: 'down',
    feel: 'Open, reaching — suspended',
    foLabel: 'The lower note pulls your ear strongly downward',
    discriminationHint: '[5] has the slowest beating in the downward-referring group — open, stable, reaching. Feels suspended.',
    color: '#16a34a',
  },
  {
    bracket: 6,
    name: 'Tritone',
    semitones: 6,
    pulsationHz: 8,
    pulsationFamily: 'dissonant',
    harmonicity: 'very-low',
    harmonicityScore: 8,
    isHarmonic: false,
    foDirection: 'both',
    feel: 'Maximum harmonic tension — unstable in both directions',
    foLabel: 'Both notes pull equally — no clear center',
    discriminationHint: '[6] is unique: both notes pull in opposite directions simultaneously. Maximum tension, completely ambiguous.',
    color: '#dc2626',
  },
  {
    bracket: 7,
    name: 'Perfect 5th',
    semitones: 7,
    pulsationHz: 2,
    pulsationFamily: 'perfect',
    harmonicity: 'high',
    harmonicityScore: 85,
    isHarmonic: true,
    foDirection: 'up',
    feel: 'Hollow, stable — farthest stable reach',
    foLabel: 'The upper note leads your ear upward',
    discriminationHint: '[7] is the most stable di-chord — slowest beating, highly harmonic, upper note leads clearly.',
    color: '#16a34a',
  },
  {
    bracket: 8,
    name: 'Minor 6th',
    semitones: 8,
    pulsationHz: 4,
    pulsationFamily: 'modal',
    harmonicity: 'medium',
    harmonicityScore: 45,
    isHarmonic: false,
    foDirection: 'up',
    feel: 'Dark, tender — minor from below',
    foLabel: 'The upper note leads your ear upward',
    discriminationHint: '[8] is the minor-colored upward-referring di-chord — dark and tender. Compare to [3] which is also minor-colored but refers down.',
    color: '#7c3aed',
  },
  {
    bracket: 9,
    name: 'Major 6th',
    semitones: 9,
    pulsationHz: 4,
    pulsationFamily: 'modal',
    harmonicity: 'med-high',
    harmonicityScore: 68,
    isHarmonic: true,
    foDirection: 'up',
    feel: 'Bright, lifting — emotional openness',
    foLabel: 'The upper note leads your ear upward',
    discriminationHint: '[9] is bright and lifting — the major-colored version of [8]. Upper note leads, warm and open.',
    color: '#7c3aed',
  },
  {
    bracket: 10,
    name: 'Minor 7th',
    semitones: 10,
    pulsationHz: 4,
    pulsationFamily: 'modal',
    harmonicity: 'med-low',
    harmonicityScore: 35,
    isHarmonic: true,
    foDirection: 'up',
    feel: 'Incomplete, longing — wants resolution',
    foLabel: 'The upper note leads your ear upward',
    discriminationHint: '[10] has a longing, incomplete quality — the dominant 7th sound. Harmonic but restless, upper note reaching.',
    color: '#7c3aed',
  },
  {
    bracket: 11,
    name: 'Major 7th',
    semitones: 11,
    pulsationHz: 8,
    pulsationFamily: 'dissonant',
    harmonicity: 'low',
    harmonicityScore: 20,
    isHarmonic: false,
    foDirection: 'up',
    feel: 'Bright tension — close to the octave',
    foLabel: 'The upper note leads your ear upward',
    discriminationHint: '[11] has fast 8Hz beating and is very close to the octave — bright tension, almost resolved but not quite.',
    color: '#dc2626',
  },
]

export function getDiChord(bracket: number): DiChord {
  const d = DICHORDS.find(d => d.bracket === bracket)
  if (!d) throw new Error(`No di-chord for bracket ${bracket}`)
  return d
}

export const PULSATION_FAMILIES = {
  dissonant: { label: '8 Hz — Dissonant', color: '#dc2626', bgColor: 'rgba(220,38,38,0.1)', brackets: [1, 2, 6, 11] },
  modal:     { label: '4 Hz — Modal',     color: '#7c3aed', bgColor: 'rgba(124,58,237,0.1)', brackets: [3, 4, 8, 9, 10] },
  perfect:   { label: '2 Hz — Perfect',   color: '#16a34a', bgColor: 'rgba(22,163,74,0.1)',  brackets: [5, 7] },
} as const
