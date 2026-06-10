// TPS Piano Data — Triad Placement System voicings for piano
// All intervals are semitones above root (root = 0)

export interface TpsPianoVoicing {
  id: string
  name: string
  amfName: string
  description: string
  family: "major" | "dominant" | "minor" | "core"
  priority: "core" | "secondary" | "advanced"
  emotionalQuality: string
  bestUse: string
  /** semitones above root for the full triad (right hand) */
  intervals: number[]
  /** interval (semitones) held in left hand — root only for basic */
  leftHand: number[]
  /** intervals placed in right hand */
  rightHand: number[]
  /** human-readable register guidance */
  registerNote: string
  /** The triad shape: major | minor | diminished | augmented */
  triadType: "major" | "minor" | "diminished" | "augmented"
  /** Placement degree string, e.g. "5 minor", "b7 major" */
  placement: string
}

// ── Note / MIDI helpers ────────────────────────────────────────────────────

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const
type NoteName = (typeof NOTE_NAMES)[number]

// Enharmonic aliases → canonical sharp form
const ENHARMONIC: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Fb: "E",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Cb: "B",
}

export function canonicalNote(note: string): string {
  return ENHARMONIC[note] ?? note
}

/** Convert note name (e.g. "C", "F#", "Bb") to chromatic index 0–11 */
export function noteToIndex(note: string): number {
  const canonical = canonicalNote(note)
  const idx = NOTE_NAMES.indexOf(canonical as NoteName)
  if (idx === -1) throw new Error(`Unknown note: ${note}`)
  return idx
}

/** Convert chromatic index 0–11 to note name — uses sharps by default */
export function indexToNote(idx: number): string {
  return NOTE_NAMES[((idx % 12) + 12) % 12]
}

/** Add semitones to a note name, return note name */
export function addSemitones(note: string, semitones: number): string {
  return indexToNote(noteToIndex(note) + semitones)
}

/**
 * Given a voicing and a root note name, return the actual note names
 * for left and right hand. Octave suffixes are NOT appended — these are
 * pitch-class names (C, F#, Bb, …).
 */
export function getVoicingNotes(
  voicing: TpsPianoVoicing,
  root: string,
): { leftHand: string[]; rightHand: string[] } {
  const leftHand = voicing.leftHand.map((interval) => addSemitones(root, interval))
  const rightHand = voicing.rightHand.map((interval) => addSemitones(root, interval))
  return { leftHand, rightHand }
}

// ── First Seven Placements (core curriculum) ──────────────────────────────

export const tpsPianoColors: TpsPianoVoicing[] = [
  // ── MAJOR FAMILY ────────────────────────────────────────────────────────

  {
    id: "1-major",
    name: "1 major",
    amfName: "Plain Major",
    description: "Root position major triad — the clearest, most grounded major color.",
    family: "major",
    priority: "core",
    emotionalQuality: "Stable, bright, clear",
    bestUse: "Clarity, grounding, simple support",
    intervals: [0, 4, 7],
    leftHand: [0],
    rightHand: [0, 4, 7],
    registerNote: "Left hand: root around C3–C4. Right hand: triad C4–E4–G4.",
    triadType: "major",
    placement: "1 major",
  },
  {
    id: "3-minor",
    name: "3 minor",
    amfName: "Maj7 Compression",
    description: "Minor triad on the 3rd — produces the 3, 5, and 7 over the root. Cmaj7 without the root.",
    family: "major",
    priority: "core",
    emotionalQuality: "Elegant, smooth, resolved",
    bestUse: "Ballads, sophisticated major color, rootless voicings",
    intervals: [4, 7, 11],
    leftHand: [0],
    rightHand: [4, 7, 11],
    registerNote: "Left hand: root. Right hand: minor triad on the 3rd (E4–G4–B4 over C).",
    triadType: "minor",
    placement: "3 minor",
  },
  {
    id: "5-major",
    name: "5 major",
    amfName: "Maj9 Color",
    description: "Major triad on the 5th — produces the 5, 7, and 9. Elegant sophistication without tension.",
    family: "major",
    priority: "core",
    emotionalQuality: "Polished, open, elegant",
    bestUse: "Safe sophistication, jazz comping, ballads",
    intervals: [7, 11, 14],
    leftHand: [0],
    rightHand: [7, 11, 14],
    registerNote: "Left hand: root. Right hand: major triad on 5th (G4–B4–D5 over C).",
    triadType: "major",
    placement: "5 major",
  },
  {
    id: "6-minor",
    name: "6 minor",
    amfName: "Major 6",
    description: "Minor triad on the 6th — produces the 13, root, and 3. Classic warm major color.",
    family: "major",
    priority: "core",
    emotionalQuality: "Warm, classic, inviting",
    bestUse: "Major 6 voicings, gospel warmth, ballad support",
    intervals: [9, 12, 16],
    leftHand: [0],
    rightHand: [9, 12, 16],
    registerNote: "Left hand: root. Right hand: minor triad on 6th (A4–C5–E5 over C).",
    triadType: "minor",
    placement: "6 minor",
  },
  {
    id: "2-major",
    name: "2 major",
    amfName: "Lydian Color",
    description: "Major triad on the 2nd — produces the 9, #11, and 13. The floating Lydian color.",
    family: "major",
    priority: "core",
    emotionalQuality: "Floating, cinematic, modern, open",
    bestUse: "Lydian harmony, film music, chorus lifts, modern jazz",
    intervals: [2, 6, 9],
    leftHand: [0],
    rightHand: [2, 6, 9],
    registerNote: "Left hand: root. Right hand: major triad on 2nd (D4–F#4–A4 over C).",
    triadType: "major",
    placement: "2 major",
  },
  {
    id: "7-minor",
    name: "7 minor",
    amfName: "Lydian Shimmer",
    description: "Minor triad on the 7th — produces 7, 9, and #11. High-brightness modern Lydian shimmer.",
    family: "major",
    priority: "core",
    emotionalQuality: "Shimmery, bright, modern Lydian",
    bestUse: "Contemporary jazz, Lydian color with added complexity",
    intervals: [11, 14, 18],
    leftHand: [0],
    rightHand: [11, 14, 18],
    registerNote: "Left hand: root. Right hand: minor triad on 7th (B4–D5–F#5 over C).",
    triadType: "minor",
    placement: "7 minor",
  },

  // ── DOMINANT FAMILY ─────────────────────────────────────────────────────

  {
    id: "5-minor",
    name: "5 minor",
    amfName: "Dominant 9",
    description: "Minor triad on the 5th — produces the 5, b7, and 9. Core blues/swing/funk dominant color.",
    family: "dominant",
    priority: "core",
    emotionalQuality: "Blues, swing, funky, propulsive",
    bestUse: "Dominant 9 voicing, blues comping, funk stabs",
    intervals: [7, 10, 14],
    leftHand: [0],
    rightHand: [7, 10, 14],
    registerNote: "Left hand: root. Right hand: minor triad on 5th (G4–Bb4–D5 over C).",
    triadType: "minor",
    placement: "5 minor",
  },
  {
    id: "b7-major",
    name: "b7 major",
    amfName: "Dominant Sus",
    description: "Major triad on the b7 — produces the b7, 9, and 11. Soulful suspended dominant.",
    family: "dominant",
    priority: "core",
    emotionalQuality: "Soulful, open, less final, gospel",
    bestUse: "9sus voicings, funk, gospel, rock dominant",
    intervals: [10, 14, 17],
    leftHand: [0],
    rightHand: [10, 14, 17],
    registerNote: "Left hand: root. Right hand: major triad on b7 (Bb4–D5–F5 over C).",
    triadType: "major",
    placement: "b7 major",
  },
  {
    id: "b3-major",
    name: "b3 major",
    amfName: "Blues Bite",
    description: "Major triad on the b3 — produces #9, 5, and b7. The gritty blues #9 dominant bite.",
    family: "dominant",
    priority: "core",
    emotionalQuality: "Gritty, biting, bluesy, tense",
    bestUse: "C7#9 blues color, Hendrix chord, dominant grit",
    intervals: [3, 7, 10],
    leftHand: [0],
    rightHand: [3, 7, 10],
    registerNote: "Left hand: root. Right hand: major triad on b3 (Eb4–G4–Bb4 over C).",
    triadType: "major",
    placement: "b3 major",
  },
  {
    id: "2-minor",
    name: "2 minor",
    amfName: "Open Dominant 13sus",
    description: "Minor triad on the 2nd — produces 9, 11, and 13. Modal/sus openness.",
    family: "dominant",
    priority: "secondary",
    emotionalQuality: "Open, modal, suspended, airy",
    bestUse: "Dominant sus/modal openness, Dorian flavor",
    intervals: [2, 5, 9],
    leftHand: [0],
    rightHand: [2, 5, 9],
    registerNote: "Left hand: root. Right hand: minor triad on 2nd (D4–F4–A4 over C).",
    triadType: "minor",
    placement: "2 minor",
  },
  {
    id: "b6-major",
    name: "b6 major",
    amfName: "Dark Altered",
    description: "Major triad on the b6 — produces b13, root, and #9. Moody dark dominant tension.",
    family: "dominant",
    priority: "secondary",
    emotionalQuality: "Dark, moody, tense, altered",
    bestUse: "Altered dominant, dark jazz colors",
    intervals: [8, 12, 15],
    leftHand: [0],
    rightHand: [8, 12, 15],
    registerNote: "Left hand: root. Right hand: major triad on b6 (Ab4–C5–Eb5 over C).",
    triadType: "major",
    placement: "b6 major",
  },

  // ── MINOR FAMILY ─────────────────────────────────────────────────────────

  {
    id: "1-minor",
    name: "1 minor",
    amfName: "Plain Minor",
    description: "Root position minor triad — clear minor identity.",
    family: "minor",
    priority: "core",
    emotionalQuality: "Clear, direct minor",
    bestUse: "Minor foundation, rock/folk minor support",
    intervals: [0, 3, 7],
    leftHand: [0],
    rightHand: [0, 3, 7],
    registerNote: "Left hand: root. Right hand: minor triad at root (C4–Eb4–G4 over C).",
    triadType: "minor",
    placement: "1 minor",
  },
  {
    id: "b3-major-minor",
    name: "b3 major (minor ctx)",
    amfName: "Minor 7",
    description: "Major triad on the b3 in a minor context — produces b3, 5, b7. Stable minor 7 color.",
    family: "minor",
    priority: "core",
    emotionalQuality: "Stable, minor 7, classic",
    bestUse: "Cm7 voicing, smooth minor comping",
    intervals: [3, 7, 10],
    leftHand: [0],
    rightHand: [3, 7, 10],
    registerNote: "Left hand: root. Right hand: major triad on b3 (Eb4–G4–Bb4 over C minor).",
    triadType: "major",
    placement: "b3 major",
  },
  {
    id: "5-minor-minor",
    name: "5 minor (minor ctx)",
    amfName: "Minor 9",
    description: "Minor triad on the 5th in a minor context — produces 5, b7, 9. Smooth minor color.",
    family: "minor",
    priority: "core",
    emotionalQuality: "Smooth, full minor, warm",
    bestUse: "Cm9 voicing, ballad minor support",
    intervals: [7, 10, 14],
    leftHand: [0],
    rightHand: [7, 10, 14],
    registerNote: "Left hand: root. Right hand: minor triad on 5th (G4–Bb4–D5 over C minor).",
    triadType: "minor",
    placement: "5 minor",
  },
  {
    id: "b7-major-minor",
    name: "b7 major (minor ctx)",
    amfName: "Minor 11",
    description: "Major triad on the b7 in minor context — produces b7, 9, 11. Open minor/sus sound.",
    family: "minor",
    priority: "core",
    emotionalQuality: "Open, floating, minor suspended",
    bestUse: "Cm11 voicing, gospel, ambient minor",
    intervals: [10, 14, 17],
    leftHand: [0],
    rightHand: [10, 14, 17],
    registerNote: "Left hand: root. Right hand: major triad on b7 (Bb4–D5–F5 over C minor).",
    triadType: "major",
    placement: "b7 major",
  },
  {
    id: "2-minor-minor",
    name: "2 minor (minor ctx)",
    amfName: "Dorian Color",
    description: "Minor triad on the 2nd in minor context — produces 9, 11, 13. Dorian modal color.",
    family: "minor",
    priority: "secondary",
    emotionalQuality: "Modern, modal, Dorian",
    bestUse: "Dorian minor, modal jazz, contemporary R&B",
    intervals: [2, 5, 9],
    leftHand: [0],
    rightHand: [2, 5, 9],
    registerNote: "Left hand: root. Right hand: minor triad on 2nd (D4–F4–A4 over C minor).",
    triadType: "minor",
    placement: "2 minor",
  },
  {
    id: "4-minor",
    name: "4 minor",
    amfName: "Borrowed Darkness",
    description: "Minor triad on the 4th — produces 11, b13, root. Gospel/cinematic borrowed minor shade.",
    family: "minor",
    priority: "secondary",
    emotionalQuality: "Dark, gospel, dramatic, cinematic",
    bestUse: "Borrowed minor plagal color, gospel, film",
    intervals: [5, 8, 12],
    leftHand: [0],
    rightHand: [5, 8, 12],
    registerNote: "Left hand: root. Right hand: minor triad on 4th (F4–Ab4–C5 over C minor).",
    triadType: "minor",
    placement: "4 minor",
  },
]

// ── Convenience exports ───────────────────────────────────────────────────

/** The First Seven Placements from the field manual curriculum */
export const firstSevenPlacements = tpsPianoColors.filter((v) =>
  ["1-major", "3-minor", "5-major", "5-minor", "b7-major", "2-major", "b3-major"].includes(v.id),
)

/** Get all colors for a specific family */
export function getColorsByFamily(family: TpsPianoVoicing["family"]) {
  return tpsPianoColors.filter((v) => v.family === family)
}

/** Common root notes for the root selector */
export const COMMON_ROOTS = ["C", "F", "G", "D", "A", "E", "Bb", "Eb"] as const
export type CommonRoot = (typeof COMMON_ROOTS)[number]

// Flat-preferred display names for certain enharmonic equivalents
export const DISPLAY_NOTE: Record<string, string> = {
  "A#": "Bb",
  "D#": "Eb",
  "G#": "Ab",
  "C#": "Db",
  "F#": "Gb",
}

export function displayNote(note: string): string {
  return DISPLAY_NOTE[note] ?? note
}
