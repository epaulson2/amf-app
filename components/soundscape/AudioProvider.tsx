'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { playSequence } from '@/lib/soundscape/audio'
import type { NoteEvent, Patch } from '@/lib/soundscape/fixtures'
import { LESSON_PATCH } from '@/lib/soundscape/week1/fixtures'

type Ctx = { play: (id: string, events: NoteEvent[], status: string, patch?: Patch) => void; stop: () => void; playing: string | null; status: string }
const AudioCtx = createContext<Ctx | null>(null)

/** One audio voice-set for a lesson: starting any clip stops the previous one; Stop, hide and unmount clean up. */
export function AudioProvider({ children }: { children: ReactNode }) {
  const handle = useRef<{ stop: () => void } | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const stopped = useRef(false)

  const stop = useCallback(() => { stopped.current = true; handle.current?.stop() }, [])
  const play = useCallback((id: string, events: NoteEvent[], msg: string, patch: Patch = LESSON_PATCH) => {
    handle.current?.stop()
    stopped.current = false
    try {
      const h = playSequence(events, patch, () => {
        if (handle.current === h) { handle.current = null; setPlaying(null); setStatus(stopped.current ? 'Stopped.' : 'Finished.') }
      })
      handle.current = h
      setPlaying(id)
      setStatus(msg)
    } catch {
      setPlaying(null)
      setStatus('Sound is not available here. Use the note lists on this page with your own keyboard or DAW.')
    }
  }, [])

  useEffect(() => {
    const hide = () => { if (document.hidden) handle.current?.stop() }
    document.addEventListener('visibilitychange', hide)
    return () => {
      document.removeEventListener('visibilitychange', hide)
      handle.current?.stop()
      handle.current = null
    }
  }, [])

  const value = useMemo(() => ({ play, stop, playing, status }), [play, stop, playing, status])
  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

export function useAudio(): Ctx {
  const c = useContext(AudioCtx)
  if (!c) throw new Error('AudioProvider missing')
  return c
}

/** A user-click button that plays one fixture. */
export function ClipButton({ id, label, events, status, onPlayed, ghost }: { id: string; label: string; events: NoteEvent[]; status: string; onPlayed?: () => void; ghost?: boolean }) {
  const a = useAudio()
  return (
    <button type="button" className={`sp-btn${ghost ? ' sp-btn--ghost' : ''}`} aria-pressed={a.playing === id} onClick={() => { a.play(id, events, status); onPlayed?.() }}>
      {a.playing === id ? '▶ ' : ''}{label}
    </button>
  )
}

export function StopButton() {
  const a = useAudio()
  return <button type="button" className="sp-btn sp-btn--ghost" onClick={a.stop} disabled={!a.playing}>Stop sound</button>
}

/** One polite live region for the whole lesson. */
export function NowPlaying() {
  const a = useAudio()
  return <p role="status" aria-live="polite" className="text-sm sp-muted m-0 min-h-[1.5rem]">{a.status}</p>
}

export const useNote = () => {
  const a = useAudio()
  return (midi: number, status: string) => a.play(`note-${midi}`, [{ midi, start: 0, dur: 1.2, role: 'melody' }], status)
}
