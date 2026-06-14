import Link from 'next/link'

export default function IntervalPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-center">
      <div style={{ height: 3, background: 'linear-gradient(90deg,#0891b2,#38bdf8)', borderRadius: 2, marginBottom: 32, maxWidth: 200, margin: '0 auto 32px' }} />
      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0891b2' }}>Phase 5</p>
      <h1 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '2rem' }}>Interval Trainer</h1>
      <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
        Melodic interval recognition in the Melody Chamber context. Zone-aware prompts
        connect each interval to its di-chord acoustic fingerprint.
      </p>
      <div className="rounded-xl p-6 text-left mx-auto" style={{ background: '#1e293b', maxWidth: 480 }}>
        <p className="text-sm font-bold mb-3" style={{ color: '#0891b2' }}>Planned features</p>
        <ul className="space-y-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <li>· Ascending and descending melodic intervals</li>
          <li>· Zone-aware: &quot;This is a Zone 1 note over Am — hear the root?&quot;</li>
          <li>· Links each melodic interval to its harmonic di-chord identity</li>
          <li>· Anchor song context: hear intervals in real music</li>
          <li>· Bridges Melody Chamber with the Musical OS</li>
        </ul>
      </div>
      <Link href="/audio" className="inline-block mt-8 text-sm" style={{ color: '#475569' }}>← Back to Audio Lab</Link>
    </main>
  )
}
