<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head" v-on:click="homePage" title="前往主页" style="cursor:pointer;">
        <img src="../../assets/testlogo.png" class="logo" alt="">
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
          <el-submenu index="1">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="1-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="1-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="1-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="1-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" v-on:click="logOut">注销</el-menu-item>
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
          <el-container class="wrapper">
            <h3>{{otherName}}</h3>
            <div class="message-panel">
              <msg-box v-for="(item, index) of msgList" :key="index+Math.random()" :uname="item.name" :is-photo="item.isPhoto" :url="item.url" :content="item.msg" :isSelf="item.isSelf"></msg-box>
            </div>
            <el-button style="margin-top: 20px;margin-bottom: 20px;align-items: center;" @click="uploadPhotoVisible=true">上传图片</el-button>
            <div class="input-area">
              <textarea class="input" v-model="msg" @keyup.enter="sendMsg"></textarea>
              <el-button class="send-btn" @click="sendMsg">发送</el-button>
            </div>
          </el-container>
        </el-container>
        <el-dialog style="margin: auto;" :visible.sync="uploadPhotoVisible" :modal-append-to-body="false">
          <el-form ref="form">
            <el-form-item>
              <span>上传图片</span>
              <el-upload
                action="auto"
                :http-request="uploadSectionFile"
                list-type="picture-card"
                :file-list="fileList"
                class = "contentImgStyle"
                :limit="1"
                :on-exceed="handleExceed">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="uploadPhotoVisible=false">取消</el-button>
            <el-button type="primary" @click="uploadPhoto">确认</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
  <!--  <div class="outer-wrapper">-->
  <!--    <el-menu-->
  <!--      class="el-menu-demo"-->
  <!--      mode="horizontal"-->
  <!--      @select="handleSelect"-->
  <!--      background-color="#545c64"-->
  <!--      text-color="#fff"-->
  <!--      active-text-color="#ffd04b">-->
  <!--      <el-submenu index="2">-->
  <!--        <template slot="title">{{userName}}</template>-->
  <!--        <el-menu-item index="2-1">设置</el-menu-item>-->
  <!--        <el-menu-item index="2-2">退出登陆</el-menu-item>-->
  <!--      </el-submenu>-->
  <!--    </el-menu>-->
  <!--    <div class="wrapper">-->
  <!--      <h3>群聊</h3>-->

  <!--      <div class="message-panel">-->
  <!--        <msg-box v-for="(item, index) of msgList" :key="index+Math.random()" :uname="item.name" :is-photo="item.isPhoto" :url="item.url" :content="item.msg" :isself="item.isSelf"></msg-box>-->

  <!--      </div>-->
  <!--      <el-button @click="uploadPhotoVisible=true">上传图片</el-button>-->
  <!--      <div class="input-area">-->
  <!--        <textarea class="input" v-model="msg" @keyup.enter="sendMsg"></textarea>-->
  <!--        <el-button class="send-btn" @click="sendMsg">发送</el-button>-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import msgBox from './msgBox.vue'
// import headMenu from '../../components/head-menu.vue'
export default {
  name: 'chatPage',
  data () {
    return {
      content: 'hahhahaha',
      userName: '',
      userId: '',
      msg: '',
      msgList: [],
      webSocket: null,
      dialogue_id: '',
      token: '',
      searchContent: undefined,
      otherName: '',
      dialogueId: '',
      uploadPhotoVisible: false,
      uploadFile: [],
      fileList: []
    }
  },
  components: {
    msgBox
  },
  mounted () {
    this.userName = this.$store.state.userName
    this.userId = this.$store.state.userId
    // this.otherName = this.$route.params.name
    // this.otherId = this.$route.params.id
    // this.dialogueId = this.$route.params.dialogueId
    this.otherName = this.$store.state.toChatPage.name
    this.otherId = this.$store.state.toChatPage.id
    this.dialogueId = this.$store.state.toChatPage.dialogueId
    this.$store.commit('setIsChatting', true)
    console.log(this.dialogueId)
    // dialogue_info: []
    // dialogue_type: 1
    // dialogue_user1_id: "NQ:1mmHdk:iV15dZymCFArgXs-HtuYtvwTr2D9QZKFGWeccZ7NAnA"
    // dialogue_user1_name: "oy"
    // dialogue_user2_id: "NQ:1mmHdk:iV15dZymCFArgXs-HtuYtvwTr2D9QZKFGWeccZ7NAnA"
    // dialogue_user2_name: "oy"
    // has_next: false
    // wait_number: 0
    this.$axios.post('/dialogue/dialogue_detail/', this.$qs.stringify({
      dialogue_id: this.dialogueId
    })).then(response => {
      let list = response.data.dialogue_info
      let len = list.length
      for (let i = len - 1; i >= 0; --i) {
        if (list[i].data_type === 1) {
          this.msgList.push({
            name: list[i].my_name === this.userName ? '我' : list[i].my_name,
            msg: list[i].information,
            isSelf: list[i].my_name === this.userName,
            url: '',
            isPhoto: false
          })
        } else {
          this.msgList.push({
            name: list[i].my_name === this.userName ? '我' : list[i].my_name,
            msg: '',
            isSelf: list[i].my_name === this.userName,
            url: list[i].information,
            isPhoto: true
          })
        }
      }
      console.log(response.data)
    })
    this.$global.webSocket.onmessage = this.onMessageWebSocket
  },
  destroyed () {
    // 离开路由之后断开 webSocket 连接
    // this.webSocket.close()
    this.$global.webSocket.onmessage = this.$global.onMessageWebSocket
    this.$store.commit('setIsChatting', false)
  },
  methods: {
    handleSelect (key, keyPath) {},
    sendMsg () {
      if (this.msg === '') {
        this.$message.error('请输入内容！')
        return
      }
      const data = {
        dialogue_id: this.dialogueId,
        data_type: 1,
        info: this.msg
      }
      this.msgList.push({
        isPhoto: false,
        url: '',
        name: '我',
        msg: data.info,
        isSelf: true
      })
      this.$global.webSocket.send(JSON.stringify(data))
      this.msg = ''
    },
    onMessageWebSocket (e) {
      let data = JSON.parse(e.data)
      console.log('-------')
      console.log(data)
      if (data.info.status === 2) {
        return
      }
      if (data.info.my_name !== this.otherName) {
        console.log('11111111111111')
        this.$message.info('您有来自' + data.info.my_name + '的消息！')
        // this.$message.info('您收到其他人的消息！')
        return
      }
      if (this.otherName === this.$store.state.userName) {
        return
      }
      if (data.info.data_type === 2) {
        this.msgList.push({
          name: data.info.my_name,
          msg: '',
          isSelf: false,
          url: data.info.info,
          isPhoto: true
        })
      } else {
        this.msgList.push({
          name: data.info.my_name,
          msg: data.info.info,
          isSelf: false,
          url: '',
          isPhoto: false
        })
      }
    },
    handleExceed () {
      this.$message.warning('最多只能上传1张相片！')
    },
    uploadSectionFile (param) {
      const uploadFileLength = this.uploadFile.length
      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadFile[uploadFileLength] = {'imgFile': file}
    },
    uploadPhoto () {
      if (this.uploadFile.length === 0) {
        this.$message.error('未上传图片！')
        return
      }
      let param = new FormData() // FormData 对象
      let list = this.uploadFile[0]
      let file = list.imgFile
      param.append('image1', file) // 文件对象
      param.append('dialogue_id', this.dialogueId)
      this.$axios({
        method: 'post',
        url: '/dialogue/receive_img/',
        data: param
      }).then(response => {
        // this.$message.info(response.data.message)
        let imgUrl = response.data.dia_img_url
        const data = {
          dialogue_id: this.dialogueId,
          data_type: 2,
          info: imgUrl
        }
        this.$global.webSocket.send(JSON.stringify(data))
        console.log(imgUrl)
        this.msgList.push({
          isPhoto: true,
          url: imgUrl,
          name: '我',
          msg: '',
          isSelf: true
        })
        this.uploadPhotoVisible = false
      })
      this.uploadFile = []
    },
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    myPage () {
      this.$router.push('/person')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    homePage () {
      this.$router.push('/home')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  height: 715px;
  width: 90%;
}

div {
  display: block;
}

.wrapper {
  width: 650px;
  background-color: #fff;
  opacity: 0.85;
  height: 100%;
  border-radius: 4px;
  border: 1px #ebebeb solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: auto;
  display: block;
  top: 80px;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.message-panel {
  width: 85%;
  height: 350px;
  align-items: center;
  margin: auto;
  border-top: 1px #caf0f8 solid;
  border-bottom: 1px #caf0f8 solid;
  overflow: scroll;
  overflow-x: hidden;
  padding: 10px;
}

.input-area {
  width: 85%;
  border-radius: 4px;
  height: 120px;
  margin: auto;
}

.send-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: right;
  align-items: center;
}

.input {
  width: 100%;
  height: 100%;
  border:  1px #ebebeb solid;
  border-radius: 4px;
  outline: none
}
</style>
