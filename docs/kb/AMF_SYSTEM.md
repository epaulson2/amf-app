# AMF System — Complete Knowledge Document

**Status:** Canonical reference — June 12 2026
**Purpose:** Self-contained. A future AI agent reading ONLY this file must be able to understand the entire AMF system without opening any other file. Nothing here requires cross-referencing.
**Sources:** AMF_ARCHITECTURE_V2.md, docs/kb/VOCABULARY.md

---

## Table of Contents

1. [What AMF Is](#what-amf-is)
2. [The Musical OS — Plogger Method](#the-musical-os--plogger-method)
3. [The Four Chambers](#the-four-chambers)
4. [The Synthesizer](#the-synthesizer)
5. [Sprint Structure](#sprint-structure)
6. [Design Non-Negotiables](#design-non-negotiables)
7. [What NOT to Assume](#what-not-to-assume)

---

## What AMF Is

The Autonomous Music Framework (AMF) is a mastery-gated curriculum for learning music on two instruments simultaneously — piano and guitar. It is built for adult learners who have tried conventional music instruction and found it either too slow (grinding through theory exercises that never connect to real songs), too fragmented (separate lessons for theory, ear training, rhythm, and repertoire that never cohere), or too dependent on a teacher telling them what to do next.

The problem AMF solves is not a lack of content. There is infinite music content. The problem is that conventional instruction teaches components in isolation: scales here, chords there, ear training separately, rhythm separately, songs separately. Students accumulate disconnected skills that do not combine into musical fluency. They can play exercises but cannot improvise. They know the names of chords but cannot hear when a progression changes. They practice correctly but play mechanically.

AMF is built on one founding insight: **the same perceptual vocabulary that trains melodic ear training at the interval level also describes how chord roots move.** When a bass line walks from I to IV, the root just moved up a perfect fourth. That is a [5] di-chord — the same sound unit the student is already training in ear training. The Musical OS (the perceptual layer) and the Harmony Chamber (chord movement) are not separate systems. They are the same ear trained at different levels of magnification. This single insight collapses the artificial separation between theory work and ear work and becomes the architectural spine of the entire curriculum.

The north star of the system is captured in one phrase: **"the framework disappears."** A student who has internalized the AMF does not think about the framework when making music. They are not applying a system. The perceptual vocabulary has become their native musical language. They hear a chord change and feel the root movement before labeling it. They choose a melody note because it sounds right, not because a zone chart told them to. The entire multi-year curriculum aims at one outcome: a musician who plays music, not exercises.

AMF differs from conventional music instruction in four concrete ways:

1. **Mastery-gated, not time-gated.** There is no lesson schedule. You advance when you own a skill — when it meets all five mastery criteria, not when a week has passed. Some sprints take three weeks. Some take six. Both are correct behavior.

2. **All chambers from day one.** Melody, Harmony, Voicings, and Rhythm are never sequential stages. They run in parallel from Sprint 1. There is no "finish theory before you do ear training." Every practice session touches all four chambers.

3. **Perception before nomenclature.** You hear a di-chord before you name it. You feel a root movement before you label it with a Roman numeral. Naming follows perception, never precedes it.

4. **Progressions are emergent, not taught.** Common progressions like I-IV-V-I and I-V-vi-IV are not lesson units. They are proof exercises that emerge naturally when enough individual root movements are owned. The spine is the 14 di-chord root movements, not the progressions built from them.

---

## The Musical OS — Plogger Method

### What the Musical OS Is

The Musical OS is the perceptual infrastructure that every other AMF chamber builds on. It is not software. It is a metaphor for the ear-training vocabulary that becomes the student's native language for hearing music. The source is the Plogger Method — a structured system developed by the author Plogger (spelled with two g's — never "Ploger") that teaches intervals as perceived sounds rather than measured distances. The Plogger Method is Tier 1 in the AMF asset model: the foundational layer from which all other content extends.

The Plogger system is present in every practice session twice: isolated in Section 1 (dedicated Plogger chapter work, 10 minutes) and as the perceptual lens woven through Sections 2-4. It is never a prerequisite stage that gets completed and set aside. It is the operating system that the other chambers run on.

### The Di-Chord System

A **di-chord** is a single perceived interval between two notes. It is the atomic unit of the Plogger perceptual system. The key word is perceived: a di-chord is not just a measured interval (perfect fourth, major third) but a sound with a specific character that can be recognized by ear, named, and described by feel. The goal is to hear [5] as "that reaching, open sound" before knowing or caring that it is a perfect fourth. The name follows the perception.

Di-chords are written with bracket notation: [1] through [11]. The bracket number does not directly correspond to semitone count — it is Plogger's labeling system. Each di-chord has three defining properties:

**Three Sound Factors:**

1. **Pulsation** — The interference pulsation phenomenon that occurs when two notes sound together. When two frequencies are close in ratio, they produce an audible beating or flickering. Pulsation rate is measured in approximate cycles per second (Hz) and is the student's primary tactile cue for identifying di-chords. Fast, restless pulsation signals tension. Slow, almost-imperceptible pulsation signals stability. The three pulsation classes are: **8 Hz** (fast, energetic, active), **4 Hz** (medium, warm, moderate tension), **2 Hz** (slow, stable, nearly consonant), and **0 Hz** (no pulsation — the perfect octave and unison).

2. **F/O Factor** (fo_factor) — The ratio relationship of the two frequencies that form the di-chord. Derived from the overtone series. A lower F/O factor (simpler frequency ratio) means the two notes share more overtones and fuse more readily. A higher F/O factor means more complex ratio and more perceptual independence between the two notes. The fo_factor is a physics-derived property that explains WHY some di-chords feel open and others feel tense — it is not a harmonic function label.

3. **Harmonicity** — How fused or blended the di-chord sounds to the ear. High harmonicity means the two notes merge into a single perceived sound. Low harmonicity means they stay auditorily separate and distinct. Harmonicity is the perceptual result of the fo_factor: simple frequency ratios produce high harmonicity. This property maps onto what musicians informally call "consonance" and "dissonance," but the Plogger framing is more precise: it describes the degree of perceptual unity, not a good/bad judgment.

### Perception-First Philosophy

The order of learning is non-negotiable: **hear, then sing, then name, then play.** Never the reverse. A student drills a di-chord by listening to it repeatedly, feeling its character, describing it in words, singing it, and only then identifying it by bracket notation. Bracket notation is a shorthand for a sound already known, not a starting definition. This is why the AMF di-chord vocabulary transfers immediately to harmonic root movements: the student who can feel [5] as "that reaching, open interval" already hears I-to-IV as a [5] movement without additional instruction.

### Di-Chord Quick Reference Table

| Bracket | Interval Name | Semitones | Pulsation | Harmonicity | Perceptual Feel |
|---------|---------------|-----------|-----------|-------------|-----------------|
| [1] | Minor 2nd | 1 | 8 Hz (fast) | Very low | Harsh, biting, maximum tension — notes clash audibly |
| [2] | Major 2nd | 2 | 8 Hz (fast) | Low | Buzzy, energetic, wants to move — the tension-builder step |
| [3] | Minor 3rd | 3 | 4 Hz (medium) | Medium | Warm but shadowed — the sound of minor quality, inward |
| [4] | Major 3rd | 4 | 4 Hz (medium) | Medium-high | Bright and warm — the sound of major quality, outward |
| [5] | Perfect 4th | 5 | 2 Hz (slow) | High | Open, reaching, suspended — neither settled nor tense |
| [6] | Tritone | 6 | 8 Hz (fast) | Very low | Maximum harmonic tension — the interval that must resolve |
| [7] | Perfect 5th | 7 | 2 Hz (slow) | High | Hollow, stable, the farthest stable reach from the root |
| [8] | Minor 6th | 8 | 4 Hz (medium) | Medium | Dark and tender — minor quality heard from below |
| [9] | Major 6th | 9 | 4 Hz (medium) | Medium-high | Bright and lifting — emotional openness, the vi→IV sound |
| [10] | Minor 7th | 10 | 4 Hz (medium) | Medium-low | Incomplete, longing — wants to resolve down to the octave |
| [11] | Major 7th | 11 | 8 Hz (fast) | Low | Bright tension — close to the octave but unresolved |

*Note: [12] is the perfect octave — high harmonicity, near-zero pulsation, the full resolution.*

### The Pictograph

The Plogger system includes the Di-Chord Pictograph — a visual glyph system where each di-chord has a distinct shape. These pictographs are visual anchors for the perceptual identities, not notation. They appear in the Plogger book and in AMF diagram assets. The Tracking Page is a Plogger-specific structured reference chart — not a generic progress tracker — that the student uses to log di-chord recognition progress across the full system.

---

## The Four Chambers

All four chambers run from Sprint 1. There is no sequence. The Synthesizer (Section 5) is where all four converge daily.

---

### Chamber 1 — Melody Chamber

**Source:** Emotional Melody Map (docs/uploads/emotional_map_module1.pdf, emotional_map_cheat_sheet_1_master.pdf)

**What it teaches:** How melody notes relate to underlying harmony — which notes create tension, which release it, how phrase shapes work, and how to construct an expressive melodic line with intention and emotional direction. The Melody Chamber is not about scales or patterns. It is about understanding why a specific note feels right or wrong at a specific moment in a specific chord.

**Core vocabulary:**

- **Melody Zones (Zone 1–4):** Four levels of melodic relationship to the underlying harmony. Zone 1 = chord tones only (the safest, most stable melodic choices — the notes that belong to the current chord). Zone 2 = passing and neighbor tones that move between chord tones. Zone 3 = scale tones that create tension against the harmony. Zone 4 = chromatic and non-diatonic tones that create the most color and tension. Zones are a spiral thread — all four are introduced early and deepened over the full course.
- **Melodic gesture:** A shaped, expressive phrase with contour and intention. Not a lick or a riff — a gesture has direction, a high point, and a landing place. The Melody Chamber works toward gesture, not patterns.
- **Tension/release:** The functional arc of melody. Every melodic choice either builds tension (moves toward instability) or releases it (moves toward rest). Understanding this arc is the Melody Chamber's core skill.
- **Phrase shape / melody contour:** The visual/kinesthetic model of how a melodic line rises and falls. Students learn to see and feel the arc of a phrase, not just play the notes.
- **Key note:** A structurally significant note in a melodic phrase — the note that carries the phrase's weight or arrival point.
- **Tiny Tension Arc:** A specific melodic structure taught at advanced melody zone levels — a micro-phrase that builds and releases tension within a small number of notes.
- **Chord-change behaviors:** How melody navigates across harmonic transitions. What happens at the seam between two chords — whether to anticipate the new chord, hold through it, or step into it.

**Connection to di-chord perception:** Zone 1 chord tones are the most harmonically fused — they match the harmony's di-chord content. Moving into Zone 2 and beyond means introducing interval tension against the chord. The student who can hear [3] vs. [4] quality in melodic intervals already has the perceptual tool for understanding why Zone 3 notes sound "outside." The Plogger pulsation vocabulary translates directly: a melody note that creates a [1] or [2] with the chord root is a high-tension choice; a note that creates a [5] or [7] is stable.

**Stage 3 mastery criterion:** The student can improvise a four-bar melodic phrase over a given harmonic movement, in real time, using appropriate zone choices with conscious intention — stating after the phrase which zones they used and why. Melody choices are expressive (heard as musical, not academic), and the student can vary the phrase on repeat. This is not "sometimes correct" (Stage 2). It is always correct at musical tempo without conscious attention to the rules.

---

### Chamber 2 — Harmony Chamber

**Source:** Harmony OS (docs/uploads/harmony_os_materials.zip), Beato Book (harmony and ear training chapters)

**What it teaches:** How chords move — root movements, functional progressions, diatonic and non-diatonic motion, and the harmonic spine of songs. The Harmony Chamber is the direct application of the Musical OS at the chord level. Harmonic root movements ARE di-chord movements heard at a higher level of magnification. The same ear trained to hear [5] as a melodic interval is the ear that hears I→IV as a [5] root movement.

**Core vocabulary:**

- **Harmonic root movement:** The di-chord interval between two successive chord roots. This is the atomic learning unit of the Harmony Chamber — the smallest ownable harmonic unit. When the bass moves from I to IV, the root moved up a [5] (perfect fourth). This movement is the gate, not the progression it belongs to.
- **12+2 progressions:** The 14 common diatonic progressions used in most popular and jazz music. In AMF, these are not lesson units. They are proof exercises — ways of demonstrating that a student who owns enough individual root movements can assemble any diatonic progression by ear. The 12+2 are: I-IV-V-I, I-V-vi-IV, 12-Bar Blues, ii-V-I, I-vi-IV-V, vi-IV-I-V, I-IV-I-V, Modal Vamp, Circle of Fifths descent, i-IV-i-V (harmonic minor), Andalusian (i-bVII-bVI-V), minor ii-V-i, Classical cadence, Neapolitan/bII.
- **Functional harmony:** Chord function by scale degree — I (tonic, home), IV (subdominant, departure), V (dominant, tension), vi (relative minor, darkening), ii (pre-dominant), etc. Roman numeral labels are shorthand for heard functions, not the primary way of knowing.
- **Backdoor progression:** A specific non-diatonic harmonic sequence using bVII7 before I. A named exception to purely diatonic motion.
- **Tonocentric:** Organized around or relating to the tonic center. A tonocentric analysis asks how each chord relates to home, rather than labeling it by scale degree alone.
- **ii-V-I:** The most common jazz cadential formula. In AMF, this is a drill vehicle — useful practice for voice leading and chromatic motion — but it is explicitly not the harmonic spine of the curriculum. Treating ii-V-I as the center of harmonic learning is the single most common anti-pattern this system rejects. (See "What NOT to Assume" section.)

**Connection to di-chord perception:** The Harmony Chamber and the Musical OS are the same system at two levels. The root movement [5] (I→IV) is felt before it is labeled. Students drill root movements by ear — singing the bass movement, feeling the pulsation change, identifying the di-chord — before naming the Roman numerals. The result is that harmonic analysis becomes a description of heard experience, not an abstract labeling exercise.

**Stage 3 mastery criterion:** The student can identify a given harmonic root movement by ear in a real song in real time, without preparation — hearing the di-chord of the bass movement as it happens. On both instruments, the student can play that movement in at least three keys at musical tempo without hesitation and can use it expressively in a 4-bar improvised bass or chord progression.

---

### Chamber 3 — Voicings Chamber

**Source:** Voicings OS (docs/uploads/voicing_os_materials.zip), Beato Book (voicings chapters)

**What it teaches:** How to voice chords — which specific notes, in which register, in which distribution across the instrument. The Voicings Chamber is where harmonic knowledge becomes physical knowledge: knowing that I-to-IV is a [5] root movement is incomplete until you can voice that IV chord in multiple inversions, with multiple voicing densities, across the keyboard and fretboard.

**Core vocabulary:**

- **Root position / first inversion / second inversion / third inversion:** Chord arrangement by which note appears in the bass. Root position = root in bass. First inversion = third in bass. Second inversion = fifth in bass. Third inversion = seventh in bass (for seventh chords). Inversion choice affects harmonic weight and voice leading smoothness.
- **Drop voicing:** A voicing technique where one or more upper voices are dropped an octave, creating a wider intervallic spread. Drop 2 and Drop 3 voicings are primary examples.
- **Shell voicing:** A minimal voicing using only the root, third, and seventh — the three notes that define chord quality and function while leaving register space open. Especially useful in jazz and two-instrument contexts.
- **Spread voicing:** A voicing where notes are distributed widely across registers, creating an open, spacious sound rather than a close-position cluster.
- **Voice leading:** The smooth horizontal movement of individual voices between consecutive chords. Good voice leading minimizes each voice's movement — each note in one chord moves to the nearest available note in the next chord. Voice leading is the craft that makes chord progressions flow rather than lurch.
- **Figured bass:** A notation system indicating intervals above the bass note. Used in voicings analysis to describe inversion structure numerically.
- **Seventh chord:** A four-note chord built with a seventh interval above the root — dominant seventh, major seventh, minor seventh, half-diminished, fully-diminished. The seventh is the note that gives the chord its functional tension.
- **Sus chord:** A suspended chord where the fourth or second replaces the third. Sus chords have no major/minor quality — they are tonally ambiguous and often used as approach chords or coloristic devices.
- **Soprano:** The highest voice in a multi-voice voicing. In piano voicings, the soprano note carries melody and color; soprano choice is often the most musically expressive voicing decision.

**Connection to di-chord perception:** Every voicing is a stack of di-chords. A close-position major triad from bottom to top is [4] (major third) + [3] (minor third). A dominant seventh chord adds [3] (minor third) above the fifth. The student who can hear the di-chord quality of each interval in a voicing has immediate access to why that voicing sounds the way it does — why drop voicings feel more open (the [7] replaces a [4] in the lower register), why shell voicings feel sparse (the fifth is removed, leaving primarily the [4]/[3] quality interval and the seventh).

**Stage 3 mastery criterion:** The student can voice any diatonic seventh chord in root position and all inversions, in at least three voicing types (shell, drop 2, spread), on both instruments, in at least three keys, at musical tempo without hesitation. Voice leading between two consecutive chords is smooth — no voice moves more than a step when a half-step or whole-step option exists.

---

### Chamber 4 — Rhythm Chamber

**Source:** Rhythm Code (docs/uploads/TheRhythmCode2022-lvqkbv.pdf)

**What it teaches:** Rhythmic feel, groove construction, and the internalization of rhythmic patterns from the simplest building blocks through compound and syncopated rhythms to clave fluency. The Rhythm Chamber has two parallel tracks running simultaneously: Longy rhythms (the classical notation/syllable system, a spiral thread) and Rhythm Code groove (the Afro-Cuban feel-based system, another spiral thread).

**Core vocabulary:**

- **Rhythm Code:** The source system for rhythm education in the AMF. Based on an 8-position grid model for visualizing and feeling rhythmic patterns. The Rhythm Code's goal is internalized groove — rhythm that is felt and expressive, not just accurate.
- **8-position grid:** The Rhythm Code's visual model for rhythmic patterns. Each measure is divided into 8 positions. Patterns are described by which positions are active (struck) versus empty (rested). The grid is a physical-visual way of seeing rhythm before reading notation.
- **Stops / anticipations:** Two primary Rhythm Code devices. A "stop" is a rest on a beat position that would normally be struck — creating space and tension. An "anticipation" is a note struck slightly before its expected position — a syncopation that leans into the next beat. Both are heard and felt before being notated.
- **Son Clave:** The foundational Afro-Cuban rhythmic pattern that organizes much of Latin and funk groove. The endpoint of the Rhythm Code spiral thread. Son Clave can run in two orientations (3-2 and 2-3). Clave fluency means the student can feel both orientations and improvise rhythmic patterns that stay "in clave."
- **Groove:** Internalized rhythmic feel. Not just accurate rhythm — groove means the rhythm is felt, embodied, and expressive. A student can play the right notes on the right beats without groove; groove means the time feels alive. The Rhythm Chamber works specifically toward groove, not just accuracy.
- **Longy rhythms:** The classical rhythm syllable system (ta = quarter note, ta-te = two eighth notes, etc.) used as the notation and reading track within the Rhythm Chamber. Longy is a parallel spiral thread that trains rhythmic reading and notation independently of the feel-based Rhythm Code work. Both threads run simultaneously from Sprint 1.
- **Subdivision:** Metric subdivision of the beat — dividing each beat into smaller equal parts (duple, triple). Subdivision awareness is the foundation under both Longy and Rhythm Code work.
- **Clave:** The foundational rhythmic organizing principle — a two-bar pattern that establishes which positions in the groove are structurally important. Clave can run in two orientations. Clave fluency means grooves stay locked to the clave pattern even during improvisation.

**Connection to di-chord perception:** The Rhythm Chamber is the most independent of the four chambers — rhythm perception and harmonic/melodic perception are different cognitive systems. However, the AMF connects them through integrated exercises in Section 2: root movement drills always happen over a groove grid, and melody zone work always happens with a live rhythmic feel. The "Hear / Sing Before You Play" protocol applies to rhythm as well — students sing rhythmic patterns with Longy syllables before playing them.

**Stage 3 mastery criterion:** The student can maintain a Son Clave-compatible groove on both instruments for a minimum of 8 bars without stopping or drifting, demonstrate both clave orientations on demand, and improvise rhythmic variations (using stops and anticipations) that stay locked to the underlying subdivision. Longy reading of quarter, eighth, and sixteenth note patterns is fluent — no counting out loud, correct at musical tempo.

---

## The Synthesizer

### What It Is

The Synthesizer is Section 5 of every daily practice session. It is 8 minutes long. It is the moment of integration where all four chambers run simultaneously. The name is a metaphor — The Synthesizer synthesizes. It is not a hardware synthesizer, not a software instrument, not a sound-generating device.

### What Happens in Section 5

For 8 minutes, the student performs a single exercise that requires:

- **Melody Chamber:** A melodic improvisation using conscious zone choices
- **Harmony Chamber:** A harmonic progression built from owned root movements
- **Voicings Chamber:** Those root movements voiced with appropriate chord types and voice leading
- **Rhythm Chamber:** All of the above played with an internalized groove feel — not metronomically correct but felt and alive

The exercise is not free improvisation. It is structured: a specific root movement (the sprint's gate movement), a specific groove feel (the Rhythm Code pattern from the current sprint), a specific melodic zone constraint (usually Zone 1 expanding into Zone 2), and a specific voicing type (whatever voicing is current in the Voicings thread). All four constraints active simultaneously.

### The Design Philosophy

The 8-minute time limit is not arbitrary. It is exactly long enough to produce real musical output — a complete thought, not just a warm-up — and short enough to prevent free improvisation from drifting into unfocused noodling. The constraint is generous enough to feel musical and tight enough to force integration.

The Synthesizer is deliberately placed last in the session (Section 5), not first. The student arrives at it having already drilled each component in isolation and combination (Sections 1-4). The Synthesizer does not teach anything new. It asks: given what you worked on today, can you make music?

### What Makes Something Worthy of the Synthesizer

A skill is eligible to appear in the Synthesizer exercise only when it has reached Stage 2 or better in every chamber it touches. Putting a Stage 1 skill into the Synthesizer creates an exercise that is too difficult to integrate — the student is managing error correction while trying to synthesize, which prevents either goal. This is why the Synthesizer's content tracks the slowest-advancing chamber, not the fastest.

The Synthesizer is also where the north star ("the framework disappears") becomes experiential. Students who first enter Section 5 are consciously applying four systems at once. Over time, the systems collapse into a single musical act. That collapse is the point of the entire curriculum.

---

## Sprint Structure

### What a Sprint Is

A sprint is the basic unit of curriculum progression in the AMF. One sprint contains:
- One active **Gate A** — a harmonic root movement (one di-chord movement to own on both instruments, in 3+ keys, at tempo)
- One active **Gate B** — a Plogger chapter group (one section of the di-chord system to complete, including all five mastery criteria for that material)
- All six spiral threads advancing by one step
- One anchor song used as proof and recognition vehicle across all five practice sections
- Two deliverable products: a mini-textbook (written reference for what was owned this sprint) and a practice plan (daily section structure for the sprint's material)

Sprints have no fixed calendar length. They end when both gates are cleared — when the student meets all five mastery criteria for both Gate A and Gate B. Some sprints take three weeks. Some take six. This is not slow — this is correct behavior. A skill "owned" at Stage 2 is not owned. Stage 2 is the waiting room. Stage 3 is the gate.

### The Five Mastery Criteria

A skill is owned at Stage 3 when — and only when — it meets all five:

1. Correct without hesitation at musical tempo (not "slowly and carefully")
2. Demonstrated on both instruments
3. Demonstrated in at least three keys — not just the anchor song key
4. Can be identified by ear in a real song in real time, without preparation
5. Can be used expressively — not just reproduced academically

**Stage labels:**
- **Stage 1 (Discovering):** First contact. Errors expected and correct. Do not stop at errors. Errors are the curriculum at Stage 1.
- **Stage 2 (Consolidating):** Sometimes correct. Slow, deliberate repetition. The student understands the skill conceptually but has not yet owned it physically and perceptually.
- **Stage 3 (Fluent):** Always correct, at tempo, without conscious attention. This is not "advanced" — it is the minimum ownership threshold. Stage 2 is not the gate. Stage 3 is the gate.

### The Two Gate Types in Parallel

Gate A (harmonic root movement) and Gate B (Plogger chapter group) advance independently. A student can clear Gate A in week 3 while Gate B is still at Stage 2. The sprint does not advance until both gates clear. If Gate A is clear and Gate B is not, the student keeps working the Plogger material while maintaining Gate A skills through Section 1 and integrated work. If Gate B is clear and Gate A is not, the reverse.

### Daily Practice Structure (Five Sections)

| Section | Time | Purpose |
|---------|------|---------|
| 1 — Plogger Foundation | 10 min | Dedicated, isolated Plogger chapter work — the current Gate B material, drilled separately |
| 2 — Integrated Work | 18 min | 2-3 multi-layered exercises combining all active spiral threads; centered on the sprint's target root movement |
| 3 — Song Learning / Practice | 14 min | Anchor song as recognition and proof — finding the sprint's target movement in the song, playing along at the moments it occurs |
| 4 — Jamming / Free Play | 10 min | Structured improvisation using only owned materials — no Stage 1 content, no approximations |
| 5 — The Synthesizer | 8 min | All four chambers simultaneously — the integration section |

Total: 60 minutes per session.

### Anchor Song Role

Songs are proof and recognition vehicles, not primary learning material. The anchor song is not "learned" in the conventional sense — it is a context in which the sprint's target root movement appears prominently and repeatedly. The student's job in Section 3 is not to master the full song but to find the [X] movement, hear it in at least three places, and play along while feeling when it happens. Other harmonic movements in the song are heard as "not yet" material — they will return to those songs in future sprints and hear new things.

Song selection criteria: (1) Must prominently feature the sprint's target movement. (2) Must be worth spending a month with musically. (3) Must be playable on both instruments at a simplified level. (4) No country.

### Sprint 1–12 Map

| Sprint | Gate A: Root Movement | Interval | Example Progression | Gate B: Plogger Chapters | Anchor Song | Key New Concept |
|--------|----------------------|----------|---------------------|--------------------------|-------------|-----------------|
| 1 | Intro — no gate | — | Ain't No Sunshine chord set | Chapters 1-2: Introduction to di-chords, [3] and [4] | Ain't No Sunshine | Di-chord perception begins; Zone 1 melody; Longy ta/ta-te; keyboard landmarks |
| 2 | [5] P4 up (I→IV, V→I) | Perfect 4th | I→IV→V→I | Chapters 3-4: [5] and [7] — the stable di-chords | Stand By Me | First owned root movement; ii-V-I introduced as drill only |
| 3 | [7] P5 up (I→V) | Perfect 5th | I→V→I vamp | Chapters 5-6: [2] and [9] | TBD | Dominant motion; the farthest stable reach; Lap Map begins |
| 4 | [2] M2 up (IV→V) | Major 2nd | 12-Bar Blues (IV→V is the turn) | Chapters 7-8: [4] and [8] quality | 12-Bar Blues vehicle | Tension-builder step; blues form as proof exercise; I-IV-V-I assemblable |
| 5 | [3] m3 down (I→vi) | Minor 3rd | I→vi→IV→V | Chapters 9-10: [3] revisited — harmonic context | TBD | The darkening shift; relative minor; I-V-vi-IV now assemblable |
| 6 | [9] M6 up (vi→IV) | Major 6th | vi→IV→I→V | Chapters 11-12: [1] and [6] tension di-chords | TBD | Emotional lift after minor; inverse of [3]; full 1-6-4-5 assemblable |
| 7 | [4] M3 up (I→iii) | Major 3rd | I→iii→IV→V | Chapters 13-14: Harmonicity spectrum complete | TBD | Mediant motion; bittersweet quality; neither fully major nor minor |
| 8 | [6] Tritone (V7→I) | Tritone | ii→V7→I resolution | Chapters 15-16: Full di-chord system; Tracking Page | TBD | Maximum tension → resolution; full explanation of dominant function; Neapolitan accessible |
| 9 | [2] down (V→IV, backdoor) | Major 2nd down | I→bVII→IV→I | Review/integration: Full pictograph fluency | TBD | Non-diatonic motion; backdoor progression; chromatic root movements introduced |
| 10 | [5] in minor keys | Perfect 4th | i→iv→V→i | Harmonic minor system | TBD | Minor key application of owned movements; harmonic minor vs. natural minor |
| 11 | Circle of fifths — sustained [5] | P4 up sequence | I→IV→bVII→bIII→... | Extended cycle chapters | TBD | Full circle navigation; all [5] movements chained; modulation as [5] sequence |
| 12 | Integration review — all 7+ movements | Multiple | Student-chosen song analysis | Full review + Tracking Page complete | Student-chosen | Proof exercise: dissect a real song's harmonic structure from owned root movements alone |

*Note: Sprints 9-12 are provisional — the architecture document has finalized only Sprints 1-8 in detail. Songs marked TBD have not been identified yet. The selection criteria are established; the specific songs are not.*

---

## Design Non-Negotiables

These eight principles do not change regardless of how the curriculum is restructured. They are architectural invariants. Violating any one of them produces a system that is no longer the AMF.

### 1. ii-V-I is a drill vehicle, not the harmonic spine.

The harmonic spine of the AMF is the 14 di-chord root movement set. ii-V-I is one combination of two [5] movements (ii→V and V→I) and is an excellent drill for voice leading and chromatic motion. It is taught in every sprint as a warmup vehicle. It is never taught as the center of harmonic knowledge.

Why this matters: conventional jazz and theory instruction organizes almost all harmonic learning around ii-V-I. The result is students who can navigate ii-V-I in all 12 keys but cannot hear a plain I-IV-V-I in a pop song without cognitive strain. The AMF inverts this: simple diatonic root movements first, built from perception; complex cadential formulas later, as combinations of already-owned sounds. Starting with ii-V-I is the single most reliable way to teach theory without musicianship.

### 2. Plogger appears twice every session.

Section 1 (10 minutes) is dedicated, isolated Plogger chapter work — one chapter group, drilled by the full hear/sing/name/play protocol, nothing else. Sections 2-4 use Plogger perceptual vocabulary as the lens for all other work — root movements are named by di-chord bracket, melody choices are described by di-chord quality against the chord, voicings are analyzed by the di-chord intervals they stack.

Why this matters: Plogger is not a warm-up that gets set aside once the "real work" starts. The perceptual vocabulary built in Section 1 is the only language available for the rest of the session. Without dual presence, the Plogger system remains a separate skill instead of becoming the Musical OS.

### 3. Hear / Sing Before You Play in every exercise, every section, every sprint.

For every new sound, the protocol is: (1) hear it played by an outside source, (2) describe it in sensory/feeling words, (3) sing it, (4) sing it again without the reference, (5) play it. Naming with bracket notation or Roman numerals comes after steps 1-4. Never before.

Why this matters: the fastest way to make music intellectual rather than musical is to name things before hearing them. A student who learns "perfect fourth = 5 semitones = P4" has learned a fact. A student who learns "[5] = that open, reaching sound that wants to lift" has learned a perception. Perceptions transfer to new contexts automatically; facts require conscious retrieval.

### 4. Few exercises, multi-layered — not many exercises, single-purpose.

Each section runs 2-3 exercises maximum. Each exercise serves 3-4 purposes simultaneously. A single integrated exercise might train di-chord recognition, root movement fluency, melody zone choices, and groove feel all at once. This is not efficiency hacking — it is how music actually works. Isolated drills produce isolated skills. Integrated exercises produce integrated musicianship.

Why this matters: single-purpose exercises train students to answer exam questions. Multi-layered exercises train students to make music. The difference is whether skills transfer when context changes. Integrated exercises force the same transfer that live music requires.

### 5. The anchor song threads every section — it is not a separate activity.

The anchor song is not limited to Section 3. It appears in Section 1 (find the di-chord the Plogger chapter describes in the song), Section 2 (integrated exercises use the song's progression), Section 3 (direct song work), Section 4 (improvise over the song's changes), and Section 5 (synthesize over the song's core movement). The song is the thread that unifies the session.

Why this matters: songs are how people hear music as music rather than exercises. Without the song running through every section, the session becomes a collection of drills that happen to share a time slot. The anchor song converts the session into a single coherent musical investigation.

### 6. "The framework disappears" is the north star.

Every decision about exercises, pacing, vocabulary, and structure is evaluated against one question: does this move the student toward a state where the framework is invisible? Does it build perception that operates automatically, or does it build dependency on the framework's explicit guidance?

Why this matters: a student who still needs the framework after three years has not learned music — they have learned the framework. The AMF is not the destination. It is the vehicle. Every design decision that makes the system memorable or central is a mistake. Every decision that makes perception more automatic and musical thinking more fluent is correct.

### 7. Mastery over pace — the sprint calendar is a guide, not a contract.

No sprint has a required duration. No deadline exists. Advancing to the next sprint because three weeks have passed — while the current gate skill is at Stage 2 — is the most reliable way to build a tower on sand. Stage 2 skills do not compound. They erode. Only Stage 3 skills can be built on.

Why this matters: calendar-gated instruction exists to accommodate institutional scheduling, not learning. The AMF has no institution to accommodate. The cost of advancing before mastery is paid compound interest over every subsequent sprint that builds on the undermined foundation. The cost of staying an extra week at Stage 3 is nothing.

### 8. No country in repertoire or examples.

No country music as anchor songs, no country music as example progressions, no country music in any instructional context. This is a hard design constraint, not a genre preference statement.

Why this matters: this constraint is not documented with an explanation in the source materials. It is stated as non-negotiable. Agents should treat it as such — do not use country music examples, do not suggest country songs for anchor song slots, do not reference country music conventions in harmonic analysis.

---

## What NOT to Assume

This section exists because certain errors appear repeatedly when AI agents work with the AMF system. Each entry names the false assumption, states the correct framing, and explains why the error is easy to make.

---

**FALSE: AMF is a sequential curriculum — finish Module 1 before starting Module 2.**

**TRUE: All four chambers run from day one, in every session.**

Melody, Harmony, Voicings, and Rhythm are not sequential stages. There is no "complete the harmony unit, then start voicings." The Synthesizer (Section 5) requires all four chambers to be active from Sprint 1. A student in Sprint 1 is working melody zones, root movements, voicing types, and groove simultaneously. They are doing simpler work in each chamber than a Sprint 8 student, but they are doing all four chambers. If you design a lesson plan that says "in the first month, do only Plogger and Harmony," you have made the most fundamental architectural error possible.

---

**FALSE: ii-V-I is the harmonic spine of the AMF.**

**TRUE: The 14 di-chord root movements are the harmonic spine. ii-V-I is a drill vehicle.**

ii-V-I is introduced early (Sprint 2) and drilled every sprint as a warm-up. It is never the organizing principle of harmonic learning. The 14 progressions in the "12+2" set are proof exercises — ways of showing that enough root movements have been owned to assemble them. They are not lesson content. If you find yourself building curriculum around "learning ii-V-I in all 12 keys" as a primary goal, you have inverted the architecture. The primary goal is owning [5], then [7], then [2], then [3], etc. ii-V-I in all 12 keys will follow naturally, without needing to be taught.

---

**FALSE: The Plogger Method is a prerequisite stage that gets completed before the AMF starts.**

**TRUE: The Plogger Method IS the perceptual language for everything else. It runs the entire time.**

Plogger is never finished. There is no point at which the student has "completed Plogger" and can now move to "the AMF." Plogger appears in every session from Sprint 1 through Sprint 12 and beyond — in Section 1 as isolated chapter work and throughout Sections 2-4 as the vocabulary for all other work. The Musical OS is built incrementally over the full course. Agents should never suggest sequencing Plogger as Stage 1 and the chambers as Stage 2. They are always simultaneous.

---

**FALSE: Stage 3 means "advanced" or "excellent." Stage 2 is good enough to move forward.**

**TRUE: Stage 3 = Fluent = the minimum ownership threshold. Stage 2 is not the gate.**

Stage 3 mastery — always correct, at tempo, without conscious attention — is not an achievement level. It is the definition of "owned." A skill at Stage 2 (sometimes correct, requires concentration) has not been learned yet. It is being consolidated. Advancing a student to the next sprint because their gate skill is "pretty good" or "mostly there" is the single most common mistake in mastery-gated systems. The stage labels in the AMF are behavioral standards, not quality grades. Stage 2 is the waiting room. The gate is Stage 3.

---

**FALSE: Sprint duration is 2 weeks (or 4 weeks, or 1 month).**

**TRUE: Sprint duration is undefined. Sprints end when both gates are cleared.**

The AMF replaced calendar-gated progression with mastery-gated progression as its primary architectural decision. Any fixed-duration framing — "this sprint takes one month" — is a reversion to the system the AMF was designed to replace. If a student clears Gate A in week 2 but Gate B takes until week 7, the sprint ends in week 7. That is not slow. That is the system working. Do not attach time estimates to sprint completion. The time estimate is: "when both gates reach Stage 3 by all five criteria."

---

**FALSE: The Synthesizer is a sound synthesis tool, synthesizer instrument, or audio production feature.**

**TRUE: The Synthesizer = Section 5 of each daily practice session. It is an 8-minute integration exercise.**

The name is a curriculum metaphor. In every context where "The Synthesizer" appears in AMF documentation, it refers to the final 8-minute section of the daily practice structure where all four chambers converge. It is not connected to synthesizer instruments, sound design, or audio production in any way.

---

**FALSE: AMF is about learning songs (chord charts, tabs, lead sheets).**

**TRUE: AMF is about building perception. Songs are proof vehicles, not lesson content.**

The anchor song for a sprint is not learned in the conventional sense — the student is not trying to play the song perfectly from beginning to end. They are hunting for the sprint's target root movement within the song, finding it in multiple places, and playing along at the moments it occurs. The rest of the song's harmonic content is heard as "not yet" material. Songs are never the lesson — they are the place where the lesson is tested against reality.

---

**FALSE: Plogger pulsation = rhythmic pulse or beat.**

**TRUE: Pulsation = the Plogger interference pulsation — the acoustical beating between two simultaneously sounding notes.**

When two notes close in frequency sound together, they produce an audible beating or flickering — the interference pulsation phenomenon. This is the physical basis of the di-chord classification system. It is an acoustics concept, not a rhythm concept. In AMF context, when you see "pulsation" or "8 Hz / 4 Hz / 2 Hz," it always refers to this acoustical phenomenon, never to rhythmic pulse, tempo, or beat.

---

**FALSE: The 12+2 progressions are the AMF's harmonic syllabus — teach them as units.**

**TRUE: The 12+2 progressions are emergent proof exercises, not lesson content.**

By Sprint 8, a student who has genuinely owned the 7+ harmonic root movements from the gate sequence can assemble any diatonic progression by ear without being taught the progression. I-IV-V-I is three owned movements ([5] + [2] + [5]). I-V-vi-IV is three owned movements ([7] + [3] + [9]). The progression emerges from the owned atoms. If you design exercises that say "this week we're learning I-V-vi-IV," you are teaching the progression as a unit instead of as a combination of sounds the student already knows. That inverts the AMF's foundational logic.

---

*End of document.*

*File: /home/elderle/amf-app/docs/kb/AMF_SYSTEM.md*
*Sources: AMF_ARCHITECTURE_V2.md, docs/kb/VOCABULARY.md*
*Last updated: 2026-06-12*
