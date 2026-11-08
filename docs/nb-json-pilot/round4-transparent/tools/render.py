import os
from playwright.sync_api import sync_playwright
R=os.getcwd()+"/docs/nb-json-pilot/round4-transparent"; T="/tmp/claude-1000/nb"; os.makedirs(T,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,dpr,out in(("desktop",1200,2,"infographic.desktop.transparent.png"),("phone",390,3,"infographic.phone.transparent.png")):
        f=f"{T}/_t{name}.html"; open(f,"w").write(f'<body style="margin:0;background:transparent"><img src="file://{R}/source/infographic.{name}.svg" style="display:block;width:{w}px">')
        pg=b.new_page(viewport={"width":w,"height":800},device_scale_factor=dpr); pg.goto("file://"+f); pg.wait_for_timeout(500)
        pg.screenshot(path=f"{R}/final/{out}",full_page=True,omit_background=True,timeout=120000); pg.close()
    # proof composites: the FINISHED PNGs over two plain colours
    for tag,col in(("cream","#F9F5ED"),("slate","#C9D3E0")):
        for name,w,out in(("desktop",1200,"desktop"),("phone",390,"phone")):
            f=f"{T}/_p{tag}{name}.html"; open(f,"w").write(f'<body style="margin:0;background:{col}"><img src="file://{R}/final/infographic.{name}.transparent.png" style="display:block;width:{w}px">')
            pg=b.new_page(viewport={"width":w,"height":800}); pg.goto("file://"+f); pg.wait_for_timeout(300)
            pg.screenshot(path=f"{R}/proof/{out}.on-{tag}.png",full_page=True); pg.close()
    b.close()
