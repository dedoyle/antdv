import Vue from 'vue'
import { getFileName } from './utils.js'

// 脚本自动注入，文件名必须用大驼峰格式
const importAll = (r, handler) => {
  r.keys().forEach(fileName => {
    const module = getFileName(fileName)
    handler(r(fileName), module)
  })
}

// 注册全局组件
const requireComponent = require.context(
  '@/components/global',
  false,
  /[A-Z]\w+\.(vue|js)$/
)
const registerComponent = (conf, moduleName) => {
  Vue.component(moduleName, conf.default || conf)
}
importAll(requireComponent, registerComponent)

// // 注册全局指令
// const requireDirective = require.context('@/directives', false, /.+\.js$/)
// const registerDirective = (conf, moduleName) => {
//   Vue.directive(moduleName, conf.default || conf)
// }
// importAll(requireDirective, registerDirective)

// // 全局注册过滤器
// const requireFilter = require.context('@/filters', false, /.+\.js$/)
// const registerFilter = (conf, moduleName) => {
//   Vue.filter(moduleName, conf.default || conf)
// }
// importAll(requireFilter, registerFilter)
