var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'shopping-phinf.pstatic.net'],
  },
  webpack: (config, options) => {
    config.plugins.push(new CaseSensitivePathsPlugin());

    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
  env: {
    NEXT_PUBLIC_BACK: process.env.NEXT_PUBLIC_BACK,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
    NEXT_PUBLIC_CHAT: process.env.NEXT_PUBLIC_CHAT,
  },
};

module.exports = nextConfig;
