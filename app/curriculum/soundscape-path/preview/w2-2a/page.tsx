import type { Metadata } from 'next'
import Lesson2APilot, { LESSON_2A_STEPS } from '@/components/soundscape/week2pilot/Lesson2APilot'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_2A_STEPS.length)
  return { title: `PILOT · Lesson 2A ${n === 'all' ? 'whole lesson' : `step ${n} of ${LESSON_2A_STEPS.length}`} — Ajourné into Music`, robots: { index: false, follow: false } }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson2APilot step={parseStep((await searchParams).step, LESSON_2A_STEPS.length)} />
}
