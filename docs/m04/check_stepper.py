#!/usr/bin/env python3
"""Stepper checks on the RENDERED pages. Usage: check_stepper.py BASE_URL LESSON_PATH TOTAL LESSON_JSON NEXT_LESSON_PATH"""
import sys, re, json, os, urllib.request, html as H
BASE, PATH, TOTAL, LJ, NEXT = sys.argv[1].rstrip('/'), sys.argv[2], int(sys.argv[3]), sys.argv[4], sys.argv[5]
W = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); ok = True
def fail(m):
    global ok; ok = False; print('FAIL', m)
def get(q=''):
    r = urllib.request.urlopen(BASE + PATH + q, timeout=120); return r.status, r.read().decode('utf8', 'replace')
def txt(h): return H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', re.sub(r'<(script|style)[\s\S]*?</\1>', '', h))))
heads = {}
pages = {}
for n in range(1, TOTAL + 1):
    s, h = get(f'?step={n}'); pages[n] = h
    scene = h[h.find('class="m4"'):h.find('<footer')]
    c = len(re.findall(r'class="m4-step"', scene))
    if s != 200 or c != 1: fail(f'step {n}: status {s}, {c} step sections (want exactly 1)')
    t = txt(scene)
    if f'Step {n} of {TOTAL}' not in t: fail(f'step {n}: missing "Step {n} of {TOTAL}"')
    m = re.search(r'<h2 id="step-%d-h">(.*?)</h2>' % n, scene); heads[n] = H.unescape(re.sub('<[^>]+>', '', m.group(1))) if m else None
    if not m: fail(f'step {n}: no heading')
    other = [k for k in range(1, TOTAL + 1) if k != n and re.search(r'id="step-%d-h"' % k, scene)]
    if other: fail(f'step {n}: other steps visible {other}')
    # links
    prev = re.search(r'aria-label="Step %d navigation"[^>]*>(.*?)</nav>' % n, scene, re.S).group(1)
    hrefs = [H.unescape(x) for x in re.findall(r'href="([^"]+)"', prev)]
    want_prev = f'{PATH}?step={n-1}#lesson-step' if n > 1 else None; want_next = f'{PATH}?step={n+1}#lesson-step' if n < TOTAL else NEXT
    if n > 1 and want_prev not in hrefs: fail(f'step {n}: previous link {want_prev} not in {hrefs}')
    if n < TOTAL and want_next not in hrefs: fail(f'step {n}: next link {want_next} not in {hrefs}')
    if n == TOTAL and not any(x.startswith(NEXT) for x in hrefs): fail(f'last step: no link to next lesson {NEXT}: {hrefs}')
    if 'aria-current="step"' not in scene: fail(f'step {n}: jump list does not mark the current step')
    if 'id="lesson-step"' not in scene or 'tabindex="-1"' not in scene: fail(f'step {n}: focus target missing')
    jump = re.findall(r'<a[^>]*href="%s\?step=\d+#lesson-step"' % re.escape(PATH), scene); 
    if len(set(jump)) < TOTAL: fail(f'step {n}: jump list has {len(set(jump))} links (< {TOTAL})')
    if '?step=all' not in scene: fail(f'step {n}: no print-all link')
print(f'{TOTAL} steps each render exactly one step; headings:', ' | '.join(f'{k}:{v}' for k, v in heads.items())[:300])
# distinct content, deep link equals refresh
if len({txt(pages[n]) for n in pages}) != TOTAL: fail('some steps have identical content')
s, a = get('?step=3'); s, b = get('?step=3')
if txt(a) != txt(b): fail('refresh of ?step=3 differs')
if 'Step 1 of' not in txt(get()[1]) or 'id="step-1-h"' not in get()[1]: fail('no-param default is not step 1')
for bad in ('?step=99', '?step=abc', '?step=0'):
    if 'id="step-1-h"' not in get(bad)[1]: fail(f'{bad} did not fall back to step 1')
# print-all
s, h = get('?step=all'); sc = h[h.find('class="m4"'):h.find('<footer')]
n_all = len(re.findall(r'class="m4-step"', sc))
if n_all != TOTAL: fail(f'?step=all has {n_all} steps')
# all six doors, in their steps, with every original source link and the door body present
d = json.load(open(W + '/' + LJ))['drawers']
kinds = set()
for n in range(1, TOTAL + 1): kinds |= set(re.findall(r'data-door="([^"]+)"', pages[n]))
if len(kinds) != 6: fail(f'doors across steps: {kinds}')
urls = set()
for dr in d:
    for k, v in dr['fields']: urls |= {u.rstrip('.') for u in re.findall(r'https?://[^\s)`;·,"]+', v)}
allh = ''.join(pages.values()); miss = [u for u in urls if u not in allh and H.escape(u) not in allh]
if miss: fail('missing source links: ' + ', '.join(miss))
perstep = {n: re.findall(r'data-door="([^"]+)"', pages[n]) for n in pages if re.findall(r'data-door="([^"]+)"', pages[n])}
print(f'doors per step: {perstep}; original source URLs {len(urls)}, missing {len(miss)}')
for dr in d:
    for k, v in dr['fields']:
        if k == 'Copy':
            frag = re.sub(r'[`"*]', '', v)[:60].strip()
            if frag and frag.lower() not in txt(allh).lower(): fail(f'door {dr["id"]} copy missing')
# static policy inside the course scene
for n, h in pages.items():
    sc = h[h.find('class="m4"'):h.find('<footer')]
    if re.search(r'<audio|<video|AudioContext|<button|<input|<select|aria-pressed', sc): fail(f'step {n}: interactive/audio markup')
print('RESULT:', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
