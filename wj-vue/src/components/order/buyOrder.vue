<template>
  <el-tabs>
    <el-tab-pane label="待付款"><order-box v-for="(item, index) of payList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待发货"><order-box v-for="(item, index) of shipList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待收货"><order-box v-for="(item, index) of receiveList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待评价"><order-box v-for="(item, index) of evaluateList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="已完成"><order-box v-for="(item, index) of completeList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
<!--    <el-tab-pane label="待付款" name="pay">1<orderbox v-for="(item, index) of payList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo"></orderbox></el-tab-pane>-->
<!--    <el-tab-pane label="待发货" name="ship">2<orderbox v-for="(item, index) of shipList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo"></orderbox></el-tab-pane>-->
<!--    <el-tab-pane label="待收货" name="receive">3<orderbox v-for="(item, index) of receiveList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo"></orderbox></el-tab-pane>-->
<!--    <el-tab-pane label="待评价" name="evaluate">4<orderbox v-for="(item, index) of evaluateList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo"></orderbox></el-tab-pane>-->
<!--    <el-tab-pane label="已完成" name="complete">5<orderbox v-for="(item, index) of completeList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo"></orderbox></el-tab-pane>-->
  </el-tabs>
</template>

<script>
import orderBox from './orderBox'

export default {
  name: 'buyOrder',
  components: {orderBox},
  mounted () {
    /*
    create_time: "23:05:39.273897"
    merchandise_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    merchandise_info: Object
      allow_face_trade: true
      as_favorite_number: 0
      browse_number: 1
      deliver_price: 111
      favourite_number: 0
      mer_description: "22333"
      mer_id: "OA:1mmep0:Dhl2-zWhaMTgw1jwZvBYCvPSqlXEjRmTgL3lN_JoU00"
      mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjgsImRhdGUiOiIyMDIxLTExLTE2IDAwOjI3OjA2LjY4ODc5MSIsInBhdGgiOiJcXG1udFxcY1xccHljaGFybVxcT09BRFxcRmluYWxfcHJvamVjdFxcRmluYWxfUHJvamVjdDFcXGltYWdlU3RvcmVcXHVzZXJfNnVzZXJfNl90aHVtYnVwbG9hZF9tZXJjaGFuZGlzZV8yX3RpbWVfMjAyMS0xMS0xNV8yMzEwNTIuMDM2MjIyX3RodW1iLnBuZyJ9:1mmep0:sYZ4HxrxIYbM16hlrZSQCbzQAYBrdJvipr3sxTG-U9A"
      mer_name: "phone13"
      mer_price: 12
      mer_upload_user_id: "Ng:1mmep0:VPRKecIWoHuD79cNiekeCSCik0HIaE6wKW3bbTn42e8"
      mer_upload_user_name: "oy2"
    merchandise_name: "bookm1"
    merchandise_price: 1999
    receiver_location: Object
      addr_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      is_default: false
      user_addr: "102"
      user_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      user_name: "欧阳"
      user_region: 1
    sender_location: Object
      addr_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      is_default: false
      user_addr: "102"
      user_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
      user_name: "欧阳"
      user_region: 1
    transaction_id: "NQ:1mjkrZ:1IGO9RCfvEFxCQHGXqMsR28hZRqzUVxwj28SdIPjxN0"
    transaction_price: 2000
    transaction_receiver_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    transaction_receiver_name: "oy"
    transaction_sender_id: "MQ:1mjkra:udLHa48bXbNoHKGWmUlhJOUQN8pl-eujp-oC0qFTQqo"
    transaction_sender_name: "oy"
    transaction_status: 2 */
    this.$axios.post('login0/wait_payment_fuc/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.payList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/wait_deliver/').then(response => {
      console.log('-----------')
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.shipList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/wait_receiving_fuc/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.receiveList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          orderDetail: orderList[i]
        })
      }
      console.log(len)
    })
    this.$axios.post('login0/wait_comment_fuc/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.evaluateList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          orderDetail: orderList[i]
        })
      }
    })
    this.$axios.post('login0/success_fuc/').then(response => {
      console.log(response.data.return_transaction)
      let len = response.data.return_transaction.length
      let orderList = response.data.return_transaction
      for (let i = 0; i < len; ++i) {
        this.completeList.push({
          goodsName: orderList[i].merchandise_name,
          price: orderList[i].transaction_price,
          photo: orderList[i].merchandise_info.mer_img_url,
          orderDetail: orderList[i]
        })
      }
    })
  },
  data () {
    return {
      payList: [{
        goodsName: '汉堡1',
        price: 1,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      shipList: [{
        goodsName: '汉堡2',
        price: 2,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      receiveList: [{
        goodsName: '汉堡3',
        price: 3,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      evaluateList: [{
        goodsName: '汉堡4',
        price: 4,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }],
      completeList: [{
        goodsName: '汉堡5',
        price: 5,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        orderDetail: []
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
