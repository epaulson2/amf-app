import type { Timbre } from '../data/dichords'

const OSCILLATOR_TYPES: Record<Timbre, OscillatorType | 'fmsine'> = {
  sine: 'sine',
  triangle: 'triangle',
  sawtooth: 'sawtooth',
  complex: 'fmsine',
}

export class DiChordSynth {
  private synth: import('tone').PolySynth | null = null
  private reverb: import('tone').Reverb | null = null
  private currentNotes: string[] = []
  private currentTimbre: Timbre = 'sine'

  async init() {
    const Tone = await import('tone')
    this.reverb = new Tone.Reverb({ decay: 1.2, wet: 0 }).toDestination()
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.9, release: 0.8 },
    }).connect(this.reverb)
  }

  async play(bracket: number, rootMidi: number, timbre: Timbre) {
    if (!this.synth) await this.init()
    const Tone = await import('tone')

    this.stop()
    this.applyTimbre(timbre)

    const rootNote = Tone.Frequency(rootMidi, 'midi').toNote()
    const upperNote = Tone.Frequency(rootMidi + bracket, 'midi').toNote()
    this.currentNotes = [rootNote, upperNote]

    this.synth!.triggerAttack(this.currentNotes)
  }

  stop() {
    if (this.synth && this.currentNotes.length > 0) {
      this.synth.triggerRelease(this.currentNotes)
      this.currentNotes = []
    }
  }

  private applyTimbre(timbre: Timbre) {
    if (!this.synth || !this.reverb) return
    this.currentTimbre = timbre
    const type = OSCILLATOR_TYPES[timbre]
    this.synth.set({ oscillator: { type: type as OscillatorType } })
    this.reverb.set({ wet: timbre === 'complex' ? 0.25 : 0 })
  }

  setTimbre(timbre: Timbre) {
    this.applyTimbre(timbre)
  }

  dispose() {
    this.stop()
    this.synth?.dispose()
    this.reverb?.dispose()
    this.synth = null
    this.reverb = null
  }
}
