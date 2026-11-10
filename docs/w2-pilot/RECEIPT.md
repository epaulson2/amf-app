# Week 2 · Lesson 2A: production promotion
Branch `feat/ajourne-w2-2a-pilot-20261109` (continuing from `8c94a25`). Real route: `/curriculum/soundscape-path/week-2/lesson-2a?step=1..10` (also `?step=all`), practice sheet at `/curriculum/soundscape-path/week-2/lesson-2a/practice-sheet`. The `preview/w2-2a` routes and the old long-page `week2/Lesson2A.tsx` are removed. Week 1, the Interval Palette, 2B and 2C are untouched (2B and 2C stay as the existing live lessons).

## What shipped
- Week 1 m04 `Stepper`: breadcrumbs, step dots, jump list, previous/next, print-all. Ten V2 learner-copy steps, no pilot banner. The Week 2 contents tree now lists the 10 steps of 2A.
- Exact generated diagrams (`components/soundscape/week2/m04/Diagrams.tsx`) placed inline at the explaining paragraph, before the exercise and recap. Every note, letter count and semitone count comes from `lib/soundscape/week2/lesson2a-facts.ts`, which mirrors the V2 fixed-facts table.
- Practice sheet (static, print CSS, answers collapsed and hidden when printing), linked from steps 9 and 10.
- Six optional doors with V2 wording and cultural guards, placed after steps 6, 7, 8, 8, 9, 9. Door 4 and 5 links as in V2. Source status stays as V2 labelled (Musical Worlds is still CLICK: a human should open the UNESCO page before the claim is treated as confirmed).
- Own instrument only. No site audio, no `AudioProvider`/`ClipButton`/reveal gates, no rejected M08 artwork, no raster art.

## Art status
`Ajourne_W2_2A_Original_Visual_Pilot_v1.zip` (sha256 `3eba0e25…04f0`) was looked for in `/home/elderle/uploads` and by file name across the host, and its hash matched none of the four ZIPs present. It is not on the server, so nothing from it is used and nothing stands in for it. Steps 2, 3–4 and 5 have no reserved placeholder boxes either; the painted layer can be added behind the native SVG with the existing m04 `Figure art=…` pattern once the ZIP is validated.

## Checks run (2A only)
- `tsc` clean; `next build` OK.
- `tests/week2_2a.test.mts` (6 tests: V2 interval table, three changes, ten steps and sheet link, no audio code, six doors and guards, ordering) and `tests/palette_m06.test.mts` (one assertion updated: 2A no longer carries the legacy compact palette) pass.
- Browser gate `docs/w2-pilot/cap.py` at 320, 390 and 1280 px over 10 steps and the sheet (33 pages): mediaElements 0, audioScripts 0, audioCtrl 0, no horizontal overflow, longest step 544 words (limit 600), every SVG has title and desc, first diagram above exercise and recap, no early spoilers, door count per step as expected, next links correct. `buttons` counts 7 per page, all site chrome and navigation.

## NOT VERIFIED
Screen reader, real phone, 200% text, contrast, physical printing, door sources beyond V2 status labels.
