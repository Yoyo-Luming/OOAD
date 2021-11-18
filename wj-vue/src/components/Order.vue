<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../assets/testlogo.png" class="logo" alt="">
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
        <el-tabs type="border-card" class="selection">
          <el-tab-pane>
            <span slot="label" class="tabs">History</span>
            <el-container class="pane-content">
              <div v-if="history.length">
                <table>
                  <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Describe</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  <tr v-for="item in history" :key="item.name">
                    <td>{{item.time}}</td>
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.describe}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.number}}</td>
                    <td>
                      <div v-if="checkStatus(item.status)">
                        Finished
                      </div>
                      <div v-else>
                        Doing
                      </div>
                    </td>
                    <td><button v-on:click="detail(item)">Detail</button></td>
                  </tr>
                </table>
              </div>
              <div class="nothing" v-else>
                <span>Your haven't bought or sold anything.</span>
              </div>
            </el-container>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tabs" v-on:click="selectSellList">Sell List</span>
            <el-container class="pane-content">
              <div v-if="sellList.length">
                <table>
                  <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Describe</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  <tr v-for="item in sellList" :key="item.name">
                    <td>{{item.time}}</td>
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.describe}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.number}}</td>
                    <td>
                      <div v-if="checkStatus(item.status)">
                        Finished
                      </div>
                      <div v-else>
                        Doing
                      </div>
                    </td>
                    <td><button v-on:click="detail(item)">Detail</button></td>
                  </tr>
                </table>
              </div>
              <div class="nothing" v-else>
                <span>Your haven't sold anything.</span>
              </div>
            </el-container>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tabs" v-on:click="selectOrderList">Order List</span>
            <el-container class="pane-content">
              <div v-if="orderList.length">
                <table>
                  <tr>
<!--                    <th>Time</th>-->
                    <th>Name</th>
                    <th>Describe</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  <tr v-for="item in orderList" :key="item.name">
<!--                    <td>{{item.time}}</td>-->
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.describe}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.number}}</td>
                    <td>
                      <div v-if="checkStatus(item.status)">
                        Finished
                      </div>
                      <div v-else>
                        Doing
                      </div>
                    </td>
                    <td><button v-on:click="detail(item)">Detail</button></td>
                  </tr>
                </table>
              </div>
              <div class="nothing" v-else>
                <span>Your haven't bought anything.</span>
              </div>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      sellList: [
      ],
      orderList: [
      ],
      history: [
        { time: 1, name: 'Name1', describe: 'a', price: 20, number: 1, orderType: 1, status: 0, detailURL: '/orderDetail' },
        { time: 2, name: 'Name2', describe: 'b', price: 80, number: 1, orderType: 1, status: 1, detailURL: '/orderDetail' },
        { time: 3, name: 'Name3', describe: 'c', price: 20, number: 1, orderType: 2, status: 0, detailURL: '/orderDetail' },
        { time: 4, name: 'Name4', describe: 'd', price: 80, number: 1, orderType: 2, status: 1, detailURL: '/orderDetail' }
      ]
    }
  },
  methods: {
    myPage () {
      this.$router.go(0)
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
      this.$router.push('/markPage')
    },
    logOut () {
      // Todo
    },
    search () {
      // Todo
    },
    deleteItem (index) {
      this.address.splice(index, 1)
      // Todo
    },
    addItem () {
      // Todo
    },
    checkStatus (value) {
      return value !== 0
    },
    selectSellList () {
      const select = []
      this.history.forEach(element => {
        if (element.orderType === 1) {
          select.push(element)
        }
        this.sellList = select
      })
    },
    selectOrderList () {
      const select = []
      this.history.forEach(element => {
        if (element.orderType === 2) {
          select.push(element)
        }
        this.orderList = select
      })
    },
    detail (item) {
      this.$router.push(item.detailURL)
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  background:0 repeat-y url("../assets/back7.jpg");
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
  width: 1500px;
  opacity: 0.8;
}

.selection {
  display: block;
  align-items: center;
  height: 753px;
}

.tabs {
  font-size: 20px;
}

.pane-content {
  display: block;
  height: 660px;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

table {
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  width: 100px;
  text-align: center;
}
th {
  background-color: #f7f7f7;
  color: #5c6b77;
}

.nothing {
  margin-top: 100px;
  font-size: 30px;
}
</style>
