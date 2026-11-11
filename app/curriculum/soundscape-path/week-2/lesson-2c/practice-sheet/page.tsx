import type { Metadata } from 'next'
import Link from 'next/link'
import { Sheet2C } from '@/components/soundscape/week2/m04/PracticeSheets'
import { Scene, Wrap } from '@/components/soundscape/m04/kit'
import { BASE } from '@/lib/soundscape/course'
import { LESSON_2C_STEPS } from '@/lib/soundscape/course-nav'

export const metadata: Metadata = { title: 'Lesson 2C practice sheet — Ajourné into Music' }
export default function Page() {
  return (
    <Scene>
      <Wrap narrow>
        <p className="noprint"><Link href={`${BASE}/week-2/lesson-2c?step=${LESSON_2C_STEPS.length - 1}`}>← Back to Lesson 2C</Link></p>
        <Sheet2C />
      </Wrap>
    </Scene>
  )
}
