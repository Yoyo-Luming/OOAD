<template>
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
      <td><img :src="item.photo" alt=""></td>
      <td>{{item.favouriteNumber}}</td>
      <td>{{item.price}}</td>
      <td><button @click="toGoodsPage(index)">商品详情</button></td>
      <td><button @click="deleteGoods(index)">下架</button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'sellingGoods',
  mounted () {
    this.$axios.post('login0/on_sailing/').then(response => {
      console.log(response.data)
      let len = response.data.return_merchandise.length
      let list = response.data.return_merchandise
      for (let i = 0; i < len; ++i) {
        this.goodsList.push({
          name: list[i].mer_name,
          price: list[i].mer_price,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].favourite_number,
          goodsId: list[i].mer_id
        })
      }
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
    deleteGoods (index) {
      // this.$message.info(index)
      // has_next: "False"
      // is_empty: "False"
      // message: "查询成功"
      // return_merchandise: [,…]
      // 0: {mer_id: "MTQ:1mn3ye:wanLVszkWFtcEQFf2nEdwYqT_O1gXBcrqdx7ZF-RSXE", mer_name: "cake", mer_price: 23,…}
      //   allow_face_trade: true
      //   as_favorite_number: 0
      //   browse_number: 2
      //   deliver_price: 1
      //   favourite_number: 0
      //   mer_description: "123"
      //   mer_id: "MTQ:1mn3ye:wanLVszkWFtcEQFf2nEdwYqT_O1gXBcrqdx7ZF-RSXE"
      //   mer_img_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjE0LCJkYXRlIjoiMjAyMS0xMS0xNyAwMzoxODo0NC45MTY1NjAiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzV1c2VyXzVfdGh1bWJ1cGxvYWRfbWVyY2hhbmRpc2VfMl90aW1lXzIwMjEtMTEtMTZfMDIwMDEyLjQwMDU1Nl90aHVtYi5wbmcifQ:1mn3ye:rjNWQbqDHFv_YcwSimPgxXUXhp0HzDVWG0xVE4iXH3k"
      //   mer_name: "cake"
      //   mer_price: 23
      //   mer_status: 1
      //   mer_upload_user_id: "NQ:1mn3ye:9khOhFe4uOyItPPqu2nite00ppjnx-xmXVYkbga42FY"
      //   mer_upload_user_name: "oy"
      this.$axios.post('login0/delete_commodity/', this.$qs.stringify({
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
