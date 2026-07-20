import Link from 'next/link'

function Section({ id, title, accent, children }: { id: string; title: string; accent: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-8">
      <h2 className="text-xl font-extrabold mb-4 pb-2 border-b" style={{ color: accent, borderColor: accent + '40' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Callout({ type, children }: { type: 'plogger' | 'doctrine' | 'note'; children: React.ReactNode }) {
  const styles = {
    plogger: { bg: '#fef3c7', border: '#d97706', label: '◈ Plogger Connection', color: '#92400e' },
    doctrine: { bg: '#ede9fe', border: '#7c3aed', label: '⟳ Doctrine', color: '#5b21b6' },
    note:     { bg: '#f0f9ff', border: '#0284c7', label: '◆ Note', color: '#0c4a6e' },
  }
  const s = styles[type]
  return (
    <div className="rounded-xl border-l-4 p-4 mb-4 text-sm" style={{ background: s.bg, borderColor: s.border }}>
      <p className="font-bold mb-1 text-xs uppercase tracking-wider" style={{ color: s.color }}>{s.label}</p>
      <div style={{ color: s.color }}>{children}</div>
    </div>
  )
}

function Term({ term, def }: { term: string; def: string }) {
  return (
    <div className="py-3 border-b border-slate-100 last:border-0 grid grid-cols-[160px_1fr] gap-4">
      <span className="font-bold text-sm text-slate-800">{term}</span>
      <span className="text-sm text-slate-600 leading-relaxed">{def}</span>
    </div>
  )
}

export default function MusicalUniverseLearnPage() {
  return (
    <div>
      {/* Header */}
      <div className="py-14 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/musical-universe" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors">
            ← Musical Universe
          </Link>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Learn the System
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            The conceptual framework behind the Musical Universe — how to think about the fretboard as navigable space, not memorized patterns.
          </p>
        </div>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 50%,#0891b2 100%)' }} />

      {/* TOC */}
      <div className="border-b border-slate-200 py-5 px-4 sm:px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Contents</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {[
              ['#core-question', 'Core Question'],
              ['#zoom-hierarchy', 'Zoom Hierarchy'],
              ['#vocabulary', 'Key Vocabulary'],
              ['#parallel-galaxy', 'Parallel-Galaxy Doctrine'],
              ['#orbit-system', 'Orbit System'],
              ['#segment-cycles', 'Segment Cycles'],
              ['#emotional-coordinates', 'Emotional Coordinates'],
              ['#harmonic-architecture', 'Harmonic Architecture (HP)'],
              ['#plogger-connections', 'Plogger Connections'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <Section id="core-question" title="The Core Question" accent="#5b21b6">
          <p className="text-slate-700 leading-relaxed mb-4">
            Every decision in the Musical Universe is driven by one question:
          </p>
          <blockquote className="border-l-4 border-violet-400 pl-6 py-2 text-lg font-semibold italic text-slate-800 mb-4">
            &ldquo;Where am I, where can I go, and what will it feel like when I get there?&rdquo;
          </blockquote>
          <p className="text-slate-600 text-sm leading-relaxed">
            This replaces &ldquo;what scale should I use?&rdquo; with a spatial and emotional orientation. You are always somewhere on the fretboard, always within a gravitational field (the key), and always choosing how much tension or resolution to introduce at the next moment.
          </p>
        </Section>

        <Section id="zoom-hierarchy" title="Zoom Hierarchy" accent="#4f46e5">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            The fretboard is organized as nested layers of scale. You can zoom in or out at any moment during navigation.
          </p>

          {/* SVG 1: Zoom Hierarchy Cascade */}
          <div className="my-6">
            <svg viewBox="0 0 520 400" className="w-full max-w-lg mx-auto block" aria-label="Musical Universe zoom hierarchy">
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="oklch(0.55 0.10 270 / 0.6)" />
                </marker>
              </defs>
              {[
                { label: 'GALAXY', sub: 'tuning geometry', y: 20, color: 'oklch(0.70 0.18 280)' },
                { label: 'SOLAR SYSTEM', sub: 'key / mode', y: 64, color: 'oklch(0.68 0.16 255)' },
                { label: 'MAP', sub: 'positional window (~5 frets)', y: 108, color: 'oklch(0.65 0.15 230)' },
                { label: 'NOTE', sub: 'current pitch', y: 152, color: 'oklch(0.62 0.14 205)' },
                { label: 'ORBIT', sub: 'reachable chord tones in window', y: 196, color: 'oklch(0.60 0.16 180)' },
                { label: 'CONSTELLATION', sub: 'playable voicing', y: 240, color: 'oklch(0.62 0.18 145)' },
                { label: 'PATH', sub: 'voice-leading route', y: 284, color: 'oklch(0.65 0.18 100)' },
                { label: 'SEGMENT', sub: 'motion unit (L / M / P / S)', y: 328, color: 'oklch(0.68 0.18 55)' },
                { label: 'PERFORMANCE', sub: 'live sound', y: 372, color: 'oklch(0.72 0.18 25)' },
              ].map((item, i, arr) => (
                <g key={item.label}>
                  {i > 0 && (
                    <line x1="40" y1={arr[i-1].y + 18} x2="40" y2={item.y + 6}
                      stroke="oklch(0.55 0.10 270 / 0.4)" strokeWidth="1.5"
                      markerEnd="url(#arrowhead)" />
                  )}
                  <circle cx="40" cy={item.y + 10} r="7" fill={item.color} opacity="0.9" />
                  <text x="58" y={item.y + 9} fill={item.color} fontSize="11" fontWeight="700" dominantBaseline="middle" fontFamily="monospace">{item.label}</text>
                  <text x="58" y={item.y + 22} fill="oklch(0.55 0 0)" fontSize="10" fontFamily="sans-serif">{item.sub}</text>
                </g>
              ))}
            </svg>
          </div>
        </Section>

        <Section id="vocabulary" title="Key Vocabulary" accent="#0891b2">
          <div className="rounded-xl border border-slate-200 overflow-hidden" style={{ background: '#fafafa' }}>
            <Term term="Galaxy" def="A tuning system treated as a self-contained navigable universe. Standard and DADGAD are co-primary Galaxies." />
            <Term term="Solar System" def="A key/mode center within a Galaxy. Different Solar Systems share the same fretboard territory but have different gravitational centers." />
            <Term term="Map" def="A positional overlay scoped to your current ~5-fret window. Different Map types (Scale, Harmony, Emotional) show different information — scale tones, chord tones, tension waypoints — but always within the window your hand occupies, not across the full neck. Position shift = new window." />
            <Term term="Orbit" def="A chord-centered zone showing that chord's tones within ~5 frets of your current hand position. Every diatonic chord has its own Orbit. A single note belongs to three Orbits simultaneously — as root of one chord, third of another, fifth of a third. Choosing which Orbit you're navigating from determines which Constellation of nearby chord tones becomes your local landscape." />
            <Term term="Constellation" def="A specific chord voicing with position, fingering, and Orbit structure encoded. The basic unit of harmony navigation." />
            <Term term="Segment" def="A 2–3 note motion unit classified by its semitone interval pattern. Diatonic: L (Large) = 0-2-4 (two whole steps, 3 notes), M (Medium) = 0-2-3 (whole + half, 3 notes), P (Passing) = 0-1-3 (half + whole, 3 notes). Pentatonic: L (Large) = 0-3 (minor third, 2 notes), S (Short) = 0-2 (whole step, 2 notes). The L label appears in both systems but means different shapes — diatonic L is a 3-note pattern, pentatonic L is a 2-note pattern." />
            <Term term="Anchor" def="A note shared between adjacent Constellations that enables smooth voice leading. Four types: Shared, Resolving, Color, Anticipatory." />
            <Term term="Emotional Coordinate" def="A 2D position on the Tension–Resolution × Bright–Dark axes. Determines which notes are available and how arrival behaviors are applied." />
            <Term term="Emotional Waypoint" def="A note at a structurally significant moment: chord change, repeated note, long held note, phrase boundary. These carry disproportionate emotional weight." />
            <Term term="Arrival Behavior" def="One of four ways a melodic line lands at a chord change: Confirm (land on chord tone), Float (land on extension), Resolve (land by stepwise resolution), Depart (leave immediately after landing)." />
            <Term term="Bridge" def="A constrained voice-leading solution between two Constellations, built from Anchor choice — not a substitution catalog." />
          </div>
        </Section>

        <Section id="parallel-galaxy" title="Parallel-Galaxy Doctrine" accent="#7c3aed">
          <Callout type="doctrine">
            Standard and DADGAD are treated as co-primary from day one. You do not master Standard first and then &ldquo;add&rdquo; DADGAD. Both Galaxies run in parallel every session.
          </Callout>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            This doctrine exists because the two tunings are not just different fingerings — they create genuinely different interval environments. DADGAD&apos;s open Dsus2 drone creates natural resonance at the 1st, 4th, and 5th degrees, which changes how voice leading and Orbits feel physically. Running them in parallel from day one prevents Standard habits from becoming the default template that DADGAD has to fight against.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
            <div className="grid grid-cols-2 divide-x divide-slate-200">
              <div className="p-4">
                <p className="font-bold text-sm mb-2" style={{ color: '#1a5a8a' }}>Standard Galaxy</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>Equal string-to-string intervals (4ths, one 3rd)</li>
                  <li>Barre chord shapes portable everywhere</li>
                  <li>CAGED pattern infrastructure</li>
                  <li>You already know this terrain</li>
                </ul>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm mb-2" style={{ color: '#5b21b6' }}>DADGAD Galaxy</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>Open strings: D–A–D–G–A–D (Dsus2)</li>
                  <li>3rd string (G) creates unique cross-string intervals</li>
                  <li>Natural drone resonance on root, 4th, 5th</li>
                  <li>New Constellation shapes required from scratch</li>
                </ul>
              </div>
            </div>
          </div>
          <Callout type="note">
            When practice materials say &ldquo;do this in both Galaxies,&rdquo; that means: complete the drill in Standard, then immediately translate it to DADGAD. Do not skip DADGAD because it feels harder — that asymmetry is exactly what the doctrine is correcting.
          </Callout>
        </Section>

        <Section id="orbit-system" title="The Orbit System" accent="#0e7490">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Every diatonic chord has its own Orbit — the local cluster of that chord&apos;s tones reachable within ~5 frets of your hand position. An Orbit belongs to a chord, not a note. D major has an Orbit, F# minor has an Orbit, A major has an Orbit — each is a distinct map of chord tones within the same physical window.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Here is where it becomes powerful: a single note belongs to three different Orbits at once. If you&apos;re on A, you can navigate from within the A major Orbit (A is the root), the F# minor Orbit (A is the third), or the D major Orbit (A is the fifth). Each choice reveals a different <strong>constellation</strong> of nearby chord tones — without moving your hand. The navigation decision is harmonic, not positional: which chord&apos;s territory are you choosing to be in right now?
          </p>

          {/* SVG 3: Orbit Window Fretboard */}
          <div className="my-6">
            <p className="text-xs text-slate-500 mb-2 text-center font-mono">Example: A at fret 7 navigating from D&apos;s Orbit (A is the fifth) — nearby chord tones in the ~5-fret window</p>
            <svg viewBox="0 0 340 160" className="w-full max-w-md mx-auto block" aria-label="Orbit window fretboard example">
              {/* Fret lines — frets 4–12 shown, 9 frets */}
              {[0,1,2,3,4,5,6,7,8].map(f => (
                <line key={f} x1={40 + f*30} y1="20" x2={40 + f*30} y2="140"
                  stroke="oklch(0.35 0 0)" strokeWidth={f === 0 ? 3 : 1} />
              ))}
              {/* String lines — 6 strings */}
              {[0,1,2,3,4,5].map(s => (
                <line key={s} x1="40" y1={20 + s*24} x2="280" y2={20 + s*24}
                  stroke="oklch(0.45 0 0)" strokeWidth={s > 3 ? 1.5 : 1} />
              ))}
              {/* Fret numbers */}
              {[5,6,7,8,9,10,11,12].map((fn, i) => (
                <text key={fn} x={55 + i*30} y="155" textAnchor="middle" fontSize="9" fill="oklch(0.45 0 0)" fontFamily="monospace">{fn}</text>
              ))}
              {/* String labels */}
              {['E','A','D','G','B','e'].map((s, i) => (
                <text key={s} x="30" y={24 + i*24} textAnchor="middle" fontSize="9" fill="oklch(0.45 0 0)" fontFamily="monospace">{s}</text>
              ))}
              {/* 5-fret window highlight — frets 5–9 */}
              <rect x="70" y="16" width="120" height="128" rx="4"
                fill="oklch(0.65 0.15 270 / 0.08)" stroke="oklch(0.55 0.15 270 / 0.4)" strokeWidth="1" strokeDasharray="4 2" />
              <text x="130" y="12" textAnchor="middle" fontSize="8" fill="oklch(0.55 0.15 270)" fontFamily="sans-serif">~5-fret window</text>
              {/* A on A string (index 1), fret 7 — column index 2 within window (frets 5,6,7... → x=70,100,130) */}
              <circle cx="130" cy="44" r="9" fill="oklch(0.75 0.20 25)" />
              <text x="130" y="48" textAnchor="middle" fontSize="8" fill="white" fontWeight="700" fontFamily="monospace">A</text>
              <text x="148" y="38" fontSize="7" fill="oklch(0.75 0.20 25)" fontFamily="monospace">5th</text>
              {/* D on D string (index 2), fret 5 */}
              <circle cx="70" cy="68" r="7" fill="oklch(0.65 0.18 145)" />
              <text x="70" y="72" textAnchor="middle" fontSize="7" fill="white" fontWeight="700" fontFamily="monospace">D</text>
              <text x="70" y="84" textAnchor="middle" fontSize="7" fill="oklch(0.65 0.18 145)" fontFamily="monospace">root</text>
              {/* F# on A string (index 1), fret 9 */}
              <circle cx="190" cy="44" r="7" fill="oklch(0.65 0.18 55)" />
              <text x="190" y="48" textAnchor="middle" fontSize="7" fill="white" fontWeight="700" fontFamily="monospace">F#</text>
              <text x="190" y="60" textAnchor="middle" fontSize="7" fill="oklch(0.65 0.18 55)" fontFamily="monospace">3rd</text>
              {/* D on G string (index 3), fret 7 */}
              <circle cx="130" cy="92" r="7" fill="oklch(0.65 0.18 145)" />
              <text x="130" y="96" textAnchor="middle" fontSize="7" fill="white" fontWeight="700" fontFamily="monospace">D</text>
              <text x="148" y="88" fontSize="7" fill="oklch(0.65 0.18 145)" fontFamily="monospace">root</text>
              {/* Legend */}
              <circle cx="295" cy="40" r="5" fill="oklch(0.75 0.20 25)" />
              <text x="305" y="44" fontSize="8" fill="oklch(0.65 0 0)" fontFamily="sans-serif">active note</text>
              <circle cx="295" cy="58" r="5" fill="oklch(0.65 0.18 145)" />
              <text x="305" y="62" fontSize="8" fill="oklch(0.65 0 0)" fontFamily="sans-serif">root (D)</text>
              <circle cx="295" cy="76" r="5" fill="oklch(0.65 0.18 55)" />
              <text x="305" y="80" fontSize="8" fill="oklch(0.65 0 0)" fontFamily="sans-serif">third (F#)</text>
            </svg>
          </div>

          <div className="rounded-xl border border-cyan-200 p-5 mb-5" style={{ background: '#f0fdfa' }}>
            <p className="font-bold text-sm mb-3 text-cyan-900">Orbit Generator (modulo-7 rule)</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              For a note at scale degree N, the modulo-7 rule identifies its three Orbit memberships: N (as root — the chord rooted at N), N&minus;2 mod 7 (as third — the chord rooted at N&minus;2 contains this note as its third), and N&minus;4 mod 7 (as fifth — the chord rooted at N&minus;4 contains it as its fifth). Three Orbits, one note, one position:
            </p>

            {/* SVG 2: Orbit Rotation Triangle */}
            <div className="my-6 flex justify-center">
              <svg viewBox="0 0 260 220" className="w-64" aria-label="Orbit rotation generator">
                <defs>
                  <marker id="tri-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                    <polygon points="0 0, 6 2.5, 0 5" fill="oklch(0.55 0.10 270 / 0.5)" />
                  </marker>
                </defs>
                {/* Triangle edges */}
                <line x1="130" y1="28" x2="220" y2="185" stroke="oklch(0.55 0.10 270 / 0.4)" strokeWidth="1.5" markerEnd="url(#tri-arrow)" />
                <line x1="220" y1="185" x2="40" y2="185" stroke="oklch(0.55 0.10 270 / 0.4)" strokeWidth="1.5" markerEnd="url(#tri-arrow)" />
                <line x1="40" y1="185" x2="130" y2="28" stroke="oklch(0.55 0.10 270 / 0.4)" strokeWidth="1.5" markerEnd="url(#tri-arrow)" />
                {/* Vertex circles */}
                <circle cx="130" cy="24" r="20" fill="oklch(0.18 0.08 145)" stroke="oklch(0.65 0.18 145)" strokeWidth="1.5" />
                <circle cx="220" cy="189" r="20" fill="oklch(0.18 0.08 280)" stroke="oklch(0.55 0.15 280)" strokeWidth="1.5" />
                <circle cx="40" cy="189" r="20" fill="oklch(0.18 0.08 25)" stroke="oklch(0.75 0.20 25)" strokeWidth="1.5" />
                {/* Vertex labels */}
                <text x="130" y="21" textAnchor="middle" fill="oklch(0.85 0.18 145)" fontSize="9" fontWeight="700" fontFamily="monospace">ROOT</text>
                <text x="130" y="31" textAnchor="middle" fill="oklch(0.65 0.18 145)" fontSize="8" fontFamily="monospace">degree N</text>
                <text x="220" y="186" textAnchor="middle" fill="oklch(0.75 0.15 280)" fontSize="9" fontWeight="700" fontFamily="monospace">FIFTH</text>
                <text x="220" y="196" textAnchor="middle" fill="oklch(0.55 0.15 280)" fontSize="8" fontFamily="monospace">N − 4</text>
                <text x="40" y="186" textAnchor="middle" fill="oklch(0.85 0.20 25)" fontSize="9" fontWeight="700" fontFamily="monospace">THIRD</text>
                <text x="40" y="196" textAnchor="middle" fill="oklch(0.75 0.20 25)" fontSize="8" fontFamily="monospace">N − 2</text>
                {/* Edge label */}
                <text x="130" y="205" textAnchor="middle" fill="oklch(0.45 0 0)" fontSize="9" fontFamily="sans-serif">mod 7 — one rule, three identities</text>
              </svg>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Example: Note G (degree 1 in G major). As root &rarr; G major (I). As third &rarr; E minor (vi, at 1&minus;2 mod 7 = 6). As fifth &rarr; C major (IV, at 1&minus;4 mod 7 = 4). Three Orbits, three constellations of nearby chord tones — all reachable from the same fret. Notice G appears in both G major and C major: that&apos;s a <strong>Shared Anchor</strong>.
            </p>
          </div>

          <p id="segment-types" className="font-bold text-sm text-slate-700 mb-3">Segment Types</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { type: 'L — Large (diatonic)', desc: '0-2-4 semitones: two whole steps, 3 notes. In D major: degrees 1-2-3 (D-E-F#), 4-5-6 (G-A-B), 5-6-7 (A-B-C#).' },
              { type: 'M — Medium', desc: '0-2-3 semitones: whole + half step, 3 notes. In D major: degrees 2-3-4 (E-F#-G) and 6-7-1 (B-C#-D).' },
              { type: 'P — Passing', desc: '0-1-3 semitones: half + whole step, 3 notes. In D major: degrees 3-4-5 (F#-G-A) and 7-1-2 (C#-D-E).' },
              { type: 'S — Short (pentatonic)', desc: '0-2 semitones: one whole step, 2 notes. Pentatonic only. Connects chord tones across a whole-step gap.' },
              { type: 'L — Large (pentatonic)', desc: '0-3 semitones: a minor third, 2 notes. Pentatonic only. Same name as diatonic L, different shape and note count.' },
            ].map(s => (
              <div key={s.type} className="rounded-lg border border-slate-200 p-3" style={{ background: '#fafafa' }}>
                <p className="font-bold text-xs text-slate-800 mb-1">{s.type}</p>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* SVG 4: Segment Type Diagrams */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-4">
            {[
              { name: 'L (diatonic)', semitones: [0, 2, 4], color: 'oklch(0.65 0.18 145)', desc: 'W+W · 3 notes' },
              { name: 'M (Medium)', semitones: [0, 2, 3], color: 'oklch(0.65 0.18 55)', desc: 'W+H · 3 notes' },
              { name: 'P (Passing)', semitones: [0, 1, 3], color: 'oklch(0.65 0.18 25)', desc: 'H+W · 3 notes' },
              { name: 'L (pentatonic)', semitones: [0, 3], color: 'oklch(0.58 0.18 145)', desc: 'm3 · 2 notes' },
              { name: 'S (Short)', semitones: [0, 2], color: 'oklch(0.55 0.15 270)', desc: 'W · 2 notes' },
            ].map(seg => (
              <div key={seg.name} className="bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-xs font-mono font-bold mb-2" style={{ color: seg.color }}>{seg.name}</p>
                <svg viewBox="0 0 80 40" className="w-full mx-auto block" aria-label={seg.name + ' segment'}>
                  <line x1="10" y1="20" x2="70" y2="20" stroke="oklch(0.35 0 0)" strokeWidth="1.5" />
                  {seg.semitones.map((st, i) => {
                    const x = 10 + (i / (seg.semitones.length - 1)) * 60
                    return (
                      <g key={i}>
                        <circle cx={x} cy="20" r="5" fill={seg.color} />
                        <text x={x} y="35" textAnchor="middle" fontSize="8" fill="oklch(0.45 0 0)" fontFamily="monospace">{st}</text>
                      </g>
                    )
                  })}
                </svg>
                <p className="text-xs text-slate-500 mt-1">{seg.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="segment-cycles" title="Segment Cycles" accent="#059669">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Segments repeat in a predictable cycle as you move across strings. The cycle is a property of the tuning geometry — knowing it means you always know what shape comes next without memorizing position by position.
          </p>

          <div className="rounded-xl border border-emerald-200 p-5 mb-5" style={{ background: '#f0fdf4' }}>
            <p className="font-bold text-sm text-emerald-900 mb-1">Diatonic Cycle</p>
            <p className="text-xs text-slate-500 mb-3">On equal-interval strings, moving through the diatonic scale one string at a time produces this repeating sequence of 3-note shapes:</p>
            <p className="font-mono text-sm font-bold text-emerald-800 text-center mb-1 tracking-wide">
              L1 — L2 — L3 <span className="text-orange-500">↑</span> P1 — P2 — M1 — M2
            </p>
            <p className="text-xs text-slate-500 text-center mb-4">
              <span className="text-orange-500 font-semibold">↑</span> = shift UP one fret at the L→P seam (Phrygian shift). No other positional shifts in the cycle.
            </p>
            <p className="text-xs font-semibold text-emerald-800 mb-2">Mode entry points — which cycle position holds the mode root:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
              {([
                ['L1', 'Mixolydian'],
                ['L2', 'Ionian (major)'],
                ['L3', 'Lydian'],
                ['P1', 'Locrian'],
                ['P2', 'Phrygian'],
                ['M1', 'Aeolian (minor)'],
                ['M2', 'Dorian'],
              ] as [string, string][]).map(([pos, mode]) => (
                <div key={pos} className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-emerald-700 w-8 shrink-0">{pos}</span>
                  <span className="text-slate-600">{mode}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-violet-200 p-5 mb-5" style={{ background: '#faf5ff' }}>
            <p className="font-bold text-sm text-violet-900 mb-1">Pentatonic Cycle</p>
            <p className="text-xs text-slate-500 mb-3">Uses pentatonic L (0-3, minor third) and S (0-2, whole step). Moving across strings produces:</p>
            <p className="font-mono text-sm font-bold text-violet-800 text-center mb-1 tracking-wide">
              [ S1 — S2 — S3 ] <span className="text-orange-500">↓</span> [ L1 — L2 ]
            </p>
            <p className="text-xs text-slate-500 text-center mb-4">
              <span className="text-orange-500 font-semibold">↓</span> = shift BACK one fret at the S→L seam. Opposite direction from the diatonic shift.
            </p>
            <p className="text-xs font-semibold text-violet-800 mb-2">Entry points:</p>
            <div className="flex gap-8">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-violet-700 w-8 shrink-0">S3</span>
                <span className="text-slate-600">Major pentatonic</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-violet-700 w-8 shrink-0">L2</span>
                <span className="text-slate-600">Minor pentatonic</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Same cycle, two entry points — the same relationship as Ionian and Dorian in the diatonic cycle.</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4" style={{ background: '#f8fafc' }}>
            <p className="font-bold text-xs text-slate-700 mb-2">String Adjustments by Tuning</p>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">The cycles above assume equal-interval strings. Real tunings require corrections at certain string crossings:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-xs text-slate-700 mb-1">Standard Tuning</p>
                <p className="text-xs text-slate-500 leading-relaxed">The B string (string 2) is one semitone narrower than a perfect 4th. Shift up one fret when crossing onto or off string 2.</p>
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-700 mb-2">DADGAD Tuning — The Pair System</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">DADGAD string intervals are uneven (P5-P4-P4-M2-P4), so the segment cycle breaks at three distinct crossings. The Pair System names the structure:</p>
                <div className="mt-2 space-y-1.5 mb-2">
                  <div className="flex gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-700 w-24 shrink-0">Bass pair 6–5</span>
                    <span className="text-slate-500">D→A · P5 (7 semitones) · unique; needs its own scale pattern</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-700 w-24 shrink-0">Core pair 4–3</span>
                    <span className="text-slate-500">D→G · P4 (5 semitones) · standard; segment cycle runs normally</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-700 w-24 shrink-0">Treble pair 2–1</span>
                    <span className="text-slate-500">A→D · P4 (5 semitones) · standard; segment cycle runs normally</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed"><span className="font-semibold text-slate-700">String families:</span> D-family (strings 6, 4, 1 — all open D, share the same scale pattern), A-family (strings 5, 2 — both open A, share the same scale pattern), G-singleton (string 3 — open G, one-note bridge between Core and Treble pairs). D Dorian: 4-3-4-1-3-1 notes per string.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="emotional-coordinates" title="Emotional Coordinates" accent="#dc2626">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Every note choice and voicing lives on a 2-axis emotional grid. The axes are independent — you can be harmonically tense but melodically bright, or resolved but dark. This gives you four quadrants:
          </p>

          {/* SVG 5: Emotional Coordinate Quadrant */}
          <div className="my-6">
            <svg viewBox="0 0 320 280" className="w-full max-w-md mx-auto block" aria-label="Emotional coordinate system">
              {/* Zone fills */}
              <rect x="20" y="20" width="130" height="110" rx="4" fill="oklch(0.65 0.18 145 / 0.10)" />
              <rect x="170" y="20" width="130" height="110" rx="4" fill="oklch(0.65 0.15 270 / 0.10)" />
              <rect x="20" y="150" width="130" height="110" rx="4" fill="oklch(0.65 0.18 55 / 0.10)" />
              <rect x="170" y="150" width="130" height="110" rx="4" fill="oklch(0.65 0.18 25 / 0.10)" />
              {/* Axes */}
              <line x1="160" y1="10" x2="160" y2="270" stroke="oklch(0.40 0 0)" strokeWidth="1" />
              <line x1="10" y1="140" x2="310" y2="140" stroke="oklch(0.40 0 0)" strokeWidth="1" />
              {/* Axis labels */}
              <text x="160" y="8" textAnchor="middle" fontSize="9" fill="oklch(0.60 0 0)" fontFamily="sans-serif">BRIGHT / OPEN</text>
              <text x="160" y="278" textAnchor="middle" fontSize="9" fill="oklch(0.60 0 0)" fontFamily="sans-serif">DARK / CLOSED</text>
              <text x="8" y="143" fontSize="9" fill="oklch(0.60 0 0)" fontFamily="sans-serif" transform="rotate(-90, 8, 143)">RESOLVED</text>
              <text x="310" y="143" textAnchor="end" fontSize="9" fill="oklch(0.60 0 0)" fontFamily="sans-serif">TENSE</text>
              {/* Zone labels */}
              <text x="85" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.65 0.18 145)" fontFamily="monospace">FLOAT</text>
              <text x="85" y="57" textAnchor="middle" fontSize="8" fill="oklch(0.50 0 0)" fontFamily="sans-serif">open · colorful</text>
              <text x="235" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.55 0.15 270)" fontFamily="monospace">DEPART</text>
              <text x="235" y="57" textAnchor="middle" fontSize="8" fill="oklch(0.50 0 0)" fontFamily="sans-serif">tension · anticipation</text>
              <text x="85" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.65 0.18 55)" fontFamily="monospace">CONFIRM</text>
              <text x="85" y="187" textAnchor="middle" fontSize="8" fill="oklch(0.50 0 0)" fontFamily="sans-serif">grounded · settled</text>
              <text x="235" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.65 0.18 25)" fontFamily="monospace">RESOLVE</text>
              <text x="235" y="187" textAnchor="middle" fontSize="8" fill="oklch(0.50 0 0)" fontFamily="sans-serif">tension releases</text>
              {/* Example waypoints */}
              <circle cx="95" cy="100" r="4" fill="oklch(0.65 0.18 145)" opacity="0.8" />
              <text x="105" y="103" fontSize="7" fill="oklch(0.55 0.18 145)" fontFamily="monospace">root on tonic</text>
              <circle cx="210" cy="50" r="4" fill="oklch(0.55 0.15 270)" opacity="0.8" />
              <text x="220" y="53" fontSize="7" fill="oklch(0.45 0.15 270)" fontFamily="monospace">b7 on V7</text>
              <circle cx="100" cy="200" r="4" fill="oklch(0.65 0.18 55)" opacity="0.8" />
              <text x="110" y="203" fontSize="7" fill="oklch(0.55 0.18 55)" fontFamily="monospace">5th on I</text>
            </svg>
          </div>

          <p className="font-bold text-sm text-slate-700 mb-3">Arrival Behaviors</p>
          <p className="text-slate-600 text-xs leading-relaxed mb-3">
            At every chord change, a melodic line has to arrive somewhere. The four arrival behaviors tell you <em>how</em> it lands:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { name: 'Confirm',  desc: 'Land directly on a chord tone of the new chord. Stable, declarative.' },
              { name: 'Float',    desc: 'Land on an extension (9, 11, 13) that is consonant but unanchored. Airy.' },
              { name: 'Resolve',  desc: 'Approach by half-step or whole-step into a chord tone. Creates forward motion.' },
              { name: 'Depart',   desc: 'Land briefly, then immediately continue motion. The chord change is a springboard.' },
            ].map(b => (
              <div key={b.name} className="flex gap-3 text-sm items-start">
                <span className="font-bold w-20 shrink-0 text-slate-800 text-xs pt-0.5">{b.name}</span>
                <span className="text-slate-500 text-xs">{b.desc}</span>
              </div>
            ))}
          </div>

          <Callout type="note">
            Emotional Waypoints are the notes that carry the most emotional weight in a phrase: the note at a chord change, a repeated pitch, a long held note, or the first note of a new phrase. Focus your Emotional Coordinate choices on these moments first — the in-between notes matter less.
          </Callout>
        </Section>

        <Section id="harmonic-architecture" title="Harmonic Architecture (HP)" accent="#1E8449">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Harmonic Processions (HP) treats the Circle of Fifths as an actual topological space rather than a mnemonic device. It adds a structural layer to the Musical Universe stack: Plogger describes <em>acoustic perception</em> (how individual intervals feel), HP describes <em>harmonic architecture</em> (how pitch sets are positioned and move on the Circle), and the Musical Universe describes <em>navigation</em> (how you traverse fretboard space).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Plogger', desc: 'Acoustic/perceptual — pulsation, harmonicity, F/O factor. The physics of individual intervals.', color: '#92400e', bg: '#fffbeb' },
              { label: 'HP', desc: 'Structural/architectural — how harmonic sets are positioned on the Circle of Fifths and how they move between positions.', color: '#1E8449', bg: '#f0fdf4' },
              { label: 'Musical Universe', desc: 'Navigational — how you traverse fretboard space through orbits, constellations, and segments.', color: '#5b21b6', bg: '#faf5ff' },
            ].map(layer => (
              <div key={layer.label} className="rounded-xl border p-4" style={{ background: layer.bg, borderColor: layer.color + '40' }}>
                <p className="font-bold text-xs mb-1" style={{ color: layer.color }}>{layer.label}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">

            <div className="rounded-xl border border-emerald-200 p-5" style={{ background: '#f0fdf4' }}>
              <p className="font-bold text-sm text-emerald-900 mb-2">Span</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                The distance in perfect fifths between the outermost notes of a pitch set, measured on the Circle. Span is HP&apos;s primary coordinate. Smaller Span = more acoustically fused; larger Span = more harmonically tense.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                {[
                  { interval: 'P5 or P4', span: 'Span 1' },
                  { interval: 'M2 or m7', span: 'Span 2' },
                  { interval: 'm3 or M6', span: 'Span 3' },
                  { interval: 'M3 or m6', span: 'Span 4' },
                  { interval: 'Tritone', span: 'Span 6' },
                ].map(row => (
                  <div key={row.interval} className="rounded-lg p-2.5 text-center" style={{ background: '#dcfce7' }}>
                    <p className="font-mono text-xs font-bold text-emerald-800">{row.interval}</p>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">{row.span}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">This ordering matches the sprint sequence exactly — Span and sprint priority converge on the same interval ordering from different premises.</p>
            </div>

            <div className="rounded-xl border border-emerald-200 p-5" style={{ background: '#f0fdf4' }}>
              <p className="font-bold text-sm text-emerald-900 mb-3">Three Procession Types</p>
              <div className="space-y-3">
                {[
                  { name: 'Natural', desc: 'Moves one fifth at a time in a consistent direction. The engine of functional harmony — V→I is a Natural Procession of one step in the flat direction.' },
                  { name: 'Modal', desc: 'Stays within a Span zone, moving laterally on the Circle. Creates modal color without changing the key center. The engine of mode mixture.' },
                  { name: 'Dissonance Gradient', desc: 'Changes Span deliberately — increasing harmonic density toward a climax, or decreasing it toward resolution.' },
                ].map(pt => (
                  <div key={pt.name} className="flex gap-3">
                    <span className="font-bold text-xs text-emerald-700 w-32 shrink-0 pt-0.5">{pt.name}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 p-5" style={{ background: '#f0fdf4' }}>
              <p className="font-bold text-sm text-emerald-900 mb-2">Sharp / Flat Projection</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Every harmonic set pulls toward the sharp side of the Circle (toward dominant) or the flat side (toward subdominant). Mirror Sets share the same Span but have opposite projection — acoustically equivalent density, harmonically reversed direction.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3" style={{ background: '#dcfce7' }}>
                  <p className="font-bold text-xs text-emerald-800 mb-1">Sharp projection</p>
                  <p className="text-xs text-slate-600">Gravity toward dominant. Example: G major projects sharp toward D major.</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: '#dcfce7' }}>
                  <p className="font-bold text-xs text-emerald-800 mb-1">Flat projection</p>
                  <p className="text-xs text-slate-600">Gravity toward subdominant. Example: F major projects flat toward C major.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed" style={{ background: '#f8fafc' }}>
            <strong className="text-slate-700">Current status:</strong> This is a framework-level introduction. The full HP system includes 350 classified pitch sets and 48 reference tables — those arrive at Phase 11 of the 12-Sprint Journey. Use Span to describe harmonic density and projection to describe harmonic direction; both are immediately applicable to Constellation selection and Bridge construction.
          </div>
        </Section>

        <Section id="plogger-connections" title="Plogger Connections" accent="#92400e">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            The Musical Universe is a navigational system. Plogger&apos;s method is an <em>acoustic perception</em> system. They operate at different levels and are deeply complementary. Here is how the two frameworks map to each other:
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200 p-5" style={{ background: '#fffbeb' }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">⊙</span>
                <div>
                  <p className="font-bold text-sm text-amber-900 mb-1">
                    Harmonicity → Core / Structural / Color / Tension roles
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mb-2">
                    Plogger ranks di-chords by harmonicity — how consonant two notes are when sounded together. This maps directly onto the vertical classification of notes within a Constellation:
                    high-harmonicity intervals = Core or Structural notes; medium = Color; low = Tension/Dissonance.
                  </p>
                  <Link href="/plogger#ch12" className="text-xs font-semibold text-amber-700 hover:underline">
                    → Plogger Ch.12: Di-Chord Sonic Properties
                  </Link>
                  {' · '}
                  <Link href="/plogger#ch13" className="text-xs font-semibold text-amber-700 hover:underline">
                    Ch.13: Harmonicity
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 p-5" style={{ background: '#fffbeb' }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">〜</span>
                <div>
                  <p className="font-bold text-sm text-amber-900 mb-1">
                    Interference Pulsation → Constellation Voicing Texture
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mb-2">
                    Plogger&apos;s interference pulsation rate (how quickly two pitches &ldquo;beat&rdquo; against each other) determines voicing tension. Fast pulsation = tense, buzzy Constellations (avoid for stable arrivals). Slow pulsation = smooth, resting voicings (good for Confirm arrivals).
                  </p>
                  <Link href="/plogger#ch14" className="text-xs font-semibold text-amber-700 hover:underline">
                    → Plogger Ch.14: Interference Pulsation
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 p-5" style={{ background: '#fffbeb' }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">↑↓</span>
                <div>
                  <p className="font-bold text-sm text-amber-900 mb-1">
                    F/O Factor → Orbit Resolution Direction
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mb-2">
                    Plogger&apos;s Fundamental / Overtone (F/O) factor describes whether a note naturally wants to resolve downward (Fundamental direction) or upward (Overtone direction). This is the psychoacoustic engine behind what the Musical Universe calls the Resolve arrival behavior — the direction of stepwise resolution from a Tension-zone note is predicted by its F/O factor.
                  </p>
                  <Link href="/plogger#ch15" className="text-xs font-semibold text-amber-700 hover:underline">
                    → Plogger Ch.15: F/O Factor and Resolution
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 p-5" style={{ background: '#fffbeb' }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">⊞</span>
                <div>
                  <p className="font-bold text-sm text-amber-900 mb-1">
                    Di-Chord Numbers → Orbit Interval Labels
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mb-2">
                    Plogger numbers di-chords 1–11 (unison through octave). These numbers can serve as shorthand labels for the interval relationship between any two Orbit notes within a Constellation — a more precise language for naming what&apos;s happening inside a voicing than &ldquo;major third&rdquo; or &ldquo;minor seventh.&rdquo;
                  </p>
                  <Link href="/plogger#ch10" className="text-xs font-semibold text-amber-700 hover:underline">
                    → Plogger Ch.10: Di-Chord Classification
                  </Link>
                  {' · '}
                  <Link href="/plogger#ch11" className="text-xs font-semibold text-amber-700 hover:underline">
                    Ch.11: The Di-Chord System
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 p-5" style={{ background: '#fffbeb' }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">∞</span>
                <div>
                  <p className="font-bold text-sm text-amber-900 mb-1">
                    Sprint Sequence = HP Span Sequence — Convergence
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mb-3">
                    The sprint order (P4/P5 → M2 → m3/M6 → M3 → Tritone) is identical to HP&apos;s Span sequence (Span 1 → 2 → 3 → 4 → 6). Plogger arrived at this ordering through acoustic measurement — beating rates and harmonicity scores. HP arrived at it through geometric measurement — distances on the Circle of Fifths. Two independent theories, different premises, the same ordering. This is the deepest structural connection in the AMF: acoustic perception and harmonic architecture converge on the same interval priority.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { sprint: 'S 2–3', interval: 'P4 / P5', span: 'Span 1' },
                      { sprint: 'S 4', interval: 'M2', span: 'Span 2' },
                      { sprint: 'S 5–6', interval: 'm3 / M6', span: 'Span 3' },
                      { sprint: 'S 7', interval: 'M3', span: 'Span 4' },
                      { sprint: 'S 8', interval: 'Tritone', span: 'Span 6' },
                    ].map(row => (
                      <div key={row.sprint} className="rounded-lg p-2 text-center" style={{ background: '#fef3c7' }}>
                        <p className="text-xs text-amber-600 font-semibold">{row.sprint}</p>
                        <p className="font-mono text-xs font-bold text-amber-900">{row.interval}</p>
                        <p className="text-xs text-amber-700">{row.span}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>


          <div className="mt-6 rounded-xl border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed" style={{ background: '#f8fafc' }}>
            <strong className="text-slate-700">Design principle:</strong> The Musical Universe does not require Plogger knowledge to use. But musicians who have internalized Plogger&apos;s acoustic categories will find their Constellation voicing choices are no longer arbitrary — each choice has a predictable perceptual consequence. Plogger is the physics; the Musical Universe is the map.
          </div>
        </Section>

        {/* Bottom nav */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/musical-universe"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to Musical Universe
          </Link>
          <Link
            href="/musical-universe/resources/dadgad"
            className="text-sm text-violet-600 hover:text-violet-800 transition-colors font-semibold"
          >
            DADGAD Reference Guide →
          </Link>
          <Link
            href="/musical-universe/practice"
            className="sm:ml-auto text-sm font-semibold hover:opacity-80 transition-opacity px-5 py-2.5 rounded-xl text-white"
            style={{ background: '#0891b2' }}
          >
            Start the Practice Path →
          </Link>
        </div>
      </div>
    </div>
  )
}
