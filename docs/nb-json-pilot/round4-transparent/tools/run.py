"""Round-3 single-call runner. HARD CAP: 1 chargeable call, $0.50. Key read from file, never printed."""
import json, base64, hashlib, time, os, sys, urllib.request, urllib.error
KEY=open('/home/elderle/.config/qcr/openrouter-key').read().strip()
MODEL='google/gemini-3-pro-image'; REF='/home/elderle/amf-art-reference/APPROVED_ART_DIRECTION_REFERENCE.png'
D='docs/nb-json-pilot/round4-transparent'; LED=f'{D}/ledger.json'; CAP,MAXCALLS=0.50,1
prompt=open(f'{D}/prompts/B4_transparent.json').read().strip()
led=json.load(open(LED)) if os.path.exists(LED) else {'model':MODEL,'cap_usd':CAP,'max_calls':MAXCALLS,'calls':[]}
assert not led['calls'], 'one call only; ledger already has an attempt'
ref=open(REF,'rb').read()
body={'model':MODEL,'prompt':prompt,'input_references':[{'type':'image_url','image_url':{'url':'data:image/png;base64,'+base64.b64encode(ref).decode()}}],'aspect_ratio':'4:3','image_size':'2K','n':1}
req=urllib.request.Request('https://openrouter.ai/api/v1/images',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+KEY,'Content-Type':'application/json'})
rec={'endpoint':'images','time':time.strftime('%Y-%m-%dT%H:%M:%S'),'model':MODEL,'prompt_sha256':hashlib.sha256(prompt.encode()).hexdigest(),'reference_sha256':hashlib.sha256(ref).hexdigest(),'reference_bytes_sent':len(ref),'request_params':{k:v for k,v in body.items() if k not in('prompt','input_references')},'charged':False}
t0=time.time()
try: r=json.load(urllib.request.urlopen(req,timeout=400))
except urllib.error.HTTPError as e:
    rec['http_error']=e.code; rec['error_body']=e.read().decode()[:400]; led['calls'].append(rec); json.dump(led,open(LED,'w'),indent=1); print('HTTP',e.code,rec['error_body']); sys.exit(1)
rec['seconds']=round(time.time()-t0,1); d=(r.get('data') or [{}])[0]; img=d.get('b64_json'); rec['usage']=r.get('usage'); rec['cost_usd']=(rec['usage'] or {}).get('cost'); rec['charged']=bool(img)
if img:
    data=base64.b64decode(img); open(f'{D}/raw/B4.png','wb').write(data); rec.update(out=f'{D}/raw/B4.png',sha256=hashlib.sha256(data).hexdigest(),bytes=len(data))
led['calls'].append(rec); json.dump(led,open(LED,'w'),indent=1)
print(json.dumps({k:rec.get(k) for k in('charged','cost_usd','seconds','bytes','sha256')}))
