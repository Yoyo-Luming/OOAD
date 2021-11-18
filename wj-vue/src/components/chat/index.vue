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
        <msg-box v-for="(item, index) of msgList" :key="index+Math.random()" :uname="item.name" :is-photo="item.isPhoto" :url="item.url" :content="item.msg" :isself="item.isSelf"></msg-box>

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
  //   props: {
  //     msg: String
  //   }
  data () {
    return {
      content: 'hahhahaha',
      userName: '',
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
    this.userName = this.$global.user
    this.otherName = this.$route.params.name
    this.otherId = this.$route.params.id
    this.dialogueId = this.$route.params.dialogueId

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
      dialogue_id: this.dialogueId,
      start_position: 0,
      end_position: 10
    })).then(response => {
      console.log(response.data)
    })
    this.$global.webSocket.onmessage = this.onMessageWebSocket
  },
  destroyed () {
    // 离开路由之后断开 webSocket 连接
    // this.webSocket.close()
    this.$global.webSocket.onmessage = this.$global.onMessageWebSocket
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
        name: data.name === this.userName ? '我' : data.name,
        msg: data.info,
        isSelf: data.name === this.userName
      })
      this.$global.webSocket.send(JSON.stringify(data))
      this.msg = ''
    },
    initWebSocket () {
    },
    onMessageWebSocket (e) {
      // TODO
      let data = JSON.parse(e.data)
      console.log(data)
      if (data.info.data_type === 2) {
        this.msgList.push({
          name: data.info.name === this.userName ? '我' : data.info.name,
          msg: '',
          isSelf: data.info.name === this.userName,
          url: data.info.info,
          isPhoto: true
        })
      } else {
        this.msgList.push({
          name: data.info.name === this.userName ? '我' : data.info.name,
          msg: data.info.info,
          isSelf: data.info.name === this.userName,
          url: '',
          isPhoto: false
        })
      }
    },
    handleExceed (files, fileList) {
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
          msg: '123',
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
.fix-top {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
}

</style>
