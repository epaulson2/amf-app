# Week 1 teaching coverage matrix (instructional completeness gate, 2026-11-05)

Every row is checked against the rendered DOM by `tests/browser/week1_teaching_dom.py` (148 assertions at 320 and 1280 px on `document.body.innerText`, with no audio played). Text inside closed drawers does not count. The 1B rows after the reveal are read after one plain button click, with no sound.

| Concept | (a) Visible explanation | (b) Worked example, exact notes | (c) Sound / keyboard / text demo | (d) Check with feedback | (e) Transfer | (f) Recap / bridge |
|---|---|---|---|---|---|---|
| Pitch, note, timbre | 1A "Before we listen" | low C as pad vs piano, same named pitch | text mini-example; C3 demo in section 2 | listen-for prompts | 1A studio | 1A recap |
| Tonal center, tonic; one C is not a C-major chord | 1A "What is a tonal center?" | E over C, then G over C: C stays, upper note changes | "Hear E/G over C" buttons plus text | "What are we calling our home reference?" with explained feedback | 1A "Try it in your own studio" | 1A recap |
| Finding C, letter names, octave, register | 1A "Reading the keyboard as a map" | 5-step walkthrough: black-key pair, C, next C | interactive C3–C5 keyboard (click or arrow keys plus Enter), key table | 3 think-then-check items | Look/Draw/Hide/Imagine | 1A recap |
| Harmony as two pitches (which stays, which changes) | 1A "A note becomes a musical relationship" | held C3, E4 then G4 | Hear E/G | tonal-center check | 1A DAW bridge | 1A recap, 1C |
| Interval, semitone, half/whole step | 1B "What is a semitone? What is a whole step?" | A–D: C4–C♯4, C4–D4 via C♯, E4–F4, B4–C5 | four "Hear example" buttons plus note text | 2 explanation checks | 1B studio | 1B recap |
| Scale, major scale W-W-H-W-W-W-H | 1B "What is a scale, and how is C major made?" | step table C→D … B→C with semitone counts | per-row Hear-and-show plus highlighted keys; step builder | 2 build-and-explain checks | 1B studio | 1B recap |
| Melodic expectation, leading tone, resolution, open endings | 1B "Why does an ending feel like an arrival?" | same first 7 notes; the last event differs | Arrive/Hover, blind replay | preference choices (not scored) | change only the ending in a DAW | 1B recap, 1C |
| Note vs voice vs harmony vs chord | 1C "Notes, voices, harmony and chords" + distinction table | E4 moves to G4; C3 with E4; C-E-G forward reference | solo foundation / upper / both | 2 understanding checks | 1C compose | 1C recap |
| Duration, rest, repetition, variation, form | 1C "Time is a musical material" | same E4 enters at 2 s vs 7 s | early/delayed buttons | 2 application checks | 1C 6-step studio sequence | 1C recap, Week 2 bridge |
| Choosing and naming what changed | 1C "Compose it with an intention" | "I kept ___ the same, changed ___, noticed ___" | 36 s landing/open versions | "What changed?" options | own DAW piece | Week 2 bridge to intervals |

Deferred on purpose: interval names and quality (Week 2), three-note chord construction (Week 4). They are mentioned only as forward references.

## Naive-learner walkthrough (browser, no audio)
Learner with no terms, using the visible page only:
1. Tonal center? Defined in 1A as a sense of a central pitch created by context; C is "our chosen home reference"; one held C is not automatically a C-major chord.
2. Find C and the next C? Two-black-key group, white key to its left, then the next group.
3. Half vs whole step? Neighbouring key = semitone; C→C♯→D is two; E–F and B–C are one.
4. Why W-W-H-W-W-W-H? Step table with semitone counts, built from C.
5. Why an ending creates expectation? 1B arrival section (leading tone in a C-major context; open ending is a choice).
6. Note / voice / harmony / chord / variation / form? Defined in 1C, with a table.
7. Which variable did you change? The six-step sequence and "I kept ___ the same…" sentence.
