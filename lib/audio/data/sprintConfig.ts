export interface SprintDrillConfig {
  sprint: number
  focusBrackets: number[]
  gateDescription: string
  anchorSong: string
  diChordName: string
}

export const SPRINT_CONFIG: SprintDrillConfig[] = [
  {
    sprint: 1,
    focusBrackets: [3, 4],
    gateDescription: '[3]/[4] discrimination 10/10 + singing from any pitch',
    anchorSong: "Ain't No Sunshine",
    diChordName: 'Minor vs Major Third',
  },
  {
    sprint: 2,
    focusBrackets: [5],
    gateDescription: 'Sing/play [5] from 3 starting notes, identify I→IV vs V→I by ear',
    anchorSong: 'Stand By Me',
    diChordName: 'Perfect Fourth',
  },
  {
    sprint: 3,
    focusBrackets: [7],
    gateDescription: 'Sing/play [7] in 3 keys, identify I→V in real music by ear',
    anchorSong: 'TBD',
    diChordName: 'Perfect Fifth',
  },
  {
    sprint: 4,
    focusBrackets: [2],
    gateDescription: 'Sing/play [2] from 3 starting notes, identify IV→V and V→vi',
    anchorSong: '12-Bar Blues',
    diChordName: 'Major Second',
  },
  {
    sprint: 5,
    focusBrackets: [3],
    gateDescription: 'Identify I→vi movement by ear in 3 keys',
    anchorSong: 'TBD',
    diChordName: 'Minor Third',
  },
  {
    sprint: 6,
    focusBrackets: [9],
    gateDescription: 'Identify vi→IV movement by ear in 3 keys',
    anchorSong: 'TBD',
    diChordName: 'Major Sixth',
  },
  {
    sprint: 7,
    focusBrackets: [4],
    gateDescription: 'Identify I→iii movement by ear in 3 keys',
    anchorSong: 'TBD',
    diChordName: 'Major Third',
  },
  {
    sprint: 8,
    focusBrackets: [6],
    gateDescription: 'Identify V7→I tritone resolution by ear',
    anchorSong: 'TBD',
    diChordName: 'Tritone',
  },
  {
    sprint: 9,
    focusBrackets: [1, 2, 3, 4, 5, 6, 7],
    gateDescription: 'Review + classical integration — all taught di-chords',
    anchorSong: 'TBD',
    diChordName: 'Review',
  },
  {
    sprint: 10,
    focusBrackets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    gateDescription: 'Advanced voicings — all 11 di-chords',
    anchorSong: 'TBD',
    diChordName: 'All Di-Chords',
  },
  {
    sprint: 11,
    focusBrackets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    gateDescription: 'Heptachord shift — all di-chords in context',
    anchorSong: 'TBD',
    diChordName: 'All Di-Chords',
  },
  {
    sprint: 12,
    focusBrackets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    gateDescription: 'Transposition + synthesis — the framework disappears',
    anchorSong: 'TBD',
    diChordName: 'All Di-Chords',
  },
]

export function getSprintConfig(sprint: number): SprintDrillConfig {
  return SPRINT_CONFIG.find(c => c.sprint === sprint) ?? SPRINT_CONFIG[0]
}
