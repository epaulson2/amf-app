#!/usr/bin/env python3
"""Teaching notes + placement map + provenance (X10), all generated from the crosswalk/registries. Nothing here is new prose: it is the briefs' own fields."""
import json, os, hashlib
W = '/home/elderle/amf-work/amf-ajourne-m03/'
cw = json.load(open(W + 'docs/m03/crosswalk.json')); art = json.load(open(W + 'docs/m03/art_registry.json')); nat = json.load(open(W + 'docs/m03/native_registry.json')); led = json.load(open(W + 'docs/m03/ledger.json'))
os.makedirs(W + 'docs/m03/teaching-notes', exist_ok=True)
def files(i):
    f = []
    for a in i['art']:
        if a and not a.startswith('M02:') and a in art: f.append(art[a]['webp'])
        elif a and a.startswith('M02:'): f.append(f'public/soundscape/m02/art/{a[4:]}.webp (M02, reused)')
    for n in i['native']:
        if n in nat: f += nat[n]['files']
    return f
place = ['# M03 placement map\n', 'Catalogue ID → where it goes, its status and its files. NOT SHIPPED: nothing is deployed or merged.\n', '| ID | Title | Class | Status | Placement | Files |', '|---|---|---|---|---|---|']
for gk, g in cw['groups'].items():
    out = [f'# {g["title"]}: static teaching notes\n', f'{g["blurb"]}\n', 'Static lesson notes that feed the later teaching retrofit. The website explains; the learner plays everything on their **own keyboard**. No toggles, reveals, quizzes or sound.\n']
    for iid in g['ids']:
        i = cw['ids'][iid]; fl = files(i)
        place.append(f'| {iid} | {i["title"]} | {i["class"]} | {i["status"]} | {i["placement"][:70]} | {len(fl)} files |')
        out += [f'## {iid} · {i["title"]}', f'- **Status:** {i["status"]} ({i["class"]}){(" — " + i["note"]) if i["note"] else ""}', f'- **Placement:** {i["placement"]}']
        if i['class'] in ('DEFER', 'SOURCE-GATED', 'CONSOLIDATED'): out += [f'- **Not produced:** {i["reason"]}', '']; continue
        out += [f'- **Learning outcome:** {i["objective"]}', f'- **How to read the picture:** {i["how_to_read"]}', f'- **On your own keyboard:** {i["keyboard_action"]}', f'- **Truth guard:** {i["guard"]}', '- **Files:** ' + (', '.join(f'`{x}`' for x in fl[:6]) + (f' … (+{len(fl) - 6} more)' if len(fl) > 6 else '')), '']
    open(W + f'docs/m03/teaching-notes/{gk}.md', 'w').write('\n'.join(out))
open(W + 'docs/m03/PLACEMENT_MAP.md', 'w').write('\n'.join(place) + '\n')
# ---- X10 provenance
spent = sum(c['cost_usd'] or 0 for c in led['calls'])
prov = {'model': led['model'], 'reference': {'file': 'APPROVED_ART_DIRECTION_REFERENCE.png (private; never committed)', 'sha256': 'a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab'},
  'm03_spend_usd': round(spent, 6), 'calls': len(led['calls']), 'art': {k: {x: v.get(x) for x in ('title', 'aspect', 'scene_prompt', 'full_prompt', 'cost_usd', 'generation_id', 'generated', 'raw', 'raw_sha256', 'webp', 'png', 'license', 'alt', 'alt_note', 'derived_from', 'regenerated') if v.get(x) is not None} | {'png_sha256': v['alpha']['png_sha256'], 'dimensions': v['alpha']['size']} for k, v in art.items()},
  'native': {k: {x: v.get(x) for x in ('type', 'title', 'desc', 'files', 'source', 'group', 'art', 'variantOf', 'status') if v.get(x) is not None} for k, v in nat.items()}}
json.dump(prov, open(W + 'docs/m03/provenance.json', 'w'), indent=1, ensure_ascii=False)
md = ['# M03 asset provenance, rights and alt text (X10)\n', f'Model `{led["model"]}` via OpenRouter. {len(led["calls"])} calls, **${spent:.4f}** total (ledger.json; the account delta is checked in the receipt). Reference image SHA-256 `a5346fa8…130ab` was supplied privately as a style reference on every call and is stored in no repo.\n',
      'All art is an original model output generated for AMF with no third-party source image. All art is decorative (empty alt, aria-hidden): every fact lives in native text/SVG. Full prompts are in `provenance.json` and `art_registry.json`.\n', '## Generated art\n', '| ID | Aspect | Cost | Dimensions | Raw SHA-256 | Alpha PNG SHA-256 |', '|---|---|---|---|---|---|']
for k, v in art.items(): md.append(f'| {k} | {v.get("aspect", "crop")} | ${v.get("cost_usd") or 0:.4f} | {"x".join(map(str, v["alpha"]["size"]))} | `{v["raw_sha256"][:16]}…` | `{v["alpha"]["png_sha256"][:16]}…` |')
md += ['', f'## Native figures ({len(nat)})\n', 'Each native SVG has a `<title>`, a full `<desc>` text equivalent and an ink-light `.print.svg`. See `X09-accessible-print.html` for the text of every figure.\n']
open(W + 'docs/m03/PROVENANCE.md', 'w').write('\n'.join(md) + '\n')
nat['X10-provenance'] = {'id': 'X10-provenance', 'type': 'NATIVE-METADATA', 'title': 'Asset provenance, rights and alt text', 'desc': 'docs/m03/PROVENANCE.md and provenance.json', 'files': ['docs/m03/PROVENANCE.md', 'docs/m03/provenance.json'], 'group': 'SUP', 'source': 'ledger + registries', 'status': 'NATIVE READY'}
json.dump(nat, open(W + 'docs/m03/native_registry.json', 'w'), indent=1)
print('notes for', len(cw['groups']), 'groups; provenance for', len(art), 'art and', len(nat), 'native; spend $%.4f' % spent)
