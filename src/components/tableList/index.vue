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
      <el-row>
        <el-button class="el-button--primary1" icon="el-icon-circle-plus-outline">新建</el-button>
        <el-button v-if="!isRepair" style="background-color:#fbf4f0; color:#000">工单配置</el-button>
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
          prop="createTime"
          label="创建日期"
          width="160"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <span style="cursor: pointer;color:#4368e1" @click="isShow = true">查看详情</span>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :total="total" :total-page="totalPage" :current-page="currentPage" @changePageEvent="changePageEvent" />
      <!-- 弹出框 -->
      <Dialog v-if="isShow" :is-show="isShow" />
    </div>
  </div>
</template>

<script>
import pagination from '../Pagination'
import Dialog from './components/Dialog.vue'
import { taskStateList, taskList } from '@/api/task'
export default {
  name: 'TableList',
  components: { pagination, Dialog },
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
      isShow: false // 点击详情显示或隐藏
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
</style>
