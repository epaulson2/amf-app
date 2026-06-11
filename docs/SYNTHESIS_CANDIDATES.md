# AMF Synthesis Candidates — Phase 6 Review

**Status:** Pending user approval — June 11, 2026
**Total candidates:** 45
**Instructions:** Review each candidate below. Approved items become Phase 9 work. Rejected items are kept for audit trail. To approve/reject, run the SQL at the bottom of this file.

---

## Enrichment Candidates (ranked by overlap score)

Enrichment candidates combine two existing assets into a richer, unified reference — the base asset gains context or annotation from the overlap asset.

| Rank | Score | ID | Base Asset | Source | Overlap Asset | Source | Shared Topics | What Would Be Created |
|------|-------|----|-----------|--------|---------------|--------|---------------|-----------------------|
| 1 | 0.43 | 6 | Lap Map: 4-Beat Pattern Diagram | Plogger Method | 16-Place Rhythm Code Map with Question Marks | Rhythm Code | ear_training, rhythm, subdivision | Annotated grid mapping the 4-beat lap-map gesture positions (body tap locations) to grid slots 1, 5, 9, 13 — a "where is it on my body and where is it in the grid" reference |
| 2 | 0.43 | 4 | Lap Map: 2-Beat Pattern Diagram | Plogger Method | 16-Place Rhythm Code Map with Question Marks | Rhythm Code | ear_training, rhythm, subdivision | Gesture-to-grid translation diagram aligning thigh/knee taps (beats 1-2) to their exact 16-place grid positions |
| 3 | 0.43 | 5 | Lap Map: 3-Beat Pattern Diagram | Plogger Method | Son Clave (3-2) Notation and Binary Grid | Rhythm Code | ear_training, rhythm, subdivision | Enriched 3-beat lap map with Son Clave binary grid superimposed — shows which body positions correspond to clave accent slots |
| 4 | 0.43 | 7 | Lap Map: 5-Beat Patterns (2+3 and 3+2) Diagrams | Plogger Method | Brazilian Bossa Nova Clave (5-note maximal evenness) Notation and Grid | Rhythm Code | groove, rhythm, subdivision | Lap map annotated with Bossa Nova clave grid — validates 5-beat asymmetry as a living groove tradition; 2-group and 3-group map to clave front/back halves |
| 5 | 0.43 | 8 | Lap Map: 6-Beat Patterns (3+3 and 2+2+2) Diagrams | Plogger Method | Afro Clave in 3/4 Notation and Binary Grid | Rhythm Code | groove, rhythm, subdivision | Combined diagram showing 3+3 vs. 2+2+2 grouping choices against Afro Clave grid — makes feel difference visible as a grid layout difference |
| 6 | 0.43 | 9 | Lap Map: 7-Beat Patterns (3+2+2, 2+2+3, 2+3+2) Diagrams | Plogger Method | 16-Place Rhythm Code Map with Question Marks | Rhythm Code | groove, rhythm, subdivision | 7-beat lap map annotated with grid slot numbers — shows accent positions at slots 1, 4, 6; makes metric asymmetry legible as unequal grid spacing |
| 7 | 0.40 | 3 | Interval Size Keyboard Diagrams (3rd and 4th) | Plogger Method | Interval Quality System | Harmony OS | ear_training, harmony | Keyboard diagram annotating each key-span with both size (visual distance) and quality (major/minor/perfect/aug/dim) — complete interval identity from a single keyboard picture |
| 8 | 0.29 | 1 | Complete Keyboard with All Names (Most-Common in Boxes) | Plogger Method | 16-Place Rhythm Code Map with Question Marks | Rhythm Code | ear_training, reference_card | Unified "name it and place it" card — keyboard note names overlaid with rhythmic subdivision position numbers; bridges pitch literacy and rhythmic literacy |
| 9 | 0.29 | 2 | Eight Clef Reference Diagrams | Plogger Method | 16-Place Rhythm Code Map with Question Marks | Rhythm Code | ear_training, reference_card | Clef diagrams each annotated with a compact 16-place binary grid — makes explicit that rhythm and pitch-reading are independent skills transferable across clefs |

---

## Bridging Candidates

Bridging candidates create a **new Plogger diagram** for a concept that exists in the chamber assets but has no Plogger equivalent — closing the conceptual gap between Plogger and the four chambers.

| Rank | ID | Gap Topic | Base Asset (illustrates gap) | Overlap Asset (target chamber) | What Would Be Created |
|------|----|-----------|-----------------------------|-------------------------------|----------------------|
| 1 | 10 | subdivision | 16-Place Rhythm Code Map with Question Marks | Afro Clave in 3/4 Notation and Binary Grid | Subdivision diagram mapping beat division levels (whole → sixteenth) against the 16-place grid — bridges Plogger pulsation to Rhythm Code binary system |
| 2 | 11 | groove | 16-Place Rhythm Code Map with Question Marks | Afro Clave in 3/4 Notation and Binary Grid | Bridging diagram showing how on/off-beat placement and subdivision emphasis create groove feel — gives concrete meaning to an otherwise floating term |
| 3 | 12 | harmony | DIATONIC TENSION CHART — C MAJOR | DIATONIC TENSION SYSTEM — C MAJOR | Foundational harmonic vocabulary diagram (scale degrees, chord tones, diatonic context) — prerequisite visual connecting Plogger's melody-centric world to Harmony OS |
| 4 | 13 | clave | 16-Place Rhythm Code Map with Question Marks | Afro Clave in 3/4 Notation and Binary Grid | Bridging visual showing 3-2 and 2-3 clave patterns within the 16-place grid — culturally grounded rhythmic anchor point |
| 5 | 14 | chord_quality | DIATONIC TENSION CHART — C MAJOR | DIATONIC TENSION SYSTEM — C MAJOR | Chord quality categorization diagram (major, minor, dominant, dim, aug) by tension level — bridges Plogger aural/perception to Voicings chamber |
| 6 | 15 | melody_zone | EMOTIONAL MAP OF MELODY (4-Zone Grid) | FAST ANALYSIS (5-Step Checklist) | Scale-degree-to-emotional-zone mapping diagram — connects Plogger scale-degree thinking to the Melody chamber's 4-zone spatial model |
| 7 | 16 | voice_leading | DIATONIC TENSION CHART — C MAJOR | DIATONIC TENSION SYSTEM — C MAJOR | Voice leading bridging visual (common-tone retention, minimal motion) — conceptual spine prerequisite before students engage the Voicings chamber |
| 8 | 17 | emotional_color | EMOTIONAL MAP OF MELODY (4-Zone Grid) | SOLMIZATION FLAVOR GUIDE | Emotional descriptor diagram assigning affective qualities per scale degree (1=stable, 7=tense, 6=melancholic) — links Plogger aural/perception to Melody chamber |
| 9 | 18 | functional_harmony | Chord Function & Cadences | Functional Harmony | Functional harmony diagram (tonic/subdominant/dominant groups with gravitational relationships) — missing conceptual gateway into the Harmony chamber |
| 10 | 19 | ii_v_i | Chord Function & Cadences | Cycle 5 & the II-V-I | ii-V-I in multiple keys with function labels — most common jazz harmonic motion has no Plogger coverage; foundational before students enter Harmony OS |
| 11 | 20 | inversion | POSITION THEORY — Reference Sheet | POSITION THEORY — VOICE LEADING THE CYCLE | Chord inversion diagram (root, 1st, 2nd position triad on keyboard/staff with bass note labels) — prerequisite visual for Voicings chamber position theory |
| 12 | 21 | melody_contour | EMOTIONAL MAP OF MELODY (4-Zone Grid) | Vocal Melody Lyric-Mapped Binary Grids — Castle On The Hill (Ed Sheeran) | Contour archetype diagram (arch, descending, ascending, wave) — equips students to analyze and create melodies before the Melody chamber |
| 13 | 22 | tension_release | EMOTIONAL MAP OF MELODY (4-Zone Grid) | THE CORE SHIFT — Three Questions Framework | Tension/release arc diagram mapping instability and resolution across a phrase (question/answer shape) — connects Plogger perception framework to Melody chamber vocabulary |
| 14 | 23 | shell_voicing | GUIDE TONE SYSTEM — Reference Sheet | LEFT HAND STRADDLES — Reference Sheet | Shell voicing construction diagram (root + 3rd + 7th for dominant, major, minor 7th chords on keyboard staff) — lowers entry bar to Voicings chamber |
| 15 | 24 | backdoor_progression | Exotic Mode Borrowing | Parallel Minor Modal Interchange | Bridging diagram showing bVII7→I backdoor progression in context alongside standard V7-I — makes modal borrowing tangible; links Plogger mode/modulation diagrams to Harmony chromatic vocabulary |
| 16 | 25 | circle_of_fifths | Cycle 5 & the II-V-I | Major Scale Builder | Circle of fifths navigational diagram with key signatures, relative minors, and ii-V-I motion marked — the most universally needed reference visual in the curriculum |
| 17 | 26 | phrase_shape | FAST ANALYSIS (5-Step Checklist) | Song-Section Zone Guidance Table | Phrase shape diagram mapping common 4- and 8-bar phrase shapes (antecedent/consequent, sentence, period) — connects Plogger rhythm/tracking pages to Melody chamber song-level analysis |
| 18 | 27 | dim7_symmetry | Building Chords from Stacked Thirds | Passing Diminished Chords | Diminished 7th symmetry diagram (equal minor-third stacking, 3 enharmonic spellings, reharmonization possibilities) — bridges Plogger scale-degree/overtone diagrams to chromatic harmony |
| 19 | 28 | drop_voicing | +1 VOICINGS — Decision Framework Sheet | TENSIONS — THE FULL MAP | Drop-2 construction diagram from close-position chord with register labels — practical entry point into Voicings chamber for students familiar with Plogger keyboard/lap-map diagrams |
| 20 | 29 | key_note | SOLMIZATION FLAVOR GUIDE | ZONE 1 — SWEET / GROUNDED | Key note vs. scale degree 1 clarification diagram in various modes — resolves foundational conceptual gap between Plogger's tonocentric framework and Melody chamber |
| 21 | 30 | mode | Exotic Mode Borrowing | The Three Minor Scales | Modal scales bridging diagram (characteristic tones + emotional flavors per mode) — prevents conceptual collision between Plogger's "tracking modes" usage and Harmony OS modal usage |
| 22 | 31 | spread_voicing | +1 VOICINGS — Decision Framework Sheet | TEXTURE CONTROL — FROM THIN TO THICK | Close vs. spread voicing texture diagram using the same chord — equips students for Voicings chamber texture-control content |
| 23 | 32 | tritone_substitution | Tritone Substitution | Tritone Symmetry | Tritone symmetry diagram showing how two dominant chords share the same guide tones (3rd and 7th) — connects Plogger overtone-series thinking to jazz harmonic substitution |

---

## New Media Candidates

New media candidates produce a **brand-new artifact** (quick-reference card, poster, or drill sheet) synthesizing content from two existing assets. No existing asset covers this format.

| Rank | Score | ID | Anchor Asset | Source | Topic | Format | What Would Be Created |
|------|-------|----|-------------|--------|-------|--------|-----------------------|
| 1 | 1.00 | 33 | Di-Chord Pictograph (Complete) | Plogger Method | di_chord | Quick-reference card | Two-sided laminated card listing all 6 di-chord types with interval structure, common voicings, and typical harmonic function; drill side has fill-in blanks for interval distances and inversions |
| 2 | 0.90 | 34 | Clock Face Gesture Perception Diagram | Plogger Method | melody | Fill-in drill sheet | Staff-paper worksheet where students label melodic contour arrows, identify phrase peaks, and notate three prescribed gesture shapes — reinforces clock-face mental model with written practice |
| 3 | 0.90 | 35 | Eight Rules of Aural Mode Perception | Plogger Method | modes | Quick-reference card | Compact two-column card pairing each of the 7 modes with its characteristic scale degree, emotional color keyword, and one iconic chord; back side lists the 8 aural-perception rules in condensed form |
| 4 | 0.80 | 36 | Pulsation Outline Drawings (Ex.11-1) | Plogger Method | pulsation | Fill-in drill sheet | Blank body-diagram worksheet where students mark tap points for 2-beat and 3-beat pulsation patterns, then shade zones corresponding to strong/weak pulses |
| 5 | 0.50 | 38 | 7th Chord Construction Table | Plogger Method | seventh_chord | Fill-in drill sheet | Chord-spelling worksheet with blank staves and root names provided; students write all four inversion voicings for each of the 5 seventh-chord qualities, labeling figured-bass symbols |
| 6 | 0.50 | 37 | Chamber Concept Focus by Sprint | Plogger Method | sprints | Poster | One-page sprint roadmap poster showing all chamber sprints on a timeline, color-coded by chamber (Melody/Harmony/Voicings/Rhythm), with concept milestones and trackable checkpoint symbols |
| 7 | 0.40 | 39 | Pulsation Outline Drawings (Ex.11-1) | Plogger Method | exercises | Quick-reference card | Exercise-index card listing every numbered exercise across all chambers with page reference, rep target, and difficulty tier — designed to be cut out and tucked in a practice journal |
| 8 | 0.40 | 40 | Cycle 5 & the II-V-I | Harmony OS | circle_of_fifths | Poster | Full-color circle-of-fifths wall poster annotated with relative minors, key signatures, common ii-V-I resolution arrows, and enharmonic equivalents on outer ring |
| 9 | 0.30 | 41 | Clock Face Gesture Perception Diagram | Plogger Method | gesture | Fill-in drill sheet | Worksheet with 8 unlabeled melodic gesture outlines; students annotate each with clock-face direction labels, arrow notation symbols, and a one-word emotional descriptor |
| 10 | 0.30 | 42 | Building Chords from Stacked Thirds | Harmony OS | dim7_symmetry | Quick-reference card | Symmetry card showing the 3 fully-diminished seventh chord root sets with all 4 enharmonic spellings, passing-chord insertion points on a diatonic scale, and the diminished-scale fragment for each |
| 11 | 0.30 | 43 | The Tracking Page (p.153) | Plogger Method | tracking_page | Poster | Enlarged printable tracking-page poster (11x17) with 420-checkbox grid and sprint column headers — students post on wall and cross off completions for long-term accountability |
| 12 | 0.30 | 44 | Conjunct Tetrachord Assignments by Mode | Plogger Method | tetrachord | Quick-reference card | Two-sided card listing all 4 tetrachord types (major, minor, Phrygian, Lydian) with interval patterns and a matrix showing which tetrachord pair constructs each of the 7 modes |
| 13 | 0.30 | 45 | Classical Additions Progressions (2) | Plogger Method | progressions | Fill-in drill sheet | Chord-symbol worksheet with 9 blank diatonic progression slots per key; students fill in Roman numerals and voicing notes; reverse side has classical additions with blank harmonic-rhythm slots |

---

## Approve/Reject SQL

```sql
-- Approve a candidate:
UPDATE synthesis_candidates SET status = 'approved', user_notes = 'reason' WHERE id = N;

-- Reject a candidate:
UPDATE synthesis_candidates SET status = 'rejected', user_notes = 'reason' WHERE id = N;

-- Approve all enrichment candidates:
UPDATE synthesis_candidates SET status = 'approved' WHERE candidate_type = 'enrichment' AND status = 'pending';

-- Approve all bridging candidates:
UPDATE synthesis_candidates SET status = 'approved' WHERE candidate_type = 'bridging' AND status = 'pending';

-- Approve all new_media candidates:
UPDATE synthesis_candidates SET status = 'approved' WHERE candidate_type = 'new_media' AND status = 'pending';

-- Approve everything:
UPDATE synthesis_candidates SET status = 'approved' WHERE status = 'pending';

-- Check current approval status:
SELECT candidate_type, status, count(*) FROM synthesis_candidates GROUP BY candidate_type, status ORDER BY candidate_type, status;
```
