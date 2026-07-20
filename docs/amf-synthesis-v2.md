---
title: AMF Unified Musical Universe — Synthesis Architecture v2.0
date: 2026-07-19
status: living document
ingredients: Musical Universe, Harmonic Processions (McKay), Species Counterpoint
---

# AMF Unified Musical Universe — Synthesis Architecture v2.0

**Document Status:** Foundational Design Document — Living Architecture  
**Audience:** Developer-educators building the AMF application  
**Date:** 2026-07-09  
**Version:** 2.0 (supersedes Musical Universe Analysis v1.0)

---

## Table of Contents

1. [Executive Vision](#1-executive-vision)
2. [The Three Foundations and How They Relate](#2-the-three-foundations-and-how-they-relate)
3. [Musical Universe Vocabulary](#3-musical-universe-vocabulary)
4. [The Complete Layer Architecture](#4-the-complete-layer-architecture)
5. [The Six-Layer Convergence Model](#5-the-six-layer-convergence-model)
6. [Revised 12-Phase Roadmap](#6-revised-12-phase-roadmap)
7. [The Counterpoint Integration Map](#7-the-counterpoint-integration-map)
8. [The Four Chambers × Counterpoint Matrix](#8-the-four-chambers--counterpoint-matrix)
9. [DADGAD as the Primary Counterpoint Instrument](#9-dadgad-as-the-primary-counterpoint-instrument)
   - [9.1 The DADGAD Pair System — Scale Navigation Framework](#91-the-dadgad-pair-system--scale-navigation-framework)
10. [HP Integration Timeline](#10-hp-integration-timeline)
11. [The Practice Protocol](#11-the-practice-protocol)
12. [Fluency Redefined](#12-fluency-redefined)
13. [Non-Negotiable Design Principles (Revised)](#13-non-negotiable-design-principles-revised)
14. [Open Questions and Future Directions](#14-open-questions-and-future-directions)

---

## 1. Executive Vision

The AMF system exists to answer one question: how does a guitarist become someone for whom music is a first language rather than a translated one? The answer it proposes is architectural — not a course of study but a perceptual operating environment. Plogger trains the ear to perceive musical relationships directly, without the mediation of calculation. The Musical Universe gives those relationships a navigable spatial structure. Harmonic Processions provides the underlying physics — the reason some harmonic colors feel closer or farther apart is not convention but acoustics. Species counterpoint, woven through all of this, is not a technique to be learned but a temporal laboratory in which all three foundations are simultaneously active.

The system's deepest design insight is that the goal is its own disappearance. Every element — every term, every map, every gate — is scaffolding that should eventually become invisible. A Phase 12 graduate is not someone who has memorized the framework; they are someone who perceives, imagines, and realizes music spontaneously because the framework has been dissolved into reflex. This is the difference between a musician who plays by ear and a musician who has systematically trained their ear to hear what they previously could only calculate.

---

## 2. The Three Foundations and How They Relate

The system rests on three independent theoretical traditions that the AMF synthesis integrates for the first time in a single learner's practice.

**Plogger (Acoustic/Perceptual Foundation)** addresses the problem of how the human ear actually learns musical relationships. Its core primitive is the di-chord — the two-pitch relationship perceived simultaneously along three axes: interference pulsation (how much beating/instability the interval produces), fundamental/octave factor (directional reference toward or away from root), and harmonicity (spectral fusion, derived from just intonation ratios). Plogger is not theory imposed on the ear; it is a description of how the auditory system already works, systematized into trainable stages.

**Musical Universe (Navigational Foundation)** addresses the problem of spatial orientation: given that the ear can perceive relationships, how does a player navigate among them? The Universe/Galaxy/Solar System/Map vocabulary provides a coordinate system. Critically, Maps do not add information to the landscape — they reveal dimensions of the same landscape that are already there. This is not metaphor; it is an epistemological commitment. The Harmony Map doesn't create harmonic structure; it makes pre-existing harmonic structure visible to a perceiving ear.

**Harmonic Processions (Topological Foundation)** addresses the problem of global structure: how are all possible harmonic colors related to each other, and what is the underlying geometry? McKay's system, grounded in just intonation ratios and the Circle of Fifths as organizing axis, provides a principled answer. The consonance-to-dissonance gradient, Span, Sharp/Flat projection, Mirror Sets — these are not aesthetic judgments but structural descriptions derived from the physics of vibrating strings. This is the foundation beneath the Musical Universe, explaining why the navigational landscape has the shape it does.

**Counterpoint (Practice Protocol, not a fourth layer)** is the temporal practice vehicle that simultaneously activates all three foundations. In its first species form, it is Plogger applied in compositional time — holding two pitches and classifying their relationship. In its later species, it becomes active navigation through the Musical Universe against a fixed harmonic ground. In its florid form, it is the Synthesizer's antechamber. Counterpoint does not add to the system; it provides the laboratory conditions in which the system's components are exercised together under disciplined constraints. It enters unnamed (as Plogger exercises) and exits unnamed (as improvisation).

The structural relationship: Plogger provides the perceptual grammar. HP provides the physics that explains why that grammar has the shape it does. The Musical Universe provides the navigational vocabulary for moving through the space that grammar opens. Counterpoint is the practice in which the grammar is exercised, the physics is felt, and the navigation is performed under conditions that isolate and train each variable systematically.

---

## 3. Musical Universe Vocabulary

The Musical Universe is built from a precise set of spatial and relational primitives. Every term below refers to a distinct, real thing — not a metaphor layered on top of conventional theory. This is the coordinate system the rest of the document assumes. Read these once; they will appear without re-introduction throughout.

**Universe** — The totality of all musical possibility. Every pitch, interval, rhythm, texture, and expressive relationship that has ever existed or could exist is within the Universe. The Universe is constant and complete; the musician explores a small region of it at any given time. The term exists to set the correct sense of scale: not "all Western music" but genuinely all of music. The system acknowledges it is operating in one corner of something vast.

**Galaxy** — The instrument- and tuning-specific physical world in which the Universe is accessed. Standard tuning (E-A-D-G-B-E) is one Galaxy; DADGAD (D-A-D-G-A-D) is another. The same abstract musical relationship — the same Constellation identity, the same Path recipe, the same Orbit — inhabits each Galaxy differently: different fingerings, different string positions, different open-string affordances, different physical resonances. Two Galaxies are co-primary in AMF from Phase 0: Standard and DADGAD. Neither is the original; neither is the transfer.

**Solar System** — The tonal and modal environment currently active within a Galaxy. In the Standard tuning Galaxy, D Dorian is a Solar System; G major is another. The Solar System determines which notes feel like home (tonic), which feel like passing colors, and which feel like tension or departure. A Solar System is entered by establishing a tonic center; it can shift (full modulation) or be temporarily extended (via Bridge). The Solar System is local orientation — where you are right now within the Galaxy.

**Map** — A selective perceptual overlay that makes one dimension of the Solar System visible at a time. Maps do not add musical content — they reveal different aspects of the same landscape. Switching Maps is like switching between satellite, terrain, and transit views of the same geography: the territory doesn't change, only what is highlighted. Seven Maps are currently defined:

| Map | What it highlights | Primary use |
|---|---|---|
| **Scale Map** | All available notes in the current Solar System | Knowing what exists |
| **Pentatonic Map** | Five-note high-consonance subset; minimum wrong-note risk | Melodic fluency and safe exploration |
| **Harmony Map** | Available Constellation options from the current position | Chord choice and harmonic navigation |
| **Voice-Leading Map** | Smooth, minimal-motion connections between Constellations | Efficient harmonic movement |
| **Bridge Map** | Temporary harmonic waypoints outside the current Solar System | Color and tension without full modulation |
| **Emotional Map** | Expressive consequence of choices already present in other Maps | Evaluates; does not generate options |
| **Rhythm Map** | Pulse, subdivision, groove, phrase-landing points, rhythmic shape | Timing and expressive placement |

Note: the Emotional Map is not at the same level as the others. It evaluates choices made within the other Maps — it does not propose new musical options. This distinction is load-bearing for the data model.

**Segment** — The smallest reusable movement primitive. A Segment is a short melodic gesture: a handful of notes with a characteristic shape, direction, and feel. Segments are the syllables of melodic speech — small enough to be memorized as units, flexible enough to be combined into infinite phrases. Three types: **Leading** (directed toward a specific target note), **Moving** (traversing a harmonic area in a characteristic way), **Passing** (filling intervallic space between structural notes). The same Segment has different fingering realizations in Standard and DADGAD but the same melodic identity in both.

**Path** — A planned route from the current position to a Destination, composed of Segments in sequence. A Path has directionality and expressive shape; it is how musical sentences are structured. The crucial discipline: choose the Destination before choosing the Path, and choose the Path before choosing the Segment. This decision hierarchy — coarse to fine, intention before vocabulary — is the core navigation habit the system builds.

**Destination** — The intended arrival point: the specific note or harmonic position the musician is moving toward. Naming the Destination before moving is the most foundational habit in the system. It reverses the default beginner pattern ("play notes and see where I land") in favor of "know where I'm going, then decide how to get there." Destinations are not always resolutions; a Destination can be a tension point chosen on purpose.

**Waypoint** — A perceptually significant intermediate point along a Path that is not the final Destination. Waypoints give a Path its shape and harmonic interest — they are the internal events that make the journey feel purposeful rather than arbitrary. A Bridge note encountered along a Path is always a Waypoint.

**Orbit** — The harmonic role a note plays within a given Constellation. Every Constellation has three Orbits: **Root** (Orbit 1), **Third** (Orbit 3), and **Fifth** (Orbit 5). The same pitch can be Root of one Constellation, Third of another, and Fifth of a third — the Orbit is always relative to the Constellation in play, not absolute. Orbit recognition means immediately knowing which harmonic role any given note is currently playing, and therefore which Constellations are reachable from that note without a large physical move. This is the prerequisite for all advanced harmonic navigation.

**Constellation** — The playable, physical realization of a harmonic identity in a specific Galaxy. A Constellation is not "G major" in the abstract — it is this G major voicing, on these strings, in Standard tuning (or DADGAD). The same harmonic identity has multiple Constellation realizations per Galaxy, varying by voicing type, register, and string set. The Constellation database is the application's core data structure. Critical design requirement: HP metadata (Span, family, mirror relationships) must be stored in the Constellation database from Phase 0, even though learners don't encounter HP vocabulary until Phase 11.

Three voicing categories apply across all Constellation types:

| Type | Spacing | Character | Entry phase |
|---|---|---|---|
| **Closed** | All notes within one octave | Dense, focused, unambiguous — each note locks tight against the others | Phase 2 (primary) |
| **Open / Spread** | Notes span more than one octave | Spacious, resonant, transparent — the harmonic color rings out rather than compresses | Phase 9 |
| **Drop 2** | Second-from-top note dropped one octave | Balanced, idiomatic to guitar — the most common "guitar chord" shape | Phase 9 |

Open triads deserve special emphasis. They are not an advanced voicing added late as an ornament — they are a distinct perceptual class with a fundamentally different sound. A closed G major triad sounds like a chord block; an open G major spread across strings 6, 3, and 1 sounds like an environment. On DADGAD, open triads arise naturally from the tuning's string relationships and are often the default rather than the exception: the open strings themselves form spread voicings. A student who learns only closed triads is learning half the Constellation vocabulary.

**Anchor** — A note that is deliberately preserved and emphasized across a harmonic change. The Anchor is the note that doesn't move — or moves last — as the harmony shifts beneath it. Anchors create melodic continuity; they are the threads that stitch successive Constellations into a phrase rather than a sequence of disconnected harmonic events. Three anchor behaviors: **shared** (the anchor note is present in both Constellations), **resolving** (the anchor moves by step at the change, connecting the two), **color** (the anchor remains as an added tension against the new Constellation, creating a temporary dissonance that flavors the arrival).

**Bridge** — A temporary harmonic waypoint that provides access to a harmonic color not natively available in the current Solar System without committing to a full modulation. The Solar System is not left — it is stretched. A Bridge note is a dissonance entered by step, sustained briefly as a color or tension, and left by step. Structurally, this is identical to a species counterpoint suspension. Bridges are how the system handles modal color, borrowed chords, and passing harmonic references — the moment of "elsewhere" that resolves back to "here." In HP terms, Bridge candidates are filtered by family adjacency: the most natural Bridges are one Span step away from the current Solar System's home set.

**Emotional Coordinate** — The expressive state produced by the combination of tonal identity × Constellation support × rhythmic placement × register × context. Emotional Coordinates are not fixed to specific intervals or chords; they are perceptual tendencies under specific conditions. Four arrival behaviors define the space: **Confirm** (the arrival feels stable and expected — the listener's prediction was correct), **Float** (the arrival is suspended — neither resolved nor tense, hovering), **Resolve** (the arrival releases accumulated tension — the listener exhales), **Depart** (the arrival introduces new directional pull — unsettles the established expectation). The Emotional Map evaluates which coordinate applies given current conditions; it does not assign coordinates to chords in isolation.

---

## 4. The Complete Layer Architecture

### Layer 1 — Plogger (Perceptual Operating System)

**Trains:** Direct hearing, audiation, multi-dimensional interval perception, tonic-relative tracking, switching among labeling systems.  
**Reveals:** The raw acoustic relationships underlying all subsequent structure.  
**Relationship to other layers:** Plogger is the precondition for everything else. No navigation is possible without perception. The Musical Universe provides the landscape; Plogger trains the faculty that perceives it. HP explains the physics that gives Plogger its perceptual categories their validity — the di-chord distinction between consonance and dissonance is not arbitrary but grounded in the harmonicity axis, which is grounded in overtone-series relationships, which HP formalizes.  
**Risk:** Becoming a theory catalog disguised as ear training. Guard against this by keeping the Plogger interface experiential: play, sing, classify. No naming until after hearing.

### Layer 2 — Musical Universe (Navigation Layer)

**Trains:** Spatial orientation, option awareness, coarse-to-fine decision making, route planning.  
**Reveals:** The organized landscape of musical possibility as navigable geography.  
**Relationship to other layers:** The Universe is meaningless without Plogger (nothing to perceive it) and incomplete without HP (no explanation for its topological shape). Maps are the interface between the perceptual faculty Plogger builds and the spatial structure the Universe provides. The Graph model (Constellations as nodes, Paths as edge sequences) is the computational expression of the navigational metaphor — and this graph structure is directly derivable from HP's Span and adjacency relationships.  
**Note on Maps:** Maps are not separate layers. They are perceptual modes applied to the same landscape — like switching between satellite, terrain, and transit views of the same geography. The critical insight is that the Emotional Map is not at the same level as the Scale Map or Harmony Map; it is an evaluative overlay on the consequence of choices made within the other Maps. This distinction must be preserved in the data model.

### Layer 3 — Emotional Map (Expressive Consequence Overlay)

**Trains:** Awareness of expressive consequence, intentional arrival behavior selection, emotional trajectory planning.  
**Reveals:** The felt meaning of navigational choices — what this Path through this Constellation with this Anchor at this rhythmic position does to a listener.  
**Relationship to other layers:** The Emotional Map evaluates; it does not generate. It takes inputs from the Musical Universe (current Constellation, Anchor status, Path choice), the Rhythm Map (placement and duration), and context (register, genre, listener expectation) and returns an Emotional Coordinate. HP is the upstream supplier of why certain harmonic positions carry certain expressive tendencies — the directional pull of a Sharp-Projecting set toward brightness or a Flat-Projecting set toward weight is not culturally arbitrary; it is grounded in the physics of overtone relationships.  
**Hard constraint:** The Emotional Map must never encode rigid emotion laws. Labels (stable, floating, tense, bright, dark, bitter) are perceptual tendencies under specific contextual conditions, not universal constants.

### Layer 4 — Harmonic Processions (Global Harmonic Topology)

**Trains:** Recognition of harmonic family membership, directional pull, Span awareness, global orientation in harmonic space.  
**Reveals:** The underlying geometry of all possible harmonic colors and how they are structurally related.  
**Relationship to other layers:** HP is the physics beneath the Musical Universe — it explains why the navigational landscape has the shape it does. Span explains why moving from a diatonic triad to a quartal chord feels like a larger step than moving between two diatonic triads. Mirror Sets explain why certain modulations feel like a flip rather than a walk. Sharp/Flat projection explains the directional quality of harmonic movement.  
**Deployment rule:** HP metadata powers the system from Phase 0 (as the invisible acoustic physics of Plogger's di-chord categories) but surfaces as named vocabulary only at Phase 11. The beginner never needs to calculate Span; they need to feel the difference between compact and expansive harmonic areas. HP provides the computational substrate for that difference to be rendered correctly in the application.

### Layer 5 — Instrument Embodiment (Instrument Galaxy)

**Trains:** Tuning-specific physical geography, motor programs, ergonomic Bridge opportunities, open-string drone exploitation.  
**Reveals:** How the same abstract musical truth inhabits different physical bodies differently.  
**Relationship to other layers:** The Galaxy is where abstract relationships become physical — where an Orbit becomes a fingering, where a Segment becomes a hand shape, where a Bridge becomes a fret position. The critical architectural decision is to separate invariants (abstract Constellation identity, abstract Path recipe, abstract Orbit membership) from Galaxy-specific data (string/fret coordinates, fingerings, open-string availability). This separation is load-bearing: it is what allows Standard tuning and DADGAD to share the same theoretical structure while having genuinely different physical geographies.  
**DADGAD status upgrade:** DADGAD is not a specialized variant or late-stage transfer; it is a co-primary practice track from Phase 0. Its open-string drone structure makes it structurally ideal for counterpoint work (see Section 8).

### Layer 6 — The Synthesizer (Integration and Disappearance)

**Trains:** Nothing — the Synthesizer is where training stops and music begins.  
**Reveals:** Whether the framework has actually been dissolved into reflex, or whether it is still being consciously accessed.  
**Relationship to other layers:** The Synthesizer is not a layer above the others; it is what remains when the layers dissolve into each other. The fluency gate for Phase 12 is not "can the student use the framework" but "can the student make music without the framework being perceptible in the result." This is the framework disappearance criterion — the system's ultimate test.

---

## 5. The Six-Layer Convergence Model

The six layers do not stack linearly; they converge. The correct mental model is a funnel with a twist:

```
[HP Physics] ─────────────────────────────────────────────────┐
     ↓ (explains why)                                          │
[Plogger Perception] ←──── [Instrument Galaxy] ────────────── ┤
     ↓ (what to perceive)         ↓ (where to find it)        │
[Musical Universe Navigation]                                   ┤ → [THE SYNTHESIZER]
     ↓ (how to move through it)                                │
[Emotional Map Evaluation]                                     │
     ↓ (what choosing means)                                   │
[Counterpoint Practice Protocol] ─── activates all above ─────┘
```

The convergence insight: **HP physics is the foundation; Plogger is the faculty trained to perceive it; the Musical Universe is the landscape built from it; the Emotional Map evaluates consequences within it; the Instrument Galaxy is where it becomes physical; and Counterpoint is the temporal laboratory that trains all five simultaneously under controlled conditions.**

The Synthesizer is not above this structure — it is what the structure becomes when it is internalized. It is the collapse of the funnel from five separate streams into one undifferentiated musical behavior. The "framework disappears" criterion means the funnel collapses to a single point: perception → expression, with everything in between running as invisible background process.

A crucial design implication: **The application should track which layer is the current bottleneck for the learner**, not just which phase they are in. A learner can be at Phase 6 by phase progression but have a Plogger bottleneck (Layer 1) that makes Phase 6 work meaningless. The fluency gates exist precisely to catch this.

---

## 6. Revised 12-Phase Roadmap

Phases are not time-boxes. They are fluency states. A learner enters a phase when prerequisites are demonstrated; they exit when fluency gates are met.

| Phase | Primary Goal | Counterpoint Status | HP Status | DADGAD vs. Standard | Student Can DO |
|---|---|---|---|---|---|
| 0 | Perceptual readiness | Unnamed: Plogger di-chord classification exercises | Hidden: acoustic physics shapes Plogger categories | Both introduced simultaneously as parallel universes | Hear and classify two simultaneous pitches as restful/active; sing an interval before playing it; sustain a pulse |
| 1 | Segment fluency | Unnamed: consonant melodic line exercises (cantus-like, unnamed) | Hidden: Span explains why Segments feel compact or expansive | Standard: scalar Segments; DADGAD: open-string resonant Segments | Hear, sing, see, and play core scalar/pentatonic Segment types; identify entry points; distinguish L/M/P types by ear |
| 2 | Closed triad Constellations | Unnamed: sustain a Constellation and find consonant notes against it (first species, unnamed) | Hidden: HP consonance hierarchy explains Constellation stability | Both: master major/minor triad shapes on all adjacent string sets independently | Pick up any triad on any string set in both tunings without calculation; name the Constellation by its tonal function |
| 3 | Orbit recognition | Unnamed: sustained Constellation + moving voice (early second species motion, unnamed) | Hidden: Root/Third/Fifth Orbits reflect HP's internal structure of a set | Both: from any anchor note, grab correct Constellation | From any landed note, immediately perceive which Orbits are available without calculation; retrieve nearby Constellations |
| 4 | Direct voice leading | **Named:** Introduce counterpoint explicitly; cantus firmus; first species exercises | Hidden: voice-leading cost graph is HP Span distance in disguise | Standard: first species between string pairs; DADGAD: melody against open string cantus | Move between diatonic Constellations using minimal motion; hear each voice as independent; identify contrary/parallel/oblique motion |
| 5 | Emotional overlay | Species 2: passing motion against sustained voice = Paths against Anchors | Hidden: Sharp/Flat projection explains directional emotional quality | Both: 2nd species with emotional labeling of approach notes | Classify any note's emotional coordinate (stable/floating/tense); predict how arrival will feel before playing it |
| 6 | Anchor strategy | Species 2-3: sustained anchor voice with active melodic voice | Hidden: Anchor continuity = HP common-tone relationships | Both: anchor selection across chord changes | Choose shared, resolving, and color anchors intentionally; sustain an anchor note across a harmonic change |
| 7 | Bridge Map | **Species 3-4:** Bridge note = dissonance approached and left stepwise (classic suspension setup) | Semi-visible: Bridge candidates filtered by HP family adjacency (not yet named) | Standard: string-crossing Bridges; DADGAD: open-string Bridge exploitation | Generate and compare temporary Constellation options; approach Bridge dissonances by step; resolve by step |
| 8 | Path/Segment expressive control | Species 4: suspension = unresolved Destination with delay | Hidden: Span difference between Path variants explains their expressive weight | Both converge: same Path logic in different physical geography | Choose Path structure before Segment variant before articulation; execute delayed resolutions intentionally |
| 9 | Open/spread Constellation expansion | Species 5 (florid): all motion types freely mixed | Semi-visible: spread voicings = larger Span within Constellation | DADGAD advantage: open strings enable spread voicings that are physically impossible in Standard; Standard: Drop 2 voicings across non-adjacent string sets | For every closed triad already fluent, find its open/spread and Drop 2 equivalents; hear the difference between closed and open versions of the same harmony; play a phrase using only open triads; play the same phrase using only closed triads; identify which sounds more appropriate to a given musical context |
| 10 | Seventh chords | Florid: seventh as dissonance resolved (classic suspension to seventh resolution) | Semi-visible: seventh chord = one additional step outward in HP Span | Both: parallel seventh chord development | Extend Orbits to include Seventh; approach and resolve seventh tones with awareness of their dissonance level |
| 11 | Advanced topology | Florid + named counterpoint principles | **Visible:** HP vocabulary introduced — Span, Sharp/Flat projection, Mirror Sets, Modulation | Reconverge: modal DADGAD and Standard share HP vocabulary | Describe harmonic movement in HP terms; plan modulations using Mirror Set pivot logic; navigate symmetrical sets |
| 12 | Synthesizer | Counterpoint disappears into music | HP disappears into perception | Standard and DADGAD as equals with distinct resonant characters | Improvise, arrange, and compose in real musical contexts; framework not perceptible in output |

---

## 7. The Counterpoint Integration Map

| Species | AMF Phase | Standard Guitar Exercise | DADGAD Exercise | Plogger Connection |
|---|---|---|---|---|
| Pre-species (named/unnamed) | 0-1 | Hear two notes; classify as restful/active; sing before playing | Same, using open strings as one of the voices | Di-chord classification — this IS first species ear training without the label |
| First species: note-against-note | 2-3 (unnamed), 4 (named) | Sustain a triad (Constellation); find single consonant notes against each chord tone on adjacent string | Sustained open D/A/G string as cantus; find consonant notes on upper strings | Harmonicity axis: which di-chords are fused (P5, P8) vs. warm (3rds, 6ths) vs. active (2nds, 7ths, TT) |
| Second species: 2-against-1 | 4-5 | One Constellation sustains (or rocks between two); treble voice plays passing motion; identify approach intervals | Open string drone as cantus; two notes per beat on upper strings passing through dissonance on weak beat | Interference pulsation: passing tone produces temporary beating; consonant landing resolves it |
| Third species: 4-against-1 | 6-7 | Four-note melodic fragment against sustained bass Constellation; track each interval in time | Active Celtic-style run against open-string drone; D Dorian against D-A-D | Tonic-relative tracking: which notes of the fast line confirm vs. color vs. tension against the drone? |
| Fourth species: suspension | 7-8 | Delayed resolution: hold a note across a chord change; resolve stepwise | Melodic suspension against DADGAD resonance; sustained G against changing Constellation below | Fundamental/octave factor: directional pull of dissonance toward resolution — the note "wants" to move |
| Fifth species (florid) | 9-11 | Free mixture of all species motions; improvised melodic counterpoint above a chord progression | Free melodic improvisation above open-string resonance; all motion types natural to Celtic idiom | Full Plogger tracking: maintaining all four tracking layers simultaneously while attention is on expression |

---

## 8. The Four Chambers × Counterpoint Matrix

The Four Chambers are the four simultaneous dimensions of musical activity that all run in parallel from Phase 1 onward. No chamber is a prerequisite for another; all four are always active at some level of complexity.

| Chamber | What it governs | Core vocabulary | Develops toward |
|---|---|---|---|
| **Melody** | The horizontal line — what notes you choose and how they move | 4 melodic zones (below/root/middle/above), tension arc, chord-change behaviors (approach, escape, pass-through, land) | Expressive phrase shaping; melodic independence over complex harmony |
| **Harmony** | The vertical sound — what chords are implied and how they progress | 14 root movements, 12+2 progressions, Orbit recognition, Constellation selection | Fluid harmonic navigation; hearing movement before playing it |
| **Voicings** | The physical realization of harmony — which specific shape, register, and string set | Closed triads → open/spread triads → Drop 2 → shell voicings → quartal → rootless; CAGED framework in Standard | Instant access to any voicing type; translating the same harmony into different textural environments |
| **Rhythm** | Placement, pulse, and timing — where in time notes land and how long they sustain | 8-position rhythmic grid, son clave, Longy rhythms, phrase landing points, subdivision, anticipation and delay | Rhythmic intention as an expressive variable equal to pitch choice |

All four chambers run in parallel from Sprint 1. The Four Chambers framework is not a sequence — it is the recognition that music is always doing all four things simultaneously, and practice that isolates only one produces a musician who can only execute that one thing under isolated conditions.

| Counterpoint Species | Melody Chamber | Harmony Chamber | Voicings Chamber | Rhythm Chamber |
|---|---|---|---|---|
| Pre-species / 1st species | ●●●● Melodic interval quality; stepwise preference; leap recovery | ●●● Consonance/dissonance classification; Constellation stability | ●● Static shapes; sustain discipline | ● Steady pulse; no rhythm complexity |
| 2nd species | ●●● Passing motion logic; approach and departure | ●●●● Dissonance as passing event; harmonic rhythm | ●● Voice independence between two strings | ●● Weak-beat dissonance placement; strong-beat consonance |
| 3rd species | ●●●● Active melodic navigation; tone-choice under harmonic constraint | ●●● Harmonic ground identification against fast melody | ●●● Register navigation; string crossing | ●●● Melodic rhythm variety; phrase shape |
| 4th species | ●●● Suspension line control; resolution direction | ●●●● Harmony changes while melody sustains; cross-Constellation voice leading | ●●●● Inversion and voicing choice under voice-leading constraint | ●●●● Syncopation; delayed resolution timing |
| 5th species / Florid | ●●●● All melodic behaviors integrated | ●●●● Full harmonic awareness in real time | ●●●● Full voicing awareness in real time | ●●●● Rhythmic freedom integrated with all other chambers |

Reading the matrix: 1st species is concentrated in Melody and Harmony. 4th species is the Voicings and Rhythm chamber exercise. Florid is the Four Chambers convergence instrument. A balanced practice plan sequences through species such that no chamber is consistently neglected.

---

## 9. DADGAD as the Primary Counterpoint Instrument

DADGAD's open string tuning (D2-A2-D3-G3-A3-D4) is not incidentally compatible with species counterpoint — it is structurally ideal for it, for three independent reasons.

**Reason 1: The cantus firmus is already there.** Open strings D, A, and G form a natural sustained cantus. The learner can play any or all open strings, allow them to ring, and the practice instrument immediately generates a sustained reference voice against which melodic counterpoint can move. In Standard tuning, a sustained cantus requires deliberate mechanical effort (fretting and sustaining); in DADGAD, it requires doing nothing. This removes the physical complexity that would otherwise interfere with the perceptual focus of early counterpoint work.

**Reason 2: D Dorian is acoustically privileged.** D Dorian (D-E-F-G-A-B-C) places the modal tonic on the most resonant open strings of the DADGAD tuning. This means that first species counterpoint in D Dorian produces the maximum overtone reinforcement from the instrument's own acoustics — the guitar becomes a resonant environment that makes consonances audibly brighter and dissonances audibly more tense. Plogger's interference pulsation and harmonicity axes are physically amplified by the tuning itself.

**Reason 3: The Celtic tradition is applied counterpoint.** DADGAD was developed to play Celtic music, and Celtic music is, at its structural core, melody over drone — which is exactly what species counterpoint is. A player who learns species counterpoint explicitly in DADGAD is not learning an academic exercise and separately learning Celtic style; they are learning the same thing twice, with mutual reinforcement. Every traditional Celtic melody played over an open-string DADGAD drone is a third or fourth species counterpoint exercise. The tradition provides an enormous corpus of real musical examples that are simultaneously valid counterpoint exercises.

**Implication for curriculum design:** DADGAD should not be introduced as "the Celtic guitar" or "the alternative tuning." It should be introduced as the counterpoint instrument — the guitar in which the cantus firmus is built into the open strings. Standard tuning is the harmonic navigation instrument — the guitar in which the full Constellation vocabulary is most accessible. Both are needed from Phase 0. DADGAD makes counterpoint natural; Standard makes harmony systematic. The two co-primary tracks exist because they are exercising complementary aspects of the same musical intelligence.

**Structural divergence and reconvergence:** DADGAD and Standard diverge most sharply at Phases 4-8 (where the specific physical realization of counterpoint exercises differs substantially) and reconverge at Phase 11 (where HP vocabulary applies to both equally) and Phase 12 (where the distinction becomes a matter of tonal color choice rather than structural limitation).

### 9.1 The DADGAD Pair System — Scale Navigation Framework

The three-notes-per-string (3-NPS) system that works elegantly in Standard tuning does not translate to DADGAD. The problem is structural, not cosmetic: Standard's string intervals are P4-P4-P4-M3-P4 (5-5-5-4-5 semitones), nearly uniform. DADGAD's string intervals are P5-P4-P4-M2-P4 (7-5-5-2-5 semitones). Two outliers break the 3-NPS logic in opposite directions: the P5 bass gap (strings 6-5, D→A, 7 semitones) requires more notes per string to fill, and the M2 treble step (strings 3-2, G→A, only 2 semitones) offers almost no room.

**The structural insight:** DADGAD has a hidden symmetry that 3-NPS obscures. Three of the six strings are D (strings 6, 4, 1) and two are A (strings 5, 2). String 3 (G) is the lone outlier. This means DADGAD naturally groups into **three string pairs** with consistent internal intervals:

| Pair | Strings | Interval | Character |
|---|---|---|---|
| Bass pair | 6–5 (D→A) | P5 — 7 semitones | Unique; needs its own pattern |
| Core pair | 4–3 (D→G) | P4 — 5 semitones | Standard; 3-NPS works normally |
| Treble pair | 2–1 (A→D) | P4 — 5 semitones | Standard; 3-NPS works normally |

The Core and Treble pairs behave identically to P4 string pairs in Standard tuning — the same positional logic applies with no modification. Only the Bass pair and the G→A crossing between Core and Treble require new thinking.

**The G→A step (strings 3→2):** Because G and A are only 2 semitones apart, crossing from string 3 to string 2 is not a position shift — it is a step. The hand barely moves. The practical approach: play 1-2 notes on string 3 (G), then step across to string 2 (A) without changing hand position. In D Dorian, this is often G open on string 3 → A open on string 2: zero hand movement, two different notes. This crossing should be internalized as a minimal step, not a string-crossing leap.

**The Bass pair (strings 6-5, P5):** The 7-semitone gap is too large for standard 3-NPS fingering. The natural solution is **4 notes on string 6, 3 on string 5**. In D Dorian ascending from open D: D-E-F-G (frets 0-2-3-5) on string 6, then A-B-C (frets 0-2-3) on string 5. The alternative treatment is to use string 6 as a sustained drone and treat string 5 as the first melody string — which aligns naturally with the cantus firmus function described in Section 9.

**D-family and A-family patterns:** Because strings 6, 4, and 1 are all D, they share the same scale pattern at the same fret positions. Because strings 5 and 2 are both A, they also share a pattern. A student who learns the D-string shape and the A-string shape knows the scale on four of the six strings automatically. String 3 (G) is the lone singleton, and its crossing to string 2 uses the minimal M2 step.

**D Dorian ascending — full pattern:**

```
String 6 (D): D–E–F–G    frets 0–2–3–5    (4 notes; D-family)
String 5 (A): A–B–C      frets 0–2–3      (3 notes; A-family)
String 4 (D): D–E–F–G    frets 0–2–3–5    (4 notes; D-family — identical to string 6)
String 3 (G): G           fret 0           (1 note; G-singleton — step across →)
String 2 (A): A–B–C      frets 0–2–3      (3 notes; A-family — identical to string 5)
String 1 (D): D           fret 0           (arrival)
```

Pattern summary: **4-3-4-1-3-1**. The two D-family strings produce the same shape; the two A-family strings produce the same shape. The G-singleton is a single note (or at most two) before the minimal step across.

**Application to Segment vocabulary:** DADGAD Segments are defined within pairs, not across all six strings. A Segment lives in the Core pair (strings 4-3), the Treble pair (strings 2-1), or the Bass pair (strings 6-5) — each pair having its own ergonomic geometry. Crossing between pairs uses the designated crossing points: Bass→Core is a standard P4 string crossing; Core→Treble is the M2 step. This is the physical grammar of DADGAD Galaxy movement.

**AMF curriculum note:** This framework is not an alternative to 3-NPS — it is the DADGAD-specific realization of the same underlying principle: find the repeating unit. In Standard, the repeating unit is the 3-note-per-P4-string group. In DADGAD, the repeating unit is the string-family pattern (D-family shape, A-family shape) with a pair-based crossing logic. Phase 1-3 Segment work in DADGAD should teach these pair-based patterns, not attempted 3-NPS transfers from Standard.

---

## 10. HP Integration Timeline

**Phase 0-3 (HP Hidden):** HP physics is active in the system — it determines why Plogger's di-chord categories have the boundaries they do (the P5's 3:2 ratio explains its harmonicity category; the Tritone's 45:32 ratio explains its pulsation behavior). The learner experiences these as perceptual facts, not acoustic theory. The application should use HP metadata to compute Constellation stability scores, Bridge candidate filtering, and Voice-Leading graph edge weights — all invisibly. No HP vocabulary enters the UI.

**Phase 4-10 (HP Semi-Visible):** HP concepts begin to surface as unnamed intuitions that the application can reference without formally naming. "This harmonic area feels farther away from the current tonic" is a Span description without the word Span. "This chord points toward the sharp side" is Sharp-projection without the label. The application can use language like "this moves into darker territory" or "this is a more distant harmonic color" — language that is HP-accurate but not HP-vocabulary. This prepares the learner's perception for the formal vocabulary introduction without creating premature cognitive load.

**Phase 11 (HP Visible):** HP vocabulary is introduced explicitly. The learner now has the perceptual experience from Phases 0-10 to immediately recognize what Span, Sharp/Flat projection, Mirror Sets, and the Natural Harmonic Procession are describing — because they have been hearing these phenomena for ten phases without the names. This is the ideal sequence for vocabulary acquisition: perception first, label second. The HP vocabulary in Phase 11 should feel like finally having a name for something already known, not like encountering a new concept.

**What HP unlocks that nothing else does:** Three things.

First, Mirror Set modulation. The ability to make a modulation feel like a structural pivot (same interval content, opposite directional orientation) rather than an abrupt key change. This requires knowing that two sets are mirrors — a relationship invisible without HP vocabulary.

Second, gradual harmonic migration. The ability to plan a harmonic journey that moves stepwise through the Dissonance-Gradient Harmonic Procession — building tension incrementally by moving to progressively more dissonant sets — and then resolving by walking back toward consonance. This is not achievable through conventional harmony theory, which deals in discrete key areas rather than continuous dissonance gradients.

Third, global harmonic orientation. The ability to say not just "I am in D major" but "I am in a compact, flat-projecting heptachordal area near the consonance end of the procession" — a position in a global topology rather than a local key. This global orientation is the advanced navigational complement to the Solar System's local orientation.

---

## 11. The Practice Protocol

A Phase-adjusted 30-minute daily session. The structure is invariant; the content rotates by phase.

**Always present (10 minutes):**
- Plogger ear training: 5 minutes. Drone note, two-pitch intervals, classification (pulsation/harmonicity/direction). This never goes away, ever.
- Vocal audiation: 5 minutes. Sing what you intend to play before playing it. Scale degree singing, interval singing, or phrase audiation depending on phase.

**Phase-specific chamber rotation (15 minutes, 3×5):**
Three of the four chambers rotate daily so all four are touched at least three times per week:
- Melody: Counterpoint exercise at current species (Phase 0-3: unnamed; Phase 4+: explicitly named)
- Harmony: Orbit/Constellation work in current phase's harmonic vocabulary
- Voicings: Physical Constellation work on both Standard and DADGAD. Phases 2-8: closed triads only — establish the complete closed vocabulary before expanding. Phase 9+: for each closed triad practiced, immediately find its open/spread equivalent and its Drop 2 equivalent. The drill is always three-way: closed → open → Drop 2, on both tunings. The goal is not to prefer one type but to hear them as different tools for the same harmonic idea.
- Rhythm: Placement, subdivision, and phrase-landing work integrated with current material

**Integration drill (5 minutes):**
Take a short musical phrase (2-4 bars) and apply it to both Standard and DADGAD. The point is not to perform it well but to feel the same musical content in both physical geographies and notice where they diverge.

**Weekly structure:** Day 1-5 are session-work days. Day 6 is a synthesis day — apply the week's material in a musical context (song, improvisation, arrangement). Day 7 is rest or pure listening — no instrument.

**Phase 12 practice protocol:** Discard the above structure. Practice is now composition, arrangement, and improvisation. If you find yourself reaching for the framework consciously, note which layer you accessed and add a targeted Plogger or counterpoint drill to the next session. Framework access during Phase 12 is a diagnostic signal, not a failure.

---

## 12. Fluency Redefined

The existing fluency gate template (nine criteria) is structurally sound. It is incomplete in two dimensions: it does not account for relational fluency (knowing an object in its network of relationships, not just in isolation) and it does not account for expressive fluency (deploying the object with intentional emotional consequence, not just correct technical execution).

A revised four-dimensional fluency model:

**Dimension 1 — Perceptual Fluency:** The learner can identify the object by ear alone, without visual or physical cues. Can they hear a Constellation and name its Orbit? Can they hear a Segment and identify its type? Can they hear a Bridge note and classify its tension level? Perceptual fluency is Layer 1 (Plogger). No other fluency is possible without it.

**Dimension 2 — Motor Fluency:** The learner can execute the object physically, at tempo, from multiple starting points, in both Standard and DADGAD, with declining conscious attention to the mechanics. Motor fluency is Layer 5 (Instrument Galaxy). It is measured by reliability under distraction and under tempo pressure — not by the ability to perform carefully when focused.

**Dimension 3 — Relational Fluency:** The learner knows the object's neighborhood — what is nearby, what can follow, what it resolves to, what it contradicts. This is graph-level knowledge: not just the node but its edges. A learner has relational fluency with a Constellation when they can immediately sense three or four available transitions from it, weighted by movement cost and harmonic compatibility. This is HP's contribution to the fluency model — the object's position in the global topology is part of knowing it.

**Dimension 4 — Expressive Fluency:** The learner can deploy the object with intentional emotional consequence. They don't just play a Bridge note — they play it knowing it will create a particular tension, knowing how long to sustain that tension, knowing where to resolve. Expressive fluency requires all three prior dimensions as prerequisites. It is measured by whether the listener's experience matches the player's intention.

**Revised fluency gate:** A learner advances when all four dimensions reach their phase-appropriate threshold. Early phases require perceptual and motor fluency; relational fluency enters at Phase 3; expressive fluency enters at Phase 5. The existing nine criteria map cleanly into this framework — criteria 1-2 are perceptual, 3-6 are motor, 7-8 are relational, 9 is expressive.

**Critical implication for the app:** The application needs to assess all four dimensions, not just completion of exercises. A learner who can execute a Constellation correctly in a drill but cannot deploy it with expressive intention in a musical phrase has motor fluency without expressive fluency and should not advance.

---

## 13. Non-Negotiable Design Principles (Revised)

The original ten principles are retained and sharpened here. Three additional principles are added. Each is stated as a testable constraint.

**P1 — Recognition over calculation.** *Test:* If using a concept requires a chain of more than two steps, the training protocol has failed. Redesign the approach before adding content.

**P2 — Hear/sing before play.** *Test:* The application must not allow a student to submit a physical exercise response without first completing a corresponding audiation prompt. Enforced at the UI level, not the honor system.

**P3 — Few objects, deep fluency.** *Test:* If the learner is encountering more than three new named objects in a single session, the pacing is wrong. Depth is measured by relational and expressive fluency, not by count of objects introduced.

**P4 — Compression through relationships.** *Test:* A student should be able to derive a new object's properties from its relationship to known objects. If they cannot, the relational framework has not been taught.

**P5 — Maps reveal; they do not invent.** *Test:* Switching Maps must not change the available musical options — only which options are currently visible. A test that creates new options when a Map is selected indicates a data model error.

**P6 — Coarse-to-fine decision making.** *Test:* The application's UI should enforce decision sequence: Destination before Path, Path before Segment, Segment before articulation. Presenting all choices simultaneously is an anti-pattern.

**P7 — Theory must terminate in motor fluency.** *Test:* Every named concept in the system must have an associated physical exercise in both Standard and DADGAD. Concepts without physical exercises are not complete.

**P8 — Perception is multi-dimensional.** *Test:* Interval training must include pulsation, directionality, and harmonicity — not just interval name. Single-dimension labeling (only "major third") is insufficient.

**P9 — Parallel embodiment.** *Test:* No phase may have a fluency gate that can be passed on Standard alone. All gates require independent demonstration in both tunings.

**P10 — Framework disappearance.** *Test:* The Phase 12 graduation criterion is a musical performance in which an external assessor cannot detect framework-conscious behavior. Self-report is insufficient.

**P11 (NEW) — HP physics precedes HP vocabulary.** *Test:* HP-derived properties (Span, projection, Mirror relationships) must appear in the application's backend computation from Phase 0. HP vocabulary must not appear in the UI before Phase 11. Any HP concept surfaced in the UI before Phase 11 is a pacing violation.

**P12 (NEW) — Counterpoint enters unnamed.** *Test:* The word "counterpoint" must not appear in the UI before Phase 4. The exercises that are counterpoint exercises in Phases 0-3 must be labeled as Plogger training or Constellation work. Any premature labeling creates the wrong mental frame.

**P13 (NEW) — Fluency gates are blocking, not advisory.** *Test:* The application must not allow phase advancement unless all four fluency dimensions meet their thresholds. A "skip" or "I'll come back to this" option is architecturally prohibited. If this creates friction for motivated learners, the solution is richer content at the current phase, not gate removal.

---

## 14. Open Questions and Future Directions

**What the system still needs:**

The HP topology layer is currently described from a 20-page excerpt. The 48 reference tables, the complete Span definitions, the Quintal Prime Form, and the full Modal and Dissonance-Gradient Harmonic Processions are in the printed edition only. Until this content is available and computationally integrated, the application can implement the HP principles (the Circle of Fifths as organizing axis, the consonance-to-dissonance gradient, the directional projection concept) but cannot implement the complete 350-set catalog with its relationships. This is the system's largest outstanding technical dependency.

The Voice-Leading graph is architecturally defined but not yet populated. Computing all valid transitions between Constellations with movement-cost, common-tone count, and HP-distance weights requires systematic validation across both Standard and DADGAD geometries. This is tractable computationally but requires careful implementation to avoid errors in DADGAD translation (the validation requirement in Section 15.3 of the source document is mandatory).

Rhythm, as a chamber, is underdeveloped in the synthesis. The Rhythm Map (placement, subdivision, groove, anticipation, stops, phrase landing points) has received less architectural attention than the harmonic layers. This is a structural imbalance. Counterpoint's fourth species (suspension and rhythmic delay) provides the natural entry point for rhythm as an expressive variable — the timing of resolution is a rhythmic decision, and this connection needs explicit development in the curriculum.

**What happens when the student gets the full HP book:**

Phase 11 expands substantially. The complete 350-set catalog transforms the harmonic topology from an abstract gesture into a navigable space. The learner at Phase 11, having spent ten phases developing perceptual and navigational fluency, will have the experiential substrate to immediately recognize what the HP tables are describing. The tables become an atlas of a territory already partially explored. Suggested integration: introduce the tables as reference material, not as study material — the student consults them when exploring an unfamiliar harmonic area, not as primary curriculum.

**What a Phase 12 graduate actually looks like:**

They play through complex harmonic changes without visible calculation. They can improvise a melody in D Dorian on DADGAD and immediately move to its equivalent in Standard without a conceptual break. They recognize when a harmonic progression is moving along the dissonance gradient — getting darker, getting brighter — without needing to name the sets involved. When they want to modulate, they feel the available pivot points rather than calculating them. Their practice sessions are music: songs, improvisations, arrangements — not exercises. When they pick up the guitar, the first thing they do is play something, not warm up the framework.

Most significantly: they have internalized the difference between playing what they can and playing what they hear. Plogger's fundamental mandate — that the ear leads the body — is no longer a rule they follow but a reflex they cannot suppress. They hear the phrase before they play it. Every time.

**The unresolved question that matters most:**

The system's ultimate promise — that the framework disappears — is stated as a goal but not yet operationalized as a metric. What measurable evidence distinguishes a Phase 12 graduate from a sophisticated Phase 10 learner who has gotten better at using the framework consciously? The fluency gate for Phase 12 requires an external assessor, but the assessment criteria have not been specified. This is the system's deepest open question, and answering it is a prerequisite for honest evaluation of whether the system delivers on its promise.
