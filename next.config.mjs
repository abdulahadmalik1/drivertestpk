/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve static images through Next.js optimiser (WebP conversion, caching)
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days browser cache
    deviceSizes: [320, 480, 640, 750, 828, 1080],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // Enable gzip / brotli compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/quiz-data/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/tracks/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Cache quiz JSON for 30 days
      {
        source: '/quiz_data.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
