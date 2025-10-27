/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/v2',        // Temporarily disabled for local testing
  // assetPrefix: '/v2',     // Temporarily disabled for local testing
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig