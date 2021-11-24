<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head" v-on:click="homePage" title="前往主页" style="cursor:pointer;">
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
          <el-submenu index="1">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="1-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="1-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="1-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="1-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" v-on:click="logOut">注销</el-menu-item>
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
          <el-container class="search-column">
            <el-input
              placeholder="Please input information"
              prefix-icon="el-icon-search"
              v-model="searchContent" style="width: 870px">
            </el-input>
            <el-button type="primary" style="width: 100px;background: #a0c4ff;border: none;" v-on:click="search">搜索</el-button>
          </el-container>
          <el-container class="choose-opt">
            <el-cascader  :options="options"
                          :props="{ checkStrictly: true }"
                          v-model="labels"
                          placeholder="商品类别"
                          clearable></el-cascader>
            <el-select v-model="status" placeholder="使用程度">
              <el-option
                v-for="item in newOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="orderMethod" placeholder="排列方法">
              <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-container>
          <el-container class="message-content">
            <div v-if="recommendList.length">
              <el-container class="marking-goods">
                <el-container class="single-good" v-for="(item, index) in recommendList" :key="index">
                  <el-container class="good-image">
                    <el-image :src="item.photo" title="前往商品页面" style="cursor:pointer;" fit="contain"  v-on:click="toGoodsPage(item)" :alt="item.name"></el-image>
                  </el-container>
                  <el-container class="good-describe">
                    <div class="good-name">{{item.name}}</div>
                    <div class="good-price">¥{{item.price}}</div>
                    <div class="good-number">共有{{item.favourite_number}}人喜欢</div>
                  </el-container>
                </el-container>
              </el-container>
            </div>
            <div v-else>
              <h2>这里还没有结果！</h2>
            </div>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
<!--  <el-container class="home-container">-->
<!--    <el-header class="el-header">-->
<!--      <div class="right-head">-->
<!--        <img src="../assets/testlogo.png" class="logo" alt="">-->
<!--        <span>SUSTech Store</span>-->
<!--      </div>-->
<!--      <div class="left-head">-->
<!--        <el-menu-->
<!--          class="el-menu-demo"-->
<!--          mode="horizontal"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b">-->
<!--          <el-menu-item index="1" v-on:click="homePage">主页</el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title">{{$store.state.userName}}</template>-->
<!--            <el-menu-item index="2-1" v-on:click="myPage">个人主页</el-menu-item>-->
<!--            <el-menu-item index="2-2" v-on:click="cartPage">购物车</el-menu-item>-->
<!--            <el-menu-item index="2-3" v-on:click="sellPage">上架的商品</el-menu-item>-->
<!--            <el-menu-item index="2-4" v-on:click="markPage">收藏的商品</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-menu-item index="3" v-on:click="logOut">注销</el-menu-item>-->
<!--        </el-menu>-->
<!--      </div>-->
<!--    </el-header>-->
<!--    <el-main>-->
<!--      <el-container class="mid-content">-->
<!--        <el-container class="search-column">-->
<!--          <el-input-->
<!--            placeholder="Please input information"-->
<!--            prefix-icon="el-icon-search"-->
<!--            v-model="searchContent" style="width: 870px">-->
<!--          </el-input>-->
<!--          <el-button type="primary" style="width: 100px;background: #a0c4ff;border: none;" v-on:click="search">Search</el-button>-->
<!--        </el-container>-->
<!--        <el-container>-->
<!--          商品分类：<el-cascader  :options="options"-->
<!--                             :props="{ checkStrictly: true }"-->
<!--                             v-model="labels"-->
<!--                             placeholder="商品类别"-->
<!--                             clearable></el-cascader>-->
<!--          使用程度：<el-select v-model="status" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in newOptions"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--          排列方法：<el-select v-model="orderMethod" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in orderOptions"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--        </el-container>-->
<!--        <el-container class="message-content">-->
<!--          <div>-->
<!--            <goods-box v-for="(item, index) of recommendList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>-->
<!--          </div>-->
<!--        </el-container>-->
<!--      </el-container>-->
<!--    </el-main>-->
<!--  </el-container>-->
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      searchContent: undefined,
      labels: undefined,
      status: undefined,
      orderMethod: undefined,
      goodsList: [],
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
      ],
      orderOptions: [
        {
          value: 'new',
          label: '最新商品'
        },
        {
          value: 'hot',
          label: '热度优先'
        },
        {
          value: '-price',
          label: '价格从高到低'
        }, {
          value: 'price',
          label: '价格从低到高'
        }
      ],
      recommendList: []
    }
  },
  mounted () {
    this.$axios.post('login0/get_recommend_list/').then(response => {
      console.log(response.data)
      let len = response.data.return_list.length
      let list = response.data.return_list
      console.log(len)
      for (let i = 0; i < len; ++i) {
        this.recommendList.push({
          name: list[i].mer_name,
          price: list[i].mer_price,
          photo: list[i].mer_img_url,
          favourite_number: list[i].as_favourite_number,
          mer_id: list[i].mer_id
        })
      }
    })
  },
  methods: {
    toGoodsPage (item) {
      this.$store.commit('setToGoodsPage', item.mer_id)
      this.$router.push('/goods/goodsInfo')
      // this.$router.push({name: 'goodsInfo', params: {mer_id: item.mer_id}})
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
    goNewGoods () {
      this.$router.push('/addgoods')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    search () {
      let type = -1
      if (this.labels === undefined && this.status === undefined && this.orderMethod === undefined && this.searchContent !== undefined) {
        type = 1
      } else if (this.searchContent === undefined && this.labels === undefined) {
        this.$message.error('请输入搜索内容或者选择商品分类')
      } else {
        type = 2
      }
      if (type !== -1) {
        this.$store.commit('setToSearchPage', {
          searchContent: this.searchContent,
          labels: this.labels,
          status: this.status,
          orderMethod: this.orderMethod
        })
        this.$router.push('/result')
        // this.$router.push({name: 'Result',
        //   params: {
        //     searchContent: this.searchContent,
        //     labels: this.labels,
        //     status: this.status,
        //     orderMethod: this.orderMethod
        //   }
        // })
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center repeat url("../assets/back7.jpg");
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
  height: 100%;
  width: 1000px;
}

.search-column {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}

.message-content {
  display: block;
  border-radius: 20px;
  border: 3px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background: white;
  margin: 50px auto;
  opacity: 0.9;
  width: 1000px;
  height: 100%;
}

.choose-opt {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
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
</style>
