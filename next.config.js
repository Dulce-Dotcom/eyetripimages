/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/eyetripimages',
  assetPrefix: '/eyetripimages',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig