import request from './request.js'
import { getFileName, isFunction } from '@/common/scripts/utils.js'

const importAll = r => {
  return r.keys().reduce((acc, filePath) => {
    const rConf = r(filePath)
    const fileName = getFileName(filePath)
    acc[fileName] = rConf.default || rConf
    return acc
  }, {})
}

function getResult(mock, params) {
  return isFunction(mock) ? mock(params) : mock
}

function createRequest(scheme) {
  return (options = {}) => {
    options.config = options.config || {}
    const mockType = options.config.mock

    if (mockType) {
      return new Promise((resolve, reject) => {
        const res = getResult(
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

const createService = context => {
  const modules = importAll(context)

  const service = {}

  /**
   * 例如：service.getList = service.$getList
   * 在其他地方需要定制 getList 可以这么写
   * service.getList = () => {
   *   return service.$getList().then(...)
   * }
   *  */
  Object.keys(modules).forEach(module => {
    const schemeList = modules[module]
    let apiName = ''
    Object.keys(schemeList).forEach(scheme => {
      apiName = module + scheme
      service[apiName] = service['$' + apiName] = createRequest(
        schemeList[scheme]
      )
    })
  })

  return service
}

export default createService
