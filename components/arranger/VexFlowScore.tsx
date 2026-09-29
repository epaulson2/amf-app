'use client'

import { useRef, useEffect, useCallback } from 'react'
import type { Arrangement, Tuning, VoiceType, OverlayType } from '@/lib/arranger'

export interface BeatCoords {
  measureIndex: number
  beatInMeasure: number
  x: number
  y: number
  width: number
}

interface VexFlowScoreProps {
  arrangement: Arrangement | null
  tuning: Tuning
  selectedVoices: Set<VoiceType>
  activeOverlays: Set<OverlayType>
  pencilMode: boolean
  isPlaying?: boolean
  onBeatClick?: (measureIndex: number, beat: number, x: number, y: number) => void
  onCoordsReady?: (coords: BeatCoords[]) => void
  onHeightChange?: (h: number) => void
}

interface ScoreLayout {
  staveWidth: number
  measuresPerRow: number
  ROW_H: number
  STAFF_Y: number
  grandH: number
  beatsPerMeasure: number
  totalW: number
  totalH: number
}

const NOTE_LETTERS = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

function midiToVexKey(midi: number): string {
  const pc = midi % 12
  const octave = Math.floor(midi / 12) - 1
  return `${NOTE_LETTERS[pc]}/${octave}`
}

// Returns a VexFlow duration string for the given number of beats.
// 'hd' = dotted half (3 beats), 'qd' = dotted quarter (1.5 beats) — both valid in VexFlow 4.
function beatsToVexDur(beats: number): string {
  if (beats >= 4) return 'w'
  if (beats >= 3) return 'hd'
  if (beats >= 2) return 'h'
  if (beats >= 1.5) return 'qd'
  if (beats >= 1) return 'q'
  if (beats >= 0.5) return '8'
  return '16'
}

// Decompose a beat duration into non-dotted standard values for use in rest-filling.
// Dotted rests are avoided here because 'hdr'/'qdr' in VexFlow can behave inconsistently;
// decomposing ensures each gap gets correct tick counts without dotted edge cases.
const BEAT_UNITS: [string, number][] = [['w', 4], ['h', 2], ['q', 1], ['8', 0.5], ['16', 0.25]]

function decomposeBeats(beats: number): string[] {
  const parts: string[] = []
  let rem = beats
  for (const [dur, val] of BEAT_UNITS) {
    while (rem >= val - 0.001) {
      parts.push(dur)
      rem -= val
    }
  }
  return parts.length ? parts : ['q']
}

const VOICE_COLORS: Record<VoiceType, string> = {
  melody: '#38bdf8',
  bass:   '#4ade80',
  inner:  '#fbbf24',
  drone:  '#c084fc',
}

const TREBLE_VOICES: VoiceType[] = ['melody', 'inner', 'drone']
const BASS_VOICES: VoiceType[] = ['bass']

export default function VexFlowScore({
  arrangement,
  tuning,
  selectedVoices,
  pencilMode,
  isPlaying = false,
  onBeatClick,
  onCoordsReady,
  onHeightChange,
}: VexFlowScoreProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null)
  const layoutRef = useRef<ScoreLayout | null>(null)
  const rafRef = useRef<number | null>(null)
  const renderIdRef = useRef(0)

  const render = useCallback(async () => {
    const el = containerRef.current
    if (!el) return

    const renderId = ++renderIdRef.current
    const myId = renderId

    el.innerHTML = ''

    const width = el.offsetWidth || 800
    const timeSign = arrangement?.timeSignature ?? [4, 4]
    const beatsPerMeasure = timeSign[0]
    const measures = arrangement?.measures ?? []
    const numMeasures = Math.max(measures.length, 4)

    // Grand staff layout: treble | bass clef | tab, stacked vertically per row
    const STAFF_Y  = 44   // top pad — allows Annotation chord text above treble staff
    const TREBLE_H = 90
    const BASS_GAP = 8
    const BASS_H   = 80
    const TAB_GAP  = 16
    const TAB_H    = 80
    const ROW_PAD  = 32
    const ROW_H    = STAFF_Y + TREBLE_H + BASS_GAP + BASS_H + TAB_GAP + TAB_H + ROW_PAD

    const measuresPerRow = Math.max(1, Math.floor(width / 300))
    const staveWidth = Math.floor((width - 20) / measuresPerRow)
    const numRows = Math.ceil(numMeasures / measuresPerRow)
    const totalH = numRows * ROW_H + 20

    if (onHeightChange) onHeightChange(totalH)

    let VF: typeof import('vexflow')
    try {
      VF = await import('vexflow')
    } catch {
      el.innerHTML = '<div style="color:#ef4444;padding:16px;font-size:12px">VexFlow failed to load</div>'
      return
    }
    if (myId !== renderIdRef.current) return

    const {
      Renderer, Stave, TabStave, Voice, StaveNote, TabNote,
      Formatter, GhostNote, Annotation,
    } = VF

    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(width, totalH)
    const ctx = renderer.getContext()
    ctx.setFont('Arial', 10)
    ctx.setFillStyle('#e2e8f0')
    ctx.setStrokeStyle('#94a3b8')

    const coords: BeatCoords[] = []

    for (let row = 0; row < numRows; row++) {
      const rowY    = row * ROW_H
      const trebleY = rowY + STAFF_Y
      const bassY   = trebleY + TREBLE_H + BASS_GAP
      const tabY    = bassY + BASS_H + TAB_GAP

      for (let col = 0; col < measuresPerRow; col++) {
        const mIdx = row * measuresPerRow + col
        if (mIdx >= numMeasures) break
        const staveX = 10 + col * staveWidth
        const measure = measures[mIdx]
        const measureStart = measure?.startBeat ?? (mIdx * beatsPerMeasure)

        // --- Three staves per cell ---
        const trebleStave = new Stave(staveX, trebleY, staveWidth - 4)
        trebleStave.setContext(ctx)
        if (col === 0) trebleStave.addClef('treble').addTimeSignature(`${timeSign[0]}/${timeSign[1]}`)
        trebleStave.setStyle({ strokeStyle: '#475569', fillStyle: '#475569' })
        trebleStave.draw()

        const bassStave = new Stave(staveX, bassY, staveWidth - 4)
        bassStave.setContext(ctx)
        if (col === 0) bassStave.addClef('bass')
        bassStave.setStyle({ strokeStyle: '#475569', fillStyle: '#475569' })
        bassStave.draw()

        const tabStave = new TabStave(staveX, tabY, staveWidth - 4)
        tabStave.setContext(ctx)
        if (col === 0) tabStave.addTabGlyph()
        tabStave.setStyle({ strokeStyle: '#475569', fillStyle: '#475569' })
        tabStave.draw()

        // Bucket notes by voice type
        const notesByVoice: Partial<Record<VoiceType, typeof measure.notes>> = {}
        if (measure) {
          for (const note of measure.notes) {
            if (!selectedVoices.has(note.voice)) continue
            ;(notesByVoice[note.voice] ??= []).push(note)
          }
        }

        // Build voices with explicit gap-filling rests so beat positions are correct.
        // For each voice type we create a PARALLEL pair:
        //   • staveVoice  — StaveNote objects for treble or bass clef stave
        //   • tabVoice    — TabNote/GhostNote objects for the tab stave
        // Formatting ALL pairs together via one Formatter ensures every beat lands
        // at the same horizontal X offset across all three staves.
        const trebleVoices: InstanceType<typeof Voice>[] = []
        const bassClefVoices: InstanceType<typeof Voice>[] = []
        const tabVoices: InstanceType<typeof Voice>[] = []
        const trebleNoteObjs: { note: InstanceType<typeof StaveNote>; beatInMeasure: number }[] = []

        let chordAnnotated = false

        for (const vt of [...TREBLE_VOICES, ...BASS_VOICES] as VoiceType[]) {
          const rawNotes = notesByVoice[vt]
          if (!rawNotes?.length) continue

          const isBass = (BASS_VOICES as VoiceType[]).includes(vt)
          const sorted = [...rawNotes].sort((a, b) => a.startBeat - b.startBeat)

          const staveTickables: InstanceType<typeof StaveNote>[] = []
          const tabTickables: (InstanceType<typeof TabNote> | InstanceType<typeof GhostNote>)[] = []
          let cursor = 0  // beats consumed so far within this measure

          for (const n of sorted) {
            const noteBeat = n.startBeat - measureStart

            // Fill gap before this note with rests (stave) and ghost notes (tab)
            if (noteBeat > cursor + 0.01) {
              for (const dur of decomposeBeats(noteBeat - cursor)) {
                const rk = isBass ? 'd/3' : 'b/4'
                const rOpts = isBass
                  ? { keys: [rk], duration: dur + 'r', clef: 'bass' }
                  : { keys: [rk], duration: dur + 'r' }
                const rest = new StaveNote(rOpts as Parameters<typeof StaveNote>[0])
                rest.setStyle({ fillStyle: '#334155', strokeStyle: '#334155' })
                staveTickables.push(rest)
                tabTickables.push(new GhostNote({ duration: dur }))
              }
            }
            cursor = noteBeat

            // Actual note
            const dur = beatsToVexDur(n.durationBeats)
            const nOpts = isBass
              ? { keys: [midiToVexKey(n.pitch)], duration: dur, clef: 'bass' }
              : { keys: [midiToVexKey(n.pitch)], duration: dur, stem_direction: 1 }
            const sn = new StaveNote(nOpts as Parameters<typeof StaveNote>[0])
            sn.setStyle({ fillStyle: VOICE_COLORS[vt], strokeStyle: VOICE_COLORS[vt] })

            // Attach chord symbol to first real treble note via Annotation
            if (!isBass && !chordAnnotated && measure?.chord) {
              chordAnnotated = true
              try {
                const ann = new Annotation(measure.chord.symbol)
                ann.setFont('Arial', 12, 'bold')
                ann.setStyle({ fillStyle: '#fbbf24', strokeStyle: '#fbbf24' })
                // VerticalJustify.TOP = 1 → text above top staff line
                ann.setVerticalJustification(
                  // @ts-expect-error — VexFlow enum accessed at runtime
                  Annotation.VerticalJustify?.TOP ?? 1,
                )
                sn.addModifier(ann, 0)
              } catch { /* chord annotation is non-critical */ }
            }

            staveTickables.push(sn)

            // Tab note (same beat as stave note)
            const vexStr = tuning.strings.length - n.string
            const tn = new TabNote({ positions: [{ str: vexStr, fret: n.fret }], duration: dur })
            tn.setStyle({ fillStyle: VOICE_COLORS[vt], strokeStyle: VOICE_COLORS[vt] })
            tabTickables.push(tn)

            if (!isBass) {
              trebleNoteObjs.push({ note: sn, beatInMeasure: Math.round(noteBeat) })
            }

            cursor = noteBeat + n.durationBeats
          }

          // Fill tail of measure
          if (cursor < beatsPerMeasure - 0.01) {
            for (const dur of decomposeBeats(beatsPerMeasure - cursor)) {
              const rk = isBass ? 'd/3' : 'b/4'
              const rOpts = isBass
                ? { keys: [rk], duration: dur + 'r', clef: 'bass' }
                : { keys: [rk], duration: dur + 'r' }
              const rest = new StaveNote(rOpts as Parameters<typeof StaveNote>[0])
              rest.setStyle({ fillStyle: '#334155', strokeStyle: '#334155' })
              staveTickables.push(rest)
              tabTickables.push(new GhostNote({ duration: dur }))
            }
          }

          const staveV = new Voice({ numBeats: beatsPerMeasure, beatValue: timeSign[1] }).setStrict(false)
          staveV.addTickables(staveTickables)
          if (isBass) bassClefVoices.push(staveV)
          else trebleVoices.push(staveV)

          const tabV = new Voice({ numBeats: beatsPerMeasure, beatValue: timeSign[1] }).setStrict(false)
          tabV.addTickables(tabTickables)
          tabVoices.push(tabV)
        }

        // Whole-rest placeholders for empty staves
        if (trebleVoices.length === 0) {
          const rest = new StaveNote({ keys: ['b/4'], duration: 'wr' })
          rest.setStyle({ fillStyle: '#1e293b', strokeStyle: '#1e293b' })
          const v = new Voice({ numBeats: beatsPerMeasure, beatValue: timeSign[1] }).setStrict(false)
          v.addTickables([rest])
          trebleVoices.push(v)
        }
        if (bassClefVoices.length === 0) {
          const rest = new StaveNote({ keys: ['d/3'], duration: 'wr', clef: 'bass' })
          rest.setStyle({ fillStyle: '#1e293b', strokeStyle: '#1e293b' })
          const v = new Voice({ numBeats: beatsPerMeasure, beatValue: timeSign[1] }).setStrict(false)
          v.addTickables([rest])
          bassClefVoices.push(v)
        }

        // Format treble + bass + tab voices together so the same beat gets the
        // same horizontal offset in all three staves.
        const allVoices = [...trebleVoices, ...bassClefVoices, ...tabVoices]
        try {
          new Formatter().joinVoices(allVoices).format(allVoices, staveWidth - 80)
        } catch { /* skip malformed measures */ }

        // Draw each voice group on its stave
        for (const v of trebleVoices)   { try { v.draw(ctx, trebleStave) } catch { /* skip */ } }
        for (const v of bassClefVoices) { try { v.draw(ctx, bassStave)   } catch { /* skip */ } }
        for (const v of tabVoices)      { try { v.draw(ctx, tabStave)    } catch { /* skip */ } }

        // Collect beat coordinates from treble note positions (for overlay / pencil mode)
        for (const { note, beatInMeasure } of trebleNoteObjs) {
          try {
            coords.push({
              measureIndex: mIdx,
              beatInMeasure,
              x: note.getAbsoluteX(),
              y: trebleY,
              width: staveWidth / beatsPerMeasure,
            })
          } catch { /* skip */ }
        }
      }
    }

    if (myId !== renderIdRef.current) return

    // Store layout for cursor positioning — read by the RAF playhead loop
    layoutRef.current = {
      staveWidth, measuresPerRow, ROW_H, STAFF_Y,
      grandH: TREBLE_H + BASS_GAP + BASS_H + TAB_GAP + TAB_H,
      beatsPerMeasure, totalW: width, totalH,
    }
    // Size the cursor canvas to match the score
    const cc = cursorCanvasRef.current
    if (cc) { cc.width = width; cc.height = totalH }

    if (onCoordsReady) onCoordsReady(coords)

    // Strip white rect backgrounds VexFlow draws behind tab fret numbers
    const svgEl = el.querySelector('svg')
    if (svgEl) {
      svgEl.querySelectorAll('rect').forEach((rect) => {
        const fill = rect.getAttribute('fill')
        if (fill === 'white' || fill === '#ffffff' || fill === '#fff') {
          rect.setAttribute('fill', 'transparent')
        }
      })
    }

    if (svgEl && onBeatClick) {
      svgEl.style.cursor = pencilMode ? 'crosshair' : 'default'
      svgEl.addEventListener('click', (e: MouseEvent) => {
        if (!pencilMode) return
        const rect = svgEl.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const row = Math.floor(y / ROW_H)
        const col = Math.floor((x - 10) / staveWidth)
        const mIdx = row * measuresPerRow + col
        const beatFrac = ((x - 10 - col * staveWidth) / staveWidth) * beatsPerMeasure
        const beat = Math.floor(beatFrac)
        if (mIdx >= 0 && mIdx < numMeasures) {
          onBeatClick(mIdx, beat, e.clientX, e.clientY)
        }
      })
    }
  }, [arrangement, tuning, selectedVoices, pencilMode, onBeatClick, onCoordsReady, onHeightChange])

  useEffect(() => { render() }, [render])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(() => render())
    obs.observe(el)
    return () => obs.disconnect()
  }, [render])

  // Playhead cursor — driven by requestAnimationFrame reading Tone.js transport
  useEffect(() => {
    const canvas = cursorCanvasRef.current
    if (!canvas) return

    function drawCursor(beat: number) {
      const layout = layoutRef.current
      if (!layout || !canvas) return
      const { staveWidth, measuresPerRow, ROW_H, STAFF_Y, grandH, beatsPerMeasure } = layout

      const ctx2 = canvas.getContext('2d')
      if (!ctx2) return
      ctx2.clearRect(0, 0, canvas.width, canvas.height)

      const mIdx = Math.floor(beat / beatsPerMeasure)
      const beatInMeasure = beat % beatsPerMeasure
      const row = Math.floor(mIdx / measuresPerRow)
      const col = mIdx % measuresPerRow

      // First column has clef+time-sig taking ~72px; subsequent columns ~8px
      const noteAreaLeft  = 10 + col * staveWidth + (col === 0 ? 72 : 8)
      const noteAreaRight = 10 + col * staveWidth + staveWidth - 8
      const x = noteAreaLeft + (beatInMeasure / beatsPerMeasure) * (noteAreaRight - noteAreaLeft)

      const y1 = row * ROW_H + STAFF_Y - 4
      const y2 = row * ROW_H + STAFF_Y + grandH + 4

      ctx2.save()
      ctx2.strokeStyle = 'rgba(251,191,36,0.9)'
      ctx2.lineWidth = 2
      ctx2.shadowColor = 'rgba(251,191,36,0.5)'
      ctx2.shadowBlur = 6
      ctx2.beginPath()
      ctx2.moveTo(x, y1)
      ctx2.lineTo(x, y2)
      ctx2.stroke()
      ctx2.restore()
    }

    function clearCursor() {
      const ctx2 = canvas?.getContext('2d')
      if (ctx2 && canvas) ctx2.clearRect(0, 0, canvas.width, canvas.height)
    }

    if (!isPlaying) {
      clearCursor()
      return
    }

    let tone: typeof import('tone') | null = null
    let stopped = false
    const tempo = arrangement?.tempo ?? 84

    import('tone').then(T => {
      tone = T
      function tick() {
        if (stopped || !tone) return
        const beat = (tone.getTransport().seconds * tempo) / 60
        drawCursor(beat)
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    })

    return () => {
      stopped = true
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      clearCursor()
    }
  }, [isPlaying, arrangement])

  return (
    <div style={{ position: 'relative', width: '100%', background: '#0f172a', borderRadius: 8, minHeight: 200 }}>
      <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }} />
      <canvas
        ref={cursorCanvasRef}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
    </div>
  )
}
