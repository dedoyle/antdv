import Vue from 'vue'
import router from '@/router'
import { debounce } from 'lodash-es'
import jsCallClient from '@/common/scripts/jsCallClient'
import onUnauthorized from '@/common/scripts/onUnauthorized.js'

const clearToken = function() {
  this.$store.commit('login/SET_TOKEN', '')
  jsCallClient({ func: 'setToken', params: { token: '' } })
}

const globalFunc = {
  install(Vue) {
    // 全局函数代码都放这里
    Vue.prototype.$goBack = params => {
      if (window.history.length <= 1) {
        router.push(params)
      } else {
        router.back()
      }
    }

    Vue.prototype.$onUnauthorized = debounce(onUnauthorized, 300)
    Vue.prototype.$clearToken = clearToken
  }
}

Vue.use(globalFunc)
