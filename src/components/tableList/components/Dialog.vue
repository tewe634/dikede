<template>
  <el-dialog
    title="工单详情"
    :visible.sync="isShow"
    width="630px"
  >
    <!-- 中间内容 -->
    <div v-if="statusId === 1" class="el-dialog__body">
      <el-row class="task-status" type="flex" justify="space-between" align="middle">
        <div>
          <img src="../../../assets/img/success.png" alt="" style="margin-right:20px">
          <span style="margin-right:16px;position:relative;top:-5px">{{ statusName }}</span>
        </div>
        <div>
          <img src="../../../assets/img/success1.png" alt="">
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">设备编号:</span>
          <span>{{ taskObj.innerCode }}</span>
        </div>
        <div>
          <span style="padding-right:12px">创建日期:</span>
          <span>{{ updateTime }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">运营人员:</span>
          <span>{{ taskObj.userName }}</span>
        </div>
        <div>
          <span style="padding-right:12px">工单类型:</span>
          <span>{{ typeName }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">补货数量:</span>
          <span style="color:#5f84ff;cursor: pointer;" @click="backOrder(taskId)">补货详情</span>
        </div>
        <div>
          <span style="padding-right:12px">工单方式:</span>
          <span>{{ taskObj.createType === 0 ?'自动':'手动' }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="start" align="center">
        <div>
          <span style="padding-right:12px">备注:</span>
          <span>{{ taskObj.desc }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button style="background-color:#fbf4f0" @click="cancelTask(taskId)">取消工单</el-button>
      </el-row>
    </div>
    <!-- =================== -->
    <div v-else-if="statusId === 3" class="el-dialog__body">
      <el-row class="task-status" type="flex" justify="space-between" align="middle">
        <div>
          <img src="../../../assets/img/error.png" alt="" style="margin-right:20px">
          <span style="margin-right:16px;position:relative;top:-5px">{{ statusName }}</span>
        </div>
        <div>
          <img src="../../../assets/img/error1.png" alt="">
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">设备编号:</span>
          <span>{{ taskObj.innerCode }}</span>
        </div>
        <div>
          <span style="padding-right:12px">创建日期:</span>
          <span>{{ createTime }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">取消日期:</span>
          <span>{{ updateTime }}</span>
        </div>
        <div>
          <span style="padding-right:12px">运营人员:</span>
          <span>{{ taskObj.userName }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">工单类型:</span>
          <span>{{ typeName }}</span>
        </div>
        <div>
          <span style="padding-right:12px">补货数量:</span>
          <span style="color:#5f84ff;cursor: pointer;" @click="backOrder(taskId)">补货详情</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">工单方式:</span>
          <span>{{ taskObj.createType === 0 ?'自动':'手动' }}</span>
        </div>
        <div>
          <span style="padding-right:12px">取消原因:</span>
          <span>{{ taskObj.expect }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button style="background-color:#fbf4f0">重新创建</el-button>
      </el-row>
    </div>
    <!-- ================ -->
    <div v-else class="el-dialog__body">
      <el-row class="task-status" type="flex" justify="space-between" align="middle">
        <div>
          <img src="../../../assets/img/done.png" alt="" style="margin-right:20px">
          <span style="margin-right:16px;position:relative;top:-5px">{{ statusName }}</span>
        </div>
        <div>
          <img src="../../../assets/img/done1.png" alt="">
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">设备编号:</span>
          <span>{{ taskObj.innerCode }}</span>
        </div>
        <div>
          <span style="padding-right:12px">创建日期:</span>
          <span>{{ createTime }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">完成日期:</span>
          <span>{{ updateTime }}</span>
        </div>
        <div>
          <span style="padding-right:12px">运维人员:</span>
          <span>{{ taskObj.userName }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">工单类型:</span>
          <span>{{ typeName }}</span>
        </div>
        <div>
          <span style="padding-right:12px">工单方式:</span>
          <span>{{ taskObj.createType === 0 ?'自动':'手动' }}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <div>
          <span style="padding-right:12px">备注:</span>
          <span>{{ taskObj.desc }}</span>
        </div>
        <div>
          <span style="padding-right:12px">定位:</span>
          <span>
            <i class="el-icon-location-outline" style="color:#5f84ff" />
            {{ taskObj.addr }}</span>
        </div>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { getTaskState } from '@/api/task'
export default {
  data() {
    return {
      isShow: false, // 点击详情显示或隐藏
      taskObj: {},
      updateTime: '',
      createTime: ''
    }
  },
  computed: {
    statusId() {
      return this.taskObj?.taskStatusTypeEntity?.statusId
    },
    statusName() {
      return this.taskObj?.taskStatusTypeEntity?.statusName
    },
    typeName() {
      return this.taskObj?.taskType?.typeName
    },
    taskId() {
      return this.taskObj?.taskId
    }
  },
  watch: {
    taskObj: {
      deep: true,
      handler(val) {
        this.updateTime = val.updateTime.replace('T', ' ')
        this.createTime = val.createTime.replace('T', ' ')
      }
    }
  },
  mounted() {
  // 通过事件总线获取详情数据
    this.$bus.$on('getTask', async(val) => {
      const { data } = await getTaskState(val)
      this.taskObj = data
    })
  },
  beforeDestroy() {
    this.$bus.$off('getTask')
  },
  methods: {
  // 点击查看详情
    async backOrder(id) {
      this.$bus.$emit('details', id)
    },
    // 取消工单
    cancelTask(id) {
      this.$parent.dialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
  .task-status {
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0,0%,92.5%,.39);
  }
  .el-row {
    height: 36px;
    div {
      width: 220px;
      height: 36px;
      display:flex;
      justify-content: start;
      align-items: center;
    }
  }
}
</style>
