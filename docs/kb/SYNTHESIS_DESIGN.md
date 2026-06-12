# AMF Synthesis Design Reference
**Version:** 1.0 — 2026-06-12
**Audience:** Phase 9 synthesis agents and founder review
**Purpose:** Complete design brief for all 29 synthesis candidates. Future agents must not re-read source PDFs — all decisions, rationale, and specifications are here.

---

## Table of Contents

1. [What Synthesis Means in AMF](#what-synthesis-means-in-amf)
2. [The 12+2 Progression Spine](#the-122-progression-spine)
3. [Enhancement Candidates (12)](#enhancement-candidates)
4. [Synthesis Original Candidates (10)](#synthesis-original-candidates)
5. [Moonshot Candidates (7)](#moonshot-candidates)
6. [Nano Banana Spec Template](#nano-banana-spec-template)
7. [Phase 9 Agent Instructions](#phase-9-agent-instructions)

---

## What Synthesis Means in AMF

The AMF blends its four chambers — Melody, Harmony, Voicings, Rhythm — from day one. The Plogger Method (Musical OS) is the perceptual backbone running through all four. Because the four chambers teach the same underlying acoustic reality through different lenses, synthesis assets are not bridges between isolated systems. They are the natural expression of concepts that multiple sources orbit simultaneously but none captures alone. A student looking at a well-designed synthesis diagram should see something they already partially know and suddenly understand it more completely.

### Category Definitions

**Enhancement** — An existing diagram from any source, enriched with visual or content elements from a second source. The base diagram stays itself; it gains a dimension it was always missing. The result feels inevitable in retrospect. Low execution risk, high teaching ROI. Best first targets.

**Synthesis Original** — A new diagram for a conceptual space that multiple sources orbit from different angles but none captures together. Not gap-filling. Recognition that two or more systems are teaching the same reality — and creation of the unified view that shows it. Requires clear evidence that the conceptual gap exists (at least two source slugs that approach the same space without overlapping).

**Moonshot** — No constraints. Jaw-dropping, never-existed-before artifacts. The Cortex litmus test: would this stop a working musician mid-scroll? Would a music teacher immediately want to print it and tape it to the wall? If yes, worth attempting. Moonshots may not look like diagrams at all.

### What Does NOT Count as Synthesis

- A diagram that simply copies content from two sources into one layout without revealing a hidden relationship.
- A "translation table" that maps vocabulary from one system to another without showing the underlying unity.
- An enhancement where the overlay information is already implicit in the base diagram (no teaching gain).
- Any asset that requires the student to already understand both source systems before the synthesis is legible (synthesis should produce insight, not assume it).

---

## The 12+2 Progression Spine

All harmonic progressions in the AMF system. Synthesis agents: when any synthesis idea references harmonic movement, cite the appropriate progressions from this spine. Sequence follows sprint pedagogy — earlier sprints = more stable intervals, more predictable resolution. Do not default to ii-V-I examples when a richer progression context is available.

| ID | Progression Name | Root Movement Di-Chord | Harmonic Function Arc | First Sprint Introduced | Stability Profile | Notes |
|----|-----------------|----------------------|-----------------------|------------------------|-------------------|-------|
| P1 | Perfect Cadence (V→I) | [5] descent | Dominant → Tonic | Sprint 1 | Maximum resolution — the anchor of the whole system | The primary resolution pattern; [5] interval heard as "coming home" |
| P2 | Plagal Cadence (IV→I) | [5] ascent | Subdominant → Tonic | Sprint 1 | Soft resolution — "Amen" cadence, gentle homecoming | Same [5] interval as P1 but ascending — opposite emotional direction |
| P3 | Half Cadence (I→V or II→V) | [5] ascent or descent | Tonic→Dominant or Sub→Dom | Sprint 2 | Open/suspended — lands on tension, no release | Used in question phrases; student hears "waiting" quality |
| P4 | Deceptive Cadence (V→VI) | [2] ascent | Dominant → (Deceptive) | Sprint 2 | Surprise — expected resolution diverted | Teaches ear to distinguish expected vs. unexpected; [2] = minor second surprise |
| P5 | ii-V-I (Dm7→G7→Cmaj7) | [5]+[5] descent | Sub → Dom → Tonic | Sprint 3 | High tension → maximum resolution | The core jazz cadential unit; two consecutive [5] descents |
| P6 | I-IV-V-I (1-4-5-1) | [5] up, [2] up, [5] down | Tonic → Sub → Dom → Tonic | Sprint 2 | Stable loop — blues/rock foundation | Most common progression in popular music; clave positions matter |
| P7 | I-VI-II-V (Rhythm Changes A) | [3]+[5]+[5] mixed | Tonic → Relative → Sub → Dom | Sprint 4 | Circular — high-energy loop with two [5] descents | Foundation of jazz rhythm changes; guides student into chromatic harmony |
| P8 | I-V-VI-IV (Pop Axis) | [5]+[2]+[3] | Tonic → Dom → Rel → Sub | Sprint 3 | Triumphant/anthemic — enormously common in pop | Stand By Me, Let It Be, No Woman No Cry all trace this shape |
| P9 | Backdoor ii-V-I (Fm7→Bb7→Cmaj7) | [5]+[5] from bVII | Sub(bIII)→Dom(bVII)→Tonic | Sprint 5 | Smooth/chromatic — arrives home from an unexpected angle | Differs from P5: resolution through color ([3] approach) not through friction ([6] tritone) |
| P10 | Modal Vamp (I→bVII or I→bII) | [2] whole-step descent | Tonic → Modal neighbor | Sprint 4 | Non-resolving — static, groove-based, modal | No tension arc; demonstrates that not all progressions seek resolution |
| P11 | Tritone Substitution (bII7→I) | [1] semitone descent | Sub-Dom(bII) → Tonic | Sprint 6 | Maximum chromatic tension → release | [6] tritone in the chord becomes [1] semitone in root movement; dual-tension resolution |
| P12 | Coltrane Changes (I→bIII→bVI→I) | [3]+[3]+[4] | Giant Steps cycle | Sprint 6+ | Advanced — major thirds cycling through three tonal centers | Each [3] root movement divides the octave into equal thirds |
| P13 | Secondary Dominant Chain (V/V→V→I) | [5]+[5]+[5] all descending | Applied Dom → Dom → Tonic | Sprint 5 | Intensified — stacked dominant tension | Three consecutive [5] descents; harmonic gravity multiplied |
| P14 | Minor ii°-V7-i (Bø7→E7→Am) | [5]+[5] descent in minor | Sub(dim)→Dom→Tonic(minor) | Sprint 4 | Darker resolution — same arc as P5 but modal color differs | The half-diminished ii° chord shifts the Emotional Map zone assignments throughout |

**Spine usage rule for agents:** When a synthesis candidate description references "the ii-V-I" or "harmonic resolution," choose the most pedagogically accurate progression from this table by sprint context. A Sprint 3 example uses P5 or P8; a Sprint 5 example can use P9 or P13. Never default to P5 alone when the candidate's evidence files cite modal interchange, backdoor, or tritone substitution material.

---

## Enhancement Candidates

Each row: ID | Base asset slug | Overlay source slug | What to add | Teaching gain | DB synthesis_rationale | Effort | Status

---

### E1. Lyric Placement Grid with Zone Coloring per Syllable

| Field | Value |
|-------|-------|
| **ID** | E1 |
| **Base asset slug** | `rc_vocal_melody_lyric_mapped_binary_grids_castle_on_the_hill` |
| **Overlay source slug** | `em_emotional_map_of_melody_4_zone_grid` (EM-02 through EM-05) |
| **What to add** | Color band beneath each lyric token using the Emotional Map four-zone color scheme. Each syllable is colored by its zone based on its scale degree and whether it lands on a chord tone at that rhythmic position. |
| **Teaching gain** | The student sees that the rhythmically misplaced "way" and the emotionally wrong "way" are the same mistake in two simultaneous color signals. Answers "why does the wrong version feel wrong?" without verbal explanation. |
| **DB synthesis_rationale** | RC-06 maps each syllable to grid position with correct vs. incorrect comparison; EM-08 Fast Analysis checklist uses the same chord-tone/rhythmic logic. The axes are structurally identical — the zones make the implicit explicit. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P5 (ii-V-I) and P8 (I-V-VI-IV) — Castle on the Hill uses the pop axis; zone coloring most legible when student already knows P5 resolution shapes |
| **Status** | Pending founder review |

---

### E2. Harmonic Arc with Clave-Weighted Chord Change Positions

| Field | Value |
|-------|-------|
| **ID** | E2 |
| **Base asset slug** | `ho_the_functional_flow_of_harmony` (HO-05) |
| **Overlay source slug** | `rc_son_clave_2_3_notation_and_binary_grid` (RC-22, RC-11) |
| **What to add** | Binary grid timeline beneath the four-stage arc (HOME→DEPARTURE→TENSION→RESOLUTION), scaled to two measures, with statistically most common chord-change positions marked at clave stops: positions 1, 3, 5, 8, 11, 13. |
| **Teaching gain** | Harmonic function changes are not randomly placed — they fall on clave-marked structurally weighted positions. The emotional journey is both tonal and temporal in a unified view. First time the student sees rhythm and harmony as co-scheduled. |
| **DB synthesis_rationale** | RC-22 shows across 28 pages that chord changes in real songs consistently align with clave positions; HO-05 treats the harmonic arc with no rhythmic specificity — the Rhythm Code data fills that gap with empirical evidence. |
| **Effort estimate** | L (Low) |
| **Harmonic context** | P1 (V→I), P3 (Half Cadence), P5 (ii-V-I) — the four-stage arc maps directly onto these progression types; clave positions anchor P1/P5 resolution moments |
| **Status** | Pending founder review |

---

### E3. Overtone Spiral with Available Tension Windows

| Field | Value |
|-------|-------|
| **ID** | E3 |
| **Base asset slug** | `overtone_series_spiral` (Wilson 1965) |
| **Overlay source slug** | `vo_the_whole_step_rule_worked_reference_sheet` (VO-05, VO-07) |
| **What to add** | Annotation of each partial position on the spiral with the Voicings OS tension classification. Partials 1–4 colored chord-tone blue; partials 5–7 colored available-tension gold; the avoid note partial colored red. |
| **Teaching gain** | The Whole-Step Rule is not an arbitrary voicing convention — it emerges directly from the overtone series. Voicing theory is revealed as applied acoustics. Plogger acoustic foundation connects to Voicings OS practical rules in one diagram. |
| **DB synthesis_rationale** | VO-07 states the Whole-Step Rule as a practical chord-tone boundary test; the spiral shows why that boundary exists — the same partials that cross the whole-step threshold begin to produce audible beating against the root. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P5 (ii-V-I) — the tension classification of partials maps cleanly onto the guide-tone resolution arc of ii-V-I; also relevant to P12 (Coltrane Changes) where extended tensions are essential |
| **Status** | Pending founder review |

---

### E4. Pulsation Tension Mapped to Clave Positions

| Field | Value |
|-------|-------|
| **ID** | E4 |
| **Base asset slug** | `di_chord_pulsation_table` |
| **Overlay source slug** | `rc_son_clave_2_3_notation_and_binary_grid` (RC-22, RC-11) |
| **What to add** | Son Clave (2-3) binary grid as horizontal spine beneath the interval rows, aligning each interval's pulsation rating with its structural position when appearing in clave-rhythmic context. |
| **Teaching gain** | Most harmonically tense di-chords cluster naturally against clave stop positions — the moments of rhythmic arrival the Rhythm Code identifies as structurally load-bearing. Harmonic tension and rhythmic weight are the same phenomenon through two perceptual channels. |
| **DB synthesis_rationale** | RC-11 defines stops as rhythmically weighted note positions; Di-Chord Pulsation Table quantifies acoustic tension by Hz. Neither source alone reveals the convergence — aligned grids make it directly visible. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P1 (V→I) and P5 (ii-V-I) — pulsation rate drops to zero at the tonic arrival; clave stop positions are where that drop is rhythmically scheduled |
| **Status** | Pending founder review |

---

### E5. Emotional Zones with Available Tension Coloring

| Field | Value |
|-------|-------|
| **ID** | E5 |
| **Base asset slug** | `em_emotional_map_of_melody_4_zone_grid` |
| **Overlay source slug** | `vo_tensions_the_full_map` (VO-01, VO-08) |
| **What to add** | Voicings OS tension-availability coloring overlaid on the four-zone grid's horizontal axis. Each scale degree position colored green (available tension) or red (avoid note) based on whole-step rule result against the implied chord. |
| **Teaching gain** | Zone 2 (Tense But Supported) contains exactly the notes the Whole-Step Rule marks as available tensions; Zone 4 (Bitter/Edgy) contains the avoid notes. The map becomes a voicing and melody decision surface simultaneously. |
| **DB synthesis_rationale** | VO-07 Whole-Step Rule table categorizes all diatonic chord tones into available/avoid; EM-01 through EM-05 build the exact same two-axis logic — key stability and chord support. The axes are structurally identical; the vocabulary differs. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P5 (ii-V-I) and P6 (I-IV-V-I) — the zone/tension overlap is most visible across multiple chord functions; relevant to P14 (minor ii°-V7-i) where zone assignments shift |
| **Status** | Pending founder review |

---

### E6. Heptachord Shift House with Modal Darkness Labels

| Field | Value |
|-------|-------|
| **ID** | E6 |
| **Base asset slug** | `heptachord_shift_house_plan` |
| **Overlay source slug** | `ho_the_darkness_hierarchy` (HO-08, HO-28) |
| **What to add** | Harmony OS Darkness Hierarchy color bar as a temperature gradient overlaid on the house plan. Rooms in the Lydian direction glow bright; rooms toward Locrian glow dark. Each room gains its characteristic note label from HO-28. |
| **Teaching gain** | The student experiences the house plan as a literal light-to-dark spatial journey through modal space. Each shift operation carries an emotional temperature, making navigation feel like a compositional decision. |
| **DB synthesis_rationale** | HO-08 Darkness Hierarchy organizes modes from Lydian to Locrian with characteristic notes; the Heptachord Shift House Plan organizes the same 7 modes as spatial rooms. Same set, different organizational logic — overlay makes spatial and emotional simultaneously. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P10 (Modal Vamp) — the house plan is specifically about modal navigation without resolution; darkness hierarchy shows the emotional cost of each shift from P10-type stability |
| **Status** | Pending founder review |

---

### E7. Tonocentric Scale Degree Map with Emotional Zone Rings

| Field | Value |
|-------|-------|
| **ID** | E7 |
| **Base asset slug** | `tonocentric_model_diagram` |
| **Overlay source slug** | `em_zone_1_sweet_grounded` / `em_zone_2_tense_but_supported` / `em_zone_3_floating_modern` / `em_zone_4_bitter_edgy` (EM-06) |
| **What to add** | Emotional Map Solmization Flavor Guide as a color ring inside each scale degree node; a second outer ring showing Zone 1–4 assignment when that degree appears over its most common chord. |
| **Teaching gain** | Three layers of the same phenomenon simultaneously: spatial distance from tonic, emotional flavor in isolation, zone behavior in harmonic context. Three concentric layers of meaning — acoustic, emotional, and harmonic — collapsed into one visual. |
| **DB synthesis_rationale** | EM-06 provides a one-word emotional descriptor per scale degree; the Tonocentric Model organizes degrees by tonal stability — the Emotional Map's horizontal axis (Stable→Unstable) is the same gradient the Tonocentric model shows spatially. |
| **Effort estimate** | M (Medium) |
| **Harmonic context** | P1 (V→I) through P5 (ii-V-I) — zone ring assignments vary by chord context; the outer ring requires showing at least P1/P5/P6 chord contexts to be fully legible |
| **Status** | Pending founder review |

---

### E8. Lap Map Beat Positions with Binary Grid Alignment

| Field | Value |
|-------|-------|
| **ID** | E8 |
| **Base asset slug** | `pw_lap_map_diagram` |
| **Overlay source slug** | `rc_downbeats_and_upbeats_labeled_binary_grids` (RC-03 through RC-05) |
| **What to add** | Binary grid row directly beneath each Lap Map row, with filled dots at positions corresponding to each articulated beat in the Longy pattern being practiced. |
| **Teaching gain** | The student practices the Lap Map physically while reading the same pattern in the Rhythm Code's binary notation. When they later read binary grids in song analysis, they have already felt those grids in their legs. Physical-to-visual translation layer. |
| **DB synthesis_rationale** | RC-03 through RC-05 establish the binary grid as an L/R (downbeat/upbeat) encoding system; the Lap Map uses the same L/R strong/weak distinction — both are binary encodings of metric position, making the alignment lossless. |
| **Effort estimate** | S (Small) |
| **Harmonic context** | No primary harmonic content — this is a rhythm/perception alignment. Relevant to all progressions through the rhythmic placement of chord changes. First targeted at P6 (I-IV-V-I) where chord changes fall on predictable clave positions. |
| **Status** | Pending founder review |

---

### E9. Rhythm Code Map with Functional Tension Heatmap

| Field | Value |
|-------|-------|
| **ID** | E9 |
| **Base asset slug** | `rc_the_rhythm_code_full_system_diagram_with_x_markers` (RC-23) |
| **Overlay source slug** | `ho_the_functional_flow_of_harmony` (HO-05, HO-22) |
| **What to add** | Vertical color temperature strip derived from Functional Flow. Positions 1 and 9 (downbeats) colored Home-green; positions 5 and 13 (mid-bar downbeats) colored Tension-orange; X positions (strong anticipations) colored Resolution-gold. |
| **Teaching gain** | Rhythm Code X markers — the positions Bodzsar identifies as most powerful rhythmic placements — correspond exactly to the harmonic tension-resolution arc. A strong anticipation works because it sits at the functional threshold where harmonic and rhythmic energy both crest simultaneously. |
| **DB synthesis_rationale** | HO-05 defines HOME→DEPARTURE→TENSION→RESOLUTION; RC-23 identifies X positions as highest-tension rhythmic placements — both systems describe the same energetic arc, one in pitch/harmony, one in time. |
| **Effort estimate** | S (Small) |
| **Harmonic context** | P1 (V→I), P5 (ii-V-I) — X markers align with dominant-to-tonic arrivals; the gold Resolution coloring at X positions is directly tied to P5 resolution placement |
| **Status** | Pending founder review |

---

### E10. Position Theory Cycle with Functional Harmony Color Bands

| Field | Value |
|-------|-------|
| **ID** | E10 |
| **Base asset slug** | `vo_position_theory_voice_leading_the_cycle` (VO-03) |
| **Overlay source slug** | `ho_functional_harmony` (HO-10, HO-21) |
| **What to add** | Harmony OS Color System bands as a colored stripe above each chord card: green for Tonic function, blue for Subdominant, red for Dominant. |
| **Teaching gain** | Voice leading of position theory operates symmetrically across all three harmonic functions. Position theory is not a jazz trick applied on top of harmony — it is the physical mechanism by which the HOME→DEPARTURE→TENSION→RESOLUTION arc is executed in the hands. |
| **DB synthesis_rationale** | HO-21 Functional Harmony table assigns Tonic/Subdominant/Dominant to all seven diatonic chords; VO-03 diagrams exactly those chords in cycle order. The position sequence already follows functional order — color coding makes invisible architecture visible. |
| **Effort estimate** | S (Small) |
| **Harmonic context** | P5 (ii-V-I) and P7 (I-VI-II-V Rhythm Changes) — the P3→P2→P1 position sequence is directly illustrated through these two progressions; P14 (minor ii°-V7-i) adds a darker function band variation |
| **Status** | Pending founder review |

---

### E11. Longy Chart with Clave Coincidence Markers

| Field | Value |
|-------|-------|
| **ID** | E11 |
| **Base asset slug** | `longy_rhythm_chart_full` (PW-12) |
| **Overlay source slug** | `rc_son_clave_2_3_notation_and_binary_grid` (RC-21, RC-23) |
| **What to add** | Son Clave binary grid as a reference spine. Gold dot on each Longy pattern cell whose articulation pattern is identical to or a subset of the clave pattern at the same metric position. |
| **Teaching gain** | Certain Longy patterns are clave-coincident. The ear has been culturally trained to weight exactly these permutations because they appear in the most reproduced rhythmic structure in popular music. The Longy chart becomes a map of culturally weighted vs. neutral rhythmic cells. |
| **DB synthesis_rationale** | PW-12 covers all beat subdivision permutations; RC-21 and RC-23 show that the clave governs which of the 16 positions carry structural weight — Longy subdivisions and clave positions share the same binary articulation logic. |
| **Effort estimate** | L (Large) |
| **Harmonic context** | Rhythm-layer only. Clave coincidence markers most significant when the student is practicing rhythm patterns that accompany P6 (I-IV-V-I) or P8 (I-V-VI-IV) pop progressions — the highest clave-coincidence songs are in these families. |
| **Status** | Pending founder review |

---

### E12. Stability Ladder with Left-Hand Straddle Recommendations

| Field | Value |
|-------|-------|
| **ID** | E12 |
| **Base asset slug** | `four_zones_stability_ladder` |
| **Overlay source slug** | `vo_left_hand_straddle_reference` (VO-06) |
| **What to add** | Right-hand column showing the recommended Left Hand Straddle for the chord supporting each zone: Root+7 for stable tonic zones, Root+9 for warm subdominant zones, Root+b7 for dominant tension zones. |
| **Teaching gain** | Student holds two decisions together in one look: which note am I hearing and which left-hand straddle serves the harmonic function that note implies. The stability ladder becomes a performance decision guide — the ear identifies the zone, the hands know the voicing posture. |
| **DB synthesis_rationale** | VO-06 Left Hand Straddles pairs each straddle option with an emotional/functional descriptor (Core, Warmth, Classic, Fuller); Four Zones Stability Ladder organizes the same tonal hierarchy from a melodic perception angle — functional labels translate directly between the two systems. |
| **Effort estimate** | S (Small) |
| **Harmonic context** | P1 (V→I), P5 (ii-V-I), P6 (I-IV-V-I) — the three straddle types map to Tonic/Subdominant/Dominant functions; the ladder becomes fully interpretable once the student knows P6 chord functions |
| **Status** | Pending founder review |

---

## Synthesis Original Candidates

Each entry: ID | Working title | Conceptual gap | Source orbits | Key visual elements | Harmonic context | Moonshot potential | Status

---

### S1. The Scale Degree Prism: One Note Through Five Systems

| Field | Value |
|-------|-------|
| **ID** | S1 |
| **Working title** | The Scale Degree Prism: One Note Through Five Systems |
| **Conceptual gap** | No existing artifact shows a single scale degree simultaneously as di-chord pulsation distance from tonic (Plogger), Emotional Map position (Melody), functional role in diatonic harmony (Harmony OS), tension classification for voicing (Voicings OS), and statistical rhythmic placement likelihood (Rhythm Code). Students must mentally assemble five partial views into a coherent picture of one note. |
| **Source orbits** | `di_chord_properties_complete`, `four_zones_stability_ladder`, `ho_functional_harmony`, `vo_voicings_and_tensions_reference_sheet`, `rc_the_rhythm_code_full_system_diagram_with_x_markers`, `em_emotional_map_of_melody_4_zone_grid`, `ho_the_12_intervals` |
| **Key visual elements** | Vertical slice diagram. Five horizontal registers stacked: (1) Di-chord distance and interference pulsation rate from tonic. (2) Emotional Map 2-axis position. (3) Functional role and modal color in diatonic harmony. (4) Tension classification and whole-step rule result when voiced. (5) Statistical likelihood of appearing on clave-aligned strong vs. passing position. Designed as a repeating template — one page per scale degree. |
| **Harmonic context** | All 14 progressions in the spine apply, but S1 is introduced with P1 (V→I) and P5 (ii-V-I) examples. Scale degree 7 (TI/leading tone): high-pulsation di-chord, Zone 2 or 4, guide tone (3rd of V7), tritone partner of FA, statistically rare as strong-beat landing. Scale degree 1 (DO/tonic): zero pulsation, Zone 1, root of IMAJ7, available (no avoid conflict), strong clave beat arrival. Each page of the template cites the relevant spine IDs for the degree's most common contexts. |
| **Moonshot potential** | High. A student studying scale degree 7 on one page, then flipping to scale degree 4, will have a genuine perceptual revelation about why tritone tension exists. The template format makes the insight transferable across the full system. |
| **Status** | Pending founder review |

---

### S2. The II-V-I Perception Arc: Hearing the Journey in Real Time

| Field | Value |
|-------|-------|
| **ID** | S2 |
| **Working title** | The II-V-I Perception Arc: Hearing the Journey in Real Time |
| **Conceptual gap** | The ii-V-I is taught in isolation in every source — as a chord progression (Harmony OS), as a position theory exercise (Voicings OS), as a zone journey (Melody), as di-chord pulsation arc (Plogger). No diagram shows all four registers as simultaneous descriptions of the same three-chord movement. Students learn to label a ii-V-I but cannot yet name what they are hearing across all four chambers at once. |
| **Source orbits** | `ho_the_ii_v_i_explained`, `ho_cycle_5_and_the_ii_v_i`, `vo_position_theory_voice_leading_the_cycle`, `vo_guide_tone_system_reference_sheet`, `di_chord_pulsation_table`, `em_zone_1_sweet_grounded`, `em_zone_2_tense_but_supported`, `ho_the_functional_flow_of_harmony` |
| **Key visual elements** | Three-chord arc (Dm7→G7→Cmaj7) rendered in four stacked registers: (1) Emotional Map zone of the characteristic melody note at each chord. (2) Di-chord pulsation intensity of that melody note against the chord root. (3) Voicing position theory arc (P3→P2→P1) with guide tone voice leading arrows showing tritone collapse B→C and F→E. (4) Functional harmonic labels (Sub→Dom→Tonic) with darkness hierarchy color from HO-08. |
| **Harmonic context** | P5 (ii-V-I) is the primary frame. The four-register design must also accommodate P9 (Backdoor ii-V-I) in an optional variant panel — showing how the pulsation profile of the backdoor's resolution differs from P5. P14 (minor ii°-V7-i) warrants a separate variant page. All three variants should be produced as a family. |
| **Moonshot potential** | High. The four-register simultaneous view makes the experience of resolution nameable across all four chambers at once — this is the central pedagogical breakthrough of the AMF system, made visible. |
| **Status** | Pending founder review |

---

### S3. The Arrival Moment: What All Five Systems Say About Resolution

| Field | Value |
|-------|-------|
| **ID** | S3 |
| **Working title** | The Arrival Moment: What All Five Systems Say About Resolution |
| **Conceptual gap** | Each system has its own word for the moment of harmonic resolution — but no artifact shows that they are describing the same moment from five different angles. Resolution is not a chord label; it is a convergence. This convergence has never been diagrammed. |
| **Source orbits** | `ho_the_functional_flow_of_harmony`, `ho_chord_function_and_cadences`, `vo_guide_tone_system_reference_sheet`, `vo_position_theory_voice_leading_the_cycle`, `em_zone_1_sweet_grounded`, `em_the_core_shift_three_questions_framework`, `rc_the_rhythm_code_full_system_diagram_with_x_markers`, `di_chord_pulsation_table`, `pw_lap_map_2_beat` |
| **Key visual elements** | Single freeze-frame diagram of the landing on IMAJ7 after a ii-V. Five labeled annotation layers: (1) Rhythm Code: clave strong position confirming rhythmic arrival. (2) Emotional Map: DO over IMAJ7 = Zone 1 Sweet/Grounded. (3) Plogger: DO against tonic root = unison/octave di-chord, zero pulsation, maximum consonance. (4) Voicings OS: guide tones at P1 position, tension resolved, whole-step rule confirms DO as available. (5) Harmony OS: tonic function, cadential arrival, harmonic arc complete. A single word per system labels its description of this moment. |
| **Harmonic context** | P5 (ii-V-I) is the primary example. A sidebar comparison panel shows P9 (Backdoor) and P1 (V→I simple) — demonstrating that S3's convergence holds across all resolution-type progressions but the pulsation profile and zone assignment differ by approach. P4 (Deceptive Cadence) is shown as the counter-case where the convergence does NOT occur, making the resolution moment legible by contrast. |
| **Moonshot potential** | Medium-High. The "five words for the same moment" concept is philosophically striking but requires strong visual execution to avoid feeling like a vocabulary list. The freeze-frame format is essential — one moment, five annotations. |
| **Status** | Pending founder review |

---

### S4. The Groove-Pitch Matrix: Clave Positions Mapped to Emotional Zones

| Field | Value |
|-------|-------|
| **ID** | S4 |
| **Working title** | The Groove-Pitch Matrix: Clave Positions Mapped to Emotional Zones |
| **Conceptual gap** | The Rhythm Code and the Emotional Map both claim to describe how musical expectation works — but from entirely different angles. Neither document acknowledges the other. No artifact shows that rhythmic position and emotional zone co-determine each other. |
| **Source orbits** | `rc_the_rhythm_code_full_system_diagram_with_x_markers`, `rc_downbeats_and_upbeats_labeled_binary_grids`, `em_emotional_map_of_melody_4_zone_grid`, `em_writing_revision_tips`, `pw_lap_map_2_beat`, `pw_lap_map_3_beat`, `pw_lap_map_4_beat`, `rc_vocal_melody_lyric_mapped_binary_grids_castle_on_the_hill` |
| **Key visual elements** | 16-column binary grid (one full two-measure clave cycle) crossed with a vertical axis showing the four Emotional Map zones. Each of the 16 rhythmic positions is color-coded by zone likelihood based on structural gravity. Plogger Lap Map beat-strength hierarchy (strong/weak/weaker) runs along the bottom, aligning physical gesture with clave position with emotional expectation. Song annotations from Castle on the Hill read in three registers simultaneously. |
| **Harmonic context** | P6 (I-IV-V-I) and P8 (I-V-VI-IV) — both high clave-coincidence progressions from popular music. The matrix is most revelatory when a student applies it to a song they already know. Agents should use the Castle on the Hill evidence (P8 family) as the primary worked example. |
| **Moonshot potential** | High. The unstated claim of both the Rhythm Code and the Emotional Map — that rhythm and emotional color co-determine each other — is made explicit in a single visual. A working musician will stop scrolling. |
| **Status** | Pending founder review |

---

### S5. The Lap Map Meets the Clave: Physical Body as Rhythmic Compass

| Field | Value |
|-------|-------|
| **ID** | S5 |
| **Working title** | The Lap Map Meets the Clave: Physical Body as Rhythmic Compass |
| **Conceptual gap** | The Plogger Lap Map and the Rhythm Code binary grid are presented as separate techniques in the AMF system. No artifact shows they are two notations for the same physical reality — and that a student who can do the Lap Map for 3+2 groupings is already feeling the tresillo subdivision that underlies the son clave. |
| **Source orbits** | `pw_lap_map_2_beat`, `pw_lap_map_3_beat`, `pw_lap_map_4_beat`, `pw_lap_map_5_beat`, `pw_lap_map_6_beat`, `pw_lap_map_7_beat`, `rc_son_clave_2_3_notation_and_binary_grid`, `rc_tresillo_maximal_evenness_notation_and_binary_grid`, `rc_downbeats_and_upbeats_labeled_binary_grids`, `lap_map_diagram`, `longy_rhythm_chart_full` |
| **Key visual elements** | Split diagram. Left: Lap Map beat-hierarchy diagram (L/R leg columns, strong/weak/weaker gradient). Right: Rhythm Code 16-position binary grid. Alignment lines connecting each clave position to its physical lap-tap counterpart. The two notes of the "2-side" traced to strong left-leg beats; three notes of the "3-side" traced across strong and weak beats. Groove annotation below both showing the difference between felt and counted clave. |
| **Harmonic context** | No primary harmonic content. The physical body interface is rhythm-layer only. Best introduced alongside P6 (I-IV-V-I) in Sprint 2–3 when the student is first experiencing chord changes in time. |
| **Moonshot potential** | Medium. The "body already knows the clave" insight is powerful but requires the student to have already drilled both systems. Best suited to intermediate sprints where the connection will feel revelatory rather than premature. |
| **Status** | Pending founder review |

---

### S6. The Darkness-Pulsation Map: Modal Color as Perceptual Dissonance

| Field | Value |
|-------|-------|
| **ID** | S6 |
| **Working title** | The Darkness-Pulsation Map: Modal Color as Perceptual Dissonance |
| **Conceptual gap** | The Harmony OS's "darkness hierarchy" is presented as a felt quality (Lydian = bright, Locrian = dark) without acoustic explanation. The Plogger system quantifies exactly the acoustic mechanism behind this felt quality but does not connect it to modal color. No diagram shows that "darkness" in the Harmony OS is a direct perceptual consequence of increasing pulsation in the characteristic note. |
| **Source orbits** | `ho_the_darkness_hierarchy`, `ho_exotic_mode_borrowing`, `modal_di_chord_profiles_from_tonic`, `di_chord_pulsation_table`, `eight_rules_aural_mode_perception`, `harmonicity_by_mode`, `em_zone_4_bitter_edgy`, `em_zone_1_sweet_grounded`, `ho_parallel_minor_modal_interchange` |
| **Key visual elements** | Two-axis diagram. Horizontal: Harmony OS darkness hierarchy (Lydian→Ionian→Mixolydian→Dorian→Aeolian→Phrygian→Locrian). Vertical: average di-chord pulsation rate of the characteristic note of each mode against the tonic. Each mode plotted as a labeled dot with: characteristic scale degree, Emotional Map zone tendency, borrowed chord example from HO-28. |
| **Harmonic context** | P10 (Modal Vamp) is the primary frame — modal color operates most clearly in non-resolving vamp contexts. P9 (Backdoor ii-V-I) is the most useful resolving example, as it imports a dark mode (bVII) into a resolution context. P12 (Coltrane Changes) is the advanced example where three modal colors rotate through three tonal centers. |
| **Moonshot potential** | High. "Darkness is not a metaphor — it is what your ear measures as interference." This is the kind of statement that makes a musician stop and reconsider everything they thought they knew about mode theory. |
| **Status** | Pending founder review |

---

### S7. The Tritone Under the Microscope: One Interval, Four Systems

| Field | Value |
|-------|-------|
| **ID** | S7 |
| **Working title** | The Tritone Under the Microscope: One Interval, Four Systems |
| **Conceptual gap** | The tritone (FA↔TI) is discussed in every chamber — as the maximum-pulsation di-chord (Plogger), as the Zone 4 avoid note and Zone 2 supported tension pair (Melody), as the guide-tone pair that drives V7 resolution (Harmony), as the whole-step rule boundary case (Voicings). No diagram unifies all four views of the same interval. |
| **Source orbits** | `di_chord_pulsation_table`, `ho_tritone_symmetry`, `ho_tritone_substitution`, `vo_guide_tone_system_reference_sheet`, `vo_the_whole_step_rule_worked_reference_sheet`, `em_zone_4_bitter_edgy`, `em_zone_2_tense_but_supported`, `ho_the_ii_v_i_explained`, `ho_interval_quality_progression` |
| **Key visual elements** | Single focused diagram on the tritone rendered as four simultaneous facts: (1) Plogger: maximum-pulsation di-chord (pulsation rate and interference wave sketch). (2) Emotional Map: FA over C chord = Zone 4 bitter/edgy; TI over G7 = Zone 2 supported tension. (3) Guide-tone pair: collapses by half-step in voice leading (B→C, F→E). (4) Voicing element: whole-step rule flags FA as avoid note against IMAJ7 but available tension against IVmaj7. Symmetry callout: the tritone divides the octave exactly in half — only di-chord with no preferred resolution direction; direction supplied by harmonic context. |
| **Harmonic context** | P5 (ii-V-I), P11 (Tritone Substitution), P7 (I-VI-II-V). P11 is critical: the tritone substitution works precisely because the substitute chord shares the same tritone (B↔F) as the original V7 — the four-system analysis of S7 makes P11 immediately legible once understood. Agents should include a P11 annotation column in the diagram. |
| **Moonshot potential** | Medium-High. The symmetry callout ("no preferred resolution direction — direction is supplied by harmonic context") is the single most clarifying fact about tritone anxiety that most musicians never encounter. |
| **Status** | Pending founder review |

---

### S8. The Tension Spectrum: From Acoustic Pulsation to Voicing Decision

| Field | Value |
|-------|-------|
| **ID** | S8 |
| **Working title** | The Tension Spectrum: From Acoustic Pulsation to Voicing Decision |
| **Conceptual gap** | The Voicings OS "whole-step rule" is presented as a practical heuristic without acoustic justification. The Plogger system supplies the exact acoustic justification but never connects it to voicing practice. No diagram shows that the whole-step rule is a translation of pulsation logic into a physical decision system — and that students' ears already know the rule. |
| **Source orbits** | `vo_tensions_the_full_map`, `vo_the_whole_step_rule_worked_reference_sheet`, `vo_diatonic_tension_chart_c_major`, `di_chord_pulsation_table`, `di_chord_properties_complete`, `em_emotional_map_of_melody_4_zone_grid`, `ho_the_12_intervals`, `ho_interval_quality_system`, `overtone_series_first_seven_partials` |
| **Key visual elements** | Horizontal gradient spectrum. Left axis: di-chord pulsation rate (Plogger). Right axis: voicing tension classification (avoid / available / chord tone / guide tone from whole-step rule). Every chromatic note plotted relative to C as tonic, simultaneously by pulsation value and voicing classification over each of four primary diatonic chord types (IMAJ7, IIm7, V7, IVmaj7). Each note's Emotional Map zone color-coded. |
| **Harmonic context** | All four chord types covered in the spectrum map to specific progression contexts: IMAJ7 = P1/P5 resolution; IIm7 = P5 approach; V7 = P1/P5/P13 dominant; IVmaj7 = P2/P6 subdominant. Agents should annotate each chord column with its most common progression spine IDs. |
| **Moonshot potential** | Medium. The core insight ("your ear already knows the whole-step rule") is powerful but requires careful visual execution to avoid overwhelming the student with information density. |
| **Status** | Pending founder review |

---

### S9. The Backdoor As Perceived: Why Fm7→Bb7→C Sounds Like Coming Home From the Side Door

| Field | Value |
|-------|-------|
| **ID** | S9 |
| **Working title** | The Backdoor As Perceived: Why Fm7→Bb7→C Sounds Like Coming Home From the Side Door |
| **Conceptual gap** | The backdoor ii-V-I is typically explained theoretically (borrowed from parallel minor). No artifact explains the backdoor in perceptual terms across all four chambers — why it feels smooth rather than tense, why it "arrives at Zone 1 via Zone 3 rather than Zone 2." |
| **Source orbits** | `ho_two_paths_to_home`, `ho_parallel_minor_modal_interchange`, `ho_exotic_mode_borrowing`, `ho_the_darkness_hierarchy`, `vo_guide_tone_system_reference_sheet`, `di_chord_pulsation_table`, `em_zone_3_floating_modern`, `em_zone_1_sweet_grounded`, `modal_di_chord_profiles_from_tonic` |
| **Key visual elements** | Side-by-side comparison of P5 (Dm7→G7→Cmaj7) and P9 (Fm7→Bb7→Cmaj7) across four perceptual registers: (1) Harmony OS: modal source of approach chords (Dorian/Mixolydian vs. Phrygian/Aeolian from parallel minor). (2) Plogger: di-chord identity and pulsation profile of the characteristic melody note; standard dominant resolves via high-pulsation TI→DO half-step; backdoor via whole-step MI♭→RE with different pulsation contour. (3) Emotional Map: standard arrival at Zone 1 via Zone 2 (friction); backdoor arrival via Zone 3 (color/float). (4) Voicings OS: guide tone differences between Fm7 and Dm7. |
| **Harmonic context** | P5 vs. P9 comparison is the primary frame. P6 context helps the student understand why the backdoor is used as a substitution (same harmonic function category, different perceptual path). P10 (Modal Vamp) context explains why the backdoor's borrowed modal color does not feel jarring — it imports modal darkness transiently rather than establishing a new modal center. |
| **Moonshot potential** | High. "Arrives at Zone 1 via Zone 3 rather than Zone 2" is the first perceptual explanation of the backdoor that a musician will find satisfying. The side-by-side comparison format makes the distinction immediately audible-to-visual. |
| **Status** | Pending founder review |

---

### S10. The Tracking Page Decoded: Intervals as Rhythm, Melody, and Harmony Simultaneously

| Field | Value |
|-------|-------|
| **ID** | S10 |
| **Working title** | The Tracking Page Decoded: Intervals as Rhythm, Melody, and Harmony Simultaneously |
| **Conceptual gap** | The Plogger Tracking Page is used as an isolated ear-training exercise. No artifact shows that it is simultaneously training harmonic root motion perception, calibrating interval acoustic weight as rhythmic arrival, and mapping onto the circle of fifths. Students use it as a drill without understanding its full scope. |
| **Source orbits** | `tracking_page`, `tracking_page_fill_in_rhythm`, `tracking_page_progress_chart`, `pw_pythagorean_ordering_of_fifths`, `di_chord_properties_complete`, `di_chord_pulsation_table`, `ho_functional_harmony`, `ho_cycle_5_and_the_ii_v_i`, `rc_the_rhythm_code_full_system_diagram_with_x_markers`, `pw_ascending_fifths_notation` |
| **Key visual elements** | Annotated expansion of the Plogger Tracking Page (p.153) mapping each interval slot outward to three simultaneous identities: (1) Di-chord pulsation category (zero/low/medium/high). (2) Most common diatonic harmonic function when that interval appears as a root movement (e.g., Perfect 5th descent = V→I resolution). (3) Rhythm Code arrival type (strong beat consonance vs. anticipation dissonance). Pythagorean ordering of fifths runs along the left margin showing the Tracking Page's interval sequence IS the circle of fifths viewed from the ear. |
| **Harmonic context** | The full 14-progression spine maps across the Tracking Page interval slots: [5] = P1/P2/P5/P13; [3] = P12 (Coltrane); [6] = P11 (Tritone Substitution); [2] = P4 (Deceptive Cadence) / P10 (Modal Vamp). Agents must annotate every di-chord slot with its corresponding spine IDs — this is the diagram's primary teaching payload. |
| **Moonshot potential** | Medium. The "Tracking Page as circle of fifths from the ear" insight is profound but requires the student to already have Tracking Page fluency. Best suited to Sprint 4+ students. |
| **Status** | Pending founder review |

---

## Moonshot Candidates

Each entry: ID | Concept | Why it stops a working musician | Technical feasibility | Cortex litmus result | Status

---

### M1. The Harmonic Atom Collider

| Field | Value |
|-------|-------|
| **ID** | M1 |
| **Concept** | A circular diagram where the 11 di-chord numbers radiate like spokes from a center point. When a song plays, the root movements trace a glowing path between spokes — like a particle collider lit up in real time. The path a song traces is its harmonic fingerprint. Two songs with wildly different emotional character lay their paths on the same wheel — the student sees not just similarity but structural kinship. |
| **Tagline** | Every song ever written is just 7 intervals colliding in sequence — and you can see exactly which ones, in what order, the moment it starts. |
| **Why it stops a working musician** | The rotation of [5] — same interval, opposite emotional function depending on direction — is the single most clarifying insight in the entire AMF system and has never been shown visually before. A working musician will immediately want to trace their favorite song. The "only 7 intervals, heard your whole life" realization is the jaw-drop. |
| **Technical feasibility** | High for static version (SVG circle with labeled spokes and manually plotted path arcs). Medium for animated version (requires song root movement data and a real-time path renderer). Static version should be produced first; animated version is Phase 9+ scope. |
| **Cortex litmus result** | PASS — a musician mid-scroll would stop. The visual metaphor (particle collider paths) is unique, non-obvious, and immediately interpretable by anyone who has seen a particle collider diagram. The insight it delivers (same interval, opposite emotional direction) is genuinely novel as a visual representation. |
| **Status** | Pending founder review |

---

### M2. The Architect's Blueprint of a Song

| Field | Value |
|-------|-------|
| **ID** | M2 |
| **Concept** | A four-quadrant technical drawing rendered in architectural blueprint visual language (blue-on-white, dimension lines, elevation views, floor plan, cross-section). Top-left: Floor Plan (top-down grid showing where melody lives in pitch/zone space across time). Top-right: Elevation (harmonic root movements as structural load-bearing diagram, each di-chord interval as a beam of specific length and angle). Bottom-left: Foundation (16-position groove grid, clave relationship, Longy pattern). Bottom-right: Materials List (di-chords used, zones visited, tension arc in three words). Printed at poster size. |
| **Tagline** | What if you could see a song from above — the way an architect sees a building before a single wall is raised? |
| **Why it stops a working musician** | Architecture blueprints show all four views of a structure simultaneously. The format signals to the musician that music is intentional engineering, not magic. The moment a student holds a blueprint of their own song is the moment the system completes — they are no longer consumers of music, they are architects. |
| **Technical feasibility** | High for static template (the four-quadrant layout is well-defined). The difficulty is in the visual execution — the architectural blueprint aesthetic requires careful design work. A Nano Banana spec can define the layout; the aesthetic requires a design pass from the founder before the spec is finalized. Effort: XL. |
| **Cortex litmus result** | PASS — the blueprint aesthetic is immediately distinctive and non-musical in a way that reframes music as a designed object. A music teacher would immediately want to print it and assign "make your own blueprint." The Materials List quadrant is the pedagogical anchor that makes the full blueprint legible to a non-architect. |
| **Status** | Pending founder review — requires founder design review before Nano Banana spec is written |

---

### M3. The Song X-Ray

| Field | Value |
|-------|-------|
| **ID** | M3 |
| **Concept** | A single-page visual template with four transparent overlay layers: (1) Horizontal band showing which melody zones the vocal line inhabits, color-coded by zone. (2) Clave grid showing the 16-position rhythm with the song's main rhythmic hits highlighted against Son Clave. (3) Root movement timeline showing each chord change as a numbered di-chord arc, left to right, with harmonic direction shown by arrow. (4) Emotional terrain topographic line tracing tension and release through the song. All four layers stackable and readable independently. |
| **Tagline** | Drop any song onto a single page and see its skeleton: which melody zones it inhabits, which clave its rhythm implies, which di-chord movements carry its harmony — all at once, like an MRI of the music. |
| **Why it stops a working musician** | The AMF teaches four chambers simultaneously. Almost no curriculum tool shows all four operating on the same musical object at the same instant. The X-Ray makes the simultaneous nature of music perception legible using real songs the student already loves. Laying two X-Rays on top of each other to compare skeletons is a genuinely novel analytical experience. |
| **Technical feasibility** | High. Each of the four layers can be specified precisely in a Nano Banana JSON. The overlay stacking is a compositing operation, not a rendering challenge. The "drop any song" aspiration requires a template — the Phase 9 agent should produce a worked example for Stand By Me as the reference instantiation, then produce the blank template. Effort: L. |
| **Cortex litmus result** | PASS — the MRI/X-Ray metaphor is immediately understood by anyone. The "lay two songs on top" use case is the specific moment that would stop a working musician: seeing that Stand By Me and No Woman No Cry have the same skeletal di-chord arc is an insight no existing tool delivers. |
| **Status** | Pending founder review |

---

### M4. The Scale of Resolution

| Field | Value |
|-------|-------|
| **ID** | M4 |
| **Concept** | An emotional gravity map. Eleven di-chord numbers arranged on a vertical axis not by size but by their hunger for resolution. [6] the tritone sits at the top: maximum tension, maximum pull. [0] is at the bottom: home. The visual metaphor is a planet with a gravitational field — intervals closer to the core have weaker tension, intervals at the outer edge strain against escape velocity. Chord progressions shown as orbital paths: some crash toward the center (resolution), some orbit stably (modal vamps), some escape entirely (deceptive cadences). |
| **Tagline** | There are exactly 11 harmonic distances, and they all want to go home — some desperately, some lazily, some not at all. |
| **Why it stops a working musician** | Tension and resolution are the engine of all Western music but are almost always taught as lists of rules. The gravity metaphor maps directly onto what the ear already knows — listeners have been sensing this "pull" their entire lives. The diagram does not teach a new concept; it gives a name and shape to something always felt but never seen. |
| **Technical feasibility** | High. Gravity map is a well-understood visual design. The di-chord tension ordering is already defined in the di_chord_pulsation_table. The orbital path overlays (resolution, modal vamp, deceptive) can be specified precisely. Effort: S. |
| **Cortex litmus result** | PASS — the gravity metaphor makes dominant function immediately legible to someone who has never studied theory. The deceptive cadence shown as an "escape velocity" path is a specific image that will stop a musician mid-scroll. |
| **Status** | Pending founder review |

---

### M5. The Clave Rosetta Stone

| Field | Value |
|-------|-------|
| **ID** | M5 |
| **Concept** | A circular diagram divided into 16 positions like a clock with 16 hours. Three concentric rings: outer ring shows Longy syllables (ta, te, dot, etc.) for a given rhythm. Middle ring shows the 8-position Rhythm Code grid with stops and anticipations. Inner ring shows the Son Clave relationship. A student who has learned any one system can instantly find their location in the other two. |
| **Tagline** | The Son Clave, the Plogger rhythm grid, and the Longy chart are three languages describing the same 16 moments — and this is the decoder ring. |
| **Why it stops a working musician** | These three separate systems — taught in three separate sections of the AMF — were describing the same 16 moments the whole time. A working musician who has drilled all three will have a genuine perceptual breakthrough the first time they see all three aligned. The "decoder ring" format (like a physical cipher wheel) is immediately recognizable and invites interaction. |
| **Technical feasibility** | High. Three concentric rings on a 16-position circle is a deterministic layout. The alignment between Longy, Rhythm Code, and Son Clave is precisely specifiable. Effort: L (due to visual complexity of aligning three ring systems cleanly). |
| **Cortex litmus result** | PASS — the decoder ring / Rosetta Stone visual metaphor is iconic and immediately understood. The specific moment of "all three systems, same 16 positions" is a revelation that any student who has drilled all three systems will experience as validation and insight simultaneously. |
| **Status** | Pending founder review |

---

### M6. The Ear Training Periodic Table

| Field | Value |
|-------|-------|
| **ID** | M6 |
| **Concept** | A grid with di-chord numbers 0–10 across the top axis and three properties down the vertical axis: (1) Physical size in semitones. (2) Emotional character (one-word descriptor: stable / reaching / tense / ambiguous / dark / bright). (3) Harmonic function (tonic / subdominant / dominant / color). Each cell filled with a short phrase from a real song exemplifying that interval in that emotional register. Organized by law, not by alphabet. |
| **Tagline** | 11 intervals. 3 emotional dimensions. Every melodic and harmonic relationship a musician will ever encounter, in one grid — organized by the laws that actually govern them. |
| **Why it stops a working musician** | Every musician will immediately want to find their favorite interval. Every teacher will immediately want to replace their interval chart with this one. The jaw-drop comes when students realize that the "rules" they were taught — why V goes to I, why the tritone resolves — are physical properties visible right there in the grid, not arbitrary conventions. |
| **Technical feasibility** | Medium. The grid layout is straightforward. The challenge is curating the real-song phrase examples for each cell — this requires founder input to select culturally resonant examples that span multiple genres. Effort: M. Founder must approve the song phrase list before Nano Banana spec is finalized. |
| **Cortex litmus result** | CONDITIONAL PASS — the periodic table metaphor works only if the song examples are culturally resonant and genre-diverse. A table filled with jazz standards will not stop a pop musician. Requires founder curation of examples before the diagram achieves moonshot potential. |
| **Status** | Pending founder review — requires founder song-phrase selection before spec |

---

### M7. The Mastery Depth Map

| Field | Value |
|-------|-------|
| **ID** | M7 |
| **Concept** | A cross-section of a human figure from shoulder to fingertip, rendered like a geological core sample. Three depth layers: Surface (cortex, conscious attention) = Stage 1. Middle layer (basal ganglia, procedural memory) = Stage 2. Deepest layer (cerebellum, the body) = Stage 3. Each of a student's current skills plotted as a colored dot at whatever depth it currently occupies. A [5] di-chord drilled for three weeks sits in the middle layer. A song memorized as a child sits in the deepest layer. |
| **Tagline** | Stage 1, Stage 2, Stage 3 don't describe how good you are — they describe how deep in your nervous system the skill has been installed. |
| **Why it stops a working musician** | The Three Stages of Learning is one of the most powerful ideas in the Plogger system but gets dismissed as soft motivation talk. This diagram converts it from philosophy into physiology. The shift from "how well did I do?" to "where in my nervous system does this live?" is the most important mindset change the AMF tries to create. A working musician who has experienced "automatic playing" will immediately recognize what the deepest layer describes. |
| **Technical feasibility** | High. The geological cross-section body diagram is a specific, well-defined visual. The dot-plotting of skills at depth layers can be specified in the Nano Banana JSON. A worked example with 6–8 sample skills plotted makes the diagram immediately legible. Effort: M. |
| **Cortex litmus result** | PASS — the physiology metaphor converts an abstract learning theory into a felt physical reality. "How deep in your nervous system is this installed?" is a question that will stop a musician mid-scroll and make them reconsider the last piece they practiced. |
| **Status** | Pending founder review |

---

## Nano Banana Spec Template

The JSON skeleton a Phase 7 agent uses when decomposing a diagram asset for rendering. All fields are required. Source annotations indicate where the value originates.

```json
{
  "asset_id": "string — matches asset_registry.slug",
  "asset_tier": "string — 'plogger' | 'external' | 'amf_original'",
  "synthesis_type": "string | null — 'enhancement' | 'synthesis_original' | 'moonshot' | null (for non-synthesis assets)",
  "synthesis_id": "string | null — e.g. 'E1', 'S3', 'M2' — null if not a synthesis candidate",
  "base_slug": "string | null — slug of the base diagram (enhancements only); null for originals",
  "overlay_slugs": ["string"] ,
  "title": "string — display title for the rendered diagram",
  "subtitle": "string | null — secondary label",
  "canvas": {
    "width_px": "integer — target render width",
    "height_px": "integer — target render height",
    "background": "string — hex color or 'transparent'",
    "grid": "boolean — show underlying grid lines for alignment",
    "bleed_px": "integer — safe margin around content"
  },
  "layers": [
    {
      "layer_id": "string — unique within this spec",
      "layer_type": "string — 'base_diagram' | 'overlay_color' | 'overlay_text' | 'overlay_icon' | 'annotation' | 'legend'",
      "source_slug": "string — which source asset provides the content for this layer",
      "source_section": "string — specific section, page, or figure reference within the source (e.g. 'EM-08', 'RC-22', 'HO-05')",
      "content": {
        "description": "string — plain-language description of what this layer shows",
        "elements": ["string — list of visual elements in this layer"],
        "color_scheme": "string | null — color palette name or hex values if applicable",
        "z_index": "integer — stacking order (1 = bottom)"
      },
      "teaching_intent": "string — one sentence: what should the student understand from this layer that they could not understand without it"
    }
  ],
  "harmonic_context": {
    "progression_spine_ids": ["string — P1, P5, etc. from the 12+2 spine"],
    "sprint_range": "string — e.g. 'Sprint 3-5' — earliest sprint where this diagram is pedagogically appropriate",
    "key_example": "string — specific chord/key used in the diagram for concreteness"
  },
  "synthesis_rationale": "string — paragraph suitable for storage in asset_registry.synthesis_rationale column. Explains why the combination reveals something neither source shows alone.",
  "effort_estimate": "string — 'XS' | 'S' | 'M' | 'L' | 'XL'",
  "impact_score": "integer — 1-10 teaching impact estimate from SYNTHESIS_CANDIDATES.md",
  "founder_review_required": "boolean — true if this asset requires founder approval before rendering begins",
  "founder_review_reason": "string | null — reason if founder_review_required is true",
  "status": "string — 'pending_review' | 'approved' | 'in_progress' | 'complete' | 'rejected'",
  "rejection_reason": "string | null — if status = 'rejected', explanation",
  "nano_banana_model": "string — 'gemini-2.0-flash' (canonical Nano Banana renderer)",
  "render_prompt_template": "string — the prompt skeleton to send to Nano Banana; use {field_name} placeholders for dynamic content",
  "output_path": "string — target file path for the rendered PNG, relative to amf-app/public/",
  "created_by": "string — agent ID or 'founder'",
  "created_at": "string — ISO 8601 timestamp",
  "last_modified_at": "string — ISO 8601 timestamp"
}
```

**Spec validation rules for Phase 7 agents:**
1. `synthesis_type` must be non-null for any asset with `asset_tier = 'amf_original'`.
2. `synthesis_id` must match an ID defined in this document (E1–E12, S1–S10, M1–M7).
3. `base_slug` must resolve to an existing row in `asset_registry` for enhancement types.
4. All `overlay_slugs` must resolve to existing rows in `asset_registry`.
5. `harmonic_context.progression_spine_ids` must reference IDs from the 12+2 spine table in this document.
6. `synthesis_rationale` must be 50–300 words; shorter submissions are rejected (insufficient teaching justification).
7. `founder_review_required` defaults to `true` for all moonshot (`M*`) assets and for any synthesis original with `impact_score >= 9`.

---

## Phase 9 Agent Instructions

### What Phase 9 Does

Phase 9 agents execute synthesis: they read approved synthesis candidates, write Nano Banana specs, trigger rendering, and insert completed assets into the `asset_registry` and `diagram_specs` tables. They do not make design decisions. All design decisions are encoded in this document or escalated to the founder.

### Database Tables to Query

```sql
-- 1. Check which candidates are approved
SELECT id, candidate_id, candidate_type, status, synthesis_rationale
FROM synthesis_candidates
WHERE status = 'approved'
ORDER BY candidate_type, candidate_id;

-- 2. Verify base slugs exist before writing specs
SELECT slug, tier, title
FROM asset_registry
WHERE slug = '<base_slug>';

-- 3. Verify overlay slugs exist
SELECT slug, tier, title
FROM asset_registry
WHERE slug = ANY(ARRAY['<slug1>', '<slug2>']);

-- 4. Check for existing diagram_specs before creating new ones (idempotency)
SELECT asset_id, created_at
FROM diagram_specs
WHERE asset_id = '<slug>';

-- 5. Insert completed synthesis asset into registry
INSERT INTO asset_registry (slug, tier, title, synthesis_type, synthesis_rationale, status, created_at)
VALUES ('<new_slug>', 'amf_original', '<title>', '<enhancement|synthesis_original|moonshot>', '<rationale>', 'complete', NOW());

-- 6. Insert Nano Banana spec
INSERT INTO diagram_specs (asset_id, spec_json, created_at, updated_at)
VALUES ('<new_slug>', '<json_spec>', NOW(), NOW());
```

### Harmonic Context — Full Spine Required

Phase 9 agents must reference the full 12+2 progression spine from this document. The default behavior of citing only ii-V-I (P5) is a specification defect. For each synthesis candidate:

1. Read the `harmonic_context` section of the candidate's entry in this document.
2. List all applicable spine IDs in the Nano Banana spec `harmonic_context.progression_spine_ids` field.
3. For synthesis originals S2, S3, S7, S9, and S10, the spec MUST include at least three spine IDs — these candidates explicitly orbit multiple progression contexts.
4. For moonshots, the harmonic context is illustrative, not exhaustive — cite the 2–3 spine IDs most relevant to the primary example used in the diagram.

### Decision Authority Matrix

| Decision Type | Auto-Approved | Requires Founder Review |
|---------------|---------------|------------------------|
| Writing Nano Banana spec for approved enhancement (E1–E12) | YES — if `status = 'approved'` in DB | NO |
| Writing Nano Banana spec for approved synthesis original (S1–S10) | YES — if `status = 'approved'` and `impact_score < 9` | NO |
| Writing Nano Banana spec for synthesis original with `impact_score >= 9` | NO | YES — founder must confirm visual design before spec is finalized |
| Writing Nano Banana spec for any moonshot (M1–M7) | NO | YES — all moonshots require founder design review |
| Selecting song examples for M6 (Periodic Table) | NO | YES — founder must approve song phrase list |
| Choosing the architectural blueprint aesthetic for M2 | NO | YES — explicitly flagged in M2 entry |
| Inserting completed asset into `asset_registry` | YES — after spec is approved and render is complete | NO |
| Triggering re-render of a previously rendered asset | YES — if spec changed | NO |
| Changing a candidate's `status` to `'rejected'` | NO | YES — always requires founder review |

### Handling the Full 12+2 Spine — Anti-Patterns to Avoid

**Anti-pattern 1 — ii-V-I default:** A spec that cites only `["P5"]` in `progression_spine_ids` is almost always incomplete. Check the candidate entry for additional spine IDs before submitting the spec.

**Anti-pattern 2 — Sprint 1 examples for Sprint 6 content:** The spec's `sprint_range` must match the progression spine IDs. P11 (Tritone Substitution) and P12 (Coltrane Changes) are Sprint 6+ content. A spec citing these for a Sprint 2 example is a pedagogy error.

**Anti-pattern 3 — Missing the backdoor variant:** S2, S3, and S9 all explicitly require variant panels comparing P5 and P9. A spec that produces only the P5 version is incomplete. Flag this as a partial completion in the DB status field: `'in_progress_p5_only'`.

**Anti-pattern 4 — Ignoring the moonshot feasibility note:** M2 and M6 have explicit founder-input requirements flagged in their entries. An agent that writes specs for these candidates without triggering founder review has violated the decision authority matrix. Block and escalate.

### Processing Order Recommendation

1. Process all S-effort enhancements first (E8, E9, E10, E12) — fastest path to working synthesis assets.
2. Then M-effort enhancements (E1, E3, E4, E5, E6, E7) — medium complexity.
3. Then L-effort enhancement E11 (Longy/Clave) — highest effort in the enhancement category.
4. Then E2 (L-effort but flagged as low in the candidates doc — verify: E2 effort is marked "L" meaning Low, not Large).
5. Then synthesis originals S5 and S10 (lowest effort, well-defined evidence base).
6. Then S2, S3, S7 (medium effort, highest impact, most critical to the AMF's core pedagogy).
7. Then S1, S4, S6, S8, S9 (medium effort, strong impact).
8. Moonshots M4 and M7 (small effort, high feasibility — process after founder review).
9. Moonshots M1, M3, M5, M6 (medium-large effort — requires founder design input).
10. Moonshot M2 (XL effort — last; requires full founder design review before any spec work begins).

### Quality Gate Before Inserting to DB

Before inserting any completed synthesis asset into `asset_registry`, verify:

- [ ] `synthesis_rationale` is 50–300 words and cites specific source section references (e.g., "RC-22", "HO-05").
- [ ] `harmonic_context.progression_spine_ids` contains at least one valid ID from the 12+2 spine.
- [ ] For S* and M* assets: founder approval is recorded (approval timestamp, not just status flag).
- [ ] Rendered PNG is stored at the path specified in `output_path` and is readable.
- [ ] No existing row with the same `slug` already exists in `asset_registry` (check before INSERT).
- [ ] `synthesis_type` matches the candidate category (E* = enhancement, S* = synthesis_original, M* = moonshot).
