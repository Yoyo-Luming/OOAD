<template>
  <el-tabs>
    <el-tab-pane label="待付款"><order-box v-for="(item, index) of payList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待发货"><order-box v-for="(item, index) of shipList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待收货"><order-box v-for="(item, index) of receiveList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="待评价"><order-box v-for="(item, index) of evaluateList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
    <el-tab-pane label="已完成"><order-box v-for="(item, index) of completeList" :key="index+Math.random()" :goodsName="item.goodsName" :price="item.price" :photo="item.photo" :detail="item.orderDetail"></order-box></el-tab-pane>
  </el-tabs>
</template>

<script>
import orderBox from './orderBox'

export default {
  name: 'sellOrder',
  components: {orderBox},
  mounted () {
    this.$axios.post('login0/wait_payment_fuc_seller/').then(response => {
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
    this.$axios.post('login0/wait_deliver_fuc_seller/').then(response => {
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
    this.$axios.post('login0/wait_receiving_fuc_seller/').then(response => {
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
    this.$axios.post('login0/wait_comment_fuc_seller/').then(response => {
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
    this.$axios.post('login0/success_fuc_seller/').then(response => {
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
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }],
      shipList: [{
        goodsName: '汉堡2',
        price: 2,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }],
      receiveList: [{
        goodsName: '汉堡3',
        price: 3,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }],
      evaluateList: [{
        goodsName: '汉堡4',
        price: 4,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }],
      completeList: [{
        goodsName: '汉堡5',
        price: 5,
        photo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
