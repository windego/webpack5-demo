// webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths')

module.exports = merge({ ...common }, {
  // 生产模式
  mode: 'production',

  // 输出
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: '[name].[contenthash].bundle.js',

    // bundle 文件路径
    path: resolveApp('dist'),

    // 编译前清除目录
    clean: true
  },
  // 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，
  // 你应该将你的服务器配置为，不允许普通用户访问 source map 文件。
  devtool: 'source-map',


}) // 暂不添加配置