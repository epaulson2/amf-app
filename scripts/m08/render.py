"""Render desktop/phone/print SVGs -> transparent PNG; proofs on cream+slate are made by the QA step. Usage: render.py ID..."""
import os, sys, re
from playwright.sync_api import sync_playwright
D=os.getcwd()+"/docs/m08"; T="/tmp/claude-1000/nb"; os.makedirs(T,exist_ok=True)
ids=sys.argv[1:] or sorted(os.listdir(D+"/assets"))
DSF={"desktop":1.5,"phone":2,"print":1.5}
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(device_scale_factor=1.5)
    for i in ids:
        for name,dsf in DSF.items():
            f=f"{D}/assets/{i}/{i}.{name}.svg"
            s=open(f).read(); w,h=map(float,re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"',s).groups())
            h_=f"{T}/_m8.html"; open(h_,"w").write(f'<body style="margin:0;background:transparent"><img src="file://{f}" style="display:block;width:{w}px;height:{h}px">')
            ctx=b.new_context(device_scale_factor=dsf,viewport={"width":int(w),"height":int(h)}); q=ctx.new_page(); q.goto("file://"+h_); q.wait_for_timeout(120)
            q.screenshot(path=f"{D}/assets/{i}/{i}.{name}.png",omit_background=True,timeout=120000,clip={"x":0,"y":0,"width":w,"height":h}); ctx.close()
    b.close()
