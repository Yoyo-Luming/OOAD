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
              placeholder="请输入搜索信息"
              prefix-icon="el-icon-search"
              v-model="searchContent" style="width: 870px">
            </el-input>
            <el-button type="primary" style="width: 100px;border: none;" v-on:click="search">搜索</el-button>
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
            <div v-if="goodsList.length">
              <el-container class="marking-goods">
                <el-container class="single-good" v-for="(item, index) in goodsList" :key="index">
                  <el-container>
                    <div title="前往商品页面" class="good-image" style="display: flex;cursor:pointer;align-items: center;" v-on:click="toGoodsPage(item)">
                      <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.name"></el-image>
                    </div>
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
</template>

<script>
export default {
  name: 'Result',
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
      ]
    }
  },
  mounted () {
    this.searchContent = this.$store.state.toSearchPage.searchContent
    this.labels = this.$store.state.toSearchPage.labels
    this.status = this.$store.state.toSearchPage.status
    this.orderMethod = this.$store.state.toSearchPage.orderMethod
    this.search()
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
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
    },
    search () {
      this.goodsList = []
      const chineseChecker = /[\u4e00-\u9fa5]/
      if (this.labels === undefined && this.status === undefined && this.orderMethod === undefined && this.searchContent !== undefined && chineseChecker.test(this.searchContent)) {
        let url = 'search/?q=' + this.searchContent
        this.$axios.post(url).then(response => {
          console.log('search_result')
          console.log(response.data)
          let len = response.data.return_list.length
          let list = response.data.return_list
          for (let i = 0; i < len; ++i) {
            this.goodsList.push({
              name: list[i].mer_name,
              price: list[i].mer_price,
              photo: list[i].mer_img_url,
              favourite_number: list[i].favourite_number,
              mer_id: list[i].mer_id
            })
          }
        })
      } else if ((this.searchContent === undefined || this.searchContent === '') && this.labels === undefined) {
        this.$message.error('请输入搜索内容或者选择商品分类')
      } else {
        let class1Id = ''
        let class2Id = ''
        let newStatus = ''
        let sortMethod = 'default'
        if (this.labels !== undefined) {
          if (this.labels.length === 2) {
            class1Id = this.labels[0]
            class2Id = this.labels[1]
          } else {
            class1Id = this.labels[0]
          }
        }
        if (this.status !== undefined) {
          newStatus = this.status
        }
        if (this.orderMethod !== undefined) {
          sortMethod = this.orderMethod
        }
        this.$axios.post('commodity/search_by_class_label_all/', this.$qs.stringify({
          class1_id: class1Id,
          class2_id: class2Id,
          sort_method: sortMethod,
          fineness_id: newStatus,
          search_str: this.searchContent
        })).then(response => {
          let len = response.data.return_list.length
          let list = response.data.return_list
          for (let i = 0; i < len; ++i) {
            this.goodsList.push({
              name: list[i].mer_name,
              price: list[i].mer_price,
              photo: list[i].mer_img_url,
              favourite_number: list[i].favourite_number,
              mer_id: list[i].mer_id
            })
          }
        })
      }
      // TODO 分页显示
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  background:0 repeat-y url("../assets/back7.jpg");
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
