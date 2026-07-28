import { NextRequest, NextResponse } from 'next/server'
import type { Arrangement, NoteEvent, ChordEvent, Tuning } from '@/lib/arranger'

const SYSTEM_PROMPT = `You are an expert fingerstyle guitar arranger and music theory teacher working inside the AMF (All Music Framework) system.

When given a guitar arrangement and a natural language instruction, analyze what the user wants and explain the musical technique you would apply.

AMF vocabulary — always use in explanations:
- Pillar Notes = structural notes on downbeats or phrase peaks
- Waypoints = chord change points, phrase boundaries
- Anchor = common tone held between chords (Resolving Anchor, Floating Anchor)
- Orbit = which chord tone a note is (Root, Third, Fifth)
- Di-chord = interval between two voices (numbered 1–12)
- Pulsation = rhythmic energy (Grounded/Flowing/Floating/Suspended/Resolving)

Classical vocabulary to use alongside AMF:
- Species counterpoint: 1st (1:1 note-against-note), 2nd (2:1 passing tones), 4th (suspensions), 5th (free)
- Cadences: PAC (perfect authentic), IAC (imperfect), HC (half cadence), DC (deceptive)
- NCT = non-chord tone (passing tone, neighbor tone, suspension, appoggiatura)

Respond ONLY with valid JSON:
{
  "techniqueName": "e.g. '4-3 Suspension'",
  "amfVocabulary": "e.g. 'Resolving Anchor'",
  "explanation": "2-4 sentences describing what you would change and why it works musically",
  "listenFor": "specific thing to listen for after the change",
  "editSummary": "one-line technical summary"
}`

interface AiEditRequest {
  instruction: string
  arrangement: Arrangement
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
  selectedVoices?: string[]
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

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'AI service not configured (DEEPSEEK_API_KEY missing)' }, { status: 503 })
  }

  const arrangementSummary = {
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

  const userMessage = `Current arrangement:\n${JSON.stringify(arrangementSummary, null, 2)}\n\nUser instruction: ${instruction}\n\nExplain what technique you would apply and return the JSON response.`

  try {
    const llmRes = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!llmRes.ok) throw new Error(`LLM API error: ${llmRes.status}`)

    const llmData = await llmRes.json()
    const content: string = llmData.choices?.[0]?.message?.content ?? ''
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('LLM did not return valid JSON')
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
