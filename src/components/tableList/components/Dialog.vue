<template>
  <el-dialog
    title="工单详情"
    :visible.sync="isShow"
    width="630px"
  >
    <span>这是一段信息</span>

    <el-row>
      <el-button>重新创建</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
