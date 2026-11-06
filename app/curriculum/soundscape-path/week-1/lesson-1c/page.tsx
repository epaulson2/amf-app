import type { Metadata } from 'next'
import Lesson1C, { LESSON_1C_STEPS } from '@/components/soundscape/m04/Lesson1C'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_1C_STEPS.length)
  return { title: n === 'all' ? 'Week 1 · Lesson 1C, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_1C_STEPS.length}: ${LESSON_1C_STEPS[n - 1]} — Lesson 1C — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson1C step={parseStep((await searchParams).step, LESSON_1C_STEPS.length)} />
}
