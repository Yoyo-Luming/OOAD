<!--<template>-->
<!--  <table>-->
<!--    <tr>-->
<!--      <th>商品名称</th>-->
<!--      <th>商品图片</th>-->
<!--      <th>收藏人数</th>-->
<!--      <th>商品价格</th>-->
<!--      <th></th>-->
<!--      <th></th>-->
<!--    </tr>-->
<!--    <tr v-for="(item,index) in goodsList" :key="index+Math.random()">-->
<!--      <td>{{item.name}}</td>-->
<!--      <td><img :src="item.photo"></td>-->
<!--      <td>{{item.favouriteNumber}}</td>-->
<!--      <td>{{item.price}}</td>-->
<!--      <td><button @click="toGoodsPage(index)">商品详情</button></td>-->
<!--      <td><button @click="deleteFavoriteGoods(index)">删除</button></td>-->
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
            <span style="margin-left: 10px">收藏的商品</span>
          </el-container>
          <div v-if="goodsList.length">
            <el-container class="marking-goods">
              <el-container class="single-good" v-for="(item, index) in goodsList" :key="index">
                <el-container class="good-image">
                  <el-image :src="item.photo" fit="contain"  v-on:click="toGoodsPage(index)" :alt="item.name"></el-image>
                </el-container>
                <el-container class="good-describe">
                  <div class="good-name">{{item.name}}</div>
                  <div class="good-price">¥{{item.price}}</div>
                  <div class="good-number">共有{{item.favouriteNumber}}人喜欢</div>
                  <el-button type="danger" class="good-button" v-on:click="deleteFavoriteGoods(index)">删除收藏</el-button>
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
  name: 'favoriteGoods',
  mounted () {
    // has_next: "False"
    // is_empty: "False"
    // message: "查询成功"
    // return_info: Array(1)
    // 0:
    //   allow_face_trade: true
    //   as_favorite_number: 1
    //   browse_number: 6
    //   deliver_price: 1
    //   favourite_number: 0
    //   mer_description: "123"
    //   mer_id: "Nw:1mn3zb:SJOQDkwlgphIcYz1ArCUT1cYPjXQrD4dhpiCt57y-to"
    //   mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjcsImRhdGUiOiIyMDIxLTExLTE3IDAzOjE5OjQzLjA5NjgxOSIsInBhdGgiOiJcXG1udFxcY1xccHljaGFybVxcT09BRFxcRmluYWxfcHJvamVjdFxcRmluYWxfUHJvamVjdDFcXGltYWdlU3RvcmVcXHVzZXJfNnVzZXJfNl90aHVtYnVwbG9hZF9tZXJjaGFuZGlzZV8yX3RpbWVfMjAyMS0xMS0xNV8yMjUwNDMuMDY5MjIzX3RodW1iLnBuZyJ9:1mn3zb:Pn6p3NPxMZueOo7SY428sOy9Gq_00LpzKE029FRk64E"
    //   mer_name: "pen"
    //   mer_price: 1
    //   mer_status: 1
    //   mer_upload_user_id: "Ng:1mn3zb:jeNo-Fxkt-IcbP6dlhRh7xUgb-VlVz_BvUTTdbD0o0Y"
    //   mer_upload_user_name: "oy2"
    this.$axios.post('login0/all_user_favorite_merchandise/').then(response => {
      let len = response.data.return_info.length
      let list = response.data.return_info
      for (let i = 0; i < len; ++i) {
        this.goodsList.push({
          name: list[i].mer_name,
          price: list[i].mer_price,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].favourite_number,
          goodsId: list[i].mer_id
        })
      }
      console.log(response.data)
    })
  },
  data () {
    return {
      goodsList: []
    }
  },
  methods: {
    toGoodsPage (index) {
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsList[index].goodsId}})
    },
    deleteFavoriteGoods (index) {
      // this.$message.info(index)
      this.$axios.post('commodity/favorite_merchandise_cancel_handler/', this.$qs.stringify({
        mer_id: this.goodsList[index].goodsId
      })).then(response => {
        if (response.data.status === '200') {
          this.goodsList.splice(index, 1)
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
  height: 100px;
  width: 100px;
  border: 2px solid #eaeaea;
  align-items: center;
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

.good-price {
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
