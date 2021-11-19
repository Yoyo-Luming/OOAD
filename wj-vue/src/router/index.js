import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import Login from '../components/Login'
import register from '../components/register'
import AddGoods from '../components/AddGoods'
import Person from '../components/Person'
import Search from '../components/Search'
import Result from '../components/Result'
import ChatPage from '../components/chat/index'
import userInfo from '../components/user/userInfo'
import goodsInfo from '../components/goods/goodsInfo'
import buyPage from '../components/buyPage'
import buyOrder from '../components/order/buyOrder'
import sellOrder from '../components/order/sellOrder'
import orderInfo from '../components/order/orderInfo'
import noticePage from '../components/notice/noticePage'
import taskHall from '../components/task/taskHall'
import publishTask from '../components/task/publishTask'
import taskInfo from '../components/task/taskInfo'
import releasedTask from '../components/task/releasedTask'
import receivedTask from '../components/task/receivedTask'
import favoriteGoods from '../components/favorite/favoriteGoods'
import favoriteUsers from '../components/favorite/favoriteUsers'
import sellingGoods from '../components/goods/sellingGoods'
import handleProblem from '../components/problem/handleProblem'
import home from '../components/home/home'

Vue.use(Router)
// Vue.use(Router)
// const router = new Router({
//   routes
// })

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/addgoods',
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/chatpage',
      name: 'chatPage',
      component: ChatPage
    },
    {
      path: '/user/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/goods/goodsInfo',
      name: 'goodsInfo',
      component: goodsInfo
    },
    {
      path: '/buypage',
      name: 'buyPage',
      component: buyPage
    },
    {
      path: '/buyorder',
      name: 'buyOrder',
      component: buyOrder
    },
    {
      path: '/sellorder',
      name: 'sellOrder',
      component: sellOrder
    },
    {
      path: '/orderinfo',
      name: 'orderInfo',
      component: orderInfo
    },
    {
      path: '/notice',
      name: 'notice',
      component: noticePage
    },
    {
      path: '/taskhall',
      name: 'taskHall',
      component: taskHall
    },
    {
      path: '/publishtask',
      name: 'publishTask',
      component: publishTask
    },
    {
      path: '/taskinfo',
      name: 'taskInfo',
      component: taskInfo
    },
    {
      path: '/receivedtask',
      name: 'receivedTask',
      component: receivedTask
    },
    {
      path: '/releasedtask',
      name: 'releasedTask',
      component: releasedTask
    },
    {
      path: '/favoritegoods',
      name: 'favoriteGoods',
      component: favoriteGoods
    },
    {
      path: '/favoriteusers',
      name: 'favoriteUsers',
      component: favoriteUsers
    },
    {
      path: '/sellinggoods',
      name: 'sellingGoods',
      component: sellingGoods
    },
    {
      path: '/handleproblem',
      name: 'handleProblem',
      component: handleProblem
    }
  ]
})
