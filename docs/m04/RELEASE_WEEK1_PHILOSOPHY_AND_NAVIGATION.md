# Week 1 correction — learning philosophy + course navigation (public release, 2026-11-06)

**Live:** `cf2a897838a81341fccc7c23329df2224b57a2cb` (branch `feat/ajourne-m04-intro-weeks12-20261106`; fresh clean clone → `deploy/release.sh`; only `amf-site.service` restarted; main not merged; no Week 2 change).
**Rollback:** `sudo ln -sfn /srv/amf-site/releases/f4402ac5946091b06b40960ac0174db736e5be29 /srv/amf-site/current && sudo systemctl restart amf-site.service` (earlier: `4ff0286801d384c68b6be6bf2c3c902aef311858`, `8ed7317ae52c444bf14018fd8f93467c271cea0b`, original `b4d485dbacb216c8bdc7f44135d2d68b98adbce6`).

## What changed
1. **How We Learn** rewritten as the founder's learning philosophy (seven sections, 1,068 words) with the approved art and exact figures; practical setup is a small "What you'll need" note. Developer-style "never / no / does not" wording removed there and from the landing, Week 1 hub and the lesson text.
2. **Course-local navigation** on the intro, How We Learn, Journey, Week 1 hub and every step of 1A/1B/1C: breadcrumb ("Ajourné Home / Week 1 / Lesson 1A / Step 2 of 12"), an "Ajourné Home" return, "Back to Week 1" and "Ajourné Home" at the top of every step (the lesson breadcrumb stays in view under AMF's bar) and again in a bottom return row; Step 1's Previous returns to the Week 1 hub. Global AMF nav untouched.
3. Unchanged: single-active-step `?step=N`, deep teaching, art, six doors per lesson with every source link (1A 8/8, 1B 7/7, 1C 7/7), 1B answer-neutral step 1.

## Verified on the public site (docs/m04/check_*.py, cdp flow)
Navigation checked on 13 page variants · How We Learn has every required section and none of the banned developer phrases · all three stepper suites PASS · 1B step 1 leaks nothing · intro pages PASS · **real-browser flow** Intro → How We Learn → Ajourné Home → Week 1 hub → 1A Step 1 → Next (Step 2) → Previous (Step 1) → Back to Week 1 → Ajourné Home, plus bottom "Back to Week 1" from 1B step 4, bottom "Ajourné Home" from 1C step 6 and How We Learn → Home in one click: **0 problems at 1280, 390 and 320 px** (no missing link, no horizontal clipping) · console errors 0 · `/amf_workbook.pdf` 403 · `POST /api/chat` 503 · Week 2 hub, 2A–2C, Palette unchanged (200).

## Not done
Week 2 deliberately untouched (waiting for founder approval). No screen-reader run; contrast not measured on the new pages.
