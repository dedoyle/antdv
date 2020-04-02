<template>
  <div>
    忘记密码
    <a-button @click="goLogin">返回登录</a-button>
  </div>
</template>
<script>
export default {
  name: 'ForgetPwd',
  props: ['redirect'],
  data() {
    return {}
  },
  methods: {
    goLogin() {
      this.$router.replace({
        name: 'Login',
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
