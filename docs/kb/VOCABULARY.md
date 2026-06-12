# AMF Canonical Vocabulary

**Purpose:** Any agent reading this document will use the same terms as every other agent. Prevents semantic drift across sessions.

**Sources:** AMF_ARCHITECTURE_V2.md, PLOGGER_ASSET_INVENTORY_PLAN.md, amf_assets.asset_registry primary_topics (106 values, live DB as of 2026-06-12)

**Rule:** When in doubt, use the term exactly as spelled here. Do not paraphrase, abbreviate, or substitute synonyms.

---

## Core System Terms

| Term | Definition | Source System | Do Not Confuse With |
|------|-----------|---------------|---------------------|
| **AMF** | Autonomous Music Framework — the full mastery-gated curriculum system for learning music on two instruments simultaneously. | AMF_ARCHITECTURE_V2.md | Any individual component. AMF is the whole system, not just the app. |
| **Plogger Method** | The source book authored by Plogger that provides the perceptual language layer — di-chords, interference pulsation, F/O factor, harmonicity, the Pictograph. It is Tier 1 of the asset model. The backbone from which everything else extends. | PLOGGER_ASSET_INVENTORY_PLAN §5 | The broader AMF system. Plogger is one input source — foundational, but not synonymous with AMF. |
| **Musical OS** | The perceptual infrastructure built by the Plogger Method. Not a software OS. The ear-training vocabulary (di-chords, pulsation, harmonicity) that every other AMF chamber builds on. | AMF_ARCHITECTURE_V2.md §Founding Insight | "The app." Musical OS is a curriculum metaphor. |
| **The Synthesizer** | Section 5 of each daily practice session (8 minutes). All four chambers run simultaneously — the moment of integration. Not a hardware synthesizer or software instrument. | AMF_ARCHITECTURE_V2.md §Sprint Structure | Any kind of sound synthesis. In AMF context, The Synthesizer = Section 5, integration exercise. |
| **di-chord** | A single perceived interval between two notes — the atomic unit of the Plogger perceptual system. Written with a bracket number: [3] = minor 3rd, [4] = major 3rd, [5] = perfect 4th, [7] = perfect 5th, etc. The same vocabulary applies at two levels: melodic intervals and harmonic root movements. | AMF_ARCHITECTURE_V2.md §Di-Chord Movements; Plogger Method | "Interval" (generic music theory). Di-chord is specifically Plogger's perceptual unit — heard, not just named. Also do not conflate with "dyad" (two notes played together). |
| **pulsation** | In the Plogger system, the beating interference phenomenon heard when two notes are played together. Classified as interference pulsation. Pulsation rate and character are key cues for ear training. | Plogger Method; asset_registry primary_topics | Generic pulse/beat in rhythm. Pulsation in AMF always refers to the Plogger acoustical phenomenon, not rhythmic pulse. |
| **fo_factor** | The F/O factor — a Plogger property of a di-chord describing the ratio relationship of its fundamental frequencies. Used to classify di-chords by their acoustical consonance/tension character. Stored as `fo_factor` in asset_registry primary_topics. | Plogger Method | "F chord" or anything Roman-numeral. fo_factor is a physics-derived property, not a harmonic function label. |
| **harmonicity** | A Plogger classification describing how fused or blended a di-chord sounds to the ear — its degree of perceptual unity. High harmonicity = notes blend into one sound. Low harmonicity = notes stay separate. | Plogger Method | Harmony (functional chord usage). Harmonicity is a perceptual acoustics term; harmony is a functional music theory term. |
| **lap map** | The physical practice method where the student maps keyboard positions onto their lap or a flat surface to practice silently anywhere — no instrument required. Introduced Sprint 3. Supports tetrachord formation and mode modulation. | AMF_ARCHITECTURE_V2.md §Spiral Threads | A keyboard diagram or chart. Lap map is a physical technique, not a visual asset. In asset_registry, `lap_map` is a topic tag. |
| **tracking page** | A Plogger-specific page format that appears in the Plogger book — a structured reference chart that tracks di-chord recognition progress across the full system. Not a student progress tracker (see mastery gate). | Plogger Method; asset_registry primary_topics | A sprint log, habit tracker, or generic progress chart. The Tracking Page is a specific Plogger artifact. |
| **heptachord** | A seven-note scale segment. In AMF specifically, the conjunct heptachord is a Lap Map / keyboard visualization milestone — learning to form and navigate the full seven-note pattern in all positions. | AMF_ARCHITECTURE_V2.md §Spiral Threads | Heptatonic scale (generic). Heptachord in AMF always refers to the Lap Map construction target. |
| **melodic gesture** | A shaped melodic phrase with contour and intention — not just a sequence of notes. Melody Zone curriculum works toward expressive melodic gesture. In asset_registry, `melodic_gesture` is a primary topic. | AMF; Emotional Melody Map | Motif, lick, or riff. Melodic gesture emphasizes shape and expression, not pattern repetition. |
| **melody zone** | One of four zones (Zone 1–4) describing what melodic notes do in relation to the underlying harmony. Zone 1 = chord tones. Zone 2–4 add increasing melodic complexity. Zones are a spiral thread — they deepen over the full course. | AMF_ARCHITECTURE_V2.md §Spiral Threads | Scale degree or scale position. Melody zones describe melodic behavior, not note names. |
| **Tier 1** | Plogger Method assets — the foundational perceptual language layer. All tables and diagrams extracted from the Plogger book. In asset_registry: `tier = 'plogger'`. | PLOGGER_ASSET_INVENTORY_PLAN §5 | Tier 1 mastery stage (Stage 1/Discovering). Asset tier and mastery stage are separate systems. |
| **Tier 2** | External source assets — tables and diagrams from the four chamber source documents and the Beato Book. Cataloged as-is, no synthesis. In asset_registry: `tier = 'external'`. | PLOGGER_ASSET_INVENTORY_PLAN §5 | Second priority or secondary importance. Tier 2 is simply the external-source layer, not a quality rank. |
| **Tier 3** | AMF Original assets — synthesized, bridging, and new media assets created by AMF. In asset_registry: `tier = 'amf_original'`. | PLOGGER_ASSET_INVENTORY_PLAN §5 | Tertiary importance. Tier 3 is the creative output layer. |
| **asset_registry** | The central PostgreSQL table in the `amf_assets` database. One row per asset across all tiers and types. The single source of truth for all AMF teaching materials. | PLOGGER_ASSET_INVENTORY_PLAN §8.1 | A file directory, a manifest doc, or the PLOGGER_ASSET_MANIFEST.md. The registry is the DB table, not any markdown file. |
| **diagram_specs** | The PostgreSQL table in `amf_assets` that stores full Nano Banana JSON rendering specs for each diagram asset. The JSON is the canonical source; the PNG image is derived from it. | PLOGGER_ASSET_INVENTORY_PLAN §8.2 | The rendered PNG image. Diagram_specs = the JSON spec table, not the image file. |
| **synthesis_candidates** | Assets identified during Phase 6 (Semantic Indexing) as good targets for Tier 3 synthesis — a Tier 1/2 diagram that, when enriched with concepts from another source, would yield a high-value Tier 3 original. Stored as DB metadata, not as a separate table. | PLOGGER_ASSET_INVENTORY_PLAN §Phase 6 | Completed synthesized assets. Synthesis candidates are identified prospects, not finished work. |
| **Nano Banana** | The diagram rendering system used by AMF — Google AI Studio with Gemini 2.0 Flash, given a deterministic JSON spec to generate a visual image. Each spec in `diagram_specs` is a Nano Banana spec. | PLOGGER_ASSET_INVENTORY_PLAN §9 | A tool name, library, or framework. Nano Banana is AMF's name for the Gemini-2.0-Flash-as-diagram-renderer workflow. |
| **sprint** | The basic unit of curriculum progression. One sprint = one mastery gate (Gate A: harmonic root movement + Gate B: Plogger chapter group). Duration is variable — sprints are mastery-gated, not calendar-gated. Some sprints take 3 weeks; some take 6. | AMF_ARCHITECTURE_V2.md §Mastery Gates | A two-week iteration (Agile). AMF sprints have no fixed length. They end when mastery criteria are met. |
| **mastery gate** | The specific criteria that must be met before advancing to the next sprint. A skill is "at the gate" only when it meets all five mastery criteria (correct at tempo, on both instruments, in 3+ keys, by ear in real time, expressively). Not a checkpoint or quiz. | AMF_ARCHITECTURE_V2.md §Mastery Criteria | Assessment, test, or quiz. The mastery gate is a behavioral standard, not an exam. |
| **spiral thread** | A Tier 1 curriculum skill that begins at sprint 1 and deepens indefinitely — never fully complete, always advancing. Six active spiral threads: di-chord ear, keyboard visualization, Longy rhythms, melody zones, Rhythm Code groove, Lap Map. | AMF_ARCHITECTURE_V2.md §Tier 1 Spiral Threads | A lesson topic that gets revisited. Spiral threads are permanent, parallel, always-active curriculum strands, not topics cycled in and out. |

---

## The Four Chambers

The AMF curriculum organizes into four teaching chambers, each with its own source document(s) and vocabulary. All four run simultaneously in The Synthesizer (Section 5).

### Chamber 1 — Melody Chamber

- **Source document:** Emotional Melody Map (`docs/uploads/emotional_map_module1.pdf`, `docs/uploads/emotional_map_cheat_sheet_1_master.pdf`)
- **What it teaches:** How melody notes relate to underlying harmony — which notes create tension, which release it, how phrase shapes work, and how to construct an expressive melodic line with intention.
- **Key vocabulary it introduces:**
  - **Melody zones** (Zone 1–4) — levels of melodic relationship to harmony
  - **Melodic gesture** — shaped, expressive phrase with contour
  - **Tension/release** — the functional arc of melody
  - **Phrase shape / melody contour** — the visual/kinesthetic model of how a melodic line rises and falls
  - **Key note** — structurally significant note in a melodic phrase (see also `key_note` topic tag)
  - **Tiny Tension Arc** — a specific melodic structure taught in advanced melody zones
  - **Chord-change behaviors** — how melody navigates across harmonic transitions

### Chamber 2 — Harmony Chamber

- **Source documents:** Harmony OS (`docs/uploads/harmony_os_materials.zip`); Beato Book (harmony/voicings/ear training chapters only)
- **What it teaches:** How chords move — root movements, functional progressions, diatonic and non-diatonic motion, and the harmonic spine of songs. Directly unified with the Musical OS: harmonic root movements ARE di-chord movements heard at a higher level.
- **Key vocabulary it introduces:**
  - **Harmonic root movement** — the di-chord interval between two successive chord roots; the atomic learning unit of the Harmony Chamber
  - **12+2 progressions** — the 14 common diatonic progressions, now understood as combinations of owned root movements rather than memorized sequences
  - **Functional harmony** — chord function by scale degree (I, IV, V, vi, ii, etc.)
  - **Backdoor progression** — specific non-diatonic harmonic sequence (topic tag: `backdoor_progression`)
  - **Tonocentric** — relating to or organized around the tonic center (topic tag: `tonocentric`)
  - **Roman numerals** — scale-degree labels for chords (I, ii, IV, V7, etc.); standard notation for functional harmonic analysis
  - **ii-V-I** — a common jazz cadential formula. In AMF it is a drill vehicle, not the harmonic spine. See "What NOT to Say" section.

### Chamber 3 — Voicings Chamber

- **Source document:** Voicings OS (`docs/uploads/voicing_os_materials.zip`); Beato Book (voicings chapters)
- **What it teaches:** How to voice chords — which specific notes, in which register, in which distribution across the instrument. Covers inversions, drop voicings, shell voicings, spread voicings, voice leading.
- **Key vocabulary it introduces:**
  - **Root position / first inversion / second inversion / third inversion** — chord arrangement by bass note; corresponds to topic tags `root_position`, `first_inversion`, `second_inversion`, `third_inversion`
  - **Drop voicing** — a voicing technique where one or more upper voices are dropped an octave (topic tag: `drop_voicing`)
  - **Shell voicing** — a minimal voicing using only the root, third, and seventh (topic tag: `shell_voicing`)
  - **Spread voicing** — a voicing with wide intervallic distribution across registers (topic tag: `spread_voicing`)
  - **Voice leading** — the smooth horizontal movement of individual voices between chords (topic tag: `voice_leading`)
  - **Figured bass** — a notation system indicating intervals above the bass note; used in voicings analysis (topic tag: `figured_bass`)
  - **Seventh chord** — a four-note chord built with a seventh interval (topic tag: `seventh_chord`)
  - **Sus chord** — suspended chord; fourth or second replaces third (topic tag: `sus_chord`)
  - **Soprano** — the highest voice in a voicing context (topic tag: `soprano`)

### Chamber 4 — Rhythm Chamber

- **Source document:** Rhythm Code (`docs/uploads/TheRhythmCode2022-lvqkbv.pdf`)
- **What it teaches:** Rhythmic feel, groove construction, and the internalization of rhythmic patterns from their simplest forms through compound and syncopated rhythms to clave fluency.
- **Key vocabulary it introduces:**
  - **Rhythm Code** — the source system for rhythm education; also the topic tag `rhythm` in the registry
  - **Son Clave** — the foundational Afro-Cuban rhythmic pattern; a spiral thread endpoint for the groove strand
  - **Groove** — internalized rhythmic feel; not just accurate rhythm but felt, expressive time (topic tag: `groove`)
  - **8-position grid** — the Rhythm Code's visual model for rhythmic patterns; 8 positions per measure
  - **Stops / anticipations** — rhythmic devices in the Rhythm Code system
  - **Clave** — the foundational rhythmic organizing principle; can run in two orientations (topic tag: `clave`)
  - **Longy rhythms** — the classical rhythm syllable system (ta, ta-te, etc.) used as the notation/reading track within the Rhythm Chamber. A distinct spiral thread that runs in parallel with Rhythm Code.
  - **Subdivision** — metric subdivision of the beat; topic tag `subdivision`
  - **Beat** — the basic pulse unit (topic tag: `beat`)

---

## Asset Type Definitions

These are the exact values used in the `asset_type` column of `asset_registry`. Use them verbatim in SQL and agent instructions.

| `asset_type` value | What it is | Example |
|-------------------|-----------|---------|
| `table` | Structured data in row/column format. Stored as a real normalized SQL table in `amf_assets`. Each row is individually queryable. | Di-chord pulsation classification table; Interval properties table |
| `diagram` | Visual representation where spatial layout, shape, color, and symbol all carry meaning. Stored as a Nano Banana JSON spec in `diagram_specs`. The PNG image is derived from the JSON. | Di-Chord Pictograph; Keyboard landmark diagram; Plogger wave-shape diagram |
| `infographic` | Multi-panel visual designed for standalone use. May combine data from multiple tables and diagrams. Typically Tier 3. | Sprint-by-sprint harmonic movement reference; Four-chambers overview poster |
| `reference_card` | Compact single-page reference for quick lookup. Not a teaching artifact — no narrative, no exercises. | Di-chord bracket numbers quick reference; Rhythm Code patterns card |
| `worksheet` | Student-facing exercise, drill, or fill-in format. Intended for active use during practice. | Melody zone identification worksheet; Root movement ear-training drill sheet |
| `poster` | Large-format visual designed to be printed and displayed. Single concept treated at poster scale. | Full keyboard natural-notes landmark poster; Melody zones poster |
| `notation_example` | Musical notation excerpt illustrating a specific concept. Stored as a score image or LilyPond spec. | ii-V-I in all keys; Rhythmic syncopation example in 4/4 |
| `annotation_layer` | A JSON overlay that adds labels, color bands, or callouts to an existing diagram spec. Not a standalone image — must be merged with a base spec to render. | Sprint labels overlaid on the Di-Chord Pictograph; Melody zone color bands on keyboard diagram |

---

## Topic Tag Reference

The full list of `primary_topics` values in `asset_registry` as of 2026-06-12 (106 values). Each tag is a single string with underscores — no spaces, no camelCase. Use these exact strings in SQL queries and agent prompts.

| Tag | One-line definition |
|-----|-------------------|
| `acoustics` | Physical sound properties — frequency, overtones, wave behavior |
| `architecture` | AMF curriculum structural design — sprints, chambers, spiral threads |
| `assessment` | Mastery evaluation — criteria, stage labels, gate conditions |
| `aural` | Ear-based perception and recognition skills |
| `backdoor_progression` | A non-diatonic harmonic sequence using bVII7 before I |
| `beat` | The basic metric pulse unit |
| `beato` | Content sourced from or related to the Beato Book |
| `chambers` | The four AMF chambers (Melody/Harmony/Voicings/Rhythm) as a system |
| `chapters` | Plogger Method chapter organization and sequence |
| `chord_quality` | Major, minor, dominant, diminished, augmented — the quality classification of chords |
| `chord_roots` | The bass/root notes of chords; root movement between chords |
| `chord_sequences` | Ordered progressions of chords |
| `circle_of_fifths` | The cyclic arrangement of keys/roots by perfect fifth intervals |
| `classical` | Classical music theory conventions (voice leading, figured bass, cadence types) |
| `clave` | The foundational Afro-Cuban rhythmic organizing pattern |
| `clef` | Musical staff clef signs (treble, bass, alto, tenor, etc.) |
| `complexity` | Relative difficulty or layering of a musical concept |
| `conjunct` | Step-wise melodic motion; also used for the conjunct heptachord lap map stage |
| `construction` | How something is built — chord construction, scale construction, voicing construction |
| `di_chord` | A single perceived interval in the Plogger system; the atomic unit of melodic and harmonic ear training |
| `diagram` | Assets that are visual diagrams (also an asset_type value — context determines which meaning) |
| `diatonic` | Within the key; using only the notes native to the current scale |
| `dim7_symmetry` | The symmetrical interval structure of diminished seventh chords |
| `distribution` | How notes are distributed across registers in a voicing |
| `drop_voicing` | Voicing technique: one or more upper voices dropped an octave |
| `ear_training` | Perceptual skill development — recognizing intervals, chords, movements by ear |
| `emotional_color` | The expressive/affective character of an interval, chord, or melodic choice |
| `exercises` | Practice drills and structured activities |
| `figured_bass` | Notation system indicating intervals above the bass note |
| `fingering` | Physical instrument fingering patterns |
| `first_inversion` | Chord voicing with the third in the bass |
| `fo_factor` | Plogger's F/O factor — the frequency ratio property of a di-chord |
| `functional_harmony` | Chord function by scale degree (I, IV, V, etc.) and how chords move |
| `gesture` | Shaped expressive movement in melody or rhythm |
| `groove` | Internalized rhythmic feel; expressive, felt time |
| `guitar` | Guitar-specific content or technique |
| `guitar_fretboard` | Fretboard layout, position, and navigation |
| `harmonicity` | Plogger perceptual property: degree to which a di-chord fuses into a single sound |
| `harmony` | Functional chord usage and harmonic motion |
| `heptachord` | Seven-note scale segment; specifically the conjunct heptachord lap map milestone |
| `ii_v_i` | The ii-V-I cadential formula; a drill vehicle in AMF, not the harmonic spine |
| `instruments` | Multi-instrument or general instrument content |
| `interference` | The acoustical beating phenomenon between two sounding notes; see pulsation |
| `intervals` | Measured distance between two pitches |
| `inversion` | Chord voicing by bass note: root/first/second/third inversion |
| `inversions` | Same as inversion; plural form used in some assets |
| `key_note` | A structurally significant note in a melodic phrase (Emotional Melody Map concept) |
| `keyboard` | Piano/keyboard layout, visualization, and technique |
| `lap_map` | Physical silent-practice method mapping keyboard positions onto the lap |
| `longy` | The Longy classical rhythm syllable system (ta, ta-te, etc.) |
| `major` | Major quality chords, scales, or intervals |
| `mastery` | The AMF mastery-gating system and its criteria |
| `melodic_gesture` | A shaped, expressive melodic phrase with contour and intention |
| `melody` | Melodic line construction and behavior |
| `melody_contour` | The rising/falling shape profile of a melodic phrase |
| `melody_zone` | One of four zones describing melodic note behavior relative to harmony |
| `middle_c` | The note C4; keyboard orientation landmark |
| `mode` | Modal scales (Dorian, Mixolydian, etc.) and modal harmony |
| `modes` | Plural form; used for assets covering multiple modes |
| `modulation` | Moving from one key or tonal center to another |
| `non_diatonic` | Outside the key; chromatic or borrowed harmonic content |
| `notation` | Musical notation systems, symbols, and conventions |
| `notation_example` | A musical score excerpt illustrating a concept (also an asset_type value) |
| `overtone` | A partial above the fundamental frequency |
| `overtone_series` | The natural harmonic series; basis of Plogger's perceptual acoustics |
| `perception` | Ear-based perceptual recognition and classification |
| `phrase_shape` | The arc and contour of a complete musical phrase |
| `piano` | Piano-specific content or technique |
| `pictograph` | The Plogger Di-Chord Pictograph — the visual glyph system representing di-chords |
| `practice_sections` | The five daily practice sections (Plogger Foundation / Integrated / Song / Jam / Synthesizer) |
| `profiles` | User or student profile data |
| `progress` | Student advancement and tracking data |
| `progression` | A chord sequence; harmonic motion over time |
| `progressions` | Plural form; used for assets covering multiple progressions |
| `properties` | Measurable attributes of intervals or chords (fo_factor, harmonicity, etc.) |
| `pulsation` | The Plogger interference pulsation phenomenon — beating between two sounding notes |
| `repertoire` | Songs and pieces used as anchor songs or examples |
| `rhythm` | Rhythmic patterns, notation, and feel |
| `roman_numerals` | Scale-degree chord labels (I, ii, iii, IV, V, vi, viio) |
| `root_position` | Chord voicing with the root in the bass |
| `scale_degrees` | Numbered positions within a scale (1–7) |
| `second_inversion` | Chord voicing with the fifth in the bass |
| `seventh_chord` | Four-note chord with a seventh interval above the root |
| `shell_voicing` | Minimal voicing: root, third, and seventh only |
| `shifts` | Physical position shifts on an instrument |
| `songs` | Specific songs used in the curriculum |
| `soprano` | The highest voice in a multi-voice voicing |
| `spread_voicing` | Wide-register voicing with notes distributed across octaves |
| `sprints` | AMF sprint structure and sequencing |
| `subdivision` | Metric subdivision of the beat |
| `sus_chord` | Suspended chord — fourth or second replaces the third |
| `syllables` | Rhythm syllables (Longy: ta, ta-te) or solfege |
| `tension_release` | The functional arc from harmonic/melodic tension to resolution |
| `tetrachord` | A four-note scale segment; a lap map construction step |
| `third_inversion` | Chord voicing with the seventh in the bass |
| `tonocentric` | Organized around or relating to the tonic center |
| `tracking_page` | The Plogger Tracking Page — a structured progress reference chart in the Plogger book |
| `transposition` | Moving a pattern to a different key or starting pitch |
| `tri_chord` | A three-note chord or three-note interval construct |
| `triad` | A three-note chord built in thirds |
| `tritone_substitution` | A harmonic substitution using the chord whose root is a tritone away |
| `user_profile` | Student profile and configuration data |
| `voice_leading` | The smooth horizontal movement of individual chord voices between chords |
| `voicings` | Chord voicing — specific note selection and register arrangement |
| `white_keys` | The natural (non-chromatic) notes of the keyboard |
| `zones` | Plural form of melody zones; used for assets covering the full zone system |

---

## What NOT to Say

Common confusions that cause semantic drift across agent sessions. Each entry states what to say instead.

| Wrong | Right | Why |
|-------|-------|-----|
| "Ploger" (one g) | **Plogger** (two g's) | Misspelling of the source author and system name. Every agent must spell it correctly. |
| "Quinn" | **Qwen** (the LLM) or **Quinn** (QCR mascot — not used in AMF) | In AMF context, neither applies. Do not import QCR character names. |
| "ii-V-I is the harmonic spine" | **ii-V-I is a drill vehicle.** The 14 harmonic root movements are the spine. | This is Design Principle #1 in AMF_ARCHITECTURE_V2.md. Front-loading ii-V-I is the exact anti-pattern the architecture rejects. |
| "The sprint is 2 weeks / 4 weeks" | **Sprints have no fixed duration.** They end when mastery criteria are met. | AMF sprints are mastery-gated, not calendar-gated. Any fixed-duration framing is wrong. |
| "Tier 1 = most important" | **Tier 1 = Plogger source layer.** Tiers describe origin, not priority. | Tier numbering is a source model, not a quality or importance ranking. |
| "The Synthesizer (instrument)" | **The Synthesizer = Section 5 of daily practice** | In AMF, The Synthesizer is a curriculum section name, not a musical instrument. |
| "Musical OS = the app" | **Musical OS = the Plogger perceptual infrastructure** | The Musical OS is a metaphor for the ear-training vocabulary, not any software. |
| "asset_registry = the manifest doc" | **asset_registry = the PostgreSQL table in amf_assets** | The DB table and the markdown manifest file (PLOGGER_ASSET_MANIFEST.md) are separate things. The registry is the DB. |
| "diagram_specs = the PNG images" | **diagram_specs = the JSON spec table.** PNGs are derived outputs. | The JSON spec is the canonical source. The image is a render artifact. |
| "Nano Banana = a library/framework" | **Nano Banana = AMF's name for Gemini 2.0 Flash as diagram renderer** | It is a workflow name, not a software package. |
| "Plogger Method = AMF" | **Plogger Method is Tier 1 input.** AMF is the full system built on top of it. | Conflating them loses the architecture: AMF adds three other chambers, its own originals, and the mastery-gating logic. |
| "harmonic spine = I-IV-V-I" | **The harmonic spine = the 14 di-chord root movements.** I-IV-V-I is a proof exercise. | Same as the ii-V-I error. Progressions are emergent combinations, not the spine. |
| "Stage 3 = advanced" | **Stage 3 = Fluent = the gate.** It means always correct at tempo without conscious attention. | Stage 3 is not advanced achievement — it is the minimum ownership threshold. Stage 2 (sometimes correct) is explicitly not the gate. |
| "di-chord = dyad" | **di-chord = Plogger's perceptual interval unit.** A dyad is just two notes played together. | Di-chord carries the specific meaning of a perceived, named, trained interval in the Plogger system. |
| "pulsation = rhythmic pulse" | **Pulsation = Plogger interference pulsation** (acoustical beating between two notes) | In AMF, pulsation is an acoustics term, not a rhythm term. |
| "lap map = a chart or diagram" | **Lap map = a physical silent-practice technique** | It is a method for practicing away from the instrument, not a visual teaching asset. |
| "synthesis_candidates = completed assets" | **synthesis_candidates = identified prospects for Tier 3 synthesis** | The candidates are potential targets, not finished work. |
