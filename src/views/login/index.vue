<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <img src="../../assets/img/logo.png" alt="" class="login-logo">
      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="phone" />
        </span>
        <el-input v-model="loginForm.loginName" type="text" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="inputPwd" v-model="loginForm.password" :type="`${isShow ? '' : 'password'}`" placeholder="请输入密码" />
        <span class="svg-container" @click="changePwd">
          <svg-icon :icon-class="`${isShow ? 'eye-open' : 'eye' }`" />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <el-row>
          <el-col :span="17">
            <span class="svg-container">
              <svg-icon icon-class="security, protection, shield" />
            </span>
            <el-input v-model="loginForm.code" type="text" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="7">
            <img :src="url" alt="" @click="toggleImg">
          </el-col>
        </el-row>

      </el-form-item>
      <el-button type="primary" class="login-btn" style="width:100%;margin-bottom:30px;" @click="loginBtn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { imgeCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        loginType: 0,
        clientToken: Math.random()
      },
      rules: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      isShow: false,
      url: ''
      // num: Math.random()
    }
  },
  async created() {
    try {
      const res = await imgeCode(this.loginForm.clientToken)
      console.log(res)
      this.url = res.config.url
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    changePwd() {
      this.isShow = !this.isShow
      this.$nextTick(() => {
        this.$refs.inputPwd.focus()
      })
    },
    // 登入
    async loginBtn() {
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/home')
      } catch (error) {
        console.log(error.message)
      }
    },
    async toggleImg() {
      this.loginForm.clientToken = this.loginForm.clientToken + 1
      try {
        const res = await imgeCode(this.loginForm.clientToken)
        console.log(res)
        this.url = res.config.url
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content {
    line-height:0px;
      background-color: #fff;
    }
  }
  .el-button {
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dde3;
    border-color: #d8dde3;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url('../../assets/img/bg.png') no-repeat;
  background-size:cover;
  .login-form {
   position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

      .login-logo {
          position: absolute;
           width: 96px;
           height: 96px;
           top: -46px;
           left: 50%;
           margin-left: -48px;
      }
      .login-btn {
        width: 100%;
      height: 52px;
      background: linear-gradient(262deg,#2e50e1,#6878f0);
      opacity: .91;
      border-radius: 8px;
      color: #fff;
      text-shadow: 0 7px 22px #cfcfcf;
      }
    }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

</style>
