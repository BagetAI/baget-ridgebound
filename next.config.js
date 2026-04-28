/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baget-ridgebound.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
      }
    ],
  },
}

module.exports = nextConfig
