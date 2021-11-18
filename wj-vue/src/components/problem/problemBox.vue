<template>
  <el-container>
    <img :src="orderUrl">
    问题类型： {{}}
    问题描述：{{}}
    <el-button @click="goOrderPage">订单详情</el-button>
  </el-container>
</template>

<script>
export default {
  name: 'problemBox',
  props: {
    problemId: String
  },
  data () {
    return {
    }
  },
  methods: {
    goOrderPage () {
      let detail = []
      this.$router.push({name: 'orderInfo', params: {orderDetail: detail}})
    }
  }
}
</script>

<style scoped>

</style>
