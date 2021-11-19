<template>
  <div>
    <img :src="orderUrl" alt="">
    问题类型： {{problemType}}
    问题描述：{{problemDescription}}
    <el-button @click="goOrderPage">订单详情</el-button>
  </div>
</template>

<script>
export default {
  name: 'problemBox',
  props: {
    problemId: String,
    orderUrl: String,
    problemType: String,
    problemDescription: String,
    detail: []
  },
  data () {
    return {
    }
  },
  methods: {
    goOrderPage () {
      this.$router.push({name: 'orderInfo', params: {orderDetail: this.detail}})
    }
  }
}
</script>

<style scoped>

</style>
