import ArtistConnectionMap from '@/components/ArtistConnectionMap'

const WIKI: Record<string, string> = {
  'george-clinton':        'George Clinton (musician)',
  'parliament-funkadelic': 'Parliament-Funkadelic',
  'junie-morrison':        'Junie Morrison',
  'ohio-players':          'Ohio Players',
  'bootsy-collins':        'Bootsy Collins',
  'catfish-collins':       'Catfish Collins',
  'james-brown':           'James Brown',
  'philippe-wynne':        'Philippe Wynne',
  'spinners':              'The Spinners (American R&B group)',
  'motown':                'Motown',
  'gc-cameron':            'G.C. Cameron',
  'syreeta-wright':        'Syreeta Wright',
  'stevie-wonder':         'Stevie Wonder',
}

async function getWikiImage(title: string): Promise<string | null> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`
    const r = await fetch(url, { next: { revalidate: 86400 } })
    if (!r.ok) return null
    const d = await r.json()
    const page = Object.values(d.query.pages)[0] as Record<string, unknown>
    const thumb = (page?.thumbnail as Record<string, unknown>)?.source
    return typeof thumb === 'string' ? thumb : null
  } catch {
    return null
  }
}

export const metadata = {
  title: 'Artist Connection Map — AMF',
  description: 'Explore the musical web connecting Parliament-Funkadelic, Motown, James Brown, and beyond.',
}

export default async function ConnectionsPage() {
  const entries = await Promise.all(
    Object.entries(WIKI).map(async ([id, title]) => [id, await getWikiImage(title)])
  )
  const images = Object.fromEntries(entries) as Record<string, string | null>
  return <ArtistConnectionMap images={images} />
}
