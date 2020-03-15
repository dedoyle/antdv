<template>
  <div class="home">
    <a-button>按钮</a-button>
    <a-pagination
      showSizeChanger
      :defaultCurrent="3"
      :total="500"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 200)
      })
    }
  }
}
</script>
