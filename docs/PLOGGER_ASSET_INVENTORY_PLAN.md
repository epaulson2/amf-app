# AMF Asset Inventory — Comprehensive Plan

**Status:** Active — Three-tier model, Phase 1 complete — June 11, 2026
**Repo:** `epaulson2/amf-app`
**Owner:** AMF curriculum build

---

## Table of Contents

**Vision & Architecture**
1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [What We Are Building](#3-what-we-are-building) — Asset DB · Diagram Library · Query Interface
4. [Asset Types](#4-asset-types) — 8 types: table, diagram, infographic, reference card, worksheet, poster, notation example, annotation layer

**Source Model**
5. [Three-Tier Source Model](#5-three-tier-source-model) — Tier 1: Plogger · Tier 2: External · Tier 3: AMF Originals
6. [Tier 2 — External Source Documents](#6-tier-2--external-source-documents) — Rhythm Code · Emotional Map · Harmony OS · Voicings OS · Beato Book
7. [Tier 3 — AMF Originals](#7-tier-3--amf-originals) — Synthesized · Bridging · New Media

**Technical Spec**
8. [Database Architecture](#8-database-architecture) — `amf_assets` DB · asset_registry · diagram_specs · 15 Tier 1 data tables
9. [Nano Banana JSON Spec Format](#9-nano-banana-json-spec-format) — Deterministic diagram specs · source:"text" vs source:"image"

**Execution**
10. [Phase Plan](#10-phase-plan)
    - [Phase 1 — Tier 1 Sweep ✅](#phase-1--tier-1-sweep--complete) — 60 assets cataloged
    - [Phase 2 — Tier 2 Sweep](#phase-2--tier-2-sweep) — 5 external sources, parallel agents
    - [Phase 3 — Database Setup](#phase-3--database-setup) — Create `amf_assets`, run schema
    - [Phase 4 — Tier 1 Data Extraction](#phase-4--tier-1-data-extraction) — Populate all Tier 1 tables
    - [Phase 5 — Tier 2 Data Extraction](#phase-5--tier-2-data-extraction) — Populate Tier 2 tables
    - [Phase 6 — Diagram Decomposition](#phase-6--diagram-decomposition) — Nano Banana JSON specs for all diagrams
    - [Phase 7 — Image Generation](#phase-7--image-generation) — Render specs via Gemini 2.0 Flash
    - [Phase 8 — Tier 3 Synthesis & Originals](#phase-8--tier-3-synthesis--originals) — Enrich, bridge, create new media
    - [Phase 9 — Query Interface & Integration](#phase-9--query-interface--integration) — SQL patterns, generator script updates

**Reference**
11. [Catalog — Known Tables](#11-catalog--known-tables) — T-01 through T-46 (Tier 1)
12. [Catalog — Known Diagrams](#12-catalog--known-diagrams) — D-01 through D-14 (Tier 1)
13. [Metadata Schema](#13-metadata-schema) — Full field reference for asset_registry
14. [Query Interface](#14-query-interface) — Example SQL patterns by use case
15. [Integration with AMF Materials](#15-integration-with-amf-materials) — Sprint sheets, generator scripts
16. [Key Synthesis Targets](#16-key-synthesis-targets-phase-8-examples) — 5 confirmed Phase 8 targets
17. [Open Questions](#17-open-questions)

---

## 1. Executive Summary

The AMF teaching system draws on multiple source documents — the Plogger Method book, the Emotional Melody Map, the Rhythm Code, Harmony OS, Voicings OS, and the Beato Book — plus original assets we create ourselves. Right now, every table and diagram across all of these sources exists only as an image in a scanned PDF or ZIP archive. There is no single source of truth. When we build sprint infographics, practice sheets, or lesson plans, we recreate these elements from scratch every time.

This plan creates a **unified, searchable asset inventory** covering all AMF teaching sources, organized into three tiers:

- **Tier 1 — Plogger (Foundation):** Every table and diagram from the Plogger Method book. This is the perceptual language layer that everything else builds on.
- **Tier 2 — External Sources:** Tables and diagrams from the four chamber source documents and the Beato Book. Cataloged as-is first, no synthesis yet.
- **Tier 3 — AMF Originals:** Assets we create ourselves — synthesized enrichments of Tier 1/2 diagrams, bridging diagrams that connect concepts across sources, and new media (infographics, reference cards, worksheets, posters).

All tables are stored as real relational SQL tables in the `amf_assets` PostgreSQL database. All diagrams are stored as Nano Banana JSON specs — deterministic, editable, and re-renderable. Both types carry rich metadata: tier, source name, chapter, page, topics, and format.

**End state:** `SELECT * FROM asset_registry WHERE primary_topic = 'interference_pulsation' AND tier = 'plogger'` returns the asset, its metadata, and its storage location — and we can render it immediately.

---

## 2. Problem Statement

### Current state

- Tables and diagrams exist only as images embedded in scanned PDFs across five separate source documents.
- Any reuse requires re-photographing or redrawing from scratch.
- No consistency — the same concept may be rendered differently each time.
- No searchability — finding "the di-chord pulsation table" requires knowing which page of which chapter to look at.
- No editability — if a label needs to change, the whole image must be replaced.
- No cross-source linkage — concepts from the Rhythm Code and the Plogger Pictograph have visual overlap but no shared representation.

### What this costs us

When building a sprint infographic that needs the Interference Pulsation classification table, we currently spend time recreating it manually. When the AMF app needs the Di-Chord Pictograph legend, we hunt for the right photo. When we want to synthesize a diagram that shows Plogger di-chords overlaid with Emotional Melody Map zones, we have no base spec to build on. Multiply this friction across five source documents, nine phases of curriculum, and hundreds of material pieces.

### The fix

Extract once. Store structured. Query always. Build originals on a stable foundation.

---

## 3. What We Are Building

### Component A — AMF Asset Database (`amf_assets` PostgreSQL DB)

A dedicated database (separate from `elderle_db`) with three layers:

1. **Asset Registry** — one row per asset (any tier, any type), with full metadata including tier, source name, and synthesis lineage
2. **Table Storage** — one normalized relational table per source data table
3. **Diagram Spec Storage** — one JSON record per diagram, containing the full Nano Banana rendering spec

### Component B — Diagram Image Library

Each diagram JSON spec is submitted to Nano Banana (Google AI Studio, Gemini 2.0 Flash) to generate a rendered image. Images are stored in `public/amf-assets/<tier>/` in the amf-app repo and linked back to the registry row.

Tier subdirectories:
- `public/amf-assets/plogger/` — Tier 1 rendered images
- `public/amf-assets/external/` — Tier 2 rendered images
- `public/amf-assets/amf-original/` — Tier 3 rendered images

### Component C — Query Interface

SQL patterns (documented in this plan) for common retrieval operations:
- By tier
- By source name
- By primary topic
- By secondary topic
- By asset type (table, diagram, infographic, etc.)
- By format tag (infographic, sprint sheet, reference card, etc.)
- By synthesis lineage (which Tier 3 assets derive from a given Tier 1/2 asset)

---

## 4. Asset Types

The `asset_type` field supports an expanded vocabulary covering all content formats across all three tiers:

| Type | Description |
|------|-------------|
| `table` | Structured data in row/column format. Stored as a real relational SQL table. |
| `diagram` | Visual representation where spatial layout, shape, color, and symbol carry meaning. Stored as a Nano Banana JSON spec. |
| `infographic` | Multi-panel visual designed for standalone use. May combine data from multiple tables and diagrams. |
| `reference_card` | Compact single-page reference — quick lookup, not a teaching artifact. |
| `worksheet` | Student-facing exercise, drill, or fill-in format. |
| `poster` | Large-format visual designed to be printed and displayed. |
| `notation_example` | Musical notation excerpt illustrating a specific concept. |
| `annotation_layer` | A JSON overlay that adds labels, color bands, or callouts to an existing diagram spec. Not a standalone image. |

---

## 5. Three-Tier Source Model

### Tier 1 — Plogger (Foundation)

The backbone of the AMF perceptual language system. Every table and diagram from the Plogger Method book is extracted, stored, and indexed.

- **Tables:** Stored as real relational SQL tables in `amf_assets`. Each row is queryable.
- **Diagrams:** Stored as Nano Banana JSON specs. Every visual element is a named, editable key.
- **Source:** `amf-build-reference.md` (the comprehensive chapter-by-chapter build reference). Phase 1 sweep is complete — 60 assets cataloged (46 tables, 14 diagrams).

**Why Tier 1 is the foundation:** The Plogger system provides the perceptual vocabulary (di-chords, interference pulsation, F/O factor, harmonicity, the Pictograph) that every other chamber and curriculum layer builds on. Tier 2 and Tier 3 assets are only meaningful in relation to Tier 1 constructs.

### Tier 2 — External Sources

Tables and diagrams from the four chamber source documents and the Beato Book. These are cataloged as-is first — no synthesis, no enrichment, no combination with Tier 1. Just inventory.

Same treatment as Tier 1: tables become real SQL tables, diagrams become JSON specs. Metadata tracks source name, source file, and page number.

See Section 6 for the full list of Tier 2 sources and their file paths.

### Tier 3 — AMF Originals

Assets we create ourselves. Three subtypes, each with its own purpose:

1. **Synthesized** — An existing Tier 1 or Tier 2 diagram enriched with concepts from another source. The base spec is already in the database; synthesis adds new JSON element layers (annotation layers, color bands, callout labels). Version-bumped, not replaced.

2. **Bridging** — A new diagram that explicitly connects two concepts from different sources that have no shared visual yet. Designed from scratch, not derived from a single base.

3. **New media** — Infographics, reference cards, posters, worksheets — whatever print format best serves the concept. Not limited to diagram-style visuals.

See Section 7 for full subtype descriptions and examples.

---

## 6. Tier 2 — External Source Documents

Each external source document gets a dedicated Phase 2 sweep (one agent per source, run in parallel). Output is appended to `docs/PLOGGER_ASSET_MANIFEST.md` under a new section per source.

| Source | `source_name` value | File path | Notes |
|--------|---------------------|-----------|-------|
| Emotional Melody Map | `'Emotional Melody Map'` | `docs/uploads/emotional_map_module1.pdf`, `docs/uploads/emotional_map_cheat_sheet_1_master.pdf` | Two files; catalog both |
| Rhythm Code | `'Rhythm Code'` | `docs/uploads/TheRhythmCode2022-lvqkbv.pdf` | Single PDF |
| Harmony OS | `'Harmony OS'` | `docs/uploads/harmony_os_materials.zip` | ZIP archive; extract before sweep |
| Voicings OS | `'Voicings OS'` | `docs/uploads/voicing_os_materials.zip` | ZIP archive; extract before sweep |
| Beato Book | `'Beato Book'` | `docs/uploads/The Beato Book 2.3.pdf` | 58MB — scope to harmony, voicings, and ear training chapters only |

### Beato Book scoping strategy

The Beato Book is 58MB and covers far more ground than AMF needs. The Phase 2 sweep agent for the Beato Book is scoped to:
- Chapters on harmony and functional chord progressions
- Chapters on voicings and chord voicing technique
- Chapters on ear training and interval recognition
- Any chapter that cross-references or overlaps with Plogger concepts (di-chords, harmonic movement, inversion)

Chapters on melody writing, song analysis, and advanced jazz theory are deferred unless they surface a directly relevant table or diagram.

---

## 7. Tier 3 — AMF Originals

### Subtype A — Synthesized

A Tier 1 or Tier 2 diagram enriched with concepts from one or more other sources. The base JSON spec already exists in `diagram_specs`. Synthesis adds new element layers.

**How it works:**
1. Read the base spec
2. Read the source documents that contribute new concepts
3. Write a synthesis spec: new element keys only, structured as an `annotation_layer` asset in the registry
4. Merge into the base spec as new JSON element layers
5. Version-bump the spec (`version: "2.0"`)
6. Re-render; store as `<slug>_v2.png`
7. Registry entry: `tier = 'amf_original'`, `synthesis_sources = ['base_slug', 'source_slug']`

**Example:** Di-Chord Pictograph + AMF Architecture V2 sprint sequence → Pictograph glyphs each labeled "introduced Sprint X"

### Subtype B — Bridging

A new diagram that explicitly fills a conceptual gap between two source concepts that have no shared visual. Designed from scratch — no single base spec.

**How it works:**
1. Identify the gap (e.g., di-chord bracket numbers have no visual connection to harmonic root movement sequence)
2. Design the bridging diagram as a new Nano Banana JSON spec
3. Full registry entry: `tier = 'amf_original'`, `bridges_concepts = ['concept_A_slug', 'concept_B_slug']`

**Example:** Di-chord bracket numbers mapped onto harmonic root movement sequence as a matrix diagram

### Subtype C — New Media

Infographics, reference cards, posters, worksheets, or any other print format that best serves a concept not yet covered by a table or diagram.

**How it works:**
1. Design session: identify what format best serves the concept (is it a poster-size reference? a fill-in worksheet? a compact reference card?)
2. Write the Nano Banana JSON spec for the chosen format
3. Registry entry: `asset_type` reflects the format (`infographic`, `reference_card`, `worksheet`, `poster`, etc.), `tier = 'amf_original'`

**Example:** A sprint-by-sprint harmonic movement reference card showing which di-chords are targeted in each AMF sprint

---

## 8. Database Architecture

### Database: `amf_assets`

```sql
-- Create database
CREATE DATABASE amf_assets;
```

SQL script location: `docs/sql/amf_assets_schema.sql`

---

### 8.1 Asset Registry Table

The central index. Every table, diagram, infographic, reference card, worksheet, and poster across all three tiers has exactly one row here.

```sql
CREATE TABLE asset_registry (
    id                  SERIAL PRIMARY KEY,
    slug                VARCHAR(100) UNIQUE NOT NULL,   -- e.g. 'di_chord_pulsation_table'
    title               VARCHAR(255) NOT NULL,
    asset_type          VARCHAR(30) NOT NULL CHECK (asset_type IN (
                            'table', 'diagram', 'infographic', 'reference_card',
                            'worksheet', 'poster', 'notation_example', 'annotation_layer'
                        )),
    tier                VARCHAR(20) NOT NULL CHECK (tier IN ('plogger', 'external', 'amf_original')),
    source_name         VARCHAR(100),                   -- e.g. 'Plogger Method', 'Rhythm Code',
                                                        --   'Emotional Melody Map', 'Beato Book', 'AMF'
    chapter             INTEGER,
    page_start          INTEGER,
    page_end            INTEGER,
    primary_topics      TEXT[],                         -- e.g. ARRAY['interference_pulsation', 'di_chord']
    secondary_topics    TEXT[],                         -- e.g. ARRAY['wave_shape', 'perceptual_language']
    format_tags         TEXT[],                         -- e.g. ARRAY['infographic', 'sprint_sheet']
    storage_ref         TEXT,                           -- table name OR diagram_specs.slug
    image_path          TEXT,                           -- public/amf-assets/<tier>/<filename>.png
    synthesis_sources   TEXT[],                         -- Tier 3 only: Tier 1/2 asset slugs this derives from
    bridges_concepts    TEXT[],                         -- Tier 3 bridging only: conceptual gap being filled
    notes               TEXT,
    created_at          TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_asset_registry_tier ON asset_registry (tier);
CREATE INDEX idx_asset_registry_source_name ON asset_registry (source_name);
CREATE INDEX idx_asset_registry_asset_type ON asset_registry (asset_type);
CREATE INDEX idx_asset_registry_chapter ON asset_registry (chapter);
CREATE INDEX idx_asset_registry_primary_topics ON asset_registry USING GIN (primary_topics);
CREATE INDEX idx_asset_registry_secondary_topics ON asset_registry USING GIN (secondary_topics);
CREATE INDEX idx_asset_registry_format_tags ON asset_registry USING GIN (format_tags);
CREATE INDEX idx_asset_registry_synthesis_sources ON asset_registry USING GIN (synthesis_sources);
CREATE INDEX idx_asset_registry_bridges_concepts ON asset_registry USING GIN (bridges_concepts);
```

---

### 8.2 Diagram Specs Table

Stores the full Nano Banana JSON spec for each diagram. The JSON is the single source of truth — the image is derived from it.

```sql
CREATE TABLE diagram_specs (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(100) UNIQUE NOT NULL,
    title           VARCHAR(255),
    tier            VARCHAR(20) NOT NULL CHECK (tier IN ('plogger', 'external', 'amf_original')),
    source_name     VARCHAR(100),
    spec            JSONB NOT NULL,                     -- full Nano Banana JSON spec
    spec_version    VARCHAR(10) DEFAULT '1.0',
    render_model    VARCHAR(100) DEFAULT 'gemini-2.0-flash',
    last_rendered   TIMESTAMP,
    render_notes    TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);
```

---

### 8.3 Individual Data Tables (Star Schema)

Each source table gets its own normalized SQL table. Tables from Tier 1 are documented below. Tier 2 table schemas will be defined during Phase 2 sweeps when their structure is confirmed from source PDFs.

#### `di_chords` — Complete Di-Chord Reference (Tier 1, Ch.9)

```sql
CREATE TABLE di_chords (
    semitones       INTEGER PRIMARY KEY CHECK (semitones BETWEEN 1 AND 11),
    bracket_name    VARCHAR(10) NOT NULL,            -- '[1]', '[2]', etc.
    inversion_pair  INTEGER,                         -- 12 - semitones
    common_name     VARCHAR(50),
    interval_name   VARCHAR(50)
);
```

#### `di_chord_pulsation` — Interference Pulsation Classification (Tier 1, Ch.11)

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

#### `di_chord_fo_factor` — F/O Factor (Tier 1, Ch.12)

```sql
CREATE TABLE di_chord_fo_factor (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    fo_factor       VARCHAR(30),                     -- e.g. 'fundamental', 'octave', 'neutral'
    fo_description  TEXT,
    weight_quality  TEXT
);
```

#### `di_chord_harmonicity` — Harmonicity (Tier 1, Ch.13)

```sql
CREATE TABLE di_chord_harmonicity (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    harmonicity     VARCHAR(30),                     -- e.g. 'high', 'medium', 'low'
    blend_quality   TEXT,
    perceptual_feel TEXT
);
```

#### `di_chord_pictograph` — Full Pictograph Properties (Tier 1, Ch.10-14)

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

#### `diatonic_triads` — Diatonic Triad Reference (Tier 1, Ch.23)

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

#### `chord_inversions_7th` — 7th Chord Inversion Tables (Tier 1, Ch.22)

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

#### `heptachord_modes` — Mode Reference (Tier 1, Ch.18-20)

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

#### `bach_chorale_sequences` — The 10 Harmonization Sequences (Tier 1, Ch.23)

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

## 9. Nano Banana JSON Spec Format

Diagrams are stored as structured JSON where every visual element is a named, typed attribute. The schema follows the pattern established in `queen-city-redline/docs/reference/JSON_PROMPT_SCHEMA.md`, adapted for educational diagrams rather than character generation.

### Core Principles

- Each visual element has a `source` field: `"text"` (set explicitly in JSON) or `"image"` (locked from reference image)
- `image_locked: true` on any element prevents modification unless intentional
- Every renderable attribute is a key — changing the key changes the output deterministically
- The spec is the single source of truth; the image is a derived artifact
- For Tier 3 synthesized assets, new element layers are additive — they do not replace existing elements

### Diagram JSON Structure

```json
{
  "task": "Create educational music theory diagram",
  "diagram_id": "di_chord_pictograph_legend",
  "version": "1.0",
  "tier": "plogger",
  "source_name": "Plogger Method",
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
6. **Tier and source_name** — embedded in the spec so every rendered image carries provenance

---

## 10. Phase Plan

### Phase 1 — Tier 1 Sweep ✅ COMPLETE

**Goal:** Catalog every table and diagram in the Plogger Method book.

**Input:** `amf-build-reference.md` (covers all chapters)

**Output:** `docs/PLOGGER_ASSET_MANIFEST.md` — one row per asset, with chapter, page, asset type, working title, description, and completeness flag.

**Result:** 60 assets cataloged — 46 tables, 14 diagrams.

---

### Phase 2 — Tier 2 Sweep

**Goal:** Catalog every table and diagram in each external source document. No extraction yet — discovery only.

**One agent per source, run in parallel:**

| Agent | Source | Input file(s) |
|-------|--------|---------------|
| Agent A | Emotional Melody Map | `emotional_map_module1.pdf`, `emotional_map_cheat_sheet_1_master.pdf` |
| Agent B | Rhythm Code | `TheRhythmCode2022-lvqkbv.pdf` |
| Agent C | Harmony OS | `harmony_os_materials.zip` (extract first) |
| Agent D | Voicings OS | `voicing_os_materials.zip` (extract first) |
| Agent E | Beato Book | `The Beato Book 2.3.pdf` — scoped to harmony, voicings, and ear training chapters |

**Output:** Each agent appends its findings to `docs/PLOGGER_ASSET_MANIFEST.md` under a new `## [Source Name]` section, in the same format as Phase 1.

---

### Phase 3 — Database Setup

**Goal:** Create the `amf_assets` database and all schema tables.

**Steps:**
1. `CREATE DATABASE amf_assets` on `127.0.0.1:5432`
2. Run all `CREATE TABLE` statements from Section 8
3. Create all GIN indexes on array fields (`primary_topics`, `secondary_topics`, `format_tags`, `synthesis_sources`, `bridges_concepts`)
4. Create B-tree indexes on `tier`, `source_name`, `asset_type`, `chapter`
5. Verify with `\dt` and `\d tablename`

**SQL script:** `docs/sql/amf_assets_schema.sql`

---

### Phase 4 — Tier 1 Table Extraction (Parallel by Chapter Group)

**Goal:** Populate each Tier 1 relational table with data extracted from `amf-build-reference.md`.

**Parallel batches:**

| Batch | Chapters | Tables |
|-------|----------|--------|
| A | Ch.9-14 | `di_chords`, `di_chord_pulsation`, `di_chord_fo_factor`, `di_chord_harmonicity`, `di_chord_pictograph` |
| B | Ch.22 | `chord_inversions_7th` |
| C | Ch.23 | `diatonic_triads`, `bach_chorale_sequences` |
| D | Ch.18-20 | `heptachord_modes` |
| E | Ch.25 | `clef_transposition`, `transposing_instruments` |
| F | Remaining | Any additional tables from Phase 1 manifest not covered above |

**Output:** `INSERT` statements + `asset_registry` rows for each table (tier = 'plogger', source_name = 'Plogger Method').

---

### Phase 5 — Tier 2 Table Extraction

**Goal:** Populate relational tables for external source tables discovered in Phase 2.

**Same approach as Phase 4:** one agent per source, parallel. Each agent reads the manifest section for its source, extracts the table data, writes `CREATE TABLE` + `INSERT` statements, and inserts `asset_registry` rows (tier = 'external', source_name = source document name).

---

### Phase 6 — Diagram Decomposition (All Tiers)

**Goal:** For each diagram in the manifest (Tier 1 and Tier 2), produce a Nano Banana JSON spec.

**Process per diagram:**
1. Read the diagram description from the manifest and the source document
2. Identify all visual elements (shapes, labels, colors, layout, text)
3. Map each element to a JSON attribute with explicit `source: "text"` values
4. Write spec to `diagram_specs` table and to `docs/diagram-specs/<slug>.json`
5. Insert `asset_registry` row pointing to the spec

**Priority order — Tier 1 first:**
1. Di-Chord Pictograph (most reused — appears in Ch.10, Ch.23, and every sprint)
2. Interference Pulsation Waveforms (Ch.11)
3. Heptachord Keyboard Map (Ch.18-20)
4. 7th Chord Inversion Stack Diagrams (Ch.22)
5. Tracking Page Template

Tier 2 diagrams follow after Tier 1 top 5 are complete.

---

### Phase 7 — Image Generation

**Goal:** Submit all JSON specs to Nano Banana and store rendered images.

**Process:**
1. For each spec in `diagram_specs`, prepare the JSON prompt
2. Submit to Gemini 2.0 Flash via Google AI Studio (Nano Banana process)
3. Save output image to `public/amf-assets/<tier>/<slug>.png`
4. Update `asset_registry.image_path` and `diagram_specs.last_rendered`

**Note:** This phase requires submission through the Nano Banana / AI Studio UI per the established SOP in `queen-city-redline/.pipeline/deterministic-2d-visual-asset-generation-using-jso/mprd.md`. Read that file in full (1784 lines) before submitting the first spec. Key question to resolve: does the JSON go directly into the AI Studio prompt, or is there a template wrapper?

---

### Phase 8 — Tier 3 Synthesis and Originals

**Two-part phase.**

**Part A — Synthesized**

For each Tier 1 and Tier 2 diagram (starting with the top 5 priority Tier 1 diagrams):

1. **Overlap audit** (one agent per diagram): read the diagram spec + all source documents that have conceptual overlap; produce a synthesis spec listing what to add, where, in what JSON key
2. **Spec update**: merge synthesis additions into the existing JSON spec as new element layers; version-bump to `"2.0"`
3. **Re-render**: submit updated spec to Nano Banana; store as `<slug>_v2.png`
4. **Registry update**: insert a new `asset_registry` row with `tier = 'amf_original'`, `synthesis_sources[] = [base_slug, ...]`

**Part B — Bridging and New Media**

1. **Gap identification**: design session to identify conceptual connections that exist in the curriculum but have no visual yet
2. **Bridging diagrams**: new Nano Banana JSON specs designed from scratch; registry entry with `bridges_concepts[]` populated
3. **New media**: infographics, reference cards, worksheets, or posters for concepts not covered by any existing asset; registry entry with appropriate `asset_type`

See Section 16 for specific synthesis targets confirmed in the architecture conversation.

---

### Phase 9 — Query Interface and Integration

**Goal:** Document all SQL patterns and connect the inventory to the AMF app build pipeline.

**Deliverables:**
- SQL query catalog documented in this plan (Section 14) — updated after Phases 4-8 complete
- `gen_infographic_pdfs.py` updated to accept asset slugs and pull rendered images from `public/amf-assets/`
- API endpoint design: `GET /api/amf-assets?tier=plogger&topic=di_chord&format=infographic`

---

## 11. Catalog — Known Tables

Phase 1 sweep results. Tier 1 (Plogger Method) only. Phase 2 will extend this with Tier 2 entries.

| # | Title | Tier | Source | Chapter | Pages | Storage Table | Status |
|---|-------|------|--------|---------|-------|---------------|--------|
| T-01 | Di-Chord Complete Reference | Tier 1 | Plogger Method | 9 | 101-105 | `di_chords` | Partially captured |
| T-02 | Interference Pulsation Classification | Tier 1 | Plogger Method | 11 | 112-114 | `di_chord_pulsation` | Captured |
| T-03 | F/O Factor Classification | Tier 1 | Plogger Method | 12 | 121-125 | `di_chord_fo_factor` | Partially captured |
| T-04 | Harmonicity Classification | Tier 1 | Plogger Method | 13 | 126-130 | `di_chord_harmonicity` | Partially captured |
| T-05 | Di-Chord Pictograph Properties | Tier 1 | Plogger Method | 10-14 | Various | `di_chord_pictograph` | Partially captured |
| T-06 | Diatonic Triad Reference | Tier 1 | Plogger Method | 23 | 264 | `diatonic_triads` | Captured |
| T-07 | 7th Chord Root Position | Tier 1 | Plogger Method | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-08 | 7th Chord 1st Inversion | Tier 1 | Plogger Method | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-09 | 7th Chord 2nd Inversion | Tier 1 | Plogger Method | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-10 | 7th Chord 3rd Inversion | Tier 1 | Plogger Method | 22 | 249-253 | `chord_inversions_7th` | Captured |
| T-11 | Bach Chorale 10 Sequences | Tier 1 | Plogger Method | 23 | 266-269 | `bach_chorale_sequences` | Captured |
| T-12 | Heptachord Mode Reference | Tier 1 | Plogger Method | 18-20 | TBD | `heptachord_modes` | Partially captured |
| T-13 | Pythagorean Ordering Reference | Tier 1 | Plogger Method | 23 | 265 | `heptachord_modes` | Captured |

---

## 12. Catalog — Known Diagrams

Phase 1 sweep results. Tier 1 (Plogger Method) only. Phase 2 will extend this with Tier 2 entries.

| # | Title | Tier | Source | Chapter | Pages | Spec Slug | Status |
|---|-------|------|--------|---------|-------|-----------|--------|
| D-01 | Di-Chord Pictograph — Full Grid | Tier 1 | Plogger Method | 10-14 | ~115 | `di_chord_pictograph_grid` | Not started |
| D-02 | Interference Pulsation Waveforms | Tier 1 | Plogger Method | 11 | 112-113 | `pulsation_waveforms` | Not started |
| D-03 | F/O Factor Visual | Tier 1 | Plogger Method | 12 | 121 | `fo_factor_visual` | Not started |
| D-04 | Harmonicity Blend Visual | Tier 1 | Plogger Method | 13 | 126 | `harmonicity_visual` | Not started |
| D-05 | Heptachord Keyboard Color Map | Tier 1 | Plogger Method | 18-20 | TBD | `heptachord_keyboard_map` | Not started |
| D-06 | Conjunct Finger Mapping | Tier 1 | Plogger Method | 16-17 | TBD | `conjunct_finger_map` | Not started |
| D-07 | 7th Chord Inversion Stack — Dom7 | Tier 1 | Plogger Method | 22 | 249 | `inversion_stack_dom7` | Not started |
| D-08 | 7th Chord Inversion Stack — Min7 | Tier 1 | Plogger Method | 22 | 250 | `inversion_stack_min7` | Not started |
| D-09 | Di-Chord Number Line | Tier 1 | Plogger Method | 9 | 101 | `dichord_number_line` | Not started |
| D-10 | SATB Harmonization Template | Tier 1 | Plogger Method | 23 | 267 | `satb_harmonization_template` | Not started |
| D-11 | Tracking Page Grid Template | Tier 1 | Plogger Method | TBD | TBD | `tracking_page_template` | Not started |
| D-12 | Pythagorean Mode Cluster Map | Tier 1 | Plogger Method | 23 | 265 | `pythagorean_mode_clusters` | Not started |
| D-13 | Heptachord Shift House Plan | Tier 1 | Plogger Method | 18-20 | TBD | `heptachord_shift_house_plan` | Not started |

---

## 13. Metadata Schema

Every asset in the registry carries this metadata. These are the official controlled vocabularies.

### Primary Topics

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
emotional_melody
voicing_technique
functional_harmony
```

### Secondary Topics

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
sprint_sequence
zone_mapping
annotation
```

### Format Tags

```
infographic          -- standalone infographic panel
sprint_sheet         -- sprint practice sheet
lesson_plan          -- lesson plan reference
quick_reference      -- compact reference card format
exercise             -- student exercise or drill
illustration         -- explanatory illustration, not data
data_table           -- pure data, row/column format
poster               -- large-format print display
worksheet            -- student fill-in format
```

---

## 14. Query Interface

### Find all Plogger assets for a topic

```sql
SELECT id, slug, title, asset_type, chapter, page_start
FROM asset_registry
WHERE tier = 'plogger'
  AND 'interference_pulsation' = ANY(primary_topics)
ORDER BY chapter;
```

### Find all assets across all tiers for a topic

```sql
SELECT id, slug, title, tier, source_name, asset_type, chapter
FROM asset_registry
WHERE 'di_chord' = ANY(primary_topics)
ORDER BY tier, chapter;
```

### Find everything needed to build a di-chord infographic

```sql
SELECT slug, title, tier, asset_type, image_path, storage_ref
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

### Find all Tier 3 assets derived from a specific Tier 1 base

```sql
SELECT slug, title, asset_type, synthesis_sources, bridges_concepts
FROM asset_registry
WHERE tier = 'amf_original'
  AND 'di_chord_pictograph_grid' = ANY(synthesis_sources);
```

### Find all bridging diagrams and what conceptual gap each fills

```sql
SELECT slug, title, bridges_concepts
FROM asset_registry
WHERE tier = 'amf_original'
  AND bridges_concepts IS NOT NULL
  AND array_length(bridges_concepts, 1) > 0
ORDER BY slug;
```

### Find assets not yet rendered (diagrams only)

```sql
SELECT ar.slug, ar.title, ar.tier, ar.chapter
FROM asset_registry ar
LEFT JOIN diagram_specs ds ON ar.storage_ref = ds.slug
WHERE ar.asset_type IN ('diagram', 'infographic', 'poster', 'reference_card', 'worksheet')
  AND (ds.last_rendered IS NULL OR ar.image_path IS NULL)
ORDER BY ar.tier, ar.chapter;
```

### Find all external source assets (Tier 2) by source

```sql
SELECT slug, title, asset_type, chapter, page_start
FROM asset_registry
WHERE tier = 'external'
  AND source_name = 'Rhythm Code'
ORDER BY chapter;
```

---

## 15. Integration with AMF Materials

### How sprint materials will use the inventory

When building a sprint infographic (e.g., Sprint 2 — [5] movements):

```sql
-- Find all assets relevant to Sprint 2 topics, suitable for infographic use
SELECT slug, title, tier, image_path, asset_type
FROM asset_registry
WHERE primary_topics && ARRAY['di_chord', 'interference_pulsation']
  AND 'infographic' = ANY(format_tags);
```

The infographic generator (`gen_infographic_pdfs.py`) will be updated to accept asset slugs as inputs and pull rendered images from `public/amf-assets/<tier>/`.

### How lesson plans will use the inventory

A lesson plan referencing the di-chord system pulls the Interference Pulsation waveform diagram and the Pulsation Classification table in one query — no recreation needed. If a synthesized (Tier 3) version of that diagram exists with sprint annotations, it is preferred over the base Tier 1 version.

```sql
-- Prefer synthesized versions when available
SELECT slug, title, tier, image_path
FROM asset_registry
WHERE 'di_chord' = ANY(primary_topics)
  AND asset_type = 'diagram'
ORDER BY tier DESC;   -- 'plogger' < 'external' < 'amf_original' alphabetically;
                      -- adjust with CASE for explicit tier priority if needed
```

### How the AMF app will use the inventory

API endpoint (Phase 9): `GET /api/amf-assets?tier=plogger&topic=di_chord&format=infographic`

Returns assets with image URLs, tier, source name, and metadata — ready to embed in any curriculum component.

---

## 16. Key Synthesis Targets (Phase 8 Examples)

These are the confirmed synthesis targets from AMF architecture conversations. Each becomes a Tier 3 asset in Phase 8.

### Synthesized (Subtype A)

**Di-Chord Pictograph + AMF Architecture V2 sprint sequence**
- Base: `di_chord_pictograph_grid` (Tier 1)
- Synthesis source: AMF Architecture V2 harmonic movement sequence
- Addition: "first introduced in Sprint X" label per di-chord glyph; highlight [5][7] as Sprint 2-3 targets, [3][4] as Sprint 5-7 targets
- Output slug: `di_chord_pictograph_sprint_annotated`

**Heptachord Keyboard Map + Melody Zone system**
- Base: `heptachord_keyboard_map` (Tier 1)
- Synthesis source: Melody Zone system (Zone 1-4 stability ladder)
- Addition: Zone 1-4 color coding overlaid on di-chord function; Zone 1 = chord tones, Zone 3 = dissonant passing tones, Zone 2 = modal color tones
- Output slug: `heptachord_keyboard_melody_zones`

**Pulsation Waveforms + Melody Zone system**
- Base: `pulsation_waveforms` (Tier 1)
- Synthesis source: Melody Zone system
- Addition: color bands mapping dissonant di-chords → Zone 3-4, perfect di-chords → Zone 1-2
- Output slug: `pulsation_waveforms_zone_bands`

**7th Chord Inversion Stacks + Functional Harmony**
- Base: `inversion_stack_dom7` (Tier 1)
- Synthesis source: AMF Architecture V2 Sprint 8 tritone content
- Addition: functional harmony labels per chord type (V7 = dominant, ii7 = pre-dominant); tritone resolution path annotated in dominant 7th stack
- Output slug: `inversion_stack_dom7_functional`

**Heptachord Shift House Plan + Sprint Map**
- Base: `heptachord_shift_house_plan` (Tier 1)
- Synthesis source: AMF Architecture V2 sprint-by-sprint mode introduction sequence
- Addition: each room annotated with which sprint introduces it
- Output slug: `heptachord_shift_house_sprint_map`

### Bridging (Subtype B)

**Di-Chord numbers mapped onto harmonic root movement sequence**
- No existing base spec covers this connection
- Gap: di-chord bracket numbers exist in the Pictograph; harmonic root movement sequence exists in AMF Architecture V2; no visual connects them
- Design: matrix or arc diagram with di-chord numbers as nodes, root movement as edges
- Output slug: `dichord_harmonic_root_movement_matrix`
- `bridges_concepts`: `['di_chord_pictograph_grid', 'harmonic_root_movement_sequence']`

### New Media (Subtype C)

**Transposition Clef wheel/matrix diagram**
- The clef transposition table (Ch.25) currently exists as a data table only
- New media design: wheel or matrix with clefs as nodes, di-chords as edges showing transposition intervals
- `asset_type`: `diagram` (not a table)
- Output slug: `transposition_clef_wheel`

---

## 17. Open Questions

1. **Ch.9 pages 106–109** — still not captured; extraction for those pages waits for source photos or a higher-resolution scan.

2. **Diagram rendering toolchain** — Nano Banana (Gemini 2.0 Flash) via Google AI Studio is the rendering target. The full SOP is in `queen-city-redline/.pipeline/deterministic-2d-visual-asset-generation-using-jso/mprd.md` (1784 lines). This must be read in full before Phase 6 begins. Key unresolved question: does the JSON go directly into the AI Studio prompt, or is there a template wrapper?

3. **Color system for di-chord diagrams** — The Plogger book uses a specific color system for the Pictograph (color = harmonicity). The actual hex values need to be confirmed from source photos before locking the diagram specs.

4. **Image dimensions and DPI** — Sprint sheets are generated at 96dpi web resolution. If AMF assets need to be print-quality (for workbook PDFs), a second render pass at higher resolution may be needed.

5. **Table completeness** — Several Tier 1 tables (F/O Factor, Harmonicity) are "partially captured" in the build reference — we have the structure but not every row value. Phase 4 extraction will identify exactly which rows are missing.

6. **Synthesis ordering** — Phase 8 Part A works best if it starts with the highest-reuse diagrams (Di-Chord Pictograph, Keyboard Map). The overlap audit needs all source documents to be stable first. Recommendation: run Phase 8 after Phase 7 is complete for the top 5 Tier 1 priority diagrams.

7. **Beato Book scoping strategy** — 58MB is too large to sweep in full. The Phase 2 agent is currently scoped to harmony, voicings, and ear training chapters. Open question: is there a chapter-by-chapter table of contents available that would let us pre-filter to the most relevant 20% of the book before the sweep agent runs?

---

*This document is a living plan. It will be updated as phases complete.*
*File: `docs/PLOGGER_ASSET_INVENTORY_PLAN.md`*
*GitHub: `https://github.com/epaulson2/amf-app`*
