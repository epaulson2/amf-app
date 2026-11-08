# AMF Interval Palette — full 93-tile visual inspection (read-only)

Target: https://amf.queencityredline.com/curriculum/soundscape-path/resources/interval-palette
Captures: 2026-11-08T18:15:39Z, headless Chromium 1243 / Playwright 1.58.2, desktop 1440x900 (page height 42,836 css px), mobile 390x844 @2x (55,127 css px).
Revalidation before reuse: live page HTTP 200, same title, same scroll heights at both viewports (re-measured ~18:40Z). Content beyond height was not diffed.
Earlier PARTIAL reports (first reviewer, and the 16/93 reviewer) are preserved unchanged and were not given to the inspectors.

## Verdict
- Tile coverage: **93/93 opened and viewed** (desktop 40/40, mobile 53/53). Machine ledger: `coverage-ledger.json` (93 entries, all inspected=true, filenames match the 93 files in shots/).
- Depth: every tile was viewed in full-view at readable body-text scale. Zoomed crops were made for only **9 of 93** tiles (desktop t02, t03, t07; mobile t31, t32, t38, t39, t42, t43; crops/ dir). Tiny in-artwork text (key labels, staff note names, 6-10 px captions) was therefore only approximately read on most tiles.
- Honest label: COMPLETE for tile coverage; PARTIAL for zoom-level confirmation of fine in-art text and of several suspected clips (marked below).
- Seven inspectors split the work (D1 14, D2 13, D3 13, M1 13, M2 13, M3 13, M4 14). The synthesis below is by the coordinator from their ledgers; I did not personally re-open every tile. Per-part ledgers: `ledger/part-*.json`. One inspector left a helper `ledger/gen.py`.

## Strengths (observed)
1. Cohesive identity: cream ground, plum serif headings, tracked eyebrow labels, same palette throughout (desktop-00, t02; mobile-00).
2. Teaching scaffold: overview keyboard + 0-12 semitone ruler -> 13-row reference -> cards -> chapters -> comparisons -> Plogger -> deeper topics -> studio -> sources (desktop t02-t39).
3. Comparison section (desktop t22-t26, mobile t30-t37): crisp vector keyboards, aligned tiles, legible tables, readable at phone size per inspectors.
4. Honest caveat copy and plain-spoken tone; mobile menu overlay is clean, current item highlighted (mobile-menu-open).
5. No blank/unloaded images, no horizontal scrollbars observed on any tile.

## Ranked findings (observation vs inference marked)
1. **Same poster art appears twice per interval; the two passes take roughly half the page.** Observed: cards grid with the posters (desktop t04-t08; mobile t05-t15), then each poster again at larger size in the chapters (desktop t09-t21; mobile t16-t30). Estimate (inference from tile indices): ~45-50% of page height (~20k of 42.8k px desktop; ~28k of 55.1k px mobile). Small fix: show each poster once (cards link to chapter anchors, or chapters drop the repeat).
2. **Chapter posters dominate and are not integrated with their text.** Observed desktop t09-t21: each poster ~450 px wide, left-aligned in a ~735 px text column, >half the column empty to its right, ~400+ px tall, heading above and text/disclosures below. Observed mobile t16-t29: art ~700/780 px (~90% width) and ~350-450 css px tall, then text below; ~each chapter is several screens. In-art text is much smaller than body text (inspectors: ~6-11 px). Small fix: cap poster width/height, put text beside the art on desktop (two-column), or collapse chapter art behind the existing disclosure.
3. **Poster set is stylistically inconsistent and the last three are weak.** Observed (D1, D2, M2, crops D t07): IP-00..09 are saturated watercolour with staff; IP-10..12 are paler, flatter, wide keyboard, thinner serif, ~6 px caption text blurry even at 2x crop, 2440x3060 vs 1122x1402 links, and ~70-90 px blank gaps above/below the art (desktop t19-t21; mobile t14-t15, t27-t29). IP-12 sits alone in its grid row with ~700 px blank beside it (desktop t08).
4. **Learner-visible internal/process text and unrendered Markdown.** Observed: `R2_pictograph_reference.html`, `app/DiChordPictograph.tsx` (desktop t03/t04, mobile t04/t05/t43), "Older code disagrees about [6]"; literal `**...**` in Sources (desktop t39, mobile t50); URL breaks mid-word (desktop t39); footer reads "Adaptive Musician's Framework" (desktop t39). Fix: render the bold, move provenance to a teacher/owner disclosure.
5. **Clipped content on the right edge.** Confirmed by crop: tritone row Plogger text "straight - both - midtone" cut at table edge (desktop t03); "Inversion: ... moves up an octav" heading, rightmost C key, "3 + 9 = 12 semitones - interval numbers 3 +" (mobile t38/t39, crop-confirmed); "ARCHIVED PRINTED PICT" heading and Fill column fragments "No/ha/(Pl" in the 11-entry table (mobile t42-t44, crops t42/t43). Observed from full view only, NOT crop-confirmed: desktop t29/t30 mini keyboards clipped at C5.
6. **Overlap/crowding in diagrams.** Observed: mobile t31 "C4 - stays" pill covered by "E4 M3"; t32 "F#4=Gb4 A4" overlapping "F4 P4"; t34/t35 leader lines crossing labels; desktop t03 ruler circles 10-12 tightly packed/touching; desktop t24 F#4=Gb4 pill tight.
7. **Hierarchy/length friction.** Observed: page is ~65 phone screens; mobile top stacks three nav elements before the H1 (mobile-00); duplicate headings/captions ("The same interval in three registers" twice, mobile t40; "How to read it" repeating captions, desktop t38, mobile t40-t41); the Plogger legend appears twice (desktop t03/t04, mobile t04/t05); decorative swirl + ~250-275 px empty cream below the footer (desktop t39, mobile t50/t51).
8. **Copy/art mismatch (inference, one inspector, not crop-confirmed).** Chapter text refers to numbered arcs/time strips/colour stripe; the viewed art for the minor second shows one arc and no time strips (mobile t13-t25 summary). "count 1 keys up" (desktop t11) reads as a template slip (observed text).

## Aesthetic / art direction / teaching
- Observed: the poster style (watercolour, glass pills, ribbon, clef) is decorative and large; the keyboard/staff that carry the lesson are the smallest elements inside it. The comparisons section is the opposite: plain vector, directly legible. Keyboards from desktop t34 on switch to a glossy gradient style (orange/teal, serif letters) unlike the flat keyboards earlier (observed; inconsistency, intent unknown). Captions are larger sans next to serif body (observed).
- Teaching quality is strong in the vector sections and the one-grammar-thirteen-times structure; weakest where the lesson sits in small raster text.

## Desktop vs mobile
- Desktop: wide empty regions beside left-aligned art (t08, t09-t21), narrow ~600-735 px text measure inside a ~1016 px column, wider tables/diagrams (~770-900 px) than the text.
- Mobile: art becomes ~90% width and nearly a screen tall, so scroll length grows (55k px); clipping appears on mobile only (t38-t44); body type is large and readable; menu is clean.

## Keep as is
Palette and typographic identity, the one-grammar card structure, vector comparison diagrams, Plogger glyph grid, caveat/"Sources and limits" tone, the mobile menu.

## Not verified
Real device rendering, dark mode, reduced motion, keyboard/focus, screen-reader output, measured contrast, web-font loading, font fallback, sticky nav behaviour, in-art micro-text on the ~84 tiles without crops, whether desktop t29/t30 clipping is real, AMF design authority (none consulted).

## Evidence paths
Dir: /tmp/claude-1000/-home-elderle-qcr-work-hyg-20261108T004311Z-d2d76d6c/8c5d9ab2-462d-4821-85ba-6acee256f9b7/scratchpad/blind-capture-b/
- manifest.json, shots/ (93 PNG), crops/ (9), ledger/part-D1..D3, M1..M4 .json, coverage-ledger.json (merged), this report.
