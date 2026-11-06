import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { ATLAS } from '@/lib/soundscape/resources/palette'
import PaletteLibrary from '@/components/soundscape/m06/PaletteLibrary'
import { Scene, Wrap, Crumbs, HOME_CRUMB } from '@/components/soundscape/m04/kit'

export const metadata: Metadata = { title: 'The Ajourné Interval Palette — Ajourné into Music', description: ATLAS.intro.deck }

export default function IntervalPalettePage() {
  return (
    <Scene>
      <Wrap>
        <Crumbs trail={[HOME_CRUMB, { label: 'Resources', href: `${BASE}/resources` }, { label: 'Interval Palette' }]} aside={<Link href={`${BASE}/resources`} className="m4-crumbs__back">← Resources</Link>} />
        <PaletteLibrary />
      </Wrap>
    </Scene>
  )
}
