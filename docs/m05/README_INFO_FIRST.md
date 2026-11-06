# M05 information-first remediation: Interval Palette graphics

Status: **built, tested, pushed; awaiting founder visual review.** No merge, no deploy, no Week 2 change, live Palette untouched. **No new image-model calls** ($0 new spend; the 21 original paintings and their ledger are unchanged).

## What changed
- **One colour source:** `lib/soundscape/resources/interval-identity.ts` holds `INTERVAL_IDENTITY_COLORS_V1` (13 canonical hexes, v1.0) and `PLOGGER_LENS_V1` (11 historic entries). Every figure imports from it; a test fails if a hex is hard-coded elsewhere. The earlier candidate hexes remain unchanged in `interval-data.json`. Export: `docs/m05/identity_tokens_v1.json`.
- **New information-first figures** (`public/soundscape/m05/info/`, 61 SVGs, each with `.print.svg`, built by `docs/m05/tools/build_info.mts` from `lib/soundscape/m05/info-svg.ts`):
  - 13 **interval sheets** IPF-sheet-00…12, with phone layouts: identity stripe, exact C4 pair and MIDI, keyboard with endpoints in the interval's own hue, numbered semitone hops, melodic and harmonic strips, three-factor Plogger panel with legend, neighbour stay/change lines, how-to-read line.
  - 13 **compact cards** IPF-card-00…12.
  - **Three proofs:** A m3 vs M3, B P4/tritone/P5, C 13-landmark map (colours, note names, exact 0–12 ruler, [n] chips, N/A at 0 and 12).
  - Comparisons m2/M2, m6/M6, m7/M7, inversion, register, introductory C4→E4 and melodic/harmonic, one-page 13-interval table, all-eleven Plogger chart.
  - The older plates and diptychs (`IPV-*-native`) are kept; the registry marks which IPF figure supersedes each.
- **Plogger three factors (secondary, monochrome, never the identity hue):** A outline (jagged / rounded / straight), B side shadow plus a named arrow (← / ↔ / →), C fill (dark / open / midtone dotted / hatched). The legend is on every sheet. 0 and 12 show N/A. [6] and [10] follow the archived printed original; the legend names that lineage. The 8/4/2 Hz labels are not used.
- Paintings appear only as slim, decorative, aria-hidden accents on the review pages; no fact depends on them.

## Review (static pages, `public/soundscape/m05/sheets/`)
`info-proofs.html` · `info-intervals.html` (each with the full source chapter retained in a details block) · `info-cards.html` · `info-compare.html` · `info-tokens.html`. Screenshots: `docs/m05/screenshots/info-*-{1280,390}.jpg`, `info-proofs-320`, grayscale print check `print-gray-B.jpg`.

## Checks (targeted)
- `tests/m05_info.test.mts` plus the earlier `m05.test.mts`: **18/18 pass**; `tsc` clean.
- Colour: all 13 accents ≥ 3:1 on #F9F5ED (lowest 3.08); label ink #4C2748 ≥ 7.68:1 on every tint used. Report: `docs/m05/contrast_report.json`.
- Mapping: IPV-10…22 ↔ IP-00…12; 13/13 hexes; 11/11 glyphs; tritone both spellings; C4→B4 = 11 vs B4→C5 = 1; inversions sum to 12; no script/audio/images in SVG.
- Layout: no horizontal overflow at 1280, 390, 320 on the review pages.

## Limits (honest)
- **Colour-vision:** simulation shows some of the 13 hues converge for protan/tritan viewers (nearest pairs ΔE76 about 2). Hue is never the only signal (labels, notes, counts on every mark), but the palette does not separate all 13 for those viewers by hue alone. Not changed: the standard locks the hexes.
- No screen-reader run; print checked only as a grayscale render, not on paper; one headless-Chromium pass at 1×.
- Phone sheets are tall by design (about 1,300–1,400 px at 360 wide).
- IPV-34/35 (naming by letters, triad) and IPV-05/06 original plates are not retinted (no interval identity). IPV-33 still deferred.
- Not integrated into the live Palette.
