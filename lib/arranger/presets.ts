export interface StylePreset {
  id: string
  name: string
  tuningBias: string[]
  preferredMode: string
  nctDensity: 'low' | 'medium' | 'high'
  openStringBias: number
  motionPreference: 'contrary' | 'stepwise' | 'mixed'
  suspensionFrequency: 'rare' | 'moderate' | 'frequent'
  innerVoiceActivity: 'sparse' | 'moderate' | 'dense'
  parallelThirds: boolean
  modalFlavor: string | null
  description: string
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'balanced',
    name: 'Balanced (default)',
    tuningBias: ['DADGAD', 'Standard'],
    preferredMode: 'voice-led',
    nctDensity: 'medium',
    openStringBias: 0.5,
    motionPreference: 'mixed',
    suspensionFrequency: 'moderate',
    innerVoiceActivity: 'moderate',
    parallelThirds: false,
    modalFlavor: null,
    description: 'No stylistic bias — lets the counterpoint rules drive the arrangement.',
  },
  {
    id: 'bensusan',
    name: 'Pierre Bensusan',
    tuningBias: ['DADGAD'],
    preferredMode: 'free-counterpoint',
    nctDensity: 'high',
    openStringBias: 0.85,
    motionPreference: 'contrary',
    suspensionFrequency: 'frequent',
    innerVoiceActivity: 'dense',
    parallelThirds: false,
    modalFlavor: 'mixolydian',
    description: 'DADGAD master. Maximum open strings, heavy suspensions, modal (Mixolydian) flavor.',
  },
  {
    id: 'simpson',
    name: 'Martin Simpson',
    tuningBias: ['DADGAD', 'Standard'],
    preferredMode: 'second-species',
    nctDensity: 'medium',
    openStringBias: 0.65,
    motionPreference: 'stepwise',
    suspensionFrequency: 'moderate',
    innerVoiceActivity: 'sparse',
    parallelThirds: true,
    modalFlavor: null,
    description: 'Lyrical stepwise bass lines, parallel thirds in inner voice, bluesy inflections.',
  },
  {
    id: 'mckee',
    name: 'McKee / McMeen style',
    tuningBias: ['Standard'],
    preferredMode: 'first-species',
    nctDensity: 'low',
    openStringBias: 0.4,
    motionPreference: 'contrary',
    suspensionFrequency: 'rare',
    innerVoiceActivity: 'sparse',
    parallelThirds: false,
    modalFlavor: null,
    description: 'Clean two-voice texture in standard tuning. Clear counterpoint, minimal embellishment.',
  },
  {
    id: 'hedges',
    name: 'Michael Hedges style',
    tuningBias: ['DADGAD', 'Standard'],
    preferredMode: 'imitation',
    nctDensity: 'high',
    openStringBias: 0.7,
    motionPreference: 'mixed',
    suspensionFrequency: 'moderate',
    innerVoiceActivity: 'dense',
    parallelThirds: false,
    modalFlavor: null,
    description: 'Imitative counterpoint, percussive open strings, complex inner voice density.',
  },
]
