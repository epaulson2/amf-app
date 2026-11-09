# M10 — Interval Palette visual remediation: issue tracker

Baseline (verified): live release `fe58b6b7d8e35c3cd58f842664cea4ec683c59c2` (= branch `feat/ajourne-m09-palette-illustrated-cards-20261108`; `/srv/amf-site/current`). Work branch `feat/ajourne-m10-palette-visual-remediation-20261108`. Prior page heights (93-tile audit, 2026-11-08 ~18:15Z): desktop 42,836 px, phone 55,127 px.

Durable evidence (not in public/): `/home/elderle/amf-work/amf-evidence/palette-remediation/audit-93tile-20261108/` (93 shots, 9 crops, 7 ledgers, report, manifest, `SHA256SUMS.txt`, 115 files, mode go-rwx). Report, ledger, manifest and the 9 crops are also copied here and in `audit-crops/`. After-state captures: `after/` (+ `after/measures.json`).

Status vocabulary: PASS | PARTIAL | DEPENDENCY (needs ChatGPT graphics) | NOT_VERIFIED.

| ID | Owner | Source / fix | Status | Proof |
|---|---|---|---|---|
| V05 clipping (P0) | Claude | Inversion SVG: keyboards were translated 14 px past their width and heading/sum lines were single-line; now widths account for the offset and text wraps (`lib/soundscape/m05/info-svg.ts` `invert`). One-page tritone row text shifted/narrowed. Plogger HTML table no longer `display:block; overflow-x:auto` (fills width, wraps). Plogger chart header no longer truncated. | PASS (Chromium) | `after/measures.json`: overflow 0 and clipped tables 0 at 320/390/640/768/1280/1440; `after/invert-390.png`, `after/plogger-390.png` |
| V06 label overlap (P0) | Claude (spec: none needed; label-tier fix) | `kbd()` callout tiers now use clamped pill positions, a wider text estimate and 8 px gap, so `C4 · stays` / `E4 M3` / `F♯4=G♭4 A4` stagger instead of overlapping. | PASS for the compare/map figures viewed; ruler circle crowding (desktop 10–12) NOT changed | `after/cmpB-390.png`, `after/cmpB-1440.png` |
| V04 jargon / markdown / brand | Claude | Learner copy no longer shows file paths (`PLOGGER_LINEAGE` text, legend, chart header, sources note); "Older code" reworded; `**…**` rendered via `Md` in sources; Tier-2 URL and "Founder-uploaded…" reworded; brand footer/title "Adaptable" to match the home page and course pages. Test added. | PASS; **brand choice (Adaptable vs Adaptive) is a judgement: repo docs/course pages use Adaptable, older docs mix both — founder to confirm** | `tests/palette_m06.test.mts` (7/7); measures `bad:false` |
| Link semantics | Claude | Gallery tiles say "Go to the X chapter"; in-chapter disclosure renamed "Expand the full chapter text (seven sections)"; zoom link keeps "View full-size image (WxH PNG)". | PASS (text); keyboard-only path NOT tested end to end | `after/chapter-IP-04-1280.png` |
| V01 duplicate posters | Claude structure | `#cards` is now a compact thumbnail gallery with deep links; each chapter shows the illustrated card once. | PASS | gallery: 13 tiles, 13 chapters, 13 full figures (`measures.json`); `after/gallery-1280.png` |
| V02 composition / rhythm | Claude layout; ChatGPT art roles | Chapter = figure + "how to read" text side by side (desktop), stacked with a 320 px figure on phones. Painted art itself is unchanged. | PARTIAL — layout done; poster redesign is G1 | `after/chapter-IP-04-390.png`, `…-1280.png` |
| V03 IP-10–12 weak art | ChatGPT | Not touched. | DEPENDENCY (G2) | `after/chapter-IP-12-*.png` |
| V07 Plogger redundancy / footer gap | Claude | Legend removed from the map and one-page figures (explained once in the Plogger section); duplicate in-figure titles removed from comparison/register SVGs; `.m4-atmos--br` `bottom:-1%` (≈430 px on this page) → `0`: trailing gap after footer is now 0 px. | PASS | measures: footer gap 0 at 390 and 1440 |
| V08 copy ↔ art | Claude text; ChatGPT art | Chapter "How to read this picture" now describes what the illustrated card shows (name, semitones, two highlighted keys, staff on 00–09); the old arc/time-strip text moved under the precise-diagram disclosure; "count N keys" → semitone steps. | PARTIAL — text now matches the pictures; not re-checked against a future art package | `after/chapter-IP-04-1280.png` |
| G0 asset triage | ChatGPT | Pending. Current deployed art: IP-00–09 corrected derivatives (M09), IP-10–12 native; see `docs/m09/README.md`. | DEPENDENCY | — |
| G1 redesign / G2 fixes (IP-01 spelling re-verify, 13/13 QA, native diagram specs) | ChatGPT | Pending. IP-01 live spelling is already C4–D♭4 (M09 derivative). | DEPENDENCY | — |
| G3 package + P4 integration | ChatGPT → Claude | No package exists; no P4 work done. | DEPENDENCY | — |

Page length (default state, accordions closed): desktop 42,836 → 33,851 px (−21%); phone 55,127 → 43,516 px (−21%).

Not verified: real devices/iOS, screen readers, measured contrast, dark mode, 200% browser text (only 640 px viewport as a proxy), mobile-menu behaviour (shell untouched), print output visually (render not inspected), ruler-circle crowding at desktop 10–12.


## P4 integration (2026-11-09)
See `P4-LEDGER.md` for the 40-line ledger. Batch 2: 13/13 REPLACE (verified). Batch 1: 13/13 KEEP_EXISTING (identical to deployed; promised new IP-10–12 absent → G2/V03 still open). Batch 3: 1 SUPPLEMENT, 2 SOURCE_ONLY, 11 HOLD_FOR_ART_CORRECTION (graphics dependency for ChatGPT). Evidence: `docs/m10/after-p4/`, `docs/m10/zip-receipt/`.

## G3 correction delta (2026-11-09)
See `G3-LEDGER.md`. 5 of 14 published (IP-10, support_02/09/13/14), 9 HOLD with defects listed. V03/G2 remain open for IP-11/12. Evidence `after-g3/`.
