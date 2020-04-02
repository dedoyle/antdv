<template>
  <div class="avatar-wrapper" @click="showModal">
    <a-tooltip placement="right">
      <template slot="title" v-if="collapsed">
        <span>{{ title }}</span>
      </template>
      <a-avatar shape="circle" :size="collapsed ? 48 : 64" :src="src" />
    </a-tooltip>
    <a-modal
      title="上传头像"
      v-model="modelVisible"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="480"
      :ok-button-props="{
        props: {
          shape: 'round',
          loading: isUploading
        }
      }"
      :destroy-on-close="true"
      :cancel-button-props="{ props: { shape: 'round' } }"
    >
      <img-cropper ref="cropper" :src="src" />
    </a-modal>
  </div>
</template>
<script>
import ImgCropper from '@/components/Global/ImgCropper'
import service from '@/request'
import { mapGetters } from 'vuex'

export default {
  name: 'AvatarUpload',
  props: ['collapsed', 'src', 'title'],
  components: { ImgCropper },
  data() {
    return {
      isUploading: false,
      modelVisible: false
    }
  },
  computed: {
    ...mapGetters('global', ['user'])
  },
  methods: {
    showModal() {
      this.modelVisible = true
    },
    updateAvatar(res) {
      return service.globalUserUpdate({
        data: {
          user_id: this.user.user_id,
          avatar: res.path
        }
      }).then(() => {
        return res
      })
    },
    handleOk() {
      if (this.isUploading) {
        return false
      }
      this.isUploading = true
      this.$refs.cropper
        .uploadAvatar()
        .then(this.updateAvatar)
        .then(res => {
          this.isUploading = false
          this.$message.success('上传成功')
          this.resetData()
          this.$emit('change', res.path)
        })
        .catch(() => {
          this.isUploading = false
          this.$message.error('上传失败')
        })
    },
    handleCancel() {
      this.resetData()
    },
    resetData() {
      this.isUploading = false
      this.modelVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-wrapper {
  position: relative;
}
.ant-avatar {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.09);
  &:before {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &:after {
    content: '修改头像';
    display: none;
    position: absolute;
    width: 24px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    line-height: normal;
    white-space: normal;
  }
  &:hover {
    cursor: pointer;
    &:before {
      display: block;
    }
    &:after {
      display: block;
    }
  }
}
</style>
