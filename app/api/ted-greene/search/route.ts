import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const SCRIPT = '/home/elderle/amf-app/scripts/ted_greene_rag.py'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') ?? '6', 10)
  const stage = searchParams.get('stage')
  const category = searchParams.get('category')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'q param required' }, { status: 400 })
  }

  const args = [
    `python3 ${SCRIPT} search`,
    `"${query.replace(/"/g, '\\"')}"`,
    `--limit ${limit}`,
    '--json',
    stage ? `--stage ${stage}` : '',
    category ? `--category "${category}"` : '',
  ]
    .filter(Boolean)
    .join(' ')

  try {
    const { stdout, stderr } = await execAsync(args, { timeout: 30_000 })
    if (stderr && !stderr.includes('Loading') && !stderr.includes('Model')) {
      console.error('[ted-greene/search]', stderr)
    }
    const results = JSON.parse(stdout)
    return NextResponse.json({ results, query })
  } catch (err: any) {
    console.error('[ted-greene/search error]', err.message)
    return NextResponse.json({ error: 'search failed', detail: err.message }, { status: 500 })
  }
}
