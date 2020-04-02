<template>
  <div class="detail-header">
    <a-button class="back-btn" type="link" @click="$goBack(backParams)">
      <i class="iconfont iconleft"></i>返回
    </a-button>
    <a-divider type="vertical" class="divider"></a-divider>
    <span class="app-info" @click="clickApp">
      <a-avatar shape="square" :size="32" :src="appIcon" />
      <span class="vam">{{ appName }}</span>
    </span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'DetailHeader',
  props: ['appId', 'appIcon', 'appName', 'backParams'],
  data() {
    return {}
  },
  methods: {
    clickApp() {
      this.$emit('click-app')
    }
  }
}
</script>
<style lang="less" scoped>
.detail-header {
  display: flex;
  background: #fff;
  line-height: 56px;
  padding-left: 28px;
  align-items: center;
  .back-btn {
    padding-left: 0;
    padding-right: 0;
  }
  .divider {
    margin: 0 0 0 16px;
    height: 24px;
    background: rgba(0,0,0,0.09);
  }
}
.app-info {
  padding-left: 24px;
  background: #fff;
  font-size: 14px;
  color: rgba(0,0,0,0.45);
  letter-spacing: 0;
  cursor: pointer;

  .ant-avatar {
    margin-right: 8px;
  }
}
</style>
