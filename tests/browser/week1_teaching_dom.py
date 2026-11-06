"""Teaching-coverage check against the REAL rendered DOM (no audio is played).
Run: ~/queen-city-redline/.venv-crawl4ai/bin/python tests/browser/week1_teaching_dom.py http://127.0.0.1:3323
Each assertion reads document.body.innerText, so text inside closed <details> or behind an unopened gate does not count."""
import re, sys, json
from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3323") + "/curriculum/soundscape-path/week-1"
def norm(t): return re.sub(r"\s+", " ", t.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')).lower()
results, failed = [], []
def has(page, label, *needles, absent=False):
    txt = norm(page.evaluate("document.body.innerText"))
    for n in needles:
        ok = (norm(n) not in txt) if absent else (norm(n) in txt)
        results.append((label, ("ABSENT: " if absent else "") + n[:70], ok))
        if not ok: failed.append((label, n))

with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (1280, 320):
        pg = b.new_page(viewport={"width": w, "height": 900})
        # ---- hub
        pg.goto(BASE, wait_until="networkidle")
        has(pg, f"hub@{w}", "Welcome to your first musical landscape", "pitch", "tonal center", "octave", "semitone", "whole step", "scale", "melodic voice", "harmony",
            "Those words aren't a vocabulary exam", "Learn what pitch and a note are", "Learn to measure the smallest steps on the keyboard", "Learn how one musical voice can stay while another moves",
            "you'll be able to find C on a keyboard", "build the C-major scale", "Read the idea, hear an example, try it yourself")
        # ---- 1A
        pg.goto(BASE + "/lesson-1a", wait_until="networkidle")
        has(pg, f"1A@{w}", "Before we listen — what is a musical note?", "Pitch is how high or low we hear a sound", "timbre", "What is a tonal center?", "tonic",
            "One held C is not automatically a C-major chord", "Reading the keyboard as a map", "groups of two and three" if False else "alternate in groups of two and three",
            "The white key directly to their left is C", "octave", "registers", "A note becomes a musical relationship", "which pitch stays and which pitch changes",
            "make one soft note last 10–15 seconds", "Pitch tells us high and low; timbre is sound color")
        pg.get_by_role("button", name="E", exact=True).first.click()
        has(pg, f"1A check wrong@{w}", "Try listening again: one note stays under every example.")
        pg.get_by_role("button", name="C", exact=True).first.click()
        has(pg, f"1A check right@{w}", "C is the chosen reference. The upper notes can change while it stays.")
        for _ in range(3): pg.get_by_role("button", name="Show the explanation").first.click()
        has(pg, f"1A map checks@{w}", "an octave", "No; they are two pitches sounding together, not a three-note C-major triad.")
        # ---- 1B before reveal
        pg.goto(BASE + "/lesson-1b", wait_until="networkidle")
        has(pg, f"1B pre-reveal@{w}", "From a home note to a musical journey", "A melody is a line of pitches heard in sequence", "Reveal a possible ending")
        has(pg, f"1B no leak@{w}", "C5", "next C", "leading tone", "MIDI 72", "B and the next C", absent=True)
        # muted learner: one plain click, no audio played
        pg.get_by_role("button", name="Reveal a possible ending").first.click()
        has(pg, f"1B post-reveal@{w}", "What is a semitone? What is a whole step?", "A semitone is the distance from one piano key to its nearest neighboring key",
            "C → C-sharp → D", "E and F have no black key between them", "What is a scale, and how is C major made?", "whole, whole, half, whole, whole, whole, half",
            "You have built C–D–E–F–G–A–B–C", "E → F", "B → C", "Why does an ending feel like an arrival?", "leading tone", "B doesn't always have to resolve to C",
            "An interval is a distance between notes")
        for _ in range(2): pg.get_by_role("button", name="Show the explanation").first.click()
        has(pg, f"1B checks@{w}", "Because it spans two adjacent-key moves")
        # ---- 1C
        pg.goto(BASE + "/lesson-1c", wait_until="networkidle")
        has(pg, f"1C@{w}", "From finding notes to shaping a piece", "Notes, voices, harmony and chords — four different ideas", "A single held C by itself is not a C-major chord",
            "One pitch event: E4 sounds.", "How simultaneous pitches relate", "A particular grouping of simultaneous pitches", "Time is a musical material", "duration", "Repetition", "Variation", "Form",
            "timing alone can change a phrase's shape", "Compose it with an intention", "I kept ___ the same, changed ___, and noticed ___", "Harmony is not restricted to three-note chords",
            "Next we'll study the distances between notes more closely", "A note is one named pitch; a voice is a line through time")
        pg.close()
    b.close()

for label, needle, ok in results:
    if not ok: print("FAIL", label, "|", needle)
print(json.dumps({"checks": len(results), "failed": len(failed)}))
sys.exit(1 if failed else 0)
