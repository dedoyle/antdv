const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { generateEntries } = require('./mutiple-entry')

const resolve = dir => path.resolve(__dirname, dir)
const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = process.env.NODE_ENV === 'development'
const pageName = process.argv[3] || 'index'

console.log(IS_DEV)
console.log(pageName)

const entries = generateEntries()
const pages = IS_DEV ? entries : { [pageName]: entries[pageName] }

console.log(pages)

const plugins = [
  // dll插件加入
  new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require('./public/vendor/vendor-manifest.json')
  })
]

// 开发插件这个有问题
const devPlugins = [
  /**
   * 缓存加速二次构建速度
   */
  new HardSourceWebpackPlugin(),
  new HardSourceWebpackPlugin.ExcludeModulePlugin([
    {
      // HardSource works with mini-css-extract-plugin but due to how
      // mini-css emits assets, assets are not emitted on repeated builds with
      // mini-css and hard-source together. Ignoring the mini-css loader
      // modules, but not the other css loader modules, excludes the modules
      // that mini-css needs rebuilt to output assets every time.
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
    }
  ])
]

module.exports = {
  productionSourceMap: false,
  pages,
  outputDir: IS_PROD ? `dist/${pageName}` : 'dist',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['strip-ansi', 'ismobilejs'],
  configureWebpack: config => {
    if (IS_PROD) {
      return {
        plugins: plugins.concat([
          new CompressionPlugin({
            test: /\.(js|html|json|css)$/,
            threshold: 10240,
            deleteOriginalAssets: false
          }),
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),
          new LodashModuleReplacementPlugin()
        ])
      }
    } else {
      return {
        plugins: plugins.concat(devPlugins)
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('lodash', 'lodash-es')
      .set('@ant-design/icons/lib/dist$', resolve('./src/plugins/icons.js'))

    Object.keys(entries).forEach(page => {
      config.resolve.alias.set(`@${page}`, resolve(`./src/pages/${page}`))
    })
    // 防止多页面打包卡顿
    // config.plugins.delete('named-chunks')
    if (IS_PROD) {
      // 移除 preload 插件
      Object.keys(pages).forEach(entryName => {
        config.plugins.delete(`prefetch-${entryName}`)
        // config.plugins.delete(`preload-${entryName}`)
      })
      config.optimization.splitChunks({
        maxAsyncRequests: 5, // 所有异步请求不得超过5个
        maxInitialRequests: 3,
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
      // 默认配置多页面模式保证可扩展性
      config.optimization.runtimeChunk('multiple')
    }
    return config
  }
}
