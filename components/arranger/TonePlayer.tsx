'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import type { Arrangement } from '@/lib/arranger'

interface TonePlayerProps {
  arrangement: Arrangement | null
  onBeat?: (beat: number) => void
  onPlayStateChange?: (playing: boolean) => void
}

export default function TonePlayer({ arrangement, onPlayStateChange }: TonePlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const synthRef = useRef<import('tone').PolySynth | null>(null)
  const partRef = useRef<import('tone').Part | null>(null)

  useEffect(() => {
    let cancelled = false
    import('tone').then(Tone => {
      if (cancelled) return
      // Plucked string character: fast attack, exponential decay to near-zero,
      // mix of harmonics via a fatsawtooth oscillator through a lowpass filter.
      const filter = new Tone.Filter({ type: 'lowpass', frequency: 3200, Q: 1 }).toDestination()
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 2, spread: 12 },
        envelope: { attack: 0.005, decay: 0.6, sustain: 0.0, release: 0.8 },
      }).connect(filter)
      setLoaded(true)
    })
    return () => { cancelled = true }
  }, [])

  const stop = useCallback(async () => {
    const Tone = await import('tone')
    Tone.getTransport().stop()
    Tone.getTransport().cancel()
    partRef.current?.dispose()
    partRef.current = null
    setPlaying(false)
    onPlayStateChange?.(false)
  }, [onPlayStateChange])

  const play = useCallback(async () => {
    if (!arrangement || !synthRef.current) return
    const Tone = await import('tone')

    await stop()
    await Tone.start()

    const transport = Tone.getTransport()
    transport.bpm.value = arrangement.tempo

    const events = arrangement.guitarNotes.map(n => ({
      time: `${Math.floor(n.startBeat)}:${((n.startBeat % 1) * 4).toFixed(0)}`,
      pitch: n.pitch,
      dur: n.durationBeats,
    }))

    const synth = synthRef.current
    const part = new Tone.Part((time, ev: { pitch: number; dur: number }) => {
      const freq = Tone.Frequency(ev.pitch, 'midi').toFrequency()
      const durSec = (ev.dur / arrangement.tempo) * 60
      synth.triggerAttackRelease(freq, durSec, time)
    }, events)

    part.start(0)
    partRef.current = part

    transport.start()
    setPlaying(true)
    onPlayStateChange?.(true)

    const totalBeats = Math.max(...arrangement.guitarNotes.map(n => n.startBeat + n.durationBeats), 1)
    const totalSec = (totalBeats / arrangement.tempo) * 60
    setTimeout(() => {
      transport.stop()
      transport.cancel()
      setPlaying(false)
      onPlayStateChange?.(false)
    }, (totalSec + 0.5) * 1000)
  }, [arrangement, stop])

  if (!loaded) return null

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {!playing ? (
        <button
          onClick={play}
          disabled={!arrangement}
          title="Play arrangement"
          style={{
            padding: '5px 14px', borderRadius: 6, border: 'none',
            background: arrangement ? '#16a34a' : '#1e293b',
            color: arrangement ? '#fff' : '#475569',
            fontSize: 13, cursor: arrangement ? 'pointer' : 'not-allowed',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          ▶ Play
        </button>
      ) : (
        <button
          onClick={stop}
          title="Stop playback"
          style={{
            padding: '5px 14px', borderRadius: 6, border: 'none',
            background: '#dc2626', color: '#fff',
            fontSize: 13, cursor: 'pointer', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          ■ Stop
        </button>
      )}
    </div>
  )
}
