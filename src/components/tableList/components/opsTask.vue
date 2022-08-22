<template>
  <div class="opsTask">
    <el-dialog
      title="新增工单"
      :visible.sync="dialogVisible"
      width="630px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="formDate" :rules="rules" label-width="140px">
        <el-form-item label="设备编号:" prop="innerCode">
          <el-input v-model="formDate.innerCode" type="text" placeholder="请输入" show-word-limit maxlength="15" size="medium" @blur="getTaskId" />
        </el-form-item>
        <el-form-item label="工单类型:" prop="productType">
          <el-select v-model="formDate.productType" placeholder="请选择" size="medium">
            <el-option
              v-for="item in values"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="运维人员:" prop="assignorId">
          <el-select v-model="formDate.assignorId" placeholder="请选择" size="medium">
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="desc">
          <el-input
            v-model="formDate.desc"
            type="textarea"
            :rows="3"
            placeholder="请输入备注(不超过40字)"
            show-word-limit
            maxlength="40"
          />
        </el-form-item>
        <el-row type="flex" justify="center" align="center">
          <el-button style="background-color: #fbf4f0" @click="handleClose">取消</el-button>
          <el-button style="background-color: #ff5e20;color: #fff" @click="getFoundTask">确认</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getVendingTask, getAllTask, getFoundTask } from '@/api/task'
export default {
  data() {
    return {
      dialogVisible: false,
      formDate: {
        assignorId: '',
        createType: 1,
        desc: '',
        details: [],
        innerCode: '',
        userId: this.$store.getters.userId,
        productType: ''
      },
      rules: {
        innerCode: [{ required: true, message: '设备编号必填', trigger: 'blur' }],
        productType: [{ required: true, message: '工单类型必填', trigger: 'blur' }],
        assignorId: [{ required: true, message: '工单类型必填', trigger: 'blur' }],
        desc: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      options: [],
      values: [],
      res: []
    }
  },
  mounted() {
    this.getAllTask()
    this.$bus.$on('opsTasks', (id, typeId, val) => {
      this.formDate.innerCode = id
      this.formDate.productType = typeId
      this.formDate.assignorId = val
      this.dialogVisible = true
      this.getTaskId()
    })
  },
  beforeDestroy() {
    this.$bus.$off('opsTasks')
  },
  methods: {
  // 关闭对话框
    handleClose() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.formDate = {
        assignorId: '',
        createType: 1,
        desc: '',
        details: [],
        innerCode: '',
        userId: this.$store.getters.userId,
        productType: ''
      }
    },
    // 输入框失去焦点
    async  getTaskId() {
      const { data } = await getVendingTask(this.formDate.innerCode)
      this.options = data
    },
    // 获取所有工单类型
    async getAllTask() {
      const { data } = await getAllTask()
      const res = data.splice(1, 1)
      this.res = res
      this.values = data
    },
    // 确认
    async getFoundTask() {
      try {
        await getFoundTask(this.formDate)
        this.$bus.$emit('fondIndex')
        this.$emit('opsTask')
        this.$message.success('创建成功~')
        this.handleClose()
      } catch (error) {
        console.log(error.response.data)
        const res = error.response
        this.$message.error(res?.data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.opsTask {
  ::v-deep .el-input__inner {
  width: 396px;
  }
  ::v-deep .el-input__count-inner {
  display: inline;
  background-color: transparent;
  position: relative;
  left: -50px;
  }
  ::v-deep .el-textarea__inner {
    width: 396px;
  }
  .el-textarea{
  .el-input__count {
    position: relative;
    top: -35px;
    left: 363px;
  }

  }
}
</style>
