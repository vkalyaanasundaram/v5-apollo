/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ada-kapitus.com'],
    // domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
