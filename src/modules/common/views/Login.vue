<template>
  <div>
    Login
    <a-button @click="login">登录</a-button>
    <a-button @click="forgetPWd">忘记密码</a-button>
  </div>
</template>
<script>
import service from '@/modules/common/request'
export default {
  name: 'Login',
  props: ['redirect'],
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    login() {
      return service.globalLogin({
        config: {
          mock: 'success'
        }
      }).then(() => {
        this.$router.replace({
          name: this.redirect || 'Root'
        })
      })
    },
    forgetPWd() {
      this.$router.replace({
        name: 'ForgetPwd',
        params: {
          redirect: this.redirect
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
