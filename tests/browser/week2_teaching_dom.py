"""Week 2 teaching-coverage and resource checks against the REAL rendered DOM (no audio played).
Run: ~/queen-city-redline/.venv-crawl4ai/bin/python tests/browser/week2_teaching_dom.py http://127.0.0.1:3324"""
import re, sys, json
from playwright.sync_api import sync_playwright

ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3324"
BASE = ORIGIN + "/curriculum/soundscape-path"
def norm(t): return re.sub(r"\s+", " ", t.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')).lower()
results, failed = [], []
def has(page, label, *needles, absent=False):
    txt = norm(page.evaluate("document.body.innerText"))
    for n in needles:
        ok = (norm(n) not in txt) if absent else (norm(n) in txt)
        results.append((label, ("ABSENT: " if absent else "") + n[:70], ok))
        if not ok: failed.append((label, n))
def check(label, cond, detail=""):
    results.append((label, detail, bool(cond)))
    if not cond: failed.append((label, detail))
def reveal_checks(pg, n):
    for _ in range(n): pg.get_by_role("button", name="Show the explanation").first.click()

with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (1280, 320):
        pg = b.new_page(viewport={"width": w, "height": 900})
        pg.goto(BASE + "/week-2", wait_until="networkidle")
        has(pg, f"hub@{w}", "Welcome to Week 2", "what happens when two musical voices are free to make their own choices", "dyad" if False else "interval number", "Interval quality", "oblique", "contrary", "similar", "parallel",
            "C4 and E4 are two separate pitches", "four semitone steps", "perfect fourth", "Discover how two-note combinations are called dyads", "Learn to distinguish oblique, contrary, similar and parallel motion",
            "Follow two melodic paths through time", "find and build major and minor thirds", "The Interval Palette is a reference")
        # ---- 2A
        pg.goto(BASE + "/week-2/lesson-2a", wait_until="networkidle")
        has(pg, f"2A@{w}", "What does it mean to hear two voices?", "Two notes sounding together are often called a dyad", "A voice is a musical line through time", "What is an interval, and why does its name have two parts?",
            "We do not count the starting C as semitone one", "C4→E4: letters C–D–E = third, chromatic steps = 4, name major third", "E4→G4: letters E–F–G = third, chromatic steps = 3, name minor third",
            "C4→F4: letters C–D–E–F = fourth, chromatic steps = 5, name perfect fourth", "D4→E4: letters D–E = second, chromatic steps = 2, name major second",
            "A palette of measurable distances", "Meet the intervals: a palette of musical distances", "Major third", "Perfect fourth", "Major second", "Minor third", "the tritone",
            "One note changes, so the interval changes", "oblique motion", "The bass can be the moving voice too", "Use interval knowledge to make a musical choice", "A dyad is a two-note combination")
        check(f"2A palette four cards@{w}", pg.locator("[data-interval]").count() == 4, str(pg.locator("[data-interval]").count()))
        pg.get_by_role("button", name="Open all thirteen").click()
        check(f"2A palette thirteen@{w}", pg.locator("[data-interval]").count() == 4 + 13)
        reveal_checks(pg, 4)
        has(pg, f"2A checks@{w}", "Two distinct pitches sounding together.", "We can follow the lower and upper parts separately as time unfolds.")
        # 2A palette exact pairs
        has(pg, f"2A pairs@{w}", "C4 + E4", "C4 + F4", "D4 + E4", "E4 + G4")
        # ---- 2B
        pg.goto(BASE + "/week-2/lesson-2b", wait_until="networkidle")
        has(pg, f"2B@{w}", "What can two independent musical lines do?", "vertical interval", "horizontal motion", "Four ways of describing how two voices move",
            "Oblique motion means one voice remains on the same pitch", "Contrary motion means the voices move in opposite directions", "Similar motion means both voices move in the same direction",
            "Parallel motion is a special form of similar motion", "B3+F4", "diminished fifth", "The tritone — size and spelling are different questions", "C4 to F♯4", "augmented fourth",
            "Which voice changed the interval?", "Compose a conversation, not just a stack of notes", "C4+E4 → C4+F4 → B3+F4 → C4+E4", "Five ways to change the same beginning")
        reveal_checks(pg, 4)
        has(pg, f"2B checks@{w}", "Oblique; the stable note is still part of the comparison.", "Similar, not parallel.")
        pg.get_by_role("button", name="Reveal all five in text").click()
        has(pg, f"2B five@{w}", "B3+F4", "D4+F4", "diminished fifth (tritone) · 6", "minor third · 3", "perfect fourth · 5", "major second · 2")
        # ---- 2C
        pg.goto(BASE + "/week-2/lesson-2c", wait_until="networkidle")
        has(pg, f"2C@{w}", "What have we learned about listening to two lines?", "A moving line and a simultaneous interval are not the same thing", "Counterpoint is a broader approach",
            "Change the supporting note, hear the same melody differently", "E4–F4–E4", "B3 under F4", "How to describe what you hear", "Turn an example into your own miniature",
            "I kept ___ the same, moved ___, and noticed ___", "Week 3", "phrases")
        pg.get_by_role("button", name="Show the interval at this moment").click()
        has(pg, f"2C intervals@{w}", "B3 + F4: diminished fifth (tritone), 6", "C4 + F4: perfect fourth, 5")
        # ---- resources
        pg.goto(BASE + "/resources", wait_until="networkidle")
        has(pg, f"resources@{w}", "Tools for listening, imagining and making music", "The Ajourné Interval Palette", "13 landmarks", "Open Interval Palette")
        pg.goto(BASE + "/resources/interval-palette", wait_until="networkidle")
        check(f"palette 13 cards@{w}", pg.locator("[data-interval]").count() == 13)
        check(f"palette anchors@{w}", all(pg.locator(f"#ip-{i:02d}").count() == 1 for i in range(13)))
        names = ["Perfect unison", "Minor second", "Major second", "Minor third", "Major third", "Perfect fourth", "Tritone", "Perfect fifth", "Minor sixth", "Major sixth", "Minor seventh", "Major seventh", "Perfect octave"]
        for i, nm in enumerate(names):
            card = pg.locator(f"#ip-{i:02d}")
            check(f"card {i} name@{w}", nm in card.inner_text() and f"{i}" in card.inner_text(), nm)
        has(pg, f"palette text@{w}", "C4 + D♭4", "C4 + E♭4", "C4 + A♭4", "C4 + B♭4", "C4 + F♯4", "G♭4", "diminished fifth")
        # open every deep story; seven sections each
        for i in range(13):
            pg.locator(f"#ip-{i:02d}").get_by_role("button", name="Open the deeper story").click()
        deep = pg.locator("[data-deep]")
        check(f"13 deep chapters open@{w}", deep.count() == 13)
        secs = ["Meet the interval", "As a moving melody", "Two notes together", "In actual music", "Listen and create", "Paint What You Hear", "Keep in mind"]
        check(f"each deep chapter has 7 sections@{w}", all(all(s in deep.nth(i).inner_text() for s in secs) for i in range(13)))
        has(pg, f"deep text@{w}", "Count C–D–E inclusively to find a third", "A unison puts two pitches on exactly the same keyboard position", "A four-semitone major third is not scientifically guaranteed to sound happy")
        has(pg, f"six deeper chapters@{w}", "Why the same interval changes with the instrument", "A third is not always the same size", "Turn an interval around", "A dyad can grow into harmony", "Your colors are welcome to disagree", "Musical relationships are part of living music", "Your interval studio")
        pg.close()
    b.close()

for label, needle, ok in results:
    if not ok: print("FAIL", label, "|", needle)
print(json.dumps({"checks": len(results), "failed": len(failed)}))
sys.exit(1 if failed else 0)
