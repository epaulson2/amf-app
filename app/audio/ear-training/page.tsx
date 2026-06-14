'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { DICHORDS, getDiChord, useAudioEngine, type Timbre } from '@/lib/audio'
import PlayButton from '@/components/audio/PlayButton'
import FactorPanels from './components/FactorPanels'

const DiChordGrid = dynamic(() => import('./components/DiChordGrid'), { ssr: false })
const DrillMode   = dynamic(() => import('./components/DrillMode'),   { ssr: false })

type Tab = 'explorer' | 'drill'

export default function EarTrainingPage() {
  const [tab, setTab] = useState<Tab>('explorer')
  const [selectedBracket, setSelectedBracket] = useState(3)
  const [timbre, setTimbre] = useState<Timbre>('sine')
  const [rootMidi] = useState(57)  // A3
  const [isPlaying, setIsPlaying] = useState(false)

  const { synth } = useAudioEngine()
  const dichord = getDiChord(selectedBracket)

  const handleSelect = useCallback((bracket: number) => {
    setSelectedBracket(bracket)
    setIsPlaying(false)
    synth?.stop()
  }, [synth])

  const handlePlay = useCallback(async () => {
    await synth?.play(selectedBracket, rootMidi, timbre)
    setIsPlaying(true)
  }, [synth, selectedBracket, rootMidi, timbre])

  const handleStop = useCallback(() => {
    synth?.stop()
    setIsPlaying(false)
  }, [synth])

  const handleTimbreChange = useCallback((t: Timbre) => {
    setTimbre(t)
    synth?.setTimbre(t)
  }, [synth])

  return (
    <main>
      {/* Header */}
      <div style={{ background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-6">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#7c3aed,#a78bfa)', borderRadius: 2, marginBottom: 20 }} />
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#7c3aed' }}>
                AMF Audio Lab · Ear Training
              </p>
              <h1 className="font-bold" style={{ color: '#f1f5f9', fontSize: '1.8rem', lineHeight: 1.2 }}>
                Di-Chord Explorer
              </h1>
              <p className="mt-1" style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Hear each di-chord through all three Plogger sound factors simultaneously
              </p>
            </div>
            <div className="flex gap-1 rounded-lg p-1" style={{ background: '#1e293b' }}>
              {(['explorer', 'drill'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="rounded-md px-4 py-2 text-sm font-semibold capitalize transition-all"
                  style={{
                    background: tab === t ? '#7c3aed' : 'transparent',
                    color: tab === t ? '#fff' : '#64748b',
                    cursor: 'pointer',
                  }}
                >
                  {t === 'explorer' ? '◎ Explorer' : '▷ Drill'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {tab === 'explorer' ? (
          <>
            {/* Di-chord selector + play */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#64748b' }}>Selected</p>
                  <p className="font-bold" style={{ color: '#f1f5f9', fontSize: '1.3rem' }}>
                    [{selectedBracket}] {dichord.name}
                  </p>
                </div>
                <PlayButton
                  bracket={selectedBracket}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  onStop={handleStop}
                  size="md"
                />
              </div>
              <DiChordGrid selected={selectedBracket} onSelect={handleSelect} />
            </div>

            {/* Three factor panels */}
            <FactorPanels
              dichord={dichord}
              timbre={timbre}
              onTimbreChange={handleTimbreChange}
            />

            {/* Reference row */}
            <div className="rounded-xl p-4" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Bracket', value: `[${selectedBracket}]` },
                  { label: 'Semitones', value: dichord.semitones },
                  { label: 'Pulsation', value: `${dichord.pulsationHz} Hz` },
                  { label: 'F/O Shadow', value: dichord.foDirection === 'down' ? '↓ Down' : dichord.foDirection === 'up' ? '↑ Up' : '↕ Both' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="font-bold text-lg" style={{ color: '#f1f5f9' }}>{item.value}</div>
                    <div className="text-xs" style={{ color: '#475569' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <DrillMode sprint={1} />
        )}
      </div>
    </main>
  )
}
