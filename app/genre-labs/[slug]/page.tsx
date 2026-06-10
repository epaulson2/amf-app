import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getMarkdownContent,
  getAllGenreLabs,
  GENRE_FILE_MAP,
  GENRE_DISPLAY_NAMES,
} from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export function generateStaticParams() {
  return getAllGenreLabs().map((slug) => ({ slug }))
}

export default async function GenreLabPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!GENRE_FILE_MAP[slug]) notFound()

  const { content } = await getMarkdownContent(GENRE_FILE_MAP[slug])

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/genre-labs"
            className="text-slate-400 hover:text-amber-400 text-sm mb-3 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Genre Labs
          </Link>
          <p className="text-slate-400 text-xs mt-0 mb-1 uppercase tracking-wide font-medium">Genre Lab</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">
            {GENRE_DISPLAY_NAMES[slug]}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>
    </div>
  )
}
