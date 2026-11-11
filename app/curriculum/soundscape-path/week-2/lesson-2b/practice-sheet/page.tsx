import type { Metadata } from 'next'
import Link from 'next/link'
import { Sheet2B } from '@/components/soundscape/week2/m04/PracticeSheets'
import { Scene, Wrap } from '@/components/soundscape/m04/kit'
import { BASE } from '@/lib/soundscape/course'
import { LESSON_2B_STEPS } from '@/lib/soundscape/course-nav'

export const metadata: Metadata = { title: 'Lesson 2B practice sheet — Ajourné into Music' }
export default function Page() {
  return (
    <Scene>
      <Wrap narrow>
        <p className="noprint"><Link href={`${BASE}/week-2/lesson-2b?step=${LESSON_2B_STEPS.length - 1}`}>← Back to Lesson 2B</Link></p>
        <Sheet2B />
      </Wrap>
    </Scene>
  )
}
