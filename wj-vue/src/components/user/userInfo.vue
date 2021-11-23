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
        </el-menu>
      </el-aside>
      <el-main style="height: 100%;padding: 0;">
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
              <el-divider></el-divider>
              <el-container class="selling-title">
                <span style="margin-left: 50px">历史评价</span>
              </el-container>
              <el-divider></el-divider>
              <el-table :data="commentList" style="width: 100%">
                <el-table-column label="日期" width="180" >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评价" width="360" prop="comment">
                </el-table-column>
                <el-table-column label="态度评价">
                  <template slot-scope="scope">
                    <el-rate
                      disabled
                      v-model="scope.row.attitudeComment"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    >
                    </el-rate>
                  </template>
                </el-table-column>
                <el-table-column label="商品评价">
                  <template slot-scope="scope">
                    <el-rate
                      disabled
                      v-model="scope.row.goodsComment"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    >
                    </el-rate>
                  </template>
                </el-table-column>
                <el-table-column label="运输评价">
                  <template slot-scope="scope">
                    <el-rate
                      disabled
                      v-model="scope.row.deliverComment"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    >
                    </el-rate>
                  </template>
                </el-table-column>
                <!--              <el-table-column prop="comment"></el-table-column>-->
              </el-table>
              <!--            <div  v-for="(item, index) in commentList" :key="index">-->
              <!--              {{item.comment}}-->
              <!--            </div>-->
              <!--            <el-container class="whole-notice" v-for="(item, index) in commentList" :key="index">-->
              <!--                <el-container class="message-container">-->
              <!--                  <div class="notice-column-user" >{{item.comment}}</div>-->
              <!--                </el-container>-->
              <!--                <el-container class="notice-pay">-->
              <!--                  <div class="notice-column-message">{{item.comment_level_attitude}}</div>-->
              <!--                </el-container>-->
              <!--            </el-container>-->
            </el-container>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
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
      searchContent: undefined,
      selfDescription: '未填写',
      favoriteNumber: '',
      upload_number: '',
      sellingList: [],
      commentList: [],
      hasPhoto: false,
      defult_photo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted () {
    // this.userId = this.$route.params.userId
    this.userId = this.$store.state.toUserPage.userId
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
    this.$axios.post('/login0/get_all_comments/', this.$qs.stringify({
      target_user_id: this.userId
    })).then(response => {
      console.log('--------------')
      let len = response.data.return_List.length
      let list = response.data.return_List
      console.log(list)
      for (let i = 0; i < len; ++i) {
        this.commentList.push({
          date: list[i].comment_date.split(' ')[0],
          comment: list[i].comment_content,
          attitudeComment: list[i].comment_level_attitude,
          goodsComment: list[i].comment_level_mer,
          deliverComment: list[i].comment_level_tra
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
          this.$store.commit('setToChatPage', {name: this.userName, id: this.userId, dialogueId: response.data.dialogue_id})
          this.$router.push('/chatPage')
          // this.$router.push({name: 'chatPage', params: {name: this.userName, id: this.userId, dialogueId: response.data.dialogue_id}})
        }
      })
    },
    toGoodsPage (index) {
      this.$store.commit('setToGoodsPage', this.goodsList[index].goodsId)
      this.$router.push('/goods/goodsInfo')
      // this.$router.push({name: 'goodsInfo', params: {mer_id: this.sellingList[index].goodsId}})
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
      this.$router.push('/store')
    },
    markPage () {
      this.$router.push('/favoritegoods')
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
      this.$router.push({name: 'Result',
        params: {
          searchContent: this.searchContent,
          labels: undefined,
          status: undefined,
          orderMethod: undefined
        }
      })
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
