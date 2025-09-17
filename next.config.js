/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Disable build traces to prevent stack overflow
  outputFileTracing: false,
}

module.exports = nextConfig
