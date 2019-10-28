<template>
  <el-upload class="avatar-uploader"
    action=""
    :show-file-list="false"
    :http-request="UpLoad">
    <img v-if="fImgPath" :src="fImgPath" class="avatarUpload">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { OssToken } from '@api/system'
import { UploadFile } from '@/libs/upload'
export default {
  name: 'zl-upload',
  data () {
    return {
      fImgPath: this.value,
      imageHostUrl: 'https://media.leadnexus.net/'
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    UpLoad (file) {
      const isLt2M = file.file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过2M！')
      } else {
        OssToken().then((res) => {
          if (res.code === 0) {
            const imgData = res
            let that = this
            UploadFile(file, this.imageHostUrl + file.file.name, this.imageHostUrl, imgData, function (res) {
              that.fImgPath = res
              that.$emit('input', that.fImgPath)
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.avatarUpload {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;}
</style>
