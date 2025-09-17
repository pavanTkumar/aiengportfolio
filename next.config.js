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
  // Enable build tracing with specific configuration to prevent stack overflow
  outputFileTracing: true,
  // Configure build tracing to prevent micromatch stack overflow
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Optimize for build tracing
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
