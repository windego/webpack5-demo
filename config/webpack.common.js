

const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const webpack = require('webpack')

const paths = require('./paths')

module.exports = {
  // 入口
  entry: {
    index: './src/index.tsx',
  },
  // 输出
  output: {
    filename: '[name].bundle.js' || '[name].[contenthash].bundle.js',
    path: paths.appDist,
    // publicPath: paths.appPublic,
    // 编译前清除目录
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
  module: {
    rules: [
      //加载图片
      {
        test: /\.svg/,
        type: 'asset/inline',//.svg文件都将作为data URI 注入到 bundle 中
        generator: {
          //默认是呈现为使用 Base64 算法编码的文件内容,
          //使用自定义编码算法
          dataUrl: content => {
            content = content.toString();
            return svgToMiniDataURI(content);
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: [paths.appSrc],
        //asset,webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：
        //小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
        type: 'asset',
      },
      //字体文件
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [paths.appSrc],
        type: 'asset/resource',
      },
      //SASS 
      // 
      {
        test: /.(scss|sass)$/,
        include: [paths.appSrc],
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // Enable CSS Modules features
              modules: true,
              // 在css-loader之前,允许多少个loaders
              importLoaders: 2,
            },
          },
          // 将 PostCSS 编译成 CSS
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          }
        ]
      }
    ],
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: 'release_v0',
      minify: false//压缩
    }),
    // 进度条
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        // custom logic
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    })
  ],
}