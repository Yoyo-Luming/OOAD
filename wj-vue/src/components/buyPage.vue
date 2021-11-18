<template>
  <el-container>
    商品名称：{{goodsName}}
    商品价格：{{goodsPrice}}
    邮费：{{deliverPrice}}
    实付款：{{totalPrice}}
    商品图片：<img :src="goodsPhoto">
    选择收货地址：<el-select v-model="addressId" placeholder="请选择">
      <el-option
        v-for="item in addressList"
        :label="item.name + item.region+item.address+item.phone"
        :key="item.id"
        :value="item.id"
        >
      </el-option>
    </el-select>
    <el-button @click="cancel">取消</el-button>
    <el-button @click="confirmOrder">确认订单</el-button>
    <el-dialog :visible="dialogFormVisible">
      <el-dialog :visible.sync="innerVisible">
        <div v-if="payMethod===1">
          支付密码:<el-input v-model="payPassword"></el-input>
          <el-button @click="dialogFormVisible=false">取消</el-button>
          <el-button @click="pay">确认</el-button>
        </div>
        <div v-else-if="payMethod===2">2</div>
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
  </el-container>
</template>

<script>
export default {
  name: 'buyPage',
  mounted () {
    this.goodsName = this.$route.params.goodsName
    // this.goodsPrice = this.$route.params.goodsPrice
    this.goodsPhoto = this.$route.params.goodsPhoto
    this.goodsId = this.$route.params.goodsId
    this.$axios.post('/commodity/commodity_detail/', this.$qs.stringify({
      mer_id: this.goodsId
    })).then(response => {
      console.log(response.data)
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
      this.deliverPrice = response.data.mer_deliver_price
      this.goodsPrice = response.data.mer_price
      this.totalPrice = this.deliverPrice + this.goodsPrice
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
  data () {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      goodsName: '',
      goodsPrice: 0,
      payment: 0,
      goodsId: '',
      goodsPhoto: 0,
      addressId: '',
      addressList: [],
      deliverPrice: 0,
      totalPrice: 0,
      payPassword: '',
      payMethod: '',
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
      }]
    }
  },
  methods: {
    confirmOrder () {
      console.log(this.goodsId)
      this.$axios.post('transaction/post_transaction/', this.$qs.stringify({
        mer_id: this.goodsId,
        rec_address_id: this.addressId
      })).then(response => {
        console.log(response.data)
        this.transactionId = response.data.transaction_id
        if (response.data.status === '200') {
          // this.$router.push('/order')
          this.dialogFormVisible = true
        }
      })
    },
    pay () {
      // console.log(this.payPassword)
      this.$axios.post('transaction/commit_transaction_virtual/', this.$qs.stringify({
        tra_id: this.transactionId,
        pay_password: this.payPassword
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$router.push('/buyorder')
        }
      })
    },
    cancel () {
      console.log('cancel')
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsId}})
    }
  }
}
</script>

<style scoped>

</style>
