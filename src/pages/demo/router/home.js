import LayoutContent from '@/components/common/LayoutContent.vue'

export default {
  path: '/home',
  redirect: '/home/index',
  component: LayoutContent,
  children: [
    {
      path: '/home/index',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '@demo/views/Home/Home.vue'),
      meta: {
        text: 'DEMO'
      }
    },
    {
      path: '/home/list',
      name: 'List',
      component: () =>
        import(/* webpackChunkName: "home" */ '@demo/views/Home/List.vue'),
      meta: {
        text: 'DEMO 列表'
      }
    }
  ]
}
