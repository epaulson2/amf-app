import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import subprocess
import os

OUTPUT_DIR = "/home/elderle/amf-app/public"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(device_scale_factor=2)
        page = await ctx.new_page()
        await page.goto("https://amf.elderle.app/practice_plan.html")
        await page.wait_for_timeout(2500)

        pages = await page.query_selector_all('.page')
        print(f"Found {len(pages)} pages")

        png_paths = []
        for i, el in enumerate(pages):
            path = f"{OUTPUT_DIR}/practice_plan_p{i+1}.png"
            await el.screenshot(path=path)
            print(f"  captured page {i+1} → {path}")
            png_paths.append(path)

        await browser.close()

    pdf_paths = []
    for png in png_paths:
        pdf = png.replace('.png', '.pdf')
        img = Image.open(png).convert('RGB')
        img.save(pdf, 'PDF', resolution=144.0)
        pdf_paths.append(pdf)
        print(f"  converted {pdf}")

    out = f"{OUTPUT_DIR}/amf_practice_plan.pdf"
    subprocess.run(['pdfunite'] + pdf_paths + [out], check=True)
    print(f"\nDone: {out}")

    for f in png_paths + pdf_paths[:-1] if len(pdf_paths) > 1 else png_paths:
        try: os.remove(f)
        except: pass

asyncio.run(main())
