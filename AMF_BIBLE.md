# The AMF Bible
## Complete Agent Handoff — Everything You Need to Continue Building

**Last updated:** 2026-06-12  
**Author:** Elderle (founder) + Claude (co-builder)  
**GitHub:** https://github.com/epaulson2/amf-app  
**Live site:** https://amf.elderle.app  
**Server:** 157.245.112.66

> **If you are a new AI agent picking this up:** Read this entire document before writing a single line of code. This is the one-stop reference for the AMF project — philosophy, architecture, what's been built, what's pending, technical environment, and non-negotiable design rules. Everything you need is here.

---

## Table of Contents

1. [What AMF Is](#what-amf-is)
2. [The Philosophy — Why AMF Exists](#the-philosophy)
3. [The Architecture](#the-architecture)
4. [The Di-Chord System](#the-di-chord-system)
5. [The Four Chambers](#the-four-chambers)
6. [The Synthesizer](#the-synthesizer)
7. [Sprint Structure & Mastery Gates](#sprint-structure)
8. [The 12-Sprint Map](#the-12-sprint-map)
9. [The 14 Core Progressions](#the-14-core-progressions)
10. [Teaching Style & Voice](#teaching-style)
11. [Non-Negotiable Design Rules](#design-rules)
12. [What We've Built — Sprint 1 Complete](#what-weve-built)
13. [The Web App](#the-web-app)
14. [The Asset Knowledge Base](#the-asset-knowledge-base)
15. [Source Materials](#source-materials)
16. [Technical Environment](#technical-environment)
17. [What's Pending — The Roadmap](#whats-pending)
18. [Key File Paths](#key-file-paths)
19. [Model Routing](#model-routing)
20. [Anti-Patterns — What NOT to Do](#anti-patterns)

---

## What AMF Is

The **Adaptable Musician's Framework (AMF)** is a mastery-gated music education system for adult returning musicians learning guitar and piano simultaneously. It is not a course with lessons — it is a structured framework for developing genuine musical fluency, organized around 12 sprints (roughly one month each, but time is a guide, not a contract).

AMF is built for adults who have tried conventional instruction and found it:
- **Too slow** — grinding through theory exercises that never connect to real songs
- **Too fragmented** — separate lessons for theory, ear training, rhythm, and repertoire that never cohere
- **Too dependent** — always needing a teacher to say what comes next

The problem AMF solves is not a lack of content. The problem is that conventional instruction teaches components in isolation. Students accumulate disconnected skills that don't combine into musical fluency. They can play exercises but can't improvise. They know chord names but can't hear when a progression changes.

**The founding insight:** The same perceptual vocabulary that trains melodic ear training at the interval level also describes how chord roots move. When a bass walks from I to IV, the root moved a perfect fourth — that's a [5] di-chord. The Musical OS (perception layer) and the Harmony Chamber (chord movement) are the same ear trained at different magnification. This single insight collapses the artificial separation between theory and ear work and becomes the architectural spine of the entire curriculum.

---

## The Philosophy

### The North Star

**"The framework disappears."**

Every design decision, every exercise, every sprint exists to help students eventually internalize the system so completely they no longer need it. A student who has internalized the AMF does not think about the framework when making music. They hear a chord change and feel the root movement before labeling it. They choose a melody note because it sounds right, not because a zone chart told them to.

### Four Ways AMF Differs

1. **Mastery-gated, not time-gated.** No lesson schedule. You advance when you *own* a skill — when it meets all five mastery criteria. Some sprints take three weeks. Some take six. Both are correct.

2. **All chambers from day one.** Melody, Harmony, Voicings, and Rhythm run in parallel from Sprint 1. There is no "finish theory before you start playing." Every practice session touches all four chambers.

3. **Perception before nomenclature.** You hear a di-chord before you name it. You feel a root movement before you label it with a Roman numeral. Naming follows perception, never precedes it. The order is: **hear → sing → name → play.**

4. **Progressions are emergent, not taught.** Common progressions like I-IV-V-I are not lesson units. They are proof exercises that emerge naturally when enough individual root movements are owned. The spine is the 14 di-chord root movements, not the progressions built from them.

### Perception-First Learning

The order is non-negotiable: **hear, then sing, then name, then play.** Never the reverse. A student drills a di-chord by listening repeatedly, feeling its character, describing it in words, singing it, and only then identifying it by bracket notation. Bracket notation is shorthand for a sound already known, not a starting definition.

---

## The Architecture

```
┌──────────────────────────────────────────────────────┐
│                THE ADAPTABLE MUSICIAN'S               │
│                    FRAMEWORK (AMF)                     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  THE MUSICAL OS (Plogger Method)                     │
│  ── perceptual foundation: di-chords, pulsation,     │
│     harmonicity, Pictograph, Tracking Page            │
│  ── present in EVERY session: isolated in S1,         │
│     perceptual lens woven through S2-S4               │
│                                                       │
│  ┌────────────┬────────────┬──────────┬────────────┐ │
│  │  MELODY    │  HARMONY   │ VOICINGS │  RHYTHM    │ │
│  │  Chamber   │  Chamber   │ Chamber  │  Chamber   │ │
│  │            │            │          │            │ │
│  │  4 Zones   │ 14 Root    │ Drop 2   │ Binary     │ │
│  │  Tension   │ Movements  │ Shell    │ Grid       │ │
│  │  Arc       │ 14 Progr.  │ Quartal  │ Son Clave  │ │
│  │  Gesture   │ 12+2 Spine │ Spread   │ Longy      │ │
│  └──────┬─────┴──────┬─────┴────┬─────┴──────┬─────┘ │
│         │            │          │            │       │
│         └────────────┴────┬─────┴────────────┘       │
│                           │                           │
│              THE SYNTHESIZER (Section 5)              │
│              ── 8 min daily: ALL chambers at once     │
│              ── "the framework disappears"            │
│                                                       │
│  SPIRAL THREADS (permanent, always advancing):        │
│  di-chord ear · keyboard viz · Longy rhythms ·        │
│  melody zones · Rhythm Code groove · Lap Map          │
└──────────────────────────────────────────────────────┘
```

### The Three Books (Output Products)

1. **The Adaptable Musician's Framework** (textbook) — knowledge, theory, examples, *why*
2. **AMF Daily Practice Manual** — 12 monthly sprints, daily sessions, *how to practice*
3. **AMF Workbook** — companion journal, analysis pages, self-assessment, fill-in templates

Each sprint produces a mini-textbook and a practice plan + workbook. Sprint 1's versions are complete and live.

### Naming Conventions

| Old Name | Current Name |
|----------|-------------|
| Melody OS, Harmony OS, etc. | **Chambers** (Melody Chamber, Harmony Chamber, etc.) |
| The Plogger Method (as a layer) | **The Musical OS** |
| Convergence / synthesis work | **The Synthesizer** |
| Full system | **AMF** (Adaptable Musician's Framework) |

---

## The Di-Chord System

A **di-chord** is a single perceived interval between two notes — the atomic unit of the Plogger perceptual system. Di-chords are written with bracket notation: [1] through [11]. Each has three defining properties:

### Three Sound Factors

1. **Pulsation** — The interference beating when two notes sound together.
   - 8 Hz (Dissonant): [1] [2] [6] [10] [11] — fast, restless, tense
   - 4 Hz (Modal): [3] [4] [8] [9] — medium, warm
   - 2 Hz (Perfect): [5] [7] — slow, stable

2. **F/O Factor (Shadow Direction)** — Which way the interval "refers."
   - Refers DOWN ↓: [1]–[5]
   - Refers BOTH ↕: [6]
   - Refers UP ↑: [7]–[11]

3. **Harmonicity (Color)** — How fused the two notes sound.
   - Harmonic (open, light): [2] [4] [7] [9] [10]
   - Non-harmonic (closed, dark): [1] [3] [5] [8] [11]
   - Neutral: [6]

### Complete Di-Chord Reference

| Bracket | Interval | Semi | Pulsation | Harmonicity | Feel |
|---------|----------|------|-----------|-------------|------|
| [1] | Minor 2nd | 1 | 8 Hz | Very low | Harsh, biting, maximum tension |
| [2] | Major 2nd | 2 | 8 Hz | Low | Buzzy, energetic, wants to move |
| [3] | Minor 3rd | 3 | 4 Hz | Medium | Warm, shadowed — the minor sound |
| [4] | Major 3rd | 4 | 4 Hz | Med-high | Bright, warm — the major sound |
| [5] | Perfect 4th | 5 | 2 Hz | High | Open, reaching, suspended |
| [6] | Tritone | 6 | 8 Hz | Very low | Maximum harmonic tension |
| [7] | Perfect 5th | 7 | 2 Hz | High | Hollow, stable, farthest stable reach |
| [8] | Minor 6th | 8 | 4 Hz | Medium | Dark, tender — minor from below |
| [9] | Major 6th | 9 | 4 Hz | Med-high | Bright, lifting — emotional openness |
| [10] | Minor 7th | 10 | 4 Hz | Med-low | Incomplete, longing — wants resolution |
| [11] | Major 7th | 11 | 8 Hz | Low | Bright tension — close to octave |

### The Pictograph

The Di-Chord Pictograph is a visual glyph system where each di-chord has a distinct shape. Shape = pulsation class. Shadow direction = F/O factor. Fill color = harmonicity. These are visual anchors for perceptual identities, not notation.

---

## The Four Chambers

All four chambers run from Sprint 1. There is no sequence. Each chamber has its own source material and vocabulary, but they all build on the Musical OS foundation.

### Chamber 1 — Melody

**Source:** Emotional Melody Map  
**What it teaches:** How melody notes relate to underlying harmony.

- **Zone 1:** Chord tones (root, 3rd, 5th) — most stable, resolved
- **Zone 2:** Passing/neighbor tones between chord tones — mild tension
- **Zone 3:** Scale tones creating tension against harmony — active tension
- **Zone 4:** Chromatic/non-diatonic tones — maximum color and tension

**Key concepts:** Tiny Tension Arc (Z1→Z1→Z2→Z1 = fundamental hook DNA), Chord-Change Behaviors (Stay Sweet, Turn Tense, Float Free, Sink Deeper), 5 Key Notes Framework, Duration Amplifies Zone, 8-Step Melody Audit, Zone Distribution Ratios by section.

### Chamber 2 — Harmony

**Source:** Harmony OS, Beato Book  
**What it teaches:** How chords move — root movements as di-chord intervals.

- **Harmonic root movement** = the di-chord between successive chord roots (the atomic learning unit)
- **14 progressions** = assemblies of owned root movements, not lesson units
- One di-chord root movement per sprint (Sprints 2–8)
- ii-V-I is a **drill vehicle**, NOT the harmonic spine

### Chamber 3 — Voicings

**Source:** Voicings OS, Beato Book  
**What it teaches:** How to voice chords on both instruments.

- Root position → inversions → shell voicings → Drop 2 → spread → quartal
- Guitar: open chords → barre → CAGED → triad inversions by stringset
- Piano: block chords → shells → rootless voicings → voice leading

### Chamber 4 — Rhythm

**Source:** The Rhythm Code  
**What it teaches:** Rhythmic feel and groove construction.

- **8-position grid** — each measure as 8 binary positions
- **Stops and anticipations** — rhythmic devices
- **Son Clave** — the spiral thread endpoint for groove
- **Longy rhythms** — parallel track for notation/reading (ta, ta-te, etc.)
- **Lap Map** (from Plogger Ch.5) — physical silent practice method

---

## The Synthesizer

Section 5 of every daily session. 8 minutes. All four chambers running simultaneously:

- **Melody:** Improvise using conscious zone choices
- **Harmony:** A progression built from owned root movements
- **Voicings:** Those movements voiced with appropriate chord types
- **Rhythm:** All played with internalized groove feel

Placed last deliberately — S1-S4 drill components; S5 asks "can you make music with what you worked on today?" Over time, the four systems collapse into a single musical act. That collapse is the point of the entire curriculum.

---

## Sprint Structure

### What a Sprint Contains

- One **Gate A** (harmonic root movement — one di-chord to own)
- One **Gate B** (Plogger chapter group)
- All six spiral threads advancing by one step
- One anchor song threaded through all five practice sections
- Two deliverables: mini-textbook + practice plan/workbook

### The Five Mastery Criteria (Stage 3)

A skill is "owned" only when ALL five are met:

1. Correct without hesitation at musical tempo
2. Demonstrated on both instruments
3. Demonstrated in at least 3 keys
4. Identified by ear in real music in real time, without preparation
5. Used expressively — not just reproduced academically

### Stage Labels

- **Stage 1 (Discovering):** First contact. Errors expected and correct. Do not stop.
- **Stage 2 (Consolidating):** Sometimes correct. Slow, deliberate. "I can do it slowly" = Stage 2. This is NOT the gate.
- **Stage 3 (Fluent):** Always correct, at tempo, without conscious attention. This IS the gate.

### Daily Practice Session (60 min)

| Section | Time | Purpose |
|---------|------|---------|
| S1 — Plogger Foundation | 10 min | Isolated di-chord ear training |
| S2 — Integrated Work | 18 min | Both instruments, technique + ear + rhythm blended |
| S3 — Song Work | 14 min | Anchor song — learn, analyze, play at tempo |
| S4 — Free Play | 10 min | Structured improvisation |
| S5 — The Synthesizer | 8 min | All four chambers simultaneously |

---

## The 12-Sprint Map

| Sprint | Di-Chord | Movement | Plogger Chapters | Anchor Song | Phase |
|--------|----------|----------|------------------|-------------|-------|
| 1 | — (orientation) | None | Ch.1–3 | Ain't No Sunshine | Foundation |
| 2 | [5] P4 | I→IV, V→I | Ch.3 (complete), Ch.4 | Stand By Me | Foundation |
| 3 | [7] P5 | I→V | Ch.5, Ch.6 | TBD | Foundation |
| 4 | [2] M2 | IV→V, V→vi | Ch.7, Ch.8, Ch.9 (start) | 12-Bar Blues | Foundation |
| 5 | [3] m3 | I→vi | Ch.9 (complete), Ch.10, Ch.11 | TBD | Development |
| 6 | [9] M6 | vi→IV | Ch.12, Ch.13, Ch.14 | TBD | Development |
| 7 | [4] M3 | I→iii | Ch.15, Ch.16 | TBD | Development |
| 8 | [6] Tritone | V7→I resolution | Ch.17, Ch.18 | TBD | Development |
| 9 | — | Review + classical | Ch.19, Ch.20 | TBD | Integration |
| 10 | — | Advanced voicings | Ch.21, Ch.22 | TBD | Integration |
| 11 | — | Heptachord shift | Ch.23, Ch.24 | TBD | Integration |
| 12 | — | Transposition + synthesis | Ch.25 + Appendices | TBD | Integration |

### Build Phases

| Phase | Sprints | Status |
|-------|---------|--------|
| 1 — Foundation | 2–4 | **NEXT** — not started |
| 2 — Development | 5–8 | Not started |
| 3 — Integration | 9–12 | Not started |
| 4 — Book Assembly | Compile all sprints | Not started |

---

## The 14 Core Progressions

These are NOT lesson units. They are proof exercises — assemblies of individually owned root movements.

| # | Progression | Movements | Sprint |
|---|-------------|-----------|--------|
| 1 | I–IV–V–I | [5]+[2]+[5] | 2 |
| 2 | I–V–vi–IV | [7]+[3]+[9] | 2 |
| 3 | 12-Bar Blues | [5]+[5]+[2] | 3 |
| 4 | ii–V–I | [5]+[5] | 4 |
| 5 | I–vi–IV–V | [3]+[9]+[2] | 4 |
| 6 | vi–IV–I–V | [9]+[3]+[7] | 5 |
| 7 | I–IV–I–V | [5]+[5]+[7] | 5 |
| 8 | Modal Vamp | single held | 6 |
| 9 | Circle of 5ths descent | all [5] | 6 |
| 10 | i–IV–i–V (harmonic minor) | [5] in minor | 7 |
| 11 | Andalusian (i–bVII–bVI–V) | [2] movements | 7 |
| 12 | Minor ii–V–i | [5]+[5] minor | 8 |
| 13 | Classical cadence (strict) | [5]+[2]+[5]+VL | 9 |
| 14 | Neapolitan/bII | [6] tritone | 9 |

---

## Teaching Style

### Voice and Tone

- **Direct and honest.** No motivational fluff. "Your chord changes will buzz. This is correct."
- **Confidence without condescension.** The student is an adult. They can handle "this will be hard."
- **Stage labels are clinical, not judgmental.** Stage 1 ≠ failure. Stage 2 ≠ mediocre. Stage 3 = the gate.
- **Exercises describe what to do, not why to be motivated.** "Play Am. Strike on position 1. Count through 2-8." Not "Try to get excited about the Am chord!"
- **"Good" and "Stuck" diagnostics** after every major exercise — what correct behavior looks like vs. what getting stuck looks like, with specific fixes.

### Content Principles

- **Bracket notation always.** Write [5] not "perfect fourth." Never use interval names alone without the bracket number. Exception: classical analysis context.
- **Stage-label every exercise.** "This is Stage 1 territory" tells the student exactly what to expect.
- **Anchor song threads everything.** It is not a separate activity — it appears in S1 (ear training context), S2 (integrated work), S3 (song work), S4 (free play), and S5 (synthesis). Every section references the same song differently.
- **Two instruments, always.** Every exercise has a guitar version and a piano version. Never one without the other.
- **No country** in repertoire or examples. Genre-agnostic framing: jazz, soul, folk, classical, pop, Latin, R&B.
- **Errors are data, not problems.** "You confuse [3] and [4] and then hear the difference when you compare. This is exactly right."

---

## Non-Negotiable Design Rules

These are hard rules. Do not violate them.

1. **ii-V-I is a drill vehicle, NOT the harmonic spine.** The 12+2 progression set is the spine. Never let any sprint collapse into ii-V-I focus.

2. **Plogger appears TWICE per session:** isolated in S1 AND as perceptual lens in S2–S4.

3. **Hear/Sing Before You Play** in every exercise, every section.

4. **Few exercises, each multi-layered** — 2–3 exercises per section, each serving 3–4 purposes simultaneously. Not 8 isolated drills.

5. **Anchor song threads every section**, every session. It is not a separate activity.

6. **"The framework disappears"** is the north star. Everything points here.

7. **All 12+2 progressions** distributed across 12 sprints. No progression gets disproportionate spotlight.

8. **No country** in repertoire or examples.

9. **Di-chord brackets always** — [5] not "perfect fourth."

10. **Label every exercise with its Stage (S1/S2/S3).**

11. **Mastery over pace** — sprint calendar is a guide, not a contract.

12. **Non-diatonic callout boxes** whenever a non-diatonic note or progression appears.

---

## What We've Built — Sprint 1 Complete

### Sprint 1 Documents (all live on the web app)

| Document | URL | Description |
|----------|-----|-------------|
| Asset Gallery | `/materials/sprint1` | All 11 visual assets with category filter, iframe preview, fullscreen modal |
| Mini-Textbook | `/materials/sprint1/textbook` | Full Sprint 1 textbook: 6 Parts, embedded assets, source readings, 28-day reading schedule |
| Practice Plan & Workbook | `/materials/sprint1/practice` | Two-tab layout: 4-week practice plan (all 5 sections per week) + 7 workbook fill-in pages |
| Cheat Sheets | `/materials/sprint1/cheatsheets` | 12 quick-reference cards with all visual assets: di-chords, zones, rhythm grid, stages, gates |

### The 11 Sprint 1 Visual Assets

All at `/public/assets/sprint1/` and served as `/assets/sprint1/*.html`:

| ID | File | Description |
|----|------|-------------|
| R1 | `R1_focus_card_3_4.html` | [3]/[4] focus card — the sprint's core reference |
| R2 | `R2_pictograph_reference.html` | Full 11-di-chord pictograph chart |
| R3 | `R3_pulsation_diagram.html` | Pulsation wave diagram (8Hz/4Hz/2Hz) |
| R4 | `R4_sound_factors_reference.html` | Complete sound factors table (all 3 properties × 11 di-chords) |
| E1 | `E1_zone1_guitar_fretboard.html` | Zone 1 guitar fretboard map |
| E2 | `E2_zone1_piano_keyboard.html` | Zone 1 piano keyboard map |
| E3 | `E3_root_movement_preview.html` | Di-chord → root movement bridge diagram |
| O1 | `O1_aint_no_sunshine_analysis.html` | Ain't No Sunshine full analysis sheet |
| O2 | `O2_rhythm_grid_card.html` | 8-position rhythm grid card |
| O3 | `O3_hear_sing_name_cycle.html` | Hear → Sing → Name workflow diagram |
| O4 | `O4_daily_session_map.html` | Daily session map (5 sections visual) |

### Asset Placement Map

Full placement map at `docs/sprint1_asset_placement.md` — specifies exactly which assets appear in which section of which document. Follow this for every sprint build.

### Sprint 1 PDFs

- `public/sprint1_textbook.pdf` (159KB, 10 A4 pages)
- `public/sprint1_practice.pdf` (301KB, 11 A4 pages)
- Download: `http://157.245.112.66:8100/sprint1_amf.zip`

### Sprint 1 Content Summary

- **Plogger Chapters:** Ch.1 (Three Stages), Ch.2 (Three Causes of Error), Ch.3 (Keyboard Visualization start)
- **Di-Chord Focus:** [3] (minor third) and [4] (major third) — discrimination, singing, naming
- **Melody:** Zone 1 only (chord tones: root, 3rd, 5th)
- **Harmony:** Am-G-Em progression, root movement orientation
- **Voicings:** Root position triads, open guitar shapes (Am, G, Em, Dm), piano Zone 1 block chords
- **Rhythm:** 8-position grid, positions 1 and 5 as skeleton, stops and anticipations
- **Anchor Song:** Ain't No Sunshine (Bill Withers, A minor)
- **Gates:** Gate B = [3]/[4] discrimination 10/10 + singing from any pitch. Performance gate = Ain't No Sunshine on both instruments, no stops, recognizable.

---

## The Web App

### Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Port:** 3099 (dev), 3010 (prod)
- **Deploy:** `npm run build` → `sudo systemctl restart amf-app`
- **Service:** `amf-app.service` (systemd)
- **Public URL:** `https://amf.elderle.app` (nginx proxy to port 3010)

### Site Structure

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/systems` | Systems overview |
| `/genre-labs` | Genre labs |
| `/curriculum` | Curriculum pages by semester |
| `/materials` | Materials hub |
| `/materials/sprint1` | Sprint 1 asset gallery |
| `/materials/sprint1/textbook` | Sprint 1 mini-textbook |
| `/materials/sprint1/practice` | Sprint 1 practice plan & workbook |
| `/materials/sprint1/cheatsheets` | Sprint 1 cheat sheets |
| `/practice` | Practice page |
| `/pedagogy` | Pedagogy page |
| `/technology` | Technology docs |

### Page Design Patterns

- **Hero:** Dark background (#0f172a), rainbow gradient rule at bottom
- **Layout:** Two-column on desktop: `lg:grid lg:grid-cols-[220px_1fr]` with sticky TOC nav
- **Asset embeds:** iframe in styled container with header bar + "Open full ↗" link
- **Color system:**
  - Dissonant: dark red (#922B21)
  - Modal: dark purple (#5B2C6F)
  - Perfect: dark green (#1E8449)
  - Week 1: blue, Week 2: green, Week 3: amber, Week 4: purple
  - S1: blue, S2: green, S3: amber, S4: purple, S5: teal
- **Container:** `max-w-5xl mx-auto px-6`
- **Print CSS:** Always include (hide nav, fix colors, avoid iframe breaks)

### Component Helpers (from textbook page — reuse in all sprint pages)

```tsx
const BC = ({ children }) => (
  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
)

function Asset({ file, title, height = 480 }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100" style={{ background: '#f8fafc' }}>
        <span className="text-xs font-bold text-slate-600">{title}</span>
        <a href={`/assets/sprint1/${file}`} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Open full ↗</a>
      </div>
      <iframe src={`/assets/sprint1/${file}`} className="w-full border-none" style={{ height }} title={title} />
    </div>
  )
}
```

### Asset iframe heights (Sprint 1)

R1=380, R2=600, R3=400, R4=500, E1=480, E2=400, E3=380, O1=700, O2=580, O3=360, O4=420

---

## The Asset Knowledge Base

### PostgreSQL Database: `amf_assets`

- **Connect:** `sudo -u postgres psql -d amf_assets`
- **177 assets** in `asset_registry` across all tiers
- **17 data tables** populated (Phases 1–4 complete)
- **45 synthesis candidates** (all status: pending)

### Asset Tiers

| Tier | Description | Count |
|------|-------------|-------|
| Tier 1 (plogger) | Plogger Method — foundational layer | 89 |
| Tier 2 (external) | External sources: Rhythm Code (33), Harmony OS (28), Voicings OS (13), Emotional Map (10), Guitar Theory (4) | 88 |
| Tier 3 (amf_original) | Synthesized/bridging/new media | 0 (pending) |

### 10-Phase Pipeline

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Tier 1 sweep — catalog all Plogger assets | **COMPLETE** |
| 2 | Tier 2 sweep — catalog all external assets | **COMPLETE** |
| 3 | DB setup — create PostgreSQL schema | **COMPLETE** |
| 4 | Tier 1 data extraction | **COMPLETE** |
| 5 | Tier 2 data extraction with semantic tags | **NEXT** |
| 6 | Semantic indexing | Not started |
| 7 | Diagram decomposition (Nano Banana JSON specs) | Not started |
| 8 | Image generation from JSON specs | Not started |
| 9 | Tier 3 synthesis | Not started |
| 10 | Query interface | Not started |

---

## Source Materials

All stored at `/home/elderle/queen-city-redline/docs/uploads/`:

| Source | File(s) | Coverage |
|--------|---------|----------|
| Plogger book (p.1–100) | `Book Jun 10, 2026.pdf` | Ch.1–8 |
| Plogger book (p.101–120) | `AMF_Master_Blueprint_Internal_Band_Model_v1_0.pdf` | Ch.9–11 |
| Plogger book (p.121–303) | `Music 2.pdf` through `Music 10.pdf` | Ch.12–25 + Glossary |
| The Rhythm Code | `TheRhythmCode2022-lvqkbv.pdf` | Full book (128 pages) |
| Emotional Map of Melody | `emotional_map_module1.pdf` + cheat sheet | Master module + companion |

### Master Build Reference

`/home/elderle/amf-build-reference.md` — **READ THIS FIRST every session.** Contains:
- Full Plogger chapter-by-chapter reference with page numbers
- All chamber content maps with specific concepts per sprint
- 12-sprint map with anchor songs and chamber focus
- Beato Book blend-in map by sprint
- Design anti-patterns and critical reminders

---

## Technical Environment

| Item | Value |
|------|-------|
| Server | 157.245.112.66 (this server) |
| AMF app directory | `/home/elderle/amf-app/` |
| AMF dev server | `pnpm dev` (port 3099) |
| AMF prod | port 3010, systemd `amf-app.service` |
| Public URL | `https://amf.elderle.app` (nginx → 3010) |
| Build & deploy | `npm run build && sudo systemctl restart amf-app` |
| PostgreSQL | DB: `amf_assets`. Connect: `sudo -u postgres psql -d amf_assets` |
| GitHub | `https://github.com/epaulson2/amf-app.git` |
| Download server | `http://157.245.112.66:8100/` |
| Playwright (PDF) | `/home/elderle/queen-city-redline/node_modules/@playwright/test` |
| Source uploads | `/home/elderle/queen-city-redline/docs/uploads/` |

### Deploy Process

```bash
cd /home/elderle/amf-app
npm run build
sudo systemctl restart amf-app
# Verify: curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/
```

---

## What's Pending — The Roadmap

### Immediate Next (Sprint 2 Build)

1. **Read source materials** — Plogger Ch.3 (complete) + Ch.4 (Longy Rhythms full)
2. **Write Sprint 2 textbook content** — `docs/sprint2_textbook_content.md`
3. **Design Sprint 2 assets** — asset plan, then build HTML assets
4. **Write Sprint 2 practice plan** — `docs/sprint2_practice_plan.md`
5. **Build Sprint 2 web pages** — textbook, practice, cheatsheets at `/materials/sprint2/`
6. **Anchor song:** Stand By Me (Ben E. King, A major, I–vi–IV–V)
7. **Gates:** Gate A = sing/play [5] from any 3 starting notes, identify I→IV vs V→I by ear. Gate B = Tracking Page Steps 1–2 at 120+ BPM, keyboard visualization fluent.

### Broader Roadmap

- **Phase 1 (Sprints 2–4):** Foundation — all four chambers introduced, beginner-complete package
- **Phase 2 (Sprints 5–8):** Development — chamber depth, Drop 2 voicings, pentatonics, shell voicings
- **Phase 3 (Sprints 9–12):** Integration — all progressions, rootless voicings, full Synthesizer, "the framework disappears" exercises
- **Phase 4:** Compile all sprint documents into two finished books
- **Asset DB Phases 5–10:** Tier 2 extraction, semantic indexing, diagram decomposition, image generation, Tier 3 synthesis, query interface
- **Sprint 1 PDFs:** Render all 11 HTML assets to PNG with Playwright, assemble final print-ready PDFs

### Open Design Questions

- Should V→I get its own sprint? (currently Sprint 2 holds both [5] movements)
- Anchor songs for Sprints 3, 5, 6 are TBD
- Mastery gate: does both-instruments requirement mean both must reach Stage 3 simultaneously?
- Plogger chapter pacing under the new slower mastery model

---

## Key File Paths

### Documents & Content Sources

| Path | What It Is |
|------|-----------|
| `/home/elderle/amf-build-reference.md` | **Master build reference** — read first every session |
| `docs/sprint1_textbook_content.md` | Sprint 1 textbook source (13,263 words) |
| `docs/sprint1_practice_plan.md` | Sprint 1 practice plan source (12,553 words) |
| `docs/sprint1_asset_placement.md` | Where each asset goes in each document |
| `docs/sprint1_asset_plan.md` | Sprint 1 asset design plan |
| `docs/kb/INDEX.md` | Knowledge base master index |
| `docs/kb/AMF_SYSTEM.md` | Self-contained system reference |
| `docs/kb/CURRICULUM.md` | Sprint-by-sprint build reference |
| `docs/kb/VOCABULARY.md` | Canonical vocabulary (prevents semantic drift) |
| `AMF_ARCHITECTURE_V2.md` | Living architecture reference |
| `AMF_HANDOFF.md` | Session handoff document |
| `MATERIALS.md` | Emotional Map materials inventory |

### App Code

| Path | What It Is |
|------|-----------|
| `app/materials/sprint1/page.tsx` | Asset gallery (382 lines) |
| `app/materials/sprint1/textbook/page.tsx` | Mini-textbook (~730 lines) |
| `app/materials/sprint1/practice/page.tsx` | Practice plan + workbook (~1074 lines) |
| `app/materials/sprint1/cheatsheets/page.tsx` | Cheat sheets |
| `components/Nav.tsx` | Navigation bar |
| `app/layout.tsx` | Root layout |

### Database & Assets

| Path | What It Is |
|------|-----------|
| `docs/sql/amf_assets_schema.sql` | PostgreSQL schema DDL |
| `docs/PLOGGER_ASSET_MANIFEST.md` | 60 Tier 1 assets catalog |
| `docs/TIER2_ASSET_MANIFEST.md` | 97 Tier 2 assets catalog |
| `docs/SYNTHESIS_CANDIDATES.md` | 29 curated synthesis ideas |
| `docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md` | Fretboard diagram spec |
| `public/assets/sprint1/` | 11 Sprint 1 HTML visual assets |

---

## Model Routing

When using AI agents to build AMF content:

| Task | Model |
|------|-------|
| Reading source books + content synthesis | **Opus** |
| Writing textbook explanations | **Opus** |
| Curriculum/sequencing decisions | **Opus** |
| Building HTML/JSX documents | **Sonnet** |
| CSS, formatting, file I/O | **Sonnet** |
| Page height checks, grep, validation | **Haiku** |

---

## Anti-Patterns — What NOT to Do

### Content Anti-Patterns

1. **Do NOT make ii-V-I the center of anything.** It is a drill vehicle. The 12+2 progression set is the spine.
2. **Do NOT teach progressions as memorized sequences.** They emerge from owned root movements.
3. **Do NOT use interval names without bracket notation.** Write [5] not "perfect fourth."
4. **Do NOT skip stage labels.** Every exercise gets S1, S2, or S3.
5. **Do NOT include country music** in examples or repertoire.
6. **Do NOT call the system "Ploger."** It is **Plogger** (two g's).
7. **Do NOT separate chambers into sequential stages.** All four run from Sprint 1.
8. **Do NOT front-load ii-V-I** into Sprint 2. It belongs in Sprint 4.
9. **Do NOT treat the Tracking Page as a generic progress tracker.** It is a specific Plogger artifact.
10. **Do NOT confuse harmonicity with harmony.** Harmonicity = perceptual fusion (acoustics). Harmony = functional chord usage (theory).

### Technical Anti-Patterns

1. **Do NOT skip `npm run build` before declaring done.** Build errors caught late waste time.
2. **Do NOT forget `sudo systemctl restart amf-app`** after building. The prod site runs the build output, not the dev server.
3. **Do NOT use workflows/multi-agent orchestration for page building.** Sprint 1 pages are large (700–1000+ lines of JSX). Build them directly — workflows choke on content this size.
4. **Do NOT hardcode asset paths differently.** All Sprint 1 assets are at `/assets/sprint1/{filename}.html`. Future sprints follow the same pattern: `/assets/sprint{N}/`.

---

## Git Commits (Sprint 1 Build History)

```
88893ed feat(sprint1): practice plan + workbook page with all assets
d628fa5 feat(sprint1): add 28-day reading schedule
9536df8 feat(sprint1): move source readings to standalone section after intro
a66e4b5 feat(sprint1): mini-textbook page with embedded assets and source readings
2172097 feat(sprint1): add 11 visual assets + /materials/sprint1 gallery page
acfee76 feat(sprint1): add all 11 visual assets (HTML) + asset placement map
91d2dcf feat(sprint1): add Sprint 1 visual asset plan
cb9d5d2 feat(sprint1): add Sprint 1 practice plan + workbook
45755e7 feat(sprint1): add Sprint 1 mini-textbook content
cfd3da5 feat(curriculum): add full year sprint plan
17a40b5 feat(curriculum): add AMF_SYLLABUS.md
```

---

*Adaptable Musician's Framework — The AMF Bible*  
*"The framework disappears."*
