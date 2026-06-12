# Sprint 1 Visual Asset Plan

**Date:** June 2026  
**Purpose:** Define and prioritize all visual assets needed for Sprint 1 practice materials  
**Categories:** Tier 1 Recreations · Tier 2 Enhancements · Tier 3 Originals

---

## Background

Sprint 1 assets fall into three categories aligned with the AMF three-tier model:

- **Recreations** — clean, usable versions of assets that exist in original source materials (Plogger Method book)
- **Enhancements** — assets that combine Plogger source material with cross-source information (zone system, fretboard layout, keyboard visualization, harmonic movement sequence)
- **Originals** — AMF-unique assets that don't exist in any source; created to fill conceptual gaps or establish new teaching formats

**Design constraint:** Assets are built for Sprint 1 practice needs but should be reusable across multiple sprints wherever possible. The Ain't No Sunshine Analysis Sheet, for example, is Sprint 1 specific in content but establishes a template format reused every sprint.

---

## Category 1 — Recreations (from Plogger source)

These exist in the Plogger Method book and need clean, student-ready versions. Source data is already loaded into the `amf_assets` database (`di_chord_pictograph`, `di_chord_pulsation`, `di_chord_harmonicity`, `di_chord_fo_factor` tables).

| # | Asset | DB Slug | Sprint 1 Role | Reuse |
|---|-------|---------|--------------|-------|
| R1 | **[3] and [4] Focus Card** — pictograph (shape/shadow/color), sound factor values, perceptual feel, practice cues — for just these two di-chords | `di_chord_pictograph_complete` (subset) | Gate skill reference. Students use this every S1 session. The visual anchor for the ear training work. | Sprint 1 primary; referenced Sprint 2+ as part of the full system |
| R2 | **Di-Chord Pictograph Reference (full)** — all 11 di-chords, shape/shadow/color, bracket names | `di_chord_pictograph_complete` | Full system context. Sprint 1 introduces [3]/[4] but students need to see where they sit in the bigger picture. | Every sprint — grows with the student |
| R3 | **Pulsation Wave Diagram** — the three pulsation families (8Hz dissonant / 4Hz modal / 2Hz perfect) with wave shapes and di-chord assignments | `di_chord_pulsation_table` + `pulsation_outline_drawings` | Explains the first sound factor physically. Without this the pulsation concept stays abstract. | Every sprint — foundational |
| R4 | **Di-Chord Sound Factors Quick Reference** — all three factors (pulsation type / F/O factor / harmonicity) for all 11 di-chords in one compact reference | All three factor tables combined | Daily reference in S1. Student checks this constantly in early sprints when building the internal library of di-chord sounds. | Every sprint |

---

## Category 2 — Enhancements (cross-source)

These blend Plogger source data with material from other AMF sources. None of these exist in any single source document — they are created by combining two or more information layers.

| # | Asset | Sources Blended | Sprint 1 Role | Reuse |
|---|-------|----------------|--------------|-------|
| E1 | **Zone 1 Guitar Fretboard** — fretboard diagram with Zone 1 notes of Am (A, C, E) highlighted across the neck, di-chord relationships labeled between root and each chord tone | Plogger di-chord system + Guitar Theory Course fretboard layout + Emotional Map zone vocabulary | Used in S2 every single day. The primary hands-on reference for guitar Zone 1 work. | Reused with different chord overlays every sprint — base diagram persists |
| E2 | **Zone 1 Piano Keyboard** — keyboard diagram with Zone 1 notes of Am highlighted, di-chord intervals labeled visually between root and chord tones | Plogger di-chord system + keyboard visualization spiral thread | Same daily use as E1, piano side. Makes the di-chord relationships visible spatially. | Same — base diagram persists, chord overlay changes per sprint |
| E3 | **Di-Chord → Root Movement Preview** — a simplified visual showing which di-chord each harmonic root movement uses (e.g., I→IV = [5], I→V = [7]), with unlearned movements clearly labeled "Sprint X" | Plogger pictograph + AMF harmonic movement sequence (AMF_ARCHITECTURE_V2.md) | Sprint 1 textbook establishes the Plogger-to-Harmony connection explicitly. Even a partial version showing the concept orients the student toward the full system they're building toward. | Updated (not replaced) each sprint as new movements are added |

---

## Category 3 — Originals (AMF-unique)

These don't exist in any source material. They are created to fill gaps that no single source addresses.

| # | Asset | What It Is | Sprint 1 Role | Reuse |
|---|-------|-----------|--------------|-------|
| O1 | **Ain't No Sunshine Analysis Sheet** — one visual showing the full song: chord map by measure, di-chord root movement labels on each change, Zone 1 melody notes identified, rhythm grid positions mapped | Original AMF format — anchor song analysis template | The S3 and S5 reference for the entire sprint. Replaces the need to hold all this information in working memory while practicing. | Template format reused for every anchor song, Sprints 2–12 |
| O2 | **Rhythm Code 8-Position Grid Card** — clean diagram of the 8-position binary grid with positions 1-8 labeled, beat/backbeat marked, stops and anticipations illustrated with example patterns, ta/ta-te syllables aligned | Original | Used in S2 every day for rhythm work. Necessary to internalize the grid before the rhythmic feel becomes intuitive. | Every sprint |
| O3 | **Hear → Sing → Name Cycle Diagram** — the three-step AMF di-chord practice method visualized as a cycle: Hear (passive recognition) → Sing (active reproduction) → Name (labeling) → back to Hear | Original | Appears in S1 day 1. This is how the student practices di-chords. Without the cycle clearly visible, students tend to skip the singing step. | Every sprint — the core practice method |
| O4 | **Sprint 1 Daily Session Map** — the 5-section structure (S1 Plogger 10min / S2 Integrated 18min / S3 Song 14min / S4 Free Play 10min / S5 Synthesizer 8min) with Sprint 1-specific focus written in each section | Original | Orientation asset. Student keeps this visible while practicing, especially in Weeks 1-2 before the session structure becomes automatic. | Template reused — content updated each sprint |

---

## Recommended Build Order

### Must-have before Day 1 of practice (build first)

| Priority | Asset | Category | Why it can't wait |
|----------|-------|----------|-------------------|
| 1 | [3]/[4] Focus Card | Recreation (R1) | The gate skill. Student can't do S1 work without this. |
| 2 | Zone 1 Guitar Fretboard | Enhancement (E1) | Used in S2 every day. The primary instrument reference. |
| 3 | Zone 1 Piano Keyboard | Enhancement (E2) | Same — piano side. |
| 4 | Rhythm Code 8-Position Grid Card | Original (O2) | Used in S2 from day 1 for rhythm work. |
| 5 | Ain't No Sunshine Analysis Sheet | Original (O1) | The S3/S5 reference for the entire sprint. |

### Build alongside or right after

| Priority | Asset | Category | Notes |
|----------|-------|----------|-------|
| 6 | Di-Chord Pictograph Reference (full) | Recreation (R2) | Contextualizes [3]/[4]. Sprint 1 intro is incomplete without seeing the full system. |
| 7 | Pulsation Wave Diagram | Recreation (R3) | Explains the physics of pulsation. Referenced in textbook. |
| 8 | Hear→Sing→Name Cycle | Original (O3) | S1 practice method. Simple asset, high daily utility. |
| 9 | Di-Chord → Root Movement Preview | Enhancement (E3) | The Plogger-to-Harmony bridge. Referenced in textbook. |

### Lower urgency (complete the set)

| Priority | Asset | Category | Notes |
|----------|-------|----------|-------|
| 10 | Di-Chord Sound Factors Reference | Recreation (R4) | Complete reference. Useful but the focus card (R1) covers the Sprint 1 need. |
| 11 | Sprint 1 Session Map | Original (O4) | Orientation asset. Nice to have; student can follow the practice plan doc instead. |

---

## Summary

**11 assets total across 3 categories:**
- 4 Recreations (R1–R4)
- 3 Enhancements (E1–E3)
- 4 Originals (O1–O4)

**5 assets needed before Day 1 of practice** (R1, E1, E2, O1, O2)  
**4 assets to build alongside** (R2, R3, O3, E3)  
**2 can wait** (R4, O4)

Most assets have high reuse value across sprints — the fretboard and keyboard diagrams become the base layer for every sprint's zone overlays, the analysis sheet becomes the template for every anchor song, the pictograph reference grows with the student through all 12 sprints.

---

*File: `/home/elderle/amf-app/docs/sprint1_asset_plan.md`*  
*GitHub: `https://github.com/epaulson2/amf-app`*
