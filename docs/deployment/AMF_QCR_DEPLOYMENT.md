# AMF on the QCR host

Serves `amf.queencityredline.com` from `/srv/amf-site`, as the unprivileged `amf-site` user, on `127.0.0.1:3210`, behind a host-specific Caddy block (`deploy/amf.caddy`). The unit is `deploy/amf-site.service`.

## What is deliberately off

- **Paid AI routes.** `/api/chat` and `/api/arrange/ai-edit` return 503 and the chat widget is not rendered unless `AMF_AI_ENABLED=true`. Do not set it until the routes have access control, rate and token caps, and an owner-approved cost ceiling.
- **Withheld public files.** `lib/publication-hold.json` lists files the release removes and `proxy.ts` answers with 403, because they name or quote third-party songs, could not be text-checked, or are bundles. Remove a path only when the owner confirms its rights.
- **Lead sheets.** The songs page no longer renders `lib/lead-sheets.ts` melody notation, which contains third-party songs.
- **Corpus pages.** The private corpus is not deployed. Pages that need it show a notice. To supply permitted content, set `AMF_CONTENT_ROOT` in the service environment.

## Redeploy

From a clean clone, checked out at the commit to release, run `deploy/release.sh`. It builds, removes held files, installs to `/srv/amf-site/releases/<sha>`, points `current` at it, and restarts only `amf-site.service`.

## Roll back

- **Previous release:** `sudo ln -sfn /srv/amf-site/releases/<sha> /srv/amf-site/current && sudo systemctl restart amf-site.service`
- **Remove the site:** restore the Caddyfile backup kept at `/etc/caddy/Caddyfile.pre-amf`, run `sudo caddy validate --config /etc/caddy/Caddyfile`, then `sudo systemctl reload caddy`. Then run `sudo systemctl disable --now amf-site.service`, and delete the `amf` DNS record if wanted.

## Known gaps

- The arranger's generate action calls `/api/arrange`, which has no route in this repository.
- `@coderline/alphatab` is not a declared dependency, so the score viewer shows its own error state.
- Navigation links to `/musical-universe`, which has no page.
