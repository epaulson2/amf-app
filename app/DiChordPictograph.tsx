'use client'

// ─── Data ────────────────────────────────────────────────────────────────────

type Pulsation = 'dissonant' | 'modal' | 'perfect'
type FO = 'fundamental' | 'octave' | 'both'
type Harmonicity = 'harmonic' | 'non-harmonic' | 'false-harmonic' | 'neutral'

interface DiChordDef {
  n: number
  name: string
  pulsation: Pulsation
  fo: FO
  harmonicity: Harmonicity
  pull: string
  sprint?: number
}

const DICHORDS: DiChordDef[] = [
  { n: 1,  name: 'minor 2nd',   pulsation: 'dissonant', fo: 'fundamental', harmonicity: 'non-harmonic',  pull: 'acute urgency'   },
  { n: 2,  name: 'major 2nd',   pulsation: 'dissonant', fo: 'fundamental', harmonicity: 'harmonic',      pull: 'urgent + rooted' },
  { n: 3,  name: 'minor 3rd',   pulsation: 'modal',     fo: 'fundamental', harmonicity: 'non-harmonic',  pull: 'steady weight',   sprint: 1 },
  { n: 4,  name: 'major 3rd',   pulsation: 'modal',     fo: 'fundamental', harmonicity: 'harmonic',      pull: 'deep gravity',    sprint: 1 },
  { n: 5,  name: 'perfect 4th', pulsation: 'perfect',   fo: 'fundamental', harmonicity: 'non-harmonic',  pull: 'calm suspension' },
  { n: 6,  name: 'tritone',     pulsation: 'perfect',   fo: 'both',        harmonicity: 'neutral',        pull: 'no direction'    },
  { n: 7,  name: 'perfect 5th', pulsation: 'perfect',   fo: 'octave',      harmonicity: 'harmonic',       pull: 'deep stillness'  },
  { n: 8,  name: 'minor 6th',   pulsation: 'modal',     fo: 'octave',      harmonicity: 'non-harmonic',   pull: 'upward weight'   },
  { n: 9,  name: 'major 6th',   pulsation: 'modal',     fo: 'octave',      harmonicity: 'false-harmonic', pull: 'warm drift'      },
  { n: 10, name: 'minor 7th',   pulsation: 'dissonant', fo: 'octave',      harmonicity: 'harmonic',       pull: 'urgent + upward' },
  { n: 11, name: 'major 7th',   pulsation: 'dissonant', fo: 'octave',      harmonicity: 'non-harmonic',   pull: 'acute pressure'  },
]

const FAMILIES: { key: Pulsation; label: string; hz: string; color: string; lightColor: string }[] = [
  { key: 'dissonant', label: 'Dissonant', hz: '8 Hz',  color: '#922B21', lightColor: '#E59866' },
  { key: 'modal',     label: 'Modal',     hz: '4 Hz',  color: '#5B2C6F', lightColor: '#A569BD' },
  { key: 'perfect',   label: 'Perfect',   hz: '2 Hz',  color: '#1E8449', lightColor: '#52BE80' },
]

// ─── Wave SVGs ────────────────────────────────────────────────────────────────

function WaveDissonant({ color }: { color: string }) {
  return (
    <svg width="130" height="38" viewBox="0 0 130 38" aria-hidden>
      <polyline
        points="0,30 13,8 26,30 39,8 52,30 65,8 78,30 91,8 104,30 117,8 130,30"
        fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="miter"
      />
    </svg>
  )
}

function WaveModal({ color }: { color: string }) {
  return (
    <svg width="130" height="38" viewBox="0 0 130 38" aria-hidden>
      <path
        d="M0,30 C16,30 16,8 33,8 C49,8 49,30 65,30 C81,30 81,8 97,8 C113,8 113,30 130,30"
        fill="none" stroke={color} strokeWidth="2.2"
      />
    </svg>
  )
}

function WavePerfect({ color, isTritone }: { color: string; isTritone?: boolean }) {
  const y1 = isTritone ? 24 : 26
  const y2 = isTritone ? 18 : 16
  return (
    <svg width="130" height="38" viewBox="0 0 130 38" aria-hidden>
      <path
        d={`M0,${y1} C32,${y1} 32,${y2} 65,${y2} C98,${y2} 98,${y1} 130,${y1}`}
        fill="none" stroke={color} strokeWidth="2.2"
      />
      <line x1="0" y1="30" x2="130" y2="30" stroke={color} strokeWidth="0.6" strokeDasharray="4,4" opacity="0.4" />
    </svg>
  )
}

// ─── Shadow indicator ─────────────────────────────────────────────────────────

function ShadowRow({ fo }: { fo: FO }) {
  return (
    <div className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-slate-600 border-b border-dotted border-slate-200">
      {(fo === 'fundamental' || fo === 'both') && (
        <span className="text-base font-bold leading-none">←</span>
      )}
      <span className="text-[9px] uppercase tracking-wide text-slate-400">
        {fo === 'both' ? 'Both' : fo === 'fundamental' ? 'Fundamental' : 'Octave'}
      </span>
      {(fo === 'octave' || fo === 'both') && (
        <span className="text-base font-bold leading-none">→</span>
      )}
    </div>
  )
}

// ─── Harmonicity color ────────────────────────────────────────────────────────

const HARM_COLOR: Record<Harmonicity, string> = {
  'harmonic':       '#1E8449',
  'non-harmonic':   '#922B21',
  'false-harmonic': '#E59866',
  'neutral':        '#808B96',
}

// ─── Single tile ─────────────────────────────────────────────────────────────

function Tile({ dc, topColor }: { dc: DiChordDef; topColor: string }) {
  const harmColor = HARM_COLOR[dc.harmonicity]
  const isSprint1 = dc.sprint === 1

  let wave: React.ReactNode
  if (dc.pulsation === 'dissonant') wave = <WaveDissonant color={topColor} />
  else if (dc.pulsation === 'modal') wave = <WaveModal color={topColor} />
  else wave = <WavePerfect color={topColor} isTritone={dc.n === 6} />

  return (
    <div
      className="flex flex-col rounded overflow-hidden bg-white"
      style={{
        width: 160,
        border: isSprint1 ? '2.5px solid #F1C40F' : '1px solid #d1d5db',
        boxShadow: isSprint1
          ? '0 0 0 2px rgba(241,196,15,0.35), 0 2px 6px rgba(0,0,0,0.12)'
          : '0 1px 3px rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-2 py-1.5" style={{ background: topColor }}>
        <span className="font-mono font-bold text-white text-base tracking-tight">[{dc.n}]</span>
        {isSprint1 && <span className="text-sm" style={{ color: '#F1C40F' }}>★</span>}
      </div>

      {/* Name */}
      <div className="text-[10px] italic text-slate-500 text-center px-2 py-1 border-b border-slate-100 min-h-[22px] flex items-center justify-center">
        {dc.name}
      </div>

      {/* Wave */}
      <div className="flex justify-center px-2 py-1.5 bg-slate-50 border-b border-slate-100">
        {wave}
      </div>

      {/* Shadow direction */}
      <ShadowRow fo={dc.fo} />

      {/* Pull character */}
      <div className="flex justify-between px-2 py-0.5 text-[9px] border-b border-dotted border-slate-100">
        <span className="uppercase tracking-wide text-slate-400">Pull</span>
        <span className="font-medium text-slate-600 text-right italic">{dc.pull}</span>
      </div>

      {/* Meta rows */}
      <div className="flex justify-between px-2 py-0.5 text-[9px] border-b border-dotted border-slate-100">
        <span className="uppercase tracking-wide text-slate-400">Color</span>
        <span className="font-bold text-slate-700 capitalize">
          {dc.harmonicity === 'false-harmonic' ? 'light' : dc.harmonicity === 'non-harmonic' ? 'dark' : dc.harmonicity === 'harmonic' ? 'light' : 'neutral'}
        </span>
      </div>
      <div className="flex justify-between px-2 py-0.5 text-[9px]">
        <span className="uppercase tracking-wide text-slate-400">Harmony</span>
        <span className="font-bold capitalize" style={{ color: harmColor }}>{dc.harmonicity}</span>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DiChordPictograph({ compact = false }: { compact?: boolean }) {
  return (
    <div className="font-serif text-slate-800">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        <h2 className="text-lg font-bold tracking-wide">Di-Chord Pictograph System — All 11 Di-Chords</h2>
        <p className="text-xs text-slate-500 mt-1">
          Each di-chord has three visual factors:&nbsp;
          <strong className="text-slate-700">Shape (pulsation)</strong> &nbsp;·&nbsp;
          <strong className="text-slate-700">Shadow (F/O factor)</strong> &nbsp;·&nbsp;
          <strong className="text-slate-700">Color (harmonicity)</strong>
        </p>
      </div>

      {/* Families */}
      {FAMILIES.map(fam => {
        const members = DICHORDS.filter(d => d.pulsation === fam.key)
        return (
          <div key={fam.key} className="mb-7">
            {/* Family header */}
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-t mb-3"
              style={{ background: fam.color }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white">{fam.label}</span>
              <span className="text-[11px] italic text-white/80">{fam.hz} pulsation</span>
              <span className="ml-auto font-mono text-xs text-white/90 tracking-wide">
                {members.map(d => `[${d.n}]`).join(' ')}
              </span>
            </div>

            {/* Tiles */}
            <div className="flex flex-wrap gap-2">
              {members.map(dc => {
                // light shade for harmonic/false-harmonic, dark for non-harmonic, gray for neutral
                const topColor =
                  dc.harmonicity === 'neutral' ? '#808B96'
                  : dc.harmonicity === 'non-harmonic' ? fam.color
                  : fam.lightColor
                return <Tile key={dc.n} dc={dc} topColor={topColor} />
              })}
            </div>
          </div>
        )
      })}

      {/* Legend */}
      <div className="rounded border border-slate-200 p-4 mt-2 bg-white">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 pb-2 mb-3 border-b border-slate-100">
          Visual Factor Reference
        </p>
        <div className="grid grid-cols-3 gap-4 text-[10px]">
          <div>
            <p className="font-bold uppercase tracking-wide text-slate-500 mb-2">Factor 1 — Shape</p>
            <ul className="space-y-1 text-slate-700">
              <li><strong>Jagged zigzag</strong> — Dissonant (8 Hz)</li>
              <li><strong>Smooth curve</strong> — Modal (4 Hz)</li>
              <li><strong>Flat / gentle</strong> — Perfect (2 Hz)</li>
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wide text-slate-500 mb-2">Factor 2 — Shadow</p>
            <ul className="space-y-1 text-slate-700">
              <li><strong>← Left arrow</strong> — Fundamental side</li>
              <li><strong>→ Right arrow</strong> — Octave side</li>
              <li><strong>← → Both</strong> — Equidistant (tritone)</li>
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wide text-slate-500 mb-2">Factor 3 — Color</p>
            <ul className="space-y-1">
              <li><strong style={{ color: '#922B21' }}>Dark shade</strong> — Non-harmonic</li>
              <li><strong style={{ color: '#52BE80' }}>Light shade</strong> — Harmonic</li>
              <li><strong style={{ color: '#808B96' }}>Neutral gray</strong> — Tritone</li>
              <li><strong style={{ color: '#E59866' }}>Mid shade</strong> — False-harmonic [9]</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 pt-2 border-t border-dotted border-slate-200 text-[9.5px] text-slate-500">
          <strong>Pull character</strong> — combines pulsation urgency (wave shape: jagged=8Hz acute / smooth=4Hz steady / flat=2Hz calm) with bond strength (color: dark=attracted across gap / light=acoustic kinship / neutral=ambivalent). Direction tells you <em>which way</em>; pull character tells you <em>how</em>.
        </p>
        <p className="mt-1 text-[9.5px] text-slate-500">
          <strong style={{ color: '#F1C40F' }}>★ Sprint 1 Focus</strong> — Di-chords [3] and [4] are the primary learning targets for Sprint 1.
          The gold border identifies them throughout all course materials.
        </p>
      </div>
    </div>
  )
}
