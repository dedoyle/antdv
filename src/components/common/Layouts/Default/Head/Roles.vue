<template>
  <a-dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :disabled="isCustom || roleList.length < 2"
  >
    <a-avatar
      shape="circle"
      class="operations-roles pointer"
      :src="curRoleIcon"
    />
    <a-menu slot="overlay">
      <a-menu-item
        v-for="item in roleList"
        :key="item.id"
        @click="switchRole(item.id)"
      >
        <img class="role-icon" :src="item.s_r_icon" />
        <span class="role-name">{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Roles',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('global', ['role', 'roleList']),
    ...mapGetters('home', ['isCustom', 'apps']),
    curRoleIcon() {
      let idx = this.roleList.findIndex(item => item.id === this.role)
      return idx > -1 ? this.roleList[idx].s_r_icon : ''
    }
  },
  methods: {
    ...mapActions('global', ['setRole']),
    switchRole(role) {
      this.setRole(role).then(() => {
        this.$router.push({
          name: 'Home'
        })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.role-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.role-name {
  margin-left: 5px;
  vertical-align: middle;
}
</style>
