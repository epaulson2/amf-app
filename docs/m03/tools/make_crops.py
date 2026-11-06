#!/usr/bin/env python3
"""F02/F03: crop F01's left/right half as their own art-only pieces (VARIANT, no model call). Raw crop kept on pure white, then the same alpha pipeline."""
import json, hashlib, os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
import art_batch as A
reg = A.load(A.REGISTRY, {}); src = A.W + '/public/soundscape/m03/raw/F01.png'
im = Image.open(src).convert('RGB'); w, h = im.size
for aid, box in (('F02', (0, 0, int(w * .54), h)), ('F03', (int(w * .46), 0, w, h))):
    raw = f'{A.W}/public/soundscape/m03/raw/{aid}.png'; im.crop(box).save(raw)
    al = A.to_alpha(raw, f'{A.W}/public/soundscape/m03/art/{aid}', None)
    reg[aid] = {'id': aid, 'title': A.load(A.CATALOG, {})[aid]['title'], 'derived_from': 'F01', 'crop_box': list(box), 'cost_usd': 0, 'model': 'none (crop of F01)', 'reference_sha256': A.REF_SHA,
      'raw': os.path.relpath(raw, A.W), 'raw_sha256': hashlib.sha256(open(raw, 'rb').read()).hexdigest(), 'alpha': al, 'webp': f'public/soundscape/m03/art/{aid}.webp', 'png': f'public/soundscape/m03/art/{aid}.png',
      'license': 'Derived crop of F01 (original model output generated for AMF).', 'alt': '', 'alt_note': 'Decorative art-only layer.', 'scene_prompt': 'crop of F01', 'full_prompt': 'crop of F01'}
    print(aid, al['size'], 'border-alpha', al['alpha_border_max'])
A.save(A.REGISTRY, reg)
