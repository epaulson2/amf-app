"""M10 P4 intake: copy the SHA-verified Batch 2 teaching sheets (from the extracted master ZIP) into the versioned public store and write the served-asset registry. Usage: python3 -I intake_sheets.py <extracted Batch2_Teaching_Sheets dir>"""
import json, hashlib, shutil, sys, os, struct
src = sys.argv[1]; dst = 'public/soundscape/resources/interval-palette/sheets-v2'
sha = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
man = json.load(open(f'{src}/asset_manifest.json'))
reg = {}
for e in man['exports']:
    nn = e['id'].split('-')[-1]; v = e['variant']
    for kind in ('png', 'svg'):
        p = f"{src}/{e[kind]}"
        assert sha(p) == e[f'{kind}_sha256'], p
        os.makedirs(f'{dst}/{kind}', exist_ok=True)
        shutil.copyfile(p, f'{dst}/{kind}/{os.path.basename(p)}')
    b = open(f"{src}/{e['png']}", 'rb').read(32); w, h = struct.unpack('>II', b[16:24])
    reg.setdefault(nn, {})[v] = {'w': w, 'h': h, 'png_sha256': e['png_sha256'], 'svg_sha256': e['svg_sha256'], 'root': e['root'], 'upper': e['upper'], 'semitones': e['semitones']}
json.dump(reg, open('lib/soundscape/resources/sheets-v2.json', 'w'), indent=1)
print(len(reg), 'sheets', sum(len(v) for v in reg.values()), 'variants')
