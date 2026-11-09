# Week 2 · Lesson 2A pilot (isolated preview, not deployed)
Branch `feat/ajourne-w2-2a-pilot-20261109`, from live `c752630`. Route `/curriculum/soundscape-path/preview/w2-2a?step=N` (noindex). Live `week-2/lesson-2a` untouched.
- Week 1 m04 `Stepper`, one step per URL, 10 steps, V2 learner copy. Own instrument only: no audio, no AudioProvider/ClipButton.
- Diagrams: `components/soundscape/week2pilot/Diagrams.tsx`, generated from MIDI numbers (keyboard, hop counts, letter counts, voices). No raster or AI art.
- Checks: tsc clean, next build OK; 320/390/1280 × 10 steps: no horizontal overflow, max 544 words per step, every SVG has title+desc. Ordering check: steps 2–4 contain none of major/minor third, perfect fourth, major second in text or SVG desc; step 1 names the major and minor third only as lesson goals and step 5 names "perfect fourth" only as the family (both as in V2 ordering rule).
- NOT VERIFIED: screen reader, real device, 200% text, contrast, practice-sheet (step 9 says not yet built), door sources beyond V2 status labels.
