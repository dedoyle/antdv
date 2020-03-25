<template>
  <div class="no-result">
    <div class="cnt">{{ title || '搜索不到你想要的资源' }}</div>
  </div>
</template>
<script>
export default {
  name: 'SearchResult',
  props: ['title'],
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.no-result {
  display: flex;
  height: 100%;
  .cnt {
    margin: auto;
  }
}
</style>
