<template>
  <a-layout class="platform" :class="[roleClass, fullScreenClass]">
    <a-layout-header>
      <Head
        :sider-width="siderWidth"
        :collapsed="collapsed"
        :toggle-sider="toggleCollapsed" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :trigger="null"
        collapsible
        :width="sider.width"
        :collapsed-width="sider.collapsedWidth"
        v-model="collapsed"
      >
        <SideBar :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout style="width: 0;">
        <a-layout-content>
          <LayoutContent />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Head from '@/components/Global/Head/Head.vue'
import SideBar from '@/components/Global/SideBar.vue'
import LayoutContent from '@/components/Global/Layouts/LayoutContent.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Head,
    SideBar,
    LayoutContent
  },
  data() {
    return {
      sider: {
        width: 168,
        collapsedWidth: 80
      },
      collapsed: true
    }
  },
  computed: {
    ...mapGetters('global', ['role', 'client']),
    ...mapGetters('home', ['apps']),
    ...mapGetters('notCache', ['isFullScreen']),
    roleClass() {
      let obj = {
        'role-teacher': false,
        'role-student': false,
        'role-parent': false,
        'role-school_admin': false
      }
      obj['role-' + this.role] = true
      return obj
    },
    fullScreenClass() {
      return {
        'full-screen': this.isFullScreen
      }
    },
    siderWidth() {
      return this.collapsed ? this.sider.collapsedWidth : this.sider.width
    }
  },
  created() {
    this.apps.length === 0 && this.getUserDetail({
      params: {
        client: this.client,
        fields: 'user_id,name,avatar,mobile,email,school,teaching_info,classes,type_info,children',
        children_fields: 'user_id,name,email,school,classes'
      }
      // config: {
      //   mock: 'success'
      // }
    })
  },
  methods: {
    ...mapActions('global', ['getUserDetail']),
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style lang="less" scoped>
.platform {
  height: 100%;
  & > .ant-layout {
    padding-left: 80px;
    transition: padding 0.3s;
  }
  .ant-layout-header {
    padding: 0;
    transition: height 0.3s;
  }
  .ant-layout-sider {
    position: fixed;
    top: 64px;
    bottom: 0;
    left: 0;
    z-index: 800;
    transition: z-index 0.1s;
  }
  .ant-layout-content {
    height: 100%;
    margin: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    background: rgba(244, 246, 249, 1);
  }
}
.full-screen {
  & > .ant-layout {
    padding-left: 0;
  }
  .ant-layout-header {
    height: 0;
    overflow: hidden;
  }
  .ant-layout-sider {
    z-index: -3;
    overflow: hidden;
  }
}
</style>
