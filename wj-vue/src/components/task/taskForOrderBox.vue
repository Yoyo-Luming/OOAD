<template>
  <el-row>
    <el-card :body-style="{ padding: '0px' }">
      <img :src="photo" class="image">
      <div style="padding: 14px;">
        <span>商品名称:{{goodsName}}</span>
        <span>发货地址:{{sendAddress}}</span>
        <span>收货地址:{{receiveAddress}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="toOrderPage">订单详情</el-button>
          <el-button type="text" class="button" @click="orderTaskVisible=true">发布任务</el-button>
          <!--            <router-link to="/orderInfo">查看订单详情</router-link>-->
        </div>
      </div>
    </el-card>
    <el-dialog :visible.sync="orderTaskVisible">
      <el-form :model="orderTaskForm">
        <el-form-item label="任务名称">
          <el-input v-model="orderTaskForm.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="orderTaskForm.price"></el-input>
        </el-form-item>
        <el-form-item label="最晚取货时间">
          <el-date-picker v-model="orderTaskForm.ddlTime" type="datetime" placeholder="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionLater" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="orderTaskForm.description"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="orderTaskForm=false">取消</el-button>
      <el-button @click="postTaskOrder">发布跑腿任务</el-button>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'taskForOrderBox',
  props: {
    goodsName: String,
    photo: String,
    sendAddress: String,
    receiveAddress: String,
    orderId: String,
    detail: Array
  },
  data () {
    return {
      orderTaskVisible: false,
      orderTaskForm: {
        name: '',
        price: '',
        ddlTime: '',
        description: ''
      }
    }
  },
  methods: {
    toOrderPage () {
      console.log(this.detail)
      this.$router.push({name: 'orderInfo', params: {orderDetail: this.detail}})
    },
    postTaskOrder () {
      this.$axios.post('/task/release_task_transaction/', this.$qs.stringify({
        tra_id: this.detail.transaction_id,
        ddl_time: this.orderTaskForm.ddlTime,
        price: this.orderTaskForm.price,
        description: this.orderTaskForm.description,
        name: this.orderTaskForm.name
      })).then(response => {
        this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.orderTaskVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
