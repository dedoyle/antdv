const path = require('path')
const glob = require('glob')

const IS_DEV = process.env.NODE_ENV === 'development'
const resolve = dir => path.resolve(__dirname, dir)

const getTemplate = FILENAME => {
  return IS_DEV && FILENAME !== 'index'
    ? 'public/app.html'
    : 'public/index.html'
}

const generateEntries = () => {
  // 默认查询多页面地址
  const PATH_ENTRY = resolve('./src/pages')
  // 约定构建出的页面用目录名，默认入口为每个页面的 main.js
  const entryFilePaths = glob.sync(PATH_ENTRY + '/**/main.js')

  return entryFilePaths.reduce((entry, filePath) => {
    const FILENAME = filePath.match(/([^/]+)\/main\.js$/)[1]
    entry[FILENAME] = {
      entry: filePath,
      template: getTemplate(FILENAME),
      filename: IS_DEV ? `${FILENAME}.html` : 'index.html',
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'chunk-ant-design-vue',
        FILENAME
      ]
    }
    return entry
  }, {})
}

module.exports = {
  generateEntries
}
