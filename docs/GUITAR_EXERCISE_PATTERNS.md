# Guitar Exercise Patterns — AMF Design Reference

## What This Document Is

A template library for building AMF guitar exercises. It describes the repeating drill skeleton found across a standard guitar theory curriculum, the six directional variations AMF should support, the category progression used as a sequencing reference, and specific adaptation ideas for AMF's blended visual approach. It is not a curriculum or lesson plan — it is a pattern spec for the exercise engine.

---

## The Core Drill Template

Every exercise is an instance of one repeating skeleton:

- **Given**: a root note displayed as a whole note on a treble clef staff (specific pitch, e.g. F4)
- **Task A — Notation out**: write all chord tones as stacked whole notes on the staff above the root
- **Task B — Fretboard out**: plot all chord tones on a 6-string chord diagram at a specified fret position
- **Scale**: 32 items per lesson, arranged 4 columns × 8–9 rows
- **Answer format**: canonical answer + all alternative voicings with a voicing count

The template is production-out in both directions simultaneously. The student never works recognition-in (identifying what a chord is) — always construction-out (building a chord from a known root and type).

---

## Drill Directions

AMF should support all six directional combinations derived from the three representations — staff notation, fretboard diagram, and chord name:

| # | From | To | Description |
|---|------|----|-------------|
| 1 | Staff (written notes) | Fretboard | Core template direction A+B — the source course default |
| 2 | Fretboard (diagram) | Staff | Reverse: translate fingering back to notation |
| 3 | Name (chord symbol) | Fretboard | Symbol → diagram construction |
| 4 | Name (chord symbol) | Staff | Symbol → notation construction |
| 5 | Fretboard (diagram) | Name | Recognition: what chord is this voicing? |
| 6 | Staff (written notes) | Name | Recognition: what chord does this notation spell? |

Directions 1–4 are production-out and align with the source template's philosophy. Directions 5–6 are recognition-in and should be treated as a distinct exercise class in AMF — harder to self-check, different pedagogical purpose.

---

## Category Progression

Use this as the canonical sequencing reference for AMF exercise decks. Each category maps to one or more lesson blocks in the source curriculum.

1. **Basic Intervals** — unisons, 2nds, 3rds, tritones, etc.
2. **Triads** — major, minor, diminished, augmented
3. **Core 7th Chords** — maj7, dom7, min7, min7b5
4. **Altered 7ths** — 7b5, 7#5, maj7#5, etc.
5. **6th Chords** — maj6, min6
6. **Major 7th + Tensions** — maj7 with 9, #11, 13 additions
7. **Minor 7th + Tensions** — min7 with 9, 11, b13 additions
8. **Dominant 7th + Tensions** — dom7 with b9, #9, #11, b13 combinations
9. **Dom 7sus4 Variants** — sus4 with tension combinations
10. **Diminished / Half-Diminished Variants** — dim7, min7b5 with tensions
11. **MinorMajor 7th Variants** — minMaj7 base + tensions

Each lesson block includes a reference sheet listing chord tones and available tensions for the chord type being drilled. AMF should surface the equivalent data as a collapsible panel or tooltip — not as a prerequisite the student must memorize.

---

## AMF Adaptations

The source template is notation-only and fretboard-only. AMF's blended visual language opens four specific adaptation opportunities:

**1. Di-chord interval coloring**
When stacking chord tones on the staff or fretboard, color each tone by its interval function relative to the root (root = white, 3rd = amber, 5th = blue, 7th = violet, tensions = muted). This makes interval structure visible without requiring the student to look it up — the color is the reference sheet.

**2. Zone coloring on the fretboard**
The source course specifies a single fret position per exercise. AMF can overlay fretboard zone shading (open/cowboy zone, campfire zone, barre zone, upper register) so students build an implicit sense of which voicings live in which hand position. Zone boundaries are fixed constants, not per-exercise variables.

**3. Clave rhythm position marker**
For exercises involving dominant 7th and tension chords (categories 8–10), append a single clave grid row beneath the fretboard diagram. Mark which rhythmic slot this chord type canonically lands on in a 3-2 or 2-3 clave. This connects harmony drill to rhythmic placement without expanding the exercise footprint — it is one row, not a separate exercise.

**4. Alternative voicing count as a progress signal**
The source answer pages list a voicing count (e.g. "7 alternative voicings"). AMF should surface this count as a badge on the answer reveal — not to require all voicings, but to signal depth. A student who finds 3 of 7 knows they are not done with the chord type.

---

## Key Insight — Guitar as Transposing Instrument

The guitar is a transposing instrument: written notation sounds one octave lower than notated. Middle C written on the treble clef staff equals the 3rd fret of the A string on guitar — not the B string as it would be on a non-transposing instrument like piano.

**Why this matters for AMF visual design:**

- Staff-to-fretboard mapping tables must use guitar-transposed pitch values, not concert pitch
- The AMF Notation Chamber and Fretboard Chamber share pitch data — that data must be computed in written pitch (sounding pitch + one octave), not concert pitch
- Any exercise that crosses the two chambers (directions 1 and 2 above) must apply the transposition offset consistently, or the fret position displayed will be one octave off
- Reference sheets and answer validation logic must encode this offset as a constant, not leave it to the exercise author to remember per item

The transposition is a fixed property of the instrument, not a per-exercise variable. Store it once in the guitar instrument config and derive all pitch-to-fret mappings from it automatically.
