import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

const PEDAGOGY_DOCS: Record<string, { file: string; title: string }> = {
  'pedagogy-architecture': {
    file: '01-pedagogy/pedagogy-architecture.md',
    title: 'Pedagogy Architecture',
  },
  'mastery-levels': {
    file: '01-pedagogy/mastery-levels.md',
    title: 'Mastery Levels',
  },
}

export function generateStaticParams() {
  return Object.keys(PEDAGOGY_DOCS).map((doc) => ({ doc }))
}

export default async function PedagogyDocPage({
  params,
}: {
  params: Promise<{ doc: string }>
}) {
  const { doc } = await params
  const docMeta = PEDAGOGY_DOCS[doc]
  if (!docMeta) notFound()

  const { content } = await getMarkdownContent(docMeta.file)

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/pedagogy"
            className="text-slate-400 hover:text-amber-400 text-sm mb-3 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Pedagogy
          </Link>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mt-1">{docMeta.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>
    </div>
  )
}
