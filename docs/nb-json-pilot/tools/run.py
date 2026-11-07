"""Bounded Nano Banana pilot runner. Usage: run.py A|B|C [endpoint=images|chat]. Hard caps: 3 chargeable calls, $2.00. Key is read from file, never printed."""
import sys, json, base64, hashlib, time, os, urllib.request, urllib.error
KEY = open('/home/elderle/.config/qcr/openrouter-key').read().strip()
MODEL = 'google/gemini-3-pro-image'
REF = '/home/elderle/amf-art-reference/APPROVED_ART_DIRECTION_REFERENCE.png'
D = 'docs/nb-json-pilot'; LED = f'{D}/ledger.json'
CAP, MAXCALLS = 2.00, 3
arm, ep = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'images')
prompt = {'A': open(f'{D}/prompts/A_prose.txt').read().strip(), 'B': open(f'{D}/prompts/B_json.json').read().strip(), 'C': open(f'{D}/prompts/C_json_infographic.json').read().strip()}[arm]
led = json.load(open(LED)) if os.path.exists(LED) else {'model': MODEL, 'cap_usd': CAP, 'max_calls': MAXCALLS, 'calls': []}
charged = [c for c in led['calls'] if c.get('charged')]
assert len(charged) < MAXCALLS and sum(c.get('cost_usd') or 0 for c in charged) < CAP, 'cap reached'
ref = open(REF, 'rb').read(); b64 = base64.b64encode(ref).decode()
if ep == 'images':
    url = 'https://openrouter.ai/api/v1/images'
    body = {'model': MODEL, 'prompt': prompt, 'input_references': [{'type': 'image_url', 'image_url': {'url': 'data:image/png;base64,' + b64}}], 'aspect_ratio': '4:3', 'image_size': '2K', 'n': 1}
else:
    url = 'https://openrouter.ai/api/v1/chat/completions'
    body = {'model': MODEL, 'modalities': ['image', 'text'], 'usage': {'include': True}, 'image_config': {'aspect_ratio': '4:3', 'image_size': '2K'},
            'messages': [{'role': 'user', 'content': [{'type': 'image_url', 'image_url': {'url': 'data:image/png;base64,' + b64}}, {'type': 'text', 'text': prompt}]}]}
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'})
rec = {'arm': arm, 'endpoint': ep, 'time': time.strftime('%Y-%m-%dT%H:%M:%S'), 'model': MODEL, 'prompt_sha256': hashlib.sha256(prompt.encode()).hexdigest(), 'reference': REF.split('/')[-1], 'reference_sha256': hashlib.sha256(ref).hexdigest(), 'reference_bytes_sent': len(ref), 'request_params': {k: v for k, v in body.items() if k not in ('prompt', 'input_references', 'messages')}, 'charged': False}
t0 = time.time()
try:
    r = json.load(urllib.request.urlopen(req, timeout=400))
except urllib.error.HTTPError as e:
    rec['http_error'] = e.code; rec['error_body'] = e.read().decode()[:600]; print('HTTP', e.code, rec['error_body']); led['calls'].append(rec); json.dump(led, open(LED, 'w'), indent=1); sys.exit(1)
rec['seconds'] = round(time.time() - t0, 1)
img = None
if ep == 'images':
    d = (r.get('data') or [{}])[0]; img = d.get('b64_json'); rec['usage'] = r.get('usage')
else:
    m = r['choices'][0]['message']; im = (m.get('images') or [None])[0]; img = im['image_url']['url'].split(',', 1)[1] if im else None; rec['usage'] = r.get('usage'); rec['generation_id'] = r.get('id'); rec['note'] = (m.get('content') or '')[:300]
rec['cost_usd'] = (rec.get('usage') or {}).get('cost')
rec['charged'] = bool(img)
if img:
    data = base64.b64decode(img); out = f'{D}/raw/{arm}.png'; open(out, 'wb').write(data)
    rec.update(out=out, sha256=hashlib.sha256(data).hexdigest(), bytes=len(data))
led['calls'].append(rec); json.dump(led, open(LED, 'w'), indent=1)
print(json.dumps({k: rec.get(k) for k in ('arm', 'endpoint', 'charged', 'cost_usd', 'seconds', 'out', 'bytes', 'sha256')}))
