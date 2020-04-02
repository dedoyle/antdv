import request from './request.js'

let modules = {}

const requireFilter = require.context(
  // 指令目录
  '@/request/modules',
  // 不查找子目录
  false,
  // js文件
  /.+\.js$/
)

// 对每个配匹的文件
requireFilter.keys().forEach(fileName => {
  // 请求指令模块
  const filterConfig = requireFilter(fileName)

  // 获取组件的 PascalCase 命名
  const filterName = fileName
    // 移除开始的 './'
    .replace(/^\.\//, '')
    // 移除文件扩展
    .replace(/\.\w+$/, '')

  modules[filterName] = filterConfig.default || filterConfig
})

function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

function getResult(mock, params) {
  return isFunction(mock) ? mock(params) : mock
}

function createRequest(scheme) {
  return options => {
    options = options || {}
    options.config = options.config || {}
    let mockType = options.config.mock

    if (mockType) {
      return new Promise((resolve, reject) => {
        let res = getResult(
          scheme.mock[mockType],
          options.params || options.data
        )
        console.info('请求：', scheme.request.url, res)
        setTimeout(() => {
          mockType === 'success' && resolve(res)
          mockType === 'error' && reject(res)
        }, 200)
      })
    } else {
      return request({
        ...scheme.request,
        params: options.params,
        data: options.data,
        headers: options.headers,
        needCode: options.config.needCode,
        isHideMessage: options.config.isHideMessage
      })
    }
  }
}

let service = {}

/**
 * 例如：service.getList = service.$getList
 * 在其他地方需要定制 getList 可以这么写
 * service.getList = () => {
 *   service.$getList().then(...)
 * }
 * 当然也可以自由发挥
 *  */
Object.keys(modules).forEach(module => {
  let schemeList = modules[module]
  let apiName = ''
  Object.keys(schemeList).forEach(scheme => {
    apiName = module + scheme
    service[apiName] = service['$' + apiName] = createRequest(schemeList[scheme])
  })
})

export default service
