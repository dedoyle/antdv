import axios from 'axios'
import { message } from 'ant-design-vue'
import {
  serviceTimeout,
  retStatusCodeKey,
  retDataKey,
  retMsgKey,
  successStatusCodeValue
} from './config'
import onUnauthorized from '@/modules/framework/common/onUnauthorized.js'

// 创建axios实例
const service = axios.create({
  baseURL: '/', // api 的 base_url
  timeout: serviceTimeout, // 请求超时时间
  withCredentials: false // 跨域
})

const needResetClient = url => {
  return ['/sso', '/qr_code'].some(item => {
    return url.includes(item)
  })
}

/**
 * 接口原因
 * 1. sso 相关接口（/sso.* 和 /qr_code开头）采用 browser
 * 2. 其他采用 web
 * */
const resetClient = config => {
  if (needResetClient(config.url)) {
    if (
      config.params &&
      config.params.client &&
      config.params.client === 'web'
    ) {
      config.params.client = 'browser'
    }
    if (config.data && config.data.client && config.data.client === 'web') {
      config.data.client = 'browser'
    }
  }
}

// request拦截器
service.interceptors.request.use(
  config => {
    resetClient(config)

    config.method === 'get' && config.params && (config.params._r = Date.now())

    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response[retDataKey]
    if (res[retStatusCodeKey] === successStatusCodeValue) {
      return Promise.resolve(res[retDataKey])
    } else {
      !response.config.isHideMessage && message.error(res[retMsgKey])
      const errObj = response.config.needCode ? res : res[retMsgKey]
      return Promise.reject(errObj)
    }
  },
  error => {
    const res = error.response
    if (res) {
      const statusCode = res.status
      let msg = ''
      if (statusCode && typeof statusCode === 'number') {
        if (statusCode === 401 || statusCode === 403) {
          onUnauthorized(res.config.isHideMessage)
          return false
        } else if (statusCode >= 500) {
          msg = '服务器错误'
        } else if (statusCode >= 400) {
          msg = '客户端错误'
        }
      } else {
        msg = error
      }
      !res.config.isHideMessage && message.error(msg)
    }
    return Promise.reject(res ? res.data : error)
  }
)
export default service
