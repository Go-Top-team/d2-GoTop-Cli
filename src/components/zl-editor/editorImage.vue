<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-upload
        :data="uploadData"
        :multiple="true"
        :http-request="ossUploadImage"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        class="editor-slide-upload"
        action="https://upload-z2.qiniup.com/"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>

import { Message } from 'element-ui'
import { OssToken } from '@api/system'
import OSS from 'ali-oss'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      imageHostUrl: 'https://media.dkbang8.com/',
      // oss参数
      bucket: 'fishman',
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadData: {
        token: '',
        key: ''
      }
    }
  },
  methods: {
    ossUploadImage (file) {
      file = file.file
      const _self = this
      const fileName = file.uid
      this.listObj[fileName] = {}

      var isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message('上传的图片格式只能是PNG或JPG 格式！')
        return false
      }
      if (!isLt2M) {
        this.$message('上传的图片大小不能超过2M！')
        return false
      }

      _self.listObj[fileName] = { hasSuccess: false, key: this.uploadData.key, uid: file.uid, width: this.width, height: this.height }

      OssToken()
      // console.log('getSTSToken==',json)
        .then((res) => {
          if (res.code === 0) {
            // console.log('getSTSToken==', res)
            let client = new OSS({
              region: res.data.Region,
              accessKeyId: res.data.AccessKeyId,
              accessKeySecret: res.data.AccessKeySecret,
              stsToken: res.data.SecurityToken,
              bucket: _self.bucket
            })
            let imageName = ''

            var timestamp = (new Date()).getTime()
            imageName = timestamp + file.name
            // console.log('imageName==', imageName)

            client.put(imageName, file).then((res) => {
              if (res.res.statusCode === 200) {
                const uid = file.uid
                const objKeyArr = Object.keys(this.listObj)
                for (let i = 0, len = objKeyArr.length; i < len; i++) {
                  if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = this.imageHostUrl + res.name
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    return
                  }
                }
              } else {
                Message({
                  type: 'error',
                  message: '上传失败，请重新上传',
                  duration: '2000'
                })
              }
              // console.log('上传图片成功', res)
            }).catch((res) => {
              // console.log('上传图片失败', res)
              Message({
                type: 'error',
                message: '上传失败，请重新上传',
                duration: '2000'
              })
            })
          } else {
            // console.log('getSTSToken==', res)
            Message({
              type: 'error',
              message: '上传失败，请重新上传',
              duration: '2000'
            })
          }
        }).catch((res) => {
          // console.log('获取token失败', res)
          Message({
            type: 'error',
            message: '上传失败，请重新上传',
            duration: '2000'
          })
        })
    },
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleRemove (file) {
      // delete this.listObj[objKeyArr[i]]
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     setEditorImageDelete(
      //       this.listObj[objKeyArr[i]].key
      //     ).then((res) => {
      //       if (res.code !== 0) {
      //         Message({
      //           message: '删除照片失败',
      //           type: 'error',
      //           duration: 2 * 1000
      //         })
      //         return
      //       }

      //       return
      //     })
      //   }
      // }
    },
    beforeUpload (file) {

    }
  }
}
</script>
