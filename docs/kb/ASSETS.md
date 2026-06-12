# AMF Asset Reference

> Machine-readable reference for the `amf_assets` PostgreSQL database.
> A future agent should be able to read this file and know exactly what assets exist without querying the DB.
> Generated: 2026-06-12. Row counts: asset_registry=177, synthesis_candidates=45, diagram_specs=0.

---

## Overview

Total: **177 assets** across 2 tiers and 6 source books.

| Tier | Source | Count |
|------|--------|------:|
| plogger | Plogger Method | 89 |
| external | Rhythm Code | 33 |
| external | Harmony OS | 28 |
| external | Voicings OS | 13 |
| external | Emotional Melody Map | 10 |
| external | Guitar Theory Course | 4 |
| **Total** | | **177** |

Asset types present: `table`, `diagram`, `infographic`, `reference_card`, `worksheet`, `notation_example`, `exercise`, `poster`, `annotation_layer`.

---

## Database Schema Quick Reference

### Table: `asset_registry`

| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | auto-increment |
| slug | varchar(100) UNIQUE | primary lookup key |
| title | varchar(255) | human-readable name |
| asset_type | varchar(30) | CHECK: table/diagram/infographic/reference_card/worksheet/poster/notation_example/annotation_layer/exercise |
| tier | varchar(20) | CHECK: plogger / external / amf_original |
| source_name | varchar(100) | "Plogger Method", "Rhythm Code", "Harmony OS", "Voicings OS", "Emotional Melody Map", "Guitar Theory Course" |
| chapter | integer | Plogger chapter number; NULL for external |
| page_start | integer | source page start; NULL if unconfirmed |
| page_end | integer | source page end |
| primary_topics | text[] | GIN-indexed array of topic slugs |
| secondary_topics | text[] | GIN-indexed array |
| format_tags | text[] | GIN-indexed |
| storage_ref | text | future file path |
| image_path | text | future image path |
| synthesis_sources | text[] | GIN-indexed |
| bridges_concepts | text[] | GIN-indexed |
| notes | text | capture notes / completeness flags |
| created_at | timestamp | default now() |

Key indexes: `idx_ar_tier` (btree), `idx_ar_source_name` (btree), `idx_ar_chapter` (btree), `idx_ar_asset_type` (btree), `idx_ar_primary_topics` (GIN), `idx_ar_secondary_topics` (GIN), `idx_ar_bridges` (GIN), `idx_ar_synthesis` (GIN), `idx_ar_format_tags` (GIN).

### Table: `synthesis_candidates`

| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | auto-increment |
| base_slug | varchar(100) FK→asset_registry.slug | Plogger-side asset |
| overlap_slug | varchar(100) FK→asset_registry.slug | external-side asset |
| overlap_score | numeric(4,2) | 0.00–1.00; higher = stronger synthesis case |
| shared_topics | text[] | topics in common |
| synthesis_rationale | text | agent-generated description of synthesis product |
| candidate_type | varchar(30) | CHECK: enrichment / bridging / new_media |
| status | varchar(20) | CHECK: pending / approved / rejected / complete |
| user_notes | text | human override notes |
| created_at | timestamp | |

Key indexes: `idx_sc_base_slug` (btree), `idx_sc_score` (btree DESC), `idx_sc_status` (btree).

### Table: `diagram_specs`

| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | |
| slug | varchar | links to asset_registry |
| title | varchar | diagram title |
| tier | varchar | |
| source_name | varchar | |

Currently **0 rows** — Phase 7 (Nano Banana visual decomposition) has not yet started.

---

## Tier 1 — Plogger Method Assets (89 assets)

### Chapter 3 — Keyboard & Solfege (9 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| keyboard_drawing_template | Keyboard Drawing Template | diagram | 31–31 | keyboard, diagram |
| pw_black_key_flat_names_diagram | Black Key Flat Names Diagram | diagram | 38–38 | keyboard, ear_training |
| pw_black_key_sharp_names_diagram | Black Key Sharp Names Diagram | diagram | 37–37 | keyboard, ear_training |
| pw_blank_keyboard_mapping_letter_names | Blank Keyboard Mapping Worksheet — Letter Names | worksheet | 48–48 | keyboard, ear_training |
| pw_blank_keyboard_mapping_solfege | Blank Keyboard Mapping Worksheet — Solfege | worksheet | 48–48 | keyboard, ear_training |
| pw_complete_keyboard_all_names | Complete Keyboard with All Names (Most-Common in Boxes) | diagram | 39–39 | keyboard, ear_training |
| pw_keyboard_proportion_template | Keyboard Proportion Template for Drawing | worksheet | 41–41 | keyboard |
| pw_solfege_quiz_tables | Solfege Quiz Tables (3 sets, sharps and flats) | worksheet | 49–50 | ear_training, keyboard |
| pw_solfege_to_letter_name_table | Solfege-to-Letter Name Reference Table | table | 47–47 | ear_training, keyboard |
| pw_white_key_solfege_diagram | White Key Solfege Diagram (doh–re–mi–fa–sol–la–si) | diagram | 36–36 | keyboard, ear_training |

*(10 rows listed; chapter 3 has 10 assets)*

### Chapter 4 — Longy Rhythm Chart (3 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| longy_rhythm_chart_full | Longy Rhythm Chart (Full) | diagram | 51–51 | longy, rhythm |
| longy_syllable_patterns | Longy Syllable Patterns (partial subset) | table | 51–51 | longy, rhythm, syllables |
| pw_longy_rhythm_chart | Longy Rhythm Chart | table | 53–53 | rhythm, subdivision |

### Chapter 5 — Lap Maps (7 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| lap_map_diagram | Lap Map Diagram | diagram | 61–61 | lap_map, rhythm, beat |
| pw_lap_map_2_beat | Lap Map: 2-Beat Pattern Diagram | diagram | 62–63 | rhythm, pulsation |
| pw_lap_map_3_beat | Lap Map: 3-Beat Pattern Diagram | diagram | 62–64 | rhythm, pulsation |
| pw_lap_map_4_beat | Lap Map: 4-Beat Pattern Diagram | diagram | 65–65 | rhythm, pulsation |
| pw_lap_map_5_beat | Lap Map: 5-Beat Patterns (2+3 and 3+2) Diagrams | diagram | 66–67 | rhythm, pulsation |
| pw_lap_map_6_beat | Lap Map: 6-Beat Patterns (3+3 and 2+2+2) Diagrams | diagram | 68–69 | rhythm, pulsation |
| pw_lap_map_7_beat | Lap Map: 7-Beat Patterns (3+2+2, 2+2+3, 2+3+2) Diagrams | diagram | 71–72 | rhythm, pulsation |

### Chapter 6 — Pythagorean Fifths (3 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| pw_ascending_fifths_notation | Ascending Fifths Notation Examples (Ex.6-1 and 6-2) | notation_example | 77–77 | fo_factor, ear_training |
| pw_descending_fifths_notation | Descending Fifths Notation Example (Ex.6-5) | notation_example | 78–78 | fo_factor, ear_training |
| pw_pythagorean_ordering_of_fifths | Pythagorean Ordering of Fifths Reference | reference_card | 76–76 | fo_factor, overtone |

### Chapter 7 — Intervals (1 asset)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| pw_interval_size_keyboard_diagrams | Interval Size Keyboard Diagrams (3rd and 4th) | diagram | 79–80 | keyboard, ear_training |

### Chapter 8 — Clefs & Notation (7 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| eight_clef_drawings_middle_c | Eight Clef Drawings with Middle C (Ex.8-1) | diagram | 84–84 | clef, middle_c, notation |
| pw_a_tisket_a_tasket_no_clef | A Tisket A Tasket Melody Notation (No Clef) | notation_example | 91–91 | melody, ear_training |
| pw_blank_staff_interval_writing_worksheet | Blank Staff Interval Writing Worksheet | worksheet | 95–97 | ear_training, harmony |
| pw_eight_clef_drawing_worksheet | Eight Clef Drawing Practice Worksheet | worksheet | 87–88 | ear_training |
| pw_eight_clef_reference_diagrams | Eight Clef Reference Diagrams | diagram | 85–86 | ear_training, keyboard |
| pw_row_row_row_your_boat_no_clef | Row, Row, Row Your Boat Melody Notation (No Clef) | notation_example | 90–90 | melody, ear_training |
| pw_written_intervals_identification_exercise | Written Intervals Identification Exercise | exercise | 94–95 | ear_training, harmony |
| pw_yankee_doodle_no_clef | Yankee Doodle Melody Notation (No Clef) | notation_example | 89–92 | melody, ear_training |

### Chapter 10 — Di-Chord Pictograph (1 asset)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| di_chord_pictograph_complete | Di-Chord Pictograph (Complete) | diagram | 110–135 | di_chord, pictograph |

### Chapter 11 — Di-Chord Pulsation (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| di_chord_pulsation_table | Di-Chord Interference Pulsation Table | table | 113–113 | di_chord, pulsation, interference |
| pulsation_outline_drawings | Pulsation Outline Drawings (Ex.11-1) | diagram | — | pulsation, exercises |

### Chapter 12 — Di-Chord Properties (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| di_chord_properties_complete | Complete Di-Chord Properties Table | table | 135–135 | di_chord, properties |
| triad_di_chord_profiles | Triad Di-Chord Profiles | table | — | triad, di_chord, profiles |

### Chapter 15 — Melodic Gesture (3 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| clock_face_gesture_perception_diagram | Clock Face Gesture Perception Diagram | diagram | 146–146 | gesture, perception, melody |
| melodic_gesture_arrow_notation | Melodic Gesture Arrow Notation | diagram | 140–140 | melody, gesture, notation |
| melodic_gesture_types | Melodic Gesture Types Table | table | 140–140 | melody, gesture |

### Chapter 16 — Tracking Page (3 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| tracking_page | The Tracking Page (p.153) | diagram | 153–153 | tracking_page, melody, exercises |
| tracking_page_fill_in_rhythm | Tracking Page Fill-In Rhythm Table | table | 151–151 | rhythm, tracking_page, intervals |
| tracking_page_progress_chart | Tracking Page Progress Chart (420 checkboxes) | diagram | 169–169 | tracking_page, modes, progress |

### Chapter 17 — Tri-Chords (1 asset)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| tri_chord_types_using_2nds | Four Tri-Chord Types Using 2nds | table | 187–187 | tri_chord, intervals |

### Chapter 18 — Tetrachords (1 asset)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| tetrachord_types_four | Four Tetrachord Types | table | 187–187 | tetrachord, modes |

### Chapter 19 — Modes & Aural Perception (7 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| eight_rules_aural_mode_perception | Eight Rules of Aural Mode Perception | diagram | 204–206 | modes, aural, perception |
| harmonicity_by_mode | Harmonicity by Mode Table | table | 206–206 | harmonicity, modes |
| modal_di_chord_profiles_from_tonic | Modal Di-Chord Profiles from Tonic | table | 203–203 | modes, di_chord, profiles |
| tetrachordal_construction_of_modes | Tetrachordal Construction of Modes | table | 202–202 | tetrachord, modes |
| tonocentric_model_diagram | Tonocentric Model Diagram | diagram | 199–199 | tonocentric, modes, scale_degrees |
| white_key_mode_correspondences | White-Key Mode Correspondences | table | — | modes, white_keys |

### Chapter 20 — Conjunct Fingering (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| conjunct_finger_to_degree_mapping | Conjunct Finger-to-Degree Mapping | table | — | conjunct, fingering, scale_degrees |
| conjunct_tetrachord_assignments_by_mode | Conjunct Tetrachord Assignments by Mode | table | — | conjunct, tetrachord, modes |

### Chapter 21 — Figured Bass & Triad Inversions (4 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| figured_bass_di_chord_reference | Figured Bass Di-Chord Reference | table | — | figured_bass, di_chord |
| first_inversion_triad_di_chords | First Inversion Triad Di-Chords | table | — | triad, first_inversion, di_chord |
| root_position_triad_profiles | Root Position Triad Profiles | table | 237–237 | triad, root_position, di_chord |
| second_inversion_triad_di_chords | Second Inversion Triad Di-Chords | table | — | triad, second_inversion, di_chord |

### Chapter 22 — Seventh Chords (5 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| chord_root_finding_rules | Rules for Finding Chord Roots (All Inversions) | table | 253–253 | chord_roots, inversions |
| seventh_chord_construction | 7th Chord Construction Table | table | 249–249 | seventh_chord, construction |
| seventh_chords_first_inversion | 7th Chords First Inversion (6/5) | table | — | seventh_chord, first_inversion |
| seventh_chords_root_position | 7th Chords Root Position (7/5/3) | table | — | seventh_chord, root_position |
| seventh_chords_second_inversion | 7th Chords Second Inversion (4/3) | table | — | seventh_chord, second_inversion |
| seventh_chords_third_inversion | 7th Chords Third Inversion (4/2) | table | — | seventh_chord, third_inversion |

### Chapter 23 — Diatonic Harmony (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| diatonic_triad_reference | Diatonic Triad Reference Table | table | 264–264 | diatonic, triad, roman_numerals |
| ten_chord_sequences_grid | Ten Chord Sequences (Soprano/Harmony Grid) | table | — | chord_sequences, harmony, soprano |

### Chapter 24 — Modulation & Heptachord (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| first_generation_shifts_from_major | First-Generation Shifts from Major [I] | table | 270–270 | modulation, shifts, major |
| heptachord_shift_house_plan | Heptachord Shift House Plan (14 rooms) | diagram | 299–299 | heptachord, modulation, shifts |

### Chapter 25 — Transposition & Clef (2 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| clef_transposition_reference | Clef Transposition Reference Table | table | 288–288 | clef, transposition |
| transposing_instruments_reference | Transposing Instruments Reference | table | 289–290 | transposition, instruments |

### No Chapter Assigned — Curriculum Architecture (20 assets)

| slug | title | type | primary_topics |
|------|-------|------|----------------|
| beato_book_blend_in_map | Beato Book Blend-In Map | table | beato, voicings, sprints |
| chamber_concept_focus_by_sprint | Chamber Concept Focus by Sprint | table | sprints, chambers |
| classical_additions_progressions | Classical Additions Progressions (2) | table | classical, progressions, harmony |
| diatonic_progressions | Diatonic Progressions (9 progressions) | table | diatonic, progressions, harmony |
| essential_guitar_exercise_types | Essential Guitar Exercise Types | table | guitar, exercises |
| essential_piano_exercise_types | Essential Piano Exercise Types | table | piano, exercises |
| four_practice_sections_overview | 4 Practice Sections Overview | table | practice_sections, architecture |
| four_zones_stability_ladder | Four Zones Stability Ladder | table | zones, melody, di_chord |
| non_diatonic_progressions | Non-Diatonic Progressions (3 progressions) | table | non_diatonic, progressions, harmony |
| overtone_series_first_seven_partials | First 7 Partials of the Overtone Series | table | overtone_series, acoustics |
| overtone_series_spiral | Overtone Series Spiral (Wilson 1965) | diagram | overtone_series, acoustics |
| plogger_chapter_progression_by_sprint | Plogger Chapter Progression by Sprint | table | sprints, chapters |
| pw_extended_table_of_contents | Extended Table of Contents | table | ear_training |
| pw_short_table_of_contents | Short Table of Contents | table | ear_training |
| three_definitions_of_done | Three Definitions of Done | table | mastery, progression, assessment |
| twelve_sprint_anchor_song_map | 12-Sprint Anchor Song Map | table | sprints, songs, repertoire |
| twenty_song_repertoire | 20-Song Repertoire | table | repertoire, songs, sprints |
| user_profile_by_dimension | User Profile by Dimension | table | user_profile, instruments |
| voicing_types_by_complexity | Voicing Types Ordered by Complexity | table | voicings, complexity |
| zone_distribution_ratios_by_section | Zone Distribution Ratios by Section | table | zones, melody, distribution |

---

## Tier 2 — External Source Assets (88 assets)

### Rhythm Code (33 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| rc_16_place_rhythm_code_map_with_question_marks | 16-Place Rhythm Code Map with Question Marks | diagram | 60–60 | clave, rhythm, groove, subdivision |
| rc_afro_clave_in_3_4_notation_and_binary_grid | Afro Clave in 3/4 Notation and Binary Grid | notation_example | 128–128 | clave, rhythm, groove, subdivision |
| rc_anticipation_examples_abc_chord_placement_binary_grids | Anticipation Examples A, B, C — Chord Placement Binary Grids | notation_example | 34–34 | rhythm, subdivision, groove |
| rc_bass_kick_clave_alignment_grid_too_young_to_die_jamiroquai | Bass/Kick/Clave Alignment Grid — Too Young To Die (Jamiroquai) | notation_example | 117–117 | rhythm, groove, clave, subdivision |
| rc_beat_position_labeling_diagram | Beat Position Labeling Diagram | diagram | 26–26 | rhythm, subdivision, groove |
| rc_binary_grid_notation_introduction_single_dot | Binary Grid Notation Introduction — Single Dot Example | diagram | 24–24 | rhythm, subdivision, groove |
| rc_bossa_nova_clave_notation_and_binary_grid | Bossa Nova Clave Notation and Binary Grid | notation_example | 49–49 | clave, rhythm, groove, subdivision |
| rc_brazilian_bossa_nova_clave_5_note_maximal_evenness | Brazilian Bossa Nova Clave (5-note maximal evenness) | notation_example | 56–56 | clave, rhythm, groove, subdivision |
| rc_downbeats_and_upbeats_labeled_binary_grids | Downbeats and Upbeats Labeled Binary Grids | diagram | 25–25 | rhythm, subdivision, groove |
| rc_drumbeat_analysis_22_taylor_swift_kick_clave_grid | Drumbeat Analysis — 22 (Taylor Swift) Kick/Clave Grid | notation_example | 116–116 | rhythm, groove, clave, subdivision |
| rc_drumbeat_analysis_ariana_grande_side_to_side_and_problems | Drumbeat Analysis — Side to Side and Problems (Ariana Grande) | notation_example | 114–115 | rhythm, groove, clave, subdivision |
| rc_drumbeat_analysis_hello_adele | Drumbeat Analysis — Hello (Adele) Kick/Clave Four-Measure Grid | notation_example | 114–114 | rhythm, groove, clave, subdivision |
| rc_drumbeat_analysis_say_john_mayer | Drumbeat Analysis — Say (John Mayer) Snare/Kick/Clave Grids | notation_example | 114–114 | rhythm, groove, clave, subdivision |
| rc_drumbeat_analysis_the_man_taylor_swift | Drumbeat Analysis — The Man (Taylor Swift) Snare/Kick/Clave Grids | notation_example | 114–114 | rhythm, groove, clave, subdivision |
| rc_half_tempo_tresillo_lyric_grid_thunderclouds | Half-Tempo Tresillo Lyric Grid — Thunderclouds (LSD) | notation_example | 57–57 | rhythm, groove, clave, subdivision |
| rc_hound_dog_vocal_and_bass_line_notation | Hound Dog Vocal and Bass Line Notation | notation_example | 54–54 | rhythm, groove, clave, melodic_gesture |
| rc_how_to_develop_a_groove_step_by_step_bass_line_transformation | How to Develop a Groove — Step-by-Step Bass Line Transformation | exercise | 107–112 | groove, rhythm, clave, subdivision |
| rc_midi_grid_illustration_of_note_values | MIDI Grid Illustration of Note Values | diagram | 10–10 | rhythm, subdivision, ear_training |
| rc_not_anticipation_diagram_upbeat_without_anticipation | NOT Anticipation Diagram — Upbeat Without Anticipation | diagram | 35–35 | rhythm, subdivision, groove |
| rc_note_frequency_bar_chart_too_young_to_die_bassline | Note Frequency Bar Chart — Too Young To Die Bassline | diagram | 124–124 | rhythm, melody_contour, ear_training |
| rc_note_values_and_rests_reference_chart | Note Values and Rests Reference Chart | reference_card | 10–10 | rhythm, subdivision, ear_training, notation_example |
| rc_quarter_note_anticipation_diagrams | Quarter Note Anticipation Diagrams | notation_example | 37–38 | rhythm, subdivision, groove |
| rc_reggaeton_drumbeat_binary_grids_despacito_variants | Reggaeton Drumbeat Binary Grids (Despacito variants) | diagram | 55–55 | rhythm, groove, clave, subdivision |
| rc_shape_of_you_ed_sheeran_staff_notation | Shape Of You (Ed Sheeran) Staff Notation | notation_example | 56–56 | rhythm, melody_contour, groove |
| rc_single_note_placement_practice_grid | Single-Note Placement Practice Grid | exercise | 40–40 | rhythm, subdivision, ear_training |
| rc_son_clave_2_3_notation_and_binary_grid | Son Clave (2-3) Notation and Binary Grid | notation_example | 49–49 | clave, rhythm, groove, subdivision |
| rc_son_clave_3_2_notation_and_binary_grid | Son Clave (3-2) Notation and Binary Grid | notation_example | 58–58 | clave, rhythm, groove, subdivision |
| rc_stops_diagram_annotated_binary_grid | Stops Diagram — Annotated Binary Grid | diagram | 45–45 | rhythm, subdivision, groove |
| rc_the_clave_in_songs_multi_instrument_binary_grids | The Clave in Songs — Multi-instrument Binary Grids | notation_example | 65–92 | clave, rhythm, groove, subdivision |
| rc_the_rhythm_code_full_system_diagram_with_x_markers | The Rhythm Code — Full System Diagram with X Markers | reference_card | 93–106 | clave, rhythm, groove, subdivision |
| rc_tonality_code_diagram_pentatonic_scale_on_binary_grid | Tonality Code Diagram — Pentatonic Scale on Binary Grid | diagram | 123–123 | rhythm, melody_contour, ear_training |
| rc_tresillo_maximal_evenness_notation_and_binary_grid | Tresillo (Maximal Evenness) Notation and Binary Grid | notation_example | 54–54 | clave, rhythm, groove, subdivision |
| rc_vocal_melody_lyric_mapped_binary_grids_castle_on_the_hill | Vocal Melody Lyric-Mapped Binary Grids — Castle On The Hill | notation_example | 31–31 | rhythm, subdivision, groove, melody_contour |

### Harmony OS (28 assets)

| slug | title | type | primary_topics |
|------|-------|------|----------------|
| ho_7th_and_6th_chords | 7th & 6th Chords | reference_card | chord_quality, harmony |
| ho_building_chords_from_stacked_thirds | Building Chords from Stacked Thirds | infographic | chord_quality, dim7_symmetry |
| ho_chord_function_and_cadences | Chord Function & Cadences | reference_card | functional_harmony, ii_v_i |
| ho_chord_inversions | Chord Inversions | table | inversion, harmony |
| ho_cycle_5_and_the_ii_v_i | Cycle 5 & the II-V-I | diagram | ii_v_i, circle_of_fifths |
| ho_exotic_mode_borrowing | Exotic Mode Borrowing | reference_card | mode, backdoor_progression |
| ho_functional_harmony | Functional Harmony | table | functional_harmony, harmony |
| ho_hybrid_dominant_suspensions | Hybrid Dominant Suspensions | infographic | sus_chord, harmony |
| ho_interval_quality_progression | Interval Quality Progression | infographic | harmony, inversion |
| ho_interval_quality_system | Interval Quality System | reference_card | harmony, inversion |
| ho_inversions_in_practice | Inversions in Practice | infographic | inversion, functional_harmony |
| ho_major_scale_builder | Major Scale Builder | table | circle_of_fifths, harmony |
| ho_parallel_minor_modal_interchange | Parallel Minor Modal Interchange | reference_card | backdoor_progression, harmony |
| ho_passing_diminished_chords | Passing Diminished Chords | table | dim7_symmetry, harmony |
| ho_secondary_dominants | Secondary Dominants | table | functional_harmony, circle_of_fifths |
| ho_the_12_intervals | The 12 Intervals | reference_card | harmony, ear_training |
| ho_the_circle_of_fifths | The Circle of Fifths | infographic | circle_of_fifths, harmony |
| ho_the_darkness_hierarchy | The Darkness Hierarchy | infographic | backdoor_progression, harmony |
| ho_the_dim7_symmetry | The Dim7 Symmetry | infographic | dim7_symmetry, harmony |
| ho_the_functional_flow_of_harmony | The Functional Flow of Harmony | infographic | functional_harmony, ii_v_i |
| ho_the_harmonic_acquisition_model | The Harmonic Acquisition Model | infographic | harmony, ear_training |
| ho_the_harmony_os_color_system_in_action | The Harmony OS Color System in Action | infographic | functional_harmony, harmony |
| ho_the_ii_v_i_explained | The II-V-I Explained | infographic | ii_v_i, functional_harmony |
| ho_the_three_minor_scales | The Three Minor Scales | reference_card | harmony, mode |
| ho_triad_types | Triad Types | reference_card | triad, chord_quality |
| ho_tritone_substitution | Tritone Substitution | table | tritone_substitution, ii_v_i |
| ho_tritone_symmetry | Tritone Symmetry | infographic | tritone_substitution, harmony |
| ho_two_paths_to_home | Two Paths to Home | infographic | backdoor_progression, ii_v_i |

### Voicings OS (13 assets)

| slug | title | type | primary_topics |
|------|-------|------|----------------|
| vo_diatonic_tension_chart_c_major | DIATONIC TENSION CHART — C MAJOR | diagram | chord_quality, harmony, keyboard, voice_leading |
| vo_diatonic_tension_system_c_major | DIATONIC TENSION SYSTEM — C MAJOR | infographic | chord_quality, harmony, keyboard, voice_leading |
| vo_grace_notes_reference_sheet | GRACE NOTES — Reference Sheet | reference_card | chord_quality, keyboard, harmony, voice_leading |
| vo_guide_tone_system_reference_sheet | GUIDE TONE SYSTEM — Reference Sheet | reference_card | voice_leading, shell_voicing, harmony, keyboard |
| vo_left_hand_straddles_reference_sheet | LEFT HAND STRADDLES — Reference Sheet | reference_card | shell_voicing, keyboard, harmony, chord_quality |
| vo_mi_tension_system_modal_interchange_reference_sheet | MI TENSION SYSTEM — Modal Interchange Reference Sheet | reference_card | harmony, chord_quality, voice_leading, keyboard |
| vo_plus1_voicings_decision_framework_sheet | +1 VOICINGS — Decision Framework Sheet | worksheet | drop_voicing, shell_voicing, spread_voicing, keyboard |
| vo_position_theory_reference_sheet | POSITION THEORY — Reference Sheet | reference_card | voice_leading, inversion, keyboard, harmony |
| vo_position_theory_voice_leading_the_cycle | POSITION THEORY — VOICE LEADING THE CYCLE | infographic | voice_leading, inversion, harmony, keyboard |
| vo_tensions_the_full_map | TENSIONS — THE FULL MAP | infographic | drop_voicing, chord_quality, harmony, keyboard |
| vo_texture_control_from_thin_to_thick | TEXTURE CONTROL — FROM THIN TO THICK | infographic | spread_voicing, shell_voicing, harmony, keyboard |
| vo_the_whole_step_rule_worked_reference_sheet | THE WHOLE-STEP RULE — Worked Reference Sheet | reference_card | chord_quality, harmony, keyboard, voice_leading |
| vo_voicings_and_tensions_reference_sheet | VOICINGS & TENSIONS — Reference Sheet | reference_card | drop_voicing, shell_voicing, chord_quality, keyboard |

### Emotional Melody Map (10 assets)

| slug | title | type | primary_topics |
|------|-------|------|----------------|
| em_emotional_map_of_melody_4_zone_grid | EMOTIONAL MAP OF MELODY (4-Zone Grid) | diagram | melody_zone, emotional_color, tension_release, melody_contour |
| em_fast_analysis_5_step_checklist | FAST ANALYSIS (5-Step Checklist) | worksheet | melody_contour, phrase_shape, melody_zone |
| em_solmization_flavor_guide | SOLMIZATION FLAVOR GUIDE | reference_card | ear_training, emotional_color, key_note |
| em_song_section_zone_guidance_table | Song-Section Zone Guidance Table | table | melody_zone, phrase_shape, emotional_color |
| em_the_core_shift_three_questions_framework | THE CORE SHIFT — Three Questions Framework | reference_card | melody_zone, tension_release, phrase_shape |
| em_writing_revision_tips | WRITING / REVISION TIPS | reference_card | phrase_shape, tension_release, melody_zone |
| em_zone_1_sweet_grounded | ZONE 1 — SWEET / GROUNDED | reference_card | melody_zone, emotional_color, key_note |
| em_zone_2_tense_but_supported | ZONE 2 — TENSE BUT SUPPORTED | reference_card | melody_zone, tension_release, emotional_color |
| em_zone_3_floating_modern | ZONE 3 — FLOATING / MODERN | reference_card | melody_zone, emotional_color, tension_release |
| em_zone_4_bitter_edgy | ZONE 4 — BITTER / EDGY | reference_card | melody_zone, emotional_color, tension_release |

### Guitar Theory Course (4 assets)

| slug | title | type | pages | primary_topics |
|------|-------|------|-------|----------------|
| gc_chord_spelling_exercise_template | Guitar Chord Spelling Exercise Template — Staff + Fretboard Simultaneous Drill | worksheet | — | notation, harmony, chord_quality, guitar_fretboard |
| gc_music_theory_part1 | Guitar Music Theory Reference — Part 1 | reference_card | — | notation, ear_training, harmony, keyboard |
| gc_music_theory_part2 | Guitar Music Theory Reference — Part 2 | reference_card | — | harmony, chord_quality, voice_leading, notation |
| gc_note_staff_location | Note and Staff Location — Complete Guitar Fretboard to Staff Notation Map | reference_card | 1–6 | keyboard, notation, ear_training, guitar_fretboard |

---

## Synthesis Candidates (45 rows)

### Full Table

| id* | base_slug | overlap_slug | score | shared_topics | candidate_type | status |
|-----|-----------|-------------|-------|---------------|----------------|--------|
| — | di_chord_pictograph_complete | di_chord_properties_complete | 1.00 | di_chord | new_media | pending |
| — | clock_face_gesture_perception_diagram | melodic_gesture_arrow_notation | 0.90 | melody | new_media | pending |
| — | eight_rules_aural_mode_perception | tonocentric_model_diagram | 0.90 | modes | new_media | pending |
| — | pulsation_outline_drawings | pw_lap_map_2_beat | 0.80 | pulsation | new_media | pending |
| — | seventh_chord_construction | seventh_chords_first_inversion | 0.50 | seventh_chord | new_media | pending |
| — | chamber_concept_focus_by_sprint | beato_book_blend_in_map | 0.50 | sprints | new_media | pending |
| — | pw_lap_map_5_beat | rc_brazilian_bossa_nova_clave_5_note_maximal_evenness | 0.43 | groove, rhythm, subdivision | enrichment | pending |
| — | pw_lap_map_6_beat | rc_afro_clave_in_3_4_notation_and_binary_grid | 0.43 | groove, rhythm, subdivision | enrichment | pending |
| — | pw_lap_map_7_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | groove, rhythm, subdivision | enrichment | pending |
| — | pw_lap_map_2_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | ear_training, rhythm, subdivision | enrichment | pending |
| — | pw_lap_map_3_beat | rc_son_clave_3_2_notation_and_binary_grid | 0.43 | ear_training, rhythm, subdivision | enrichment | pending |
| — | pw_lap_map_4_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | ear_training, rhythm, subdivision | enrichment | pending |
| — | pw_interval_size_keyboard_diagrams | ho_interval_quality_system | 0.40 | ear_training, harmony | enrichment | pending |
| — | ho_cycle_5_and_the_ii_v_i | ho_major_scale_builder | 0.40 | circle_of_fifths | new_media | pending |
| — | pulsation_outline_drawings | tracking_page | 0.40 | exercises | new_media | pending |
| — | classical_additions_progressions | diatonic_progressions | 0.30 | progressions | new_media | pending |
| — | ho_building_chords_from_stacked_thirds | ho_passing_diminished_chords | 0.30 | dim7_symmetry | new_media | pending |
| — | tracking_page | tracking_page_progress_chart | 0.30 | tracking_page | new_media | pending |
| — | clock_face_gesture_perception_diagram | melodic_gesture_arrow_notation | 0.30 | gesture | new_media | pending |
| — | conjunct_tetrachord_assignments_by_mode | tetrachord_types_four | 0.30 | tetrachord | new_media | pending |
| — | pw_complete_keyboard_all_names | rc_16_place_rhythm_code_map_with_question_marks | 0.29 | ear_training, reference_card | enrichment | pending |
| — | pw_eight_clef_reference_diagrams | rc_16_place_rhythm_code_map_with_question_marks | 0.29 | ear_training, reference_card | enrichment | pending |
| — | vo_guide_tone_system_reference_sheet | vo_left_hand_straddles_reference_sheet | 0.00 | shell_voicing | bridging | pending |
| — | ho_exotic_mode_borrowing | ho_parallel_minor_modal_interchange | 0.00 | backdoor_progression | bridging | pending |
| — | ho_cycle_5_and_the_ii_v_i | ho_major_scale_builder | 0.00 | circle_of_fifths | bridging | pending |
| — | em_fast_analysis_5_step_checklist | em_song_section_zone_guidance_table | 0.00 | phrase_shape | bridging | pending |
| — | ho_building_chords_from_stacked_thirds | ho_passing_diminished_chords | 0.00 | dim7_symmetry | bridging | pending |
| — | vo_plus1_voicings_decision_framework_sheet | vo_tensions_the_full_map | 0.00 | drop_voicing | bridging | pending |
| — | em_solmization_flavor_guide | em_zone_1_sweet_grounded | 0.00 | key_note | bridging | pending |
| — | ho_exotic_mode_borrowing | ho_the_three_minor_scales | 0.00 | mode | bridging | pending |
| — | vo_plus1_voicings_decision_framework_sheet | vo_texture_control_from_thin_to_thick | 0.00 | spread_voicing | bridging | pending |
| — | ho_tritone_substitution | ho_tritone_symmetry | 0.00 | tritone_substitution | bridging | pending |
| — | em_emotional_map_of_melody_4_zone_grid | em_the_core_shift_three_questions_framework | 0.00 | tension_release | bridging | pending |
| — | em_emotional_map_of_melody_4_zone_grid | rc_vocal_melody_lyric_mapped_binary_grids_castle_on_the_hill | 0.00 | melody_contour | bridging | pending |
| — | vo_position_theory_reference_sheet | vo_position_theory_voice_leading_the_cycle | 0.00 | inversion | bridging | pending |
| — | ho_chord_function_and_cadences | ho_cycle_5_and_the_ii_v_i | 0.00 | ii_v_i | bridging | pending |
| — | ho_chord_function_and_cadences | ho_functional_harmony | 0.00 | functional_harmony | bridging | pending |
| — | em_emotional_map_of_melody_4_zone_grid | em_solmization_flavor_guide | 0.00 | emotional_color | bridging | pending |
| — | vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | 0.00 | voice_leading | bridging | pending |
| — | em_emotional_map_of_melody_4_zone_grid | em_fast_analysis_5_step_checklist | 0.00 | melody_zone | bridging | pending |
| — | vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | 0.00 | chord_quality | bridging | pending |
| — | rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | 0.00 | clave | bridging | pending |
| — | vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | 0.00 | harmony | bridging | pending |
| — | rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | 0.00 | groove | bridging | pending |
| — | rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | 0.00 | subdivision | bridging | pending |

*id column not captured in query; use slug pair as natural key.*

### Grouped by Candidate Type

#### new_media (13 candidates) — sorted by score desc

New media = a new physical artifact (card, poster, drill sheet) synthesized from two existing assets.

| base_slug | overlap_slug | score | shared_topics | synthesis product description |
|-----------|-------------|-------|---------------|-------------------------------|
| di_chord_pictograph_complete | di_chord_properties_complete | 1.00 | di_chord | Two-sided laminated card: all 6 di-chord types with interval structure, common voicings, typical harmonic function; drill side fill-in blanks |
| clock_face_gesture_perception_diagram | melodic_gesture_arrow_notation | 0.90 | melody | Fill-in drill sheet: unlabeled melodic gesture outlines; students annotate clock-face direction, arrow notation, emotional descriptor |
| eight_rules_aural_mode_perception | tonocentric_model_diagram | 0.90 | modes | Quick-reference card: 7 modes each with characteristic scale degree, emotional color keyword, iconic chord; 8 aural-perception rules condensed |
| pulsation_outline_drawings | pw_lap_map_2_beat | 0.80 | pulsation | Fill-in drill sheet: blank body-diagram worksheet marking tap points for 2-beat and 3-beat pulsation; shade strong/weak pulse zones |
| seventh_chord_construction | seventh_chords_first_inversion | 0.50 | seventh_chord | Fill-in drill sheet: chord-spelling worksheet for all four inversions of each 7th-chord quality; figured-bass symbol labels |
| chamber_concept_focus_by_sprint | beato_book_blend_in_map | 0.50 | sprints | Poster: sprint roadmap showing all chambers color-coded on a timeline with concept milestones and checkpoint symbols |
| ho_cycle_5_and_the_ii_v_i | ho_major_scale_builder | 0.40 | circle_of_fifths | Poster: full-color circle-of-fifths annotated with relative minors, key signatures, ii-V-I resolution arrows, enharmonic equivalents |
| pulsation_outline_drawings | tracking_page | 0.40 | exercises | Quick-reference card: exercise-index card listing every exercise across all chambers with page ref, rep target, difficulty tier |
| classical_additions_progressions | diatonic_progressions | 0.30 | progressions | Fill-in drill sheet: chord-symbol worksheet with 9 blank diatonic slots per key plus classical additions with harmonic-rhythm slots |
| ho_building_chords_from_stacked_thirds | ho_passing_diminished_chords | 0.30 | dim7_symmetry | Quick-reference card: 3 fully-diminished seventh chord root sets with all enharmonic spellings, passing-chord insertion points, diminished-scale fragments |
| tracking_page | tracking_page_progress_chart | 0.30 | tracking_page | Poster: enlarged 11x17 tracking-page poster with 420 checkbox grid and sprint column headers |
| clock_face_gesture_perception_diagram | melodic_gesture_arrow_notation | 0.30 | gesture | Fill-in drill sheet: 8 unlabeled melodic gesture outlines for annotation with clock-face labels, arrow symbols, emotional descriptors |
| conjunct_tetrachord_assignments_by_mode | tetrachord_types_four | 0.30 | tetrachord | Quick-reference card: 4 tetrachord types (major/minor/Phrygian/Lydian) with interval patterns and mode-construction matrix |

#### enrichment (10 candidates) — sorted by score desc

Enrichment = annotating a Plogger diagram with groove/cultural context from an external source.

| base_slug | overlap_slug | score | shared_topics | synthesis rationale summary |
|-----------|-------------|-------|---------------|------------------------------|
| pw_lap_map_5_beat | rc_brazilian_bossa_nova_clave_5_note_maximal_evenness | 0.43 | groove, rhythm, subdivision | Annotate Lap Map 5-Beat with Bossa Nova clave's 5-note maximal-evenness grid — gesture clusters map to clave halves |
| pw_lap_map_6_beat | rc_afro_clave_in_3_4_notation_and_binary_grid | 0.43 | groove, rhythm, subdivision | Align 6-Beat patterns (3+3 vs. 2+2+2) with Afro Clave 3/4 binary grid — grouping choice = clave feel choice |
| pw_lap_map_7_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | groove, rhythm, subdivision | Map 7-Beat groupings onto 16-place grid — shows accent positions at unequal slots (1,4,6) |
| pw_lap_map_2_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | ear_training, rhythm, subdivision | Annotate 2-Beat body positions with 16-place grid slot numbers — gesture to grid translation |
| pw_lap_map_3_beat | rc_son_clave_3_2_notation_and_binary_grid | 0.43 | ear_training, rhythm, subdivision | Superimpose Son Clave (3-2) binary grid onto Lap Map 3-Beat — maps body geography to clave hit positions |
| pw_lap_map_4_beat | rc_16_place_rhythm_code_map_with_question_marks | 0.43 | ear_training, rhythm, subdivision | Map 4-Beat gesture positions onto 16-place grid (slots 1,5,9,13) — body tap + grid reference in one diagram |
| pw_interval_size_keyboard_diagrams | ho_interval_quality_system | 0.40 | ear_training, harmony | Merge keyboard interval size diagrams with Interval Quality System — each key-span labeled with both size and quality |
| pw_complete_keyboard_all_names | rc_16_place_rhythm_code_map_with_question_marks | 0.29 | ear_training, reference_card | Overlay 16-place Rhythm Code grid onto keyboard diagram — note name + metric position in single reference card |
| pw_eight_clef_reference_diagrams | rc_16_place_rhythm_code_map_with_question_marks | 0.29 | ear_training, reference_card | Add compact 16-place binary grid below each clef symbol — emphasizes rhythm/pitch independence |

#### bridging (22 candidates) — all score 0.00

Bridging = new Plogger-originating diagram for a concept absent from Plogger but present in multiple external sources.

| base_slug | overlap_slug | shared_topics | gap concept being bridged |
|-----------|-------------|---------------|---------------------------|
| vo_guide_tone_system_reference_sheet | vo_left_hand_straddles_reference_sheet | shell_voicing | Shell voicings (root+3rd+7th) — 5 Voicings OS assets, no Plogger entry point |
| ho_exotic_mode_borrowing | ho_parallel_minor_modal_interchange | backdoor_progression | Backdoor progression (bVII7→I) — 4 Harmony OS assets, no Plogger diagram |
| ho_cycle_5_and_the_ii_v_i | ho_major_scale_builder | circle_of_fifths | Circle of fifths as navigation map — 4 Harmony OS assets, no Plogger diagram |
| em_fast_analysis_5_step_checklist | em_song_section_zone_guidance_table | phrase_shape | Phrase shape (antecedent/consequent, sentence, period) — 4 EMM assets, no Plogger equivalent |
| ho_building_chords_from_stacked_thirds | ho_passing_diminished_chords | dim7_symmetry | Diminished 7th symmetry — 3 Harmony OS assets, no Plogger diagram |
| vo_plus1_voicings_decision_framework_sheet | vo_tensions_the_full_map | drop_voicing | Drop voicings (Drop 2/Drop 3) — 3 Voicings OS assets, no Plogger entry |
| em_solmization_flavor_guide | em_zone_1_sweet_grounded | key_note | Key note (tonic as gravitational center) — 2 EMM assets, absent from Plogger despite tonocentric framework |
| ho_exotic_mode_borrowing | ho_the_three_minor_scales | mode | Modal scales system (Dorian/Phrygian/Lydian etc.) — 2 Harmony OS assets, Plogger uses "modes" differently |
| vo_plus1_voicings_decision_framework_sheet | vo_texture_control_from_thin_to_thick | spread_voicing | Spread voicings (open position, wide intervals) — 2 Voicings OS assets, no Plogger counterpart |
| ho_tritone_substitution | ho_tritone_symmetry | tritone_substitution | Tritone substitution — 2 Harmony OS assets, connects to Plogger overtone/interval thinking |
| em_emotional_map_of_melody_4_zone_grid | em_the_core_shift_three_questions_framework | tension_release | Tension and release — 6 EMM assets, no Plogger diagram |
| em_emotional_map_of_melody_4_zone_grid | rc_vocal_melody_lyric_mapped_binary_grids_castle_on_the_hill | melody_contour | Melody contour archetypes — 6 assets (EMM+RC), no Plogger diagram |
| vo_position_theory_reference_sheet | vo_position_theory_voice_leading_the_cycle | inversion | Chord inversion (root/1st/2nd) — 6 Voicings OS assets, absent from Plogger |
| ho_chord_function_and_cadences | ho_cycle_5_and_the_ii_v_i | ii_v_i | ii-V-I progression — 6 Harmony OS assets, no Plogger coverage |
| ho_chord_function_and_cadences | ho_functional_harmony | functional_harmony | Functional harmony (T/SD/D functions) — 7 Harmony OS assets, no Plogger equivalent |
| em_emotional_map_of_melody_4_zone_grid | em_solmization_flavor_guide | emotional_color | Emotional color of scale degrees — core to EMM, absent from Plogger |
| vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | voice_leading | Voice leading principles — 8 Voicings OS assets, completely absent from Plogger |
| em_emotional_map_of_melody_4_zone_grid | em_fast_analysis_5_step_checklist | melody_zone | 4-zone spatial model for melody (9 EMM assets) — no Plogger equivalent |
| vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | chord_quality | Chord quality taxonomy — 11 Voicings+Harmony OS assets, no Plogger diagram |
| rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | clave | Clave — 19 Rhythm Code assets, no Plogger clave diagram |
| vo_diatonic_tension_chart_c_major | vo_diatonic_tension_system_c_major | harmony | Harmony foundational vocabulary — 28 assets (Harmony+Voicings OS), no Plogger harmony diagram |
| rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | groove | Groove as felt rhythmic quality — central to RC, absent from all Plogger diagrams |
| rc_16_place_rhythm_code_map_with_question_marks | rc_afro_clave_in_3_4_notation_and_binary_grid | subdivision | Subdivision levels (whole→16th) — no Plogger diagram explaining subdivision |

---

## Diagram Specs

The `diagram_specs` table is **empty (0 rows)**. Phase 7 (Nano Banana visual decomposition — breaking each synthesis candidate into visual production specs) has not yet started. When Phase 7 begins, each approved synthesis candidate will generate one or more rows here with full layout, color, and content specifications ready for Nano Banana / Imagen.

---

## How to Query

### 1. Find all assets by topic

```sql
SELECT slug, title, asset_type, tier, source_name
FROM asset_registry
WHERE primary_topics @> ARRAY['voice_leading']
ORDER BY tier, source_name;
```

### 2. Find all tables in a specific Plogger chapter

```sql
SELECT slug, title, page_start, page_end
FROM asset_registry
WHERE tier = 'plogger'
  AND chapter = 19
  AND asset_type = 'table'
ORDER BY page_start;
```

### 3. Get all synthesis candidates above a score threshold, with titles

```sql
SELECT sc.overlap_score, sc.candidate_type, sc.status,
       a1.title AS base_title, a2.title AS overlap_title,
       sc.shared_topics
FROM synthesis_candidates sc
JOIN asset_registry a1 ON sc.base_slug = a1.slug
JOIN asset_registry a2 ON sc.overlap_slug = a2.slug
WHERE sc.overlap_score >= 0.40
ORDER BY sc.overlap_score DESC;
```

### 4. Get all pending bridging candidates sorted by gap breadth

```sql
SELECT base_slug, overlap_slug, shared_topics, synthesis_rationale
FROM synthesis_candidates
WHERE candidate_type = 'bridging'
  AND status = 'pending'
ORDER BY base_slug;
```

### 5. Get all Plogger diagrams (not worksheets) with no page number

```sql
SELECT slug, title, chapter
FROM asset_registry
WHERE tier = 'plogger'
  AND asset_type = 'diagram'
  AND page_start IS NULL
ORDER BY chapter;
```

### 6. Find all Rhythm Code assets covering clave

```sql
SELECT slug, title, page_start, page_end
FROM asset_registry
WHERE source_name = 'Rhythm Code'
  AND primary_topics @> ARRAY['clave']
ORDER BY page_start;
```

### 7. Get all external reference_cards and infographics (agent context loads)

```sql
SELECT slug, title, source_name, primary_topics
FROM asset_registry
WHERE tier = 'external'
  AND asset_type IN ('reference_card', 'infographic')
ORDER BY source_name, slug;
```

### 8. Find enrichment candidates where a lap map is enriched by a clave asset

```sql
SELECT sc.base_slug, sc.overlap_slug, sc.overlap_score, sc.shared_topics
FROM synthesis_candidates sc
WHERE sc.candidate_type = 'enrichment'
  AND sc.base_slug LIKE 'pw_lap_map_%'
ORDER BY sc.overlap_score DESC;
```
