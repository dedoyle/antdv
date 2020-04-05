const path = require('path')
const glob = require('glob')

const generateEntries = () => {
  // 默认查询多页面地址
  const PATH_ENTRY = path.resolve(__dirname, './src/pages')
  // 约定构建出的页面用目录名，默认入口为每个页面的 main.js
  const entryFilePaths = glob.sync(PATH_ENTRY + '/**/main.js')

  return entryFilePaths.reduce((entry, filePath) => {
    const FILENAME = filePath.match(/([^/]+)\/main\.js$/)[1]
    entry[FILENAME] = {
      entry: filePath,
      template: 'public/index.html',
      filename:
        FILENAME === 'index'
          ? `${FILENAME}.html`
          : `${FILENAME}/index.html`,
      chunks: ['chunk-vendors', 'chunk-common', 'chunk-ant-design-vue', FILENAME],
    }
  }, {})
}

module.exports = {
  generateEntries,
}
