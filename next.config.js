/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['bzzjkcrbwwrqlumxigag.supabase.co'],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 