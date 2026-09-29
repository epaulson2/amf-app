import Link from 'next/link'

export const metadata = {
  title: 'Tools — AMF',
  description: 'Interactive practice tools for the Adaptable Musician\'s Framework.',
}

interface Tool {
  href: string
  title: string
  description: string
  category: string
  color: string
  icon: string
  badge?: string
}

const TOOLS: Tool[] = [
  {
    href: '/tools/pythagorean-drill',
    title: 'Pythagorean Sequence Drill',
    description: 'Speed-drill the Pythagorean ordering of fifths — fa·doh·sol·re·la·mi·ri — across 6 question types with streak tracking.',
    category: 'Theory',
    color: '#7c3aed',
    icon: '🎯',
    badge: 'New',
  },
  {
    href: '/tools/pythagorean-builder',
    title: 'Sequence Builder',
    description: 'Click the 7 notes into the correct Pythagorean order. Race against yourself — tracks time and accuracy.',
    category: 'Theory',
    color: '#f97316',
    icon: '🧩',
    badge: 'New',
  },
  {
    href: '/tools/pythagorean-type',
    title: 'Sequence Typer',
    description: 'Type the sequence from memory — letters or solfège, forward or reverse. Personal best tracked in your browser.',
    category: 'Theory',
    color: '#06b6d4',
    icon: '⌨️',
    badge: 'New',
  },
  {
    href: '/tools/pythagorean-spiral',
    title: 'Pythagorean Spiral',
    description: 'Visualize the spiral of fifths as an animated diagram. Step through the sequence or hover to explore fifth relationships.',
    category: 'Theory',
    color: '#ec4899',
    icon: '🌀',
    badge: 'New',
  },
  {
    href: '/audio/ear-training',
    title: 'Ear Training',
    description: 'Identify intervals and chord qualities by ear with real audio playback.',
    category: 'Ear Training',
    color: '#0891b2',
    icon: '👂',
  },
  {
    href: '/audio/interval',
    title: 'Interval Explorer',
    description: 'Explore every interval on the keyboard and staff with sound and notation.',
    category: 'Theory',
    color: '#0d9488',
    icon: '🎹',
  },
  {
    href: '/audio/rhythm',
    title: 'Rhythm Lab',
    description: 'Build rhythmic feel with interactive grooves, subdivisions, and polyrhythm tools.',
    category: 'Rhythm',
    color: '#b45309',
    icon: '🥁',
  },
  {
    href: '/audio/jam-tracks',
    title: 'Jam Tracks',
    description: 'Practice over backing tracks spanning blues, jazz, funk, and more.',
    category: 'Practice',
    color: '#7c3aed',
    icon: '🎸',
  },
  {
    href: '/audio/pictographs',
    title: 'Di-Chord Pictographs',
    description: 'Visualize two-note chord shapes (di-chords) across the fretboard with pictograph maps.',
    category: 'Fretboard',
    color: '#be185d',
    icon: '🔷',
  },
  {
    href: '/arranger',
    title: 'Arranger',
    description: 'Build and hear chord progressions with full voicing control.',
    category: 'Composition',
    color: '#1d4ed8',
    icon: '🎼',
  },
  {
    href: '/ted-greene/stage/1',
    title: 'Ted Greene Stage 1',
    description: 'Guided curriculum for Ted Greene\'s Stage 1 chord melody system with semantic search.',
    category: 'Curriculum',
    color: '#047857',
    icon: '📖',
  },
  {
    href: '/musical-universe/practice',
    title: 'Musical Universe Practice',
    description: 'Practice exercises drawn from the Musical Universe framework.',
    category: 'Practice',
    color: '#c2410c',
    icon: '🌌',
  },
  {
    href: '/connections',
    title: 'Artist Connection Map',
    description: 'Explore the sonic web connecting Parliament-Funkadelic, Motown, James Brown, and beyond.',
    category: 'History',
    color: '#6d28d9',
    icon: '🕸️',
  },
]

const CATEGORIES = Array.from(new Set(TOOLS.map(t => t.category)))

export default function ToolsPage() {
  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      {/* Hero */}
      <div className="border-b border-slate-800 px-4 py-12 text-center"
           style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">AMF</p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Practice Tools</h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          All interactive tools in one place. Click any tool to open it —
          originals stay exactly where they are.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {CATEGORIES.map(cat => {
          const catTools = TOOLS.filter(t => t.category === cat)
          return (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 pb-2
                             border-b border-slate-800">
                {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map(tool => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative rounded-2xl border border-slate-800 p-5 transition-all duration-200
                               hover:border-slate-600 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: '#0f172a' }}>

                    {/* badge */}
                    {tool.badge && (
                      <span className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(124,58,237,0.25)', color: '#a78bfa' }}>
                        {tool.badge}
                      </span>
                    )}

                    {/* icon + color dot */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                           style={{ background: `${tool.color}22`, border: `1px solid ${tool.color}44` }}>
                        {tool.icon}
                      </div>
                      <div className="w-2 h-2 rounded-full shrink-0"
                           style={{ background: tool.color }} />
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1.5 leading-snug
                                   group-hover:text-violet-300 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{tool.description}</p>

                    {/* arrow */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium"
                         style={{ color: tool.color }}>
                      Open
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
