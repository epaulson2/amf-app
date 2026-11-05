import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'

export const metadata: Metadata = { title: 'Resources Library — Ajourné into Music' }

export default function Resources() {
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-300 text-sm mb-2">Ajourné into Music</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold m-0">Ajourné Resources Library</h1>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <p className="sp-prose">Some musical ideas are worth keeping close. Our Ajourné Resources Library will collect the maps and sound tools you&apos;ll want to revisit.</p>
        <p className="sp-callout max-w-2xl"><span className="sp-status mr-2">Preview</span>The Interval Palette and the other reference tools are not built yet. This page will list them when they are.</p>
        <p><Link href={BASE} className="font-medium" style={{ color: '#b45309' }}>← Back to Ajourné into Music</Link></p>
      </div>
    </div>
  )
}
