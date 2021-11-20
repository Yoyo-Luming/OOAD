<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
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
        <el-tabs type="border-card" class="selection">
          <el-tab-pane>
            <span slot="label" class="tabs">Shopping Cart</span>
            <el-container class="pane-content">
              <div v-if="goods.length">
                <table>
                  <tr>
                    <th>
                      <el-button type="text" class="choose-all" v-on:click="checkAll" round>Choose All</el-button>
                    </th>
                    <th>Name</th>
                    <th>photo</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in goods" :key="item.select">
                    <td><input type="checkbox" :checked="item.select" v-on:click="chooseOne(index)"></td>
                    <td>{{item.name}}</td>
                    <td><img :src="item.photo"></td>
                    <td>{{item.price}} 元</td>
                    <td><el-button type="danger" v-on:click="deleteItem(index)" round>Remove</el-button></td>
                  </tr>
                </table>
                <el-container class="totalCost">
                  <span>总计：{{totalCost}} 元</span>
                  <el-button type="primary" class="submit-button" v-on:click="chooseAddressVisible=true" round>Submit</el-button>
                </el-container>
                <el-dialog :visible.sync="chooseAddressVisible">
                  收货地址：
                  <el-select v-model="addressId" placeholder="请选择">
                  <el-option
                    v-for="item in addressList"
                    :label="item.name + item.region+item.address+item.phone"
                    :key="item.id"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                  <el-button @click="chooseAddressVisible=false">取消</el-button>
                  <el-button @click="submit">确认订单</el-button>
                </el-dialog>
                <el-dialog :visible.sync="payVisible">
                  支付密码:<el-input v-model="payPassword"></el-input>
                  <el-button @click="dialogFormVisible=false">取消</el-button>
                  <el-button @click="pay">确认</el-button>
                </el-dialog>
              </div>
              <div v-else>
                <h2>Nothing in your cart</h2>
              </div>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  // Done
  name: 'ShoppingCart',
  data () {
    return {
      goods: [
        // {name: 'name', photo: '', price: '', select: false}
      ],
      totalCost: 0,
      addressId: '',
      chooseAddressVisible: false,
      payVisible: false,
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
      payPassword: ''
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
      // Todo
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
    chooseOne (index) {
      if (this.goods[index].select === true) {
        this.totalCost = this.totalCost - this.goods[index].price
      } else {
        this.totalCost = this.totalCost + this.goods[index].price
      }
      this.goods[index].select = !this.goods[index].select
    },
    submit () {
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
      // Todo
    },
    pay () {
      this.$axios.post('transaction/commit_transaction_total/', this.$qs.stringify({
        current_identify_code: this.identifyCode,
        pay_password: this.payPassword,
        rec_address_id: this.addressId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$router.push('buyorder')
        }
      })
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
      this.$router.go(0)
    },
    sellPage () {
      this.$router.push('/store')
    },
    markPage () {
      this.$router.push('/mark')
    },
    logOut () {
      // Todo
    },
    search () {
      // Todo
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
  height: 660px;
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
</style>
