import asyncio
from playwright.async_api import async_playwright
import glob, os

BASE_URL = "https://amf.elderle.app"
PUBLIC = "/home/elderle/amf-app/public"

async def make_pdf(page, name):
    await page.goto(f"{BASE_URL}/{name}.html")
    await page.wait_for_timeout(2000)
    info = await page.evaluate("""() => {
        const els = document.querySelectorAll('.page');
        if (!els.length) return null;
        let h = 0;
        els.forEach(el => { h += el.getBoundingClientRect().height + 28; });
        return { width: els[0].getBoundingClientRect().width, height: h, count: els.length };
    }""")
    if not info:
        print(f"  ✗ {name} — no .page found"); return
    await page.evaluate("""() => {
        document.body.style.background = 'white';
        document.body.style.padding = '0';
        document.body.style.margin = '0';
        document.body.style.alignItems = 'unset';
        document.querySelectorAll('.page').forEach(el => {
            el.style.marginLeft = '0'; el.style.marginRight = '0'; el.style.boxShadow = 'none';
        });
    }""")
    await page.set_viewport_size({"width": int(info['width']), "height": int(info['height']) + 100})
    await page.pdf(path=f"{PUBLIC}/{name}.pdf", width=f"{int(info['width'])}px",
                   height=f"{int(info['height'])}px", print_background=True, scale=1.0)
    size_kb = os.path.getsize(f'{PUBLIC}/{name}.pdf') // 1024
    print(f"  ✓ {name}.pdf ({size_kb}KB, vector)")

async def main():
    targets = sorted([os.path.splitext(os.path.basename(f))[0]
                      for f in glob.glob(f"{PUBLIC}/voicing_*.html")])
    print(f"Found {len(targets)} voicing HTML files")
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        pg = await browser.new_page()
        for name in targets:
            await make_pdf(pg, name)
        await browser.close()
    print(f"\nDone — {len(targets)} PDFs generated")

asyncio.run(main())
