<template>
  <el-container>
    <el-row>
      <el-col>
        <el-steps :active="active" :space="200" finish-status="success" v-if="!hasProblem">
          <el-step title="待付款"></el-step>
          <el-step title="待发货"></el-step>
          <el-step title="待收货"></el-step>
          <el-step title="待评价"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
        <div v-else>
          订单异常
          问题类型：{{problemType}}
          问题描述：{{problemDescription}}
        </div>
      </el-col>
      <el-col>
        <el-divider></el-divider>
      </el-col>
      <el-col>
        发货人：{{sender}}
        <br/>
        发货地址：{{sendAddress}}
      </el-col>
      <el-col>
        <el-divider></el-divider>
      </el-col>
      <el-col>
        收货人：{{receiver}}
        <br/>
        收货地址：{{receiveAddress}}
      </el-col>
      <el-col>
        <el-divider></el-divider>
      </el-col>
      <el-col>
        <img :src="url">
        <br/>
        商品图片：<img :src="goodsPhoto"><br/>
        商品名称：{{goodsName}}<br/>
        商品价格：{{goodsPrice}}<br/>
        邮费: {{postage}}<br/>
        <el-button type="text" class="button" @click="toGoodsPage">查看商品</el-button>
        <el-button type="text" class="button" @click="toSellerPage">查看卖家</el-button>
      </el-col>
      <el-col>
        <el-divider></el-divider>
      </el-col>

      <el-col>
        实际付款：{{payment}}<br/>
        <el-button type="text" class="button" @click="callSender"><div v-if="currentUserIsSeller">联系买家</div><div v-else>联系卖家</div></el-button>
        <el-button v-if="buyButton" type="text" class="button" @click="payFormVisible=true">付款</el-button>
        <el-button v-if="cancelButton" type="text" class="button" @click="cancel">取消订单</el-button>
        <el-button v-if="commentButton" type="text" class="button" @click="commentVisible=true">评价</el-button>
<!--        <el-button @click="buyButton=true">TEST</el-button>-->
        <el-button v-if="sendButton" @click="confirmSend">确认发货</el-button>
        <el-button v-if="receiveButton" @click="confirmReceive">确认收货</el-button>
      </el-col>
      <el-col>
        <el-button @click="problemFromVisible=true">
          订单申诉
        </el-button>
      </el-col>
      <div v-if="hasTask">
        <el-col>
          <el-button @click="goTaskPage">查看关联跑腿任务</el-button>
        </el-col>
      </div>
      <el-container v-if="isAdmin && hasProblem">
        <el-button @click="handleProblemVisible=true">处理申诉</el-button>
        <el-dialog :visible="handleProblemVisible">
          回复<el-input v-model="handleProblemForm.superuserLog"></el-input>
          问题方
          <el-radio v-model="handleProblemForm.problemRole" label="1">买方</el-radio>
          <el-radio v-model="handleProblemForm.problemRole" label="2">卖方</el-radio>
          <el-button @click="handleProblemVisible=false">取消</el-button>
          <el-button @click="handleProblem">提交</el-button>
        </el-dialog>
      </el-container>
    </el-row>
    <el-dialog title="评价" :visible.sync="commentVisible" center>
      商品评价：<el-rate v-model="comment1"></el-rate>
      服务评价：<el-rate v-model="comment2"></el-rate>
      运输评价：<el-rate v-model="comment3"></el-rate>
      评论：<el-input v-model="commentText"></el-input>
      <el-button @click="submitComment">提交评价</el-button>
    </el-dialog>
    <el-dialog :visible.sync="payFormVisible">
      <el-dialog :visible.sync="innerVisible">
        <div v-if="payMethod===1">
          支付密码:<el-input v-model="payPassword"></el-input>
          <el-button @click="payFormVisible=false">取消</el-button>
          <el-button @click="buy">确认</el-button>
        </div>
        <div v-else-if="payMethod===2"><img :src="QRCodeUrl"></div>
        <div v-else>3</div>
      </el-dialog>
      请选择支付方式
      <el-select v-model="payMethod">
        <el-option
          v-for="item in payOptions"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button @click="innerVisible=true">确定</el-button>
    </el-dialog>
    <el-dialog :visible.sync="problemFromVisible">
      问题类型<el-select v-model="problemForm.problemType">
        <el-option
          v-for="item in problemOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      问题描述<el-input v-model="problemForm.problemDescription">
      </el-input>
      <el-button @click="payFormVisible=false">取消</el-button>
      <el-button @click="submitProblem">确定</el-button>
    </el-dialog>
  </el-container>
</template>
<!--查看商品、查看卖家、联系卖家、取消订单、待付款可以跳转付款页面，待评价可以跳转评价页面。-->
<script>
export default {
  name: 'orderInfo',
  data () {
    return {
      active: 2,
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
        label: '其他'
      }],
      problemTypes: [
        '申请退款',
        '线下交易冲突',
        '二维码未收款',
        '恶意未发货',
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
      isAdmin: true,
      handleProblemVisible: false,
      handleProblemForm: {
        superuserLog: '',
        problemRole: ''
      }
    }
  },
  mounted () {
    // this.buyButton = true
    this.commentButton = true
    // console.log(this.buyButton)
    console.log('---------------------')
    console.log(this.$route.params.orderDetail)
    this.info = this.$route.params.orderDetail
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
    this.goodsPhoto = this.info.merchandise_info.mer_img_url
    this.payment = this.postage + this.goodsPrice
    this.orderComment = this.info.transaction_comment
    this.currentUserIsSeller = (this.sender === this.$global.userName)
    this.hasTask = this.info.has_task
    this.hasProblem = this.info.has_problem
    if (this.hasProblem) {
      this.problemDescription = this.info.problem_description
      this.problemId = this.info.problem_id
      this.problemType = this.problemTypes[this.info.problem_type]
    }
    // console.log(this.hasTask)
    console.log('senderName:' + this.sender)
    console.log('currentUser:' + this.$global.userName)
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
    if (this.info.transaction_status === 4) {
      this.commentButton = true
    }
    this.isAdmin = (this.$global.userState === 3)
    // TODO 获取二维码
  },
  methods: {
    toGoodsPage () {
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsId}})
    },
    toSellerPage () {
      // alert('tosellerPage!')
      this.$router.push({name: 'userInfo', params: {userId: this.senderId}})
    },
    callSender () {
      alert('callSender!')
      this.$axios.post('dialogue/start_dialogue/', this.$qs.stringify({
        business_id: this.senderId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200' || response.data.status === '201') {
          let chatName = ''
          let chatId = ''
          if (this.currentUserIsSeller) {
            chatName = this.receiver
            chatId = this.receiverId
          } else {
            chatName = this.sender
            chatId = this.senderId
          }
          this.$router.push({name: 'chatPage', params: {name: chatName, id: chatId, dialogueId: response.data.dialogue_id}})
        }
      })
    },
    buy () {
      this.$axios.post('transaction/commit_transaction_virtual/', this.$qs.stringify({
        tra_id: this.orderId,
        pay_password: this.payPassword
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$router.push('/buyorder')
        }
      })
    },
    confirmSend () {
      this.$axios.post('transaction/already_send_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    confirmReceive () {
      this.$axios.post('transaction/already_receive_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    cancel () {
      this.$axios.post('transaction/cancel_transaction/', this.$qs.stringify({
        tra_id: this.orderId
      })).then(response => {
        this.$message.info(response.data.message)
        this.$router.push('/buyorder')
      })
      // console.log('cancel')
    },
    submitComment () {
      this.$axios.post('transaction/comment_transaction/', this.$qs.stringify({
        current_tra_id: this.orderId,
        comment_content: this.commentText,
        comment_level_mer: this.comment1,
        comment_level_attitude: this.comment2,
        comment_level_tra: this.comment3
      })).then(response => {
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
        this.$router.push({name: 'taskInfo', params: {detail: taskDetail}})
      })
    },
    submitProblem () {
      this.$axios.post('transaction/transaction_has_problem/', this.$qs.stringify({
        current_tra_id: this.orderId,
        problem_description: this.problemForm.problemDescription,
        problem_type: this.problemForm.problemType
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.problemFromVisible = false
          this.$message.success(response.data.message)
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    handleProblem () {
      this.$axios.post('supermanager/handle_problem/', this.$qs.stringify({
        superuser_log: this.handleProblemForm.superuserLog,
        problem_id: this.problemId,
        problem_role: this.handleProblemForm.problemRole
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.handleProblemVisible = false
          this.$message.success(response.data.message)
        } else {
          this.$message.info(response.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
