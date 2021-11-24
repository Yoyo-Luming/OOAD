import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import global from './components/global.js'
import store from './components/store/store'
import App from './App'
import router from './router'
// import Router from 'vue-router'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
// axios.defaults.baseURL = 'http://10.17.102.0:8080/api'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://10.17.63.176/api'
// axios.defaults.baseURL = 'http://10.21.127.84/api'
// axios.defaults.baseURL = 'http://store2.sustech.xyz/api'
// axios.defaults.baseURL = 'http://192.168.208.212/api'
// axios.defaults.baseURL = '/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$global = global
Vue.prototype.$store = store
// Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && store.state.userName === '') {
    alert('请先登录！')
    return next('/login')
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
