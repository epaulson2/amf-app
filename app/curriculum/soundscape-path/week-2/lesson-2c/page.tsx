import type { Metadata } from 'next'
import Lesson2C from '@/components/soundscape/week2/m04/Lesson2C'
import { LESSON_2C_STEPS } from '@/lib/soundscape/course-nav'
import { parseStep } from '@/components/soundscape/m04/kit'

type SP = Promise<{ step?: string | string[] }>
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const n = parseStep((await searchParams).step, LESSON_2C_STEPS.length)
  return { title: n === 'all' ? 'Week 2 · Lesson 2C, whole lesson — Ajourné into Music' : `Step ${n} of ${LESSON_2C_STEPS.length}: ${LESSON_2C_STEPS[n - 1]} — Lesson 2C — Ajourné into Music` }
}
export default async function Page({ searchParams }: { searchParams: SP }) {
  return <Lesson2C step={parseStep((await searchParams).step, LESSON_2C_STEPS.length)} />
}
