<template>
  <el-card>
    任务名称：{{taskName}}
    价格：{{price}}
    最晚取货时间：{{ddlTime}}
    领货区域：{{startRegion}}
    送货区域：{{endRegion}}
    <el-button @click="goTaskInfo">任务详情</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'taskBox',
  props: {
    taskName: String,
    ddlTime: String,
    startRegion: String,
    endRegion: String,
    taskId: String,
    price: String,
    detail: Array
  },
  methods: {
    goTaskInfo () {
      this.$router.push({name: 'taskInfo', params: {detail: this.detail}})
    }
  }
}
</script>

<style scoped>

</style>
