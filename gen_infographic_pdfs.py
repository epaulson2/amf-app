import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import os

BASE_URL = "https://amf.elderle.app"
PUBLIC = "/home/elderle/amf-app/public"

INFOGRAPHICS = [
    "infographic_a4_zones",
    "infographic_b4_ladder",
    "infographic_c4_chord_tones",
    "infographic_d4_context",
    "infographic_e4_chord_changes",
    "infographic_f3_tension_curve",
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

        for name in INFOGRAPHICS:
            url = f"{BASE_URL}/{name}.html"
            png = f"{PUBLIC}/{name}_tmp.png"
            pdf = f"{PUBLIC}/{name}.pdf"

            await page.goto(url)
            await page.wait_for_timeout(1500)

            # Try .page element first, fall back to full page
            el = await page.query_selector('.page')
            if el:
                await el.screenshot(path=png)
            else:
                await page.screenshot(path=png, full_page=True)

            img = Image.open(png).convert('RGB')
            img.save(pdf, 'PDF', resolution=144.0)
            os.remove(png)
            print(f"  ✓ {name}.pdf")

        await browser.close()

    print(f"\nDone — {len(INFOGRAPHICS)} PDFs generated.")

asyncio.run(main())
