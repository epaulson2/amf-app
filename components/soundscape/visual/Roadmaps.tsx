import EventTimeline from './EventTimeline'
import MotionPanel from './MotionPanel'
import FitKeys from './FitKeys'
import TwoRulers from './TwoRulers'
import { tracksOf } from './shared'
import Md from '../Md'
import { V } from '@/lib/soundscape/visual/copy'
import { A01, C01 } from '@/lib/soundscape/week1/fixtures'
import { A } from '@/lib/soundscape/week2/fixtures'

function Panel({ n, title, children, caption }: { n: number; title: string; children: React.ReactNode; caption: string }) {
  return (
    <li className="sp-card p-3 flex flex-col">
      <p className="sp-eyebrow m-0">Map {n}</p>
      <h3 className="sp-editorial-title font-medium text-lg text-slate-900 mt-1 mb-2">{title}</h3>
      <div className="flex-1">{children}</div>
      <p className="text-sm sp-muted m-0 mt-2">{caption}</p>
    </li>
  )
}

function Intro({ k }: { k: 'W1HUB' | 'W2HUB' }) {
  const v = V[k]
  return (
    <>
      <h2 className="sp-editorial-heading text-2xl text-slate-900">{v.heading}</h2>
      <div className="sp-prose mt-2">{v.paras.map(p => <p key={p.slice(0, 40)}><Md>{p}</Md></p>)}</div>
    </>
  )
}

/** Week 1 hub: three small maps, then the reading guide. */
export function RoadmapW1() {
  const v = V.W1HUB
  return (
    <section aria-labelledby="w1-maps" className="mt-12" data-visual="W1HUB">
      <div id="w1-maps"><Intro k="W1HUB" /></div>
      <ol className="list-none p-0 grid gap-4 md:grid-cols-3 mt-4">
        <Panel n={1} title="Find a home reference" caption="One sustained C3 line: a single pitch, not a chord.">
          <EventTimeline title="One low C3 held for 15 seconds" total={15} tracks={tracksOf(A01, { lower: 'Home note' })} />
        </Panel>
        <Panel n={2} title="See the distance and the journey" caption="One neighbouring key is one semitone; the C4 to D4 path takes two.">
          <FitKeys lo={60} hi={72} title="Keyboard from C4 to C5 with the path C4, C♯4, D4 outlined" showNames labels={{ 60: 'C4', 62: 'D4' }} marks={{ 60: 'on', 61: 'passed', 62: 'on' }} />
        </Panel>
        <Panel n={3} title="Hear two independent lines" caption="A held C3 below; an upper line enters and leaves over time.">
          <EventTimeline title="A held C3 with an upper line moving above it" total={12} tracks={tracksOf(C01, { lower: 'Foundation', upper: 'Upper voice' })} />
        </Panel>
      </ol>
      <p className="sp-callout max-w-2xl mt-4"><Md>{(v.guide ?? '').replace(/^“|”$/g, '')}</Md></p>
    </section>
  )
}

/** Week 2 hub: dyad, the two rulers, two independent paths. */
export function RoadmapW2() {
  const v = V.W2HUB
  return (
    <section aria-labelledby="w2-maps" className="mt-12" data-visual="W2HUB">
      <div id="w2-maps"><Intro k="W2HUB" /></div>
      <ol className="list-none p-0 grid gap-4 md:grid-cols-3 mt-4">
        <Panel n={1} title="One pair, two parts" caption="C4 below and E4 above, sounding together: two voices.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/soundscape/art/W2-01_starting-dyad_learner_styleB.png" alt="The original starting-dyad artwork: a lower C4 line with a circle and an upper E4 dashed line with a square, both held across four beats." className="w-full h-auto block rounded" loading="lazy" />
          <div className="mt-2"><EventTimeline title="C4 below and E4 above, both held for 4 seconds" total={4} tracks={tracksOf(A.together, { lower: 'Lower voice', upper: 'Upper voice' })} /></div>
        </Panel>
        <Panel n={2} title="Measure and move" caption="Three letter positions, but four keyboard steps.">
          <TwoRulers pairs={[{ id: 'CE', label: 'C–E', lowerMidi: 60, upperMidi: 64, lowerName: 'C4', upperName: 'E4', intervalName: 'major third' }]} />
        </Panel>
        <Panel n={3} title="Two independent paths" caption="Opposite arrows: C falls, E rises.">
          <MotionPanel title="Contrary motion" before={{ lower: 60, upper: 64 }} after={{ lower: 59, upper: 65 }} kind="Contrary" intervalBefore="major third, 4" intervalAfter="diminished fifth, 6" />
        </Panel>
      </ol>
      <p className="sp-prose mt-4"><strong>Guide.</strong> {v.guide}</p>
      <p className="sp-callout max-w-2xl"><Md>{(v.bridge ?? '').replace(/^“|”$/g, '')}</Md></p>
    </section>
  )
}
