"use client"

import React from "react"
import { canonicalNote, displayNote } from "@/lib/tps-piano-data"

// ── Layout constants ──────────────────────────────────────────────────────

const WHITE_KEY_WIDTH = 28
const WHITE_KEY_HEIGHT = 100
const BLACK_KEY_WIDTH = 18
const BLACK_KEY_HEIGHT = 60

// Octave range: C3 to B4 (2 octaves, indices 0..23 white keys)
const START_OCTAVE = 3
const NUM_OCTAVES = 2

// White keys per octave: C D E F G A B → positions 0..6
const WHITE_KEY_ORDER = ["C", "D", "E", "F", "G", "A", "B"]

// Black key positions relative to white key (after which white key index it sits)
// C#=after 0, D#=after 1, F#=after 3, G#=after 4, A#=after 5
const BLACK_KEY_OFFSETS: Array<{ afterWhite: number; note: string }> = [
  { afterWhite: 0, note: "C#" },
  { afterWhite: 1, note: "D#" },
  { afterWhite: 3, note: "F#" },
  { afterWhite: 4, note: "G#" },
  { afterWhite: 5, note: "A#" },
]

// ── Key geometry builders ─────────────────────────────────────────────────

interface WhiteKeyData {
  x: number
  note: string // e.g. "C"
  octave: number
  noteWithOctave: string // e.g. "C3"
}

interface BlackKeyData {
  x: number
  note: string // canonical, e.g. "C#"
  octave: number
  noteWithOctave: string
}

function buildKeys(): { whites: WhiteKeyData[]; blacks: BlackKeyData[] } {
  const whites: WhiteKeyData[] = []
  const blacks: BlackKeyData[] = []

  let whiteIndex = 0
  for (let oct = START_OCTAVE; oct < START_OCTAVE + NUM_OCTAVES; oct++) {
    WHITE_KEY_ORDER.forEach((note) => {
      whites.push({
        x: whiteIndex * WHITE_KEY_WIDTH,
        note,
        octave: oct,
        noteWithOctave: `${note}${oct}`,
      })
      whiteIndex++
    })

    // Black keys for this octave
    const octaveStartX = (oct - START_OCTAVE) * 7 * WHITE_KEY_WIDTH
    BLACK_KEY_OFFSETS.forEach(({ afterWhite, note }) => {
      const x = octaveStartX + (afterWhite + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2 - 1
      blacks.push({
        x,
        note,
        octave: oct,
        noteWithOctave: `${note}${oct}`,
      })
    })
  }

  return { whites, blacks }
}

// ── Colour logic ──────────────────────────────────────────────────────────

const COLOR_LEFT = "#d97706"   // amber-600
const COLOR_RIGHT = "#1e40af"  // blue-800
const COLOR_ROOT = "#7c3aed"   // violet-600
const COLOR_DEFAULT_WHITE = "#ffffff"
const COLOR_DEFAULT_BLACK = "#1a1a2e"
const COLOR_BORDER = "#9ca3af" // gray-400

/** Normalize a note+octave string for comparison, e.g. "Bb3" → "A#3" */
function normalizeNoteWithOctave(s: string): string {
  // Split last character(s) as octave number
  const match = s.match(/^([A-Ga-g][#b]?)(\d+)$/)
  if (!match) return s
  const [, note, oct] = match
  return `${canonicalNote(note.charAt(0).toUpperCase() + note.slice(1))}${oct}`
}

// ── Component ─────────────────────────────────────────────────────────────

interface Props {
  leftHandNotes?: string[]
  rightHandNotes?: string[]
  rootNote?: string
  label?: string
  showNoteNames?: boolean
  /** Scale factor for small grid cells (default 1) */
  scale?: number
}

export default function PianoKeyboard({
  leftHandNotes = [],
  rightHandNotes = [],
  rootNote,
  label,
  showNoteNames = false,
  scale = 1,
}: Props) {
  const { whites, blacks } = React.useMemo(buildKeys, [])

  const leftSet = new Set(leftHandNotes.map(normalizeNoteWithOctave))
  const rightSet = new Set(rightHandNotes.map(normalizeNoteWithOctave))
  const rootCanon = rootNote ? canonicalNote(rootNote.replace(/\d+$/, "")) : null

  const totalWidth = WHITE_KEY_WIDTH * 7 * NUM_OCTAVES
  const totalHeight = WHITE_KEY_HEIGHT + (label ? 20 : 0) + 4

  function fillColor(noteWithOctave: string, isBlack: boolean): string {
    const norm = normalizeNoteWithOctave(noteWithOctave)
    const noteOnly = norm.replace(/\d+$/, "")
    if (rootCanon && noteOnly === rootCanon && (leftSet.has(norm) || rightSet.has(norm))) {
      return COLOR_ROOT
    }
    if (leftSet.has(norm)) return COLOR_LEFT
    if (rightSet.has(norm)) return COLOR_RIGHT
    return isBlack ? COLOR_DEFAULT_BLACK : COLOR_DEFAULT_WHITE
  }

  function textColor(noteWithOctave: string, isBlack: boolean): string {
    const norm = normalizeNoteWithOctave(noteWithOctave)
    const active = leftSet.has(norm) || rightSet.has(norm)
    if (active) return "#fff"
    return isBlack ? "#aaa" : "#555"
  }

  const svgWidth = totalWidth * scale
  const svgHeight = totalHeight * scale

  return (
    <div className="flex flex-col items-center gap-1 w-full overflow-x-auto">
      {label && (
        <p className="text-xs font-medium text-gray-600 text-center truncate max-w-full px-1">
          {label}
        </p>
      )}
      <svg
        viewBox={`0 0 ${totalWidth} ${WHITE_KEY_HEIGHT + 4}`}
        width={svgWidth}
        height={svgHeight}
        style={{ maxWidth: "100%" }}
        aria-label={label ?? "Piano keyboard diagram"}
        role="img"
      >
        {/* White keys */}
        {whites.map((key) => {
          const fill = fillColor(key.noteWithOctave, false)
          const isHighlighted = leftSet.has(normalizeNoteWithOctave(key.noteWithOctave)) ||
            rightSet.has(normalizeNoteWithOctave(key.noteWithOctave))
          return (
            <g key={key.noteWithOctave}>
              <rect
                x={key.x + 0.5}
                y={0.5}
                width={WHITE_KEY_WIDTH - 1}
                height={WHITE_KEY_HEIGHT - 1}
                rx={2}
                fill={fill}
                stroke={COLOR_BORDER}
                strokeWidth={0.8}
              />
              {/* Root dot */}
              {rootCanon && key.note === rootCanon && isHighlighted && (
                <circle
                  cx={key.x + WHITE_KEY_WIDTH / 2}
                  cy={WHITE_KEY_HEIGHT - 10}
                  r={4}
                  fill="#fff"
                  opacity={0.85}
                />
              )}
              {/* Note name label */}
              {(showNoteNames || (isHighlighted && !showNoteNames)) && (
                <text
                  x={key.x + WHITE_KEY_WIDTH / 2}
                  y={WHITE_KEY_HEIGHT - 4}
                  textAnchor="middle"
                  fontSize={7}
                  fontFamily="sans-serif"
                  fill={isHighlighted ? "#fff" : "#888"}
                  fontWeight={isHighlighted ? "700" : "400"}
                >
                  {displayNote(key.note)}
                </text>
              )}
            </g>
          )
        })}

        {/* Black keys (rendered on top) */}
        {blacks.map((key) => {
          const fill = fillColor(key.noteWithOctave, true)
          const isHighlighted = leftSet.has(normalizeNoteWithOctave(key.noteWithOctave)) ||
            rightSet.has(normalizeNoteWithOctave(key.noteWithOctave))
          return (
            <g key={key.noteWithOctave}>
              <rect
                x={key.x}
                y={0.5}
                width={BLACK_KEY_WIDTH}
                height={BLACK_KEY_HEIGHT - 1}
                rx={2}
                fill={fill}
                stroke="#000"
                strokeWidth={0.5}
              />
              {showNoteNames && (
                <text
                  x={key.x + BLACK_KEY_WIDTH / 2}
                  y={BLACK_KEY_HEIGHT - 5}
                  textAnchor="middle"
                  fontSize={5.5}
                  fontFamily="sans-serif"
                  fill={textColor(key.noteWithOctave, true)}
                  fontWeight={isHighlighted ? "700" : "400"}
                >
                  {displayNote(key.note)}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
        {leftHandNotes.length > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: COLOR_LEFT }} />
            LH
          </span>
        )}
        {rightHandNotes.length > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: COLOR_RIGHT }} />
            RH
          </span>
        )}
        {rootNote && (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: COLOR_ROOT }} />
            Root
          </span>
        )}
      </div>
    </div>
  )
}
