import Layout from '@/components/common/LayoutUpToDown.vue'

export default {
  path: '/list',
  redirect: '/list/index',
  component: Layout,
  children: [
    {
      path: '/list/index',
      name: 'List',
      component: () =>
        import(/* webpackChunkName: "list" */ '@/views/List/List.vue'),
      meta: {
        text: '首页',
        keepAlive: true
      }
    }
  ]
}
