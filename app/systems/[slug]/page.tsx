import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getMarkdownContent,
  getAllSystems,
  SYSTEM_FILE_MAP,
  SYSTEM_QUICK_REF_MAP,
  SYSTEM_DISPLAY_NAMES,
  SYSTEM_SUBTITLES,
  SYSTEM_ROLES,
} from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export function generateStaticParams() {
  return getAllSystems().map((slug) => ({ slug }))
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!SYSTEM_FILE_MAP[slug]) notFound()

  const { content } = await getMarkdownContent(SYSTEM_FILE_MAP[slug])
  const quickRefPath = SYSTEM_QUICK_REF_MAP[slug]

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/systems"
            className="text-slate-400 hover:text-amber-400 text-sm mb-3 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Systems
          </Link>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mt-1">
            {SYSTEM_DISPLAY_NAMES[slug]}
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium uppercase tracking-wide">
            {SYSTEM_ROLES[slug]}
          </p>
          <p className="text-slate-300 mt-2">{SYSTEM_SUBTITLES[slug]}</p>

          {quickRefPath && (
            <Link
              href={`/systems/${slug}/quick-reference`}
              className="inline-block mt-4 px-4 py-2 rounded border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white text-sm font-medium transition-colors"
            >
              Quick Reference →
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>
    </div>
  )
}
