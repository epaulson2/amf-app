import type { Metadata } from 'next'
import Lesson2A, { LESSON_2A_STEPS } from '@/components/soundscape/week2/m04/Lesson2A'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_2A_STEPS.length)
  return { title: n === 'all' ? 'Week 2 · Lesson 2A, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_2A_STEPS.length}: ${LESSON_2A_STEPS[n - 1]} — Lesson 2A — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson2A step={parseStep((await searchParams).step, LESSON_2A_STEPS.length)} />
}
