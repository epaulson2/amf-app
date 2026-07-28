export type MidiPitch = number

export type VoiceType = 'melody' | 'bass' | 'inner' | 'drone'

export type ArrangementMode = 'simple' | 'drone' | 'harmonic' | 'voice-led'
  | 'first-species' | 'second-species' | 'free-counterpoint' | 'imitation'

export type CounterpointMode = 'first-species' | 'second-species' | 'free-counterpoint' | 'imitation'

export const CP_MODES = new Set<ArrangementMode>(['first-species', 'second-species', 'free-counterpoint', 'imitation'])

export interface NoteEvent {
  pitch: MidiPitch
  startBeat: number      // quarter-note beats from start of piece
  durationBeats: number
  voice: VoiceType
  tie?: boolean          // ties to previous note of same pitch/voice
}

export interface ChordEvent {
  symbol: string         // e.g. "Am", "G", "Dsus2"
  root: string           // "A", "G", "D"
  quality: string        // "m", "", "sus2", "7", etc.
  tones: MidiPitch[]     // chord tones as MIDI class 0-11
  startBeat: number
  durationBeats: number
}

export interface Tuning {
  name: string
  strings: MidiPitch[]   // open-string MIDI pitches, index 0 = lowest string
  maxFret: number
}

export interface FretPosition {
  string: number         // 0 = lowest string
  fret: number
  pitch: MidiPitch
}

export interface GuitarNote extends NoteEvent {
  string: number
  fret: number
}

export interface Measure {
  number: number
  startBeat: number
  beats: number
  chord: ChordEvent | null
  notes: GuitarNote[]
}

export interface Arrangement {
  mode: ArrangementMode
  tuning: Tuning
  title: string
  tempo: number
  timeSignature: [number, number]
  measures: Measure[]
  guitarNotes: GuitarNote[]
  playabilityScore: number   // 0-1, % of notes successfully solved
  alphatex: string
}

export interface ArrangementRequest {
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
  modes: ArrangementMode[]
  title?: string
  tempo?: number
  timeSignature?: [number, number]
}

export interface ArrangementResponse {
  arrangements: Arrangement[]
  error?: string
}
