

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: 'release_v0',
      minify: false//压缩
    }),
  ],
}