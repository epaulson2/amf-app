'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Color / theme tokens
// ---------------------------------------------------------------------------
const C = {
  bg: '#0f172a',
  surface: '#1e293b',
  border: 'rgba(255,255,255,0.06)',
  amber: '#d97706',
  amberDim: '#92400e',
  text: '#f1f5f9',
  muted: '#94a3b8',
  dim: '#64748b',
  red: '#ef4444',
  green: '#22c55e',
  blue: '#3b82f6',
  purple: '#a855f7',
}

// ---------------------------------------------------------------------------
// SVG Fretboard primitives
// ---------------------------------------------------------------------------

const STRING_COUNT = 6
const STRING_LABELS = ['E', 'A', 'D', 'G', 'B', 'e'] // low to high (left to right in vert diagram)

interface Dot {
  string: number  // 1=low E ... 6=high e
  fret: number    // 0=open, 1–N=fret number
  label?: string
  color?: string
  shape?: 'circle' | 'diamond' | 'square'
}

interface FretDiagramProps {
  startFret: number
  fretCount?: number
  dots: Dot[]
  showNut?: boolean
  title?: string
  width?: number
  showFretNums?: boolean
}

function FretDiagram({ startFret, fretCount = 4, dots, showNut, title, width = 160, showFretNums = true }: FretDiagramProps) {
  const padL = 28
  const padR = 12
  const padT = title ? 28 : 16
  const padB = 20
  const cellW = (width - padL - padR) / (STRING_COUNT - 1)
  const cellH = 26
  const height = padT + cellH * fretCount + padB

  const sx = (s: number) => padL + (s - 1) * cellW  // string x (1-indexed)
  const fy = (f: number) => padT + (f - startFret) * cellH + cellH / 2  // fret y

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* title */}
      {title && (
        <text x={padL} y={16} fontSize={10} fill={C.amber} fontWeight="600">{title}</text>
      )}

      {/* fret number label (left side) */}
      {showFretNums && startFret > 0 && (
        <text x={padL - 6} y={padT + cellH * 0.6} fontSize={9} fill={C.dim} textAnchor="end">
          {startFret}fr
        </text>
      )}

      {/* nut */}
      {showNut && startFret <= 1 && (
        <rect x={padL - 2} y={padT - 1} width={(STRING_COUNT - 1) * cellW + 4} height={4} fill={C.text} rx={1} />
      )}

      {/* fret lines */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={i}
          x1={padL} y1={padT + i * cellH}
          x2={padL + (STRING_COUNT - 1) * cellW} y2={padT + i * cellH}
          stroke={i === 0 && showNut ? C.text : C.dim}
          strokeWidth={i === 0 && showNut ? 3 : 1}
        />
      ))}

      {/* string lines */}
      {Array.from({ length: STRING_COUNT }).map((_, s) => (
        <line
          key={s}
          x1={sx(s + 1)} y1={padT}
          x2={sx(s + 1)} y2={padT + fretCount * cellH}
          stroke={C.dim}
          strokeWidth={s === 0 ? 1.5 : 1}
        />
      ))}

      {/* string labels at bottom */}
      {STRING_LABELS.map((lbl, s) => (
        <text key={s} x={sx(s + 1)} y={height - 4} fontSize={8} fill={C.dim} textAnchor="middle">{lbl}</text>
      ))}

      {/* dots */}
      {dots.map((d, i) => {
        const x = sx(d.string)
        const y = fy(d.fret === 0 ? startFret - 0.5 : d.fret)
        const r = 9
        const fill = d.color || C.amber
        if (d.fret < startFret && d.fret !== 0) return null
        if (d.fret > startFret + fretCount) return null
        return (
          <g key={i}>
            {d.shape === 'diamond' ? (
              <polygon
                points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`}
                fill={fill}
                opacity={0.9}
              />
            ) : d.shape === 'square' ? (
              <rect x={x - r * 0.8} y={y - r * 0.8} width={r * 1.6} height={r * 1.6} fill={fill} opacity={0.9} rx={2} />
            ) : (
              <circle cx={x} cy={y} r={r} fill={fill} opacity={0.9} />
            )}
            {d.label && (
              <text x={x} y={y + 4} fontSize={8} fill="#fff" textAnchor="middle" fontWeight="700">
                {d.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Full-neck diagram (12 frets wide, horizontal strings for overview)
// ---------------------------------------------------------------------------

interface FullNeckProps {
  highlights?: { string: number; fret: number; color?: string; label?: string }[]
  areas?: { label: string; startFret: number; endFret: number; color: string }[]
  width?: number
}

function FullNeckDiagram({ highlights = [], areas = [], width = 640 }: FullNeckProps) {
  const FRETS = 12
  const padL = 36
  const padT = 30
  const padB = 24
  const padR = 12
  const cellW = (width - padL - padR) / FRETS
  const cellH = 18
  const height = padT + STRING_COUNT * cellH + padB

  const sx = (s: number) => padT + (s - 1) * cellH + cellH / 2  // string y (1=low E at top)
  const fx = (f: number) => padL + f * cellW                      // fret left edge x
  const fcx = (f: number) => padL + (f - 0.5) * cellW            // fret center x

  return (
    <svg width={width} height={height} style={{ display: 'block', maxWidth: '100%' }}>
      {/* area bands */}
      {areas.map((a, i) => (
        <rect
          key={i}
          x={fx(a.startFret)}
          y={padT - 8}
          width={(a.endFret - a.startFret) * cellW}
          height={STRING_COUNT * cellH + 16}
          fill={a.color}
          opacity={0.12}
          rx={4}
        />
      ))}

      {/* area labels */}
      {areas.map((a, i) => (
        <text
          key={i}
          x={fcx((a.startFret + a.endFret) / 2)}
          y={14}
          fontSize={9}
          fill={a.color}
          textAnchor="middle"
          fontWeight="700"
        >
          {a.label}
        </text>
      ))}

      {/* nut */}
      <rect x={padL - 3} y={padT - 2} width={4} height={STRING_COUNT * cellH + 4} fill={C.text} rx={1} />

      {/* fret lines */}
      {Array.from({ length: FRETS + 1 }).map((_, f) => (
        <line
          key={f}
          x1={fx(f)} y1={padT}
          x2={fx(f)} y2={padT + STRING_COUNT * cellH}
          stroke={[3, 5, 7, 9, 12].includes(f) ? '#475569' : C.dim}
          strokeWidth={[3, 5, 7, 9, 12].includes(f) ? 1.5 : 0.8}
        />
      ))}

      {/* fret number labels */}
      {[1, 3, 5, 7, 9, 12].map(f => (
        <text key={f} x={fcx(f)} y={height - 6} fontSize={8} fill={C.dim} textAnchor="middle">{f}</text>
      ))}

      {/* string lines + labels */}
      {STRING_LABELS.map((lbl, s) => (
        <g key={s}>
          <line
            x1={padL - 3} y1={sx(s + 1)}
            x2={width - padR} y2={sx(s + 1)}
            stroke={C.dim}
            strokeWidth={s === 0 ? 1.8 : s === 5 ? 0.7 : 1}
          />
          <text x={padL - 8} y={sx(s + 1) + 4} fontSize={8} fill={C.dim} textAnchor="end">{lbl}</text>
        </g>
      ))}

      {/* highlight dots */}
      {highlights.map((h, i) => (
        <circle key={i} cx={fcx(h.fret)} cy={sx(h.string)} r={7} fill={h.color || C.amber} opacity={0.9}>
          {h.label && <title>{h.label}</title>}
        </circle>
      ))}
      {highlights.map((h, i) =>
        h.label ? (
          <text key={i} x={fcx(h.fret)} y={sx(h.string) + 4} fontSize={7} fill="#fff" textAnchor="middle" fontWeight="700">
            {h.label}
          </text>
        ) : null
      )}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Teaching UI primitives
// ---------------------------------------------------------------------------

function GreeneVoice({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 20, marginBottom: 28 }}>
      <p style={{ color: C.amber, fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
        Ted Greene
      </p>
      <div style={{ color: '#cbd5e1', lineHeight: 1.85, fontSize: '0.95rem' }}>{children}</div>
    </div>
  )
}

function SHead({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: C.text, fontWeight: '700', fontSize: '1rem', marginBottom: 10, marginTop: 32, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>
      {children}
    </p>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <div style={{ color: C.muted, lineHeight: 1.8, fontSize: '0.92rem', marginBottom: 16 }}>{children}</div>
}

function Callout({ type, children }: { type: 'warn' | 'tip' | 'insight'; children: React.ReactNode }) {
  const s = type === 'warn'
    ? { bg: '#ef444414', border: '#ef444438', label: 'Watch Out For', color: '#ef4444' }
    : type === 'tip'
    ? { bg: '#22c55e14', border: '#22c55e38', label: 'Practice Tip',  color: '#22c55e' }
    : { bg: '#a855f714', border: '#a855f738', label: 'The Insight',   color: '#a855f7' }
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
      <p style={{ color: s.color, fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{s.label}</p>
      <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

function DiscoverPrompt({ label, children }: { label?: string; children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div style={{ background: '#0a1628', border: `1px solid ${C.blue}40`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <p style={{ color: C.blue, fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, fontFamily: 'sans-serif' }}>
        {label ?? 'Stop and Find Out'}
      </p>
      <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: revealed ? 16 : 0 }}>
        {typeof children === 'string'
          ? <p>{children}</p>
          : Array.isArray(children)
          ? children[0]
          : (children as React.ReactElement<{ children?: React.ReactNode }>)?.props?.children
            ? children
            : children}
      </div>
      {Array.isArray(children) && children[1] && (
        <>
          {!revealed && (
            <button onClick={() => setRevealed(true)} style={{
              marginTop: 12, padding: '7px 18px', borderRadius: 6,
              border: `1px solid ${C.blue}50`, background: `${C.blue}12`,
              color: C.blue, fontSize: '0.8rem', fontWeight: '600',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              See what Greene noticed →
            </button>
          )}
          {revealed && <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.75 }}>{children[1]}</div>}
        </>
      )}
    </div>
  )
}

function MusicalMoment({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#090f1e', border: `1px solid #22c55e30`, borderLeft: `3px solid #22c55e`, borderRadius: '0 10px 10px 0', padding: 18, marginBottom: 24 }}>
      <p style={{ color: '#22c55e', fontWeight: '800', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, fontFamily: 'sans-serif' }}>
        Musical Moment — Try This Now
      </p>
      <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function WhatBecameEasier({ items, nextStage }: { items: string[]; nextStage: string }) {
  return (
    <div style={{ background: '#080e1a', border: `1px solid ${C.amber}30`, borderRadius: 14, padding: 28, marginTop: 48 }}>
      <p style={{ color: C.amber, fontWeight: '800', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, fontFamily: 'sans-serif' }}>
        What Just Became Easier?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ color: C.amber, fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }}>→</span>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{item}</p>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <p style={{ color: C.dim, fontSize: '0.88rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{nextStage}</p>
      </div>
    </div>
  )
}

function DodPanel({ items, nextLabel, onNext }: { items: string[]; nextLabel?: string; onNext?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setChecked(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s })
  const allDone = checked.size === items.length
  return (
    <div style={{ marginTop: 48, background: '#080e1a', borderRadius: 14, padding: 28, border: `1px solid ${C.amber}44` }}>
      <p style={{ color: C.amber, fontWeight: '800', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
        Definition of Done
      </p>
      <p style={{ color: C.dim, fontSize: '0.82rem', marginBottom: 20, lineHeight: 1.6 }}>
        Check each item only when it&apos;s genuinely automatic — not possible with effort, but effortless. Greene&apos;s standard was high. Hold yourself to it.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer' }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, flexShrink: 0, marginTop: 1,
              border: `2px solid ${checked.has(i) ? C.amber : '#334155'}`,
              background: checked.has(i) ? `${C.amber}20` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              {checked.has(i) && <span style={{ color: C.amber, fontSize: 14, fontWeight: '700' }}>✓</span>}
            </div>
            <p style={{ color: checked.has(i) ? C.dim : '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7, margin: 0, textDecoration: checked.has(i) ? 'line-through' : 'none' }}>
              {item}
            </p>
          </div>
        ))}
      </div>
      {allDone && nextLabel && onNext && (
        <button onClick={onNext} style={{
          marginTop: 28, padding: '12px 28px', borderRadius: 8, background: C.amber, border: 'none',
          color: '#fff', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
        }}>
          Continue to {nextLabel} →
        </button>
      )}
      {!allDone && (
        <p style={{ color: C.dim, fontSize: '0.8rem', marginTop: 20 }}>
          {items.length - checked.size} item{items.length - checked.size !== 1 ? 's' : ''} remaining before moving on.
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Note Name Drill — interactive string/fret flashcard
// ---------------------------------------------------------------------------

const DRILL_STRING_NAMES: Record<number, string> = { 1: 'e', 2: 'B', 3: 'G', 4: 'D', 5: 'A', 6: 'E' }

function NoteDrill() {
  const [selected, setSelected] = useState<Set<number>>(new Set([6, 1]))
  const [speed, setSpeed] = useState(3)
  const [running, setRunning] = useState(false)
  const [current, setCurrent] = useState<{ string: number; fret: number } | null>(null)
  const selectedRef = useRef(selected)

  useEffect(() => { selectedRef.current = selected }, [selected])

  useEffect(() => {
    if (!running) return
    const pick = () => {
      const strings = Array.from(selectedRef.current)
      if (strings.length === 0) return
      const s = strings[Math.floor(Math.random() * strings.length)]
      const f = Math.floor(Math.random() * 13) // 0–12
      setCurrent({ string: s, fret: f })
    }
    pick()
    const id = setInterval(pick, speed * 1000)
    return () => clearInterval(id)
  }, [running, speed])

  const toggleString = (s: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  return (
    <div style={{
      background: '#080e1a', borderRadius: 14, padding: '28px 28px 24px',
      border: `1px solid ${C.amber}33`, marginTop: 36, marginBottom: 8,
    }}>
      <p style={{ color: C.amber, fontWeight: '800', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
        Note Name Drill
      </p>
      <p style={{ color: C.dim, fontSize: '0.82rem', marginBottom: 24, lineHeight: 1.6 }}>
        Start the drill. When a string and fret appear, say the note name aloud before the next one arrives. No peeking — this is recall, not lookup.
      </p>

      {/* Big display */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
        {(['String', 'Fret'] as const).map(label => {
          const isString = label === 'String'
          const numVal = isString ? current?.string : current?.fret
          const displayVal = !current ? '—' : isString ? String(current.string) : current.fret === 0 ? '0' : String(current.fret)
          const subLabel = isString && current ? `${DRILL_STRING_NAMES[current.string]} string` : current?.fret === 0 ? 'open' : ''
          return (
            <div key={label} style={{
              flex: 1, maxWidth: 160, textAlign: 'center', background: C.surface,
              borderRadius: 14, padding: '22px 16px 18px',
              border: `1px solid ${running && current ? `${C.amber}44` : C.border}`,
              transition: 'border-color 0.2s',
            }}>
              <p style={{ color: C.dim, fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                {label}
              </p>
              <p style={{
                color: current ? C.amber : C.dim, fontSize: '4rem', fontWeight: '900',
                lineHeight: 1, margin: 0, fontVariantNumeric: 'tabular-nums',
                transition: 'color 0.15s',
              }}>
                {displayVal}
              </p>
              {subLabel && (
                <p style={{ color: C.muted, fontSize: '0.8rem', marginTop: 8, marginBottom: 0 }}>{subLabel}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* String toggles */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ color: C.dim, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Strings to include
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {([6, 5, 4, 3, 2, 1] as const).map(s => (
            <button
              key={s}
              onClick={() => toggleString(s)}
              style={{
                width: 52, padding: '8px 0 6px', borderRadius: 9,
                background: selected.has(s) ? `${C.amber}1a` : C.surface,
                border: `2px solid ${selected.has(s) ? C.amber : C.border}`,
                color: selected.has(s) ? C.amber : C.dim,
                fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                transition: 'all 0.15s',
              }}
            >
              <span>{s}</span>
              <span style={{ fontSize: '0.68rem', fontWeight: '400', opacity: 0.8 }}>{DRILL_STRING_NAMES[s]}</span>
            </button>
          ))}
        </div>
        {selected.size === 0 && (
          <p style={{ color: C.red, fontSize: '0.78rem', marginTop: 8 }}>Select at least one string.</p>
        )}
      </div>

      {/* Speed slider */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: C.dim, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Speed — {speed} second{speed !== 1 ? 's' : ''} per note
        </p>
        <input
          type="range" min={1} max={10} step={1} value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          style={{ width: '100%', accentColor: C.amber, cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ color: C.dim, fontSize: '0.72rem' }}>1s — fast</span>
          <span style={{ color: C.dim, fontSize: '0.72rem' }}>10s — slow</span>
        </div>
      </div>

      {/* Start / Pause */}
      <button
        onClick={() => { if (selected.size > 0) setRunning(r => !r) }}
        style={{
          padding: '12px 36px', borderRadius: 9, border: 'none',
          background: running ? '#334155' : selected.size === 0 ? '#1e293b' : C.amber,
          color: running ? C.text : '#fff',
          fontWeight: '700', fontSize: '0.95rem',
          cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
          opacity: selected.size === 0 ? 0.45 : 1,
          transition: 'all 0.15s',
        }}
      >
        {running ? 'Pause' : 'Start Drill'}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 1: Note Names
// ---------------------------------------------------------------------------

function StepNoteNames({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <GreeneVoice>
        <p>Before we touch a single chord shape or scale pattern, I need you to do something that most teachers skip — and it&apos;s the reason most guitarists spend their careers navigating in the dark. I need you to learn the actual names of the notes on every string, at every fret, from memory.</p>
        <p style={{ marginTop: 12 }}>Not the patterns. Not the shapes. The <em>names</em>. E, F, G, A, B, C, D — and all the sharps and flats between them.</p>
        <p style={{ marginTop: 12 }}>I know what you&apos;re thinking: &quot;Can&apos;t I just learn the patterns and connect them?&quot; You can. Most guitarists do. And most guitarists spend their entire careers with a 20% map of a territory that should be completely transparent to them. Every time a chord change surprises them, or a note doesn&apos;t land where they expected — that&apos;s the gap showing.</p>
        <p style={{ marginTop: 12 }}>The note names are the alphabet of the instrument. You cannot write literature until the alphabet is automatic. So we start here, and we don&apos;t rush it.</p>
      </GreeneVoice>

      <SHead>Why We Start With Strings 6 and 1</SHead>
      <Body>
        <p>The low E string (string 6) and the high e string (string 1) have exactly the same note names, in the same order, at the same frets. Fret 1 on both is F. Fret 3 is G. Fret 5 is A. All the way to fret 12, where both return to E — just two octaves apart.</p>
        <p style={{ marginTop: 10 }}>This means if you fully learn string 6, you&apos;ve simultaneously learned string 1. That&apos;s not a shortcut — it&apos;s the geometry of standard tuning working in your favor. We use it deliberately.</p>
        <p style={{ marginTop: 10 }}>These two strings also carry the most musical weight. String 6 carries the bass foundation of almost every chord you&apos;ll ever play. String 1 carries the melody lead. Learn them first, together, because they&apos;re the spine of everything that follows.</p>
      </Body>

      <Callout type="insight">
        <p>The two strings that matter most harmonically — bass and melody — are identical in note content. Standard tuning gives you this gift for free. The moment you realize string 1 matches string 6 exactly, half of the note name work is already done.</p>
      </Callout>

      <SHead>The Two Gaps — Your Most Important Landmarks</SHead>
      <DiscoverPrompt label="Before Reading Further">
        {[
          <p key="q">Pick up your guitar. Play any fret on string 6 — say, fret 5. Move up one fret at a time and say each note name aloud: A, A#, B... what happens between B and the next letter name? Now go to fret 1. What happens between E and the next letter name? What do these two moments have in common?</p>,
          <p key="a">Both are <em>half steps</em> — no note between them. Everywhere else on the neck, adjacent letter names have a sharp or flat between them. E-F and B-C do not. These two gaps are the only moments where the alphabet and the frets line up without an in-between note. Once you feel them physically, they become landmarks that never move.</p>
        ]}
      </DiscoverPrompt>
      <Body>
        <p>The musical alphabet moves A B C D E F G, but it&apos;s not evenly spaced. Between most adjacent letter names there&apos;s a sharp or flat — a whole step. But two pairs have <em>no note between them</em>: <strong style={{ color: C.text }}>E to F</strong> and <strong style={{ color: C.text }}>B to C</strong>. These are half steps — adjacent frets, nothing in between.</p>
        <p style={{ marginTop: 10 }}>On string 6: open = E. Fret 1 = F. No gap. Then fret 7 = B. Fret 8 = C. No gap. These pairs are your landmarks. Whenever you feel lost on a string, find the nearest E-F or B-C pair and reorient from there. They won&apos;t move. They&apos;re built into the instrument.</p>
        <p style={{ marginTop: 10 }}>Commit this now: <strong style={{ color: C.text }}>there is no sharp between E and F, and there is no sharp between B and C.</strong> Say it aloud. These two facts prevent more confusion than anything else in this stage.</p>
      </Body>

      <Callout type="warn">
        <p><strong>The most damaging mistake: counting up from the open string.</strong> &quot;Open is E, fret 1 is F, fret 2 is F#, so fret 3 must be G...&quot; This is calculation, not memory. That counting chain breaks under any musical pressure — when you&apos;re reading a chart, following a progression, or improvising. We&apos;re building <em>recognition</em>, the same way you recognize a word without sounding out its letters. Stop counting the moment you notice you&apos;re doing it.</p>
      </Callout>

      <SHead>The Memorization Sequence — String by String</SHead>
      <Body>
        <p>Work through this over several sessions. Do not try to learn all six strings in one sitting — the brain needs sleep between sessions to consolidate. This is not a metaphor. Take the time.</p>
      </Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Sessions 1–2', title: 'String 6 (low E), natural notes only', body: 'E F G A B C D E — open through 12th fret. Play each fret, say the name out loud before looking at the diagram. Then say it again after. Up, then down, then random. Five minutes per session. The goal is not speed — it\'s getting the names into your mouth and fingers at the same time.' },
          { label: 'Session 3', title: 'String 1 (high e) — confirm it matches', body: 'Play string 6 fret 5: A. Now play string 1 fret 5: A. They match. Work through every fret confirming the match. This is review and reinforcement simultaneously. By the end, string 1 should feel like something you already know — because you do.' },
          { label: 'Sessions 4–5', title: 'Sharps and flats on strings 6 and 1', body: 'Fill in the in-between notes. Between F and G is F#. Between G and A is G#. Between A and B is A#. Between C and D is C#. Between D and E is D#. The two gaps (E-F, B-C) have nothing between them. Work slowly — natural note, then its sharp, then the next natural.' },
          { label: 'Sessions 6–8', title: 'String 5 (A) and string 2 (B)', body: 'String 5 opens on A. The same E-F and B-C rule applies. String 2 opens on B — notice that fret 1 is C immediately (the B-C half step). Once you know string 6 well, string 5 comes faster. Once you know string 5, string 2 follows the same logic with a shifted starting point.' },
          { label: 'Final phase', title: 'Strings 4 (G) and 3 (D) — close the map', body: 'String 4 opens on G, string 3 opens on D. These strings live in the middle register and often have the most gaps in players\' mental maps. Complete them last, slowly, verifying every note. When all six strings are solid, you have the complete map of the instrument.' },
        ].map((item, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ background: `${C.amber}18`, color: C.amber, fontSize: '0.72rem', fontWeight: '700', padding: '3px 10px', borderRadius: 12, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 2 }}>{item.label}</span>
              <strong style={{ color: C.text, fontSize: '0.9rem' }}>{item.title}</strong>
            </div>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <p><strong>Practice away from the guitar.</strong> While waiting for something, mentally call a random fret and string: &quot;Fret 9, string 6...&quot; Answer before reaching for the instrument. Verify when you pick it up. The mental map matters as much as the physical one. Guitarists who only practice at the instrument have a physical habit. What we&apos;re building is a mental map that the physical habit can rely on.</p>
      </Callout>

      <NoteDrill />

      <SHead>What Mastery Feels Like</SHead>
      <Body>
        <p>You&apos;ll know you&apos;ve internalized this when the answer arrives before the conscious thought. Someone says &quot;fret 8, string 6&quot; and &quot;C&quot; is already in your mind before you&apos;ve processed what happened. It feels like reading — not decoding, just knowing.</p>
        <p style={{ marginTop: 10 }}>Most students experience a distinct shift around day 6–8 of consistent practice. One day you&apos;re calculating. The next, without warning, you just know. Don&apos;t skip ahead before this shift happens. Wait for it. The shift is real and unmistakable.</p>
        <p style={{ marginTop: 10 }}>The test: have someone call random frets and strings while you&apos;re distracted — making coffee, in the middle of a conversation. If you answer correctly without stopping what you&apos;re doing, you&apos;re done. If you have to pause and think, you&apos;re not done yet. That&apos;s not a judgment. It&apos;s just where you are. Keep going.</p>
      </Body>

      <MusicalMoment>
        <p>Play a simple C major chord — any voicing you know. Without lifting your fretting hand, name every note your fingers are touching. Then name the note under each open string that rings. Now you know: that chord is built from C, E, and G. Three notes out of twelve. You just used the note map musically.</p>
        <p style={{ marginTop: 10 }}>Next: call out &quot;D&quot; and find it on string 6, then string 5, then string 4 — without a diagram. This is the beginning of real fluency. The map is already starting to work.</p>
      </MusicalMoment>

      <SHead>Interactive Reference</SHead>
      <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
        Use the note highlighter below during practice sessions. Select a note name to see where it appears across all strings. This is for verification — not a substitute for memorization.
      </p>
      <NoteNamesTab />

      <DodPanel
        items={[
          '① KNOW IT — Name any natural note on string 6 (low E), fret 0–12, in under 2 seconds — without counting from open.',
          '① KNOW IT — Name any natural note on string 1 (high e) at the same speed. Confirm it matches string 6 at every fret.',
          '① KNOW IT — Name any note — natural or sharp/flat — on all 6 strings. Under 2 seconds, automatic.',
          '② PLAY IT — Pass the distraction test: answer correctly when a fret/string is called while you\'re focused on something else.',
          '③ USE IT — Play any chord you know and name every note your fingers are touching, including open strings. Do this for three different chords.',
          '③ USE IT — Call out a note name ("find me all the G\'s") and locate it on every string within 10 seconds — no diagram.',
        ]}
        nextLabel="Step 2: 5 Areas"
        onNext={onNext}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 2: 5 Areas
// ---------------------------------------------------------------------------

function StepAreas({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <GreeneVoice>
        <p>Now that you have the note names — every string, every fret — we need to organize the neck into zones. Having the notes is like knowing every word in a city&apos;s street map. The Areas are the neighborhoods. Without them, you have information but no structure. With them, you know not just where a note is, but <em>what territory</em> it lives in — which chord shapes are nearby, which voicings are within reach.</p>
        <p style={{ marginTop: 12 }}>Most systems divide the guitar into four regions. CAGED does this. I don&apos;t use CAGED, and I want to explain why — not to criticize it, but because the reasoning clarifies what we&apos;re doing instead.</p>
        <p style={{ marginTop: 12 }}>CAGED ties geography to chord shapes — five open chord forms mapped onto the neck as regions. The problem is that when you&apos;re working on voicing navigation (which is the heart of this system), you need geography that&apos;s independent of any particular shape. My five areas are purely geographic. They describe regions of the neck, not chord forms. The chord forms come later and fit into these regions — not the other way around.</p>
        <p style={{ marginTop: 12 }}>The other key difference: my areas <em>overlap</em>. This is not a bug. It&apos;s the most important feature of the system.</p>
      </GreeneVoice>

      <DiscoverPrompt label="Before Reading Further">
        {[
          <p key="q">Why might a useful navigation system allow two areas to share the same frets? A system with clean, non-overlapping zones would seem tidier. What would you lose if the areas had hard borders with no shared territory?</p>,
          <p key="a">You would lose the ability to transition smoothly. A hard border means a jump — you leave one system and enter another. A shared zone means a crossing — you can stand in both territories at once and choose which resources to use. The overlap is where the richest harmonic decisions happen. Greene understood that the most interesting chord is often the one that belongs to two areas simultaneously.</p>
        ]}
      </DiscoverPrompt>

      <SHead>Why the Overlaps Matter More Than the Areas Themselves</SHead>
      <Body>
        <p>Think of the fingerboard like a city where five neighborhoods share boundaries. Nobody who lives in one neighborhood is locked out of the adjacent one — the interesting stuff happens at the edges. Fret 5 sits in both Area 1 and Area 2. Frets 7–8 sit in both Area 2 and Area 3. These overlap zones are not confusion. They&apos;re richness.</p>
        <p style={{ marginTop: 10 }}>When you&apos;re at fret 5, you have access to chord shapes and scale patterns from <em>two</em> neighborhoods simultaneously. That&apos;s a harmonic resource, not a problem. Greene would sometimes say that the most interesting chord you can find is the one that belongs to two areas at once — you can&apos;t take advantage of that until you know which areas overlap where.</p>
      </Body>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 24 }}>
        {AREA_DEFS.map((a, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${a.color}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
              <strong style={{ color: a.color, fontSize: '0.9rem' }}>{a.label}</strong>
              <span style={{ color: C.dim, fontSize: '0.8rem', marginLeft: 'auto' }}>Frets {a.startFret}–{a.endFret}</span>
            </div>
            <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
          </div>
        ))}
      </div>

      <SHead>The Overlap Map — Memorize These Boundaries</SHead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { zone: 'Frets 3–4', areas: 'Areas 1 & 2', note: 'First crossroads. Open-position shapes and A-shape voicings coexist here. This is where most players first feel the benefit of two-area awareness.' },
          { zone: 'Frets 7–8', areas: 'Areas 2 & 3', note: 'Mid-neck crossroads. A-shape and D-shape territory. A huge amount of harmonic movement happens in this overlap.' },
          { zone: 'Frets 8–9', areas: 'Areas 3 & 4', note: 'Upper-mid crossroads. D-shape and G-shape. The voicings here tend to be bright and present in a mix.' },
          { zone: 'Frets 11–12', areas: 'Areas 4 & 5', note: 'The octave boundary. Area 5 begins the repeat of Area 1 one octave higher — identical shapes, different register.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: C.surface, borderRadius: 8 }}>
            <div style={{ minWidth: 80 }}>
              <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.85rem', margin: 0 }}>{item.zone}</p>
              <p style={{ color: C.dim, fontSize: '0.75rem', margin: 0 }}>{item.areas}</p>
            </div>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      <SHead>How to Practice the Areas</SHead>
      <Body>
        <p><strong style={{ color: C.text }}>Drill 1 — Fret identification.</strong> For every fret 0–12, say aloud which area or areas it belongs to. No diagram. This should take less than one second per fret. This is a different skill from knowing the areas conceptually — you want the fret-to-area connection to be immediate, the same way the note names are immediate.</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: C.text }}>Drill 2 — Chord planting.</strong> Find one chord voicing — anything you already know — in each of the five areas. It doesn&apos;t have to be the same chord in each area; just something that sits within the area&apos;s fret range. This connects the geographic concept to music that&apos;s already in your hands.</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: C.text }}>Drill 3 — Area transitions.</strong> Play a chord in Area 1. Move to the nearest voicing of the same chord in Area 2, <em>passing through the overlap zone</em>. The transition should feel like stepping from one neighborhood into the next — not jumping, not teleporting. Feel the shared frets under your hand as you cross.</p>
      </Body>

      <Callout type="warn">
        <p><strong>Don&apos;t treat the areas as rigid walls.</strong> A student who says &quot;I can&apos;t play that chord here, it&apos;s in Area 3 and I&apos;m in Area 2&quot; has completely missed the point. The areas are a navigational aid, not a constraint. Use them to orient yourself, then move freely across them. The whole system breaks if you treat boundaries as barriers.</p>
      </Callout>

      <DiscoverPrompt label="Listen for This">
        {[
          <p key="q">Play something you already know below fret 5 — an open G chord, a C chord, anything. Now move your entire hand 12 frets higher and play the same shape. What stayed exactly the same? What changed?</p>,
          <p key="a">The relationships between the notes stayed identical — same intervals, same chord quality, same sound character. What changed was the register: everything is one octave higher. This is Area 5. The fretboard literally repeats at fret 12. Every shape in Area 1 has a twin in Area 5, one octave up. This isn&apos;t a coincidence — it&apos;s why the guitar has 12 frets before repeating.</p>
        ]}
      </DiscoverPrompt>

      <Callout type="insight">
        <p><strong>Area 5 is the gift most players discover by accident.</strong> It begins at fret 12 — the exact octave of the open strings. Every shape you know in Area 1 works identically in Area 5, one octave higher. If you&apos;ve ever wanted to play an open-sounding chord in a higher register, Area 5 is always the answer. This is not a coincidence of tuning — it&apos;s the neck&apos;s built-in symmetry.</p>
      </Callout>

      <MusicalMoment>
        <p>Pick any chord voicing you know in Area 1 (frets 0–4). Play it. Name the area. Now find the nearest voicing of the same chord in Area 2 (frets 3–7) — and as you move, notice that your hand crosses through the overlap zone at frets 3–4. You&apos;re not jumping; you&apos;re stepping through shared territory.</p>
        <p style={{ marginTop: 10 }}>Repeat this transition three times: Area 1 → Area 2 → back to Area 1. Each time, name the area you&apos;re entering. Make the geography conscious before it becomes automatic.</p>
      </MusicalMoment>

      <SHead>Interactive Diagram</SHead>
      <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
        Select each area to see its fret range on the full neck with sample G major notes. Notice the amber root notes anchoring each area. Notice where adjacent areas overlap.
      </p>
      <AreasTab />

      <DodPanel
        items={[
          '① KNOW IT — Given any fret number 0–12, immediately name which area or areas it falls in — no hesitation, no diagram.',
          '① KNOW IT — For every overlap zone (frets 3–4, 7–8, 8–9, 11–12), name both areas without looking.',
          '② PLAY IT — Find and play one chord voicing you already know in each of the 5 areas. You&apos;re there without searching.',
          '② PLAY IT — Transition between adjacent areas through the overlap zone — stepping through, not jumping over.',
          '③ USE IT — Play the same chord in Area 1, then Area 5 (fret 12). Hear the octave relationship. Explain why the shape works identically.',
          '③ USE IT — Create a two-chord phrase that deliberately crosses an area boundary. You can name both areas as you play it.',
        ]}
        nextLabel="Step 3: 7 Positions"
        onNext={onNext}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 3: 7 Positions
// ---------------------------------------------------------------------------

function StepPositions({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <GreeneVoice>
        <p>The Areas gave you regions — broad neighborhoods across the neck. The 7 Position Theory gives you something more precise: <em>specific landmarks</em> within those neighborhoods. If the Areas are like knowing which part of a city you&apos;re in, the Positions are like knowing the cross street.</p>
        <p style={{ marginTop: 12 }}>I use the G major scale as the template for the positions. Not because G major is more important than any other key — it isn&apos;t — but because in standard tuning, G major allows us to use open strings in the first position, which gives you a natural anchor point where you can hear the relationship between open strings and fretted notes. Once the system is internalized, you shift it to any key. But we learn it in G first.</p>
        <p style={{ marginTop: 12 }}>Each position is named by the scale degree whose root falls on the 6th string. Position I: G at the 3rd fret of string 6. Position II: A at the 5th fret. Position III: B at the 7th fret. And so on, following the major scale up the neck until we&apos;ve covered all 12 frets. Seven positions, seven landmarks, the entire neck accounted for.</p>
        <p style={{ marginTop: 12 }}>Notice: if you&apos;ve done the note name work, you already know which note is at every fret on string 6. The position system is that knowledge given an organizing structure. You&apos;re not learning something new. You&apos;re organizing what you already know.</p>
      </GreeneVoice>

      <DiscoverPrompt label="Before Reading Further">
        {[
          <p key="q">Play a G major scale starting on the open low E string. Now play it again, starting from the G at fret 3 on string 6. The notes are the same. The hand position is completely different. What changed, and what stayed the same — and what does that tell you about what a &quot;position&quot; actually means?</p>,
          <p key="a">The <em>notes</em> stayed the same — same pitches, same relationships, same G major scale. What changed was your hand location on the neck. A position describes where your <em>anchor</em> is, not which notes you play. It&apos;s a geographic reference — the root on string 6 — not a pattern of dots you memorize. That distinction is everything.</p>
        ]}
      </DiscoverPrompt>

      <SHead>What a Position Actually Is — and What It&apos;s Not</SHead>
      <Body>
        <p>A position is not a box. I want to be very clear about this, because box-pattern thinking is one of the most limiting habits a guitarist can develop. A position is a <em>reference point</em> — it tells you where the root of the scale falls on the 6th string in that region of the neck. From that reference point, you access scale notes, chord tones, and passing tones across all six strings in the surrounding frets.</p>
        <p style={{ marginTop: 10 }}>The common error is treating a position as a fixed pattern of dots: &quot;I&apos;m in Position II, so my scale looks like this shape.&quot; That&apos;s backward. The position tells you <em>where you are</em>. From there, the music tells you what to play. The position is the address, not the room plan.</p>
      </Body>

      <SHead>The Full Position Map in G Major</SHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 24 }}>
        {POSITIONS.map((p, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 8, padding: '12px 14px', border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: C.amber, fontWeight: '800', fontFamily: 'monospace', fontSize: '0.9rem' }}>Position {p.n}</span>
              <span style={{ color: C.dim, fontSize: '0.78rem' }}>Fret {p.fret + 1}</span>
            </div>
            <p style={{ color: C.text, fontWeight: '600', fontSize: '0.88rem', marginBottom: 4 }}>Root: {p.root} on string 6</p>
            <p style={{ color: C.muted, fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <SHead>Learning the Positions — One Per Session</SHead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { step: '1', text: 'Find the root note on the 6th string. Say the fret number and note name aloud: "Fret 3 — G. This is Position I." Name it on arrival, not before.' },
          { step: '2', text: 'Play the G major scale beginning from that root, ascending to the next G above. Don\'t force a fixed pattern — follow the scale wherever it flows on the neck.' },
          { step: '3', text: 'Descend back to the root. Then find where G appears on other strings within this same position region. The root appears multiple times; find them all.' },
          { step: '4', text: 'Shift to the adjacent position (up or down), name it, play the scale again. Then come back. Clean shifts are the goal — no drift, no wandering.' },
        ].map(item => (
          <div key={item.step} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: C.surface, borderRadius: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: `${C.amber}18`, color: C.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700', flexShrink: 0 }}>{item.step}</span>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>

      <Callout type="warn">
        <p><strong>Shifting between positions is not the same as moving your hand.</strong> Many players move their hand constantly and never actually change position — they drift. A genuine position shift means your reference point (the root on string 6) has moved to a new fret location. When you can name your position before and after a shift, you&apos;re shifting with intention. When you can&apos;t name it, you&apos;re wandering — which has its place in improvisation, but is not position practice.</p>
      </Callout>

      <SHead>Connecting Positions to Areas</SHead>
      <Body>
        <p>Once you know both systems, you can use them simultaneously. Position I (G at fret 3) sits at the boundary of Areas 1 and 2. Position II (A at fret 5) sits squarely in Area 2. Position III (B at fret 7) sits at the boundary of Areas 2 and 3. The positions and the overlap zones of the areas are not coincidentally related — they map onto each other naturally because they&apos;re both derived from the same underlying scale structure.</p>
        <p style={{ marginTop: 10 }}>The statement &quot;I&apos;m in Area 2, Position II&quot; is the beginning of real neck fluency. Both descriptors are simultaneously true, and together they tell you far more than either alone. Practice making this statement until it requires no thought.</p>
      </Body>

      <Callout type="insight">
        <p><strong>The positions also give you a chord vocabulary shortcut.</strong> Once you know what position you&apos;re in, you know which chord forms from the G major scale are naturally available to you without a large position shift. Position I gives you G, Am, Bm, C, D, Em, F# dim — all reachable without moving far. This is why positions become the basis for harmonic navigation in Stage 2 and beyond.</p>
      </Callout>

      <MusicalMoment>
        <p>Land on Position I — G at fret 3, string 6. Play the G major scale from there. Now without stopping, shift to Position II — A at fret 5. Play the scale again. Shift to Position III — B at fret 7.</p>
        <p style={{ marginTop: 10 }}>Notice: you&apos;re always playing G major. The notes overlap between positions. The music doesn&apos;t stop when you change positions — the <em>address</em> changes, but the territory remains continuous. That continuity is what positions give you. You&apos;re not moving between isolated boxes. You&apos;re moving along connected territory that you can now name.</p>
      </MusicalMoment>

      <SHead>Interactive Diagram</SHead>
      <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
        Select each position to see its anchor point on the neck. The amber band shows the position&apos;s general range. Root notes on string 6 are shown for all positions — active position in amber, others dimmed.
      </p>
      <PositionsTab />

      <DodPanel
        items={[
          '① KNOW IT — Name the position you\'re in from the root note on the 6th string — without a chart.',
          '① KNOW IT — When a position number (I–VII) is called out, you\'re there within 3 seconds.',
          '② PLAY IT — Play the G major scale in all 7 positions without stopping between shifts. Know the root before starting each.',
          '② PLAY IT — Describe which area each position falls in. Both maps operate simultaneously in your mind.',
          '③ USE IT — Play the G major scale through Position I, shift to Position II mid-phrase without stopping, continue through Position III. The music doesn\'t break at position boundaries.',
          '③ USE IT — Find a chord voicing in Position I and move it to the same chord in Position II. Name the area you\'re entering as you cross.',
        ]}
        nextLabel="Step 4: 3 Triad Diagonals"
        onNext={onNext}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 4: 3 Triad Diagonals
// ---------------------------------------------------------------------------

function StepDiagonals({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <GreeneVoice>
        <p>Over the years, I found myself returning to this way of seeing the fingerboard again and again. If there is one organizational idea I would especially like you to live with for a while, it is this one — not because it is complicated, but because once you really see it, the neck never looks the same.</p>
        <p style={{ marginTop: 12 }}>When most guitarists look at a triad on the fretboard, they see a shape. They learn three or four shapes for each chord quality and stop there. Those shapes work fine — until they need to stay in the same chord while moving across the neck, or connect chord tones to a melody, or transition smoothly between voicings without breaking the harmonic continuity. Then the shapes-as-isolated-objects approach fails.</p>
        <p style={{ marginTop: 12 }}>The three triad diagonals solve this. Any major triad appears in three inversions — root position (root in bass), first inversion (3rd in bass), and second inversion (5th in bass). Each inversion traces a diagonal path across the neck, from low strings to high strings, ascending in pitch as it goes. These three diagonals together tile the entire fingerboard. There is no place on the neck that isn&apos;t covered by one of the three paths.</p>
        <p style={{ marginTop: 12 }}>Think of the diagonals as highways. On a highway, you&apos;re always in the same state, always making harmonic progress, but you have exits to different voicings. The diagonals are the highways. The Areas are the neighborhoods you pass through. Once you can follow any diagonal path for any key, the neck is no longer a collection of isolated shapes — it&apos;s a continuous, navigable terrain.</p>
      </GreeneVoice>

      <DiscoverPrompt label="Listen for This">
        {[
          <p key="q">Play these three chords in sequence and really listen: G major (G in the bass), then G/B (B in the bass), then G/D (D in the bass). The same three notes — G, B, D — are present in all three. So why does each one feel different? What changes between them emotionally, not technically?</p>,
          <p key="a">The bass note creates the sense of gravity. Root position (G in bass) feels resolved, grounded — it&apos;s home. First inversion (B in bass) feels lighter, slightly questioning — it tilts forward. Second inversion (D in bass) feels the most unstable — it has momentum, it wants to move somewhere. The notes are identical. The <em>relationships</em> between them shift entirely based on which one is lowest. This is why inversion matters, and why the three diagonals are three distinct harmonic experiences, not just three fingering patterns.</p>
        ]}
      </DiscoverPrompt>

      <SHead>Understanding the Three Paths</SHead>
      <Body>
        <p>G major has three notes: G (root), B (major 3rd), D (5th). Each inversion changes which note sits in the bass position. The notes are always the same three — only the bass note changes:</p>
      </Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { n: 1, inv: 'Root Position', bass: 'G in bass', notes: 'G–B–D', color: C.blue, desc: 'The most stable. Grounded and resolved. The root-position diagonal ascends steeply — starting low on string 6, rising quickly toward string 1. This is the diagonal most players encounter first, usually without knowing it\'s a diagonal at all.' },
          { n: 2, inv: 'First Inversion', bass: 'B in bass', notes: 'B–D–G', color: C.green, desc: 'Less stable — creates forward motion. The 3rd in the bass gives a slightly sweeter, less resolved quality. Excellent for voice leading because the bass moves by step when you transition to or from root position.' },
          { n: 3, inv: 'Second Inversion', bass: 'D in bass', notes: 'D–G–B', color: C.purple, desc: 'The most unstable inversion — it wants to resolve somewhere. But instability is not a problem; it\'s a resource. Second inversion chords create tension that resolves beautifully to root position. Use this intentionally.' },
        ].map(item => (
          <div key={item.n} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${item.color}30` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${item.color}20`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0 }}>{item.n}</div>
              <div>
                <span style={{ color: item.color, fontWeight: '700', fontSize: '0.9rem' }}>Diagonal {item.n}: {item.inv}</span>
                <span style={{ color: C.dim, fontSize: '0.8rem', marginLeft: 12 }}>{item.bass} · {item.notes}</span>
              </div>
            </div>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <SHead>How the Paths Move Across the Neck</SHead>
      <Body>
        <p>Each diagonal doesn&apos;t appear just once — it repeats across different three-string sets, ascending up the neck. Root-position G major on strings 6-5-4 (frets 3-2-0) reappears on strings 5-4-3 higher up the neck, then on 4-3-2, then on 3-2-1. As you move across string sets, the diagonal path <em>ascends</em> — cutting diagonally across the neck, hence the name.</p>
        <p style={{ marginTop: 10 }}>The practical implication: if you&apos;re playing a G major triad on strings 6-5-4 and want to stay in G major while moving up the neck, follow the diagonal to its next occurrence on strings 5-4-3. Same chord quality, same inversion, different location. You haven&apos;t changed the harmony — you&apos;ve moved along the highway.</p>
      </Body>

      <Callout type="insight">
        <p><strong>Why G major unlocks every other key.</strong> The <em>shapes</em> of the three diagonals are identical in every major key. Only the root location changes. Once you can run G major diagonals smoothly from fret 0 to 12, applying that to C major means shifting the root to fret 8 on string 6 and running the same shapes. The understanding transfers completely. This is why we learn one key deeply rather than all keys shallowly.</p>
      </Callout>

      <DiscoverPrompt label="Can You Predict the Next One?">
        {[
          <p key="q">Play root-position G major on strings 6-5-4 (frets 3-2-0). Now: without starting over from the root, can you find the next place this same inversion appears as you move higher on the neck? Don&apos;t look at a diagram — see if you can reason it out or feel it. Where does root-position G major reappear on strings 5-4-3?</p>,
          <p key="a">It appears at approximately frets 7-5-4 on strings 5-4-3. The shape shifts because the string set shifts — but the inversion (G in bass) is identical. This is the diagonal moving. You followed the path without being given the destination. That capacity — to follow a harmonic path rather than hop between memorized shapes — is exactly what the diagonal system builds.</p>
        ]}
      </DiscoverPrompt>

      <MusicalMoment>
        <p>Use the three inversions of G major to create a four-measure phrase. Don&apos;t move between random shapes — move between the three diagonals in order: root position → first inversion → second inversion → back to root. Play it slowly. Listen to how the harmony moves even though the chord never changes. That motion <em>is</em> music — harmony moving within a single chord.</p>
        <p style={{ marginTop: 10 }}>Variation: try holding the top note (the soprano) constant while moving through the three inversions. This is the beginning of voice leading — a skill that becomes central in Stage 5.</p>
      </MusicalMoment>

      <SHead>The Practice Sequence</SHead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { phase: 'Phase 1', title: 'One diagonal, one string set', body: 'Diagonal 1 (root position) on strings 6-5-4. Learn the exact frets. Play slowly, say "root position" as you play. Descend. Don\'t move to the next string set until this is solid. Impatience here creates confusion later.' },
          { phase: 'Phase 2', title: 'One diagonal, all string sets', body: 'Follow Diagonal 1 across all four string sets: 6-5-4, 5-4-3, 4-3-2, 3-2-1. Each set occurs higher on the neck. Play them in sequence without stopping — this is the diagonal path in continuous motion. This is what we mean by "highway."' },
          { phase: 'Phase 3', title: 'All three diagonals, one string set', body: 'Take string set 6-5-4. Play all three inversions — root, first, second. Move between them without stopping. Listen: you should hear the stability shift from grounded (root) to sweet (first) to tense (second). The ear learns too, not just the hand.' },
          { phase: 'Phase 4', title: 'All three diagonals, full neck', body: 'Run all three diagonal paths for G major across all string sets, fret 0 to 12, without stopping. This is the master exercise for this step. It takes weeks to master completely. Don\'t rush it. The continuous movement is the point.' },
          { phase: 'Phase 5', title: 'Apply to C major', body: 'C major root: fret 8 on string 6. The shapes are identical. Run the same exercise from this starting point. If it feels unfamiliar, that\'s correct — you\'re applying understanding, not muscle memory. Understanding is harder and more transferable.' },
        ].map(item => (
          <div key={item.phase} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
              <span style={{ background: `${C.amber}18`, color: C.amber, fontSize: '0.72rem', fontWeight: '700', padding: '3px 10px', borderRadius: 12, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 1 }}>{item.phase}</span>
              <strong style={{ color: C.text, fontSize: '0.9rem' }}>{item.title}</strong>
            </div>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <Callout type="warn">
        <p><strong>The temptation to skip Phase 4.</strong> Running all three diagonals across the full neck continuously is difficult and time-consuming. Most students want to declare victory after Phase 3 and move on. Resist this. The continuity of the full-neck run is precisely what converts isolated chord shapes into a connected map. The difficulty is not incidental — it&apos;s the mechanism. The struggle of following the path unbroken is what builds the mental picture of the diagonals as highways rather than exits.</p>
      </Callout>

      <SHead>Interactive Diagram</SHead>
      <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
        Select each diagonal to see the inversion shape and fret positions for G major. Faded dots show the path continuing to the next string set up the neck.
      </p>
      <DiagonalsTab />

      <DodPanel
        items={[
          '① KNOW IT — Name any triad inversion (root / 1st / 2nd) by ear: play G, G/B, G/D in any order and identify which inversion you hear before seeing it.',
          '① KNOW IT — Describe how each diagonal passes through the area overlap zones — both systems visible simultaneously.',
          '② PLAY IT — Run all three diagonals for G major across all string sets (6-5-4, 5-4-3, 4-3-2, 3-2-1) without stopping.',
          '② PLAY IT — Apply the same diagonal structure to C major — root at fret 8 on string 6 — without rethinking the shapes.',
          '③ USE IT — Use the three G major inversions to create a four-measure phrase where each measure uses a different inversion.',
          '③ USE IT — Hold the soprano note constant while moving through root, first, and second inversion. The top voice stays still; the bass and inner voices move. This is voice leading.',
        ]}
        nextLabel="Step 5: Integration"
        onNext={onNext}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 5: Integration
// ---------------------------------------------------------------------------

function StepIntegration({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <GreeneVoice>
        <p>You now have four things in your hands: the note names across all six strings, the five areas of the fingerboard, the seven positions derived from the G major scale, and the three triad diagonals that connect inversions across the neck. Each works on its own. But they were never designed to work in isolation.</p>
        <p style={{ marginTop: 12 }}>Integration is the step where these four separate things stop being four things and become one: a complete mental model of the guitar fingerboard. When that happens — and it does happen, it&apos;s not a metaphor — you stop thinking about the instrument and start thinking only about the music. The map becomes invisible. You&apos;re just navigating.</p>
        <p style={{ marginTop: 12 }}>This step introduces no new information. It introduces a new relationship with the information you already have. The practice is about using the systems together, under real musical conditions, until the boundaries between them dissolve.</p>
        <p style={{ marginTop: 12 }}>Here&apos;s how I knew when a student was ready for Stage 2: I would pick a chord quality — say, G major 7 — and ask them to play it in all five areas without stopping. If they could do that, name the area they were in, and tell me which diagonal connected that voicing to the next one up the neck — we were ready. That&apos;s not a test. That&apos;s what fluency looks like.</p>
      </GreeneVoice>

      <SHead>Integration Drills</SHead>
      <Body>
        <p>These exercises deliberately combine the systems. Do them slowly. Speed is not the goal here — awareness is. You&apos;re training your mind to hold multiple systems in simultaneous awareness.</p>
      </Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            title: 'Note → Area → Position',
            body: 'Call out a note — say, B♭. Find it on string 6. Name the fret. Name the area. Name the position. Then find the same note on all other strings. For each occurrence, name the area and position it falls in. This drill forces all three systems to describe a single note. You should feel them click together.',
          },
          {
            title: 'Chord → Area → Diagonal',
            body: 'Play a G major chord in Area 1. Name the voicing — which inversion is in the bass? Now follow the diagonal to the same inversion in Area 2, then Area 3. Move continuously through the overlap zones. Don\'t lift your hand — step through the boundaries. Name each area as you enter it.',
          },
          {
            title: 'Position → Scale → Chord',
            body: 'Call out a position — Position IV. Go there immediately (C at fret 8, string 6). Play the G major scale from that position. Then find a G major triad voicing in that same position region. You\'ve just connected the positional anchor to both scale and chord content simultaneously.',
          },
          {
            title: 'Blind spot audit',
            body: 'Ask yourself honestly: which area feels least natural? Which position do you have to search for? Which diagonal inversion is haziest? Those are your blind spots. Go there deliberately — not to the comfortable parts of the neck. Comfort is not the goal. Completeness is.',
          },
          {
            title: 'Continuous G major triads — full neck',
            body: 'Play G major triads across the entire neck without stopping. Move through all five areas using the diagonal connections. Change inversions as the diagonal dictates. Name each area as you enter it. This is the master integration exercise for Stage 1. Expect weeks of practice before it flows.',
          },
          {
            title: 'Apply to D major',
            body: 'D major root: fret 5 on string 6 (Area 2, Position II). Run the three diagonals for D major. Name the areas as you pass through them. If the systems are truly integrated, this should feel like the same exercise from a new starting location — not a new exercise. That feeling of "same exercise, new location" is fluency.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.text, fontWeight: '700', fontSize: '0.92rem', marginBottom: 8 }}>{item.title}</p>
            <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <Callout type="warn">
        <p><strong>The comfortable-corner trap.</strong> Every guitarist has a region of the neck they return to by default — usually somewhere around frets 5–9 in the middle areas. Integration practice means leaving that region deliberately and working the parts of the neck that feel least natural. If you only practice where you&apos;re already comfortable, you&apos;re maintaining existing fluency, not building new fluency. Go to Area 1 with its open strings. Go to Area 4 and 5 where the neck feels sparse and unfamiliar. Make the uncomfortable feel like home.</p>
      </Callout>

      <SHead>The Milestone Moment</SHead>
      <Body>
        <p>There is a specific moment most students can recall when Stage 1 is complete. It&apos;s usually not during a practice session — it&apos;s during a musical moment where you needed information and it was just there. A chord in your head, your hand went to it, and you knew exactly where you were on the neck and exactly how to reach the next chord. No counting, no calculating, no pattern-hunting. Just fluency.</p>
        <p style={{ marginTop: 10 }}>That moment is the real definition of done for Stage 1. The checklist below approximates it in testable terms. But the true criterion is experiential — when the instrument becomes transparent and the music is the only thing left.</p>
      </Body>

      <MusicalMoment>
        <p>This is Greene&apos;s test, and it&apos;s worth doing seriously. Pick a simple chord quality — G major 7. Play it in Area 1. Don&apos;t just play any voicing; name the area, the position, and the inversion before you play. Then move to Area 2. Repeat. Area 3. Area 4. Area 5.</p>
        <p style={{ marginTop: 10 }}>Five areas. Five voicings. All G major 7. Played in sequence, continuously, with each one named before you touch the fret. If you can do this — you are ready for Stage 2. That&apos;s not a performance. That&apos;s fluency. The map is real, it works, and the music can now move through it.</p>
      </MusicalMoment>

      <SHead>Practice Tracker</SHead>
      <ExercisesTab />

      <DodPanel
        items={[
          '① KNOW IT — Given a note name, find it in all 5 areas within 5 seconds — every occurrence, every string.',
          '① KNOW IT — At any overlap zone, name both areas and both positions simultaneously without searching.',
          '② PLAY IT — Play G major triads continuously across the full neck — all areas, all string sets, diagonal connections — without stopping.',
          '② PLAY IT — Apply the three-diagonal system to C major and D major without rethinking the shapes.',
          '③ USE IT — Play any chord, immediately name the area, position, and diagonal inversion it represents.',
          '③ USE IT — Greene\'s test: play G major 7 in all five areas in sequence, naming each before you play it. Continuous, fluent, musical.',
          '③ USE IT — The neck feels like continuous terrain, not isolated shapes. You think about the music, not the geography.',
        ]}
        nextLabel="Source Documents"
        onNext={onNext}
      />

      <WhatBecameEasier
        items={[
          'Know where you are on the neck without searching — area, position, and note name are always available.',
          'Find any note across multiple areas of the fingerboard without a diagram or process.',
          'Relocate a musical idea to a new area instead of being trapped in one position.',
          'See the neck as continuous terrain rather than disconnected shape boxes.',
          'Connect triad inversions across string sets and regions using the diagonal highways.',
          'Move through overlap zones instead of jumping blindly between neck areas.',
          'Apply the same organizational system to any key — G today, C tomorrow, all keys eventually.',
          'Begin learning harmony without first having to solve the geography of the instrument.',
          'Hear a chord internally and move toward it with much less interruption.',
          'Use inversion to create harmonic motion within a single chord — the beginning of voice leading.',
        ]}
        nextStage="You have built the map. In Stage 2, you will learn how harmony travels through it — how chords connect, how progressions move, and how the areas and positions become a guide for musical navigation rather than just geographic awareness."
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Practice Blueprint
// ---------------------------------------------------------------------------

const TRACKS = [
  { id: 'ear',    label: 'Ear',         color: '#a855f7', icon: '♪' },
  { id: 'rhythm', label: 'Rhythm',      color: '#22c55e', icon: '♩' },
  { id: 'touch',  label: 'Touch & Tone',color: '#3b82f6', icon: '◎' },
  { id: 'mental', label: 'Visualization',color: '#f59e0b', icon: '◈' },
]

const TRACK_CONTENT: Record<string, { intro: string; exercises: { title: string; body: string }[] }> = {
  ear: {
    intro: 'The ear is the real instrument. The fingerboard is just geography. These exercises wire the two together — so the note you hear internally and the fret you reach for become the same impulse.',
    exercises: [
      { title: 'Sing → Find', body: 'Hum or sing any pitch that comes to mind. Now find that exact pitch on string 6. Move to string 5. Find it there. String 4. You are teaching your ear and your hand to speak the same language. Do this for 2–3 minutes. Don\'t rush. The slowness is the point.' },
      { title: 'Find → Name → Sing', body: 'Play any fret on any string. Say the note name aloud. Then sing that note. Hold it. Now move to another string and find the same pitch. This triangle — play, name, sing — is the core ear-map exercise. Do it slowly, one note at a time. 3 minutes.' },
      { title: 'Ghost Note Hunting', body: 'Play a chord you already know. Let it ring. While it rings, sing the root note of the chord. Then sing the 3rd. Then the 5th. Each note should already exist somewhere in the chord. Can you hear it? Find it on the fretboard while the chord still sounds. This is active listening, not passive.' },
      { title: 'Interval Recognition on One String', body: 'Play open E (string 6). Then play fret 4 — G#. Hear the distance: a major 3rd. Play open E again. Play fret 5 — A. A perfect 4th. Don\'t name the intervals technically — hear them as distances with a specific feeling. Over time these feelings become vocabulary.' },
      { title: 'The Dial', body: 'Hum a note continuously. Slowly slide your fretting finger up string 6 until the pitch matches what you\'re humming. You just used your ear to navigate the fretboard. This is what we\'re building toward: the ear tells the hand where to go, and the hand goes there.' },
    ],
  },
  rhythm: {
    intro: 'Rhythm is not a separate subject. It is the container that music lives in. Even at Stage 1, every exercise should have a pulse underneath it — even if that pulse is just your foot tapping. Groove and geography develop simultaneously.',
    exercises: [
      { title: 'The Metronome Relationship', body: 'Set your metronome to 60 bpm. Play one note per beat on string 6, naming each note aloud as you play it: E (beat 1), F (beat 2), F# (beat 3), G (beat 4)... Don\'t speed up when you know the note, don\'t slow down when you don\'t. The tempo is the rule. This is the most important groove exercise at this stage — it forces the note name and the time sense to share the same bandwidth.' },
      { title: 'One-Chord Groove', body: 'Pick any chord you already know — a G, a C, whatever. Set a metronome to 70 bpm. Play that chord on every beat for two minutes. Simple strums. Your left hand stays, your right hand grooves. While you play, name the notes your fingers are touching. You are developing groove and the note map at the same time. This is not trivial.' },
      { title: 'Area Walk', body: 'Play a steady quarter-note pulse on string 6, moving up one fret per beat, naming each note. When you reach fret 12, walk back down. Keep the pulse absolutely steady. Don\'t rush the names — find a tempo where you can name every note without breaking the beat. That tempo is your current fluency level. Watch it rise over weeks.' },
      { title: 'Rhythmic Note Targeting', body: 'Set a metronome to 50 bpm. On beat 1, play a G anywhere on the neck. On beat 3, play a D anywhere on the neck. On beat 1 of the next measure, play a B anywhere. You have two beats to find each note. Gradually reduce the gap — eventually you should be able to target any note on any string on the beat, without preparation.' },
      { title: 'Clap and Name', body: 'Away from the guitar: tap a steady beat with one hand while saying note names aloud in rhythm — E, F, F#, G, G#, A... up the chromatic scale, down the chromatic scale. Keep the beat steady. This decouples the naming from the physical act of finding, which reveals whether you truly know the names or whether you\'ve been relying on the fret as a memory aid.' },
    ],
  },
  touch: {
    intro: 'Tone is a decision, not an accident. How you touch the string determines what the note sounds like before any amplification, before any effect. Ted Greene\'s tone was instantly recognizable — not from equipment, but from touch. These exercises develop intentional contact with the instrument.',
    exercises: [
      { title: 'The Single-Note Tone Study', body: 'Play one note — say, G on string 6 at fret 3. Listen until it completely dies. Then play it again, slightly harder. Then softer. Then with a different angle of attack. Then with the flesh of the fingertip vs. the nail side. You are discovering that one fret position produces a range of sounds depending entirely on how you approach it. Spend 3 minutes on one note. This is not boring — it is the foundation of expressive playing.' },
      { title: 'Dynamic Matching', body: 'Play two adjacent strings, one fret apart. Make them exactly equal in volume. This is harder than it sounds — different strings resist differently. Now make the lower string slightly louder. Now the higher. This micro-control of dynamics is what allows melody to sing out of a chord. Start here.' },
      { title: 'The Rest Stroke vs. Free Stroke', body: 'Play string 6 with your index finger using a free stroke (finger lifts away freely after plucking). Then play the same note with a rest stroke (finger comes to rest on string 5 after plucking). Hear the difference — rest strokes produce a warmer, fuller tone. Alternate between them on every note of a slow G major scale. Learn to choose rather than default.' },
      { title: 'Sustain and Release', body: 'Play a note and hold it for as long as possible. While it sustains, listen to it change — strings decay in a specific curve. Then practice releasing the note cleanly at a specific moment: the third beat, the moment the metronome clicks. Clean releases are as musical as clean attacks. Most players never practice them.' },
      { title: 'String Weight', body: 'Play string 6, then string 1 with the same physical effort. They will not sound the same — the heavier string requires different pressure and attack to produce an equivalent volume. Work through all six strings in sequence, calibrating your attack so each string sounds intentionally, not accidentally. This is not a beginner exercise. This is what professional touch feels like.' },
    ],
  },
  mental: {
    intro: 'Ted Greene talked about mental practice directly with students. Five minutes of focused visualization is worth twenty minutes of unfocused physical practice. The brain consolidates motor patterns during sleep and stillness. These exercises work best away from the guitar — on a bus, before sleeping, waiting for something.',
    exercises: [
      { title: 'The Mental Walk', body: 'Close your eyes. Visualize the guitar neck in front of you — six strings, twelve frets. Slowly walk up string 6: open E... fret 1 F... fret 2 F#... Say each name as you see your finger land on the fret. When you reach fret 12, walk back down. If you lose your place, reorient at E-F or B-C (your gap landmarks). Do this for 3 minutes. Your brain is practicing even without the instrument.' },
      { title: 'Area Painting', body: 'Eyes closed. Visualize the full neck. Now mentally color Area 1 blue — everything from fret 0 to 4. Color Area 2 green — frets 3 to 7. Let the colors overlap where the areas share frets. Area 3 purple, Area 4 amber, Area 5 red. Hold this image. Where are the overlaps? What frets have two colors? Sit with this image for 2 minutes.' },
      { title: 'Position Anchoring', body: 'Mentally place your hand at Position I — G at fret 3, string 6. Say the root note and position number: "G, Position I." Move to Position II — A at fret 5. "A, Position II." Continue through all seven positions without opening your eyes or touching the guitar. This is the position map being built in the mind, not just the hands.' },
      { title: 'Diagonal Tracing', body: 'Eyes closed. Visualize root-position G major on strings 6-5-4. See the three dots. Now trace the path of that same inversion ascending across string sets — 5-4-3, then 4-3-2, then 3-2-1. The diagonal rises from bass to treble. Can you hold all four occurrences of the same inversion in your mind at once? That mental image is the highway map.' },
      { title: 'Pre-Session Setup', body: 'Before picking up your guitar each practice session, spend 60 seconds visualizing what you\'re about to practice. See the positions you\'ll target. Hear the notes internally. Imagine your hand landing cleanly. This is not superstition — it is priming the motor system. The first physical attempt will be more accurate than if you had grabbed the guitar cold.' },
    ],
  },
}

const SESSION_BLOCKS = [
  { duration: '3 min',  label: 'Touch & Tone Warm-Up',  color: '#3b82f6', desc: 'One note, all angles of attack. Single-note tone study. Let the instrument wake up under your hand before the mind takes over.' },
  { duration: '8 min',  label: 'Mapping Work',           color: C.amber,   desc: 'Whatever step you\'re currently on — note names, areas, positions, diagonals. The core cognitive work of Stage 1. Stay in one step until the DOD is genuinely complete.' },
  { duration: '5 min',  label: 'Ear Connection',         color: '#a855f7', desc: 'Sing → Find, Find → Sing. One ear exercise from the Ear Track. The naming work has no value if it isn\'t wired to sound.' },
  { duration: '12 min', label: 'Musical Application',    color: '#22c55e', desc: 'One musical context exercise — a chord progression with conscious naming, a melody by note name, or a groove exercise with note targeting. Something that sounds like music.' },
  { duration: '5 min',  label: 'Free Exploration',       color: '#64748b', desc: 'No drill. Just play. Notice what the mapping work makes visible that wasn\'t before. The awareness you built in the session should leak into everything you play — let it.' },
]

function StepPracticeBlueprint() {
  const [activeTrack, setActiveTrack] = useState('ear')
  const [openExercise, setOpenExercise] = useState<number | null>(null)
  const track = TRACK_CONTENT[activeTrack]

  return (
    <div>
      <GreeneVoice>
        <p>I want to say something about how to use your practice time, because this is where most students go wrong — not in understanding the material, but in how they sit with it.</p>
        <p style={{ marginTop: 12 }}>The note names, the areas, the positions, the diagonals — these are not things you study once and check off. They are things you return to every session, at different depths, in different musical contexts. The student who names notes for five minutes and then plays music for twenty minutes makes faster progress than the student who names notes for twenty-five minutes. The music is not the reward for doing the theory. The music is where the theory becomes real.</p>
        <p style={{ marginTop: 12 }}>So here is how I would organize your practice at this stage. It doesn&apos;t have to be rigid. But there should be a structure — because without structure, the easy things get practiced and the necessary things get avoided.</p>
      </GreeneVoice>

      {/* Section 1: Daily Session */}
      <SHead>Your Stage 1 Daily Session</SHead>
      <Body><p>33 minutes. Adjustable — compress or expand any block — but keep all five elements present every session. The sequence matters: physical before cognitive, cognitive before ear, ear before music, music before free play.</p></Body>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {SESSION_BLOCKS.map((block, i) => (
          <div key={i} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <div style={{ width: 72, background: `${block.color}20`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 8px', flexShrink: 0 }}>
              <span style={{ color: block.color, fontWeight: '800', fontSize: '0.8rem', fontFamily: 'sans-serif' }}>{block.duration}</span>
            </div>
            <div style={{ padding: '12px 16px', background: C.surface }}>
              <p style={{ color: C.text, fontWeight: '700', fontSize: '0.88rem', marginBottom: 4, fontFamily: 'sans-serif' }}>{block.label}</p>
              <p style={{ color: C.muted, fontSize: '0.84rem', lineHeight: 1.65, margin: 0 }}>{block.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <p><strong>On days when you only have 10 minutes:</strong> do the Mapping Work and the Ear Connection. Skip the warm-up, skip the musical application, skip the free play. The two cognitive tracks are the non-negotiables. Everything else is context. But never skip the ear.</p>
      </Callout>

      {/* Section 2: Parallel Tracks */}
      <SHead>The Four Parallel Tracks</SHead>
      <Body><p>These tracks run independently of which mapping step you&apos;re on. A student on Step 1 and a student on Step 5 both work these tracks. They don&apos;t depend on knowing the material — they develop the musicianship that the material will eventually plug into.</p></Body>

      {/* Track selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {TRACKS.map(t => (
          <button key={t.id} onClick={() => { setActiveTrack(t.id); setOpenExercise(null) }} style={{
            padding: '8px 16px', borderRadius: 8, border: `1px solid ${activeTrack === t.id ? t.color : C.border}`,
            background: activeTrack === t.id ? `${t.color}18` : 'transparent',
            color: activeTrack === t.id ? t.color : C.muted,
            fontWeight: activeTrack === t.id ? '700' : '500',
            fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}>
            <span style={{ marginRight: 6 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Track content */}
      <div style={{ background: C.surface, borderRadius: 12, border: `1px solid ${TRACKS.find(t => t.id === activeTrack)?.color}30`, padding: 20, marginBottom: 28 }}>
        <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>{track.intro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {track.exercises.map((ex, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
              <button
                onClick={() => setOpenExercise(openExercise === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: openExercise === i ? `${TRACKS.find(t => t.id === activeTrack)?.color}12` : C.bg, border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ color: openExercise === i ? TRACKS.find(t => t.id === activeTrack)?.color : C.text, fontWeight: '600', fontSize: '0.88rem', fontFamily: 'inherit' }}>{ex.title}</span>
                <span style={{ color: C.dim, fontSize: '0.9rem', flexShrink: 0, marginLeft: 12 }}>{openExercise === i ? '−' : '+'}</span>
              </button>
              {openExercise === i && (
                <div style={{ padding: '0 16px 14px', background: `${TRACKS.find(t => t.id === activeTrack)?.color}08` }}>
                  <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>{ex.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Callout type="insight">
        <p><strong>The tracks compound.</strong> A student who works the Ear Track for three weeks while building the note map arrives at Step 2 (Areas) with a trained ear that can already hear the register differences between areas. A student who skips the ear work builds geography without sound. The map only becomes musical when the ear is part of it.</p>
      </Callout>

      {/* Section 3: Musical Contexts */}
      <SHead>Musical Contexts</SHead>
      <Body><p>These exercises apply the Stage 1 material directly to music. They should feel like playing, not drilling. Use them in the Musical Application block of your daily session or whenever you need the theory to feel alive.</p></Body>

      <MusicalMoment>
        <p><strong>The Chord Anatomy.</strong> Play an open G major chord. Don&apos;t strum it — pluck each string one at a time, from low to high, saying the note name before you pluck it. G, B, D, G, B, G. You just analyzed a chord by note name in real time. Now do it for C major. For Am. For D major. Five minutes of this connects the note map to every chord you already know.</p>
      </MusicalMoment>

      <MusicalMoment>
        <p><strong>Melody by Name.</strong> Pick a simple melody you know — Happy Birthday, a nursery rhyme, a song intro. Find it on string 1 by note name, not by shape or memory of where the melody &quot;lives.&quot; Say each note name before you play it: &quot;B... A... G... A...&quot; This is harder than finding the melody by ear and shape — and that difficulty is the point. You are building the habit of knowing <em>what</em> you&apos;re playing, not just that it sounds right.</p>
      </MusicalMoment>

      <MusicalMoment>
        <p><strong>The Area Tour.</strong> Play a chord you know — G major. Now find a G major voicing in Area 1. Name the area aloud. Find a G major voicing in Area 2. Name it. Area 3, Area 4. You don&apos;t need to know all the voicings yet — use whatever shapes you have. The point is the conscious geography: you know which neighborhood you&apos;re playing in. One chord, five areas, five minutes.</p>
      </MusicalMoment>

      <MusicalMoment>
        <p><strong>Groove with Awareness.</strong> Put on a backing track — any key, any style. Play along freely, the way you normally would. But every 30 seconds, pause and ask: what note am I on? What area of the neck? What string? Then continue playing. You&apos;re not trying to answer before the music asks you — you&apos;re building the habit of checking in. Over time, the check-in becomes continuous and unconscious. That continuity is fluency.</p>
      </MusicalMoment>

      <MusicalMoment>
        <p><strong>The Two-Chord Crossing.</strong> Choose two chords that live in different areas — say, open G (Area 1) and G at the 5th-position barre (Area 2). Play a simple two-chord phrase: G for two beats, then shift to the Area 2 voicing for two beats. Repeat. Focus on the crossing — the moment your hand moves through the overlap zone at frets 3–4. Name the areas before and after each crossing. This is geography becoming musical phrasing.</p>
      </MusicalMoment>

      <Callout type="warn">
        <p><strong>Don&apos;t use the Musical Context exercises as procrastination.</strong> They are more enjoyable than the core mapping work. That enjoyment is real — but the mapping work is what makes them deepen over time. Both are required. The structure of the daily session keeps the balance: mapping work comes before musical application, every session, without exception.</p>
      </Callout>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step navigation
// ---------------------------------------------------------------------------

const STEPS = [
  { id: 'notes',     number: 1, label: 'Note Names',      sub: 'The complete map' },
  { id: 'areas',     number: 2, label: '5 Areas',         sub: 'Neck geography' },
  { id: 'positions', number: 3, label: '7 Positions',     sub: 'Precise landmarks' },
  { id: 'diagonals', number: 4, label: '3 Diagonals',     sub: 'The highway system' },
  { id: 'exercises', number: 5, label: 'Integration',     sub: 'All systems together' },
  { id: 'practice',  number: 0, label: 'Practice',        sub: 'Daily blueprint' },
  { id: 'search',    number: 0, label: 'Source Docs',     sub: 'Greene\'s originals' },
]

function StepNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div style={{ background: '#080e1a', borderBottom: `1px solid ${C.border}`, overflowX: 'auto' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ display: 'flex' }}>
          {STEPS.map((s) => {
            const isActive = active === s.id
            return (
              <button key={s.id} onClick={() => onSelect(s.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: isActive ? `2px solid ${C.amber}` : '2px solid transparent',
                minWidth: 80, whiteSpace: 'nowrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {s.number > 0 && (
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: isActive ? C.amber : `${C.dim}40`,
                      color: isActive ? '#fff' : C.dim,
                      fontSize: '0.7rem', fontWeight: '800',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{s.number}</span>
                  )}
                  <span style={{ color: isActive ? C.amber : C.dim, fontSize: '0.82rem', fontWeight: isActive ? '700' : '500' }}>
                    {s.label}
                  </span>
                </div>
                <span style={{ color: isActive ? `${C.amber}99` : `${C.dim}80`, fontSize: '0.68rem' }}>{s.sub}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: Overview
// ---------------------------------------------------------------------------

function OverviewTab() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 20 }}>
        Stage 1 is the foundation Greene built everything on. Before voicings, before scales, before any
        musical style — you need a{' '}
        <strong style={{ color: C.text }}>mental map of the entire neck</strong>. Greene gave every student
        three overlapping frameworks that, together, let you locate any note on any string within seconds.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { n: '1', title: '5 Areas', desc: 'Five overlapping zones covering the full 12-fret range. Each area has its own characteristic chord shapes and scale fingerings.' },
          { n: '2', title: '7 Position Theory', desc: 'Seven positions derived from the G major scale. Each position shifts up by one scale degree, giving you the whole neck in one system.' },
          { n: '3', title: '3 Triad Diagonals', desc: 'Three diagonal paths (root, 1st inv, 2nd inv) connecting triad shapes across all strings. The highway system of the fretboard.' },
          { n: '4', title: 'Note Names', desc: 'All natural notes on all 6 strings, across all 12 frets. Memorized — not calculated. This is the map.' },
        ].map(item => (
          <div key={item.n} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.amber}22`, color: C.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>{item.n}</span>
              <strong style={{ color: C.text, fontSize: '0.95rem' }}>{item.title}</strong>
            </div>
            <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: `${C.amberDim}18`, border: `1px solid ${C.amberDim}40`, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Greene's Opening Instruction</p>
        <p style={{ color: C.text, lineHeight: 1.7, margin: 0, fontSize: '0.95rem', fontStyle: 'italic' }}>
          "Learn these three systems until they are as natural as breathing. You are not memorizing shapes —
          you are internalizing the geography of your instrument. Once the map is in your hands,
          music can flow without interruption."
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: 5 Areas
// ---------------------------------------------------------------------------

const AREA_DEFS = [
  { label: 'Area 1', startFret: 0, endFret: 4,  color: '#3b82f6', desc: 'Open position. Contains open chords. Low bass register. First natural position.' },
  { label: 'Area 2', startFret: 3, endFret: 7,  color: '#22c55e', desc: '5th position area. A-shape chords. Clear mid-register. Overlaps with Area 1 at frets 3–4.' },
  { label: 'Area 3', startFret: 5, endFret: 9,  color: '#a855f7', desc: '7th position area. D-shape chords. Bright midrange. The "sweet spot" for many voicings.' },
  { label: 'Area 4', startFret: 8, endFret: 12, color: '#f59e0b', desc: '9th–10th position. G-shape chords. High register. Upper V-System voicings live here.' },
  { label: 'Area 5', startFret: 11, endFret: 15, color: '#ef4444', desc: '12th fret and above. Octave of Area 1. Same shapes, one octave higher.' },
]

function AreasTab() {
  const [activeArea, setActiveArea] = useState(0)
  const a = AREA_DEFS[activeArea]

  // G major notes in each area for illustration
  const areaNotes: Record<number, { string: number; fret: number; label: string; color: string }[]> = {
    0: [
      { string: 1, fret: 0, label: 'E', color: C.blue },
      { string: 1, fret: 2, label: 'F#', color: C.blue },
      { string: 1, fret: 3, label: 'G', color: C.amber },
      { string: 2, fret: 0, label: 'A', color: C.blue },
      { string: 2, fret: 2, label: 'B', color: C.blue },
      { string: 2, fret: 3, label: 'C', color: C.blue },
      { string: 3, fret: 0, label: 'D', color: C.blue },
      { string: 3, fret: 2, label: 'E', color: C.blue },
      { string: 4, fret: 0, label: 'G', color: C.amber },
      { string: 4, fret: 2, label: 'A', color: C.blue },
      { string: 5, fret: 0, label: 'B', color: C.blue },
      { string: 5, fret: 1, label: 'C', color: C.blue },
      { string: 5, fret: 3, label: 'D', color: C.blue },
      { string: 6, fret: 0, label: 'E', color: C.blue },
      { string: 6, fret: 2, label: 'F#', color: C.blue },
      { string: 6, fret: 3, label: 'G', color: C.amber },
    ],
    1: [
      { string: 1, fret: 5, label: 'A', color: C.green },
      { string: 1, fret: 7, label: 'B', color: C.green },
      { string: 2, fret: 5, label: 'D', color: C.green },
      { string: 2, fret: 7, label: 'E', color: C.green },
      { string: 3, fret: 4, label: 'F#', color: C.green },
      { string: 3, fret: 5, label: 'G', color: C.amber },
      { string: 4, fret: 4, label: 'B', color: C.green },
      { string: 4, fret: 5, label: 'C', color: C.green },
      { string: 4, fret: 7, label: 'D', color: C.green },
      { string: 5, fret: 5, label: 'E', color: C.green },
      { string: 5, fret: 7, label: 'F#', color: C.green },
      { string: 6, fret: 5, label: 'A', color: C.green },
      { string: 6, fret: 7, label: 'B', color: C.green },
    ],
    2: [
      { string: 1, fret: 7, label: 'B', color: C.purple },
      { string: 1, fret: 8, label: 'C', color: C.purple },
      { string: 2, fret: 7, label: 'E', color: C.purple },
      { string: 2, fret: 8, label: 'F', color: C.purple },
      { string: 3, fret: 5, label: 'G', color: C.amber },
      { string: 3, fret: 7, label: 'A', color: C.purple },
      { string: 4, fret: 7, label: 'D', color: C.purple },
      { string: 4, fret: 9, label: 'E', color: C.purple },
      { string: 5, fret: 7, label: 'F#', color: C.purple },
      { string: 5, fret: 8, label: 'G', color: C.amber },
      { string: 6, fret: 7, label: 'B', color: C.purple },
      { string: 6, fret: 8, label: 'C', color: C.purple },
    ],
    3: [],
    4: [],
  }

  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
        Greene divided the neck into five overlapping areas, not four (the CAGED system he explicitly
        set aside). Each area is about 4 frets wide and overlaps with its neighbors by 1–2 frets.
        This overlap is intentional — it means you are never more than one area away from any note.
      </p>

      {/* Area selector buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {AREA_DEFS.map((ar, i) => (
          <button
            key={i}
            onClick={() => setActiveArea(i)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: `1px solid ${activeArea === i ? ar.color : C.border}`,
              background: activeArea === i ? `${ar.color}22` : 'transparent',
              color: activeArea === i ? ar.color : C.muted,
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {ar.label}
          </button>
        ))}
      </div>

      {/* Full neck with area highlighted */}
      <div style={{ background: C.surface, borderRadius: 10, padding: 16, marginBottom: 16, overflowX: 'auto' }}>
        <FullNeckDiagram
          areas={[{ label: a.label, startFret: a.startFret, endFret: a.endFret, color: a.color }]}
          highlights={areaNotes[activeArea] || []}
          width={620}
        />
      </div>

      <div style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${a.color}30` }}>
        <p style={{ color: a.color, fontWeight: '700', marginBottom: 4, fontSize: '0.9rem' }}>{a.label}: Frets {a.startFret}–{a.endFret}</p>
        <p style={{ color: C.muted, margin: 0, lineHeight: 1.65, fontSize: '0.9rem' }}>{a.desc}</p>
      </div>

      <div style={{ marginTop: 20, background: `${C.amberDim}18`, border: `1px solid ${C.amberDim}40`, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Practice Goal</p>
        <p style={{ color: C.text, lineHeight: 1.65, margin: 0, fontSize: '0.9rem' }}>
          Name which area(s) any given fret falls in without hesitation. Fret 5 = Areas 1 & 2.
          Fret 7 = Areas 2 & 3. Fret 9 = Areas 3 & 4. Internalize the overlaps — they are where
          the interesting transitions happen.
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: 7 Positions
// ---------------------------------------------------------------------------

const POSITIONS = [
  { n: 'I',   fret: 2,  root: 'G', desc: 'G at 3rd fret (6th string). Open G major shape foundation.' },
  { n: 'II',  fret: 4,  root: 'A', desc: 'A at 5th fret (6th string). A-shape position.' },
  { n: 'III', fret: 6,  root: 'B', desc: 'B at 7th fret (6th string). Between A and D shapes.' },
  { n: 'IV',  fret: 7,  root: 'C', desc: 'C at 8th fret (6th string). High-clarity position.' },
  { n: 'V',   fret: 9,  root: 'D', desc: 'D at 10th fret (6th string). D-shape high area.' },
  { n: 'VI',  fret: 11, root: 'E', desc: 'E at 12th fret (6th string). Mirror of open position.' },
  { n: 'VII', fret: 12, root: 'F#', desc: 'F# at 13th fret. Completes the scale cycle.' },
]

function PositionsTab() {
  const [activePos, setActivePos] = useState(0)
  const pos = POSITIONS[activePos]

  // G major scale in the active position (simplified to key fret area)
  const posNotes = POSITIONS.map((p, i) => ({
    string: 1,
    fret: p.fret + 1,
    label: p.root,
    color: i === activePos ? C.amber : `${C.dim}88`,
  }))

  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
        The 7 Position Theory uses the G major scale to mark 7 reference points across the neck.
        Each position is named by the scale degree whose root falls on the 6th string. Together
        they cover the full 12-fret range with no gaps.
      </p>

      {/* Position selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {POSITIONS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePos(i)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: `1px solid ${activePos === i ? C.amber : C.border}`,
              background: activePos === i ? `${C.amber}18` : 'transparent',
              color: activePos === i ? C.amber : C.muted,
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            Pos {p.n}
          </button>
        ))}
      </div>

      {/* Full neck showing position marker */}
      <div style={{ background: C.surface, borderRadius: 10, padding: 16, marginBottom: 16, overflowX: 'auto' }}>
        <FullNeckDiagram
          highlights={posNotes}
          areas={[{
            label: `Position ${pos.n}`,
            startFret: Math.max(0, pos.fret - 1),
            endFret: pos.fret + 3,
            color: C.amber,
          }]}
          width={620}
        />
      </div>

      <div style={{ background: C.surface, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', marginBottom: 6, fontSize: '0.95rem' }}>
          Position {pos.n} — Root: {pos.root} (6th string, fret {pos.fret + 1})
        </p>
        <p style={{ color: C.muted, margin: 0, lineHeight: 1.65, fontSize: '0.9rem' }}>{pos.desc}</p>
      </div>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        {POSITIONS.map((p, i) => (
          <div
            key={i}
            onClick={() => setActivePos(i)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${activePos === i ? C.amber : C.border}`,
              background: activePos === i ? `${C.amber}10` : C.surface,
              cursor: 'pointer',
            }}
          >
            <span style={{ color: C.amber, fontWeight: '700', fontSize: '0.85rem', fontFamily: 'monospace' }}>Pos {p.n}</span>
            <span style={{ color: C.muted, fontSize: '0.8rem', marginLeft: 8 }}>Root: {p.root} • Fret {p.fret + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: 3 Triad Diagonals
// ---------------------------------------------------------------------------

function DiagonalsTab() {
  const [activeDiag, setActiveDiag] = useState(0)

  const diagonals = [
    {
      name: 'Diagonal 1 — Root Position',
      color: C.blue,
      desc: 'Root-position major triads form a diagonal ascending from the 6th string to the 1st string. The root always sits on the lowest string of the three-string set.',
      example: 'G major: strings 6-5-4 (frets 3-2-0), then 5-4-3 (frets 10-9-7), then 4-3-2 (frets 5-4-3)',
      dots: [
        { string: 6, fret: 3, label: 'G', color: C.blue },
        { string: 5, fret: 2, label: 'D', color: C.blue },
        { string: 4, fret: 0, label: 'G', color: C.blue },
        { string: 4, fret: 5, label: 'G', color: '#3b82f680' },
        { string: 3, fret: 4, label: 'B', color: '#3b82f680' },
        { string: 2, fret: 3, label: 'D', color: '#3b82f680' },
      ],
      startFret: 0,
      fretCount: 6,
    },
    {
      name: 'Diagonal 2 — First Inversion',
      color: C.green,
      desc: 'First-inversion triads (3rd in bass) form the second diagonal. The shape shifts up by roughly a minor third from root-position equivalents.',
      example: 'G major 1st inv: strings 6-5-4 (frets 7-5-5), giving B-D-G (3rd in bass)',
      dots: [
        { string: 6, fret: 7, label: 'B', color: C.green },
        { string: 5, fret: 5, label: 'D', color: C.green },
        { string: 4, fret: 5, label: 'G', color: C.green },
        { string: 4, fret: 9, label: 'B', color: '#22c55e80' },
        { string: 3, fret: 7, label: 'D', color: '#22c55e80' },
        { string: 2, fret: 8, label: 'G', color: '#22c55e80' },
      ],
      startFret: 4,
      fretCount: 7,
    },
    {
      name: 'Diagonal 3 — Second Inversion',
      color: C.purple,
      desc: 'Second-inversion triads (5th in bass) form the third diagonal. Together all three diagonals tile the entire neck.',
      example: 'G major 2nd inv: strings 6-5-4 (frets 10-9-7), giving D-G-B (5th in bass)',
      dots: [
        { string: 6, fret: 10, label: 'D', color: C.purple },
        { string: 5, fret: 9, label: 'G', color: C.purple },
        { string: 4, fret: 7, label: 'B', color: C.purple },
        { string: 4, fret: 12, label: 'D', color: '#a855f780' },
        { string: 3, fret: 12, label: 'G', color: '#a855f780' },
        { string: 2, fret: 12, label: 'B', color: '#a855f780' },
      ],
      startFret: 6,
      fretCount: 7,
    },
  ]

  const d = diagonals[activeDiag]

  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
        The Three Triad Diagonals are Greene's most elegant invention. Any major triad appears in three
        inversions across the neck, and each inversion traces a diagonal path. Learn these paths in one key
        and you have the entire neck covered. The diagonals are the highway system — everything else is exits.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {diagonals.map((diag, i) => (
          <button
            key={i}
            onClick={() => setActiveDiag(i)}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              border: `1px solid ${activeDiag === i ? diag.color : C.border}`,
              background: activeDiag === i ? `${diag.color}18` : 'transparent',
              color: activeDiag === i ? diag.color : C.muted,
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Diagonal {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start', marginBottom: 20 }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
          <FretDiagram
            startFret={d.startFret}
            fretCount={d.fretCount}
            dots={d.dots}
            showNut={d.startFret === 0}
            showFretNums={true}
            width={160}
          />
        </div>

        <div>
          <p style={{ color: d.color, fontWeight: '700', fontSize: '0.95rem', marginBottom: 8 }}>{d.name}</p>
          <p style={{ color: C.muted, lineHeight: 1.7, marginBottom: 12, fontSize: '0.9rem' }}>{d.desc}</p>
          <div style={{ background: `${d.color}12`, borderRadius: 8, padding: 12, border: `1px solid ${d.color}30` }}>
            <p style={{ color: d.color, fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>G Major Example</p>
            <p style={{ color: C.text, fontSize: '0.85rem', lineHeight: 1.6, margin: 0, fontFamily: 'monospace' }}>{d.example}</p>
          </div>
        </div>
      </div>

      <div style={{ background: `${C.amberDim}18`, border: `1px solid ${C.amberDim}40`, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>The Key Insight</p>
        <p style={{ color: C.text, lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
          The three diagonals together cover every triad position across all string sets. Once you know them in
          G major, you know the shape of every other major key — just shift the root. Greene used these
          diagonals as the spine of V-System chord voicing navigation.
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: Note Names
// ---------------------------------------------------------------------------

// All natural notes on 6 strings, frets 0–12
const ALL_NOTES: Record<number, string[]> = {
  1: ['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E'], // low E
  2: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A'],
  3: ['D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D'],
  4: ['G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G'],
  5: ['B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  6: ['e','f','f#','g','g#','a','a#','b','c','c#','d','d#','e'], // high e
}

const NATURAL_FRETS: Record<number, number[]> = {
  1: [0,1,3,5,7,8,10,12],
  2: [0,2,3,5,7,8,10,12],
  3: [0,2,3,5,7,9,10,12],
  4: [0,2,3,5,7,8,10,12],
  5: [0,1,3,5,6,8,10,12],
  6: [0,1,3,5,7,8,10,12],
}

function NoteNamesTab() {
  const [quizMode, setQuizMode] = useState(false)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [highlight, setHighlight] = useState<string | null>(null)

  const toggleReveal = (key: string) => {
    setRevealed(prev => {
      const s = new Set(prev)
      if (s.has(key)) s.delete(key); else s.add(key)
      return s
    })
  }

  const STRINGS = [1, 2, 3, 4, 5, 6]
  const FRETS = Array.from({ length: 13 }, (_, i) => i)
  const NOTE_NAMES = ['C','D','E','F','G','A','B']

  const noteHighlights = highlight
    ? STRINGS.flatMap(s => FRETS
        .filter(f => ALL_NOTES[s]?.[f]?.toUpperCase().startsWith(highlight))
        .map(f => ({ string: s, fret: f, label: ALL_NOTES[s]?.[f] || '', color: C.amber }))
      )
    : []

  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
        Memorize the natural notes (no sharps/flats) on all six strings. Greene stressed this must
        be memorized, not calculated — the moment you have to think about it, the music stops flowing.
        Start with strings 6 and 1 (they are identical), then 5 and 2.
      </p>

      {/* Note highlight filter */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ color: C.dim, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Highlight a note across all strings:</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {NOTE_NAMES.map(n => (
            <button
              key={n}
              onClick={() => setHighlight(highlight === n ? null : n)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `1px solid ${highlight === n ? C.amber : C.border}`,
                background: highlight === n ? `${C.amber}22` : C.surface,
                color: highlight === n ? C.amber : C.muted,
                fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem',
              }}
            >
              {n}
            </button>
          ))}
          {highlight && (
            <button onClick={() => setHighlight(null)} style={{ padding: '0 12px', borderRadius: 18, border: `1px solid ${C.border}`, background: 'transparent', color: C.dim, cursor: 'pointer', fontSize: '0.8rem' }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Neck diagram with highlights */}
      <div style={{ background: C.surface, borderRadius: 10, padding: 16, marginBottom: 16, overflowX: 'auto' }}>
        <FullNeckDiagram highlights={noteHighlights} width={620} />
      </div>

      {/* Natural notes table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr>
              <th style={{ color: C.dim, textAlign: 'left', padding: '6px 8px', borderBottom: `1px solid ${C.border}` }}>String</th>
              {FRETS.map(f => (
                <th key={f} style={{ color: [3,5,7,9,12].includes(f) ? C.amber : C.dim, textAlign: 'center', padding: '4px 6px', borderBottom: `1px solid ${C.border}`, fontWeight: [3,5,7,9,12].includes(f) ? '700' : '400' }}>
                  {f === 0 ? 'O' : f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map(s => (
              <tr key={s} style={{ borderBottom: `1px solid ${C.border}40` }}>
                <td style={{ color: C.amber, fontWeight: '700', padding: '6px 8px', fontFamily: 'monospace' }}>
                  {STRING_LABELS[s - 1]}
                </td>
                {FRETS.map(f => {
                  const note = ALL_NOTES[s]?.[f] || ''
                  const isNatural = NATURAL_FRETS[s]?.includes(f)
                  const isHighlighted = highlight && note.toUpperCase().startsWith(highlight)
                  return (
                    <td
                      key={f}
                      style={{
                        textAlign: 'center',
                        padding: '5px 4px',
                        color: isHighlighted ? C.amber : isNatural ? C.text : C.dim,
                        fontWeight: isHighlighted ? '700' : isNatural ? '600' : '400',
                        background: isHighlighted ? `${C.amber}15` : 'transparent',
                        fontSize: '0.78rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      {note}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16, background: `${C.amberDim}18`, border: `1px solid ${C.amberDim}40`, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Greene's Memorization Sequence</p>
        <ol style={{ color: C.text, lineHeight: 2, margin: 0, paddingLeft: 18, fontSize: '0.9rem' }}>
          <li>String 6 (low E) — open through 12th fret, natural notes only</li>
          <li>String 1 (high e) — same pattern as string 6</li>
          <li>String 5 (A) — notice B at fret 2, octaves of string 6 names</li>
          <li>String 2 (B) — notice C at fret 1</li>
          <li>Strings 4 (G) and 3 (D) last</li>
          <li>Then add sharps/flats between all naturals</li>
        </ol>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: Exercises
// ---------------------------------------------------------------------------

function ExercisesTab() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const toggle = (k: string) => setCompleted(prev => { const s = new Set(prev); s.has(k) ? s.delete(k) : s.add(k); return s })

  const EXERCISES = [
    {
      category: 'Week 1 — Note Names',
      items: [
        { id: 'e1', title: 'String 6 naturals, open to 12', desc: 'Say each note name aloud as you play: E F G A B C D E. 5 min/day.' },
        { id: 'e2', title: 'String 1 naturals, same pattern', desc: 'Identical to string 6. Confirm they match at every fret.' },
        { id: 'e3', title: 'String 5 naturals', desc: 'A B C D E F G A. Notice B at fret 2, E at fret 7.' },
        { id: 'e4', title: 'String 2 naturals', desc: 'B C D E F G A B. Notice C at fret 1 — no open-string-to-first-fret gap.' },
      ],
    },
    {
      category: 'Week 2 — 5 Areas',
      items: [
        { id: 'e5', title: 'Name the area for each fret', desc: 'For each fret 0–12, say which area(s) it falls in. Do this without the diagram.' },
        { id: 'e6', title: 'Play a G major chord in each area', desc: 'Find a G major voicing in each of the 5 areas. They don\'t have to be full 6-string chords.' },
        { id: 'e7', title: 'Transition exercises', desc: 'Play the same chord across adjacent areas without stopping. Focus on the overlap frets.' },
      ],
    },
    {
      category: 'Week 3 — 7 Positions',
      items: [
        { id: 'e8', title: 'G major scale in Position I', desc: 'Play the full G major scale in Position I (centered at fret 2–5). Ascending and descending.' },
        { id: 'e9', title: 'G major scale in all 7 positions', desc: 'One position per day. Know the root note name on the 6th string for each.' },
        { id: 'e10', title: 'Position naming drill', desc: 'Someone calls out a scale degree (III, V, VII) — you immediately play that position.' },
      ],
    },
    {
      category: 'Week 4 — 3 Triad Diagonals',
      items: [
        { id: 'e11', title: 'G major triads — Diagonal 1 (root position)', desc: 'Play root-position G triads on string sets 6-5-4, then 5-4-3, then 4-3-2, then 3-2-1.' },
        { id: 'e12', title: 'G major triads — Diagonal 2 (1st inversion)', desc: 'Same string sets but 1st inversion shapes. B-D-G, then move up the neck.' },
        { id: 'e13', title: 'G major triads — Diagonal 3 (2nd inversion)', desc: '2nd inversion: D-G-B. Complete the three-diagonal cycle on one string set.' },
        { id: 'e14', title: 'Connect all three diagonals', desc: 'Play all three diagonal paths for G major continuously from fret 0 to fret 12 without stopping.' },
        { id: 'e15', title: 'Apply to C major', desc: 'Shift everything to C major. The shapes are identical — only the starting fret changes.' },
      ],
    },
  ]

  const total = EXERCISES.reduce((n, cat) => n + cat.items.length, 0)
  const done = completed.size

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 6, background: C.surface, borderRadius: 3 }}>
          <div style={{ height: 6, background: C.amber, borderRadius: 3, width: `${(done / total) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <span style={{ color: C.muted, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{done}/{total} complete</span>
      </div>

      {EXERCISES.map(cat => (
        <div key={cat.category} style={{ marginBottom: 24 }}>
          <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            {cat.category}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cat.items.map(item => {
              const done = completed.has(item.id)
              return (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                    background: C.surface, borderRadius: 8,
                    border: `1px solid ${done ? C.amber + '40' : C.border}`,
                    cursor: 'pointer',
                    opacity: done ? 0.7 : 1,
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
                    border: `2px solid ${done ? C.amber : C.dim}`,
                    background: done ? `${C.amber}30` : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && <span style={{ color: C.amber, fontSize: 12 }}>✓</span>}
                  </div>
                  <div>
                    <p style={{ color: done ? C.dim : C.text, fontWeight: '600', margin: 0, marginBottom: 2, fontSize: '0.9rem', textDecoration: done ? 'line-through' : 'none' }}>
                      {item.title}
                    </p>
                    <p style={{ color: C.dim, margin: 0, fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{ background: `${C.amberDim}18`, border: `1px solid ${C.amberDim}40`, borderRadius: 10, padding: 16 }}>
        <p style={{ color: C.amber, fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>When Are You Ready for Stage 2?</p>
        <p style={{ color: C.text, lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
          Greene's criterion: <strong>name any note on any fret of any string in under 2 seconds</strong>.
          Also: given a fret number, immediately name which area(s) it falls in, and which of the 7 positions
          is centered there. When these are automatic — not fast, but <em>automatic</em> — proceed to Stage 2.
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content: Search
// ---------------------------------------------------------------------------

interface SearchResult {
  id: number
  content: string
  content_type: string
  page: number
  similarity: number
  metadata: { title: string; url: string; stage: number; category: string }
}

function SearchTab() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/ted-greene/search?q=${encodeURIComponent(query)}&limit=8&stage=1`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
        Semantic search across all Stage 1 source documents. Results are ranked by
        meaning similarity, not keyword match. Try queries like "how to practice triad shapes"
        or "memorize note names efficiently".
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doSearch()}
          placeholder="Ask anything about Stage 1 content..."
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 8,
            border: `1px solid ${C.border}`, background: C.surface,
            color: C.text, fontSize: '0.9rem', outline: 'none',
          }}
        />
        <button
          onClick={doSearch}
          disabled={loading}
          style={{
            padding: '10px 20px', borderRadius: 8, border: 'none',
            background: C.amber, color: '#fff', fontWeight: '700',
            cursor: loading ? 'wait' : 'pointer', fontSize: '0.9rem',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {loading && (
        <div style={{ color: C.muted, fontSize: '0.9rem' }}>Searching Greene archive...</div>
      )}

      {!loading && searched && results.length === 0 && (
        <div style={{ color: C.muted, fontSize: '0.9rem' }}>No results found. Try a different query.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {results.map(r => (
          <div key={r.id} style={{ background: C.surface, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ color: C.amber, fontWeight: '700', fontSize: '0.85rem' }}>{r.metadata?.title}</span>
              <span style={{ color: C.dim, fontSize: '0.75rem' }}>p.{r.page}</span>
              <span style={{
                marginLeft: 'auto', padding: '2px 8px', borderRadius: 10,
                background: `${C.green}18`, color: C.green, fontSize: '0.72rem', fontWeight: '700',
              }}>
                {(r.similarity * 100).toFixed(0)}% match
              </span>
              {r.content_type === 'vision' && (
                <span style={{ padding: '2px 8px', borderRadius: 10, background: `${C.purple}18`, color: C.purple, fontSize: '0.72rem' }}>
                  OCR
                </span>
              )}
            </div>
            <p style={{
              color: C.muted, fontSize: '0.83rem', lineHeight: 1.65, margin: 0,
              fontFamily: r.content_type === 'vision' ? 'monospace' : 'inherit',
            }}>
              {r.content.length > 400 ? r.content.slice(0, 400) + '…' : r.content}
            </p>
            {r.metadata?.url && (
              <a
                href={r.metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.dim, fontSize: '0.75rem', marginTop: 8, display: 'inline-block', textDecoration: 'none' }}
              >
                → View source PDF ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {!searched && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
          {[
            'how to practice triad diagonals',
            'memorizing note names on all strings',
            'what are the 5 areas of the fingerboard',
            'chord progressions for practice',
            'musical priorities harmony over melody',
            'position theory G major scale',
          ].map(s => (
            <button
              key={s}
              onClick={() => { setQuery(s); }}
              style={{
                padding: '8px 12px', borderRadius: 8,
                border: `1px solid ${C.border}`, background: C.surface,
                color: C.dim, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
              }}
            >
              "{s}"
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root page component
// ---------------------------------------------------------------------------

const STEP_META = [
  { id: 'notes',     label: 'Note Names',           sub: 'Complete the map first' },
  { id: 'areas',     label: '5 Areas',              sub: 'Learn the neighborhoods' },
  { id: 'positions', label: '7 Positions',          sub: 'Find the landmarks' },
  { id: 'diagonals', label: '3 Triad Diagonals',    sub: 'Build the highway system' },
  { id: 'exercises', label: 'Integration',          sub: 'Merge all three maps' },
  { id: 'practice',  label: 'Practice Blueprint',   sub: 'Your daily session structure' },
  { id: 'search',    label: 'Source Documents',     sub: 'Greene\'s original handouts' },
]

export default function Stage1Page() {
  const [activeStep, setActiveStep] = useState('notes')

  const current = STEP_META.find(s => s.id === activeStep) ?? STEP_META[0]
  const currentIndex = STEP_META.findIndex(s => s.id === activeStep)
  const goNext = () => {
    if (currentIndex < STEP_META.length - 1) setActiveStep(STEP_META[currentIndex + 1].id)
  }

  const renderStep = () => {
    switch (activeStep) {
      case 'notes':     return <StepNoteNames onNext={goNext} />
      case 'areas':     return <StepAreas onNext={goNext} />
      case 'positions': return <StepPositions onNext={goNext} />
      case 'diagonals': return <StepDiagonals onNext={goNext} />
      case 'exercises': return <StepIntegration onNext={goNext} />
      case 'practice':  return <StepPracticeBlueprint />
      case 'search':    return <SearchTab />
      default:          return <StepNoteNames onNext={goNext} />
    }
  }

  return (
    <main style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#0a1020', borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Link href="/ted-greene" style={{ color: C.dim, fontSize: '0.82rem', textDecoration: 'none' }}>
              Ted Greene System
            </Link>
            <span style={{ color: C.dim }}>›</span>
            <span style={{ color: C.amber, fontSize: '0.82rem', fontWeight: '600' }}>Stage 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 2, width: 32, background: C.amber, borderRadius: 1, marginBottom: 8 }} />
              <h1 style={{ color: C.text, fontSize: '1.8rem', fontWeight: '700', lineHeight: 1.2, margin: 0 }}>
                Fingerboard Orientation
              </h1>
              <p style={{ color: C.muted, fontSize: '0.9rem', marginTop: 6, marginBottom: 0 }}>
                Master note names → 5 areas → 7 positions → 3 diagonals → integrate
              </p>
            </div>
            <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 20, background: `${C.amber}18`, color: C.amber, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', marginTop: 4 }}>
              Stage 1 of 14
            </span>
          </div>

          {/* Progress dots + download */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {STEP_META.filter(s => s.id !== 'search').map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  title={s.label}
                  style={{
                    width: activeStep === s.id ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: activeStep === s.id ? C.amber : i < currentIndex ? `${C.amber}60` : C.border,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                />
              ))}
            </div>
            <a
              href="/downloads/ted-greene-stage1.pdf"
              download="Ted-Greene-Stage1-Fingerboard-Orientation.pdf"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 8,
                border: `1px solid ${C.amber}50`,
                color: C.amber, fontSize: '0.75rem', fontWeight: '600',
                textDecoration: 'none', fontFamily: 'inherit',
                background: `${C.amber}10`,
                transition: 'background 0.15s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Step navigation */}
      <StepNav active={activeStep} onSelect={setActiveStep} />

      {/* Step heading */}
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 32 }}>
        <p style={{ color: C.dim, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          {activeStep === 'search' ? 'Reference' : `Step ${currentIndex + 1} of 5`}
        </p>
        <h2 style={{ color: C.text, fontSize: '1.4rem', fontWeight: '700', marginBottom: 4 }}>
          {current.label}
        </h2>
        <p style={{ color: C.dim, fontSize: '0.88rem', marginBottom: 32 }}>{current.sub}</p>
      </div>

      {/* Step content */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        {renderStep()}
      </div>
    </main>
  )
}
