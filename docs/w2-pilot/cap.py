"""Targeted browser gate for the production Week 2 Lesson 2A. Usage: python cap.py BASE_URL OUT_DIR
Records separate fields (mediaElements, buttons, audioScripts) and exits 1 if any gate fails."""
import json, sys
from playwright.sync_api import sync_playwright
B = sys.argv[1].rstrip('/') + '/curriculum/soundscape-path/week-2/lesson-2a'
O = sys.argv[2].rstrip('/') + '/'
SPOIL = {2: ['major third', 'minor third', 'perfect fourth', 'major second', 'semitone'], 3: ['major third', 'minor third', 'perfect fourth', 'major second'], 4: ['major third', 'minor third', 'perfect fourth', 'major second'], 5: ['major second', 'perfect fourth of', 'c4 to f4 is a perfect', 'b3', 'five semitones'], 6: ['major second']}
JS = """()=>{
 const q=s=>[...document.querySelectorAll(s)];
 const scope=document.querySelector('.m4-step')||document.querySelector('.w2-sheet')||document.body;
 const top=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null;
 return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight,
  mediaElements:q('audio,video,iframe,embed,object,source[type^=audio],source[type^=video]').length,
  buttons:q('button,[role=button]').length,
  audioScripts:q('script[src]').filter(s=>/audio|tone|howler|sound/i.test(s.src)).length,
  audioCtrl:q('[class*=ClipButton],[data-clip],[aria-label*=Play i],[aria-label*=Replay i]').length,
  words:scope.innerText.split(/\\s+/).length,
  svgs:q('svg.w2-svg').map(s=>({w:Math.round(s.getBoundingClientRect().width),t:!!s.querySelector('title'),d:!!s.querySelector('desc')})),
  firstSvgTop:top(document.querySelector('.m4-step svg.w2-svg')),firstTryTop:top(document.querySelector('.m4-try')),recapTop:top(q('.m4-reading').find(e=>/^recap/i.test(e.innerText))),
  text:(scope.innerText+' '+q('svg.w2-svg title,svg.w2-svg desc').map(x=>x.textContent).join(' ')).toLowerCase()}}"""
DOORS = {6: 1, 7: 1, 8: 2, 9: 2}
res, fails = [], []
with sync_playwright() as p:
    br = p.chromium.launch()
    for w, h in [(320, 700), (390, 800), (1280, 900)]:
        pg = br.new_context(viewport={'width': w, 'height': h}).new_page()
        pages = [(f'?step={s}', s) for s in range(1, 11)] + [('/practice-sheet', 'sheet')]
        for q, s in pages:
            pg.goto(B + q, wait_until='networkidle')
            r = pg.evaluate(JS); txt = r.pop('text'); r.update(w=w, step=s)
            if r['sw'] > r['cw']: fails.append(f'{w} {s} overflow')
            if r['mediaElements'] or r['audioScripts'] or r['audioCtrl']: fails.append(f'{w} {s} audio/media present')
            if not all(x['t'] and x['d'] for x in r['svgs']): fails.append(f'{w} {s} svg missing title/desc')
            if isinstance(s, int):
                if r['words'] > 600: fails.append(f'{w} {s} >600 words')
                for term in SPOIL.get(s, []):
                    if term in txt: fails.append(f'{w} {s} spoiler "{term}"')
                if r['firstSvgTop'] is not None and r['firstTryTop'] is not None and r['firstSvgTop'] > r['firstTryTop']: fails.append(f'{w} {s} diagram after exercise')
                if r['firstSvgTop'] is not None and r['recapTop'] is not None and r['firstSvgTop'] > r['recapTop']: fails.append(f'{w} {s} diagram after recap')
            if isinstance(s, int):
                nd = pg.locator('.m4-stepdoors details').count()
                if nd != DOORS.get(s, 0): fails.append(f'{w} {s} doors {nd} != {DOORS.get(s, 0)}')
                nxt = pg.locator('.m4-step .m4-nav a.is-primary').first.get_attribute('href')
                want = f'?step={s + 1}' if s < 10 else '/lesson-2b'
                if want not in (nxt or ''): fails.append(f'{w} {s} next link {nxt}')
                r['doors'] = nd; r['next'] = nxt
            res.append(r)
            if (isinstance(s, int) and s in (2, 4, 5, 7)) or s == 'sheet': pg.screenshot(path=f'{O}shots/s{s}_{w}.png', full_page=True)
    br.close()
json.dump(res, open(O + 'metrics.json', 'w'), indent=1)
print('pages', len(res), 'mediaElements total', sum(r['mediaElements'] for r in res), 'buttons total', sum(r['buttons'] for r in res))
print('FAILS:', fails or 'none'); sys.exit(1 if fails else 0)
