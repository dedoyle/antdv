import store from '@/store'
import { message } from 'ant-design-vue'
export default {
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('message', this.handleMessage, false)
    })
  },
  destroyed () {
    // 注意移除监听！注意移除监听！注意移除监听！
    window.removeEventListener('message', this.handleMessage, false)
  },
  methods: {
    handleMessage(event) {
      const data = event.data
      data && data.cmd && this[data.cmd](data.params)
    },
    openRoute(params) {
      this.$router.push(params)
    },
    changePageState(params) {
      let oldUrl = this.url
      let strs = params.params.state.split('.')
      strs.unshift('#')
      // 注意params的顺序
      for(let i in params.params.params) {
        strs.push(params.params.params[i])
      }
      this.url = oldUrl + strs.join('/')
      this.replaceUrl()
    },
    logoutHandler(params) {
      store.commit('login/SET_TOKEN', '')
      this.$router.push({ name: 'Login', params: params })
      message.error('账号登录已失效或被修改，请检查账号后重新登录')
    },
    showMsgHandler(params) {
      message.error(params.msg)
    }
  }
}