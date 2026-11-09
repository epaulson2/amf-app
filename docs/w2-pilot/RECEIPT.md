# Week 2 · Lesson 2A pilot (isolated preview, not deployed)
Branch `feat/ajourne-w2-2a-pilot-20261109`, from live `c752630`. Route `/curriculum/soundscape-path/preview/w2-2a?step=N` (noindex); practice sheet at `…/w2-2a/practice-sheet`. Live `week-2/lesson-2a` untouched. No deploy. 2B/2C not started. The 3 ChatGPT art assets have not arrived, so no art slots are filled and nothing stands in for them.

## Finishing pass (this commit)
1. **Diagram order.** The two-column `Row figure` layout put figures after the text on phones. Steps 1–7 now place each diagram inline, at the paragraph that explains it and before the exercise and recap (step 4 has one diagram after each count). Same m04 `Row`, `Fig` and `Try` parts; the only addition is a `.w2-inline` width cap. Desktop is now a single column like step 8, which is the trade-off of dropping the side column.
2. **Practice sheet (step 9, and linked from step 10).** Static, no script, no audio, with print CSS that hides site chrome. It has the C4–G4 reference keyboard, three change cards (letters, semitones and interval name left blank for the learner), three two-line drawing areas with C4 and E4 pre-printed, and a "which would you use" line. Notes, letter counts and semitone counts come from MIDI numbers in `PracticeSheet.tsx` (`sheetFacts`). Answers sit in a collapsed block that is hidden when printing.
3. **Metrics.** `docs/w2-pilot/cap.py` now records `mediaElements` (audio, video, iframe, embed, object, audio/video source), `buttons`, `audioScripts` and `audioCtrl` separately, and exits 1 on any failure. The earlier `audio:6` field was the page's button count (`audio,video,button` together); it was site navigation, not audio. `buttons` is 6 on every page, all site chrome.

## Gate results (320 / 390 / 1280 px, steps 1–10 + practice sheet = 33 pages)
- mediaElements 0, audioScripts 0, audioCtrl 0 on every page.
- No horizontal overflow. Most words on a step: 544 (limit 600). Every SVG has title and desc.
- At 320 px the first diagram sits above the first exercise and above the recap on every step with a diagram.
- Step 5 rule changed. Steps 2–4 must not contain "major third", "minor third", "perfect fourth" or "major second" (steps 2–4 also check "semitone" at step 2). Step 5 may name "perfect" only as a family, as V2 allows; it must not contain "major second", "perfect fourth of", "C4 to F4 is a perfect" or "B3". Step 6 must not contain "major second".
- Before the change the checks passed on the old pass; one gate failed only because my step 5 rule was too strict, so I narrowed it as above.
- tsc clean, next build OK.

## NOT VERIFIED
Screen reader, real phone, 200% text, contrast, physical printing of the sheet (print CSS only), door sources beyond V2 status labels.
