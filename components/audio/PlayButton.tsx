'use client'

import { useAudioEngine } from '@/lib/audio'

interface PlayButtonProps {
  bracket: number
  isPlaying: boolean
  onPlay: () => void
  onStop: () => void
  size?: 'sm' | 'md' | 'lg'
}

export default function PlayButton({ bracket, isPlaying, onPlay, onStop, size = 'md' }: PlayButtonProps) {
  const { isReady, start } = useAudioEngine()

  const handleClick = async () => {
    if (!isReady) {
      await start()
      onPlay()
      return
    }
    if (isPlaying) {
      onStop()
    } else {
      onPlay()
    }
  }

  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: '0.8rem' },
    md: { padding: '10px 22px', fontSize: '0.9rem' },
    lg: { padding: '14px 32px', fontSize: '1rem' },
  }

  const label = !isReady
    ? 'Tap to enable audio'
    : isPlaying
    ? `■ Stop`
    : `▶ Play [${bracket}]`

  return (
    <button
      onClick={handleClick}
      className="rounded-lg font-semibold transition-all"
      style={{
        ...sizeStyles[size],
        background: isPlaying ? 'rgba(220,38,38,0.15)' : 'rgba(124,58,237,0.15)',
        color: isPlaying ? '#f87171' : '#a78bfa',
        border: `1px solid ${isPlaying ? 'rgba(220,38,38,0.3)' : 'rgba(124,58,237,0.3)'}`,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}
