'use client'
import Link from 'next/link'
import { useId, useState } from 'react'
import Md from '../Md'
import { AudioProvider, NowPlaying, StopButton, useAudio } from '../AudioProvider'
import Keys from '../week1/Keys'
import { MAtlas } from '../visual/Week2Moments'
import { ATLAS, INTERVALS, QUICK_INTRO, noteRecipe, type IntervalRecord } from '@/lib/soundscape/resources/palette'
import { compareEvents, pairEvents } from '@/lib/soundscape/week2/fixtures'
import { PATCHES } from '@/lib/soundscape/fixtures'
import { LESSON_PATCH } from '@/lib/soundscape/week1/fixtures'
import { midiToName } from '@/lib/soundscape/midi'

const BASE = '/curriculum/soundscape-path'
const clean = (s: string) => s.replace(/`/g, '').replace(/^"|"$/g, '').replace(/"\s/, ' ')
const PATCH_CHOICES = { pure: { label: 'Pure sine', patch: LESSON_PATCH }, pad: { label: 'Fuller pad', patch: PATCHES.rich } } as const
type PatchKey = keyof typeof PATCH_CHOICES

/** The pair a card shows and plays. Defaults to the C4-rooted record; the lesson can pass its own exact pair. */
export type Pair = { lower: number; upper: number }
const pairOf = (r: IntervalRecord, p?: Pair): Pair => p ?? { lower: r.lowerMidi, upper: r.upperMidi }
/** Spelled note names: the record's own spelling (D♭4, F♯4 …) for its default pair, plain names for a lesson's explicit pair. */
const shiftName = (name: string, octaves: number) => name.replace(/(-?\d)$/, d => String(Number(d) + octaves))
function names(r: IntervalRecord, p: Pair | undefined, shift = 0): [string, string] {
  if (p) return [midiToName(p.lower + shift), midiToName(p.upper + shift)]
  return [shiftName(r.lowerName, shift / 12), shiftName(r.upperName, shift / 12)]
}

function useHear() {
  const a = useAudio()
  return (r: IntervalRecord, mode: 'together' | 'up' | 'down', opts: { pair?: Pair; shift?: number; patch?: PatchKey } = {}) => {
    const p = pairOf(r, opts.pair), s = opts.shift ?? 0
    const lo = p.lower + s, hi = p.upper + s
    const [ln, un] = names(r, opts.pair, s)
    const how = mode === 'together' ? 'together' : mode === 'up' ? 'as a rising melody' : 'as a falling melody'
    a.play(`ip-${r.id}-${mode}`, pairEvents(lo, hi, mode), `Now playing ${ln} and ${un} ${how}: ${r.name}, ${r.semitones} semitones`, PATCH_CHOICES[opts.patch ?? 'pure'].patch)
  }
}

function Swatch({ r, color }: { r: IntervalRecord; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="inline-block w-5 h-5 rounded border border-slate-400" style={{ backgroundColor: color ?? r.color.hex }} />
      <span className="text-sm sp-muted">{r.color.name}</span>
    </span>
  )
}

function Deep({ r }: { r: IntervalRecord }) {
  return (
    <div className="mt-4 border-t border-slate-200 pt-4 space-y-3" data-deep={r.id}>
      <p className="text-sm sp-muted m-0">{clean(r.deep.colorCue)}. Default keyboard example: {r.deep.example}. Possible listening words: {r.deep.words}.</p>
      {r.deep.sections.map(([k, v]) => (
        <div key={k}>
          <h4 className="font-semibold text-slate-900 m-0">{k}</h4>
          <p className="m-0"><Md>{v}</Md></p>
        </div>
      ))}
    </div>
  )
}

export function IntervalCard({ r, pair, defaultOpen = false, full = false, color, shift = 0, patch = 'pure', onSelect, selected, labelOverride }: {
  r: IntervalRecord; pair?: Pair; defaultOpen?: boolean; full?: boolean; color?: string; shift?: number; patch?: PatchKey
  onSelect?: () => void; selected?: boolean; labelOverride?: string
}) {
  const hear = useHear()
  const uid = useId()
  const [open, setOpen] = useState(defaultOpen)
  const [kbd, setKbd] = useState(false)
  const [copied, setCopied] = useState('')
  const p = pairOf(r, pair)
  const [lowerName, upperName] = names(r, pair)
  const name = labelOverride ?? `${lowerName} + ${upperName}`
  return (
    <article id={full ? r.anchor : undefined} className={`sp-card p-4 scroll-mt-24 ${selected ? 'ring-2 ring-slate-700' : ''}`} aria-labelledby={`${uid}-h`} data-interval={r.id}>
      <div className="h-1.5 rounded -mt-1 mb-3" style={{ backgroundColor: color ?? r.color.hex }} aria-hidden="true" />
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 id={`${uid}-h`} className="sp-editorial-title font-medium text-xl text-slate-900 m-0">{r.name} <span className="sp-muted text-base">({r.abbr})</span></h3>
        <p className="m-0 font-semibold"><span className="text-2xl">{r.semitones}</span> <span className="text-sm sp-muted">semitones</span></p>
      </div>
      <p className="m-0 mt-1 font-medium">{name}</p>
      <div className="mt-1"><Swatch r={r} color={color} /></div>
      <p className="text-sm sp-muted m-0 mt-2">Possible listening words: {r.words}. These are invitations, not rules.</p>
      {full && <p className="text-base m-0 mt-2"><Md>{r.role}</Md></p>}
      <div className="flex flex-wrap gap-2 mt-3">
        <button type="button" className="sp-btn" onClick={() => { onSelect?.(); hear(r, 'together', { pair, shift, patch }) }}>Hear together</button>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => { onSelect?.(); hear(r, 'up', { pair, shift, patch }) }}>Hear as a melody</button>
        <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={kbd} onClick={() => setKbd(v => !v)}>{kbd ? 'Hide keyboard' : 'Show keyboard'}</button>
        {full && <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={open} aria-controls={`${uid}-deep`} onClick={() => setOpen(v => !v)}>{open ? 'Close the deeper story' : 'Open the deeper story'}</button>}
      </div>
      {kbd && (
        <div className="mt-3">
          <Keys lo={Math.min(p.lower, p.upper) - 1} hi={Math.max(p.lower, p.upper) + 1} title={`Keyboard with ${lowerName} and ${upperName} outlined: ${r.semitones} semitones apart`} showNames
            labels={{ [p.lower]: lowerName, [p.upper]: upperName }} marks={{ [p.lower]: 'on', [p.upper]: 'on' }} />
          <p className="text-sm sp-muted m-0">Count the hops between the outlined keys, black keys included: {r.semitones}.</p>
        </div>
      )}
      {r.altSpelling && <p className="text-sm m-0 mt-2">The same {r.semitones} semitones can also be spelled {r.altSpelling.lower}–{r.altSpelling.upper}, a <strong>{r.altSpelling.name.toLowerCase()}</strong>. The letters change the name, not the pitch.</p>}
      {full && (
        <div id={`${uid}-deep`}>
          {!open && <p className="text-sm sp-muted m-0 mt-2"><Md>{clean(r.quick.canDo)}</Md> <em>Try this:</em> <Md>{clean(r.quick.tryThis)}</Md></p>}
          {open && (
            <>
              <Deep r={r} />
              <div className="flex flex-wrap gap-2 mt-4">
                <button type="button" className="sp-btn sp-btn--ghost" onClick={() => hear(r, 'down', { pair, shift, patch })}>Hear it falling</button>
                <button type="button" className="sp-btn sp-btn--ghost" onClick={() => hear(r, 'together', { pair, shift: 12, patch })}>Change register (up an octave)</button>
                <button type="button" className="sp-btn sp-btn--ghost" onClick={async () => { const t = noteRecipe(r); try { await navigator.clipboard.writeText(t); setCopied('Copied. Paste it into your own notes or DAW.') } catch { setCopied(t) } }}>Add to my soundscape (copy note recipe)</button>
              </div>
              {copied && <p role="status" className="text-sm sp-callout mt-2 mb-0">{copied}</p>}
            </>
          )}
        </div>
      )}
    </article>
  )
}

function Strip({ onPick, current }: { onPick?: (id: string) => void; current?: string }) {
  return (
    <ol className="list-none p-0 m-0 grid grid-cols-7 sm:grid-cols-13 gap-1" aria-label="The thirteen landmarks, 0 to 12 semitones above C4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))' }}>
      {INTERVALS.map(r => (
        <li key={r.id}>
          <button type="button" onClick={() => onPick?.(r.id)} aria-pressed={current === r.id} className="w-full min-h-[44px] rounded border border-slate-300 bg-white text-center sp-choice" style={{ borderBottom: `5px solid ${r.color.hex}` }}>
            <span className="block font-semibold leading-tight">{r.semitones}</span>
            <span className="block text-xs sp-muted leading-tight">{r.abbr}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}

/** Lesson 2A: the compact palette. Four focused cards with the lesson's exact pairs, the tritone as a preview only. */
export function CompactPalette({ afterTry }: { afterTry: string }) {
  const [all, setAll] = useState(false)
  const [tried, setTried] = useState(false)
  const R = (id: string) => INTERVALS.find(i => i.id === id)!
  const C4 = 60
  return (
    <div onClickCapture={e => { if ((e.target as HTMLElement).closest('.sp-btn')) setTried(true) }}>
      <Strip />
      <p className="text-sm sp-muted mt-1">Zero is the same note; twelve is the next C. Each landmark sits that many semitones above C4.</p>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <IntervalCard r={R('IP-04')} pair={{ lower: C4, upper: C4 + 4 }} />
        <IntervalCard r={R('IP-05')} pair={{ lower: C4, upper: C4 + 5 }} />
        <IntervalCard r={R('IP-02')} pair={{ lower: 62, upper: 64 }} />
        <IntervalCard r={R('IP-03')} pair={{ lower: 64, upper: 67 }} />
      </div>
      <p className="sp-callout max-w-2xl mt-4"><strong>Preview:</strong> the tritone, {R('IP-06').semitones} semitones, comes in Lesson 2B. It is not part of today&apos;s C4–E4 pair.</p>
      <div className="flex flex-wrap gap-3 my-4 sp-noprint">
        <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={all} onClick={() => setAll(v => !v)}>{all ? 'Close the other cards' : 'Open all thirteen'}</button>
        <Link className="sp-btn" href={`${BASE}/resources/interval-palette#ip-04`}>Explore the full Interval Atlas</Link>
        <a className="sp-btn sp-btn--ghost" href="/soundscape/resources/INTERVAL_PALETTE_QUICK_PRINT_V1.pdf">Print the palette (PDF)</a>
        <StopButton />
      </div>
      <NowPlaying />
      {all && <div className="grid gap-4 md:grid-cols-2">{INTERVALS.map(r => <IntervalCard key={r.id} r={r} />)}</div>}
      {tried && <p className="sp-prose mt-4" role="note">{afterTry}</p>}
    </div>
  )
}

function Lab({ sel, setSel, shift, setShift, patch, setPatch }: { sel: string; setSel: (s: string) => void; shift: number; setShift: (n: number) => void; patch: PatchKey; setPatch: (p: PatchKey) => void }) {
  const a = useAudio()
  const [other, setOther] = useState('IP-07')
  const r = INTERVALS.find(i => i.id === sel)!, o = INTERVALS.find(i => i.id === other)!
  const hear = useHear()
  const pc = PATCH_CHOICES[patch].patch
  return (
    <section aria-labelledby="ip-lab" className="sp-card p-4 sm:p-5">
      <h2 id="ip-lab" className="sp-editorial-heading text-2xl text-slate-900 mt-0">Sound lab</h2>
      <p className="sp-muted m-0">Selected: <strong className="text-slate-900">{r.name}</strong> · {names(r, undefined, shift)[0]} + {names(r, undefined, shift)[1]} · {r.semitones} semitones. Choose any card below to select it. Sound plays only when you press a button.</p>
      <div className="flex flex-wrap gap-2 my-3">
        <button type="button" className="sp-btn" onClick={() => hear(r, 'together', { shift, patch })}>Hear together</button>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => hear(r, 'up', { shift, patch })}>Rising melody</button>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => hear(r, 'down', { shift, patch })}>Falling melody</button>
        <StopButton />
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <label className="inline-flex items-center gap-2 min-h-[44px]">Register
          <select className="sp-field" style={{ minHeight: 0, width: 'auto' }} value={shift} onChange={e => setShift(Number(e.target.value))}>
            <option value={0}>Middle (C4 up)</option><option value={12}>Up an octave</option><option value={-12}>Down an octave</option>
          </select>
        </label>
        <label className="inline-flex items-center gap-2 min-h-[44px]">Sound
          <select className="sp-field" style={{ minHeight: 0, width: 'auto' }} value={patch} onChange={e => setPatch(e.target.value as PatchKey)}>
            {Object.entries(PATCH_CHOICES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 items-center">
        <label className="inline-flex items-center gap-2 min-h-[44px]">Compare with
          <select className="sp-field" style={{ minHeight: 0, width: 'auto' }} value={other} onChange={e => setOther(e.target.value)}>
            {INTERVALS.map(i => <option key={i.id} value={i.id}>{i.name} ({i.semitones})</option>)}
          </select>
        </label>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => a.play('ip-compare', compareEvents([r.lowerMidi + shift, r.upperMidi + shift], [o.lowerMidi + shift, o.upperMidi + shift]), `Now playing ${r.name}, a pause, then ${o.name}`, pc)}>Compare A then B</button>
      </div>
      <NowPlaying />
    </section>
  )
}

/** The standalone Interval Palette: ruler, 13 cards with their deep chapters, lab, six deeper chapters. */
export default function FullPalette() {
  const [sel, setSel] = useState('IP-04')
  const [shift, setShift] = useState(0)
  const [patch, setPatch] = useState<PatchKey>('pure')
  const [mine, setMine] = useState(false)
  const [colors, setColors] = useState<Record<string, string>>({})
  return (
    <AudioProvider>
      <MAtlas />
      <Lab sel={sel} setSel={setSel} shift={shift} setShift={setShift} patch={patch} setPatch={setPatch} />
      <section aria-labelledby="ip-ruler" className="mt-10">
        <h2 id="ip-ruler" className="sp-editorial-heading text-2xl text-slate-900">Thirteen landmarks in one octave</h2>
        <p className="sp-prose">{QUICK_INTRO.paras[0]}</p>
        <Strip current={sel} onPick={id => { setSel(id); document.getElementById(INTERVALS.find(i => i.id === id)!.anchor)?.scrollIntoView({ block: 'start' }) }} />
        <div className="mt-4"><Keys lo={60} hi={72} title="Keyboard from C4 to C5: the thirteen landmarks sit on these keys, one for each semitone" showNames labels={{ 60: 'C4 · 0', 72: 'C5 · 12' }} marks={{ [60 + INTERVALS.find(i => i.id === sel)!.semitones]: 'on', 60: 'on' }} /></div>
        <p className="text-sm sp-muted">{QUICK_INTRO.paras[1] ? clean(QUICK_INTRO.paras[1]).replace(/\*\*/g, '') : ''}</p>
        <label className="inline-flex items-center gap-2 min-h-[44px] sp-noprint"><input type="checkbox" checked={mine} onChange={e => setMine(e.target.checked)} /> Choose my own colors (only on this page, until you leave)</label>
      </section>
      <section aria-labelledby="ip-cards" className="mt-8">
        <h2 id="ip-cards" className="sp-editorial-heading text-2xl text-slate-900">All thirteen intervals</h2>
        <div className="grid gap-5 md:grid-cols-2 items-start">
          {INTERVALS.map(r => (
            <div key={r.id}>
              {mine && <label className="inline-flex items-center gap-2 text-sm min-h-[44px]">My color for {r.name} <input type="color" value={colors[r.id] ?? r.color.hex} onChange={e => setColors(c => ({ ...c, [r.id]: e.target.value }))} aria-label={`My color for ${r.name}`} /></label>}
              <IntervalCard r={r} full color={colors[r.id]} shift={shift} patch={patch} onSelect={() => setSel(r.id)} selected={sel === r.id} />
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="ip-deeper" className="mt-12 space-y-10">
        <h2 id="ip-deeper" className="sp-editorial-heading text-2xl text-slate-900">Understand more deeply</h2>
        {ATLAS.layers.map(l => (
          <div key={l.title} id={`layer-${l.title.match(/layer ([A-F])/i)?.[1].toLowerCase()}`} className="scroll-mt-24">
            <h3 className="sp-editorial-title font-medium text-xl text-slate-900">{l.h2}</h3>
            <div className="sp-prose">{l.paras.map(p => <p key={p.slice(0, 30)}><Md>{p}</Md></p>)}</div>
            {l.table.length > 0 && (
              <table className="w-full max-w-xl text-left border-collapse my-3">
                <thead><tr className="border-b border-slate-300">{l.table[0].map(h => <th key={h} className="py-1 pr-3">{h}</th>)}</tr></thead>
                <tbody>{l.table.slice(1).map(row => <tr key={row.join()} className="border-b border-slate-200">{row.map((c, i) => <td key={i} className="py-1 pr-3">{c}</td>)}</tr>)}</tbody>
              </table>
            )}
            {l.bullets.length > 0 && <ul className="sp-prose pl-5 list-disc">{l.bullets.map(b => <li key={b}><LinkText>{b}</LinkText></li>)}</ul>}
            {l.fields.map(([k, v]) => <p key={k} className="m-0 mt-2"><strong>{k.startsWith('Curated') ? 'Listening examples' : k}:</strong> <LinkText>{v}</LinkText></p>)}
          </div>
        ))}
      </section>
      <section aria-labelledby="ip-studio" className="mt-12">
        <h2 id="ip-studio" className="sp-editorial-heading text-2xl text-slate-900">Your interval studio</h2>
        <div className="sp-prose">{ATLAS.studio.map(p => <p key={p.slice(0, 30)}>{p}</p>)}</div>
      </section>
      <section aria-labelledby="ip-sources" className="mt-10">
        <h2 id="ip-sources" className="sp-editorial-heading text-xl text-slate-900">Sources and limits</h2>
        <ul className="text-sm sp-muted pl-5 list-disc space-y-1">{ATLAS.editorial.map(e => <li key={e.slice(0, 30)}><LinkText>{e}</LinkText></li>)}</ul>
      </section>
    </AudioProvider>
  )
}

/** Plain text with outbound links: new tab, noopener, never embedded. */
export function LinkText({ children }: { children: string }) {
  const parts = children.split(/(https?:\/\/[^\s;,)]+)/g)
  return <>{parts.map((p, i) => /^https?:/.test(p) ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="break-all font-medium" style={{ color: '#b45309' }}>{new URL(p).hostname.replace(/^www\./, '')}<span className="sp-sr-only"> (opens in a new tab)</span> ↗</a> : <span key={i}><Md>{p}</Md></span>)}</>
}
