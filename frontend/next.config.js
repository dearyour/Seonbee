/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACK: process.env.NEXT_PUBLIC_BACK,
  },
}

module.exports = nextConfig
