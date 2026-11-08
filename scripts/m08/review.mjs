import fs from 'node:fs'
const D = 'docs/m08', R = `${D}/review`
const BR = 'feat/ajourne-m08-week2-transparent-infographics-20261107'
const RAW = 'https://github.com/epaulson2/amf-app/raw/' + BR + '/docs/m08/'
const BLOB = 'https://github.com/epaulson2/amf-app/blob/' + BR + '/docs/m08/'
const man = JSON.parse(fs.readFileSync(`${D}/manifest.json`, 'utf8')).figures
const G = { shared: 'Shared references', hub: 'Week 2 hub', '2A': 'Lesson 2A — Same letters, different size', '2B': 'Lesson 2B — How two voices move', '2C': 'Lesson 2C — Two voices through time' }
const V = ['desktop', 'phone', 'print']
const kb = n => (fs.statSync(`${D}/${n}`).size / 1024).toFixed(0) + ' KB'
fs.mkdirSync(R, { recursive: true })
for (const f of fs.readdirSync(R)) fs.unlinkSync(`${R}/${f}`)
man.forEach((a, i) => {
  const prev = man[(i + man.length - 1) % man.length], next = man[(i + 1) % man.length]
  for (const v of V) {
    const p = `assets/${a.id}/${a.id}.${v}`
    const nav = `[⟵ ${prev.id}](${prev.id}.${v}.md) · [**Index**](../README.md) · [${next.id} ⟶](${next.id}.${v}.md)`
    const tabs = V.map(x => x === v ? `**[ ${x} ]**` : `[${x}](${a.id}.${x}.md)`).join(' · ')
    const md = `${nav}\n\n# ${a.id} — ${a.title}\n\n**View:** ${tabs}  \n**Section:** ${G[a.group]} · **Step(s):** ${a.steps.join(', ')} · ${i + 1} of ${man.length}\n\n` +
      `### Zoom the real file\n- 🔍 **[Open the full-size ${v} PNG directly (browser pinch/zoom, ${kb(p + '.png')})](${RAW}${p}.png)**\n- [GitHub image viewer page](../${p}.png) · [Download / view editable SVG](../${p}.svg) ([raw SVG](${RAW}${p}.svg))\n\n` +
      `[![${a.id} ${v}](../${p}.png)](${RAW}${p}.png)\n\n*The picture above is the actual ${v} PNG file (transparent; GitHub shows it on its own page colour). Click it to open the raw full-size file.*\n\n` +
      `**What it teaches:** ${a.teaches}\n\n**How to read it:** ${a.howToRead}\n\n` +
      `All files: ${V.map(x => `${x} [PNG](../assets/${a.id}/${a.id}.${x}.png) / [SVG](../assets/${a.id}/${a.id}.${x}.svg)`).join(' · ')} · [proof on cream and slate](../proof/${a.id}.proof.jpg)\n\n${nav}\n`
    fs.writeFileSync(`${R}/${a.id}.${v}.md`, md)
  }
})
let idx = `# M08 — Week 2 transparent infographics: review index\n\n**For founder visual review. Not integrated, not deployed, not merged.** Click any picture to open that figure's own page with the **full-size PNG** and links for phone, print and editable SVG. Each page has ⟵ / ⟶ to step through all ${man.length} figures.\n\n` +
  `- **Zoom tip:** on a figure page click "Open the full-size … PNG directly". That opens the raw file in its own browser tab, where pinch-zoom / Ctrl+scroll / click-to-actual-size work. (Transparent areas show the browser's own backdrop; use the proof sheet to see cream and slate.)\n` +
  `- **Standalone viewer (zoom/pan, fit/actual size, prev/next, desktop/phone/print, background switcher):** [\`viewer.html\`](viewer.html). GitHub shows HTML as source, so use it from a clone/download (open the file in a browser), or [via htmlpreview](https://htmlpreview.github.io/?${BLOB}viewer.html) (third-party relay; it loads images from this branch).\n` +
  `- Full text list (previous README): [FULL_LIST.md](FULL_LIST.md) · Contact sheets: ${Object.keys(G).map(g => `[${g}](contact/${g}.jpg)`).join(', ')} · [manifest.json](manifest.json) · [ledger.json](ledger.json) · [alpha QA](qa.alpha.json)\n\n`
for (const g of Object.keys(G)) {
  const as = man.filter(a => a.group === g)
  idx += `## ${G[g]}\n\n| | | |\n|---|---|---|\n`
  const cells = as.map(a => `[<img src="thumb/${a.id}.jpg" width="230"><br>**${a.id}** ${a.title}](review/${a.id}.desktop.md)<br><sub>[phone](review/${a.id}.phone.md) · [print](review/${a.id}.print.md) · [SVG](assets/${a.id}/${a.id}.desktop.svg)</sub>`)
  for (let i = 0; i < cells.length; i += 3) idx += `| ${[0, 1, 2].map(j => cells[i + j] ?? '').join(' | ')} |\n`
  idx += '\n'
}
fs.writeFileSync(`${D}/README.md`, idx)
// standalone viewer
const data = man.map(a => ({ id: a.id, g: G[a.group], t: a.title, s: a.steps.join(', '), teaches: a.teaches, how: a.howToRead }))
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>M08 review viewer</title><style>
*{box-sizing:border-box}body{margin:0;font:14px system-ui,sans-serif;display:flex;flex-direction:column;height:100vh;background:#222;color:#eee}
header{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:6px 10px;background:#111}button,select{font:inherit;padding:4px 9px;border-radius:5px;border:1px solid #666;background:#333;color:#eee;cursor:pointer}button.on{background:#7a5fa0}
#stage{flex:1;overflow:auto;position:relative;background:#F9F5ED;cursor:grab}#stage.drag{cursor:grabbing}#stage img{display:block;margin:auto;transform-origin:0 0;max-width:none}
#info{max-height:24vh;overflow:auto;padding:8px 12px;background:#181818;font-size:13px;line-height:1.4}.sp{flex:1}a{color:#9cf}</style></head><body>
<header><button id=pv>⟵ Prev</button><select id=sel></select><button id=nx>Next ⟶</button><span class=sp></span>
<span id=vb></span><button id=fit>Fit</button><button id=act>Actual size</button><button id=zi>＋</button><button id=zo>－</button>
<select id=bg><option value="#F9F5ED">cream</option><option value="#C9D3E0">slate</option><option value="#ffffff">white</option><option value="#222">dark</option></select>
<a id=raw target=_blank>raw PNG</a><a id=svg target=_blank>SVG</a></header><div id=stage><img id=im></div><div id=info></div>
<script>
const D=${JSON.stringify(data)};let i=0,v='desktop',z=1,fitMode=true;const $=s=>document.getElementById(s),st=$('stage'),im=$('im');
D.forEach((a,k)=>{const o=document.createElement('option');o.value=k;o.textContent=a.id+' — '+a.t;$('sel').append(o)});
['desktop','phone','print'].forEach(x=>{const b=document.createElement('button');b.textContent=x;b.id='v'+x;b.onclick=()=>{v=x;show(true)};$('vb').append(b)});
function path(){const a=D[i];return 'assets/'+a.id+'/'+a.id+'.'+v}
function apply(){if(fitMode){z=Math.min(st.clientWidth/im.naturalWidth,st.clientHeight/im.naturalHeight,1)||1}im.style.width=(im.naturalWidth*z)+'px'}
function show(keep){const a=D[i];if(!keep)fitMode=true;im.onload=()=>{apply()};im.src=path()+'.png';$('sel').value=i;
['desktop','phone','print'].forEach(x=>$('v'+x).classList.toggle('on',x===v));$('raw').href=path()+'.png';$('svg').href=path()+'.svg';
$('info').innerHTML='<b>'+a.id+'</b> · '+a.g+' · steps '+a.s+' — <b>'+a.t+'</b><br><b>Teaches:</b> '+a.teaches+'<br><b>How to read:</b> '+a.how;location.hash=a.id+'/'+v}
const setz=f=>{fitMode=false;z=Math.max(.05,Math.min(8,z*f));apply()};
$('pv').onclick=()=>{i=(i+D.length-1)%D.length;show()};$('nx').onclick=()=>{i=(i+1)%D.length;show()};$('sel').onchange=e=>{i=+e.target.value;show()};
$('fit').onclick=()=>{fitMode=true;apply()};$('act').onclick=()=>{fitMode=false;z=1;apply()};$('zi').onclick=()=>setz(1.25);$('zo').onclick=()=>setz(.8);
$('bg').onchange=e=>st.style.background=e.target.value;
st.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();setz(e.deltaY<0?1.1:.9)}},{passive:false});
let d=null;st.onmousedown=e=>{d=[e.clientX,e.clientY,st.scrollLeft,st.scrollTop];st.classList.add('drag')};
addEventListener('mouseup',()=>{d=null;st.classList.remove('drag')});addEventListener('mousemove',e=>{if(d){st.scrollLeft=d[2]-(e.clientX-d[0]);st.scrollTop=d[3]-(e.clientY-d[1])}});
addEventListener('resize',()=>fitMode&&apply());
addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;const k=e.key;if(k==='ArrowRight')$('nx').click();else if(k==='ArrowLeft')$('pv').click();else if(k==='f')$('fit').click();else if(k==='a')$('act').click();else if(k==='+'||k==='=')setz(1.25);else if(k==='-')setz(.8);else if(k==='1')$('vdesktop').click();else if(k==='2')$('vphone').click();else if(k==='3')$('vprint').click()});
const h=location.hash.slice(1).split('/');if(h[0]){const k=D.findIndex(a=>a.id===h[0]);if(k>=0)i=k;if(['phone','print'].includes(h[1]))v=h[1]}show();
</script></body></html>`
fs.writeFileSync(`${D}/viewer.html`, html)
console.log('ok', man.length)
