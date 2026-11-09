import json,sys
from playwright.sync_api import sync_playwright
U=sys.argv[1]; OUT=sys.argv[2]; res={}
JS="""()=>{const de=document.documentElement;const ft=document.querySelector('footer');
const clipTables=[...document.querySelectorAll('table')].filter(t=>t.scrollWidth>t.clientWidth+1||t.parentElement.scrollWidth>t.parentElement.clientWidth+1).length;
const svgImgs=[...document.querySelectorAll('.ip6-fig img')].length;
return {overflow:de.scrollWidth-de.clientWidth,height:de.scrollHeight,footerBottom:ft?Math.round(ft.getBoundingClientRect().bottom+scrollY):null,clipTables,
 imgs:[...document.querySelectorAll('img')].filter(i=>i.getAttribute('aria-hidden')!=='true'&&i.closest('main')).filter(i=>!(i.complete&&i.naturalWidth>0)).length,
 bad:/R2_pictograph|DiChordPictograph|\\*\\*|interval-identity\\.ts|Founder-uploaded|Adaptive Musician/.test(document.body.innerText),
 gal:document.querySelectorAll('.ip6-gal li').length,chap:document.querySelectorAll('.ip6-chapter').length,ill:document.querySelectorAll('.ip6-ill img').length,sheets:[...document.querySelectorAll('.ip6-sheet img')].map(i=>[i.currentSrc.split('/').pop().split('?')[0].slice(0,40),i.naturalWidth]).slice(0,3),sheetN:document.querySelectorAll('.ip6-sheet').length,support:document.querySelectorAll('.ip6-support img').length}}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (320,390,640,768,1280,1440):
        pg=b.new_page(viewport={'width':w,'height':900}); pg.goto(U,wait_until='networkidle')
        pg.evaluate("document.querySelectorAll('img').forEach(i=>{i.loading='eager'})"); pg.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)"); pg.wait_for_timeout(2500)
        res[w]=pg.evaluate(JS)
        if w in (390,1280):
            for sel,name in (('.ip6-gal','gallery'),('#how','how'),('#ip-01','chapter-IP-01'),('#ip-06','chapter-IP-06'),('#ip-04','chapter-IP-04'),('#ip-10','chapter-IP-10'),('#ip-12','chapter-IP-12'),('#ipf-proof-b-p4-tt-p5','cmp-p4-tt-p5'),('#ipf-unison-octave','cmp-unison-octave'),('#compare','compare'),('#plogger','plogger'),('#sources','sources'),('#map','map')):
                try: pg.locator(sel).first.screenshot(path=f'{OUT}/{name}-{w}.png')
                except Exception as e: print('shot fail',sel,e)
            pg.screenshot(path=f'{OUT}/bottom-{w}.png',clip={'x':0,'y':max(0,res[w]['height']-1200),'width':w,'height':1200},full_page=True)
    b.close()
print(json.dumps(res))
json.dump(res,open(OUT+'/measures.json','w'),indent=1)
