"""M07 preview pipeline (real Chromium). Usage: previews.py <scratch-dir>
Writes docs/m07/previews/{screen,narrow,art,sheets,page,compare}/ from public/soundscape/m07 and docs/m07/registry.json.
Previews are evidence only: the SVGs in public/soundscape/m07 are the assets."""
import sys, os, json, re, shutil
from playwright.sync_api import sync_playwright

SC = sys.argv[1]; os.makedirs(SC, exist_ok=True)
ROOT = os.getcwd(); PUB = f"{ROOT}/public/soundscape/m07"; OUT = f"{ROOT}/docs/m07/previews"
DOCS_MS = "/home/elderle/amf-work/amf-docs-w2audit/04-curriculum/tracks/soundscape-path/implementation/week-02"
reg = json.load(open(f"{ROOT}/docs/m07/registry.json"))
ids = [a["id"] for a in reg["assets"]]
IV = "#F9F5ED"
for d in ("screen", "narrow", "art", "sheets", "page", "compare"): os.makedirs(f"{OUT}/{d}", exist_ok=True)

def page_html(path, body, bg=IV, css=""):
    open(path, "w").write(f'<!doctype html><meta charset="utf-8"><style>body{{margin:0;background:{bg};font-family:ui-sans-serif,system-ui,"Segoe UI",sans-serif;color:#2f2230}}{css}</style><body>{body}</body>')
    return "file://" + path

with sync_playwright() as p:
    b = p.chromium.launch()
    def shot_el(url, sel, out, scale=1, fmt="png"):
        pg = b.new_page(viewport={"width": 900, "height": 600}, device_scale_factor=scale); pg.goto(url); pg.wait_for_timeout(100)
        kw = {"type": "jpeg", "quality": 86} if fmt == "jpeg" else {}
        pg.locator(sel).screenshot(path=out, **kw); pg.close()
    def shot_page(url, w, out, scale=1, fmt="jpeg"):
        pg = b.new_page(viewport={"width": w, "height": 600}, device_scale_factor=scale); pg.goto(url); pg.wait_for_timeout(250)
        kw = {"type": "jpeg", "quality": 84} if fmt == "jpeg" else {}
        pg.screenshot(path=out, full_page=True, **kw); pg.close()

    # 1. per-asset previews (screen @1x, narrow @2x) on ivory
    for i in ids:
        for v, sc in (("screen", 1), ("narrow", 2)):
            u = page_html(f"{SC}/_{i}.{v}.html", f'<img src="file://{PUB}/{v}/{i}.svg" style="display:block;margin:0">', IV)
            shot_el(u, "img", f"{OUT}/{v}/{i}.png", sc)
    # 2. art: existing M03 art (reused in place) and the new vector washes
    for f in ("S07","D01","D03","D05","D07","E01","E02","E03","E04","E09","F01","F02","F03","F08","F10"):
        src = f"{ROOT}/public/soundscape/m03/art/{f}.webp"
        u = page_html(f"{SC}/_art{f}.html", f'<img src="file://{src}" style="display:block;width:480px">', IV)
        shot_el(u, "img", f"{OUT}/art/{f}.png", 1)
    for a in reg["art"]:
        u = page_html(f"{SC}/_{a['id']}.html", f'<img src="file://{ROOT}/{a["file"]}" style="display:block;width:900px">', IV)
        shot_el(u, "img", f"{OUT}/art/{a['id']}.png", 1)
    # 3. contact sheets (1280, 390, 320, print), chunks of 6
    groups = {}
    for a in reg["assets"]: groups.setdefault(a["family"], []).append(a)
    for g, items in groups.items():
        for n in range(0, len(items), 6):
            chunk = items[n:n+6]; tag = f"{g}-{n//6+1}"
            def cells(variant, width):
                return "".join(f'<figure style="margin:0 0 4px"><figcaption style="font:600 13px ui-sans-serif,system-ui;color:#6b5a68;margin:0 0 6px">{a["id"]} · {a["title"]}</figcaption><img src="file://{PUB}/{variant}/{a["id"]}.svg" style="display:block;width:{width}"></figure>' for a in chunk)
            modes = [
                ("1280", 1280, "screen", IV, "display:grid;grid-template-columns:1fr 1fr;gap:26px 30px;padding:24px;align-items:start", "100%"),
                ("390", 390, "narrow", IV, "padding:15px 15px;display:grid;gap:22px", "100%"),
                ("320", 320, "narrow", IV, "padding:10px 10px;display:grid;gap:22px", "100%"),
                ("print", 1280, "print", "#ffffff", "display:grid;grid-template-columns:1fr 1fr;gap:26px 30px;padding:24px;align-items:start", "100%"),
            ]
            for name, w, variant, bg, css, iw in modes:
                u = page_html(f"{SC}/_sheet{tag}{name}.html", f'<div style="{css}">{cells(variant, iw)}</div>', bg)
                shot_page(u, w, f"{OUT}/sheets/{tag}.{name}.jpg", 1)
    # 4. page-integrated previews (isolated; NOT the live site)
    def excerpt(lesson, step):
        t = open(f"{DOCS_MS}/W2_FINAL_CONTENT_LESSON_{lesson}_MANUSCRIPT_V2_2026-11-07.md").read()
        sec = re.search(rf"## Step {step} of \d+ — (.*?)\n(.*?)(?=\n---\n|\n## Step )", t, re.S)
        body = sec.group(2); lc = body.split("### LEARNER COPY", 1)[1].split("### Recap")[0].strip()
        paras = [x.strip() for x in lc.split("\n\n") if x.strip()]
        kb = next((x for x in paras if x.startswith("**On your keyboard.**")), paras[-1])
        fmt = lambda s: re.sub(r"\*(.+?)\*", r"<i>\1</i>", re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s))
        return sec.group(1).strip(), fmt(paras[0]), fmt(kb)
    A = {a["id"]: a for a in reg["assets"]}
    def page(lesson, step, total, asset, wash, name):
        title, intro, kb = excerpt(lesson, step)
        a = A[asset]
        css = """.wrap{max-width:760px;margin:0 auto;padding:0 16px 40px;position:relative}.bar{background:#4c2748;color:#f9f5ed;font:600 13px ui-sans-serif;padding:10px 16px;letter-spacing:.04em}
.hero{position:relative;padding:28px 0 8px}.hero img{position:absolute;left:50%;top:-30px;width:1100px;max-width:none;transform:translateX(-50%);opacity:.75;z-index:0;pointer-events:none}
.hero h1{position:relative;z-index:1;font:600 34px Georgia,serif;color:#4c2748;margin:0 0 6px}.hero .k{position:relative;z-index:1;font:700 12px ui-sans-serif;letter-spacing:.12em;color:#8a5a66;text-transform:uppercase}
html,body{overflow-x:hidden}.hero{overflow:hidden}p{font:17px/1.6 Georgia,serif;margin:14px 0}.how{background:#fffaf3;border-left:4px solid #a67664;padding:6px 16px;border-radius:8px}.how p{font:15px/1.55 ui-sans-serif,system-ui,sans-serif;margin:10px 0}.how small{font:700 11px ui-sans-serif;letter-spacing:.1em;color:#8a5a66}
.act{border:1.5px solid #9a8798;border-radius:12px;padding:2px 16px;background:#fffdf8}.act p{font:16px/1.55 Georgia,serif}.nav{display:flex;justify-content:space-between;margin-top:24px}.nav a{font:600 15px ui-sans-serif;color:#4c2748;border:1.5px solid #4c2748;border-radius:22px;padding:9px 18px;text-decoration:none}
.note{font:12px ui-sans-serif;color:#6b5a68;background:#efe9df;padding:6px 12px;text-align:center}@media(max-width:600px){.hero h1{font-size:27px}.hero img{width:760px;top:-10px}}
"""
        body = f"""<div class="note">ISOLATED PREVIEW of page integration. Not the live site. Copy excerpted from the V2 manuscript.</div><div class="bar">AJOURNÉ · WEEK 2 · LESSON {lesson} · STEP {step} OF {total}</div>
<div class="wrap"><div class="hero"><img src="file://{PUB}/art/{wash}.svg"><div class="k">Lesson {lesson} · step {step}</div><h1>{title}</h1></div>
<p>{intro}</p>
<picture><source media="(max-width:600px)" srcset="file://{PUB}/narrow/{asset}.svg"><img src="file://{PUB}/screen/{asset}.svg" alt="{a['alt']}" style="display:block;width:100%;height:auto"></picture>
<div class="how"><small>HOW TO READ THIS PICTURE</small><p>{a['howToRead']}</p></div>
<div class="act"><p>{kb}</p></div>
<div class="nav"><a href="#">← Previous step</a><a href="#">Next step →</a></div></div>"""
        u = page_html(f"{SC}/_page{name}.html", body, IV, css)
        shot_page(u, 1280, f"{OUT}/page/{name}.1280.jpg", 1); shot_page(u, 390, f"{OUT}/page/{name}.390.jpg", 2)
        open(f"{ROOT}/docs/m07/preview/{name}.html", "w").write(open(f"{SC}/_page{name}.html").read().replace(f"file://{PUB}", "../../../public/soundscape/m07"))
    os.makedirs(f"{ROOT}/docs/m07/preview", exist_ok=True)
    page("2B", 5, 11, "2B-06", "wash-2b", "page-2B-step5")
    page("2C", 4, 10, "2C-03", "wash-2c", "page-2C-step4")
    page("2A", 6, 10, "2A-05", "wash-2a", "page-2A-step6")
    # 5. before / after comparisons against the M03 originals
    OLD = f"{ROOT}/public/soundscape/m03/native"
    for new, old, name in (("2B-06", "E03", "2B-06_vs_E03"), ("2B-08", "E07", "2B-08_vs_E07"), ("2C-03", "F03", "2C-03_vs_F03"), ("2A-06", "D06", "2A-06_vs_D06"), ("2B-13", "T05", "2B-13_vs_T05"), ("2C-09", "F10", "2C-09_vs_F10")):
        body = f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;padding:20px;align-items:start"><div><div style="font:700 13px ui-sans-serif;color:#8a5a66;margin-bottom:8px">BEFORE · M03 {old} (live tree, unchanged)</div><img src="file://{OLD}/{old}-native.svg" style="width:100%;display:block;background:#fff"></div><div><div style="font:700 13px ui-sans-serif;color:#8a5a66;margin-bottom:8px">AFTER · M07 {new}</div><img src="file://{PUB}/screen/{new}.svg" style="width:100%;display:block"></div></div>'
        u = page_html(f"{SC}/_cmp{name}.html", body, IV)
        shot_page(u, 1280, f"{OUT}/compare/{name}.jpg", 1)
    b.close()
print("previews done")
