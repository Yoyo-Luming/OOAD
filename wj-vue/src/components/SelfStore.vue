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
            <span slot="label" class="tabs">Self Store</span>
            <el-container class="pane-content">
              <div v-if="goods.length">
                <table>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Describe</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in goods" :key="item.name">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.describe}}</td>
                    <td>{{item.price}} 元</td>
                    <td>{{item.num}}</td>
                    <td><button v-on:click="deleteItem(index)">Remove</button></td>
                  </tr>
                </table>
                <el-container class="addItem">
                  <el-button type="primary" class="add-button" v-on:click="addItem" round>Add</el-button>
                </el-container>
              </div>
              <div v-else>
                <el-container class="addItem">
                  <el-button type="primary" class="add-button" v-on:click="addItem" round>Add</el-button>
                </el-container>
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
  name: 'SelfStore',
  data () {
    return {
      goods: [
        { id: 1, name: 'Name1', describe: 'a', price: 20, num: 1 },
        { id: 2, name: 'Name2', describe: 'b', price: 80, num: 1 },
        { id: 3, name: 'Name3', describe: 'c', price: 60, num: 1 },
        { id: 4, name: 'Name4', describe: 'd', price: 15, num: 1 }
      ]
    }
  },
  methods: {
    deleteItem (index) {
      this.goods.splice(index, 1)
      // Todo
    },
    addItem () {
      // Todo
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
      this.$router.go(0)
    },
    markPage () {
      this.$router.push('/markPage')
    },
    logOut () {
      // Todo
    },
    search () {
      // Todo
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
  width: 80%;
  opacity: 0.8;
}

.selection {
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

.addItem {
  padding-top: 10px;
  padding-right: 10px;
  align-items: center;
  text-align: center;
  float: right;
}
</style>
