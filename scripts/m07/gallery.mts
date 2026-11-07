// Generates docs/m07/README.md (the single founder review gallery) and docs/m07/PROVENANCE.md from registry.json.
import { readFileSync, writeFileSync } from 'node:fs'
import { COVERAGE } from '../../lib/soundscape/m07/coverage.ts'
const reg = JSON.parse(readFileSync('docs/m07/registry.json', 'utf8'))
const P = '../../public/soundscape/m07', V = 'previews'
const A: any[] = reg.assets
const by = (d: string) => A.filter(a => a.disposition === d).length
const fams: [string, string][] = [['shared', 'Shared grammar'], ['hub', 'Week 2 hub'], ['2A', 'Lesson 2A'], ['2B', 'Lesson 2B'], ['2C', 'Lesson 2C']]
const nChunks = (f: string) => Math.ceil(A.filter(a => a.family === f).length / 6)
const stateWord: Record<string, string> = { N: 'neutral (no interval name or colour)', I: 'identity colour (pair named)', 'N+I': 'neutral, then one named pair' }
let md = `# Ajourné M07 — Week 2 graphics: founder review gallery

**Branch:** \`feat/ajourne-m07-week2-graphics-20261107\` (from live M06 \`5bc10a139479900a9ffec5bc2be63496ac2336d8\`). **Not integrated, not deployed, not merged.** Review only.

Every picture below is an **individual, usable SVG** (screen, phone and print). Previews are screenshots of those SVGs rendered in Chromium; the SVG files in \`public/soundscape/m07/\` are the assets. Facts (notes, octaves, keys, times) are drawn by code from \`lib/soundscape/week2/fixtures.ts\`; every colour is imported from \`INTERVAL_IDENTITY_COLORS_V1\` and every Plogger mark from \`PLOGGER_LENS_V1\`. **No model-generated image is used in any teaching figure, and no image-model calls were made.**

**Jump to:** ${fams.map(([k, t]) => `[${t}](#${k === 'shared' ? 'shared-grammar' : k === 'hub' ? 'week-2-hub' : 'lesson-' + k.toLowerCase()})`).join(' · ')} · [Reused in place](#reused-in-place) · [Art](#art) · [Before / after](#before--after) · [Page previews](#page-integrated-previews) · [Step coverage](#step-by-step-coverage) · [Doors](#the-18-optional-doors) · [Downloads](#downloads-and-registry) · [QA and caveats](#qa-and-known-caveats)

## Totals

| | |
|---|---|
| New native masters | **${A.length}** (each in 3 variants = ${A.length * 3} SVG files) + ${reg.art.length} vector art washes = **${reg.counts.svgFiles} new SVG files** |
| By disposition | REUSE ${by('REUSE')} · REVISE ${by('REVISE')} · REPLACE ${by('REPLACE')} · DERIVE ${by('DERIVE')} · CREATE ${by('CREATE')} |
| Existing files reused in place (not copied) | ${reg.reusedInPlace.length} (+ 15 M03 art files, reviewed below) |
| Variants | **screen** 760 wide · **narrow** 360 wide (phones from 320 up) · **print** white page, shape-coded, same text |
| New image-model images / spend | **0 / $0** |

REUSE here means the builder or file is used unchanged (Plogger chip, panel and legend from M05, A-09). REVISE means an existing M03 figure's facts were kept and the figure rebuilt with octaves, hue and phone/print variants. DERIVE means built from a source idea with new code. CREATE means new.

## Contact sheets

Each group has contact sheets at **1280**, **390**, **320** and **print**. Click to open full size.

| Group | 1280 | 390 | 320 | print |
|---|---|---|---|---|
`
for (const [f, t] of fams) for (let n = 1; n <= nChunks(f); n++) md += `| ${t} ${n}/${nChunks(f)} | [sheet](${V}/sheets/${f}-${n}.1280.jpg) | [sheet](${V}/sheets/${f}-${n}.390.jpg) | [sheet](${V}/sheets/${f}-${n}.320.jpg) | [sheet](${V}/sheets/${f}-${n}.print.jpg) |\n`
md += `\n![Lesson 2C contact sheet](${V}/sheets/2C-1.1280.jpg)\n\n`
for (const [f, t] of fams) {
  md += `## ${t}\n\n`
  for (const a of A.filter(x => x.family === f)) {
    const v = a.variants, tok = a.tokens.hex.length ? a.tokens.hex.map((h: any) => `${h.id} \`${h.hex}\``).join(', ') : 'none'
    md += `### ${a.id} · ${a.title}\n\n[![${a.alt.replace(/[\[\]]/g, '')}](${V}/screen/${a.id}.png)](${P}/screen/${a.id}.svg)\n\n`
    md += `${a.teaches}\n\n`
    md += `| | |\n|---|---|\n| **Lesson step** | ${a.steps.map((s: string) => s === 'H' ? 'Hub' : s.replace(':', ' step ')).join(', ')} |\n| **State** | ${stateWord[a.state]} |\n| **Provenance** | **${a.disposition}** · audit row ${a.auditRow} · from ${a.sources.slice(0, 2).join('; ')} |\n| **Tokens** | ${tok}${a.plogger.length ? ' · Plogger ' + a.plogger.map((p: any) => `[${p.bracket}] ${p.shape}/${p.dir}/${p.fill}`).join(', ') : ''} |\n| **Files** | [screen](${P}/screen/${a.id}.svg) ${v.screen.w}×${v.screen.h} · [narrow](${P}/narrow/${a.id}.svg) ${v.narrow.w}×${v.narrow.h} ([preview](${V}/narrow/${a.id}.png)) · [print](${P}/print/${a.id}.svg) |\n`
    if (a.limits) md += `| **Limits** | ${a.limits} |\n`
    md += `\n<details><summary>How to read this picture (the paragraph the lesson page owes)</summary>\n\n${a.howToRead}\n\n</details>\n\n`
  }
}
md += `## Reused in place\n\nThese existing files are used as they are; they were not copied or redrawn.\n\n`
for (const r of reg.reusedInPlace) md += `### ${r.id} · ${r.title}\n\n![${r.title}](../../${r.preview})\n\n${r.teaches}\n\nSteps: ${r.steps.join(', ')} · **REUSE** · [file](../../${r.file}) · ${r.note}\n\n`
md += `## Art

Rule: art is atmosphere only. It sits behind or beside a factual figure, is never captioned as showing a count or a colour meaning, and does not replace any native figure. **No Nano Banana (image-model) call was justified**: the 15 existing Week 2 art files were opened and rendered below, and no teaching concept was missing a painterly image. The four new washes are deterministic vector art in the approved palette direction (warm ivory and plum with translucent amber, orchid, rose and teal).

### New vector washes (optional page atmosphere)

| | |
|---|---|
`
for (const a of reg.art) md += `| **${a.id}** · ${a.title}<br>[SVG](${P}/art/${a.id}.svg) · transparent, no frame | ![${a.title}](${V}/art/${a.id}.png) |\n`
md += `\n### Existing M03 Week 2 art (15 files, reused in place)\n\n| File | Preview | Verdict |\n|---|---|---|\n`
const artV: Record<string, string> = { S07: 'KEEP: hub atmosphere (A-01)', E01: '**DROP:** briefed as five paths but shows about four ribbons', E03: '**DROP:** briefed as moving apart but shows one converging swirl' }
for (const f of ['S07', 'D01', 'D03', 'D05', 'D07', 'E01', 'E02', 'E03', 'E04', 'E09', 'F01', 'F02', 'F03', 'F08', 'F10']) md += `| [${f}.webp](../../public/soundscape/m03/art/${f}.webp) | ![${f}](${V}/art/${f}.png) | ${artV[f] ?? 'Optional faint accent behind a lesson opener; decorative only; spectrum palette, so never explain its colours as intervals'} |\n`
md += `\n## Before / after\n\nOld M03 figures (left, unchanged in the live tree) against the M07 replacements (right).\n\n`
for (const [n, d] of [['2B-06_vs_E03', 'B3–F4: octaves, tritone colour and [6] chip added; amber/teal voice colours removed'], ['2B-08_vs_E07', 'The five changes: one 316×1182 phone column becomes a landscape table, a stacked phone variant and a print table'], ['2C-03_vs_F03', 'Version B: same exact times, neutral voices, hue only on sounding pairs, 12 s / 24 s rests marked'], ['2A-06_vs_D06', 'Foundation can travel: window now starts at B3, octave numerals added'], ['2B-13_vs_T05', 'B3–F4 beside the Palette card C4–F♯4: shared tritone colour and chip'], ['2C-09_vs_F10', 'Recap: 8 px text rebuilt at 12 px minimum']]) md += `**${d}**\n\n![${n}](${V}/compare/${n}.jpg)\n\n`
md += `## Page-integrated previews

Isolated mock pages (not the live site) showing intro, the figure, the real how-to-read paragraph, the learner's own-keyboard action and step navigation. Copy is excerpted from the V2 manuscripts. HTML: [2B step 5](preview/page-2B-step5.html), [2C step 4](preview/page-2C-step4.html), [2A step 6](preview/page-2A-step6.html).

| 1280 | 390 |
|---|---|
| ![2B step 5](${V}/page/page-2B-step5.1280.jpg) | ![2B step 5, phone](${V}/page/page-2B-step5.390.jpg) |
| ![2C step 4](${V}/page/page-2C-step4.1280.jpg) | ![2C step 4, phone](${V}/page/page-2C-step4.390.jpg) |
| ![2A step 6](${V}/page/page-2A-step6.1280.jpg) | ![2A step 6, phone](${V}/page/page-2A-step6.390.jpg) |

## Step-by-step coverage

N = neutral, I = identity colour after the lesson names the pair. Every step of the hub and all 31 lessons steps has at least one figure; steps are never given a figure that names an answer earlier than the manuscript does.

| Step | State | Figures |
|---|---|---|
`
for (const c of COVERAGE) md += `| ${c.title} | ${c.state} | ${c.assets.join(', ')} |\n`
md += `
## The 18 optional doors

All 18 were reviewed against the audit: **0 new graphics**. Text-only doors stay text. Three optional candidates remain source-gated (2A Behind the Sound, 2B Musical Worlds, 2C Behind the Sound). The small door-icon strip is the existing X07 file (A-08).

## Downloads and registry

- Screen: \`public/soundscape/m07/screen/<ID>.svg\` · Narrow: \`.../narrow/<ID>.svg\` · Print: \`.../print/<ID>.svg\` · Art: \`.../art/\`
- [\`registry.json\`](registry.json): ID, audit row, disposition, steps, state, Palette tokens, Plogger mapping, title, alt text, teaching text, how-to-read text, sources, variants with sizes and hashes, generation provenance.
- [\`PROVENANCE.md\`](PROVENANCE.md) · generators: \`lib/soundscape/m07/\`, \`scripts/m07/\` · tests: \`tests/m07.test.mts\`.

Implementation handoff (suggested, for a later authorized step): place each ID at the step listed in its section; use the narrow file below 600 px and the print file for print stylesheets; put the how-to-read text beside the figure as the lesson paragraph (G-05); never place a figure before its step.

## QA and known caveats

- \`tests/m07.test.mts\`: 15 targeted tests pass (inventory, well-formed and accessible SVG, hues exactly equal \`identityHex()\` for the pairs each figure names and never legacy hexes or voice colours, 11 Plogger glyphs, B3–F4 and E4–G4 locks, five 2B cases restart at C4+E4, 2C bar geometry and rests at 12/24 s, no early spoilers, font size, print parity, step coverage, no literal token hexes in code).
- Previews were rendered in Chromium; no screen reader was run. Accessible \`<title>\`/\`<desc>\` and registry alt text are present on every SVG.
- Smallest text is 11.5 px (reused M05 Plogger legend) and 12 px elsewhere on the 360-wide phone variant. On a 320 px screen the narrow files scale to about 0.9, so about 10.5–11 px.
- The wide timelines (2C) rely on the narrow variant below 600 px.
- The Palette's own print download \`INTERVAL_PALETTE_QUICK_PRINT_V1.svg\` still uses pre-v1 hues. It is outside this work, was not copied and was not changed.
- The existing test \`visual copy … verbatim\` fails on the M06 baseline too, independent of this branch.
- Art and Plogger [6] follow the printed original; Plogger is a historic teaching lens, not acoustic law.
`
writeFileSync('docs/m07/README.md', md)
writeFileSync('docs/m07/PROVENANCE.md', `# M07 provenance

- Method: deterministic native SVG from code (\`lib/soundscape/m07\`), facts from \`lib/soundscape/week2/fixtures.ts\`, colour from \`INTERVAL_IDENTITY_COLORS_V1\` (version ${reg.identityVersion}), Plogger from \`PLOGGER_LENS_V1\`.
- Image-model calls: **0**. Provider, model, cost, prompt: none. No credits spent, nothing purchased.
- Style direction: the founder-approved concept boards (warm ivory and plum, luminous translucent amber, orchid, rose and teal) were used as aesthetic direction only. The boards were not received, copied or cropped; the private reference image was not used or copied.
- Existing art reused in place: 15 files in \`public/soundscape/m03/art/\` (M03 provenance unchanged).
- New vector washes: \`lib/soundscape/m07/art.ts\` (seeded, deterministic).
- Sources per asset: see \`registry.json\` → \`sources\`.
- Not modified: Week 1, the live Palette and its downloads, any route, the live release.
`)
console.log('gallery written', md.length)
