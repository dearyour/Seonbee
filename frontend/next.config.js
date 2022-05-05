/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACK: process.env.NEXT_PUBLIC_BACK,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
  },
};

module.exports = nextConfig;
