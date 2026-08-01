import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ted Greene System — AMF' }

const TOOLS = [
  {
    href: '/ted-greene/assessment',
    label: 'Student Assessment',
    subtitle: 'Musical Goals Wizard',
    description:
      "Greene opened every first lesson with four questions about what you wanted to do with music. Answer them here and get a personalized study map based on his 1976 curriculum matrix.",
    badge: 'Live',
    badgeColor: '#16a34a',
    accent: '#d97706',
  },
  {
    href: 'https://github.com/epaulson2/amf-app/blob/main/docs/ted-greene-learning-sequence.md',
    label: 'Learning Sequence',
    subtitle: '14-Stage Curriculum',
    description:
      "Greene never wrote down a curriculum — he delivered it in person. This document reconstructs the implied sequence from his teaching materials, student notes, and his own 1976 curriculum documents.",
    badge: 'Research',
    badgeColor: '#7c3aed',
    accent: '#7c3aed',
    external: true,
  },
  {
    href: 'https://github.com/epaulson2/amf-app/blob/main/docs/ted-greene-research.md',
    label: 'Site Assessment',
    subtitle: 'tedgreene.com Archive Overview',
    description:
      "A complete inventory of the tedgreene.com archive — 400+ PDFs across Baroque, V-System, Harmony, Single-Note Soloing, Fundamentals, Comping, and student notes. The map before the work begins.",
    badge: 'Research',
    badgeColor: '#7c3aed',
    accent: '#0891b2',
    external: true,
  },
]

export default function TedGreenePage() {
  return (
    <main>
      <div style={{ background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#d97706,#b45309,#92400e)', borderRadius: 2, marginBottom: 32 }} />
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#d97706' }}>Ted Greene System</p>
          <h1 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '2.5rem', lineHeight: 1.15 }}>
            The Ted Greene Method
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 620 }}>
            Ted Greene (1946–2005) spent 35 years building the most rigorous system ever devised
            for solo guitar. His three pillars — voicing navigation, harmonic grammar, and applied
            musicianship — work from late beginner through master level. Standard tuning only.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const isExternal = 'external' in tool && tool.external
            const Tag = isExternal ? 'a' : Link
            const linkProps = isExternal
              ? { href: tool.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: tool.href }

            return (
              <Tag
                key={tool.href}
                {...(linkProps as any)}
                className="block rounded-xl p-6 transition-transform hover:-translate-y-0.5"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${tool.badgeColor}22`, color: tool.badgeColor }}
                  >
                    {tool.badge}
                  </span>
                </div>
                <h2 className="font-bold mb-0.5" style={{ color: '#f1f5f9', fontSize: '1.15rem' }}>
                  {tool.label}
                </h2>
                <p className="text-xs mb-3 font-medium" style={{ color: tool.accent }}>
                  {tool.subtitle}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {tool.description}
                </p>
              </Tag>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid rgba(217,119,6,0.2)' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#d97706' }}>
            About This System
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.75 }}>
            Greene&apos;s 1976 document <em>Musical Priorities</em> opens with a clear hierarchy:{' '}
            <strong style={{ color: '#f1f5f9' }}>Harmony &gt; Melody &gt; Rhythm</strong>. His V-System
            (a taxonomy of all four-note chords into 14 voicing groups) is the structural backbone — checked
            for every musical goal in his student intake matrix, regardless of whether someone wanted to play
            jazz, classical, studio sessions, or compose. Baroque counterpoint is one path through that system.
            20th-century modern techniques are another. They are not separate courses — they are different
            harmonic grammars all requiring the same voicing navigation foundation.
          </p>
        </div>
      </div>
    </main>
  )
}
