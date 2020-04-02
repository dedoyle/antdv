<template>
  <div class="app-header">
    <div class="app-info ant-menu-horizontal">
      <a-avatar shape="square" :size="32" :src="currentApp.s_a_icon" />
      <span class="vam">{{ currentApp.name }}</span>
    </div>
    <a-menu
      mode="horizontal"
      :selected-keys="[defaultSelectedKeys]">
      <a-menu-item
        v-for="item in menus"
        :key="item.id"
        @click="item.onClick(item)">{{ item.name }}</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import currentAppMixin from '@/mixins/currentApp'
export default {
  name: 'AppHeader',
  props: ['appId', 'menus', 'defaultSelectedKeys'],
  mixins: [ currentAppMixin ],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.app-header {
  display: flex;
  height: 56px;
}
.ant-menu {
  flex: 1;
}
.ant-menu-horizontal {
  line-height: 54px;
}
.app-info {
  padding: 0 24px;
  background: #fff;
  font-size: 18px;
  color: rgba(0,0,0,0.85);
  letter-spacing: 0;

  .ant-avatar {
    margin-right: 8px;
  }
}
</style>
