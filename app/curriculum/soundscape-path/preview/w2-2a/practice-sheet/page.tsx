import type { Metadata } from 'next'
import Link from 'next/link'
import PracticeSheet from '@/components/soundscape/week2pilot/PracticeSheet'
import { Scene, Wrap } from '@/components/soundscape/m04/kit'
import { PILOT_PATH } from '@/components/soundscape/week2pilot/Lesson2APilot'

export const metadata: Metadata = { title: 'PILOT · Lesson 2A practice sheet — Ajourné into Music', robots: { index: false, follow: false } }
export default function Page() {
  return (
    <Scene>
      <Wrap narrow>
        <p className="noprint"><Link href={`${PILOT_PATH}?step=9`}>← Back to Lesson 2A, step 9</Link></p>
        <PracticeSheet />
      </Wrap>
    </Scene>
  )
}
