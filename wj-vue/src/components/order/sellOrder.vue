<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head" v-on:click="homePage" title="前往主页" style="cursor:pointer;">
        <img src="../../assets/testlogo.png" class="logo" alt="">
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
          <el-submenu index="1">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="1-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="1-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="1-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="1-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" v-on:click="logOut">注销</el-menu-item>
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
            <el-tab-pane label="待付款" class="whole-pane" name="first">
              <div v-if="payList.length">
                <el-container class="whole-order" v-for="(item, index) in payList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">{{item.description}}</el-container>
                  <el-container class="order-price">¥{{item.price}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有哦</h2>
              </div>
            </el-tab-pane>
            <!--          send-pane-->
            <el-tab-pane label="待发货" class="whole-pane" name="second">
              <div v-if="shipList.length">
                <el-container class="whole-order" v-for="(item, index) in shipList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">{{item.description}}</el-container>
                  <el-container class="order-price">¥{{item.price}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有哦</h2>
              </div>
            </el-tab-pane>
            <!--          receive-pane-->
            <el-tab-pane label="待收货" class="whole-pane" name="third">
              <div v-if="receiveList.length">
                <el-container class="whole-order" v-for="(item, index) in receiveList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">{{item.description}}</el-container>
                  <el-container class="order-price">¥{{item.price}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有哦</h2>
              </div>
            </el-tab-pane>
            <!--          evaluate-pane-->
            <el-tab-pane label="待评价" class="whole-pane" name="fourth">
              <div v-if="evaluateList.length">
                <el-container class="whole-order" v-for="(item, index) in evaluateList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">{{item.description}}</el-container>
                  <el-container class="order-price">¥{{item.price}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有哦</h2>
              </div>
            </el-tab-pane>
            <!--          finished-pane-->
            <el-tab-pane label="已完成" class="whole-pane" name="fifth">
              <div v-if="completeList.length">
                <el-container class="whole-order" v-for="(item, index) in completeList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">{{item.description}}</el-container>
                  <el-container class="order-price">¥{{item.price}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有哦</h2>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
  <!--  <el-tabs>-->
  <!--    <el-tab-pane label="待付款"><order-box v-for="(item, index) of payList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>-->
  <!--    <el-tab-pane label="待发货"><order-box v-for="(item, index) of shipList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>-->
  <!--    <el-tab-pane label="待收货"><order-box v-for="(item, index) of receiveList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>-->
  <!--    <el-tab-pane label="待评价"><order-box v-for="(item, index) of evaluateList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>-->
  <!--    <el-tab-pane label="已完成"><order-box v-for="(item, index) of completeList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>-->
  <!--  </el-tabs>-->
</template>

<script>

export default {
  // Done
  name: 'sellOrder',
  mounted () {
    this.$axios.post('login0/wait_payment_fuc_seller/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.payList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          description: orderList[i].merchandise_info.mer_description,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/wait_deliver_fuc_seller/').then(response => {
      console.log('-----------')
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.shipList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          description: orderList[i].merchandise_info.mer_description,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/wait_receiving_fuc_seller/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.receiveList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          description: orderList[i].merchandise_info.mer_description,
          orderDetail: orderList[i]
        })
      }
      console.log(len)
    })
    this.$axios.post('login0/wait_comment_fuc_seller/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.evaluateList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          description: orderList[i].merchandise_info.mer_description,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/success_fuc_seller/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.completeList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          description: orderList[i].merchandise_info.mer_description,
          orderDetail: orderList[i]
        })
      }
    })
  },
  data () {
    return {
      payList: [
      //   {
      //   goodsName: '汉堡1',
      //   price: 1,
      //   description: 'nice',
      //   photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      //   orderDetail: []
      // }
      ],
      shipList: [],
      receiveList: [],
      evaluateList: [],
      completeList: [],
      activePane: 'first',
      searchContent: undefined
    }
  },
  methods: {
    toOrderPage (item) {
      console.log('------')
      console.log(item.orderDetail)
      let params = {orderDetail: item.orderDetail, from: 'handleProblem'}
      this.$store.commit('setToOrderPage', params)
      this.$router.push('/orderInfo')
      // this.$router.push({name: 'orderInfo', params: {orderDetail: item.orderDetail}})
    },
    myPage () {
      this.$router.push('/person')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    homePage () {
      this.$router.push('/home')
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
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    goReleasedTask () {
      this.$router.push('/releasedtask')
    },
    goReceivedTask () {
      this.$router.push('/receivedtask')
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

.whole-order {
  display: flex;
  justify-content: space-evenly;
  border: 2px solid #eaeaea;
}

.order-photo {
  height: 150px;
  width: 150px;
  margin: 10px 10px 10px 10px;
  justify-content: space-evenly;
}

.order-name {
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
  justify-content: space-evenly;
}
</style>
