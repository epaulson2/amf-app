"""Batch 2 artwork gate. Usage: python cap_batch2.py BASE_URL OUT_DIR
Checks the 10 supplied PNGs in their lesson locations at 320/390/1280 + print: asset loads (HTTP 200, naturalWidth>0), phone/desktop
selection by width, one visible art per slot, no overflow, no audio/media, transparent (no backing), step 8 reveal behaviour
(no 04 request or image before reveal, each reveal separate, keyboard operable), print pages. Exits 1 on any failure."""
import json, sys
from playwright.sync_api import sync_playwright
BASE, OUT = sys.argv[1].rstrip('/'), sys.argv[2].rstrip('/') + '/'
W2 = f'{BASE}/curriculum/soundscape-path/week-2'
SLOTS = [('2a', 9, 'W2-2A-P01'), ('2b', 4, 'W2-2B-01'), ('2b', 5, 'W2-2B-02'), ('2b', 6, 'W2-2B-03'), ('2b', 10, 'W2-2B-P01')]
STEM04 = ['04a_only_upper_rises', '04b_only_lower_falls', '04c_only_lower_rises', '04d_both_move_apart', '04e_both_rise']
fails, rows, warns = [], [], []
IMG = """()=>[...document.querySelectorAll('img[data-w2-art]')].map(i=>{const r=i.getBoundingClientRect(),cs=getComputedStyle(i);
 let bg=[];for(let e=i;e&&e!==document.body;e=e.parentElement){const b=getComputedStyle(e).backgroundColor;if(e.closest('.w2-art,.w2-reveal')&&e!==i&&b!=='rgba(0, 0, 0, 0)')bg.push(b)}
 return {stem:i.dataset.w2Art,src:i.currentSrc,nw:i.naturalWidth,nh:i.naturalHeight,w:Math.round(r.width),h:Math.round(r.height),visible:r.width>0&&r.height>0,complete:i.complete,
 fit:cs.objectFit,imgbg:cs.backgroundColor,parentBg:bg,alt:i.alt.length}})"""
GEN = """()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
 media:document.querySelectorAll('audio,video,iframe,embed,object,source[type^=audio],source[type^=video]').length,
 clip:document.querySelectorAll('[class*=ClipButton],[data-clip],[aria-label*=Play i],[aria-label*=Replay i],[aria-label*=Hear i]').length})"""
with sync_playwright() as p:
    br = p.chromium.launch()
    for w, h in [(320, 700), (390, 800), (1280, 900)]:
        ctx = br.new_context(viewport={'width': w, 'height': h}); pg = ctx.new_page()
        reqs = []; pg.on('response', lambda r: reqs.append((r.url, r.status)) if '/w2/batch2/' in r.url else None)
        for lesson, step, stem in SLOTS:
            reqs.clear()
            pg.goto(f'{W2}/lesson-{lesson}?step={step}', wait_until='networkidle')
            imgs = pg.evaluate(IMG); g = pg.evaluate(GEN); tag = f'{lesson} s{step} {w}px'
            vis = [i for i in imgs if i['visible']]
            if len(vis) != 1 or stem not in vis[0]['stem']: fails.append(f'{tag}: expected exactly one visible {stem}, got {[i["stem"] for i in vis]}')
            else:
                i = vis[0]; want = '.phone.' if w <= 700 else '.desktop.'
                if want not in i['src']: fails.append(f'{tag}: wrong variant {i["src"]}')
                if not i['complete'] or i['nw'] == 0: fails.append(f'{tag}: image not loaded')
                if i['fit'] != 'contain': fails.append(f'{tag}: object-fit {i["fit"]}')
                if i['imgbg'] != 'rgba(0, 0, 0, 0)' or i['parentBg']: fails.append(f'{tag}: opaque backing {i["imgbg"]} {i["parentBg"]}')
                if abs(i['w'] / i['h'] - i['nw'] / i['nh']) > 0.01: fails.append(f'{tag}: aspect distorted')
                scale = round(i['w'] / i['nw'], 2); rows.append(dict(tag=tag, src=i['src'].split('/')[-1], rendered=f'{i["w"]}x{i["h"]}', scale=scale))
                if scale < 0.4: warns.append(f'{tag}: rendered at {scale}x of native (small text)')
            if g['sw'] > g['cw']: fails.append(f'{tag}: horizontal overflow')
            if g['media'] or g['clip']: fails.append(f'{tag}: audio/media present')
            if any(s != 200 for _, s in reqs): fails.append(f'{tag}: asset status {[x for x in reqs if x[1] != 200]}')
            if len(reqs) != 1: fails.append(f'{tag}: {len(reqs)} art requests (want exactly 1, no double download): {[u.split("/")[-1] for u, _ in reqs]}')
            pg.screenshot(path=f'{OUT}shots/b2_{lesson}_s{step}_{w}.png', full_page=True)
        # step 4 and 5 must not carry the 04 images; step 8 reveal behaviour
        reqs.clear()
        pg.goto(f'{W2}/lesson-2b?step=8', wait_until='networkidle')
        if pg.evaluate(IMG): fails.append(f'2b s8 {w}px: image present before any reveal')
        if any('-04' in u for u, _ in reqs): fails.append(f'2b s8 {w}px: 04 file requested before reveal')
        bt = pg.locator('.w2-reveal-btn')
        if bt.count() != 5: fails.append(f'2b s8 {w}px: {bt.count()} reveal buttons')
        if any(bt.nth(k).get_attribute('aria-expanded') != 'false' for k in range(bt.count())): fails.append(f'2b s8 {w}px: not collapsed on load')
        if pg.evaluate("()=>document.documentElement.scrollWidth>document.documentElement.clientWidth"): fails.append(f'2b s8 {w}px: overflow before reveal')
        pg.screenshot(path=f'{OUT}shots/b2_2b_s8_before_{w}.png', full_page=True)
        bt.nth(0).focus(); pg.keyboard.press('Enter'); pg.wait_for_timeout(400)
        one = pg.evaluate(IMG)
        if len(one) != 1 or '04a' not in one[0]['stem']: fails.append(f'2b s8 {w}px: keyboard reveal of example 1 gave {[i["stem"] for i in one]}')
        for k in range(1, 5): bt.nth(k).click()
        pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(300)
        allimg = pg.evaluate(IMG)
        if [i['stem'].split('_', 1)[0].split('-')[-1] for i in allimg] != ['04a', '04b', '04c', '04d', '04e']: fails.append(f'2b s8 {w}px: after reveal got {[i["stem"] for i in allimg]}')
        for i in allimg:
            if not i['complete'] or i['nw'] == 0 or not i['visible']: fails.append(f'2b s8 {w}px: {i["stem"]} not shown')
            if i['imgbg'] != 'rgba(0, 0, 0, 0)' or i['parentBg']: fails.append(f'2b s8 {w}px: opaque backing {i["stem"]}')
        for k in range(5):
            if pg.locator('.w2-reveal').nth(k).locator('img').count() != 1: fails.append(f'2b s8 {w}px: reveal {k+1} not holding exactly its own image')
        if pg.evaluate("()=>document.documentElement.scrollWidth>document.documentElement.clientWidth"): fails.append(f'2b s8 {w}px: overflow after reveal')
        rows.append(dict(tag=f'2b s8 after-all {w}px', sizes=[f'{i["w"]}x{i["h"]}' for i in allimg]))
        pg.screenshot(path=f'{OUT}shots/b2_2b_s8_after_{w}.png', full_page=True)
        # 2B practice sheet: art present (screen), answer-free, print
        pg.goto(f'{W2}/lesson-2b/practice-sheet', wait_until='networkidle')
        im = pg.evaluate(IMG)
        if len(im) != 1 or 'P01' not in im[0]['stem'] or im[0]['nw'] == 0: fails.append(f'2b sheet {w}px: art {im}')
        g = pg.evaluate(GEN)
        if g['sw'] > g['cw']: fails.append(f'2b sheet {w}px: overflow')
        pg.screenshot(path=f'{OUT}shots/b2_2b_sheet_{w}.png', full_page=True)
        if w == 1280:
            pg.emulate_media(media='print'); pg.pdf(path=f'{OUT}b2_sheet_2b.pdf', format='Letter')
            vis = pg.evaluate("()=>[...document.querySelectorAll('img[data-w2-art]')].filter(i=>i.getBoundingClientRect().width>0).length")
            if vis != 1: fails.append(f'2b sheet print: {vis} art images visible')
            pg.emulate_media(media='screen')
            # print with a revealed step 8: examples must not print answers
            pg.goto(f'{W2}/lesson-2b?step=8', wait_until='networkidle'); pg.emulate_media(media='print')
            if pg.evaluate(IMG) and any(i['visible'] for i in pg.evaluate(IMG)): fails.append('2b s8 print: reveal art visible')
            pg.emulate_media(media='screen')
        # step=all: nothing from 04 until revealed
        reqs.clear(); pg.goto(f'{W2}/lesson-2b?step=all', wait_until='networkidle')
        if any('-04' in u for u, _ in reqs): fails.append(f'2b all {w}px: 04 requested before reveal')
        ctx.close()
    br.close()
json.dump(rows, open(f'{OUT}b2_metrics.json', 'w'), indent=1)
for r in rows: print(r)
print('WARN:', warns or 'none'); print('FAILS:', fails or 'none'); sys.exit(1 if fails else 0)
