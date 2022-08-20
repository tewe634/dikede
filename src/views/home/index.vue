<template>
  <div class="dashboard-container">
    <div class="dashboard-text" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Home',
  created() {
    this.$store.dispatch('home/getWorkAll', { start: dayjs(new Date().setDate(1)).format('YYYY-MM-DD HH:mm:ss'), end: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
