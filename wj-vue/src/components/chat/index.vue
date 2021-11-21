<template>
  <div class="outer-wrapper">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="2">
        <template slot="title">{{userName}}</template>
        <el-menu-item index="2-1">设置</el-menu-item>
        <el-menu-item index="2-2">退出登陆</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="wrapper">
      <h3>群聊</h3>
      <div class="message-panel">
        <msg-box v-for="(item, index) of msgList" :key="index+Math.random()" :uname="item.name" :is-photo="item.isPhoto" :url="item.url" :content="item.msg" :isSelf="item.isSelf"></msg-box>

      </div>
      <el-button @click="uploadPhotoVisible=true">上传图片</el-button>
      <div class="input-area">
        <textarea class="input" v-model="msg" @keyup.enter="sendMsg"></textarea>
        <!-- <button class="send" @click="sendMsg">发送</button> -->

        <el-button class="send-btn" @click="sendMsg">发送</el-button>

      </div>
    </div>
    <el-dialog :visible.sync="uploadPhotoVisible">
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
      <el-button @click="uploadPhotoVisible=false">取消</el-button>
      <el-button @click="uploadPhoto">发送图片</el-button>
    </el-dialog>
  </div>
</template>

<script>
import msgBox from './msgBox.vue'
// import headMenu from '../../components/head-menu.vue'
export default {
  name: 'chat',
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
      url: 'ws://192.168.68.223:9000/api/ws/chat/',
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
    this.otherName = this.$route.params.name
    this.otherId = this.$route.params.id
    this.dialogueId = this.$route.params.dialogueId
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
      console.log('list')
      console.log(list)
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
    sendMsg: function () {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-wrapper {
  width :100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.wrapper {
  position: relative;
  width: 650px;
  background-color: #fff;
  opacity: 0.85;
  height: 610px;
  border-radius: 4px;
  border: 1px #ebebeb solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  display: flex;
  top: 80px;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
.message-panel {
  width: 85%;
  height: 350px;
  border-top: 1px #ebebeb solid;
  border-bottom: 1px #ebebeb solid;
  overflow: scroll;
  overflow-x: hidden;
  padding: 10px;
}
.input-area {
  width: 85%;
  border-radius: 4px;
  height: 120px;
  margin-top: 20px;
  border:0 solid black;
}
.send-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.input {
  width: 100%;
  height: 100%;
  border:  0px #ebebeb solid;
  border-radius: 4px;
  outline: none;
  padding: 5px;
}

</style>
