<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="" style="cursor:pointer;">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="mid-head" style="width: 50%;">
        <el-input
          placeholder="请输入搜索信息"
          prefix-icon="el-icon-search"
          v-model="searchContent" style="width: 870px"
          @keyup.enter.native="searchTop">
        </el-input>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="2-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="2-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="2-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="2-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" v-on:click="logOut">注销</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-container style="display: flex;height: 100%;">
      <el-aside width="200px" style="background-color: #545c64;opacity: 0.5;">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu class="menu-buttons" index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户信息</span>
            </template>
            <el-button class="inside-button" v-on:click="myPage">个人主页</el-button><br>
            <el-button class="inside-button" v-on:click="cartPage">购物车</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品</span>
            </template>
            <el-button class="inside-button" v-on:click="goSellOrder">卖出的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goBuyOrder">买到的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goPostGoods">发布的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goNewGoods">上架新商品</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="3">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>收藏</span>
            </template>
            <el-button class="inside-button" v-on:click="goFavoriteGoods">收藏的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goFavoriteUser">收藏的卖家</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="4">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>跑腿</span>
            </template>
            <el-button class="inside-button" v-on:click="goTaskHall">任务大厅</el-button><br>
            <el-button class="inside-button" v-on:click="goReleasedTask">发布的跑腿任务</el-button><br>
            <el-button class="inside-button" v-on:click="goReceivedTask">接受的跑腿任务</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="5">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>通知</span>
            </template>
            <el-button class="inside-button" v-on:click="goNoticePage">通知详情</el-button><br>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main style="height: 100%;padding: 0;">
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
            <el-container class="user-container" >
              <el-container class="user-photo-container">
                <div v-if="currentUserIsUploder && active > 0">
                  <div v-if="receiverHasPhoto">
                    <el-image class="user-photo" :src="receiverPhoto" fit="fill" style="height: 100%;width: 100%;" :alt="receiverName"></el-image>
                  </div>
                  <div v-else>
                    <el-image class="user-photo" :src="defult_photo" fit="fill" style="height: 100%;width: 100%;" alt=""></el-image>
                  </div>
                  <div class="user-name">{{receiverName}}</div>
                </div>
                <div v-else>
                  <div v-if="uploaderHasPhoto">
                    <el-image class="user-photo" :src="uploaderPhoto" fit="contain" style="height: 100%;width: 100%;" :alt="uploaderName"></el-image>
                  </div>
                  <div v-else>
                    <el-image class="user-photo" :src="defult_photo" fit="contain" style="height: 100%;width: 100%;" alt=""></el-image>
                  </div>
                  <div class="user-name">{{uploaderName}}</div>
                </div>
              </el-container>
              <el-container class="user-buttons">
                <div v-if="active === 0">等待接收</div>
                <el-button v-on:click="goChatPage" class="the-button" v-if="active > 0">
                  <div v-if="currentUserIsUploder">联系跑腿员</div>
                  <div v-else>联系发布者</div>
                </el-button>
                <el-button type="primary" class="other-button" @click="getTask" v-if="getTaskButton">领取任务</el-button>
                <el-button type="primary" class="other-button" @click="confirmGetObject" v-if="confirmGetObjectButton">确认领货</el-button>
                <el-button type="primary" class="other-button" @click="confirmSend" v-if="confirmSendButton">确认送达</el-button>
                <el-button type="primary" class="other-button" @click="confirmReceive" v-if="confirmReceiveButton">确认收货</el-button>
                <el-button type="primary" class="other-button" @click="commentVisible=true" v-if="commentButton">评论</el-button>
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
        <el-dialog style="margin: auto;" :visible.sync="commentVisible" :modal-append-to-body="false">
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item class="form-item-class" label="服务评分：" prop="commentRate">
              <el-rate v-model="commentRate"></el-rate>
            </el-form-item>
            <el-form-item class="form-item-class" label="评论：" prop="commentText">
              <el-input v-model="commentText"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="commentVisible=false">取消</el-button>
            <el-button @click="submitComment">确认</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'taskInfo',
  mounted () {
    this.detail = this.$store.state.toTaskPage.detail
    console.log('----------')
    console.log(this.$store.state.userName)
    console.log(this.detail.upload_user.user_name)
    // this.detail = this.$route.params.detail
    console.log(this.detail)
    this.taskId = this.detail.task_id
    this.active = this.activeDict[this.detail.task_status] - 1
    this.uploaderName = this.detail.upload_user.user_name
    this.uploaderHasPhoto = this.detail.upload_user.has_header_photo
    this.taskPrice = this.detail.price
    this.taskDescription = this.detail.description
    this.taskSendRegion = this.regionList[this.detail.sender_addr.user_region - 1]
    this.taskSendAddress = this.detail.sender_addr.user_addr
    this.taskReceiveRegion = this.regionList[this.detail.receive_addr.user_region - 1]
    this.taskReceiveAddress = this.detail.receive_addr.user_addr
    if (this.uploaderHasPhoto) {
      this.uploaderPhoto = this.detail.upload_user.header_photo_url
    }
    this.receiverHasPhoto = this.detail.receive_user.has_header_photo
    if (this.receiverHasPhoto) {
      this.receiverPhoto = this.detail.receive_user.header_photo_url
    }

    this.currentUserIsUploder = (this.$store.state.userName === this.detail.upload_user.user_name)
    if (this.active === 0 && !this.currentUserIsUploder) {
      this.getTaskButton = true
    }
    if (this.active === 1 && !this.currentUserIsUploder) {
      this.confirmGetObjectButton = true
    }
    if (this.active === 2 && !this.currentUserIsUploder) {
      this.confirmSendButton = true
    }
    if (this.active === 3 && this.currentUserIsUploder) {
      this.confirmReceiveButton = true
    }
    if (this.active === 4 && this.currentUserIsUploder) {
      this.commentButton = true
    }
    this.hasOrder = (this.detail.task_type === 1)
    this.ddlTime = this.detail.ddl_time
  },
  data () {
    const verifyEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项不能为空'))
      } else {
        callback()
      }
    }
    return {
      detail: [],
      taskId: '',
      getTaskButton: false,
      confirmGetObjectButton: false,
      confirmSendButton: false,
      confirmReceiveButton: false,
      commentButton: false,
      commentVisible: false,
      defult_photo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
      uploaderName: '',
      uploaderPhoto: '',
      uploaderHasPhoto: false,
      receiverHasPhoto: false,
      receiverPhoto: '',
      receiverName: '',
      taskDescription: '',
      taskPrice: '',
      taskSendRegion: '',
      taskSendAddress: '',
      taskReceiveRegion: '',
      taskReceiveAddress: '',
      currentUserIsUploder: false,
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
      ddlTime: '',
      searchContent: undefined,
      rules: {
        commentRate: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        commentText: [
          { validator: verifyEmpty, trigger: 'blur' }
        ]
      }
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
      if (this.commentText === '') {
        this.$message.error('请输入评价！')
        return
      }
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
      console.log('-------------')
      console.log(this.currentUserIsUploder)
      console.log(this.detail.send_user.user_name)
      if (this.currentUserIsUploder) {
        this.$store.commit('setToChatPage', {name: this.detail.send_user.user_name, id: this.detail.send_user.user_id, dialogueId: this.detail.dialogue_id_up_se})

        // this.$router.push({name: 'chatPage', params: {name: this.detail.send_user.user_name, id: this.detail.send_user.user_id, dialogueId: this.detail.dialogue_id_up_sd}})
      } else {
        this.$store.commit('setToChatPage', {name: this.detail.upload_user.user_name, id: this.detail.upload_user.user_id, dialogueId: this.detail.dialogue_id_up_se})

        // this.$router.push({name: 'chatPage', params: {name: this.detail.upload_user.user_name, id: this.detail.upload_user.user_id, dialogueId: this.detail.dialogue_id_up_se}})
      }
      this.$router.push('/chatPage')
    },
    chatReceiver () {
      this.$store.commit('setToChatPage', {name: this.detail.receive_user.user_name, id: this.detail.receive_user.user_id, dialogueId: this.detail.dialogue_id_re_se})
      this.$router.push('/chatPage')
      // this.$router.push({name: 'chatPage', params: {name: this.detail.receive_user.user_name, id: this.detail.receive_user.user_id, dialogueId: this.detail.dialogue_id_up_se}})
    },
    myPage () {
      this.$router.push('/person')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    homePage () {
      this.$router.push('/')
    },
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/sellinggoods')
    },
    markPage () {
      this.$router.push('/favoritegoods')
    },
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    goReleasedTask () {
      this.$router.push('/releasedtask')
    },
    goReceivedTask () {
      this.$router.push('/receivedtask')
    },
    goTaskHall () {
      this.$router.push('/taskhall')
    },
    goFavoriteUser () {
      this.$router.push('/favoriteusers')
    },
    goFavoriteGoods () {
      this.$router.push('/favoritegoods')
    },
    goSellOrder () {
      this.$router.push('/sellorder')
    },
    goBuyOrder () {
      this.$router.push('/buyorder')
    },
    goPostGoods () {
      this.$router.push('/sellinggoods')
    },
    goNewGoods () {
      this.$router.push('/addgoods')
    },
    searchTop () {
      if (this.searchContent === undefined || this.searchContent === '') {
        this.$message.error('请输入搜索内容')
        return
      }
      this.$store.commit('setToSearchPage', {
        searchContent: this.searchContent,
        labels: undefined,
        status: undefined,
        orderMethod: undefined
      })
      this.$router.push('/result')
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center repeat url("../../assets/back7.jpg");
  background-size: cover;
  display: -webkit-box;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.7;
}

.right-head {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.mid-head {
  display: flex;
  align-items: center;
}

.menu-buttons {
  display: block;
  margin: auto;
  text-align: center;
  align-items: center;
}

.inside-button {
  margin-top: 5px;
  border: 0;
  text-align: center;
  align-items: center;
  background-color: #545c64;
  color: #ffffff;
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
  font-size: 20px;
  text-align: left;
  color: #000000;
}

.task-description {
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  color: #8d99ae;
}

.other-button {
  margin-top: 20px;
  align-items: center;
  text-align: center;
}
</style>
