import Link from 'next/link'

export default function MusicalUniversePage() {
  return (
    <div>
      {/* Hero */}
      <div className="py-20 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#a78bfa' }}>
            AMF · Guitar Navigation System
          </p>
          <h1 className="text-white text-5xl sm:text-6xl font-extrabold tracking-tight mb-5">
            The Musical Universe<br />
            <span style={{ color: '#a78bfa' }}>Standard + DADGAD</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A spatial, emotional, and navigational framework for the guitar fretboard — built to run two tunings in parallel from day one.
          </p>
          <p className="text-slate-500 text-sm max-w-xl mx-auto italic">
            Assumes intermediate Standard tuning fluency. DADGAD treated as a parallel galaxy — new terrain, same theory depth.
          </p>
        </div>
      </div>

      {/* Gradient rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 50%,#0891b2 100%)' }} />

      {/* Two-card nav */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Hero SVG — Parallel Galaxies */}
        <div className="flex justify-center mb-10 sm:col-span-2">
          <svg viewBox="0 0 360 160" className="w-full max-w-lg" aria-label="Standard and DADGAD as parallel galaxies">
            <defs>
              <radialGradient id="gal-standard" cx="35%" cy="50%">
                <stop offset="0%" stopColor="oklch(0.75 0.18 55)" stopOpacity="0.35" />
                <stop offset="60%" stopColor="oklch(0.60 0.15 25)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="oklch(0.60 0.15 25)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gal-dadgad" cx="65%" cy="50%">
                <stop offset="0%" stopColor="oklch(0.65 0.18 280)" stopOpacity="0.35" />
                <stop offset="60%" stopColor="oklch(0.55 0.15 260)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="oklch(0.55 0.15 260)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Galaxy halos */}
            <ellipse cx="120" cy="80" rx="95" ry="60" fill="url(#gal-standard)" />
            <ellipse cx="240" cy="80" rx="95" ry="60" fill="url(#gal-dadgad)" />
            {/* Bridge */}
            <line x1="175" y1="80" x2="205" y2="80" stroke="oklch(0.50 0 0)" strokeWidth="1" strokeDasharray="4 3" />
            {/* Standard core */}
            <circle cx="120" cy="80" r="12" fill="oklch(0.75 0.18 55)" opacity="0.9" />
            <text x="120" y="84" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="700" fill="white">STD</text>
            {/* Standard orbits */}
            <ellipse cx="120" cy="80" rx="38" ry="18" fill="none" stroke="oklch(0.65 0.18 55)" strokeWidth="1" opacity="0.5" />
            <ellipse cx="120" cy="80" rx="60" ry="28" fill="none" stroke="oklch(0.60 0.15 25)" strokeWidth="0.8" opacity="0.3" />
            {/* Orbit dots — standard */}
            <circle cx="158" cy="80" r="3" fill="oklch(0.75 0.18 55)" opacity="0.8" />
            <circle cx="120" cy="62" r="2.5" fill="oklch(0.70 0.15 25)" opacity="0.7" />
            <circle cx="82" cy="80" r="3" fill="oklch(0.65 0.18 55)" opacity="0.6" />
            {/* DADGAD core */}
            <circle cx="240" cy="80" r="12" fill="oklch(0.65 0.18 280)" opacity="0.9" />
            <text x="240" y="84" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="700" fill="white">DAD</text>
            {/* DADGAD orbits */}
            <ellipse cx="240" cy="80" rx="38" ry="18" fill="none" stroke="oklch(0.55 0.18 280)" strokeWidth="1" opacity="0.5" />
            <ellipse cx="240" cy="80" rx="60" ry="28" fill="none" stroke="oklch(0.50 0.15 260)" strokeWidth="0.8" opacity="0.3" />
            {/* Orbit dots — DADGAD */}
            <circle cx="278" cy="80" r="3" fill="oklch(0.65 0.18 280)" opacity="0.8" />
            <circle cx="240" cy="62" r="2.5" fill="oklch(0.55 0.15 260)" opacity="0.7" />
            <circle cx="202" cy="80" r="3" fill="oklch(0.60 0.18 280)" opacity="0.6" />
            {/* Labels */}
            <text x="120" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.65 0.18 55)">Standard</text>
            <text x="240" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.55 0.18 280)">DADGAD</text>
            <text x="180" y="148" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="oklch(0.40 0 0)">Parallel-Galaxy Doctrine — trained simultaneously, never sequentially</text>
          </svg>
        </div>

        <Link
          href="/musical-universe/learn"
          className="group rounded-2xl border border-violet-200 hover:border-violet-400 p-8 transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)' }}
        >
          <div className="text-3xl mb-4">🔭</div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: '#5b21b6' }}>
            Learn the System →
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Zoom hierarchy, key vocabulary, the Parallel-Galaxy Doctrine, Orbit geometry, Emotional Coordinates, and how the Musical Universe connects to Plogger&apos;s acoustic theory.
          </p>
          <p className="text-xs mt-4 font-semibold" style={{ color: '#7c3aed' }}>
            Conceptual reference · Framework deep-dive
          </p>
        </Link>

        <Link
          href="/musical-universe/practice"
          className="group rounded-2xl border border-cyan-200 hover:border-cyan-400 p-8 transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#ecfeff 0%,#cffafe 100%)' }}
        >
          <div className="text-3xl mb-4">🎸</div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: '#0e7490' }}>
            Practice Path →
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Step-by-step from DADGAD orientation through closed triad mastery, orbit fluency, and voice leading on I–IV–V changes. Parallel Standard + DADGAD throughout.
          </p>
          <p className="text-xs mt-4 font-semibold" style={{ color: '#0891b2' }}>
            6 phases · Mastery-gated · Stops at triads + basic voice leading
          </p>
        </Link>
      </div>

      {/* Resource guides */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Tuning Reference Guides</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/musical-universe/resources/dadgad"
            className="rounded-xl border border-violet-200 hover:border-violet-400 p-5 transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg,#faf5ff 0%,#ede9fe 100%)' }}
          >
            <p className="font-extrabold text-sm mb-1" style={{ color: '#5b21b6' }}>DADGAD Guide →</p>
            <p className="text-xs text-slate-500 leading-relaxed">String map, diatonic + pentatonic cycles, closed triad shapes for all 4 string groups.</p>
          </Link>
          <div className="rounded-xl border border-slate-200 p-5 opacity-50" style={{ background: '#f8fafc' }}>
            <p className="font-extrabold text-sm mb-1 text-slate-500">Standard Guide</p>
            <p className="text-xs text-slate-400 leading-relaxed">Coming soon — same reference format for Standard tuning.</p>
          </div>
        </div>
      </div>

      {/* Scope note */}
      <div className="border-t border-slate-200 py-10 px-4 sm:px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#64748b' }}>Current Scope</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-green-200 p-4" style={{ background: '#f0fdf4' }}>
              <p className="font-bold text-green-800 mb-1">In Scope ✓</p>
              <ul className="text-green-700 space-y-1 text-xs leading-relaxed">
                <li>Standard tuning (existing fluency)</li>
                <li>DADGAD from scratch</li>
                <li>Closed triads in all positions</li>
                <li>Open triad voicings</li>
                <li>I–IV–V voice leading with Anchors</li>
                <li>Emotional navigation basics</li>
              </ul>
            </div>
            <div className="rounded-xl border border-amber-200 p-4" style={{ background: '#fffbeb' }}>
              <p className="font-bold text-amber-800 mb-1">Next Phase ◷</p>
              <ul className="text-amber-700 space-y-1 text-xs leading-relaxed">
                <li>7th chord Constellations</li>
                <li>Extended harmonies</li>
                <li>Modal Galaxies beyond major</li>
                <li>Full Emotional Waypoint mapping</li>
                <li>DADGAD rhythm integration</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 p-4" style={{ background: '#f1f5f9' }}>
              <p className="font-bold text-slate-700 mb-1">Plogger Bridge ◈</p>
              <ul className="text-slate-600 space-y-1 text-xs leading-relaxed">
                <li>Harmonicity → note color roles</li>
                <li>Pulsation → voicing texture</li>
                <li>Di-chord numbers → Orbit labels</li>
                <li>F/O → resolution direction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
