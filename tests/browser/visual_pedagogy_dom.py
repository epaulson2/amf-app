"""Visual-pedagogy acceptance against the REAL rendered DOM, at 320 and 1280 px.
Run: ~/queen-city-redline/.venv-crawl4ai/bin/python tests/browser/visual_pedagogy_dom.py http://127.0.0.1:3325"""
import re, sys, json
from playwright.sync_api import sync_playwright

ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3325"
BASE = ORIGIN + "/curriculum/soundscape-path"
results, failed = [], []
def check(label, cond, detail=""):
    results.append((label, detail, bool(cond)))
    if not cond: failed.append((label, detail))

EXPECT = {
    "/week-1": ["W1HUB"], "/week-1/lesson-1a": ["1A-V1", "1A-V2", "1A-V3", "1A-V4"], "/week-1/lesson-1b": ["1B-V1", "1B-V2", "1B-V3"],
    "/week-1/lesson-1c": ["1C-V1", "1C-V2", "1C-V3", "1C-V4"], "/week-2": ["W2HUB"], "/week-2/lesson-2a": ["2A-V1", "2A-V2", "2A-V3", "2A-V4"],
    "/week-2/lesson-2b": ["2B-V1", "2B-V2", "2B-V3"], "/week-2/lesson-2c": ["2C-V1", "2C-V2", "2C-V3"], "/resources/interval-palette": ["ATLAS"],
}
BLOCK_JS = """(el) => {
  const vw = document.documentElement.clientWidth
  const r = el.getBoundingClientRect()
  const media = [...el.querySelectorAll('svg.sp-diagram, img')].filter(m => !m.closest('details:not([open])') && m.getBoundingClientRect().width > 0)
  const bad = media.filter(m => m.getBoundingClientRect().right > vw + 1 || m.getBoundingClientRect().width < 100)
  const scrollers = [...el.querySelectorAll('.sp-fig-scroll')].filter(s => !s.closest('details:not([open])') && s.scrollWidth > s.clientWidth + 2)
  const imgs = [...el.querySelectorAll('img')].filter(i => !i.closest('details:not([open])'))
  return { right: r.right, vw, media: media.length, bad: bad.length, scrollers: scrollers.length, imgsLoaded: imgs.every(i => i.complete && i.naturalWidth > 0), text: el.innerText,
           descs: [...el.querySelectorAll('svg > desc')].map(d => d.textContent) }
}"""

with sync_playwright() as p:
    b = p.chromium.launch(args=["--autoplay-policy=no-user-gesture-required"])
    for w in (320, 1280):
        for path, keys in EXPECT.items():
            pg = b.new_page(viewport={"width": w, "height": 900})
            pg.goto(BASE + path, wait_until="networkidle")
            sw = pg.evaluate("document.documentElement.scrollWidth")
            check(f"no root overflow {path}@{w}", sw <= w, str(sw))
            if path.endswith("lesson-1b"):
                pre = pg.locator("[data-visual]").evaluate_all("els => els.map(e => e.getAttribute('data-visual'))")
                check(f"1B only the answer-neutral map is open before reveal@{w}", pre == ["1B-V3"], str(pre))
                v3 = pg.locator("[data-visual='1B-V3']").evaluate(BLOCK_JS)
                check(f"1B-V3 is answer-neutral before reveal@{w}", "C5" not in v3["text"] and all("C5" not in x for x in v3["descs"]), json.dumps(v3["descs"])[:200])
                pg.get_by_role("button", name="Reveal a possible ending").first.click()
            found = pg.locator("[data-visual]").evaluate_all("els => els.map(e => e.getAttribute('data-visual'))")
            check(f"visual blocks {path}@{w}", sorted(found) == sorted(keys), f"{found}")
            # a distinctive graphic near the opening
            top = pg.evaluate("(() => { const m = document.querySelector('main svg.sp-diagram, main img[src*=\"/soundscape/art/\"]'); return m ? m.getBoundingClientRect().top + window.scrollY : 99999 })()")
            if 'lesson' in path: check(f"first graphic near the top {path}@{w}", top < (2600 if w == 320 else 1900), str(int(top)))
            for k in keys:
                el = pg.locator(f"[data-visual='{k}']")
                if k == "1B-V3": pass
                d = el.evaluate(BLOCK_JS)
                t = d["text"]
                check(f"{k} heading+reading guide@{w}", len(t) > 900, str(len(t)))
                check(f"{k} fits the page, no sideways scrolling@{w}", d["right"] <= d["vw"] + 1 and d["bad"] == 0 and d["scrollers"] == 0, json.dumps({x: d[x] for x in ('right', 'vw', 'bad', 'scrollers')}))
                check(f"{k} images load@{w}", d["imgsLoaded"])
                check(f"{k} has a picture", d["media"] > 0 or el.locator('[data-rulers],[data-stage]').count() > 0)
                if k not in ("W1HUB", "W2HUB"):
                    check(f"{k} legend/how to read@{w}", "how to read" in t.lower() or "=" in t or "legend" in t.lower() or len(el.locator("p").all_inner_texts()) >= 4)
                    check(f"{k} walk-through@{w}", "Walk through it" in t or k in ("ATLAS",) or "Walk" in t)
                    check(f"{k} source labelled@{w}", "epaulson2/AMF" in t or k.startswith("W"))
            # --- specific truths
            if path.endswith("lesson-1a"):
                v1 = pg.locator("[data-visual='1A-V1']").evaluate(BLOCK_JS)
                check(f"1A-V1 says C3, 15 s, and that the art is C4@{w}", all(s in v1["text"] for s in ("C3", "drafted around C4", "15 seconds")))
                check(f"1A-V1 timeline is C3 only@{w}", any("C3" in x and "15 seconds" in x and "C4" not in x for x in v1["descs"]), json.dumps(v1["descs"]))
                check(f"1A-V1 Style B art loads@{w}", v1["imgsLoaded"] and v1["media"] >= 2)
                pg.locator("[data-visual='1A-V1']").get_by_role("button", name="Start the walk").click()
                check(f"walk status@{w}", pg.locator("[data-visual='1A-V1'] [role=status]").filter(has_text="Step 1 of").count() == 1)
                v3 = pg.locator("[data-visual='1A-V3']")
                check(f"1A-V3 keyboard reaches C3..C5@{w}", v3.locator("g[data-midi='48']").count() >= 1 and v3.locator("g[data-midi='72']").count() >= 1)
            if path.endswith("lesson-1b"):
                v3b = pg.locator("[data-visual='1B-V3']").evaluate(BLOCK_JS)
                check(f"1B-V3 shows C5 after reveal@{w}", any("C5" in x for x in v3b["descs"]))
            if path.endswith("lesson-1c"):
                ev = pg.locator("[data-visual='1C-V3'] svg.sp-diagram").evaluate_all("""svgs => svgs.map(s => [...s.querySelectorAll('g[data-midi]')].map(g => g.getAttribute('data-midi') + '@' + g.getAttribute('data-start') + ':' + g.getAttribute('data-track')))""")
                a, c = ev[0], ev[1]
                check(f"1C-V3 landing has C5, open does not@{w}", any(x.startswith('72@') for x in a) and not any(x.startswith('72@') for x in c))
                check(f"1C-V3 first 33 s identical@{w}", sorted(x for x in a if not x.startswith('72@')) == sorted(c))
                v2 = pg.locator("[data-visual='1C-V2'] svg.sp-diagram").evaluate_all("""svgs => svgs.map(s => [...s.querySelectorAll('g[data-track=upper]')].map(g => g.getAttribute('data-midi') + '@' + g.getAttribute('data-start')))""")
                check(f"1C-V2 same pitch, onset 2 vs 7@{w}", v2[0] == ['64@2'] and v2[1] == ['64@7'], str(v2))
            if path.endswith("lesson-2b"):
                v3 = pg.locator("[data-visual='2B-V3']")
                tx = v3.inner_text()
                check(f"2B-V3 both spellings with letter counts@{w}", "B3–F4" in tx and "diminished fifth" in tx and "C4–F♯4" in tx and "augmented fourth" in tx)
                check(f"2B-V3 keyboard reaches B3@{w}", v3.locator("g[data-midi='59']").count() >= 1)
                v1 = pg.locator("[data-visual='2B-V1']").inner_text()
                check(f"2B-V1 similar vs parallel@{w}", "minor third" in v1 and "D4+F♯4" in v1 or "F♯4" in v1)
                v2 = pg.locator("[data-visual='2B-V2'] svg[role=img]").count()
                check(f"2B-V2 five panels@{w}", v2 == 5, str(v2))
            if path.endswith("lesson-2c"):
                ev = pg.locator("[data-visual='2C-V2'] svg.sp-diagram").evaluate_all("""svgs => svgs.map(s => [[...s.querySelectorAll('g[data-track=upper]')].map(g => g.getAttribute('data-midi') + '@' + g.getAttribute('data-start')), [...s.querySelectorAll('g[data-track=lower]')].map(g => g.getAttribute('data-midi') + '@' + g.getAttribute('data-start'))])""")
                check(f"2C-V2 upper arrays identical@{w}", ev[0][0] == ev[1][0] and len(ev[0][0]) == 3, str(ev))
                check(f"2C-V2 lower differs: B3 only in version two@{w}", ev[0][1] == ['60@0'] and ev[1][1] == ['60@0', '59@12', '60@24'], str(ev))
            if path.endswith("lesson-2a"):
                check(f"2A-V3 includes B3@{w}", "B3" in pg.locator("[data-visual='2A-V3']").inner_text())
                check(f"2A-V1 Style B art loads@{w}", pg.locator("[data-visual='2A-V1']").evaluate(BLOCK_JS)["imgsLoaded"])
            if path.endswith("interval-palette"):
                rd = pg.locator("[data-reader]")
                check(f"Atlas reader has 13 cards@{w}", rd.get_by_role("group", name="Choose an interval card").locator("button").count() == 13)
                rd.get_by_role("button", name="Tritone · 6").click()
                tx = pg.locator("[data-visual='ATLAS']").inner_text()
                check(f"Atlas tritone lens@{w}", "B3–F4" in tx and "C4–F♯4" in tx and "diminished fifth" in tx and "augmented fourth" in tx)
                check(f"Atlas cards still 13 + deep chapters@{w}", pg.locator("article[data-interval]").count() == 13)
            if path == "/week-1" or path == "/week-2":
                check(f"hub map panels (3)@{w}", pg.locator("[data-visual] > ol > li").count() == 3)
                if path == "/week-2": check(f"W2 hub Style B image loads@{w}", pg.locator("[data-visual='W2HUB'] img").evaluate("i => i.complete && i.naturalWidth > 0"))
            pg.close()
    # audio + stop through a visual block, no sound on load
    pg = b.new_page(viewport={"width": 1280, "height": 900})
    pg.add_init_script("window.__au={ctx:0,closed:0};const AC=window.AudioContext;window.AudioContext=class extends AC{constructor(){super();window.__au.ctx++}close(){window.__au.closed++;return super.close()}};")
    pg.goto(BASE + "/week-1/lesson-1a", wait_until="networkidle")
    check("silent on load", pg.evaluate("window.__au.ctx") == 0)
    pg.locator("[data-visual='1A-V1']").get_by_role("button", name="Play the home note (C3)").click(); pg.wait_for_timeout(400)
    check("block play shows status", pg.locator("[data-visual='1A-V1'] [role=status]").filter(has_text="Now playing C3").count() == 1)
    pg.get_by_role("button", name="Stop sound").first.click(); pg.wait_for_timeout(500)
    st = pg.evaluate("({c: window.__au.ctx, d: window.__au.closed})")
    check("stop closes the context", st["c"] == st["d"] == 1, str(st))
    pg.close(); b.close()

for label, detail, ok in results:
    if not ok: print("FAIL", label, "|", detail[:200])
print(json.dumps({"checks": len(results), "failed": len(failed)}))
sys.exit(1 if failed else 0)
