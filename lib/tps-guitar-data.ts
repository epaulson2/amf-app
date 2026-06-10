/**
 * TPS Guitar Chord Data
 *
 * Triad Placement System — Guitar
 * Based on the AMF TPS Field Manual (guitar/field-manual.md)
 *
 * Core principle: movable shapes on the G-B-e top string set.
 * The same physical shape produces the same harmonic color at every fret.
 * Low strings (E, A, D) are muted (-1) unless a bass note is intended.
 *
 * Shape derivation:
 *   C major root position on G-B-e: frets 5-5-3
 *   C minor root position on G-B-e: frets 5-4-3
 *   All other roots shift these values by semitone offset from C.
 *
 * 6-string format: [E, A, D, G, B, e] — lower strings muted (-1) for top-set triads.
 */

export interface GuitarChordShape {
  /** 6 values, -1 = muted, 0 = open string */
  frets: number[]
  /** 6 values, 0 = not fingered, 1–4 = finger number (1=index) */
  fingers: number[]
  /** Fret numbers that are barred */
  barres: number[]
  /** Starting fret position (1 = nut position) */
  baseFret: number
  capo?: boolean
}

export interface TpsColor {
  /** Plain name, e.g. "Major Triad" */
  name: string
  /**
   * TPS placement expression, e.g. "1 major", "5 minor", "b7 major"
   * This is the degree + quality of the triad placed above the bass root.
   */
  placement: string
  /** AMF family: "major" | "minor" | "dominant" | "atom" */
  family: 'major' | 'minor' | 'dominant' | 'atom'
  /** Chord-symbol shorthand produced over a C root */
  symbolOverC: string
  /** One-sentence description of the sound/feel */
  description: string
  /** Priority: "core" | "secondary" | "advanced" */
  priority: 'core' | 'secondary' | 'advanced'
  /** Chord shapes keyed by root note name */
  roots: Record<string, GuitarChordShape>
}

// ---------------------------------------------------------------------------
// Helper — build a top-string-set (G-B-e) shape from raw fret offsets.
//
// rawGBe: [G-fret, B-fret, e-fret] absolute fret numbers (open string = 0)
// The function handles baseFret calculation so the diagram window is minimal.
// Low strings [E, A, D] are always muted (-1).
// ---------------------------------------------------------------------------
function buildTopSetShape(
  rawGBe: [number, number, number],
  fingerMap: [number, number, number],
  barredFret: number | null = null
): GuitarChordShape {
  const [gf, bf, ef] = rawGBe

  // Determine the lowest non-zero fret to set baseFret
  const sounding = [gf, bf, ef].filter((f) => f > 0)
  const minFret = sounding.length > 0 ? Math.min(...sounding) : 1
  const baseFret = minFret <= 4 ? 1 : minFret - 1

  // Relative frets within diagram window (0 = open, actual fret - (baseFret-1) for others)
  const toRel = (f: number) => (f === 0 ? 0 : f - baseFret + 1)

  const frets: number[] = [-1, -1, -1, toRel(gf), toRel(bf), toRel(ef)]
  const fingers: number[] = [0, 0, 0, ...fingerMap]
  const barres: number[] = barredFret !== null ? [barredFret - baseFret + 1] : []

  return { frets, fingers, barres, baseFret }
}

// ---------------------------------------------------------------------------
// Root offsets from C (semitones).
// Positive = up the neck from C shape.
// ---------------------------------------------------------------------------
const ROOT_OFFSETS: Record<string, number> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
}

/**
 * Shift a C-based G-B-e shape to a new root.
 * cBase: [G-fret, B-fret, e-fret] for root C.
 * root: target root name.
 */
function shiftShape(
  cBase: [number, number, number],
  root: string,
  fingerMap: [number, number, number],
  barredFret: number | null = null
): GuitarChordShape {
  const offset = ROOT_OFFSETS[root] ?? 0
  const shifted: [number, number, number] = [
    cBase[0] + offset,
    cBase[1] + offset,
    cBase[2] + offset,
  ]
  return buildTopSetShape(shifted, fingerMap, barredFret)
}

/** Build shapes for all 12 common roots from a C-base shape. */
function allRoots(
  cBase: [number, number, number],
  fingerMap: [number, number, number],
  barredFret: number | null = null
): Record<string, GuitarChordShape> {
  const roots: string[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
  const result: Record<string, GuitarChordShape> = {}
  for (const root of roots) {
    result[root] = shiftShape(cBase, root, fingerMap, barredFret)
  }
  return result
}

// ---------------------------------------------------------------------------
// C-base shapes on G-B-e (absolute fret numbers, open string = 0)
//
// From field manual: C major root pos = 5-5-3, C minor root pos = 5-4-3
// First inversions and second inversions also provided.
//
// Additional shapes derived from standard guitar voicing knowledge:
//   - Diminished: C dim on G-B-e = G(4)-B(4)-e(3) → C Eb Gb
//   - Augmented:  C aug on G-B-e = G(5)-B(5)-e(4) → C E G#
// ---------------------------------------------------------------------------

// --- Major triad (root position on G-B-e) ---
// G=5(C), B=5(E), e=3(G)  → C E G
const C_MAJOR_ROOT: [number, number, number] = [5, 5, 3]
// --- Major triad (first inversion) ---
// G=9(E), B=8(D? — no: open B+8=G#? Let me recalculate)
// Field manual: first inv = 9-8-8
// G(9)=E, B(8)=G#?  open B=B, +8=G#. Hmm — that's E G# C = C maj 1st inv ✓ (E is 3rd, G# = Ab enharmonic... wait)
// Actually: open B string + 8 frets = G (B C C# D D# E F F# G = 8 frets up = G). And e string + 8 = C.
// G(9)=E, B(8)=G, e(8)=C → E G C = C major first inversion ✓
const C_MAJOR_FIRST: [number, number, number] = [9, 8, 8]
// --- Major triad (second inversion) ---
// Field manual: 12-13-12
// G(12)=G, B(13)=A? — open B+13=G#. Hmm.
// Actually: open G+12=G (octave), open B+13=A, open e+12=E
// G C E — wait: G(12)=G, B(13)=A, e(12)=E?
// Let me recompute: open G=G, +12=G(oct). Open B=B, +13=A (B C C# D D# E F F# G G# A = 10, no: B+1=C,+2=C#,+3=D,+4=D#,+5=E,+6=F,+7=F#,+8=G,+9=G#,+10=A,+11=A#,+12=B,+13=C). So B+13=C.
// And e+12=E(oct).
// G(12)=G, B(13)=C, e(12)=E → G C E = C major second inversion ✓
const C_MAJOR_SECOND: [number, number, number] = [12, 13, 12]

// --- Minor triad (root position on G-B-e) ---
// Field manual: 5-4-3
// G(5)=C, B(4)=Eb, e(3)=G → C Eb G = C minor ✓
const C_MINOR_ROOT: [number, number, number] = [5, 4, 3]
// --- Minor triad (first inversion) ---
// Field manual: 8-8-8
// G(8)=Eb, B(8)=G, e(8)=C → Eb G C = C minor first inversion ✓
const C_MINOR_FIRST: [number, number, number] = [8, 8, 8]
// --- Minor triad (second inversion) ---
// Field manual: 12-13-11
// G(12)=G, B(13)=C, e(11)=Eb → G C Eb = C minor second inversion ✓
const C_MINOR_SECOND: [number, number, number] = [12, 13, 11]

// --- Diminished triad (root position on G-B-e) ---
// C dim = C Eb Gb
// G string: fret 5 = C. B string: fret 4 = Eb. e string: fret 2 = F# (Gb).
// G(5)=C, B(4)=Eb, e(2)=F# → C Eb Gb = C dim ✓
const C_DIM_ROOT: [number, number, number] = [5, 4, 2]

// --- Augmented triad (root position on G-B-e) ---
// C aug = C E G#
// G(5)=C, B(5)=E, e(4)=G# → C E G# = C aug ✓
const C_AUG_ROOT: [number, number, number] = [5, 5, 4]

// ---------------------------------------------------------------------------
// TPS placement shapes — these are the upper-triad shapes placed ABOVE a bass root.
// The "color name" describes what happens when these notes sound over the bass.
//
// For placement shapes, the root of the TRIAD being played (not the bass note)
// is what we calculate fret positions from.
//
// Approach: For each placement, we know the triad to play over C bass.
// We define the C-base shape as: the G-B-e position of that triad when the
// bass is C. Then the movable advantage lets us shift to any bass root.
// ---------------------------------------------------------------------------

// Placement: 3 minor (Em/C) → Maj7 color
// Em on G-B-e: G(0)=G, B(0)=open, e(0)=E? No — Em root pos on G-B-e:
// E is root, B is 5th, G# is 3rd — that's E major.
// Em = E G B. On G-B-e: G(0)=G, B(0)=B, e(0)=E → open strings! All open = Em triad ✓
// But that's E minor at 0 (open). For the "3 minor over C" placement, the triad being played
// is Em, but we want to express it as "over C bass". The shape itself is Em's shape.
// C-relative offset: Em shape over C bass means we play Em. Em on G-B-e (root pos) = G(0) B(0) e(0)
// But when bass moves to E (so we want 3 minor over E = G#m), shift +4.
// Actually, for this color grid, we want to parameterize by BASS ROOT, not triad root.
// So "3 minor" over C bass = Em triad. Over D bass = F#m triad. Etc.
// The triad root is always a major 3rd above the bass.
// C-base for "3 minor color" = Em shape = G(0), B(0), e(0) ... but all-open is unusual.
// Better: use a higher position. Em on G-B-e at fret 9: G(9)=E, B(9)=... wait
// Let's use: C major first inversion shape IS already 3 minor — no.
// Simpler: just use Em root-pos shape transposed. Em: G(4), B(5), e(4)?
// No: E G B on G-B-e. Open G=G, open B=B, open e=E. That's already E G B = Em!
// For the "color" we want to show over each bass note, the triad played is:
//   Bass=C → Em (E G B): G(4)B(5)e(4)? Let's verify: G+4=B, B+5=E+1=F? No.
// Open G=G, G+4=B (G Ab A Bb B = 4 semitones? G→Ab=1, Ab→A=2, A→Bb=3, Bb→B=4) = B. ✓
// Open B=B, B+5=E (B→C=1,C→C#=2,C#→D=3,D→D#=4,D#→E=5) = E. ✓
// Open e=E, E+4=G# (E→F=1,F→F#=2,F#→G=3,G→G#=4) = G#. That's E major not minor!
// For Em: E G B. On G-B-e in root position where root E is on e-string:
//   e-string: root E at fret 0 (open) or 12
//   For the shape over C bass: Em = frets that give E,G,B on G,B,e strings:
//   G string fret 4 = B (not E), hmm. Let me just use standard Em chord voicing knowledge.
// Em triad on G-B-e (with root on G string): G=E would need G string fret 9.
//   G(9)=E, B(9)=G#? No: open B=B, +9=G# (B→C=1..B+9=G#). That's E major again.
// Em (root pos, root on G): G string fret 9 = E, B string = G (need B+8=G: B C C# D D# E F F# G = 8) ✓, e string = B (need e+7=B: E F F# G G# A A# B = 7) ✓
// Em root pos on G-B-e: G(9), B(8), e(7). Over C bass, this is "3 minor" (triad root E = major 3rd of C). ✓

// For this data, I'll use the "placement color" approach:
// Each color is defined by its C-base: the actual frets on G-B-e when C is the bass note.
// Shifting by ROOT_OFFSETS gives the shape for any other bass root.

// 3 minor over C = Em triad: G(9), B(8), e(7)
const C_3MINOR_ROOT: [number, number, number] = [9, 8, 7] // Em triad = E G B ✓

// 5 major over C = G triad: G G B D
// G triad on G-B-e root pos (root on G string): G(7)=D? No.
// G B D on G-B-e: G string=G (fret 0 open!), B string=B (open!), e string=D (fret 10? open e=E, -2... no, e+10=D: E F F# G G# A A# B C C# D = 10 ✓)
// But baseFret would be 7+ for e. Let's use a closed position:
// G major triad root pos: G=root at G-string fret 0 (open), but that's not movable.
// Closed G on G-B-e: find G B D as closed shape.
// G string: fret 0 = G (root). B string: fret 0 = B (3rd). e string: fret 3 = G (root, octave)? e+3=G ✓ but that's root doubling not 5th.
// For D (5th): e string fret 10 = D. Too far from G(0).
// Better: use second inversion for playability.
// G triad second inversion (D G B): G string fret 7=D, B string fret 8=G, e string fret 7=B. Checking:
//   G+7=D (G Ab A Bb B C C# D = 7) ✓; B+8=G (B C C# D D# E F F# G = 8) ✓; e+7=B (E F F# G G# A A# B = 7) ✓
// That's D G B = G major 2nd inv ✓. C-relative: over C bass this is 5 major.
// C-base for 5 major: these are the frets when bass=C. G(7) B(8) e(7) → G triad 2nd inv.
const C_5MAJOR_ROOT: [number, number, number] = [7, 8, 7] // G triad (2nd inv D-G-B) over C

// 5 minor over C = Gm triad: G Bb D
// Gm root pos on G-B-e: G string fret 0=G (root), B string fret 3=D (Bb+3=D? open B=B, +3=D ✓), e string fret 3=G?
// Wait: Gm = G Bb D. G string=G(0), B string: need Bb, B+1=C? No. Need either G, Bb, or D on B and e.
// B string + 1 = C (not Bb). Gm in root pos on G-B-e closed:
// G(0)=G, B(3)=D, e(3)=G — that's G D G = power chord / no 3rd.
// Better: Gm root pos on G-B-e with root on G string at fret 10:
// G+10=F? G Ab A Bb B C C# D D# E F = 11, not 10. G+10=F# (G→G#=1..G+10=F#).
// Let me count again: G(0) G#(1) A(2) Bb(3) B(4) C(5) C#(6) D(7) D#(8) E(9) F(10) = G+10=F. Hmm.
// Actually guitar frets are chromatic semitones:
// Open G = G, fret 1 = G#, 2 = A, 3 = Bb, 4 = B, 5 = C, 6 = C#, 7 = D, 8 = D#, 9 = E, 10 = F, 11 = F#, 12 = G
// So G string: fret 10 = F. Fret 12 = G (octave).
// For Gm over C bass: need Gm triad (G Bb D).
// G on G-string: fret 0 (open) or 12. Not ideal for movable shape.
// Use Gm triad in first inversion (Bb D G) on G-B-e:
// G string: Bb at fret 3; B string: D at fret 3 (B+3=D: B C C# D = 3 ✓); e string: G at fret 3 (E F F# G = 3? E+1=F, +2=F#, +3=G ✓)
// G(3)=Bb, B(3)=D, e(3)=G → Bb D G = Gm first inversion ✓
// All three strings at fret 3 = full barre! For C bass this is 5 minor.
// C-relative: Gm 1st inv over C bass. For other roots, shift by offset.
// But if all three are at same fret, that's a barre at that fret. ✓
const C_5MINOR_ROOT: [number, number, number] = [3, 3, 3] // Gm 1st inv (barre) over C

// b7 major over C = Bb triad: Bb D F
// Bb triad root pos on G-B-e:
// G string: need Bb, D, or F.
// Bb at G-string fret 3. D at B-string fret 3. F at e-string fret 1 (E F = 1).
// G(3)=Bb, B(3)=D, e(1)=F → Bb D F = Bb major root pos ✓
const C_B7MAJOR_ROOT: [number, number, number] = [3, 3, 1] // Bb triad root pos over C

// b3 major over C = Eb triad: Eb G Bb (blues bite / #9 color)
// Eb on G-B-e: G string fret 8 = D#/Eb (G+8=D#: G G# A Bb B C C# D D# = 8 ✓)
// B string: G at fret 8 (B C C# D D# E F F# G = 8 ✓)
// e string: Bb at fret 6 (E F F# G G# A A# = wait: E+1=F, +2=F#, +3=G, +4=G#, +5=A, +6=A# = Bb ✓)
// Hmm: G(8)=Eb, B(8)=G, e(6)=Bb → Eb G Bb = Eb major root pos ✓
const C_B3MAJOR_ROOT: [number, number, number] = [8, 8, 6] // Eb triad over C (blues bite)

// 2 major over C = D triad: D F# A (Lydian color)
// D triad root pos on G-B-e:
// G string: D at fret 7 (G+7=D ✓)
// B string: F# at fret 7 (B C C# D D# E F F# = 7 ✓)
// e string: A at fret 5 (E F F# G G# A = 5 ✓)
// G(7)=D, B(7)=F#, e(5)=A → D F# A = D major root pos ✓
const C_2MAJOR_ROOT: [number, number, number] = [7, 7, 5] // D triad over C (Lydian)

// 6 minor over C = Am triad: A C E (Major 6 / warm color)
// Am root pos on G-B-e:
// G string: A at fret 2 (G G# A = 2 ✓)
// B string: C at fret 1 (B C = 1 ✓)
// e string: E at fret 0 (open ✓)
// G(2)=A, B(1)=C, e(0)=E → A C E = Am root pos ✓
// For movable use, let's also have this at a higher position:
// G(14)=A, B(13)=A? No. Use the open-based shape — it only works over C bass naturally.
// Better: G(9+2)? Let me find a closed version.
// Am at fret 9+ area: A on G-string fret 14 (G+14=A: +12=G, +14=A) = too high.
// Use the low-fret version; it's fine for C but movable version shifts up.
// G(2), B(1), e(0): baseFret=1, but e=0 is open — only works at this position for Am.
// For movability: Am first inversion (C E A): G(5)=C, B(5)=E, e(9-? let me check: e+9=C# no)
// Hmm: Am 2nd inv (E A C): G string need E = fret 9, B string need A = fret 10, e string need C = fret 8
// G(9)=E (G+9=E: G G# A Bb B C C# D D# E = 9 ✓), B(10)=G# (B+10=G#: B C C# D D# E F F# G G# = 9 wait let me recount: B+1=C,+2=C#,+3=D,+4=Eb,+5=E,+6=F,+7=F#,+8=G,+9=G#,+10=A ✓)
// B(10)=A, e string: need C. E+8=C (E F F# G G# A Bb B C = 8 ✓)
// G(9)=E, B(10)=A, e(8)=C → E A C = Am 2nd inversion ✓. Spread across 3 frets (8-10). Movable ✓.
const C_6MINOR_ROOT: [number, number, number] = [9, 10, 8] // Am triad 2nd inv over C (major 6 color)

// ---------------------------------------------------------------------------
// Now assemble the TPS colors array
// ---------------------------------------------------------------------------

export const tpsGuitarColors: TpsColor[] = [
  // ---- MAJOR FAMILY --------------------------------------------------------
  {
    name: 'Major Triad',
    placement: '1 major',
    family: 'major',
    symbolOverC: 'C',
    description:
      'Plain major foundation — stable, clear, and direct. The simplest statement of major harmony.',
    priority: 'core',
    roots: allRoots(C_MAJOR_ROOT, [2, 3, 1]),
  },
  {
    name: 'Maj7 Compression',
    placement: '3 minor',
    family: 'major',
    symbolOverC: 'Cmaj7',
    description:
      'Minor triad on the 3rd degree produces elegant Maj7 color — rootless, smooth, and resolved without weight.',
    priority: 'core',
    roots: allRoots(C_3MINOR_ROOT, [3, 2, 1]),
  },
  {
    name: 'Maj9 Color',
    placement: '5 major',
    family: 'major',
    symbolOverC: 'Cmaj9',
    description:
      'Major triad on the 5th degree adds the 9th and 7th — polished sophistication without harmonic tension.',
    priority: 'core',
    roots: allRoots(C_5MAJOR_ROOT, [1, 3, 1], null),
  },
  {
    name: 'Lydian Color',
    placement: '2 major',
    family: 'major',
    symbolOverC: 'Cmaj13#11',
    description:
      'Major triad on the 2nd degree creates a floating, cinematic Lydian sound with the #11 and 13th shimmering above.',
    priority: 'core',
    roots: allRoots(C_2MAJOR_ROOT, [2, 3, 1]),
  },
  {
    name: 'Major 6',
    placement: '6 minor',
    family: 'major',
    symbolOverC: 'C6',
    description:
      'Minor triad on the 6th degree adds a warm, classic 6th — bright without being dense.',
    priority: 'core',
    roots: allRoots(C_6MINOR_ROOT, [2, 3, 1]),
  },

  // ---- DOMINANT FAMILY -----------------------------------------------------
  {
    name: 'Dominant 9',
    placement: '5 minor',
    family: 'dominant',
    symbolOverC: 'C9',
    description:
      'Minor triad on the 5th degree — the blues and swing workhorse. Supplies b7 and 9 over the root for functional dominant color.',
    priority: 'core',
    roots: allRoots(C_5MINOR_ROOT, [1, 1, 1], null),
  },
  {
    name: 'Dominant Sus',
    placement: 'b7 major',
    family: 'dominant',
    symbolOverC: 'C9sus',
    description:
      'Major triad on the b7 creates a soulful suspended dominant — the classic gospel and funk sound, less final than a straight dominant 7.',
    priority: 'core',
    roots: allRoots(C_B7MAJOR_ROOT, [2, 3, 1]),
  },
  {
    name: 'Blues Bite (#9)',
    placement: 'b3 major',
    family: 'dominant',
    symbolOverC: 'C7#9',
    description:
      "Major triad on the b3 delivers the signature blues-rock #9 rub — gritty, tense, and demanding resolution. Hendrix's fundamental color.",
    priority: 'core',
    roots: allRoots(C_B3MAJOR_ROOT, [2, 3, 1]),
  },

  // ---- MINOR FAMILY --------------------------------------------------------
  {
    name: 'Minor Triad',
    placement: '1 minor',
    family: 'minor',
    symbolOverC: 'Cm',
    description:
      'Plain minor foundation — darker and warmer than major but equally direct. Emotional clarity without added color.',
    priority: 'core',
    roots: allRoots(C_MINOR_ROOT, [2, 1, 1]),
  },
  {
    name: 'Minor 7',
    placement: 'b3 major (over minor)',
    family: 'minor',
    symbolOverC: 'Cm7',
    description:
      'Major triad on the b3 over a minor root gives stable minor 7 color — smooth and common in jazz, neo-soul, and ballads.',
    priority: 'core',
    roots: allRoots(C_B3MAJOR_ROOT, [2, 3, 1]),
  },
  {
    name: 'Minor 9',
    placement: '5 minor (over minor)',
    family: 'minor',
    symbolOverC: 'Cm9',
    description:
      'Minor triad on the 5th over a minor root produces smooth minor 9 color — lush and expressive.',
    priority: 'core',
    roots: allRoots(C_5MINOR_ROOT, [1, 1, 1], null),
  },

  // ---- ATOM SHAPES ---------------------------------------------------------
  {
    name: 'Diminished Triad',
    placement: 'diminished atom',
    family: 'atom',
    symbolOverC: 'Cdim',
    description:
      'Tense and directional — the diminished atom creates urgency and wants to resolve. Secondary but essential.',
    priority: 'secondary',
    roots: allRoots(C_DIM_ROOT, [2, 1, 1]),
  },
  {
    name: 'Augmented Triad',
    placement: 'augmented atom',
    family: 'atom',
    symbolOverC: 'Caug',
    description:
      'Dreamy and unresolved — the augmented atom floats without landing, ideal for transitional moments and cinematic texture.',
    priority: 'secondary',
    roots: allRoots(C_AUG_ROOT, [2, 3, 1]),
  },
]

/** Convenience lookup by name */
export const tpsColorByName: Record<string, TpsColor> = Object.fromEntries(
  tpsGuitarColors.map((c) => [c.name, c])
)

/** All root names in chromatic order */
export const ALL_ROOTS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'] as const
export type RootName = (typeof ALL_ROOTS)[number]

/** Guitar instrument definition for @tombatossals/react-chords */
export const GUITAR_INSTRUMENT = {
  strings: 6,
  fretsOnChord: 4,
  name: 'Guitar',
  keys: [],
  tunings: { standard: ['E', 'A', 'D', 'G', 'B', 'e'] },
}
