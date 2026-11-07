import os
from playwright.sync_api import sync_playwright
R=os.getcwd()+"/docs/nb-json-pilot/round3-infographic"; T="/tmp/claude-1000/nb"
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,dpr,out in(("desktop",1200,2,"infographic.desktop.2400.png"),("phone",390,3,"infographic.phone.390.png")):
        f=f"{T}/_r{name}.html"; open(f,"w").write(f'<body style="margin:0;background:#F9F5ED"><img src="file://{R}/source/infographic.{name}.svg" style="display:block;width:{w}px">')
        pg=b.new_page(viewport={"width":w,"height":800},device_scale_factor=dpr); pg.goto("file://"+f); pg.wait_for_timeout(500)
        pg.screenshot(path=f"{R}/final/{out}",full_page=True,timeout=120000); pg.close()
    b.close()
