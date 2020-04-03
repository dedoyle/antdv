<template>
  <div>
    Login
    <a-button @click="signIn">登录</a-button>
    <a-button @click="forgetPWd">忘记密码</a-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  props: ['redirect'],
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    ...mapActions('login', ['login']),
    signIn() {
      return this.login({
        config: {
          mock: 'success'
        }
      }).then(() => {
        this.$router.replace({
          path: this.redirect || '/'
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
