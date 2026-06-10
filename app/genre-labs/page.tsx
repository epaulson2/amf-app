import Link from 'next/link'
import { getMarkdownContent, getAllGenreLabs, GENRE_DISPLAY_NAMES } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export default async function GenreLabsPage() {
  const { content } = await getMarkdownContent('03-genre-labs/overview.md')
  const genres = getAllGenreLabs()

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">Framework</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Genre Labs</h1>
          <p className="text-slate-300 mt-2">Apply AMF systems inside specific musical traditions.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <MarkdownContent source={content} />
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">All Genre Labs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((slug) => (
              <Link
                key={slug}
                href={`/genre-labs/${slug}`}
                className="block bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3
                  className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors"
                >
                  {GENRE_DISPLAY_NAMES[slug]}
                </h3>
                <span
                  className="inline-block mt-3 text-sm font-medium"
                  style={{ color: '#d97706' }}
                >
                  Open Lab →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
