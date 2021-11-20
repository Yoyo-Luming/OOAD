<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">Home Page</el-menu-item>
          <el-menu-item index="2" v-on:click="searchPage">Search Page</el-menu-item>
          <el-submenu index="3">
            <template slot="title">用户名</template>
            <el-menu-item index="3-1" v-on:click="myPage">Personal Page</el-menu-item>
            <el-menu-item index="3-2" v-on:click="cartPage">Shopping Cart</el-menu-item>
            <el-menu-item index="3-3" v-on:click="sellPage">Selling Page</el-menu-item>
            <el-menu-item index="3-4" v-on:click="markPage">Marking Page</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" v-on:click="logOut">Log Out</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-container class="mid-content">
        <el-tabs type="border-card" v-model="activePane">
          <!--          pay-pane-->
          <el-button style="display: block;margin-bottom: 20px;" type="primary" v-on:click="goPublishTask">发布</el-button>
          <el-tab-pane label="发布任务" class="whole-pane" name="first">
            <el-container class="whole-order" v-for="(item, index) in taskList" :key="index">
              <el-container style="display: flex;">
                <el-container class="order-name">{{item.taskName}}</el-container>
                <el-container class="order-detail">DDL: {{item.ddlTime}}</el-container>
                <el-container class="order-detail">从{{item.startRegion}}到{{item.endRegion}}</el-container>
                <el-container class="order-price">¥{{item.price}}</el-container>
                <el-container class="order-pay">
                  <el-button class="last-button" v-on:click="goTaskInfo">查看详情</el-button>
                </el-container>
              </el-container>
              <el-container style="display: flex;">
                <el-container style="margin-top: 5px;" class="order-detail">{{item.detail}}</el-container>
              </el-container>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <el-button @click="goPublishTask">发布任务</el-button>-->
  <!--    <task-box v-for="(item, index) of taskList" :key="index+Math.random()" :taskName="item.taskName" :price="item.price" :taskId="item.taskId" :ddlTime="item.ddlTime" :startRegion="item.startRegion" :endRegion="item.endRegion" :detail="item.detail"></task-box>-->
  <!--  </el-container>-->
</template>

<script>
import taskBox from './taskBox'
export default {
  // TODO need check
  name: 'taskHall',
  components: {taskBox},
  data () {
    return {
      taskId: '',
      taskList: [],
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
        '其它']
    }
  },
  mounted () {
    // 获取所有任务，待发布任务， 我发布的任务，我接收的任务
    // 任务状态， 已发布、已接收、已送达、已完成
    // taskName: String,
    //   ddlTime: String,
    //   startPosition: String,
    //   endPosition: String,
    //   taskId: String,
    //   detail: Array
    this.$axios.post('task/get_task_list/').then(response => {
      console.log(response.data)
      let len = response.data.return_list.length
      let returnList = response.data.return_list
      for (let i = 0; i < len; ++i) {
        this.taskList.push({
          taskName: returnList[i].name,
          price: returnList[i].price,
          ddlTime: returnList[i].ddl_time,
          startRegion: this.regionList[returnList[i].sender_addr.user_region],
          endRegion: this.regionList[returnList[i].receive_addr.user_region],
          taskId: returnList[i].task_id,
          detail: returnList[i]
        })
      }
    })
  },
  methods: {
    goPublishTask () {
      this.$router.push('publishTask')
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
  display: block;
  justify-content: space-evenly;
  border: 2px solid #eaeaea;
}

.order-name {
  width: 150px;
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
}

.order-detail {
  width: 150px;
  word-wrap: anywhere;
  word-break: normal;
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
  justify-content: space-evenly;
}
</style>
