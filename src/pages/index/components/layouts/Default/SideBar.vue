<template>
  <div
    class="sidebar"
    :class="{
      'sidebar-collapsed': collapsed,
      'custom-mode': isCustom
    }"
  >
    <div class="drawer-mask"></div>
    <div class="user">
      <avatar-upload
        :collapsed="collapsed"
        :src="user.avatar"
        :title="user.name"
        @change="avatarChange"
      />
      <p class="user--name">{{ user.name }}</p>
    </div>
    <a-menu mode="inline" v-if="quickApps">
      <a-menu-item
        :style="{
          cursor: item.display_status === 'display' ? 'pointer' : 'default'
        }"
        v-for="item in quickApps"
        :key="item.id"
        @click="openApp(item)"
      >
        <a-avatar
          class="menu-icon"
          shape="square"
          :size="40"
          :src="item.s_a_icon"
        />
        <span class="menu-txt">{{ item.name }}</span>
      </a-menu-item>
      <a-menu-item v-if="!isCustom && quickApps.length === 0" @click="toCustom">
        <i
          class="menu-icon sprites-home"
          :class="{
            'sidebar-add': !sidebarAddHover,
            'sidebar-add-hover': sidebarAddHover
          }"
          @mouseover="sidebarAddHover = true"
          @mouseout="sidebarAddHover = false"
        ></i>
        <span class="menu-txt">添加应用</span>
      </a-menu-item>
    </a-menu>
    <div class="custom">
      <a-divider />
      <div>
        <i
          class="custom-icon sprites-home pointer"
          :class="iconClass"
          v-show="!isCustom"
          @click="toCustom"
        ></i>
        <span class="pointer" v-show="!collapsed && !isCustom" @click="toCustom"
          >个性化</span
        >
        <span
          v-if="isCustom"
          class="save-btn ant-btn ant-btn-primary ant-btn-round"
          @click="saveCustom"
          >保存</span
        >
      </div>
    </div>
    <div class="drawer">
      <app-list v-show="isCustom" :can-custom="true" />
    </div>
  </div>
</template>
<script>
import AvatarUpload from '@/components/Global/AvatarUpload'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import openAppMixins from '@/mixins/openApp'
import AppList from '@/components/Global/widgets/AppList.vue'

export default {
  name: 'SideBar',
  props: ['collapsed'],
  mixins: [openAppMixins],
  components: { AvatarUpload, AppList },
  data() {
    return {
      needBackToNew: false,
      sidebarAddHover: false,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters('global', ['user', 'role', 'client']),
    ...mapGetters('home', [
      'isNew',
      'isCustom',
      'apps',
      'quickAppIdsBackup',
      'quickAppIds'
    ]),
    iconClass() {
      const obj = {
        'ic-edit-teacher-24px': false,
        'ic-edit-student-24px': false,
        'ic-edit-parent-24px': false,
        'ic-edit-school_admin-24px': false
      }
      obj['ic-edit-' + this.role + '-24px'] = true
      return obj
    },
    quickApps() {
      const arr = new Array(this.quickAppIds.length)
      this.apps.forEach(item => {
        return item.apps.forEach(app => {
          if (app.display_status !== 'not-display') {
            const idx = this.quickAppIds.indexOf(app.id)
            if (idx > -1) {
              arr[idx] = app
            }
          }
        })
      })
      return arr.filter(item => item)
    }
  },
  methods: {
    ...mapMutations('global', ['SET_USER']),
    ...mapMutations('home', [
      'SET_IS_NEW',
      'SET_IS_CUSTOM',
      'BACKUP_QUICK_APP_IDS',
      'SET_QUICK_APPS'
    ]),
    ...mapActions('home', ['saveQuickApps']),
    toggleCustom() {
      if (this.isNew) {
        this.needBackToNew = this.isNew
        this.SET_IS_NEW(false)
      } else {
        this.SET_IS_NEW(this.needBackToNew)
        this.needBackToNew = false
      }
      this.SET_IS_CUSTOM(!this.isCustom)
      this.isCustom && this.BACKUP_QUICK_APP_IDS()
    },
    toCustom() {
      this.needBackToNew = this.isNew
      this.BACKUP_QUICK_APP_IDS()
      // this.SET_IS_NEW(false)
      this.SET_IS_CUSTOM(true)
      this.drawerVisible = true
    },
    saveCustom() {
      if (this.quickAppIds.length > 10) {
        this.$message.warn('最多只能添加10个快捷应用')
        return false
      }
      // 关掉所有弹窗
      this.$destroyAll()
      const appIds = this.quickApps.map(item => item.id)
      this.saveQuickApps({
        data: {
          client: this.client,
          app_ids: appIds
        }
        // config: {
        //   mock: 'success'
        // }
      })
        .then(this.handleSuccess)
        .catch(this.handleError)
    },
    handleSuccess() {
      // this.SET_IS_NEW(this.needBackToNew)
      this.SET_IS_CUSTOM(false)
      this.drawerVisible = false
    },
    handleError() {
      const vm = this
      this.$confirm({
        title: '提示',
        content: '保存失败，再试一次？',
        onOk() {
          vm.saveCustom()
        },
        onCancel() {
          vm.SET_QUICK_APPS(JSON.parse(JSON.stringify(vm.quickAppIdsBackup)))
          // vm.SET_IS_NEW(vm.needBackToNew)
          vm.SET_IS_CUSTOM(false)
          this.drawerVisible = false
        }
      })
    },
    avatarChange(avatar) {
      this.SET_USER({
        avatar
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar {
  height: 100%;
  padding-bottom: 49px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.03);
  overflow-x: hidden;
  overflow-y: auto;
}
.ant-menu {
  border-right: none;
}
.user {
  width: 136px;
  height: 137px;
  margin: 0 auto;
  padding-top: 24px;
  text-align: center;
  border-bottom: 1px solid lightgray;
  transition: width 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
    margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.user--name {
  margin: 4px 0;
  line-height: 40px;
}
.menu-icon {
  margin-right: 16px;
  text-align: center;
}
.ant-menu-inline {
  .ant-menu-item {
    height: 42px;
    line-height: 42px;
    &:not(:last-child) {
      margin-top: 24px;
      margin-bottom: 24px;
    }
  }
}
.ant-menu-inline-collapsed {
  & > .ant-menu-item {
    height: 42px;
    line-height: 42px;
    margin-top: 24px;
    margin-bottom: 24px;
    padding: 0 !important;
    text-align: center;
  }
  .menu-icon {
    margin: 0;
  }
  .menu-txt {
    display: inline-block;
    max-width: 0;
    opacity: 0;
  }
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-right: none;
}
.custom {
  position: absolute;
  width: 100%;
  bottom: 0;
  line-height: 48px;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-divider {
    position: absolute;
    top: 0;
    margin: 0;
    background-color: #f3f3f3;
  }
  .custom-icon {
    color: @primary-color;
    margin-right: 10px;
  }
}
.save-btn {
  width: 128px;
  line-height: 32px;
  transition: all 0.1s;
}
.sidebar-collapsed {
  .user {
    width: 80px;
    height: 72px;
    border: none;
    .user--name {
      display: none;
    }
  }
  .save-btn {
    width: 60px;
    padding: 0 10px;
  }
}
.drawer {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: -2000px;
  width: 1064px;
  max-width: 83.1%;
  height: 100%;
  background: #fff;
  transition: 0.2s;
}
.drawer-mask {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 168px;
  width: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
}
.custom-mode {
  .drawer {
    left: 168px;
  }
  .drawer-mask {
    width: 100%;
  }
  &.sidebar-collapsed {
    .drawer {
      left: 80px;
    }
  }
}
</style>
<style lang="less">
.ant-menu-inline-collapsed-tooltip {
  .menu-icon {
    display: none;
  }
}
</style>
