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
  // Enable build tracing with custom configuration
  outputFileTracing: false, // Temporarily disabled to prevent micromatch stack overflow
  // Custom webpack configuration to handle micromatch issues
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Optimize for build tracing
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
      
      // Add custom resolve configuration to prevent micromatch issues
      config.resolve = {
        ...config.resolve,
        symlinks: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
