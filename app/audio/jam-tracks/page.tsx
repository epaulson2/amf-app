import Link from 'next/link'

export default function JamTracksPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-center">
      <div style={{ height: 3, background: 'linear-gradient(90deg,#d97706,#fbbf24)', borderRadius: 2, marginBottom: 32, maxWidth: 200, margin: '0 auto 32px' }} />
      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d97706' }}>Phase 2</p>
      <h1 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '2rem' }}>Jam Tracks</h1>
      <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
        Practice the 14 core progressions in any key with selectable instruments.
        Each jam track connects directly to the sprint&apos;s Gate A harmonic root movement.
      </p>
      <div className="rounded-xl p-6 text-left mx-auto" style={{ background: '#1e293b', maxWidth: 480 }}>
        <p className="text-sm font-bold mb-3" style={{ color: '#d97706' }}>Planned features</p>
        <ul className="space-y-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <li>· All 14 core progressions in any key</li>
          <li>· Key + tempo controls, straight/swing feel</li>
          <li>· Piano, guitar, bass, drum synthesis voices</li>
          <li>· Sprint-aware: loads current sprint&apos;s Gate A progression</li>
          <li>· Sampled instrument sounds in a later update</li>
        </ul>
      </div>
      <Link href="/audio" className="inline-block mt-8 text-sm" style={{ color: '#475569' }}>← Back to Audio Lab</Link>
    </main>
  )
}
