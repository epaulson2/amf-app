import type { Metadata } from 'next'
import Lesson1A, { LESSON_1A_STEPS } from '@/components/soundscape/m04/Lesson1A'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_1A_STEPS.length)
  return { title: n === 'all' ? 'Week 1 · Lesson 1A, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_1A_STEPS.length}: ${LESSON_1A_STEPS[n - 1]} — Lesson 1A — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson1A step={parseStep((await searchParams).step, LESSON_1A_STEPS.length)} />
}
