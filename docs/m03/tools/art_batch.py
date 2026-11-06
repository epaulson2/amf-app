#!/usr/bin/env python3
"""M03 art pipeline. No import side effects. Idempotent: an asset whose raw file exists and whose hash is in the ledger is never re-billed.
Reads the key from a private file (never printed). Reference image is sent privately and never written anywhere public."""
import sys, os, json, time, base64, hashlib, subprocess, urllib.request, urllib.error
import numpy as np
from PIL import Image

W = '/home/elderle/amf-work/amf-ajourne-m03'
KEYFILE = '/home/elderle/.config/qcr/openrouter-key'
REF = '/home/elderle/amf-art-reference/APPROVED_ART_DIRECTION_REFERENCE.png'
REF_SHA = 'a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab'
MODEL = 'google/gemini-nano-banana-2.1'
CAP = 4.00                      # M03 ceiling in USD (self-imposed; account balance is shared with QCR)
LEDGER = W + '/docs/m03/ledger.json'
REGISTRY = W + '/docs/m03/art_registry.json'
CATALOG = W + '/docs/m03/catalog.json'

WRAPPER = (
 "Use the attached approved Ajourné reference image ONLY as aesthetic direction, not as a picture to reproduce. An original poetic illustrated music-learning motif in the same level of luminous hand-painted craftsmanship: "
 "organic overlapping translucent watercolor and glasslike light, delicate irregular concentric ripples and soft pigment-grain texture, airy negative space, glowing amber/gold, pale teal, lavender, blush rose, restrained peach; "
 "gracefully balanced, deeply refined, tactile yet ethereal. The visible forms themselves should communicate the specified musical relationship, not merely decorate a page. "
 "Make this an isolated concept-ART element designed to be composited over a separate warm cream native website background. Place it on PURE WHITE (#FFFFFF) with generous white empty margins on every side, "
 "and dissolve all edges softly to pure white for accurate transparency extraction. Preserve a quiet, light central or adjoining region for factual SVG labels placed later; do not put labels in the artwork.\n"
 "ABSOLUTELY NO text, alphabet letters, numbers, music-note symbols, scores, logos, piano keys, black/white key diagrams, chart axes, arrows with numerical meaning, headings, captions, buttons, UI, borders, frames, cards, "
 "boxed backgrounds, gradients covering the whole rectangular canvas, cast shadows, posters or web-page screenshots. No hard rectangular edges, fake instrument anatomy, source-like copies or predetermined universal emotion coloring.")

GROUPS = [
 ('1A', ['A01', 'A06', 'A08', 'A09', 'A10', 'A11']),
 ('1B', ['B01', 'B05', 'B09', 'B10']),
 ('1C', ['C01', 'C02', 'C04', 'C07', 'C08', 'C10']),
 ('W1HUB', ['S06']),
 ('2A', ['D01', 'D03', 'D05', 'D07']),
 ('2B', ['E01', 'E02', 'E03', 'E04', 'E09']),
 ('2C', ['F01', 'F08', 'F10']),
 ('W2HUB', ['S07']),
 ('SUP', ['T03', 'T07a', 'T07b', 'T07c', 'T08a', 'T08b', 'T08c', 'X01', 'X02', 'X03', 'X04', 'X05', 'X06']),
]
# Template families (T07 = 13 Atlas cards, T08 = 13 chapter openings): a small family of distinct variants, not 13 near-identical calls.
VARIANTS = {
 'T07a': ('T07', '16:9', ' Variation: the two petals sit close together with a short, tight bridge between them.'),
 'T07b': ('T07', '16:9', ' Variation: the two petals sit a medium distance apart joined by a gently arching bridge.'),
 'T07c': ('T07', '16:9', ' Variation: the two petals sit far apart joined by a long, wide, sweeping bridge.'),
 'T08a': ('T08', '16:9', ' Variation: the light strands rise from the lower left and the rings gather toward the right.'),
 'T08b': ('T08', '16:9', ' Variation: the nested rings are centered on the right and the strands trail off to the left.'),
 'T08c': ('T08', '16:9', ' Variation: the strands flow left to right across the top while the rings bloom softly at the lower right.'),
}
FEATHER = {'S06': .05, 'S07': .05}

def load(p, d):
    return json.load(open(p)) if os.path.exists(p) else d
def save(p, o):
    json.dump(o, open(p, 'w'), indent=1, ensure_ascii=False)
def spent(l): return sum(c.get('cost_usd') or 0 for c in l['calls'])
def sha(b): return hashlib.sha256(b).hexdigest()

def api(path, body=None):
    key = open(KEYFILE).read().strip()
    req = urllib.request.Request('https://openrouter.ai/api/v1' + path, data=json.dumps(body).encode() if body else None,
        headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'X-Title': 'AMF Ajourne M03 assets'})
    return json.load(urllib.request.urlopen(req, timeout=300))

def spec(aid, cat):
    if aid in VARIANTS:
        base, asp, extra = VARIANTS[aid]; c = cat[base]; scene = (c['prompt'] or '').strip() + extra; title = c['title'] + ' [' + aid[-1] + ']'
    else:
        c = cat[aid]; scene = (c['prompt'] or '').strip(); title = c['title']; asp = c.get('aspect')
        if not asp or not asp[0].isdigit(): asp = '16:9' if '16:9' in c['mode'] else ('21:9' if '21:9' in c['mode'] else '1:1')
    return {'id': aid, 'title': title, 'aspect': asp, 'scene': scene, 'prompt': scene + '\n\n' + WRAPPER}

def to_alpha(raw_path, out_base, feather=None):
    im = np.asarray(Image.open(raw_path).convert('RGB')).astype(np.float64) / 255.0
    a = np.clip((1.0 - im.min(axis=2) - 0.012) / (1 - 0.012), 0, 1)      # colour-to-alpha against pure white
    rgb = np.clip((im - (1 - a)[..., None]) / np.maximum(a, 1e-4)[..., None], 0, 1)
    k = np.clip((a - 0.07) / 0.05, 0, 1); a = a * (k * k * (3 - 2 * k))   # floor: drops faint off-white boxes the model sometimes paints
    h, w = a.shape; y = np.linspace(0, 1, h)[:, None]; x = np.linspace(0, 1, w)[None, :]
    r = lambda t: (lambda u: u * u * (3 - 2 * u))(np.clip(t, 0, 1))
    ef = lambda strip: 0.14 if strip.max() > 0.10 else 0.05              # art that runs to an edge gets a longer fade on that edge only
    fl, fr = ef(a[:, int(.01 * w):int(.04 * w)]), ef(a[:, int(.96 * w):int(.99 * w)])
    ft, fb = ef(a[int(.01 * h):int(.04 * h), :]), ef(a[int(.96 * h):int(.99 * h), :])
    a = a * r(x / fl) * r((1 - x) / fr) * r(y / ft) * r((1 - y) / fb)
    img = Image.fromarray((np.dstack([rgb, a]) * 255 + .5).astype(np.uint8), 'RGBA')
    img.save(out_base + '.png', optimize=True); img.save(out_base + '.webp', quality=92, method=6)
    al = np.asarray(img)[..., 3]
    return {'size': list(img.size), 'alpha_border_max': int(max(al[0].max(), al[-1].max(), al[:, 0].max(), al[:, -1].max())),
            'alpha_mean': round(float(al.mean()), 1), 'feather_lrtb': [fl, fr, ft, fb], 'png_sha256': sha(open(out_base + '.png', 'rb').read()),
            'png_bytes': os.path.getsize(out_base + '.png'), 'webp_bytes': os.path.getsize(out_base + '.webp')}

def generate_one(s, ledger, registry):
    aid = s['id']; raw = f"{W}/public/soundscape/m03/raw/{aid}.png"; base = f"{W}/public/soundscape/m03/art/{aid}"
    done = registry.get(aid)
    if done and os.path.exists(raw) and sha(open(raw, 'rb').read()) == done['raw_sha256']:
        if not os.path.exists(base + '.webp'):
            done['alpha'] = to_alpha(raw, base, None); save(REGISTRY, registry)
        print(f'SKIP {aid} (already generated, hash verified)'); return False
    if spent(ledger) >= CAP: sys.exit(f'CAP REACHED ${spent(ledger):.4f}')
    content = [{'type': 'image_url', 'image_url': {'url': 'data:image/png;base64,' + base64.b64encode(open(REF, 'rb').read()).decode()}}, {'type': 'text', 'text': s['prompt']}]
    body = {'model': MODEL, 'modalities': ['image', 'text'], 'messages': [{'role': 'user', 'content': content}], 'usage': {'include': True}, 'image_config': {'aspect_ratio': s['aspect']}}
    for attempt in range(1, 4):
        try:
            t0 = time.time(); r = api('/chat/completions', body)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 3: time.sleep(5 * attempt * attempt); continue
            print(f'FAIL {aid}: HTTP {e.code}'); return False
        except (urllib.error.URLError, TimeoutError):
            if attempt < 3: time.sleep(5 * attempt * attempt); continue
            print(f'FAIL {aid}: network'); return False
        u = r.get('usage', {}); msg = r['choices'][0]['message']; imgs = msg.get('images') or []
        rec = {'asset': aid, 'time': time.strftime('%Y-%m-%dT%H:%M:%S'), 'aspect': s['aspect'], 'cost_usd': u.get('cost'), 'prompt_tokens': u.get('prompt_tokens'),
               'completion_tokens': u.get('completion_tokens'), 'seconds': round(time.time() - t0, 1), 'generation_id': r.get('id'), 'got_image': bool(imgs)}
        ledger['calls'].append(rec); save(LEDGER, ledger)               # ledger BEFORE anything else: a billed call is never lost
        if not imgs:
            print(f'NOIMG {aid} cost={rec["cost_usd"]}');
            if attempt >= 2 or spent(ledger) >= CAP: return False
            continue
        data = base64.b64decode(imgs[0]['image_url']['url'].split(',', 1)[1]); open(raw, 'wb').write(data)
        al = to_alpha(raw, base, None)
        registry[aid] = {'id': aid, 'title': s['title'], 'aspect': s['aspect'], 'scene_prompt': s['scene'], 'full_prompt': s['prompt'], 'model': MODEL, 'reference_sha256': REF_SHA,
            'generated': rec['time'], 'cost_usd': rec['cost_usd'], 'generation_id': rec['generation_id'], 'raw': os.path.relpath(raw, W), 'raw_sha256': sha(data), 'raw_bytes': len(data),
            'alpha': al, 'webp': os.path.relpath(base + '.webp', W), 'png': os.path.relpath(base + '.png', W), 'license': 'Original model output generated for AMF under the provider terms; no third-party source image.',
            'alt': '', 'alt_note': 'Decorative art-only layer: empty alt / aria-hidden. All meaning is carried by native text and SVG.'}
        save(REGISTRY, registry)
        print(f'OK   {aid} {s["aspect"]} ${rec["cost_usd"]} border-alpha={al["alpha_border_max"]} total=${spent(ledger):.4f}'); return True
    return False

def git(*a):
    env = dict(os.environ, GIT_AUTHOR_NAME='epaulson2', GIT_AUTHOR_EMAIL='eric@aipdigitalsolutions.com', GIT_COMMITTER_NAME='epaulson2', GIT_COMMITTER_EMAIL='eric@aipdigitalsolutions.com')
    return subprocess.run(['git', '-C', W, *a], env=env, capture_output=True, text=True)

def checkpoint(group, ids, ledger):
    git('add', '--', 'docs/m03/ledger.json', 'docs/m03/art_registry.json', *[f'public/soundscape/m03/{d}/{i}.{e}' for i in ids for d, e in (('raw', 'png'), ('art', 'png'), ('art', 'webp'))])
    r = git('commit', '-q', '-m', f'art(ajourne): M03 group {group} generated art ({len(ids)} assets; M03 spend ${spent(ledger):.4f})\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>')
    p = git('push', '-q', '-u', 'origin', 'feat/ajourne-m03-week1-week2-assets-20261106')
    print(f'CHECKPOINT {group}: commit={"ok" if r.returncode == 0 else r.stderr.strip()[:80]} push={"ok" if p.returncode == 0 else p.stderr.strip()[:120]}')

if __name__ == '__main__':
    if sys.argv[1:] == ['--reconvert']:
        reg = load(REGISTRY, {})
        for aid, e in reg.items():
            e['alpha'] = to_alpha(W + '/' + e['raw'], W + '/public/soundscape/m03/art/' + aid, None)
        save(REGISTRY, reg); print('reconverted', len(reg), 'assets from raw originals (no API calls)'); sys.exit(0)
    want = sys.argv[1:] or [g for g, _ in GROUPS]
    cat = load(CATALOG, {}); ledger = load(LEDGER, {'model': MODEL, 'cap_usd': CAP, 'calls': []}); registry = load(REGISTRY, {})
    for g, ids in GROUPS:
        if g not in want: continue
        print(f'== group {g}: {len(ids)} assets')
        for aid in ids: generate_one(spec(aid, cat), ledger, registry)
        checkpoint(g, ids, ledger)
        print(f'== {g} done. M03 spend so far ${spent(ledger):.4f} (cap ${CAP})')
