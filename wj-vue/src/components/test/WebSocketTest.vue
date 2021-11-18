<template>
  <div>
    <el-button size="small" @click="beginTest">test!</el-button>
  </div>

</template>

<script>
export default {
  name: 'WebSocketTest',
  methods: {
    beginTest () {
      console.log('test begin!')
      // const ws = new WebSocket('wss://10.17.102:8080/api/websocket/link/')
      const ws = new WebSocket('ws://10.17.102.0:8080/ws/')
      console.log(ws)
      console.log('1:' + ws.readyState)
      if (ws.readyState === 1) {
        ws.send('Hello WebSockets!')
      }
      ws.onopen = function (evt) {
        console.log('connect success!')
        ws.send('Hello WebSockets!')
      }
      console.log('2:' + ws.readyState)
      ws.onmessage = function (evt) {
        console.log('get message； ' + evt.data)
      }
      console.log('3:' + ws.readyState)
      ws.onclose = function (evt) {
        console.log('close!')
      }
      console.log('4:' + ws.readyState)
    }
  }
}

</script>

<style scoped>

</style>
