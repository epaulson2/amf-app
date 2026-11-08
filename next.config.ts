import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ['gray-matter'],
  images: { qualities: [75, 90] },
}

export default nextConfig
