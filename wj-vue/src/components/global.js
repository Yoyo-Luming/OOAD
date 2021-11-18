export default {
  userName: '',
  userId: '',
  userState: '',
  webSocket: null,
  url: '',
  token: '',
  setUser (user) {
    this.userName = user
  },
  setUserState (state) {
    this.userState = state
  },
  setUserId (userId) {
    this.userId = userId
  },
  initWebSocket () {
    let axios = require('axios')
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'http://10.17.63.176/api'
    axios.post('api/dialogue/begin_websocket/').then(response => {
      this.token = response.data.token
      this.url = 'ws://10.17.102.0:8080/api/ws/chat/' + this.token + '/'
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
    console.log(data.info.info.message)
    this.$message.info(data.info.info.message)
  }
}

if (performance.navigation.type === 1) {
  let axios = require('axios')
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://10.17.63.176/api'
  axios.post('api/dialogue/begin_websocket/').then(response => {
    this.token = response.data.token
    this.url = 'ws://10.17.102.0:8080/api/ws/chat/' + this.token + '/'
    console.log(this.url)
    // if (window.WebSocket) {
    this.webSocket = new WebSocket(this.url)
    this.webSocket.onmessage = this.onMessageWebSocket
    // }
  })
  console.log('after reload')
}
