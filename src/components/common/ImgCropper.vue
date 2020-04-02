<template>
  <div>
    <div class="cropper-content">
      <div class="cropper">
        <vueCropper
          v-if="option.img"
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :fixed-box="option.fixedBox"
          @realTime="realTime"
        ></vueCropper>
      </div>
      <div
        class="show-preview"
        :style="{
          width: previews.w + 'px',
          height: previews.h + 'px',
          overflow: 'hidden',
          margin: '5px'
        }"
      >
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>

    <div class="footer-btn">
      <div class="scope-btn">
        <label class="btn" for="uploads">
          <i class="iconfont iconupload vam"></i>
          <span class="vam ant-btn ant-btn-link ant-btn-sm">重新上传</span>
        </label>
        <input
          type="file"
          id="uploads"
          :disabled="isUploading"
          style="position:absolute; clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/jpg"
          @change="selectImg($event)"
        />

        <span class="img-btn">
          <i class="iconfont iconzoomout vam" @click="changeScale(-1)"></i>
          <i class="iconfont iconzoomin vam ml8" @click="changeScale(1)"></i>
          <i class="iconfont iconrotate vam ml8" @click="rotateLeft"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import '@/common/scripts/canvas-toBlob.js'
import VueCropper from '@/components/Global/VueCropper/vue-cropper.vue'
import { avatarRex } from '@/common/scripts/regx'
import service from '@/request'

export default {
  name: 'ImgCropper',
  props: ['src'],
  components: { VueCropper },
  data() {
    return {
      filename: '',
      fileList: [],
      isUploading: false,
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        size: 1,
        full: false, // 输出原图比例截图
        outputType: 'png', // 裁剪生成图片的格式
        autoCrop: true, // 是否默认生成截图框
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        autoCropWidth: 112, // 默认生成截图框宽度
        autoCropHeight: 112, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      downImg: '#'
    }
  },
  created() {
    this.option.img = this.src
  },
  methods: {
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    // 本地上传图片
    selectImg(e) {
      var file = e.target.files[0]
      this.filename = file.name
      if (!avatarRex.test(e.target.value)) {
        this.$message.warning('图片格式仅支持jpg、jpeg、png、gif格式')
        return false
      }
      if (file.size > 5242880) {
        this.$message.warning('图片大小不能超过5M')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    convertBase64ToBlob(base64) {
      var base64Arr = base64.split(',')
      var imgtype = ''
      var base64String = ''
      if (base64Arr.length > 1) {
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1]
        imgtype = base64Arr[0].substring(
          base64Arr[0].indexOf(':') + 1,
          base64Arr[0].indexOf(';')
        )
      }
      // 将base64解码
      var bytes = atob(base64String)
      //var bytes = base64;
      var bytesCode = new ArrayBuffer(bytes.length)
      // 转换为类型化数组
      var byteArray = new Uint8Array(bytesCode)

      // 将base64转换为ascii码
      for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i)
      }

      // 生成Blob对象（文件对象）
      return new Blob([bytesCode], { type: imgtype })
    },
    // 上传到服务器
    uploadAvatar() {
      this.isUploading = true
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCropBlob(data => {
          this.filename = this.filename || `${Date.now()}-avatar.jpeg`

          let formData = new FormData()
          formData.append(
            'file',
            this.convertBase64ToBlob(data),
            this.filename
          )
          formData.append('name', this.filename)

          service
            .globalUploadFile({
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              config: {}
            })
            .then(res => {
              this.isUploading = false
              resolve(res)
            })
            .catch(err => {
              this.isUploading = false
              reject(err)
            })
        })
      })
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 下载裁剪的图片
    down(type) {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'img-' + new Date().getTime()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          // aLink.href = window.URL.createObjectURL(data)
          // aLink.click()
          window.navigator.msSaveOrOpenBlob(data, 'img-' + Date.now() + '.png')
          // this.downImg = window.URL.createObjectURL(data)
          // aLink.download = this.downImg
          // console.log(this.downImg)
        })
      } else {
        // base64
        this.$refs.cropper.getCropData(data => {
          aLink.href = data
          aLink.click()
          // this.downImg = data
        })
      }
    },
    imgLoad(msg) {
      console.log(msg)
    }
  }
}
</script>
<style lang="less" scoped>
.ml8 {
  margin-left: 8px;
}
.cropper-content {
  display: flex;
  justify-content: flex-end;
  .cropper {
    width: 240px;
    height: 240px;
  }
  /deep/ .cropper-view-box {
    border-radius: 50%;
    border: 1px solid rgba(51, 153, 255, 0.75);
    outline: none;
  }
  /deep/ .cropper-face {
    border-radius: 50%;
  }
  .show-preview {
    flex: 1;
    display: flex;
    justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid rgba(151, 151, 151, 0.15);
      background: #cccccc;
    }
  }
}
.footer-btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  .scope-btn {
    width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .upload-btn {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .btn {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    margin: 0;
    font-size: 12px;
    color: @primary-color;
    line-height: 22px;
    .ant-btn {
      font-size: 12px;
      line-height: 22px;
    }
  }
}
.img-btn {
  cursor: pointer;
  .iconfont:hover {
    color: @primary-color;
  }
}
</style>
