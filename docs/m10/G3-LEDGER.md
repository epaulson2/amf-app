# M10 G3 — 14-asset correction ledger (2026-11-09)

ZIP `Ajourne_Graphic_Corrections_14_Images_FRESH.zip` (= `AMF_Interval_Palette_Graphic_Corrections_v2`), sha256 `e9873eea66e2584cf51af13aed0ab2ae2083647f08f91cb808a4239daea86d41`, 22,694,811 bytes: matches. Found at `/home/elderle/uploads/`. 39 entries, no traversal/symlinks, all 28 PNG+SVG manifest hashes match, transparent corners on all 14, no scripts/external refs in SVG. Private copy: `amf-evidence/palette-remediation/m10-g3-20261109/`.

Full-resolution review of each PNG (keys vs 2+3 black-key grouping, staff line/space, text, glyphs, clipping). **5 published, 9 held.**

| asset | disposition | evidence |
|---|---|---|
| IP-10 card | **REPLACE** (served from `illustrated-v2/g3/`) | C4–B♭4, 10 st verified; keys + staff (ledger C4, B♭4 on 3rd line) correct. Minor: small flat sign, faint ghost caption text |
| IP-11 card | HOLD_FOR_ART_CORRECTION | missing-glyph box (▯) in title pill 'C4 ▯ B4' |
| IP-12 card | HOLD_FOR_ART_CORRECTION | same missing-glyph box 'C4 ▯ C5' |
| support_02 P4/TT/P5 | **SUPPLEMENT** (`#ipf-proof-b-p4-tt-p5`) | 5/6/7 st, keys and staves correct; native diagram in 'Inspect' disclosure |
| support_04 m2/M2 | HOLD | text error '1 semitones' (art otherwise correct) |
| support_05 m3/M3 | HOLD | painted title clipped by cards |
| support_06 m6/M6 | HOLD | painted title clipped ('Major Sixth' half hidden) |
| support_07 m7/M7 | HOLD | painted title clipped ('Major Seventh') |
| support_08 inversion | HOLD | endpoints now correct (E♭4–C5 etc.) but ▯ glyphs, clipped title, caption overflows pill |
| support_09 Plogger guide | **SUPPLEMENT** (`#plogger`, above native chart + text table) | all 11 rows match PLOGGER_LENS_V1; 0/12 N/A |
| support_10 register | HOLD | caption spills outside its pill; subtitle hidden; three identical keyboards |
| support_12 melodic/harmonic | HOLD | ▯ glyph in 'C4 ▯ G4'; ghost subtitle |
| support_13 unison/octave | **SUPPLEMENT** (own block after comparisons) | keys, ledger lines, 0/12 st verified |
| support_14 A4 vs d5 | **SUPPLEMENT** (`#ipf-proof-b-p4-tt-p5`) | F♯4/G♭4 same key, accidentals correct; faint ghost subtitle only |

Systemic defects for ChatGPT: (1) arrow/↔ glyph renders as ▯ (font fallback) in IP-11, IP-12, 08, 12; (2) painted title banners overlap the plates in 05/06/07/08/10; (3) near-invisible white ghost subtitle text under banners; (4) '1 semitones'; (5) caption text wider than its pill (08, 10). Unchanged and kept: 13 Batch 2 sheets, support_11, corrected IP-01 (C4–D♭4), IP-00–09 corrected derivatives, native IPF-invert/IPF-register/IPF-compare diagrams.

## Fix round (same day) — all 9 held assets repaired and published
Method: the ZIP's own generator (`docs/m10/g3-fix/gen_patched.py`, renderer shim `render.mjs`/`cairosvg.py` using sharp) with defect patches; painted tops composited from the master ZIP / G3 painterly references with per-asset cut lines; regenerated SVG layers in `docs/m10/g3-fix/svg/`. Fonts here are DejaVu Serif/Sans + FreeSerif clef (Noto fonts unavailable), so repaired assets use DejaVu lettering. Fixes: arrow glyphs forced to DejaVu Sans (no ▯); '1 semitone'; caption text auto-fits its pill; native layer moved below painted titles; ghost header/caption text removed. IP-10 regenerated too so cards 10–12 match.
Published now: IP-10, IP-11, IP-12; support_04, 05, 06, 07, 08, 10, 12 (placed in their native comparison blocks with the exact native diagram under 'Inspect the exact notes and counts'). Total G3 published: 14 of 14.
Facts re-checked on the repaired renders: 04 C4–D♭4 1/C4–D4 2; 05 3/4; 06 8/9; 07 10/11 (A♯ black key present); 08 E♭4–C5 9, E4–C5 8, F4–C5 7 (sums 12 and 9); 10 C3–G3, C4–G4, C5–G5 each 7; 12 C4–G4 7 melodic and harmonic. Keys checked against 2+3 black-key grouping; notes against staff lines/spaces with ledger line for C4.
