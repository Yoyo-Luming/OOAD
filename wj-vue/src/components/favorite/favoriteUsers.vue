<!--<template>-->
<!--  <table>-->
<!--    <tr>-->
<!--      <th>用户名</th>-->
<!--      <th>用户头像</th>-->
<!--      <th>收藏人数</th>-->
<!--      <th>评分</th>-->
<!--      <th></th>-->
<!--      <th></th>-->
<!--    </tr>-->
<!--    <tr v-for="(item,index) in usersList" :key="index+Math.random()">-->
<!--      <td>{{item.name}}</td>-->
<!--      <td><img :src="item.photo" v-if="item.hasPhoto"><i class="el-icon-s-custom" v-else></i></td>-->
<!--      <td>{{item.favouriteNumber}}</td>-->
<!--      <td>{{item.rate}}</td>-->
<!--      <td><button @click="toUserPage(index)">用户详情</button></td>-->
<!--      <td><button @click="deleteFavoriteUser(index)">删除</button></td>-->
<!--    </tr>-->
<!--  </table>-->
<!--</template>-->

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
            <h2>Nothing Here. Go and mark those you love.</h2>
          </div>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
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
      defult_photo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    toUserPage (index) {
      this.$router.push({name: 'userInfo', params: {userId: this.usersList[index].userId}})
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
    searchPage () {
      this.$router.push('/search')
    },
    cartPage () {
      this.$router.go(0)
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
