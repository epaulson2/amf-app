-- AMF Asset Inventory — PostgreSQL Schema
-- Database: amf_assets
-- Run against 127.0.0.1:5432 as postgres superuser

-- ============================================================
-- ASSET REGISTRY — central index for all tiers
-- ============================================================

CREATE TABLE asset_registry (
    id                  SERIAL PRIMARY KEY,
    slug                VARCHAR(100) UNIQUE NOT NULL,
    title               VARCHAR(255) NOT NULL,
    asset_type          VARCHAR(30) NOT NULL CHECK (asset_type IN (
                            'table', 'diagram', 'infographic', 'reference_card',
                            'worksheet', 'poster', 'notation_example', 'annotation_layer',
                            'exercise'
                        )),
    tier                VARCHAR(20) NOT NULL CHECK (tier IN ('plogger', 'external', 'amf_original')),
    source_name         VARCHAR(100),
    chapter             INTEGER,
    page_start          INTEGER,
    page_end            INTEGER,
    primary_topics      TEXT[],
    secondary_topics    TEXT[],
    format_tags         TEXT[],
    storage_ref         TEXT,
    image_path          TEXT,
    synthesis_sources   TEXT[],
    bridges_concepts    TEXT[],
    notes               TEXT,
    created_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ar_tier            ON asset_registry (tier);
CREATE INDEX idx_ar_source_name     ON asset_registry (source_name);
CREATE INDEX idx_ar_asset_type      ON asset_registry (asset_type);
CREATE INDEX idx_ar_chapter         ON asset_registry (chapter);
CREATE INDEX idx_ar_primary_topics  ON asset_registry USING GIN (primary_topics);
CREATE INDEX idx_ar_secondary_topics ON asset_registry USING GIN (secondary_topics);
CREATE INDEX idx_ar_format_tags     ON asset_registry USING GIN (format_tags);
CREATE INDEX idx_ar_synthesis       ON asset_registry USING GIN (synthesis_sources);
CREATE INDEX idx_ar_bridges         ON asset_registry USING GIN (bridges_concepts);

-- ============================================================
-- DIAGRAM SPECS — Nano Banana JSON specs
-- ============================================================

CREATE TABLE diagram_specs (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(100) UNIQUE NOT NULL,
    title           VARCHAR(255),
    tier            VARCHAR(20) NOT NULL CHECK (tier IN ('plogger', 'external', 'amf_original')),
    source_name     VARCHAR(100),
    spec            JSONB NOT NULL,
    spec_version    VARCHAR(10) DEFAULT '1.0',
    render_model    VARCHAR(100) DEFAULT 'gemini-2.0-flash',
    last_rendered   TIMESTAMP,
    render_notes    TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_diagram_specs_slug ON diagram_specs (slug);
CREATE INDEX idx_diagram_specs_tier ON diagram_specs (tier);
CREATE INDEX idx_diagram_specs_spec ON diagram_specs USING GIN (spec);

-- ============================================================
-- TIER 1 DATA TABLES — Plogger Method
-- ============================================================

CREATE TABLE di_chords (
    semitones       INTEGER PRIMARY KEY CHECK (semitones BETWEEN 1 AND 11),
    bracket_name    VARCHAR(10) NOT NULL,
    inversion_pair  INTEGER,
    common_name     VARCHAR(50),
    interval_name   VARCHAR(50)
);

CREATE TABLE di_chord_pulsation (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    pulsation_type  VARCHAR(20) CHECK (pulsation_type IN ('dissonant', 'modal', 'perfect')),
    hz_rate         VARCHAR(20),
    wave_shape      VARCHAR(20),
    perceptual_feel TEXT
);

CREATE TABLE di_chord_fo_factor (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    fo_factor       VARCHAR(30),
    fo_description  TEXT,
    weight_quality  TEXT
);

CREATE TABLE di_chord_harmonicity (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    harmonicity     VARCHAR(30),
    blend_quality   TEXT,
    perceptual_feel TEXT
);

CREATE TABLE di_chord_pictograph (
    semitones       INTEGER PRIMARY KEY REFERENCES di_chords(semitones),
    bracket_name    VARCHAR(10),
    shape           VARCHAR(30),
    shadow          VARCHAR(30),
    color           VARCHAR(30),
    pulsation_type  VARCHAR(20),
    fo_factor       VARCHAR(30),
    harmonicity     VARCHAR(30)
);

CREATE TABLE diatonic_triads (
    scale_degree    INTEGER PRIMARY KEY CHECK (scale_degree BETWEEN 1 AND 7),
    solfege         VARCHAR(5),
    degree_notation VARCHAR(5),
    roman_numeral   VARCHAR(5),
    triad_type      VARCHAR(20),
    root_degree     INTEGER,
    third_degree    INTEGER,
    fifth_degree    INTEGER,
    has_functional_seventh BOOLEAN DEFAULT FALSE,
    seventh_type    VARCHAR(20)
);

CREATE TABLE chord_inversions_7th (
    id              SERIAL PRIMARY KEY,
    chord_type      VARCHAR(30) NOT NULL,
    inversion       VARCHAR(30) NOT NULL,
    figured_bass    VARCHAR(10),
    bass_voice      INTEGER,
    tenor_voice     INTEGER,
    alto_voice      INTEGER,
    soprano_voice   INTEGER,
    bass_identifies_as VARCHAR(20),
    root_location   VARCHAR(60)
);

CREATE TABLE heptachord_modes (
    id                      SERIAL PRIMARY KEY,
    mode_name               VARCHAR(30) NOT NULL,
    starting_degree         INTEGER,
    pythagorean_position    INTEGER,
    characteristic_quality  TEXT,
    differs_from_previous   VARCHAR(60)
);

CREATE TABLE bach_chorale_sequences (
    sequence_number INTEGER PRIMARY KEY,
    soprano_degrees TEXT NOT NULL,
    roman_numerals  TEXT NOT NULL,
    exercise_ref    VARCHAR(20),
    notes           TEXT
);

CREATE TABLE clef_transposition (
    id              SERIAL PRIMARY KEY,
    direction       VARCHAR(10) NOT NULL CHECK (direction IN ('up', 'down')),
    interval_class  VARCHAR(20) NOT NULL,
    di_chord        VARCHAR(5) NOT NULL,
    clef            VARCHAR(30) NOT NULL,
    key_sig_change  VARCHAR(20) NOT NULL,
    accidental_type VARCHAR(5) CHECK (accidental_type IN ('sharp', 'flat'))
);

CREATE TABLE transposing_instruments (
    instrument_key  VARCHAR(5) PRIMARY KEY,
    written_vs_sounding TEXT NOT NULL,
    direction       VARCHAR(10),
    interval        VARCHAR(40),
    notes           TEXT
);

CREATE TABLE melodic_gesture_types (
    id              SERIAL PRIMARY KEY,
    gesture_name    VARCHAR(30) NOT NULL,
    di_chord_range  VARCHAR(30),
    direction       VARCHAR(20),
    character       TEXT,
    notation_symbol VARCHAR(20)
);

CREATE TABLE triad_profiles (
    id              SERIAL PRIMARY KEY,
    triad_type      VARCHAR(20) NOT NULL CHECK (triad_type IN ('major', 'minor', 'diminished', 'augmented')),
    inversion       VARCHAR(20) NOT NULL CHECK (inversion IN ('root', 'first', 'second')),
    figured_bass    VARCHAR(10),
    lower_di_chord  VARCHAR(5),
    upper_di_chord  VARCHAR(5),
    outer_di_chord  VARCHAR(5)
);

CREATE TABLE heptachord_shift_house (
    room_id         INTEGER PRIMARY KEY,
    mode_name       VARCHAR(30) NOT NULL,
    floor           INTEGER CHECK (floor IN (1, 2)),
    position_on_floor INTEGER,
    pythagorean_position INTEGER,
    shift_direction VARCHAR(10),
    target_room     INTEGER REFERENCES heptachord_shift_house(room_id)
);

CREATE TABLE overtone_series (
    partial         INTEGER PRIMARY KEY,
    partial_name    VARCHAR(30),
    di_chord        VARCHAR(5),
    string_ratio    VARCHAR(20),
    frequency_ratio NUMERIC(8,4)
);

-- ============================================================
-- SYNTHESIS CANDIDATES — pre-computed in Phase 6, user-vetted
-- before any Phase 9 creation work begins
-- ============================================================

CREATE TABLE synthesis_candidates (
    id                  SERIAL PRIMARY KEY,
    base_slug           VARCHAR(100) NOT NULL REFERENCES asset_registry(slug),
    overlap_slug        VARCHAR(100) NOT NULL REFERENCES asset_registry(slug),
    overlap_score       NUMERIC(4,2),       -- 0.0–1.0, shared topics / total unique topics
    shared_topics       TEXT[],
    synthesis_rationale TEXT,               -- plain English: what to add, where, why
    candidate_type      VARCHAR(30) CHECK (candidate_type IN ('enrichment', 'bridging', 'new_media')),
    status              VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'complete')),
    user_notes          TEXT,
    created_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sc_base_slug ON synthesis_candidates (base_slug);
CREATE INDEX idx_sc_status    ON synthesis_candidates (status);
CREATE INDEX idx_sc_score     ON synthesis_candidates (overlap_score DESC);
