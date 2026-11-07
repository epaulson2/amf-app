import os
from playwright.sync_api import sync_playwright
R=os.getcwd(); D=f"{R}/docs/nb-json-pilot/round2-motion"; PUB=f"{R}/public/soundscape/m07"; IV="#F9F5ED"; T="/tmp/claude-1000/nb"; os.makedirs(T,exist_ok=True)
def html(v):
    fig="screen" if v=="1280" else "narrow"
    return f'''<!doctype html><meta charset=utf-8><body style="margin:0;background:{IV};font-family:ui-sans-serif,system-ui"><div style="max-width:900px;margin:0 auto;padding:12px 10px 30px">
<div style="font:600 12px ui-sans-serif;color:#8a5a66;letter-spacing:.1em;margin:6px">LESSON 2B · HOW TWO VOICES MOVE (ISOLATED COMPOSITE PROOF)</div>
<div style="position:relative"><div style="position:absolute;inset:0;background:url(file://{D}/composite/B2.alpha.png) center/100% auto no-repeat;opacity:.55"></div>
<img src="file://{PUB}/{fig}/2B-02.svg" style="position:relative;display:block;width:100%"></div></div>'''
with sync_playwright() as p:
    b=p.chromium.launch()
    for n,w,s in(("1280",1280,1),("390",390,2),("320",320,2)):
        f=f"{T}/_m{n}.html"; open(f,"w").write(html(n)); pg=b.new_page(viewport={"width":w,"height":700},device_scale_factor=s); pg.goto("file://"+f); pg.wait_for_timeout(250)
        pg.screenshot(path=f"{D}/composite/B2.hybrid.{n}.jpg",full_page=True,type="jpeg",quality=86); pg.close()
    f=f"{T}/_s.html"; open(f,"w").write(f'<body style="margin:0;background:#fff;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px;font:600 14px ui-sans-serif"><div>2A winner (B) — prior round<img src="file://{R}/docs/nb-json-pilot/raw/B.png" style="width:100%;display:block;margin-top:6px"></div><div>2B motion (B2) — this round<img src="file://{D}/raw/B2.png" style="width:100%;display:block;margin-top:6px"></div></body>')
    pg=b.new_page(viewport={"width":1400,"height":700}); pg.goto("file://"+f); pg.wait_for_timeout(300); pg.screenshot(path=f"{D}/composite/compare.2A-vs-2B.jpg",full_page=True,type="jpeg",quality=88); b.close()
