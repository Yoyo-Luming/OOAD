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
          background-color="#ffc8dd"
          text-color="#ff5d8f"
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
        <el-container class="search-column">
          <el-input
            placeholder="Please input information"
            prefix-icon="el-icon-search"
            v-model="searchContent" style="width: 870px">
          </el-input>
          <el-button type="primary" style="width: 100px;background: #a0c4ff;border: none;" v-on:click="search">Search</el-button>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    myPage () {
      this.$router.push('/person')
    },
    homePage () {
      this.$router.push('/')
    },
    searchPage () {
      this.$router.go(0)
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
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  background:0 repeat-y url("../assets/back1.jpg");
  background-size: cover;
  display: block;
}

.el-header {
  background: #ffc8dd;
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
  margin: 30px auto;
  height: 545px;
  width: 1000px;
}

.search-column {
  margin-top: 30%;
  display: flex;
  justify-content: space-between;
}
</style>
