// next.config.js
const withPWA = require('@ducanh2912/next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: false,
    image: false,
    staticImage: false
  },
  // sw.js の出力パスを basePath 下に調整
  swDest: 'public/practiceplayer/sw.js'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/practiceplayer',
  assetPrefix: '/practiceplayer',
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true }
}

module.exports = withPWA(nextConfig)
