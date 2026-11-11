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

## Deployed and verified live
`deploy/release.sh` from this worktree at `3817f281ce1af2a3a0c2624437156fa9da51a4c2`. `readlink -f /srv/amf-site/current` is `/srv/amf-site/releases/3817f281ce1af2a3a0c2624437156fa9da51a4c2`. Rollback target (previous release, still on disk): `/srv/amf-site/releases/c752630092e8c0eb815ba410db9efcb358389733`.
Live HTTP 200: `/curriculum/soundscape-path/week-2/lesson-2a` (also `?step=5`, `?step=9`), `/week-2/lesson-2a/practice-sheet`, `/week-2`, `/week-2/lesson-2b`.
The same gate (`cap.py`) run against the live host: 33 pages, no failures; screenshots in `docs/w2-pilot/live/shots/` (phone 320 and 390, desktop 1280), metrics in `docs/w2-pilot/live/metrics.json`.

---
# Week 2 infographic integration: Lessons 2A, 2B, 2C (2026-11-11)
Code `482c2e9` (+ fix `6fea990`). **Live release `6fea990ef2507f534681758c2b5291bf8d0ba95a`** (`readlink -f /srv/amf-site/current`). Rollback: `/srv/amf-site/releases/3817f281ce1af2a3a0c2624437156fa9da51a4c2` (2A-only release, still on disk).
Live: `/curriculum/soundscape-path/week-2/lesson-2a`, `…/lesson-2b`, `…/lesson-2c` (steps `?step=N`), sheets at `…/lesson-2a|2b|2c/practice-sheet`. All HTTP 200.

## 1. Drive pull: SERVER_PULL_VERIFIED
Dedicated read-only script `docs/w2-pilot/infographic-pull/pull_w2_infographics.py` (also at `~/qcr-tools/amf-shared-assets/`): one fixed folder id, rclone `copy`/`lsjson` only, scope `drive.readonly`, key never read or logged, PNG and ZIP only, safe-name and magic-byte checks, ZIP extraction with path-traversal, symlink, size and count protection. Not the Game script.
Drive folder "Week 2 Infographic Drafts 2026-11-10": 29 files accepted (28 PNG + `Ajourne_Week2_All_28_Individually_Named_Infographic_Drafts_v1.zip`), 0 rejected; sizes equal the Drive listing (`drive-listing.json`); 54 ZIP members extracted, all 53 manifest hashes match `MANIFEST.json`. Local copies: `~/amf-work/amf-evidence/w2-infographics-20261110/{inbox,zip-extract}`; hashes in `SHA256SUMS.txt` and `receipt.json` here.
Note: the Drive copies of `W2-2A-02_letter_names_vs_semitone_moves.{desktop,phone}.png` differ from the same-named files inside the ZIP (two different versions). Neither was used.

## 2. Per-asset disposition (all drafts are VISUAL_REVIEW_DRAFTS_ONLY; none is approved final art)
Every draft was opened. The drafts' text facts were right, but keyboard geometry was not: black keys misplaced and highlighted keys beside the wrong neighbours (2B-04, 2C-03); 2A-03 hops C4→D4→E4 across white keys only (the count would be wrong); 2B-04 prints all five answers up front. So **no draft PNG is embedded**. Every figure is rebuilt as editable native SVG from source data, in the canonical Interval Palette colours (`identityHex`: major third #AB812D, minor third #8964A4, perfect fourth sage, major second ochre, tritone periwinkle), with names and numbers beside every colour and shape (circle lower, square upper).
| Asset | Disposition | Where |
|---|---|---|
| W2-2A-01 two voices | rebuilt (native `TwoVoices` + `Keys`) | 2A step 2 |
| W2-2A-02 letters vs semitones | rebuilt (native zero-based hops, letters 1-2-3) | 2A steps 3, 4 |
| W2-2A-03 major vs minor third | rebuilt (native, amber 4 / violet 3) | 2A step 5 |
| W2-2A-P01 sheet | rebuilt (native, answers collapsed and hidden in print) | 2A step 9 and sheet |
| W2-2B-01 three families | rebuilt (3 small panels) | 2B step 4 |
| W2-2B-02 contrary / tritone | rebuilt (B3–F4 five letters, six hops, beside C4–F♯4 four letters, six hops) | 2B step 5 |
| W2-2B-03 similar | rebuilt (+2/+1, 4→3; plus a labelled "illustration only" D4+F♯4 parallel panel) | 2B step 6 |
| W2-2B-04 five transformations | rebuilt as five separate panels (04a–e style) in one responsive grid, placed after the table (V2 order) | 2B step 8 |
| W2-2B-P01 sheet | rebuilt, answer-free two-lane sheet | 2B sheet |
| W2-2C-01 two paths | merged into 02 (no separate figure; the timeline already shows both lanes and only measures where both sound) | 2C step 3 |
| W2-2C-02 held C, E-F-E | rebuilt (36 s timeline from `fixtures.ts`, chips 4, 5, 4) | 2C step 3 |
| W2-2C-03 quiet vs moving | rebuilt (stacked A and B, shared upper line, 14–20 s window, 5 vs 6) | 2C step 4 |
| W2-2C-04 paths vs snapshots | rebuilt as a two-column vocabulary card (HTML) | 2C step 6 |
| W2-2C-P01 sheet | rebuilt, answer-free planning and path sheet | 2C sheet |
Added, not in the draft set: 2B step 2 (vertical vs horizontal schematic, no pitches), step 3 (journeys, directions only) and step 10 (four-moment path 4, 5, 6, 4).

## 3. What changed in the code
Lessons 2B and 2C are now the m04 `Stepper` (11 and 10 steps), generated from the V2 manuscripts by `scripts/w2/build_lesson.py` (learner copy only; editor notes dropped). The old long-page 2B/2C components and their site-audio calls are removed from the routes. Six optional doors each, with V2 wording and cultural guards. Contents tree lists all three lessons' steps. 2A figures take the identity colours.

## 4. Checks run (scoped)
`tsc` clean; `next build` OK; `tests/week2_lessons.test.mts` + `week2_2a.test.mts` + `palette_m06.test.mts`: 22/22 (V2 five cases and 2C 4,5,4 / 4,6,4 intervals recomputed from the data, no audio code, six doors, 2B steps 2–3 spoiler-free, sheets answer-free).
Browser gate `docs/w2-pilot/cap_lesson.py` against the live host at 320/390/1280: 2A 33 pages, 2B 36, 2C 33. mediaElements 0, audio scripts 0, no overflow, SVG title+desc, spoiler terms absent from steps 2–4 (2B steps 2–3 stricter), doors per step as specified, diagram before the exercise and recap, next links correct. Sheets in print media: site chrome hidden; each prints to 2 Letter pages (`local/sheet_*.pdf`). Screenshots: `docs/w2-pilot/live/shots/` (figure steps and sheets, all three widths).

## 5. Unresolved / not verified
- No painterly art layer: the Drive drafts are not approved art and were not embedded; the figures are native only.
- 2B steps 5 (702 words) and 6 (632) exceed the 600-word guide: V2 copy used as written; the audit's suggested split is not applied.
- The audit's suggested one-sentence naming of the 2C 12 s change as contrary motion is not in V2 and was not added.
- Door sources: Musical Worlds (UNESCO) still needs a human click; Smithsonian pages returned 403 to automated checks earlier.
- Screen reader, real phone, 200% text, colour contrast measurement and physical printing are NOT VERIFIED.
- The legacy `lesson-2a/b/c.json`, `teaching.json`, `visual-copy.json` and `week2/Parts.tsx` remain in the repo, unused by the routes.
