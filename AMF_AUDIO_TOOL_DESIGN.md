# AMF Audio Tool — Architecture Design

**Status:** Design approved — pending build  
**Last updated:** 2026-06-14  
**Phase 1 target:** Di-Chord Ear Training (Explorer + Drill)  
**Long-term target:** Full AMF audio training platform (ear training, jam tracks, rhythm, interval)

---

## Table of Contents

1. [Guiding Principle](#guiding-principle)
2. [Tech Decision: Tone.js](#tech-decision-tonejs)
3. [Layer Stack](#layer-stack)
4. [File Structure](#file-structure)
5. [Phase 1: Di-Chord Explorer](#phase-1-di-chord-explorer)
6. [Future Modules](#future-modules)
7. [Key Design Decisions](#key-design-decisions)
8. [Build Roadmap](#build-roadmap)

---

## Guiding Principle

Build a thin, well-layered engine now. Phase 1 is ear training. The same engine runs jam tracks, rhythm training, and instrument playback later — we just add modules on top. No module knows about another module's internals. The Audio Engine is the only shared layer.

---

## Tech Decision: Tone.js

Add **Tone.js** (`npm install tone`, ~160KB gzipped). It sits on top of Web Audio API and gives us:

| Capability | Why It Matters |
|------------|---------------|
| Musical timing (Transport, Sequencer) | Essential for jam tracks — Web Audio API scheduling is error-prone at musical tempo |
| Instrument abstractions (Synth, PolySynth, Sampler) | Realistic piano/guitar sounds later without rebuilding from scratch |
| Effects chain (Reverb, Chorus, EQ) | Instrument simulation without DSP expertise |
| AudioContext lifecycle management | Handles browser user-gesture requirement cleanly |

Raw Web Audio API would require rebuilding all of the above. Tone.js is the right foundation for a tool that will eventually play jam tracks with real instrument feels.

---

## Layer Stack

```
┌──────────────────────────────────────────────┐
│            UI Layer  (React / Next.js)         │
│   /audio/*  pages + shared components          │
├──────────────────────────────────────────────┤
│           Feature Modules                      │
│  EarTraining │ JamTracks │ Rhythm │ (future)   │
├──────────────────────────────────────────────┤
│           AMF Audio Engine                     │
│   AudioEngine (React Context singleton)        │
│   DiChordSynth · ChordPlayer · Sequencer       │
│   InstrumentManager · VisualizerBridge         │
├──────────────────────────────────────────────┤
│               Tone.js                          │
├──────────────────────────────────────────────┤
│            Web Audio API (browser native)      │
└──────────────────────────────────────────────┘
```

**Rule:** Feature modules never import from each other. All audio operations go through the Audio Engine. All audio state is exposed through the AudioEngine React Context.

---

## File Structure

```
lib/audio/
  engine/
    AudioEngine.ts          ← singleton, AudioContext lifecycle, Tone.js init
    DiChordSynth.ts         ← plays any di-chord with configurable timbre
    ChordPlayer.ts          ← plays full chord voicings (polyphonic)
    Sequencer.ts            ← timing/loop engine for jam tracks
    InstrumentManager.ts    ← synth presets + future sampler (piano, guitar)
    VisualizerBridge.ts     ← exposes real-time audio data to UI (beating rate, spectrum)
  data/
    dichords.ts             ← all 11 di-chords: pulsation Hz, harmonicity, FO factor, feel
    progressions.ts         ← 14 core progressions with root movement sequences
    rhythmPatterns.ts       ← 8-position grid patterns (Son Clave, Longy, etc.)
    sprintConfig.ts         ← per-sprint training targets, focus di-chords, gates
  index.ts                  ← clean public API (what feature modules import)

app/audio/
  layout.tsx                ← audio-section nav + AudioEngine context provider
  page.tsx                  ← hub: "AMF Audio Lab" — entry point for all tools
  ear-training/
    page.tsx                ← Explorer + Drill tabs
    components/
      DiChordGrid.tsx       ← 11 selectable di-chord buttons, color-coded by pulsation family
      FactorPanels.tsx      ← container: renders all 3 factor panels for selected di-chord
      PulsationViz.tsx      ← animated beating wave (2Hz / 4Hz / 8Hz)
      HarmonicityViz.tsx    ← spectrum fusion display (open/light vs closed/dark)
      FOFactorViz.tsx       ← shadow direction arrow diagram (↓ / ↕ / ↑)
      TimbreSlider.tsx      ← Sine → Triangle → Sawtooth → Complex
      DrillMode.tsx         ← randomized discrimination drill, sprint-aware
      DrillFeedback.tsx     ← accuracy %, streak, session stats, factor hints
  jam-tracks/               ← (future module — route reserved)
    page.tsx
  rhythm/                   ← (future module — route reserved)
    page.tsx
  interval/                 ← (future module — route reserved)
    page.tsx

components/audio/
  PlayButton.tsx            ← reusable play/stop with AudioContext guard
  PitchSelector.tsx         ← root note picker (C2–C5)
  SprintBadge.tsx           ← "Sprint 1 Focus: [3] vs [4]"
```

---

## Phase 1: Di-Chord Explorer

### What it teaches

The Explorer makes the three Plogger sound factors perceptually concrete. Students don't just read that [3] is "4Hz pulsation, non-harmonic" — they **hear** the beating while **watching** it animate and **see** the shadow direction simultaneously. This is the only software in existence that teaches interval perception through all three acoustic dimensions at once.

### Explorer Tab

**Di-Chord Grid** — 11 buttons, color-coded by pulsation family:
- Red border = 8Hz Dissonant family: [1] [2] [6] [10] [11]
- Purple border = 4Hz Modal family: [3] [4] [8] [9]
- Green border = 2Hz Perfect family: [5] [7]

**On select:** plays the interval + three factor panels update:

**Pulsation Panel**
- Animated sine wave whose visual frequency matches the beating rate (2 / 4 / 8 Hz)
- Label: "8 Hz — Dissonant" / "4 Hz — Modal" / "2 Hz — Perfect"
- Plain-English feel descriptor: "Restless, tense, wants to move"
- Student watches the wave and hears the beating simultaneously

**Harmonicity Panel**
- Horizontal bar: left = fully fused (open/light) → right = maximally rough (closed/dark)
- Current di-chord marked on the bar
- Timbre slider underneath: Sine → Triangle → Sawtooth → Complex partials
- As timbre becomes richer, roughness becomes more audible — student hears harmonicity directly

**F/O Factor Panel**
- Two note circles (lower and upper pitch)
- Arrow showing shadow direction: ↓ (lower refers) / ↕ (ambiguous) / ↑ (upper refers)
- Plain-English label: "The lower note pulls your ear down" / "The upper note leads" / "Both notes pull equally"

**Controls:**
- Root note picker (A2–A4, defaults to A3)
- Timbre slider (affects all three panels simultaneously)
- "Play again" button

### Drill Tab

**Sprint-aware:** loads the sprint's focus di-chords automatically from `sprintConfig.ts`
- Sprint 1 default: [3] vs [4]
- Student can override to any subset of all 11

**Flow:**
1. Plays a random di-chord from the active set (no visual cue)
2. Student taps which di-chord they heard
3. Immediate feedback:
   - Correct: "Yes — [4]. Notice the brighter, warmer beating." (highlights which factor was the tell)
   - Wrong: "That was [4], not [3]. [4] has slightly faster beating and more harmonic color. Hear it again?"
4. Tracks: accuracy %, current streak, session total
5. "Slow" button: drops both tones an octave, makes beating rate more physically audible
6. "Hear again" button: replays without revealing answer

**Session summary:** shows accuracy by di-chord pair, improvement from last session (localStorage).

---

## Future Modules

These routes are reserved in Phase 1 with placeholder pages. The Audio Engine is designed to support all of them from day one.

### Jam Tracks (`/audio/jam-tracks`)

- Pick any of the 14 core progressions
- Pick key, tempo, feel (straight, swing, Latin)
- Pick instrument voices: Piano / Guitar / Bass / Drums
  - Phase 1: synthesis (Tone.js PolySynth with piano/guitar presets)
  - Phase 2: sampled (Tone.js Sampler + pre-recorded instrument samples)
- Loop playback with section markers
- Connects directly to each sprint's Gate A progression — "practice your gate in context"
- Key/capo controls for guitar users

### Rhythm Trainer (`/audio/rhythm`)

- 8-position binary grid with clickable positions
- Enter a pattern → hear it loop → adjust positions
- Metronome with subdivisions
- Longy rhythm notation alongside grid (ta, ta-te, etc.)
- Son Clave spiral thread — builds toward it from Sprint 1's skeleton pattern

### Interval Trainer (`/audio/interval`)

- Melodic interval recognition within the Melody Chamber context
- Zone-aware prompts: "This is a Zone 1 note over Am — hear the root?"
- Ascending and descending
- Links each interval to its di-chord identity (melodic [5] = same acoustic fingerprint as harmonic [5])

### Progression Builder (`/audio/progressions`)

- Visual builder for the 14 core progressions
- Shows each root movement as a di-chord arrow
- Plays the progression and lets student hear the root movements in sequence
- Bridges Harmony Chamber content with ear training

---

## Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Audio library | Tone.js | Musical timing + Sampler needed for jam tracks; too expensive to rebuild |
| Synthesis approach | Oscillator-first, Sampler later | Ships faster; Sampler adds realism in Phase 3+ |
| State management | React Context (AudioEngine) | No Zustand needed yet; revisit if drill state grows complex |
| Visualization | Animated SVG/Canvas | Real-time beating animation is the pedagogical differentiator |
| Data layer | TypeScript data files | No DB needed for audio config; `dichords.ts` is the source of truth |
| Sprint integration | `sprintConfig.ts` drives drill defaults | Drill always loads current sprint's focus without manual setup |
| Offline / PWA | Not yet | Add service worker later if offline practice becomes a requirement |

---

## Build Roadmap

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| **1A** | Audio Engine + Data layer | `lib/audio/` fully typed, Tone.js wired, DiChordSynth plays all 11 di-chords |
| **1B** | Di-Chord Explorer | `/audio/ear-training` Explorer tab live with all 3 factor panels animated |
| **1C** | Drill Mode | Drill tab live, Sprint 1 gate ([3] vs [4]) as default, localStorage stats |
| **1D** | Hub page + future routes | `/audio` hub + placeholder pages for jam-tracks, rhythm, interval |
| **2** | Jam Tracks v1 | Synthesis-based chord progressions, key/tempo controls, 14 progressions |
| **3** | Rhythm Trainer | 8-position grid, metronome, Longy notation |
| **4** | Sampled instruments | Tone.js Sampler + piano/guitar samples, realistic instrument feel |
| **5** | Interval Trainer | Melodic interval recognition, zone-aware, Melody Chamber integration |

---

## Open Questions (confirm before Phase 1B build)

1. **Tone.js approved?** (`npm install tone` — adds ~160KB to bundle)
2. **Route confirmed?** `/audio` as top-level section in Nav alongside `/materials`, `/curriculum`?
3. **Phase 1 scope:** Explorer + Drill only, or include hub + placeholder future routes too?
4. **Visualization style:** Animated (real-time SVG) or static diagrams per di-chord?

---

*Adaptable Musician's Framework — AMF Audio Tool Design*  
*"The framework disappears."*
