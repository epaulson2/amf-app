import re, json, sys, urllib.request, urllib.error, urllib.parse, collections
from concurrent.futures import ThreadPoolExecutor
B='https://amf.queencityredline.com'
def get(path):
    try:
        r=urllib.request.urlopen(urllib.request.Request(B+path,headers={'User-Agent':'amf-audit/1'}),timeout=20)
        return r.status, r.read().decode('utf-8','replace') if 'text/html' in r.headers.get('content-type','') else ''
    except urllib.error.HTTPError as e: return e.code,''
    except Exception as e: return 0,''
HREF=re.compile(r'<a[^>]+href="([^"]+)"')
SRC=re.compile(r'(?:src|href)="(/[^"]+\.(?:pdf|html|zip|png|jpg|jpeg|svg|mp3|wav|m4a|mp4|json|webp))"')
seen={}; links=collections.defaultdict(set); assets=collections.defaultdict(set)
queue=['/','/ted-greene','/genre-labs','/systems','/materials','/pedagogy','/technology','/archive','/practice','/plogger','/arranger','/arranger/library','/audio','/audio/ear-training','/audio/interval','/audio/jam-tracks','/audio/rhythm','/curriculum','/musical-universe','/ted-greene/assessment','/curriculum/semester-1','/curriculum/semester-1/songs','/curriculum/semester-1/core','/curriculum/semester-1/guitar','/curriculum/semester-1/piano','/curriculum/semester-1/history','/curriculum/semester-1/progress','/materials/sprint1','/materials/sprint1/cheatsheets','/materials/sprint1/practice','/materials/sprint1/textbook']; 
def norm(h):
    if h.startswith(('http','mailto:','tel:','#','javascript:')): return None
    if not h.startswith('/'): return None
    h=h.split('#')[0].split('?')[0]
    if h.startswith('/_next') : return None
    return h.rstrip('/') or '/'
while queue:
    batch=[p for p in dict.fromkeys(queue) if p not in seen]; queue=[]
    if not batch: break
    with ThreadPoolExecutor(6) as ex: res=list(ex.map(get,batch))
    for p,(st,html) in zip(batch,res):
        seen[p]=st
        if st==200 and html:
            for h in HREF.findall(html):
                n=norm(urllib.parse.unquote(h.replace('&amp;','&')))
                if n: links[p].add(n); 
                if n and n not in seen: queue.append(n)
            for a in SRC.findall(html):
                assets[p].add(a)
json.dump({'status':seen,'links':{k:sorted(v) for k,v in links.items()},'assets':{k:sorted(v) for k,v in assets.items()}},open('crawl.json','w'),indent=1)
print(len(seen),'routes;', collections.Counter(seen.values()))
