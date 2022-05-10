var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    // other plugins ...
  ],
  env: {
    NEXT_PUBLIC_BACK: process.env.NEXT_PUBLIC_BACK,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
  },
};

module.exports = nextConfig;
