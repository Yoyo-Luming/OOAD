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
          <el-tab-pane label="待付款" class="whole-pane" name="first">
            <el-container class="whole-order" v-for="(item, index) in payList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          send-pane-->
          <el-tab-pane label="待发货" class="whole-pane" name="second">
            <el-container class="whole-order" v-for="(item, index) in shipList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          receive-pane-->
          <el-tab-pane label="待收货" class="whole-pane" name="third">
            <el-container class="whole-order" v-for="(item, index) in receiveList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          evaluate-pane-->
          <el-tab-pane label="待评价" class="whole-pane" name="fourth">
            <el-container class="whole-order" v-for="(item, index) in evaluateList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
          <!--          finished-pane-->
          <el-tab-pane label="已完成" class="whole-pane" name="fifth">
            <el-container class="whole-order" v-for="(item, index) in completeList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">{{item.description}}</el-container>
              <el-container class="order-price">¥{{item.price}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
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
import orderBox from './orderBox'

export default {
  name: 'buyOrder',
  components: {orderBox},
  mounted () {
    /*
    create_time: "23:05:39.273897"
    merchandise_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    merchandise_info: Object
      allow_face_trade: true
      as_favorite_number: 0
      browse_number: 1
      deliver_price: 111
      favourite_number: 0
      mer_description: "22333"
      mer_id: "OA:1mmep0:Dhl2-zWhaMTgw1jwZvBYCvPSqlXEjRmTgL3lN_JoU00"
      mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjgsImRhdGUiOiIyMDIxLTExLTE2IDAwOjI3OjA2LjY4ODc5MSIsInBhdGgiOiJcXG1udFxcY1xccHljaGFybVxcT09BRFxcRmluYWxfcHJvamVjdFxcRmluYWxfUHJvamVjdDFcXGltYWdlU3RvcmVcXHVzZXJfNnVzZXJfNl90aHVtYnVwbG9hZF9tZXJjaGFuZGlzZV8yX3RpbWVfMjAyMS0xMS0xNV8yMzEwNTIuMDM2MjIyX3RodW1iLnBuZyJ9:1mmep0:sYZ4HxrxIYbM16hlrZSQCbzQAYBrdJvipr3sxTG-U9A"
      mer_name: "phone13"
      mer_price: 12
      mer_upload_user_id: "Ng:1mmep0:VPRKecIWoHuD79cNiekeCSCik0HIaE6wKW3bbTn42e8"
      mer_upload_user_name: "oy2"
    merchandise_name: "bookm1"
    merchandise_price: 1999
    receiver_location: Object
      addr_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      is_default: false
      user_addr: "102"
      user_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      user_name: "欧阳"
      user_region: 1
    sender_location: Object
      addr_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      is_default: false
      user_addr: "102"
      user_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      user_name: "欧阳"
      user_region: 1
    transaction_id: "NQ:1mjkrZ:1IGO9RCfvEFxCQHGXqMsR28hZRqzUVxwj28SdIPjxN0"
    transaction_price: 2000
    transaction_receiver_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    transaction_receiver_name: "oy"
    transaction_sender_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    transaction_sender_name: "oy"
    transaction_status: 2 */
    this.$axios.post('login0/wait_payment_fuc/').then(response => {
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
    this.$axios.post('login0/wait_deliver/').then(response => {
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
    this.$axios.post('login0/wait_receiving_fuc/').then(response => {
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
    this.$axios.post('login0/wait_comment_fuc/').then(response => {
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
    this.$axios.post('login0/success_fuc/').then(response => {
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
      payList: [{
        goodsName: '汉堡1',
        price: 1,
        description: 'nice',
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      shipList: [{
        goodsName: '汉堡2',
        price: 2,
        description: 'nice',
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      receiveList: [{
        goodsName: '汉堡3',
        price: 3,
        description: 'nice',
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      evaluateList: [{
        goodsName: '汉堡4',
        price: 4,
        description: 'nice',
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      completeList: [{
        goodsName: '汉堡5',
        price: 5,
        description: 'nice',
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }]
    }
  },
  methods: {
    toOrderPage (item) {
      console.log('------')
      console.log(item.orderDetail)
      this.$router.push({name: 'orderInfo', params: {orderDetail: item.orderDetail}})
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
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
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
