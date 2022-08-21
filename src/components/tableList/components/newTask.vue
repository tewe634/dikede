<template>
  <div>
    <!-- 新增工单 -->
    <div class="add">
      <el-dialog
        title="新增工单"
        :visible.sync="dialogVisible"
        width="630px"
      >
        <el-form ref="form" :model="formDate" :rules="rules" label-width="140px">
          <el-form-item label="设备编号:" prop="innerCode">
            <el-input v-model="formDate.innerCode" type="text" placeholder="请输入" show-word-limit maxlength="15" size="medium" @blur="getTaskId($event)" />
          </el-form-item>
          <el-form-item label="工单类型:" prop="productType">
            <el-select v-model="formDate.productType" placeholder="请选择" size="medium">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="补货数量:">
            <i class="el-icon-edit-outline" style="color:#5f84ff" />
            <span style="color:#5f84ff;cursor: pointer;" @click="mendTask">补货清单</span>
          </el-form-item>
          <el-form-item label="工单类型:" prop="assignorId">
            <el-select v-model="formDate.assignorId" placeholder="请选择" size="medium">
              <el-option
                v-for="item in list"
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
            <el-button style="background-color: #fbf4f0" @click="dialogVisible = false">取消</el-button>
            <el-button style="background-color: #ff5e20;color: #fff" @click="getFoundTask">确认</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
    <!-- 补货详情 -->
    <el-dialog
      title="补货详情"
      :visible.sync="Visible"
      width="630px"
    >
      <el-table
        :data="mendList"
        style="width: 100%"
        max-height="452px"
      >
        <el-table-column
          prop="channelCode"
          label="货道编号"
          width="92px"
        />
        <el-table-column
          prop="sku.skuName"
          label="商品名称"
          width="92px"
        />
        <el-table-column
          prop="currentCapacity"
          label="当前数量"
          width="92px"
        />
        <el-table-column
          prop="maxCapacity"
          label="还可添加"
          width="92px"
        />
        <el-table-column
          label="补满数量"
        >
          <template slot-scope="{row}">
            <el-input-number v-model="row.maxCapacity" class="error" controls-position="right" :min="1" :max="10" />
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="center">
        <el-button style="background-color: #fbf4f0" @click="dialogVisible = false">取消</el-button>
        <el-button style="background-color: #ff5e20;color: #fff" @click="add">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPeopleList, getVendingDetail, getFoundTask } from '@/api/task'
export default {
  data() {
    return {
      dialogVisible: false,
      formDate: {
        innerCode: '',
        productType: '',
        assignorId: '',
        desc: '',
        createType: 1,
        userId: 1
      },
      rules: {
        innerCode: [{ required: true, message: '设备编号必填', trigger: 'blur' }],
        productType: [{ required: true, message: '工单类型必填', trigger: 'blur' }],
        assignorId: [{ required: true, message: '运营人员必填', trigger: 'blur' }],
        desc: [{ required: true, message: '备注必填', trigger: 'blur' }]
      },
      list: [],
      options: [{
        value: 2,
        label: '补货工单'
      }],
      Visible: false,
      mendList: [],
      show: true
    }
  },
  computed: {
    channelCode() {
      return this.mendList.filter(ele => {
        if (!this.show) {
          ele.expectCapacity = ele.maxCapacity
          ele.skuImage = ele.sku.skuImage
          ele.skuName = ele.sku.skuName
          delete ele.channelId
          delete ele.createTime
          delete ele.currentCapacity
          delete ele.innerCode
          delete ele.lastSupplyTime
          delete ele.maxCapacity
          delete ele.price
          delete ele.sku
          delete ele.updateTime
          delete ele.vmId
          return ele
        }
      })
    }
  },
  methods: {
  // input失去焦点获取运营人员列表
    async getTaskId(e) {
      try {
        const { data } = await getPeopleList(e.target.value)
        this.list = data
      } catch (error) {
        console.log(error)
      }
    },
    // 补货详情
    mendTask() {
      this.$refs.form.validateField('innerCode', async(err) => {
        if (!err) {
          this.Visible = true
          const { data } = await getVendingDetail(this.formDate.innerCode)
          this.mendList = data
        } else {
          return err
        }
      })
    },
    // 创建工单
    async getFoundTask() {
      const details = this.channelCode
      this.dialogVisible = false
      try {
        await getFoundTask({ ...this.formDate, details })
        this.show = true
        this.$parent.taskList()
      } catch (error) {
        console.log(error)
      }
    },
    add() {
      this.show = false
      this.Visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.add {
  ::v-deep .el-input__inner {
  width: 396px;
}
}
::v-deep .el-input__count-inner {
display: inline;
background-color: transparent;
  position: relative;
  left: -410px;
  top: 40px;
}

::v-deep .el-textarea__inner {
  width: 396px;
}

::v-deep .el-input__count {
  position:relative;
  top: -40px;
  left: 360px;
}
.cell {
.el-input {
  ::v-deep .el-input__inner {
    width: 0px;
  }
}
}
</style>
