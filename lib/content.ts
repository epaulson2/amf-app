import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export async function getMarkdownContent(
  filePath: string
): Promise<{ content: string; data: Record<string, unknown> }> {
  const fullPath = path.join(CONTENT_DIR, filePath)
  const raw = await fs.readFile(fullPath, 'utf8')
  const { content, data } = matter(raw)
  return { content, data }
}

// ---------------------------------------------------------------------------
// Systems
// ---------------------------------------------------------------------------

export function getAllSystems(): string[] {
  return [
    'pdc',
    'blues-root',
    'tps-piano',
    'tps-guitar',
    'rhythm-cell',
    'rxp',
    'shape',
    'cas-arc',
    'pcs',
  ]
}

export const SYSTEM_FILE_MAP: Record<string, string> = {
  'pdc': '02-systems/pdc/field-manual.md',
  'blues-root': '02-systems/blues-root/field-manual.md',
  'tps-piano': '02-systems/tps/piano/field-manual.md',
  'tps-guitar': '02-systems/tps/guitar/field-manual.md',
  'rhythm-cell': '02-systems/rhythm-cell/field-manual.md',
  'rxp': '02-systems/rxp/field-manual.md',
  'shape': '02-systems/shape/field-manual.md',
  'cas-arc': '02-systems/cas-arc/field-manual.md',
  'pcs': '02-systems/pcs/partner-blueprint.md',
}

export const SYSTEM_QUICK_REF_MAP: Record<string, string | null> = {
  'pdc': '02-systems/pdc/quick-reference.md',
  'blues-root': '02-systems/blues-root/quick-reference.md',
  'tps-piano': '02-systems/tps/piano/quick-reference.md',
  'tps-guitar': '02-systems/tps/guitar/quick-reference.md',
  'rhythm-cell': '02-systems/rhythm-cell/quick-reference.md',
  'rxp': '02-systems/rxp/quick-reference.md',
  'shape': '02-systems/shape/quick-reference.md',
  'cas-arc': '02-systems/cas-arc/quick-reference.md',
  'pcs': null,
}

export const SYSTEM_DISPLAY_NAMES: Record<string, string> = {
  'pdc': 'PDC',
  'blues-root': 'Blues Root',
  'tps-piano': 'TPS (Piano)',
  'tps-guitar': 'TPS (Guitar)',
  'rhythm-cell': 'Rhythm Cell',
  'rxp': 'RXP',
  'shape': 'SHAPE',
  'cas-arc': 'CAS-ARC',
  'pcs': 'PCS',
}

export const SYSTEM_SUBTITLES: Record<string, string> = {
  'pdc': 'Perceive – Diagnose – Contribute',
  'blues-root': 'The Foundational Tone System',
  'tps-piano': 'Triad Placement System — Piano',
  'tps-guitar': 'Triad Placement System — Guitar',
  'rhythm-cell': 'Groove & Rhythmic Foundation',
  'rxp': 'Rhythm Expansion Pack',
  'shape': 'Melodic Shape System',
  'cas-arc': 'Composition Architecture System',
  'pcs': 'Pitch-Class Set System',
}

export const SYSTEM_ROLES: Record<string, string> = {
  'pdc': 'Lead Singer / Bandleader',
  'blues-root': 'Bassist / Groove Root',
  'tps-piano': 'Keyboardist / Harmonist',
  'tps-guitar': 'Keyboardist / Harmonist',
  'rhythm-cell': 'Drummer',
  'rxp': 'Drummer (Advanced Layer)',
  'shape': 'Lead Vocalist / Guitarist',
  'cas-arc': 'Producer / Arranger',
  'pcs': 'Advanced Intervallic Color',
}

// ---------------------------------------------------------------------------
// Genre Labs
// ---------------------------------------------------------------------------

export function getAllGenreLabs(): string[] {
  return [
    'blues',
    'jazz',
    'funk',
    'gospel',
    'folk-singer-songwriter',
    'rock',
    'ambient-film',
    'neo-soul',
    'latin-afro-cuban',
  ]
}

export const GENRE_FILE_MAP: Record<string, string> = {
  'blues': '03-genre-labs/blues.md',
  'jazz': '03-genre-labs/jazz.md',
  'funk': '03-genre-labs/funk.md',
  'gospel': '03-genre-labs/gospel.md',
  'folk-singer-songwriter': '03-genre-labs/folk-singer-songwriter.md',
  'rock': '03-genre-labs/rock.md',
  'ambient-film': '03-genre-labs/ambient-film.md',
  'neo-soul': '03-genre-labs/neo-soul.md',
  'latin-afro-cuban': '03-genre-labs/latin-afro-cuban.md',
}

export const GENRE_DISPLAY_NAMES: Record<string, string> = {
  'blues': 'Blues',
  'jazz': 'Jazz',
  'funk': 'Funk',
  'gospel': 'Gospel',
  'folk-singer-songwriter': 'Folk / Singer-Songwriter',
  'rock': 'Rock',
  'ambient-film': 'Ambient / Film',
  'neo-soul': 'Neo-Soul',
  'latin-afro-cuban': 'Latin / Afro-Cuban',
}

/**
 * Extract markdown content between two heading markers.
 * fromText: heading text to start from (inclusive). null = start of file.
 * stopTexts: array of heading text snippets that end the section (exclusive).
 */
export async function getMarkdownSection(
  filePath: string,
  fromText: string | null,
  stopTexts: string[] = []
): Promise<string> {
  const { content } = await getMarkdownContent(filePath)
  const lines = content.split('\n')
  let capturing = fromText === null
  const result: string[] = []

  for (const line of lines) {
    const isHeading = /^#{1,6} /.test(line)
    if (!capturing && isHeading && fromText && line.includes(fromText)) {
      capturing = true
    } else if (capturing && isHeading && stopTexts.some(s => line.includes(s))) {
      break
    }
    if (capturing) result.push(line)
  }
  return result.join('\n').trim()
}

/** Extract and concatenate multiple sections from the same file */
export async function getMarkdownSections(
  filePath: string,
  parts: Array<{ from: string | null; stop: string[] }>
): Promise<string> {
  const sections = await Promise.all(
    parts.map(p => getMarkdownSection(filePath, p.from, p.stop))
  )
  return sections.filter(Boolean).join('\n\n---\n\n')
}
