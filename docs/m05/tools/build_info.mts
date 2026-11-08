// M05 information-first remediation: builds deterministic SVG figures into public/soundscape/m05/info/.
// Run: node --experimental-strip-types --no-warnings --import ./tests/register.mjs docs/m05/tools/build_info.mts
import { writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { wrap, type Ctx } from '../../../lib/soundscape/m03/native-svg'
import { INTERVALS, BY, sheet, card, compare, map, onepage, ploggerChart, invert, register, intro04, intro05 } from '../../../lib/soundscape/m05/info-svg'
import { INTERVAL_IDENTITY_COLORS_V1, PLOGGER_LENS_V1, IDENTITY_VERSION } from '../../../lib/soundscape/resources/interval-identity'

const ROOT = process.cwd() + '/', OUT = ROOT + 'public/soundscape/m05/info/'
mkdirSync(OUT, { recursive: true })
type Fig = { w: number; h: number; body: string; desc: string }
const reg: Record<string, any> = {}
const WIDE = 720, NARROW = 360
function emit(id: string, title: string, meta: { group: string; ids: string[]; teach: string; variant: 'wide' | 'narrow' | 'card'; supersedes?: string }, build: (c: Ctx) => Fig) {
  let sha = '', size: number[] = [], desc = ''
  for (const print of [false, true]) {
    const c: Ctx = { uid: id.replace(/\W/g, '') + (print ? 'p' : ''), print }, f = build(c)
    const s = wrap(id, title, f.desc, f.w, f.h, f.body, c)
    writeFileSync(OUT + `${id}${print ? '.print' : ''}.svg`, s)
    if (!print) { sha = createHash('sha256').update(s).digest('hex'); size = [Math.ceil(f.w), Math.ceil(f.h)]; desc = f.desc }
  }
  reg[id] = { id, type: 'NATIVE-SVG', title, desc, size, files: [`public/soundscape/m05/info/${id}.svg`, `public/soundscape/m05/info/${id}.print.svg`], sha256_screen: sha, source: 'lib/soundscape/resources/interval-data.json + interval-identity.ts (v' + IDENTITY_VERSION + ')', status: 'INFO-FIRST READY', ...meta }
  console.log('svg', id.padEnd(26), size.join('x'))
}

// 13 full interval sheets (desktop + phone) and 13 compact cards. IP-n -> IPV-(n+10).
for (const r of INTERVALS) {
  const n = r.semitones, ipv = `IPV-${10 + n}`, nn = String(n).padStart(2, '0')
  emit(`IPF-sheet-${nn}`, `${r.name} (${r.abbr}): information sheet`, { group: 'INTERVAL', ids: [ipv, r.id], teach: `${r.name}: exact keys, ${n} semitones, melodic vs harmonic, Plogger lens.`, variant: 'wide', supersedes: `${ipv}-native` }, c => sheet(c, r, WIDE))
  emit(`IPF-sheet-${nn}-narrow`, `${r.name} (${r.abbr}): information sheet, phone layout`, { group: 'INTERVAL', ids: [ipv, r.id], teach: 'Phone layout of the same sheet.', variant: 'narrow', supersedes: `${ipv}-native` }, c => sheet(c, r, NARROW))
  emit(`IPF-card-${nn}`, `${r.name} (${r.abbr}): compact card`, { group: 'CARD', ids: [ipv, r.id], teach: 'Compact card: identity stripe, exact pair, mini keyboard, three Plogger marks.', variant: 'card' }, c => card(c, r))
}
// Three representative proofs and the rest of the comparisons
const cmp = (id: string, ids: number[], head: string, sub: string, ipv: string[], supersedes?: string) => {
  const rs = ids.map(BY)
  emit(id, head, { group: 'COMPARE', ids: ipv, teach: `${head}: what stays (root C4) and what changes.`, variant: 'wide', supersedes }, c => compare(c, WIDE, rs, head, sub))
  emit(id + '-narrow', head + ' (phone)', { group: 'COMPARE', ids: ipv, teach: 'Phone layout.', variant: 'narrow', supersedes }, c => compare(c, NARROW, rs, head, sub))
}
cmp('IPF-proof-A-m3-M3', [3, 4], 'Minor third versus major third', 'C4 to E♭4 (3) and C4 to E4 (4): one semitone apart on the upper note.', ['IPV-24', 'IPV-13', 'IPV-14'], 'IPV-24-native')
cmp('IPF-proof-B-p4-tt-p5', [5, 6, 7], 'Fourth, tritone, fifth', 'C4 to F4 (5), F♯4/G♭4 (6) and G4 (7): three neighbouring keys.', ['IPV-25', 'IPV-15', 'IPV-16', 'IPV-17'], 'IPV-25-native')
cmp('IPF-compare-m2-M2', [1, 2], 'Minor second versus major second', 'C4 to D♭4 (1) and C4 to D4 (2).', ['IPV-23', 'IPV-11', 'IPV-12'], 'IPV-23-native')
cmp('IPF-compare-m6-M6', [8, 9], 'Minor sixth versus major sixth', 'C4 to A♭4 (8) and C4 to A4 (9).', ['IPV-26', 'IPV-18', 'IPV-19'], 'IPV-26-native')
cmp('IPF-compare-m7-M7', [10, 11], 'Minor seventh versus major seventh', 'C4 to B♭4 (10) and C4 to B4 (11). C4 to B4 is 11; B4 to C5 is a separate step of 1.', ['IPV-27', 'IPV-20', 'IPV-21'], 'IPV-27-native')
emit('IPF-proof-C-map', 'Thirteen-landmark keyboard map', { group: 'SYSTEM', ids: ['IPV-30', 'IPV-07', 'IPV-10..IPV-22'], teach: 'All thirteen pitches, fixed identity colours, exact 0–12 ruler, Plogger N/A at 0 and 12.', variant: 'wide', supersedes: 'IPV-30-native' }, c => map(c, 900))
emit('IPF-proof-C-map-narrow', 'Thirteen-landmark keyboard map (phone)', { group: 'SYSTEM', ids: ['IPV-30', 'IPV-07'], teach: 'Phone layout.', variant: 'narrow', supersedes: 'IPV-30-narrow' }, c => map(c, NARROW))
emit('IPF-onepage', 'Thirteen intervals on one page', { group: 'SYSTEM', ids: ['IPV-30'], teach: 'Row per interval: identity colour, notes, semitones, three Plogger marks.', variant: 'wide' }, c => onepage(c, WIDE))
emit('IPF-onepage-narrow', 'Thirteen intervals on one page (phone)', { group: 'SYSTEM', ids: ['IPV-30'], teach: 'Phone layout.', variant: 'narrow' }, c => onepage(c, NARROW))
emit('IPF-plogger-chart', 'Plogger three-factor chart [1]–[11] with N/A boundaries', { group: 'SYSTEM', ids: [], teach: 'All eleven historic glyphs plus N/A boundaries, with legend.', variant: 'wide' }, c => ploggerChart(c, WIDE))
emit('IPF-plogger-chart-narrow', 'Plogger three-factor chart (phone)', { group: 'SYSTEM', ids: [], teach: 'Phone layout.', variant: 'narrow' }, c => ploggerChart(c, NARROW))
emit('IPF-invert', 'Inversion', { group: 'COMPARE', ids: ['IPV-29'], teach: 'm3↔M6, M3↔m6, P4↔P5: semitones add to 12.', variant: 'wide', supersedes: 'IPV-29-native' }, c => invert(c, WIDE))
emit('IPF-invert-narrow', 'Inversion (phone)', { group: 'COMPARE', ids: ['IPV-29'], teach: 'Phone layout.', variant: 'narrow', supersedes: 'IPV-29-native' }, c => invert(c, NARROW))
emit('IPF-register', 'The same interval in three registers', { group: 'COMPARE', ids: ['IPV-28'], teach: 'P5 in three registers.', variant: 'wide', supersedes: 'IPV-28-native' }, c => register(c, WIDE))
emit('IPF-register-narrow', 'The same interval in three registers (phone)', { group: 'COMPARE', ids: ['IPV-28'], teach: 'Phone layout.', variant: 'narrow', supersedes: 'IPV-28-native' }, c => register(c, NARROW))
emit('IPF-intro-04', 'What is an interval? C4 to E4', { group: 'SYSTEM', ids: ['IPV-04'], teach: 'Interval = distance; four hops.', variant: 'wide', supersedes: 'IPV-04-native' }, c => intro04(c, WIDE))
emit('IPF-intro-05', 'Melodic versus harmonic', { group: 'SYSTEM', ids: ['IPV-05'], teach: 'Same notes, one after another vs together.', variant: 'wide', supersedes: 'IPV-05-native' }, c => intro05(c, WIDE))

writeFileSync(ROOT + 'docs/m05/info_registry.json', JSON.stringify(reg, null, 1))
writeFileSync(ROOT + 'docs/m05/identity_tokens_v1.json', JSON.stringify({ version: IDENTITY_VERSION, source: 'lib/soundscape/resources/interval-identity.ts', colors: INTERVAL_IDENTITY_COLORS_V1, ploggerLens: PLOGGER_LENS_V1 }, null, 1))
console.log('info figures:', Object.keys(reg).length)
