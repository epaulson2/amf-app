'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  getDiChord, useAudioEngine, DEFAULT_MIX, INSTRUMENT_PRESETS, DEFAULT_INSTRUMENT,
  type SoundFactorMix, type InstrumentId,
} from '@/lib/audio'
import FactorPanels from './components/FactorPanels'

const DiChordGrid       = dynamic(() => import('./components/DiChordGrid'),       { ssr: false })
const DrillMode         = dynamic(() => import('./components/DrillMode'),         { ssr: false })
const FactorMixControls = dynamic(() => import('./components/FactorMixControls'), { ssr: false })

type Tab = 'explorer' | 'drill'

export default function EarTrainingPage() {
  const [tab, setTab]                         = useState<Tab>('explorer')
  const [selectedBracket, setSelectedBracket] = useState(3)
  const [rootMidi]                            = useState(57)   // A3
  const [isPlaying, setIsPlaying]             = useState(false)
  const [mix, setMix]                         = useState<SoundFactorMix>(DEFAULT_MIX)
  const [instrumentId, setInstrumentId]       = useState<InstrumentId>(DEFAULT_INSTRUMENT)

  const { isReady, start, synth } = useAudioEngine()
  const dichord = getDiChord(selectedBracket)

  const handleSelect = useCallback(async (bracket: number) => {
    setSelectedBracket(bracket)
    if (isPlaying && synth) {
      // Seamlessly switch to the new di-chord without stopping playback
      await synth.play(bracket, rootMidi, getDiChord(bracket).foDirection, mix)
    } else {
      synth?.stop()
      setIsPlaying(false)
    }
  }, [synth, isPlaying, rootMidi, mix])

  const handlePlay = useCallback(async () => {
    if (!isReady) await start()
    await synth?.play(selectedBracket, rootMidi, getDiChord(selectedBracket).foDirection, mix)
    setIsPlaying(true)
  }, [isReady, start, synth, selectedBracket, rootMidi, mix])

  const handleStop = useCallback(() => {
    synth?.stop()
    setIsPlaying(false)
  }, [synth])

  const handleMixChange = useCallback((newMix: SoundFactorMix) => {
    setMix(newMix)
    synth?.setMix(newMix)
  }, [synth])

  const handleInstrumentChange = useCallback((id: InstrumentId) => {
    setInstrumentId(id)
    synth?.setInstrument(INSTRUMENT_PRESETS[id])
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
                Hear each di-chord through all three Plogger sound factors — mix and isolate each one
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

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {tab === 'explorer' ? (
          <>
            {/* Di-chord selector */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#64748b' }}>Selected</p>
                  <p className="font-bold" style={{ color: '#f1f5f9', fontSize: '1.3rem' }}>
                    [{selectedBracket}] {dichord.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{dichord.feel}</p>
                </div>
                <button
                  onClick={isPlaying ? handleStop : handlePlay}
                  className="rounded-lg font-semibold transition-all"
                  style={{
                    padding: '10px 22px',
                    background: isPlaying ? 'rgba(220,38,38,0.15)' : 'rgba(124,58,237,0.15)',
                    color: isPlaying ? '#f87171' : '#a78bfa',
                    border: `1px solid ${isPlaying ? 'rgba(220,38,38,0.3)' : 'rgba(124,58,237,0.3)'}`,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {!isReady ? 'Tap to enable audio' : isPlaying ? '■ Stop' : `▶ Play [${selectedBracket}]`}
                </button>
              </div>
              <DiChordGrid selected={selectedBracket} onSelect={handleSelect} />
            </div>

            {/* Instrument + Sound Factor Mix */}
            <FactorMixControls
              mix={mix}
              onChange={handleMixChange}
              instrumentId={instrumentId}
              onInstrumentChange={handleInstrumentChange}
            />

            {/* Three factor visualizations */}
            <FactorPanels dichord={dichord} mix={mix} />

            {/* Reference row */}
            <div className="rounded-xl p-4" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Bracket',    value: `[${selectedBracket}]` },
                  { label: 'Semitones',  value: dichord.semitones },
                  { label: 'Pulsation',  value: `${dichord.pulsationHz} Hz` },
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
