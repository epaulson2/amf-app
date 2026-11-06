#!/usr/bin/env python3
import json, os, hashlib
W='/home/elderle/amf-work/amf-ajourne-m05/'; L=json.load(open(W+'docs/m05/ledger.json')); AR=json.load(open(W+'docs/m05/art_registry.json')); NR=json.load(open(W+'docs/m05/native_registry.json')); DR=json.load(open(W+'docs/m05/derived_registry.json'))
D=json.load(open(W+'lib/soundscape/resources/interval-data.json'))['cards']
x={}
def row(i,cls,klass,art=None,native=None,derived=None,sheet='',note=''): x[i]={'id':i,'classification':klass,'category':cls,'art':art,'native':native,'derived':derived,'review_sheet':sheet,'note':note}
sysn={'IPV-01':('Palette landing hero','ART','IPV-01','IPV-07-native'),'IPV-04':('What is an interval?','ART','IPV-04','IPV-04-native'),'IPV-05':('Melodic vs harmonic','ART','IPV-05','IPV-05-native'),'IPV-08':('Shared-note relationship web','ART','IPV-08','IPV-34-native')}
for i,(t,k,a,n) in sysn.items(): row(i,'system',k,a,n,None,'systems.html' if i!='IPV-08' else 'systems.html')
row('IPV-02','system','VARIANT',None,None,[f'IPV-02-card-{n}' for n in range(10,23)],'support.html','4:5 card crops of the 13 interval arts; no model call')
row('IPV-03','system','VARIANT',None,None,[f'IPV-03-chapter-{n}' for n in range(10,23)],'support.html','3:2 chapter openers from the 13 interval arts; no model call')
row('IPV-06','system','NATIVE','IPV-04','IPV-06-native',None,'systems.html','exact key geometry; art reused from IPV-04')
row('IPV-07','system','NATIVE+REUSE','IPV-01','IPV-07-native',None,'systems.html','exact 0–12 ruler; art reused from IPV-01')
row('IPV-09','system','VARIANT',None,'IPV-09-native',None,'systems.html','layout pattern, exemplified by P4 vs P5; art IPV-25')
for c in D:
    n=10+c['semitones']; row(f'IPV-{n}','interval','ART',f'IPV-{n}',f'IPV-{n}-native',None,'intervals.html',f"source card {c['id']} · {c['intervalName']} · {c['semitones']} semitones")
for i,(a,k) in {'IPV-23':('IPV-11+IPV-12','VARIANT'),'IPV-24':('IPV-13+IPV-14','VARIANT'),'IPV-26':('IPV-18+IPV-19','VARIANT'),'IPV-27':('IPV-20+IPV-21','VARIANT')}.items(): row(i,'compare',k,a,f'{i}-native',None,'comparisons.html','recomposed from interval art; no model call')
for i,t in (('IPV-25','ART'),('IPV-28','ART'),('IPV-29','ART'),('IPV-30','ART')): row(i,'compare',t,i,f'{i}-native' + ('' ),None,'comparisons.html',('narrow variant IPV-30-narrow' if i=='IPV-30' else ''))
row('IPV-31','support','VARIANT',None,None,[f'IPV-31-icon-{n}' for n in range(10,23)],'support.html','96px crops; native name always accompanies')
row('IPV-32','support','VARIANT',None,None,[f'IPV-32-banner-{k}' for k in ('01','04','05','08')],'support.html','crops of IPV-01/04/05/08')
row('IPV-33','support','DEFER',note='Six enrichment-door motifs: optional until a content audit confirms doors belong in the Palette.')
row('IPV-34','added','NATIVE','IPV-08','IPV-34-native',None,'support.html','ADDED: Atlas layer B (naming by letters); no listed visual covered it')
row('IPV-35','added','NATIVE','IPV-08','IPV-35-native',None,'support.html','ADDED: Atlas layer D (third note changes the world)')
json.dump(x,open(W+'docs/m05/crosswalk.json','w'),indent=1,ensure_ascii=False)
calls=L['calls']; spent=sum(c['cost_usd'] or 0 for c in calls)
cs={'model':L['model'],'calls':len(calls),'images':sum(1 for c in calls if c['got_image']),'total_usd':round(spent,4),'cap_usd':L['cap_usd'],'avg_usd':round(spent/len(calls),4)}
json.dump(cs,open(W+'docs/m05/cost_summary.json','w'),indent=1)
import collections; cnt=collections.Counter(v['classification'] for v in x.values())
prov=['# M05 provenance\n','Reference: private, never in repo (sha256 a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab). Model `google/gemini-nano-banana-2.1` via the existing OpenRouter key.\n',f'Calls {cs["calls"]}, spend ${cs["total_usd"]} (cap ${cs["cap_usd"]}).\n','| id | file | raw sha256 | alpha border | cost | generation id |\n|---|---|---|---|---|---|']
for i,e in AR.items(): prov.append(f"| {i} | {e['webp']} | {e['raw_sha256'][:16]}… | {e['alpha']['alpha_border_max']} | ${e['cost_usd']} | {e['generation_id']} |")
prov.append('\nEvery full prompt is stored in `art_registry.json` (`full_prompt`).')
open(W+'docs/m05/PROVENANCE.md','w').write('\n'.join(prov)+'\n')
print(cs, dict(cnt))
