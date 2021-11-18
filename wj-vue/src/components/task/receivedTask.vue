<template>
  <el-container>
    <el-tabs>
      <el-tab-pane label="待领货的任务">
        <task-order-box v-for="(item, index) of waitGetObjectList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>
      </el-tab-pane>
      <el-tab-pane label="待送达的任务">
        <task-order-box v-for="(item, index) of waitSendList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>
      </el-tab-pane>
      <el-tab-pane label="待收货确认的任务">
        <task-order-box v-for="(item, index) of waitConfirmList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>
      </el-tab-pane>
      <el-tab-pane label="待评价的任务">
        <task-order-box v-for="(item, index) of waitCommentList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>
      </el-tab-pane>
      <el-tab-pane label="已完成的任务">
        <task-order-box v-for="(item, index) of successList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import taskOrderBox from './taskOrderBox'
export default {
  name: 'receivedTask',
  components: {taskOrderBox},
  mounted () {
    // this.$axios.post('task/task_wait_sender_list_up/').then(response => {
    //   console.log(response.data)
    // })
    // 待领货的任务
    this.$axios.post('task/task_wait_receive_object_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitGetObjectList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          detail: list[i]
        })
      }
    })
    // 待送达的任务
    this.$axios.post('task/task_wait_send_to_place_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitSendList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          detail: list[i]
        })
      }
    })
    // 待收货确认的任务
    this.$axios.post('task/task_wait_confirm_receive_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitConfirmList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          detail: list[i]
        })
      }
    })
    // 待评价的任务
    this.$axios.post('task/task_wait_comment_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitCommentList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          detail: list[i]
        })
      }
    })
    // 已完成的任务
    this.$axios.post('task/task_wait_confirm_success_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.successList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          detail: list[i]
        })
      }
    })
  },
  data () {
    return {
      waitGetObjectList: [],
      waitSendList: [],
      waitConfirmList: [],
      waitCommentList: [],
      successList: [],
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
  methods: {
  }
}
</script>

<style scoped>

</style>
