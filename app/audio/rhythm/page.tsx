import Link from 'next/link'

export default function RhythmPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-center">
      <div style={{ height: 3, background: 'linear-gradient(90deg,#dc2626,#f87171)', borderRadius: 2, marginBottom: 32, maxWidth: 200, margin: '0 auto 32px' }} />
      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#dc2626' }}>Phase 3</p>
      <h1 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '2rem' }}>Rhythm Trainer</h1>
      <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
        Build groove from the binary grid up. Enter patterns, hear them loop,
        and work toward Son Clave. Longy rhythm notation alongside every grid.
      </p>
      <div className="rounded-xl p-6 text-left mx-auto" style={{ background: '#1e293b', maxWidth: 480 }}>
        <p className="text-sm font-bold mb-3" style={{ color: '#dc2626' }}>Planned features</p>
        <ul className="space-y-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <li>· 8-position binary grid, clickable positions</li>
          <li>· Loop playback with metronome + subdivisions</li>
          <li>· Longy rhythm notation (ta, ta-te, ta-te-te-te)</li>
          <li>· Son Clave spiral thread — built toward over sprints</li>
          <li>· Stops and anticipations drill</li>
        </ul>
      </div>
      <Link href="/audio" className="inline-block mt-8 text-sm" style={{ color: '#475569' }}>← Back to Audio Lab</Link>
    </main>
  )
}
