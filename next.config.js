const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            // pathname: '/my-bucket/**',
          },
          {
            protocol: 'https',
            hostname: 'images.prismic.io',
            port: '',
            // pathname: '/my-bucket/**',
          },
        ],
      },
}

module.exports = withBundleAnalyzer(nextConfig)