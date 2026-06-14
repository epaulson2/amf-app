import type { SoundFactorMix, FODirection, InstrumentPreset } from '../data/dichords'
import { INSTRUMENT_PRESETS } from '../data/dichords'

// Signal chain:
//   mainSynth → chebyshev → mainGain → reverb → Destination
//   shadowSynth → shadowGain → reverb
//
// Instrument preset → oscillator type + ADSR (base timbre, not touched by harmonicity)
// Harmonicity dimmer → Chebyshev order (1=clean … 5=harmonically rich)
// Pulsation dimmer → reverb wet + release time (scaled from preset base)
// F/O Factor dimmer → shadowGain (completely separate signal path)

export class DiChordSynth {
  private mainSynth:   import('tone').PolySynth | null = null
  private shadowSynth: import('tone').PolySynth | null = null
  private chebyshev:   import('tone').Chebyshev | null = null
  private reverb:      import('tone').Reverb    | null = null
  private mainGain:    import('tone').Gain      | null = null
  private shadowGain:  import('tone').Gain      | null = null

  private currentNotes:  string[] = []
  private shadowNotes:   string[] = []
  private currentMix: SoundFactorMix = { pulsation: 5, harmonicity: 3, foFactor: 3 }
  private currentPreset: InstrumentPreset = INSTRUMENT_PRESETS.pad
  private lastBracket  = 0
  private lastRootMidi = 57
  private lastFODir: FODirection = 'down'

  async init() {
    const Tone = await import('tone')
    const preset = this.currentPreset

    this.reverb     = new Tone.Reverb({ decay: 2.0, wet: 0.3 }).toDestination()
    this.mainGain   = new Tone.Gain(0.8).connect(this.reverb)
    this.shadowGain = new Tone.Gain(0.0).connect(this.reverb)
    this.chebyshev  = new Tone.Chebyshev(1).connect(this.mainGain)

    this.mainSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: preset.oscillatorType },
      envelope: { ...preset.envelope },
    }).connect(this.chebyshev)

    this.shadowSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: preset.oscillatorType },
      envelope: {
        attack:  Math.max(0.05, preset.envelope.attack),
        decay:   preset.envelope.decay,
        sustain: preset.envelope.sustain,
        release: preset.envelope.release * 1.3,
      },
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

    this.applyMix(mix)

    const rootNote  = Tone.Frequency(rootMidi, 'midi').toNote()
    const upperNote = Tone.Frequency(rootMidi + bracket, 'midi').toNote()
    this.currentNotes = [rootNote, upperNote]
    this.mainSynth!.triggerAttack(this.currentNotes)

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
    this.applyMix(mix)
  }

  setInstrument(preset: InstrumentPreset) {
    this.currentPreset = preset
    if (!this.mainSynth || !this.shadowSynth) return
    this.mainSynth.set({
      oscillator: { type: preset.oscillatorType },
      envelope: {
        attack:  preset.envelope.attack,
        decay:   preset.envelope.decay,
        sustain: preset.envelope.sustain,
      },
    })
    this.shadowSynth.set({
      oscillator: { type: preset.oscillatorType },
      envelope: {
        attack:  Math.max(0.05, preset.envelope.attack),
        decay:   preset.envelope.decay,
        sustain: preset.envelope.sustain,
      },
    })
    this.applyMix(this.currentMix)
  }

  private applyMix(mix: SoundFactorMix) {
    if (!this.mainSynth || !this.reverb || !this.shadowGain || !this.chebyshev) return
    const preset = this.currentPreset

    // — Pulsation (0=masked, 10=exposed) —
    // Reverb wet: 0.55 → 0.03 (beats wash in reverb vs stay dry)
    // Release: scales from preset base × 0.25 to × 3.0
    const p = mix.pulsation / 10
    this.reverb.set({ wet: 0.55 - p * 0.52 })
    const release = preset.envelope.release * (0.25 + p * 2.75)
    this.mainSynth.set({ envelope: { release } })
    this.shadowSynth?.set({ envelope: { release: release * 1.3 } })

    // — Harmonicity (0=clean, 10=harmonically rich) —
    // Chebyshev order 1–5: 1 is pass-through, higher orders add harmonic content
    const order = 1 + Math.round((mix.harmonicity / 10) * 4)
    this.chebyshev.order = order

    // — F/O Factor (0=silent shadow, 10=prominent) —
    const foGain = (mix.foFactor / 10) * 0.55
    this.shadowGain.gain.rampTo(foGain, 0.1)
  }

  private buildShadowNotes(bracket: number, rootMidi: number, foDir: FODirection): string[] {
    const Tone = require('tone')
    const lower = rootMidi
    const upper = rootMidi + bracket

    if (foDir === 'down') return [Tone.Frequency(lower - 12, 'midi').toNote()]
    if (foDir === 'up')   return [Tone.Frequency(upper + 12, 'midi').toNote()]
    return [
      Tone.Frequency(lower - 12, 'midi').toNote(),
      Tone.Frequency(upper + 12, 'midi').toNote(),
    ]
  }

  dispose() {
    this.stop()
    this.mainSynth?.dispose()
    this.shadowSynth?.dispose()
    this.chebyshev?.dispose()
    this.reverb?.dispose()
    this.mainGain?.dispose()
    this.shadowGain?.dispose()
    this.mainSynth   = null
    this.shadowSynth = null
    this.chebyshev   = null
    this.reverb      = null
    this.mainGain    = null
    this.shadowGain  = null
  }
}
