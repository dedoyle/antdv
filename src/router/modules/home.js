import Layout from '@/components/common/LayoutUpToDown.vue'

export default {
  path: '/home',
  redirect: '/home/index',
  component: Layout,
  children: [
    {
      path: '/home/index',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
      meta: {
        text: '首页',
        keepAlive: true
      }
    }
  ]
}
