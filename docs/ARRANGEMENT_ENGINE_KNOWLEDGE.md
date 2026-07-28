# Fingerstyle Arrangement Engine — Knowledge Framework

> **Purpose:** This document is the conceptual substrate for the AMF Fingerstyle Arrangement Engine and its AI collaborator. It unifies three knowledge systems — AMF Musical Universe vocabulary, classical counterpoint theory, and fingerstyle guitar physics — into a single coherent framework. Every arrangement decision, AI explanation, and interactive edit maps back to concepts defined here.

---

## Table of Contents

1. [Why Three Knowledge Systems?](#1-why-three-knowledge-systems)
2. [The AMF Foundation Layer](#2-the-amf-foundation-layer)
3. [Classical Counterpoint Layer](#3-classical-counterpoint-layer)
4. [Fingerstyle Guitar Physics Layer](#4-fingerstyle-guitar-physics-layer)
5. [DADGAD Galaxy — Tuning-Specific Principles](#5-dadgad-galaxy--tuning-specific-principles)
6. [Standard Tuning Galaxy — EADGBE](#6-standard-tuning-galaxy--eadgbe)
7. [The Cross-Language Mapping Table](#7-the-cross-language-mapping-table)
8. [Arrangement Modes — From Chord-First to Counterpoint-First](#8-arrangement-modes--from-chord-first-to-counterpoint-first)
9. [Species Counterpoint Applied to Fingerstyle](#9-species-counterpoint-applied-to-fingerstyle)
10. [The AI Collaborator Vocabulary](#10-the-ai-collaborator-vocabulary)
11. [Decision Trees](#11-decision-trees)
12. [Prominent Players as Style Templates](#12-prominent-players-as-style-templates)

---

## 1. Why Three Knowledge Systems?

A fingerstyle guitar arrangement is simultaneously three things:

- **A compositional object** — voices moving through time, governed by interval relationships, motion types, and tension-resolution logic (classical counterpoint)
- **A musical experience** — a navigational, emotional, and perceptual event that the player and listener share (AMF Musical Universe)
- **A physical execution** — a sequence of left-hand fret positions and right-hand finger assignments, constrained by string geometry and hand mechanics (fingerstyle guitar physics)

The arrangement engine must reason in all three layers at once. The AI collaborator must be able to receive a casual instruction ("sounds too resolved — push later") and translate it into all three languages before editing the note data.

### The Core Principle

> **No arrangement decision lives in only one layer.** "Add a suspension" is a counterpoint instruction (4th species, dissonance on strong beat resolving by step), an AMF event (Resolving anchor, "Resolve" arrival behavior, Tension emotional coordinate → Grounded), and a guitar physics problem (the tied note must be fingerable across the bar line without lifting the fretting finger). The engine must check all three before committing.

---

## 2. The AMF Foundation Layer

### 2.1 The Musical OS (Plogger)

The Plogger method provides the **psychoacoustic substrate** — the reason specific intervals and textures produce specific sensations. Its core analytical units map directly onto counterpoint theory:

| Plogger Concept | What It Measures | Counterpoint Equivalent |
|-----------------|-----------------|------------------------|
| **Di-chord number** | The interval class between any two simultaneous notes (1=unison through 12=octave) | The interval in a species exercise |
| **Harmonicity** | Degree of alignment in the overtone series between the two pitches | Consonance (high harmonicity) vs. dissonance (low harmonicity) |
| **Interference pulsation** | The beating rate perceived when the two pitches are sounded | The "roughness" that makes dissonances need resolution |
| **Fundamental/Octave factor** | Whether the interval generates a clear implied root | Root stability — determines which voice is the bass |

**Plogger's critical insight for arrangement:** The reason a perfect 5th (Di-chord #8) is a consonance is not arbitrary — its harmonicity is high (3:2 ratio, minimal beating), and it generates a clear F/O direction. A minor 2nd (Di-chord #2) has low harmonicity and high pulsation — that's *why* it needs resolution. The arrangement engine's consonance/dissonance rules are not rules of style; they are rules of acoustic physics.

### 2.2 Musical Universe Navigation Vocabulary

The Musical Universe adds spatial and emotional layers on top of the Plogger substrate:

| Term | Definition | Arrangement Meaning |
|------|-----------|---------------------|
| **Galaxy** | The tuning — DADGAD or Standard | Sets which strings are available, where open notes fall, what the default drone is |
| **Solar System** | Key + mode (tonal center + modal color) | Determines which pitches are consonant with the home drone, which are chromatic color |
| **Orbit** | How a note functions harmonically: Root, Third, or Fifth | Determines voice assignment — melody notes in Root or Third Orbit get structural weight; Fifth Orbit notes need support from below |
| **Constellation** | The specific voicing completing a chosen Orbit | The physical chord shape the solver must find on the fretboard |
| **Anchor** | A voice held stable through a harmonic transition | The note that doesn't move when chords change; the counterpoint "common tone" |
| **Bridge** | A temporary voicing that shapes the path between Constellations | The passing chord or embellishing voice motion between structural beats |
| **Emotional Coordinate** | A note's position in stability space (Grounded / Floating / Tense / Friction) | Determines the target emotional quality the arrangement should achieve at each structural point |
| **Arrival behavior** | How a note's emotional coordinate changes at a chord change: Confirm / Float / Resolve / Depart | The cadential function — authentic, half, deceptive, or phrase-beginning character |
| **Changing Backdrop** | A static melody note held while Constellations change beneath it | The pedal point or melodic suspension — the drone principle in action |
| **Waypoint** | Structurally important melody notes: phrase beginnings/ends, long notes, chord changes, repeated notes | Determines where counterpoint rules must be strictly satisfied (on Waypoints) vs. where passing motion is free |

### 2.3 AMF Melody Chamber Concepts

The Melody Chamber provides tools for analyzing the cantus firmus (the given melody):

| AMF Concept | Classical Equivalent | Arrangement Use |
|-------------|---------------------|-----------------|
| **Pillar Notes** | Structurally emphasized melody pitches (phrase peaks, long notes) | These notes receive the strictest counterpoint treatment — a consonant interval in the bass/inner voice is non-negotiable here |
| **Backbone Notes** | The harmonic skeleton of the melody — notes that confirm the active chord | Notes where the counter-voice should be in Root or Third Orbit (most stable consonance) |
| **5 Key Notes Framework** | The set of pitches that define the melody's emotional shape | The pitch set the counter-voice should interact with most purposefully |
| **Zone** | Register: high, mid, or low | String assignment — determines which physical strings carry each voice |
| **Duration Amplifies Zone** | Long notes amplify the emotional impact of their interval relationship | Long notes in the melody demand especially careful counter-voice choices — a held dissonance is much more audible than a passing one |
| **Tiny Tension Arc** | The micro-phrase shape: pull away from stability, return | One measure of species counterpoint viewed as a tension arc — the counter-voice creates tension, the Waypoint note resolves it |
| **4 Chord-Change Behaviors** | How melody handles harmonic transition | The arrival behavior of the melody note at the chord change determines whether the counter-voice should Confirm, Float, Resolve, or Depart |
| **8-Step Melody Audit** | A structured analysis of the melody's properties | Pre-processing step before the arrangement engine runs — identifies Pillar Notes, Waypoints, and Zone distribution |

### 2.4 Anchor Taxonomy → Counterpoint Motion Types

The four Anchor types map directly onto classical counterpoint techniques:

| Anchor Type | AMF Definition | Classical Equivalent | Counterpoint Effect |
|-------------|---------------|---------------------|---------------------|
| **Shared** | A note common to both the current and incoming Constellation | Common tone / oblique motion | The anchor voice holds still while others move; the smoothest possible transition |
| **Resolving** | A note that moves by step into the new Constellation | Leading-tone or suspension resolution | Creates a sense of pull and landing; the core of 4th species work |
| **Color** | A tone that adds extension color while the Constellation changes | Chromatic approach / passing tone | Adds sophistication without disrupting the harmonic arrival; floating quality |
| **Anticipatory** | A note from the incoming Constellation sounded early | Rhythmic anticipation / appoggiatura | Creates forward momentum; the "Depart" arrival behavior |

---

## 3. Classical Counterpoint Layer

### 3.1 The Species System

Species counterpoint defines five progressive levels of rhythmic complexity in the counter-voice(s) relative to the cantus firmus (the given melody). In fingerstyle arrangement, the melody is the cantus firmus, and the arranger's task is to add one or more counter-voices.

| Species | Ratio | Character | Fingerstyle Texture |
|---------|-------|-----------|---------------------|
| **1st** | 1:1 (note against note) | Structural, stable, austere | One bass note per melody note; sparse but clear; two-voice open sound |
| **2nd** | 2:1 (two against one) | Flowing, stepwise bass movement | Alternating bass or walking bass with melody; adds linear interest |
| **3rd** | 4:1 (four against one) | Active, ornamental | Arpeggiated patterns under melody; creates lute/classical guitar texture |
| **4th** | Tied/syncopated | Tension, suspension | Tied bass or inner voice creating dissonance on the beat, resolving by step; highest emotional intensity |
| **5th (Free)** | Mixed | Expressive, idiomatic | Combines all species elements; most natural for actual music; the target for completed arrangements |

### 3.2 Consonance and Dissonance

**Perfect consonances** (allowed anywhere, including strong beats and without preparation):
- Unison (P1) — Di-chord #1
- Perfect 5th (P5) — Di-chord #8
- Octave (P8) — Di-chord #12 (= #1 at a different octave)

**Imperfect consonances** (preferred in tonal counterpoint; warm, stable but directional):
- Major 3rd (M3) — Di-chord #5 — highest harmonicity after P5; preferred
- Minor 3rd (m3) — Di-chord #4 — warm minor color
- Major 6th (M6) — Di-chord #10
- Minor 6th (m6) — Di-chord #9

**Dissonances** (must be handled by specific motion types — cannot appear freely):
- Minor 2nd (m2) / Major 7th (M7) — Di-chords #2/#11 — highest pulsation; passing or neighbor only
- Major 2nd (M2) / Minor 7th (m7) — Di-chords #3/#10 — strong dissonance; passing or suspension
- Tritone (A4/d5) — Di-chord #7 — highest tension; always resolves by step inward or outward

**For the arrangement engine:** A note in the bass or inner voice is *consonant* with the current melody note if their interval class is in {P1, m3, M3, P5, m6, M6, P8}. Any other interval is dissonant and requires special justification (it must be a passing tone, neighbor tone, suspension, or anticipation).

### 3.3 Motion Types

| Motion Type | Definition | Rules | Emotional Quality |
|-------------|-----------|-------|-------------------|
| **Contrary** | Voices move in opposite directions | Always preferred; never forbidden | Independent, vibrant, maximum voice separation |
| **Oblique** | One voice holds, the other moves | Requires the held voice to be consonant at the held pitch | Stable anchor feeling; creates pedal point when extended |
| **Similar** | Both voices move in the same direction but by different intervals | Allowed when arriving at an imperfect consonance; forbidden when arriving at a perfect consonance (produces hidden 5ths/8ths) | Natural, parallel movement; less independent than contrary |
| **Parallel** | Both voices move by identical intervals | Forbidden for P5 and P8 (parallel 5ths/8ths are the most fundamental prohibition); allowed for 3rds and 6ths | Thick, full sound (parallel 3rds/6ths); parallel 5ths → muddy, no voice independence |

**The three absolute prohibitions** (apply in all species, all arrangements):
1. No parallel perfect 5ths between any two voices
2. No parallel octaves (or unisons) between any two voices
3. No voice crossing (a lower voice moving above an upper voice creates confusion)

### 3.4 Non-Chord Tone Taxonomy

These are the specific *types* of dissonant notes that appear in species counterpoint and free counterpoint. The AI collaborator needs to be able to name and place all of them:

| Non-Chord Tone | Abbreviation | Approach | Resolution | Species |
|----------------|-------------|---------|-----------|---------|
| **Passing tone** | PT | Stepwise from previous chord tone | Stepwise in same direction | 2nd, 3rd |
| **Neighbor tone** | NT | Stepwise from chord tone | Stepwise back to same chord tone | 2nd, 3rd |
| **Suspension** | SUS | Held (tied) from previous beat | Stepwise down | 4th |
| **Retardation** | RET | Held (tied) from previous beat | Stepwise up (rare upward suspension) | 4th |
| **Anticipation** | ANT | Stepwise or leap to chord tone of *next* chord, one beat early | The chord arrives and confirms it | 4th, 5th |
| **Appoggiatura** | APP | Leap to a dissonance | Stepwise to nearest chord tone | 5th |
| **Escape tone** | ET | Stepwise from chord tone | Leap in opposite direction | 5th |
| **Pedal point** | PP | Held bass note while harmony moves above | Returns to consonance when held note becomes chord tone again | 5th |
| **Cambiata** | CAM | Specific 4-note pattern: C-D-B-C | — | 3rd (Renaissance) |

**Suspension labels** (the most commonly used in fingerstyle):
- **4-3 suspension**: The 4th resolves down to the 3rd (most common; warm) 
- **7-6 suspension**: The 7th resolves down to the 6th (outer-voice; sophisticated)
- **9-8 suspension**: The 9th resolves down to the octave (powerful; often in bass)
- **2-3 bass suspension**: Bass holds a tone that becomes a dissonant 2nd, resolves down to 3rd (creates the "bassus" suspension sound)

### 3.5 Voice Leading Rules (Priority Order)

When the engine must choose between possible counter-voice options, apply these in priority order:

1. **Avoid parallel 5ths and octaves** (absolute — disqualifies the option)
2. **Prefer contrary motion** over similar, oblique, or parallel
3. **Prefer stepwise motion** (motion by step) over leaps
4. **Resolve dissonances immediately** by step in the expected direction
5. **Avoid voice crossing** (lower voice passes above upper voice)
6. **Prefer imperfect consonances** (3rds, 6ths) over perfect (5ths, octaves) at most non-cadential points
7. **Reserve perfect consonances for cadential points** (endings of phrases, structural arrivals)
8. **After a leap**, move by step in the opposite direction (compensating step)

---

## 4. Fingerstyle Guitar Physics Layer

### 4.1 Right Hand — Finger Assignment

The standard classical/fingerstyle right-hand convention:

| Finger | Symbol | Typical Strings | Voice Function |
|--------|--------|----------------|----------------|
| Thumb | p (pulgar) | Strings 4, 5, 6 | Bass voice and drone (tenor/bass in SATB) |
| Index | i (índice) | String 3 (sometimes 2) | Inner voice (alto) |
| Middle | m (medio) | String 2 | Inner-high voice or secondary melody support |
| Ring | a (anular) | String 1 (sometimes 2) | Melody voice (soprano) |

**The thumb is the bass counterpoint voice.** In species terms:
- 1st species: thumb on beat, one note per melody note
- 2nd species: alternating bass thumb (two strokes per melody note)
- 3rd species: thumb on beat, i/m/a roll through inner and melody

### 4.2 Left Hand Constraints

These are hard physical limits the solver must respect:

| Constraint | Rule |
|-----------|------|
| **Maximum stretch** | 4 frets between first and fourth fingers without a position shift |
| **Position center** | Each finger naturally covers one fret at a given hand position; position is defined by the index finger's fret |
| **Open strings** | Any string can play its open pitch at zero cost — no left-hand engagement required |
| **Barre chords** | One finger can fret multiple strings at the same fret (partial or full barre) |
| **Tied notes** | The fretting finger must hold its position without releasing across the duration of the tie |
| **String skip** | Right hand can skip a string but it adds coordination cost for fast passages |

### 4.3 Zones (from AMF Guitar Framework)

| Zone | Frets | Character | Voice Assignment Priority |
|------|-------|-----------|--------------------------|
| **Open/Cowboy** | 0–4 | Maximum open-string utilization; big resonant sound; easiest access | Bass + drone voices first; open-string inner voices |
| **Campfire** | 5–7 | Partial barre territory; chord shapes migrate up the neck | Bass can still use open strings while melody shifts up |
| **Barre** | 8–12 | Full closed shapes; all notes fretted; more position economy required | Inner voices must use fretted notes; open strings become drones only |
| **Upper register** | 12+ | High melody access; harmonics available; bass must step down | Melody only; bass returns to open string drones |

### 4.4 Register Assignments by Voice

| Voice | SATB Analog | DADGAD Strings | Standard Strings | MIDI Range |
|-------|------------|---------------|-----------------|-----------|
| Melody | Soprano | String 1 (D4), String 2 (A3) | String 1 (E4), String 2 (B3) | 57–76 (A3–E5) |
| Inner high | Alto | String 2 (A3), String 3 (G3) | String 2 (B3), String 3 (G3) | 48–64 (C3–E4) |
| Inner low | Tenor | String 3 (G3), String 4 (D3) | String 3 (G3), String 4 (D3) | 40–57 (E2–A3) |
| Bass | Bass | String 5 (A2), String 6 (D2) | String 5 (A2), String 6 (E2) | 28–48 (E1–C3) |

### 4.5 Fingerstyle Pattern Types → Species Mapping

| Fingerstyle Pattern | Species Equivalent | Right Hand | Character |
|--------------------|--------------------|-----------|-----------|
| Block chord | 0th (homophonic) | p+i+m+a together | Chordal, not counterpoint |
| Alternating bass | 2nd species | p alternates 5-6, a/m play melody | Walking, flowing bass |
| Arpeggio (slow) | 3rd species | p-i-m-a sequential roll | Bell-like, harp texture |
| Pinch (bass + melody) | 1st species | p + a simultaneously | Clear two-voice dialogue |
| Travis picking | 2nd/3rd mixed | p alternates while i/m/a ornament | Classic country/folk fingerstyle |
| Suspension pattern | 4th species | Tied string held across bar | Tension-resolution, emotional peak |
| Free combination | 5th species | Mixed per phrase | Most expressive; standard for arrangements |

---

## 5. DADGAD Galaxy — Tuning-Specific Principles

### 5.1 String Layout

```
String:   6     5     4     3     2     1
Note:     D2    A2    D3    G3    A3    D4
MIDI:     38    45    50    55    57    62
```

The open chord is **Dsus4** (D-A-D-G-A-D). Every open string is a member of the D sus4 chord.

### 5.2 Natural Drone Notes

Because strings 1, 2, 4, 5, and 6 are all D or A:
- **D pedal** is always available as a free bass note on string 4, 5, or 6
- **A pedal** is available on string 2 or 5
- These are literally free — no left-hand engagement

**In counterpoint terms:** DADGAD provides free pedal point bass notes for D and A in any key that contains those pitches. The "Changing Backdrop" scenario (AMF) = pedal point (classical) = hold open string while harmony moves above.

### 5.3 Tonal Centers and Open-String Chord Tones

| Key / Mode | Open strings as chord tones | Quality of fit |
|-----------|---------------------------|---------------|
| **D major** | D (6,4,2,1), A (5,3) → all 6 strings | Perfect — every string is 1 or 5 of D major |
| **D Dorian** (D-E-F-G-A-Bb-C) | D, A, G all open → root, 5th, 4th | Excellent; G open = natural 4th; Bb and C are color notes |
| **D Mixolydian** (D-E-F#-G-A-B-C) | D, A, G all open → root, 5th, 4th | Celtic feel; C♮ creates modal signature |
| **D minor** (Aeolian) | D, A, G → root, 5th, minor 4th | Strong; F and Bb are color; drone D always consonant |
| **G major** | G (3), D (6,4,2,1), A (5,3) | Very strong; all open strings = 1, 4, or 5 of G |
| **Em** | G (3), A (5,3), D (6,4,1) → root=E requires fret 2 | Good; bass E at fret 2/string 5; open strings add color |
| **A major** | A (5,3), D (6,4,1) → root=A on string 5, adds natural 4th | Moderate; D strings create Asus4 tension |

### 5.4 DADGAD-Specific Counterpoint Rules

**Rule D-1: Bass pedal by default.** Before adding any bass counterpoint voice, check if the target pitch is an open string. Open-string bass notes are always preferred over fretted ones — they ring longer, require no left-hand involvement, and free fingers for inner voices.

**Rule D-2: G3 (string 3) is the natural inner voice.** At open position, G3 forms:
- A minor 3rd below A3 (string 2) — imperfect consonance, preferred
- A perfect 4th below D4 (string 1) — available as inner color
- A perfect 4th above D3 (string 4) — available as tenor voice

**Rule D-3: String 2 (A3) serves double duty.** A3 can function as upper inner voice or lower melody support, depending on whether the melody occupies string 1 or not. When melody drops below D4, A3 becomes the melody carrier.

**Rule D-4: The natural 2-voice skeleton.** The most idiomatic DADGAD first-species texture is:
- Bass: open string 6 (D2) or string 5 (A2) — pedal or alternating
- Melody: string 1 or 2 — the actual tune
- The interval between them is a 10th (compound 3rd) or 12th (compound 5th) — both imperfect or perfect consonances ✓

**Rule D-5: Avoid parallel 5ths with the open-string drone.** Because D and A strings ring sympathetically, any time you have a moving voice that creates parallel 5ths with the drone, it sounds muddy. The solver must check the drone against all moving voices, even if the drone string is not being intentionally plucked.

**Rule D-6: Modes favor stepwise inner voices.** In D Mixolydian or Dorian, the ♭7 (C♮) and ♭3 (F♮) are the defining color tones. An effective counterpoint strategy is to include these as passing tones in the inner voice, letting the open-string drone support the tonal center while the inner voice defines the mode.

### 5.5 DADGAD Fretboard Geography for Counterpoint

**Most common melody notes and their locations:**

| Pitch | String/Fret options | Voice role |
|-------|---------------------|-----------|
| D4 | 1-open, 2-fret5 | Melody home tone |
| E4 | 1-fret2 | Melody step up |
| F#4 | 1-fret4 | Melody — D major color |
| G4 | 1-fret5, 2-fret10 | Melody — 4th above D |
| A4 | 1-fret7, 2-open+octave (A3=open) | Melody — 5th above D; also top drone |
| C4 | 2-fret3 | Melody — Mixolydian/Dorian ♭7 |
| B3 | 2-fret2 | Inner voice — 6th |

**Most efficient inner voice / bass lines for common progressions:**

D → G: Bass D6→G6(fret5) or D6-open→G3-open; inner voice G3-open→G3-open (oblique motion ✓)
D → A: Bass D6-open→A5-open (oblique or alternating); interval remains within 5th ✓
D → Em: Bass D6-open→E5(fret2); string 3 G3-open provides the minor 3rd of Em ✓

---

## 6. Standard Tuning Galaxy — EADGBE

### 6.1 String Layout

```
String:   6     5     4     3     2     1
Note:     E2    A2    D3    G3    B3    E4
MIDI:     40    45    50    55    59    64
```

### 6.2 Differences from DADGAD That Affect Counterpoint

| Property | DADGAD | Standard | Counterpoint Implication |
|----------|--------|----------|--------------------------|
| Open bass drone | D + A | E + A | Standard's natural drone is E (minor key territory); D requires fret 2 |
| Open chord quality | Dsus4 (purely open, all drone) | Em7add11 (E-A-D-G-B-E) | Standard's open chord is more dissonant; harder to use as free drone |
| Inner string interval (3→2) | m3 (G→A) | M3 (G→B) | Standard has more inherent major-third resonance; DADGAD has more modal color |
| Melody-inner interval (2→1) | P4 (A→D) | P4 (B→E) | Same; both tunings have a perfect fourth between strings 1 and 2 |
| Symmetry | Asymmetric (D-A-D-G-A-D) | Near-symmetric (mostly 4ths, M3 between strings 2-3) | The major 3rd (G→B) in Standard means string-set shapes don't transpose uniformly |

### 6.3 Standard Tuning Counterpoint Traditions

**Classical tradition (Bach lute suites, Villa-Lobos, Tarrega):**
- Strict counterpoint in open position and up the neck
- Bass thumb carries independent melodic lines
- Inner voices primarily as sustained chord tones
- The BWV 998 Prelude and Fugue (Bach, for lute/guitar) = the gold standard for multi-voice counterpoint on the instrument

**Travis picking tradition (Merle Travis, Chet Atkins, Tommy Emmanuel):**
- Alternating bass = 2nd species bass against melody
- Thumb creates a "virtual drummer + bassist" while fingers carry melody and inner harmony
- This is 2nd species counterpoint disguised as groove

**Jazz chord-melody tradition (Joe Pass, Lenny Breau, Ted Greene):**
- Chord tones compressed into single voicings; counterpoint implicit rather than explicit
- Voice leading between chord shapes = the "smooth" jazz standard sound
- Non-chord tones handled as chromatic approach notes (a form of Color anchor)

---

## 7. The Cross-Language Mapping Table

The fundamental translation layer. Every concept the AI collaborator uses must map across all three vocabularies.

| AMF Musical Universe | Classical Counterpoint | Fingerstyle Guitar | Engine Parameter |
|---------------------|----------------------|-------------------|-----------------|
| Di-chord consonance (high harmonicity) | Consonant interval (P1, m3, M3, P5, m6, M6, P8) | Thumb + finger playing a stable-sounding interval | `intervalClass ∈ consonantSet` |
| Di-chord dissonance (low harmonicity, pulsation) | Dissonant interval (m2, M2, A4, m7, M7) | Interval that creates beat frequencies; needs resolution | `intervalClass ∉ consonantSet → NCT required` |
| Shared anchor | Common tone / oblique motion | One voice holds its finger position | `voice.pitch unchanged across harmonic transition` |
| Resolving anchor | Suspension (4th species) / leading tone | Tied note resolving down by half or whole step | `note.tie=true → next.pitch = note.pitch - 1or2` |
| Color anchor | Chromatic passing / neighbor tone | Accidental note approached and left by step | `note.pitch ∉ diatonicScale → stepMotion both sides` |
| Anticipatory anchor | Rhythmic anticipation / appoggiatura | Next chord's note sounded one beat early | `note.startBeat = nextChord.startBeat - 1` |
| Confirm arrival | Authentic cadence (V-I) | Final bass note lands on tonic root | `voice.bass = tonicMidi → perfectConsonance with melody` |
| Float arrival | Half cadence or deceptive | Bass lands on dominant or submediant | `voice.bass = dominantMidi or submediatMidi` |
| Resolve arrival | Suspension resolution | Tied dissonance → stepwise resolution | `suspension → resolution down 1–2 semitones` |
| Depart arrival | Phrase opening / upbeat | Upbeat arpeggiation or pick-up figure | `voice.startBeat < measureBeat1, weak metric position` |
| Grounded emotional coordinate | Perfect consonance on strong beat | Open strings + stable interval at downbeat | `beat = strong AND intervalClass ∈ {P1, P5, P8}` |
| Floating emotional coordinate | Imperfect consonance or weak beat | 3rd/6th interval, or on weak beat | `beat = weak OR intervalClass ∈ {m3, M3, m6, M6}` |
| Tense coordinate | Prepared dissonance (suspension) | Tied note creating mild dissonance | `intervalClass ∉ consonantSet AND note.prepared = true` |
| Friction/suspense | Unprepared dissonance | Appoggiatura or accented passing tone | `intervalClass ∉ consonantSet AND note.prepared = false` |
| Changing Backdrop | Pedal point | Open string drone while harmony moves | `voice.pitch = constant AND harmony.chord changes above` |
| Orbit: Root | Chord tone: root or octave of root | Root on thumb bass, or top of chord | `note.pitch % 12 = chord.root` |
| Orbit: Third | Chord tone: 3rd (major or minor) | Inner voice or harmony above bass | `(note.pitch - chord.root) % 12 ∈ {3, 4}` |
| Orbit: Fifth | Chord tone: 5th (perfect or altered) | Upper inner voice, less stable | `(note.pitch - chord.root) % 12 ∈ {6, 7, 8}` |
| Core tone | Root position chord tone (1 or 5) | Bass string or primary fretted note | Highest weight in voice assignment |
| Structural tone | 3rd of chord | Inner voice | Second priority |
| Color tone | 7th, 9th, 11th, 13th | Upper extension on high strings | Third priority; never in bass |
| Tension tone | Altered/dissonant non-chord tone | Chromatic note requiring resolution | Lowest priority; requires resolution in next note |
| Waypoint | Phrase boundary, long note, downbeat | Structural arrival point | Strict consonance enforced at Waypoints |

---

## 8. Arrangement Modes — From Chord-First to Counterpoint-First

The engine supports two fundamental paradigms, which are additive — both are always available.

### Mode A: Chord-First (Current)

**Logic:** Take the chord symbol → extract chord tones → assign each voice to a chord tone → solve for fretboard position.

**Strengths:** Harmonically complete, recognizable chord voicings, idiomatic to modern fingerstyle and jazz chord-melody.

**Limitations:** Voices are not melodically independent — they're shaped by the chord, not by their own linear motion. Bass line may leap rather than step. Inner voices may be static or doubling rather than contributing counterpoint.

**Arrangement modes in chord-first:**
- `simple`: melody + bass only (2 voices, both chord tones)
- `drone`: melody + drone + bass (open-string drone adds 3rd voice)
- `harmonic`: melody + bass + inner (3 voices from chord tones)
- `voice-led`: all 4 voices (smooth voice-leading between chord shapes)

### Mode B: Counterpoint-First (New — in development)

**Logic:** The melody is the cantus firmus. Generate one or more counter-voices that interact with it according to species rules. Chord symbols provide the tonal framework (which pitches are consonant vs. dissonant), but the counter-voice is generated as an independent melodic line.

**Strengths:** Voices are genuinely independent; bass and inner lines have their own melodic shape; more satisfying musical texture; pedagogically rigorous.

**Limitations:** Chord voicings may be incomplete (not all chord tones present); requires more space (sparse texture in early species).

**Arrangement modes in counterpoint-first:**
- `first-species`: melody + 1:1 bass (one consonant note per melody note)
- `second-species`: melody + 2:1 bass (two notes per melody note; passing tones allowed)
- `third-species`: melody + 4:1 inner voice (ornamental; arpeggiated texture)
- `fourth-species`: melody + suspension bass (tied notes; highest tension)
- `free-counterpoint`: melody + bass + inner; mixed species; idiomatic 5th species
- `three-voice`: melody + 2nd species bass + 1st species inner (3-voice counterpoint)
- `four-voice`: full SATB adapted to guitar — most complex; requires careful register management

---

## 9. Species Counterpoint Applied to Fingerstyle

### 9.1 First Species — Note Against Note

**Rule set:**
- Every melody note receives exactly one counter-voice note
- The interval between them must be a consonance (see §3.2)
- Prefer contrary motion; avoid parallel 5ths/8ths
- Begin and end on perfect consonances (P1, P5, P8)
- Avoid unisons except at beginning and end

**DADGAD first species example — bass voice against D major melody:**
```
Melody:  D4   E4   F#4  G4   A4   G4   F#4  E4   D4
Bass:    D2   A2   D3   B?   A2   G?   D3   A2   D2
         P8   P5   P5   ↑?   P8   ↑?   P5   P5   P8
```
The solver must find bass notes that form consonant intervals AND are fingerable. Open strings (D2, A2, D3) are checked first.

**Guitar physics constraint:** In 1st species, the bass voice must be sustainable for the full melody note duration. Open strings are ideal because they ring without left-hand involvement.

### 9.2 Second Species — Two Notes Against One

**Rule set:**
- The bass (or counter-voice) has two notes for every melody note
- The first note of each pair must be consonant with the melody
- The second note may be dissonant IF it is a passing tone (stepwise to next consonance)
- No parallel 5ths/8ths on strong beats (downbeats)
- Unisons only on the weak beat

**Fingerstyle realization:**
- Strong beat: thumb plays consonant bass note (often open string)
- Weak beat: thumb plays passing tone (may be one step away from next consonance)
- This produces the alternating-bass texture — the fundamental fingerstyle sound

### 9.3 Fourth Species — Suspensions

**Rule set:**
- The counter-voice is syncopated: tied from the weak beat into the strong beat
- The tied note creates a dissonance ON the strong beat (this is the suspension)
- The suspension must resolve DOWN by step (almost always) on the following weak beat

**The three parts of a suspension:**
1. **Preparation** — the note is introduced as a consonance on the weak beat
2. **Suspension** — it's held (tied) over the bar line to the strong beat, where it becomes dissonant
3. **Resolution** — it resolves down by step to a consonance

**Most common suspensions in fingerstyle (guitar-idiomatic):**
- **4-3**: The suspended note is the 4th of the chord; resolves to the 3rd. Very warm — the classic "sus4 chord resolving" sound. In DADGAD, the open G3 (string 3) can be held as a 4th against an active D chord, resolving to F#3 at fret 4.
- **7-6**: The 7th resolves to the 6th. More modern sound; used in jazz-influenced arrangements.
- **2-3 bass suspension**: The bass holds a note while the chord changes above it; it becomes the 2nd of the new chord and resolves down to the root. Very powerful for cadential arrivals.

**Guitar realization challenge:** A suspension requires holding the tied note under left-hand pressure for its full duration while other voices move. This means the fretting finger for the suspension cannot participate in any other note during the tie. The solver must check finger availability before placing a suspension.

### 9.4 Free Counterpoint (5th Species) — The Target

Real music is free counterpoint: it borrows rhythmic values and non-chord tone types from all five species, choosing the most appropriate for each musical moment.

**Guidelines for when to use each element:**

| Moment | Preferred NCT type | Reason |
|--------|-------------------|--------|
| Mid-phrase stepwise approach to Waypoint | Passing tone | Smooth; expected; creates linear direction |
| Phrase peak, repeated note, ornament | Neighbor tone | Creates local variation without changing direction |
| Pre-cadential strong beat | Suspension (4-3 or 7-6) | Maximum tension before arrival; most expressive |
| Weak beat before chord arrival | Anticipation | Forward momentum; "Depart" arrival behavior |
| Dramatic leap in melody | Escape tone in counter-voice | Contrary motion away from the leap; compensates |
| Sustained melody note over long duration | Pedal point in bass | "Changing Backdrop" effect; DADGAD open strings ideal |

---

## 10. The AI Collaborator Vocabulary

### 10.1 Natural Language → Engine Instructions

The AI collaborator receives the current arrangement (as NoteEvent[] JSON per voice) plus the user's instruction. It must interpret the instruction in AMF + classical vocabulary, explain what it's doing, and output modified NoteEvent[] data.

| User Says | AMF Reading | Classical Reading | What Changes | Explanation Template |
|-----------|------------|-------------------|-------------|---------------------|
| "More dissonance" | Increase Tension and Friction emotional coordinates | Add non-chord tones (passing tones, neighbor tones, appoggiaturas) | Increase inner voice non-chord tone density; allow diatonic passing tones on weak beats | "Adding passing tones in the [inner/bass] voice — notes that don't belong to the [chord] chord but move stepwise between consonances. This creates momentary tension that pulls toward the next beat." |
| "More movement" | Increase Path density; add Bridges | Move from 1st species to 2nd or 3rd species | Add inter-beat notes in bass or inner voice (alternating bass, passing tones) | "Switching the bass from one note per beat to two — the alternating bass pattern. The extra note is a passing tone connecting the structural bass notes." |
| "Less busy / simpler" | Reduce Segment density; fewer Bridges | Move toward 1st species; remove NCTs | Strip inner voice passing tones; reduce to structural notes only | "Removing the ornamental passing notes and reducing to the structural skeleton — one note per beat in each voice." |
| "Add tension before the resolution" | Resolving anchor; Tension → Grounded coordinate arc | Add suspension (4-3 or 7-6) at cadence | Create tied note in bass or inner voice one beat before cadence point | "Adding a 4-3 suspension: the [voice] holds its note across the bar line into the downbeat, creating a dissonance that resolves down by step to the 3rd of the chord. Classic tension-release moment." |
| "More drone" | Extend Changing Backdrop | Pedal point on tonic | Lock bass voice to open string for multiple measures | "Locking the bass to the open D string as a pedal point — it holds steady while the harmony moves above it. The changing chords create and release tension against the constant bass." |
| "More Celtic / modal" | Shift Solar System to D Mixolydian or D Dorian | Flatten 7th (C♮ or Bb); increase open-string usage | Add ♭7 as passing tone in inner voice; maximize open-string notes | "Shifting toward [D Mixolydian / D Dorian] flavor — adding the C♮ as a passing tone gives that modal color that's central to Celtic and folk music. The open strings in DADGAD reinforce this naturally." |
| "More chromatic" | Increase Color anchor usage | Add chromatic neighbor and passing tones | Allow accidentals (♭3, ♯4, ♭6, etc.) in inner voice passing motion | "Adding chromatic passing tones — notes outside the key that move by half-step to a chord tone. These create a jazzy or sophisticated color without disturbing the overall tonal center." |
| "Smoother" | Prioritize Shared anchors; minimize leaps | Maximize stepwise contrary motion | Reduce leap intervals in all voices; replace with stepwise substitutes where possible | "Smoothing the voice leading: replacing leaps with stepwise motion and adding common tones between chords. Every voice now moves by the smallest possible interval." |
| "More dramatic" | Increase Anticipatory anchors; wider Orbit range | Allow larger leaps; add appoggiaturas | Introduce 6th and octave leaps in inner voice; add appoggiaturas at phrase peaks | "Adding some wider interval leaps and appoggiaturas (notes that leap to a dissonance before stepping to the chord tone). These create moments of surprise and urgency." |
| "Add a countermelody" | Add a new Path in inner voice | Add fully independent 2nd species line | Generate new NoteEvent[] for inner voice as an independent melodic line | "Creating a countermelody — a separate melodic line in the [inner / tenor] voice that moves independently from the main melody. It follows 1st-species consonance rules against the melody and adds its own melodic shape." |
| "Bach-like / baroque" | Maximum Accuracy-stage rigor; no Bridges outside rules | Enforce all strict counterpoint rules; no parallel 5ths/8ths | Recalculate all voices with full rule enforcement; remove any rule violations | "Applying strict counterpoint — no parallel 5ths or octaves, all dissonances prepared and resolved, voices moving primarily by step with contrary motion preferred. Very lean, linear texture." |
| "Push the resolution later" | Delay Confirm arrival behavior | Extend suspension duration; add deceptive cadence | Move cadential suspension forward one measure; insert deceptive V-vi before V-I | "Delaying the resolution — inserting a deceptive cadence (the chord resolves to the vi chord instead of I) before the final arrival. Creates a sense of reaching before landing." |
| "More open-string character" | Galaxy-specific; maximize DADGAD natural resonance | Maximize use of open strings as structural tones | Recalculate bass and inner voice to prefer open-string pitches wherever consonant | "Rebalancing toward open strings — every place where a D, A, or G can serve as a consonant bass or inner voice note is switched to the open string version. More ring, more sustain, less left-hand work." |

### 10.2 The Explanation Format

Every AI collaborator response should follow this structure:

1. **What I'm changing:** "[Voice name] in [measures X–Y]"
2. **The classical name for the technique:** "This is a [4-3 suspension / passing tone / pedal point / ...]"
3. **The AMF framing:** "In AMF terms, this is a [Resolving anchor / Changing Backdrop / ...]"
4. **The emotional effect:** "This creates [tension before resolution / forward momentum / modal color / ...]"
5. **What to listen for:** "Listen for [the B♮ in the bass on beat 1 of bar 3 resolving down to A♯]"

This structure ensures the user learns while they listen — connecting the instruction they gave to its classical and AMF names, and directing their attention to the specific sonic result.

### 10.3 Microphone Input Processing

Voice input from the user is transcribed to text and treated identically to typed input. The AI collaborator should:
- Confirm what it heard ("You said: 'add more tension before the chorus'")
- Identify the technique
- Make the edit
- Explain in the format above

---

## 11. Decision Trees

### 11.1 Choosing Arrangement Mode

```
Start: melody + chords given

Is the texture goal chordal/harmonic?
├── YES → Chord-First mode
│   ├── Texture: sparse/clear → simple (melody + bass)
│   ├── Texture: resonant/droning → drone (+ open strings)
│   ├── Texture: three-voice → harmonic (+ inner chord tones)
│   └── Texture: full/smooth → voice-led (all 4 voices, smooth transitions)
└── NO → Counterpoint-First mode
    ├── Level: austere/classical → first-species (1:1 note-against-note)
    ├── Level: flowing/folk → second-species (alternating bass)
    ├── Level: ornamental/harp → third-species (arpeggiated)
    ├── Level: tension/drama → fourth-species (suspensions)
    ├── Level: expressive/idiomatic → free counterpoint (5th species)
    └── Level: layered → three-voice or four-voice (multiple species combined)
```

### 11.2 Choosing Counter-Voice Notes (1st Species)

```
For each melody note M at beat B, find bass note C:

1. Get active chord at beat B
2. Get all chord tones within bass register (MIDI 28–57)
3. Filter to consonant intervals with M: {P1, m3, M3, P5, m6, M6, P8}
4. Check DADGAD open strings first (D2, A2, D3) — prefer open
5. If open string is consonant with M → use it
6. Else: find fretted note that is:
   a. Consonant with M
   b. In contrary or oblique motion from previous bass note
   c. Not creating parallel 5ths or 8ths with previous interval pair
   d. Reachable from previous fret position within stretch limit
7. If multiple candidates: prefer stepwise motion, then contrary motion, then nearest open string
8. If no candidate satisfies all rules: use closest passing tone to next beat's consonance
```

### 11.3 Suspension Placement Decision

```
At each cadential point (phrase ending, structural Waypoint):

1. Is the metric position strong (beat 1 or 3 in 4/4)?
   NO → no suspension; use consonance
   YES → consider suspension

2. Is the preceding beat available for preparation?
   NO → skip suspension at this point
   YES → identify the suspension candidate:
         Current bass note B → target consonance C at next beat
         The suspension = B held across the bar line
         Check: interval(B, melody) at strong beat = dissonant?
         YES → this creates a valid suspension
         NO → B would be consonant at the strong beat = not a suspension; skip

3. Is the suspension fingerable?
   The fretting finger for B must be free to hold for the full duration
   And another finger must be available for the resolution pitch C
   YES → place suspension; tie note B across the bar line; resolve to C on weak beat
   NO → cannot place; fall back to passing tone at the cadence instead
```

---

## 12. Prominent Players as Style Templates

These style profiles translate real artistic approaches into engine parameters. They are not literal algorithmic imitations but directional presets that bias the engine's decisions.

### 12.1 Pierre Bensusan (DADGAD)

**Character:** Dense, modal, rich inner voices. Mixolydian and Dorian inflections. Complex chord shapes sustained as drones while melody floats above.

**Engine biases:**
- Mode: free counterpoint (5th species) with strong inner-voice activity
- Preferred intervals: 3rds and 6ths between inner voice and melody (imperfect consonances)
- NCT density: high (many passing and neighbor tones in inner voice)
- Modal flavor: D Mixolydian (add ♭7=C♮ as color tone in inner voice)
- Open-string preference: maximum (all available open strings used as inner drones)
- Parallel 3rds in inner voices: frequent

### 12.2 Martin Simpson (DADGAD)

**Character:** Folk/blues synthesis. Call-and-response between bass thumb and melody. Strong rhythmic feel, even in slow pieces. Clear separation between bass voice and melody.

**Engine biases:**
- Mode: 2nd species bass (alternating, walking bass) against 1st species melody anchors
- Bass: melodic, stepwise, often contrary to melody
- Inner voice: sparse; mostly absent or doubling bass
- Emotional coordinates: Confirm and Resolve arrivals (strong cadential feeling)
- Rhythm emphasis: beat 1 and 3 strongly articulated in bass

### 12.3 El McMeen (DADGAD — Celtic tradition)

**Character:** Pure melody with open-string drones. Minimal inner voice. Pentatonic and modal scales. Sympathetic resonance from un-fretted strings.

**Engine biases:**
- Mode: 1st species melody + pedal-point bass (Changing Backdrop)
- Bass: primarily open-string D and A drones (pedal point)
- Inner voice: absent or very sparse (drone strings only)
- NCT density: very low (primarily chord tones)
- Open-string preference: maximum

### 12.4 Chet Atkins / Tommy Emmanuel (Standard Tuning — Travis picking tradition)

**Character:** Alternating bass thumb creates rhythmic stability; fingers carry melody and inner harmony independently. Very strong rhythmic feel; bass and melody operate as completely separate streams.

**Engine biases:**
- Mode: 2nd species bass (strict alternating) + 3rd species inner voice + melody
- Bass: alternates between root (string 6/5) and fifth (string 4) of each chord
- Thumb independence: bass voice completely metrically independent from melody
- Inner voice: fills on off-beats between bass and melody
- Emotional coordinates: mostly Confirm and Float (groove-oriented, not highly cadential)

### 12.5 Andy McKee (Multiple tunings, percussion-forward)

**Character:** Percussive body tapping integrated with counterpoint. Often uses high-register melody against lower ostinato bass. Strong use of harmonics and tapping. Arrangements often feel orchestral.

**Engine biases:**
- Mode: free counterpoint with rhythmic ostinato bass
- Bass: often a repeated figure (ostinato) rather than changing voice-led line
- Melody: high register; frequent harmonics
- Inner voice: absent (texture defined by bass ostinato + melody dyad)
- NCT density: medium (passing tones in melody; bass primarily chord tones)

### 12.6 Lenny Breau (Standard Tuning — Jazz/Chet hybrid)

**Character:** Jazz harmony with fingerstyle execution. Chord-melody with independent bass. Very sophisticated non-chord tones; strong chromatic vocabulary. Often plays all four voices simultaneously.

**Engine biases:**
- Mode: voice-led (chord-first) with high color-anchor density
- Preferred NCTs: chromatic approach notes, appoggiaturas, escape tones
- Harmonic language: 7ths, 9ths, 13ths as structural chord tones (not just color)
- Bass: strong independent line, not just root/5th
- Orbit preference: Color tones elevated to structural status

---

*Document version: 1.0 — July 2026*  
*To be updated as the arrangement engine expands through counterpoint modes.*  
*Related files: `lib/arranger/`, `docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md`, `docs/MUSICAL_UNIVERSE_ANALYSIS.md`*
