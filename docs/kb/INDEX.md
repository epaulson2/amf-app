# AMF Knowledge Base — Master Index

**Last updated:** 2026-06-12
**Project root:** `/home/elderle/amf-app/`
**GitHub:** `https://github.com/epaulson2/amf-app`

---

## Overview

The Adaptable Musician's Framework (AMF) is a comprehensive music education system for adult returning musicians studying two instruments simultaneously: steel-string acoustic guitar and acoustic piano. The AMF is not a course — it is a structured framework for developing genuine musical fluency organized around 12 mastery-gated sprints (one sprint = roughly one month of daily practice, but time is a guide not a contract). Its philosophical north star is "the framework disappears": every design decision exists to help students eventually internalize the system so completely they no longer need it.

The AMF is built on a layered architecture: the Musical OS (the Plogger Method — a perceptual ear-training system built around di-chords, the smallest perceivable interval units) forms the foundation. Four chambers — Melody, Harmony, Voicings, and Rhythm — apply the OS vocabulary to real music in motion. All four chambers run simultaneously from day one; they are not sequential stages. The Synthesizer is the convergence zone where all four chambers operate together. The build pipeline produces two books: a mini-textbook per sprint (knowledge, theory, why) and a practice plan + workbook per sprint (how to practice it). Sprint 1 is complete; Sprints 2–12 are the next build target. The asset knowledge base in PostgreSQL (`amf_assets`) catalogues 177 source assets across Plogger, Rhythm Code, Harmony OS, Voicings OS, and Emotional Map of Melody — with 45 synthesis candidates queued for the diagram generation pipeline.

---

## How to Use This Knowledge Base

| If you need to... | Start with |
|-------------------|------------|
| Understand the full AMF system and design principles | `AMF_ARCHITECTURE_V2.md` — read in full |
| Resume a build session after a context reset | `AMF_HANDOFF.md` — the master handoff; read first every session |
| Know what content to put in a sprint | `/home/elderle/amf-build-reference.md` — the master content reference on the server |
| Build a new sprint document (textbook or practice plan) | `AMF_HANDOFF.md` § "What We Built" + study `public/sprint1_textbook.html` and `public/sprint1_practice.html` as templates |
| Understand available source assets and their IDs | `docs/PLOGGER_ASSET_MANIFEST.md` (Tier 1) and `docs/TIER2_ASSET_MANIFEST.md` (Tier 2) |
| Plan the asset database pipeline or phases | `docs/PLOGGER_ASSET_INVENTORY_PLAN.md` — the master plan with all 10 phases |
| Find synthesis candidates for diagram generation | `docs/SYNTHESIS_CANDIDATES.md` + query `amf_assets.synthesis_candidates` table |
| Design a fretboard diagram or overlay | `docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md` |
| Understand what PDFs/materials already exist | `MATERIALS.md` + `docs/PLOGGER_ASSET_MANIFEST.md` |
| Check model routing rules for agent work | `AMF_HANDOFF.md` § "How to Test Model Routing" |

---

## Document Map

| Document | Purpose | Key Questions It Answers | Links To |
|----------|---------|--------------------------|----------|
| `AMF_ARCHITECTURE_V2.md` | Living architecture reference — mastery-gated curriculum design | What is the two-tier structure? What are the 7 harmonic root movements per sprint? What is "owned" vs. Stage 2? What are the 8 design non-negotiables? | Build reference, AMF_HANDOFF |
| `AMF_HANDOFF.md` | Session handoff for fresh context — what was built, what's next, technical env | What did Sprint 1 produce? What is Phase 1–4 of the build? Where are the files? How should model routing work? | Build reference, sprint HTML files, asset manifests |
| `MATERIALS.md` | Inventory of Emotional Map of Melody materials (Modules A–H) | Which cheat sheets, infographics, and PDFs are complete vs. planned? | public/ PDF files |
| `AGENTS.md` | Next.js agent rules (breaking changes notice) | Are there Next.js API differences to be aware of? | — |
| `docs/PLOGGER_ASSET_INVENTORY_PLAN.md` | Master plan for the 3-tier asset knowledge base — all 10 phases | What phases are complete? What is the DB schema? What is the Nano Banana JSON spec? What are Phases 5–10? | amf_assets DB, PLOGGER_ASSET_MANIFEST, TIER2_ASSET_MANIFEST |
| `docs/PLOGGER_ASSET_MANIFEST.md` | Comprehensive catalog of 60 Plogger Tier 1 assets (46 tables, 14 diagrams) | What tables and diagrams exist in the Plogger Method? Which are FULL vs. PARTIAL? What chapter and page? | amf_assets DB (plogger rows), build reference |
| `docs/TIER2_ASSET_MANIFEST.md` | Verified catalog of 97 Tier 2 external source assets across 5 sources | What assets exist in Rhythm Code (33), Emotional Map (14), Harmony OS (28), Voicings OS (13), Plogger Workbook (29)? | amf_assets DB (external rows), PLOGGER_ASSET_INVENTORY_PLAN |
| `docs/SYNTHESIS_CANDIDATES.md` | 29 manually curated synthesis ideas: 12 enhancements, 10 originals, 7 moonshots | What cross-source diagrams should be built? What is the design philosophy for synthesis? What is impact/effort per candidate? | amf_assets.synthesis_candidates table, Tier 1/2 manifests |
| `docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md` | Full design spec for the fretboard diagram system (base + 10 overlays) | What overlays should exist? How does fretboard geometry connect to di-chords? What is the build priority matrix? | amf_assets DB, TPS color grid components |
| `docs/sql/amf_assets_schema.sql` | PostgreSQL schema for the amf_assets database | What tables exist? What are the column definitions, constraints, and foreign keys? | amf_assets DB |

---

## System at a Glance

**What AMF is:**
- Music education framework for adult returning musicians, guitar + piano simultaneously
- 12 mastery-gated sprints; advance when you *own* a skill (Stage 3: correct, at tempo, in 3 keys, by ear), not when the calendar says
- Two instruments, two books: mini-textbook (why) + practice plan + workbook (how)
- "The framework disappears" — north star: internalize until the system is invisible

**The Architecture:**
- Musical OS = Plogger Method — di-chord ear training (11 intervals perceived by sound not notation)
- Four Chambers run simultaneously: Melody (4 Zones, Tiny Tension Arc), Harmony (14 progressions, root movement di-chords), Voicings (Drop 2, quartal, triadic superimposition), Rhythm (Binary Grid, Son Clave, Rhythm Code)
- The Synthesizer = convergence zone, Section 5 of every daily session (8 min)
- Spiral Threads: di-chord ear, keyboard visualization, Longy rhythms, melody zones, Rhythm Code groove, Lap Map — all deepen every sprint, never "done"
- Mastery Gates: Gate A = harmonic root movement (one di-chord movement per sprint), Gate B = Plogger chapter group; both must clear before advancing

**The Sprint Map:**
- Sprint 1 (complete): Plogger Ch.1–3, Melody Zone 1, Harmony intro, Rhythm intro — anchor song: Ain't No Sunshine
- Sprint 2: [5] P4 movement (I→IV, V→I), Plogger Ch.3+Ch.4, Harmony I-IV-V-I — anchor: Stand By Me
- Sprint 3: [7] P5 movement (I→V), Plogger Ch.5, Melody Zone 2, Son Clave intro — anchor: TBD
- Sprints 4–12: one di-chord root movement per sprint, progressively less stable intervals; full details in AMF_ARCHITECTURE_V2.md and build reference

**The Asset Knowledge Base (amf_assets DB):**
- Tier 1 (Plogger): 89 assets — tables, diagrams, exercises
- Tier 2 (external): 88 assets across Rhythm Code (33), Harmony OS (28), Voicings OS (13), Emotional Melody Map (10), Guitar Theory Course (4)
- 18 tables in PostgreSQL; 17 data tables populated (Phases 1–4 complete)
- 45 synthesis candidates in DB (23 bridging, 13 new_media, 9 enrichment) — all pending
- Phases 5–10 not yet started: Tier 2 data extraction, semantic indexing, diagram decomposition, image generation, Tier 3 synthesis

**What's been built:**
- Sprint 1 mini-textbook: 10 A4 pages, PDF generated, uploaded to download server
- Sprint 1 practice plan + workbook: 11 A4 pages, PDF generated, uploaded
- Full set of Emotional Map of Melody materials: 8 modules, complete (MATERIALS.md)
- Harmony OS infographics: full set in `public/`
- Rhythm Code practice materials: full set in `public/`
- Voicings OS materials: full set in `public/`
- amf_assets PostgreSQL database: live with 177 registry rows, 17 data tables

**Open design questions (from AMF_ARCHITECTURE_V2.md):**
- Should V→I get its own sprint? (currently Sprint 2 holds both [5] movements)
- Anchor songs for Sprints 3, 5, 6 are TBD
- Mastery gate: does both-instruments requirement mean both must reach Stage 3 simultaneously?
- Plogger chapter pacing under the new slower mastery model

---

## Asset Inventory Summary

*Source: `amf_assets.asset_registry` — queried 2026-06-12*

| Tier | Source Name | Assets |
|------|-------------|--------|
| external | Emotional Melody Map | 10 |
| external | Guitar Theory Course | 4 |
| external | Harmony OS | 28 |
| external | Rhythm Code | 33 |
| external | Voicings OS | 13 |
| plogger | Plogger Method | 89 |
| **TOTAL** | | **177** |

**Synthesis candidates in DB:** 45 total — 23 bridging, 13 new_media, 9 enrichment — all status: `pending`

Note: `docs/SYNTHESIS_CANDIDATES.md` contains 29 manually curated candidates (pre-DB) with full impact/effort ratings. The DB table has 45 candidates generated from semantic overlap scoring. These two sets are related but not identical.

---

## Current Build Status

| Phase | Scope | Status |
|-------|-------|--------|
| Sprint 1 — Textbook | 10-page A4 mini-textbook (Musical OS intro, 4 chambers intro) | **COMPLETE** — PDF at `public/sprint1_textbook.pdf` |
| Sprint 1 — Practice Plan | 11-page A4 practice plan + workbook (guitar + piano, 5 sections, exit assessment) | **COMPLETE** — PDF at `public/sprint1_practice.pdf` |
| Phase 1 (Sprints 2–4) | Sprint 2: Stand By Me / [5] movement; Sprint 3: Fly Me to the Moon / [7] movement; Sprint 4: So What / [2] movement | **NEXT** — not started |
| Phase 2 (Sprints 5–8) | V7→Imaj7 resolution, shell voicings, Drop 2, triadic superimposition | Not started |
| Phase 3 (Sprints 9–12) | Altered Dom7, rootless voicings, full Synthesizer, "framework disappears" exercises | Not started |
| Phase 4 — Book Assembly | Compile all sprint documents into 2 final books | Not started |
| Asset DB Phase 1–4 | Tier 1 sweep, Tier 2 sweep, DB setup, Tier 1 data extraction | **COMPLETE** — 177 assets in DB, 17 tables populated |
| Asset DB Phase 5 | Tier 2 data extraction with semantic tags | **NEXT** — not started |
| Asset DB Phases 6–10 | Semantic indexing, diagram decomposition, image generation, Tier 3 synthesis, query interface | Not started |
| Emotional Map materials | 8 modules, cheat sheets, infographics, PDFs | **COMPLETE** — see MATERIALS.md |

**synthesis_candidates table:** 45 rows, all `status = 'pending'` — no candidates approved or rejected yet. Founder review required before Phase 9 work begins (per PLOGGER_ASSET_INVENTORY_PLAN.md Phase 9 note).

---

## Key File Paths

### Root-Level Documents
| Path | Description |
|------|-------------|
| `/home/elderle/amf-app/AMF_ARCHITECTURE_V2.md` | Living architecture — mastery gates, di-chord sprint map, design non-negotiables |
| `/home/elderle/amf-app/AMF_HANDOFF.md` | Session handoff — what was built, what's next, technical environment |
| `/home/elderle/amf-app/MATERIALS.md` | Emotional Map of Melody materials inventory (Modules A–H) |
| `/home/elderle/amf-app/AGENTS.md` | Next.js agent rules for this repo |
| `/home/elderle/amf-build-reference.md` | **Master content reference** — full Plogger, all chambers, 12-sprint map, Beato blend-in (NOT in this repo) |

### Docs
| Path | Description |
|------|-------------|
| `/home/elderle/amf-app/docs/PLOGGER_ASSET_INVENTORY_PLAN.md` | Master 10-phase plan for the asset knowledge base |
| `/home/elderle/amf-app/docs/PLOGGER_ASSET_MANIFEST.md` | 60 Plogger Tier 1 assets (T-01 to T-46, D-01 to D-14) |
| `/home/elderle/amf-app/docs/TIER2_ASSET_MANIFEST.md` | 97 Tier 2 external assets (RC, EM, HO, VO, PW series) |
| `/home/elderle/amf-app/docs/SYNTHESIS_CANDIDATES.md` | 29 curated synthesis ideas with impact/effort ratings |
| `/home/elderle/amf-app/docs/GUITAR_FRETBOARD_DIAGRAM_SYSTEM.md` | Fretboard diagram spec — base diagram + 10 overlays |
| `/home/elderle/amf-app/docs/sql/amf_assets_schema.sql` | PostgreSQL schema DDL for amf_assets database |
| `/home/elderle/amf-app/docs/GUITAR_EXERCISE_PATTERNS.md` | Guitar exercise pattern reference |
| `/home/elderle/amf-app/docs/kb/INDEX.md` | This file |

### Sprint Output Files (public/)
| Path | Description |
|------|-------------|
| `/home/elderle/amf-app/public/sprint1_textbook.html` | Sprint 1 mini-textbook source (10 A4 pages) |
| `/home/elderle/amf-app/public/sprint1_textbook.pdf` | Sprint 1 mini-textbook PDF (159KB) |
| `/home/elderle/amf-app/public/sprint1_practice.html` | Sprint 1 practice plan + workbook source (11 A4 pages) |
| `/home/elderle/amf-app/public/sprint1_practice.pdf` | Sprint 1 practice plan + workbook PDF (301KB) |

### Application Code
| Path | Description |
|------|-------------|
| `/home/elderle/amf-app/app/` | Next.js app directory — curriculum, genre-labs, materials, pedagogy, practice, systems, technology |
| `/home/elderle/amf-app/components/` | React components — chord diagrams, lead sheets, piano/guitar color grids, markdown renderer |
| `/home/elderle/amf-app/lib/` | Data and utility modules — curriculum data, lead sheets, TPS piano/guitar data |
| `/home/elderle/amf-app/app/curriculum/` | Curriculum pages by semester |
| `/home/elderle/amf-app/app/api/chat/` | Chat API route |

### PDF Generation Scripts
| Path | Description |
|------|-------------|
| `/home/elderle/amf-app/generate_pdfs.py` | Master PDF generation entry point |
| `/home/elderle/amf-app/gen_sheet_pdfs.py` | Sheet PDF generation |
| `/home/elderle/amf-app/gen_harmony_pdfs_vector.py` | Harmony OS PDF generation (vector) |
| `/home/elderle/amf-app/gen_rhythm_pdfs.py` | Rhythm Code PDF generation |
| `/home/elderle/amf-app/gen_voicing_pdfs.py` | Voicings OS PDF generation |
| `/home/elderle/amf-app/gen_workbook_pdf.py` | Workbook PDF generation |

### Technical Environment
| Item | Value |
|------|-------|
| AMF dev server | `pnpm dev` in `/home/elderle/amf-app/` — port 3099 |
| Playwright (for PDF) | `/home/elderle/queen-city-redline/node_modules/@playwright/test` |
| Download server | `http://157.245.112.66:8100/` — files at `/home/elderle/queen-city-redline/docs/uploads/` |
| PostgreSQL DB | `amf_assets` — connect: `sudo -u postgres psql -d amf_assets` |
| Server IP | `157.245.112.66` (this server; NOT the QCR server) |
| GitHub | `https://github.com/epaulson2/amf-app.git` |
