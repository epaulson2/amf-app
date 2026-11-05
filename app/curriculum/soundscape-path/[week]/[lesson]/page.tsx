import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BASE, LESSON_SLUGS, WEEKS } from '@/lib/soundscape/course'

export const dynamicParams = false
export const metadata: Metadata = { title: 'Lesson — Ajourné into Music', robots: { index: false, follow: false } }
export function generateStaticParams() { return LESSON_SLUGS }

// Placeholder only: lesson pages are built in later phases. Not linked from anywhere.
export default async function LessonPlaceholder({ params }: { params: Promise<{ week: string; lesson: string }> }) {
  const { week, lesson } = await params
  const ok = LESSON_SLUGS.some(s => s.week === week && s.lesson === lesson)
  const w = WEEKS.find(x => `week-${x.n}` === week)
  if (!ok || !w) notFound()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="sp-eyebrow m-0">Week {w.n} · Lesson {lesson.replace('lesson-', '').toUpperCase()}</p>
      <h1 className="text-3xl font-bold text-slate-900 mt-1">{w.title}</h1>
      <p className="sp-callout max-w-2xl"><span className="sp-status mr-2">Not built yet</span>This lesson page is still being prepared.</p>
      <Link href={`${BASE}/journey`} className="font-medium" style={{ color: '#b45309' }}>← The eight-week journey</Link>
    </div>
  )
}
