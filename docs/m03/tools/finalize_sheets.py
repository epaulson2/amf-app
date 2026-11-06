#!/usr/bin/env python3
"""Writes the composed HTML sheets (S09 thumbnails, S10 triptychs, S11 bridges, X09 accessibility guide) and registers them. Run after build_native.ts."""
import json, hashlib, re, html as H
W = '/home/elderle/amf-work/amf-ajourne-m03/'
N = W + 'public/soundscape/m03/native/'
REG = W + 'docs/m03/native_registry.json'
reg = json.load(open(REG))
CSS = ("body{margin:0;background:#f9f5ed;color:#5c465b;font:17px/1.6 Georgia,serif}main{max-width:900px;margin:0 auto;padding:26px 18px 44px}h1{font-weight:400;font-size:32px;color:#4c2748;margin:4px 0 10px}"
       ".eyebrow{font:700 11px ui-sans-serif,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a3778f;margin:0}.grid{display:grid;gap:22px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}"
       "figure{margin:0}figcaption{font:14px/1.45 ui-sans-serif,system-ui,sans-serif;color:#6e5263;margin-top:6px}img{max-width:100%;height:auto}.art{width:100%;aspect-ratio:16/9;object-fit:contain}"
       ".row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}.arrow{font-size:30px;color:#6d326e}table{border-collapse:collapse;width:100%;font:13.5px/1.4 ui-sans-serif,system-ui,sans-serif}th,td{border:1px solid #d9c9d1;padding:6px 8px;text-align:left;vertical-align:top}th{background:#f0e4ea}.muted{font:13.5px/1.5 ui-sans-serif,system-ui,sans-serif;color:#786a75}@media print{body{background:#fff}.art{display:none}}")
def page(id_, title, body, desc, meta):
    doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{H.escape(title)}</title><style>{CSS}</style></head><body><main>{body}</main></body></html>\n'
    open(N + id_ + '.html', 'w').write(doc)
    reg[id_] = {'id': id_, 'type': 'NATIVE-HTML', 'title': title, 'desc': desc, 'files': [f'public/soundscape/m03/native/{id_}.html'], **meta, 'status': 'NATIVE READY', 'sha256': hashlib.sha256(doc.encode()).hexdigest()}
    print('html', id_)
M02 = '../../m02/art/'; A = '../art/'
# ---- S09: six lesson thumbnails (cropped art, no new model calls)
th = [('1A', 'Finding C and home', M02 + 'G01-B-concentric-home.webp'), ('1B', 'Steps and arrivals', A + 'B01.webp'), ('1C', 'Two voices', A + 'C01.webp'),
      ('2A', 'Pairs and intervals', A + 'D03.webp'), ('2B', 'How two voices move', A + 'E03.webp'), ('2C', 'Same melody, changed support', A + 'F01.webp')]
page('S09-thumbnails', 'Lesson thumbnails', '<p class="eyebrow">Week 1 and Week 2</p><h1>Lesson thumbnails</h1><div class="grid">' + ''.join(
    f'<figure><img class="art" src="{a}" alt=""><figcaption><strong>Lesson {l}</strong> · {t}</figcaption></figure>' for l, t, a in th) + '</div><p class="muted">Thumbnails introduce a lesson; they do not replace its teaching.</p>',
    'Six lesson thumbnails made from the approved art for lessons 1A to 2C.', {'group': 'SUP', 'source': 'reused approved art (M02 G01; M03 B01, C01, D03, E03, F01)', 'teach': 'lesson previews', 'variantOf': 'art crops'})
# ---- S10: per-lesson recap triptychs from the lesson's primary native figures
tri = {'1A': ['A03-native', 'A06-native', 'A08-native'], '1B': ['B02-native', 'B05-native', 'B01-pair'], '1C': ['C01-native', 'C04-native', 'C07-native'],
       '2A': ['D03-native', 'D05-native', 'D04-native'], '2B': ['E02-native', 'E03-native', 'E04-native'], '2C': ['F01-native', 'F04-native', 'F07-native']}
for l, ids in tri.items():
    cells = ''.join(f'<figure>' + (f'<img src="{i}.svg" alt="{H.escape(reg[i]["desc"])}">' if i != 'F04-native' else f'<img src="../../m02/art/G03-B-shared-worlds.webp" alt="" style="width:100%"><img src="F04-native.svg" alt="{H.escape(reg[i]["desc"])}" style="margin-top:-100%;position:relative">') + f'<figcaption><strong>{H.escape(reg[i]["title"])}</strong>. Fuller teaching is in the lesson step that explains this picture.</figcaption></figure>' for i in ids)
    page(f'S10-triptych-{l}', f'Lesson {l} recap', f'<p class="eyebrow">Lesson {l}</p><h1>Recap: three pictures</h1><div class="grid">{cells}</div><p class="muted">Play each idea on your own keyboard. The site makes no sound.</p>',
         f'Three figures that recap Lesson {l}: ' + '; '.join(reg[i]['title'] for i in ids) + '.', {'group': l, 'source': 'the lesson figures listed', 'teach': 'end-of-lesson recap', 'variantOf': ', '.join(ids)})
# ---- S11: bridges between published lessons
br = [('Lesson 1A', 'Lesson 1B', A + 'A06.webp', A + 'B01.webp'), ('Lesson 1B', 'Lesson 1C', A + 'B10.webp', A + 'C01.webp'), ('Lesson 1C', 'Week 2, Lesson 2A', A + 'C10.webp', A + 'D01.webp'),
      ('Lesson 2A', 'Lesson 2B', A + 'D07.webp', A + 'E01.webp'), ('Lesson 2B', 'Lesson 2C', A + 'E09.webp', A + 'F01.webp')]
page('S11-bridges', 'Lesson-to-lesson bridges', '<p class="eyebrow">Next up</p><h1>Bridges</h1>' + ''.join(
    f'<div class="row"><figure style="flex:1;min-width:200px"><img class="art" src="{a}" alt=""><figcaption>End of {f}</figcaption></figure><span class="arrow" aria-hidden="true">→</span><figure style="flex:1;min-width:200px"><img class="art" src="{b}" alt=""><figcaption>Next: {t}</figcaption></figure></div>' for f, t, a, b in br) +
    '<p class="muted">Only published lessons are bridged; Lesson 2C has no onward bridge yet.</p>', 'Five bridges, each pairing the closing picture of one lesson with the opening picture of the next.', {'group': 'SUP', 'source': 'reused M03 art', 'teach': 'lesson-to-lesson continuity', 'variantOf': 'art crops'})
# ---- X09: accessibility + print guide, generated from the registry (every native figure, its text equivalent, its print file)
rows = ''.join(f'<tr><td>{H.escape(k)}</td><td>{H.escape(v["title"])}</td><td>{H.escape(v["desc"])}</td><td>{" ".join(f"<a href=\"{f.split(chr(47))[-1]}\">{f.split(chr(47))[-1]}</a>" for f in v["files"])}</td></tr>' for k, v in sorted(reg.items()) if v['type'] == 'NATIVE-SVG')
n = sum(1 for v in reg.values() if v['type'] == 'NATIVE-SVG')
page('X09-accessible-print', 'Accessible and print variants', f'<p class="eyebrow">Accessibility</p><h1>Text equivalents and print files</h1><p>Every figure has a full text description and an ink-light print file with no gradients or glow. Colour and glow never carry meaning alone: letters, numbers and shapes always do. {n} figures:</p><table><thead><tr><th>ID</th><th>Title</th><th>Text equivalent</th><th>Files</th></tr></thead><tbody>{rows}</tbody></table>',
     f'Table of all {n} native figures with their text equivalents and screen and print files.', {'group': 'SUP', 'source': 'native_registry.json', 'teach': 'accessible and print variants'})
json.dump(reg, open(REG, 'w'), indent=1)
print('registry now', len(reg))
