<template>
  <div>111</div>
</template>

<script>
export default {
  name: 'handleProblem',
  mounted () {
    // TODO 获取问题订单列表
    this.$axios.post('/supermanager/problems_list/').then(response => {
      console.log(response.data)
    })
  }
}
</script>

<style scoped>

</style>
