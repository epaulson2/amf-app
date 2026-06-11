# Plogger Asset Inventory — Comprehensive Plan

**Status:** Draft — June 11, 2026  
**Repo:** `epaulson2/amf-app`  
**Owner:** AMF curriculum build

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [What We Are Building](#3-what-we-are-building)
4. [Asset Types](#4-asset-types)
5. [Database Architecture](#5-database-architecture)
6. [Nano Banana JSON Spec Format](#6-nano-banana-json-spec-format)
7. [Phase Plan](#7-phase-plan)
8. [Catalog — Known Tables](#8-catalog--known-tables)
9. [Catalog — Known Diagrams](#9-catalog--known-diagrams)
10. [Metadata Schema](#10-metadata-schema)
11. [Query Interface](#11-query-interface)
12. [Integration with AMF Materials](#12-integration-with-amf-materials)
13. [Open Questions](#13-open-questions)

---

## 1. Executive Summary

The Plogger Method book contains dozens of tables and visual diagrams that encode core music theory concepts. Right now, each one is embedded in a single chapter and cannot be reused. When we build AMF curriculum materials — practice sheets, infographics, lesson plans — we have to recreate these elements from scratch every time, with no single source of truth.

This plan creates a **searchable asset inventory**: a dedicated PostgreSQL database where every table in the book is stored as a real relational table (queryable, filterable, linkable), and every diagram is stored as a Nano Banana JSON spec (deterministic, editable, re-renderable). Both types carry rich metadata: chapter, page, primary topics, secondary topics, and format. Any future material can query the inventory by topic, pull the exact asset, and use it directly.

**End state:** `SELECT * FROM asset_registry WHERE primary_topic = 'interference_pulsation'` returns the asset, its metadata, and its storage location — and we can render it immediately.

---

## 2. Problem Statement

### Current state

- Tables and diagrams exist only as images in a scanned PDF.
- Any reuse requires re-photographing or redrawing from scratch.
- No consistency — the same concept may be rendered differently each time.
- No searchability — finding "the di-chord pulsation table" requires knowing which page of which chapter to look at.
- No editability — if a label needs to change, the whole image must be replaced.

### What this costs us

When building a sprint infographic that needs the Interference Pulsation classification table, we currently spend time re-creating it manually. When the AMF app needs the Di-Chord Pictograph legend, we hunt for the right photo. Multiply this across 25+ chapters and hundreds of material pieces, and it compounds into significant friction.

### The fix

Extract once. Store structured. Query always.

---

## 3. What We Are Building

### Component A — Plogger Asset Database (`plogger_assets` PostgreSQL DB)

A dedicated database (separate from `elderle_db`) with three layers:

1. **Asset Registry** — one row per asset (table or diagram), with all metadata
2. **Table Storage** — one normalized relational table per Plogger data table
3. **Diagram Spec Storage** — one JSON record per diagram, containing the full Nano Banana rendering spec

### Component B — Diagram Image Library

Each diagram JSON spec is submitted to Nano Banana (Google AI Studio, Gemini 2.0 Flash) to generate a rendered image. Images are stored in `public/plogger-assets/` in the amf-app repo and linked back to the registry row.

### Component C — Query Interface

SQL patterns (documented in this plan) for common retrieval operations:
- By chapter
- By primary topic
- By secondary topic
- By asset type (table vs. diagram)
- By format (can be used in infographic? sprint sheet? lesson plan?)

---

## 4. Asset Types

### Tables

Structured data where rows and columns carry discrete values. Stored as real relational SQL tables. Can be joined, filtered, aggregated.

**Examples from the Plogger book:**
- Di-Chord Complete Reference (ch.9) — all 11 di-chords, name, semitones, inversion pair
- Interference Pulsation Classification (ch.11) — di-chord → pulsation type → Hz → visual feel
- F/O Factor Table (ch.12) — di-chord → fundamental/octave factor → weight
- Harmonicity Table (ch.13) — di-chord → harmonicity level → blend quality
- Diatonic Triad Reference (ch.23) — scale degree → Roman numeral → triad type → component degrees
- 7th Chord Inversion Tables (ch.22) — inversion type → interval stack per chord type
- Heptachord Mode Table (ch.18/19) — mode name → scale degrees → characteristic quality
- Pythagorean Ordering Table (ch.23) — F–C–G–D–A–E–B with degree mappings

### Diagrams

Visual representations where spatial layout, shape, color, and symbol carry meaning. Stored as Nano Banana JSON specs. Each element in the diagram is a named, typed attribute.

**Examples from the Plogger book:**
- Di-Chord Pictograph — shape=pulsation type, shadow=F/O factor, color=harmonicity; one glyph per di-chord
- Interference Pulsation Wave Visualizations — jagged/rounded/straight waveform drawings per pulsation type
- Heptachord Keyboard Map — keyboard with color-coded keys per function (tonic, dissonant, modal, perfect)
- Conjunct Finger Mapping — hand diagram with function per finger
- Inversion Stack Diagrams — chord-tone stack with bass marker and inversion label
- Tracking Page Template — the blank listener-response grid
- Bach Chorale Analysis Notation Example — SATB staff layout with bracket notation
- Di-Chord Number Line — 0–12 bracket notation showing inversion pairs

---

## 5. Database Architecture

### Database: `plogger_assets`

```sql
-- Create database
CREATE DATABASE plogger_assets;
```

---

### 5.1 Asset Registry Table

The central index. Every table and diagram has exactly one row here.

```sql
CREATE TABLE asset_registry (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(100) UNIQUE NOT NULL,   -- e.g. 'di_chord_pulsation_table'
    title           VARCHAR(255) NOT NULL,
    asset_type      VARCHAR(20) NOT NULL CHECK (asset_type IN ('table', 'diagram')),
    chapter         INTEGER,
    page_start      INTEGER,
    page_end        INTEGER,
    primary_topics  TEXT[],                          -- e.g. ARRAY['interference_pulsation', 'di_chord']
    secondary_topics TEXT[],                         -- e.g. ARRAY['wave_shape', 'perceptual_language']
    format_tags     TEXT[],                          -- e.g. ARRAY['infographic', 'sprint_sheet', 'reference']
    storage_ref     TEXT,                            -- table name OR diagram_specs.slug
    image_path      TEXT,                            -- public/plogger-assets/<filename>.png (diagrams only)
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);
```

---

### 5.2 Diagram Specs Table

Stores the full Nano Banana JSON spec for each diagram. The JSON is the single source of truth — the image is derived from it.

```sql
CREATE TABLE diagram_specs (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(100) UNIQUE NOT NULL,
    title           VARCHAR(255),
    spec            JSONB NOT NULL,                 -- full Nano Banana JSON spec
    render_model    VARCHAR(100) DEFAULT 'gemini-2.0-flash',
    last_rendered   TIMESTAMP,
    render_notes    TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);
```

---

### 5.3 Individual Data Tables (Star Schema)

Each Plogger table gets its own normalized SQL table. Below are the confirmed tables from chapters already in the build reference.

#### `di_chords` — Complete Di-Chord Reference (Ch.9)

```sql
CREATE TABLE di_chords (
    semitones       INTEGER PRIMARY KEY CHECK (semitones BETWEEN 1 AND 11),
    bracket_name    VARCHAR(10) NOT NULL,            -- '[1]', '[2]', etc.
    inversion_pair  INTEGER,                         -- 12 - semitones
    common_name     VARCHAR(50),
    interval_name   VARCHAR(50)
);
```

#### `di_chord_pulsation` — Interference Pulsation Classification (Ch.11)

```sql
CREATE TABLE di_chord_pulsation (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    pulsation_type  VARCHAR(20) CHECK (pulsation_type IN ('dissonant', 'modal', 'perfect')),
    hz_rate         VARCHAR(20),                     -- '8Hz', '4Hz', '2Hz'
    wave_shape      VARCHAR(20),                     -- 'jagged', 'rounded', 'straight'
    perceptual_feel TEXT
);
```

#### `di_chord_fo_factor` — F/O Factor (Ch.12)

```sql
CREATE TABLE di_chord_fo_factor (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    fo_factor       VARCHAR(30),                     -- e.g. 'fundamental', 'octave', 'neutral'
    fo_description  TEXT,
    weight_quality  TEXT
);
```

#### `di_chord_harmonicity` — Harmonicity (Ch.13)

```sql
CREATE TABLE di_chord_harmonicity (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    harmonicity     VARCHAR(30),                     -- e.g. 'high', 'medium', 'low'
    blend_quality   TEXT,
    perceptual_feel TEXT
);
```

#### `di_chord_pictograph` — Full Pictograph Properties (Ch.10-14)

Composite view of all three sound factors per di-chord.

```sql
CREATE TABLE di_chord_pictograph (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    shape           VARCHAR(30),                     -- from pulsation type
    shadow          VARCHAR(30),                     -- from F/O factor
    color           VARCHAR(30),                     -- from harmonicity
    pulsation_type  VARCHAR(20),
    fo_factor       VARCHAR(30),
    harmonicity     VARCHAR(30)
);
```

#### `diatonic_triads` — Diatonic Triad Reference (Ch.23)

```sql
CREATE TABLE diatonic_triads (
    scale_degree    INTEGER PRIMARY KEY CHECK (scale_degree BETWEEN 1 AND 7),
    solfege         VARCHAR(5),                      -- Do, Re, Mi, etc.
    degree_notation VARCHAR(5),                      -- '1̂', '2̂', etc.
    roman_numeral   VARCHAR(5),                      -- 'I', 'ii', 'iii', etc.
    triad_type      VARCHAR(20),                     -- 'Major', 'Minor', 'Diminished'
    root_degree     INTEGER,
    third_degree    INTEGER,
    fifth_degree    INTEGER,
    has_functional_seventh BOOLEAN DEFAULT FALSE,
    seventh_type    VARCHAR(20)                      -- 'dominant', 'minor', 'half-dim', NULL
);
```

#### `chord_inversions_7th` — 7th Chord Inversion Tables (Ch.22)

```sql
CREATE TABLE chord_inversions_7th (
    id              SERIAL PRIMARY KEY,
    chord_type      VARCHAR(30) NOT NULL,            -- 'dominant_7th', 'minor_7th', 'half_dim', 'fully_dim'
    inversion       VARCHAR(30) NOT NULL,            -- 'root', 'first', 'second', 'third'
    figured_bass    VARCHAR(10),                     -- '7/5/3', '6/5', '4/3', '4/2'
    bass_voice      INTEGER,                         -- semitones from chord root
    tenor_voice     INTEGER,
    alto_voice      INTEGER,
    soprano_voice   INTEGER,
    bass_identifies_as VARCHAR(20),                  -- 'root', '3rd', '5th', '7th'
    root_location   VARCHAR(60)                      -- 'bass', '6th above bass', etc.
);
```

#### `heptachord_modes` — Mode Reference (Ch.18-20)

```sql
CREATE TABLE heptachord_modes (
    id              SERIAL PRIMARY KEY,
    mode_name       VARCHAR(30) NOT NULL,
    starting_degree INTEGER,                         -- which scale degree it starts on
    pythagorean_position INTEGER,                    -- F=1, C=2, G=3, D=4, A=5, E=6, B=7
    characteristic_quality TEXT,
    differs_from_previous VARCHAR(60)               -- which degree changes vs adjacent mode
);
```

#### `bach_chorale_sequences` — The 10 Harmonization Sequences (Ch.23)

```sql
CREATE TABLE bach_chorale_sequences (
    sequence_number INTEGER PRIMARY KEY,
    soprano_degrees TEXT NOT NULL,                   -- space-separated degree notation
    roman_numerals  TEXT NOT NULL,                   -- space-separated Roman numerals
    exercise_ref    VARCHAR(20),                     -- 'Ex.23-5', etc.
    notes           TEXT
);
```

---

## 6. Nano Banana JSON Spec Format

Diagrams are stored as structured JSON where every visual element is a named, typed attribute. The schema follows the pattern established in `queen-city-redline/docs/reference/JSON_PROMPT_SCHEMA.md`, adapted for educational diagrams rather than character generation.

### Core Principles

- Each visual element has a `source` field: `"text"` (set explicitly in JSON) or `"image"` (locked from reference image)
- `image_locked: true` on any element prevents modification unless intentional
- Every renderable attribute is a key — changing the key changes the output deterministically
- The spec is the single source of truth; the image is a derived artifact

### Diagram JSON Structure

```json
{
  "task": "Create educational music theory diagram",
  "diagram_id": "di_chord_pictograph_legend",
  "version": "1.0",
  "canvas": {
    "width": 800,
    "height": 600,
    "background_color": { "value": "#FFFFFF", "source": "text" },
    "style": { "value": "clean educational illustration, flat design", "source": "text" }
  },
  "title": {
    "text": { "value": "Di-Chord Pictograph — Sound Factor Legend", "source": "text" },
    "font": { "value": "sans-serif bold 24px", "source": "text" },
    "position": { "value": "top-center", "source": "text" }
  },
  "elements": [
    {
      "id": "pulsation_section",
      "type": "labeled_group",
      "label": { "value": "SHAPE = Interference Pulsation", "source": "text" },
      "items": [
        {
          "id": "shape_dissonant",
          "shape": { "value": "jagged_waveform", "source": "text" },
          "label": { "value": "Dissonant [1][2][10][11] — 8Hz", "source": "text" },
          "color": { "value": "#CC2200", "source": "text" }
        },
        {
          "id": "shape_modal",
          "shape": { "value": "rounded_waveform", "source": "text" },
          "label": { "value": "Modal [3][4][8][9] — 4Hz", "source": "text" },
          "color": { "value": "#2244CC", "source": "text" }
        },
        {
          "id": "shape_perfect",
          "shape": { "value": "straight_line", "source": "text" },
          "label": { "value": "Perfect [5][6][7] — 2Hz", "source": "text" },
          "color": { "value": "#228822", "source": "text" }
        }
      ]
    }
  ],
  "quality_controls": {
    "style": "educational diagram, textbook illustration quality",
    "no_photo_realism": true,
    "text_must_be_legible": true,
    "consistent_with_plogger_book_aesthetic": true
  }
}
```

### What Makes This Deterministic

1. **Every label is a JSON string** — change the string, the label changes
2. **Every color is a hex code** — reproducible across renders
3. **Shape names map to drawing primitives** — `jagged_waveform`, `rounded_waveform`, `straight_line`, `filled_circle`, `outlined_square`, `arrow`, `bracket`, `staff_line`, etc.
4. **Position is described relationally** — `top-center`, `below:shape_dissonant`, `right-of:label_block` — not pixel coordinates (which break on resize)
5. **Version field** — increment when the spec changes; old images become stale by comparison

---

## 7. Phase Plan

### Phase 1 — Comprehensive Sweep (Light Agent)

**Goal:** Catalog every table and diagram in the Plogger book. This is the discovery phase — no extraction yet.

**Input:** `amf-build-reference.md` (covers all chapters) + any available uploaded PDFs

**Output:** A manifest in `docs/PLOGGER_ASSET_MANIFEST.md` with one row per asset:
- Chapter number
- Page number(s)
- Asset type (table / diagram)
- Working title
- One-sentence description
- Completeness flag (fully captured in build reference? / partially? / not at all?)

**Agent type:** Explore agent reading `amf-build-reference.md` end to end

**Estimated assets:** 25–40 (based on chapters already analyzed)

---

### Phase 2 — Database Setup

**Goal:** Create the `plogger_assets` database and all schema tables.

**Steps:**
1. `CREATE DATABASE plogger_assets` on `127.0.0.1:5432`
2. Run all `CREATE TABLE` statements from Section 5
3. Create indexes on `primary_topics` (GIN for array search), `chapter`, `asset_type`
4. Verify with `\dt` and `\d tablename`

**SQL script:** `docs/sql/plogger_assets_schema.sql` (to be created)

---

### Phase 3 — Table Extraction (Parallel Agents by Chapter Group)

**Goal:** Populate each relational table with data extracted from the book.

**Source:** `amf-build-reference.md` for chapters already captured; source PDFs/photos for gaps.

**Chapter groups (parallel):**
- Batch A: Ch.9-14 → `di_chords`, `di_chord_pulsation`, `di_chord_fo_factor`, `di_chord_harmonicity`, `di_chord_pictograph`
- Batch B: Ch.22 → `chord_inversions_7th`
- Batch C: Ch.23 → `diatonic_triads`, `bach_chorale_sequences`
- Batch D: Ch.18-20 → `heptachord_modes`
- Batch E: Any remaining tables discovered in Phase 1

**Output:** `INSERT` statements + registry entries in `asset_registry`

---

### Phase 4 — Diagram Decomposition (Heavier Model)

**Goal:** For each diagram identified in the manifest, produce a Nano Banana JSON spec.

**Process per diagram:**
1. Read the diagram description from `amf-build-reference.md`
2. Identify all visual elements (shapes, labels, colors, layout, text)
3. Map each element to a JSON attribute with explicit `source: "text"` values
4. Write spec to `diagram_specs` table and to `docs/diagram-specs/<slug>.json`
5. Insert registry row pointing to the spec

**Priority order:**
1. Di-Chord Pictograph (most reused — appears in Ch.10, Ch.23, and every sprint)
2. Interference Pulsation Wave Diagram (Ch.11)
3. Heptachord Keyboard Map (Ch.18-20)
4. 7th Chord Inversion Stack Diagrams (Ch.22)
5. Diatonic Triad Harmonization Chart (Ch.23)
6. Conjunct Finger Map (Ch.16-17)
7. Remaining diagrams from manifest

---

### Phase 5 — Image Generation

**Goal:** Submit each JSON spec to Nano Banana and store rendered images.

**Process:**
1. For each spec in `diagram_specs`, prepare the JSON prompt
2. Submit to Gemini 2.0 Flash via Google AI Studio (Nano Banana process)
3. Save output image to `public/plogger-assets/<slug>.png`
4. Update `asset_registry.image_path` and `diagram_specs.last_rendered`

**Note:** This phase requires manual submission through the Nano Banana / AI Studio UI per the established SOP. Each spec is designed to be submitted exactly as-is.

---

### Phase 6 — Query Interface Documentation

**Goal:** Document SQL patterns for common retrieval operations.

**Queries to document:**
- Find all assets for a given topic
- Find all assets needed for a given chapter
- Pull the full di-chord property set for a given semitone value
- Find all diagrams suitable for use in an infographic
- Pull the complete inversion table for a given chord type and inversion

---

## 8. Catalog — Known Tables

Based on chapters fully analyzed in `amf-build-reference.md`. This is the Phase 1 starting manifest — the comprehensive sweep will extend it.

| # | Title | Chapter | Pages | Storage Table | Status |
|---|-------|---------|-------|---------------|--------|
| T-01 | Di-Chord Complete Reference | 9 | 101-105 | `di_chords` | Partially captured |
| T-02 | Interference Pulsation Classification | 11 | 112-114 | `di_chord_pulsation` | Captured |
| T-03 | F/O Factor Classification | 12 | 121-125 | `di_chord_fo_factor` | Partially captured |
| T-04 | Harmonicity Classification | 13 | 126-130 | `di_chord_harmonicity` | Partially captured |
| T-05 | Di-Chord Pictograph Properties | 10-14 | Various | `di_chord_pictograph` | Partially captured |
| T-06 | Diatonic Triad Reference | 23 | 264 | `diatonic_triads` | Captured |
| T-07 | 7th Chord Root Position | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-08 | 7th Chord 1st Inversion | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-09 | 7th Chord 2nd Inversion | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-10 | 7th Chord 3rd Inversion | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-11 | Bach Chorale 10 Sequences | 23 | 266-269 | `bach_chorale_sequences` | Captured |
| T-12 | Heptachord Mode Reference | 18-20 | TBD | `heptachord_modes` | Partially captured |
| T-13 | Pythagorean Ordering Reference | 23 | 265 | `heptachord_modes` | Captured |

---

## 9. Catalog — Known Diagrams

| # | Title | Chapter | Pages | Spec Slug | Status |
|---|-------|---------|-------|-----------|--------|
| D-01 | Di-Chord Pictograph — Full Grid | 10-14 | ~115 | `di_chord_pictograph_grid` | Not started |
| D-02 | Interference Pulsation Waveforms | 11 | 112-113 | `pulsation_waveforms` | Not started |
| D-03 | F/O Factor Visual | 12 | 121 | `fo_factor_visual` | Not started |
| D-04 | Harmonicity Blend Visual | 13 | 126 | `harmonicity_visual` | Not started |
| D-05 | Heptachord Keyboard Color Map | 18-20 | TBD | `heptachord_keyboard_map` | Not started |
| D-06 | Conjunct Finger Mapping | 16-17 | TBD | `conjunct_finger_map` | Not started |
| D-07 | 7th Chord Inversion Stack — Dom7 | 22 | 249 | `inversion_stack_dom7` | Not started |
| D-08 | 7th Chord Inversion Stack — Min7 | 22 | 250 | `inversion_stack_min7` | Not started |
| D-09 | Di-Chord Number Line | 9 | 101 | `dichord_number_line` | Not started |
| D-10 | SATB Harmonization Template | 23 | 267 | `satb_harmonization_template` | Not started |
| D-11 | Tracking Page Grid Template | TBD | TBD | `tracking_page_template` | Not started |
| D-12 | Pythagorean Mode Cluster Map | 23 | 265 | `pythagorean_mode_clusters` | Not started |

---

## 10. Metadata Schema

Every asset in the registry carries this metadata. These are the official topic tag vocabularies.

### Primary Topics (controlled vocabulary)

```
di_chord
interference_pulsation
fo_factor
harmonicity
pictograph
heptachord
melody_zones
chord_voicing
inversion
harmonization
rhythm_code
longy
tracking_page
bach_chorale
mode
transposition
```

### Secondary Topics (controlled vocabulary)

```
wave_shape
perceptual_language
bracket_notation
keyboard_visualization
finger_mapping
scale_degree
roman_numeral
figured_bass
satb
pythagorean_ordering
conjunct_disjunct
functional_harmony
ear_training
```

### Format Tags (controlled vocabulary)

```
infographic          -- can be used as a standalone infographic panel
sprint_sheet         -- appropriate for a sprint practice sheet
lesson_plan          -- appropriate for lesson plan reference
quick_reference      -- compact reference card format
exercise             -- student exercise or drill
illustration         -- explanatory illustration, not data table
data_table           -- pure data, row/column format
```

---

## 11. Query Interface

### Find all assets for a topic

```sql
SELECT id, slug, title, asset_type, chapter, page_start
FROM asset_registry
WHERE 'interference_pulsation' = ANY(primary_topics)
ORDER BY chapter;
```

### Find everything needed to build a di-chord infographic

```sql
SELECT slug, title, asset_type, image_path, storage_ref
FROM asset_registry
WHERE primary_topics && ARRAY['di_chord', 'pictograph', 'interference_pulsation']
  AND 'infographic' = ANY(format_tags);
```

### Get full di-chord property set for semitone value 3

```sql
SELECT 
    dc.bracket_name,
    dc.common_name,
    dcp.pulsation_type,
    dcp.hz_rate,
    dcp.wave_shape,
    dcf.fo_factor,
    dch.harmonicity,
    dch.blend_quality
FROM di_chords dc
LEFT JOIN di_chord_pulsation dcp ON dc.semitones = dcp.semitones
LEFT JOIN di_chord_fo_factor dcf ON dc.semitones = dcf.semitones
LEFT JOIN di_chord_harmonicity dch ON dc.semitones = dch.semitones
WHERE dc.semitones = 3;
```

### Get full inversion table for Dominant 7th

```sql
SELECT inversion, figured_bass, bass_voice, tenor_voice, alto_voice, soprano_voice, root_location
FROM chord_inversions_7th
WHERE chord_type = 'dominant_7th'
ORDER BY CASE inversion WHEN 'root' THEN 1 WHEN 'first' THEN 2 WHEN 'second' THEN 3 WHEN 'third' THEN 4 END;
```

### Find assets not yet rendered (diagrams only)

```sql
SELECT ar.slug, ar.title, ar.chapter
FROM asset_registry ar
LEFT JOIN diagram_specs ds ON ar.storage_ref = ds.slug
WHERE ar.asset_type = 'diagram'
  AND (ds.last_rendered IS NULL OR ar.image_path IS NULL)
ORDER BY ar.chapter;
```

---

## 12. Integration with AMF Materials

### How sprint materials will use the inventory

When building a sprint infographic (e.g., Sprint 2 — [5] movements):

```sql
-- Find all assets relevant to Sprint 2 topics
SELECT slug, title, image_path, asset_type
FROM asset_registry
WHERE primary_topics && ARRAY['di_chord', 'interference_pulsation']
  AND 'infographic' = ANY(format_tags);
```

The infographic generator (`gen_infographic_pdfs.py`) will be updated to accept asset slugs as inputs and pull rendered images from `public/plogger-assets/`.

### How lesson plans will use the inventory

A lesson plan referencing the di-chord system will pull the Interference Pulsation waveform diagram and the Pulsation Classification table in one query — no recreation needed.

### How the AMF app will use the inventory

API endpoint (future): `GET /api/plogger-assets?topic=di_chord&format=infographic` returns assets with image URLs, ready to embed in any curriculum component.

---

## 13. Open Questions

1. **Chapters not yet fully photographed** — Ch.25 (Transposition), Ch.21 exercises, Ch.9 pages 106-109 are partially or fully missing from the build reference. Phase 1 sweep will flag these gaps; extraction for those chapters waits for source photos.

2. **Diagram rendering toolchain** — Nano Banana (Gemini 2.0 Flash) via Google AI Studio is the rendering target. The full SOP is in `queen-city-redline/.pipeline/deterministic-2d-visual-asset-generation-using-jso/mprd.md`. That file needs to be read in full (it is 1784 lines) before Phase 4 begins. Key question: does the JSON go directly into the AI Studio prompt, or is there a template wrapper?

3. **Color system for di-chord diagrams** — The Plogger book uses a specific color system for the Pictograph (color = harmonicity). The actual hex values need to be confirmed from source photos before locking the diagram specs.

4. **Image dimensions and DPI** — Sprint sheets are generated at 96dpi web resolution. If Plogger assets need to be print-quality (for workbook PDFs), a second render pass at higher resolution may be needed.

5. **Table completeness** — Several tables (F/O Factor, Harmonicity) are "partially captured" in the build reference — we have the structure but not every row value. Phase 3 extraction will identify exactly which rows are missing.

---

*This document is a living plan. It will be updated as phases complete.*  
*File: `docs/PLOGGER_ASSET_INVENTORY_PLAN.md`*  
*GitHub: `https://github.com/epaulson2/amf-app`*
