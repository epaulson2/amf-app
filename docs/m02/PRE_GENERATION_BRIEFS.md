# M02 pre-generation teaching briefs (qualification standard §4) — 2026-11-06

All three are QUALIFIED before any image call. Facts come from source fixtures, never from the image model.
Reference (private, art direction only, never shipped): `APPROVED_ART_DIRECTION_REFERENCE.png`, SHA-256 `a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab`.
Layer key — **A** page atmosphere · **B** art-only transparent illustration · **C** native exact facts/keyboard · **D** teacherly prose + physical-keyboard action.

## G02 / A03 — Finding C on the keyboard (1A, early; before G01)
1. **Stage:** Lesson 1A, after the keyboard orientation, before "C as Home".
2. **Prerequisite:** has a keyboard in front of them; knows nothing about note names or notation (no letters assumed).
3. **Outcome:** "After this illustration, the learner can point to a C on any keyboard: the white key immediately to the left of a group of two black keys, and find the next C by repeating the pattern."
4. **Problem solved:** the two-then-three black-key rhythm is a spatial pattern that is slow to explain in prose and instant to see.
5. **Visual grammar:** black keys form groups of 2 and 3 (bracketed and counted in native text); the C locator is a warm amber glow + arrow on the white key at the *left edge* of each 2-group. Colour is never the only signal (shape bracket, count, and optional letter all carry it).
6. **Source:** deterministic geometry, 7 white + 5 black keys per octave; black keys sit after C, D, F, G, A. Lesson wording from `LESSON_1A_ABSOLUTE_BEGINNER_KEYBOARD_FIRST_REMEDIATION_V1.md` (§2 "The black keys help us find C").
7. **Anchor:** this *is* the keyboard anchor; the learner repeats it on their own instrument. Site makes no sound.
8. **Reading order (D):** orient → trace "find a pair of black keys" → "the white key just left of the pair is C" → play two or three Cs on your own keyboard → noticing question.
9. **Reveal:** default = unlabelled keys with 2/3 group brackets; "Reveal the Cs" (button, `aria-pressed`) shows the glow + letters. No answer leak before the learner tries.
10. **Decomposition:** A = shared page wash · B = small soft light accent behind the key bed (never over keys) · C = native SVG keyboard · D = prose.
11. **Success/failure:** novice finds a C within one reading; the highlighted key is always immediately left of a two-black-key group (unit-tested); no fake play controls; no rectangle edge.
12. **Provenance:** keyboard native (no generation). Accent art: model/prompt/cost logged in `ledger.json`.

## G01 / A04 — C as Home (1A, after C is located)
1. **Stage:** Lesson 1A, after the learner has found C and walked the white keys C→C.
2. **Prerequisite:** can find C (G02); has played the seven white keys upward. No "tonic", "key", "chord" or intervals assumed.
3. **Outcome:** "After this illustration, the learner can point to C as the chosen home note *in this exercise*, name the six visiting notes, and play C D E F G A B then C on their own synth and hear a return."
4. **Problem solved:** "home" is a relationship (a centre everything is heard against), not a property of C; a picture can show centre vs. visitors at once.
5. **Visual grammar:** centre = chosen home; surrounding orbs = the visiting white-key notes in order; a dashed path (toggle) shows the journey out and back. **Ring radius and orb angle are conceptual — they do not measure semitones or consonance.** Stated in the legend.
6. **Source:** white-key path C D E F G A B C from `lesson1a-copy.ts` §3 and §5 (verbatim wording); no other notes introduced.
7. **Anchor:** native keyboard strip below with the same C glowing (G02 component), tying picture to instrument.
8. **Reading order (D):** orient → trace the path with "Trace the journey" → try: play C…B then C; then stop on G once and on C once → notice question. Explicit caveat: C is home *here* by our choice; a held C alone does not make a key or chord.
9. **Reveal:** path hidden until toggled; reduced-motion = instant.
10. **Decomposition:** A = shared wash · B = concentric field/petals, **no orbs, no text** · C = native SVG orbs + labels + path + keyboard · D = prose.
11. **Success/failure:** novice can say what is central vs. visiting; seven distinct letters, no duplicates (the reference image duplicates C and D — not carried over); no major-key/emotion claim.
12. **Provenance:** B generated (ledger); C native.

## G03 / NB03 — Shared Musical Worlds (Week 2 level; Lesson 2C source)
1. **Stage:** Week 2, Lesson 2C ("changed support, changed context"). **Not shown in 1A.**
2. **Prerequisite:** 2A–2B: two voices, naming notes, the idea that a lower and an upper voice make a pair.
3. **Outcome:** "After this illustration, the learner can point to the one note two situations share, name the one that differs on each side, and say that the same melody note sits in a different context when the lower voice changes."
4. **Problem solved:** the 2C result ("melody unchanged, context changed") is an overlap idea; two intersecting fields show *same* vs *different* together.
5. **Visual grammar:** two translucent fields = two situations; the lens where they overlap = notes both situations share; the crescents = notes only one has. Overlap area is conceptual and **not a waveform or interference picture**.
6. **Source (verified from `lib/soundscape/week2/fixtures.ts`, object `C`):** upper line identical in both: E (4–10 s), F (14–20 s), E (26–32 s). Lower: *held* = C for 36 s; *moving* = C (0–12 s), B (12–24 s), C (24–36 s). At the moment the melody sits on **F (14–20 s)**: held sounds {C, F}; moving sounds {B, F}. **Shared = {F}. Only held = {C}. Only moving = {B}.** Computed in code from the fixtures, not typed. At the E moments the two situations are identical {C, E} (shown in text). Semitone facts from the same fixtures: C→F = 5, B→F = 6.
7. **Anchor:** native keyboard strip marking C, B, F for the F moment; learner plays both pairs on their own synth.
8. **Reading order (D):** orient (which two situations, which moment) → trace F in the overlap → trace C vs B in the crescents → try: play C+F then B+F, keep F the same → noticing question. No mood claims.
9. **Reveal:** crescents labelled by default; optional "show the other moments" row for E (identical) and F.
10. **Decomposition:** A = shared wash · B = two overlapping fields, **no text** · C = native labels computed from fixtures · D = prose.
11. **Success/failure:** only F in the intersection; fields visibly differ; no "happy/sad" labels; B is not a mandala copy of G01.
12. **Provenance:** B generated (ledger); C derived from fixtures at render time.
