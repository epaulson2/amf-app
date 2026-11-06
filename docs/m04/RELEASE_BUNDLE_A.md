# M04 bundle A — public release record (2026-11-06)

**Released:** `8ed7317ae52c444bf14018fd8f93467c271cea0b` from `epaulson2/amf-app` branch `feat/ajourne-m04-intro-weeks12-20261106` (descends from the previous live `b4d485d`). Not merged to main.
**Method:** fresh clean clone pinned to the commit → `deploy/release.sh` (`npm ci`, `tsc`, production build, install, repoint `/srv/amf-site/current`, restart `amf-site.service` only). No Caddy, DNS, secrets, Nav/Footer or other-service change.

## Public URLs (HTTP 200, checked)
- https://amf.queencityredline.com/curriculum/soundscape-path  (illustrated introduction)
- .../how-it-works · .../journey · .../week-1 (hub) · **.../week-1/lesson-1a** (fully taught Lesson 1A)

## Rollback (previous verified live SHA still on disk)
`sudo ln -sfn /srv/amf-site/releases/b4d485dbacb216c8bdc7f44135d2d68b98adbce6 /srv/amf-site/current && sudo systemctl restart amf-site.service`

## Verified live
Serving SHA = 8ed7317 (service pid cwd confirmed) · service active · `/amf_workbook.pdf` 403 · `POST /api/chat` 503 · `/` 200 · lessons 1B, 1C, Week 2 hub, 2A–2C and the Interval Palette still 200 (unchanged) · targeted rendered-page checks PASS on the public URL (12 steps, 13 how-to-read blocks, 6 research doors, 8/8 original source URLs, 34 assets resolve, every internal link 200, no audio or interactive markup in the course content) · browser console errors 0 and no failed subresources on 4 pages · no horizontal scroll at 1280/390/320 · print emulation hides art/nav and prints white.
Screenshots: `docs/m04/live/` (public URL) and `docs/m04/screenshots/` (pre-release).

## Not in this release
Lessons 1B, 1C, 2A, 2B, 2C are still the previous audio-based pages (bundles B and C). The Week 1 hub links to them as they are.
