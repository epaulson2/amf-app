import type { Metadata } from 'next'
import Lesson1B, { LESSON_1B_STEPS } from '@/components/soundscape/m04/Lesson1B'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_1B_STEPS.length)
  // Step 1 is answer-neutral by design: its title never names the ending.
  return { title: n === 'all' ? 'Week 1 · Lesson 1B, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_1B_STEPS.length}: ${LESSON_1B_STEPS[n - 1]} — Lesson 1B — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson1B step={parseStep((await searchParams).step, LESSON_1B_STEPS.length)} />
}
