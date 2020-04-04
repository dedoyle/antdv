<template>
  <div class="header" @dblclick="onDoubleClick">
    <div
      class="custom-trigger"
      :class="triggerClass"
      :style="{
        width: siderWidth + 'px'
      }"
      @click="toggleSider"
      @dblclick.stop="noop"
    >
      <i v-show="collapsed" class="iconfont iconsidebar-unfold"></i>
      <i v-show="!collapsed" class="iconfont iconsidebar-fold"></i>
    </div>
    <img
      class="logo-pic"
      src="@/assets/home/ic-logo-white.png"
      @dblclick.stop="noop"
    />
    <span class="logo-name" @click="toHome" @dblclick.stop="noop"
      >黑龙江基础教育综合平台</span
    >
    <div class="operations">
      <a-input
        class="operations-search"
        id="keyword"
        v-model="keyword"
        @dblclick.stop="noop"
      >
        <i slot="prefix" class="iconfont iconsearch" @dblclick.stop="noop"></i>
      </a-input>
      <i
        class="operations-item iconfont iconinsertcomment"
        @dblclick.stop="noop"
        v-jump-to-pc
      ></i>
      <i
        class="operations-item iconfont iconnotification"
        @dblclick.stop="noop"
      ></i>
      <i
        class="operations-item iconfont iconperson-outline"
        @dblclick.stop="noop"
        @click="openPersonalCenter"
      ></i>
      <setting @dblclick.stop="noop" />
      <a-divider type="vertical" @dblclick.stop="noop" />
      <roles @dblclick.stop="noop" />
      <app-nav @dblclick.stop="noop" />
      <template v-if="client === 'pc'">
        <i
          @dblclick.stop="noop"
          class="operations-item sprites-home ic-min"
          v-sprites-class="{
            normal: 'ic-min',
            hover: 'ic-min-hover'
          }"
          @click="minimizeWindow"
        ></i>
        <i
          @dblclick.stop="noop"
          class="operations-item sprites-home ic-max"
          v-show="!isPcMaxSize"
          v-sprites-class="{
            normal: 'ic-max',
            hover: 'ic-max-hover'
          }"
          @click.stop="updatePcWindowSize"
        ></i>
        <i
          @dblclick.stop="noop"
          class="operations-item sprites-home ic-restore"
          v-show="isPcMaxSize"
          v-sprites-class="{
            normal: 'ic-restore',
            hover: 'ic-restore-hover'
          }"
          @click.stop="updatePcWindowSize"
        ></i>
        <i
          class="operations-item sprites-home ic-close"
          @dblclick.stop="noop"
          v-sprites-class="{
            normal: 'ic-close',
            hover: 'ic-close-hover'
          }"
          @click.stop="closePcWindow"
        ></i>
      </template>
    </div>
  </div>
</template>
<script>
import AppNav from '@/components/Global/Head/AppNav'
import Roles from '@/components/Global/Head/Roles'
import Setting from '@/components/Global/Head/Setting'
import pcService from '@/mixins/pcService'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Head', // 避免使用组件或内置html标签名字
  props: ['collapsed', 'toggleSider', 'siderWidth'],
  components: { AppNav, Roles, Setting },
  mixins: [pcService],
  data() {
    return {
      keyword: '',
      logo: '',
      dataSource: []
    }
  },
  computed: {
    ...mapGetters('global', ['client']),
    ...mapGetters('notCache', ['isPcMaxSize']),
    ...mapGetters('home', ['isCustom']),
    triggerClass() {
      return {
        tr: !this.collapsed,
        tc: this.collapsed
      }
    }
  },
  methods: {
    ...mapMutations('notCache', ['TOGGLE_PC_SIZE']),
    ...mapMutations('home', ['SET_IS_NEW']),
    openPersonalCenter(e) {
      if (this.isCustom) {
        return false
      }
      e.stopPropagation()
      this.$router.push({
        name: 'PersonalCenter'
      })
    },
    noop() {},
    toHome() {
      if (this.isCustom) {
        return false
      }
      this.SET_IS_NEW(true)
      this.$router.push({
        name: 'Home'
      })
    },
    minimizeWindow() {
      if (!this.isCustom) {
        this.jsCallClient({ func: 'minimumWindow', params: {} })
      }
    },
    updatePcWindowSize() {
      if (!this.isCustom) {
        this.TOGGLE_PC_SIZE()
      }
    },
    closePcWindow() {
      if (this.isCustom) {
        return false
      }
      const vm = this
      this.$confirm({
        title: '提示',
        content: '确定关闭客户端吗？',
        onOk() {
          vm.jsCallClient({ func: 'closeWindow', params: {} })
        },
        onCancel() {}
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/common/styles/variable.less';

.header {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px 0 0;
  color: #fff;
  user-select: none;
}
.custom-trigger {
  padding: 0 16px;
  color: inherit;
  font-size: 0;
  cursor: pointer;
  transition: all 0.2s;
  .iconfont {
    font-size: 24px;
  }
}
.logo-pic {
  width: 27px;
  margin-left: 21px;
  height: auto;
}
.logo-name {
  color: #fff;
  margin-left: 10px;
  font-size: 18px;
}
.operations {
  height: 100%;
  flex: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .operations-search {
    width: 160px;
    height: 32px;
    /deep/ .ant-input-prefix {
      left: 8px;
    }
    /deep/ .ant-input {
      padding-left: 35px;
      border: none;
      border-radius: 16px;
      color: #fff;
      background-color: hsla(0, 0%, 100%, 0.15);
      &:focus {
        box-shadow: none;
      }
    }
    .iconsearch {
      font-size: 24px;
      color: #fff;
    }
  }
  .operations-item {
    font-size: 24px;
    margin-left: 16px;
    cursor: pointer;
  }
  .operations-roles {
    // height: 100%;
    // padding: 16px 0;
    margin-left: 16px;
  }
  .operations-navs {
    margin-left: 16px;
    font-size: 24px;
    height: 100%;
    padding: 20px 0;
  }
  .ant-divider {
    height: 24px;
    margin-left: 16px;
    margin-right: 0;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .anticon {
    font-size: 24px;
    margin-left: 16px;
  }
}
@media screen and (max-width: @screen-md) {
  .logo-name {
    margin-left: 8px;
    margin-right: 8px;
    line-height: 16px;
  }
  .operations {
    .operations-item {
      margin-left: 8px;
    }
  }
}
@media screen and (max-width: @screen-sm) {
  .logo-name {
    display: none;
  }
  .operations-search {
    display: none;
  }
}
// theme start
.is-teacher {
  .header {
    background: url('~@/assets/home/bg/nav_teacher.jpg');
  }
}
.is-student {
  .header {
    background: url('~@/assets/home/bg/nav_student.jpg');
  }
}
.is-parent {
  .header {
    background: url('~@/assets/home/bg/nav_parent.jpg');
  }
}
.is-school_admin {
  .header {
    background: url('~@/assets/home/bg/nav_management.jpg');
  }
}
// theme end
</style>
