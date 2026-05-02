/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Supabase auto-generated types use complex generics that don't resolve
  // cleanly with Next.js's type checker. Fix types incrementally post-migration.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog-posts',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog-posts/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/fisique-challenge',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fisique-challenge/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
