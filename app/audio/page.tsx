import Link from 'next/link'

const modules = [
  {
    href: '/audio/ear-training',
    title: 'Ear Training',
    subtitle: 'Di-Chord Explorer + Drill',
    description: 'Train your ears on the three Plogger sound factors — pulsation, harmonicity, and F/O direction. Drill any sprint\'s focus di-chords until they\'re Stage 3.',
    color: '#7c3aed',
    badge: 'Live',
    badgeColor: '#16a34a',
    icon: '◎',
  },
  {
    href: '/audio/jam-tracks',
    title: 'Jam Tracks',
    subtitle: 'Progression Playback',
    description: 'Practice the 14 core progressions in any key with selectable instruments. Connects directly to each sprint\'s Gate A harmonic root movement.',
    color: '#d97706',
    badge: 'Phase 2',
    badgeColor: '#64748b',
    icon: '♩',
  },
  {
    href: '/audio/rhythm',
    title: 'Rhythm Trainer',
    subtitle: '8-Position Grid + Metronome',
    description: 'Build groove from the binary grid up. Enter patterns, hear them loop, work toward Son Clave. Longy rhythm notation alongside every grid.',
    color: '#dc2626',
    badge: 'Phase 3',
    badgeColor: '#64748b',
    icon: '▪',
  },
  {
    href: '/audio/interval',
    title: 'Interval Trainer',
    subtitle: 'Melodic Recognition',
    description: 'Melodic interval recognition in the Melody Chamber context. Zone-aware prompts connect each interval to its di-chord acoustic fingerprint.',
    color: '#0891b2',
    badge: 'Phase 5',
    badgeColor: '#64748b',
    icon: '↑',
  },
]

export default function AudioLabPage() {
  return (
    <main>
      {/* Hero */}
      <div style={{ background: '#0f172a', borderBottom: '3px solid transparent', backgroundClip: 'padding-box' }}>
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#7c3aed,#d97706,#dc2626,#16a34a)', borderRadius: 2, marginBottom: 32 }} />
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7c3aed' }}>AMF Audio Lab</p>
          <h1 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '2.5rem', lineHeight: 1.15 }}>
            Train Your Ears
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 600 }}>
            Browser-based audio tools built around the Plogger Method. Hear di-chords by their acoustic fingerprint,
            not their names. All four chambers, from day one.
          </p>
        </div>
      </div>

      {/* Module Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map(m => (
            <Link
              key={m.href}
              href={m.href}
              className="block rounded-xl p-6 transition-transform hover:-translate-y-0.5"
              style={{ background: '#1e293b', border: `1px solid rgba(255,255,255,0.06)` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span style={{ fontSize: 28, color: m.color }}>{m.icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${m.badgeColor}22`, color: m.badgeColor }}
                >
                  {m.badge}
                </span>
              </div>
              <h2 className="font-bold mb-0.5" style={{ color: '#f1f5f9', fontSize: '1.2rem' }}>{m.title}</h2>
              <p className="text-xs mb-3 font-medium" style={{ color: m.color }}>{m.subtitle}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.description}</p>
            </Link>
          ))}
        </div>

        {/* Philosophy note */}
        <div className="mt-12 rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid rgba(124,58,237,0.2)' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7c3aed' }}>The Goal</p>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7 }}>
            These tools exist to make the Plogger sound factors perceptually real, not intellectually known.
            You don&apos;t memorize that [3] is &ldquo;4Hz, non-harmonic, refers down.&rdquo; You hear it, feel it, and eventually
            stop needing the label. <strong style={{ color: '#f1f5f9' }}>The framework disappears.</strong>
          </p>
        </div>
      </div>
    </main>
  )
}
