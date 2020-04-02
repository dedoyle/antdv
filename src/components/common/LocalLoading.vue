<template>
  <div class="local-loading">
    <div class="loading-mask">
      <span class="loading-wrapper">
        <i class="sprites-login loading rotate"></i>
        <span class="vam ml10">{{ tip }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LocalLoading',
  props: ['tip'],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.ml10 {
  margin-left: 10px;
}
.local-loading {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  justify-content: center;
  align-items: center;
  .loading-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 70px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
  }
  .loading-wrapper {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
    line-height: 24px;
  }
  .rotate {
    animation: rotation 2s infinite linear;
    transform-origin: center center;
  }
  @keyframes rotation {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(359deg)
    }
  }
}
</style>
