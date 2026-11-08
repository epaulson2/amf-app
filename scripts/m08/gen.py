"""Bulk art generator. Operational spend guard $20 (no top-ups). Key read from file, never printed. Usage: gen.py ID [ID...] | gen.py GROUP:2A"""
import sys, json, base64, hashlib, time, os, threading, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
KEY=open('/home/elderle/.config/qcr/openrouter-key').read().strip()
MODEL='google/gemini-3-pro-image'; REF='/home/elderle/amf-art-reference/APPROVED_ART_DIRECTION_REFERENCE.png'
GUARD=20.0; LED='docs/m08/ledger.json'; lock=threading.Lock()
base=json.load(open('docs/nb-json-pilot/round4-transparent/prompts/B4_transparent.json'))
man={o['id']:o for o in json.load(open('docs/m08/manifest.in.json'))}
ref=open(REF,'rb').read(); REFB64=base64.b64encode(ref).decode(); REFSHA=hashlib.sha256(ref).hexdigest()
led=json.load(open(LED)) if os.path.exists(LED) else {'model':MODEL,'guard_usd':GUARD,'reference_sha256':REFSHA,'calls':[]}
def spent(): return sum(c.get('cost_usd') or 0 for c in led['calls'])
def prompt_for(o):
    b=json.loads(json.dumps(base))
    hues=o['hues']
    if len(hues)==1: acc=f"the frame is tinted a single antique hue {hues[0]}; it identifies the interval relationship only, never a voice"
    elif hues: acc=f"the frame carries restrained accents of exactly these hues {', '.join(hues)} as soft glass tints; they identify interval relationships only, never a voice"
    else: acc="neutral warm plum, pearl-ivory and soft gold-white glass only; NO interval hue coding, no rainbow, no amber-versus-violet pairing"
    b['changeable']={
     "subject":{"source":"text","value":f"foreground instructional frame for the teaching figure '{o['title']}'"},
     "visual_structure":{"source":"text","value":"ONE isolated luminous foreground FRAME on pure white: a thin-walled translucent glass-and-watercolor cartouche whose wall is NARROW (under 9% of the canvas width on every side) and fills nearly the whole canvas, surrounding ONE single very large, quiet, near-white milky glass clearing that covers at least 78% of the canvas width and at least 78% of its height, perfectly empty of texture, ornament, objects and dark colour. The clearing is ONE clean rounded-rectangular window, centred, with NO mullions, crossbars, dividers or panes. The frame OUTLINE is ALWAYS a clean rounded rectangle (optionally a softly arched top edge) with straight parallel sides, never an oval, twin lobes, L-shape, staircase or any lobed silhouette. The musical relationship is expressed ONLY through the small ornament motifs that sit ON the narrow glass wall and corners, as follows (take these as rim motifs, never as structure or separate shapes): "+o['form']+". Every motif lies entirely inside the wall band: NOTHING touches, overlaps or enters the clearing, whose edge stays one clean smooth curve. Nothing intrudes into the clearing, nothing forms a second clearing, no separate islands. Rich fine filigree, layered translucent glass, a few thin concentric halo lines and warm inner luminance live only on the wall. At least 4% pure white margin outside the frame on all canvas sides."},
     "accent_identity":{"source":"text","value":acc},
     "negative_space":{"source":"text","value":"everything outside the object is empty pure white (#FFFFFF): no wash, mist, glow field, swirl, texture, paper grain, vignette, ground or shadow"},
     "background":{"source":"text","value":"pure flat white (#FFFFFF) isolation for alpha extraction; soft organic translucent edges fading cleanly to white; nothing touches the canvas edge; no rectangle"}}
    b['output']={"format":"image","aspect_ratio":o['aspect'],"intended_use":"isolated foreground frame converted to true alpha; exact native text, keys, arcs and timelines overlaid in the clearing"}
    return json.dumps(b,indent=1)
def run(i):
    o=man[i]; out=f"docs/m08/art/{i}.raw.png"
    if os.path.exists(out): return f"{i} exists"
    with lock:
        if spent()>=GUARD: return f"{i} GUARD"
    p=prompt_for(o)
    body={'model':MODEL,'prompt':p,'input_references':[{'type':'image_url','image_url':{'url':'data:image/png;base64,'+REFB64}}],'aspect_ratio':o['aspect'],'image_size':'2K','n':1}
    req=urllib.request.Request('https://openrouter.ai/api/v1/images',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+KEY,'Content-Type':'application/json'})
    rec={'id':i,'time':time.strftime('%Y-%m-%dT%H:%M:%S'),'aspect':o['aspect'],'prompt_sha256':hashlib.sha256(p.encode()).hexdigest(),'charged':False}
    open(f'docs/m08/art/{i}.prompt.json','w').write(p)
    t0=time.time(); r=None
    for attempt in range(4):
        try: r=json.load(urllib.request.urlopen(req,timeout=400)); break
        except urllib.error.HTTPError as e:
            if e.code in (402,429,500,502,503) and attempt<3: time.sleep(20*(attempt+1)); continue
            rec['error']=f'HTTP {e.code}'; break
        except Exception as e: rec['error']=str(e)[:200]; break
    if r is None:
        with lock: led['calls'].append(rec); json.dump(led,open(LED,'w'),indent=1)
        return f"{i} ERR {rec['error']}"
    rec['seconds']=round(time.time()-t0,1); d=(r.get('data') or [{}])[0]; img=d.get('b64_json'); rec['cost_usd']=(r.get('usage') or {}).get('cost'); rec['charged']=bool(img)
    if img:
        data=base64.b64decode(img); open(out,'wb').write(data); rec['sha256']=hashlib.sha256(data).hexdigest(); rec['bytes']=len(data)
    with lock: led['calls'].append(rec); json.dump(led,open(LED,'w'),indent=1)
    return f"{i} ok ${rec['cost_usd']}"
ids=[]
for a in sys.argv[1:]:
    ids+= [k for k,v in man.items() if v['group']==a.split(':')[1]] if a.startswith('GROUP:') else [a]
with ThreadPoolExecutor(2) as ex:
    for r in ex.map(run,ids): print(r,flush=True)
print('total spent',round(spent(),4))
