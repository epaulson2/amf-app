# Guitar Fretboard Diagram System

**Status:** Design spec — June 11, 2026  
**Author:** AMF Architecture Session  
**Purpose:** Complete visual system for guitar — the equivalent of the Plogger keyboard diagram — grounding all five AMF chambers in fretboard geometry

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Base Diagram — Full Spec](#base-diagram)
3. [Overlay Variants](#overlay-variants)
   - [V1: Di-Chord Interval Web](#v1-di-chord-interval-web)
   - [V2: Emotional Zone Map](#v2-emotional-zone-map)
   - [V3: Key Scale-Degree Overlay](#v3-key-scale-degree-overlay)
   - [V4: Chord Tone / Tension / Avoid Overlay](#v4-chord-tone--tension--avoid-overlay)
   - [V5: Musical Situation Overlay](#v5-musical-situation-overlay)
   - [V6: Tuning Interval Architecture](#v6-tuning-interval-architecture)
   - [V7: Position Zone Map](#v7-position-zone-map)
   - [V8: Clave-Weighted String/Fret Gravity Map](#v8-clave-weighted-stringfret-gravity-map)
   - [V9: TPS Color Grid — Fretboard View](#v9-tps-color-grid--fretboard-view)
   - [V10: The Progression Arc Sequence](#v10-the-progression-arc-sequence)
4. [Dynamic Instantiation](#dynamic-instantiation)
5. [Integration with Existing Assets](#integration-with-existing-assets)
6. [Build Priority Matrix](#build-priority-matrix)

---

## Philosophy

The keyboard diagram in the AMF is not a reference chart. It is a **thinking surface** — a fixed visual canvas onto which any concept from any chamber can be projected. When a student looks at the piano keyboard, they see it as a single unified object, and every lesson they have ever had lives on it simultaneously. That is the target for guitar.

The guitar fretboard has properties that make it a *richer* visual canvas than the keyboard in some respects, and a more challenging one in others. Three properties define the design problem:

**The redundancy property.** Every note appears in multiple fretboard locations, sometimes four or five times across the neck. The keyboard has no redundancy — middle C is always middle C. On guitar, the same C appears at string 5 fret 3, string 4 fret 10, string 3 fret 5, string 2 fret 1, and string 1 fret 8 (open position). This is not a problem to be explained away — it is the most important visual fact the diagram must make legible. A fretboard diagram that only shows one location per note has already failed.

**The interval-geometry property.** Because the tuning is fixed (E A D G B E — intervals P4 P4 P4 M3 P4), every interval has a specific visual shape on the fretboard. A perfect 5th always looks like "two frets up, one string down" (or its inverse). A minor third always looks the same. This means the fretboard is not a pitch map — it is an **interval map**. Di-chord vocabulary (the Plogger backbone) can be shown directly as recurring geometric shapes, and a student who has learned to see those shapes has internalized interval recognition into their hands.

**The position property.** Guitarists organize the fretboard into positions: open position (frets 0-4), second position (frets 2-6), and so on up the neck. A position is not just a place — it is a hand orientation, a set of available open strings, a different subset of the same 12 notes. Positions create natural pedagogical zones. The AMF's Emotional Map zones (grounded/tense/floating/edgy) can be mapped onto fretboard positions in a way that gives students a physical geography of emotional character.

The system designed here creates a **base diagram** — the fixed visual substrate — and ten **overlay variants** that project AMF concepts onto it. Each overlay is self-contained and teachable as a standalone diagram. When combined, they form a complete visual language for guitar that mirrors the keyboard's role while exploiting the fretboard's unique geometry.

---

## Base Diagram

**Slug:** `guitar_fretboard_base`  
**Format:** 6 strings × 13 frets (nut through fret 12), plus open strings labeled at left  
**Orientation:** Standard (low E string at bottom, high e string at top, nut at left, frets increasing rightward)

### Grid specification

- **Columns:** 13 total (0 = open string nut column, then frets 1 through 12)
- **Rows:** 6 strings, labeled top to bottom: e (high) — B — G — D — A — E (low)
- **Fret markers:** Single dots at frets 3, 5, 7, 9; double dot at fret 12
- **Nut:** Bold vertical line between column 0 and column 1
- **Cell size:** 32px wide × 24px tall (print-optimized: 12mm wide × 8mm tall at 300dpi)
- **Note dots:** 18px circles, centered in each string-fret intersection cell

### Note content

Every cell that contains a natural note on the standard-tuned fretboard is labeled with the note name. The complete mapping is derived from standard tuning: E2, A2, D3, G3, B3, E4 (open strings). Each subsequent fret raises by one semitone.

**Open string labels (column 0):**
- e (high): E4
- B: B3
- G: G3
- D: D3
- A: A2
- E (low): E2

**Note display:** Note name inside the dot circle, sharp/flat using # and b (no unicode symbols in base layer — unicode in overlays only)

**Fret 12 notes are the same pitch class as open strings** — this should be visually distinguished (double dot position marker) but noted to students as an octave of the open string.

### Color scheme (base layer only)

- Background: white or near-white (#FAFAFA)
- Fret lines: medium gray (#999)
- String lines: dark gray (#444)
- Nut: black (#111)
- Note dot fill: white with black border (neutral — no color meaning in base)
- Note text: black
- Position marker dots: medium gray (#888)

The base diagram carries **zero color meaning**. Color enters exclusively through overlays. This is intentional: the base is the substrate that any overlay can be placed on without visual conflict.

---

## Overlay Variants

---

### V1: Di-Chord Interval Web

**Slug:** `guitar_fretboard_dichord_interval_web`  
**Source systems:** Plogger Method  
**Effort to build:** Medium  
**Category:** Category 2 Synthesis Original (new visual that no existing source shows)

#### Purpose

Show the geometric shapes that correspond to each di-chord interval on the fretboard. A student who knows that [5] is a perfect fourth can look at this diagram and immediately see every location where that interval appears as a visual shape — every string-pair where it exists as a two-fret diagonal, every adjacent string where it exists as a straight shift. The fretboard stops being a grid of individual notes and becomes a grid of interval relationships.

#### What's shown

For each di-chord number [1] through [10], there is a recurring geometric shape on the fretboard. The standard tuning (P4 P4 P4 M3 P4) means that most adjacent string pairs are a perfect fourth apart, with one exception (G-to-B string is a major third). This creates a fretboard with two distinct interval geometries:

**P4 string pairs (E-A, A-D, D-G, B-e):**
- [5] perfect 4th = zero-fret shift (same fret, next string down)
- [7] perfect 5th = 2 frets back (two frets lower, next string down)
- [3] minor 3rd = 3 frets forward (three frets higher, next string down)
- [4] major 3rd = 4 frets forward
- [2] major 2nd = 5 frets forward... etc.

**M3 string pair (G-to-B only):**
All interval shapes shift by one extra fret (the G-B tuning anomaly). This is a critical teaching point: the one "broken" string-pair is the source of most beginner confusion on guitar, and naming it explicitly as a M3 pair (rather than P4) gives it the Plogger vocabulary it deserves.

#### Visual encoding

- Each di-chord [1] through [10] gets its own color, derived from the Plogger color system
- The interval is shown as an **arc** or **connector line** between two note dots on the fretboard
- All instances of that interval on the entire fretboard are shown simultaneously — the student sees the repeating geometric pattern
- The G-B anomaly instances are shown with a dashed line (vs solid for P4-pair instances) to make the tuning asymmetry visible

#### The teaching insight

A student stares at [5] (perfect 4th) on this diagram and sees the same connector shape repeating every time they go from one string to the next at the same fret. They then see that going from G to B requires moving one fret forward. That observation — visible in two seconds on this diagram — is what guitar players mean when they say "adjust one fret for the B string." The Plogger vocabulary makes it precise: the G-B interval is [4] not [5], so every di-chord shape shifts by [1] when crossing that string pair.

**For the student:** After drilling di-chords on the Tracking Page, this diagram shows that every interval they practiced aurally has a fixed physical shape on the neck. Moving up a minor 3rd always looks like [this]. Moving up a perfect 5th always looks like [this]. The ear and the hand are learning the same object.

---

### V2: Emotional Zone Map

**Slug:** `guitar_fretboard_emotional_zone_map`  
**Source systems:** Emotional Map of Melody  
**Effort to build:** Medium  
**Category:** Category 1 Enhancement

#### Purpose

Show fretboard positions colored by their tendency toward each of the four Emotional Map zones, for a given key. The student sees the entire fretboard as an emotional terrain — some regions default toward grounded Zone 1 sounds, others toward Zone 4 tension. They can navigate by feel before they can navigate by theory.

#### What's shown

This overlay is **key-specific** (defaults to C major, parameterized for other keys). For each note dot on the fretboard, the dot is filled with the Emotional Map zone color that note most commonly occupies in the given key context, assuming a tonic pedal beneath.

**Zone color assignments (following existing Emotional Map color system):**

| Zone | Name | Color | Scale degrees (C major example) |
|------|------|-------|----------------------------------|
| Zone 1 | Sweet / Grounded | Deep teal/green | DO (C), MI (E), SO (G) — chord tones of I |
| Zone 2 | Tense But Supported | Warm amber/gold | RE (D), LA (A), TI (B) — available tensions |
| Zone 3 | Floating / Modern | Soft blue | FA (F) over non-dominant chords — available color |
| Zone 4 | Bitter / Edgy | Deep red/crimson | TI (B) in certain contexts, chromatic passing tones |

**Chromatic notes** (outside the key) are shown in gray with a small "outside" marker — they are not zoned, they are transitional.

#### Visual encoding

- Note dot fill = zone color
- The **redundancy property** becomes useful here: the same note (e.g., E / MI / Zone 1) appears in 5 locations, and all 5 glow the same Zone 1 color. The student sees the Zone 1 constellation scattered across the neck.
- Fretboard position markers (3, 5, 7, 9, 12) are retained
- A small legend in the corner shows the four zones with their scale degree members

#### The teaching insight

In C major, Zone 1 notes (C, E, G) cluster into a familiar visual pattern — they are the C major triad, and their visual distribution across the neck tells the student immediately where "home" lives on the guitar. Zone 4 notes (in C major, primarily B in certain melodic contexts, and all chromatic notes) appear as red dots that the student can physically avoid in their first weeks of playing.

**The redundancy payoff:** On piano, middle C is one dot. On guitar, C appears five times and all five glow Zone 1 green. The student sees that "home" is everywhere on the neck — not just one location. This dissolves the beginner's paralysis about "where should I play" — they see that any Zone 1 dot is a valid landing.

---

### V3: Key Scale-Degree Overlay

**Slug:** `guitar_fretboard_scale_degree_overlay`  
**Source systems:** Plogger Method, Harmony OS  
**Effort to build:** Low  
**Category:** Category 1 Enhancement

#### Purpose

Show all fretboard positions of the seven notes in a given key, labeled by scale degree using Plogger solmization (DO RE MI FA SO LA TI), with each degree colored by its Plogger identity. This is the guitar equivalent of the keyboard's colored key map.

#### What's shown

For a given key (parameterizable — C major as default):
- Every in-key note dot is **filled** with its Plogger scale-degree color
- Every out-of-key note dot is shown but unfilled (empty circle, gray border)
- Scale degree name appears inside the dot (DO, RE, MI, etc.)
- The nut column (open strings) shows open-string scale degree labels where applicable

**Plogger color assignments (consistent with existing keyboard diagram):**

| Degree | Solmization | Di-Chord from tonic | Color |
|--------|-------------|---------------------|-------|
| 1 | DO | [0] | Deep amber/gold (home) |
| 2 | RE | [2] | Warm orange |
| 3 | MI | [4] | Bright yellow-green |
| 4 | FA | [5] | Teal green |
| 5 | SO | [7] | Blue |
| 6 | LA | [9] | Purple |
| 7 | TI | [11] | Red-violet (leading tone) |

#### Visual encoding

- Filled dot = in-key note with scale degree color
- Empty dot = chromatic note (scale degree not applicable)
- Multiple instances of same degree show same color everywhere — the student learns that MI is always yellow-green, wherever it appears
- A horizontal band below the diagram can show the key signature and its di-chord distance sequence

#### Key variants

Because this is parameterized by key, the diagram can be generated for all 12 major keys and all 7 modes. The **mode variants** are particularly powerful: switching from C Ionian to C Dorian changes which dots are filled (D minor scale instead of C major) and which color the characteristic note (the raised 6th in Dorian) carries. A student can flip between the mode variants and see the fretboard change character — the Heptachord Shift House Plan from S6 becomes physical rather than abstract.

---

### V4: Chord Tone / Tension / Avoid Overlay

**Slug:** `guitar_fretboard_chord_tension_overlay`  
**Source systems:** Harmony OS, Voicings OS  
**Effort to build:** Medium  
**Category:** Category 2 Synthesis Original

#### Purpose

For a given chord quality (Maj7, m7, Dom7, m7b5), show every note on the fretboard classified as: root, chord tone, available tension, or avoid note — following the Voicings OS Whole-Step Rule. The student sees which frets/strings are "inside" the chord, which are "color," and which are dangerous.

#### What's shown

**Input:** A chord quality (e.g., Cmaj7) with a root.  
**Output:** Every fret on every string, colored by function.

**Classification system:**

| Category | Color | Definition (following Voicings OS VO-07) |
|----------|-------|------------------------------------------|
| Root | Deep gold | The root note of the chord |
| 3rd / 7th | Orange | Guide tones — the harmonic identity notes |
| 5th | Pale amber | Neutral chord tone — present but harmonically neutral |
| Available tensions | Green | Notes a whole step or more above any chord tone |
| Avoid notes | Red | Notes a half step above a chord tone (except b9 in dominant context) |
| Outside | Gray | Notes outside the implied scale entirely |

For **Cmaj7** in C major:
- C (root): deep gold everywhere it appears
- E (3rd): orange
- G (5th): pale amber
- B (7th): orange (guide tone)
- D (9th, available): green — a whole step above C root
- A (13th, available): green — a whole step above G
- F (11th): **red** (avoid) — a half step above E (the 3rd)

#### Visual encoding

- Note dot fill = functional category color
- Root dots are slightly larger than other dots (visual emphasis)
- Guide tones (3rd and 7th) have a small inner ring to distinguish from 5th
- Avoid notes have a red dot with a small "X" or warning marker in the center
- The full constellation of colors across the neck gives the student an immediate sense of which fretboard regions are "safe" vs. "careful"

#### The TPS connection

This overlay makes the TPS (Triad Placement System) from `tps-guitar-data.ts` legible in fretboard context. The TPS shapes live on the top 3 strings (G-B-e). This overlay shows the chord-tone classifications that the TPS shapes naturally produce. A student playing a "3 minor" TPS shape over a C bass sees the green and orange dots their shape is hitting — and understands why the Maj7 Compression color sounds smooth (their fingers land on guide tones and available tensions, not avoid notes).

---

### V5: Musical Situation Overlay

**Slug:** `guitar_fretboard_situation_{chord}_{position}`  
**Source systems:** Plogger Method, Harmony OS, Voicings OS, Emotional Map of Melody  
**Effort to build:** High  
**Category:** Category 3 Moonshot

#### Purpose

This is the centerpiece of the entire system. A student is playing over a chord progression. For **each chord in the progression**, a fretboard diagram is generated showing exactly what is available at that moment — in all four AMF perceptual registers simultaneously.

The musical situation overlay answers the question every improvising guitarist asks: **"I'm on a Dm7 chord. Which of these 72 available frets should I actually touch?"** Not through rules to memorize, but through a visual that makes the answer immediate.

#### What's shown

**Input:** A chord (e.g., Dm7), a tonal context (e.g., key of C major), and optionally a rhythmic position (e.g., "downbeat of bar 2 — strong clave position").

**Output:** A single fretboard diagram where every dot is simultaneously encoded with four layers of information:

**Layer 1 — Structural category (dot fill color):**
- Root (D): deep gold
- Chord tones — 3rd (F), 5th (A), 7th (C): orange
- Available tensions (E = 9th, G = 11th, B = 13th for Dm7 in C): green
- Avoid notes: red with warning marker
- Outside notes (chromatic): gray, empty circle

**Layer 2 — Emotional zone (dot border/ring color):**
- Zone 1 (grounded): thick teal border ring
- Zone 2 (tense but supported): amber border ring
- Zone 3 (floating): blue border ring
- Zone 4 (edgy): thin red border ring

**Layer 3 — Plogger pulsation intensity (dot size):**
- Large dot: low pulsation against the chord root (consonant — safe landing)
- Medium dot: medium pulsation (available color)
- Small dot: high pulsation (tension — use with intention)

The root dot is always the largest. Guide tones are large. Available tensions are medium-large. Avoid notes are small (and red). Outside notes are smallest (and gray).

**Layer 4 — Clave weight annotation (optional, when rhythmic position is specified):**
- A **gold star** or **halo** on notes that are especially strong landing choices on this rhythmic beat (clave dot positions)
- An **X marker** (in the Rhythm Code sense) on notes that work powerfully as anticipations
- No marker on passing-position notes

#### The "wait, WHAT?" moment

Here is the experience this creates:

A student is learning a ii-V-I in C major: Dm7 — G7 — Cmaj7.

They see three fretboard diagrams side by side, one per chord. On the Dm7 diagram, they can immediately see that the F note (the 3rd of Dm7) lights up orange as a guide tone, and it appears in three fretboard locations — they can play it in open position, fifth position, or tenth position. The same F note that is Zone 2 (tense but supported) over the Dm7 becomes a red avoid note over the G7 (it is FA over a G-rooted chord = the 11th avoid over a dominant). They watch the same fret go from green to red as the chord changes.

Then the G7 diagram shows them that B (the 3rd of G7 — TI in the key of C) is now orange and large — a guide tone, landing-ready. And the Cmaj7 diagram shows that same B staying orange but moving from "tension-note" emotional weight to "warmly settled" because now it is the major 7th of home.

**The three diagrams side by side are a visual animation of the II-V-I.** The chord is changing but the neck is the same. The student sees which notes stay lit (tonic chord tones) and which transform (the functional guide tones).

#### Chord progression mode

When a full progression is provided (e.g., |Dm7|G7|Cmaj7|Fmaj7|), the system generates a linked sequence of fretboard diagrams — one per chord. A student can "scroll through" the progression and watch the fretboard transform in real time. Notes that stay the same color across chord changes are tonal anchors. Notes that flip from green to red (or orange to avoid) are the functional pivot points the AMF teaches students to hear.

This is the guitar equivalent of watching guide tone voice leading — but you see it spatially on the instrument, not abstractly on a staff.

---

### V6: Tuning Interval Architecture

**Slug:** `guitar_fretboard_tuning_architecture`  
**Source systems:** Plogger Method  
**Effort to build:** Low  
**Category:** Category 1 Enhancement

#### Purpose

Show the interval structure of standard tuning itself as the foundational di-chord lesson of the instrument. The tuning is not arbitrary — it is a specific sequence of di-chords that encodes the most useful interval relationships for harmony. Understanding the tuning through Plogger vocabulary gives students the "why" of guitar geometry.

#### What's shown

A simplified fretboard diagram showing only the **open strings** (column 0) with large di-chord interval arcs drawn between adjacent strings:

```
e  ←—[5]—— B  ←—[4]—— G  ←—[5]—— D  ←—[5]—— A  ←—[5]—— E
P4           M3           P4           P4           P4
```

Additional annotations:
- The [4] M3 arc between G and B is highlighted in a contrasting color (the anomaly)
- The reason for the M3 is noted: "B was chosen to maximize open-chord chord tones (the CAGED system relies on this break)"
- A sidebar shows the di-chord distance from the low E string to each open string (DO baseline):
  - E to E = [0] (octave / unison — same pitch class)
  - E to A = [5] (perfect 4th)
  - E to D = [10] (minor 7th)
  - E to G = [3] (minor 3rd above the octave)
  - E to B = [7] (perfect 5th above the octave)
  - E to e = [0] (two octaves — same pitch class as E)

#### The teaching insight

The open strings spell out E A D G B E — which contains the notes of an Em11 chord (E G B D + A = 11th, open high e = octave). The tuning is a **chord** — specifically a minor 11 chord. This is not coincidence; it is why open-string voicings in rock and folk sound so full, and why an open E chord on guitar sounds massive: the instrument is already resonating as an Em11 before any fret is pressed.

For a Plogger student: the di-chord distances between open strings [5] [5] [5] [4] [5] are the entire harmonic vocabulary of standard tuning. Understanding these five intervals means understanding why every chord shape works the way it does.

---

### V7: Position Zone Map

**Slug:** `guitar_fretboard_position_zones`  
**Source systems:** Voicings OS, Emotional Map of Melody  
**Effort to build:** Low  
**Category:** Category 1 Enhancement

#### Purpose

Divide the fretboard into named playing positions with visual zone boundaries, annotated with their characteristic harmonic and emotional properties. The student learns to navigate the neck by position identity, not by memorizing individual note names.

#### What's shown

Five horizontal fretboard regions, each color-banded:

| Position | Fret range | Name | Character | Open strings available |
|----------|-----------|------|-----------|----------------------|
| Open position | 0-4 | "The Root Zone" | Grounded, resonant, open-string ring | All 6 (or all within key) |
| 2nd position | 2-6 | "The Near Zone" | Slightly removed, brighter | Partial |
| 5th position | 4-8 | "The Middle Zone" | Balanced, neither open nor straining | None typically |
| 7th position | 6-10 | "The Throat Zone" | Warm, vocal range of guitar | None |
| 9th-12th position | 8-12 | "The High Zone" | Bright, tense, cutting | None |

The color banding runs as a horizontal gradient from warm amber (open/low positions) through neutral gray (middle) to bright blue-white (high positions) — paralleling the Emotional Map's emotional temperature.

#### Harmonic annotation per position

Each position band carries a brief functional note:
- Open position: "TPS shapes live at frets 0-5 for most common keys. Open string resonance adds sustain and overtone richness."
- 5th position: "The 'box' pentatonic position. Neutral emotional weight — ideal for long melodic lines."
- 9th-12th: "Brightness increases with height. Notes feel 'announced' rather than settled."

This connects to the Emotional Map without requiring students to have read that system: the position zones give them a physical vocabulary for navigating emotional temperature without knowing why it works yet.

---

### V8: Clave-Weighted String/Fret Gravity Map

**Slug:** `guitar_fretboard_clave_gravity`  
**Source systems:** Rhythm Code, Plogger Method  
**Effort to build:** Medium  
**Category:** Category 2 Synthesis Original

#### Purpose

This overlay answers a question that is never explicitly asked in any single source but underlies everything the Rhythm Code teaches: **do some fretboard positions carry more rhythmic gravity than others?** The answer is yes — and this diagram shows it.

#### Conceptual foundation

The Rhythm Code establishes that certain rhythmic positions (clave dot positions, X-marker anticipation positions) carry structural weight. The Emotional Map establishes that certain scale degrees (DO, MI, SO — Zone 1) carry tonal weight and land naturally on strong beats. This overlay is their intersection: which notes on the fretboard, when played, tend to function as **rhythmic arrivals** vs. **passing motions**?

This is not an acoustical fact — it is a **statistical and cultural** fact derived from how guitar is played in the Rhythm Code's analyzed repertoire. But it is teachable as a disposition: some frets/strings are "arrival" positions.

#### What's shown

The fretboard is overlaid with a **gravity heat map** — a color temperature gradient showing three categories:

**Hot (high gravity — arrival-suitable):**
- Root note positions of the current key or chord
- The tonic's DO on every string — these always function as arrivals
- Chord tones on strong string positions (E and A bass strings for low root arrivals; G, B, e for melodic arrivals)

**Warm (medium gravity — clave-coincident):**
- The 5th (SO) of the current key — cadential weight
- The natural arrival of any resolution (TI → DO movement endpoint)

**Cool (low gravity — passing or color):**
- Available tensions: beautiful but passing — they lead somewhere
- Chromatic notes: pure transition material

#### Clave rhythm annotation

A separate row at the bottom of the diagram shows the Son Clave grid (16 positions, 2 measures). The five clave dot positions are marked. Below each clave position, a label indicates the most gravitationally appropriate string/fret zone: "Bass string arrivals pair with clave dots. High-e melodic peaks pair with clave dots or X-marker anticipations."

#### The teaching insight

A student looking at this diagram understands for the first time why their guitar part sounds "right" or "floaty." When you land on a low E-string root note on a clave dot position, it **locks**. When you play a beautiful tension note (green) on a clave dot position, it floats and creates anticipation — it sounds like it's looking for somewhere to go. The diagram makes these relationships spatial rather than theoretical.

This is S4 from SYNTHESIS_CANDIDATES.md (Groove-Pitch Matrix) instantiated on a guitar fretboard.

---

### V9: TPS Color Grid — Fretboard View

**Slug:** `guitar_fretboard_tps_view`  
**Source systems:** Voicings OS (TPS field manual)  
**Effort to build:** Low  
**Category:** Category 1 Enhancement

#### Purpose

Show the Triad Placement System color library (`tps-guitar-data.ts`) projected onto the full fretboard — not as chord boxes, but as **fretboard regions**. The student sees where each TPS color lives on the neck and how the movable shape principle maps to fretboard geography.

#### What's shown

This overlay marks the fretboard positions of all TPS shapes for a given bass root. For C as the bass note:

Each TPS color (Major Triad, Maj7 Compression, Dominant 9, Blues Bite, etc.) is shown as a **highlighted group of three dots** on the G, B, and e strings at the appropriate fret positions. The color of the highlight matches the TPS family color (major = gold, minor = purple, dominant = red, atom = gray).

All 13 TPS shapes for root C are shown simultaneously on a single fretboard diagram, each cluster labeled with its color name ("Maj7 Compression," "Blues Bite," etc.). The student sees the entire TPS color library mapped spatially — and immediately sees that:

1. Most shapes cluster in the **same vertical band** (the movable shape principle — shift across the fret axis for different roots)
2. The **horizontal spread** (different fret positions for different TPS colors over the same bass root) shows the harmonic diversity available without moving the bass

#### The movable shape visual

A second version of this overlay shows three side-by-side instances of the same TPS color (e.g., Blues Bite) at three different root positions (C, E, G) — demonstrating the movable principle visually. The shape is the same; only the fret position changes. This is the core pedagogical claim of the TPS system, made visible on the full neck rather than isolated in a chord box.

---

### V10: The Progression Arc Sequence

**Slug:** `guitar_fretboard_progression_arc_{progression_id}`  
**Source systems:** Plogger Method, Harmony OS, Voicings OS, Emotional Map of Melody  
**Effort to build:** High  
**Category:** Category 3 Moonshot

#### Purpose

A multi-panel diagram — one fretboard per chord in a progression — designed to be read left-to-right as a visual animation of harmonic motion. This is the guitar version of Synthesis Candidate S2 (The II-V-I Perception Arc) and S3 (The Arrival Moment), but embodied in fretboard space rather than abstract overlapping registers.

#### What's shown

For a II-V-I in C major (Dm7 → G7 → Cmaj7):

**Panel 1: Dm7**
- D root dots: large gold
- F (3rd), A (5th), C (7th): orange guide tone markers
- E (9th), G (11th): green available tensions
- B (13th): green (available)
- Bb (b13): gray
- An arrow on the B string, low position, pointing right toward the next panel — visual indication of guide tone movement B→B (stays, changes function)
- An arrow showing F → E (the guide tone that collapses by half step)

**Panel 2: G7**
- G root dots: large gold
- B (3rd), F (7th): orange — the tritone guide tone pair
- D (5th): amber
- A (9th), C (13th — suspended quality): green
- F is now a **guide tone** — same physical fret position as the avoid note from panel 1, now essential
- B shows an arrow pointing toward the C in panel 3
- F shows an arrow pointing toward the E in panel 3

**Panel 3: Cmaj7**
- C root dots: large gold
- E (3rd), G (5th), B (7th): orange/amber
- The B note that was an orange guide tone in panel 2 is now an amber 7th — same fret, calmer emotional weight
- The F that was an orange guide tone in panel 2 has **disappeared** (it is now an avoid note over Cmaj7) — its dot is grayed out
- D (9th): green
- A (13th): green

#### The visual arc

Reading left to right across three panels, the student sees:
1. The tritone pair B and F (orange in panel 2) resolving — B stays and lands, F disappears
2. The root D drops out (Dm7 root has no role in Cmaj7)
3. C emerges as root (it was the 7th of Dm7, but now it is the root)
4. The fretboard "simplifies" across the progression — fewer active guide tones, more Zone 1 color, the visual weight moves downward toward bass strings

This is the "wait, WHAT?" diagram for guitar students who have been told the II-V-I is important but have never seen exactly why it works — visible as a physical transformation of the instrument they are holding.

**Variant progressions for generation:**
- 12-Bar Blues: 3 panels (I7 — IV7 — V7) with dominant-specific overlay
- I-V-vi-IV: 4 panels showing the emotional color journey
- Backdoor II-V: Fm7 → Bb7 → Cmaj7 vs. Dm7 → G7 → Cmaj7 side by side (pairs with S9 from SYNTHESIS_CANDIDATES.md)

---

## Dynamic Instantiation

The fretboard diagram system is designed to be **programmatically generated** — not a set of static PDFs. Each overlay is a data-driven rendering where the inputs are:

```typescript
interface FretboardOverlayInput {
  // Core
  slug: string                      // Which overlay variant to render
  key: string                       // e.g., "C", "F#", "Bb"
  mode: string                      // e.g., "major", "dorian", "mixolydian"
  
  // Chord context (for V4, V5, V10)
  chord?: {
    root: string                    // e.g., "D"
    quality: string                 // e.g., "m7", "7", "maj7", "m7b5"
    function?: 'tonic' | 'subdominant' | 'dominant'
  }
  
  // Progression context (for V10)
  progression?: Array<{
    root: string
    quality: string
    beats?: number                  // Duration in beats
    clavePosition?: number          // Which clave position this chord change falls on
  }>
  
  // Display options
  fretsShown?: [number, number]     // e.g., [0, 12] or [4, 9] for position focus
  highlightPosition?: number       // Center the diagram on this fret
  showOpenStrings?: boolean
  
  // Overlay-specific
  diChordNumber?: number            // For V1 — which interval to highlight
  tpsColorName?: string             // For V9 — which TPS shape to highlight
}
```

**Generation surface:** The AMF app already has a dynamic `/systems/[slug]` route. The fretboard diagram system would live at `/systems/guitar-fretboard` with URL parameters for key, chord, and overlay variant. A teacher generating a lesson-specific diagram would navigate to:

```
/systems/guitar-fretboard?overlay=situation&chord=Dm7&key=C&context=ii-V-I
```

And receive a dynamically rendered fretboard with the V5 Musical Situation overlay for that exact harmonic moment.

**For the Nano Banana pipeline:** Each overlay variant above can be translated directly into a Nano Banana spec. The `slug` field is the Nano Banana `slug`. The color tables above map to Nano Banana `fills`. The multi-panel V10 is a Nano Banana `sequence_chart`. The di-chord arc lines in V1 are Nano Banana `connector_arcs`.

---

## Integration with Existing Assets

### Synthesis Candidates enhanced or enabled by this system

**Directly enables:**

| Candidate | How the fretboard system helps |
|-----------|-------------------------------|
| S1 — Scale Degree Prism | V3 (scale degree overlay) provides the guitar panel that was missing from the five-system prism. A guitar fretboard with scale degree coloring is the missing visual for the "how to play it" register. |
| S2 — II-V-I Perception Arc | V10 (Progression Arc Sequence) is the guitar-native version of this synthesis. The arc that S2 shows abstractly, V10 shows physically on the neck. |
| S3 — The Arrival Moment | V5 (Musical Situation) at the Cmaj7 moment is exactly this — the freeze-frame of resolution, shown on guitar as a fretboard where Zone 1 dots dominate and the guide tones have landed. |
| S9 — Backdoor vs. Standard II-V | V10 can generate both progressions side by side on guitar, showing visually how the backdoor's guide tones take a different path to C than the standard dominant. |

**New synthesis possibilities created:**

| New candidate | Description |
|---------------|-------------|
| G-S1 — The Tuning as a Plogger Lesson | V6 (Tuning Architecture) + di-chord pulsation table = a diagram showing that the open strings of a guitar are a physical di-chord exercise. The P4 tuning intervals mean the instrument itself is "pre-voiced" in the most harmonically stable interval after the octave. |
| G-S2 — TPS Shape Library on the Full Neck | V9 at all 12 roots shown in a grid = a complete visual atlas of the TPS system that replaces isolated chord boxes with a fretboard-geography understanding. A student sees that Blues Bite (#9) always "lives" at a specific fretboard address relative to the bass root. |
| G-S3 — Mode Journey Across the Neck | V3 generated for all 7 modes in C on a single fretboard = the Heptachord Shift House Plan (E6 from SYNTHESIS_CANDIDATES.md) instantiated as physical fretboard movement. Each mode change is visible as a different dot lighting up. |
| G-M1 — The Living Progression | V10 rendered as an animated sequence (dots fading in/out, guide tone arrows animating) = the closest thing in the AMF to a real-time harmonic visualization tool. The "wait, WHAT?" is seeing the fretboard breathe as the chord changes. |

### Connection to existing components

- `components/GuitarChordDiagram.tsx` — the existing chord box renderer. The fretboard system is the **full-neck complement** to this component. Chord boxes show where to put your fingers; fretboard overlays show why.
- `components/TpsGuitarColorGrid.tsx` — the TPS color grid already renders chord-quality colors by root. V9 (TPS Fretboard View) is this component expanded from chord boxes to full neck view.
- `lib/tps-guitar-data.ts` — the `GuitarChordShape` data structures already contain the fret positions needed to generate V9. The `TpsColor.placement` string (e.g., "3 minor", "b7 major") maps directly to the Harmony OS voicing classifications needed for V4 and V5.

### PDF generation

Each overlay variant can be exported as a Nano Banana PDF at A4 or letter size. The multi-panel V10 prints as a 3-4 panel landscape spread. The recommended print set for a sprint is:
- 1x V3 (key scale-degree overlay for the sprint's key)
- 1x V4 (chord tone map for the sprint's target chord)
- 1x V5 (musical situation for the sprint's anchor song chord)

---

## Build Priority Matrix

| Variant | Slug | Systems | Effort | Impact | Priority |
|---------|------|---------|--------|--------|----------|
| Base Diagram | `guitar_fretboard_base` | — | S | Required | P0 |
| V3: Scale Degree | `...scale_degree_overlay` | Plogger | S | High | P1 |
| V4: Chord Tone/Tension | `...chord_tension_overlay` | Harmony, Voicings | M | High | P1 |
| V6: Tuning Architecture | `...tuning_architecture` | Plogger | S | Medium | P1 |
| V7: Position Zone Map | `...position_zones` | Voicings, EmMap | S | Medium | P2 |
| V2: Emotional Zone Map | `...emotional_zone_map` | EmMap | M | High | P2 |
| V1: Di-Chord Interval Web | `...dichord_interval_web` | Plogger | M | High | P2 |
| V9: TPS Fretboard View | `...tps_view` | Voicings (TPS) | S | Medium | P2 |
| V5: Musical Situation | `...situation_{chord}` | All 5 | H | Moonshot | P3 |
| V8: Clave Gravity | `...clave_gravity` | Rhythm, Plogger | M | High | P3 |
| V10: Progression Arc | `...progression_arc_{id}` | All 5 | H | Moonshot | P3 |

**P0 — Build first.** The base diagram is a prerequisite for all others.  
**P1 — Build with the base.** These are low-effort, high-value, and directly support current curriculum content.  
**P2 — Build in the next sprint.** These complete the synthesis connection to the full AMF chamber system.  
**P3 — Moonshot sprint.** V5 and V10 are the ones that make musicians stop and say "wait, WHAT?" They require the most input data but deliver the most transformative learning experience.

---

*File: `/home/elderle/amf-app/docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md`*  
*Next step: Approve base diagram spec → generate base as SVG → layer overlays as React components over the SVG substrate*
