<template>
  <div class="page flex-box">
    <div class="load-data">loading</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoadData',
  props: [],
  components: {},
  data() {
    return {}
  },
  created() {
    this.getInitData().then(this.initDone)
  },
  methods: {
    ...mapActions('init', ['getInitData']),
    initDone() {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.load-data {
  margin: auto;
}
</style>
