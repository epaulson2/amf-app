'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface AlphaTabViewerProps {
  alphaTex: string
  title?: string
  height?: number
  enablePlayer?: boolean
}

export default function AlphaTabViewer({ alphaTex, title, height = 420, enablePlayer = false }: AlphaTabViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<unknown>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [playerReady, setPlayerReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMs, setCurrentMs] = useState(0)
  const [totalMs, setTotalMs] = useState(0)

  const handlePlayPause = useCallback(() => {
    const api = apiRef.current as { playPause?: () => void } | null
    api?.playPause?.()
  }, [])

  const handleStop = useCallback(() => {
    const api = apiRef.current as { stop?: () => void } | null
    api?.stop?.()
    setIsPlaying(false)
    setCurrentMs(0)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !alphaTex) return

    let cancelled = false
    setPlayerReady(false)
    setIsPlaying(false)
    setCurrentMs(0)
    setTotalMs(0)

    async function init() {
      try {
        const at = await import('@coderline/alphatab')
        if (cancelled || !containerRef.current) return

        if (apiRef.current) {
          try { (apiRef.current as { destroy?: () => void }).destroy?.() } catch { /* */ }
          apiRef.current = null
        }

        const settings = new at.Settings()
        settings.core.engine = 'svg'
        settings.core.logLevel = at.LogLevel.None
        settings.core.fontDirectory = `${window.location.origin}/font/`
        settings.display.layoutMode = at.LayoutMode.Page
        settings.display.staveProfile = at.StaveProfile.ScoreTab
        settings.player.enablePlayer = enablePlayer
        if (enablePlayer) {
          settings.player.soundFont = `${window.location.origin}/sonivox.sf2`
        }

        const api = new at.AlphaTabApi(containerRef.current, settings)
        apiRef.current = api

        api.renderStarted.on(() => { if (!cancelled) setLoading(true) })
        api.renderFinished.on(() => { if (!cancelled) setLoading(false) })
        api.error.on((e: unknown) => {
          if (!cancelled) {
            const err = e as { message?: string; cause?: { toString?: () => string } }
            const innerDetail = err?.cause?.toString?.() ?? ''
            console.error('[AlphaTab error]', err?.message, '\n[inner]', innerDetail)
            const msg = innerDetail || err?.message || 'Render error'
            setError(msg)
          }
        })

        if (enablePlayer) {
          api.soundFontLoaded.on(() => { if (!cancelled) setPlayerReady(true) })
          api.playerStateChanged.on((args: { state: number }) => {
            if (!cancelled) setIsPlaying(args.state === 1)
          })
          api.playerPositionChanged.on((args: { currentTime: number; endTime: number }) => {
            if (!cancelled) {
              setCurrentMs(args.currentTime)
              setTotalMs(args.endTime)
            }
          })
          api.playerFinished.on(() => {
            if (!cancelled) { setIsPlaying(false); setCurrentMs(0) }
          })
        }

        api.tex(alphaTex)
      } catch (e) {
        if (!cancelled) {
          console.error('[AlphaTab init error]', e)
          setError(e instanceof Error ? e.message : 'Failed to load alphaTab')
          setLoading(false)
        }
      }
    }

    init()

    return () => {
      cancelled = true
      try { (apiRef.current as { destroy?: () => void })?.destroy?.() } catch { /* */ }
      apiRef.current = null
    }
  }, [alphaTex, enablePlayer])

  const pct = totalMs > 0 ? Math.min((currentMs / totalMs) * 100, 100) : 0
  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  return (
    <div>
      {title && (
        <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.05em' }}>
          {title}
        </div>
      )}

      {enablePlayer && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
          background: '#1e293b', borderRadius: '8px 8px 0 0', borderBottom: '1px solid #334155',
        }}>
          <button
            onClick={handlePlayPause}
            disabled={!playerReady || loading}
            style={{
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: playerReady && !loading ? 'pointer' : 'not-allowed',
              background: playerReady && !loading ? '#7c3aed' : '#334155', color: '#fff', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={handleStop}
            disabled={!playerReady || loading}
            style={{
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: playerReady && !loading ? 'pointer' : 'not-allowed',
              background: '#334155', color: '#fff', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            ■
          </button>

          <div style={{ flex: 1, position: 'relative', height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: '#7c3aed', borderRadius: 3, transition: 'width 0.1s linear' }} />
          </div>

          <span style={{ fontSize: 11, color: '#64748b', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
            {fmt(currentMs)} / {fmt(totalMs)}
          </span>

          {!playerReady && (
            <span style={{ fontSize: 11, color: '#475569' }}>Loading soundfont…</span>
          )}
        </div>
      )}

      <div style={{ position: 'relative', minHeight: height, background: '#fff', borderRadius: enablePlayer ? '0 0 8px 8px' : 8, overflow: 'hidden' }}>
        {loading && !error && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f8fafc', color: '#64748b', fontSize: 13,
          }}>
            Rendering notation…
          </div>
        )}
        {error && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#fef2f2', color: '#dc2626', fontSize: 13, padding: 16, textAlign: 'center',
          }}>
            {error}
          </div>
        )}
        <div ref={containerRef} style={{ minHeight: height }} />
      </div>
    </div>
  )
}
