"""Render M07 SVGs to PNG with real Chromium. Usage: shots.py <outdir> <variant> <id> [<id>...]   (variant: screen|narrow|print)"""
import sys, os
from playwright.sync_api import sync_playwright
out, variant, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
root = os.path.abspath("public/soundscape/m07")
bg = "#ffffff" if variant == "print" else "#F9F5ED"
W = {"screen": 776, "narrow": 376, "print": 776}[variant]
os.makedirs(out, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": W, "height": 400}, device_scale_factor=2 if variant != "screen" else 1.5)
    for i in ids:
        html = f"{out}/_{i}.{variant}.html"
        open(html, "w").write(f'<body style="margin:0;background:{bg}"><img src="file://{root}/{variant}/{i}.svg" style="display:block;margin:0 auto"></body>')
        pg.goto(f"file://{os.path.abspath(html)}")
        pg.wait_for_timeout(120)
        pg.locator("img").screenshot(path=f"{out}/{i}.{variant}.png")
        os.remove(html)
    b.close()
