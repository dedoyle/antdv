<template>
  <div class="tile" :class="tileClass">
    <slot />
  </div>
</template>
<script>
const dimensionMap = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  xxl: true
}
export default {
  name: 'Tile',
  props: {
    responsive: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tileClass: {}
    }
  },
  mounted() {
    this.addResponsiveClass(this.responsive)
  },
  methods: {
    addResponsiveClass(responsive) {
      this.tileClass = {}
      for (var k in responsive) {
        if (dimensionMap[k]) {
          this.tileClass[`ant-col-${k}-${responsive[k].width}`] = true
          this.tileClass[`row-${k}-${responsive[k].height}`] = true
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tile {
  float: left;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
}
</style>
