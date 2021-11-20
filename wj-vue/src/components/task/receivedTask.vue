<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="">
        <span>SUSTech Store</span>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="2-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="2-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="2-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="2-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" v-on:click="logOut">注销</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-container class="mid-content">
        <el-tabs type="border-card" v-model="activePane">
          <!--          pay-pane-->
          <el-tab-pane label="待领货" class="whole-pane" name="first">
            <el-container class="whole-order" v-for="(item, index) in waitGetObjectList" :key="index">
              <el-container class="order-name">{{item.taskName}}</el-container>
              <el-container class="order-road">从{{item.startRegion}}送到{{item.endRegion}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="goTaskInfo(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          send-pane-->
          <el-tab-pane label="待送达" class="whole-pane" name="second">
            <el-container class="whole-order" v-for="(item, index) in waitSendList" :key="index">
              <el-container class="order-name">{{item.taskName}}</el-container>
              <el-container class="order-road">从{{item.startRegion}}送到{{item.endRegion}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="goTaskInfo(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          receive-pane-->
          <el-tab-pane label="待收货" class="whole-pane" name="third">
            <el-container class="whole-order" v-for="(item, index) in waitConfirmList" :key="index">
              <el-container class="order-name">{{item.taskName}}</el-container>
              <el-container class="order-road">从{{item.startRegion}}送到{{item.endRegion}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="goTaskInfo(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          evaluate-pane-->
          <el-tab-pane label="待评价" class="whole-pane" name="fourth">
            <el-container class="whole-order" v-for="(item, index) in waitCommentList" :key="index">
              <el-container class="order-name">{{item.taskName}}</el-container>
              <el-container class="order-road">从{{item.startRegion}}送到{{item.endRegion}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="goTaskInfo(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          finished-pane-->
          <el-tab-pane label="已完成" class="whole-pane" name="fifth">
            <el-container class="whole-order" v-for="(item, index) in successList" :key="index">
              <el-container class="order-name">{{item.taskName}}</el-container>
              <el-container class="order-road">从{{item.startRegion}}送到{{item.endRegion}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="goTaskInfo(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <el-tabs>-->
  <!--      <el-tab-pane label="待领货的任务">-->
  <!--        <task-order-box v-for="(item, index) of waitGetObjectList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>-->
  <!--      </el-tab-pane>-->
  <!--      <el-tab-pane label="待送达的任务">-->
  <!--        <task-order-box v-for="(item, index) of waitSendList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>-->
  <!--      </el-tab-pane>-->
  <!--      <el-tab-pane label="待收货确认的任务">-->
  <!--        <task-order-box v-for="(item, index) of waitConfirmList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>-->
  <!--      </el-tab-pane>-->
  <!--      <el-tab-pane label="待评价的任务">-->
  <!--        <task-order-box v-for="(item, index) of waitCommentList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>-->
  <!--      </el-tab-pane>-->
  <!--      <el-tab-pane label="已完成的任务">-->
  <!--        <task-order-box v-for="(item, index) of successList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-order-box>-->
  <!--      </el-tab-pane>-->
  <!--    </el-tabs>-->
  <!--  </el-container>-->
</template>

<script>
export default {
  // Done
  name: 'receivedTask',
  mounted () {
    // this.$axios.post('task/task_wait_sender_list_up/').then(response => {
    //   console.log(response.data)
    // })
    // 待领货的任务
    this.$axios.post('task/task_wait_receive_object_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitGetObjectList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          description: list[i].description,
          detail: list[i]
        })
      }
    })
    // 待送达的任务
    this.$axios.post('task/task_wait_send_to_place_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitSendList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          description: list[i].description,
          detail: list[i]
        })
      }
    })
    // 待收货确认的任务
    this.$axios.post('task/task_wait_confirm_receive_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitConfirmList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          description: list[i].description,
          detail: list[i]
        })
      }
    })
    // 待评价的任务
    this.$axios.post('task/task_wait_comment_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.waitCommentList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          description: list[i].description,
          detail: list[i]
        })
      }
    })
    // 已完成的任务
    this.$axios.post('task/task_wait_confirm_success_list_sender/').then(response => {
      console.log(response.data)
      let len = response.data.return_transaction.length
      let list = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.successList.push({
          taskName: list[i].name,
          price: list[i].price,
          startRegion: this.regionList[list[i].sender_addr.user_region],
          endRegion: this.regionList[list[i].receive_addr.user_region],
          description: list[i].description,
          detail: list[i]
        })
      }
    })
  },
  data () {
    return {
      waitGetObjectList: [],
      waitSendList: [],
      waitConfirmList: [],
      waitCommentList: [],
      successList: [],
      regionList: [ '荔园',
        '创园',
        '慧园',
        '欣园',
        '学生宿舍',
        '湖畔',
        '九华精舍',
        '教师公寓',
        '专家公寓',
        '风雨操场',
        '润扬体育馆',
        '工学院',
        '南科大中心',
        '第一科研楼',
        '第二科研楼',
        '第一教学楼',
        '第二教学楼',
        '台州楼',
        '检测中心',
        '行政楼',
        '琳恩图书馆',
        '1号门',
        '2号门',
        '3号门',
        '4号门',
        '5号门',
        '6号门',
        '7号门',
        '8号门',
        '其它'],
      activePane: 'first'
    }
  },
  methods: {
    goTaskInfo (item) {
      this.$router.push({name: 'taskInfo', params: {detail: item.detail}})
    },
    myPage () {
      this.$router.push('/person')
    },
    homePage () {
      this.$router.push('/')
    },
    searchPage () {
      this.$router.push('/search')
    },
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/store')
    },
    markPage () {
      this.$router.push('/favoritegoods')
    },
    logOut () {
      this.$axios.post('login0/logout/ ')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center no-repeat url("../../assets/back7.jpg");
  background-size: cover;
  display: block;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.5;
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
  height: 100%;
  width: 1200px;
}

.whole-pane {
  display: block;
}

.whole-order {
  display: flex;
  justify-content: space-evenly;
  margin-top: 5px;
  border-bottom: 2px solid #eaeaea;
}

.order-name {
  width: 150px;
  overflow: hidden;
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
}

.order-road {
  width: 150px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-detail {
  width: 150px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-price {
  width: 150px;
  font-size: 20px;
  color: #ff006e;
  align-items: center;
  justify-content: space-evenly;
}

.order-pay {
  width: 150px;
  align-items: center;
  justify-content: space-evenly;
}

.last-button {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
  margin-bottom: 5px;
  justify-content: space-evenly;
}
</style>
