// next.config.js
const nextPWApkg = require('@ducanh2912/next-pwa')
const withPWA = nextPWApkg.default
  ? nextPWApkg.default({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      fallbacks: {
        document: false,
        image: false,
        staticImage: false
      },
      // ensure your sw.js lands under /practiceplayer
      swDest: 'public/practiceplayer/sw.js'
    })
  : nextPWApkg({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      fallbacks: {
        document: false,
        image: false,
        staticImage: false
      },
      swDest: 'public/practiceplayer/sw.js'
    })

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/practiceplayer',
  assetPrefix: '/practiceplayer',
  output: 'standalone',
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
