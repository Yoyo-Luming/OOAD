<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../assets/testlogo.png" class="logo" alt="">
        <span>SUSTech Store</span>
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
    <el-main>
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
          <div v-if="goodsList.length">
            <el-container class="marking-goods">
              <el-container class="single-good" v-for="(item, index) in goodsList" :key="index">
                <el-container class="good-image">
                  <el-image :src="item.photo" fit="contain"  v-on:click="toGoodsPage(item)" :alt="item.name"></el-image>
                </el-container>
                <el-container class="good-describe">
                  <div class="good-name">{{item.name}}</div>
                  <div class="good-price">¥{{item.price}}</div>
                  <div class="good-number">共有{{item.favouriteNumber}}人喜欢</div>
                </el-container>
              </el-container>
            </el-container>
          </div>
          <div v-else>
            <h2>这里还没有结果！</h2>
          </div>
          <!--          <div>-->
          <!--            <goods-box v-for="(item, index) of goodsList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>-->
          <!--          </div>-->
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import GoodsBox from './goodsBox'
export default {
  name: 'Result',
  components: {GoodsBox},
  data () {
    return {
      searchContent: '',
      labels: [0, 0],
      status: '未选择',
      orderMethod: '未选择',
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
    console.log(this.$route.params)
    if (this.$route.params != null) {
      this.searchContent = this.$route.params.searchContent
      this.labels = this.$route.params.labels
      this.status = this.$route.params.status
      this.orderMethod = this.$route.params.orderMethod
      this.search()
    }
  },
  methods: {
    toGoodsPage (item) {
      this.$router.push({name: 'goodsInfo', params: {mer_id: item.mer_id}})
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
      this.$store.commit('setUserName', '')
      this.$store.commit('setUserStatus', 0)
      this.$store.commit('setUserId', '')
      console.log('-----' + this.$store.state.userName)
      this.$router.push('/login')
    },
    search () {
      // this.goodsList.push({
      //   name: '汉堡',
      //   price: 22,
      //   photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      // })
      console.log(this.labels[0])
      this.goodsList = []
      if (this.labels[0] === 0 && this.status === '未选择' && this.orderMethod === '未选择') {
        let url = 'search/?q=' + this.searchContent
        console.log(url)
        this.$axios.post(url).then(response => {
          console.log(response.data)
          let len = response.data.return_list.length
          let list = response.data.return_list
          console.log(len)
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
      } else if (this.searchContent === '' && this.labels[0] === 0) {
        this.$message.error('请输入搜索内容或者选择商品分类')
      } else {
        let class1Id = ''
        let class2Id = ''
        let newStatus = ''
        let sortMethod = 'default'
        if (this.labels !== '未选择') {
          if (this.labels.length === 2) {
            class1Id = this.labels[0]
            class2Id = this.labels[1]
          } else {
            class1Id = this.labels[0]
          }
        }
        if (this.status !== '未选择') {
          newStatus = this.status
        }
        if (this.orderMethod !== '未选择') {
          sortMethod = this.orderMethod
        }
        this.$axios.post('commodity/search_by_class_label_all/', this.$qs.stringify({
          class1_id: class1Id,
          class2_id: class2Id,
          sort_method: sortMethod,
          fineness_id: newStatus,
          search_str: this.searchContent
        })).then(response => {
          console.log(response.data)
          let len = response.data.return_list.length
          let list = response.data.return_list
          console.log(len)
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
</style>
