#!/usr/bin/env python3
"""Course navigation + How We Learn editorial checks on RENDERED pages. Usage: check_nav.py BASE_URL"""
import sys, re, urllib.request, html as H
BASE = sys.argv[1].rstrip('/'); CS = '/curriculum/soundscape-path'; ok = True
def fail(m):
    global ok; ok = False; print('FAIL', m)
def get(p):
    r = urllib.request.urlopen(BASE + p, timeout=120); return r.read().decode('utf8', 'replace')
def scene(h): return h[h.find('class="m4"'):h.find('<footer')]
def crumb(h):
    m = re.search(r'<nav aria-label="Course navigation"[^>]*>(.*?)</nav>', h, re.S); return m.group(1) if m else ''
def links(frag): return [(H.unescape(re.sub('<[^>]+>', '', t)).strip().lstrip('←→ ').strip(), H.unescape(u)) for u, t in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', frag, re.S)]
def ret(h):
    m = re.search(r'<nav aria-label="Return to the course"[^>]*>(.*?)</nav>', h, re.S); return links(m.group(1)) if m else []
# ---- pages: (path, expected breadcrumb labels, links that must be in the top nav, links that must be in the bottom return nav)
PAGES = [
  ('', ['Ajourné Home'], [('How we learn', CS + '/how-it-works'), ('The journey', CS + '/journey'), ('Week 1', CS + '/week-1')], [('Week 1', CS + '/week-1')]),
  ('/how-it-works', ['Ajourné Home', 'How We Learn'], [('Ajourné Home', CS)], [('Ajourné Home', CS), ('Week 1', CS + '/week-1')]),
  ('/journey', ['Ajourné Home', 'The Journey'], [('Ajourné Home', CS)], [('Ajourné Home', CS), ('Week 1', CS + '/week-1')]),
  ('/week-1', ['Ajourné Home', 'Week 1'], [('Ajourné Home', CS)], [('Ajourné Home', CS)]),
]
for code, total in (('1A', 12), ('1B', 9), ('1C', 9)):
    for n in (1, 2, total):
        PAGES.append((f'/week-1/lesson-{code.lower()}?step={n}', ['Ajourné Home', 'Week 1', f'Lesson {code}', f'Step {n} of {total}'],
                      [('Ajourné Home', CS), ('Week 1', CS + '/week-1'), ('Back to Week 1', CS + '/week-1')], [('Ajourné Home', CS), ('Back to Week 1', CS + '/week-1')]))
for path, labels, top_need, bottom_need in PAGES:
    h = get(CS + path); c = crumb(h); lab = [H.unescape(re.sub('<[^>]+>', '', x)).strip() for x in re.findall(r'<li[^>]*>(.*?)</li>', c, re.S)]
    if lab != labels: fail(f'{path or "/"}: breadcrumb {lab} != {labels}')
    top = links(c)
    for need in top_need:
        if need not in top and not any(l == need[0] and u.startswith(need[1]) for l, u in top): fail(f'{path or "/"}: top nav missing {need} (has {top})')
    r = ret(h)
    for need in bottom_need:
        if not any(l == need[0] and u == need[1] for l, u in r): fail(f'{path or "/"}: bottom return nav missing {need} (has {r})')
    if '?step=' in path and path.endswith('step=1'):
        s1 = re.search(r'aria-label="Step 1 navigation"[^>]*>(.*?)</nav>', scene(h), re.S).group(1)
        if (CS + '/week-1') not in [u for _, u in links(s1)]: fail(f'{path}: Step 1 Previous does not return to the Week 1 hub')
print(f'navigation checked on {len(PAGES)} pages')
# ---- How We Learn: philosophy headings present, developer language absent
h = get(CS + '/how-it-works'); t = H.unescape(re.sub(r'<[^>]+>', ' ', scene(h))); tl = re.sub(r'\s+', ' ', t).lower()
for need in ['Discover music by understanding', 'Your ear, your imagination and your hands learn together', 'Learn one relationship. Discover what it can become.', 'without mistaking the map for the territory',
             'Become a musician who can notice', 'Music is bigger than any one set of notes', 'Your own little musical world begins with one note', 'six optional doors', 'What you’ll need']:
    if need.lower() not in tl: fail(f'How We Learn missing: {need}')
words = len(t.split()); print(f'How We Learn: {words} words')
if words < 800: fail('How We Learn is too thin')
banned = ['never makes a sound', 'no play button', 'no virtual keyboard', 'does not play music', 'technically static', 'screen reader', 'print-friendly', 'no audio', 'never plays', 'we don’t score', 'does not include a virtual', 'makes no sound', 'nothing is scored']
for p in PAGES[:4]:
    tt = re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', scene(get(CS + p[0]))))).lower()
    for b in banned:
        if b in tt and not (b == 'print-friendly'): fail(f'{p[0] or "/"} contains developer-style phrase: "{b}"')
print('RESULT:', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
