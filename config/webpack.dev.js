// webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { resolveApp } = require('./paths')

module.exports = merge(
  { ...common },
  {
    // 开发模式
    mode: 'development',
    // 输出
    output: {
      // bundle 文件名称
      filename: '[name].bundle.js',
      // bundle 文件路径
      path: resolveApp('dist'),
      // 编译前清除目录
      clean: true,
    },
    devServer: {
      open: true,//在服务器启动后打开浏览器
      host: 'local-ip',//host形式
      compress: true,//开启gzip压缩
      port: 8080,
      // liveReload: false,
      watchFiles: ['src/**/*']
    },
    // 开发工具，开启 source map，编译调试
    devtool: 'eval-cheap-module-source-map',
  }
) // 暂不添加配置
