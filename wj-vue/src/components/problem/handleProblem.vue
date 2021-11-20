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
            <el-container class="whole-order" v-for="(item, index) in problemList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.orderUrl" fit="contain" :alt="item.problemType"></el-image>
              </el-container>
              <el-container class="order-name">{{item.problemType}}</el-container>
              <el-container class="order-detail">{{item.problemDescription}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <problem-box v-for="(item, index) of problemList" :key="index+Math.random()" :orderUrl="item.orderUrl" :problemType="item.problemType" :problemDescription="item.problemDescription" :detail="item.detail" ></problem-box>-->
  <!--  </el-container>-->
</template>

<script>
import problemBox from './problemBox'
export default {
  // TODO need check
  name: 'handleProblem',
  components: {problemBox},
  data () {
    return {
      problemList: [],
      problemTypes: [
        '申请退款',
        '线下交易冲突',
        '二维码未收款',
        '恶意未发货',
        '其他'
      ],
      activePane: 'first'
    }
  },
  mounted () {
    this.$axios.post('/supermanager/problems_list/').then(response => {
      let len = response.data.return_list.length
      let list = response.data.return_list
      for (let i = 0; i < len; ++i) {
        this.problemList.push({
          problemId: list[i].problem_id,
          orderUrl: list[i].problem_transaction.merchandise_info.mer_img_url,
          problemDescription: list[i].problem_description,
          problemType: this.problemTypes[list[i].problem_type],
          detail: list[i].problem_transaction
        })
      }
      console.log(response.data)
    })
  },
  methods: {
    toOrderPage (item) {
      this.$router.push({name: 'orderInfo', params: {orderDetail: item.detail}})
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

</style>
