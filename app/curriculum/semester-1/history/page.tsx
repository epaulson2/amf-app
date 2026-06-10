import Link from 'next/link'

const UNITS = [
  {
    num: 1,
    slug: 'unit-1',
    title: 'The African Foundation',
    weeks: 'Weeks 1–2',
    summary: 'West African musical architecture, the griot tradition, polyrhythm as interlocking cycles, and what survived the Middle Passage — and why.',
    amfLink: 'Blues Root, Pulse Cell',
    topics: ['West African pentatonic vs. diatonic', 'The griot as keeper of truth', 'Polyrhythm and the origin of "feel"', 'What the Middle Passage could not destroy'],
    color: '#7c3aed',
  },
  {
    num: 2,
    slug: 'unit-2',
    title: 'Music Under Enslavement',
    weeks: 'Weeks 1–2 (continued)',
    summary: 'Work songs, field hollers, and ring shouts — and the exact mechanism by which the blues scale\'s blue notes were born from the friction of two tonal systems.',
    amfLink: 'Call-and-response structure, blue notes',
    topics: ['Work songs vs. field hollers — functional music', 'Why the blues scale sounds "blue" (the technical answer)', 'Ring shout and preserved polyrhythm', 'The banjo\'s African origin and why the guitar replaced it'],
    color: '#b45309',
  },
  {
    num: 3,
    slug: 'unit-3',
    title: 'The Blues Emerges: Form Takes Shape',
    weeks: 'Weeks 3–4',
    summary: 'How the AAB lyrical structure maps exactly onto the 12-bar form, W.C. Handy at the Tutwiler station, Mamie Smith\'s race record revolution, and the guitar technique that made it all work.',
    amfLink: '12-bar form, Sweet Home Chicago',
    topics: ['Post-Emancipation: music becomes personal', 'Why 12 bars — the form IS the poem', 'W.C. Handy: transcriber, not inventor', 'Mamie Smith and the race record revolution'],
    color: '#065f46',
  },
  {
    num: 4,
    slug: 'unit-4',
    title: 'The Delta: The Guitar Speaks Alone',
    weeks: 'Weeks 5–8',
    summary: 'Acoustic constraints that forged Delta technique, the Dockery Plantation lineage (Patton → House → Johnson → Waters), Robert Johnson\'s synthesis, and what the devil myth actually tells us.',
    amfLink: 'Alternating bass, TPS colors, CAS-ARC space',
    topics: ['Acoustic constraints → technique solutions', 'Charley Patton: the guitar as percussion', 'Son House: the holler enters the guitar', 'Robert Johnson: synthesis figure', 'The Dockery Plantation lineage'],
    color: '#991b1b',
  },
]

export default function HistoryCoursePage() {
  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-3">
            <Link href="/curriculum" className="hover:text-amber-400 transition-colors">Curriculum</Link>
            {' / '}
            <Link href="/curriculum/semester-1" className="hover:text-amber-400 transition-colors">Semester 1</Link>
            {' / '}
            <span className="text-slate-300">History</span>
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
            Historical Curriculum
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            From West Africa to the Delta — the musical lineage behind everything you are practicing.
            Each unit explains <em>why</em> the techniques exist, not just what they are.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
            <span>4 units</span>
            <span className="text-slate-600">·</span>
            <span>Weeks 1–8</span>
            <span className="text-slate-600">·</span>
            <span>~200 years of musical history</span>
          </div>
        </div>
      </div>

      {/* How to use */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div
          className="rounded-xl p-5 border text-sm leading-relaxed"
          style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#78350f' }}
        >
          <strong>How to use this curriculum:</strong> Each unit runs parallel to your weekly technical practice.
          Read a unit <em>while</em> you are practicing those weeks — not as homework to memorize, but as context that
          makes the technical work audible. Every historical claim connects to something you can hear in a recording.
        </div>
      </div>

      {/* Unit cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid sm:grid-cols-2 gap-6">
        {UNITS.map((unit) => (
          <Link
            key={unit.slug}
            href={`/curriculum/semester-1/history/${unit.slug}`}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all"
          >
            {/* Color band */}
            <div className="h-2" style={{ backgroundColor: unit.color }} />

            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: unit.color }}
                  >
                    Unit {unit.num} · {unit.weeks}
                  </span>
                  <h2 className="text-slate-900 font-bold text-xl mt-1 leading-tight group-hover:text-slate-700 transition-colors">
                    {unit.title}
                  </h2>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: unit.color + '18' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={unit.color} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">{unit.summary}</p>

              <ul className="space-y-1 mb-4">
                {unit.topics.map((t) => (
                  <li key={t} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: unit.color }}>▸</span>
                    {t}
                  </li>
                ))}
              </ul>

              <div
                className="text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                style={{ backgroundColor: unit.color + '12', color: unit.color }}
              >
                <span>AMF:</span>
                <span className="font-medium">{unit.amfLink}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
