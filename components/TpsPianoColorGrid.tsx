// Server component — no state needed
import PianoKeyboard from "@/components/PianoKeyboard"
import {
  tpsPianoColors,
  getVoicingNotes,
  addSemitones,
  noteToIndex,
  indexToNote,
  displayNote,
  type TpsPianoVoicing,
} from "@/lib/tps-piano-data"

interface Props {
  root: string
}

// ── Register helpers ──────────────────────────────────────────────────────

/**
 * Given a pitch-class note name (e.g. "G") and a desired octave zone,
 * return "G3", "G4", etc. so keyboard highlight works.
 *
 * Strategy:
 *   - Left hand (bass): root around octave 3
 *   - Right hand (chord): triad in octave 4, spilling into 5 if needed
 */
function assignOctaves(
  noteNames: string[],
  startOctave: number,
): string[] {
  const result: string[] = []
  let currentOctave = startOctave
  let prevIndex = -1

  for (const note of noteNames) {
    const idx = noteToIndex(note)
    // If this note is lower than the previous in chromatic terms, bump octave
    if (prevIndex !== -1 && idx <= prevIndex) {
      currentOctave++
    }
    result.push(`${note}${currentOctave}`)
    prevIndex = idx
  }
  return result
}

function buildHandNotes(
  voicing: TpsPianoVoicing,
  root: string,
): { leftHand: string[]; rightHand: string[] } {
  const { leftHand: lhNames, rightHand: rhNames } = getVoicingNotes(voicing, root)

  // Left hand: root area, octave 3
  const lh = lhNames.map((n) => `${n}3`)

  // Right hand: build starting at octave 4
  const rh = assignOctaves(rhNames, 4)

  return { leftHand: lh, rightHand: rh }
}

// ── Family badge colours ──────────────────────────────────────────────────

const FAMILY_BADGE: Record<string, string> = {
  major: "bg-blue-100 text-blue-700",
  dominant: "bg-amber-100 text-amber-700",
  minor: "bg-purple-100 text-purple-700",
  core: "bg-gray-100 text-gray-600",
}

const PRIORITY_DOT: Record<string, string> = {
  core: "bg-green-500",
  secondary: "bg-yellow-400",
  advanced: "bg-red-400",
}

// ── Component ─────────────────────────────────────────────────────────────

export default function TpsPianoColorGrid({ root }: Props) {
  return (
    <div className="space-y-8">
      {(["major", "dominant", "minor"] as const).map((family) => {
        const colors = tpsPianoColors.filter((v) => v.family === family)
        if (colors.length === 0) return null

        return (
          <section key={family}>
            <h2 className="text-lg font-semibold capitalize text-gray-800 mb-4 border-b pb-1">
              {family === "major"
                ? "Major Family"
                : family === "dominant"
                ? "Dominant Family"
                : "Minor Family"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colors.map((voicing) => {
                const { leftHand, rightHand } = buildHandNotes(voicing, root)
                const badgeClass = FAMILY_BADGE[voicing.family] ?? FAMILY_BADGE.core
                const dotClass = PRIORITY_DOT[voicing.priority] ?? PRIORITY_DOT.core

                return (
                  <div
                    key={voicing.id}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm p-3 flex flex-col gap-2"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`}
                            title={`Priority: ${voicing.priority}`}
                          />
                          <h3 className="text-sm font-bold text-gray-900 leading-tight">
                            {voicing.amfName}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{voicing.placement}</p>
                      </div>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${badgeClass}`}>
                        {voicing.family}
                      </span>
                    </div>

                    {/* Keyboard diagram */}
                    <PianoKeyboard
                      leftHandNotes={leftHand}
                      rightHandNotes={rightHand}
                      rootNote={`${root}3`}
                      showNoteNames={false}
                    />

                    {/* Note names */}
                    <div className="flex gap-2 text-xs flex-wrap">
                      <span className="text-gray-400">LH:</span>
                      <span className="font-mono text-amber-700">
                        {leftHand.map((n) => displayNote(n.replace(/\d+$/, ""))).join(" ")}
                      </span>
                      <span className="text-gray-400 ml-1">RH:</span>
                      <span className="font-mono text-blue-700">
                        {rightHand.map((n) => displayNote(n.replace(/\d+$/, ""))).join(" ")}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed">{voicing.emotionalQuality}</p>
                    <p className="text-xs text-gray-400 italic">{voicing.bestUse}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
