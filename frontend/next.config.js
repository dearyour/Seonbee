var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "shopping-phinf.pstatic.net"],
  },
  webpack: (config, options) => {
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  },
  env: {
    NEXT_PUBLIC_BACK: process.env.NEXT_PUBLIC_BACK,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
    NEXT_PUBLIC_CHAT: process.env.NEXT_PUBLIC_CHAT,
  },
};

module.exports = nextConfig;
