# AMF on QCR DigitalOcean — one-shot deployment execution package
**Date:** 2026-11-04
**Owner intent:** Serve the *existing* AMF Next.js website at https://amf.queencityredline.com on the current QCR DigitalOcean host. No Vercel, no new droplet, no redesign.
**Source repository:** https://github.com/epaulson2/amf-app (main). Pedagogy corpus: https://github.com/epaulson2/AMF (separate, private).
**Status:** Authorized deployment objective, NOT evidence of successful deployment. No DNS or server change is recorded in this document.
**Execution model:** One continuous, bounded implementation with nonnegotiable preflight, deploy, verify, rollback checkpoints. Pause only on actual authorization/credential/DNS or safety blockers.

## Verified inputs (read-only, 2026-11-04)
- QCR DigitalOcean host runs Caddy, listening on 80/443. Loopback ports already used include 3000, 3001, 3100, 4173, 8080, 8444–8446. Verify availability again; do not assume any proposed port is free.
- Root volume ~192.7 GiB total, **66.4 GiB free**; QCR reserve is **40 GiB free** at all times. Separate /mnt/qcr_16_droplet volume ~134.1 GiB free; do not fill or repurpose QCR workspace/preservation locations.
- ~25.3 GiB available RAM, but ~5.3 GiB of 8 GiB swap already used; check memory and process headroom during install/build.
- Previously verified QCR public host IP **168.144.16.96**, *NOT current authoritative proof*. Independently confirm public address and QCR DNS before instructing founder on DNS.
- GitHub app contains scripts `build` = `next build`, `start` = `next start`; Next.js **16.2.6**, React 19.2.4; `output: 'standalone'` in `next.config.ts`.
- `deploy.sh` references **OLD** `/home/elderle/amf-app`, `amf-app` systemd unit and `https://amf.elderle.app`; do not execute unchanged.
- Top-level tracked `content` symlink resolves to **/home/elderle/amf-project** (legacy non-QCR server). Treat this as a portability blocker to investigate, not something to overwrite or copy blindly.
- Public Next.js APIs include `/api/chat` with `ANTHROPIC_API_KEY` and `/api/arrange/ai-edit`; audit all billable/public endpoints before exposure.
- QCR's September migration designated the host QCR-only; founder **now explicitly requests** only this AMF cohosting exception. Keep AMF isolated; do **not** move any other Elderle AMF apps, DB, caches, legacy archives, source PDFs, or unrelated services onto the QCR host.
- Prior QCR records suggest Hostinger manages `queencityredline.com` DNS. Confirm actual authoritative DNS/nameservers; no Hostinger/DNS-write capability is presumed.

## Desired architecture / acceptance
- `amf.queencityredline.com` has its **own A record** to verified QCR host IPv4; existing QCR records/hostnames unchanged.
- AMF runs under a **separate unprivileged Linux identity**, on a dedicated **loopback-only** listener and isolated directory such as `/srv/amf-site`. No shell/user secrets committed, no root-run app, no dependence on QCR app process or DB.
- One separately enabled systemd service (e.g. `amf-site.service`), restart-on-failure, bounded CPU/memory, dedicated logs. Test actual reboot readiness via systemd enable status; do not reboot host merely to test.
- A new **host-specific Caddy site block** routes only `amf.queencityredline.com` to the AMF listener, with automatic ACME HTTPS; Caddy config validated before graceful reload. Preserve original config/rollback copy and all QCR, Content, Studio, API, and Game routing/auth.
- Deploy from a pinned GitHub commit; identify the deployed SHA, app dependencies, path and service. Build in a safe workspace without altering unrelated QCR checkout or active worktrees.
- Baseline pages render, navigational links work, JS/CSS assets return 200, relevant music/audio tools actually load. Give a matrix of tested routes and known incompletes; don't claim all pedagogical features fully implemented from static UI existence.

## One-shot execution (sequence, gates)
### A. Read-only preflight — STOP on failure
1. Verify hostname and current public IPv4 with independent local/network checks; check who hosts DNS; query existing `amf` A/AAAA/CNAME records to avoid conflicts. Report exact current records, not assumptions.
2. Inventory Caddy's active virtual hosts/config/includes, ports, units, app code/branches, current web response codes and available disk/RAM/swap. Record QCR routes and processes for after-comparison.
3. Confirm AMF GitHub repository accessibility, git HEAD, source integrity and package lock. Inventory `content` symlink consumers, missing local data/assets, non-portable paths, API keys, sensitive or copyrighted content, and runtime environment assumptions.
4. Confirm no active QCR App/Content/Game/Studio task or storage cleanup will be interrupted, and root disk stays >40 GiB even at projected build peak; resource check includes build memory and swap. If capacity, credentials, permissions or preserving QCR routing is uncertain, stop with one precise blocker.

### B. Make app portable and safe
1. Change only minimal AMF app code/config necessary to run on QCR host. Replace old hardcoded `/home/elderle/amf-project` symlink/dependency with **portable, versioned, permitted** AMF content (e.g. checked-in authorized content / explicit `AMF_CONTENT_ROOT` pointing to separately provisioned release data). Document which pages require optional data; render clear unavailable state rather than crashing or copying private/third-party materials.
2. Review `/api/chat`, `/api/arrange/ai-edit` and any other compute/third-party API route. **Never expose a billed unauthenticated unlimited endpoint.** Default off with explicit 503/deactivated UI if needed; only enable after per-user or equivalent access control, input/rate/token caps, request timeout, secret in root-readable env and founder-authorized cost ceiling. No real secret values in GitHub, Slack, logs or instructions.
3. Ensure no copyrighted third-party book scans, copied charts, songs, stems, private archives or unclear-rights assets become publicly served by accident; source attribution alone does not grant rights. Publish only authorized content or disable affected pages/downloads.
4. Run `npm ci`, type/build checks and focused page/API tests; fix real build failures only. Make no unrequested rebrand or music curriculum redesign. Ensure no environment leakage in client bundle.
5. Commit app portability/safety changes to a dedicated AMF repo branch with concise review/evidence. Do not overwrite unrelated changes or force push. Merge only through approved PR checks. If can't safely merge, stage from inspected exact commit without changing main, and report why.

### C. Install and serve without public cutover
1. Set up clean isolated app directory, user and loopback-only port selected only after `ss` verifies free. Keep deployment artifacts, optional private data and credentials separate with least privilege.
2. Build/release the pinned commit, create limited systemd service, `systemctl daemon-reload`, start/restart AMF **only**, check logs and internal HTTP response/health/JS bundle. Reserve disk floor and cap build concurrency/memory if required.
3. Back up and validate active Caddy configuration, add **only** AMF vhost, validate again and gracefully reload. Confirm existing QCR domains/Studio routes and auth are byte/behavior equivalent to baseline. Do not restart Caddy when validate fails.
4. Before DNS arrives, verify local AMF listener and HTTP host-based routing; **do not claim public HTTPS is live until DNS, certificate and end-to-end validation pass.**

### D. DNS + public certificate (may require founder's one manual action)
1. If domain is managed at Hostinger and no verified authorized DNS-write tool exists, give founder **one exact DNS record**: type `A`, name `amf`, value = independently verified QCR public IPv4 (expected earlier `168.144.16.96`), TTL default/300. Check and avoid conflicting `amf` CNAME/AAAA. **Do not change @, www, api, admin, studio or existing records.**
2. Once DNS points to the correct host, confirm Caddy ACME issuance and full chain for `amf.queencityredline.com`; follow expected DNS propagation rather than disabling TLS checks.
3. Test actual external `https://amf.queencityredline.com` status 200, valid certificate, home and at least one representative page from each active section; CSS/JS/audio; and proper status for unavailable/protected endpoints. Confirm HTTP→HTTPS redirect, no mixed content.
4. Re-verify QCR, API, Studio, Games and Content pages, auth and services unchanged, disk >40 GiB and no unusual RAM/swap, CPU or error surge.

### E. Closeout receipt
Provide precise: 1) published URL and whether PUBLIC LIVE vs DNS PENDING vs BLOCKED; 2) deployed AMF commit and any PR; 3) deployed location/service/loopback port, Caddy vhost path, resource usage; 4) verified DNS IPv4, TTL and HTTPS cert; 5) page / API / music-audio test table, exact unavailable features; 6) independent QCR no-regression proof; 7) how to redeploy and roll back (stop AMF, restore Caddy config + graceful reload, and optional DNS removal), with prior config file and recovery tests. Do not falsely claim service or DNS success based solely on instruction acknowledgment.

## Hard prohibitions
- No new server, Vercel, recurring expense or changes to QCR app architecture.
- No reuse of old Elderle host services/databases or copying `amf-project` wholesale.
- No broad migration, cleanup, workspace deletion, package upgrades outside AMF, QCR PR merge, Studio serving change, App A6.3 interruption, Game GM01 changes, Content database or workspace system modifications.
- No Caddy-wide rewrite, firewall broadening, wildcard CORS, disabling existing auth, serving development mode, exposing API secrets or billing surprises.
- No unverified DNS IP/record claims, no unsafely skipping source/rights verification.

## Work-routing note
Existing QCR Claude sessions are `app`, `content`, `game` and `mockup`; the DigitalOcean MCP connection is **read-only**. If executing through the approved Slack bridge, coordinate via **`#qcr-app` / `@app`** (never `slack-test`) and state clearly that this is a distinct AMF site task; do not preempt unfinished App/B6 work, and if task ownership/concurrency is unsafe, stop and return a specific handoff need. No assumption that a separate AMF Claude session or DNS write API exists.
