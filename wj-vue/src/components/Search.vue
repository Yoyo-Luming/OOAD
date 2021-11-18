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
          <el-cascader  :options="options"
                        :props="{ checkStrictly: true }"
                        v-model="labels"
                        placeholder="商品类别"
                        clearable></el-cascader>
          <el-button type="primary" style="width: 100px;background: #a0c4ff;border: none;" v-on:click="search">Search</el-button>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchContent: '',
      labels: '',
      options: [{
        value: 1,
        label: '运动户外',
        children: [{
          value: 1,
          label: '运动服'
        }, {
          value: 2,
          label: '运动鞋'
        }]
      }, {
        value: 2,
        label: '生活用品',
        children: [{
          value: 3,
          label: '五金用品'
        }, {
          value: 4,
          label: '办公用品'
        }, {
          value: 5,
          label: '办公设备'
        }]
      }, {
        value: 3,
        label: '电器',
        children: [{
          value: 6,
          label: '大家电'
        }, {
          value: 7,
          label: '厨房电器'
        }, {
          value: 8,
          label: '生活电器'
        }]
      }, {
        value: 4,
        label: '数码',
        children: [{
          value: 9,
          label: '电脑'
        }, {
          value: 10,
          label: '电脑配件'
        }, {
          value: 11,
          label: '智能设备'
        }, {
          value: 12,
          label: '手机'
        }, {
          value: 13,
          label: '相机'
        }]
      }, {
        value: 5,
        label: '服装',
        children: [{
          value: 14,
          label: '上衣'
        }, {
          value: 15,
          label: '外套'
        }]
      }, {
        value: 6,
        label: '美妆',
        children: [{
          value: 16,
          label: '美容护肤'
        }, {
          value: 17,
          label: '彩妆'
        }, {
          value: 18,
          label: '香水'
        }]
      }, {
        value: 7,
        label: '家具',
        children: [{
          value: 19,
          label: '家具饰品'
        }, {
          value: 20,
          label: '住宅家具'
        }]
      }, {
        value: 8,
        label: '玩具',
        children: [{
          value: 21,
          label: '模型'
        }, {
          value: 22,
          label: '手办'
        }]
      }]
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
      this.$axios.post('', this.$qs.stringify({searchContent: this.searchContent}))
        .then(successResponse => {
          alert(successResponse.data.message)
          this.$router.push({path: '/result', goods: successResponse.data})
        })
        .catch(failResponse => {
          alert(failResponse)
        })
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
