<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head" v-on:click="homePage" title="前往主页" style="cursor:pointer;">
        <img src="../assets/testlogo.png" class="logo" alt="">
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
          <el-tabs type="border-card" class="selection">
            <el-tab-pane>
              <span slot="label" class="tabs">Shopping Cart</span>
              <el-container class="pane-content">
                <div v-if="goods.length">
                  <table>
                    <tr>
                      <th>
                        <el-button type="text" class="choose-all" v-on:click="checkAll" round>选择全部</el-button>
                      </th>
                      <th>名字</th>
                      <th>图片</th>
                      <th>价格</th>
                      <th></th>
                    </tr>
                    <tr v-for="(item,index) in goods" :key="item.select">
                      <td><input type="checkbox" :checked="item.select" v-on:click="chooseOne(index)"></td>
                      <td>{{item.name}}</td>
                      <td><img :src="item.photo" alt=""></td>
                      <td>{{item.price}} 元</td>
                      <td><el-button type="danger" v-on:click="deleteItem(index)" round>移除</el-button></td>
                    </tr>
                  </table>
                  <el-container class="totalCost">
                    <span>总计：{{totalCost}} 元</span>
                    <el-button type="primary" class="submit-button" v-on:click="chooseAddressVisible=true" round>提交</el-button>
                  </el-container>
                </div>
                <div v-else>
                  <h2>你的购物车里哦什么都没有</h2>
                </div>
              </el-container>
            </el-tab-pane>
          </el-tabs>
        </el-container>
        <el-dialog style="margin: auto;" :visible.sync="chooseAddressVisible" :modal-append-to-body="false">
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item class="form-item-class" label="收货地址：" prop="recAddress">
              <el-select v-model="addressId">
                <el-option
                  v-for="item in addressList"
                  :label="item.name + item.region+item.address+item.phone"
                  :key="item.id"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="chooseAddressVisible=false">取消</el-button>
            <el-button @click="submit">确认订单</el-button>
          </div>
        </el-dialog>
        <el-dialog style="margin: auto;" :visible.sync="chooseAddressVisible" :modal-append-to-body="false">
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item class="form-item-class" label="支付密码：" prop="password">
              <el-input v-model="payPassword"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button @click="pay">确认</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // Done
  name: 'ShoppingCart',
  data () {
    const verifyPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    const verifyAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      goods: [
        // {name: 'name', photo: '', price: '', select: false}
      ],
      totalCost: 0,
      addressId: '',
      chooseAddressVisible: false,
      payVisible: false,
      searchContent: undefined,
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
      addressList: [],
      identifyCode: '',
      payPassword: '',
      rules: {
        password: [
          { validator: verifyPassword, trigger: 'blur' }
        ],
        recAddress: [
          { validator: verifyAddress, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$axios.post('login0/cart_show/').then(response => {
      console.log(response.data)
      let len = response.data.total_count
      let goodsList = response.data.info
      for (let i = 0; i < len; ++i) {
        this.goods.push({
          id: goodsList[i].mer_id,
          name: goodsList[i].mer_name,
          photo: goodsList[i].mer_img_url,
          price: parseInt(goodsList[i].mer_price),
          select: false
        })
      }
    })
    this.$axios.post('/login0/get_address_list/', this.$qs.stringify({
    })).then(response => {
      console.log(response.data)
      // console.log(response.data.return_list)
      for (let i = 0; i < response.data.return_list.length; ++i) {
        if (response.data.return_list[i].address_type === 1) {
          this.addressList.push({
            name: response.data.return_list[i].user_name,
            region: this.regionList[response.data.return_list[i].user_region - 1],
            id: response.data.return_list[i].addr_id,
            address: response.data.return_list[i].user_addr,
            phone: response.data.return_list[i].user_phone})
        }
      }
      console.log(this.addressList)
    })
  },
  methods: {
    deleteItem (index) {
      this.$confirm('Warning, you can not repeal the delete!', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.goods.splice(index, 1)
      })
    },
    checkAll () {
      this.goods.forEach(element => {
        if (element.select === true) {
          this.totalCost = this.totalCost - element.price * element.num
        } else {
          this.totalCost = this.totalCost + element.price * element.num
        }
        element.select = !element.select
      })
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
      this.$store.commit('setToSearchPage', {
        searchContent: this.searchContent,
        labels: undefined,
        status: undefined,
        orderMethod: undefined
      })
      this.$router.push('/result')
    },
    chooseOne (index) {
      if (this.goods[index].select === true) {
        this.totalCost = this.totalCost - this.goods[index].price
      } else {
        this.totalCost = this.totalCost + this.goods[index].price
      }
      this.goods[index].select = !this.goods[index].select
    },
    submit () {
      if (this.goods.length === 0) {
        this.$message.error('请选择商品！')
        return
      }
      this.$axios.post('transaction/get_identify_code/').then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.identifyCode = response.data.identify_code
          for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].select) {
              console.log(this.goods[i])
              this.$axios.post('transaction/post_transaction/', this.$qs.stringify({
                mer_id: this.goods[i].id,
                identify_code: this.identifyCode,
                rec_address_id: this.addressId
              })).then(response2 => {
                this.$message.info(response2.data.message)
                if (response2.data.status === '200') {
                  this.chooseAddressVisible = false
                  this.payVisible = true
                }
              })
            }
          }
        }
      })
    },
    pay () {
      if (this.payPassword === '') {
        this.$message.error('请输入支付密码！')
        return
      }
      if (this.addressId === '') {
        this.$message.error('选择收货地址！')
        return
      }
      this.$axios.post('transaction/commit_transaction_total/', this.$qs.stringify({
        current_identify_code: this.identifyCode,
        pay_password: this.payPassword,
        rec_address_id: this.addressId
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('buyorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
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

.mid-head {
  display: flex;
  align-items: center;
}

.left-head {
  display: flex;
  align-items: center;
}

.mid-content {
  display: block;
  margin: 60px auto;
  height: 100%;
  width: 80%;
  opacity: 0.8;
}

.selection {
  display: block;
  align-items: center;
  height: 753px;
}

.tabs {
  font-size: 20px;
}

.pane-content {
  display: block;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

table {
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  width: 100px;
  text-align: center;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
}

.choose-all {
  font-size: 15px;
  text-align: center;
}

.totalCost {
  font-size: 20px;
  display: flex;
  align-items: center;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}

.submit-button {
  margin-left: 50px;
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
