const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const resolve = url => path.resolve(__dirname, url)
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['strip-ansi', 'ismobilejs'],
  configureWebpack() {
    const plugins = [
      new CompressionPlugin({
        test: /\.(js|html|json|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
    ]
    if (IS_PROD) {
      plugins.push([
        new CompressionPlugin({
          test: /\.(js|html|json|css)$/,
          threshold: 10240,
          deleteOriginalAssets: false
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),
        new LodashModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: resolve('./public/vendor/*.js'),
          // dll 引用路径
          publicPath: './vendor',
          // dll最终输出的目录
          outputPath: './vendor'
        })
      ])
    }
    return {
      plugins
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('lodash', 'lodash-es')
      .set('@ant-design/icons/lib/dist$', resolve('./src/plugins/icons.js'))
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
            reuseExistingChunk: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      })
    }
    return config
  },
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
