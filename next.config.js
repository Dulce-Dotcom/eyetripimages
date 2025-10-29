/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/v2',
  assetPrefix: '/v2',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/v2',
  },
}

module.exports = nextConfig