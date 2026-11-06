"""Lesson 1A keyboard-first redesign, checked in a real browser at 320, 390 and 1280 px.
Run: ~/queen-city-redline/.venv-crawl4ai/bin/python tests/browser/lesson1a_keyboard_first.py http://127.0.0.1:3327"""
import json, re, sys
from playwright.sync_api import sync_playwright

ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3327"
URL = ORIGIN + "/curriculum/soundscape-path/week-1/lesson-1a"
results, failed = [], []
def check(label, cond, detail=""):
    results.append((label, detail, bool(cond)))
    if not cond: failed.append((label, detail))

INIT = """window.__snd={ctx:0,media:0,osc:0};
for (const k of ['AudioContext','webkitAudioContext']) { const C=window[k]; if (C) window[k]=class extends C { constructor(){ super(); window.__snd.ctx++ } } }
const pl=HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play=function(){ window.__snd.media++; return pl.apply(this,arguments) }"""

HEADINGS = ["A note is a sound with a place", "The black keys help us find C", "Seven note names, one familiar path", "Why does C show up again?", "Take the path and return", "What makes a note feel like home?", "Let C glow in the background", "Your first tiny musical story"]
SVG_JS = """(g) => [...g.querySelectorAll('svg.sp-diagram')].filter(s => s.getBoundingClientRect().width > 0).map(s => {
  const vb = s.viewBox.baseVal, r = s.getBoundingClientRect(), k = r.width / vb.width
  const fs = [...s.querySelectorAll('text')].map(t => parseFloat(t.getAttribute('font-size') || '16') * k).filter(x => x > 0)
  return { right: r.right, w: r.width, minFont: fs.length ? Math.min(...fs) : 99 }
})"""

with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (320, 390, 1280):
        ctx = b.new_context(viewport={"width": w, "height": 900}); ctx.add_init_script(INIT)
        pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.goto(URL, wait_until="networkidle")
        txt = pg.evaluate("document.body.innerText")
        check(f"no root overflow@{w}", pg.evaluate("document.documentElement.scrollWidth") <= w)
        check(f"H1@{w}", pg.locator("h1").inner_text().strip() == "Your First Musical Map: Finding C and Finding Home")
        h2 = pg.locator("main section[id] > h2").all_inner_texts()
        for h in HEADINGS: check(f"heading '{h}'@{w}", any(h in x for x in h2))
        # zero-prerequisite: no note numbers, MIDI, or 'tonic' before explanation in the lesson body
        body = pg.locator("article").inner_text()
        check(f"no octave numbers / MIDI in the lesson@{w}", not re.search(r"\b[A-G][♯♭]?[0-9]\b|MIDI", body.split("Explore a little deeper")[0]))
        # no site sound: no controls, no audio elements, no contexts
        names = [x.lower() for x in pg.get_by_role("button").all_inner_texts()]
        check(f"no play/hear/stop controls@{w}", not any(re.search(r"\b(play the|hear|stop sound|play)\b", n) for n in names), str([n for n in names if 'hear' in n or 'stop' in n or 'play' in n]))
        check(f"no audio/video/iframe elements@{w}", pg.locator("audio, video, iframe").count() == 0)
        # seven illustrated graphics, drawn and legible
        gs = pg.locator("[data-graphic]").evaluate_all("els => els.map(e => e.getAttribute('data-graphic'))")
        check(f"seven graphics G1..G7@{w}", gs == [f"G{i}" for i in range(1, 8)], str(gs))
        for i in range(1, 8):
            d = pg.locator(f"[data-graphic='G{i}']").evaluate(SVG_JS)
            check(f"G{i} has a picture, fits, labels legible@{w}", len(d) > 0 and all(x["right"] <= w + 1 for x in d) and all(x["minFont"] >= 10.5 for x in d), json.dumps(d)[:200])
        # accurate geometry in the DOM
        g3 = pg.locator("[data-graphic='G3'] svg").first
        check(f"G3 eight white keys C D E F G A B C@{w}", g3.locator("g[data-white]").evaluate_all("l => l.map(x => x.getAttribute('data-white')).join('')") == "CDEFGABC")
        check(f"G3 five black keys, none after E or B@{w}", g3.locator("rect[data-black]").evaluate_all("l => l.map(x => x.getAttribute('data-black')).join(',')") == "after-C,after-D,after-F,after-G,after-A")
        # G2: reveal C / another C / hide
        g2 = pg.locator("[data-graphic='G2']")
        lab = lambda: g2.locator("svg").first.locator("text").all_text_contents()
        check(f"G2 starts unlabelled@{w}", lab() == [])
        g2.get_by_role("button", name="Reveal C").click(); check(f"G2 reveal shows one C, left of the two black keys@{w}", lab() == ["C"] and g2.locator("svg").first.locator("g[data-white][data-index='0']").get_attribute("data-white") == "C")
        g2.get_by_role("button", name="Find another C").click(); check(f"G2 another C@{w}", lab() == ["C", "C"])
        g2.get_by_role("button", name="Hide labels").click(); check(f"G2 hide@{w}", lab() == [])
        # G3: names toggle + stepping
        g3f = pg.locator("[data-graphic='G3']")
        g3f.get_by_role("button", name="Hide the note names").click(); check(f"G3 hides names@{w}", g3f.locator("svg").first.locator("text").count() == 0)
        g3f.get_by_role("button", name="Show the note names").click(); check(f"G3 shows names@{w}", g3f.locator("svg").first.locator("text").count() == 8)
        g3f.get_by_role("button", name="Start the path").click(); check(f"G3 step 1 says play C@{w}", "Now play C" in g3f.locator("[role=status]").inner_text())
        for _ in range(7): g3f.get_by_role("button", name="Next key").click()
        check(f"G3 last step is C again@{w}", "the C that came back" in g3f.locator("[role=status]").inner_text())
        # G4
        g4 = pg.locator("[data-graphic='G4']"); g4.get_by_role("button", name="Show the second C").click()
        check(f"G4 octave revealed (arch labelled octave)@{w}", "an octave" in " ".join(g4.locator("svg text").all_text_contents()) and "octave" in g4.locator("[role=status]").inner_text().lower())
        # G5 checklist
        g5 = pg.locator("[data-graphic='G5']")
        for t in ("I found C", "I went up", "I came back down"): g5.get_by_label(t).check()
        check(f"G5 checklist works@{w}", g5.locator("input:checked").count() == 3)
        # G6 switch
        g6 = pg.locator("[data-graphic='G6']")
        check(f"G6 shows stop-on-G first@{w}", "stop on G" in g6.locator("[role=status]").first.inner_text().lower() or "stop on g" in g6.inner_text().lower())
        g6.get_by_role("button", name="Return to C").click(); check(f"G6 switches to arriving on C@{w}", "arriving there" in g6.inner_text() or "stop on C" in g6.inner_text())
        g6.get_by_role("button", name="Settled").click(); check(f"G6 reflection answered, no wrong answer@{w}", "no wrong feeling" in g6.inner_text())
        # understanding check: seven
        pg.get_by_role("button", name="7", exact=True).click(); check(f"count check explains@{w}", "Seven: C, D, E, F, G, A, B" in pg.locator("article").inner_text())
        # external drone link
        a = pg.locator("a[href='https://www.youtube.com/watch?v=N5LqCQHQCGc']")
        check(f"drone link new tab, noopener@{w}", a.count() == 1 and a.get_attribute("target") == "_blank" and "noopener" in a.get_attribute("rel"))
        check(f"drone link says it opens YouTube@{w}", "Open a C drone on YouTube" in a.inner_text() and "Nothing plays on this page" in pg.locator("article").inner_text())
        check(f"second drone link labelled honestly@{w}", pg.locator("a[href='https://www.youtube.com/watch?v=hhPX4n8rPIU']").count() == 1 and "may sound fuller than a single note" in pg.locator("article").inner_text())
        # recap terms, doors, nav
        rec = pg.locator("article").inner_text()
        for term in ("pitch = high or low", "octave = the next higher or lower C", "drone = a long-held reference note"): check(f"recap '{term}'@{w}", term in rec)
        check(f"six doors@{w}", pg.locator("details.sp-door").count() == 6)
        check(f"links to 1B and hub@{w}", pg.locator("a[href='/curriculum/soundscape-path/week-1/lesson-1b']").count() >= 1 and pg.locator("a[href='/curriculum/soundscape-path/week-1']").count() >= 1)
        snd = pg.evaluate("window.__snd")
        check(f"zero audio contexts / media plays after all interactions@{w}", snd["ctx"] == 0 and snd["media"] == 0, str(snd))
        check(f"no console errors@{w}", not errs, str(errs[:2]))
        ctx.close()
    b.close()

for label, detail, ok in results:
    if not ok: print("FAIL", label, "|", detail[:220])
print(json.dumps({"checks": len(results), "failed": len(failed)}))
sys.exit(1 if failed else 0)
