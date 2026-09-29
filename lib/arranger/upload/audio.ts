import { spawn } from 'child_process'
import type { NoteEvent } from '@/lib/arranger/types'
import { detectPitches } from './pitch-detect'

const FFMPEG = '/usr/bin/ffmpeg'
const SAMPLE_RATE = 22050

function runFfmpeg(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, [
      '-i', filePath,
      '-ar', String(SAMPLE_RATE),
      '-ac', '1',
      '-f', 'f32le',
      '-acodec', 'pcm_f32le',
      'pipe:1',
    ], { stdio: ['ignore', 'pipe', 'pipe'] })

    const chunks: Buffer[] = []
    proc.stdout.on('data', (chunk: Buffer) => chunks.push(chunk))
    proc.stderr.on('data', () => { /* suppress ffmpeg stderr */ })
    proc.on('close', code => {
      if (code !== 0) reject(new Error(`ffmpeg exited with code ${code}`))
      else resolve(Buffer.concat(chunks))
    })
    proc.on('error', reject)
  })
}

export async function audioToMelody(
  filePath: string,
  tempo = 120,
): Promise<{ melody: NoteEvent[]; tempo: number; error?: string }> {
  let raw: Buffer
  try {
    raw = await runFfmpeg(filePath)
  } catch (e) {
    return { melody: [], tempo, error: `Audio decode failed: ${e instanceof Error ? e.message : String(e)}` }
  }

  const samples = new Float32Array(raw.buffer, raw.byteOffset, Math.floor(raw.byteLength / 4))
  const detected = detectPitches(samples, SAMPLE_RATE)

  const secPerBeat = 60 / tempo
  const melody: NoteEvent[] = detected
    .filter(n => n.midi >= 40 && n.midi <= 84)
    .map(n => ({
      pitch: n.midi,
      startBeat: (n.startSample / SAMPLE_RATE) / secPerBeat,
      durationBeats: (n.durationSamples / SAMPLE_RATE) / secPerBeat,
      voice: 'melody' as const,
    }))

  if (melody.length < 3) {
    return {
      melody,
      tempo,
      error: 'Could not detect a clear melody. Try a cleaner recording with a single instrument.',
    }
  }

  return { melody, tempo }
}
