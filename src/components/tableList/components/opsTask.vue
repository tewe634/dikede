<template>
  <div class="opsTask">
    <el-dialog
      title="新增工单"
      :visible.sync="dialogVisible"
      width="630px"
    >
      <el-form ref="form" :model="formDate" :rules="rules" label-width="140px">
        <el-form-item label="设备编号:" prop="innerCode">
          <el-input v-model="formDate.innerCode" type="text" placeholder="请输入" show-word-limit maxlength="15" size="medium" @blur="getTaskId($event)" />
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
.opsTask {

}
</style>
