import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

export default async function HomePage() {
  const { content } = await getMarkdownContent('AMF_Overview.md')

  return (
    <div>
      {/* Hero */}
      <div
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Adaptive Musician&apos;s Framework
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            A structured system for developing musical intelligence — ear, harmony, rhythm, and composition — across any genre.
          </p>
        </div>
      </div>

      {/* Overview content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>
    </div>
  )
}
