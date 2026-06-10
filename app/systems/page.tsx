import Link from 'next/link'
import { getMarkdownContent, getAllSystems, SYSTEM_DISPLAY_NAMES, SYSTEM_SUBTITLES, SYSTEM_ROLES } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export default async function SystemsPage() {
  const { content } = await getMarkdownContent('02-systems/overview.md')
  const systems = getAllSystems()

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">Framework</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Systems</h1>
          <p className="text-slate-300 mt-2">The nine sub-systems that make up the Internal Band.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <MarkdownContent source={content} />
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">All Systems</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {systems.map((slug) => (
              <Link
                key={slug}
                href={`/systems/${slug}`}
                className="block bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3
                  className="font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors"
                >
                  {SYSTEM_DISPLAY_NAMES[slug]}
                </h3>
                <p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-wide">
                  {SYSTEM_ROLES[slug]}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {SYSTEM_SUBTITLES[slug]}
                </p>
                <span
                  className="inline-block mt-3 text-sm font-medium"
                  style={{ color: '#d97706' }}
                >
                  Field Manual →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
