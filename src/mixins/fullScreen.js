import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('notCache', ['isFullScreen'])
  },
  created() {
    // 默认全屏的模式下，要绑定事件
    this.toggleEscEvent(this.isFullScreen)
  },
  methods: {
    ...mapMutations('notCache', ['SET_IS_FULL_SCREEN']),
    setFullScreen(isFullScreen) {
      isFullScreen && this.$message.info('按 Esc 退出全屏', 5)
      this.SET_IS_FULL_SCREEN(isFullScreen)
      this.toggleEscEvent(isFullScreen)
    },
    escHandler(e) {
      if (e.keyCode === 27 && this.isFullScreen) {
        this.setFullScreen(false)
      }
    },
    toggleEscEvent(isFullScreen) {
      if (isFullScreen) {
        document.addEventListener('keydown', this.escHandler)
      } else {
        document.removeEventListener('keydown', this.escHandler)
      }
    }
  }
}
