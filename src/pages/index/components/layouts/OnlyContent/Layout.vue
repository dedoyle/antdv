<template>
  <div class="platform">
    <LayoutContent />
  </div>
</template>
<script>
import LayoutContent from '@index/components/layouts/LayoutContent.vue'

export default {
  name: 'Layout',
  components: {
    LayoutContent
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.platform {
  height: 100%;
  background: rgba(244, 246, 249, 1);
}
</style>
