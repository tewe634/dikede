<template>
  <div class="app-wrapper">
    <!-- 头部 -->
    <div class="navbar">
      <navbar />
    </div>
    <!-- 左侧导航 -->
    <sidebar class="sidebar-container" />
    <!-- 中间内容 -->
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.$store.dispatch('user/setUserInfo', this.userId)
  }

}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .navbar {
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1999;
    background-image: url('~@/assets/img/titlebg.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .sidebar-container {
    width: 167px!important;
    min-height: calc(100% - 60px);
    position: fixed;
    font-size: 0;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .main-container {
    height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    padding-top: 60px;
    margin-left: 167px;
    position: relative;
    background-color: #f8fafd;
    overflow: hidden;
  }
</style>
