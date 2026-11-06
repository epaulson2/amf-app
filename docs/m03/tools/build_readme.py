#!/usr/bin/env python3
import json, os, glob, collections
W = '/home/elderle/amf-work/amf-ajourne-m03/'
cw = json.load(open(W + 'docs/m03/crosswalk.json')); led = json.load(open(W + 'docs/m03/ledger.json')); art = json.load(open(W + 'docs/m03/art_registry.json')); nat = json.load(open(W + 'docs/m03/native_registry.json'))
spent = sum(c['cost_usd'] or 0 for c in led['calls']); cnt = collections.Counter(v['class'] for v in cw['ids'].values())
S = W + 'docs/m03/screenshots/'
def shots(prefix): return sorted(os.path.basename(f) for f in glob.glob(S + prefix + '*.jpg'))
L = ['# M03: Week 1 and Week 2 illustrated assets: review index\n',
 '**NOT SHIPPED.** Nothing here is deployed or merged. Isolated branch `feat/ajourne-m03-week1-week2-assets-20261106`. Static lessons: no toggles, reveals, audio or quizzes; every learner action is on the learner\'s own keyboard.\n',
 f'- **Catalogue:** {len(cw["ids"])} candidate IDs → {cnt["ART"]} ART, {cnt["NATIVE"]} NATIVE, {cnt["VARIANT"]} VARIANT, {cnt["REUSE"]} REUSE (approved M02 art), {cnt["CONSOLIDATED"]} consolidated, {cnt["DEFER"]} deferred, {cnt["SOURCE-GATED"]} source-gated. See [crosswalk.json](crosswalk.json) and [PLACEMENT_MAP.md](PLACEMENT_MAP.md).',
 f'- **Art:** {len(art)} painterly art-only layers ({len(led["calls"])} model calls, **${spent:.4f}**, see [ledger.json](ledger.json)); F02/F03 are crops of F01 at no cost. **Native:** {len(nat)} static figures/sheets, each SVG with a text description and print variant ([accessibility guide](../../public/soundscape/m03/native/X09-accessible-print.html)).',
 '- **Provenance, prompts, hashes:** [PROVENANCE.md](PROVENANCE.md), [provenance.json](provenance.json). **Teaching notes per group:** [teaching-notes/](teaching-notes/).\n',
 '## Contact sheets (desktop 1280 px, then mobile 390 px)\n']
for k, g in cw['groups'].items():
    L.append(f'### {g["title"]}\n{g["blurb"]}\n')
    for w in (1280, 390):
        for f in shots(f'contact-{k}-{w}'): L.append(f'![Contact sheet for {g["title"]} at {w} px wide: every figure with its native diagram over the art, labelled by catalogue ID](screenshots/{f})\n')
    ls = shots(f'lesson-{k}-')
    L.append('Integrated lesson-style pages: ' + ', '.join(f'[{f.replace(".jpg", "")}](screenshots/{f})' for f in ls) + '\n')
L += ['## Look at it live\n', 'The review pages are static Next routes in this branch (`app/curriculum/soundscape-path/m03-preview/[group]` and `.../contact/[group]`). Run `npm ci && npx next dev -p 3412`, or tunnel to the server preview: `ssh -L 3412:127.0.0.1:3412 elderle@168.144.16.96`, then open `http://127.0.0.1:3412/curriculum/soundscape-path/m03-preview/1A` (also `/contact/1A`, groups `1A 1B 1C W1HUB 2A 2B 2C W2HUB SUP`).\n']
open(W + 'docs/m03/README.md', 'w').write('\n'.join(L))
print('README written;', sum(len(shots(p)) for p in ('contact-', 'lesson-')), 'screenshots indexed')
