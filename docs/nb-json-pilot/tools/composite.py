import os, sys
from playwright.sync_api import sync_playwright
R = os.getcwd(); D = f"{R}/docs/nb-json-pilot"; PUB = f"{R}/public/soundscape/m07"; IV = "#F9F5ED"
def html(art, variant):
    fig = "narrow" if variant != "1280" else "screen"
    return f'''<!doctype html><meta charset=utf-8><body style="margin:0;background:{IV};font-family:ui-sans-serif,system-ui">
<div style="max-width:800px;margin:0 auto;padding:12px 10px 30px"><div style="font:600 12px ui-sans-serif;color:#8a5a66;letter-spacing:.1em;margin:6px 6px">LESSON 2A · STEP 5 (ISOLATED COMPOSITE PROOF)</div>
<div style="position:relative;background:url(file://{D}/composite/{art}.alpha.png) top center/100% auto no-repeat;padding-top:56%"><img src="file://{PUB}/{fig}/2A-04.svg" style="display:block;width:100%"></div></div>'''
with sync_playwright() as p:
    b = p.chromium.launch()
    for art in ("A", "B"):
        for name, w, sc in (("1280", 1280, 1), ("390", 390, 2), ("320", 320, 2)):
            f = f"/tmp/claude-1000/nb/_c{art}{name}.html"; open(f, "w").write(html(art, name))
            pg = b.new_page(viewport={"width": w, "height": 700}, device_scale_factor=sc); pg.goto("file://" + f); pg.wait_for_timeout(250)
            pg.screenshot(path=f"{D}/composite/{art}.hybrid.{name}.jpg", full_page=True, type="jpeg", quality=86); pg.close()
    # raw A/B/C contact sheet
    f = "/tmp/claude-1000/nb/_ab.html"
    open(f, "w").write(f'<body style="margin:0;background:#fff;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px;font:600 14px ui-sans-serif">' + "".join(f'<div>{t}<img src="file://{D}/raw/{k}.png" style="width:100%;display:block;margin-top:6px"></div>' for k, t in (("A", "A · prose"), ("B", "B · QCR-style JSON")))+ '</body>')
    pg = b.new_page(viewport={"width": 1400, "height": 700}); pg.goto("file://" + f); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{D}/composite/AB.sheet.jpg", full_page=True, type="jpeg", quality=88); b.close()
