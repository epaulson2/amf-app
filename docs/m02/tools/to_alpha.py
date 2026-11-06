import sys, numpy as np, hashlib, json, os
from PIL import Image
W='/home/elderle/amf-work/amf-ajourne-m02/public/soundscape/m02/'
def to_alpha(src, dst, feather=0.06, keep_edges=()):
    im = np.asarray(Image.open(src).convert('RGB')).astype(np.float64) / 255.0
    a = 1.0 - im.min(axis=2)                      # colour-to-alpha against pure white
    a = np.clip((a - 0.012) / (1 - 0.012), 0, 1)  # kill faint white-point noise
    safe = np.maximum(a, 1e-4)[..., None]
    rgb = np.clip((im - (1 - a)[..., None]) / safe, 0, 1)
    h, w = a.shape
    y = np.linspace(0, 1, h)[:, None]; x = np.linspace(0, 1, w)[None, :]
    def ramp(t): t = np.clip(t, 0, 1); return t * t * (3 - 2 * t)      # smoothstep
    m = np.ones((h, w))
    if 'left' not in keep_edges:   m *= ramp(x / feather)
    if 'right' not in keep_edges:  m *= ramp((1 - x) / feather)
    if 'top' not in keep_edges:    m *= ramp(y / feather)
    if 'bottom' not in keep_edges: m *= ramp((1 - y) / feather)
    a = a * m
    out = np.dstack([rgb, a])
    img = Image.fromarray((out * 255 + 0.5).astype(np.uint8), 'RGBA')
    img.save(dst + '.png', optimize=True); img.save(dst + '.webp', quality=92, method=6)
    al = np.asarray(img)[..., 3]
    return {'src': os.path.basename(src), 'png': os.path.relpath(dst + '.png', W), 'webp': os.path.relpath(dst + '.webp', W), 'size': img.size,
            'png_bytes': os.path.getsize(dst + '.png'), 'webp_bytes': os.path.getsize(dst + '.webp'),
            'alpha_border_max': int(max(al[0].max(), al[-1].max(), al[:, 0].max(), al[:, -1].max())), 'alpha_mean': round(float(al.mean()), 1),
            'png_sha256': hashlib.sha256(open(dst + '.png', 'rb').read()).hexdigest()}
jobs = [('raw/G01-B-v2.png', 'art/G01-B-concentric-home', 0.06, ()),
        ('raw/G03-B-v1.png', 'art/G03-B-shared-worlds', 0.05, ()),
        ('raw/G02-ACCENT-v1.png', 'art/G02-ACCENT-keyboard-light', 0.07, ()),
        ('raw/A-CORNER-v1.png', 'art/A-corner-atmosphere', 0.06, ('left', 'top'))]
res = [to_alpha(W + s, W + d, f, k) for s, d, f, k in jobs]
json.dump(res, open('/home/elderle/amf-work/amf-ajourne-m02/docs/m02/alpha_conversion.json', 'w'), indent=1)
for r in res: print(r['png'], r['size'], 'png', r['png_bytes'] // 1024, 'KB webp', r['webp_bytes'] // 1024, 'KB border-alpha-max', r['alpha_border_max'])
