import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import subprocess, os

BASE_URL = "https://amf.elderle.app"
PUBLIC = "/home/elderle/amf-app/public"

# Single-page sheets
SINGLE = [
    "melody_sheet_v3",   # 1A
    "melody_sheet_2a",   # 2A
    "melody_sheet_3a",   # 3A
    "melody_sheet_3b",   # 3B
    "melody_sheet_4a",   # 4A
    "melody_sheet_4b",   # 4B
    "melody_sheet_5a",   # 5A
    "melody_sheet_5b",   # 5B
    "melody_sheet_6a",   # 6A
    "melody_sheet_7a",   # 7A
    "melody_sheet_8a",   # 8A
]

# Two-page sheets (have two .page divs)
MULTI = [
    "melody_sheet_1b",   # 1B
    "melody_sheet_2b",   # 2B
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(device_scale_factor=2)
        page = await ctx.new_page()

        for name in SINGLE:
            await page.goto(f"{BASE_URL}/{name}.html")
            await page.wait_for_timeout(1200)
            el = await page.query_selector('.page')
            png = f"{PUBLIC}/{name}_tmp.png"
            await el.screenshot(path=png)
            pdf = f"{PUBLIC}/{name}.pdf"
            Image.open(png).convert('RGB').save(pdf, 'PDF', resolution=144.0)
            os.remove(png)
            print(f"  ✓ {name}.pdf")

        for name in MULTI:
            await page.goto(f"{BASE_URL}/{name}.html")
            await page.wait_for_timeout(1200)
            els = await page.query_selector_all('.page')
            pdfs = []
            for i, el in enumerate(els):
                png = f"{PUBLIC}/{name}_p{i+1}_tmp.png"
                await el.screenshot(path=png)
                pdf = f"{PUBLIC}/{name}_p{i+1}.pdf"
                Image.open(png).convert('RGB').save(pdf, 'PDF', resolution=144.0)
                os.remove(png)
                pdfs.append(pdf)
            out = f"{PUBLIC}/{name}.pdf"
            subprocess.run(['pdfunite'] + pdfs + [out], check=True)
            for f in pdfs:
                os.remove(f)
            print(f"  ✓ {name}.pdf ({len(els)} pages)")

        await browser.close()

asyncio.run(main())
