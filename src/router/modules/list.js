import Layout from '@/components/common/LayoutUpToDown.vue'

export default {
  path: '/userlist',
  redirect: '/userlist/index',
  component: Layout,
  children: [
    {
      path: '/userlist/index',
      name: 'UserList',
      component: () =>
        import(/* webpackChunkName: "userlist" */ '@/views/UserList/UserList.vue'),
      meta: {
        text: '首页',
        keepAlive: true
      }
    }
  ]
}
