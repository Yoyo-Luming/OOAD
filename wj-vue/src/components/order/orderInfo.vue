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
            <el-container class="step-container">
              <div v-if="!hasProblem">
                <el-steps :active="active" :space="200" :align-center="true" finish-status="success" class="steps">
                  <el-step title="待付款" class="single-step"></el-step>
                  <el-step title="待发货" class="single-step"></el-step>
                  <el-step title="待收货" class="single-step"></el-step>
                  <el-step title="待评价" class="single-step"></el-step>
                  <el-step title="已完成" class="single-step"></el-step>
                </el-steps>
              </div>
              <div v-else style="display: block; margin: auto;">
                <div style="margin: auto;">订单异常！</div>
                <br>
                <div style="margin: auto;">问题类型：{{problemType}}</div>
                <br>
                <div style="margin: auto;">问题描述：{{problemDescription}}</div>
              </div>
            </el-container>
            <el-container class="user-container">
              <el-container class="line-one">
                <div class="task-place">商家：{{sender}}</div>
                <div class="task-place">发货地址：{{sendAddress}}</div>
                <div class="task-place">买家：{{receiver}}</div>
                <div class="task-place">收货地址：{{receiveAddress}}</div>
              </el-container>
            </el-container>
            <el-divider></el-divider>
            <el-container v-if="active > 0" class="pay-detail">
              <div class="task-place">支付方式：{{payInfo.payMethod}}</div>
              <div class="task-place" style="display: flex;align-items: center;" v-if="payInfo.payMethod==='二维码扫码支付'">
                <div>支付凭证：</div>
                <el-image alt="" :src="payInfo.payProveUrl" fit="fill" style="height: 200px;width: 200px;" :preview-src-list="srcList"></el-image>
              </div>
            </el-container>
            <el-divider></el-divider>
            <el-container class="whole-order">
              <el-container class="order-photo">
                <el-image :src="goodsPhoto" fit="fill" style="height: 100%;width: 100%;" :alt="goodsName"></el-image>
              </el-container>
              <el-container class="order-name">{{goodsName}}</el-container>
              <el-container class="order-price">商品价格：¥{{goodsPrice}}</el-container>
              <el-container class="order-price">邮费：¥{{postage}}</el-container>
              <el-container class="order-pay">
                <el-button class="last-button" v-on:click="toGoodsPage">查看详情</el-button>
                <br>
                <el-button class="last-button" v-on:click="toSellerPage">查看卖家</el-button>
              </el-container>
            </el-container>
            <el-divider></el-divider>
            <el-container class="order-result">
              <el-container class="true-payment">
                <div>实际付款：¥{{payment}}</div>
              </el-container>
              <el-container class="operation-buttons">
                <el-container class="operation-buttons-one">
                  <el-button type="primary" style="width: 200px" @click="callSender"><div v-if="currentUserIsSeller">联系买家</div><div v-else>联系卖家</div></el-button>
                  <el-button :disabled="!buyButton" type="primary" style="width: 200px" @click="payFormVisible=true">付款</el-button>
                  <el-button :disabled="!cancelButton" type="primary" style="width: 200px" @click="cancel">取消订单</el-button>
                  <el-button :disabled="!commentButton" type="primary" style="width: 200px" @click="commentVisible=true">评价</el-button>
                </el-container>
                <el-container class="operation-buttons-two">
                  <el-button :disabled="!sendButton" type="primary" style="width: 200px" @click="confirmSend">确认发货</el-button>
                  <el-button :disabled="!receiveButton" type="primary" style="width: 200px" @click="confirmReceive">确认收货</el-button>
                  <el-button :disabled="!hasTask" type="primary" style="width: 200px" @click="goTaskPage">关联跑腿任务</el-button>
                  <div v-if="isHandleProblem">
                    <el-button type="primary" style="width: 200px" @click="handleProblemVisible=true">申诉处理</el-button>
                  </div>
                  <div v-else>
                    <el-button type="primary" style="width: 200px" @click="problemFromVisible=true">订单申诉</el-button>
                  </div>
                </el-container>
              </el-container>
              <el-divider></el-divider>
              <el-container class="additional-button" v-if="isAdmin && hasProblem">
                <el-button class="last-button" @click="handleProblemVisible=true">处理申诉</el-button>
              </el-container>
            </el-container>
          </el-container>
        </el-container>
        <el-dialog title="评价" :visible.sync="commentVisible" center>
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item class="form-item-class" label="商品评价：" prop="comment1">
              <el-rate style="align-items: center" v-model="comment1"></el-rate>
            </el-form-item>
            <el-form-item class="form-item-class" label="服务评价：" prop="comment2">
              <el-rate style="align-items: center" v-model="comment2"></el-rate>
            </el-form-item>
            <el-form-item class="form-item-class" label="运输评价：" prop="comment3">
              <el-rate style="align-items: center" v-model="comment3"></el-rate>
            </el-form-item>
            <el-form-item class="form-item-class" label="评论：" prop="commentText">
              <el-input style="align-items: center" v-model="commentText"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="commentVisible=false">取消</el-button>
            <el-button type="primary" @click="submitComment">提交评价</el-button>
          </div>
        </el-dialog>
        <el-dialog style="margin: auto;" :visible.sync="handleProblemVisible" :modal-append-to-body="false">
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item label="回复:" prop="superuserLog">
              <el-input v-model="handleProblemForm.superuserLog"></el-input>
            </el-form-item>
            <el-form-item label="问题方:" prop="problemRole">
              <el-radio v-model="handleProblemForm.problemRole" label="1">买方</el-radio>
              <el-radio v-model="handleProblemForm.problemRole" label="2">卖方</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleProblemVisible=false">取消</el-button>
            <el-button type="primary" @click="handleProblem">确认</el-button>
          </div>
        </el-dialog>
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
                <el-button type="primary" @click="buy">确认支付</el-button>
              </div>
            </div>
            <div v-else-if="payMethod===2">
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
            <el-form-item label="请选择支付方式:" prop="payMethod">
              <el-select v-model="payMethod">
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
        <el-dialog style="margin: auto;" :visible.sync="problemFromVisible" :modal-append-to-body="false">
          <el-form ref="form" label-width="200px" :rules="rules">
            <el-form-item class="form-item-class" label="问题类型：" prop="problemType">
              <el-select v-model="problemForm.problemType">
                <el-option
                  v-for="item in problemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-item-class" label="问题描述：" prop="description">
              <el-input v-model="problemForm.problemDescription"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="problemFromVisible=false">取消</el-button>
            <el-button @click="submitProblem">确定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>
<!--查看商品、查看卖家、联系卖家、取消订单、待付款可以跳转付款页面，待评价可以跳转评价页面。-->
<script>
export default {
  inject: ['reload'],
  name: 'orderInfo',
  data () {
    const verifyEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项不能为空'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      sender: 'z3',
      senderId: '',
      sendAddress: '荔园',
      receiver: 'l4',
      receiverId: '',
      receiveAddress: '15栋',
      url: '',
      goodsName: 'book',
      goodsPrice: '2',
      postage: '2',
      goodsId: '',
      payment: '4',
      goodsPhoto: '',
      searchContent: undefined,
      info: {},
      buyButton: false,
      cancelButton: false,
      commentButton: false,
      sendButton: false,
      receiveButton: false,
      commentText: '',
      comment1: '',
      comment2: '',
      comment3: '',
      commentVisible: false,
      payFormVisible: false,
      problemFromVisible: false,
      orderId: '',
      payPassword: '',
      currentUserIsSeller: false,
      hasTask: false,
      hasProblem: false,
      problemId: '',
      problemDescription: '',
      problemType: '',
      orderComment: '',
      QRCodeUrl: '',
      problemForm: {
        problemDescription: '',
        problemType: ''
      },
      problemOptions: [{
        value: 1,
        label: '申请退款'
      }, {
        value: 2,
        label: '线下交易冲突'
      }, {
        value: 3,
        label: '二维码未收款'
      }, {
        value: 4,
        label: '恶意未发货'
      }, {
        value: 5,
        label: '恶意评价'
      }, {
        value: 6,
        label: '其他'
      }],
      problemTypes: [
        '申请退款',
        '线下交易冲突',
        '二维码未收款',
        '恶意未发货',
        '恶意评价',
        '其他'
      ],
      payMethod: '',
      innerVisible: false,
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
      payTypes: [
        '线下支付',
        '二维码扫码支付',
        '虚拟货币支付'
      ],
      isAdmin: true,
      handleProblemVisible: false,
      isHandleProblem: false,
      handleProblemForm: {
        superuserLog: '',
        problemRole: ''
      },
      srcList: [],
      uploadPayFile: [],
      payInfo: {
        payMethod: '',
        payProveUrl: ''
      },
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
      rules: {
        commentText: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        comment1: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        comment2: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        comment3: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        superuserLog: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        problemRole: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        payPassword: [
          { validator: verifyEmpty, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ],
        payMethod: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        problemType: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        description: [
          { validator: verifyEmpty, trigger: 'blur' }
        ]
      }
    }
  },
  destroyed () {
    this.$store.commit('setToOrderPage', {orderDetail: this.$store.state.toOrderPage.orderDetail, from: ''})
  },
  mounted () {
    // TEST
    // this.$store.commit('setUserStatus', 2)
    if (this.$store.state.toOrderPage.from === 'handleProblem' && this.$store.state.userStatus === 3) {
      this.isHandleProblem = true
    }
    this.info = this.$store.state.toOrderPage.orderDetail
    this.$axios.post('commodity/commodity_detail/', this.$qs.stringify({
      mer_id: this.info.merchandise_id
    })).then(response => {
      this.goodsPhoto = response.data.mer_image1_url
    })
    this.orderId = this.info.transaction_id
    // alert(this.buyButton)
    console.log(this.info.transaction_status)
    this.active = this.info.transaction_status - 1
    this.sender = this.info.transaction_sender_name
    this.senderId = this.info.transaction_sender_id
    this.receiver = this.info.transaction_receiver_name
    this.receiverId = this.info.transaction_receiver_id
    this.goodsName = this.info.merchandise_info.mer_name
    this.goodsPrice = this.info.merchandise_info.mer_price
    this.postage = this.info.merchandise_info.deliver_price
    // this.goodsPhoto = this.info.merchandise_info.mer_img_url
    this.payment = this.postage + this.goodsPrice
    this.orderComment = this.info.transaction_comment
    this.currentUserIsSeller = (this.sender === this.$store.state.userName)
    this.hasTask = this.info.has_task
    this.hasProblem = this.info.has_problem
    if (this.hasProblem) {
      this.problemDescription = this.info.problem_description
      this.problemId = this.info.problem_id
      this.problemType = this.problemTypes[this.info.problem_type]
    }
    // console.log(this.hasTask)
    console.log('senderName:' + this.sender)
    console.log('currentUser:' + this.$store.state.userName)
    if (this.info.transaction_status === 1 && !this.currentUserIsSeller) {
      this.buyButton = true
    }
    if (this.info.transaction_status === 2 && this.currentUserIsSeller) {
      this.sendButton = true
    }
    if (this.info.transaction_status <= 1 && !this.currentUserIsSeller) {
      this.cancelButton = true
    }
    if (this.info.transaction_status === 3 && !this.currentUserIsSeller) {
      this.receiveButton = true
    }
    if (this.info.transaction_status === 4 && !this.currentUserIsSeller) {
      this.commentButton = true
    }
    // this.commentButton = true
    this.isAdmin = (this.$store.state.userStatus === 3)
    this.$axios.post('login0/get_QR_Code/', this.$qs.stringify({
      user_id: this.senderId
    })).then(response => {
      console.log('QRCodeUrl')
      console.log(response.data)
      this.QRCodeUrl = response.data.QR_code_url[0]
    })
    this.payInfo.payMethod = this.payTypes[this.info.pay_method - 1]
    this.payInfo.payProveUrl = this.info.pay_prove
    this.srcList.push(this.info.pay_prove)
    console.log(this.payInfo.payProveUrl)
    this.sendAddress = this.regionList[this.info.sender_location.user_region] + ' ' + this.info.sender_location.user_addr
    this.receiveAddress = this.regionList[this.info.receiver_location.user_region] + ' ' + this.info.receiver_location.user_addr
    this.goodsId = this.info.merchandise_id
  },
  methods: {
    toGoodsPage () {
      this.$store.commit('setToGoodsPage', this.goodsId)
      this.$router.push('/goods/goodsInfo')
      // this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsId}})
    },
    toSellerPage () {
      // alert('tosellerPage!')
      this.$store.commit('setToUserPage', this.senderId)
      this.$router.push('/user/userInfo')
      // this.$router.push({name: 'userInfo', params: {userId: this.senderId}})
    },
    callSender () {
      let chatName = ''
      let chatId = ''
      if (this.currentUserIsSeller) {
        chatName = this.receiver
        chatId = this.receiverId
      } else {
        chatName = this.sender
        chatId = this.senderId
      }
      this.$axios.post('dialogue/start_dialogue/', this.$qs.stringify({
        business_id: chatId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200' || response.data.status === '201') {
          this.$store.commit('setToChatPage', {name: chatName, id: chatId, dialogueId: response.data.dialogue_id})
          this.$router.push('/chatPage')
          // this.$router.push({name: 'chatPage', params: {name: chatName, id: chatId, dialogueId: response.data.dialogue_id}})
        }
      })
    },
    buy () {
      if (this.payPassword === '') {
        this.$message.error('请输入支付密码！')
        return
      }
      this.$axios.post('transaction/commit_transaction_virtual/', this.$qs.stringify({
        tra_id: this.orderId,
        pay_password: this.payPassword
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/buyorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    confirmSend () {
      this.$axios.post('transaction/already_send_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId
      })).then(response => {
        // this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/sellorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    confirmReceive () {
      this.$axios.post('transaction/already_receive_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId
      })).then(response => {
        // this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/buyorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    cancel () {
      this.$axios.post('transaction/cancel_transaction/', this.$qs.stringify({
        tra_id: this.orderId
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.$router.push('/buyorder')
        } else {
          this.$message.error(response.data.message)
        }
      })
      // console.log('cancel')
    },
    submitComment () {
      if (this.commentText === '') {
        this.$message.error('请输入评价！')
        return
      }
      this.$axios.post('transaction/comment_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId,
        comment_content: this.commentText,
        comment_level_mer: this.comment1,
        comment_level_attitude: this.comment2,
        comment_level_tra: this.comment3
      })).then(response => {
        this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.$router.push('/buyorder')
        }
        console.log(response.data)
      })
    },
    goTaskPage () {
      let taskDetail = ''
      this.$axios.post('task/transaction_relation_task/', this.$qs.stringify({
        tra_id: this.orderId
      })).then(response => {
        console.log(response.data)
        taskDetail = response.data.rela_task
        this.$store.commit('setToTaskPage', taskDetail)
        this.$router.push('/taskInfo')
        // this.$router.push({name: 'taskInfo', params: {detail: taskDetail}})
      })
    },
    submitProblem () {
      if (this.problemForm.problemDescription === '') {
        this.$message.error('请输入问题描述！')
        return
      }
      console.log('problem')
      if (this.problemForm.problemType === '') {
        this.$message.error('请输入问题类型！')
        return
      }
      console.log(this.problemForm.problemType)
      this.$axios.post('transaction/transaction_has_problem/', this.$qs.stringify({
        current_tra_id: this.orderId,
        problem_description: this.problemForm.problemDescription,
        problem_type: this.problemForm.problemType
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.problemFromVisible = false
          this.$message.success(response.data.message)
          this.reload()
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    handleProblem () {
      if (this.handleProblemForm.superuserLog === '') {
        this.$message.error('请输入问题处理回复！')
        return
      }
      if (this.handleProblemForm.problemRole === '') {
        this.$message.error('请选择问题方！')
        return
      }
      // console.log()
      this.$axios.post('supermanager/handle_problem/', this.$qs.stringify({
        superuser_log: this.handleProblemForm.superuserLog,
        problem_id: this.problemId,
        problem_role: this.handleProblemForm.problemRole
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.handleProblemVisible = false
          this.$message.success(response.data.message)
          this.$router.push('handleproblem')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    handleExceed () {
      this.$message.warning('最多只能上传一张相片！')
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
        this.$message.warning('请上传支付凭证！')
        return
      }
      let file = this.uploadPayFile[0].photo
      let photoForm = new FormData()
      photoForm.append('current_pay_prove ', file)
      photoForm.append('tra_id', this.orderId)
      this.$axios({method: 'post',
        url: 'transaction/commit_transaction_QR_code_commit/',
        data: photoForm}).then(response => {
        if (response.data.status === '200') {
          this.payFormVisible = false
          this.$message.success(response.data.message)
          this.uploadPayFile = []
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    choosePayMethod () {
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
    goNoticePage () {
      this.$router.push('/notice')
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
  width: 90%;
}

.pane-content {
  display: block;
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

.step-container {
  display: block;
  align-items: center;
  text-align: center;
}

.steps {
  margin: 20px 20px 20px 20px;
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #cac6c6;
}

.single-step {
  margin: 0;
}

.user-container {
  width: 60%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.line-one {
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}

.task-place {
  margin-top: 30px;
  font-size: 16px;
  color: #000000;
}

.order-result {
  display: block;
}

.true-payment {
  display: block;
  text-align: center;
  align-items: center;
  color: #ff006e;
}

.operation-buttons {
  display: block;
  margin-top: 50px;
  margin-bottom: 50px;
}

.operation-buttons-one {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
}

.operation-buttons-two {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
}

.whole-order {
  display: flex;
  justify-content: space-evenly;
}

.order-photo {
  height: 150px;
  width: 150px;
  margin: 10px 10px 10px 10px;
  justify-content: space-evenly;
}

.order-name {
  width: 150px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-price {
  width: 150px;
  font-size: 20px;
  color: #ff006e;
  align-items: center;
  justify-content: space-evenly;
}

.order-pay {
  width: 150px;
  display: block;
  align-items: center;
  justify-content: space-evenly;
}

.last-button {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
  margin-top: 30px;
  align-items: center;
  justify-content: space-evenly;
}

.form-item-class {
  align-items: center;
}

.dialog-footer {
  text-align: right;
}

.additional-button {
  display: block;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-evenly;
}

.pay-detail {
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  justify-content: space-evenly;
}
</style>
