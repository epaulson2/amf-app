'use client'

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'
import { DiChordSynth } from './DiChordSynth'

interface AudioEngineCtx {
  isReady: boolean
  start: () => Promise<void>
  synth: DiChordSynth | null
}

const AudioEngineContext = createContext<AudioEngineCtx>({
  isReady: false,
  start: async () => {},
  synth: null,
})

export function AudioEngineProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const synthRef = useRef<DiChordSynth | null>(null)
  const [, forceUpdate] = useState(0)

  const start = async () => {
    if (isReady) return
    const Tone = await import('tone')
    await Tone.start()
    if (!synthRef.current) {
      const s = new DiChordSynth()
      await s.init()
      synthRef.current = s
      forceUpdate(n => n + 1)
    }
    setIsReady(true)
  }

  useEffect(() => {
    return () => {
      synthRef.current?.dispose()
    }
  }, [])

  return (
    <AudioEngineContext.Provider value={{ isReady, start, synth: synthRef.current }}>
      {children}
    </AudioEngineContext.Provider>
  )
}

export function useAudioEngine() {
  return useContext(AudioEngineContext)
}
