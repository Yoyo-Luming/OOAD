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
          <el-container class="pane-content">
            <el-container class="good-photos">
              <el-container class="big-photo">
                <div style="display: flex;align-items: center;height: 100%;width: 100%;">
                  <el-image :src="goodsPhoto" fit="fill" style="height: 100%;width: 100%;" :alt="goodsName"></el-image>
                </div>
              </el-container>
            </el-container>
            <el-container class="good-others">
              <el-container class="contents">
                <div class="good-name">{{goodsName}}</div>
                <div class="good-price">售价: ¥<span style="margin-left: 5px;font-size: 20px">{{goodsPrice}}</span></div>
                <div class="good-deliverPrice">邮费: ¥<span style="margin-left: 5px;font-size: 20px">{{deliverPrice}}</span></div>
                <div class="good-totalprice">实付款: ¥<span style="margin-left: 5px;font-size: 30px">{{totalPrice}}</span></div>
              </el-container>
              <el-container class="follow-contents">
                <div>选择收货地址：
                  <el-select v-model="addressId" placeholder="请选择" prop="address">
                    <el-option
                      v-for="item in addressList"
                      :label="item.name + item.region+item.address+item.phone"
                      :key="item.id"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <br>
                <el-container style="display: flex;justify-content: right; margin-right: 50px;margin-top: 50px">
                  <el-button @click="cancel">取消</el-button>
                  <el-button type="danger" @click="confirmOrder"><div v-if="isConfirm">付款</div><div v-else>确认订单</div></el-button>
                </el-container>
              </el-container>
            </el-container>
          </el-container>
        </el-container>
        <el-dialog style="margin: auto;" :visible.sync="payFormVisible" :modal-append-to-body="false">
          <el-dialog style="margin: auto;" :visible.sync="innerVisible" :modal-append-to-body="false">
            <div v-if="payMethod===1">
              <el-form ref="form" label-width="200px" :rules="rules">
                <el-form-item label="支付密码:" prop="payPassword">
                  <el-input v-model="payPassword" show-password></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible=false">取消</el-button>
                <el-button type="primary" @click="pay">确认支付</el-button>
              </div>
            </div>
            <div v-else>
              <el-form ref="form" label-width="200px" :rules="rules">
                <img :src="QRCodeUrl">
                <el-form-item label="上传支付凭证:">
                  <el-upload
                    action="auto"
                    :http-request="uploadPaySectionFile"
                    list-type="picture-card"
                    class = "contentImgStyle"
                    :limit="1"
                    accept=".jpg"
                    :on-exceed="handleExceed">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible=false">取消</el-button>
                <el-button type="primary" @click="submitQRPay">确认支付</el-button>
              </div>
            </div>
          </el-dialog>
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item label="请选择支付方式:" >
              <el-select v-model="payMethod" prop="payMethod">
                <el-option
                  v-for="item in payOptions"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="payFormVisible=false">取消</el-button>
            <el-button type="primary" @click="choosePayMethod">确认</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'buyPage',
  mounted () {
    this.goodsId = this.$store.state.toBuyPage.goodsId
    this.$axios.post('/commodity/commodity_detail/', this.$qs.stringify({
      mer_id: this.goodsId
    })).then(response => {
      // addr_info:
      //   addr_id: "NTA:1mnGkw:_OFQoBXWiZpl-g9gQYxTlOWMQ3x2gLZh4ddGJJQv8Io"
      //   is_default: false
      //   user_addr: "104"
      //   user_id: "OA:1mnGkw:q5s7zRLSufQVdJSqxnx-JD2Iw2iF6LkdkqCWqD1gyK0"
      //   user_name: "huhuu"
      //   user_region: 1
      // allow_face_trade: true
      // as_favorite_number: 0
      // class_level_1: 1
      // class_level_2: 1
      // img_num: "2"
      // mer_deliver_price: 1
      // mer_description: "oppo phone"
      // mer_id: "MjM:1mnGkw:F-yp37TWcCJGUN-Xb_ijLmuMFv3_PK1l_yvOjCtBPfw"
      // mer_image1_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIzLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjo1NzoyNi4xNDE2MjYiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzh1c2VyXzhfbWVydXBsb2FkX21lcmNoYW5kaXNlXzJfdGltZV8yMDIxLTExLTE3XzE2MzkyMS44MzA5MjJfMTYzNzEzODMzNTY1Mi5qcGcifQ:1mnGkw:A5WH8lyycPSmWN0CR5Cssi-nviy83qEwaTbJ_cERGM0"
      // mer_image2_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIzLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjo1NzoyNi4xNDE2NzEiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzh1c2VyXzhfbWVydXBsb2FkX21lcmNoYW5kaXNlXzJfdGltZV8yMDIxLTExLTE3XzE2MzkyMS44NzQxNjZfMTYzNzEzODM1NzQyNi5qcGcifQ:1mnGkw:w9Je8NTjTy1mzTIe31FrjDCH-fwFp7xXnTCIKCY_Rrg"
      // mer_image3_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIzLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjo1NzoyNi4xNDE2ODMiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mnGkw:KQfInh1_2TJWvzrHQgwMZPcs5paJg1HFa3a3mtGPuiU"
      // mer_name: "oppo"
      // mer_price: "1234.0"
      // mer_update: "2021-11-17T16:39:21.266"
      // mer_upload_user_id: "OA:1mnGkw:q5s7zRLSufQVdJSqxnx-JD2Iw2iF6LkdkqCWqD1gyK0"
      // mer_upload_user_name: "oy3"
      // message: "成功返回商品oppo的信息"
      // status: "200"
      this.goodsName = response.data.mer_name
      this.deliverPrice = response.data.mer_deliver_price
      this.goodsPrice = response.data.mer_price
      this.totalPrice = parseInt(this.deliverPrice) + parseInt(this.goodsPrice)
      this.goodsPhoto = response.data.mer_image1_url
      this.senderId = response.data.mer_upload_user_id
      this.$axios.post('login0/get_QR_Code/', this.$qs.stringify({
        user_id: this.senderId
      })).then(response => {
        console.log('qrcode')
        console.log(response.data)
        this.QRCodeUrl = response.data.QR_code_url[0]
      })
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
      // console.log(this.addressList)
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
      // dialogFormVisible: false,
      payFormVisible: false,
      innerVisible: false,
      goodsName: '',
      goodsPrice: 0,
      searchContent: undefined,
      payment: 0,
      goodsId: '',
      goodsPhoto: '',
      addressId: '',
      addressList: [],
      deliverPrice: 0,
      totalPrice: 0,
      payPassword: '',
      payMethod: '',
      isConfirm: false,
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
      orderNote: '',
      transactionId: '',
      payOptions: [{
        value: 1,
        label: '虚拟货币支付'
      }, {
        value: 2,
        label: '二维码扫码支付'
      }, {
        value: 3,
        label: '线下支付'
      }],
      QRCodeUrl: '',
      senderId: '',
      uploadPayFile: [],
      orderId: '',
      rules: {
        address: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        payPassword: [
          { validator: verifyEmpty, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ],
        payMethod: [
          { validator: verifyEmpty, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    confirmOrder () {
      if (this.addressId === '') {
        this.$message.error('请选择发货地址！')
        return
      }
      if (this.isConfirm) {
        this.payFormVisible = true
        return
      }
      this.$axios.post('transaction/post_transaction/', this.$qs.stringify({
        mer_id: this.goodsId,
        rec_address_id: this.addressId
      })).then(response => {
        console.log(response.data)
        this.transactionId = response.data.transaction_id
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.isConfirm = true
          // this.$router.push('/order')
          this.payFormVisible = true
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    pay () {
      // console.log(this.payPassword)
      if (this.payPassword === '') {
        this.$message.error('请输入支付密码！')
        return
      }
      this.$axios.post('transaction/commit_transaction_virtual/', this.$qs.stringify({
        tra_id: this.transactionId,
        pay_password: this.payPassword
      })).then(response => {
        // console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/buyorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    cancel () {
      console.log('cancel')
      this.$store.commit('setToGoodsPage', this.goodsId)
      this.$router.push('/goods/goodsInfo')
      // this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsId}})
    },
    uploadPaySectionFile (param) {
      const uploadPayFileLength = this.uploadPayFile.length

      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadPayFile[uploadPayFileLength] = {'photo': file}
    },
    submitQRPay () {
      if (this.uploadPayFile.length === 0) {
        this.$message.error('请上传支付凭证！')
        return
      }
      let file = this.uploadPayFile[0].photo
      let photoForm = new FormData()
      photoForm.append('current_pay_prove ', file)
      photoForm.append('tra_id', this.transactionId)
      this.$axios({method: 'post',
        url: 'transaction/commit_transaction_QR_code_commit/',
        data: photoForm}).then(response => {
        if (response.data.status === '200') {
          this.payFormVisible = false
          this.$message.success(response.data.message)
          this.$router.push('/buyorder')
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    handleExceed () {
      this.$message.warning('最多只能上传一张相片！')
    },
    choosePayMethod () {
      if (this.payMethod === '') {
        this.$message.error('请选择支付方式！')
        return
      }
      if (this.payMethod < 3) {
        this.innerVisible = true
      } else {
        this.$axios.post('transaction/commit_transaction_face/', this.$qs.stringify({
          tra_id: this.orderId
        })).then(response => {
          if (response.data.status === '200') {
            this.$message.success(response.data.message)
            this.$router.push('/buyorder')
          } else {
            this.$message.info(response.data.message)
          }
        })
      }
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
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center no-repeat url("../assets/back7.jpg");
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

.mid-head {
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
}

.contents {
  display: block;
  margin-top: 50px;
}

.follow-contents {
  display: block;
  text-align: left;
  justify-content: left;
  margin-top: 50px;
}

.good-name {
  margin-top: 10px;
  display: flex;
  text-align: left;
  font-size: 20px;
  color: #000;
}

.good-price {
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  text-align: left;
  display: flex;
}

.good-deliverPrice {
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  text-align: left;
  display: flex;
}

.good-totalprice {
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  text-align: left;
  display: flex;
  color: red;
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
