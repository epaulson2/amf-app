import Link from 'next/link'

export default function PracticePathLanding() {
  return (
    <div>
      <div className="py-14 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/musical-universe" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors">
            ← Musical Universe
          </Link>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Practice Paths
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Two independent paths — one per Galaxy. Each builds the same skills (segments → closed triads → orbit fluency → voice leading → open voicings) but through the geometry and strengths of its tuning.
          </p>
        </div>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(90deg,#4f46e5 0%,#7c3aed 50%,#0891b2 100%)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <div className="rounded-xl border border-slate-200 p-4 mb-10 text-sm text-slate-600" style={{ background: '#f8fafc' }}>
          <strong className="text-slate-800">Parallel-Galaxy Doctrine:</strong> These are independent paths — not a sequential &ldquo;learn Standard, transfer to DADGAD&rdquo; relationship. Run them in parallel, or start DADGAD first if Standard is already very comfortable. Fluency in each Galaxy is built independently.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Standard card */}
          <Link href="/musical-universe/practice/standard" className="group block rounded-2xl border-2 border-slate-200 hover:border-indigo-400 transition-all overflow-hidden">
            <div className="px-6 py-5" style={{ background: '#4f46e5' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Standard Tuning</p>
              <p className="text-white text-2xl font-extrabold">E–A–D–G–B–E</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">Your home Galaxy</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700">Intermediate</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                You already know this Galaxy. The 5 phases here apply Orbit/Constellation vocabulary to what you already do intuitively — making the implicit explicit and building retrieval speed.
              </p>
              <div className="space-y-1.5 mb-6">
                {[
                  'Phase 1 — Segment Fluency (naming what you already do)',
                  'Phase 2 — Closed Triads, all string sets',
                  'Phase 3 — Orbit Fluency across the neck',
                  'Phase 4 — Anchors + I–IV–V Voice Leading',
                  'Phase 5 — Open Voicings intro',
                ].map((p, i) => (
                  <div key={i} className="text-xs text-slate-500 flex gap-2">
                    <span className="text-indigo-400 shrink-0">◦</span>
                    {p}
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                Begin Standard Path →
              </p>
            </div>
          </Link>

          {/* DADGAD card */}
          <Link href="/musical-universe/practice/dadgad" className="group block rounded-2xl border-2 border-slate-200 hover:border-violet-400 transition-all overflow-hidden">
            <div className="px-6 py-5" style={{ background: '#7c3aed' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-200 mb-1">DADGAD</p>
              <p className="text-white text-2xl font-extrabold">D–A–D–G–A–D</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-violet-100 text-violet-800">New Galaxy</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700">Begin from Phase 0</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                New physical geometry — start from Phase 0 regardless of theory level. Your music theory knowledge is fully intact; only the fretboard map is different. Build independent fluency, not a transfer from Standard.
              </p>
              <div className="space-y-1.5 mb-6">
                {[
                  'Phase 0 — Physical Orientation (open strings, home key)',
                  'Phase 1 — Segment Fluency in DADGAD',
                  'Phase 2 — Closed Triads + D-center open strings',
                  'Phase 3 — Orbit Fluency (3 free Root Orbits on open strings)',
                  'Phase 4 — Anchors + Voice Leading (free open-string Anchors)',
                  'Phase 5 — Open Voicings (DADGAD\'s native language)',
                ].map((p, i) => (
                  <div key={i} className="text-xs text-slate-500 flex gap-2">
                    <span className="text-violet-400 shrink-0">◦</span>
                    {p}
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-violet-600 group-hover:text-violet-800 transition-colors">
                Begin DADGAD Path →
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-slate-200 p-5" style={{ background: '#f8fafc' }}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Shared Scope — Both Paths End Here</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Both paths stop at open voicing introduction and basic I–IV–V voice leading. After completing both, the next chapter covers 7th chord Constellations, extended harmonies, and full Emotional Waypoint mapping — that material is the same across Galaxies.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/musical-universe" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            ← Musical Universe Home
          </Link>
          <Link href="/musical-universe/learn" className="ml-auto text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Review the System →
          </Link>
        </div>
      </div>
    </div>
  )
}
