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
        <el-button style="margin-bottom: 20px;" type="primary" v-on:click="otherTaskVisible=true">发布</el-button>
        <el-tabs type="border-card" v-model="activePane">
          <!--          pay-pane-->
          <el-tab-pane label="待送货的订单" class="whole-pane" name="first">
            <el-container class="whole-order" v-for="(item, index) in shipList" :key="index">
              <el-container class="order-photo">
                <el-image :src="item.photo" fit="contain" :alt="item.goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{item.goodsName}}</el-container>
              <el-container class="order-detail">发货地点：{{item.sendAddress}}</el-container>
              <el-container class="order-detail">收货地点：{{item.receiveAddress}}</el-container>
              <el-container class="order-detail">{{item.orderDetail}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toOrderPage">查看详情</el-button>
              </el-container>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
      <el-dialog style="margin: auto;" :visible.sync="otherTaskVisible" :modal-append-to-body="false">
        <el-form :model="otherTaskForm" label-width="200px" label-position="left">
          <el-form-item label="任务名称">
            <el-input v-model="otherTaskForm.name"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="otherTaskForm.price"></el-input>
          </el-form-item>
          <el-form-item label="最晚取货时间">
            <el-date-picker v-model="otherTaskForm.ddlTime" type="datetime" placeholder="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionLater" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="otherTaskForm.description"></el-input>
          </el-form-item>
          <el-form-item label="发货地址">
            <el-select v-model="otherTaskForm.senderAddressId" placeholder="请选择收货区域">
              <el-option
                v-for="item in sendAddressList"
                :label="item.name + item.region+item.address+item.phone"
                :key="item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-select v-model="otherTaskForm.receiveAddressId" placeholder="请选择收货区域">
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
    </el-main>
  </el-container>
  <!--  <el-container>-->
  <!--    <el-button @click="otherTaskVisible=true">-->
  <!--      发布跑腿任务-->
  <!--    </el-button>-->
  <!--    <task-for-order-box v-for="(item, index) of shipList" :key="index+Math.random()" :goodsName="item.goodsName" :photo="item.photo" :sendAddress="item.sendAddress" :receiveAddress="item.receiveAddress" :detail="item.orderDetail"></task-for-order-box>-->
  <!--    <el-dialog :visible.sync="otherTaskVisible">-->
  <!--      <el-form :model="otherTaskForm">-->
  <!--        <el-form-item label="任务名称">-->
  <!--          <el-input v-model="otherTaskForm.name"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="价格">-->
  <!--          <el-input v-model="otherTaskForm.price"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="最晚取货时间">-->
  <!--          <el-date-picker v-model="otherTaskForm.ddlTime" type="datetime" placeholder="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionLater" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="任务描述">-->
  <!--          <el-input v-model="otherTaskForm.description"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="发货地址">-->
  <!--          <el-select v-model="otherTaskForm.senderAddressId" placeholder="请选择收货区域">-->
  <!--            <el-option-->
  <!--              v-for="item in sendAddressList"-->
  <!--              :label="item.name + item.region+item.address+item.phone"-->
  <!--              :key="item.id"-->
  <!--              :value="item.id">-->
  <!--            </el-option>-->
  <!--          </el-select>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="收货地址">-->
  <!--          <el-select v-model="otherTaskForm.receiveAddressId" placeholder="请选择收货区域">-->
  <!--            <el-option-->
  <!--              v-for="item in receiveAddressList"-->
  <!--              :label="item.name + item.region+item.address+item.phone"-->
  <!--              :key="item.id"-->
  <!--              :value="item.id">-->
  <!--            </el-option>-->
  <!--          </el-select>-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--      <el-button @click="otherTaskVisible=false">取消</el-button>-->
  <!--      <el-button @click="postOtherTask">发布跑腿任务</el-button>-->
  <!--    </el-dialog>-->
  <!--  </el-container>-->
</template>

<script>
// import orderBox from '../order/orderBox'
import taskForOrderBox from './taskForOrderBox'
export default {
  // TODO need check
  name: 'publishTask',
  components: {taskForOrderBox},
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
      // console.log(this.addressList)
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
            receiveAddress: this.regionList[orderList[i].receiver_location.user_region] + orderList[i].receiver_location.user_addr,
            sendAddress: this.regionList[orderList[i].sender_location.user_region] + orderList[i].sender_location.user_addr,
            photo: orderList[i].merchandise_info.mer_img_url,
            orderDetail: orderList[i]
          })
        }
      }
    })
  },
  data () {
    return {
      otherTaskVisible: false,
      otherTaskForm: {
        name: '',
        price: '',
        ddlTime: '',
        description: '',
        senderAddressId: '',
        receiveAddressId: ''
      },
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
      pickerOptionLater: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  methods: {
    postOtherTask () {
      this.$axios.post('task/release_task_others/', this.$qs.stringify({
        ddl_time: this.otherTaskForm.ddlTime,
        price: this.otherTaskForm.price,
        description: this.otherTaskForm.description,
        name: this.otherTaskForm.name,
        sender_addr_id: this.otherTaskForm.senderAddressId,
        receive_addr_id: this.otherTaskForm.receiveAddressId
      })).then(response => {
        this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.otherTaskVisible = false
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
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
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
