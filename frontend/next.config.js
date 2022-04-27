/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACK: process.env.BACK,
  },
}

module.exports = nextConfig
