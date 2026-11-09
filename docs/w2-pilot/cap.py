import json
from playwright.sync_api import sync_playwright
B='http://localhost:3931/curriculum/soundscape-path/preview/w2-2a'
O='/home/elderle/amf-work/amf-evidence/w2-pilot-20261109/'
res=[]
with sync_playwright() as p:
    br=p.chromium.launch()
    for w,h in [(320,700),(390,800),(1280,900)]:
        pg=br.new_context(viewport={'width':w,'height':h}).new_page()
        for s in range(1,11):
            pg.goto(f'{B}?step={s}',wait_until='networkidle')
            r=pg.evaluate("""()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight,
              audio:document.querySelectorAll('audio,video,button').length,
              svgs:[...document.querySelectorAll('svg.w2-svg')].map(s=>({w:Math.round(s.getBoundingClientRect().width),t:!!s.querySelector('title'),d:!!s.querySelector('desc')})),
              words:document.querySelector('.m4-step').innerText.split(/\\s+/).length})""")
            r.update(w=w,step=s); res.append(r)
            if s in (2,3,4,5,8) or w==1280 and s in (1,6,7):
                pg.screenshot(path=f'{O}shots/s{s}_{w}.png',full_page=True)
    br.close()
json.dump(res,open(O+'metrics.json','w'),indent=1)
for r in res:
    print(r['w'],r['step'],'ovf' if r['sw']>r['cw'] else 'ok','h',r['h'],'words',r['words'],'btn',r['audio'],'svgs',len(r['svgs']),'min',min([s['w'] for s in r['svgs']] or [0]),all(s['t'] and s['d'] for s in r['svgs']))
