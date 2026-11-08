import Link from 'next/link'
import type { ReactNode } from 'react'
import Md from '../Md'
import HashOpen from './HashOpen'
import PaletteIllustratedCard from './PaletteIllustratedCard'
import { BASE } from '@/lib/soundscape/course'
import { ATLAS, INTERVALS, QUICK_INTRO, noteRecipe, type IntervalRecord } from '@/lib/soundscape/resources/palette'
import { PLOGGER_LENS_V1, PLOGGER_LINEAGE, hasPlogger, SHAPE_LABEL, DIR_LABEL, FILL_LABEL } from '@/lib/soundscape/resources/interval-identity'
import reg from '@/docs/m05/info_registry.json'
import extra from '@/docs/m05/native_extra_registry.json'

const PI = '/soundscape/m05/info'
const R = { ...reg, ...extra } as Record<string, { desc: string; size: number[] }>
const strip = (n: string) => n.replace(/\d/g, '')
const up = (r: IntervalRecord) => r.altSpelling ? `${r.upperName} (also ${r.altSpelling.upper})` : r.upperName

/** One static figure: wide SVG on screens, phone SVG on narrow viewports, ink-light print SVG on paper. Alt text is the figure's own description. */
function Fig({ id, cap }: { id: string; cap?: ReactNode }) {
  const e = R[id], narrow = !!R[`${id}-narrow`], P = id.startsWith('IPV-') ? '/soundscape/m05/native' : PI
  return (
    <figure className="ip6-fig">
      <picture>
        <source media="print" srcSet={`${P}/${id}.print.svg`} />
        {narrow && <source media="(max-width: 620px)" srcSet={`${P}/${id}-narrow.svg`} width={R[`${id}-narrow`].size[0]} height={R[`${id}-narrow`].size[1]} />}
        <img src={`${P}/${id}.svg`} alt={e.desc} width={e.size[0]} height={e.size[1]} loading="lazy" decoding="async" />
      </picture>
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}

function LinkText({ children }: { children: string }) {
  const parts = children.split(/(https?:\/\/[^\s;,)]+)/g)
  return <>{parts.map((p, i) => /^https?:/.test(p) ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>{new URL(p).hostname.replace(/^www\./, '')} ↗</a> : <span key={i}>{p}</span>)}</>
}

const nn = (r: IntervalRecord) => String(r.semitones).padStart(2, '0')
const SECT = ['Meet the interval', 'As a moving melody', 'Two notes together', 'In actual music', 'Listen and create', 'Paint What You Hear', 'Keep in mind']

function howToRead(r: IntervalRecord) {
  if (r.semitones === 0) return 'One key is highlighted because both notes are the same pitch, C4. Melodic: the same note twice in a row. Harmonic: one note doubled. Distance: zero keys. The Plogger marks read N/A here because the original di-chord system has no entry for the unison.'
  return `Find C4 on your keyboard and count ${r.semitones} keys up, white and black, to ${r.upperName}. The numbered arcs are those hops. The two time strips show the same two notes one after another (melodic, top left) and together (harmonic, top right). The coloured stripe and key outlines are this interval’s identity colour; the three Plogger marks are a separate, historic lens.${r.semitones === 12 ? ' At the octave the Plogger marks read N/A.' : ''}`
}
function ownKeyboard(r: IntervalRecord) {
  if (r.semitones === 0) return 'Play C4, then C4 again, then both hands on two Cs together (any octave). Notice that nothing moved.'
  const u = `${strip(r.upperName)}${r.semitones === 12 ? '5' : '4'}`
  return `Play C4, then ${u}, one after another; then press both together. Count the keys between them yourself and say the number. Notice what you hear without judging it good or bad. Then move the upper note one key and say what changed.`
}

const COMPARE: { id: string; h: string; how: string; own: string }[] = [
  { id: 'IPF-proof-A-m3-M3', h: 'Minor third and major third', how: 'C4 is the shared root. The upper note is E♭4 for the minor third and E4 for the major third: one key apart, so 3 semitones become 4. In the table the root, outline shape and shadow stay the same; the upper note, the count and the Plogger fill change. The Plogger marks are a historic lens, not a rule about how either interval must sound.', own: 'Play C then E♭, then C then E, one after another and together. Count the keys to each upper note out loud. Notice that only the top note moved.' },
  { id: 'IPF-proof-B-p4-tt-p5', h: 'Fourth, tritone and fifth', how: 'Three upper notes sit on three neighbouring keys: F (5), F♯ or G♭ (6) and G (7). The tritone is one key written two ways: F♯ gives an augmented fourth, G♭ a diminished fifth. All three share the printed original’s straight, perfect-group outline; the shadow arrow changes ←, ↔, → and the fill changes dark, midtone, light. Older code disagrees about [6]; this lens follows the printed original and says so.', own: 'Play C with F, with F♯ and with G. Say 5, 6, 7. Then find G♭ and confirm it is the same key as F♯.' },
  { id: 'IPF-compare-m2-M2', h: 'Minor second and major second', how: 'The root C4 stays. The upper note moves from D♭4 to D4, one more key, so 1 semitone becomes 2.', own: 'Play C with D♭, then C with D. Which note moved, and by how many keys?' },
  { id: 'IPF-compare-m6-M6', h: 'Minor sixth and major sixth', how: 'The root stays; A♭4 becomes A4, one key higher, so 8 semitones become 9.', own: 'Play C with A♭, then C with A, together and one after another.' },
  { id: 'IPF-compare-m7-M7', h: 'Minor seventh and major seventh', how: 'The root stays; B♭4 becomes B4, so 10 becomes 11. C4 to B4 is 11 semitones. The melodic step B4 to C5 is a different, single semitone.', own: 'Play C with B♭, then with B, then with the C above. Count each.' },
  { id: 'IPF-invert', h: 'Inversion', how: 'Move the lower note up an octave and the interval changes name: the semitone counts add to 12 and the interval numbers add to 9 (minor third 3 ↔ major sixth 9, major third 4 ↔ minor sixth 8, perfect fourth 5 ↔ perfect fifth 7).', own: 'Play C and E♭; then play E♭ and the C above. Count 3 and then 9.' },
  { id: 'IPF-register', h: 'The same interval in three registers', how: 'The perfect fifth is 7 semitones in every register. How blended or rough it sounds also depends on register, instrument, tuning and context, so the key pattern alone cannot rank intervals.', own: 'Play C with G low on your keyboard, in the middle and high up. Same count, different colour of sound.' },
  { id: 'IPF-intro-04', h: 'What is an interval?', how: 'An interval measures the distance between two notes. Count every key, white and black, from C up to E: four hops. The distance, four semitones, is the interval.', own: 'Count the hops on your own keys from C to E.' },
  { id: 'IPF-intro-05', h: 'Melodic and harmonic', how: 'The same two notes, C4 and E4. Melodic: one after another. Harmonic: together. The distance does not change; the way the notes meet in time does.', own: 'Play C then E, then C and E together.' },
]

export default function PaletteLibrary() {
  const i = ATLAS.intro
  return (
    <>
      <HashOpen />
      <header className="m4-hero">
        <p className="m4-eyebrow">{i.eyebrow}</p>
        <h1>The Ajourné <em>Interval Palette</em> and Atlas</h1>
        <p className="m4-lead">{i.deck}</p>
        <div className="m4-text">{i.para.map(p => <p key={p.slice(0, 30)}>{p}</p>)}</div>
        <p className="m4-caveat"><strong>Read me first.</strong> {i.readme}</p>
        <p className="ip6-muted"><Md>{i.definitions}</Md></p>
        <p className="m4-caveat"><strong>This page makes no sound.</strong> Wherever the text says “hear” or “listen”, play the notes on your own keyboard, sing them, or imagine them. Every picture is drawn from the real note names and semitone counts.</p>
        <nav aria-label="Palette sections" className="ip6-jump">
          {[['#map', 'Landmark map'], ['#cards', 'Thirteen cards'], ['#chapters', 'Thirteen chapters'], ['#compare', 'Comparisons'], ['#plogger', 'Plogger lens'], ['#deeper', 'Six deeper topics'], ['#studio', 'Your studio'], ['#sources', 'Sources']].map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <ul className="m4-cta ip6-noprint">
          <li><a className="m4-btn m4-btn--ghost" href="/soundscape/resources/INTERVAL_PALETTE_QUICK_PRINT_V1.pdf">Print the quick chart (PDF)</a></li>
          <li><a className="m4-btn m4-btn--ghost" href="/soundscape/resources/INTERVAL_PALETTE_QUICK_PRINT_V1.svg">Quick chart (SVG)</a></li>
          <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/week-2/lesson-2a`}>Back to Lesson 2A</Link></li>
          <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/resources`}>Resources Library</Link></li>
        </ul>
      </header>

      <section id="how" className="m4-section" aria-labelledby="how-h">
        <p className="m4-eyebrow">How to read every picture</p>
        <h2 id="how-h">One grammar, thirteen times</h2>
        <div className="m4-text">
          <p>Each interval is drawn the same way. Start with the <strong>name and semitone count</strong>, then the <strong>two exact notes</strong> on a real keyboard from C4 to C5, with numbered hops between them. Next, the same two notes as a <strong>melodic</strong> pair (one after another) and a <strong>harmonic</strong> pair (together). Last, what stays and what changes next to its neighbours.</p>
          <p><strong>Colour is an identity label.</strong> Each interval keeps one fixed colour on its stripe, key outlines and map position. It is an artistic aid for remembering, not a fact about the sound, and every colour is always accompanied by the name, note and number.</p>
          <p><strong>The three Plogger marks are a separate, historic lens.</strong> They come from the printed di-chord pictograph of the Plogger framework and are shown in grey, never in the identity colour. They describe a teaching classification, not measured acoustics.</p>
        </div>
      </section>

      <section id="map" className="m4-section" aria-labelledby="map-h">
        <p className="m4-eyebrow">Overview</p>
        <h2 id="map-h">Thirteen landmarks in one octave</h2>
        <div className="m4-text"><p>{QUICK_INTRO.paras[0]}</p></div>
        <Fig id="IPF-proof-C-map" cap="Every pitch from C4 to C5 with its interval, an exact 0–12 ruler and the Plogger mark for [1]–[11]." />
        <p className="m4-aside"><strong>On your own keyboard.</strong> Pick any landmark on the ruler, find C, count that many keys, and check the note name against the label. C4 to B4 is 11 semitones; B4 to C5 is a different single semitone.</p>
        <Fig id="IPF-onepage" cap="One printable page: all thirteen intervals, their notes, semitone counts and Plogger marks." />
      </section>

      <section id="cards" className="m4-section" aria-labelledby="cards-h">
        <p className="m4-eyebrow">Fast reference</p>
        <h2 id="cards-h">All thirteen intervals</h2>
        <div className="ip6-cards">
          {INTERVALS.map(r => (
            <article key={r.id} id={`card-${r.anchor}`} className="ip6-card" aria-labelledby={`c-${r.id}`} data-interval={r.id}>
              <h3 id={`c-${r.id}`} className="ip6-sr">{r.name} ({r.abbr})</h3>
              <PaletteIllustratedCard r={r} variant="card" />
              <p><strong>{r.role.replace(/`/g, '')}</strong></p>
              <p className="ip6-small">Example: {r.example}. Possible listening words: {r.words}. These are invitations, not rules.</p>
              <p className="ip6-small"><strong>Try on your keyboard:</strong> {ownKeyboard(r)}</p>
              <p className="ip6-small ip6-noprint"><a href={`#${r.anchor}`}>Read the full chapter ↓</a></p>
            </article>
          ))}
        </div>
      </section>

      <section id="chapters" className="m4-section" aria-labelledby="ch-h">
        <p className="m4-eyebrow">The Atlas</p>
        <h2 id="ch-h">Thirteen chapters</h2>
        <div className="m4-text"><p>Each chapter keeps its full source text. Open “Read the full chapter” for the seven sections.</p></div>
        {INTERVALS.map(r => {
          const ch = ATLAS.chapters.find(c => c.id === r.id) as unknown as Record<string, string>
          return (
            <article key={r.id} id={r.anchor} className="ip6-chapter scroll-mt-24" aria-labelledby={`h-${r.id}`} data-chapter={r.id}>
              <h3 id={`h-${r.id}`}>{r.name} <span>({r.abbr}) · {r.semitones} semitone{r.semitones === 1 ? '' : 's'}</span></h3>
              <PaletteIllustratedCard r={r} variant="chapter" />
              <details className="ip6-tech">
                <summary>View precise keyboard &amp; Plogger diagram</summary>
                <Fig id={`IPF-sheet-${nn(r)}`} />
              </details>
              <p className="ip6-small"><strong>How to read this picture.</strong> {howToRead(r)}</p>
              <p className="ip6-small"><strong>On your own keyboard.</strong> {ownKeyboard(r)}</p>
              {r.altSpelling && <p className="ip6-small"><strong>Two spellings, one key.</strong> {r.lowerName} to {r.upperName} is an {r.name.toLowerCase().includes('tritone') ? 'augmented fourth' : r.name.toLowerCase()}; {r.altSpelling.lower} to {r.altSpelling.upper} is a {r.altSpelling.name.toLowerCase()}. Both are {r.semitones} semitones.</p>}
              <details>
                <summary>Read the full chapter</summary>
                <p className="ip6-small">Default keyboard example: {ch.example}. Possible listening words: {ch.words}.</p>
                {SECT.map(k => <div key={k}><h4>{k}</h4><p><Md>{ch[k]}</Md></p></div>)}
                <h4>On your own keyboard</h4>
                <p>Play both notes together; play them one after another; repeat an octave higher or lower; compare with a neighbouring interval; and keep a note of what you found. Note recipe to copy into your own notes: {noteRecipe(r)}</p>
              </details>
            </article>
          )
        })}
      </section>

      <section id="compare" className="m4-section" aria-labelledby="cmp-h">
        <p className="m4-eyebrow">Side by side</p>
        <h2 id="cmp-h">Comparisons</h2>
        {COMPARE.map(c => (
          <div key={c.id} id={c.id.toLowerCase()} className="ip6-cmp">
            <h3>{c.h}</h3>
            <Fig id={c.id} />
            <p className="ip6-small"><strong>How to read it.</strong> {c.how}</p>
            <p className="ip6-small"><strong>On your own keyboard.</strong> {c.own}</p>
          </div>
        ))}
      </section>

      <section id="plogger" className="m4-section" aria-labelledby="pl-h">
        <p className="m4-eyebrow">Historic lens</p>
        <h2 id="pl-h">The three Plogger marks</h2>
        <div className="m4-text">
          <p>The original Plogger di-chord pictograph describes the eleven intervals from [1] (minor second) to [11] (major seventh) with three independent signs: <strong>A</strong> the outline (jagged, rounded or straight family), <strong>B</strong> a side shadow with an arrow (← fundamental, ↔ both, → octave) and <strong>C</strong> the fill (dense, open, midtone dotted or hatched).</p>
          <p>These are shown here as a clearly labelled <em>historic teaching lens</em>, following {PLOGGER_LINEAGE}. They are not physical measurements. The old fixed “8, 4, 2 Hz” family names are not used, because real beating depends on the two frequencies, the register and the instrument. Older code disagrees about [6] (the tritone) and [10] (the minor seventh); this page follows the printed original. The unison and the octave have no entry in the original, so they read N/A.</p>
        </div>
        <Fig id="IPF-plogger-chart" />
        <table className="ip6-table">
          <caption>The eleven historic entries as text</caption>
          <thead><tr><th>Bracket</th><th>Interval</th><th>A Shape</th><th>B Shadow</th><th>C Fill</th></tr></thead>
          <tbody>
            {INTERVALS.map(r => hasPlogger(r.semitones)
              ? <tr key={r.id}><td>[{r.semitones}]</td><td>{r.name}</td><td>{SHAPE_LABEL[PLOGGER_LENS_V1[r.semitones].shape]}</td><td>{DIR_LABEL[PLOGGER_LENS_V1[r.semitones].dir]}</td><td>{FILL_LABEL[PLOGGER_LENS_V1[r.semitones].fill]}</td></tr>
              : <tr key={r.id}><td>N/A</td><td>{r.name}</td><td colSpan={3}>N/A, reference boundary</td></tr>)}
          </tbody>
        </table>
      </section>

      <section id="deeper" className="m4-section" aria-labelledby="dp-h">
        <p className="m4-eyebrow">Go further</p>
        <h2 id="dp-h">Six deeper topics</h2>
        {ATLAS.layers.map(l => {
          const k = l.title.match(/layer ([A-F])/i)?.[1].toLowerCase()
          return (
            <div key={l.title} id={`layer-${k}`} className="ip6-layer scroll-mt-24">
              <h3>{l.h2}</h3>
              <div className="m4-text">{l.paras.map(p => <p key={p.slice(0, 30)}><Md>{p}</Md></p>)}</div>
              {k === 'b' && <Fig id="IPV-34-native" />}
              {k === 'd' && <Fig id="IPV-35-native" />}
              {l.table.length > 0 && (
                <table className="ip6-table"><thead><tr>{l.table[0].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{l.table.slice(1).map(row => <tr key={row.join()}>{row.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table>
              )}
              {l.bullets.length > 0 && <ul>{l.bullets.map(b => <li key={b}><LinkText>{b}</LinkText></li>)}</ul>}
              {l.fields.map(([f, v]) => <p key={f}><strong>{f.startsWith('Curated') ? 'Listening examples' : f}:</strong> <LinkText>{v}</LinkText></p>)}
            </div>
          )
        })}
      </section>

      <section id="studio" className="m4-section" aria-labelledby="st-h">
        <p className="m4-eyebrow">Make it yours</p>
        <h2 id="st-h">Your interval studio</h2>
        <div className="m4-text">{ATLAS.studio.map(p => <p key={p.slice(0, 30)}>{p}</p>)}</div>
      </section>

      <section id="sources" className="m4-section" aria-labelledby="so-h">
        <p className="m4-eyebrow">Sources and limits</p>
        <h2 id="so-h">Sources and limits</h2>
        <ul className="ip6-small">{ATLAS.editorial.map(e => <li key={e.slice(0, 30)}><LinkText>{e}</LinkText></li>)}</ul>
        <p className="ip6-small">Pitch names use equal temperament with C4 as MIDI 60. Identity colours are artistic, version 1.0 (one source: <code>interval-identity.ts</code>). The Plogger marks are a historic teaching lens.</p>
        <p className="ip6-small ip6-rule">{ATLAS.footer}</p>
      </section>
    </>
  )
}
