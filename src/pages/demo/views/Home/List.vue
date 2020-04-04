<template>
  <div class="page p24">
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <template slot="actions" v-for="{type, text} in actions">
          <span :key="type">
            {{text}}
          </span>
        </template>
        <img
          v-if="!loading"
          slot="extra"
          width="272"
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <a-skeleton :loading="loading" active avatar :paragraph="{rows: 4}">
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{item.title}}</a>
            <a-avatar slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          {{item.content}}
        </a-skeleton>
      </a-list-item>
    </a-list>
    <SearchResult v-if="!listData || listData.length <= 0" />
  </div>
</template>
<script>
import color from '@/common/scripts/changeColor.js'

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
export default {
  name: 'List',
  components: {},
  data() {
    return {
      listData,
      loading: true,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      },
      colors: [
        '#cfc880',
        '#830cf3',
        '#3399ff'
      ]
    }
  },
  computed: {
    actions() {
      return this.loading
        ? []
        : [
          { type: 'star-o', text: '156' },
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' }
        ]
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 400)
  },
  methods: {
    handleChange(val) {
      color.changeColor(val)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
