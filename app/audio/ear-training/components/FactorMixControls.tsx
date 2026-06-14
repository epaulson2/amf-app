'use client'

import type { SoundFactorMix, InstrumentId, InstrumentPreset } from '@/lib/audio'
import { INSTRUMENT_PRESETS } from '@/lib/audio'

interface FactorMixControlsProps {
  mix: SoundFactorMix
  onChange: (mix: SoundFactorMix) => void
  instrumentId: InstrumentId
  onInstrumentChange: (id: InstrumentId) => void
}

const FACTORS = [
  {
    key: 'pulsation' as keyof SoundFactorMix,
    label: 'Pulsation',
    color: '#dc2626',
    trackColor: 'rgba(220,38,38,0.6)',
    description: 'Amplitude beating rate between the two tones',
    minLabel: 'Masked — short notes, wet reverb',
    maxLabel: 'Exposed — long sustain, dry signal',
    tip: 'Turn up to hear the wave-like wobble. Slow for [5][7], faster for [3][4], fastest for [1][2].',
  },
  {
    key: 'harmonicity' as keyof SoundFactorMix,
    label: 'Harmonicity',
    color: '#7c3aed',
    trackColor: 'rgba(124,58,237,0.6)',
    description: 'Harmonic richness added on top of the instrument timbre',
    minLabel: 'Clean — pure instrument sound',
    maxLabel: 'Rich — saturated with harmonics',
    tip: 'Compare [4] vs [3] with richness up — the open vs closed quality becomes more pronounced.',
  },
  {
    key: 'foFactor' as keyof SoundFactorMix,
    label: 'F/O Factor',
    color: '#0891b2',
    trackColor: 'rgba(8,145,178,0.6)',
    description: 'Shadow direction — which note the interval refers toward',
    minLabel: 'Neutral — no doubling',
    maxLabel: 'Strong — shadow note amplified',
    tip: 'The shadow note (octave below/above the referring note) makes the direction physically audible.',
  },
] as const

const INSTRUMENT_ORDER: InstrumentId[] = ['pad', 'piano', 'guitar', 'strings', 'organ']

export default function FactorMixControls({ mix, onChange, instrumentId, onInstrumentChange }: FactorMixControlsProps) {
  const set = (key: keyof SoundFactorMix, value: number) =>
    onChange({ ...mix, [key]: value })

  return (
    <div className="rounded-xl p-5" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Instrument selector */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#64748b' }}>
          Instrument Voice
        </p>
        <div className="flex gap-2 flex-wrap">
          {INSTRUMENT_ORDER.map(id => {
            const preset: InstrumentPreset = INSTRUMENT_PRESETS[id]
            const active = instrumentId === id
            return (
              <button
                key={id}
                onClick={() => onInstrumentChange(id)}
                className="rounded-lg px-3 py-2 text-sm font-semibold transition-all"
                style={{
                  background: active ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.05)',
                  color: active ? '#a5b4fc' : '#475569',
                  border: `1px solid ${active ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.1)'}`,
                  cursor: 'pointer',
                }}
                title={preset.description}
              >
                <span style={{ marginRight: 4 }}>{preset.icon}</span>
                {preset.label}
              </button>
            )
          })}
        </div>
        <p className="text-xs mt-2" style={{ color: '#334155' }}>
          {INSTRUMENT_PRESETS[instrumentId].description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#64748b' }}>
            Sound Factor Mix
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
            Emphasize or suppress each factor independently
          </p>
        </div>
        <button
          onClick={() => onChange({ pulsation: 5, harmonicity: 3, foFactor: 3 })}
          className="text-xs px-3 py-1 rounded"
          style={{ background: 'rgba(148,163,184,0.1)', color: '#475569', border: '1px solid rgba(148,163,184,0.15)', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>

      {/* Three factor sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FACTORS.map(f => {
          const val = mix[f.key]
          const pct = (val / 10) * 100

          return (
            <div key={f.key}>
              {/* Label + value */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
                  <span className="text-sm font-bold" style={{ color: '#f1f5f9' }}>{f.label}</span>
                </div>
                <div
                  className="text-sm font-bold rounded px-2 py-0.5 tabular-nums"
                  style={{ background: `${f.color}22`, color: f.color, minWidth: 32, textAlign: 'center' }}
                >
                  {val}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs mb-3" style={{ color: '#475569', lineHeight: 1.4 }}>
                {f.description}
              </p>

              {/* Slider track */}
              <div style={{ position: 'relative', marginBottom: 6 }}>
                <div style={{
                  height: 8, borderRadius: 4,
                  background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${f.color}88, ${f.color})`,
                    borderRadius: 4, transition: 'width 0.05s',
                  }} />
                </div>
                <input
                  type="range" min={0} max={10} step={1} value={val}
                  onChange={e => set(f.key, Number(e.target.value))}
                  style={{
                    position: 'absolute', top: -6, left: 0,
                    width: '100%', height: 20,
                    opacity: 0, cursor: 'pointer', margin: 0,
                  }}
                />
                <div style={{
                  position: 'absolute', top: '50%',
                  left: `calc(${pct}% - 8px)`, transform: 'translateY(-50%)',
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#f1f5f9', border: `2px solid ${f.color}`,
                  boxShadow: `0 0 8px ${f.color}66`,
                  pointerEvents: 'none', transition: 'left 0.05s',
                }} />
              </div>

              {/* Min / Max labels */}
              <div className="flex justify-between mb-3">
                <span style={{ fontSize: '0.6rem', color: '#334155', lineHeight: 1.3, maxWidth: '45%' }}>
                  {f.minLabel}
                </span>
                <span style={{ fontSize: '0.6rem', color: '#334155', lineHeight: 1.3, maxWidth: '45%', textAlign: 'right' }}>
                  {f.maxLabel}
                </span>
              </div>

              {/* Tick marks */}
              <div className="flex justify-between px-0.5">
                {Array.from({ length: 11 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 2, height: i % 5 === 0 ? 6 : 3,
                      background: i <= val ? f.color : '#1e293b',
                      borderRadius: 1, transition: 'background 0.1s',
                    }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tip row */}
      <div className="mt-5 rounded-lg px-4 py-3" style={{ background: '#0f172a' }}>
        <p className="text-xs font-bold mb-1" style={{ color: '#475569' }}>Experiment tips</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {FACTORS.map(f => (
            <p key={f.key} style={{ fontSize: '0.7rem', color: '#334155', lineHeight: 1.5 }}>
              <span style={{ color: f.color, fontWeight: 700 }}>{f.label}:</span> {f.tip}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
