#!/usr/bin/env python3
"""Ajourné Interval Palette: source-driven correction illustrations, SVG+PNG.
Every note, keyboard and staff is generated mathematically, not inferred from AI images.
"""
import os, re, json, math, html, hashlib, zipfile
from pathlib import Path
import cairosvg
from PIL import Image, ImageDraw, ImageFont

OUT=Path('/tmp/claude-1000/-home-elderle-amf-work-amf-app/8b7ee6c1-5db3-4233-8c49-f0276e88eeb3/scratchpad/g3fix/out')
W,H=1122,1402
OUT.mkdir(parents=True,exist_ok=True)
for d in ('PNG/cards','PNG/support','SVG/cards','SVG/support','previews'):
 (OUT/d).mkdir(parents=True,exist_ok=True)
COLORS={0:'#76848C',1:'#C25562',2:'#C17D41',3:'#8964A4',4:'#AB812D',5:'#4F816B',6:'#5366A0',7:'#347B97',8:'#A95E86',9:'#B47752',10:'#367C79',11:'#7978B3',12:'#89845D'}
NOTES={'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11}
STEPS={'C':-1,'D':0,'E':1,'F':2,'G':3,'A':4,'B':5} # measured in line/space diatonic steps from D4 (D4=0), E4=1
# NOTE: treble bottom line E4; staff step (half line spacing) above E4: E4=0, F4=1, G4=2, A4=3, B4=4, C5=5; C4=-2
STEPS={'C':-2,'D':-1,'E':0,'F':1,'G':2,'A':3,'B':4}


def sem(n):return f'{n} semitone'+('' if n==1 else 's')
def attr(s):return html.escape(str(s),quote=True)
def text(x,y,s,size=34,color='#382138',weight='normal',anchor='start',style='',family="'Noto Serif',Georgia,serif",opacity=1):
 family=family.replace("'Noto Serif',Georgia,serif","'DejaVu Serif',serif").replace("'Inter',sans-serif","'DejaVu Sans',sans-serif")
 if any(c in str(s) for c in '♭♯→↔'):family="'DejaVu Sans',sans-serif"
 return f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" font-style="{style or "normal"}" text-anchor="{anchor}" fill="{color}" opacity="{opacity}">{html.escape(str(s))}</text>'
def rect(x,y,w,h,fill,rx=16,stroke='none',sw=1,opacity=1):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>'
def ellipse(cx,cy,rx,ry,fill,opacity=1,stroke='none',sw=1):return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" opacity="{opacity}" stroke="{stroke}" stroke-width="{sw}"/>'
def path(d,stroke,sw=2,fill='none',opacity=1):return f'<path d="{d}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" fill="{fill}" opacity="{opacity}"/>'
def base(title,subtitle,accent='#8964A4',idname=''): 
 r=['''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1122" height="1402" viewBox="0 0 1122 1402" role="img">''',f'<title>{html.escape(title)}</title><desc>{html.escape(subtitle)}</desc>']
 r.append(f'''<defs>
 <radialGradient id="wash"><stop offset="0%" stop-color="{accent}" stop-opacity=".075"/><stop offset="72%" stop-color="{accent}" stop-opacity=".018"/><stop offset="100%" stop-color="{accent}" stop-opacity="0"/></radialGradient>
 <radialGradient id="goldwash"><stop offset="0%" stop-color="#F7DCB7" stop-opacity=".60"/><stop offset="100%" stop-color="#F7DCB7" stop-opacity="0"/></radialGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFFFFF" stop-opacity=".95"/><stop offset="48%" stop-color="#FCF6EF" stop-opacity=".86"/><stop offset="100%" stop-color="#EBDFEC" stop-opacity=".64"/></linearGradient>
 <linearGradient id="goldline"><stop offset="0" stop-color="#FFF3C1"/><stop offset=".52" stop-color="#CD9A51"/><stop offset="1" stop-color="#FBDAA2"/></linearGradient>
 <linearGradient id="shimmer"><stop offset="0" stop-color="{accent}" stop-opacity=".36"/><stop offset=".5" stop-color="#FFFFFF" stop-opacity=".75"/><stop offset="1" stop-color="{accent}" stop-opacity=".27"/></linearGradient>
 </defs>''')
 # organic splashes and petals, not a rectangular frame
 for cx,cy,rx,ry in [(280,240,330,160),(890,315,280,230),(320,715,290,330),(850,970,320,380),(500,1250,480,250)]:
  r.append(ellipse(cx,cy,rx,ry,'url(#wash)',.9))
 for cx,cy,rx,ry in [(720,230,320,130),(220,1070,260,155),(740,1310,270,140)]:r.append(ellipse(cx,cy,rx,ry,'url(#goldwash)',.62))
 r.append(path('M 100 87 C 276 62, 380 102, 531 72 S 864 92, 1010 63','#C39F70',4,opacity=.52))
 pass
 # use titles two lines if long
 words=title.split()
 if len(title)>25:
  mid=max(1,len(words)//2)
  for k in range(1,len(words)):
   if abs(len(' '.join(words[:k]))-len(' '.join(words[k:]))) < abs(len(' '.join(words[:mid]))-len(' '.join(words[mid:]))):mid=k
  line1=' '.join(words[:mid]);line2=' '.join(words[mid:]);subtitle_y=283
 else:subtitle_y=236
 pass
 return r, max(300,subtitle_y+35)

def end(r):return '\n'.join(r)+'</svg>'

def wash_pill(x,y,w,h,accent,label,big=False):
 fs=min(43 if big else 27,(w-50)/(0.66*max(1,len(label))))
 return ''.join([ellipse(x+w/2,y+h/2,w*.62,h*.75,'url(#wash)',.76),rect(x,y,w,h,'url(#glass)',h/2,accent,2,.93),text(x+w/2,y+h*(.68 if not big else .69),label,fs,accent,'bold','middle')])

def note_pc(n):
 m=re.match(r'([A-G])([b#]?)(\d)',n)
 if not m:raise ValueError(n)
 return NOTES[m.group(1)+m.group(2)],int(m.group(3))

def keyboard(x,y,w,h,lo='C4',hi='C5',highlights=None,primary='#8964A4',compact=False,octave=None,show_labels=True):
 """Piano C-to-C octave with 8 accurate white keys, 5 accurate black keys; labels in separate pills."""
 highlights=highlights or []
 if octave is None:octave=note_pc(highlights[0])[1] if highlights else 4
 white='CDEFGABC';white_w=w/8
 r=[rect(x-8,y-8,w+16,h+20,'#ECE4E5',12,'#D5BDB9',1,.48)]
 for i,L in enumerate(white):
  X=x+i*white_w
  # determine pitches
  pitch={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}[L]+(12 if i==7 else 0)
  hi_hit=any(note_pc(n)[0]+12*(note_pc(n)[1]-octave)==pitch for n in highlights)
  fill=primary if hi_hit else ('#FFF9F1' if i%2==0 else '#FEFCFA')
  r.append(rect(X+1,y,white_w-2,h,fill,4,'#796E7B',1.3, .80 if hi_hit else .99))
  if hi_hit:r.append(rect(X+6,y+5,white_w-12,h-10,'url(#shimmer)',5,opacity=.62))
  r.append(path(f'M {X+4} {y+h-9} L {X+white_w-4} {y+h-9}','#FFFFFF',1.5,opacity=.7))
 # black keys C# D# F# G# A# at after white index 0,1,3,4,5
 for offset,i in [(1,0),(3,1),(6,3),(8,4),(10,5)]:
  bx=x+(i+1)*white_w-white_w*.30
  bw=white_w*.60
  n='C#4 D#4 F#4 G#4 A#4'.split()[[0,1,3,4,5].index(i)]
  hi_hit=any(note_pc(k)[0]==offset for k in highlights)
  r.append(rect(bx,y,bw,h*.56,primary if hi_hit else '#252536',5,'#3B3949',1.4,.95))
  if hi_hit:r.append(rect(bx+3,y+3,bw-6,h*.5,'url(#shimmer)',4,opacity=.8))
 # separate notes labels around top/bottom depending on pitch
 for j,n in enumerate(highlights if show_labels else []):
  pc,oct=note_pc(n);pch=pc+(oct-octave)*12
  if pch in [0,2,4,5,7,9,11,12]:white_ind={0:0,2:1,4:2,5:3,7:4,9:5,11:6,12:7}[pch];px=x+(white_ind+.5)*white_w
  elif pch in [1,3,6,8,10]:white_ind={1:0,3:1,6:3,8:4,10:5}[pch];px=x+(white_ind+1)*white_w
  else:continue
  # high contrast label below piano, stacked only if necessary (unison one label)
  if n in highlights[:j]:continue
  yy=y+h+30+(j%2)*0
  r.append(ellipse(px,yy,39 if not compact else 32,21,'#FFF9F0',.98,primary,1.4))
  r.append(text(px,yy+9,n.replace('b','♭').replace('#','♯'),24 if not compact else 20,'#34283B','bold','middle'))
 return ''.join(r)

def staff(x,y,w,notes,accent='#8964A4',size=1.0):
 # 5 lines with 21px spacing, bottom y+84. E4 bottom at y+84
 dx=21*size;bot=y+4*dx
 r=[]
 for k in range(5):r.append(path(f'M {x} {y+k*dx} L {x+w} {y+k*dx}','#6D596A',1.8))
 # simple stylized clef symbol; no font dependent accidental glyph used; place bass? treble only
 r.append(text(x+15,y+83,'𝄞',94*size,'#5D3D63','normal',family="'FreeSerif',serif"))
 npos=[x+w*.43,x+w*.77] if len(notes)==2 else [x+w*(.32+i*.21) for i in range(len(notes))]
 for n,nx in zip(notes,npos):
  m=re.match(r'([A-G])([b#]?)(\d)',n); letter,acc,oct=m.group(1),m.group(2),int(m.group(3))
  step=STEPS[letter]+7*(oct-4)
  ny=bot-step*dx/2
  # ledger lines for C4 (one below E4), A3 etc; above F5 as needed
  if step<=-2:
   for L in range(-2,step-1,-2):r.append(path(f'M {nx-25} {bot-L*dx/2} L {nx+25} {bot-L*dx/2}','#62516C',1.9))
  if step>=10:
   for L in range(10,step+1,2):r.append(path(f'M {nx-25} {bot-L*dx/2} L {nx+25} {bot-L*dx/2}','#62516C',1.9))
  if acc:r.append(text(nx-30,ny+8,'♭' if acc=='b' else '♯',30*size,accent,'bold','middle'))
  r.append(ellipse(nx,ny,15*size,9*size,accent,.98,'#4B354C',.7))
  r.append(text(nx,bot+65*size,n.replace('b','♭').replace('#','♯'),21*size,'#392B42','bold','middle'))
 if len(npos)>1:r.append(path(f'M {npos[0]} {bot-15} Q {(npos[0]+npos[-1])/2} {y-35} {npos[-1]} {bot-15}',accent,3.3,opacity=.78))
 return ''.join(r)

def factbar(r,y,s,accent='#8964A4',size=30):
 r.extend([ellipse(561,y,485,60,'url(#goldwash)',.66),wash_pill(115,y-34,892,74,accent,s)])

def subcard(x,y,w,h,head,ex,st,accent,staff_on=True):
 r=[rect(x,y,w,h,'url(#glass)',32,accent,1.5,.86)]
 r.append(text(x+w/2,y+61,head,33,'#382138','bold','middle'))
 r.append(wash_pill(x+w*.17,y+92,w*.66,68,accent,sem(st)))
 r.append(text(x+w/2,y+197,ex.replace('b','♭').replace('#','♯'),30,accent,'bold','middle'))
 a,b=ex.split('–')
 r.append(keyboard(x+35,y+220,w-70,137,highlights=[a,b],primary=accent,compact=True,show_labels=False))
 if staff_on:r.append(staff(x+70,y+430,w-140,[a,b],accent,size=.76))
 return ''.join(r)


def compare(name,subtitle,items,caption,fn,staff_on=True,y0=None,ch=705):
 acc=items[0][4];r,Y=base(name,subtitle,acc)
 n=len(items)
 y=y0 if y0 else max(Y+10,320)
 if n==2:
  for i,(head,ex,st,ab,accent) in enumerate(items):
   x=56+i*509;r.append(subcard(x,y,485,ch,head,ex,st,accent,staff_on))
   pass # abbreviation already conveyed in exact source/adjacent HTML
 else:
  for i,(head,ex,st,ab,accent) in enumerate(items):
   x=28+i*364
   r.append(rect(x,y,342,695,'url(#glass)',35,accent,1.6,.84))
   r.append(text(x+171,y+55,head,26,'#412E46','bold','middle'))
   r.append(text(x+171,y+109,ab,38,accent,'bold','middle'))
   r.append(text(x+171,y+158,sem(st),26,accent,'bold','middle'))
   r.append(text(x+171,y+210,ex.replace('b','♭').replace('#','♯'),26,'#422646','bold','middle'))
   a,b=ex.split('–')
   r.append(keyboard(x+17,y+247,308,135,highlights=[a,b],primary=accent,compact=True,show_labels=False))
   r.append(staff(x+40,y+475,260,[a,b],accent,size=.72))
 # separator editorial note after diagram
 factbar(r,1120,caption,'#6D597F')
 r.append(text(561,1240,'The interval colour identifies the relationship between two notes.',25,'#745875','normal','middle',style='italic'))
 return end(r)

entries=[]
def write(kind,fn,svg,title,description,source='native vector correction'):
 if kind=='cards':dest='cards'
 else:dest='support'
 outsvg=OUT/'SVG'/dest/(fn+'.svg');outpng=OUT/'PNG'/dest/(fn+'.png')
 outsvg.write_text(svg,encoding='utf-8')
 cairosvg.svg2png(bytestring=svg.encode(),write_to=str(outpng),output_width=W,output_height=H)
 im=Image.open(outpng).convert('RGBA');alpha=im.getchannel('A')
 corners=[im.getpixel((x,y))[3] for x,y in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]]
 entry={'id':fn,'family':dest,'title':title,'description':description,'png':str(outpng.relative_to(OUT)),'svg':str(outsvg.relative_to(OUT)),'size':[W,H],'alpha_minmax':list(alpha.getextrema()),'corner_alpha':corners,'png_sha256':hashlib.sha256(outpng.read_bytes()).hexdigest(),'svg_sha256':hashlib.sha256(outsvg.read_bytes()).hexdigest(),'source':source,'music_qa':'source-generated; rendered QA pending'}
 entries.append(entry)
 return outpng

# support 02 / 04 / 05 / 06 / 07
support_specs=[
('support_02_interval_palette_overview','Fourth, Tritone, Fifth','Three neighboring chromatic distances',[
('Perfect Fourth','C4–F4',5,'P4',COLORS[5]),('Tritone','C4–F#4',6,'A4 / TT',COLORS[6]),('Perfect Fifth','C4–G4',7,'P5',COLORS[7])],'Five, six, seven semitones: each interval increases by one.'),
('support_04_minor_vs_major_second','Minor vs Major Second','One semitone changes the quality',[
('Minor Second','C4–Db4',1,'m2',COLORS[1]),('Major Second','C4–D4',2,'M2',COLORS[2])],'The upper note rises one semitone; C4 stays fixed.'),
('support_05_minor_vs_major_third','Minor vs Major Third','Both span three letter names',[
('Minor Third','C4–Eb4',3,'m3',COLORS[3]),('Major Third','C4–E4',4,'M3',COLORS[4])],'One chromatic step changes a minor third into a major third.'),
('support_06_minor_vs_major_sixth','Minor vs Major Sixth','Two neighboring sixths with a fixed root',[
('Minor Sixth','C4–Ab4',8,'m6',COLORS[8]),('Major Sixth','C4–A4',9,'M6',COLORS[9])],'A♭4 rises to A4 while C4 remains unchanged.'),
('support_07_seventh_comparison','Minor vs Major Seventh','One chromatic step apart',[
('Minor Seventh','C4–Bb4',10,'m7',COLORS[10]),('Major Seventh','C4–B4',11,'M7',COLORS[11])],'C4–B4 is 11 semitones; B4–C5 is another separate semitone.')
]
LAY={'support_05_minor_vs_major_third':dict(y0=262),'support_06_minor_vs_major_sixth':dict(y0=388,ch=640),'support_07_seventh_comparison':dict(y0=392,ch=640)}
for fn,name,sub,items,cap in support_specs:
 svg=compare(name,sub,items,cap,fn,**LAY.get(fn,{}))
 write('support',fn,svg,name,sub)

# inversion: three actual inverted pairs
r,Y=base('Interval Inversion','Move the lower note one octave above the upper note','#5366A0')
pass
invs=[('Minor Third ↔ Major Sixth','C4–Eb4',3,'Eb4–C5',9,COLORS[3]),('Major Third ↔ Minor Sixth','C4–E4',4,'E4–C5',8,COLORS[4]),('Perfect Fourth ↔ Perfect Fifth','C4–F4',5,'F4–C5',7,COLORS[5])]
for i,(head,pair1,n1,pair2,n2,col) in enumerate(invs):
 y=512+i*232
 r.append(rect(70,y,982,214,'url(#glass)',28,col,1.4,.88))
 r.append(text(561,y+44,head,30,'#483448','bold','middle'))
 r.append(wash_pill(90,y+68,423,62,col,f'{pair1.replace("b","♭")}: {n1} st'))
 r.append(wash_pill(609,y+68,423,62,col,f'{pair2.replace("b","♭")}: {n2} st'))
 r.append(text(562,y+110,'↔',42,col,'bold','middle'))
 r.append(text(561,y+184,f'{n1} + {n2} = 12 semitones   •   interval numbers sum to 9',24,'#44374B','normal','middle'))
factbar(r,1290,'Inversion moves the lower note up an octave.','#5366A0',27)
write('support','support_08_inversion_guide',end(r),'Interval Inversion','Correct interval inversion pairs with complementary semitone sums')

# Plogger source-driven 11 rows
r,Y=base('The Plogger Lens','A historical three-factor classification—not an acoustic measurement',COLORS[6])
# The original painted header already contains the explanatory subtitle.
for x,word,ex in [(135,'SHAPE','Jagged / Rounded / Straight'),(550,'SHADOW','Fundamental / Both / Octave'),(918,'FILL','Dark / Light / Neutral / Half')]:
 r.append(wash_pill(x-120,350,250,60,COLORS[6],word))
 r.append(text(x,440,ex,20,'#59465E','normal','middle'))
cols=[80,205,405,650,870,1050]
r.append(rect(54,492,1012,66,'#4D3B63',20,opacity=.95))
for x,t in [(90,'st'),(180,'interval'),(405,'shape'),(620,'shadow direction'),(875,'fill')]:r.append(text(x,538,t,25,'#FFFFFF','bold'))
values={1:('m2','Jagged','Fundamental','Dark'),2:('M2','Jagged','Fundamental','Light'),3:('m3','Rounded','Fundamental','Dark'),4:('M3','Rounded','Fundamental','Light'),5:('P4','Straight','Fundamental','Dark'),6:('TT','Straight','Both','Neutral'),7:('P5','Straight','Octave','Light'),8:('m6','Rounded','Octave','Dark'),9:('M6','Rounded','Octave','Half'),10:('m7','Jagged','Octave','Light'),11:('M7','Jagged','Octave','Dark')}
for n,(abbr,shape,dir,fill) in values.items():
 y=574+(n-1)*54;r.append(rect(56,y,1010,50,'url(#glass)',12,opacity=.68 if n%2==0 else .86))
 r.append(ellipse(104,y+25,22,21,COLORS[n],.85))
 for x,s,sz,col in [(104,str(n),23,'#FFFFFF'),(226,abbr,24,'#34283D'),(431,shape,23,'#48374E'),(660,dir,23,'#48374E'),(899,fill,23,'#48374E')]:r.append(text(x,y+34,s,sz,col,'bold' if x==104 else 'normal','middle'))
r.append(text(561,1210,'Plogger brackets 1–11 only; unison (0) and octave (12) are N/A.',24,'#634C61','bold','middle'))
r.append(text(561,1265,'Historic teaching lens; consult the exact source diagram for full definitions.',23,'#76596E','normal','middle',style='italic'))
write('support','support_09_plogger_lens_guide',end(r),'Plogger historical classification','Exact Plogger table 1–11, three factors; N/A 0 and 12')

# register: C-G perfect fifth across three true keyboards
r,Y=base('Register and Range','A seven-semitone fifth can begin in different registers',COLORS[7])
for idx,(lo,hi,name) in enumerate([('C3','G3','LOW'),('C4','G4','MIDDLE'),('C5','G5','HIGH')]):
 y=512+idx*254;r.append(rect(70,y,978,234,'url(#glass)',35,COLORS[7],1.7,.85))
 r.append(text(125,y+50,name+' REGISTER',28,'#4E3D54','bold'))
 r.append(text(690,y+50,f'{lo}–{hi}  •  7 semitones',28,COLORS[7],'bold'))
 # keyboard topology visually repeated; labels use correct octave independently
 # implement keyboard uses 4 base only; draw with manual exact highlighted pc positions if octave in 3/5 via helper custom highlights fix
 r.append(keyboard(180,y+72,760,100,highlights=[lo,hi],primary=COLORS[7],octave=int(lo[-1])))
 # Text lesson lives beside the figure; avoid small labels colliding with key names.
factbar(r,1335,'The perfect fifth is 7 semitones in every register.',COLORS[7])
write('support','support_10_register_and_range',end(r),'Register and Range','Same perfect fifth in three registers')

# melodic / harmonic
r,Y=base('Melodic and Harmonic','Same notes and interval; different timing',COLORS[7]);y=330
r.append(subcard(58,y+58,485,720,'Melodic interval','C4–G4',7,COLORS[7],staff_on=True))
r.append(subcard(576,y+58,485,720,'Harmonic interval','C4–G4',7,COLORS[7],staff_on=True))
r.append(text(301,1100,'C4 → G4  •  one after another',23,'#4E3653','bold','middle'))
r.append(text(817,1100,'C4 + G4  •  at the same time',23,'#4E3653','bold','middle'))
factbar(r,1250,'The perfect fifth stays 7 semitones in either presentation.',COLORS[7])
write('support','support_12_melodic_and_harmonic',end(r),'Melodic and Harmonic','Seven-semitone perfect fifth sequentially or together')

# unison octave
svg=compare('Unison and Octave','Same pitch versus same note name in a new register',[
 ('Perfect Unison','C4–C4',0,'P1',COLORS[0]),('Perfect Octave','C4–C5',12,'P8',COLORS[12])],
 'P1 repeats one pitch; P8 reaches twelve semitones higher.','support_13_unison_vs_octave')
write('support','support_13_unison_vs_octave',svg,'Unison and Octave','Perfect unison zero; perfect octave twelve semitones')

# enharmonic tritone
svg=compare('One Distance, Two Spellings','The same piano key with two interval names',[
 ('Augmented Fourth','C4–F#4',6,'A4',COLORS[6]),('Diminished Fifth','C4–Gb4',6,'d5',COLORS[6])],
 'The same six-semitone key: C–F♯ is A4, while C–G♭ is d5.','support_14_one_distance_two_spellings')
write('support','support_14_one_distance_two_spellings',svg,'One Distance Two Spellings','Enharmonic tritone as augmented fourth and diminished fifth')

# 3 painted-art replacements as high-precision source/vector cards; preserve canonical accent and attractive premium composition
for n,name,lo,hi,ab,tagline in [
 (10,'Minor Seventh','C4','Bb4','m7','An octave minus a whole step.'),
 (11,'Major Seventh','C4','B4','M7','One semitone below the octave.'),
 (12,'Perfect Octave','C4','C5','P8','Same note name, one octave higher.')]:
 accent=COLORS[n];r,Y=base(name,'An Ajourné interval identity • exact piano and notation',accent)
 r.append(wash_pill(297,310,528,100,accent,f'{ab}  ·  {n} semitones',True))
 r.append(wash_pill(289,705,544,92,accent,f'{lo} → {hi.replace("b","♭")}',True))
 r.append(path('M 190 820 C 320 773, 770 773, 930 820',accent,8,opacity=.7))
 r.append(ellipse(190,820,14,14,accent));r.append(ellipse(930,820,14,14,accent))
 r.append(keyboard(131,840,860,162,highlights=[lo,hi],primary=accent))
 pass
 r.append(rect(137,1080,850,145,'url(#glass)',40,accent,1.6,.83))
 r.append(staff(245,1080,632,[lo,hi],accent,size=.75))
 factbar(r,1310,tagline,accent)
 svg=end(r)
 write('cards',f'IP-{n:02d}',svg,name,f'{lo} to {hi}, {n} semitones; exact position and notation')

# Persist manifest and QA preview
manifest={'version':'v2','production':'Ajourné Interval Palette detailed remediation','total_assets':len(entries),'entries':entries,'policy':{'canonical_palette':'INTERVAL_IDENTITY_COLORS_V1','canonical_plogger':'PLOGGER_LENS_V1','source-driven_keyboards':True,'source-driven_note_names':True,'source_driven_inversion_math':True}}
(OUT/'asset_manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
(OUT/'README.md').write_text('''# Ajourné Interval Palette — corrected artworks v2

This is a **correction delta** for the earlier 40-graphic master, not a duplicate ZIP of unchanged files. It contains 11 corrected supporting instructional graphics (02,04–10,12–14) and 3 refined, color-accurate interval cards (IP-10–12). Original untouched files and the Batch 2 verified teaching-sheet ZIP remain in the previous master bundle. Batch3 support 01 and 03 are redundant overview sources, and support 11 was integrated correctly; do not replace them.

- PNG: standalone transparent 1122×1402 assets for website review.
- SVG: genuine editable vector artwork with 12-tone keyboard geometry, source-derived semitones, notes/accidentals and staff, plus ornamental washes; no raster images inside SVG. **For supported browser SVGs, font fallback must be verified on the actual server. Prefer the self-contained PNGs for display until that succeeds.**
- No fixed Hz/acoustic ranking claims; Plogger source table follows the canonical shape/direction/fill mapping, with boundary intervals excluded.
- The original incorrect graphics should be archived and not displayed. Review at 320px mobile and with 200% text before deployment; this package is not a claim of complete cross-browser signoff.

## Important
Do not overwrite corrected IP-00–09 live derivative images. Integrate IP-10–12 into chapters only after visual comparison and real rendered QA. Use the per-asset manifest and exact existing placement guide in the November 9 GitHub handoff.
''',encoding='utf8')
(OUT/'accuracy_report.md').write_text('''# Music correctness assertions

All corrected examples are generated from a 12-note chromatic keyboard: white keys C,D,E,F,G,A,B,C and black keys C♯,D♯,F♯,G♯,A♯; flat enharmonic names map to the same keys. Staff positions are determined by letter name with correct C4 ledger lines, not guessed by an image model.

## Corrected holdings
- support02: C–F 5, C–F♯ 6, C–G 7.
- support04: C–D♭ 1; C–D 2.
- support05: C–E♭ 3; C–E 4.
- support06: C–A♭ 8; C–A 9.
- support07: C–B♭ 10; C–B 11 (separate B4–C5 = 1).
- support08: m3 C–E♭ (3) inverted as M6 E♭–C5 (9); M3 C–E (4) to m6 E–C5 (8); P4 C–F (5) to P5 F–C5 (7).
- support09: exact PLOGGER_LENS_V1 values for all 11 historic brackets. Unison/octave N/A.
- support10: same P5 interval C–G at octaves 3,4,5.
- support12: P5 C4–G4 (7) sequential and simultaneous.
- support13: C4–C4 (0) versus C4–C5 (12).
- support14: C4–F♯4 A4 and C4–G♭4 d5 refer to same key (6).
- IP10: minor seventh C4–B♭4 10; IP11: major seventh C4–B4 11; IP12: perfect octave C4–C5 12.

Accurate source labels and exact native diagrams do not by themselves establish screen reader, print, browser font or real-device visual acceptance. Claude should verify these in M10 P5.
''',encoding='utf8')

# Write contact sheet on creamy background
for category,keys in [('cards',[e for e in entries if e['family']=='cards']),('supports',[e for e in entries if e['family']=='support'])]:
 cols=3 if category=='cards' else 4
 sz=(340,425) if category=='cards' else (260,330)
 rows=math.ceil(len(keys)/cols)
 canvas=Image.new('RGB',(cols*(sz[0]+20)+20,rows*(sz[1]+52)+20),'#F9F5ED');draw=ImageDraw.Draw(canvas)
 font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
 for i,e in enumerate(keys):
  im=Image.open(OUT/e['png']).convert('RGBA');im.thumbnail(sz)
  bg=Image.new('RGBA',im.size,'#F9F5ED');bg.alpha_composite(im)
  col=i%cols;row=i//cols; xx=col*(sz[0]+20)+20;yy=row*(sz[1]+52)+28
  canvas.paste(bg.convert('RGB'),(xx,yy));draw.text((xx,yy-23),e['id'],font=font,fill='#332232')
 canvas.save(OUT/'previews'/f'contact_{category}.jpg',quality=93)

# verify geometry + bad empty edges and manifests
for e in entries:
 assert all(v==0 for v in e['corner_alpha']),e['id']
 assert e['alpha_minmax'][1]==255,e['id']
assert len(entries)==14
print('Built',len(entries),'assets in',OUT)
print('IDs:',[e['id'] for e in entries])
