<template>
  <div class="app-list">
    <a-tabs v-if="list" :active-key="currentType" @change="changeType">
      <a-tab-pane v-for="type in list" :key="type.id">
        <span slot="tab">
          <img class="type-icon" :src="type.s_t_icon" />
          <span class="type-name">{{ typeName(type) }}</span>
        </span>
        <div
          class="app-item"
          :class="{
            'app-checked': canCustom && isCustom && quickAppIds.indexOf(item.id) > -1,
            'pointer': item.display_status === 'display'
          }"
          v-for="item in type.apps"
          :key="item.id"
          :title="item.name"
          @click="openApp(item)"
        >
          <div class="app-icon img-placeholder">
            <img :src="item.m_a_icon" :alt="item.name" />
          </div>
          <div class="app-name">{{ item.name }}</div>
          <a-checkbox
            class="app-check"
            :checked="quickAppIds.indexOf(item.id) > -1"
            @change="onChange($event, item)"
            v-if="canCustom && isCustom"
          ></a-checkbox>
        </div>
      </a-tab-pane>
    </a-tabs>
    <full-screen v-if="!isCustom" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import FullScreen from '@/components/Global/FullScreen.vue'
import openAppMixins from '@/mixins/openApp'

function isShow(item) {
  return item.display_status !== 'not-display'
}

export default {
  name: 'AppList',
  props: ['canCustom'],
  components: { FullScreen },
  mixins: [openAppMixins],
  data() {
    return {
      isLocked: false,
      hasNewParams: false
    }
  },
  computed: {
    ...mapGetters('home', ['isCustom', 'apps', 'currentType', 'quickAppIds']),
    list() {
      return this.apps.filter(isShow) || null
    }
  },
  methods: {
    ...mapMutations('home', ['SET_APPS', 'SET_CURRENT_TYPE', 'SET_QUICK_APPS']),
    changeType(activeKey) {
      this.SET_CURRENT_TYPE(activeKey)
    },
    typeName(type) {
      if (!this.canCustom && !this.isCustom) {
        return type.name
      }
      let checkedList = type.apps.filter(item => this.quickAppIds.indexOf(item.id) > -1)
      let suffix = checkedList.length > 0 ? '(' + checkedList.length + ')' : ''
      return type.name + suffix
    },
    onChange($event, item) {
      let appIds = Array.from(this.quickAppIds)
      if ($event.target.checked) {
        appIds.push(item.id)
      } else {
        appIds.splice(appIds.indexOf(item.id), 1)
      }
      this.SET_QUICK_APPS(appIds)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/common/styles/variable.less';

.app-list {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > .ant-tabs {
    width: 960px;
    min-height: 455px;
    max-width: 95%;
  }
  /deep/ .ant-tabs-bar {
    margin-bottom: 80px;
  }
  /deep/ .ant-tabs-tab {
    margin-right: 0;
    // padding-left: 8px;
    // padding-right: 8px;
  }
  // /deep/ .ant-tabs-nav .ant-tabs-tab-active {
  //   color: #2dc1fd;
  // }
  // /deep/ .ant-tabs-ink-bar {
  //   background-color: #2dc1fd;
  // }
}
.type-icon {
  width: 40px;
  height: 40px;
}
.type-name {
  font-size: 16px;
  margin-left: 5px;
}
.app-item {
  position: relative;
  display: inline-block;
  width: 128px;
  padding: 16px;
  margin: 0 16px 0;
  text-align: center;
  font-size: 0;
  transition: 0.3s;
  &.app-checked {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
  }
}
.app-icon {
  margin-bottom: 12px;
  img {
    width: 100%;
    height: 100%;
  }
}
// 防止页面闪动
.img-placeholder {
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.app-name {
  color: #000;
  font-size: 16px;
  line-height: 16px;
}
.app-check {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
}
.custom-btn-container {
  position: absolute;
  bottom: 60px;
  text-align: center;
}
.custom-btn {
  margin: 0 25px;
}
// 临时加上手机上的样式
@media screen and (max-width: @screen-sm) {
  .app-list {
    height: auto;
  }
  .app-item {
    margin-top: 22px;
    width: 60px;
  }
}
</style>
