import { Message } from 'element-ui'
import router from '../router'

let lockReconnect = false // 避免ws重复连接
let isReconnect = true // 是否重连
let ws = null // 判断当前浏览器是否支持WebSocket
let wsUrl = '路径'

function createWebSocket (wsUrl) {
  try {
    if ('WebSocket' in window) {
      ws = new WebSocket(wsUrl)
    } else {
      Message('您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！')
    }
    initEventHandle()
  } catch (e) {
    if (isReconnect) {
      reconnect(wsUrl)
    }
    console.log(e)
  }
}

function initEventHandle () {
  ws.onclose = function () {
    console.log('连接关闭!' + new Date().toLocaleTimeString())
    if (isReconnect) {
      reconnect(wsUrl)
    }
  }
  ws.onerror = function () {
    Message('网络连接错误，请重新登录！')
    websocketColse()// 主动关闭连接
    router.push('/login')
    console.log('连接错误!' + new Date().toLocaleTimeString())
    if (isReconnect) {
      reconnect(wsUrl)
    }
  }
  ws.onopen = function () {
    heartCheck.reset().start() // 心跳检测重置
    if (localStorage.getItem('userInfor')) {
      sendSock('SHIOT|REG|' + JSON.parse(localStorage.getItem('userInfor')).UserId)
    }
    console.log('连接成功!' + new Date().toLocaleTimeString())
  }
  ws.onmessage = function (event) { // 如果获取到消息，心跳检测重置
    heartCheck.reset().start() // 拿到任何消息都说明当前连接是正常的
    console.log('收到消息啦:' + event.data)
    let arr = event.data.split('|')
    if (arr[1] === 'NEWS01') {
      let dataArr = event.data.split('|')
      Message.success('新消息：  ' + dataArr[4])
    }
    let eventData = event.data
    handMsg(eventData)
  }
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  ws.close()
}

// 刷新页面后需要重连
if (window.performance.navigation.type === 1 && localStorage.getItem('userInfor')) {
  if (isReconnect) {
    reconnect(wsUrl)
  }
}

// 重连
function reconnect (wsUrl) {
  if (lockReconnect) return
  lockReconnect = true
  setTimeout(function () { // 没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(wsUrl)
    lockReconnect = false
  }, 2000)
}

// 心跳检测
var heartCheck = {
  // timeout: 540000,        //9分钟发一次心跳
  timeout: 3600, // 1分钟发一次心跳
  // timeout: 10800, //3分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function () {
    let self = this
    this.timeoutObj = setTimeout(function () {
      self.serverTimeoutObj = setTimeout(function () {
        // 如果超过一定时间还没重置，说明后端主动断开了
        // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        // ws.close();
      }, self.timeout)
    }, this.timeout)
  }
}

// 实际调用的方法
function sendSock (agentData, callback) {
  // global_callback = callback;
  if (ws.readyState === ws.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (ws.readyState === ws.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据发送
function websocketsend (agentData) {
  ws.send(agentData)
}

// 主动关闭连接
function websocketColse () {
  console.log('主动关闭连接!')
  isReconnect = false
  ws.close()
  ws = null
  lockReconnect = false
  localStorage.clear()
}

// 处理消息
function handMsg (evtdata) {}

export default {
  sendSock,
  websocketColse,
  createWebSocket
}
