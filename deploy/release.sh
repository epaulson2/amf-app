#!/bin/bash
# Build the checked-out commit and install it as an AMF release. Run from a clean clone, as a sudo user.
set -euo pipefail

SITE=/srv/amf-site
SHA=$(git rev-parse HEAD)
[ -z "$(git status --porcelain)" ] || { echo "working tree is not clean" >&2; exit 1; }
[ ! -e "$SITE/releases/$SHA" ] || { echo "release $SHA already exists" >&2; exit 1; }

npm ci
npx tsc --noEmit
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=2048 nice -n 10 npm run build

STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
# Standalone tracing pulls in the whole project, so copy only what the server needs.
cp -a .next/standalone/server.js .next/standalone/package.json .next/standalone/node_modules .next/standalone/.next "$STAGE/"
cp -a .next/static "$STAGE/.next/static"
cp -a public "$STAGE/public"
node -e '
  const fs = require("fs");
  for (const p of require("./lib/publication-hold.json").paths) fs.rmSync(process.argv[1] + "/public" + p);
' "$STAGE"

sudo install -d -o root -g root -m 755 "$SITE/releases"
sudo cp -a "$STAGE" "$SITE/releases/$SHA"
sudo chown -R root:root "$SITE/releases/$SHA"
sudo chmod -R go-w "$SITE/releases/$SHA"
sudo chmod 755 "$SITE/releases/$SHA"
sudo ln -sfn "$SITE/cache" "$SITE/releases/$SHA/.next/cache"
sudo ln -sfn "$SITE/releases/$SHA" "$SITE/current"
sudo systemctl restart amf-site.service
echo "released $SHA"
