import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import subprocess, os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(device_scale_factor=2)
        page = await ctx.new_page()
        await page.goto("https://amf.elderle.app/amf_workbook.html")
        await page.wait_for_timeout(2500)
        pages = await page.query_selector_all('.page')
        print(f"Found {len(pages)} pages")
        pdfs = []
        for i, el in enumerate(pages):
            png = f"/home/elderle/amf-app/public/wb_p{i+1}.png"
            pdf = f"/home/elderle/amf-app/public/wb_p{i+1}.pdf"
            await el.screenshot(path=png)
            sz = os.path.getsize(png)
            if sz < 5000:
                raise RuntimeError(f"Page {i+1} too small: {sz} bytes")
            Image.open(png).convert('RGB').save(pdf, 'PDF', resolution=144.0)
            os.remove(png)
            pdfs.append(pdf)
            print(f"  page {i+1} → {os.path.getsize(pdf)//1024}KB")
        await browser.close()
    out = "/home/elderle/amf-app/public/amf_workbook.pdf"
    subprocess.run(['pdfunite'] + pdfs + [out], check=True)
    for f in pdfs:
        os.remove(f)
    print(f"Done: {out} ({os.path.getsize(out)//1024}KB)")

asyncio.run(main())
