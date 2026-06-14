import { AudioEngineProvider } from '@/lib/audio'

export default function AudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <AudioEngineProvider>
      <div style={{ background: '#0f172a', minHeight: '100vh' }}>
        {children}
      </div>
    </AudioEngineProvider>
  )
}
