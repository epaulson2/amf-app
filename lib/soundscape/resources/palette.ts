// One authoritative record set for the Interval Palette: lesson embed, standalone cards, atlas and audio.
// Sources (epaulson2/AMF docs/ajourne-site-implementation-20261105, implementation/resources/interval-palette/):
// INTERVAL_DATA_V1.json (names, MIDI, spelling, colours), QUICK_PALETTE_CONTENT_V1.md, DEEP_ATLAS_CONTENT_V1.md.
import data from './interval-data.json'
import quick from './quick.json'
import atlas from './atlas.json'

export type IntervalRecord = {
  id: string; anchor: string; semitones: number; name: string; abbr: string
  lowerName: string; upperName: string; lowerMidi: number; upperMidi: number
  altSpelling: { name: string; lower: string; upper: string; midi: number } | null
  color: { name: string; hex: string }
  words: string; role: string; example: string
  quick: { colorCue: string; impression: string; canDo: string; tryThis: string; remember: string }
  deep: { colorCue: string; example: string; words: string; sections: [string, string][]; actions: string }
}

const SECTION_ORDER = ['Meet the interval', 'As a moving melody', 'Two notes together', 'In actual music', 'Listen and create', 'Paint What You Hear', 'Keep in mind']

export const INTERVALS: IntervalRecord[] = data.cards.map(c => {
  const row = quick.rows.find(r => r.id === c.id)!
  const ex = (quick.expansions as Record<string, Record<string, string>>)[c.id]
  const ch = atlas.chapters.find(x => x.id === c.id) as unknown as Record<string, string>
  return {
    id: c.id, anchor: `ip-${String(c.semitones).padStart(2, '0')}`, semitones: c.semitones, name: c.intervalName, abbr: c.abbreviation,
    lowerName: c.sourceRoot.name, upperName: c.sourceUpper.name, lowerMidi: c.sourceRoot.midi, upperMidi: c.sourceUpper.midi,
    altSpelling: c.alternateEnharmonicSpelling ? { name: c.alternateEnharmonicSpelling.intervalName, lower: c.alternateEnharmonicSpelling.lower, upper: c.alternateEnharmonicSpelling.upper, midi: c.alternateEnharmonicSpelling.midi } : null,
    color: { name: c.color.name, hex: c.color.hex },
    words: row.words, role: row.role, example: row.example,
    quick: { colorCue: ex['Color cue'], impression: ex['Sound impression to consider'], canDo: ex['What it can do'], tryThis: ex['Try this'], remember: ex['Remember'] },
    deep: { colorCue: ch.colorCue, example: ch.example, words: ch.words, sections: SECTION_ORDER.map(k => [k, ch[k]] as [string, string]), actions: ch.actions },
  }
})

export const QUICK_INTRO = quick.intro
export const ATLAS = atlas
export const BY_ID = Object.fromEntries(INTERVALS.map(i => [i.id, i]))
export const noteRecipe = (i: IntervalRecord) => `${i.name} (${i.semitones} semitones): ${i.lowerName} + ${i.upperName} (MIDI ${i.lowerMidi} + ${i.upperMidi}).`
