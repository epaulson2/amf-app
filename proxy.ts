import { NextResponse, type NextRequest } from 'next/server'
import publicationHold from '@/lib/publication-hold.json'

const HELD_PATHS = new Set(publicationHold.paths)

export function proxy(request: NextRequest) {
  if (HELD_PATHS.has(request.nextUrl.pathname)) {
    return new NextResponse('This material is not published on this site.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/).*\\.(?:pdf|html|zip|png))'],
}
