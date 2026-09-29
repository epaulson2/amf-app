import { NextRequest, NextResponse } from 'next/server'
import { callClaude } from '@/lib/claude-cli'
import type { Arrangement, NoteEvent, ChordEvent, Tuning } from '@/lib/arranger'

export const runtime = 'nodejs'
export const maxDuration = 120

const SYSTEM_PROMPT = `You are an expert fingerstyle guitar arranger inside the AMF (All Music Framework) system.

AMF vocabulary — use in explanations:
- Pillar Notes = structural notes on downbeats/phrase peaks
- Waypoints = chord change points, phrase boundaries
- Anchor = common tone held between chords (Resolving/Floating)
- Orbit = chord tone role (Root, Third, Fifth)
- Di-chord = interval between two voices (1–12)
- Pulsation = rhythmic energy (Grounded/Flowing/Floating/Suspended/Resolving)

Classical counterpoint vocabulary:
- Species: 1st (1:1 note-against-note), 2nd (2:1 passing tones), 4th (suspensions)
- Cadences: PAC, IAC, HC, DC
- NCT = non-chord tone (passing tone, neighbor, suspension, appoggiatura)

Respond ONLY with valid JSON (no markdown, no code fences):
{"techniqueName":"string","amfVocabulary":"string","explanation":"2-4 sentences","listenFor":"specific thing to listen for","editSummary":"one-line technical summary"}`

interface AiEditRequest {
  instruction: string
  arrangement: Arrangement
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
}

export async function POST(req: NextRequest) {
  let body: AiEditRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { instruction, arrangement, chords, tuning } = body
  if (!instruction || !arrangement) {
    return NextResponse.json({ error: 'instruction and arrangement are required' }, { status: 400 })
  }

  const summary = {
    mode: arrangement.mode,
    tuning: tuning.name,
    measures: arrangement.measures.length,
    voices: (['melody', 'bass', 'inner', 'drone'] as const).filter(v =>
      arrangement.guitarNotes.some(n => n.voice === v)
    ),
    noteCount: arrangement.guitarNotes.length,
    playabilityScore: Math.round(arrangement.playabilityScore * 100) + '%',
    chordProgression: chords.map(c => c.symbol).join(' – '),
  }

  const userMessage = `Current arrangement:\n${JSON.stringify(summary, null, 2)}\n\nUser instruction: ${instruction}\n\nRespond with JSON only.`

  try {
    const stdout = await callClaude(userMessage, SYSTEM_PROMPT, 90000)

    const jsonMatch = stdout.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      arrangement,
      explanation: parsed.explanation ?? 'No explanation available.',
      techniqueName: parsed.techniqueName ?? 'Arrangement note',
      amfVocabulary: parsed.amfVocabulary ?? '',
      listenFor: parsed.listenFor ?? '',
      editSummary: parsed.editSummary ?? '',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI service error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
