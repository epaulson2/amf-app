import { notFound } from 'next/navigation'
import { getDay, curriculum } from '@/lib/curriculum-data'
import DayView from './DayView'

export function generateStaticParams() {
  return Array.from({ length: 78 }, (_, i) => ({ day: String(i + 1) }))
}

interface PageProps {
  params: Promise<{ day: string }>
}

export default async function DayPage({ params }: PageProps) {
  const { day: dayParam } = await params
  const dayNum = parseInt(dayParam, 10)

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 78) {
    notFound()
  }

  const day = getDay(dayNum)
  if (!day) notFound()

  // Find prev/next days in curriculum (sorted by day number)
  const sorted = [...curriculum].sort((a, b) => a.day - b.day)
  const idx = sorted.findIndex((d) => d.day === dayNum)
  const prevDay = idx > 0 ? sorted[idx - 1].day : null
  const nextDay = idx < sorted.length - 1 ? sorted[idx + 1].day : null

  return <DayView day={day} prevDay={prevDay} nextDay={nextDay} />
}
