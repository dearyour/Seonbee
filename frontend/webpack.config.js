// webpack.config.js

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // add

module.exports = {
  // ...
  plugins: [
    // ...
    new CaseSensitivePathsPlugin() // add
  ]
};