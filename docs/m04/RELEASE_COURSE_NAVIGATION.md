# Release: Ajourné course navigation upgrade

Live SHA `0395073e9909c79e6c89e7d4264402fd2b2d682a` (previous live `cf2a897838a81341fccc7c23329df2224b57a2cb`; rollback = relink that release).
Branch `feat/ajourne-m04-intro-weeks12-20261106`. Released with `deploy/release.sh` from a fresh clean clone.

- Shared course layout: contents tree on every Ajourné route (desktop >=1100 sticky sidebar under the AMF header; below that a "Course contents" panel at the top).
- Step titles live once in `lib/soundscape/course-nav.ts`; lessons and tree both read them.
- Week 2: hub + 2A/2B/2C links only (existing pages untouched); Weeks 3-8 "in preparation", not links.
- Global header: direct "Ajourné" link (desktop, and visible beside the hamburger below 1024); Curriculum no longer active on Ajourné routes; header fits at 320-1280.
- Rows switched to container queries so the sidebar does not crush lesson layouts.
- Checks (`docs/m04/check_tree.py`, bundle, nav, stepper x3, spoiler guard) pass on the public site; `/amf_workbook.pdf` 403; POST `/api/chat` 503.
- Not done: screen-reader run, measured contrast on the new tree. Week 2 not started.
