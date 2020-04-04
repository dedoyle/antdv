<template>
  <div class="layout-cnt">
    <iframe
      :src="appUrl"
      frameborder="0"
      width="100%"
      height="100%"
      loading="lazy"></iframe>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutContent',
  data() {
    return {
      appUrl: '/demo/index.html'
    }
  },
  computed: {
    ...mapGetters('keepAlive', ['excludeComponents']),
  }
}
</script>
<style lang="less" scoped>
.layout-cnt {
  height: 100%;
}
</style>
