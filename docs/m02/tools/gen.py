import sys, json, base64, time, os, re, urllib.request, hashlib
KEY = open('/home/elderle/.config/qcr/openrouter-key').read().strip()
MODEL = 'google/gemini-nano-banana-2.1'
REF = '/home/elderle/amf-art-reference/APPROVED_ART_DIRECTION_REFERENCE.png'
W = '/home/elderle/amf-work/amf-ajourne-m02'
LEDGER = W + '/docs/m02/ledger.json'
CAP = 3.00  # hard pilot ceiling, USD

def api(path, body=None):
    req = urllib.request.Request('https://openrouter.ai/api/v1' + path, data=json.dumps(body).encode() if body else None,
        headers={'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'X-Title': 'AMF Ajourne M02 pilot'})
    return json.load(urllib.request.urlopen(req, timeout=300))

def ledger():
    return json.load(open(LEDGER)) if os.path.exists(LEDGER) else {'model': MODEL, 'cap_usd': CAP, 'calls': []}

def spent(l): return sum(c.get('cost_usd') or 0 for c in l['calls'])

def generate(asset_id, prompt, out_png, aspect=None, use_ref=True):
    l = ledger()
    if spent(l) >= CAP: sys.exit(f'CAP REACHED: ${spent(l):.4f}')
    content = [{'type': 'text', 'text': prompt}]
    if use_ref:
        b = base64.b64encode(open(REF, 'rb').read()).decode()
        content.insert(0, {'type': 'image_url', 'image_url': {'url': 'data:image/png;base64,' + b}})
    body = {'model': MODEL, 'modalities': ['image', 'text'], 'messages': [{'role': 'user', 'content': content}], 'usage': {'include': True}}
    if aspect: body['image_config'] = {'aspect_ratio': aspect}
    t0 = time.time(); r = api('/chat/completions', body)
    u = r.get('usage', {}); msg = r['choices'][0]['message']
    imgs = msg.get('images') or []
    rec = {'asset': asset_id, 'time': time.strftime('%Y-%m-%dT%H:%M:%S'), 'aspect': aspect, 'used_reference': use_ref, 'prompt': prompt,
           'cost_usd': u.get('cost'), 'prompt_tokens': u.get('prompt_tokens'), 'completion_tokens': u.get('completion_tokens'),
           'seconds': round(time.time() - t0, 1), 'generation_id': r.get('id'), 'got_image': bool(imgs), 'out': None}
    if imgs:
        data = base64.b64decode(imgs[0]['image_url']['url'].split(',', 1)[1])
        open(out_png, 'wb').write(data)
        rec['out'] = os.path.relpath(out_png, W); rec['sha256'] = hashlib.sha256(data).hexdigest(); rec['bytes'] = len(data)
    else:
        rec['note'] = (msg.get('content') or '')[:300]
    l['calls'].append(rec); json.dump(l, open(LEDGER, 'w'), indent=1)
    print(json.dumps({k: rec[k] for k in ('asset', 'got_image', 'cost_usd', 'seconds', 'out', 'bytes') if k in rec}), 'total=%.4f' % spent(l))

if __name__ == '__main__':
    if sys.argv[1] == 'balance':
        c = api('/credits')['data']; k = api('/key')['data']
        print(json.dumps({'total_credits': c['total_credits'], 'total_usage': round(c['total_usage'], 4), 'remaining': round(c['total_credits'] - c['total_usage'], 4), 'key_usage': round(k['usage'], 4)}))
