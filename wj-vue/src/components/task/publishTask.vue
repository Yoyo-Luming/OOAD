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
          <el-button style="margin-bottom: 20px;" type="primary" v-on:click="otherTaskVisible=true">发布任务</el-button>
          <el-tabs type="border-card" v-model="activePane">
            <!--          pay-pane-->
            <el-tab-pane label="订单任务" class="whole-pane" name="first">
              <div v-if="shipList.length">
                <el-container class="whole-order" v-for="(item, index) in shipList" :key="index">
                  <el-container class="order-photo">
                    <el-image :src="item.photo" fit="fill" style="height: 100%;width: 100%;" :alt="item.goodsName"></el-image>
                  </el-container>
                  <el-container class="order-name">{{item.goodsName}}</el-container>
                  <el-container class="order-detail">发货地址：{{item.sendAddress}}</el-container>
                  <el-container class="order-detail">收货地址：{{item.receiveAddress}}</el-container>
    <!--              <el-container class="order-detail">{{item.orderDetail}}</el-container>-->
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="toOrderPage(item)">查看详情</el-button>
                    <el-button type="text" class="button" @click="clickPostTaskOrder(item)">发布任务</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里目前什么也没有哦</h2>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-container>
        <el-dialog style="margin: auto;" :visible.sync="otherTaskVisible" :modal-append-to-body="false">
          <el-form :model="otherTaskForm" label-width="200px" label-position="left" :rules="rules">
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="otherTaskForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="otherTaskForm.price"></el-input>
            </el-form-item>
            <el-form-item label="最晚取货时间" prop="ddlTime">
              <el-date-picker v-model="otherTaskForm.ddlTime" type="datetime" placeholder="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionLater" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="otherTaskForm.description"></el-input>
            </el-form-item>
            <el-form-item label="领货地址" prop="senderAddressId">
              <el-select v-model="otherTaskForm.senderAddressId" placeholder="请选择领货地址">
                <el-option
                  v-for="item in sendAddressList"
                  :label="item.name + item.region+item.address+item.phone"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收货地址" prop="receiveAddressId">
              <el-select v-model="otherTaskForm.receiveAddressId" placeholder="请选择收货地址">
                <el-option
                  v-for="item in receiveAddressList"
                  :label="item.name + item.region+item.address+item.phone"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button @click="otherTaskVisible=false">取消</el-button>
          <el-button type="primary" @click="postOtherTask">发布跑腿任务</el-button>
        </el-dialog>
        <el-dialog :visible.sync="orderTaskVisible">
          <el-form :model="orderTaskForm" :rules="rules">
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="orderTaskForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="orderTaskForm.price"></el-input>
            </el-form-item>
            <el-form-item label="最晚取货时间" prop="ddlTime">
              <el-date-picker v-model="orderTaskForm.ddlTime" type="datetime" placeholder="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionLater" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="orderTaskForm.description"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="orderTaskForm=false">取消</el-button>
          <el-button @click="postTaskOrder">发布跑腿任务</el-button>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import orderBox from '../order/orderBox'
export default {
  inject: ['reload'],
  name: 'publishTask',
  mounted () {
    this.$axios.post('/login0/get_address_list/', this.$qs.stringify({
    })).then(response => {
      console.log(response.data.return_list)
      for (let i = 0; i < response.data.return_list.length; ++i) {
        if (response.data.return_list[i].address_type === 1) {
          this.receiveAddressList.push({
            name: response.data.return_list[i].user_name,
            region: this.regionList[response.data.return_list[i].user_region - 1],
            id: response.data.return_list[i].addr_id,
            address: response.data.return_list[i].user_addr,
            phone: response.data.return_list[i].user_phone})
        } else {
          this.sendAddressList.push({
            name: response.data.return_list[i].user_name,
            region: this.regionList[response.data.return_list[i].user_region - 1],
            id: response.data.return_list[i].addr_id,
            address: response.data.return_list[i].user_addr,
            phone: response.data.return_list[i].user_phone})
        }
      }
    })
    this.$axios.post('login0/wait_deliver_fuc_seller/').then(response => {
      console.log('-----------')
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        if (!orderList[i].has_task) {
          this.shipList.push({
            goodsName: orderList[i].merchandise_name,
            receiveAddress: this.regionList[orderList[i].receiver_location.user_region - 1] + ' ' + orderList[i].receiver_location.user_addr,
            sendAddress: this.regionList[orderList[i].sender_location.user_region - 1] + ' ' + orderList[i].sender_location.user_addr,
            photo: orderList[i].merchandise_info.mer_img_url,
            orderDetail: orderList[i]
          })
        }
      }
    })
  },
  data () {
    const verifyEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项不能为空'))
      } else {
        callback()
      }
    }
    return {
      otherTaskVisible: false,
      orderTaskVisible: false,
      otherTaskForm: {
        name: '',
        price: '',
        ddlTime: '',
        description: '',
        senderAddressId: '',
        receiveAddressId: ''
      },
      orderTaskForm: {
        name: '',
        price: '',
        ddlTime: '',
        description: ''
      },
      searchContent: '',
      sendAddressList: [],
      receiveAddressList: [],
      shipList: [],
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
      activePane: 'first',
      current_transaction_id: '',
      pickerOptionLater: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        name: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        price: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        ddlTime: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        description: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        senderAddressId: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        receiveAddressId: [
          { validator: verifyEmpty, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postOtherTask () {
      if (this.otherTaskForm.name === '') {
        this.$message.error('请输入任务名称！')
        return
      }
      if (this.otherTaskForm.price === '') {
        this.$message.error('请输入价格！')
        return
      }
      if (this.otherTaskForm.ddlTime === '') {
        this.$message.error('请输入最迟领货时间！')
        return
      }
      if (this.otherTaskForm.description === '') {
        this.$message.error('请输入任务描述！')
        return
      }
      if (this.otherTaskForm.senderAddressId === '') {
        this.$message.error('请选择领货地址！')
        return
      }
      if (this.otherTaskForm.receiveAddressId === '') {
        this.$message.error('请选择收货地址！')
        return
      }
      const numberChecker = /^[0-9]+$/
      if (!numberChecker.test(this.otherTaskForm.price)) {
        this.$message.error('价格必须为正整数！')
        return
      }
      this.$axios.post('task/release_task_others/', this.$qs.stringify({
        ddl_time: this.otherTaskForm.ddlTime,
        price: this.otherTaskForm.price,
        description: this.otherTaskForm.description,
        name: this.otherTaskForm.name,
        sender_addr_id: this.otherTaskForm.senderAddressId,
        receive_addr_id: this.otherTaskForm.receiveAddressId
      })).then(response => {
        if (response.data.status === '200') {
          this.otherTaskVisible = false
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    toOrderPage (item) {
      // console.log(item.detail)
      let params = {orderDetail: item.orderDetail, from: 'handleProblem'}
      this.$store.commit('setToOrderPage', params)
      this.$router.push('/orderInfo')
      // this.$router.push({name: 'orderInfo', params: {orderDetail: item.orderDetail}})
    },
    clickPostTaskOrder (item) {
      this.current_transaction_id = item.orderDetail.transaction_id
      this.orderTaskVisible = true
    },
    postTaskOrder () {
      if (this.orderTaskForm.name === '') {
        this.$message.error('请输入任务名称！')
        return
      }
      if (this.orderTaskForm.price === '') {
        this.$message.error('请输入价格！')
        return
      }
      if (this.orderTaskForm.ddlTime === '') {
        this.$message.error('请输入最迟领货时间！')
        return
      }
      if (this.orderTaskForm.description === '') {
        this.$message.error('请输入任务描述！')
        return
      }
      const numberChecker = /^[0-9]+$/
      if (!numberChecker.test(this.orderTaskForm.price)) {
        this.$message.error('价格必须为正整数！')
        return
      }
      this.$axios.post('/task/release_task_transaction/', this.$qs.stringify({
        tra_id: this.current_transaction_id,
        ddl_time: this.orderTaskForm.ddlTime,
        price: this.orderTaskForm.price,
        description: this.orderTaskForm.description,
        name: this.orderTaskForm.name
      })).then(response => {
        if (response.data.status === '200') {
          this.reload()
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
    goNoticePage () {
      this.$router.push('/notice')
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
    searchTop () {
      if (this.searchContent === undefined || this.searchContent === '') {
        this.$message.error('请输入搜索内容')
        return
      }
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
  width: 1200px;
}

.whole-pane {
  display: block;
}

.whole-order {
  display: flex;
  justify-content: space-evenly;
  border: 2px solid #eaeaea;
}

.order-photo {
  height: 150px;
  width: 150px;
  margin: 10px 10px 10px 10px;
  justify-content: space-evenly;
}

.order-name {
  width: 150px;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-detail {
  width: 150px;
  word-wrap: anywhere;
  word-break: normal;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-pay {
  width: 150px;
  align-items: center;
  justify-content: space-evenly;
}

.last-button {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
  justify-content: space-evenly;
}
</style>
