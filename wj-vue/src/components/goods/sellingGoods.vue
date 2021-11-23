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
              <span style="margin-left: 10px">上架的商品</span>
              <el-button class="add-button" v-on:click="addGood" v-if="isSeller">添加商品</el-button>
            </el-container>
            <div v-if="goodsList.length">
              <el-container class="whole-order" v-for="(item, index) in goodsList" :key="index">
                <el-container class="good-photo">
                  <el-image :src="item.photo" fit="contain" :alt="item.name"></el-image>
                </el-container>
                <el-container class="good-name">{{item.name}}</el-container>
                <el-container class="good-detail">被{{item.favouriteNumber}}人喜欢</el-container>
                <el-container class="good-price">¥{{item.price}}</el-container>
                <el-container class="good-button">
                  <el-button class="last-button-one" v-on:click="toGoodsPage(index)">查看详情</el-button>
                  <el-button class="last-button-two" v-on:click="deleteGoods(index)">下架</el-button>
                </el-container>
              </el-container>
            </div>
            <div v-else>
              <h2>这里什么也没有，快去卖点什么吧</h2>
            </div>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
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
  <!--      <td><button @click="deleteGoods(index)">下架</button></td>-->
  <!--    </tr>-->
  <!--  </table>-->
</template>

<script>
export default {
  // Done
  name: 'sellingGoods',
  mounted () {
    this.isSeller = (this.$store.state.userStatus >= 2)
    console.log(this.$global.userStatus)
    this.$axios.post('login0/on_sailing/').then(response => {
      console.log(response.data)
      let len = response.data.return_merchandise.length
      let list = response.data.return_merchandise
      for (let i = 0; i < len; ++i) {
        this.goodsList.push({
          name: list[i].mer_name,
          price: list[i].mer_price,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].favourite_number,
          goodsId: list[i].mer_id
        })
      }
    })
  },
  data () {
    return {
      goodsList: [],
      searchContent: undefined,
      addressList: [],
      isSeller: false,
      regionList: [ '荔园',
        '创园',
        '慧园',
        '欣园',
        '学生宿舍',
        '湖畔',
        '九华精舍',
        '教师公寓',
        '专家公寓',
        '风雨操场',
        '润扬体育馆',
        '工学院',
        '南科大中心',
        '第一科研楼',
        '第二科研楼',
        '第一教学楼',
        '第二教学楼',
        '台州楼',
        '检测中心',
        '行政楼',
        '琳恩图书馆',
        '1号门',
        '2号门',
        '3号门',
        '4号门',
        '5号门',
        '6号门',
        '7号门',
        '8号门',
        '其它'],
      uploadFile: [],
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
      }],
      newOptions: [
        {
          value: 1,
          label: '全新'
        }, {
          value: 2,
          label: '几乎全新'
        }, {
          value: 3,
          label: '轻微使用痕迹'
        }, {
          value: 4,
          label: '明显使用痕迹'
        }
      ]
    }
  },
  methods: {
    toGoodsPage (index) {
      this.$store.commit('setToGoodsPage', this.goodsList[index].goodsId)
      this.$router.push('/goods/goodsInfo')
      // this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsList[index].goodsId}})
    },
    deleteGoods (index) {
      // this.$message.info(index)
      // has_next: "False"
      // is_empty: "False"
      // message: "查询成功"
      // return_merchandise: [,…]
      // 0: {mer_id: "MTQ:1mn3ye:wanLVszkWFtcEQFf2nEdwYqT_O1gXBcrqdx7ZF-RSXE", mer_name: "cake", mer_price: 23,…}
      //   allow_face_trade: true
      //   as_favorite_number: 0
      //   browse_number: 2
      //   deliver_price: 1
      //   favourite_number: 0
      //   mer_description: "123"
      //   mer_id: "MTQ:1mn3ye:wanLVszkWFtcEQFf2nEdwYqT_O1gXBcrqdx7ZF-RSXE"
      //   mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjE0LCJkYXRlIjoiMjAyMS0xMS0xNyAwMzoxODo0NC45MTY1NjAiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzV1c2VyXzVfdGh1bWJ1cGxvYWRfbWVyY2hhbmRpc2VfMl90aW1lXzIwMjEtMTEtMTZfMDIwMDEyLjQwMDU1Nl90aHVtYi5wbmcifQ:1mn3ye:rjNWQbqDHFv_YcwSimPgxXUXhp0HzDVWG0xVE4iXH3k"
      //   mer_name: "cake"
      //   mer_price: 23
      //   mer_status: 1
      //   mer_upload_user_id: "NQ:1mn3ye:9khOhFe4uOyItPPqu2nite00ppjnx-xmXVYkbga42FY"
      //   mer_upload_user_name: "oy"
      this.$axios.post('login0/delete_commodity/', this.$qs.stringify({
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
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传三张相片！')
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
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    addGood () {
      this.$router.push('/addgoods')
    },
    goReleasedTask () {
      this.$router.push('/releasedtask')
    },
    goReceivedTask () {
      this.$router.push('/receivedtask')
    },
    goNoticePage () {
      this.$router.push('/notice')
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
  justify-content: space-between;
  align-items: center;
}

.whole-order {
  display: flex;
  justify-content: space-evenly;
  border-bottom: #e5e5e5 1px solid;
}

.good-photo {
  height: 150px;
  width: 150px;
  margin: 10px 10px 10px 10px;
  justify-content: space-evenly;
}

.good-name {
  width: 150px;
  overflow: hidden;
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
}

.good-detail {
  width: 150px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.good-price {
  width: 150px;
  font-size: 20px;
  color: #ff006e;
  align-items: center;
  justify-content: space-evenly;
}

.good-button {
  width: 150px;
  align-items: center;
  display: block;
  margin: 20px auto;
  justify-content: space-evenly;
}

.last-button-one {
  color: #FF0036;
  background-color: #ffeded;
  border: 1px solid #ff0036;
  display: block;
  margin: 20px auto;
  width: 100px;
  justify-content: space-evenly;
}

.last-button-two {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  display: block;
  margin: 20px auto;
  width: 100px;
  color: #fff;
  justify-content: space-evenly;
}

.add-button {
  align-items: center;
  width: 150px;
  height: 40px;
  font-size: 15px;
  background-color: #00bbf9;
  border: 1px solid #000000;
  color: #000000;
}
</style>
