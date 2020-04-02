<template>
  <div class="full-screen" @click="setFullScreen(!isFullScreen)">
    <i v-show="!isFullScreen" class="iconfont iconexpend vam mr5"></i>
    <i v-show="isFullScreen" class="iconfont iconcompress vam mr5"></i>
    <span class="full-screen-txt">{{
      isFullScreen ? '退出全屏' : '全屏模式'
    }}</span>
  </div>
</template>
<script>
import fullScreenMixin from '@/mixins/fullScreen.js'

export default {
  name: 'FullScreen',
  mixins: [fullScreenMixin],
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.mr5 {
  margin-right: 5px;
}
.full-screen {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  }
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
}
.full-screen-txt {
  font-size: 14px;
  vertical-align: middle;
}
</style>
