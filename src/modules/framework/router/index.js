import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/modules/framework/store'
import Layout from '@/components/common/layouts/Default/Layout.vue'
import LoadData from '../views/LoadData/LoadData.vue'
import onUnauthorized from '@/modules/framework/common/onUnauthorized.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Layout,
      meta: {
        text: '首页'
      }
    },
    {
      path: '/login/:redirect?',
      name: 'Login',
      component: resolve =>
        require(['../views/Login/Login.vue'], resolve),
      meta: {
        text: '登录'
      },
      props: true
    },
    {
      path: '/forget-pwd/:redirect?',
      name: 'ForgetPwd',
      component: resolve => {
        return require(['../views/ForgetPwd/ForgetPwd.vue'], resolve)
      },
      props: true,
      meta: {
        text: '忘记密码'
      }
    },
    {
      path: '/load-data',
      name: 'LoadData',
      component: LoadData,
      meta: {
        text: '加载公共数据中'
      },
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const checkPermission = permission => {
  const permissionList = store.getters['login/permissionList']
  if (permissionList && !permissionList.includes(permission)) {
    onUnauthorized(store, false, '没有访问权限')
    console.log('没权限')
    return false
  }
  return true
}

const checkInitData = next => {
  if (!store.getters['init/initData']) {
    console.log('没初始化')
    next({ name: 'LoadData' })
    return false
  }
  return true
}

const checkAppPermission = to => {
  const appIds = store.getters['home/appIds']
  if (
    !['Root', 'Login', 'LoadData'].includes(to.name) &&
    appIds.length > 0 &&
    !appIds.includes(to.params && to.params.appId)
  ) {
    console.log('不能进入该 app')
    onUnauthorized(store, false, '没有访问权限')
    return false
  }
  return true
}

router.beforeEach(async(to, from, next) => {
  to.meta.text && (document.title = to.meta.text)
  console.log(to.name)

  if (store.getters['login/token']) {
    let isValid = true
    if (to.name === 'Login') {
      next({ name: 'Root' })
      return
    }

    isValid = to.meta.permission && checkPermission(to.meta.permission)
    if (isValid === false) return false

    to.name !== 'LoadData' && (isValid = checkInitData(next))
    if (isValid === false) return false

    // 请求没做权限判断的情况下
    // 在前端只能直接根据应用 id 判断和跳转
    // 强制跳转至登录页，由于只会出现在切换角色账号登录的情况
    // 所以强制跳登录影响应该不大
    isValid = checkAppPermission(to)
    if (isValid === false) return false

    isValid !== false && console.log('进入路由')
    isValid !== false && next()
  } else {
    const canGoIn = ['Login', 'Register', 'ForgetPwd'].includes(to.name)
    console.log('can go in', canGoIn)
    next(canGoIn ? undefined : { name: 'Login', params: { redirect: to.fullPath } })
  }
})

export default router
