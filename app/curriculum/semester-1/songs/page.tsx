import { LeadSheetCollection } from '@/components/LeadSheetCollection'
import { leadSheets } from '@/lib/lead-sheets'

export const metadata = {
  title: 'Anchor Songs — AMF Semester 1',
  description:
    'Interactive lead sheets for the three anchor songs of AMF Semester 1: Sweet Home Chicago, Blue Monk, and The Thrill Is Gone.',
}

export default function AnchorSongsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
      {/* Page header */}
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Semester 1 · Curriculum
        </p>
        <h1 className="text-4xl font-bold text-zinc-900">Anchor Songs</h1>
        <p className="max-w-2xl text-lg text-zinc-600 leading-relaxed">
          AMF Semester 1 is built around three anchor songs — one per genre strand. Rather than
          abstracting technique into exercises, AMF uses complete songs as the primary unit of
          learning. Every system you encounter (PDC, Blues Root, TPS, SHAPE) is introduced
          through one of these three tunes, so the music always comes before the theory.
        </p>
      </header>

      {/* Song-by-song AMF context cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {leadSheets.map((sheet) => (
          <div
            key={sheet.slug}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 space-y-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {sheet.key} · {sheet.tempo}
            </p>
            <h2 className="text-base font-bold text-zinc-900">{sheet.title}</h2>
            <p className="text-xs text-zinc-500">{sheet.artist}</p>
            <p className="text-sm text-zinc-600 leading-relaxed">{sheet.amfContext}</p>
          </div>
        ))}
      </section>

      {/* Interactive lead sheet viewer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900">Lead Sheets</h2>
        <p className="text-zinc-500 text-sm">
          Select a song below to view its full lead sheet with melody, chord symbols, and form
          markings. Lead sheets are rendered from ABC notation via abcjs.
        </p>
        <LeadSheetCollection />
      </section>
    </main>
  )
}
