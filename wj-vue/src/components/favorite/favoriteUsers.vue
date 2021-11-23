<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="mid-head">
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
          <el-container class="pane-content">
            <el-container class="page-title">
              <span style="margin-left: 10px">收藏的商家</span>
            </el-container>
            <div v-if="usersList.length">
              <el-container class="marking-goods">
                <el-container class="single-good" v-for="(user, index) in usersList" :key="index">
                  <el-container class="good-image">
                    <div v-if="user.has_photo">
                      <el-image :src="user.photo" fit="contain"  v-on:click="toUserPage(index)" :alt="user.name"></el-image>
                    </div>
                    <div v-else>
                      <el-image :src="defult_photo" fit="contain"  v-on:click="toUserPage(index)" :alt="user.name"></el-image>
                    </div>
                  </el-container>
                  <el-container class="good-describe">
                    <div class="good-name">{{user.name}}</div>
                    <div class="good-rate"><i class="el-icon-star-on"></i>{{user.rate}}</div>
                    <div class="good-number">共有{{user.favouriteNumber}}人喜欢</div>
                    <el-button type="danger" class="good-button" v-on:click="deleteFavoriteUser(index)">删除收藏</el-button>
                  </el-container>
                </el-container>
              </el-container>
            </div>
            <div v-else>
              <h2>这里什么也没有，快去收藏一些吧~</h2>
            </div>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // Done
  name: 'favoriteUsers',
  mounted () {
    // has_next: "False"
    // is_empty: "False"
    // message: "查询成功"
    // return_info: [{user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc", user_name: "oy",…}]
    // 0: {user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc", user_name: "oy",…}
    //   as_favorite_business_number: 1
    //   comment_number: 1
    //   has_header_photo: false
    //   header_photo_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJ1c2VyX2lkIjo1LCJkYXRlIjoiMjAyMS0xMS0xNyAwMzoyMjozNS44Nzc1NzkiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mn42N:02MAb6ynmGRzn_0Yjme1bL8vqZJu4Sj293SUkPTJwY4"
    //   money: 19702
    //   self_description: null
    //   sold_goods_number: 0
    //   stars_for_attitude: 4.81818181818182
    //   stars_for_deliver: 4.81818181818182
    //   stars_for_good: 4.81818181818182
    //   stars_for_task: 5
    //   total_start: 4.81818181818182
    //   uploaded_goods_number: 14
    //   user_email: "11912917@mail.sustech.edu.cn"
    //   user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc"
    //   user_identify: 2
    //   user_name: "oy"
    //   user_real_name: "欧阳"
    //   user_status: 2
    //   status: "200"
    this.$axios.post('login0/all_user_favorite_business/').then(response => {
      let len = response.data.return_info.length
      let list = response.data.return_info
      for (let i = 0; i < len; ++i) {
        this.usersList.push({
          name: list[i].user_name,
          rate: list[i].total_start,
          hasPhoto: list[i].has_header_photo,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].as_favorite_business_number,
          userId: list[i].user_id
        })
      }
      console.log(response.data)
    })
  },
  data () {
    return {
      usersList: [],
      searchContent: undefined,
      defult_photo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    toUserPage (index) {
      this.$store.commit('setToUserPage', this.usersList[index].userId)
      this.$router.push('/user/userInfo')
      // this.$router.push({name: 'userInfo', params: {userId: this.usersList[index].userId}})
    },
    deleteFavoriteUser (index) {
      this.$message.info(index)
      this.$axios.post('commodity/favorite_business_cancel_handler/', this.$qs.stringify({
        favorite_bus_id: this.usersList[index].userId
      })).then(response => {
        if (response.data.status === '200') {
          this.usersList.splice(index, 1)
          this.$message.success(response.data.message)
        } else {
          this.$message.error(response.data.message)
        }
      })
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
    goNoticePage () {
      this.$router.push('/notice')
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
  width: 90%;
}

.pane-content {
  display: block;
  height: 100%;
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

div {
  display: block;
}

.page-title {
  font-size: 40px;
  color: #000;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: #e5e5e5 3px solid;
}

.marking-goods {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
}

.single-good {
  display: block;
  margin: 60px;
  height: 100px;
  width: 100px;
  position: relative;
  flex: none;
}

.good-image {
  align-items: center;
  height: 100px;
  width: 100px;
  border: 2px solid #eaeaea;
}

.good-describe {
  text-align: center;
  display: block;
  height: 30px;
  width: 100px;
  font-size: 20px;
  margin-top: 10px;
}

.good-name {
  font-size: 20px;
  color: black;
  overflow: hidden;
}

.good-rate {
  font-size: 15px;
  color: #ff006e;
  overflow: hidden;
}

.good-number {
  font-size: 15px;
  overflow: hidden;
}

.good-button {
  font-size: 10px;
}
</style>
