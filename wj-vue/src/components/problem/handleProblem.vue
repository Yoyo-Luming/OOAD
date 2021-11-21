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
          <el-tab-pane label="待处理问题列表" class="whole-pane" name="first">
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
      this.$router.push({name: 'orderInfo', params: {orderDetail: item.detail, from: 'handleProblem'}})
    },
    myPage () {
      this.$router.push('/person')
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
  font-family: 黑体;
  justify-content: left;
}

.order-detail {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  word-wrap: anywhere;
  word-break: normal;
  align-items: center;
  justify-content: center;
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
