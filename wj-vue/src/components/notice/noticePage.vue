<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="" style="cursor:pointer;">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="mid-head" style="width: 50%;">
        <el-input
          placeholder="请输入搜索信息"
          prefix-icon="el-icon-search"
          v-model="searchContent" style="width: 870px"
          @keyup.enter.native="searchTop">
        </el-input>
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
    <el-container style="display: flex;height: 100%;">
      <el-aside width="200px" style="background-color: #545c64;opacity: 0.5;">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu class="menu-buttons" index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户信息</span>
            </template>
            <el-button class="inside-button" v-on:click="myPage">个人主页</el-button><br>
            <el-button class="inside-button" v-on:click="cartPage">购物车</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品</span>
            </template>
            <el-button class="inside-button" v-on:click="goSellOrder">卖出的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goBuyOrder">买到的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goPostGoods">发布的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goNewGoods">上架新商品</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="3">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>收藏</span>
            </template>
            <el-button class="inside-button" v-on:click="goFavoriteGoods">收藏的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goFavoriteUser">收藏的卖家</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="4">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>跑腿</span>
            </template>
            <el-button class="inside-button" v-on:click="goTaskHall">任务大厅</el-button><br>
            <el-button class="inside-button" v-on:click="goReleasedTask">发布的跑腿任务</el-button><br>
            <el-button class="inside-button" v-on:click="goReceivedTask">接受的跑腿任务</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="5">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>通知</span>
            </template>
            <el-button class="inside-button" v-on:click="goNoticePage">通知详情</el-button><br>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%;padding: 0;">
        <el-container class="mid-content">
          <el-tabs type="border-card" v-model="activePane">
            <!--          pay-pane-->
            <el-tab-pane label="消息列表" class="whole-pane" name="first">
              <el-container class="whole-notice" v-for="(item, index) in chatList" :key="index">
                <el-container class="message-container">
                  <div class="notice-column-user" >用户：{{item.otherName}}</div>
                  <div class="notice-column-message">最后一条讯息：{{item.lastInfo}}</div>
                </el-container>
                <el-container class="notice-pay">
                  <el-badge :value="item.waitNumber" class="item" :hidden="item.waitNumber === 0">
                    <el-button class="last-button" type="primary" v-on:click="toChatPage(item)">查看详情</el-button>
                  </el-badge>
                </el-container>
              </el-container>
            </el-tab-pane>
            <el-tab-pane label="通知列表" class="whole-pane" name="second">
              <el-container class="whole-notice" v-for="(item, index) in noticeList" :key="index">
                <el-badge is-dot :hidden="item.type === 1">
                  <el-container class="message-container">
                    <div class="notice-column-user">{{item.date}}</div>
                    <div class="notice-column-message" style="margin-left: 20px;align-items: center;">{{item.information}}</div>
                  </el-container>
                </el-badge>
              </el-container>
            </el-tab-pane>
          </el-tabs>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
  <!--  <el-container>-->
  <!--    <notice-box v-for="(item, index) of noticeList " :key="index+Math.random()" :user1Id="item.user1Id"-->
  <!--                :user2-id="item.user2Id" :user1Name="item.user1Name" :user2Name="item.user2Name"-->
  <!--                :lastInfo="item.lastInfo" :waitNumber="item.waitNumber" :dialogueId="item.dialogueId"></notice-box>-->
  <!--  </el-container>-->
</template>

<script>
export default {
  // Done
  name: 'noticePage',
  data () {
    return {
      chatList: [],
      noticeList: [],
      start_position: 0,
      end_position: 10,
      activePane: 'first',
      searchContent: undefined
    }
  },
  mounted () {
    // this.noticeList.push({
    //   user1Id: '1',
    //   user2Id: '2',
    //   user1Name: 'a',
    //   user2Name: 'b',
    //   lastInfo: 'hhh',
    //   waitNumber: 3
    // })
    this.$axios.post('login0/get_notification_list/').then(response => {
      let unReadLen = response.data.notification_list.length
      let len = response.data.notice_list.length
      let list = response.data.notice_list
      for (let i = 0; i < unReadLen; ++i) {
        this.noticeList.push({
          type: 2,
          date: list[i].date,
          information: list[i].information
        })
      }
      for (let i = unReadLen; i < len; ++i) {
        this.noticeList.push({
          type: 1,
          date: list[i].date,
          information: list[i].information
        })
      }
      console.log(this.noticeList)
    })
    this.$axios.post('dialogue/dialogue_list/').then(response => {
      console.log('-------------')
      console.log(response.data)
      let len = response.data.return_list.length
      let list = response.data.return_list
      for (let i = 0; i < len; ++i) {
        let lastInfo = ''
        if (list[i].last_info === null) {
          lastInfo = ''
        } else if (list[i].last_info.data_type === 1) {
          lastInfo = list[i].last_info.information
        } else {
          lastInfo = '[图片]'
        }
        let otherId = ''
        let otherName = ''
        if (list[i].user1_name !== this.$store.state.userName) {
          otherName = list[i].user1_name
          otherId = list[i].user1_id
        } else {
          otherName = list[i].user2_name
          otherId = list[i].user2_id
        }
        this.chatList.push({
          otherName: otherName,
          otherId: otherId,
          lastInfo: lastInfo,
          waitNumber: list[i].wait_number,
          hasNext: list[i].has_next,
          dialogueId: list[i].dialogue_id
        })
      }
    })
  },
  methods: {
    toChatPage (item) {
      // console.log('toChatPage!')
      // let otherName = ''
      // let otherId = ''
      // if (this.user1Name === this.$store.state.userName) {
      //   otherName = item.user2Name
      //   otherId = item.user2Id
      // } else {
      //   otherName = item.user1Name
      //   otherId = item.user1Id
      // }
      this.$store.commit('setToChatPage', {name: item.otherName, id: item.otherId, dialogueId: item.dialogueId})
      this.$router.push('/chatPage')
      // this.$router.push({name: 'chatPage', params: {name: otherName, id: otherId, dialogueId: item.dialogueId}})
    },
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    myPage () {
      this.$router.push('/person')
    },
    homePage () {
      this.$router.push('/')
    },
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/sellinggoods')
    },
    markPage () {
      this.$router.push('/favoritegoods')
    },
    goReleasedTask () {
      this.$router.push('/releasedtask')
    },
    goReceivedTask () {
      this.$router.push('/receivedtask')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    goTaskHall () {
      this.$router.push('/taskhall')
    },
    goFavoriteUser () {
      this.$router.push('/favoriteusers')
    },
    goFavoriteGoods () {
      this.$router.push('/favoritegoods')
    },
    goSellOrder () {
      this.$router.push('/sellorder')
    },
    goBuyOrder () {
      this.$router.push('/buyorder')
    },
    goPostGoods () {
      this.$router.push('/sellinggoods')
    },
    goNewGoods () {
      this.$router.push('/addgoods')
    },
    searchTop () {
      this.$store.commit('setToSearchPage', {
        searchContent: this.searchContent,
        labels: undefined,
        status: undefined,
        orderMethod: undefined
      })
      this.$router.push('/result')
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center repeat url("../../assets/back7.jpg");
  background-size: cover;
  display: -webkit-box;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.7;
}

.mid-head {
  display: flex;
  align-items: center;
}

.menu-buttons {
  display: block;
  margin: auto;
  text-align: center;
  align-items: center;
}

.inside-button {
  margin-top: 5px;
  border: 0;
  text-align: center;
  align-items: center;
  background-color: #545c64;
  color: #ffffff;
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
.whole-notice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
}
.message-container {
  display: flex;
  text-align: center;
}
.notice-column-user {
  width: 200px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}
.notice-column-message {
  width: 700px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  text-align: left;
}
.notice-pay {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 150px;
  align-items: center;
  justify-content: space-evenly;
}
.last-button {
  justify-content: space-evenly;
}
</style>
