/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Aggressive cache prevention for static export
  generateBuildId: async () => {
    // Use timestamp to ensure unique build ID every time
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig