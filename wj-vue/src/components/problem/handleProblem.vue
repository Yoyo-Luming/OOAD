<template>
  <el-container>
    <problem-box v-for="(item, index) of problemList" :key="index+Math.random()" :orderUrl="item.orderUrl" :problemType="item.problemType" :problemDescription="item.problemDescription" :detail="item.detail" ></problem-box>
  </el-container>
</template>

<script>
import problemBox from './problemBox'
export default {
  name: 'handleProblem',
  components: {problemBox},
  data () {
    return {
      problemList: [],
      problemTypes: [
        '申请退款',
        '线下交易冲突',
        '二维码未收款',
        '恶意未发货',
        '其他'
      ]
    }
  },
  mounted () {
    // TODO 获取问题订单列表
    this.$axios.post('/supermanager/problems_list/').then(response => {
      let len = response.data.return_list.length
      let list = response.data.return_list
      for (let i = 0; i < len; ++i) {
        this.problemList.push({
          problemId: list[i].problem_id,
          orderUrl: list[i].problem_transaction.merchandise_info.mer_img_url,
          problemDescription: list[i].problem_description,
          problemType: this.problemTypes[list[i].problem_type],
          detail: list[i].problem_transaction
        })
      }
      console.log(response.data)
    })
  }
}
</script>

<style scoped>

</style>
