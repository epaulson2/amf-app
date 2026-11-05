import type { Metadata } from 'next'
import { PATCHES, PROVENANCE, W7A } from '@/lib/soundscape/fixtures'
import AudioSequencePlayer from '@/components/soundscape/AudioSequencePlayer'
import ExternalLinkCard from '@/components/soundscape/ExternalLinkCard'
import LessonShell from '@/components/soundscape/LessonShell'
import PitchKeyboard from '@/components/soundscape/PitchKeyboard'
import SourceDiagram from '@/components/soundscape/SourceDiagram'
import VoicePath from '@/components/soundscape/VoicePath'
import { AnswerReveal, BlankLines } from '@/components/soundscape/ViewMode'

export const metadata: Metadata = { title: 'Component preview — Ajourné into Music', robots: { index: false, follow: false } }

// Engineering preview of the shared components using one approved fixture (7A).
// This is not a lesson and carries no lesson copy: it only states facts that come from the fixture data.
export default function Preview() {
  const f = W7A.facts
  return (
    <LessonShell
      eyebrow="Component preview · not a lesson"
      title="Shared lesson components"
      intro={<p className="m-0">Every control below is real. The musical facts come from one imported fixture ({PROVENANCE.dataFile}, {PROVENANCE.repo} @ {PROVENANCE.commit}).</p>}
      objectives={['Play and stop an original two-melody example', 'See the same events as a keyboard and a pitch-time path', 'Try the learner, reveal and blank views']}
      blocks={[
        {
          id: 'listen', heading: 'Two versions over a C3 drone',
          body: (
            <div className="space-y-5">
              <AudioSequencePlayer title="Hear A, hear B, or hear only the changed pitch" clips={[
                { id: 'A', label: 'Hear A', events: W7A.A, patch: PATCHES.plain },
                { id: 'B', label: 'Hear B', events: W7A.B, patch: PATCHES.plain },
                { id: 'chg', label: 'Hear changed pitch', events: W7A.changedPitchOnly, patch: PATCHES.plain },
              ]} />
              <VoicePath title="Version A: melody over the C3 drone" events={W7A.A} lo={48} hi={67} total={16} />
              <VoicePath title="Version B: melody over the C3 drone" events={W7A.B} lo={48} hi={67} total={16} />
            </div>
          ),
        },
        {
          id: 'map', heading: 'The keyboard map',
          body: (
            <div className="space-y-5">
              <PitchKeyboard title="Keyboard from C4 to C5 with C4, F4 and F♯4 marked" marks={[{ midi: 60 }, { midi: 65 }, { midi: 66 }]} />
              <SourceDiagram file={PROVENANCE.svg} narrowFile="W7-02_one-key-spotlight_m320-source.svg" alt="Keyboard from C4 to C5 with arcs from C4 to F4 (5 semitones), C4 to F♯4 (6 semitones) and F4 to F♯4 (1 semitone)." caption="W7-02 One Key Changes the Distance (source view)." />
            </div>
          ),
        },
        {
          id: 'reveal', heading: 'Hidden, reveal and blank',
          body: (
            <div>
              <p className="sp-prose">Count the semitones from C4 to F4 on your own keyboard, then check.</p>
              <AnswerReveal label="Reveal the count">
                <p className="m-0">C4 to F4 is {f.C4_to_F4} semitones; C4 to F♯4 is {f['C4_to_F#4']}; F4 to F♯4 is {f['F4_to_F#4']}.</p>
              </AnswerReveal>
              <BlankLines n={3} label="Your answer:" />
            </div>
          ),
        },
      ]}
      resources={<div className="mt-3 max-w-xl"><ExternalLinkCard title="Spiegel im Spiegel (work page)" href="https://www.arvopart.ee/en/arvo-part/work/546/" credit="Arvo Pärt Centre" /></div>}
    />
  )
}
