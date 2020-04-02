<template>
  <a-card :bordered="false">
    <h3>{{ info.title }}</h3>
    <p style="margin: 0">{{ info.content }}</p>
  </a-card>
</template>
<script>
export default {
  name: 'TextCard',
  props: ['info'],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.ant-card {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}
</style>
