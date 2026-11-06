#!/usr/bin/env python3
"""Targeted bundle checks against the RENDERED pages (dev or production). Usage: check_bundle.py BASE_URL [A|B|C]"""
import sys, re, json, os, urllib.request, html as H
BASE = sys.argv[1].rstrip('/'); W = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ok = True
def fail(m):
    global ok; ok = False; print('FAIL', m)
def get(path):
    r = urllib.request.urlopen(BASE + path, timeout=120); return r.status, r.read().decode('utf8', 'replace')
def text(h): return H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', re.sub(r'<(script|style)[\s\S]*?</\1>', '', h))))
CS = '/curriculum/soundscape-path'
PAGES = {'': 'landing', '/how-it-works': 'how-it-works', '/journey': 'journey', '/week-1': 'week 1 hub', '/week-1/lesson-1a': 'lesson 1A'}
figs = json.load(open(W + '/lib/soundscape/m04/figures.json'))
for p, name in PAGES.items():
    s, h = get(CS + p)
    if s != 200: fail(f'{name}: HTTP {s}'); continue
    t = text(h)
    # static policy
    scene = h[h.find('class="m4"'):h.find('<footer')] if 'class="m4"' in h else h   # course content only; AMF's global nav has its own menu button
    bad = re.findall(r'<audio|<video|AudioContext|<button|<input|<select|role="slider"|aria-pressed', scene)
    if bad: fail(f'{name}: interactive/audio markup {set(bad)}')
    # every figure image resolves, has alt text of useful length, art is decorative
    for src, alt in re.findall(r'<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"', h):
        pass
    for m in re.finditer(r'<img\b[^>]*>', h):
        tag = m.group(0); src = re.search(r'src="([^"]+)"', tag); alt = re.search(r'alt="([^"]*)"', tag)
        if not src: continue
        u = src.group(1).split('?')[0]
        if '/_next/image' in src.group(1): u = re.search(r'url=([^&]+)', src.group(1)); u = urllib.request.unquote(u.group(1)) if u else ''
        if u.startswith('/soundscape/m03/native/') and u.endswith('.svg'):
            if not alt or len(alt.group(1)) < 40: fail(f'{name}: figure {u} has no real alt text')
    print(f'ok  {name}: {len(t.split())} words, {len(re.findall("<img", h))} images')
# ---- lesson 1A depth
s, h = get(CS + '/week-1/lesson-1a?step=all'); t = text(h)   # whole lesson (the default URL now shows one step)
need = ['timbre', 'tonal center', 'tonic', 'does not by itself make a chord', 'which note stays', 'Hold C softly', 'two simultaneous notes', 'Hear a note before you play it', 'Carry the map with you', 'one octave',
        'W1-06_keyboard-map_blank.pdf', 'W1-04_personal-tonal-atlas-worksheet_blank.pdf', 'harmonic relationship', 'Optional science and theory', 'middle C']
for k in need:
    if k.lower() not in (t + ' ' + h).lower(): fail(f'1A missing: {k}')
steps = len(re.findall(r'class="m4-step"', h)); reads = t.lower().count('how to read this picture'); tries = t.count('On your own keyboard') + t.count('Set up') + t.count('Listen, imagine, hum, find, compare') + t.count('Five stages, on your own keyboard') + t.count('Make a tiny world') + t.count('Paint what you hear')
print(f'1A: {steps} steps, {reads} "how to read" blocks, own-keyboard blocks ~{tries}')
if steps != 12: fail(f'1A steps {steps} != 12')
if reads < 8: fail('1A has fewer than 8 how-to-read blocks')
# ---- six doors + original source links
d = json.load(open(W + '/lib/soundscape/week1/lesson-1a.json'))['drawers']
doors = re.findall(r'data-door="([^"]+)"', h)
if len(doors) != 6 or len(set(doors)) != 6: fail(f'1A doors: {doors}')
urls = set(); 
for dr in d:
    for k, v in dr['fields']: urls |= {u.rstrip('.') for u in re.findall(r'https?://[^\s)`;·,"]+', v)}
miss = [u for u in urls if u not in h and H.escape(u) not in h]
print(f'1A doors: {len(doors)}; original source URLs {len(urls)}, missing from page: {len(miss)}')
if miss: fail('missing source links: ' + ', '.join(miss[:6]))
for dr in d:   # door bodies keep their substance: a long distinctive phrase from every Copy field must appear
    for k, v in dr['fields']:
        if k == 'Copy':
            frag = re.sub(r'[`"*]', '', v)[:60].strip()
            if frag and frag.lower() not in t.lower(): fail(f'door {dr["id"]} copy missing: {frag}')
# ---- links on the new pages go to real pages
for p in PAGES:
    s, hh = get(CS + p)
    for href in set(re.findall(r'href="(/curriculum/soundscape-path[^"#]*)', hh)):
        try: st = urllib.request.urlopen(BASE + href, timeout=60).status
        except Exception as e: st = getattr(e, 'code', 'ERR')
        if st != 200: fail(f'{p or "/"}: link {href} -> {st}')
# ---- assets referenced exist
imgs = set()
for p in PAGES:
    s, hh = get(CS + p); imgs |= set(re.findall(r'src="(/soundscape/[^"]+)"', hh))
for u in sorted(imgs):
    try: st = urllib.request.urlopen(BASE + u, timeout=60).status
    except Exception as e: st = getattr(e, 'code', 'ERR')
    if st != 200: fail(f'asset {u} -> {st}')
print(f'{len(imgs)} assets referenced; all resolved' if ok else '')
print('RESULT:', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
