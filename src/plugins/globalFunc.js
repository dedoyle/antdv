import Vue from 'vue'
import router from '@/router'

const clearToken = function() {
  this.$store.commit('login/SET_TOKEN', '')
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

    Vue.prototype.$clearToken = clearToken
  }
}

Vue.use(globalFunc)
