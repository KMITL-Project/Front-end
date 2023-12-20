
/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    output: 'standalone',
    publicRuntimeConfig: {
        DebugMode: process.env.DebugMode === "true" ? true : false,
    },
    webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
