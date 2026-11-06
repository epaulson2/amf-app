'use client'
import { useState } from 'react'
import Keyboard from './Keyboard'
import { buildKeyboard } from '@/lib/soundscape/m02/keyboard-geometry'

// The seven white-key letters of the 1A journey (lesson1a-copy.ts §3): C D E F G A B, then C again.
const VISITORS = ['D', 'E', 'F', 'G', 'A', 'B'] as const
const R = 33 // orbit radius in stage units. Conceptual: NOT a measure of how far apart notes sound.
const pt = (i: number): [number, number] => { const a = ((-90 + i * 60) * Math.PI) / 180; return [50 + R * Math.cos(a), 50 + R * Math.sin(a)] }
const f = (n: number) => n.toFixed(2)
const KB = buildKeyboard('C', 10)

/** G01: C as chosen home. B = concentric art (no text). C = native orbs, labels, path and keyboard strip. */
export default function HomeField({ initialTrace = false }: { initialTrace?: boolean }) {
  const [trace, setTrace] = useState(initialTrace)
  const pts = VISITORS.map((_, i) => pt(i))
  const d = `M50 50 L${f(pts[0][0])} ${f(pts[0][1])} ` + pts.slice(1).map(p => `A${R} ${R} 0 0 1 ${f(p[0])} ${f(p[1])}`).join(' ') + ' L50 50'
  return (
    <figure className="aj-fig aj-home" aria-labelledby="aj-home-cap">
      <div className="aj-home__stage">
        {/* B: concentric field, art only, transparent edges. */}
        <img className="aj-home__art" src="/soundscape/m02/art/G01-B-concentric-home.webp" alt="" aria-hidden="true" width={1024} height={1024} />
        {/* C: native, exact labels. */}
        <svg className="aj-home__svg" viewBox="0 0 100 100" role="img" aria-label="C is at the centre, glowing. Around it, in order: D, E, F, G, A and B. The journey goes out from C through each note and back home to C.">
          <defs>
            <radialGradient id="aj-orb"><stop offset="0" stopColor="#fffdf7" /><stop offset="1" stopColor="#fbf0dc" /></radialGradient>
            <radialGradient id="aj-core"><stop offset="0" stopColor="#fff3c9" /><stop offset=".6" stopColor="#ffd079" /><stop offset="1" stopColor="#f6b247" /></radialGradient>
            <filter id="aj-blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" /></filter>
          </defs>
          <path d={d} pathLength={1} className={`aj-home__path${trace ? ' is-on' : ''}`} fill="none" />
          {VISITORS.map((n, i) => (
            <g key={n}>
              <circle cx={pts[i][0]} cy={pts[i][1]} r="6.4" fill="#f6c97a" opacity=".5" filter="url(#aj-blur)" />
              <circle cx={pts[i][0]} cy={pts[i][1]} r="5.3" fill="url(#aj-orb)" stroke="#d99a45" strokeWidth=".5" />
              <text x={pts[i][0]} y={pts[i][1] + 2.1} textAnchor="middle" className="aj-home__letter">{n}</text>
            </g>
          ))}
          <circle cx="50" cy="50" r="11" fill="#ffc25f" opacity=".55" filter="url(#aj-blur)" />
          <circle cx="50" cy="50" r="7.6" fill="url(#aj-core)" stroke="#c8811f" strokeWidth=".6" />
          <text x="50" y="53.6" textAnchor="middle" className="aj-home__letter aj-home__letter--c">C</text>
        </svg>
      </div>
      <div className="aj-home__controls">
        <button type="button" className="aj-btn" aria-pressed={trace} onClick={() => setTrace(t => !t)}>{trace ? 'Hide the journey' : 'Trace the journey'}</button>
        <p className="aj-live" role="status">{trace ? 'Out from C through D, E, F, G, A and B, then back home to C.' : 'Press to follow the path out and back.'}</p>
      </div>
      <Keyboard
        kb={KB} revealC letters="all" groups={false} className="aj-kb aj-kb--strip"
        title="The same journey on a keyboard: the white keys from C up to the next C, with each C glowing."
        desc="C D E F G A B then C again. The first and second C are glowing; each is directly left of a group of two black keys."
      />
      <figcaption id="aj-home-cap" className="aj-legend">
        <strong>C</strong> glowing centre: home, <em>chosen for this exercise</em>. <strong>D–B</strong>: the other white keys of the journey. Distance from the centre is decoration, not a measurement of how far apart notes sound.
      </figcaption>
    </figure>
  )
}
