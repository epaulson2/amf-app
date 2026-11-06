#!/usr/bin/env python3
"""Information-first review pages. Plain HTML/CSS, no script, no audio. The native SVG is the figure; art is only a slim, decorative, aria-hidden accent."""
import json, html, os
W = '/home/elderle/amf-work/amf-ajourne-m05/'; P = W + 'public/soundscape/m05/sheets/'
D = json.load(open(W + 'lib/soundscape/resources/interval-data.json'))['cards']
AT = json.load(open(W + 'lib/soundscape/resources/atlas.json'))
TOK = json.load(open(W + 'docs/m05/identity_tokens_v1.json'))['colors']
R = json.load(open(W + 'docs/m05/info_registry.json'))
SECT = ['Meet the interval', 'As a moving melody', 'Two notes together', 'In actual music', 'Listen and create', 'Paint What You Hear', 'Keep in mind']
strip = lambda n: ''.join(ch for ch in n if not ch.isdigit())
CSS = """*{box-sizing:border-box}body{margin:0;background:#f9f5ed;color:#5c465b;font:17px/1.6 Georgia,'Times New Roman',serif}main{max-width:1000px;margin:0 auto;padding:22px clamp(14px,4vw,36px) 60px}
h1{font-weight:400;font-size:clamp(26px,5vw,40px);line-height:1.1;color:#4c2748;margin:.2em 0 .1em}h2{font-weight:400;color:#4c2748;font-size:23px;margin:0 0 4px}.eyebrow{font:700 11px ui-sans-serif,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a3778f;margin:0}
.item{margin:34px 0;padding-top:20px;border-top:1px solid #e6dccb}.meta{font:12.5px ui-sans-serif,system-ui,sans-serif;color:#786a75;margin:0 0 8px}.lede{max-width:64ch}
.fig{max-width:760px;margin:10px 0}.fig img{display:block;width:100%;height:auto}.fig img.nar{display:none}@media(max-width:620px){.fig img.wide{display:none!important}.fig img.nar{display:block}}
.accent{display:block;max-height:84px;width:auto;max-width:100%;opacity:.55;margin:0 0 6px;border-radius:8px}
.how{font:15.5px/1.55 ui-sans-serif,system-ui,sans-serif;color:#4a3a4a;max-width:70ch}.how b{color:#6d326e}.guard{font:13px/1.5 ui-sans-serif,system-ui,sans-serif;color:#786a75;border-left:3px solid #e9ae7c;padding:2px 10px;margin:10px 0;max-width:70ch}
details{font:14px/1.55 ui-sans-serif,system-ui,sans-serif;color:#4a3a4a;margin-top:10px;max-width:70ch}summary{cursor:pointer;color:#6d326e}details h3{font:700 11.5px ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a3778f;margin:14px 0 2px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px}.card{background:rgba(255,250,243,.7);border:1px solid #eadfcf;border-radius:14px;padding:8px}.card img{width:100%;height:auto;display:block}
nav.sheets{font:14px ui-sans-serif,system-ui,sans-serif;margin:6px 0 16px}nav.sheets a{margin-right:14px;color:#6d326e}.sw{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;vertical-align:-1px}
table.tok{border-collapse:collapse;font:13px ui-sans-serif,system-ui,sans-serif}table.tok td,table.tok th{border-bottom:1px solid #e6dccb;padding:4px 10px;text-align:left}@media print{.accent{display:none}}"""
NAV = '<nav class="sheets"><a href="info-proofs.html">Three proofs</a><a href="info-intervals.html">13 intervals</a><a href="info-cards.html">Cards, one page, chart</a><a href="info-compare.html">Comparisons and intro</a><a href="info-tokens.html">Colour tokens</a></nav>'
def page(name, title, body, lede=''):
    open(P + name, 'w').write(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} · Interval Palette information-first</title><style>{CSS}</style></head><body><main><p class="eyebrow">Ajourné Interval Palette · M05 information-first remediation</p><h1>{html.escape(title)}</h1>{NAV}<p class="lede">{lede}</p>{body}</main></body></html>\n')
def fig(base, alt):
    n = f'../info/{base}-narrow.svg' if f'{base}-narrow' in R else None
    w = f'<img class="wide" src="../info/{base}.svg" alt="{html.escape(alt)}">' if n else f'<img src="../info/{base}.svg" alt="{html.escape(alt)}">'
    if n: w += f'<img class="nar" src="{n}" alt="{html.escape(alt)}">'
    return f'<div class="fig">{w}</div>'
def alt(i): return R[i]['desc']
# ---- proofs
pr = ''
for i, t, how, own in [
 ('IPF-proof-A-m3-M3', 'Proof A · minor third versus major third',
  'Read the keyboard first: C4 is the shared root (plum, stays). The upper note is E♭4 for the minor third (violet) and E4 for the major third (amber): one key apart, so 3 semitones become 4, shown as +1. Then the table: root, shape and shadow are the same; the upper note, the count and the Plogger fill change. The Plogger marks are a historic lens, not a rule about how either interval must sound.',
  'Play C then E♭, then C then E, one after another and then together. Count the keys between C and each upper note out loud. Notice only the third note moved.'),
 ('IPF-proof-B-p4-tt-p5', 'Proof B · perfect fourth, tritone, perfect fifth',
  'Three upper notes sit on three neighbouring keys above C4: F (5), F♯ or G♭ (6) and G (7). The tritone is one key, written two ways: F♯ makes C to F♯ an augmented fourth, G♭ makes C to G♭ a diminished fifth. All three share the printed original\'s straight, perfect-group outline; the shadow arrow changes ←, ↔, → and the fill changes dark, midtone, light. Older code disagrees about [6]; this lens follows the printed original and says so.',
  'Play C with F, with F♯, with G. Say the count for each (5, 6, 7). Then find G♭ on your keyboard and confirm it is the same key as F♯.'),
 ('IPF-proof-C-map', 'Proof C · thirteen-landmark keyboard map',
  'Every pitch from C4 to C5 is marked with its own fixed identity colour and name. Beneath it, an exact ruler gives 0 to 12 semitones, and each interval carries its Plogger [n] chip; 0 and 12 read N/A because the original has no di-chord there. C4 to B4 is 11 semitones; B4 to C5 is a separate step of 1.',
  'Pick any interval on the ruler. Find C on your keyboard, count that many keys, and check the note name matches the callout.')]:
    pr += f'<section class="item" id="{i}"><p class="eyebrow">{i}</p><h2>{t}</h2><p class="meta">native: {i}.svg (+ print, + phone layout) · source: interval-data.json + interval-identity.ts v1.0</p>{fig(i, alt(i))}<p class="how"><b>How to read it.</b> {how}</p><p class="how"><b>On your own keyboard.</b> {own}</p><p class="guard">Colours are artistic identifiers. Plogger shape, shadow and fill are a historic teaching lens. Neither is acoustic fact.</p></section>'
page('info-proofs.html', 'Three teaching proofs', pr, 'Each figure answers “what stayed, what changed” from the picture itself: exact keys, exact semitones, one table.')
# ---- 13 intervals
G = {0: 'Same pitch, same register. Voices may still differ in timbre.', 12: 'The same letter name an octave higher: 12 semitones. Notes an octave apart share a letter name, not a pitch.'}
body = ''
for c in D:
    n = c['semitones']; nn = f'{n:02d}'; ch = AT['chapters'][n]; up = strip(c['sourceUpper']['name']); hexv = TOK[c['id']]['hex']
    how = ('One key is highlighted because both notes are C4. Melodic: the same note twice in a row. Harmonic: one note doubled. Distance: zero keys. Plogger is N/A at the boundary.' if n == 0 else
           f'Find C4 and count {n} keys up (white and black) to {c["sourceUpper"]["name"]}. The numbered arcs are those hops. The two time strips show the same two notes one after another (melodic) and together (harmonic). The three Plogger marks are a secondary historic lens' + ('; at the octave they are N/A.' if n == 12 else '.'))
    own = ('Play C, then C again, then two Cs together (use both hands or two octaves of C if you like).' if n == 0 else f'Play C4, then {up}{"5" if n == 12 else "4"}, one after another, then together. Count the keys yourself, then notice what you hear without judging it good or bad.')
    full = ''.join(f'<h3>{s}</h3><p>{html.escape(ch[s])}</p>' for s in SECT) + f'<h3>Actions</h3><p>{html.escape(ch["actions"])}</p>'
    body += (f'<section class="item" id="IPV-{10+n}"><p class="eyebrow">IPV-{10+n} · source {c["id"]} · identity {hexv}</p><h2>{html.escape(c["intervalName"])} ({c["abbreviation"]})</h2>'
             f'<p class="meta">native: IPF-sheet-{nn}.svg (+ print, + phone) · accent art: IPV-03-chapter-{10+n} (decorative)</p>'
             f'<img class="accent" src="../derived/IPV-03-chapter-{10+n}.webp" alt="" aria-hidden="true">{fig(f"IPF-sheet-{nn}", alt(f"IPF-sheet-{nn}"))}'
             f'<p class="how"><b>How to read it.</b> {how}</p><p class="how"><b>On your own keyboard.</b> {own}</p>' + (f'<p class="guard">{G[n]}</p>' if n in G else '') +
             f'<details><summary>Full source-authored chapter text (retained unchanged)</summary>{full}</details></section>')
page('info-intervals.html', 'The thirteen interval sheets', body, 'IPV-10…IPV-22 map one-to-one to source IP-00…IP-12 (IPV-10 = IP-00). Same sheet grammar every time: identity, exact keys, melodic vs harmonic, Plogger lens, neighbours.')
# ---- cards / one page / chart
cards = ''.join(f'<div class="card"><img src="../info/IPF-card-{c["semitones"]:02d}.svg" alt="{html.escape(R[f"IPF-card-{c["semitones"]:02d}"]["desc"])}"></div>' for c in D)
cb = f'<section class="item"><p class="eyebrow">13 compact cards</p><h2>Card gallery</h2><div class="grid">{cards}</div></section>'
cb += f'<section class="item"><p class="eyebrow">IPF-onepage</p><h2>One-page sheet (print-ready)</h2><p class="meta">print variant: IPF-onepage.print.svg</p>{fig("IPF-onepage", alt("IPF-onepage"))}</section>'
cb += f'<section class="item"><p class="eyebrow">IPF-plogger-chart</p><h2>All eleven historic glyphs, with N/A boundaries</h2>{fig("IPF-plogger-chart", alt("IPF-plogger-chart"))}</section>'
page('info-cards.html', 'Cards, one-page sheet and Plogger chart', cb, 'Compact cards carry identity stripe, exact pair, mini keyboard and three legible Plogger marks.')
# ---- comparisons
cm = ''
for i, t, tag in [('IPF-compare-m2-M2', 'Minor second versus major second', 'IPV-23'), ('IPF-compare-m6-M6', 'Minor sixth versus major sixth', 'IPV-26'), ('IPF-compare-m7-M7', 'Minor seventh versus major seventh', 'IPV-27'), ('IPF-invert', 'Inversion', 'IPV-29'), ('IPF-register', 'Same interval, three registers', 'IPV-28'), ('IPF-intro-04', 'What is an interval?', 'IPV-04'), ('IPF-intro-05', 'Melodic versus harmonic', 'IPV-05')]:
    cm += f'<section class="item" id="{i}"><p class="eyebrow">{tag} · {i}</p><h2>{t}</h2>{fig(i, alt(i))}</section>'
page('info-compare.html', 'Comparisons, inversion, register and introductory figures', cm, 'The m3/M3 and P4/tritone/P5 comparisons are on the proofs page. Naming-by-letters (IPV-34) and the triad figure (IPV-35) are unchanged from the earlier gallery: they teach spelling and chords, not interval identity.')
# ---- tokens
rows = ''.join(f'<tr><td><span class="sw" style="background:{TOK[c["id"]]["hex"]}"></span>{c["id"]}</td><td>{html.escape(c["intervalName"])}</td><td>{c["semitones"]}</td><td>{TOK[c["id"]]["hex"]}</td><td>{TOK[c["id"]]["accent"]}</td><td>{TOK[c["id"]]["previousHex"]}</td></tr>' for c in D)
con = json.load(open(W + 'docs/m05/contrast_report.json')) if os.path.exists(W + 'docs/m05/contrast_report.json') else None
ct = ''
if con: ct = '<table class="tok"><tr><th>id</th><th>accent on paper</th><th>label ink on tint(.34)</th><th>label ink on tint(.22)</th></tr>' + ''.join(f'<tr><td>{k}</td><td>{v["accent_on_paper"]}:1</td><td>{v["ink_on_key_tint"]}:1</td><td>{v["ink_on_pill_tint"]}:1</td></tr>' for k, v in con['per_interval'].items()) + '</table>'
page('info-tokens.html', 'Identity colour tokens v1.0', f'<section class="item"><p class="eyebrow">single source: lib/soundscape/resources/interval-identity.ts</p><table class="tok"><tr><th>source</th><th>interval</th><th>semitones</th><th>v1.0 hex</th><th>accent</th><th>earlier candidate</th></tr>{rows}</table></section><section class="item"><h2>Contrast</h2>{ct}</section>', 'One versioned token set. The earlier candidate hexes remain in interval-data.json, untouched.')
print('info pages written')
