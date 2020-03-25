<template>
  <div class="layout-cnt">
    <keep-alive :exclude="excludeComponents">
      <router-view v-if="$route.meta && $route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta || !$route.meta.keepAlive" />
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
  },
}
</script>
<style lang="less" scoped>
.layout-cnt {
  flex: 1;
  background: #fff;
  overflow-y: auto;
}
</style>
