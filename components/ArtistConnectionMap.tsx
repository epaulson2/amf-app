'use client'

import { useState, useMemo, useCallback } from 'react'

type NodeType = 'artist' | 'group' | 'label'
type EdgeType = 'member' | 'song' | 'personal' | 'label' | 'collab'

const EDGE_COLORS: Record<EdgeType, string> = {
  member:   '#8b5cf6',
  song:     '#f59e0b',
  personal: '#ec4899',
  label:    '#10b981',
  collab:   '#3b82f6',
}

const EDGE_LABELS: Record<EdgeType, string> = {
  member:   'Membership',
  song:     'Song Collaboration',
  personal: 'Personal Relationship',
  label:    'Record Label',
  collab:   'Creative Collaboration',
}

interface NodeDef {
  id: string; name: string; type: NodeType
  x: number; y: number; r: number
  color: string; glow: string; initials: string
  bio: string; born?: string; from?: string
  genre: string[]; notable: string[]; extra: string[]
}

interface EdgeDef {
  from: string; to: string; label: string; type: EdgeType
}

const NODES: NodeDef[] = [
  {
    id: 'parliament-funkadelic', name: 'Parliament-Funkadelic', type: 'group',
    x: 530, y: 295, r: 52,
    color: '#7c3aed', glow: 'rgba(139,92,246,0.6)', initials: 'PF',
    bio: 'The P-Funk collective — a sprawling cosmic ensemble of 40+ musicians who redefined funk, soul, and psychedelic rock. Rock and Roll Hall of Fame inductees (1997).',
    genre: ['Funk', 'Psychedelic Soul', 'R&B'],
    notable: ['Not Just Knee Deep', 'Flash Light', 'One Nation Under a Groove', 'Mothership Connection'],
    extra: ['Most sampled band in hip-hop during the 80s–90s', 'The Mothership stage prop weighed over 4,000 lbs', 'At peak, George Clinton juggled 40+ members simultaneously'],
  },
  {
    id: 'george-clinton', name: 'George Clinton', type: 'artist',
    x: 530, y: 118, r: 44,
    color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', initials: 'GC',
    bio: 'The Godfather of Funk. Built Parliament-Funkadelic into a cosmic empire, pioneering psychedelic funk and the party-as-protest ethos that would echo through decades of Black music.',
    born: '1941, Kannapolis, NC',
    genre: ['Funk', 'R&B', 'Psychedelic'],
    notable: ['Atomic Dog', 'Give Up the Funk', 'Knee Deep'],
    extra: ['Briefly worked as a Motown staff songwriter in the late 1960s', 'Inducted into Rock & Roll Hall of Fame with P-Funk (1997)', 'Influenced Prince, Dr. Dre, Kendrick Lamar and countless others'],
  },
  {
    id: 'junie-morrison', name: 'Junie Morrison', type: 'artist',
    x: 315, y: 188, r: 40,
    color: '#06b6d4', glow: 'rgba(6,182,212,0.5)', initials: 'JM',
    bio: 'Multi-instrumentalist and producer who wrote Ohio Players classics before becoming a key P-Funk architect. His synth innovations helped define the sound of both bands.',
    born: '1954, Middletown, OH',
    genre: ['Funk', 'Soul'],
    notable: ['Funky Worm (Ohio Players)', 'Not Just Knee Deep', 'Suzie Super Groupie'],
    extra: ['His Moog work on "Funky Worm" was revolutionary for its era', 'Wrote and produced multiple Ohio Players albums before joining P-Funk', 'Passed away 2008'],
  },
  {
    id: 'ohio-players', name: 'Ohio Players', type: 'group',
    x: 140, y: 272, r: 44,
    color: '#ef4444', glow: 'rgba(239,68,68,0.5)', initials: 'OP',
    bio: 'Dayton, Ohio funk legends known for provocative album covers and irresistible grooves. A creative incubator for several musicians who later connected with the P-Funk universe.',
    from: 'Dayton, Ohio',
    genre: ['Funk', 'Soul', 'R&B'],
    notable: ['Love Rollercoaster', 'Fire', 'Funky Worm', 'Sweet Sticky Thing'],
    extra: ['Active since 1959 under various names', 'Their "Honey" LP (1975) went platinum', 'Multiple members had direct ties to the Parliament-Funkadelic extended family'],
  },
  {
    id: 'bootsy-collins', name: 'Bootsy Collins', type: 'artist',
    x: 240, y: 415, r: 44,
    color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', initials: 'BC',
    bio: "Star-shaped bass legend. From James Brown's JBs to the center of P-Funk, Bootsy's thunderous groove anchored a generation of funk. His flamboyant persona was matched only by his fearsome chops.",
    born: '1951, Cincinnati, OH',
    genre: ['Funk', 'Bass', 'Soul'],
    notable: ["Stretchin' Out in Bootsy's Rubber Band", 'Bootzilla', "I'd Rather Be with You"],
    extra: ['Older brother is guitarist Catfish Collins — they performed together as a rhythm section', 'James Brown reportedly fired him for upstaging him too much', 'Has collaborated with Snoop Dogg, Big Pun, and Herbie Hancock'],
  },
  {
    id: 'catfish-collins', name: 'Catfish Collins', type: 'artist',
    x: 128, y: 505, r: 38,
    color: '#10b981', glow: 'rgba(16,185,129,0.5)', initials: 'CC',
    bio: 'Guitarist Phelps "Catfish" Collins — Bootsy\'s older brother and the rhythmic backbone of James Brown\'s JBs. A foundational but often overlooked architect of funk guitar.',
    born: '1943, Middletown, OH',
    genre: ['Funk', 'Soul', 'Guitar'],
    notable: ['Funky Yo Thing', 'JBs catalog', "Bootsy's Rubber Band recordings"],
    extra: ["James Brown called the Collins brothers the tightest rhythm section he ever had", 'Bootsy has always credited Catfish as his biggest guitar influence', 'Passed away 2010'],
  },
  {
    id: 'james-brown', name: 'James Brown', type: 'artist',
    x: 372, y: 508, r: 48,
    color: '#dc2626', glow: 'rgba(220,38,38,0.5)', initials: 'JB',
    bio: "The Godfather of Soul. His rhythmic innovations essentially invented funk, and his JBs backing band was the training ground for a generation of masters — including the Collins brothers.",
    born: '1933, Barnwell, SC',
    genre: ['Soul', 'Funk', 'R&B'],
    notable: ['Sex Machine', "I Got You (I Feel Good)", "Papa's Got a Brand New Bag", "It's a Man's Man's World"],
    extra: ['Most sampled artist in hip-hop history', 'Rock and Roll Hall of Fame 1986', '"The Hardest Working Man in Show Business" — sometimes played 300+ shows per year'],
  },
  {
    id: 'philippe-wynne', name: 'Philippe Wynne', type: 'artist',
    x: 720, y: 165, r: 42,
    color: '#f97316', glow: 'rgba(249,115,22,0.5)', initials: 'PW',
    bio: "Lead vocalist of The Spinners whose soaring tenor defined Philadelphia soul. Later contributed his legendary voice to Parliament-Funkadelic's 'Not Just Knee Deep,' bridging two worlds.",
    born: '1941, Cincinnati, OH',
    genre: ['Soul', 'R&B', 'Funk'],
    notable: ["I'll Be Around (Spinners)", "Could It Be I'm Falling in Love (Spinners)", 'Not Just Knee Deep'],
    extra: ['Cousin of G.C. Cameron', 'Tragically died on stage in Oakland, CA in 1984', 'His live improv style was legendary — concerts regularly ran 20+ minutes over'],
  },
  {
    id: 'spinners', name: 'The Spinners', type: 'group',
    x: 862, y: 242, r: 44,
    color: '#6366f1', glow: 'rgba(99,102,241,0.5)', initials: 'TS',
    bio: 'Detroit vocal group who became icons of Philadelphia soul after signing to Atlantic Records. Their rich harmonies and choreography set the standard for 70s soul.',
    from: 'Detroit, MI',
    genre: ['Soul', 'R&B', 'Philadelphia Soul'],
    notable: ["I'll Be Around", "Could It Be I'm Falling in Love", 'Rubberband Man', "Working My Way Back to You"],
    extra: ["Originally on Tri-Phi Records, which Berry Gordy absorbed into Motown", "Producer Thom Bell sculpted their signature Philly sound at Atlantic", "Stevie Wonder produced their Motown single 'It's a Shame' (1970)"],
  },
  {
    id: 'motown', name: 'Motown', type: 'label',
    x: 872, y: 432, r: 48,
    color: '#10b981', glow: 'rgba(16,185,129,0.5)', initials: 'MW',
    bio: "Founded by Berry Gordy in Detroit, 1959. The 'Sound of Young America' — a meticulous hit-making machine that defined Black pop music and launched some of the greatest careers in music history.",
    from: 'Detroit, MI (now LA)',
    genre: ['Soul', 'R&B', 'Pop'],
    notable: ['Hitsville U.S.A.', 'Holland-Dozier-Holland production team', 'Motown 25 TV special'],
    extra: ["George Clinton briefly wrote songs for Motown acts in the late '60s", 'Moved headquarters to LA in 1972', "Sold to MCA for $61M in 1988 — Gordy retained the brand name"],
  },
  {
    id: 'gc-cameron', name: 'G.C. Cameron', type: 'artist',
    x: 715, y: 435, r: 38,
    color: '#f97316', glow: 'rgba(249,115,22,0.5)', initials: 'GCC',
    bio: "Replaced Smokey Robinson as lead singer of The Miracles, then continued as a solo Motown artist. Philippe Wynne's cousin — a quiet but vital node connecting Motown's world with Philly soul.",
    born: '1945, Jackson, MS',
    genre: ['Soul', 'R&B'],
    notable: ["It's So Hard to Say Goodbye to Yesterday", 'No Matter Where', 'Duets with Syreeta Wright'],
    extra: ["Lead singer of The Miracles 1972–1977 after Smokey went solo", "His version of 'It's So Hard to Say Goodbye' predated Boyz II Men's famous cover", 'Cousin of Philippe Wynne'],
  },
  {
    id: 'syreeta-wright', name: 'Syreeta Wright', type: 'artist',
    x: 922, y: 302, r: 40,
    color: '#ec4899', glow: 'rgba(236,72,153,0.5)', initials: 'SYR',
    bio: "Singer-songwriter and Stevie Wonder's first wife. A Motown artist whose largely Wonder-produced albums are among the most underrated of the era — full of warmth and sophisticated soul.",
    born: '1946, Pittsburgh, PA',
    genre: ['Soul', 'R&B'],
    notable: ['Stevie Wonder Presents Syreeta', "With You I'm Born Again (w/ Billy Preston)", 'Come and Get This Stuff'],
    extra: ['Married Stevie Wonder 1970, divorced 1972 — remained creative partners throughout', "'With You I'm Born Again' reached #1 in the UK", 'Passed away 2004'],
  },
  {
    id: 'stevie-wonder', name: 'Stevie Wonder', type: 'artist',
    x: 960, y: 490, r: 48,
    color: '#7c3aed', glow: 'rgba(124,58,237,0.5)', initials: 'SW',
    bio: "Blind from birth, Stevie Wonder became one of the most celebrated musicians of the 20th century. His mid-70s 'classic period' — five back-to-back masterpiece albums — remains unmatched in scope and ambition.",
    born: '1950, Saginaw, MI',
    genre: ['Soul', 'R&B', 'Funk', 'Pop'],
    notable: ['Superstition', 'Higher Ground', 'Living for the City', 'Songs in the Key of Life'],
    extra: ['Signed to Motown at age 11 as "Little Stevie Wonder"', '25 Grammy Awards', "Helped establish Martin Luther King Jr. Day as a US federal holiday", "Produced The Spinners' 'It's a Shame' (1970)"],
  },
]

const EDGES: EdgeDef[] = [
  { from: 'george-clinton',       to: 'parliament-funkadelic', label: 'founded & led',         type: 'member'   },
  { from: 'junie-morrison',       to: 'parliament-funkadelic', label: 'member',                type: 'member'   },
  { from: 'junie-morrison',       to: 'ohio-players',          label: 'former member',         type: 'member'   },
  { from: 'bootsy-collins',       to: 'parliament-funkadelic', label: 'member',                type: 'member'   },
  { from: 'bootsy-collins',       to: 'james-brown',           label: 'JBs backing band',      type: 'member'   },
  { from: 'catfish-collins',      to: 'james-brown',           label: 'JBs guitarist',         type: 'member'   },
  { from: 'bootsy-collins',       to: 'catfish-collins',       label: 'brothers',              type: 'personal' },
  { from: 'philippe-wynne',       to: 'spinners',              label: 'lead vocalist',         type: 'member'   },
  { from: 'spinners',             to: 'motown',                label: 'early label affiliation', type: 'label'  },
  { from: 'gc-cameron',           to: 'motown',                label: 'artist / The Miracles', type: 'label'    },
  { from: 'gc-cameron',           to: 'philippe-wynne',        label: 'cousins',               type: 'personal' },
  { from: 'gc-cameron',           to: 'syreeta-wright',        label: 'collaborated',          type: 'collab'   },
  { from: 'syreeta-wright',       to: 'stevie-wonder',         label: 'first wife',            type: 'personal' },
  { from: 'stevie-wonder',        to: 'motown',                label: 'Motown legend',         type: 'label'    },
  { from: 'bootsy-collins',       to: 'philippe-wynne',        label: '"Funky Yo Thing"',      type: 'song'     },
  { from: 'catfish-collins',      to: 'philippe-wynne',        label: '"Funky Yo Thing"',      type: 'song'     },
  { from: 'philippe-wynne',       to: 'parliament-funkadelic', label: '"Not Just Knee Deep"',  type: 'song'     },
  { from: 'george-clinton',       to: 'motown',                label: 'early songwriter',      type: 'collab'   },
]

function splitName(name: string): [string, string] {
  if (name.includes('-') && name.length > 12) {
    const idx = name.indexOf('-')
    return [name.slice(0, idx + 1), name.slice(idx + 1)]
  }
  const words = name.split(' ')
  if (words.length <= 2) return [name, '']
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

export default function ArtistConnectionMap({ images }: { images: Record<string, string | null> }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered]   = useState<string | null>(null)
  const [imgFailed, setImgFailed] = useState<Set<string>>(new Set())

  const markFailed = useCallback((id: string) => {
    setImgFailed(prev => { const s = new Set(prev); s.add(id); return s })
  }, [])

  const nodes = useMemo(() =>
    NODES.map(n => ({ ...n, image: images[n.id] ?? null })),
    [images]
  )

  const nodeMap = useMemo(() =>
    Object.fromEntries(nodes.map(n => [n.id, n])),
    [nodes]
  )

  const selectedNode = selected ? nodeMap[selected] : null

  const connectedEdges = useMemo(() => {
    if (!selected) return []
    return EDGES.filter(e => e.from === selected || e.to === selected).map(e => ({
      ...e,
      otherId: e.from === selected ? e.to : e.from,
    }))
  }, [selected])

  function getEdgeGeometry(edge: EdgeDef) {
    const a = nodeMap[edge.from]
    const b = nodeMap[edge.to]
    if (!a || !b) return null
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.sqrt(dx * dx + dy * dy) || 1
    const sx = a.x + (dx / d) * a.r
    const sy = a.y + (dy / d) * a.r
    const ex = b.x - (dx / d) * (b.r + 5)
    const ey = b.y - (dy / d) * (b.r + 5)
    const mx = (sx + ex) / 2
    const my = (sy + ey) / 2
    const curvature = 45
    const cpx = mx - (dy / d) * curvature
    const cpy = my + (dx / d) * curvature
    const lx = 0.25 * sx + 0.5 * cpx + 0.25 * ex
    const ly = 0.25 * sy + 0.5 * cpy + 0.25 * ey
    return { path: `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, lx, ly }
  }

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <style>{`
        .node-g { cursor: pointer; }
        .node-g:hover .node-name { opacity: 1 !important; }
        .edge-g { transition: opacity 0.18s; }
      `}</style>

      {/* ── Header ── */}
      <div className="px-6 py-8 border-b border-slate-800"
           style={{ background: 'linear-gradient(180deg,#0f172a 0%,#020617 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2 text-amber-400">Artist Connections</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">The P-Funk Web</h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            A living map of the musical connections between George Clinton, Parliament-Funkadelic, and the artists in their orbit — from Motown to the Godfather of Soul.{' '}
            <span className="text-slate-500">Click any node to explore the full story.</span>
          </p>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
            {(Object.entries(EDGE_COLORS) as [EdgeType, string][]).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 text-xs text-slate-400">
                <span style={{
                  width: 22, height: 2.5,
                  background: color,
                  display: 'inline-block',
                  borderRadius: 2,
                  ...(type === 'song' ? { backgroundImage: `repeating-linear-gradient(90deg,${color} 0,${color} 5px,transparent 5px,transparent 8px)`, background: 'none' } : {}),
                }} />
                {EDGE_LABELS[type]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Graph ── */}
      <div className="overflow-x-auto" style={{ background: '#020617' }}>
        <svg
          viewBox="30 50 1010 530"
          className="w-full"
          style={{ minWidth: 560, maxHeight: '68vh', display: 'block' }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Arrow markers per edge type */}
            {(Object.entries(EDGE_COLORS) as [EdgeType, string][]).map(([type, color]) => (
              <marker key={type} id={`arrow-${type}`}
                markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0.5 L7,3.5 L0,6.5 Z" fill={color} fillOpacity="0.85" />
              </marker>
            ))}

            {/* Clip paths for circular photos */}
            {nodes.map(n => (
              <clipPath key={n.id} id={`clip-${n.id}`}>
                <circle cx={n.x} cy={n.y} r={n.r - 2} />
              </clipPath>
            ))}

            {/* Radial gradients */}
            {nodes.map(n => (
              <radialGradient key={n.id} id={`grad-${n.id}`} cx="40%" cy="35%" r="65%">
                <stop offset="0%"   stopColor={n.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.75" />
              </radialGradient>
            ))}
          </defs>

          {/* Starfield */}
          {Array.from({ length: 70 }, (_, i) => (
            <circle key={i}
              cx={40 + (i * 139.7) % 980}
              cy={55 + (i * 91.3) % 510}
              r={i % 7 === 0 ? 1.5 : i % 3 === 0 ? 1.2 : 0.7}
              fill="white"
              opacity={0.05 + (i % 4) * 0.04}
            />
          ))}

          {/* ── Edges ── */}
          {EDGES.map((edge, i) => {
            const geo = getEdgeGeometry(edge)
            if (!geo) return null
            const color = EDGE_COLORS[edge.type]
            const isActive = hovered === edge.from || hovered === edge.to ||
                             selected === edge.from || selected === edge.to
            return (
              <g key={i} className="edge-g" opacity={isActive ? 1 : 0.28}>
                <path
                  d={geo.path}
                  fill="none"
                  stroke={color}
                  strokeWidth={isActive ? 2.2 : 1.4}
                  strokeDasharray={edge.type === 'song' ? '7 4' : undefined}
                  markerEnd={`url(#arrow-${edge.type})`}
                  filter={isActive ? 'url(#glow-soft)' : undefined}
                />
                {isActive && (
                  <text
                    x={geo.lx} y={geo.ly}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={color}
                    dy="-5"
                    style={{ pointerEvents: 'none', letterSpacing: '0.02em' }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* ── Nodes ── */}
          {nodes.map((node, i) => {
            const isHov = hovered === node.id
            const isSel = selected === node.id
            const [line1, line2] = splitName(node.name)
            const floatAmt = 4 + (i % 3) * 2
            const floatDur = 3 + (i * 0.35) % 2
            const floatDelay = (i * 0.28) % 2
            return (
              <g
                key={node.id}
                className="node-g"
                onClick={() => setSelected(s => s === node.id ? null : node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0; 0,${-floatAmt}; 0,0`}
                  dur={`${floatDur}s`}
                  begin={`${floatDelay}s`}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0.05 0.55 0.95;0.45 0.05 0.55 0.95"
                />

                {/* Selection pulse ring */}
                {isSel && (
                  <circle cx={node.x} cy={node.y} r={node.r + 14}
                    fill="none" stroke={node.color} strokeWidth="2" opacity="0.5"
                    filter="url(#glow)">
                    <animate attributeName="r"
                      values={`${node.r + 10};${node.r + 18};${node.r + 10}`}
                      dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity"
                      values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Hover / selected ring */}
                <circle cx={node.x} cy={node.y}
                  r={node.r + (isSel ? 8 : isHov ? 5 : 2)}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={isSel ? 2 : 1.5}
                  opacity={isSel ? 0.75 : isHov ? 0.5 : 0.18}
                  filter={isSel || isHov ? 'url(#glow-soft)' : undefined}
                />

                {/* Main disk */}
                <circle cx={node.x} cy={node.y} r={node.r}
                  fill={`url(#grad-${node.id})`}
                  stroke={node.color}
                  strokeWidth={isSel ? 2.5 : 1.5}
                  strokeOpacity={isSel ? 1 : 0.65}
                />

                {/* Photo or initials */}
                {node.image && !imgFailed.has(node.id) ? (
                  <image
                    href={node.image}
                    x={node.x - node.r + 2} y={node.y - node.r + 2}
                    width={(node.r - 2) * 2} height={(node.r - 2) * 2}
                    clipPath={`url(#clip-${node.id})`}
                    preserveAspectRatio="xMidYMid slice"
                    opacity="0.82"
                    onError={() => markFailed(node.id)}
                  />
                ) : (
                  <text x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={node.r > 44 ? 18 : 14}
                    fontWeight="800"
                    fill="white"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}>
                    {node.initials.slice(0, 2)}
                  </text>
                )}

                {/* Name label */}
                <text
                  x={node.x}
                  y={node.y + node.r + (line2 ? 13 : 15)}
                  textAnchor="middle"
                  fontSize={node.type === 'group' ? 10.5 : 9.5}
                  fontWeight="700"
                  fill="white"
                  opacity={isHov || isSel ? 1 : 0.75}
                  className="node-name"
                  style={{ pointerEvents: 'none' }}>
                  {line1}
                </text>
                {line2 && (
                  <text
                    x={node.x}
                    y={node.y + node.r + 25}
                    textAnchor="middle"
                    fontSize={node.type === 'group' ? 10.5 : 9.5}
                    fontWeight="700"
                    fill="white"
                    opacity={isHov || isSel ? 1 : 0.75}
                    style={{ pointerEvents: 'none' }}>
                    {line2}
                  </text>
                )}
                {/* Type badge for groups/labels */}
                {node.type !== 'artist' && (
                  <text
                    x={node.x}
                    y={node.y + node.r + (line2 ? 37 : 28)}
                    textAnchor="middle" fontSize="7.5"
                    fill={node.color} opacity="0.7"
                    fontWeight="600"
                    style={{ pointerEvents: 'none' }}>
                    {node.type.toUpperCase()}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Song callouts ── */}
      <div className="px-6 py-5 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Key Songs in This Web</p>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Not Just Knee Deep', artists: 'Parliament-Funkadelic ft. Philippe Wynne & Junie Morrison', year: '1979' },
              { title: 'Funky Yo Thing', artists: 'Philippe Wynne, Bootsy Collins & Catfish Collins', year: '1977' },
            ].map(song => (
              <div key={song.title}
                   className="rounded-xl border border-amber-900/40 px-4 py-3"
                   style={{ background: 'rgba(245,158,11,0.05)' }}>
                <p className="text-sm font-bold text-amber-400">"{song.title}"</p>
                <p className="text-xs text-slate-400 mt-0.5">{song.artists}</p>
                <p className="text-xs text-slate-600 mt-0.5">{song.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Detail Panel ── */}
      {selectedNode && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 overflow-y-auto"
          style={{
            background: 'rgba(9,14,30,0.97)',
            backdropFilter: 'blur(24px)',
            maxHeight: '42vh',
            boxShadow: '0 -8px 60px rgba(0,0,0,0.7)',
            animation: 'slideUp 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>
          <div className="max-w-5xl mx-auto px-5 py-5">
            <div className="flex gap-4 items-start">

              {/* Photo */}
              <div className="shrink-0 rounded-full overflow-hidden border-2"
                   style={{ width: 76, height: 76, borderColor: selectedNode.color, background: selectedNode.color + '22' }}>
                {selectedNode.image && !imgFailed.has(selectedNode.id) ? (
                  <img src={selectedNode.image} alt={selectedNode.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-xl text-white">
                    {selectedNode.initials.slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h2 className="text-xl font-extrabold text-white">{selectedNode.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase"
                        style={{ background: selectedNode.color + '28', color: selectedNode.color }}>
                    {selectedNode.type}
                  </span>
                </div>
                {(selectedNode.born || selectedNode.from) && (
                  <p className="text-xs text-slate-500 mb-2">{selectedNode.born ?? selectedNode.from}</p>
                )}
                <p className="text-sm text-slate-300 leading-relaxed mb-3 max-w-2xl">{selectedNode.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedNode.genre.map(g => (
                    <span key={g} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>{g}</span>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Notable Works</p>
                    <ul className="space-y-1">
                      {selectedNode.notable.map(n => (
                        <li key={n} className="text-xs text-slate-300">· {n}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Connections on This Map</p>
                    <ul className="space-y-1">
                      {connectedEdges.map((e, i) => {
                        const other = nodeMap[e.otherId]
                        return (
                          <li key={i} className="text-xs flex items-center gap-1.5">
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: EDGE_COLORS[e.type], display: 'inline-block', flexShrink: 0 }} />
                            <span className="text-slate-400">{e.label}</span>
                            <span className="text-slate-300 font-semibold">{other?.name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Did You Know?</p>
                    <ul className="space-y-1">
                      {selectedNode.extra.map(e => (
                        <li key={e} className="text-xs text-slate-400">· {e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button onClick={() => setSelected(null)}
                      className="shrink-0 text-slate-600 hover:text-white transition-colors mt-0.5 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
