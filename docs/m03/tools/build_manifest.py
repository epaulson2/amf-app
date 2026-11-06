#!/usr/bin/env python3
"""Crosswalk: every one of the 96 candidate IDs -> actual artifacts or an explicit reason. Run after all art/natives/sheets exist."""
import json, re, os, collections
W = '/home/elderle/amf-work/amf-ajourne-m03/'
cat = json.load(open(W + 'docs/m03/catalog.json')); art = json.load(open(W + 'docs/m03/art_registry.json')); nat = json.load(open(W + 'docs/m03/native_registry.json'))
G01, G02, G03 = 'M02:G01-B-concentric-home', 'M02:G02-ACCENT-keyboard-light', 'M02:G03-B-shared-worlds'
def r(native, art_=None, **k): return {'native': native, 'art': art_, **k}
def h(native): return {'native': native, 'html': True}
OV = dict(mode='overlay')
T = {}   # id -> (class, render list, extra natives, extra art, reuse/reason)
def put(i, cls, render, nats=None, arts=None, note=''): T[i] = (cls, render, nats if nats is not None else [x['native'] for x in render if x.get('native')], arts if arts is not None else [x['art'] for x in render if x.get('art')], note)
# ---- Week 1
put('S06', 'ART', [r('S06-native', 'S06')])
put('A01', 'ART', [r('A01-native', 'A01')]); put('A02', 'NATIVE', [r('A02-native', 'A01')], note='reuses A01 art')
put('A03', 'NATIVE', [r('A03-native', G02)], ['A03-native', 'A03-narrow'], [G02], 'M02 G02 accent reused; narrow layout A03-narrow')
put('A04', 'REUSE', [r('A04-native', G01, mode='overlay', sq=True)], note='approved M02 G01 art reused; new static native labels')
put('A05', 'NATIVE', [r('A05-native')], ['A05-native', 'A05-narrow'], [], 'wide and narrow layouts')
put('A06', 'ART', [r('A06-native', 'A06')]); put('A07', 'VARIANT', [r('A07-native', 'A06')], note='variant of A05/A06')
for i in ('A08', 'A09', 'A10', 'A11'): put(i, 'ART', [r(i + '-native', i)])
put('A12', 'NATIVE', [r('A12-native', G01)], note='recap sheet with ink-light print variant')
put('B01', 'ART', [r('B01-early', 'B01'), r('B01-pair', 'B01')], ['B01-early', 'B01-pair'], ['B01'], 'early answer-neutral page and later pair')
for i in ('B02', 'B03', 'B04'): put(i, 'NATIVE', [r(i + '-native')])
put('B05', 'ART', [r('B05-native', 'B05')]); put('B06', 'VARIANT', [r('B06-native', 'B05')], note='variant of A05/A06/B05')
put('B07', 'VARIANT', [r('B01-early', 'B01')], note='= B01-early; answer-neutral, no higher C anywhere'); put('B08', 'VARIANT', [r('B01-pair', 'B01')], note='= B01-pair')
put('B09', 'ART', [r('B09-native', 'B09')]); put('B10', 'ART', [r('B10-native', 'B10')]); put('B11', 'VARIANT', [r('B11-native', 'B05')], note='optional enrichment; G-major pattern asserted in code')
for i in ('C01', 'C02', 'C04', 'C07', 'C08', 'C10'): put(i, 'ART', [r(i + '-native', i)])
put('C03', 'NATIVE', [r('C03-native', 'C02')]); put('C05', 'NATIVE', [r('C05-native', 'C04')]); put('C06', 'VARIANT', [r('C06-native', 'C02')]); put('C09', 'NATIVE', [r('C09-native', 'C08')])
# ---- Week 2
put('S07', 'ART', [r('S07-native', 'S07')])
for i in ('D01', 'D03', 'D05', 'D07'): put(i, 'ART', [r(i + '-native', i)])
put('D02', 'NATIVE', [r('D02-native', 'D01')]); put('D04', 'NATIVE', [r('D04-native', 'D03')]); put('D06', 'VARIANT', [r('D06-native', 'D05')]); put('D08', 'NATIVE', [r('D08-native', 'D03')], note='one example card; all 13 cards/13 chapters preserved')
put('D09', 'NATIVE', [r('D09-native', 'D05')]); put('D10', 'VARIANT', [r('D10-native', 'D07')])
for i in ('E01', 'E02', 'E03', 'E04', 'E09'): put(i, 'ART', [r(i + '-native', i)])
T['E05'] = ('DEFER', [], [], [], 'Source FIVE has oblique B1-B3, contrary B4, similar B5 and NO parallel example; not commissioned absent source.')
T['E06'] = ('CONSOLIDATED', [], ['E07-native'], [], 'Fifth example (B5) is a row of the E07 full gallery; no extra art.')
put('E07', 'REUSE', [r('E07-native', 'E01')], note='reuses E01 art; contains all five examples incl. E06')
put('E08', 'NATIVE', [r('E08-native', 'E03')]); put('E10', 'NATIVE', [r('E10-native', 'E09')]); put('E11', 'NATIVE', [r('E11-native', 'E09')])
put('F01', 'ART', [r('F01-native', 'F01')]); put('F02', 'VARIANT', [r('F02-native', 'F02')], note='crop of F01 left half (no new model call)'); put('F03', 'VARIANT', [r('F03-native', 'F03')], note='crop of F01 right half (no new model call)')
put('F04', 'REUSE', [r('F04-native', G03, **OV)], note='approved M02 G03 art reused; new static native labels computed from fixtures')
put('F05', 'VARIANT', [r('F05-native', 'F01')]); put('F06', 'NATIVE', [r('F06-native', 'F01')]); put('F07', 'NATIVE', [r('F07-native', G03)]); put('F08', 'ART', [r('F08-native', 'F08')])
put('F09', 'VARIANT', [r('F09-native', 'F01')]); put('F10', 'ART', [r('F10-native', 'F10')])
# ---- Supporting
T['S01'] = ('DEFER', [], [], [], 'Wider site retrofit (M05), outside the six-lesson run.'); T['S02'] = ('DEFER', [], [], [], 'Course landing hero: site retrofit M05.'); T['S04'] = ('DEFER', [], [], [], 'Eight-week journey: deferred until site M05.')
put('S03', 'NATIVE', [h('S03-native')], note='no new art needed')
put('S05', 'NATIVE', [r('S05-native', G02)]); put('S08', 'NATIVE', [h('S08-native')]); put('S09', 'VARIANT', [h('S09-thumbnails')], note='crops of approved art, no model call')
put('S10', 'VARIANT', [h(f'S10-triptych-{l}') for l in ('1A', '1B', '1C', '2A', '2B', '2C')], note='six triptychs'); put('S11', 'VARIANT', [h('S11-bridges')])
put('S12', 'NATIVE', [r('S12-native')])
put('T01', 'NATIVE', [r('T01-native', 'D03')]); T['T02'] = ('SOURCE-GATED', [], [], [], 'No reviewed canonical source for interval-quality distinctions; not produced, per brief.')
put('T03', 'ART', [{'native': None, 'art': 'T03'}]); put('T04', 'NATIVE', [r('T04-native', 'D03')]); put('T05', 'NATIVE', [r('T05-native', 'E03')]); put('T06', 'NATIVE', [h('T06-atlas-key')])
ips = [f'{i:02d}' for i in range(13)]
fam = lambda n: 'a' if n <= 3 else 'b' if n <= 7 else 'c'
put('T07', 'ART', [r(f'T07-IP-{n}', 'T07' + fam(int(n))) for n in ips], [f'T07-IP-{n}' for n in ips], ['T07a', 'T07b', 'T07c'], '3 art families x 13 native card plates')
put('T08', 'ART', [r(f'T08-IP-{n}', 'T08' + fam(int(n))) for n in ips], [f'T08-IP-{n}' for n in ips], ['T08a', 'T08b', 'T08c'], '3 art families x 13 native chapter openers')
put('T09', 'NATIVE', [h('T09-printable'), r('T09-ruler')], ['T09-printable', 'T09-ruler'], []); put('T10', 'NATIVE', [h('T10-practice')])
for i in ('X01', 'X02', 'X03', 'X04', 'X05', 'X06'): put(i, 'ART', [{'native': None, 'art': i}], note='optional enrichment art' + ('; native science diagrams NOT produced (source-gated)' if i == 'X02' else ''))
put('X07', 'NATIVE', [r('X07-native')]); put('X08', 'NATIVE', [h('X08-native')]); put('X09', 'NATIVE', [h('X09-accessible-print')])
put('X10', 'NATIVE', [], ['X10-provenance'], [], 'metadata: docs/m03/PROVENANCE.md + provenance.json')
GROUPS = {'1A': ('Lesson 1A', 'Finding C, the white-key journey, and C as chosen home.', [i for i in cat if i[0] == 'A']), '1B': ('Lesson 1B', 'Half and whole steps, the major-scale pattern, open endings and arrivals.', [i for i in cat if i[0] == 'B']),
  '1C': ('Lesson 1C', 'Two voices: a held foundation, timing and silence.', [i for i in cat if i[0] == 'C']), 'W1HUB': ('Week 1 hub', 'The Week 1 opening.', ['S06']),
  '2A': ('Lesson 2A', 'Pairs of notes and the intervals between them.', [i for i in cat if i[0] == 'D']), '2B': ('Lesson 2B', 'How two voices move: oblique, contrary, similar.', [i for i in cat if i[0] == 'E']),
  '2C': ('Lesson 2C', 'The same melody over a changed foundation.', [i for i in cat if i[0] == 'F']), 'W2HUB': ('Week 2 hub', 'The Week 2 opening.', ['S07']),
  'SUP': ('Supporting assets', 'Setup, legends, thumbnails, the Atlas and enrichment art.', [i for i in cat if i[0] in 'STX' and i not in ('S06', 'S07')])}
def clean(s): return re.sub(r'\s+', ' ', re.sub(r'[*`]', '', s or '')).strip()
def fld(c, *starts):
    for k, v in c['fields'].items():
        if any(k.startswith(s) for s in starts): return clean(v)
    return ''
ids = {}
missing = []
for i, c in cat.items():
    cls, render, nats, arts, note = T[i]
    for n in nats:
        if n != 'X10-provenance' and n not in nat: missing.append(('native', i, n))
    for a in arts:
        if a and not a.startswith('M02:') and a not in art and a not in ('F02', 'F03'): missing.append(('art', i, a))
    own_art = [a for a in arts if a in art or a in ('F02', 'F03')]
    status = {'ART': 'ART GENERATED' + (' + NATIVE READY' if nats else ''), 'NATIVE': 'NATIVE READY', 'VARIANT': 'VARIANT READY', 'REUSE': 'REUSED ART + NATIVE READY', 'DEFER': 'DEFERRED (NOT PRODUCED)', 'CONSOLIDATED': 'CONSOLIDATED', 'SOURCE-GATED': 'SOURCE-GATED (NOT PRODUCED)'}[cls]
    ids[i] = {'id': i, 'title': c['title'], 'class': cls, 'status': status, 'catalog_mode': c['mode'], 'pack': c['pack'], 'art': arts, 'native': nats, 'render': render, 'note': note, 'reason': note if cls in ('DEFER', 'SOURCE-GATED', 'CONSOLIDATED') else '',
      'placement': fld(c, 'Placement') or c['mode'][:60], 'objective': fld(c, 'Learner objective', 'Learn', 'Teaching/source'), 'how_to_read': fld(c, 'Static factual', 'Static accuracy', 'Static'), 'keyboard_action': fld(c, 'How to teach', 'Illustration reading'), 'guard': fld(c, 'Guard'), 'shipped': False}
    if c['pack'] == 'W1' or c['pack'] == 'W2':
        m = re.search(r'Placement:\*\*\s*([^\n]*)', c.get('raw', '') or '')
for g in GROUPS.values(): pass
out = {'generated': '2026-11-06', 'note': 'NOT SHIPPED: nothing here is deployed or merged. 96 unique candidate IDs; no cap, not 96 model calls.', 'groups': {k: {'title': v[0], 'blurb': v[1], 'ids': v[2]} for k, v in GROUPS.items()}, 'ids': ids}
json.dump(out, open(W + 'docs/m03/crosswalk.json', 'w'), indent=1, ensure_ascii=False)
cnt = collections.Counter(v['class'] for v in ids.values())
print(len(ids), 'IDs', dict(cnt)); print('missing artifacts:', missing or 'none')
