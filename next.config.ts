import type { NextConfig } from 'next'
import { AlphaTabWebPackPlugin } from '@coderline/alphatab-webpack'

const nextConfig: NextConfig = {
  serverExternalPackages: ['gray-matter'],
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new AlphaTabWebPackPlugin({
          alphaTabSourceDir: require('path').join(require.resolve('@coderline/alphatab'), '..', '..', 'dist'),
        })
      )
    }
    return config
  },
}

export default nextConfig
