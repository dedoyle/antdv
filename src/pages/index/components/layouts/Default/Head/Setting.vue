<template>
  <a-dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :disabled="isCustom"
  >
    <i class="operations-item iconfont iconsetting"></i>
    <a-menu slot="overlay" @click="onClick">
      <a-menu-item v-for="item in list" :key="item.id">
        <span>{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import jsCallClient from '@/common/scripts/jsCallClient'
import fullScreenMixin from '@/mixins/fullScreen.js'

export default {
  name: 'Setting',
  mixins: [fullScreenMixin],
  data() {
    return {
      newList: [
        {
          id: 'toggleMode',
          name: '图标视图',
          cb: this.changeMode
        },
        {
          id: 'editTiles',
          name: '编辑看板',
          cb() {
            console.log('编辑看板')
          }
        },
        {
          id: 'logout',
          name: '退出登录',
          cb: this.signOut
        }
      ],
      oldList: [
        {
          id: 'toggleMode',
          name: '看板视图',
          cb: this.changeMode
        },
        {
          id: 'fullScreen',
          name: '全屏模式',
          cb() {
            this.setFullScreen(true)
          }
        },
        {
          id: 'logout',
          name: '退出登录',
          cb: this.signOut
        }
      ]
    }
  },
  computed: {
    ...mapGetters('home', ['isCustom', 'isNew']),
    ...mapGetters('notCache', ['isPcMaxSize']),
    list() {
      return this.isNew ? this.newList : this.oldList
    }
  },
  methods: {
    ...mapMutations('home', ['SET_IS_NEW']),
    ...mapMutations('notCache', ['TOGGLE_PC_SIZE']),
    ...mapActions('login', ['logout']),
    changeMode() {
      if (this.isCustom) {
        return false
      }
      this.SET_IS_NEW(!this.isNew)
      this.$router.push({
        name: 'Home'
      })
    },
    signOut() {
      this.logout({
        config: {
          isHideMessage: true,
          // mock: 'success'
        }
      }).then(() => {
        if (this.isPcMaxSize) {
          this.TOGGLE_PC_SIZE()
          jsCallClient({ func: 'setToken', params: { token: '' } })
        }
        this.$router.push({ path: '/login' })
      })
    },
    onClick({ key }) {
      const idx = this.list.findIndex(item => item.id === key)
      if (idx > -1) {
        this.list[idx].cb.call(this)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-dropdown-menu-item,
.ant-dropdown-menu-submenu-title {
  line-height: 30px;
}
</style>
