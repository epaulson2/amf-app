import { NextRequest, NextResponse } from 'next/server'
import { arrange } from '@/lib/arranger'
import type { ArrangementRequest } from '@/lib/arranger'

// POST /api/arrange
// Body: ArrangementRequest
// Returns: ArrangementResponse
//
// This endpoint is intentionally a thin wrapper so the implementation can be
// swapped to a Python/music21 service in MVP 3 without changing the frontend.

export async function POST(req: NextRequest) {
  let body: ArrangementRequest

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.melody?.length || !body.chords?.length || !body.tuning) {
    return NextResponse.json({ error: 'melody, chords, and tuning are required' }, { status: 400 })
  }

  try {
    const response = arrange(body)
    return NextResponse.json(response)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
