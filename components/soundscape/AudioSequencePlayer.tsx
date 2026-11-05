'use client'
import { useEffect, useRef, useState } from 'react'
import { playSequence } from '@/lib/soundscape/audio'
import { noteList, type NoteEvent, type Patch } from '@/lib/soundscape/fixtures'

export type PlayerClip = { id: string; label: string; events: NoteEvent[]; patch: Patch }

/** Original, user-click audio. One clip at a time; Stop (and unmount/hide) fully cleans up. */
export default function AudioSequencePlayer({ clips, title }: { clips: PlayerClip[]; title: string }) {
  const [playing, setPlaying] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const handle = useRef<{ stop: () => void } | null>(null)

  const stop = () => {
    handle.current?.stop()
  }
  useEffect(() => {
    const hide = () => { if (document.hidden) handle.current?.stop() }
    document.addEventListener('visibilitychange', hide)
    return () => {
      document.removeEventListener('visibilitychange', hide)
      handle.current?.stop()
      handle.current = null
    }
  }, [])

  function play(c: PlayerClip) {
    handle.current?.stop()
    setMsg('')
    try {
      const h = playSequence(c.events, c.patch, () => {
        if (handle.current === h) {
          handle.current = null
          setPlaying(null)
          setMsg('Finished.')
        }
      })
      handle.current = h
      setPlaying(c.id)
      setMsg(`Playing: ${c.label}`)
    } catch {
      setPlaying(null)
      setMsg('Sound is not available here. Use the note list below on your own keyboard.')
    }
  }

  return (
    <section aria-label={title} className="sp-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-slate-900 m-0 mb-1">{title}</h3>
      <p className="sp-muted text-sm mt-0 mb-3">Sound plays only when you press a button. Keep your volume low to start.</p>
      <div className="flex flex-wrap gap-3">
        {clips.map(c => (
          <button key={c.id} type="button" className="sp-btn" onClick={() => play(c)} aria-pressed={playing === c.id}>
            {playing === c.id ? '▶ ' : ''}{c.label}
          </button>
        ))}
        <button type="button" className="sp-btn sp-btn--ghost" onClick={stop} disabled={!playing}>Stop sound</button>
      </div>
      <p role="status" aria-live="polite" className="text-sm sp-muted mt-3 mb-0 min-h-[1.5rem]">{msg}</p>
      <details className="mt-2">
        <summary className="cursor-pointer text-sm font-medium min-h-[44px] flex items-center">Note list (text version of every clip)</summary>
        <div className="text-sm">
          {clips.map(c => (
            <div key={c.id} className="mt-2">
              <p className="font-semibold m-0">{c.label}</p>
              <ul className="m-0 pl-5 list-disc">{noteList(c.events).map((l, i) => <li key={i}>{l}</li>)}</ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}
