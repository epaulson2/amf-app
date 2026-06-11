# AMF Project Handoff Document
**Session ended:** 2026-06-11  
**Prepared for:** Next session (new model, clean context)  
**Status:** Sprint 1 complete. Ready to build Phase 1 (Sprints 2–4).

---

## Why This Session Ended

Two reasons:

1. **Token budget exhausted.** This session ran to ~254% of its token budget ($12 spent against a $5 target). The session was still functional but bloated — a fresh start is cleaner.

2. **Model routing improvement.** The outgoing session ran entirely on Claude Sonnet 4.6. The founder wants intelligent model routing across the available Claude models — using the right model for each type of task — rather than having Sonnet handle everything. The new session should implement this from the start.

---

## How to Test Model Routing at Session Start

Before doing any content work, verify the routing plan is operational:

**Available models (as of this session):**
- `claude-opus-4-7` — most capable, highest reasoning, best for synthesis and complex pedagogy
- `claude-sonnet-4-6` — current default, good for orchestration and production work
- `claude-haiku-4-5-20251001` — fast and cheap, good for mechanical/repetitive tasks

**Note:** The founder mentioned "Fable 5" and "Opus 4.8/4.8 fast" — these may be newer models released after Sonnet 4.6's knowledge cutoff. Run `/model` at session start to see what is actually available and update this routing plan accordingly.

**Routing plan for AMF content work:**

| Task Type | Model | Reason |
|-----------|-------|---------|
| Reading source books (Plogger, Beato, etc.) and synthesizing content | Opus | Requires deep comprehension and pedagogical judgment |
| Writing textbook explanations — conceptual precision matters | Opus | Complex ideas need the most capable reasoner |
| Curriculum sequencing decisions | Opus | Cross-sprint architectural judgment |
| Cross-chamber integration design | Opus | Multi-system thinking |
| Building HTML documents (practice plans, textbook pages) | Sonnet | Structured production work |
| CSS layout, page formatting, visual fixes | Sonnet | Mechanical but requires iteration |
| Coordinating multi-step tasks, file I/O | Sonnet | Orchestration |
| PDF generation, upload to server | Sonnet | Tooling work |
| Page height checks, format validation | Haiku | Fast, zero reasoning needed |
| Workbook page generation (templated, repetitive) | Haiku | Same structure repeated |
| Simple search/grep/file checks | Haiku | Mechanical |

**How to test routing is working:**
- For a Sprint build, the expected pattern is: Opus agent reads source material → Opus agent writes textbook content → Sonnet builds HTML → Haiku validates page heights
- If you see Sonnet doing deep content synthesis (reading Plogger, making pedagogical decisions), routing is wrong
- If you see Opus generating boilerplate HTML or running `node -e` PDF scripts, routing is wrong
- The Agent tool accepts a `model` parameter — verify it's being used: `Agent({ model: 'opus', ... })` for synthesis tasks

---

## What We Built This Session

### The AMF System

The **Adaptable Musician's Framework (AMF)** is a comprehensive music education system for adult returning musicians. It has two primary instruments (steel-string acoustic guitar, acoustic piano) and is organized around a 12-sprint curriculum (one sprint = one month of daily practice).

**System hierarchy:**
```
AMF
├── Musical OS (Plogger Method — the foundational layer)
├── Four Chambers (content learned through the Musical OS lens)
│   ├── Melody Chamber
│   ├── Harmony Chamber  
│   ├── Voicings Chamber
│   └── Rhythm Chamber
└── The Synthesizer (convergence — all chambers combine)
```

**The two planned books:**
1. **The Adaptable Musician's Framework** — the textbook (knowledge, theory, examples, why)
2. **AMF Daily Practice Manual + Workbook** — the practice system (12 sprints, exercises, workbook pages)

### Sprint 1 Documents (COMPLETE)

Two documents built, PDF-generated, and uploaded to the download server:

**1. Sprint 1 Mini-Textbook** (`sprint1_textbook.html` / `sprint1_textbook.pdf` — 159KB)
- 10 A4 pages
- Covers: Musical OS (Plogger Ch.1–3), Melody Chamber, Harmony Chamber, Rhythm Chamber, Quick Reference card
- Color scheme: Teal=Musical OS, Blue=Melody, Amber=Harmony, Rust=Rhythm, Green=Voicings, Purple=Synthesizer
- Fixed during this session: Unicode combining circumflex characters on scale degree numbers (1̂, 3̂ etc.) rendered badly in Georgia font — replaced with plain "1, 3, 5" notation

**2. Sprint 1 Practice Plan + Workbook** (`sprint1_practice.html` / `sprint1_practice.pdf` — 301KB)
- 11 A4 pages (fixed from original 7 overflowing pages)
- Structure per instrument: 5 sections × 60 minutes
  - Section 1: Plogger Foundation (10 min)
  - Section 2: Integrated Work (18 min)
  - Section 3: Song Learning / Practice (14 min)
  - Section 4: Jamming / Free Play (10 min) — includes Rhythm Code Groove Drill
  - Section 5: The Synthesizer (8 min) — all four chambers simultaneously
- Anchor song: Ain't No Sunshine (Bill Withers), Am–Em–G–Am, A minor
- Page layout: Guitar S1+S2 | Guitar S3+S4+S5 | Piano S1+S2 | Piano S3+S4+S5 | Workbook A | Workbook B | Weeks 2–3 | Week 4 | Exit Assessment

**Download:** http://157.245.112.66:8100/sprint1_amf.zip

### Key files on server

```
/home/elderle/amf-build-reference.md          ← MASTER reference — read this first every session
/home/elderle/amf-app/public/sprint1_textbook.html
/home/elderle/amf-app/public/sprint1_textbook.pdf
/home/elderle/amf-app/public/sprint1_practice.html
/home/elderle/amf-app/public/sprint1_practice.pdf
/home/elderle/queen-city-redline/docs/uploads/ ← download server files
```

### The Build Reference

`/home/elderle/amf-build-reference.md` is the master knowledge base for content construction. It contains:
- Full AMF architecture and design principles
- Complete Plogger Method reference (all chapters relevant to the 12 sprints)
- Melody Chamber: Four Zones, Tiny Tension Arc, Chord-Change Behaviors, 8-Step Melody Audit
- Harmony Chamber: all 14 progressions with sprint assignments
- Voicings Chamber: full voicing type progression with Beato page references
- Rhythm Chamber: Binary Grid, Stops, Anticipations, Son Clave, Rhythm Code Map
- The Synthesizer: cross-chamber work types
- 12-sprint map: anchor songs, Plogger chapter progression, chamber concept focus per sprint
- Beato Book blend-in map (added this session)
- Design anti-patterns (what NOT to do)
- Student profiles (guitar and piano)

**CRITICAL design reminders (from the build reference):**
1. ii-V-I is a drill vehicle, not the harmonic spine — never let any sprint collapse into ii-V-I focus
2. Plogger appears TWICE per session: isolated in Section 1 AND as perceptual lens in Sections 2–4
3. Hear/Sing Before You Play is non-negotiable in every exercise
4. Few exercises, each multi-layered — 2–3 per section, each serving 3–4 purposes
5. Anchor song is the thread connecting all sections every session

---

## The Beato Book (Secondary Source)

The Beato Book 2.3 was reviewed this session. It is a dense jazz theory and guitar reference. **It is a secondary source only** — its theoretical framing (scale-first, ii-V-heavy) can conflict with the Plogger/AMF approach if introduced too early.

**What Beato adds:**
- Detailed, instrument-specific content for the Voicings Chamber (Drop 2, quartal, triadic superimposition)
- A systematic color vocabulary for the Melody Chamber (triadic superimposition charts map to Zone language)
- V7→Imaj7 resolution tendency chart (Melody Chamber drill)
- Pentatonic superimposition shortcuts

**What Beato does NOT cover:** Rhythm Chamber (nothing), ear training (nothing that replaces Plogger di-chord work)

**Safety rules for Beato content:**
- Hold all scale-derivation content until after Sprint 3 (after di-chord quality is secured)
- Hold all reharmonization content until after Sprint 9 (after all 14 AMF progressions are established)
- Drop 2 voicings and triadic superimposition can be introduced freely as structural/physical content

**Full Beato blend-in map by sprint is in the build reference** under "BEATO BOOK BLEND-IN MAP."

---

## Documentation Phases

### Phase 1 — Foundation (Sprints 2–4)
**Goal:** Complete the beginner's package. All four chambers introduced and deepened.

| Sprint | Anchor Song | Key Plogger Content | New Chamber Focus |
|--------|-------------|---------------------|-------------------|
| 2 | Autumn Leaves (Eb/G minor) | Ch.3 complete + Ch.4 Longy full | Harmony: I-IV-V-I · Lap Map intro |
| 3 | Fly Me to the Moon (C major) | Ch.5 | Melody: Zone 2 fluency · Son Clave intro |
| 4 | So What (D Dorian) | Ch.6 | Voicings: Triad shapes by stringset (Beato pp. 93–100) · Zone 3 |

**Deliverable:** Sprints 1–4 mini-textbooks + practice plans. A complete beginner's package a student could use from day one.

---

### Phase 2 — Development (Sprints 5–8)
**Goal:** Chamber depth. Beato's resolution chart (S5), pentatonics (S6), Drop 2 (S7), triadic superimposition + quartal voicings (S8).

| Sprint | Focus |
|--------|-------|
| 5 | V7→Imaj7 resolution drill (Beato p. 89) · More complex progressions |
| 6 | Shell voicings (piano) · Pentatonic superimposition (Beato pp. 347–350) |
| 7 | Drop 2 voicings in full (Beato pp. 101–115) · Drop 2 comping lines |
| 8 | Triadic superimposition (Beato pp. 352–360) · Quartal voicings 3-part (Beato pp. 215–219) |

**Deliverable:** Sprints 5–8 documents. Intermediate-complete package.

---

### Phase 3 — Integration (Sprints 9–12)
**Goal:** All 12 progressions covered. Advanced voicings, rootless voicings, full Synthesizer work. Classical intuition thread active.

| Sprint | Focus |
|--------|-------|
| 9 | Altered Dom7 voicings (Beato pp. 258–263) · Rootless voicings intro |
| 10 | Rootless voicings Type A + B (piano) · Advanced Synthesizer |
| 11 | Extended voicings (Beato pp. 268–271) · All chambers at Stage 3 |
| 12 | Full integration · "Framework disappears" exercises · Pre-performance prep |

**Deliverable:** Sprints 9–12 documents. Complete advanced package.

---

### Phase 4 — Book Assembly
**Goal:** Compile all sprint documents into two properly structured books.

**Book 1 — The Adaptable Musician's Framework (Textbook):**
- Compile all 12 sprint mini-textbooks into chapters
- Add proper introduction, table of contents, index
- Add cross-references between chapters
- Add appendices: full progression reference, full di-chord table, Plogger quick reference
- Design cover, chapter headers, consistent typography

**Book 2 — AMF Daily Practice Manual + Workbook:**
- Compile all 12 sprint practice plans
- Add introduction explaining how to use the system
- Add progress tracking section (cross-sprint)
- Add final performance rubric
- Add milestone assessments at Sprints 4, 8, 12
- Design cover, consistent page numbering across all sprints

---

## What the Next Session Should Understand (Not Do)

1. **The architecture is fully defined.** The build reference has everything. Don't redesign — build from it.

2. **Sprint 1 is the template.** The HTML structure, CSS, color scheme, section layout, and page-splitting approach are all established. Sprints 2–12 follow the same format. Study sprint1_practice.html and sprint1_textbook.html before building anything new.

3. **The Beato Book blend-in map is settled.** Don't re-research it. The sprint-by-sprint mapping is in the build reference.

4. **Two document types per sprint:**
   - Mini-textbook: what the student needs to know for this sprint (concepts, theory, examples)
   - Practice plan + workbook: how to practice it (exercises, song work, daily log, reflection pages)

5. **PDF generation:** Uses Playwright via `/home/elderle/queen-city-redline/node_modules`. The dev server runs on port 3099 (`cd /home/elderle/amf-app && pnpm dev`). PDF generation script pattern is in the session history.

6. **Upload server:** Files go to `/home/elderle/queen-city-redline/docs/uploads/` and are accessible at `http://157.245.112.66:8100/[filename]`.

7. **The "framework disappears" is the north star.** Every decision about content, sequencing, and exercise design should be evaluated against: does this help the student eventually internalize this system so completely they no longer need it?

---

## Technical Environment

- **Server:** 157.245.112.66 (this server, not QCR)
- **AMF app:** `/home/elderle/amf-app/` (Next.js, port 3099)
- **Playwright:** uses `/home/elderle/queen-city-redline/node_modules/@playwright/test`
- **GitHub:** `https://github.com/epaulson2/amf-app.git`
- **Download server:** `http://157.245.112.66:8100/`
- **lean-ctx tools:** Available via MCP. After any context compaction, run `ToolSearch("select:mcp__lean-ctx__ctx_read,mcp__lean-ctx__ctx_shell,mcp__lean-ctx__ctx_search,mcp__lean-ctx__ctx_tree")` before any file operations.

---

*This document lives at `/home/elderle/amf-app/AMF_HANDOFF.md` and on GitHub at `https://github.com/epaulson2/amf-app`.*
