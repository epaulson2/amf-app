# AMF Audio Tool — MVP Implementation Plan

**Status:** Approved — ready to build  
**Last updated:** 2026-06-14  
**Design doc:** [AMF_AUDIO_TOOL_DESIGN.md](./AMF_AUDIO_TOOL_DESIGN.md)  
**MVP scope:** Di-Chord Ear Training — Explorer + Drill + Hub + placeholder future routes

---

## Table of Contents

1. [Decisions Locked In](#decisions-locked-in)
2. [Critical Next.js Caveat](#critical-nextjs-caveat)
3. [Phase 1A — Data + Engine](#phase-1a--data--engine)
4. [Phase 1B — Explorer UI](#phase-1b--explorer-ui)
5. [Phase 1C — Drill Mode](#phase-1c--drill-mode)
6. [Phase 1D — Polish + Deploy](#phase-1d--polish--deploy)
7. [Sequence Summary](#sequence-summary)

---

## Decisions Locked In

| Question | Decision |
|----------|----------|
| Tone.js? | **Yes** — `npm install tone`. Musical timing needed for jam tracks; too expensive to rebuild. |
| Route? | **`/audio`** — added to Nav as "Audio Lab" |
| Phase 1 scope? | Explorer + Drill + Hub page + placeholder future routes |
| Visualization? | **Animated SVG** — real-time beating animation is the pedagogical differentiator |

---

## Critical Next.js Caveat

Tone.js uses Web Audio API which doesn't exist in Node.js. Every component that touches Tone.js must be loaded with:

```ts
const DiChordGrid = dynamic(() => import('./components/DiChordGrid'), { ssr: false })
```

This applies to every audio component in every phase. SSR will crash without it.

---

## Phase 1A — Data + Engine

Build first. No UI. All steps here must compile and be type-safe before any UI work begins.

---

### Step 1 — Install Tone.js

```bash
npm install tone
```

Verify: quick smoke test that `new Tone.Oscillator().toDestination()` works in a client component.

---

### Step 2 — `lib/audio/data/dichords.ts`

The foundation everything reads from. TypeScript types + all 11 di-chords with exact values from the AMF Bible.

```ts
export type PulsationFamily = 'dissonant' | 'modal' | 'perfect'
export type FODirection = 'down' | 'both' | 'up'
export type HarmonicityLevel = 'very-low' | 'low' | 'medium' | 'med-high' | 'high' | 'very-high'
export type Timbre = 'sine' | 'triangle' | 'sawtooth' | 'complex'

export interface DiChord {
  bracket: number           // 1–11
  name: string              // "Minor 2nd"
  semitones: number         // 1–11
  pulsationHz: 2 | 4 | 8
  pulsationFamily: PulsationFamily
  harmonicity: HarmonicityLevel
  isHarmonic: boolean       // true = open/light
  foDirection: FODirection
  feel: string              // "Harsh, biting, maximum tension"
  discriminationHint: string // shown on wrong drill answer
  color: string             // CSS hex for UI
}

export const DICHORDS: DiChord[] = [
  {
    bracket: 1, name: 'Minor 2nd', semitones: 1,
    pulsationHz: 8, pulsationFamily: 'dissonant',
    harmonicity: 'very-low', isHarmonic: false,
    foDirection: 'down',
    feel: 'Harsh, biting, maximum tension',
    discriminationHint: '[1] is the harshest di-chord — maximum roughness, fastest beating.',
    color: '#991b1b',
  },
  // ... all 11
]

export function getDiChord(bracket: number): DiChord {
  const d = DICHORDS.find(d => d.bracket === bracket)
  if (!d) throw new Error(`No di-chord for bracket ${bracket}`)
  return d
}
```

**Done criteria:** All 11 di-chords entered, TypeScript compiles, values match AMF Bible exactly.

---

### Step 3 — `lib/audio/data/sprintConfig.ts`

```ts
export interface SprintDrillConfig {
  sprint: number
  focusBrackets: number[]
  gateDescription: string
  anchorSong: string
}

export const SPRINT_CONFIG: SprintDrillConfig[] = [
  {
    sprint: 1,
    focusBrackets: [3, 4],
    gateDescription: '[3]/[4] discrimination 10/10 + singing from any pitch',
    anchorSong: "Ain't No Sunshine",
  },
  {
    sprint: 2,
    focusBrackets: [5],
    gateDescription: 'Sing/play [5] from 3 starting notes, identify I→IV vs V→I by ear',
    anchorSong: 'Stand By Me',
  },
  // sprints 3–12
]

export function getSprintConfig(sprint: number): SprintDrillConfig {
  return SPRINT_CONFIG.find(c => c.sprint === sprint) ?? SPRINT_CONFIG[0]
}
```

---

### Step 4 — `lib/audio/engine/AudioEngine.tsx`

React Context singleton. Manages Tone.js lifecycle.

```ts
interface AudioEngineContext {
  isReady: boolean
  start: () => Promise<void>  // must be called on a user gesture
  synth: DiChordSynth | null
}
```

- `isReady` starts `false`; flips `true` after `Tone.start()` resolves
- Provider wraps `app/audio/layout.tsx` only — not the entire app
- `start()` is idempotent — safe to call multiple times

---

### Step 5 — `lib/audio/engine/DiChordSynth.ts`

```ts
export class DiChordSynth {
  play(bracket: number, rootMidi: number, timbre: Timbre): void
  stop(): void
  setTimbre(timbre: Timbre): void
  dispose(): void
}
```

- Uses `Tone.PolySynth` with two voices (lower note + interval above)
- `complex` timbre = sawtooth oscillator type + slight reverb + mild detune (accentuates harmonicity differences)
- Sustains until `stop()` is called or next `play()` replaces it
- `rootMidi` default = 57 (A3)

---

### Step 6 — `lib/audio/index.ts`

Clean public API. Feature modules import only from here — never from engine internals directly.

```ts
export { getDiChord, DICHORDS } from './data/dichords'
export type { DiChord, Timbre, PulsationFamily, FODirection } from './data/dichords'
export { getSprintConfig, SPRINT_CONFIG } from './data/sprintConfig'
export { AudioEngineProvider, useAudioEngine } from './engine/AudioEngine'
export { DiChordSynth } from './engine/DiChordSynth'
```

---

## Phase 1B — Explorer UI

All components in this phase loaded with `dynamic(..., { ssr: false })`.

---

### Step 7 — `app/audio/layout.tsx`

```tsx
export default function AudioLayout({ children }) {
  return (
    <AudioEngineProvider>
      <div className="min-h-screen" style={{ background: '#0f172a' }}>
        {children}
      </div>
    </AudioEngineProvider>
  )
}
```

---

### Step 8 — `app/audio/page.tsx` (Hub)

Four cards in a 2×2 grid — matches existing site card pattern:

| Card | Route | Badge |
|------|-------|-------|
| Ear Training | `/audio/ear-training` | Live |
| Jam Tracks | `/audio/jam-tracks` | Coming — Phase 2 |
| Rhythm Trainer | `/audio/rhythm` | Coming — Phase 3 |
| Interval Trainer | `/audio/interval` | Coming — Phase 5 |

Hero: "AMF Audio Lab" — dark background (`#0f172a`), teal accent, rainbow gradient rule at bottom of header. Matches existing site design.

---

### Step 9 — `components/audio/PlayButton.tsx`

Reusable across all audio pages. Handles the browser AudioContext requirement:

- `isReady === false`: renders "Tap to enable audio" in amber — explains the tap requirement
- `isReady === true, playing`: animated pulse ring + "Stop"
- `isReady === true, idle`: "Play [bracket]"

On first click, calls `engine.start()` then immediately plays. No double-tap required.

---

### Step 10 — `app/audio/ear-training/page.tsx`

Two tabs: **Explorer** | **Drill**

State held at this level:
```ts
const [activeTab, setActiveTab] = useState<'explorer' | 'drill'>('explorer')
const [selectedBracket, setSelectedBracket] = useState<number>(3)
const [timbre, setTimbre] = useState<Timbre>('sine')
const [rootNote, setRootNote] = useState('A3')  // maps to MIDI 57
```

Current sprint shown as a badge: "Sprint 1 Focus: [3] vs [4]"

---

### Step 11 — `app/audio/ear-training/components/DiChordGrid.tsx`

11 buttons grouped visually by pulsation family:

```
┌─ Dissonant 8Hz ──────────────────────┐
│  [1]  [2]  [6]  [10]  [11]           │  ← red border (#991b1b)
└──────────────────────────────────────┘
┌─ Modal 4Hz ───────────────────────── ┐
│  [3]  [4]  [8]  [9]                  │  ← purple border (#5B2C6F)
└──────────────────────────────────────┘
┌─ Perfect 2Hz ─────────────────────── ┐
│  [5]  [7]                            │  ← green border (#1E8449)
└──────────────────────────────────────┘
```

On click: `synth.play(bracket, rootMidi, timbre)` + `setSelectedBracket(bracket)`.  
Selected button gets filled background. Plays immediately on click.

---

### Step 12 — `app/audio/ear-training/components/PulsationViz.tsx`

Animated SVG sine wave. Visual speed is driven by CSS `animation-duration` tied to the beating rate:

```tsx
const durations = { 8: '0.3s', 4: '0.6s', 2: '1.2s' }
// Fast wave = dissonant (8Hz), slow wave = perfect (2Hz)
<path
  style={{ animationDuration: durations[dichord.pulsationHz] }}
  className="animate-pulse-wave"
  ...
/>
```

Label: "8 Hz — Dissonant" with the feel descriptor below.  
The student watches the beat and hears it simultaneously — this is the pedagogical core.

---

### Step 13 — `app/audio/ear-training/components/HarmonicityViz.tsx`

Horizontal gradient bar: dark/closed (left) → bright/open (right).  
Current di-chord's position marked with a vertical line + label.  
`TimbreSlider` embedded here — as student drags Sine → Sawtooth, harmonicity becomes audible in real time.

---

### Step 14 — `app/audio/ear-training/components/FOFactorViz.tsx`

SVG diagram with two note circles (lower pitch left, upper pitch right):

- **↓ Down** ([1]–[5]): arrow points to lower circle. Label: "The lower note pulls your ear"
- **↑ Up** ([7]–[11]): arrow points to upper circle. Label: "The upper note leads"  
- **↕ Both** ([6]): double arrow. Label: "Both notes pull equally — maximum tension"

---

### Step 15 — `app/audio/ear-training/components/FactorPanels.tsx`

Three-panel grid assembling Steps 12–14:

```
┌──────────────┬──────────────┬──────────────┐
│  Pulsation   │ Harmonicity  │  F/O Factor  │
│  (animated   │  (gradient   │  (arrow      │
│   wave)      │   bar)       │   diagram)   │
└──────────────┴──────────────┴──────────────┘
```

Desktop: 3 columns. Mobile: stacks vertically. Each panel has a header, visualization, and plain-English descriptor.

---

## Phase 1C — Drill Mode

---

### Step 16 — `app/audio/ear-training/components/DrillMode.tsx`

Sprint-aware drill state machine:

```
idle → playing → awaiting_answer → feedback → idle
```

- Reads `SPRINT_CONFIG` for current sprint's `focusBrackets`
- Randomizes next bracket — never repeats same bracket twice in a row
- Plays without any visual cue (student hears only)
- Answer buttons show the focus di-chord labels (e.g. "[3] Minor Third" / "[4] Major Third")
- "Hear again" — replays current di-chord without revealing answer
- "Slow" — drops `rootMidi` by 12 (one octave down, makes beating physically more audible)
- Checks answer → triggers `DrillFeedback`

---

### Step 17 — `app/audio/ear-training/components/DrillFeedback.tsx`

```ts
// Persisted to: localStorage key 'amf-drill-sessions'
interface DrillSession {
  date: string
  sprint: number
  total: number
  correct: number
  byBracket: Record<number, { correct: number; total: number }>
}
```

Live stats bar during session: accuracy % + current streak.

Post-answer hints on wrong answer — pulled from `discriminationHint` field in `dichords.ts`:
> "That was [4]. [4] is brighter and warmer — the major sound. [3] sits darker. Hear it again?"

Session summary shown on tab switch or when returning to Explorer.

---

## Phase 1D — Polish + Deploy

---

### Step 18 — Placeholder routes

Create minimal pages for future modules. Each shows a description card and "Coming in Phase N" badge:

- `app/audio/jam-tracks/page.tsx`
- `app/audio/rhythm/page.tsx`
- `app/audio/interval/page.tsx`

Routes are live so they can be linked from the hub and Nav without 404s.

---

### Step 19 — Nav update (`components/Nav.tsx`)

Add to `navLinks` array:

```ts
{ href: '/audio', label: 'Audio Lab' },
```

---

### Step 20 — Build + deploy + verify

```bash
cd /home/elderle/amf-app
npm run build
sudo systemctl restart amf-app
```

**Verification checklist:**
- [ ] `https://amf.elderle.app/audio` loads hub page
- [ ] Tap "Ear Training" → Explorer tab loads
- [ ] Tap a di-chord button → audio fires, factor panels update
- [ ] Timbre slider → sound changes in real time
- [ ] Switch to Drill tab → Sprint 1 loads ([3] vs [4])
- [ ] Answer a question → feedback + hint appears
- [ ] "Slow" button drops pitch, beating more audible
- [ ] localStorage persists session stats on refresh
- [ ] Mobile: audio tap-to-enable appears and works
- [ ] Nav shows "Audio Lab" link on all pages

---

## Sequence Summary

| Phase | Steps | Key output |
|-------|-------|-----------|
| **1A** | 1–6 | Audio engine compiles, di-chords play from console |
| **1B** | 7–15 | Explorer live: all 3 animated factor panels, timbre slider |
| **1C** | 16–17 | Drill mode live: Sprint 1 gate drillable, stats tracked |
| **1D** | 18–20 | Hub + placeholders + Nav updated + deployed to prod |

**Total:** 20 focused build steps. Build 1A completely before touching any UI.

---

*Adaptable Musician's Framework — AMF Audio Tool MVP Plan*  
*"The framework disappears."*
