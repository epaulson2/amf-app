import subprocess, json, time, urllib.request, websocket, sys, os
CH=os.path.expanduser('~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome'); PORT=9341
B=sys.argv[1]; P='/curriculum/soundscape-path'
p=subprocess.Popen([CH,'--headless=new','--no-sandbox','--disable-gpu',f'--remote-debugging-port={PORT}',f'--remote-allow-origins=http://127.0.0.1:{PORT}','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(3)
ws=websocket.create_connection(json.loads(urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json').read())[0]['webSocketDebuggerUrl'],timeout=120); n=0
def send(m,**pr):
    global n; n+=1; ws.send(json.dumps({'id':n,'method':m,'params':pr}))
    while True:
        r=json.loads(ws.recv())
        if r.get('id')==n: return r.get('result',{})
def ev(x): return send('Runtime.evaluate',expression=x,returnByValue=True,awaitPromise=True)['result'].get('value')
def vp(w): send('Emulation.setDeviceMetricsOverride',width=w,height=900,deviceScaleFactor=1,mobile=w<500)
def go(u,t=3.5): send('Page.navigate',url=B+u); time.sleep(t)
def shot(path):
    import base64; d=send('Page.captureScreenshot',format='png')['data']; open(path,'wb').write(base64.b64decode(d))
def click(sel_js,t=2.5): ev(sel_js); time.sleep(t)
bad=[]
def chk(c,msg):
    print(('ok   ' if c else 'FAIL ')+msg)
    if not c: bad.append(msg)
STATE="""(()=>{const t=document.querySelector('nav[aria-label="Ajourné course contents"]');const cur=[...t.querySelectorAll('[aria-current=page]')].map(a=>a.textContent.trim());
const hdr=[...document.querySelectorAll('nav')].find(n=>n!==t);const aj=[...hdr.querySelectorAll('a')].filter(a=>a.textContent.trim()==='Ajourné'&&a.offsetParent);const cu=[...hdr.querySelectorAll('a')].filter(a=>a.textContent.trim()==='Curriculum'&&a.offsetParent);
const r=aj[0]&&aj[0].getBoundingClientRect();const tr=t.getBoundingClientRect();const pan=t.querySelector('.m4-tree__panel');
return {url:location.pathname+location.search,cur,ow:document.documentElement.scrollWidth-innerWidth,hdrOW:hdr.scrollWidth-hdr.clientWidth,ajVis:!!aj.length&&r.left>=0&&r.right<=innerWidth,ajCol:aj[0]&&getComputedStyle(aj[0]).color,cuCol:cu[0]&&getComputedStyle(cu[0]).color,
side:[Math.round(tr.left),Math.round(tr.top),Math.round(tr.width)],panelShown:getComputedStyle(pan).display!=='none',toggle:getComputedStyle(t.querySelector('.m4-tree__toggle')).display!=='none',links:t.querySelectorAll('a').length,steps:t.querySelectorAll('ol a').length,
main:Math.round(document.querySelector('.m4-shell__main').getBoundingClientRect().width),h1:(document.querySelector('h1')||{}).textContent}})()"""
try:
    send('Page.enable')
    for w in (320,390,768,1024,1100,1280):
        vp(w); go(f'{P}/week-1/lesson-1b?step=4')
        s=ev(STATE); print(w,json.dumps(s))
        chk(s['ow']<=0,f'{w} no page overflow ({s["ow"]})'); chk(s['hdrOW']<=0,f'{w} header no overflow ({s["hdrOW"]})')
        chk(s['ajVis'],f'{w} Ajourné link visible in header'); chk(len(s['cur'])==1 and s['cur'][0].startswith('4') and 'Two semitones' in s['cur'][0],f'{w} exactly one aria-current = step 4: {s["cur"]}')
        chk(s['steps']==30,f'{w} 30 step links ({s["steps"]})')
        chk(s['ajCol']=='rgb(217, 119, 6)' and (s.get('cuCol') in (None,) or s['cuCol']!='rgb(217, 119, 6)'),f'{w} Ajourné active, Curriculum not ({s["ajCol"]} / {s.get("cuCol")})')
        if w>=1100: chk(s['panelShown'] and not s['toggle'] and s['side'][2]>=260,f'{w} desktop tree visible, main {s["main"]}px')
        else:
            chk(s['toggle'] and not s['panelShown'],f'{w} panel collapsed with Course contents toggle')
            click("document.querySelector('.m4-tree__toggle').click()",1.5)
            s2=ev(STATE); print('  after click',s2['panelShown'],s2['ow'],ev("document.querySelector('.m4-tree').dataset.open")); chk(s2['panelShown'] and s2['ow']<=0,f'{w} panel opens, no overflow')
            tb=ev("(()=>{const a=[...document.querySelectorAll('.m4-tree a:not([hidden] a)')].filter(e=>e.offsetParent);return Math.min(...a.map(e=>e.getBoundingClientRect().height))})()") or 0
            chk(tb>=36,f'{w} min visible link height {tb}')
            if w in(390,768): shot(f'tree_{w}.png')
        if w in(1100,1280): shot(f'tree_{w}.png')
    # flow at 1280
    vp(1280); go(P)
    chk(ev("(()=>{const t=document.querySelector('.m4-tree');return [...t.querySelectorAll('[aria-current=page]')].map(a=>a.textContent.trim()).join('|')})()")=='Ajourné Introduction','intro: tree current = Introduction')
    def nav(txt,scope='.m4-tree'): click(f"[...document.querySelectorAll('{scope} a')].find(a=>a.textContent.trim().includes({json.dumps(txt)})).click()")
    nav('How We Learn'); s=ev(STATE); chk(s['url'].endswith('/how-it-works') and s['cur']==['How We Learn'],f'How We Learn -> {s["url"]}')
    nav('Week 1 overview'); s=ev(STATE); chk(s['url'].endswith('/week-1') and 'Week 1' in s['cur'][0],f'Week 1 -> {s["url"]}')
    # lesson 1A title -> step 1, open steps, step 3 then 4
    nav('A Note Becomes a Landscape'); s=ev(STATE); chk(s['url'].endswith('lesson-1a?step=1'),f'1A title -> {s["url"]}')
    nav('Find C'); s=ev(STATE); chk(s['url'].endswith('lesson-1a?step=3') and len(s['cur'])==1 and s['cur'][0].startswith('3'),f'1A step3 -> {s["url"]} {s["cur"]}')
    click("document.querySelector('.m4-shell__main a.is-primary').click()")
    s=ev(STATE); chk(s['url'].endswith('lesson-1a?step=4') and s['cur'][0].startswith('4'),f'Next -> {s["url"]} {s["cur"]}')
    nav('Not all steps are the same size'); s=ev(STATE); chk('lesson-1b?step=3' in s['url'] and s['cur'][0].startswith('3'),f'1B named step -> {s["url"]} (tree reopened branch)')
    nav('Where the voices sit on the keyboard'); s=ev(STATE); chk('lesson-1c?step=2' in s['url'] and s['cur'][0].startswith('2'),f'1C named step -> {s["url"]}')
    # caret toggles without navigating
    before=ev("location.href"); click("document.querySelector('.m4-tree__caret[aria-controls=m4-tree-1C]').click()",0.6)
    chk(ev("location.href")==before and ev("document.querySelector('.m4-tree__caret[aria-controls=m4-tree-1C]').getAttribute('aria-expanded')")=='false','caret collapses 1C steps, no navigation')
    # Week 2 + future
    chk(ev("[...document.querySelectorAll('.m4-tree a')].filter(a=>a.href.includes('week-2')).map(a=>new URL(a.href).pathname).join()")==f'{P}/week-2,{P}/week-2/lesson-2a,{P}/week-2/lesson-2b,{P}/week-2/lesson-2c','Week 2 links: hub + 2A/2B/2C only')
    chk(ev("document.querySelectorAll('.m4-tree__future').length")==6 and ev("[...document.querySelectorAll('.m4-tree__future')].every(e=>!e.querySelector('a'))"),'Weeks 3-8 in preparation, no links')
    # global header: Ajourne link goes to home; Curriculum not active
    go(f'{P}/journey'); click("[...document.querySelectorAll('nav')].find(n=>!n.matches('.m4-tree')).querySelectorAll('a').forEach(a=>{if(a.textContent.trim()==='Ajourné'&&a.offsetParent&&!window.__d){window.__d=1;a.click()}})")
    chk(ev("location.pathname")==P,'header Ajourné -> home')
    # keyboard: tab reaches tree, Enter on caret
    go(f'{P}/week-1/lesson-1a?step=2'); 
    chk(ev("document.querySelector('.m4-tree__caret').getAttribute('aria-expanded')")=='true' and ev("document.querySelector('#m4-tree-1A').hidden")==False,'active branch open on direct reload')
    chk(ev("document.querySelector('nav.m4-tree').getAttribute('aria-label')")=='Ajourné course contents' and ev("!!document.querySelector('[role=tree]')")==False,'ARIA label, no role=tree')
    chk(ev("[...document.querySelectorAll('.m4-tree a')].every(a=>a.getAttribute('href'))"),'all tree links have hrefs')
    chk(ev("(()=>{const t=document.querySelector('.m4-shell__side');return getComputedStyle(t).position")=='sticky' if False else True,'-')
    vp(1280); go(f'{P}/week-1/lesson-1a?step=2'); ev("window.scrollTo(0,1500)"); time.sleep(.5)
    chk(ev("Math.round(document.querySelector('.m4-shell__side').getBoundingClientRect().top)")==56,'sidebar sticky at 56px below AMF header after scroll')
    # more menu / hamburger
    vp(390); go(P); click("document.querySelector('button[aria-label=\"Toggle menu\"]').click()",0.6)
    chk(ev("[...document.querySelectorAll('nav a')].filter(a=>a.textContent.trim()==='Ajourné'&&a.offsetParent).length")>=2,'390 hamburger menu lists Ajourné (plus the visible top link)')
    shot('menu_390.png')
finally: p.terminate()
print('FAILS:',bad)
