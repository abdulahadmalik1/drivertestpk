/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  // Serve static images through Next.js optimiser (WebP conversion, caching)
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days browser cache
    deviceSizes: [320, 480, 640, 750, 828, 1080],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // Enable gzip / brotli compression
  compress: true,

  // Security & performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Clickjacking protection — allow same origin only
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Referrer privacy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 2 years — satisfies Lighthouse HSTS check
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Disable unnecessary browser features
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=(), notifications=()' },
        ],
      },
      // Cache static quiz images for 1 year
      {
        source: '/quiz-data/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Cache driving track photos for 1 year
      {
        source: '/tracks/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Cache quiz JSON for 30 days
      {
        source: '/quiz_data.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      // Cache favicons for 1 day
      {
        source: '/(favicon.*|android-chrome.*|apple-touch-icon.*|manifest.json)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ];
  },
};

export default nextConfig;
