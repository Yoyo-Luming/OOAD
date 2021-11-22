export default {
  userName: '',
  userId: '',
  userStatus: '',
  webSocket: null,
  url: '',
  token: '',
  initWebSocket () {
    let axios = require('axios')
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'http://10.17.63.176/api'
    axios.post('api/dialogue/begin_websocket/').then(response => {
      this.token = response.data.token
      this.url = 'ws://store2.sustech.xyz:8080/api/ws/chat/' + this.token + '/'
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
      alert(data.info.info)
    } else {
      // if (this.isChatting === false) {
      alert('您有来自' + data.info.my_name + '的消息！')
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
