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
  // Enable build tracing with optimized configuration
  outputFileTracing: true,
  // Optimize webpack for better memory usage
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Optimize server-side build for production
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
        minimize: true,
      };
      
      // Increase memory limits for build tracing
      config.performance = {
        ...config.performance,
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000,
      };
    }
    return config;
  },
}

module.exports = nextConfig
