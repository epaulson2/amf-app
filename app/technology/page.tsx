import Link from 'next/link'
import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

const techDocs = [
  {
    slug: 'web-project-handoff',
    file: '05-technology/web-project-handoff.md',
    title: 'Web Project Handoff',
    description: 'Technical handoff documentation for the AMF web application project.',
  },
  {
    slug: 'midi-lab-brd',
    file: '05-technology/midi-lab-brd.md',
    title: 'MIDI Lab BRD',
    description: 'Business requirements document for the AMF MIDI Lab interactive tool.',
  },
]

export default async function TechnologyPage() {
  const { content } = await getMarkdownContent('05-technology/overview.md')

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">Framework</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Technology</h1>
          <p className="text-slate-300 mt-2">Interactive tools that make AMF concepts tangible and playable.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <MarkdownContent source={content} />
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Technical Documents</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {techDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/technology/${doc.slug}`}
                className="block bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3
                  className="font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors"
                >
                  {doc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{doc.description}</p>
                <span
                  className="inline-block mt-3 text-sm font-medium"
                  style={{ color: '#d97706' }}
                >
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
