import type { ChordEvent, MidiPitch } from './types'

const NOTE_MIDI: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
}

// Semitone intervals from root
const QUALITIES: Record<string, number[]> = {
  '':      [0, 4, 7],       // major
  'maj':   [0, 4, 7],
  'm':     [0, 3, 7],       // minor
  'min':   [0, 3, 7],
  'dim':   [0, 3, 6],
  'aug':   [0, 4, 8],
  'sus2':  [0, 2, 7],
  'sus4':  [0, 5, 7],
  '5':     [0, 7],          // power chord
  '6':     [0, 4, 7, 9],
  'm6':    [0, 3, 7, 9],
  '7':     [0, 4, 7, 10],
  'maj7':  [0, 4, 7, 11],
  'm7':    [0, 3, 7, 10],
  'mmaj7': [0, 3, 7, 11],
  'dim7':  [0, 3, 6, 9],
  'm7b5':  [0, 3, 6, 10],
  'add9':  [0, 4, 7, 14],
  'madd9': [0, 3, 7, 14],
  '9':     [0, 4, 7, 10, 14],
  'maj9':  [0, 4, 7, 11, 14],
  'm9':    [0, 3, 7, 10, 14],
}

export function parseChordSymbol(symbol: string): { root: string; rootMidi: number; quality: string; intervals: number[] } {
  // Match root note (with optional sharp/flat) then quality suffix
  const match = symbol.match(/^([A-G][b#]?)(.*)$/)
  if (!match) return { root: 'C', rootMidi: 0, quality: '', intervals: QUALITIES[''] }

  const root = match[1]
  const quality = match[2].trim()
  const rootMidi = NOTE_MIDI[root] ?? 0
  const intervals = QUALITIES[quality] ?? QUALITIES['']

  return { root, rootMidi, quality, intervals }
}

// Returns chord tones as MIDI pitch classes (0-11)
export function chordToneClasses(symbol: string): number[] {
  const { rootMidi, intervals } = parseChordSymbol(symbol)
  return intervals.map(i => (rootMidi + i) % 12)
}

// Returns chord tones as MIDI pitches, voiced near a target octave
export function chordTonesNearMidi(symbol: string, targetMidi: MidiPitch, spread: number = 12): MidiPitch[] {
  const { rootMidi, intervals } = parseChordSymbol(symbol)
  return intervals.map(interval => {
    const pitchClass = (rootMidi + interval) % 12
    // Find the instance of this pitch class closest to targetMidi
    const base = Math.floor(targetMidi / 12) * 12 + pitchClass
    const candidates = [base - 12, base, base + 12]
    return candidates.reduce((best, c) => Math.abs(c - targetMidi) < Math.abs(best - targetMidi) ? c : best)
  }).filter(p => Math.abs(p - targetMidi) <= spread)
}

// Root pitch in a specific register
export function rootInRegister(symbol: string, minMidi: MidiPitch, maxMidi: MidiPitch): MidiPitch {
  const { rootMidi } = parseChordSymbol(symbol)
  // Find root in range
  for (let octave = 0; octave <= 8; octave++) {
    const pitch = (octave + 1) * 12 + rootMidi
    if (pitch >= minMidi && pitch <= maxMidi) return pitch
  }
  return minMidi + rootMidi
}

// Fifth of the chord in a specific register
export function fifthInRegister(symbol: string, minMidi: MidiPitch, maxMidi: MidiPitch): MidiPitch {
  const { rootMidi, intervals } = parseChordSymbol(symbol)
  const hasFifth = intervals.includes(7) || intervals.includes(6) || intervals.includes(8)
  const fifthInterval = intervals.find(i => i === 7 || i === 6 || i === 8) ?? 7
  const fifthClass = (rootMidi + fifthInterval) % 12
  for (let octave = 0; octave <= 8; octave++) {
    const pitch = (octave + 1) * 12 + fifthClass
    if (pitch >= minMidi && pitch <= maxMidi) return pitch
  }
  return rootInRegister(symbol, minMidi, maxMidi) + 7
}

// Is a given pitch class a chord tone?
export function isChordTone(pitchMidi: MidiPitch, chordSymbol: string): boolean {
  const pc = pitchMidi % 12
  return chordToneClasses(chordSymbol).includes(pc)
}

// Build a ChordEvent from a symbol and timing
export function makeChordEvent(symbol: string, startBeat: number, durationBeats: number): ChordEvent {
  const { root, quality, rootMidi, intervals } = parseChordSymbol(symbol)
  return {
    symbol,
    root,
    quality,
    tones: intervals.map(i => (rootMidi + i) % 12),
    startBeat,
    durationBeats,
  }
}

// Find the chord active at a given beat
export function chordAtBeat(beat: number, chords: ChordEvent[]): ChordEvent | null {
  for (const c of chords) {
    if (beat >= c.startBeat && beat < c.startBeat + c.durationBeats) return c
  }
  return null
}

// Semitone distance, shorter direction
export function semitoneDistance(a: MidiPitch, b: MidiPitch): number {
  const direct = Math.abs(a - b)
  return Math.min(direct, 12 - direct)
}
