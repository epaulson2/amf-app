import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getMarkdownContent,
  getAllSystems,
  SYSTEM_QUICK_REF_MAP,
  SYSTEM_DISPLAY_NAMES,
} from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export function generateStaticParams() {
  return getAllSystems()
    .filter((slug) => SYSTEM_QUICK_REF_MAP[slug] !== null)
    .map((slug) => ({ slug }))
}

export default async function SystemQuickReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const quickRefPath = SYSTEM_QUICK_REF_MAP[slug]
  if (!quickRefPath) notFound()

  const { content } = await getMarkdownContent(quickRefPath)

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/systems/${slug}`}
            className="text-slate-400 hover:text-amber-400 text-sm mb-3 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to {SYSTEM_DISPLAY_NAMES[slug]} Field Manual
          </Link>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mt-1">
            {SYSTEM_DISPLAY_NAMES[slug]} — Quick Reference
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>
    </div>
  )
}
