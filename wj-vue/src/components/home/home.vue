<template>
  <el-container>
    2222
  </el-container>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    this.$axios.post('login0/get_recommend_list/').then(response => {
      console.log(response.data)
    })
  }
}
</script>

<style scoped>

</style>
