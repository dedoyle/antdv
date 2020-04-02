<template>
  <div class="layout-cnt">
    <iframe
      :src="iframeSrc"
      frameborder="0"
      width="100%"
      height="100%"></iframe>
    <!-- <keep-alive :exclude="excludeComponents">
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutContent',
  data() {
    return {}
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
