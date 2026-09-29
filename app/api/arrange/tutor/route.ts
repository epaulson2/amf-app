import { NextRequest, NextResponse } from 'next/server'
import { callClaude } from '@/lib/claude-cli'
import { arrange } from '@/lib/arranger/arranger'

export const runtime = 'nodejs'
export const maxDuration = 120
import { DADGAD } from '@/lib/arranger/tunings'
import { makeChordEvent } from '@/lib/arranger'
import type { NoteEvent, ArrangementMode } from '@/lib/arranger/types'


const INITIAL_SYSTEM_PROMPT = `You are an expert fingerstyle guitar teacher and music theorist working inside AMF (All Music Framework).
AMF vocabulary: Pillar Notes (structural downbeat notes), Waypoints (chord change points), Anchor (common tone — Resolving or Floating), Orbit (chord tone role: Root/Third/Fifth), Di-chord (interval between voices, 1–12), Pulsation (Grounded/Flowing/Floating/Suspended/Resolving).

When given a musical topic, generate a short pedagogical example melody (4–8 measures, simple and clear) and a tutoring lesson.

For INITIAL lesson requests, respond ONLY with valid JSON (no markdown, no code fences):
{
  "techniqueTitle": "short title e.g. '2nd Species Counterpoint'",
  "amfConcepts": ["Orbit", "Waypoint"],
  "mode": "one of: simple|drone|harmonic|voice-led|first-species|second-species|free-counterpoint|imitation",
  "tempo": 76,
  "timeSignature": [4, 4],
  "notes": [
    {"note": "D4", "beat": 0, "dur": 1},
    {"note": "F#4", "beat": 1, "dur": 1}
  ],
  "chords": [
    {"symbol": "D", "beat": 0, "dur": 4},
    {"symbol": "G", "beat": 4, "dur": 4}
  ],
  "intro": "2-3 sentence overview of the technique and why it matters for fingerstyle guitar",
  "steps": [
    {"title": "Step title", "body": "What to notice and why, 2-3 sentences"},
    {"title": "Step title", "body": "..."}
  ],
  "question": "A reflective question for the student to check understanding",
  "listenFor": "Specific sonic detail to listen for while playing"
}

Use scientific pitch notation: C4=middle C (MIDI 60). Use DADGAD-friendly keys (D, G, A, Em, Bm, F#m). Keep melodies 4-8 measures, simple and singable.`

const FOLLOWUP_SYSTEM_PROMPT = `You are an expert fingerstyle guitar teacher working inside AMF (All Music Framework).
AMF vocabulary: Pillar Notes, Waypoints, Anchor (Resolving/Floating), Orbit (Root/Third/Fifth), Di-chord (1-12), Pulsation.

You are continuing a tutoring session. Respond in warm, encouraging, conversational plain text. Be specific — reference what the student actually said. Ask follow-up questions to deepen understanding. If the student asks for a variation, include a JSON block with just {"notes":[...],"chords":[...],"mode":"..."} — no other JSON.`

const NOTE_MAP: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
  'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
  'A#': 10, 'Bb': 10, 'B': 11,
}

function noteNameToMidi(name: string): number {
  const m = name.match(/^([A-G][#b]?)(\d)$/)
  if (!m) return 60
  return (parseInt(m[2]) + 1) * 12 + (NOTE_MAP[m[1]] ?? 0)
}


export async function POST(req: NextRequest) {
  let body: { topic: string; history?: { role: string; content: string }[]; studentMessage?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { topic, history = [], studentMessage } = body
  if (!topic) return NextResponse.json({ error: 'topic is required' }, { status: 400 })

  const isFollowUp = history.length > 0 && !!studentMessage

  if (!isFollowUp) {
    // ── Initial lesson ──────────────────────────────────────────
    let raw: string
    try {
      raw = await callClaude(`Teach me about: ${topic}`, INITIAL_SYSTEM_PROMPT, 90000)
    } catch (err) {
      return NextResponse.json({ error: `Claude error: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 })
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Could not parse lesson from Claude response' }, { status: 500 })
    }

    let parsed: {
      techniqueTitle: string
      amfConcepts: string[]
      mode: string
      tempo: number
      timeSignature: [number, number]
      notes: Array<{ note: string; beat: number; dur: number }>
      chords: Array<{ symbol: string; beat: number; dur: number }>
      intro: string
      steps: Array<{ title: string; body: string }>
      question: string
      listenFor: string
    }

    try {
      parsed = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'Malformed JSON from Claude' }, { status: 500 })
    }

    const melody: NoteEvent[] = (parsed.notes ?? []).map(n => ({
      pitch: noteNameToMidi(n.note),
      startBeat: n.beat,
      durationBeats: n.dur,
      voice: 'melody' as const,
    }))

    const chords = (parsed.chords ?? []).map(c =>
      makeChordEvent(c.symbol, c.beat, c.dur)
    )

    const mode = (['simple','drone','harmonic','voice-led','first-species','second-species','free-counterpoint','imitation'] as ArrangementMode[])
      .includes(parsed.mode as ArrangementMode)
      ? parsed.mode as ArrangementMode
      : 'simple'

    let arrangement = null
    if (melody.length > 0 && chords.length > 0) {
      try {
        const result = arrange({
          melody,
          chords,
          tuning: DADGAD,
          modes: [mode],
          title: parsed.techniqueTitle,
          tempo: parsed.tempo ?? 76,
          timeSignature: parsed.timeSignature ?? [4, 4],
        })
        arrangement = result.arrangements[0] ?? null
      } catch {
        // return lesson without arrangement rather than failing
      }
    }

    return NextResponse.json({
      isInitial: true,
      arrangement,
      techniqueTitle: parsed.techniqueTitle,
      amfConcepts: parsed.amfConcepts ?? [],
      intro: parsed.intro,
      steps: parsed.steps ?? [],
      question: parsed.question,
      listenFor: parsed.listenFor,
      mode,
    })

  } else {
    // ── Follow-up ───────────────────────────────────────────────
    const historyText = history
      .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
      .join('\n\n')
    const prompt = `Topic: ${topic}\n\nConversation so far:\n${historyText}\n\nStudent: ${studentMessage}`

    let response: string
    try {
      response = await callClaude(prompt, FOLLOWUP_SYSTEM_PROMPT)
    } catch (err) {
      return NextResponse.json({ error: `Claude error: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 })
    }

    return NextResponse.json({ isInitial: false, message: response })
  }
}
