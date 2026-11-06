import sys, os
from PIL import Image, ImageDraw
W='/home/elderle/amf-work/amf-ajourne-m05/public/soundscape/m05/art/'
ids=sys.argv[2:]; out=sys.argv[1]; cols=2 if len(ids)<=4 else 4; tw=560
tiles=[]
for i in ids:
    im=Image.open(W+i+'.png').convert('RGBA'); r=tw/im.width; im=im.resize((tw,int(im.height*r)))
    bg=Image.new('RGBA',im.size,(249,245,237,255)); bg.alpha_composite(im); d=ImageDraw.Draw(bg); d.text((8,6),i,fill=(62,34,65,255)); tiles.append(bg)
rows=[tiles[k:k+cols] for k in range(0,len(tiles),cols)]
H=sum(max(t.height for t in r) for r in rows); sheet=Image.new('RGB',(tw*cols,H),(249,245,237)); y=0
for r in rows:
    for c,t in enumerate(r): sheet.paste(t.convert('RGB'),(c*tw,y))
    y+=max(t.height for t in r)
sheet.save(out)
