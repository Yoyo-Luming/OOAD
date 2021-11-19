<template>
  <el-container>
    <el-card>
      任务名称：{{taskName}}
      价格：{{price}}
      领货区域：{{startRegion}}
      送货区域：{{endRegion}}
      <el-button @click="goTaskInfo">任务详情</el-button>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'taskOrderBox',
  props: {
    taskName: String,
    startRegion: String,
    endRegion: String,
    price: String,
    detail: Array
  },
  data () {
    return {
    }
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
