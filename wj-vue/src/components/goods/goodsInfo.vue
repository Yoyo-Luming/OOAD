<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../../assets/testlogo.png" class="logo" alt="" style="cursor:pointer;">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="mid-head" style="width: 50%;">
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
            <el-container class="good-photos">
              <el-container class="big-photo">
                <el-image :src="big_photo" fit="contain" :alt="goodsInfo.name"></el-image>
              </el-container>
              <el-container class="small-photo">
                <el-container class="single-photo" v-for="(link, index) in goodsInfo.url" :key="index">
                  <el-image :src="link" fit="contain" style="border: 2px solid #eaeaea;" :alt="goodsInfo.name"></el-image>
                </el-container>
              </el-container>
              <el-container class="mark_chars">
                <el-button v-on:click="collect">
                  <i class="el-icon-star-on" ></i>收藏商品
                </el-button>
              </el-container>
            </el-container>
            <el-container class="good-others">
              <el-container class="contents">
                <div class="good-name">{{goodsInfo.name}}</div>
                <div class="good-description">{{goodsInfo.description}}</div>
                <div class="good-description">分类：{{goodsInfo.kind}}</div>
                <div class="good-price">售价: ¥<span style="margin-left: 5px;font-size: 30px">{{goodsInfo.price}}</span></div>
                <div class="good-price">邮费: ¥<span style="margin-left: 5px;font-size: 20px">{{goodsInfo.deliverPrice}}</span></div>
                <div class="seller-name" title="前往卖家页面" style="cursor:pointer;" v-on:click="toUserPage">卖家：{{goodsInfo.poster}}</div>
                <el-button class="cart-button" v-on:click="addCart">加入购物车</el-button>
                <el-button class="buy-button" v-on:click="buy">立即购买</el-button>
              </el-container>
            </el-container>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
  <!--  <div>-->
  <!--    商品名称<h1>{{goodsInfo.name}}</h1>-->
  <!--    商品价格<h4>{{goodsInfo.price}}</h4>-->
  <!--    发布者用户名<h5>{{goodsInfo.poster}}</h5>-->
  <!--    发布日期<h5>{{goodsInfo.uploadDay}}</h5>-->
  <!--    邮费<h5>{{goodsInfo.deliverPrice}}</h5>-->
  <!--    <img v-for="(item, index) of url" :key="index+Math.random()" :src="item">-->
  <!--&lt;!&ndash;    <img :src="this.$route.params.goodsurl" >&ndash;&gt;-->
  <!--    商品描述<p1>{{description}}</p1>-->
  <!--    <el-button type="primary" @click="collect">收藏</el-button>-->
  <!--    <el-button @click="addCart">添加购物车</el-button>-->
  <!--    <el-button @click="toUserPage">查看发布者</el-button>-->
  <!--    <el-button @click="buy">购买</el-button>-->
  <!--  </div>-->
</template>

<script>
export default {
  // Done
  name: 'goodsInfo',
  data () {
    return {
      goodsInfo: {
        name: '',
        description: '',
        price: '',
        url: [],
        poster: '',
        uploadDay: '',
        id: '',
        deliverPrice: '',
        posterId: '',
        kind: ''
      },
      searchContent: undefined,
      posterInfo: {
        name: '',
        id: ''
      },
      big_photo: '',
      class1: [
        '运动户外',
        '生活用品',
        '电器',
        '数码',
        '服装',
        '美妆',
        '家具',
        '玩具'
      ],
      class2: [
        '运动服',
        '运动鞋',
        '五金用品',
        '办公用品',
        '办公设备',
        '大家电',
        '厨房电器',
        '生活电器',
        '电脑',
        '电脑配件',
        '智能设备',
        '手机',
        '相机',
        '上衣',
        '外套',
        '美容护肤',
        '彩妆',
        '香水',
        '家具饰品',
        '住宅家具',
        '模型',
        '手办'
      ]
    }
  },
  mounted () {
    // this.name = 'food'
    // this.price = 122
    // this.url.push('https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png')
    // this.goodsInfo.id = this.$route.params.mer_id
    this.goodsInfo.id = this.$store.state.toGoodsPage.merId
    console.log(this.goodsInfo.id)
    this.$axios.post('commodity/commodity_detail/', this.$qs.stringify({
      mer_id: this.goodsInfo.id
    })).then(response => {
      console.log(response.data)
      // addr_info:
      //   addr_id: "MTY:1mnGOz:saMYMHwN22On0ek7HbjaQU9rnvQTONg-naRmXs8SETE"
      //   is_default: false
      //   user_addr: "203"
      //   user_id: "NQ:1mnGOz:TsB-cGaXNUejsD5lF57rivrDnarhQIGT3zKRXsBF0_o"
      //   user_name: "欧阳"
      //   user_region: 1
      // allow_face_trade: true
      // as_favorite_number: 0
      // class_level_1: 1
      // class_level_2: 1
      // img_num: "1"
      // mer_deliver_price: 1
      // mer_description: "k40"
      // mer_id: "MjI:1mnGOz:PI2vpQNZXMxFK_Z0tYhoeG7sjoG4mkx0OviRVv8mzzs"
      // mer_image1_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTkzOTQiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzV1c2VyXzVfbWVydXBsb2FkX21lcmNoYW5kaXNlXzJfdGltZV8yMDIxLTExLTE3XzAxNTMyNi42OTA2MTBfMTYzNzA4NTE3OTQ1NS5qcGcifQ:1mnGOz:E2IOszvB6o3ZBT2TnzsPHuQjdknJYfdL0RaaRCmffI0"
      // mer_image2_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTk0MzYiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mnGOz:--YAktQnBFiD3dr0S8dBS2w6dfg3Z_aPq734aDZwlmE"
      // mer_image3_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTk0NDciLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mnGOz:dSwunNs_5tTjq8WPaM_vbJwGBRuvOGQEh_8pb6pGHOA"
      // mer_name: "vivo"
      // mer_price: "23.0"
      // mer_update: "2021-11-17T01:53:26.552"
      // mer_upload_user_id: "NQ:1mnGOz:TsB-cGaXNUejsD5lF57rivrDnarhQIGT3zKRXsBF0_o"
      // mer_upload_user_name: "oy"
      // message: "成功返回商品vivo的信息"
      // status: "200"
      this.posterInfo.name = response.data.mer_upload_user_name
      this.posterInfo.id = response.data.mer_upload_user_id
      this.goodsInfo.name = response.data.mer_name
      this.goodsInfo.description = response.data.mer_description
      this.goodsInfo.price = response.data.mer_price
      this.goodsInfo.uploadDay = response.data.mer_update.split('T')[0]
      this.big_photo = response.data.mer_image1_url
      if (response.data.img_num === '1') {
        this.goodsInfo.url.push(response.data.mer_image1_url)
      } else if (response.data.img_num === '2') {
        this.goodsInfo.url.push(response.data.mer_image1_url)
        this.goodsInfo.url.push(response.data.mer_image2_url)
      } else {
        this.goodsInfo.url.push(response.data.mer_image1_url)
        this.goodsInfo.url.push(response.data.mer_image2_url)
        this.goodsInfo.url.push(response.data.mer_image3_url)
      }
      this.goodsInfo.id = response.data.mer_id
      this.goodsInfo.deliverPrice = response.data.mer_deliver_price
      this.goodsInfo.posterId = response.data.mer_upload_user_id
      this.goodsInfo.poster = response.data.mer_upload_user_name
      this.goodsInfo.kind = this.class1[response.data.class_level_1 - 1] + '/' + this.class2[response.data.class_level_2 - 1]
      let len = response.data.img_num
      if (len >= 2) {
        this.goodsInfo.url.push(response.data.mer_image2_url)
        this.url.push(response.data.mer_image2_url)
      }
      if (len >= 3) {
        this.goodsInfo.url.push(response.data.mer_image3_url)
        this.url.push(response.data.mer_image3_url)
      }
      console.log(response.data)
    })
  },
  methods: {
    collect () {
      console.log(1)
      this.$axios.post('commodity/add_favorite_merchandise_handler/', this.$qs.stringify({
        mer_id: this.goodsInfo.id
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    addCart () {
      this.$axios.post('login0/add_cart/', this.$qs.stringify({
        mer_id: this.goodsInfo.id
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success('添加购物车成功')
        } else {
          this.$message.error('添加购物车失败')
        }
      })
    },
    toUserPage () {
      this.$store.commit('setToUserPage', this.goodsInfo.posterId)
      this.$router.push('/user/userInfo')
      // this.$router.push({name: 'userInfo', params: {userId: this.goodsInfo.posterId}})
    },
    buy () {
      this.$store.commit('setToBuyPage', this.goodsInfo.id)
      this.$router.push('/buyPage')
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
    goNoticePage () {
      this.$router.push('/notice')
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
  display: -webkit-box;
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
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

.good-photos {
  width: 50%;
  display: block;
  margin: 20px;
}

.good-others {
  width: 50%;
  display: block;
}

.big-photo {
  height: 400px;
  width: 400px;
  border: 2px solid #eaeaea;
}

.small-photo {
  display: flex;
  height: 100px;
  width: 400px;
  margin-top: 20px;
}

.single-photo {
  height: 70px;
  justify-content: space-around;
}

.mark_chars {
  margin-left: 10px;
  align-items: center;
  font-size: 15px;
}

.contents {
  display: block;
  margin-top: 50px;
}

.good-name {
  margin-top: 10px;
  display: flex;
  text-align: left;
  font-size: 30px;
  color: #000;
  font-family: 黑体;
}

.good-description {
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  font-family: 黑体;
  color: #8d99ae;
}

.good-price {
  align-items: center;
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  display: flex;
  color: red;
}

.seller-name {
  margin-top: 30px;
  display: flex;
  text-align: left;
  font-size: 20px;
  color: #000;
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
</style>
