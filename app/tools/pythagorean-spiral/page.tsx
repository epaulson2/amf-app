'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SEQ = [
  { pos: 1, letter: 'F', sol: 'fa',  color: '#ef4444' },
  { pos: 2, letter: 'C', sol: 'doh', color: '#f97316' },
  { pos: 3, letter: 'G', sol: 'sol', color: '#eab308' },
  { pos: 4, letter: 'D', sol: 're',  color: '#22c55e' },
  { pos: 5, letter: 'A', sol: 'la',  color: '#06b6d4' },
  { pos: 6, letter: 'E', sol: 'mi',  color: '#8b5cf6' },
  { pos: 7, letter: 'B', sol: 'ri',  color: '#ec4899' },
]

// Spiral layout: nodes fan outward to the right, with slight vertical displacement
// Each step: x advances by ~80px, y oscillates around center
function spiralPos(i: number): { x: number; y: number } {
  const cx = 80
  const cy = 220
  const dx = 120
  const amplitude = 80
  const freq = (2 * Math.PI) / 7
  return {
    x: cx + i * dx,
    y: cy + Math.sin(i * freq * 1.5) * amplitude,
  }
}

const POSITIONS = SEQ.map((_, i) => spiralPos(i))

// Build bezier control point between two nodes
function bezierCtrl(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - 40
  return { x: mx, y: my }
}

export default function SpiralPage() {
  const [active, setActive]       = useState<number | null>(null)
  const [walking, setWalking]     = useState(false)
  const [walkStep, setWalkStep]   = useState(-1)
  const [drawn, setDrawn]         = useState<number[]>([]) // edge indices drawn so far in walk

  const startWalk = useCallback(() => {
    setWalking(true)
    setWalkStep(0)
    setDrawn([])
    setActive(null)
  }, [])

  useEffect(() => {
    if (!walking) return
    if (walkStep >= SEQ.length) {
      setWalking(false)
      return
    }
    setActive(walkStep)
    const t = setTimeout(() => {
      if (walkStep < SEQ.length - 1) setDrawn(d => [...d, walkStep])
      setWalkStep(s => s + 1)
    }, 900)
    return () => clearTimeout(t)
  }, [walking, walkStep])

  const stopWalk = () => { setWalking(false); setWalkStep(-1); setDrawn([]); setActive(null) }

  const hovered = !walking ? active : null
  const prevNode = hovered !== null ? SEQ[(hovered + 6) % 7] : null
  const nextNode = hovered !== null ? SEQ[(hovered + 1) % 7] : null

  // Edges to draw: in walk mode = drawn edges; in explore = all
  const visibleEdges = walking ? drawn : SEQ.map((_, i) => i).slice(0, 6)

  const W = 920
  const H = 440

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>

      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -24; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.07); }
        }
        .node-pulse { animation: pulse 2.4s ease-in-out infinite; transform-origin: center; }
        .dash-flow { animation: dashFlow 0.6s linear infinite; }
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between"
           style={{ background: '#0f172a' }}>
        <div className="flex items-center gap-3">
          <Link href="/tools" className="text-slate-500 hover:text-white text-xs transition-colors">← Tools</Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-bold text-slate-400">Pythagorean Spiral</span>
        </div>
        <div className="flex gap-2">
          {!walking ? (
            <button onClick={startWalk}
              className="text-xs px-3 py-1.5 rounded-full font-bold text-white"
              style={{ background: '#7c3aed' }}>
              Step Through →
            </button>
          ) : (
            <button onClick={stopWalk}
              className="text-xs px-3 py-1.5 rounded-full font-bold text-white border border-slate-600">
              Stop
            </button>
          )}
        </div>
      </div>

      {/* SVG spiral */}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: 440 }}>
          <defs>
            {SEQ.map(n => (
              <marker key={n.letter}
                id={`arrow-${n.letter}`}
                markerWidth="8" markerHeight="8"
                refX="6" refY="3"
                orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={n.color} opacity="0.8" />
              </marker>
            ))}
            {/* Glow filters */}
            {SEQ.map(n => (
              <filter key={`glow-${n.letter}`} id={`glow-${n.letter}`}>
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
          </defs>

          {/* Background stars */}
          {Array.from({ length: 30 }, (_, i) => (
            <circle key={i}
              cx={(i * 137.5 + 20) % W}
              cy={(i * 97.3 + 15) % H}
              r={i % 3 === 0 ? 1.5 : 0.8}
              fill="white" opacity={0.06 + (i % 4) * 0.04} />
          ))}

          {/* Edges */}
          {visibleEdges.map(i => {
            const a = POSITIONS[i]
            const b = POSITIONS[i + 1]
            const ctrl = bezierCtrl(a, b)
            const n = SEQ[i]
            const isActive = walking && drawn[drawn.length - 1] === i
            return (
              <g key={i}>
                <path
                  d={`M ${a.x} ${a.y} Q ${ctrl.x} ${ctrl.y} ${b.x} ${b.y}`}
                  fill="none"
                  stroke={n.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeOpacity={isActive ? 0.9 : 0.4}
                  strokeDasharray={isActive ? '8 4' : undefined}
                  className={isActive ? 'dash-flow' : undefined}
                  markerEnd={`url(#arrow-${SEQ[i + 1].letter})`}
                />
                {!walking && (
                  <text
                    x={ctrl.x} y={ctrl.y - 8}
                    textAnchor="middle"
                    fontSize="9"
                    fill={n.color}
                    opacity="0.5"
                    fontFamily="system-ui">
                    P5↑
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {SEQ.map((n, i) => {
            const { x, y } = POSITIONS[i]
            const isActive   = active === i
            const isHovered  = !walking && active === i
            const r = isActive ? 36 : 30

            return (
              <g key={n.letter}
                 style={{ cursor: walking ? 'default' : 'pointer' }}
                 onClick={() => !walking && setActive(v => v === i ? null : i)}
                 onMouseEnter={() => !walking && setActive(i)}
                 onMouseLeave={() => !walking && setActive(null)}>

                {/* Glow ring */}
                {isActive && (
                  <circle cx={x} cy={y} r={r + 8}
                    fill="none" stroke={n.color} strokeWidth="1.5"
                    opacity="0.25" />
                )}

                {/* Main circle */}
                <circle cx={x} cy={y} r={r}
                  fill={`${n.color}22`}
                  stroke={n.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={!walking ? 'node-pulse' : undefined}
                  filter={isActive ? `url(#glow-${n.letter})` : undefined}
                />

                {/* Letter */}
                <text x={x} y={y - 5} textAnchor="middle"
                  fontSize={isActive ? "18" : "15"}
                  fontWeight="800"
                  fill={n.color}
                  fontFamily="system-ui">
                  {n.letter}
                </text>
                {/* Solfège */}
                <text x={x} y={y + 12} textAnchor="middle"
                  fontSize="10"
                  fill={n.color}
                  opacity="0.7"
                  fontFamily="system-ui">
                  {n.sol}
                </text>
                {/* Position */}
                <text x={x} y={y + r + 14} textAnchor="middle"
                  fontSize="9"
                  fill="#475569"
                  fontFamily="system-ui">
                  #{n.pos}
                </text>
              </g>
            )
          })}

          {/* Walk step label */}
          {walking && active !== null && (
            <g>
              <rect x={W / 2 - 100} y={H - 50} width={200} height={30} rx={8}
                fill="rgba(124,58,237,0.25)" stroke="#7c3aed" strokeWidth="1" />
              <text x={W / 2} y={H - 29} textAnchor="middle" fontSize="12"
                fill="#c4b5fd" fontWeight="700" fontFamily="system-ui">
                {SEQ[active].letter} · {SEQ[active].sol} · Position {SEQ[active].pos}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Hover detail panel */}
      {hovered !== null && (
        <div className="max-w-sm mx-auto mt-2 px-4">
          <div className="rounded-xl border p-4 text-sm"
               style={{ background: '#0f172a', borderColor: SEQ[hovered].color + '44' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-base"
                   style={{ background: `${SEQ[hovered].color}22`, color: SEQ[hovered].color }}>
                {SEQ[hovered].letter}
              </div>
              <div>
                <p className="font-bold text-white">{SEQ[hovered].letter} — <span style={{ color: SEQ[hovered].color }}>{SEQ[hovered].sol}</span></p>
                <p className="text-slate-500 text-xs">Position #{SEQ[hovered].pos} in the Pythagorean sequence</p>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              {prevNode && (
                <div className="flex-1 rounded-lg p-2 border border-slate-800" style={{ background: '#1e293b' }}>
                  <p className="text-slate-600 mb-0.5">← one fifth below</p>
                  <p className="font-bold text-white">{prevNode.letter} <span className="text-slate-500">({prevNode.sol})</span></p>
                </div>
              )}
              {nextNode && (
                <div className="flex-1 rounded-lg p-2 border border-slate-800" style={{ background: '#1e293b' }}>
                  <p className="text-slate-600 mb-0.5">one fifth above →</p>
                  <p className="font-bold text-white">{nextNode.letter} <span className="text-slate-500">({nextNode.sol})</span></p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Walk explanation */}
      {!walking && active === null && (
        <p className="text-center text-xs text-slate-700 mt-4">
          Hover or click a note to explore · Press "Step Through" to walk the sequence
        </p>
      )}

      {/* Reference table */}
      <div className="max-w-2xl mx-auto px-4 mt-8 pb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Reference</p>
        <div className="grid grid-cols-7 gap-2">
          {SEQ.map(n => (
            <div key={n.letter} className="rounded-xl p-2.5 text-center border border-slate-800"
                 style={{ background: '#0f172a' }}>
              <div className="text-xl font-extrabold mb-0.5" style={{ color: n.color }}>{n.letter}</div>
              <div className="text-xs text-slate-500">{n.sol}</div>
              <div className="text-xs text-slate-700 mt-0.5">#{n.pos}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-700 mt-4 text-center">
          Each step is a perfect fifth upward. The flat keys (♭) live at the left end; the sharp keys (♯) at the right.
        </p>
      </div>
    </div>
  )
}
