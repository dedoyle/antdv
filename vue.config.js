const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { generateEntries } = require('./mutiple-entry')

const resolve = (dir) => path.resolve(__dirname, dir)
const IS_PROD = process.env.NODE_ENV === 'production'

const pages = generateEntries()

module.exports = {
  productionSourceMap: false,
  pages,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    extract: IS_PROD && {
      moduleFilename: ({ name }) => {
        return name === 'index'
          ? 'css/[name].[contenthash:8].css'
          : '[name]/[name].[contenthash:8].css'
      },
      chunkFilename: 'css/[name].[contenthash:8].css',
    },
  },
  transpileDependencies: ['strip-ansi', 'ismobilejs'],
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [
        new CompressionPlugin({
          test: /\.(js|html|json|css)$/,
          threshold: 10240,
          deleteOriginalAssets: false,
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),
        new LodashModuleReplacementPlugin(),
        new HardSourceWebpackPlugin()
      ]
      return {
        plugins
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('lodash', 'lodash-es')
      .set('@ant-design/icons/lib/dist$', resolve('./src/plugins/icons.js'))
      .set('@index', resolve('./src/pages/index'))
      .set('@demo', resolve('./src/pages/demo'))
    // 防止多页面打包卡顿
    // config.plugins.delete('named-chunks')
    if (IS_PROD) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 移除 preload 插件
      config.plugins.delete('preload')
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial', // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载）
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        },
      })
      config.output.filename((bundle) => {
        return bundle.chunk.name === 'index'
          ? 'js/[name].[contenthash:8].js'
          : '[name]/[name].[contenthash:8].js'
      })
    } else {
      config.output.filename((bundle) => {
        return bundle.chunk.name === 'index'
          ? 'js/[name].js'
          : '[name]/[name].js'
      })
    }
    return config
  },
}
