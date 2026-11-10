import type { Metadata } from 'next'
import Link from 'next/link'
import PracticeSheet from '@/components/soundscape/week2/m04/PracticeSheet'
import { Scene, Wrap } from '@/components/soundscape/m04/kit'
import { BASE } from '@/lib/soundscape/course'

export const metadata: Metadata = { title: 'Lesson 2A practice sheet — Ajourné into Music' }
export default function Page() {
  return (
    <Scene>
      <Wrap narrow>
        <p className="noprint"><Link href={`${BASE}/week-2/lesson-2a?step=9`}>← Back to Lesson 2A, step 9</Link></p>
        <PracticeSheet />
      </Wrap>
    </Scene>
  )
}
