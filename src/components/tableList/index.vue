<template>
  <div v-loading="loading" class="app-container">
    <!-- 输入框 -->
    <el-row type="flex" justify="start" align="middle" style="margin-bottom:20px">
      <span style="padding-right:12px">工单编号:</span>
      <el-input v-model="taskCode" placeholder="请输入" style="width:202px;padding-right:12px" />
      <span style="padding-right:12px">工单状态:</span>
      <el-select v-model="value" placeholder="请选择" style="padding-right:12px">
        <el-option
          v-for="item in options"
          :key="item.statusId"
          :label="item.statusName"
          :value="item.statusId"
        />
      </el-select>
      <el-button style="background-color: #5f84ff;color: #fff" icon="el-icon-search" @click="searchList">查询</el-button>
    </el-row>
    <!-- 表格 -->
    <div class="result">
      <!-- 按钮 -->
      <el-row v-if="!isRepair">
        <el-button class="el-button--primary1" icon="el-icon-circle-plus-outline" @click="newTasks">新建</el-button>
        <el-button style="background-color:#fbf4f0; color:#000" @click="deploy">工单配置</el-button>
      </el-row>
      <el-row v-else>
        <el-button class="el-button--primary1" icon="el-icon-circle-plus-outline" @click="opsTask">新建</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="lists"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
          width="216"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="213"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
          width="213"
        />
        <el-table-column
          prop="createType"
          label="工单方式"
          width="213"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"
          width="213"
        />
        <el-table-column
          prop="userName"
          label="运营人员"
          width="213"
        />
        <el-table-column
          label="创建日期"
          width="160"
        >
          <template slot-scope="{row}">
            <div>
              {{ row.createTime.replace('T',' ') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="{row}">
            <span style="cursor: pointer;color:#4368e1" @click="details(row.taskId)">查看详情</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :total="total" :total-page="totalPage" :current-page="currentPage" @changePageEvent="changePageEvent" />
      <!-- 弹出框 -->
      <Dialog ref="dialog" />
      <Details />
      <new-task ref="newTask" @toggleTask="taskList" />
      <ops-task ref="opsTask" @opsTask="taskList" />
    </div>
    <!-- 补货警戒线 -->
    <el-dialog
      title="工单配置"
      :visible.sync="dialogVisible"
      width="630px"
      :before-close="handleClose"
    >
      <el-row type="flex" justify="center">
        <el-form ref="form" :model="formDate" :rules="rules">
          <el-form-item label="补货警戒线:" label-width="100px" prop="val">
            <el-input-number v-model="formDate.val" :min="1" :max="100" controls-position="right" style="width:396px" />
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-button style="background-color:#fbf4f0" @click="handleClose">取消</el-button>
            <el-button style="background-color:#ff5e20;color:#fff" @click="backOrder">确认</el-button>
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>
    <!-- 取消工单 -->
    <el-dialog
      :visible.sync="dialog"
      width="409px"
      :modal="true"
    >
      <el-row type="flex" justify="center" align="middle">
        <i class="el-icon-warning" style="color:red;padding-right:17px;font-size:21px" />
        <span>取消工单后，将不能恢复，是否确认取消？</span>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top:20px">
        <el-button size="medium" @click="dialog = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="getCencalTask">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '../Pagination'
import Dialog from './components/Dialog.vue'
import Details from './components/details.vue'
import opsTask from './components/opsTask.vue'
import { taskStateList, taskList, getdeployVal, getAutoTask, getCencalTask } from '@/api/task'
import NewTask from './components/newTask.vue'
export default {
  name: 'TableList',
  components: { pagination, Dialog, Details, NewTask, opsTask },
  data() {
    return {
      options: [],
      value: '', //  stauts工单状态
      taskCode: '', // 工单编号
      pageIndex: 1,
      pageSize: 10,
      isRepair: this.$route.meta.isRepair, // 是否维修工单
      total: 0, // 总数
      totalPage: 0, // 总页数
      currentPage: 0, // 1
      list: [],
      loading: false,
      formDate: {
        val: '' // 补货警戒线
      },
      rules: {
        val: [{ required: true, message: '补货警戒线必填', trigger: 'blur' }]
      },
      dialogVisible: false,
      dialog: false

    }
  },
  computed: {
  // 路由跳转中控制按钮显示隐藏
    lists() {
      return this.list.filter(ele => {
        if (ele.createType === 0) {
          return (ele.createType = '自动')
        } else {
          return (ele.createType = '手动')
        }
      })
    }
  },
  watch: {
    formDate: {
      deep: true,
      handler(val) {
        if (val.val <= 1) {
          val.val = 1
        }
        if (val.val >= 100) {
          val.val = 100
        }
      }
    }
  },
  mounted() {
    this.taskStateList()
    this.taskList()
  },
  methods: {
  // 工单状态列表
    async taskStateList() {
      const { data } = await taskStateList()
      this.options = data
    },
    // 工单列表
    async taskList() {
      this.loading = true
      try {
        const { data } = await taskList(
          { pageIndex: this.pageIndex, pageSize: this.pageSize, taskCode: this.taskCode, status: this.value, isRepair: this.isRepair }
        )
        this.list = data.currentPageRecords
        this.total = Number(data.totalCount)
        this.totalPage = Number(data.totalPage)
        this.currentPage = Number(data.pageIndex)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 点击切换列表
    changePageEvent(val) {
      this.pageIndex = this.pageIndex + val
      this.taskList()
    },
    // 搜索
    searchList() {
      this.taskList()
    },
    // 查看详情
    details(id) {
      this.$refs.dialog.isShow = true
      this.$bus.$emit('getTask', id)
    },
    // 配置工单
    async deploy() {
      this.dialogVisible = true
      try {
        const { data } = await getdeployVal()
        this.formDate.val = data
      } catch (error) {
        console.log(error)
      }
    },
    // 补货警戒线确认
    async backOrder() {
      await this.$refs.form.validate()
      try {
        const { data } = await getAutoTask({ alertValue: this.formDate.val })
        if (data) {
          this.taskList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.dialogVisible = false
      }
    },
    // 取消工单
    async getCencalTask() {
      try {
        const id = this.$refs.dialog.taskId
        const { data } = await getCencalTask(id, { desc: '' })
        this.dialog = false
        this.$refs.dialog.isShow = false
        if (data) {
          this.taskList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 运营新建
    newTasks() {
      this.$refs.newTask.dialogVisible = true
    },
    // 运维新建
    opsTask() {
      this.$refs.opsTask.dialogVisible = true
    },
    // 清空表单样式
    handleClose() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}

</script>

<style scoped lang="scss">
.result {
  padding: 20px 15px 19px 17px;
    background-color: #fff;
.el-button--primary1 {
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
  color: #fff;
}
}
.el-dialog {
  ::v-deep .el-input__inner {
    text-align: center;
  }
}
</style>
