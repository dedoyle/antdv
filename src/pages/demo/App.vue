<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  data() {
    return {
      zhCN
    }
  }
}
</script>

<style lang="less">
@import url(~@/common/styles/common.less);

#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
