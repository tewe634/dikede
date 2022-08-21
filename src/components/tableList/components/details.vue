<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="630px"
  >
    <el-table
      :data="list"
      style="width: 100%"
      max-height="380px"
    >
      <el-table-column
        prop="channelCode"
        label="货道编号"
        width="180"
      />
      <el-table-column
        prop="skuName"
        label="商品"
        width="180"
      />
      <el-table-column
        prop="expectCapacity"
        label="补货数量"
      />
    </el-table>
  </el-dialog>
</template>

<script>
import { backOrderTask } from '@/api/task'
export default {
  data() {
    return {
      dialogVisible: false,
      list: []
    }
  },
  mounted() {
    this.$bus.$on('details', async(val) => {
      this.dialogVisible = true
      try {
        const { data } = await backOrderTask(val)
        this.list = data
      } catch (error) {
        console.log(error)
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>
