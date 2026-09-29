import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { audioToMelody } from '@/lib/arranger/upload/audio'
import { parseMidi } from '@/lib/arranger/upload/midi'
import { parseAbc } from '@/lib/arranger/abc-parser'

export const runtime = 'nodejs'
export const maxDuration = 60

const AUDIO_EXTS = new Set(['.mp3', '.wav', '.m4a', '.ogg', '.flac'])

export async function POST(req: NextRequest): Promise<NextResponse> {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = path.extname(file.name).toLowerCase()
  const buffer = Buffer.from(await file.arrayBuffer())

  // MIDI
  if (ext === '.mid' || ext === '.midi') {
    const result = parseMidi(buffer)
    return NextResponse.json({ melody: result.melody, chords: [], title: result.title, tempo: result.tempo, error: result.error })
  }

  // ABC notation
  if (ext === '.abc') {
    try {
      const text = buffer.toString('utf-8')
      const parsed = await parseAbc(text)
      return NextResponse.json({ melody: parsed.melody, chords: parsed.chords, title: parsed.title, tempo: parsed.tempo })
    } catch (e) {
      return NextResponse.json({ error: `ABC parse error: ${e instanceof Error ? e.message : String(e)}`, melody: [], chords: [], title: '', tempo: 120 })
    }
  }

  // Audio files
  if (AUDIO_EXTS.has(ext)) {
    const tmpPath = path.join('/tmp', `amf-upload-${Date.now()}${ext}`)
    try {
      fs.writeFileSync(tmpPath, buffer)
      const result = await audioToMelody(tmpPath, 120)
      return NextResponse.json({ melody: result.melody, chords: [], title: path.basename(file.name, ext), tempo: result.tempo, error: result.error })
    } finally {
      try { fs.unlinkSync(tmpPath) } catch { /* ignore */ }
    }
  }

  // Image / PDF — not yet supported
  if (ext === '.pdf') {
    return NextResponse.json({
      error: 'PDF sheet music is not yet supported. Export as MIDI from your notation software (MuseScore, Sibelius, Finale, etc.).',
      melody: [], chords: [], title: '', tempo: 120,
    })
  }

  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    return NextResponse.json({
      error: 'Image sheet music is not yet supported. Export as MIDI from your notation software.',
      melody: [], chords: [], title: '', tempo: 120,
    })
  }

  return NextResponse.json({
    error: 'Unsupported format. Supported: audio files (mp3/wav/m4a/ogg/flac), MIDI (.mid), ABC notation (.abc).',
    melody: [], chords: [], title: '', tempo: 120,
  })
}
