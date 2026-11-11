"""Targeted browser gate for Week 2 lessons. Usage: python cap_lesson.py BASE_URL OUT_DIR 2a|2b|2c
Per lesson: every step at 320/390/1280 px; media/audio, overflow, SVG title+desc, spoiler terms, doors per step, diagram before
exercise/recap, next link; plus the practice sheet in screen and print media (PDF page count). Exits 1 on any failure."""
import json, sys
from playwright.sync_api import sync_playwright
BASE, OUT, L = sys.argv[1].rstrip('/'), sys.argv[2].rstrip('/') + '/', sys.argv[3]
R = f'{BASE}/curriculum/soundscape-path/week-2/lesson-{L}'
STEPS = {'2a': 10, '2b': 11, '2c': 10}[L]
DOORS = {'2a': {6: 1, 7: 1, 8: 2, 9: 2}, '2b': {4: 1, 5: 1, 8: 2, 9: 1, 10: 1}, '2c': {2: 1, 5: 1, 8: 1, 9: 3}}[L]
IV = ['major third', 'minor third', 'perfect fourth', 'major second', 'diminished fifth', 'tritone', 'six semitones']
SPOIL = {
 '2a': {2: IV + ['semitone'], 3: IV, 4: IV, 5: ['major second', 'perfect fourth of']},
 '2b': {2: ['contrary', 'similar', 'diminished', 'tritone', 'minor third', 'six semitones', 'oblique'], 3: ['contrary', 'similar', 'diminished', 'tritone', 'minor third', 'six semitones', 'oblique'], 4: ['diminished', 'tritone', 'six semitones']},
 '2c': {2: ['diminished', 'tritone', 'version b'], 3: ['diminished', 'tritone', 'b3', 'version b']},
}[L]
JS = """()=>{
 const q=s=>[...document.querySelectorAll(s)];
 const scope=document.querySelector('.m4-step')||document.querySelector('.w2-sheet')||document.body;
 const top=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null;
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
 return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
  mediaElements:q('audio,video,iframe,embed,object,source[type^=audio],source[type^=video]').length,
  buttons:q('button,[role=button]').length,
  audioScripts:q('script[src]').filter(s=>/audio|tone|howler|sound/i.test(s.src)).length,
  audioCtrl:q('[class*=ClipButton],[data-clip],[aria-label*=Play i],[aria-label*=Replay i],[aria-label*=Hear i]').length,
  words:scope.innerText.split(/\\s+/).length,
  svgs:q('svg.w2-svg').map(s=>({w:Math.round(s.getBoundingClientRect().width),t:!!s.querySelector('title'),d:!!s.querySelector('desc')})),
  firstSvgTop:top(document.querySelector('.m4-step svg.w2-svg, .m4-step .w2-vocab')),firstTryTop:top(document.querySelector('.m4-try')),
  recapTop:top(q('.m4-reading').find(e=>/^recap/i.test(e.innerText))),
  h1:(document.querySelector('.m4-step h2')||{}).innerText||'',
  text:(((()=>{const c=scope.cloneNode(true);c.querySelectorAll('.m4-nav').forEach(n=>n.remove());return c.textContent})())+' '+q('svg.w2-svg title,svg.w2-svg desc').map(x=>x.textContent).join(' ')).toLowerCase()}}"""
FIG_STEPS = {'2a': [2, 4, 5, 7], '2b': [2, 3, 4, 5, 6, 8, 10], '2c': [3, 4, 6]}
res, fails, warns = [], [], []
with sync_playwright() as p:
    br = p.chromium.launch()
    for w, h in [(320, 700), (390, 800), (1280, 900)]:
        ctx = br.new_context(viewport={'width': w, 'height': h}); pg = ctx.new_page()
        for s in list(range(1, STEPS + 1)) + ['sheet']:
            pg.goto(R + (f'?step={s}' if s != 'sheet' else '/practice-sheet'), wait_until='networkidle')
            r = pg.evaluate(JS); txt = r.pop('text'); r.update(w=w, step=s, lesson=L)
            tag = f'{L} {w} {s}'
            if r['sw'] > r['cw']: fails.append(f'{tag} overflow')
            if r['mediaElements'] or r['audioScripts'] or r['audioCtrl']: fails.append(f'{tag} audio/media present')
            if not all(x['t'] and x['d'] for x in r['svgs']): fails.append(f'{tag} svg missing title/desc')
            if isinstance(s, int):
                if r['words'] > 600: warns.append(f'{tag} {r["words"]} words (V2 copy)')
                for term in SPOIL.get(s, []):
                    if term in txt: fails.append(f'{tag} spoiler "{term}"')
                if r['firstSvgTop'] is not None and r['firstTryTop'] is not None and r['firstSvgTop'] > r['firstTryTop']: fails.append(f'{tag} diagram after exercise')
                if r['firstSvgTop'] is not None and r['recapTop'] is not None and r['firstSvgTop'] > r['recapTop']: fails.append(f'{tag} diagram after recap')
                nd = pg.locator('.m4-stepdoors details').count()
                if nd != DOORS.get(s, 0): fails.append(f'{tag} doors {nd} != {DOORS.get(s, 0)}')
                nxt = pg.locator('.m4-step .m4-nav a.is-primary').first.get_attribute('href') or ''
                want = f'?step={s + 1}' if s < STEPS else ('/lesson-2' + chr(ord(L[1]) + 1) if L != '2c' else '/week-2')
                if want not in nxt: fails.append(f'{tag} next link {nxt}')
                r['doors'] = nd
            else:
                pg.emulate_media(media='print')
                hid = pg.evaluate("()=>[...document.querySelectorAll('header,footer,nav,.noprint')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}).length")
                if hid: fails.append(f'{tag} {hid} chrome elements visible in print')
                if w == 1280:
                    pg.pdf(path=f'{OUT}sheet_{L}.pdf', format='Letter')
                pg.emulate_media(media='screen')
            res.append(r)
            if w in (320, 390, 1280) and (s == 'sheet' or s in FIG_STEPS.get(L, [])): pg.screenshot(path=f'{OUT}shots/{L}_s{s}_{w}.png', full_page=True)
    br.close()
json.dump(res, open(f'{OUT}metrics_{L}.json', 'w'), indent=1)
print(L, 'pages', len(res), 'mediaElements', sum(r['mediaElements'] for r in res), 'buttons', sum(r['buttons'] for r in res))
print('WARN:', warns or 'none'); print('FAILS:', fails or 'none'); sys.exit(1 if fails else 0)
