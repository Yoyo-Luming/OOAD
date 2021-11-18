<template>
  <el-container>
    <el-button @click="goPublishTask">发布任务</el-button>
<!--    <goods-box v-for="(item, index) of goodsList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>-->
    <task-box v-for="(item, index) of taskList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :taskId="item.taskId" :ddlTime="item.ddlTime" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-box>
  </el-container>
</template>

<script>
import taskBox from './taskBox'
export default {
  name: 'taskHall',
  components: {taskBox},
  data () {
    return {
      taskId: '',
      taskList: [],
      regionList: [ '荔园',
        '创园',
        '慧园',
        '欣园',
        '学生宿舍',
        '湖畔',
        '九华精舍',
        '教师公寓',
        '专家公寓',
        '风雨操场',
        '润扬体育馆',
        '工学院',
        '南科大中心',
        '第一科研楼',
        '第二科研楼',
        '第一教学楼',
        '第二教学楼',
        '台州楼',
        '检测中心',
        '行政楼',
        '琳恩图书馆',
        '1号门',
        '2号门',
        '3号门',
        '4号门',
        '5号门',
        '6号门',
        '7号门',
        '8号门',
        '其它']
    }
  },
  mounted () {
    // 获取所有任务，待发布任务， 我发布的任务，我接收的任务
    // 任务状态， 已发布、已接收、已送达、已完成
    // taskName: String,
    //   ddlTime: String,
    //   startPosition: String,
    //   endPosition: String,
    //   taskId: String,
    //   detail: Array
    this.$axios.post('task/get_task_list/').then(response => {
      console.log(response.data)
      let len = response.data.return_list.length
      let returnList = response.data.return_list
      for (let i = 0; i < len; ++i) {
        this.taskList.push({
          taskName: returnList[i].name,
          price: returnList[i].price,
          ddlTime: returnList[i].ddl_time,
          startRegion: this.regionList[returnList[i].sender_addr.user_region],
          endRegion: this.regionList[returnList[i].receive_addr.user_region],
          taskId: returnList[i].task_id,
          detail: returnList[i]
        })
      }
    })
  },
  methods: {
    goPublishTask () {
      this.$router.push('publishTask')
    }
  }
}
</script>

<style scoped>

</style>
