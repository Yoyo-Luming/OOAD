<template>
  <el-row>
    <el-col :span="8">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="photo" class="image">
        <div style="padding: 14px;">
          <span>{{name}}</span>
          <span>{{favourite_number}}人想要</span>
          <div class="bottom clearfix">
            价格:  {{price}}
            <el-button type="text" class="button" @click="toGoodsPage">商品详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'goodsBox',
  // props: ['name', 'photo', 'price', 'favourite_number', 'mer_id'],
  props: {
    name: String,
    price: Number,
    photo: String,
    favourite_number: Number,
    mer_id: String
  },
  data () {
    return {
    }
  },
  methods: {
    toGoodsPage () {
      // this.$axios.post('commodity/commodity_detail/', this.$qs.stringify({
      //   mer_id: this.mer_id
      // })).then(response => {
      //   console.log(response.data)
      // })
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.mer_id}})
    }
  }
}
</script>

<style scoped>

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
