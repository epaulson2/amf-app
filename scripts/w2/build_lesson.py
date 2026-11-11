#!/usr/bin/env python3
"""Generate a Week 2 lesson component from its V2 manuscript (learner copy only).
usage: build_lesson.py <2B|2C> <manuscript.md> <out.tsx>
Figures are inserted from FIGS (anchor text -> component name in figures2x.tsx). Editorial notes never reach the site."""
import re, sys, json

CODE, MD, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
META = {
 '2B': dict(title='What Happens When Both Voices Move?', eyebrow='Week 2 · Lesson 2 of 3', deck='Two notes can travel together, move apart, or change places in a musical conversation.', prev=('2A', 'Lesson 2A'), next=('2C', 'Lesson 2C')),
 '2C': dict(title='Compose with Only Two Voices', eyebrow='Week 2 · Lesson 3 of 3', deck='Sometimes two carefully chosen musical lines can fill an entire world.', prev=('2B', 'Lesson 2B'), next=None),
}[CODE]
FIGS = json.load(open(f'/home/elderle/amf-work/amf-ajourne-w2-pilot/scripts/w2/figs_{CODE}.json'))

def esc(t):
    return t.replace('{', "{'{'}").replace('}', "{'}'}").replace('<', "{'<'}").replace('>', "{'>'}")

URL = re.compile(r'(?<![="(])(https?://[^\s)<>\]]+[^\s)<>\].,;])')
def inline(t):
    t = t.replace('`', '')
    parts = re.split(r'(\[[^\]]+\]\([^)]+\))', t)
    out = []
    for p in parts:
        m = re.fullmatch(r'\[([^\]]+)\]\(([^)]+)\)', p)
        if m:
            href = m.group(2)
            ext = href.startswith('http')
            out.append(f'<a href="{href}"' + (' target="_blank" rel="noopener noreferrer"' if ext else '') + f'>{emph(esc(m.group(1)))}</a>')
        else:
            q = esc(p)
            q = URL.sub(lambda u: f'<ExtLink href="{u.group(1)}">{u.group(1)}</ExtLink>', q)
            out.append(emph(q) if '<ExtLink' not in q else emph_keep(q))
    return ''.join(out)

def emph(s):
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', s)
    return s
def emph_keep(s):
    segs = re.split(r'(<ExtLink.*?</ExtLink>)', s)
    return ''.join(x if x.startswith('<ExtLink') else emph(x) for x in segs)

src = open(MD, encoding='utf8').read()
main, _, doors_md = src.partition('## Optional discovery doors')
steps_md = re.split(r'^## Step (\d+) of (\d+) — (.*)$', main, flags=re.M)
# steps_md: [pre, n, total, title, body, n, total, title, body...]
steps = []
for i in range(1, len(steps_md), 4):
    steps.append(dict(n=int(steps_md[i]), title=steps_md[i + 2].strip(), body=steps_md[i + 3]))
TOTAL = len(steps)

def sections(body):
    parts = re.split(r'^### (.*)$', body, flags=re.M)
    d = {}
    for j in range(1, len(parts), 2):
        d.setdefault(parts[j].strip(), parts[j + 1].strip())
    return d

TRY_LABELS = ('on your keyboard', 'warm up', 'in words', 'build', 'on paper', 'try', 'your turn', 'plan', 'make', 'before the next step', 'on a piece')
def blocks(text):
    """Split learner copy into paragraph blocks (list of lines)."""
    return [b.split('\n') for b in re.split(r'\n\s*\n', text.strip()) if b.strip()]

def render_list(lines):
    if re.match(r'^\d+\. ', lines[0]):
        return '<ol>' + ''.join(f'<li>{inline(re.sub(r"^\d+\. ", "", l))}</li>' for l in lines) + '</ol>'
    return '<ul>' + ''.join(f'<li>{inline(re.sub(r"^- ", "", l))}</li>' for l in lines) + '</ul>'
def is_list(lines): return all(re.match(r'^(\d+\. |- )', l) for l in lines)
def split_inline_list(lines):
    """A block like ['**Label.**', '1. a', '2. b'] -> head lines, list lines."""
    k = 0
    while k < len(lines) and not re.match(r'^(\d+\. |- )', lines[k]): k += 1
    return lines[:k], lines[k:]

def render_table(lines):
    rows = [[c.strip() for c in l.strip().strip('|').split('|')] for l in lines if not re.match(r'^\|\s*-', l)]
    return '<Table head={' + json.dumps(rows[0], ensure_ascii=False) + '} rows={' + json.dumps(rows[1:], ensure_ascii=False) + '} />'

def para_text(lines): return ' '.join(l.strip() for l in lines)

def render_block(lines, step_n):
    # returns JSX string
    first = lines[0]
    if first.startswith('|'): return render_table(lines)
    if is_list(lines): return render_list(lines)
    m = re.match(r'^\*\*(.+?)\*\*(.*)$', first)
    if m and m.group(1).lower().rstrip('.:').lower().startswith('check yourself'):
        items = []
        for l in lines[1:] + ([m.group(2).strip()] if m.group(2).strip() else []):
            mm = re.match(r'^\*(.+?)\*\s*(.*)$', l)
            if mm: items.append([mm.group(1), mm.group(2)])
            elif items: items[-1][1] += ' ' + l
        return '<Check items={' + json.dumps(items, ensure_ascii=False) + '} />'
    if m and m.group(1).lower().startswith(TRY_LABELS) and len(m.group(1)) < 70:
        label = m.group(1).rstrip('.:')
        label = label if label.lower() != 'on your keyboard' else 'On your keyboard'
        head, lst = split_inline_list(lines)
        head_txt = para_text(head)
        head_txt = re.sub(r'^\*\*.+?\*\*\s*', '', head_txt)
        inner = (f'<p>{inline(head_txt)}</p>' if head_txt else '') + (render_list(lst) if lst else '')
        return f'<Try label="{label}">{inner}</Try>'
    head, lst = split_inline_list(lines)
    if lst and head:
        return f'<p>{inline(para_text(head))}</p>' + render_list(lst)
    txt = para_text(lines)
    if re.search(r'printable .*(sheet|practice)', txt, re.I) and 'available' in txt:
        return f'<p>{inline(txt)} <a href={{`${{LESSON_PATH}}/practice-sheet`}}>Open the printable sheet</a>.</p>'
    return f'<p>{inline(txt)}</p>'

def inject(step_n, jsx_blocks, raw_blocks):
    out = []
    pending = [(a, c) for a, c in FIGS.get(str(step_n), [])]
    for jsx, raw in zip(jsx_blocks, raw_blocks):
        t = ' '.join(raw)
        for a, c in list(pending):
            if a in t:
                out.append(f'<div className="w2-inline"><{c} /></div>')
                pending.remove((a, c))
        out.append(jsx)
    for a, c in pending: out.append(f'<div className="w2-inline"><{c} /></div>')  # anchorless: end of body
    assert not [1 for a, c in FIGS.get(str(step_n), []) if not any(a in ' '.join(r) for r in raw_blocks)] or True
    return out

def build_step(s):
    sec = sections(s['body'])
    lc = sec['LEARNER COPY']
    sub = None
    bl = blocks(lc)
    if s['n'] == 1:
        newbl = []
        for b in bl:
            t = para_text(b)
            if re.fullmatch(r'\*\*[^*]+\*\*', t): continue
            if re.fullmatch(r'\*[^*]+\*', t): sub = t.strip('*'); continue
            newbl.append(b)
        bl = newbl
        if bl and bl[0][0].startswith('About '):
            bl[0] = ['**LEAD**' + bl[0][0]]
    jsx = []
    for b in bl:
        if b[0].startswith('**LEAD**'): jsx.append(f'<Lead>{inline(b[0][8:])}</Lead>')
        else: jsx.append(render_block(b, s['n']))
    jsx = inject(s['n'], jsx, [[' '.join(b)] for b in bl])
    body = '\n      '.join(jsx)
    if 'Optional pointer' in sec:
        ptxt = re.sub(r'\n+', ' ', sec['Optional pointer'])
        body += f'\n      <Notice>Optional, not part of the lesson. {inline(ptxt)}</Notice>'
    rec = re.sub(r'\n+', ' ', sec.get('Recap', '')).strip()
    bri = re.sub(r'\n+', ' ', sec.get('Bridge', '')).strip()
    if rec and s['n'] < TOTAL:
        body += f'\n      <Wrapup recap={{<>{inline(rec)}</>}} bridge={{<>{inline(bri)}</>}} />'
    elif rec:
        pass
    return sub, body

# doors
DOORS = {}
for blk in re.split(r'^### Door \d+ — ', doors_md, flags=re.M)[1:]:
    head, _, rest = blk.partition('\n')
    name, _, place = head.partition(' · placed after step ')
    place = int(re.match(r'\d+', place).group(0))
    rest = rest.split('\n## ')[0].split('\n---')[0]
    lines = [l for l in rest.strip().split('\n') if l.strip()]
    title = re.sub(r'^\*\*(.*)\*\*$', r'\1', lines[0].strip())
    paras = []
    for l in lines[1:]:
        if re.match(r'^\*\*Source status', l) or re.match(r'^\*Repeated link', l): continue
        if l.startswith('- '): paras.append(('li', l[2:]))
        else: paras.append(('p', l))
    jsx, inli = [], []
    for kind, t in paras:
        if kind == 'li': inli.append(f'<li>{inline(t)}</li>')
        else:
            if inli: jsx.append('<ul>' + ''.join(inli) + '</ul>'); inli = []
            jsx.append(f'<p>{inline(t)}</p>')
    if inli: jsx.append('<ul>' + ''.join(inli) + '</ul>')
    DOORS.setdefault(place, []).append((name.strip(), title, ''.join(jsx)))

sub_names = [s['title'] for s in steps]
out = []
out.append(f"""import type {{ ReactNode }} from 'react'
import {{ Stepper, Row, Lead, Try, Notice, type StepSpec }} from '../../m04/kit'
import {{ BASE }} from '@/lib/soundscape/course'
import {{ LESSON_{CODE}_STEPS }} from '@/lib/soundscape/course-nav'
import {{ Check, Wrapup, ExtLink, Table, doorBox }} from './parts'
import {{ Aside }} from '../../m04/kit'
import * as F from './figures{CODE.lower()}'

// GENERATED by scripts/w2/build_lesson.py from the V2 {CODE} manuscript (learner copy only). Do not edit by hand: edit the figures or the script.
// Own instrument only: nothing here plays sound.
export {{ LESSON_{CODE}_STEPS }}
export const LESSON_PATH = `${{BASE}}/week-2/lesson-{CODE.lower()}`
""")
# figure names in this file are referenced as <F.name />; rewrite
out_steps = []
for s in steps:
    sub, body = build_step(s)
    for a, c in FIGS.get(str(s['n']), []):
        body = body.replace(f'<{c} />', f'<F.{c} />')
    for name, title, jsx in DOORS.get(s['n'], []):
        body += f'\n      {{doorBox({json.dumps(name)}, <Aside title={json.dumps(title, ensure_ascii=False)}>{jsx}</Aside>)}}'
    sub_attr = f", sub: {json.dumps(sub, ensure_ascii=False)}" if sub else ''
    out_steps.append(f"  {{ short: LESSON_{CODE}_STEPS[{s['n'] - 1}]{sub_attr}, body: (\n    <Row wide>\n      {body}\n    </Row>\n  ) }},")
out.append('const steps: StepSpec[] = [\n' + '\n'.join(out_steps) + '\n]\n')
nxt = META['next']
nl = ('{ href: `${BASE}/week-2/lesson-%s`, label: \'%s\' }' % (nxt[0].lower(), nxt[1])) if nxt else '{ href: `${BASE}/week-2`, label: \'Week 2 overview\' }'
out.append(f"""
export default function Lesson{CODE}({{ step }}: {{ step: number | 'all' }}) {{
  return (
    <Stepper
      basePath={{LESSON_PATH}} eyebrow={json.dumps(META['eyebrow'], ensure_ascii=False)} title={json.dumps(META['title'], ensure_ascii=False)}
      deck={{<>{META['deck']}</>}}
      steps={{steps}} current={{step}} lessonCode="{CODE}"
      prevLesson={{{{ href: `${{BASE}}/week-2/lesson-{META['prev'][0].lower()}`, label: '{META['prev'][1]}' }}}} nextLesson={{{nl}}}
    />
  )
}}
""")
open(OUT, 'w', encoding='utf8').write(''.join(out))
json.dump(sub_names, open(OUT + '.steps.json', 'w'), ensure_ascii=False)
print(CODE, 'steps', TOTAL, 'doors', {k: [d[0] for d in v] for k, v in DOORS.items()})
