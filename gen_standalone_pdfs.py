import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import os

BASE_URL = "https://amf.elderle.app"
PUBLIC = "/home/elderle/amf-app/public"

TARGETS = [
    "infographic_i1_poster",
    "infographic_i2_ladder",
    "infographic_i3_chord_tones",
    "infographic_i4_context",
    "infographic_i5_chord_changes",
    "infographic_i6_tension_curve",
    "infographic_i7_nct_types",
    "infographic_i8_sweet_home_chicago",
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(device_scale_factor=2)
        page = await ctx.new_page()

        for name in TARGETS:
            url = f"{BASE_URL}/{name}.html"
            png = f"{PUBLIC}/{name}_tmp.png"
            pdf = f"{PUBLIC}/{name}.pdf"

            await page.goto(url)
            await page.wait_for_timeout(2000)

            el = await page.query_selector('.page')
            if el:
                await el.screenshot(path=png)
                size = os.path.getsize(png)
                if size < 1000:
                    raise RuntimeError(f"{name}: screenshot too small ({size} bytes) — .page may be empty")
                img = Image.open(png).convert('RGB')
                img.save(pdf, 'PDF', resolution=144.0)
                os.remove(png)
                pdf_size = os.path.getsize(pdf)
                print(f"  ✓ {name}.pdf  ({pdf_size//1024}KB)")
            else:
                raise RuntimeError(f"{name}: no .page element found at {url}")

        await browser.close()
    print(f"\nDone — {len(TARGETS)} PDFs")

asyncio.run(main())
