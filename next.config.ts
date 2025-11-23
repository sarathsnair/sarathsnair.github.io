import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'], // Prefer WebP format when possible
  },
  trailingSlash: true,
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // React strict mode for better performance
  reactStrictMode: true,
  // Optimize chunks and imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  // Optimize CSS
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

export default nextConfig;
