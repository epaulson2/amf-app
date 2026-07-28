# AMF Fingerstyle Arranger — Implementation Plan

> **Status:** Active development. Knowledge framework complete (`ARRANGEMENT_ENGINE_KNOWLEDGE.md`). Current arranger at `https://amf.elderle.app/arranger` renders notation, plays back audio, and accepts ABC input.
>
> This document is the sequenced build plan. Phases are ordered by dependency — each phase unlocks the next. Within a phase, features are ordered by priority.

---

## Table of Contents

1. [Current State](#1-current-state)
2. [Phase 1 — Polish & Infrastructure](#2-phase-1--polish--infrastructure)
3. [Phase 2 — Counterpoint Engine](#3-phase-2--counterpoint-engine)
4. [Phase 3 — AI Collaborator](#4-phase-3--ai-collaborator)
5. [Phase 4 — VexFlow Interactive Notation](#5-phase-4--vexflow-interactive-notation)
6. [Phase 5 — Player Style Presets](#6-phase-5--player-style-presets)
7. [Phase 6 — AMF Pedagogy Integration](#7-phase-6--amf-pedagogy-integration)
8. [Technical Decisions Log](#8-technical-decisions-log)
9. [Open Questions](#9-open-questions)

---

## 1. Current State

### What exists
- `app/arranger/page.tsx` — melody selector (samples + custom ABC), tuning selector, texture mode picker, generate button, result display with playability badge
- `lib/arranger/` — full solver pipeline: solver.ts, voices.ts, fretboard.ts, alphatex.ts, theory.ts, types.ts, sample-melodies.ts
- `components/arranger/AlphaTabViewer.tsx` — renders notation (SVG) + audio playback (sonivox.sf2 soundfont)
- `lib/arranger/abc-parser.ts` — abcjs-based ABC notation → NoteEvent[] + ChordEvent[] converter
- `api/arrange/route.ts` — POST endpoint: accepts melody + chords + tuning + modes → returns `Arrangement[]`
- `docs/ARRANGEMENT_ENGINE_KNOWLEDGE.md` — the knowledge framework (counterpoint rules, AMF mappings, player styles, form analysis)

### What's been partially started (safe, not breaking)
- `lib/arranger/index.ts` — `toAlphaTex` now exported (client-safe, pure TS)
- `lib/arranger/library.ts` — localStorage save/load/search utilities (new file, complete)
- `app/globals.css` — `@media print` CSS added
- `app/arranger/page.tsx` — `VOICE_CONFIG`, `selectedVoices` state, `toggleVoice`, `handleSave`, `handlePrint`, `filteredAlphaTex` computation added — **JSX not yet wired**

---

## 2. Phase 1 — Polish & Infrastructure

> **Goal:** Complete the three features requested before the plan pivot. No new musical intelligence — just UI completeness and persistence.

### 1A — Layer-by-Layer Voice Toggling

**What it does:** After generating an arrangement, the user can toggle individual voices on/off (Melody / Bass / Inner / Drone) to hear and see each layer independently. The notation re-renders instantly with only the selected voices.

**How it works:**
- `selectedVoices: Set<VoiceType>` state (default: all 4)
- `filteredAlphaTex` = `toAlphaTex({ ...arrangement, guitarNotes: arrangement.guitarNotes.filter(n => selectedVoices.has(n.voice)) })`
- Voice toggles: 4 buttons with color indicators, must keep at least 1 selected
- Voice colors: Melody=#0891b2, Bass=#16a34a, Inner=#d97706, Drone=#7c3aed

**Files to change:**
- `app/arranger/page.tsx` — wire `filteredAlphaTex` into `AlphaTabViewer`, add toggle buttons to JSX (state/handlers already added)

**Pedagogical value:** Core to the counterpoint learning loop — start with melody only, add bass (1st species), then inner voice, then drone. Hear what each layer contributes.

---

### 1B — Arrangement Library

**What it does:** A page at `/arranger/library` where all saved arrangements are stored, searchable, and grouped by song (folder). Clicking an arrangement reloads it in the arranger.

**Schema (localStorage):**
```typescript
interface SavedArrangement {
  id: string           // crypto.randomUUID()
  title: string        // e.g. "Danny Boy — voice-led"
  folder: string       // song name / group label
  savedAt: string      // ISO timestamp
  arrangement: Arrangement
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuningKey: string    // "DADGAD" | "Standard"
  abcText?: string     // if source was custom ABC
}
```

**Pages / components:**
- `lib/arranger/library.ts` — `saveArrangement`, `loadAll`, `deleteArrangement`, `searchArrangements`, `getFolders` (already complete)
- `app/arranger/page.tsx` — Save button in result area; on click → modal or inline prompt for folder name → `saveArrangement()` → confirmation toast
- `app/arranger/library/page.tsx` — new page:
  - Search bar (filters title + folder)
  - Folders as collapsible groups (sorted A-Z)
  - Each saved arrangement: card with title, mode badge, tuning, date, delete button
  - Click card → load into arranger via sessionStorage handoff (write to `sessionStorage['amf-load-arrangement']`, navigate to `/arranger`, read on mount)
- Navigation: add "Library" link to arranger page header (top right, no-print class)

**State handoff pattern:**
```typescript
// In library page on card click:
sessionStorage.setItem('amf-load-arrangement', JSON.stringify(saved))
router.push('/arranger')

// In arranger page on mount (useEffect, runs once):
const pending = sessionStorage.getItem('amf-load-arrangement')
if (pending) {
  sessionStorage.removeItem('amf-load-arrangement')
  const saved = JSON.parse(pending) as SavedArrangement
  // restore: setTuningKey, setChords, setArrangements([saved.arrangement]), etc.
}
```

---

### 1C — Print / PDF Export

**What it does:** A Print button exports the current arrangement as a clean printable page (or PDF via browser print dialog).

**How it works:**
- Button calls `window.print()`
- `@media print` CSS (already added to `globals.css`):
  - `.no-print` → `display: none` (hides all controls: buttons, selectors, chord editor, player)
  - `.print-arrangement` → `page-break-inside: avoid`
  - `.print-title` → clean serif title styling
- The AlphaTab SVG container is the only visible content during print
- Browser "Save as PDF" from the print dialog = PDF export. No extra library needed.

**Files to change:**
- `app/arranger/page.tsx` — add `className="no-print"` to all control sections; add print button; wrap notation result in `<div className="print-arrangement">`; add `<div className="print-title">` with title above the viewer

---

## 3. Phase 2 — Counterpoint Engine

> **Goal:** Replace the chord-first-only arrangement logic with species counterpoint generation. These are **additive** new arrangement modes — existing chord-first modes (`simple`, `drone`, `harmonic`, `voice-led`) are preserved unchanged.

### Architecture

The counterpoint engine lives in `lib/arranger/counterpoint/` (new directory):

```
lib/arranger/counterpoint/
  rules.ts         — consonance check, motion type, parallel 5th/8th detection
  cantus.ts        — melody analysis: Pillar Notes, Waypoints, form detection
  first-species.ts — 1:1 bass generator
  second-species.ts — 2:1 bass generator (passing tones)
  third-species.ts  — 4:1 inner voice (arpeggiated)
  fourth-species.ts — suspension generator
  free.ts           — 5th species: mixed, form-aware
  imitation.ts      — motivic imitation engine
  index.ts          — exports `generateCounterpoint(request, cpMode)`
```

The API route (`api/arrange/route.ts`) adds counterpoint modes to the existing mode list and dispatches to `generateCounterpoint` when a CP mode is requested.

---

### 2A — Rules Module (`rules.ts`)

**What it implements:**
- `isConsonant(interval: number): boolean` — {1,3,4,7,8,9,10,12} in semitones → consonant
- `motionType(prev1, curr1, prev2, curr2)` → `'contrary' | 'oblique' | 'similar' | 'parallel'`
- `hasParallelPerfect(prev1, curr1, prev2, curr2): boolean` — detects parallel 5ths and octaves
- `hasVoiceCrossing(upperPitch, lowerPitch): boolean`
- `intervalClass(pitchA, pitchB): number` — semitone distance, reduced to within octave
- `resolvesSuspension(suspendedPitch, resolutionPitch): boolean` — checks stepwise downward resolution

These are pure functions; no I/O. Used by all species generators.

---

### 2B — Melody Analysis (`cantus.ts`)

**What it implements:**
- `analyzeMelody(melody: NoteEvent[], chords: ChordEvent[], timeSignature)` returns:
  ```typescript
  {
    pillarNotes: NoteEvent[]       // long notes, phrase peaks, downbeats
    waypoints: NoteEvent[]         // phrase boundaries, chord changes, repeated notes
    form: 'period' | 'sentence' | 'binary' | 'ternary' | 'through-composed' | 'unknown'
    phrases: { start: number; end: number; cadence: 'PAC' | 'IAC' | 'HC' | 'DC' }[]
    basicIdea: NoteEvent[]         // first 2-bar melodic cell
    harmonicRhythm: 'slow' | 'medium' | 'fast' | 'accelerating'
  }
  ```
- **Form detection:** identify phrase boundaries by cadence position; classify period/sentence by comparing antecedent/consequent lengths and cadence types
- **Pillar note detection:** notes with duration ≥ 1 beat, downbeat position, or phrase peaks (local pitch maxima)
- **Harmonic rhythm:** count chord changes per measure → classify

---

### 2C — First Species (`first-species.ts`)

**What it generates:** One bass note per melody note. Every bass note consonant with melody. Prefer contrary motion. Prefer open strings (DADGAD: D2, A2, D3).

**Algorithm:**
```
For each melody note M at beat B:
  1. Get active chord tones at beat B
  2. Candidate pitches = chord tones in bass register (MIDI 28–57)
  3. Filter: intervalClass(candidate, M.pitch) ∈ consonant set
  4. Filter: no parallel 5ths/8ths with previous bass→melody pair
  5. Filter: no voice crossing
  6. Score candidates:
     - +3 if open string in current tuning
     - +2 if contrary motion from previous bass note
     - +1 if stepwise motion
     - -1 if leap > 5th
  7. Pick highest score; if tie → prefer nearest open string
  8. If no candidate: use closest passing tone to next consonance (flagged as NCT)
```

**Output:** `NoteEvent[]` for the bass voice, all with `voice: 'bass'`

---

### 2D — Second Species (`second-species.ts`)

**What it generates:** Two bass notes per melody note (half the duration each). Strong-beat note = consonant; weak-beat note = passing tone (may be dissonant).

**Algorithm:**
```
For each melody note M spanning beats B to B+dur:
  Strong beat note: same as 1st species algorithm
  Weak beat note:
    1. Target = next strong-beat consonance
    2. Passing tone = pitch between strong-beat notes (stepwise approach)
    3. If stepwise connection exists: use it (may be dissonant)
    4. Else: use another chord tone consonant with M
```

**Special case:** At cadence points (detected Waypoints with PAC/HC), the weak-beat note should set up the cadential bass motion (usually approach the dominant or tonic by step).

---

### 2E — Fourth Species — Suspensions (`fourth-species.ts`)

**What it generates:** Bass (or inner voice) tied across bar lines to create suspensions on strong beats.

**Algorithm:**
```
For each phrase-ending Waypoint W (PAC or HC):
  1. Find the beat before W's downbeat
  2. Candidate suspension pitch = pitch that is:
     a. Consonant with the beat-before chord
     b. Dissonant with the arrival chord at W (creates suspension)
     c. Resolvable downward by step to a consonance in the arrival chord
  3. If candidate found:
     - Set note at beat-before as tie start (tie: true)
     - Set note at W's downbeat as suspended (same pitch)
     - Set note after W as resolution (pitch - 1 or 2 semitones)
  4. Check fretboard: tied note must be holdable without releasing
```

**Common suspensions to prioritize:** 4-3 (most idiomatic), 7-6, 9-8. Documented in `ARRANGEMENT_ENGINE_KNOWLEDGE.md §3.4`.

---

### 2F — Free Counterpoint (`free.ts`)

**What it generates:** Mixed 1st/2nd/4th species, selected per phrase based on form analysis.

**Form-aware selection rules:**
```
Presentation phase (sentence) / Antecedent (period):
  → 1st species bass + sparse inner voice

Continuation / Consequent:
  → 2nd species bass (more movement)
  → Inner voice: 3rd species passing tones

Pre-cadential (last 2 beats before Waypoint with PAC):
  → 4th species: attempt suspension if fingerable
  → If not: 2nd species approach to cadence

Cadence arrival:
  → 1st species: perfect consonance (P5 or octave)
```

---

### 2G — Imitation Engine (`imitation.ts`)

**What it generates:** A second melodic voice (inner or bass) that echoes the Basic Idea from the melody analysis, delayed by 1–4 beats.

**Algorithm:**
```
1. Extract Basic Idea (BI) from cantus.ts analysis
2. Determine delay (1, 2, or 4 beats) — try each, check for parallel 5ths at overlap
3. Transpose BI to consonant pitch (try at 5th below, 4th below, 3rd below)
4. Check: at every beat where BI overlaps with melody, intervalClass is consonant
5. Check: no parallel 5ths or octaves at any overlap beat
6. If valid: place BI in inner voice at selected delay and transposition
7. Fill remaining beats with 1st species consonances
```

**UI label:** "Imitation" as its own arrangement mode option

---

### 2H — API + UI Integration

**API changes (`api/arrange/route.ts`):**
- Add new mode values: `'first-species' | 'second-species' | 'third-species' | 'fourth-species' | 'free-counterpoint' | 'three-voice' | 'four-voice' | 'imitation'`
- Dispatch to `generateCounterpoint(request, mode)` for CP modes
- Return same `Arrangement` shape — solver still handles fretboard placement

**UI changes (`app/arranger/page.tsx`):**
- MODES array extended with counterpoint modes section (visually separated from chord-first modes)
- Label group: "Chord-First" and "Counterpoint" as section headers in the texture picker
- Voice toggle (from Phase 1A) becomes especially useful here — e.g. 1st species shows only Melody + Bass

---

## 4. Phase 3 — AI Collaborator

> **Goal:** A chat panel on the arranger page where the user gives natural language instructions (typed or spoken) and the AI edits the current arrangement, explains what it changed, and re-renders.

### Architecture

```
User instruction (text or mic)
  ↓
Client: POST /api/arrange/ai-edit
  Body: { instruction, arrangement, melody, chords, tuning, context }
  ↓
Server: call Claude (via CLI subprocess) or DeepSeek API
  Prompt: knowledge framework summary + current arrangement JSON + instruction
  Expected output: { edits: VoiceEdit[], explanation: string }
  ↓
Server: apply edits to NoteEvent[] → re-run fretboard solver → return new Arrangement
  ↓
Client: update arrangement state → AlphaTabViewer re-renders
  ↓
Client: show explanation in chat panel
```

### 4A — API Route (`api/arrange/ai-edit/route.ts`)

**Request body:**
```typescript
{
  instruction: string         // natural language from user
  arrangement: Arrangement    // current arrangement
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
  selectedVoices: VoiceType[] // what's currently visible
}
```

**LLM prompt structure:**
1. System prompt: condensed version of `ARRANGEMENT_ENGINE_KNOWLEDGE.md` cross-language table + AI collaborator vocabulary (§10 of knowledge doc)
2. Context: current arrangement as NoteEvent[] per voice (JSON)
3. Instruction: the user's request
4. Output format: structured JSON `{ edits, explanation }`

**Edit schema:**
```typescript
interface VoiceEdit {
  voice: VoiceType
  measures: number[]           // which measures to change (1-indexed)
  action: 'add-passing-tone' | 'add-suspension' | 'remove-voice' | 'change-species'
           | 'add-imitation' | 'change-register' | 'add-pedal' | 'replace-notes'
  params: Record<string, unknown>  // action-specific parameters
  explanation: string          // what this specific edit does
}
```

**Response:**
```typescript
{
  arrangement: Arrangement     // new arrangement after edits applied
  explanation: string          // full explanation for the chat panel
  techniqueName: string        // e.g. "4-3 suspension", "passing tone", "pedal point"
  amfVocabulary: string        // e.g. "Resolving Anchor, Tension → Grounded"
  listenFor: string            // e.g. "the B♮ in the bass on beat 1 of bar 3"
}
```

---

### 4B — Chat Panel Component (`components/arranger/AiCollaborator.tsx`)

**Layout:** Right-side panel (collapsible) or bottom drawer on the arranger page.

**Elements:**
- Conversation thread (user messages + AI responses with explanation cards)
- Input area: text field + microphone button (side by side)
- "Clear conversation" button
- Loading state while AI processes

**Explanation card format:**
```
┌─────────────────────────────────────┐
│ 🎼 4-3 Suspension                   │
│ AMF: Resolving Anchor               │
│ ─────────────────────────────────── │
│ Added a 4-3 suspension at the end   │
│ of bar 4: the bass holds G♮ across  │
│ the bar line, creating tension      │
│ against the D chord, then resolves  │
│ down to F# on beat 2.               │
│ ─────────────────────────────────── │
│ 👂 Listen for: the held G in the    │
│    bass at bar 4, beat 1            │
└─────────────────────────────────────┘
```

---

### 4C — Voice Input

**Tech:** Browser Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`).

**Implementation:**
- Microphone button in the input area
- On click: start `SpeechRecognition`, show recording indicator
- On result: populate text field with transcript, auto-submit
- AI does not talk back (text-only responses, per user preference)
- Fallback: if Web Speech API unavailable (some browsers), show "type instead" message

**No external transcription API needed** — Web Speech API is built into Chrome, Edge, and Safari. Works client-side with no server call for transcription.

---

### 4D — LLM Routing

Per the existing model routing policy (from `feedback_workflow_model_routing.md`):
- Orchestration / synthesis: Claude (via CLI subprocess)
- Code generation / structured output: DeepSeek API

For the AI collaborator specifically:
- The arrangement edit task requires deep musical knowledge and careful structured output → **Claude (Sonnet or Opus depending on complexity)**
- The prompt is <4K tokens (condensed knowledge framework + arrangement JSON) → Sonnet is sufficient for most instructions; escalate to Opus for multi-voice complex edits

---

## 5. Phase 4 — VexFlow Interactive Notation

> **Goal:** Replace AlphaTab's black-box SVG rendering with VexFlow, giving us full control over note styling and click interactivity. AlphaTab's MIDI player is evaluated for replacement vs. retention.

### Why VexFlow

- SVG output we own: every note head is an addressable DOM element
- Click on a note → show di-chord, voice name, Orbit, species label, emotional coordinate
- Color notes by voice (Melody=blue, Bass=green, Inner=amber, Drone=purple) — the AMF visual language
- Hover over a suspension → show "4-3 Suspension" label inline
- Mark Waypoints, Pillar Notes, and cadence points with visual indicators
- Future: click to select a note and give the AI collaborator a target ("fix this note")

### Migration Plan

**New component: `components/arranger/VexFlowViewer.tsx`**
- Accepts the full `Arrangement` object (not just alphatex string)
- Renders using VexFlow's Stave + Voice + StaveNote API
- Colors note heads by `note.voice`
- Adds click handlers via SVG event listeners

**Parallel operation:**
- Both `AlphaTabViewer` and `VexFlowViewer` coexist during migration
- A toggle in the arranger UI: "Notation: AlphaTab | VexFlow (beta)"
- AlphaTab stays as fallback and retains MIDI playback responsibility

**MIDI playback options after migration:**
- **Option A:** Keep AlphaTab running headlessly (no visible render) for MIDI only — render audio from alphatex, sync playback cursor with VexFlow rendering. Complex but keeps high-quality soundfont playback.
- **Option B:** Switch to Tone.js + soundfont.js for playback. Pure JS, full control, can sync directly with VexFlow cursor. Less battle-tested for complex notation.
- **Decision:** Evaluate at migration time. Try Option A first (keep AlphaTab for audio); fall back to Tone.js if synchronization is unworkable.

### Interaction Layer

When a note is clicked in VexFlow:
```
onClick(note: GuitarNote):
  1. Compute intervalClass(note.pitch, melodyPitchAtSameBeat) → di-chord number
  2. Look up harmonicity, pulsation quality from Plogger table
  3. Identify voice (melody/bass/inner/drone)
  4. Identify Orbit (Root/Third/Fifth relative to active chord)
  5. Identify species label (passing tone, suspension, chord tone, etc.)
  6. Show annotation panel:
     - Di-chord: #5 (Major 3rd) — imperfect consonance, warm
     - Voice: Inner
     - Orbit: Third (3rd of D major)
     - Emotional coordinate: Floating (imperfect consonance, weak beat)
```

---

## 6. Phase 5 — Player Style Presets

> **Goal:** Style presets that bias the counterpoint engine toward specific players' characteristic approaches. Non-replacing — they're parameter sets for the existing modes.

### Preset Structure

```typescript
interface StylePreset {
  name: string              // "Pierre Bensusan", "Martin Simpson", etc.
  tuningBias: string[]      // preferred tunings for this style
  preferredMode: string     // default arrangement mode
  nctDensity: 'low' | 'medium' | 'high'
  openStringBias: number    // 0-1: how strongly to prefer open strings
  motionPreference: 'contrary' | 'stepwise' | 'mixed'
  suspensionFrequency: 'rare' | 'moderate' | 'frequent'
  innerVoiceActivity: 'sparse' | 'moderate' | 'dense'
  parallelThirds: boolean   // allow parallel 3rds in inner voice
  modalFlavor: string | null // 'mixolydian' | 'dorian' | null
  description: string
}
```

Presets defined from `ARRANGEMENT_ENGINE_KNOWLEDGE.md §12`.

**UI:** A "Style" dropdown in the arranger controls (above the texture/mode selector). Defaults to "None (balanced)". When selected, biases the mode engine's scoring functions.

---

## 7. Phase 6 — AMF Pedagogy Integration

> **Goal:** Connect the arranger to the broader AMF Musical Universe so arrangements can be used as teaching material within the AMF curriculum.

### Features

**Form analysis display:** After generating an arrangement, show a small form analysis panel:
- Detected form: "Period (parallel)" / "Sentence" / etc.
- Phrase labels: [Antecedent: bars 1-4] [Consequent: bars 5-8]
- Cadence markers: HC at bar 4, PAC at bar 8 — labeled above the notation

**Technique inventory:** After generating, list all counterpoint techniques used:
- "2 passing tones (2nd species)"
- "1 suspension (4-3, bar 7)"
- "Pedal point: D (bars 1-4)"
- "Imitation: bars 5-8, inner voice at 2-beat delay"

**Link to knowledge doc:** Each technique name links to the relevant section of `ARRANGEMENT_ENGINE_KNOWLEDGE.md` (rendered as a readable page at `/arranger/knowledge`).

**Sprint integration:** (deferred — connects to main AMF sprint system) A future "use in practice" button that adds the arrangement to the current AMF sprint's practice materials.

---

## 8. Technical Decisions Log

| Decision | Chosen approach | Rationale |
|----------|----------------|-----------|
| Notation rendering | AlphaTab now; VexFlow in Phase 4 | AlphaTab works today; VexFlow unlocks interactivity when music is rich enough |
| Audio playback | AlphaTab MIDI player (sonivox.sf2) | Already working; re-evaluate in Phase 4 |
| Arrangement persistence | localStorage (Phase 1); PostgreSQL (future) | localStorage is zero-infrastructure for MVP; migrate when multi-device sync needed |
| LLM for AI collaborator | Claude Sonnet via CLI subprocess | Consistent with existing model routing policy; DeepSeek for codegen tasks |
| Voice transcription | Web Speech API (browser-native) | No server cost; no latency; works offline; user prefers mic without having to type |
| Chord-first modes | Preserved unchanged | User confirmed: counterpoint modes are additive, not replacing |
| VexFlow vs. custom SVG renderer | VexFlow | 3-4 week effort vs. 3-4 month for custom; VexFlow is proven and SVG-native |

---

## 9. Open Questions

1. **Library persistence:** When does localStorage become insufficient? (Multi-device sync, cloud backup.) Plan to migrate to PostgreSQL when the user requests it — table schema is in §1B above.

2. **Counterpoint engine: voice assignment for CP modes.** In chord-first modes, all 4 voices (melody/bass/inner/drone) are always generated. In counterpoint modes, the user might want only 2 voices (1st species = melody + bass). Does the solver still run fretboard placement for absent voices, or are they truly absent from the NoteEvent[]? **Decision needed before 2C.**

3. **Fretboard solver compatibility with counterpoint.** The current solver (`solver.ts`) works from chord tones. CP-generated notes might be non-chord tones (passing tones, suspensions). Does the solver handle arbitrary MIDI pitches, or does it filter to chord tones? **Need to verify `solver.ts` before 2C.**

4. **AI collaborator prompt length.** The full knowledge framework is ~1,000 lines. The LLM prompt needs a condensed version. At what detail level does the compressed system prompt stop being useful? **Answer: test empirically when building Phase 3.**

5. **Web Speech API browser support.** Works in Chrome and Edge natively; Safari requires user permission and has quirks; Firefox does not support it. Fallback needed for Firefox users. **Plan: text input always available; mic is an enhancement.**

6. **Phase ordering flexibility.** Phase 2 (counterpoint) and Phase 3 (AI collaborator) are somewhat independent. The AI collaborator can work with chord-first arrangements before the counterpoint engine exists — it just has fewer techniques to apply. **Can build Phase 3 in parallel with Phase 2 if desired.**

---

*Document version: 1.0 — July 2026*
*Owner: AMF Arranger development*
*Related: `docs/ARRANGEMENT_ENGINE_KNOWLEDGE.md`, `lib/arranger/`, `app/arranger/`*
