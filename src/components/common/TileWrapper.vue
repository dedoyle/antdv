<template>
  <div class="tile-wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TileWrapper',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
@import '~@/common/styles/variable.less';

.tile-wrapper {
  height: 100%;
  font-size: 0;
}

.loop-grid-rows(@index, @class) when (@index > 0) {
  .row@{class}-@{index} {
    height: percentage((@index / @grid-rows));
  }
  .loop-grid-rows((@index - 1), @class);
}

.make-grid(@class: ~'') {
  .loop-grid-rows(@grid-rows, @class);
}

.make-grid();
// Extra small grid
//
// Columns, offsets, pushes, and pulls for extra small devices like
// smartphones.

.make-grid(-xs);

// Small grid
//
// Columns, offsets, pushes, and pulls for the small device range, from phones
// to tablets.

@media (min-width: @screen-sm-min) {
  .make-grid(-sm);
}

// Medium grid
//
// Columns, offsets, pushes, and pulls for the desktop device range.

@media (min-width: @screen-md-min) {
  .make-grid(-md);
}

// Large grid
//
// Columns, offsets, pushes, and pulls for the large desktop device range.

@media (min-width: @screen-lg-min) {
  .make-grid(-lg);
}

// Extra Large grid
//
// Columns, offsets, pushes, and pulls for the full hd device range.

@media (min-width: @screen-xl-min) {
  .make-grid(-xl);
}

// Extra Extra Large grid
//
// Columns, offsets, pushes, and pulls for the full hd device range.

@media (min-width: @screen-xxl-min) {
  .make-grid(-xxl);
}
</style>
