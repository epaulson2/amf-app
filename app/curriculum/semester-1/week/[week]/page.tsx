import { notFound } from 'next/navigation'
import { getWeek, curriculum } from '@/lib/curriculum-data'
import WeekView from './WeekView'

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ week: String(i + 1) }))
}

interface PageProps {
  params: Promise<{ week: string }>
}

export default async function WeekPage({ params }: PageProps) {
  const { week: weekParam } = await params
  const weekNum = parseInt(weekParam, 10)

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 12) {
    notFound()
  }

  const days = getWeek(weekNum)
  if (!days || days.length === 0) notFound()

  return <WeekView weekNum={weekNum} days={days} />
}
