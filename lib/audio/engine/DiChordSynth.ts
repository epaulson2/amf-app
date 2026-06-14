import type { SoundFactorMix } from '../data/dichords'
import type { FODirection } from '../data/dichords'

function oscTypeFromHarmonicity(h: number): OscillatorType {
  if (h < 2.5) return 'sine'
  if (h < 5)   return 'triangle'
  if (h < 7.5) return 'square'
  return 'sawtooth'
}

export class DiChordSynth {
  private mainSynth:  import('tone').PolySynth | null = null
  private shadowSynth: import('tone').PolySynth | null = null
  private reverb:     import('tone').Reverb | null = null
  private mainGain:   import('tone').Gain | null = null
  private shadowGain: import('tone').Gain | null = null

  private currentNotes:  string[] = []
  private shadowNotes:   string[] = []
  private currentMix: SoundFactorMix = { pulsation: 5, harmonicity: 3, foFactor: 3 }
  private lastBracket = 0
  private lastRootMidi = 57
  private lastFODir: FODirection = 'down'

  async init() {
    const Tone = await import('tone')

    this.reverb     = new Tone.Reverb({ decay: 2.0, wet: 0.3 }).toDestination()
    this.mainGain   = new Tone.Gain(0.8).connect(this.reverb)
    this.shadowGain = new Tone.Gain(0.0).connect(this.reverb)   // starts silent

    this.mainSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.85, release: 1.2 },
    }).connect(this.mainGain)

    this.shadowSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.08, decay: 0.1, sustain: 0.8, release: 1.5 },
    }).connect(this.shadowGain)
  }

  async play(bracket: number, rootMidi: number, foDirection: FODirection, mix: SoundFactorMix) {
    if (!this.mainSynth) await this.init()
    const Tone = await import('tone')

    this.stop()
    this.lastBracket  = bracket
    this.lastRootMidi = rootMidi
    this.lastFODir    = foDirection
    this.currentMix   = mix

    this.applyMix(mix, bracket, rootMidi, foDirection)

    // Main interval notes
    const rootNote  = Tone.Frequency(rootMidi, 'midi').toNote()
    const upperNote = Tone.Frequency(rootMidi + bracket, 'midi').toNote()
    this.currentNotes = [rootNote, upperNote]
    this.mainSynth!.triggerAttack(this.currentNotes)

    // Shadow (F/O) notes — octave doubling of the referring note
    if (mix.foFactor > 0) {
      this.shadowNotes = this.buildShadowNotes(bracket, rootMidi, foDirection)
      if (this.shadowNotes.length > 0) {
        this.shadowSynth!.triggerAttack(this.shadowNotes)
      }
    }
  }

  stop() {
    if (this.mainSynth && this.currentNotes.length > 0) {
      this.mainSynth.triggerRelease(this.currentNotes)
      this.currentNotes = []
    }
    if (this.shadowSynth && this.shadowNotes.length > 0) {
      this.shadowSynth.triggerRelease(this.shadowNotes)
      this.shadowNotes = []
    }
  }

  async setMix(mix: SoundFactorMix) {
    this.currentMix = mix
    if (!this.mainSynth) return
    this.applyMix(mix, this.lastBracket, this.lastRootMidi, this.lastFODir)
  }

  private applyMix(mix: SoundFactorMix, bracket: number, rootMidi: number, foDir: FODirection) {
    if (!this.mainSynth || !this.reverb || !this.shadowGain) return

    // — Pulsation (0=masked, 10=exposed) —
    // Low: short release + wet reverb (beats wash out before accumulating)
    // High: long release + dry signal (beats sustain and accumulate clearly)
    const p = mix.pulsation / 10
    this.reverb.set({ wet: 0.55 - p * 0.52 })              // 0.55 → 0.03
    this.mainSynth.set({ envelope: { release: 0.3 + p * 3.5 } })  // 0.3s → 3.8s

    // — Harmonicity (0=sine/smooth, 10=sawtooth/rough) —
    const oscType = oscTypeFromHarmonicity(mix.harmonicity)
    this.mainSynth.set({ oscillator: { type: oscType } })

    // — F/O Factor (0=silent shadow, 10=prominent shadow note) —
    // Map 0–10 → gain 0.0 → 0.55
    const foGain = (mix.foFactor / 10) * 0.55
    this.shadowGain!.gain.rampTo(foGain, 0.1)
  }

  private buildShadowNotes(bracket: number, rootMidi: number, foDir: FODirection): string[] {
    // Returns note(s) that reinforce the shadow direction
    // DOWN: lower note drops an octave — anchors the lower note as the implied root
    // UP:   upper note rises an octave — anchors the upper note as the implied root
    // BOTH: reinforce both directions
    const Tone = require('tone')  // safe here — only runs client-side after init()
    const lower = rootMidi
    const upper = rootMidi + bracket

    if (foDir === 'down') {
      const n = Tone.Frequency(lower - 12, 'midi').toNote()
      return [n]
    }
    if (foDir === 'up') {
      const n = Tone.Frequency(upper + 12, 'midi').toNote()
      return [n]
    }
    // both
    const nLow  = Tone.Frequency(lower - 12, 'midi').toNote()
    const nHigh = Tone.Frequency(upper + 12, 'midi').toNote()
    return [nLow, nHigh]
  }

  dispose() {
    this.stop()
    this.mainSynth?.dispose()
    this.shadowSynth?.dispose()
    this.reverb?.dispose()
    this.mainGain?.dispose()
    this.shadowGain?.dispose()
    this.mainSynth  = null
    this.shadowSynth = null
    this.reverb     = null
    this.mainGain   = null
    this.shadowGain = null
  }
}
