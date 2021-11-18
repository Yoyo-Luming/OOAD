<template>
<!--  <el-container>-->
<!--    <goods-box v-for="(item, index) of goodsList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>-->
<!--  </el-container>-->
  <table>
    <tr>
      <th>商品名称</th>
      <th>商品图片</th>
      <th>收藏人数</th>
      <th>商品价格</th>
      <th></th>
      <th></th>
    </tr>
    <tr v-for="(item,index) in goodsList" :key="index+Math.random()">
      <td>{{item.name}}</td>
      <td><img :src="item.photo"></td>
      <td>{{item.favouriteNumber}}</td>
      <td>{{item.price}}</td>
      <td><button @click="toGoodsPage(index)">商品详情</button></td>
      <td><button @click="deleteFavoriteGoods(index)">删除</button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'favoriteGoods',
  mounted () {
    // has_next: "False"
    // is_empty: "False"
    // message: "查询成功"
    // return_info: Array(1)
    // 0:
    //   allow_face_trade: true
    //   as_favorite_number: 1
    //   browse_number: 6
    //   deliver_price: 1
    //   favourite_number: 0
    //   mer_description: "123"
    //   mer_id: "Nw:1mn3zb:SJOQDkwlgphIcYz1ArCUT1cYPjXQrD4dhpiCt57y-to"
    //   mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjcsImRhdGUiOiIyMDIxLTExLTE3IDAzOjE5OjQzLjA5NjgxOSIsInBhdGgiOiJcXG1udFxcY1xccHljaGFybVxcT09BRFxcRmluYWxfcHJvamVjdFxcRmluYWxfUHJvamVjdDFcXGltYWdlU3RvcmVcXHVzZXJfNnVzZXJfNl90aHVtYnVwbG9hZF9tZXJjaGFuZGlzZV8yX3RpbWVfMjAyMS0xMS0xNV8yMjUwNDMuMDY5MjIzX3RodW1iLnBuZyJ9:1mn3zb:Pn6p3NPxMZueOo7SY428sOy9Gq_00LpzKE029FRk64E"
    //   mer_name: "pen"
    //   mer_price: 1
    //   mer_status: 1
    //   mer_upload_user_id: "Ng:1mn3zb:jeNo-Fxkt-IcbP6dlhRh7xUgb-VlVz_BvUTTdbD0o0Y"
    //   mer_upload_user_name: "oy2"
    this.$axios.post('login0/all_user_favorite_merchandise/').then(response => {
      let len = response.data.return_info.length
      let list = response.data.return_info
      for (let i = 0; i < len; ++i) {
        this.goodsList.push({
          name: list[i].mer_name,
          price: list[i].mer_price,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].favourite_number,
          goodsId: list[i].mer_id
        })
      }
      console.log(response.data)
    })
  },
  data () {
    return {
      goodsList: []
    }
  },
  methods: {
    toGoodsPage (index) {
      this.$router.push({name: 'goodsInfo', params: {mer_id: this.goodsList[index].goodsId}})
    },
    deleteFavoriteGoods (index) {
      // this.$message.info(index)
      this.$axios.post('commodity/favorite_merchandise_cancel_handler/', this.$qs.stringify({
        mer_id: this.goodsList[index].goodsId
      })).then(response => {
        if (response.data.status === '200') {
          this.goodsList.splice(index, 1)
          this.$message.success(response.data.message)
        } else {
          this.$message.error(response.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
