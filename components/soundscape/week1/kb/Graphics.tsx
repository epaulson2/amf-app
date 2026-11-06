'use client'
import { useState } from 'react'
import KeyboardArt, { type KeyState } from './KeyboardArt'
import Frame from './Frame'

const btn = 'sp-btn sp-btn--ghost'

// ---------- G1: pitch is not volume
function PitchLadder({ pairs }: { pairs: { name: string; y: number; r: number }[] }) {
  return (
    <svg viewBox="0 0 300 130" className="sp-diagram" role="img" aria-label="Two small pictures. Pitch is how high a dot sits. Volume is how big a dot is.">
      <title>Pitch is height; volume is size</title>
      <desc>Left: a small quiet dot placed high, and a large loud dot placed low, to show that a note can be high and quiet or low and loud.</desc>
      <line x1={20} x2={20} y1={110} y2={14} stroke="#475569" strokeWidth={2} />
      <polygon points="20,8 14,20 26,20" fill="#475569" />
      <text x={28} y={20} fontSize={14} fill="#475569">higher</text>
      <text x={28} y={102} fontSize={14} fill="#475569">lower</text>
      {pairs.map((p, i) => (
        <g key={p.name}>
          <circle cx={90 + i * 110} cy={p.y} r={p.r} fill="#1a5a8a" opacity={0.85} />
          <text x={90 + i * 110} y={125} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1e293b">{p.name}</text>
        </g>
      ))}
    </svg>
  )
}

export function G1() {
  const [show, setShow] = useState(false)
  const states: Record<number, KeyState> = { 2: { tone: 'soft', label: 'lower' }, 6: { tone: 'soft', label: 'middle' }, 11: { tone: 'soft', label: 'higher' } }
  const arrow = (g: { cx: (i: number) => number; top: number }) => (
    <g>
      <path d={`M ${g.cx(1)} ${g.top - 1} C ${g.cx(5)} ${g.top - 14}, ${g.cx(9)} ${g.top - 14}, ${g.cx(12) + 6} ${g.top - 1}`} fill="none" stroke="#b45309" strokeWidth={3} strokeLinecap="round" />
      <polygon points={`${g.cx(12) + 14},${g.top - 2} ${g.cx(12) - 2},${g.top - 10} ${g.cx(12) - 1},${g.top + 6}`} fill="#b45309" />
    </g>
  )
  return (
    <Frame n={1} title="Higher to the right, lower to the left" caption="Pitch is height in sound; volume is how loud. The keyboard here is a drawing: it makes no sound.">
      <div className="hidden sm:block"><KeyboardArt whites={14} states={states} title="A keyboard of fourteen white keys with an arrow pointing right, from lower to higher" desc="Fourteen white keys with their black keys in groups of two and three. Three keys are marked lower, middle and higher from left to right. An arrow above points to the right: sounds get higher to the right." overlay={arrow} topPad={22} /></div>
      <div className="sm:hidden"><KeyboardArt whites={8} kw={44} states={{ 1: { tone: 'soft', label: 'lower' }, 4: { tone: 'soft', label: 'middle' }, 7: { tone: 'soft', label: 'higher' } }} title="A keyboard of eight white keys with an arrow pointing right, from lower to higher" desc="Eight white keys with black keys in groups of two and three. Three keys are marked lower, middle and higher from left to right. An arrow points right: sounds get higher to the right." overlay={g => arrow({ cx: i => g.cx(Math.min(i, 7)), top: g.top })} topPad={22} /></div>
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <div className="sp-card p-3"><p className="font-semibold m-0">High and quiet</p><PitchLadder pairs={[{ name: 'high · quiet', y: 28, r: 8 }]} /></div>
        <div className="sp-card p-3"><p className="font-semibold m-0">Low and loud</p><PitchLadder pairs={[{ name: 'low · loud', y: 92, r: 18 }]} /></div>
      </div>
      <p className="mt-3 sp-noprint"><button type="button" className={btn} aria-expanded={show} onClick={() => setShow(v => !v)}>{show ? 'Hide what pitch means' : 'Show what pitch means'}</button></p>
      {show && <p role="status" className="sp-callout max-w-2xl"><strong>Pitch is how high or low a sound is.</strong> Volume is how soft or loud. A high note can be quiet; a low note can be loud.</p>}
    </Frame>
  )
}

// ---------- G2: find C (left of the two black keys)
export function G2() {
  const [mode, setMode] = useState<'hidden' | 'first' | 'second'>('hidden')
  const states: Record<number, KeyState> = {}
  if (mode !== 'hidden') states[0] = { tone: 'spot', label: 'C' }
  if (mode === 'second') states[7] = { tone: 'spot', label: 'C' }
  return (
    <Frame n={2} title="Two black keys, then three: the map" caption="The white key just left of any pair of black keys is C. The picture is a drawing, not a piano: it never makes a sound.">
      <KeyboardArt whites={10} states={states} title="Ten white keys: the white key just left of each pair of black keys is C" desc="Ten white keys starting on C. Black keys sit in a group of two after C and D, then a group of three after F, G and A, then a group of two again after the second C. The white key immediately left of each group of two is C." />
      <div className="flex flex-wrap gap-2 mt-3 sp-noprint">
        <button type="button" className={btn} onClick={() => setMode('first')}>Reveal C</button>
        <button type="button" className={btn} disabled={mode === 'hidden'} onClick={() => setMode('second')}>Find another C</button>
        <button type="button" className={btn} onClick={() => setMode('hidden')}>Hide labels</button>
      </div>
      <p className="m-0 mt-2" role="status">{mode === 'hidden' ? 'Look for a group of two black keys. The white key just to its left is C.' : mode === 'first' ? 'This C is the white key just left of a group of two black keys.' : 'The same pattern repeats: another group of two black keys, another C just to its left.'}</p>
      <div className="mt-4">
        <p className="font-semibold m-0">The landmark repeats along the whole keyboard</p>
        <svg viewBox="0 0 320 90" className="sp-diagram" role="img" aria-label="A long, narrow keyboard strip. Black keys come in groups of two then three, over and over. Each C, the white key just left of a pair, is marked with a dot." style={{ maxWidth: 560 }}>
          <title>The two-then-three pattern repeats</title>
          <desc>A strip of about twenty-one white keys with groups of two and three black keys repeating. A dot marks each C, the white key just left of a pair of black keys.</desc>
          {Array.from({ length: 22 }, (_, i) => <rect key={i} x={4 + i * 14} y={8} width={14} height={50} rx={2} fill="#fffdf8" stroke="#94a3b8" />)}
          {Array.from({ length: 21 }, (_, i) => { const n = ['C', 'D', 'E', 'F', 'G', 'A', 'B'][i % 7]; return n !== 'E' && n !== 'B' ? <rect key={i} x={4 + (i + 1) * 14 - 4.5} y={8} width={9} height={31} rx={1.5} fill="#1e293b" /> : null })}
          {Array.from({ length: 4 }, (_, k) => <g key={k}><circle cx={4 + k * 98 + 7} cy={70} r={9} fill="#b45309" /><text x={4 + k * 98 + 7} y={75} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">C</text></g>)}
        </svg>
      </div>
    </Frame>
  )
}

// ---------- G3: the seven white keys, C to C
const PATH = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
export function G3() {
  const [names, setNames] = useState(true)
  const [step, setStep] = useState(-1)
  const states: Record<number, KeyState> = {}
  if (step >= 0) { states[step] = { tone: 'spot' } }
  if (step > 0) for (let i = 0; i < step; i++) states[i] = { tone: 'soft' }
  const ribbon = (g: { cx: (i: number) => number; top: number }) => (
    <g>
      <path d={PATH.map((_, i) => `${i === 0 ? 'M' : 'L'} ${g.cx(i)} ${g.top - 12}`).join(' ')} fill="none" stroke="#b45309" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 7" />
      {PATH.map((_, i) => <circle key={i} cx={g.cx(i)} cy={g.top - 12} r={step === i ? 8 : 4} fill={i === 0 || i === 7 ? '#0f172a' : '#b45309'} />)}
    </g>
  )
  return (
    <Frame n={3} title="C major: the white keys from C to the next C" caption="A drawing of the keys you will play on your own keyboard. The picture makes no sound.">
      <p className="font-semibold m-0 mb-1" style={{ fontFamily: 'Georgia, serif' }}>C major</p>
      <KeyboardArt whites={8} kw={44} showNames={names} states={states} fontSize={18} title="Eight white keys labelled C D E F G A B C" desc="Eight white keys from C to the next C, with their black keys in groups of two and three, and no black key between E and F or between B and C. A dotted ribbon travels along the keys and the last C links back to the first." overlay={ribbon} topPad={30} />
      <p className="mt-3 text-lg font-semibold m-0" aria-label="C D E F G A B C" style={{ letterSpacing: '0.08em' }}>
        {PATH.map((n, i) => <span key={i} style={{ color: step === i ? '#b45309' : undefined }}>{n}{i < 7 ? ' → ' : ''}</span>)}
      </p>
      <svg viewBox="0 0 320 30" className="sp-diagram" role="img" aria-label="An arch joins the last C back to the first C" style={{ maxWidth: 420 }}><title>The last C is the same note name as the first</title><path d="M 296 4 C 296 28, 24 28, 24 4" fill="none" stroke="#475569" strokeWidth={1.5} strokeDasharray="4 4" /></svg>
      <div className="flex flex-wrap gap-2 mt-2 sp-noprint">
        <button type="button" className={btn} aria-pressed={names} onClick={() => setNames(v => !v)}>{names ? 'Hide the note names' : 'Show the note names'}</button>
        <button type="button" className={btn} disabled={step <= -1} onClick={() => setStep(step - 1)}>Back a key</button>
        <button type="button" className={btn} disabled={step >= 7} onClick={() => setStep(step + 1)}>{step < 0 ? 'Start the path' : 'Next key'}</button>
      </div>
      <p role="status" className="m-0 mt-2">{step < 0 ? 'Press “Start the path”, then play each key on your own keyboard as it lights up.' : `Now play ${PATH[step]}${step === 7 ? ', the C that came back, a little higher' : ''}.`}</p>
    </Frame>
  )
}

// ---------- G4: the octave
export function G4() {
  const [second, setSecond] = useState(false)
  const states: Record<number, KeyState> = { 0: { tone: 'spot', label: 'C' } }
  if (second) states[7] = { tone: 'spot', label: 'C' }
  const arch = (g: { cx: (i: number) => number; top: number }) => second ? (
    <g>
      <path d={`M ${g.cx(0)} ${g.top - 2} C ${g.cx(0)} ${g.top - 42}, ${g.cx(7)} ${g.top - 42}, ${g.cx(7)} ${g.top - 2}`} fill="none" stroke="#b45309" strokeWidth={3} />
      <text x={(g.cx(0) + g.cx(7)) / 2} y={g.top - 30} textAnchor="middle" fontSize={17} fontWeight={700} fill="#b45309">an octave</text>
    </g>
  ) : null
  return (
    <Frame n={4} title="The same note name, one floor higher" caption="Two Cs on one keyboard. Play them on your own instrument: same name, different height.">
      <KeyboardArt whites={8} kw={44} states={states} title="Two Cs on one keyboard joined by an arch labelled octave" desc="A keyboard from one C to the next C. Both Cs are marked. When the second C is shown, an arch joins them and is labelled octave." overlay={arch} topPad={46} />
      <p className="mt-3 sp-noprint"><button type="button" className={btn} aria-expanded={second} onClick={() => setSecond(v => !v)}>{second ? 'Hide the second C' : 'Show the second C'}</button></p>
      <p role="status" className="m-0 mt-1">{second ? 'From one C to the next C is an octave.' : 'Find the C on the left. Where does C come back?'}</p>
      <p className="sp-prose mt-3"><strong>Same or completely different?</strong> Both can be true: same name, different height.</p>
    </Frame>
  )
}

// ---------- G5: up and back
export function G5() {
  const [done, setDone] = useState({ found: false, up: false, down: false })
  const up = (g: { cx: (i: number) => number; top: number; bottom: number }) => (
    <g>
      {PATH.slice(0, -1).map((_, i) => <path key={i} d={`M ${g.cx(i) + 6} ${g.top - 12} L ${g.cx(i + 1) - 8} ${g.top - 12}`} stroke="#b45309" strokeWidth={3} markerEnd="url(#arrowAmber)" />)}
    </g>
  )
  const down = (g: { cx: (i: number) => number; top: number }) => (
    <g>
      {PATH.slice(0, -1).map((_, i) => <path key={i} d={`M ${g.cx(7 - i) - 6} ${g.top - 12} L ${g.cx(6 - i) + 8} ${g.top - 12}`} stroke="#1a5a8a" strokeWidth={3} markerEnd="url(#arrowBlue)" />)}
    </g>
  )
  const defs = (
    <svg width="0" height="0" aria-hidden="true" focusable="false"><defs>
      <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309" /></marker>
      <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a5a8a" /></marker>
    </defs></svg>
  )
  const item = (k: 'found' | 'up' | 'down', label: string) => (
    <label key={k} className="inline-flex items-center gap-2 min-h-[44px]"><input type="checkbox" checked={done[k]} onChange={e => setDone(d => ({ ...d, [k]: e.target.checked }))} /> {label}</label>
  )
  return (
    <Frame n={5} title="Going up, and coming back down" caption="Follow the arrows on your own keyboard. The checklist is only for you; nothing is saved or counted.">
      {defs}
      <p className="font-semibold m-0">Going up</p>
      <KeyboardArt whites={8} kw={44} showNames states={{ 0: { tone: 'home' }, 7: { tone: 'home' } }} fontSize={18} title="Eight white keys with arrows going up from C to C" desc="Arrows run left to right from the first C through D E F G A B to the last C." overlay={up} topPad={30} bottomPad={34} />
      <p className="font-semibold m-0 mt-3">Coming back down</p>
      <KeyboardArt whites={8} kw={44} showNames states={{ 0: { tone: 'home' }, 7: { tone: 'home' } }} fontSize={18} title="Eight white keys with arrows going down from C to C" desc="Arrows run right to left from the last C through B A G F E D to the first C." overlay={down} topPad={30} bottomPad={34} />
      <fieldset className="mt-3 border-0 p-0 m-0 sp-noprint"><legend className="font-semibold">Your checklist</legend><div className="flex flex-wrap gap-x-5">{item('found', 'I found C')}{item('up', 'I went up')}{item('down', 'I came back down')}</div></fieldset>
    </Frame>
  )
}

// ---------- G6: home versus a pause away
export function G6() {
  const [end, setEnd] = useState<'G' | 'C'>('G')
  const states: Record<number, KeyState> = { 0: { tone: 'home', label: 'C' } }
  for (const i of [1, 2, 3]) states[i] = { tone: 'ring' }
  states[4] = end === 'G' ? { tone: 'away', label: 'G' } : { tone: 'ring' }
  const trail = (g: { cx: (i: number) => number; top: number }) => {
    const seq = end === 'G' ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0]
    return (
      <g>
        <path d={seq.map((k, i) => `${i === 0 ? 'M' : 'L'} ${g.cx(k)} ${g.top - 12}`).join(' ')} fill="none" stroke={end === 'G' ? '#5f7f84' : '#b45309'} strokeWidth={3} strokeDasharray="2 6" strokeLinecap="round" />
        <g transform={`translate(${g.cx(0) - 10}, ${g.top - 46})`} aria-hidden="true"><path d="M2 12 L10 4 L18 12 V20 H2 z" fill="#fcd9a3" stroke="#b45309" strokeWidth={2} /><rect x={8} y={13} width={4} height={7} fill="#b45309" /></g>
        <text x={g.cx(0) + 14} y={g.top - 30} fontSize={14} fontWeight={700} fill="#b45309">home</text>
        {end === 'G' && <text x={g.cx(4)} y={g.top - 30} textAnchor="middle" fontSize={14} fontWeight={700} fill="#5f7f84">a pause away</text>}
        {end === 'C' && <circle cx={g.cx(0)} cy={g.top - 12} r={9} fill="none" stroke="#b45309" strokeWidth={3} />}
      </g>
    )
  }
  return (
    <Frame n={6} title="Stopping away from home, and coming back" caption="A journey drawn along the white keys from C to G. Play it on your own keyboard and notice how each ending feels to you.">
      <KeyboardArt whites={6} kw={50} states={states} showNames={false} title={end === 'G' ? 'Five white keys from C to G, ending on G, a pause away from home' : 'Five white keys from G back down to C, ending on home'} desc={end === 'G' ? 'The path travels C D E F G and stops on G, marked as a pause away. C is marked home.' : 'The path travels G F E D C and arrives on C, marked home.'} overlay={trail} topPad={50} />
      <div className="flex flex-wrap gap-2 mt-3 sp-noprint" role="group" aria-label="Which ending to show">
        <button type="button" className={`${btn} sp-choice`} aria-pressed={end === 'G'} onClick={() => setEnd('G')}>Stop on G</button>
        <button type="button" className={`${btn} sp-choice`} aria-pressed={end === 'C'} onClick={() => setEnd('C')}>Return to C</button>
      </div>
      <p role="status" className="m-0 mt-2">{end === 'G' ? 'Play C, D, E, F, G and stop on G. Does it feel complete, or as if you might continue?' : 'Now play G, F, E, D, C and stop on C. Did arriving there feel different?'}</p>
      <ReflectChoices label="How did that ending feel to you?" options={['Settled', 'Wanting another note', 'Not sure']} />
    </Frame>
  )
}

export function ReflectChoices({ label, options }: { label: string; options: string[] }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div className="mt-3 sp-noprint">
      <p className="font-semibold m-0">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2 my-2">
        {options.map(o => <button key={o} type="button" className={`${btn} sp-choice`} aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
      </div>
      {sel && <p role="status" className="sp-callout max-w-2xl m-0">“{sel}” is a useful answer. There is no wrong feeling here, only what you notice.</p>}
    </div>
  )
}

// ---------- G7: two tiny trails
function Trail({ seq, label }: { seq: number[]; label: string }) {
  const names = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
  const last = seq[seq.length - 1]
  const states: Record<number, KeyState> = {}
  seq.forEach(k => { states[k] = { tone: 'soft' } })
  states[last] = { tone: 'spot', label: names[last] }
  const path = (g: { cx: (i: number) => number; top: number }) => (
    <g>
      <path d={seq.map((k, i) => `${i === 0 ? 'M' : 'L'} ${g.cx(k)} ${g.top - 12}`).join(' ')} fill="none" stroke="#b45309" strokeWidth={2.5} strokeDasharray="2 5" strokeLinecap="round" />
      {seq.map((k, i) => <text key={i} x={g.cx(k)} y={g.top - 22} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1e293b">{i + 1}</text>)}
      <circle cx={g.cx(last)} cy={g.top - 12} r={11} fill="none" stroke="#0f172a" strokeWidth={3} />
    </g>
  )
  return (
    <div className="sp-card p-3">
      <p className="font-semibold m-0">{label}</p>
      <KeyboardArt whites={8} kw={40} states={states} title={`${label}: keys in order ${seq.map(k => names[k]).join(', ')}, ending on ${names[last]}`} desc={`A miniature keyboard from C to the next C. The trail numbers the keys 1 to ${seq.length}: ${seq.map(k => names[k]).join(', ')}. The last key, ${names[last]}, is circled.`} overlay={path} h={110} fontSize={18} topPad={40} />
    </div>
  )
}
export function G7() {
  return (
    <Frame n={7} title="Two endings for one little idea" caption="An example only, not a rule: your own three or four keys can be anything between this C and the next.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Trail seq={[2, 4, 1, 0]} label="Ending on C" />
        <Trail seq={[2, 4, 1, 2]} label="Finishing somewhere else" />
      </div>
    </Frame>
  )
}
