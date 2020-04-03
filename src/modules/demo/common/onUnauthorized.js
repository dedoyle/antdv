import store from '../store'
import router from '../router'
import { message } from 'ant-design-vue'
import { debounce } from 'lodash-es'

const MSG = '账号登录已失效或被修改，请检查账号后重新登录'

const onUnauthorized = (isHideMessage, msg = MSG) => {
  store.commit('login/SET_TOKEN', '')
  router.replace({
    name: 'Login',
    params: {
      redirect: router.currentRoute.fullPath
    }
  })
  !isHideMessage && message.error(msg)
}

export default debounce(onUnauthorized, 300)
