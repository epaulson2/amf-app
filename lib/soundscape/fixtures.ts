// Fixed musical examples. The data is the immutable import of AMF asset data
// (epaulson2/AMF, branch assets/soundscape-w78-20261105, commit bcc467c,
// 04-curriculum/tracks/soundscape-path/assets/_source-register/w78_data_v1.json,
// data_sha256 c154be714472b623c968419d4b080b03bfba50b6e4ab304d5bd38e35f90c8d8a).
// It is bundled at build time; nothing is fetched at runtime.
import raw from './source/w78_data_v1.json'
import { midiToName } from './midi'

export type NoteEvent = { midi: number; start: number; dur: number; role: 'drone' | 'melody' | 'pivot' }
export type Patch = { id: 'plain' | 'rich'; harmonics: number[]; lowpassHz: number | null; attack: number; release: number }

export const PROVENANCE = {
  repo: 'epaulson2/AMF',
  branch: 'assets/soundscape-w78-20261105',
  commit: 'bcc467c',
  dataFile: 'w78_data_v1.json',
  dataSha256: raw.data_sha256,
  svg: 'W7-02_one-key-spotlight_source.svg',
} as const

const drone: NoteEvent = { midi: raw.drone.midi, start: raw.drone.start, dur: raw.drone.dur, role: 'drone' }

function melody(v: 'A' | 'B'): NoteEvent[] {
  return raw.melody[v].map(e => ({
    midi: e.midi,
    start: e.start,
    dur: e.dur,
    role: e.midi % 12 === 5 || e.midi % 12 === 6 ? 'pivot' : 'melody',
  }))
}

export const PATCHES: Record<'plain' | 'rich', Patch> = {
  plain: { id: 'plain', harmonics: raw.patches.plain.harmonics, lowpassHz: raw.patches.plain.lowpass_hz, attack: raw.patches.plain.attack_s, release: raw.patches.plain.release_s },
  rich: { id: 'rich', harmonics: raw.patches.rich.harmonics, lowpassHz: raw.patches.rich.lowpass_hz, attack: raw.patches.rich.attack_s, release: raw.patches.rich.release_s },
}

// 7A: same C3 drone, rhythm and patch; only the two F events differ (F4 = 65 vs F♯4 = 66).
export const W7A = {
  id: '7A-AB',
  duration: 16,
  drone,
  A: [drone, ...melody('A')],
  B: [drone, ...melody('B')],
  // Short "changed pitch only" demonstration (fixture_7A.changed_pitch_only_demo): F4 then F♯4 over the drone.
  changedPitchOnly: [
    { ...drone, dur: 5 },
    { midi: raw.changed_pitch.from, start: 0, dur: 2, role: 'pivot' as const },
    { midi: raw.changed_pitch.to, start: 3, dur: 2, role: 'pivot' as const },
  ] as NoteEvent[],
  facts: raw.facts,
}

export function noteList(events: NoteEvent[]): string[] {
  return [...events]
    .sort((a, b) => a.start - b.start || a.midi - b.midi)
    .map(e => `${midiToName(e.midi)} (MIDI ${e.midi}) · ${e.start} s to ${+(e.start + e.dur).toFixed(2)} s${e.role === 'drone' ? ' · held low note' : ''}`)
}

// Entry-page "Start with one note" demo. Pitches follow the approved text fallback:
// "Hold C3 while playing E4, then G4, above it."  Plain patch, short.
const C3 = raw.drone.midi
export const ENTRY_DEMO = {
  home: [{ midi: C3, start: 0, dur: 4, role: 'drone' as const }] as NoteEvent[],
  visitorE: [{ midi: C3, start: 0, dur: 6, role: 'drone' as const }, { midi: 64, start: 2, dur: 4, role: 'melody' as const }] as NoteEvent[],
  visitorG: [{ midi: C3, start: 0, dur: 6, role: 'drone' as const }, { midi: 67, start: 2, dur: 4, role: 'melody' as const }] as NoteEvent[],
}
