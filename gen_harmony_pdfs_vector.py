"""Regenerate all harmony_*.html as proper vector PDFs using Playwright's page.pdf()."""
import asyncio
from playwright.async_api import async_playwright
import glob, os

BASE_URL = "https://amf.elderle.app"
PUBLIC = "/home/elderle/amf-app/public"

TARGETS = sorted([
    os.path.splitext(os.path.basename(f))[0]
    for f in glob.glob(f"{PUBLIC}/harmony_*.html")
])

async def make_pdf(page, name):
    url = f"{BASE_URL}/{name}.html"
    pdf_path = f"{PUBLIC}/{name}.pdf"

    await page.goto(url)
    await page.wait_for_timeout(2000)

    # Get all .page elements and total height
    info = await page.evaluate("""() => {
        const els = document.querySelectorAll('.page');
        if (!els.length) return null;
        const first = els[0].getBoundingClientRect();
        let totalH = 0;
        els.forEach(el => { totalH += el.getBoundingClientRect().height + 28; });
        return { width: first.width, totalHeight: totalH, count: els.length };
    }""")

    if not info:
        print(f"  ✗ {name} — no .page element found")
        return False

    w = int(info['width'])
    h = int(info['totalHeight'])

    # Make body white and remove padding so PDF has clean edges
    await page.evaluate("""() => {
        document.body.style.background = 'white';
        document.body.style.padding = '0';
        document.body.style.margin = '0';
        document.body.style.alignItems = 'unset';
        document.body.style.justifyContent = 'unset';
        document.querySelectorAll('.page').forEach(el => {
            el.style.marginLeft = '0';
            el.style.marginRight = '0';
            el.style.boxShadow = 'none';
        });
    }""")

    await page.set_viewport_size({"width": w, "height": h + 100})

    await page.pdf(
        path=pdf_path,
        width=f"{w}px",
        height=f"{h}px",
        print_background=True,
        scale=1.0
    )

    size = os.path.getsize(pdf_path)
    print(f"  ✓ {name}.pdf  ({size//1024}KB, {info['count']} page(s), vector)")
    return True

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        ok = 0
        for name in TARGETS:
            result = await make_pdf(page, name)
            if result:
                ok += 1

        await browser.close()
    print(f"\nDone — {ok}/{len(TARGETS)} PDFs regenerated as vector")

asyncio.run(main())
