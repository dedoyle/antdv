<template>
  <a-popover
    placement="bottomRight"
    trigger="click"
    overlay-class-name="app-nav"
    @visibleChange="visibleChange"
  >
    <template slot="content">
      <div
        class="type"
        :class="{ 'curr-type': item.id === currentType }"
        v-for="item in list"
        :key="item.id"
      >
        <img class="type-icon" :src="item.s_t_icon" :alt="item.name" />
        <div class="type-tit">{{ item.name }}</div>
        <a-divider class="type-divider" />
        <div class="type-cnt">
          <div
            class="type-item"
            :class="{
              'pointer': child.display_status === 'display'
            }"
            v-for="child in item.apps"
            :key="child.id"
            @click="clickApp(child)"
          >
            <span class="item-name">{{ child.name }}</span>
            <i v-if="tileAppIds.indexOf(child.id) > -1" class="sprites-home ic-star-16px"></i>
          </div>
        </div>
      </div>
    </template>
    <i class="sprites-home ic-apps-24px ml16 pointer"></i>
  </a-popover>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import openAppMixins from '@/mixins/openApp'

export default {
  name: 'AppNav',
  mixins: [openAppMixins],
  data() {
    return {
      popVisible: false
    }
  },
  computed: {
    ...mapGetters('home', [
      'apps',
      'currentType',
      'isCustom',
      'tileAppIds'
    ]),
    list() {
      return this.apps || []
    }
  },
  methods: {
    ...mapMutations('notCache', ['SET_SHOW_GLOBAL_MASK']),
    visibleChange(visible) {
      this.SET_SHOW_GLOBAL_MASK(visible)
    },
    clickApp(item) {
      if (this.isCustom) {
        return false
      }
      this.openApp(item)
      this.SET_SHOW_GLOBAL_MASK(false)
    }
  }
}
</script>
<style lang="less" scoped></style>
<style lang="less">
.app-nav {
  // &.ant-popover-placement-bottomRight {
  //   padding-top: 0;
  // }
  .ant-popover-inner-content {
    padding: 24px 16px;
    white-space: nowrap;
  }
  .ant-popover-arrow {
    display: none;
    // right: 8px;
  }
  .type {
    width: 112px;
    padding: 0 16px;
    display: inline-block;
    vertical-align: top;
  }
  .type-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }
  .type-tit {
    font-size: 16px;
    color: inherit;
    font-weight: bold;
  }
  .type-divider {
    margin: 10px 0;
    background-color: #f3f3f3;
  }
  .type-item {
    line-height: 33px;

    a {
      color: inherit;
      text-decoration: none;
    }
    .item-name {
      vertical-align: middle;
    }
  }
  .curr-type {
    .type-tit {
      font-size: 16px;
      color: #21beff;
    }
  }
}
</style>
