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
          <el-container class="total-contents">
            <el-container class="info-contents">
              <el-container class="avatar-container">
                <div v-if="hasPhoto">
                  <el-image class="user-photo" :src="photo" fit="contain" :alt="userName"></el-image>
                </div>
                <div v-else>
                  <el-image class="user-photo" :src="defult_photo" fit="contain" alt=""></el-image>
                </div>
                <el-button primary>上传头像</el-button>
              </el-container>
              <el-container class="user-info">
                <div class="user-name">用户名： {{userName}}</div>
                <div class="user-rate">用户评分： {{rate}}</div>
                <div class="user-describe">用户简介：{{selfDescription}}</div>
                <div class="user-describe">被{{favoriteNumber}}喜欢</div>
                <el-button class="cart-button" v-on:click="collect">收藏用户</el-button>
                <el-button class="buy-button" v-on:click="chatSeller">联系卖家</el-button>
              </el-container>
            </el-container>
            <el-divider></el-divider>
            <el-container class="selling-title">
              <span style="margin-left: 50px">在售的商品</span>
            </el-container>
            <el-divider></el-divider>
            <el-container class="goods-contents">
              <el-container class="single-good" v-for="(item, index) in sellingList" :key="index">
                <el-container class="good-image">
                  <el-image :src="item.photo" fit="contain"  v-on:click="toGoodsPage(index)" :alt="item.name"></el-image>
                </el-container>
                <el-container class="good-describe">
                  <div class="good-name">{{item.name}}</div>
                  <div class="good-price">¥{{item.price}}</div>
                  <div class="good-number">共有{{item.favourite_number}}人喜欢</div>
                </el-container>
              </el-container>
            </el-container>
          </el-container>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <el-row>-->
  <!--      <el-col>-->
  <!--        用户头像：<img :src="photo" v-if="hasPhoto"><i class="el-icon-s-custom" v-else></i>-->
  <!--      </el-col>-->
  <!--        用户名：{{userName}}-->
  <!--        用户评分：{{rate}}-->
  <!--    </el-row>-->
  <!--    <el-row>-->
  <!--      <el-button @click="collect">收藏卖家</el-button>-->
  <!--    </el-row>-->
  <!--    <el-row>-->
  <!--      <el-button @click="chatSeller">联系卖家</el-button>-->
  <!--    </el-row>-->
  <!--    <el-row>-->
  <!--      TA的宝贝：-->
  <!--      <goods-box v-for="(item, index) of sellingList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>-->
  <!--    </el-row>-->
  <!--  </el-container>-->
</template>

<script>
// 用户信息展示：头像、昵称、评分、已上传商品列表、收藏卖家
export default {
  // TODO needtocheck
  name: 'userInfo',
  data () {
    return {
      userId: '',
      userName: '',
      photo: '',
      rate: '',
      selfDescription: '未填写',
      favoriteNumber: '',
      upload_number: '',
      sellingList: [],
      hasPhoto: false,
      defult_photo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted () {
    this.userId = this.$route.params.userId
    console.log(this.userId)
    this.$axios.post('login0/user_page/', this.$qs.stringify({
      user_id: this.userId
    })).then(response => {
      console.log(response.data)
      let info = response.data.base_info
      this.hasPhoto = info.has_header_photo
      if (this.hasPhoto) {
        this.photo = info.header_photo_url
      }
      this.rate = info.total_star
      this.userName = info.user_name
      this.favoriteNumber = info.as_favorite_business_number
      if (info.self_description != null) {
        this.selfDescription = info.self_description
      }
      let goodsList = response.data.selling_list
      let len = goodsList.length
      for (let i = 0; i < len; ++i) {
        this.sellingList.push({
          name: goodsList[i].mer_name,
          price: goodsList[i].mer_price,
          photo: goodsList[i].mer_img_url,
          favourite_number: goodsList[i].favourite_number,
          mer_id: goodsList[i].mer_id
        })
      }
    })
  },
  methods: {
    collect () {
      // console.log('collect!')
      this.$axios.post('/commodity/add_favorite_business_handler/', this.$qs.stringify({
        mer_upload_user_id: this.userId
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    chatSeller () {
      // this.$message.info('chatSeller')
      this.$axios.post('dialogue/start_dialogue/', this.$qs.stringify({
        business_id: this.userId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200' || response.data.status === '201') {
          this.$router.push({name: 'chatPage', params: {name: this.userName, id: this.userId, dialogueId: response.data.dialogue_id}})
        }
      })
    },
    toGoodsPage (index) {
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.sellingList[index].goodsId}})
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
  width: 90%;
}

.pane-content {
  display: flex;
  height: 100%;
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

.info-contents {
  display: flex;
}

.cart-button {
  margin-top: 50px;
  background-color: #ffeded;
  border: 1px solid #ff0036;
  color: #FF0036;
  width: 200px;
}

.buy-button {
  margin-top: 50px;
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
  width: 200px;
}

.user-photo {
  width: 100px;
  height: 100px;
}

.avatar-container {
  margin-top: 50px;
  height: 200px;
  width: 200px;
  display: block;
}

.total-contents {
  display: block;
}

.user-info {
  margin-top: 50px;
  text-align: left;
  display: block;
}

.user-name {
  margin-top: 10px;
  display: flex;
  text-align: left;
  font-size: 20px;
  color: #000;
}

.user-rate {
  margin-top: 10px;
  display: flex;
  text-align: left;
  font-size: 15px;
  color: #000;
}

.user-describe {
  display: block;
  height: 30px;
  width: 100px;
  font-size: 20px;
  margin-top: 20px;
  word-wrap: anywhere;
  word-break: normal;
}

.goods-contents {
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

.selling-title {
  text-align: left;
  font-size: 30px;
  color: black;
  font-family: 黑体;
}
</style>
