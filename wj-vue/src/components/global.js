import {
  Message
} from 'element-ui'
import store from './store/store'

export default {
  userName: '',
  userId: '',
  userStatus: '',
  webSocket: null,
  url: '',
  token: '',
  initWebSocket () {
    // this.WebSocket.close()
    // if (this.webSocket !== '') {
    //   this.webSocket.close()
    // }
    let axios = require('axios')
    axios.defaults.withCredentials = true
    // axios.defaults.baseURL = 'http://10.17.63.176/api/'
    // axios.defaults.baseURL = 'http://192.168.208.212/api'
    // axios.defaults.baseURL = 'http://16.21.127.84/api'
    axios.defaults.baseURL = 'http://store.sustech.xyz/api'
    // axios.defaults.baseURL = 'http://10.16.18.244/api'
    // axios.defaults.baseURL = 'http://10.21.115.126/api'
    axios.post('dialogue/begin_websocket/').then(response => {
      this.token = response.data.token
      this.url = 'ws://store.sustech.xyz:8080/api/ws/chat/' + this.token + '/'
      // this.url = 'ws://10.16.18.244:8080/api/ws/chat/' + this.token + '/'
      console.log(this.url)
      // if (window.WebSocket) {
      this.webSocket = new WebSocket(this.url)
      this.webSocket.onmessage = this.onMessageWebSocket
      // }
    })
    // console.log(33333)
    // this.$axios.post('api/dialogue/begin_websocket/', this.$qs.stringify({
    //
    // })).then(response => {
    //   this.token = response.data.token
    //   this.url = this.url + this.token + '/'
    // })
  },
  onMessageWebSocket (e) {
    // let data = JSON.parse(e.data)
    // console.log('11')
    let data = JSON.parse(e.data)
    // console.log(data)
    // console.log(data.status)
    // console.log(data.message)
    // this.$message.info(data)
    console.log(1)
    console.log(data)
    if (data.info.from_id === -1) {
      Message.info(data.info.info)
      // alert(data.info.info)
    } else {
      if (store.state.isChatting === false) {
        Message.info('您有来自' + data.info.my_name + '的消息！')
      }
      // this.$message.info('您有来自' + data.info.my_name + '的消息！')
      // alert('您有来自' + data.info.my_name + '的消息！')
      // }
    }
    // console.log(data.info.info.message)
    // this.$message.info(data.info.info.message)
  }
}

// if (performance.navigation.type === 1) {
//   let axios = require('axios')
//   axios.defaults.withCredentials = true
//   axios.defaults.baseURL = 'http://10.17.63.176/api'
//   axios.post('dialogue/begin_websocket/').then(response => {
//     this.token = response.data.token
//     this.url = 'ws://store2.sustech.xyz:8080/api/ws/chat/' + this.token + '/'
//     console.log(this.url)
//     this.webSocket = new WebSocket(this.url)
//     this.webSocket.onmessage = this.onMessageWebSocket
//   })
//   console.log('after reload')
// }
