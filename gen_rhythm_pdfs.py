#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

PUBLIC = "/home/elderle/amf-app/public"

PAGES = [
    ("rhythm_sheet_a1", 1200, 900),
    ("rhythm_sheet_a2", 1200, 900),
    ("rhythm_infographic_a", 1200, 800),
    ("rhythm_sheet_b1", 1200, 900),
    ("rhythm_sheet_b2", 1200, 900),
    ("rhythm_infographic_b", 1200, 800),
    ("rhythm_sheet_c1", 1200, 900),
    ("rhythm_sheet_c2", 1200, 900),
    ("rhythm_infographic_c", 1200, 800),
    ("rhythm_sheet_d1", 1400, 1000),
    ("rhythm_infographic_d", 1400, 900),
    ("rhythm_sheet_e1", 1200, 1100),
    ("rhythm_infographic_e", 1200, 800),
    ("rhythm_practice_plan", 1400, 1800),
    ("rhythm_workbook", 1400, 2200),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, w, h in PAGES:
            html_path = f"file://{PUBLIC}/{name}.html"
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(html_path, wait_until="networkidle")
            await page.pdf(
                path=f"{PUBLIC}/{name}.pdf",
                width=f"{w}px",
                height=f"{h}px",
                print_background=True,
                scale=1.0
            )
            print(f"✓ {name}.pdf")
            await page.close()
        await browser.close()

asyncio.run(main())
