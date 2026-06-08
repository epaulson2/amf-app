#!/usr/bin/env python3
"""Generate PDFs for all AMF modules."""
import asyncio
import os
import subprocess
from pathlib import Path
from playwright.async_api import async_playwright

PUBLIC = Path("/home/elderle/amf-app/public")

async def capture_pages(browser, html_path, output_prefix):
    ctx = await browser.new_context(device_scale_factor=2)
    page = await ctx.new_page()
    await page.goto(f"file://{html_path}")
    await page.wait_for_timeout(1800)
    pages = await page.query_selector_all('.page')
    paths = []
    if not pages:
        # Fallback: screenshot whole page
        path = f"{output_prefix}_p1.png"
        await page.screenshot(path=path, full_page=True)
        paths.append(path)
    else:
        for i, el in enumerate(pages):
            path = f"{output_prefix}_p{i+1}.png"
            await el.screenshot(path=path)
            paths.append(path)
    await ctx.close()
    return paths


def pngs_to_pdf(png_paths, pdf_out):
    try:
        from PIL import Image
        images = []
        for p in png_paths:
            img = Image.open(p).convert('RGB')
            images.append(img)
        if images:
            images[0].save(pdf_out, 'PDF', resolution=144.0,
                          save_all=True, append_images=images[1:])
            print(f"  Created: {pdf_out}")
        for p in png_paths:
            os.remove(p)
    except Exception as e:
        print(f"  PDF error: {e}")
        # Fallback: try img2pdf or just copy first png
        pass


async def main():
    # Module definitions: (pdf_name, [html_files])
    modules = [
        ("emotional_map_module2.pdf", ["melody_sheet_2a.html", "melody_sheet_2b.html"]),
        ("emotional_map_module3.pdf", ["melody_sheet_3a.html", "melody_sheet_3b.html"]),
        ("emotional_map_module4.pdf", ["melody_sheet_4a.html", "melody_sheet_4b.html"]),
        ("emotional_map_module5.pdf", ["melody_sheet_5a.html", "melody_sheet_5b.html"]),
        ("emotional_map_module6.pdf", ["melody_sheet_6a.html"]),
        ("emotional_map_module7.pdf", ["melody_sheet_7a.html"]),
        ("emotional_map_module8.pdf", ["melody_sheet_8a.html"]),
    ]

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        for pdf_name, html_files in modules:
            print(f"\nGenerating {pdf_name}...")
            all_pngs = []
            for i, html_file in enumerate(html_files):
                html_path = PUBLIC / html_file
                if not html_path.exists():
                    print(f"  WARNING: {html_file} not found")
                    continue
                prefix = f"/tmp/amf_pdf_{pdf_name.replace('.pdf','')}_sheet{i}"
                pngs = await capture_pages(browser, str(html_path), prefix)
                all_pngs.extend(pngs)
                print(f"  Captured {len(pngs)} page(s) from {html_file}")

            if all_pngs:
                pngs_to_pdf(all_pngs, str(PUBLIC / pdf_name))

        await browser.close()

    print("\nDone!")


if __name__ == "__main__":
    asyncio.run(main())
