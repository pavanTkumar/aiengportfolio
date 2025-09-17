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
  // Force enable build tracing - this is the key setting
  outputFileTracing: true,
  // Ensure build tracing is not disabled by Vercel
  output: undefined,
}

module.exports = nextConfig
