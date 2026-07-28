import type { NoteEvent, ChordEvent } from './types'
import { makeChordEvent } from './theory'

// Danny Boy — opening 8 bars, key of D, 4/4
// MIDI: D4=62, E4=64, F#4=66, G4=67, A4=69, B4=71, C#5=73, D5=74, A3=57, B3=59
export const DANNY_BOY_MELODY: NoteEvent[] = [
  // Bar 1: "Oh Danny"
  { pitch: 62, startBeat: 1, durationBeats: 1, voice: 'melody' },  // D4 (pickup)
  // Bar 2: "boy, the pipes, the pipes are"
  { pitch: 66, startBeat: 4, durationBeats: 2, voice: 'melody' },  // F#4
  { pitch: 69, startBeat: 6, durationBeats: 1, voice: 'melody' },  // A4
  { pitch: 67, startBeat: 7, durationBeats: 1, voice: 'melody' },  // G4
  // Bar 3: "calling"
  { pitch: 69, startBeat: 8, durationBeats: 3, voice: 'melody' },  // A4
  { pitch: 67, startBeat: 11, durationBeats: 1, voice: 'melody' }, // G4
  // Bar 4: "from glen"
  { pitch: 66, startBeat: 12, durationBeats: 2, voice: 'melody' }, // F#4
  { pitch: 64, startBeat: 14, durationBeats: 1, voice: 'melody' }, // E4
  { pitch: 62, startBeat: 15, durationBeats: 1, voice: 'melody' }, // D4
  // Bar 5: "to glen"
  { pitch: 66, startBeat: 16, durationBeats: 3, voice: 'melody' }, // F#4
  { pitch: 62, startBeat: 19, durationBeats: 1, voice: 'melody' }, // D4
  // Bar 6: "and down"
  { pitch: 67, startBeat: 20, durationBeats: 2, voice: 'melody' }, // G4
  { pitch: 66, startBeat: 22, durationBeats: 1, voice: 'melody' }, // F#4
  { pitch: 64, startBeat: 23, durationBeats: 1, voice: 'melody' }, // E4
  // Bar 7: "the mountain"
  { pitch: 66, startBeat: 24, durationBeats: 2, voice: 'melody' }, // F#4
  { pitch: 64, startBeat: 26, durationBeats: 1, voice: 'melody' }, // E4
  { pitch: 62, startBeat: 27, durationBeats: 1, voice: 'melody' }, // D4
  // Bar 8: "side"
  { pitch: 62, startBeat: 28, durationBeats: 4, voice: 'melody' }, // D4
]

export const DANNY_BOY_CHORDS: ChordEvent[] = [
  makeChordEvent('D',  4, 4),
  makeChordEvent('G',  8, 4),
  makeChordEvent('D',  12, 2),
  makeChordEvent('A',  14, 2),
  makeChordEvent('D',  16, 4),
  makeChordEvent('G',  20, 4),
  makeChordEvent('D',  24, 2),
  makeChordEvent('A',  26, 2),
  makeChordEvent('D',  28, 4),
]

// The Water Is Wide — opening 8 bars, D major / DADGAD-friendly, 4/4
// A simpler tune, good for demonstrating drone voice
export const WATER_IS_WIDE_MELODY: NoteEvent[] = [
  // Bar 1
  { pitch: 62, startBeat: 0,  durationBeats: 1, voice: 'melody' }, // D4
  { pitch: 67, startBeat: 1,  durationBeats: 1, voice: 'melody' }, // G4
  { pitch: 69, startBeat: 2,  durationBeats: 2, voice: 'melody' }, // A4
  // Bar 2
  { pitch: 71, startBeat: 4,  durationBeats: 2, voice: 'melody' }, // B4
  { pitch: 69, startBeat: 6,  durationBeats: 1, voice: 'melody' }, // A4
  { pitch: 67, startBeat: 7,  durationBeats: 1, voice: 'melody' }, // G4
  // Bar 3
  { pitch: 69, startBeat: 8,  durationBeats: 3, voice: 'melody' }, // A4
  { pitch: 67, startBeat: 11, durationBeats: 1, voice: 'melody' }, // G4
  // Bar 4
  { pitch: 66, startBeat: 12, durationBeats: 2, voice: 'melody' }, // F#4
  { pitch: 62, startBeat: 14, durationBeats: 2, voice: 'melody' }, // D4
  // Bar 5
  { pitch: 62, startBeat: 16, durationBeats: 1, voice: 'melody' }, // D4
  { pitch: 67, startBeat: 17, durationBeats: 1, voice: 'melody' }, // G4
  { pitch: 69, startBeat: 18, durationBeats: 2, voice: 'melody' }, // A4
  // Bar 6
  { pitch: 71, startBeat: 20, durationBeats: 2, voice: 'melody' }, // B4
  { pitch: 73, startBeat: 22, durationBeats: 1, voice: 'melody' }, // C#5
  { pitch: 74, startBeat: 23, durationBeats: 1, voice: 'melody' }, // D5
  // Bar 7
  { pitch: 73, startBeat: 24, durationBeats: 2, voice: 'melody' }, // C#5
  { pitch: 71, startBeat: 26, durationBeats: 2, voice: 'melody' }, // B4
  // Bar 8
  { pitch: 69, startBeat: 28, durationBeats: 4, voice: 'melody' }, // A4
]

export const WATER_IS_WIDE_CHORDS: ChordEvent[] = [
  makeChordEvent('D',   0,  4),
  makeChordEvent('G',   4,  4),
  makeChordEvent('D',   8,  2),
  makeChordEvent('A',   10, 2),
  makeChordEvent('D',   12, 4),
  makeChordEvent('D',   16, 4),
  makeChordEvent('Bm',  20, 2),
  makeChordEvent('A',   22, 2),
  makeChordEvent('D',   24, 2),
  makeChordEvent('A',   26, 2),
  makeChordEvent('D',   28, 4),
]

export const SAMPLE_MELODIES: Record<string, { label: string; melody: NoteEvent[]; chords: ChordEvent[] }> = {
  'danny-boy': {
    label: 'Danny Boy',
    melody: DANNY_BOY_MELODY,
    chords: DANNY_BOY_CHORDS,
  },
  'water-is-wide': {
    label: 'The Water Is Wide',
    melody: WATER_IS_WIDE_MELODY,
    chords: WATER_IS_WIDE_CHORDS,
  },
}
