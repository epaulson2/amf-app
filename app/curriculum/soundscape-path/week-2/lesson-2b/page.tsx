import type { Metadata } from 'next'
import Lesson2B from '@/components/soundscape/week2/m04/Lesson2B'
import { LESSON_2B_STEPS } from '@/lib/soundscape/course-nav'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_2B_STEPS.length)
  return { title: n === 'all' ? 'Week 2 · Lesson 2B, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_2B_STEPS.length}: ${LESSON_2B_STEPS[n - 1]} — Lesson 2B — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson2B step={parseStep((await searchParams).step, LESSON_2B_STEPS.length)} />
}
