<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <!-- 显示背景时间 -->
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:bottom cross:bottom">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            <!-- <a href="https://fanyi.baidu.com/?aldtype=16047#en/zh/Some%20birds%20aren't%20meant%20to%20be%20caged%2C%20that's%20all.%20Their%20feathers%20are%20just%20too%20bright." target="_blank"> -->
              <span>Some birds aren't meant to be caged, that's all. Their feathers are just too bright.</span>
            <!-- </a> -->
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <!-- <img class="page-login--logo" :src="`${$baseUrl}all.png`"> -->
          <h1>Quant</h1>
          <!-- 表单 -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                <el-form-item prop="username">
                  <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.password" placeholder="密码" @keyup.enter.native="submit">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-button size="default" @click="submit" type="primary" class="button-login">登录</el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p> -->
          <p class="page-login--content-footer-copyright">
            Copyright <d2-icon name="copyright"/> 2019 <a href="https://www.leadnexus.net">LeadNexus</a> 出品
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import { GetKey } from '@/api/lock'
import { encrypt } from '@/libs/info.js'

export default {
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    ...mapActions('d2admin/db', [
      'databaseClear'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    // 清除缓存
    async handleClear () {
      // 清除当前页面的数据库内容
      await this.databaseClear()
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    // submit () {
    //   var crypt = ''
    //   var cryiv = ''
    //   var crykey = ''
    //   // 获取密钥对
    //   GetKey().then((res) => {
    //     if (res.code === 0) {
    //       crykey = res.key
    //       cryiv = res.iv
    //     }
    //     // 加密密码
    //     crypt = encrypt(crykey, cryiv, this.formLogin.password)
    //     // 登陆请求
    //     this.$refs.loginForm.validate((valid) => {
    //       if (valid) {
    //       // 登录
    //       // 具体需要传递的数据请自行修改代码
    //         this.login({
    //           vm: this,
    //           username: this.formLogin.username,
    //           password: crypt
    //         }).then(() => {
    //           // 清空缓存
    //           this.handleClear()
    //           // 重定向对象不存在则返回顶层路径
    //           this.$router.replace(this.$route.query.redirect || '/')
    //         })
    //       } else {
    //         // 登录表单校验失败
    //         this.$message.error('表单校验失败')
    //       }
    //     })
    //   })
    // },

    submit () {
      // 登陆请求
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          }).then(() => {
            // 清空缓存
            this.handleClear()
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    },

    Handlekey () {
      GetKey().then((res) => {
        if (res.code === 0) {
          this.crykey = res.key
          this.cryiv = res.iv
        }
        this.crypt = encrypt(this.crykey, this.cryiv, this.formLogin.password)
      })
      // console.log(this.crypt)
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  // $backgroundColor: #F0F2F5;
  $backgroundColor: rgb(112, 175, 247);
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 10em;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.35);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      $color-text-sub: rgba(243, 241, 126, 0.644);
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      $color-primary: rgb(0, 0, 0);
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
