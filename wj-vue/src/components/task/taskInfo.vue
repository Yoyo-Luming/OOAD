<template>
  <el-container>
    <el-row>
      <el-col><el-steps :active="active" :space="200" finish-status="success">
        <el-step title="待接受"></el-step>
        <el-step title="待领货"></el-step>
        <el-step title="待送达"></el-step>
        <el-step title="待收货确认"></el-step>
        <el-step title="待评价"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps></el-col>
      <el-col>
        发布者:{{senderName}}
        <img :src="senderPhoto" v-if="senderHasPhoto">
        <i class="el-icon-s-custom" v-else></i>
      </el-col>
      <el-col>
        <el-button @click="goChatPage" >
          <div v-if="currentUserIsSender">联系跑腿员</div>
          <div v-else>联系发布者</div>
        </el-button>
        <el-button @click="chatReceiver" v-if="hasOrder">联系收货方</el-button>
      </el-col>
      <el-col>
        价格: {{taskPrice}}
      </el-col>
      <el-col>
        任务描述: {{taskDescription}}
      </el-col>
      <el-col>
        发货区域: {{taskSendRegion}}
        详细地址： {{taskSendAddress}}
      </el-col>
      <el-col>
        收货区域：{{taskReceiveRegion}}
        详细地址：{{taskReceiveAddress}}
      </el-col>
      <el-col>
        <el-button @click="getTask" v-if="getTaskButton">领取任务</el-button>
        <el-button @click="confirmGetObject" v-if="confirmGetObjectButton">确认领货</el-button>
        <el-button @click="confirmSend" v-if="confirmSendButton">确认送达</el-button>
        <el-button @click="confirmReceive" v-if="confirmReceiveButton">确认收货</el-button>
        <el-button @click="commentVisible=true" v-if="commentButton">评论</el-button>
<!--        <el-button >确认</el-button>-->
      </el-col>
    </el-row>
    <el-dialog title="评价" :visible.sync="commentVisible" center>
      服务评分：<el-rate v-model="commentRate"></el-rate>
      评论：<el-input v-model="commentText"></el-input>
      <el-button @click="submitComment">提交评价</el-button>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'taskInfo',
  mounted () {
    this.detail = this.$route.params.detail
    console.log(this.detail)
    this.taskId = this.detail.task_id
    this.active = this.activeDict[this.detail.task_status]
    this.senderName = this.detail.upload_user.user_name
    this.senderHasPhoto = this.detail.upload_user.has_header_photo
    this.taskPrice = this.detail.price
    this.taskDescription = this.detail.description
    this.taskSendRegion = this.regionList[this.detail.sender_addr.user_region]
    this.taskSendAddress = this.detail.sender_addr.user_addr
    this.taskReceiveRegion = this.regionList[this.detail.receive_addr.user_region]
    this.taskReceiveAddress = this.detail.receive_addr.user_addr
    if (this.senderHasPhoto) {
      this.senderPhoto = this.detail.upload_user.header_photo_url
    }
    console.log(this.$global.userName)
    console.log(this.detail.upload_user.user_name)
    this.currentUserIsSender = this.$global.userName === this.detail.upload_user.user_name
    if (this.active === 1 && !this.currentUserIsSender) {
      this.getTaskButton = true
    }
    if (this.active === 2 && !this.currentUserIsSender) {
      this.confirmGetObjectButton = true
    }
    if (this.active === 3 && !this.currentUserIsSender) {
      this.confirmSendButton = true
    }
    if (this.active === 4 && this.currentUserIsSender) {
      this.confirmReceiveButton = true
    }
    if (this.active === 5 && this.currentUserIsSender) {
      this.commentButton = true
    }
  },
  data () {
    return {
      detail: [],
      taskId: '',
      getTaskButton: false,
      confirmGetObjectButton: false,
      confirmSendButton: false,
      confirmReceiveButton: false,
      commentButton: false,
      commentVisible: false,
      commentRate: 1,
      commentText: '',
      activeDict: {
        7: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6
      },
      active: 0,
      senderName: '',
      senderPhoto: '',
      senderHasPhoto: '',
      taskDescription: '',
      taskPrice: '',
      taskSendRegion: '',
      taskSendAddress: '',
      taskReceiveRegion: '',
      taskReceiveAddress: '',
      currentUserIsSender: false,
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
        '其它'],
      hasOrder: false
    }
  },
  methods: {
    getTask () {
      console.log(this.detail)
      console.log(this.taskId)
      this.$axios.post('task/get_task/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
      })
    },
    confirmGetObject () {
      this.$axios.post('task/task_get_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
      })
    },
    confirmSend () {
      this.$axios.post('task/task_send_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
      })
    },
    confirmReceive () {
      this.$axios.post('task/task_receive_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
      })
    },
    submitComment () {
      this.$axios.post('task/task_comment/', this.$qs.stringify({
        task_id: this.taskId,
        comment_content: this.commentText,
        comment_level: this.commentRate
      })).then(response => {
        console.log(response.data)
      })
    },
    goChatPage () {
      if (!this.currentUserIsSender) {
        this.$router.push({name: 'chatPage', params: {name: this.detail.send_user.user_name, id: this.detail.send_user.user_id, dialogueId: this.detail.dialogue_id}})
      } else {
        this.$router.push({name: 'chatPage', params: {name: this.detail.upload_user.user_name, id: this.detail.upload_user.user_id, dialogueId: this.detail.dialogue_id}})
      }
    }
  }
}
</script>

<style scoped>

</style>
