import Link from 'next/link'
import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

const subDocs = [
  {
    slug: 'pedagogy-architecture',
    title: 'Pedagogy Architecture',
    description: 'How AMF structures learning — the four-layer teaching model and skill acquisition approach.',
  },
  {
    slug: 'mastery-levels',
    title: 'Mastery Levels',
    description: 'The five stages from Encounter through Integration, with criteria and progression markers.',
  },
]

export default async function PedagogyPage() {
  const { content } = await getMarkdownContent('01-pedagogy/overview.md')

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">Framework</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Pedagogy</h1>
          <p className="text-slate-300 mt-2">How AMF thinks about learning and skill development.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />

        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">In This Section</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {subDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/pedagogy/${doc.slug}`}
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
