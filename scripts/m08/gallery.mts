import { ASSETS } from '../../lib/soundscape/m07/render.ts'
import sharp from 'sharp'
import fs from 'node:fs'
const D = 'docs/m08', qa = JSON.parse(fs.readFileSync(`${D}/qa.alpha.json`, 'utf8')), led = JSON.parse(fs.readFileSync(`${D}/ledger.json`, 'utf8')), man = JSON.parse(fs.readFileSync(`${D}/manifest.in.json`, 'utf8'))
const cost = (c: any) => c.cost_usd ?? 0
const kept = led.calls.filter((c: any) => c.charged), keptCost = kept.reduce((s: number, c: any) => s + cost(c), 0)
const discarded = (led.discarded ?? []).reduce((s: number, d: any) => s + (d.cost_usd ?? 0), 0)
const byId: Record<string, any> = {}
for (const c of kept) byId[c.id] = c
const G: Record<string, string> = { shared: 'Shared references', hub: 'Week 2 hub', '2A': 'Lesson 2A — Same letters, different size', '2B': 'Lesson 2B — How two voices move', '2C': 'Lesson 2C — Two voices through time' }
const disp: Record<string, string> = { REUSE: 'Reused (native facts reused from M07/M05)', REVISE: 'Revised (rebuilt as transparent foreground)', DERIVE: 'Derived (new context from fixtures)', CREATE: 'New', REPLACE: 'Replaced (new design)' }
fs.mkdirSync(`${D}/contact`, { recursive: true })
const nfail = Object.values(qa).flatMap((x: any) => Object.values(x)).filter((v: any) => !v.pass).length
let md = `# M08 — Week 2 transparent foreground infographics\n\n**Status: for founder visual review. Not integrated, not deployed, not merged.** Branch \`feat/ajourne-m08-week2-transparent-infographics-20261107\` (from the approved round-4 pilot). M07's 50 graphics are untouched.\n\n`
md += `Every figure is a true-alpha foreground: a concept-specific glass-and-watercolor frame painted by Nano Banana Pro (B4 JSON reference-lock method, approved reference bytes), with the exact native M07 facts (keys, note names, arcs, timelines, counts, labels) and a "how to read" paragraph composed inside it. No page background is baked in; the site's own page colour is a separate layer. Each asset has editable SVG (art embedded as WebP alpha plus native text and vector) and a transparent PNG, for desktop, phone and print.\n\n`
md += `## At a glance\n- **Figures:** ${ASSETS.length} (all 50 reconciled M07 rows) × 3 variants (desktop, phone, print) × SVG + PNG = ${ASSETS.length * 6} files\n- **New model art:** ${kept.length} kept generations, **$${keptCost.toFixed(2)}**; discarded design iterations $${discarded.toFixed(2)}; **total $${(keptCost + discarded).toFixed(2)}** of the $20 guard. No top-ups.\n- **Alpha QA:** ${nfail === 0 ? 'all PNGs pass' : nfail + ' PNGs flagged (marked per figure)'}; the pass rule is alpha min 0, max 255, and 3-px perimeter all alpha 0.\n- **Model/route:** \`google/gemini-3-pro-image\` via OpenRouter \`POST /api/v1/images\`; per-figure prompt JSON at \`art/<ID>.prompt.json\`, ledger at \`ledger.json\`, manifest at \`manifest.json\`.\n\n`
md += `## Known limits (honest)\n- The frame art is a concept-specific glass-and-watercolor frame around one clearing; the model often ignores the 'nothing enters the clearing' rule, so some frames have small motifs intruding and a few clearings are narrower than their figure, where the frame wall is mirror-tiled; tiling seams are visible on the tallest figures (2B-02, 2B-09, 2B-13, 2A-06).\n- Interior plates are soft translucent ivory behind the native text so it stays legible; text is plum ink and needs a light page colour.\n- Fonts are system fonts; no brand type.\n- The native layer is exactly the M07 builder output plus a native how-to-read paragraph; all M07 tests apply (15, passing at M07).\n- The 14K production contract linked in the request was not found on the pushed docs branch, so scope was taken from the request text, the M07 registry/manuscripts and the 50-row audit.\n- No page background is baked into any PNG/SVG. Each PNG has a 3-px fully transparent perimeter; none of these are verified on a real page layout.\n\n## Contact sheets\n` + Object.keys(G).map(g => `- [${G[g]}](contact/${g}.jpg)`).join('\n') + '\n\n'
const manifest: any[] = []
for (const g of Object.keys(G)) {
  const as = ASSETS.filter(a => a.group === g)
  md += `## ${G[g]}\n\n![${g}](contact/${g}.jpg)\n\n`
  const th = await Promise.all(as.map(a => sharp(`${D}/thumb/${a.id}.jpg`).resize(300, 300, { fit: 'contain', background: '#F9F5ED' }).toBuffer()))
  const cols = 4, rows = Math.ceil(th.length / cols)
  await sharp({ create: { width: cols * 304, height: rows * 304, channels: 3, background: '#F9F5ED' } }).composite(th.map((b, i) => ({ input: b, left: (i % cols) * 304, top: Math.floor(i / cols) * 304 }))).jpeg({ quality: 82 }).toFile(`${D}/contact/${g}.jpg`)
  for (const a of as) {
    const q = qa[a.id], c = byId[a.id], m = man.find((x: any) => x.id === a.id), f = (n: string, e: string) => `assets/${a.id}/${a.id}.${n}.${e}`
    const pass = ['desktop', 'phone', 'print'].every(v => q[v]?.pass)
    md += `### ${a.id} — ${a.title}\n![${a.id}](thumb/${a.id}.jpg)\n\n**Step(s):** ${a.steps.join(', ')} · **Status:** ${disp[a.disp] ?? a.disp}\n\n**What it teaches:** ${a.teaches}\n\n**How to read it:** ${a.howToRead}\n\n`
    md += `Files: desktop [PNG](${f('desktop', 'png')}) / [SVG](${f('desktop', 'svg')}) · phone [PNG](${f('phone', 'png')}) / [SVG](${f('phone', 'svg')}) · print [PNG](${f('print', 'png')}) / [SVG](${f('print', 'svg')}) · [proof on cream and slate](proof/${a.id}.proof.jpg) · art [prompt](art/${a.id}.prompt.json), [raw art (JPEG q93 of the original PNG; sha256 in ledger is of the PNG)](art/${a.id}.raw.jpg), [alpha art](art/${a.id}.alpha.png)\n\n`
    md += `Art: ${c ? `sha256 \`${c.sha256.slice(0, 16)}…\`, $${cost(c).toFixed(4)}` : 'n/a'} · hues in art: ${m.hues.length ? m.hues.join(', ') : 'none (neutral)'} · alpha QA: ${pass ? 'pass' : 'FLAGGED'}\n\n`
    manifest.push({ id: a.id, group: a.group, title: a.title, steps: a.steps, status: a.disp, teaches: a.teaches, howToRead: a.howToRead, art: { sha256: c?.sha256, cost_usd: c ? cost(c) : null, prompt_sha256: c?.prompt_sha256 }, files: Object.fromEntries(['desktop', 'phone', 'print'].flatMap(v => [[v + '_png', f(v, 'png')], [v + '_svg', f(v, 'svg')]])), qa: q })
  }
}
fs.writeFileSync(`${D}/manifest.json`, JSON.stringify({ model: 'google/gemini-3-pro-image', reference_sha256: led.reference_sha256, total_cost_usd: +(keptCost + discarded).toFixed(4), figures: manifest }, null, 1))
fs.writeFileSync(`${D}/README.md`, md)
console.log('gallery', ASSETS.length, md.length)
