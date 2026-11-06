# M04 stepper correction + bundle B — public release record (2026-11-06)

Two releases, both via a fresh clean clone and `deploy/release.sh` (only `amf-site.service` restarted; no Caddy/DNS/secrets/Nav change; main not merged).
1. **`4ff0286801d384c68b6be6bf2c3c902aef311858`** — Lesson 1A rebuilt as a click-through stepper (one server-rendered step per URL, `?step=N`).
2. **`f4402ac5946091b06b40960ac0174db736e5be29`** — Lessons 1B and 1C, fully taught, on the same stepper. **Currently live.**

## Public URLs (HTTP 200, checked)
- https://amf.queencityredline.com/curriculum/soundscape-path/week-1/lesson-1a  (12 steps)
- .../week-1/lesson-1b  (9 steps; step 1 is answer-neutral) · .../week-1/lesson-1c  (9 steps)
- Whole-lesson print route: add `?step=all`. Jump to any step: `?step=N`.

## Rollback (earlier verified releases remain on disk)
`sudo ln -sfn /srv/amf-site/releases/<SHA> /srv/amf-site/current && sudo systemctl restart amf-site.service` with `<SHA>` = `4ff0286801d384c68b6be6bf2c3c902aef311858` (1A stepper only), `8ed7317ae52c444bf14018fd8f93467c271cea0b` (first bundle A) or `b4d485dbacb216c8bdc7f44135d2d68b98adbce6` (original site).

## Verified on the public site (checks in docs/m04/)
Stepper: every `?step=N` renders exactly one step; "Step N of N"; Previous/Next are real links to the adjacent step; jump list marks the current step; focus + scroll land on the step; refresh and deep links stable; invalid values fall back to step 1; `?step=all` renders every step · all six research doors per lesson present with every original source URL (1A 8/8, 1B 7/7, 1C 7/7) · 1B step 1 leaks no higher-C / octave / arrival wording in text, alt text or title, and step 2 reveals it · no audio or interactive markup in the course content · real-browser click-through (Step 1 → 2 → 3 → Previous → refresh → jump → deep link → print-all) on desktop and mobile · 0 console errors, no failed subresources · `/amf_workbook.pdf` 403 · `POST /api/chat` 503 · Week 2 hub, 2A–2C and the Interval Palette unchanged and 200.

## Not done / known limits
Week 2 (2A–2C) deliberately untouched and still the previous audio-based pages (stopped before Week 2 as instructed). No screen-reader run; contrast not measured on the new pages. Screenshots of the new lessons are for key steps only (docs/m04/lessons/, docs/m04/stepper/).
