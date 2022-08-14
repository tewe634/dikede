<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content bg-purple">
        <span style="padding-right:5px">共{{ total }}条记录</span>
        <span>第{{ page }}/{{ pageAll }}页</span>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-button type="info" plain :disabled="page === 1" @click="minus">上一页</el-button>
        <el-button type="info" plain :disabled="page === pageAll" @click="add">下一页</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      page: 1,
      total: 101,
      lists: 10
    }
  },
  computed: {
    pageAll() {
      return Math.ceil(this.total / this.lists)
    }
  },
  methods: {
    minus() {
      this.page--
    },
    add() {
      this.page++
    }
  }
}
</script>

<style scoped>

</style>
