<template>
  <div class="navbar">
    <!-- 左侧logo图片 -->
    <img src="@/assets/img/logo.3673fab5.png" alt="" class="breadcrumb-container">
    <!-- 右侧个人信息 -->
    <div class="right-menu">
      <el-row class="el-row">
        <el-col :span="5">
          <div style="height: 60px; line-height: 60px;">
            <img src="@/assets/img/userImg.png" class="user-avatar" style="vertical-align: middle;">
          </div>
        </el-col>
        <el-col :span="14">
          <div style="height: 60px; line-height: 60px;">
            <span>欢迎你,  {{ userName }}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div
            style="height: 60px; line-height: 60px;"
            @mouseenter="isShow = true"
            @mouseleave="isShow = false"
            @click="logout"
          >
            <span>退出</span>
            <i class="el-icon-caret-bottom" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isShow" class="el-tooltip__popper" style="transform-origin: center top; z-index: 2020;">
      退出登入
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  methods: {
    async logout() {
      await this.$store.commit('user/LOGOUT')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .breadcrumb-container {
    float: left;
    width: 88px;
    height: 36px;
    margin-top: 6px;
    margin-left: 15px;
  }

  .right-menu {
   float: right;
    width: 240px;
    height: 100%;
    margin-right: 24px;
    color: #fff;
    .el-row {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    }
  }
}
.el-tooltip__popper {
  position: fixed;
  right: 10px;
  top: 70px;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    min-width: 10px;
    word-wrap: break-word;
    background: #333;
    color: #fff;
}

</style>
