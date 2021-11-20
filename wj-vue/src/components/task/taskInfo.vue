<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="">
        <span>SUSTech Store</span>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">Home Page</el-menu-item>
          <el-menu-item index="2" v-on:click="searchPage">Search Page</el-menu-item>
          <el-submenu index="3">
            <template slot="title">用户名</template>
            <el-menu-item index="3-1" v-on:click="myPage">Personal Page</el-menu-item>
            <el-menu-item index="3-2" v-on:click="cartPage">Shopping Cart</el-menu-item>
            <el-menu-item index="3-3" v-on:click="sellPage">Selling Page</el-menu-item>
            <el-menu-item index="3-4" v-on:click="markPage">Marking Page</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" v-on:click="logOut">Log Out</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-container class="mid-content">
        <el-container class="pane-content">
          <el-container class="step-container">
            <el-steps :active="active" :space="200" :align-center="true" finish-status="success" class="steps">
              <el-step title="待接受" class="single-step"></el-step>
              <el-step title="待领货" class="single-step"></el-step>
              <el-step title="待送达" class="single-step"></el-step>
              <el-step title="待收货" class="single-step"></el-step>
              <el-step title="待评价" class="single-step"></el-step>
              <el-step title="已完成" class="single-step"></el-step>
            </el-steps>
          </el-container>
          <el-container class="user-container">
            <el-container class="user-photo-container">
              <div v-if="senderHasPhoto">
                <el-image class="user-photo" :src="senderPhoto" fit="contain" :alt="senderName"></el-image>
              </div>
              <div v-else>
                <el-image class="user-photo" :src="defult_photo" fit="contain" alt=""></el-image>
              </div>
              <div class="user-name">{{senderName}}</div>
            </el-container>
            <el-container class="user-buttons">
              <el-button v-on:click="goChatPage" class="the-button">
                <div v-if="currentUserIsSender">联系跑腿员</div>
                <div v-else>联系发布者</div>
              </el-button>
              <el-button type="primary" class="other-button" @click="getTask" v-if="getTaskButton">领取任务</el-button>
              <el-button type="primary" class="other-button" @click="confirmGetObject" v-if="confirmGetObjectButton">确认领货</el-button>
              <el-button type="primary" class="other-button" @click="confirmSend" v-if="confirmSendButton">确认送达</el-button>
              <el-button type="primary" class="other-button" @click="confirmReceive" v-if="confirmReceiveButton">确认收货</el-button>
              <el-button type="primary" class="other-button" @click="comments" v-if="commentButton">评论</el-button>
            </el-container>
          </el-container>
          <el-divider></el-divider>
          <el-container class="task-container">
            <el-container class="line-one">
              <div class="task-price">价格：¥{{taskPrice}}</div>
              <div class="task-description">描述：{{taskDescription}}</div>
            </el-container>
            <el-divider></el-divider>
            <el-container class="line-two">
              <div class="task-place">发货区域：{{taskSendRegion}}</div>
              <div class="task-place">发货详细地址：{{taskSendAddress}}</div>
              <div class="task-place">收货区域：{{taskReceiveRegion}}</div>
              <div class="task-place">收货详细地址：{{taskReceiveAddress}}</div>
            </el-container>
          </el-container>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <el-row>-->
  <!--      <el-col><el-steps :active="active" :space="200" finish-status="success">-->
  <!--        <el-step title="待接受"></el-step>-->
  <!--        <el-step title="待领货"></el-step>-->
  <!--        <el-step title="待送达"></el-step>-->
  <!--        <el-step title="待收货确认"></el-step>-->
  <!--        <el-step title="待评价"></el-step>-->
  <!--        <el-step title="已完成"></el-step>-->
  <!--      </el-steps></el-col>-->
  <!--      <el-col>-->
  <!--        发布者:{{senderName}}-->
  <!--        <img :src="senderPhoto" v-if="senderHasPhoto">-->
  <!--        <i class="el-icon-s-custom" v-else></i>-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        <el-button @click="goChatPage" >-->
  <!--          <div v-if="currentUserIsSender">联系跑腿员</div>-->
  <!--          <div v-else>联系发布者</div>-->
  <!--        </el-button>-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        价格: {{taskPrice}}-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        任务描述: {{taskDescription}}-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        发货区域: {{taskSendRegion}}-->
  <!--        详细地址： {{taskSendAddress}}-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        收货区域：{{taskReceiveRegion}}-->
  <!--        详细地址：{{taskReceiveAddress}}-->
  <!--      </el-col>-->
  <!--      <el-col>-->
  <!--        <el-button @click="getTask" v-if="getTaskButton">领取任务</el-button>-->
  <!--        <el-button @click="confirmGetObject" v-if="confirmGetObjectButton">确认领货</el-button>-->
  <!--        <el-button @click="confirmSend" v-if="confirmSendButton">确认送达</el-button>-->
  <!--        <el-button @click="confirmReceive" v-if="confirmReceiveButton">确认收货</el-button>-->
  <!--        <el-button @click="commentVisible=true" v-if="commentButton">评论</el-button>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    <el-dialog title="评价" :visible.sync="commentVisible" center>-->
  <!--      服务评分：<el-rate v-model="commentRate"></el-rate>-->
  <!--      评论：<el-input v-model="commentText"></el-input>-->
  <!--      <el-button @click="submitComment">提交评价</el-button>-->
  <!--    </el-dialog>-->
  <!--  </el-container>-->
</template>

<script>
export default {
  // TODO need check
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
    this.hasOrder = (this.detail.task_type === 1)
    this.ddlTime = this.detail.ddl_time
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
      hasOrder: false,
      ddlTime: ''
    }
  },
  methods: {
    getTask () {
      console.log(this.detail)
      console.log(this.taskId)
      this.$axios.post('task/get_task/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/receivedtask')
        } else {
          this.$message.info(response.data.message)
        }
        // console.log(response.data)
      })
    },
    confirmGetObject () {
      this.$axios.post('task/task_get_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/receivedtask')
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    confirmSend () {
      this.$axios.post('task/task_send_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/receivedtask')
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    confirmReceive () {
      this.$axios.post('task/task_receive_object/', this.$qs.stringify({
        task_id: this.taskId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/releasedtask')
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    submitComment () {
      this.$axios.post('task/task_comment/', this.$qs.stringify({
        task_id: this.taskId,
        comment_content: this.commentText,
        comment_level: this.commentRate
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/releasedtask')
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    goChatPage () {
      if (!this.currentUserIsSender) {
        this.$router.push({name: 'chatPage', params: {name: this.detail.send_user.user_name, id: this.detail.send_user.user_id, dialogueId: this.detail.dialogue_id_up_sd}})
      } else {
        this.$router.push({name: 'chatPage', params: {name: this.detail.upload_user.user_name, id: this.detail.upload_user.user_id, dialogueId: this.detail.dialogue_id_up_se}})
      }
    },
    chatReceiver () {
      this.$router.push({name: 'chatPage', params: {name: this.detail.receive_user.user_name, id: this.detail.receive_user.user_id, dialogueId: this.detail.dialogue_id_up_se}})
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center no-repeat url("../../assets/back7.jpg");
  background-size: cover;
  display: block;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.5;
}

.right-head {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.left-head {
  display: flex;
  align-items: center;
}

.mid-content {
  display: block;
  margin: 60px auto;
  height: 100%;
  width: 90%;
}

.pane-content {
  display: block;
  height: 100%;
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

.step-container {
  display: block;
  align-items: center;
  text-align: center;
}

.steps {
  margin: 20px 20px 20px 20px;
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #cac6c6;
}

.single-step {
  margin: 0;
}

.user-container {
  width: 60%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.user-photo-container {
  display: block;
  margin: 60px;
  height: 200px;
  width: 200px;
  position: relative;
  flex: none;
}

.user-photo {
  height: 200px;
  width: 200px;
  align-items: center;
}

.user-name {
  display: block;
}

.user-buttons {
  display: block;
  text-align: center;
  align-items: center;
  height: 30px;
  width: 100px;
  font-size: 20px;
  margin: auto;
}

.the-button {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
}

.task-container {
  display: block;
  margin-bottom: 50px;
}

.line-one {
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  margin: auto;
}

.line-two {
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
}

.task-price {
  align-items: center;
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  display: flex;
  color: red;
}

.task-place {
  margin-top: 30px;
  font-size: 15px;
  text-align: left;
  font-family: 黑体;
  color: #000000;
}

.task-description {
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  font-family: 黑体;
  color: #8d99ae;
}

.other-button {
  margin-top: 20px;
  align-items: center;
  text-align: center;
}
</style>
