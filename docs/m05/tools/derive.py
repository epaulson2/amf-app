#!/usr/bin/env python3
"""M05 VARIANT assets (no model calls): IPV-02 card crops (4:5), IPV-03 chapter openers (3:2), IPV-31 micro icons, IPV-32 mini banners (3:1). Cropped from the generated art, trimmed to the painted area, composited on transparent canvases."""
import os, json, hashlib, numpy as np
from PIL import Image
W='/home/elderle/amf-work/amf-ajourne-m05/'; A=W+'public/soundscape/m05/art/'; O=W+'public/soundscape/m05/derived/'; os.makedirs(O,exist_ok=True)
reg={}
def trim(im,thr=10):
    a=np.asarray(im)[...,3]; ys,xs=np.where(a>thr); return im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
def fit(im,cw,ch,pad=.06):
    t=trim(im); s=min(cw*(1-2*pad)/t.width,ch*(1-2*pad)/t.height); t=t.resize((max(1,int(t.width*s)),max(1,int(t.height*s))),Image.LANCZOS)
    c=Image.new('RGBA',(cw,ch),(0,0,0,0)); c.alpha_composite(t,((cw-t.width)//2,(ch-t.height)//2)); return c
def save(name,im,src,kind,note):
    p=O+name; im.save(p+'.png',optimize=True); im.save(p+'.webp',quality=92,method=6)
    al=np.asarray(im)[...,3]; b=int(max(al[0].max(),al[-1].max(),al[:,0].max(),al[:,-1].max()))
    reg[name]={'id':name,'kind':kind,'derived_from':src,'cost_usd':0,'model':'none (derived)','size':list(im.size),'alpha_border_max':b,'png':f'public/soundscape/m05/derived/{name}.png','webp':f'public/soundscape/m05/derived/{name}.webp','png_sha256':hashlib.sha256(open(p+'.png','rb').read()).hexdigest(),'note':note}
for n in range(10,23):
    src=Image.open(A+f'IPV-{n}.png').convert('RGBA'); i=n
    save(f'IPV-02-card-{n}',fit(src,800,1000),f'IPV-{n}','IPV-02 card art 4:5','Reusable card crop for the quick card.')
    save(f'IPV-03-chapter-{n}',fit(src,1200,800,.04),f'IPV-{n}','IPV-03 chapter opener 3:2','Roomier chapter opener recomposition; same art, new canvas.')
    save(f'IPV-31-icon-{n}',fit(src,96,96,.04),f'IPV-{n}','IPV-31 micro icon','96px recognisable crop; native name always accompanies it.')
for i,(sid,box) in enumerate([('IPV-01',None),('IPV-04',None),('IPV-05',None),('IPV-08',None)]):
    src=Image.open(A+sid+'.png').convert('RGBA'); save(f'IPV-32-banner-{sid[-2:]}',fit(src,1500,500,.05),sid,'IPV-32 mini banner 3:1','Section mini-banner; real HTML heading sits beside it.')
json.dump(reg,open(W+'docs/m05/derived_registry.json','w'),indent=1)
print(len(reg),'derived assets; max border alpha',max(v['alpha_border_max'] for v in reg.values()))
