import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@index/store'
// import onUnauthorized from '@index/common/onUnauthorized.js'
import Home from '@demo/router/home.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Demo',
      redirect: '/home',
      meta: {
        text: 'DEMO',
      },
    },
    Home,
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
