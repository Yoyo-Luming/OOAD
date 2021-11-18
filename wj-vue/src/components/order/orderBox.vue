<template>
  <el-row>
      <el-card :body-style="{ padding: '0px' }">
        <img :src="photo" class="image">
        <div style="padding: 14px;">
          <span>商品名称:{{goodsName}}</span>
          <div class="bottom clearfix">
            实付款:{{price}}
            <el-button type="text" class="button" @click="toOrderPage">订单详情</el-button>
<!--            <router-link to="/orderInfo">查看订单详情</router-link>-->
          </div>
        </div>
      </el-card>
  </el-row>
</template>

<script>
export default {
  name: 'orderBox',
  props: {
    goodsName: String,
    price: String,
    photo: String,
    orderId: String,
    detail: Array
  },
  data () {
    return {

    }
  },
  methods: {
    toOrderPage () {
      console.log(this.detail)
      this.$router.push({name: 'orderInfo', params: {orderDetail: this.detail}})
    }
  }
}
</script>

<style scoped>

</style>
