import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import LoadData from '@/views/Global/LoadData/LoadData'

Vue.use(VueRouter)

const importAll = r => {
  return r.keys().map(key => {
    const rConf = r(key)
    return rConf.default || rConf
  })
}

const routes = importAll(require.context('@/router/modules', false, /\.js$/))

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/home',
      meta: {
        text: 'antdv'
      }
    },
    // {
    //   path: '/login/:redirect?',
    //   name: 'Login',
    //   component: resolve =>
    //     require(['@/views/Global/Login/Login.vue'], resolve),
    //   meta: {
    //     text: '登录'
    //   },
    //   props: true
    // },
    // {
    //   path: '/forget-pwd/:redirect?',
    //   name: 'ForgetPwd',
    //   component: resolve => {
    //     return require(['@/views/Global/Login/ForgetPwd.vue'], resolve)
    //   },
    //   props: true,
    //   meta: {
    //     text: '忘记密码'
    //   }
    // },
    ...routes,
    // {
    //   path: '/load-data',
    //   name: 'LoadData',
    //   meta: {
    //     text: '加载公共数据中'
    //   },
    //   component: LoadData
    // },
    {
      path: '*',
      redirect: '/',
      visible: true,
      sort: 0
    }
  ]
})

// router.beforeEach(async(to, from, next) => {
//   to.meta.text && (document.title = to.meta.text)

//   if (store.getters['login/token']) {
//     // console.log('has token')
//     if (to.name === 'Login') {
//       // console.log('to login ==> to root')
//       next({ name: 'Root' })
//       return
//     }

//     const { permission } = to.meta
//     if (permission) {
//       // console.log('need permission')
//       const permissionList = store.getters['login/permissionList']
//       if (permissionList && permissionList.indexOf(permission) === -1) {
//         // console.log('unauthorized')
//         // , { config: { mock: 'success' }}
//         await store.dispatch('login/logout')
//         next({ name: 'Login' })
//       }
//     }

//     // let noInitData = !store.getters['init/initData']
//     // let whiteList = ['LoadData']
//     // if (whiteList.indexOf(to.name) === -1 && noInitData) {
//     //   // console.log('no init data')
//     //   next({ name: 'LoadData' })
//     // } else {
//     // console.log('no problem')
//     next()
//     // }
//   } else {
//     const whiteList = ['Login', 'Register', 'ForgetPwd']

//     if (whiteList.indexOf(to.name) > -1) {
//       // console.log('login register ForgetPwd')
//       next()
//     } else {
//       // console.log('not whitelist ==> login')
//       next({ name: 'Login', params: { redirect: to.path } })
//     }
//   }
// })

export default router
