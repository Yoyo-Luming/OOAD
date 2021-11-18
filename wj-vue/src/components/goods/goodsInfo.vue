<template>
  <div>
    商品名称<h1>{{goodsInfo.name}}</h1>
    商品价格<h4>{{goodsInfo.price}}</h4>
    发布者用户名<h5>{{goodsInfo.poster}}</h5>
    发布日期<h5>{{goodsInfo.uploadDay}}</h5>
    邮费<h5>{{goodsInfo.deliverPrice}}</h5>
    <img v-for="(item, index) of url" :key="index+Math.random()" :src="item">
<!--    <img :src="this.$route.params.goodsurl" >-->
    商品分类：{{goodsInfo.kind}}
    商品描述<p1>{{description}}</p1>
    <el-button type="primary" @click="collect">收藏</el-button>
    <el-button @click="addCart">添加购物车</el-button>
    <el-button @click="toUserPage">查看发布者</el-button>
    <el-button @click="buy">购买</el-button>
  </div>
</template>

<script>
export default {
  name: 'goodsInfo',
  data () {
    return {
      goodsInfo: {
        name: '',
        description: '',
        price: '',
        url: [],
        poster: '',
        uploadDay: '',
        id: '',
        deliverPrice: '',
        posterId: '',
        kind: ''
      },
      url: [],
      posterInfo: {
        name: '',
        id: ''
      },
      class1: [
        '运动户外',
        '生活用品',
        '电器',
        '数码',
        '服装',
        '美妆',
        '家具',
        '玩具'
      ],
      class2: [
        '运动服',
        '运动鞋',
        '五金用品',
        '办公用品',
        '办公设备',
        '大家电',
        '厨房电器',
        '生活电器',
        '电脑',
        '电脑配件',
        '智能设备',
        '手机',
        '相机',
        '上衣',
        '外套',
        '美容护肤',
        '彩妆',
        '香水',
        '家具饰品',
        '住宅家具',
        '模型',
        '手办'
      ]
    }
  },
  mounted () {
    // this.name = 'food'
    // this.price = 122
    // this.url.push('https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png')
    this.goodsInfo.id = this.$route.params.mer_id
    this.$axios.post('commodity/commodity_detail/', this.$qs.stringify({
      mer_id: this.$route.params.mer_id
    })).then(response => {
      console.log(response.data)
      // addr_info:
      //   addr_id: "MTY:1mnGOz:saMYMHwN22On0ek7HbjaQU9rnvQTONg-naRmXs8SETE"
      //   is_default: false
      //   user_addr: "203"
      //   user_id: "NQ:1mnGOz:TsB-cGaXNUejsD5lF57rivrDnarhQIGT3zKRXsBF0_o"
      //   user_name: "欧阳"
      //   user_region: 1
      // allow_face_trade: true
      // as_favorite_number: 0
      // class_level_1: 1
      // class_level_2: 1
      // img_num: "1"
      // mer_deliver_price: 1
      // mer_description: "k40"
      // mer_id: "MjI:1mnGOz:PI2vpQNZXMxFK_Z0tYhoeG7sjoG4mkx0OviRVv8mzzs"
      // mer_image1_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTkzOTQiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFx1c2VyXzV1c2VyXzVfbWVydXBsb2FkX21lcmNoYW5kaXNlXzJfdGltZV8yMDIxLTExLTE3XzAxNTMyNi42OTA2MTBfMTYzNzA4NTE3OTQ1NS5qcGcifQ:1mnGOz:E2IOszvB6o3ZBT2TnzsPHuQjdknJYfdL0RaaRCmffI0"
      // mer_image2_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTk0MzYiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mnGOz:--YAktQnBFiD3dr0S8dBS2w6dfg3Z_aPq734aDZwlmE"
      // mer_image3_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJtZXJfaWQiOjIyLCJkYXRlIjoiMjAyMS0xMS0xNyAxNjozNDo0NS4yNTk0NDciLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mnGOz:dSwunNs_5tTjq8WPaM_vbJwGBRuvOGQEh_8pb6pGHOA"
      // mer_name: "vivo"
      // mer_price: "23.0"
      // mer_update: "2021-11-17T01:53:26.552"
      // mer_upload_user_id: "NQ:1mnGOz:TsB-cGaXNUejsD5lF57rivrDnarhQIGT3zKRXsBF0_o"
      // mer_upload_user_name: "oy"
      // message: "成功返回商品vivo的信息"
      // status: "200"
      this.posterInfo.name = response.data.mer_upload_user_name
      this.posterInfo.id = response.data.mer_upload_user_id
      this.goodsInfo.name = response.data.mer_name
      this.goodsInfo.description = response.data.mer_description
      this.goodsInfo.price = response.data.mer_price
      this.goodsInfo.uploadDay = response.data.mer_update.split('T')[0]
      this.goodsInfo.url.push(response.data.mer_image1_url)
      this.url.push(response.data.mer_image1_url)
      this.goodsInfo.id = response.data.mer_id
      this.goodsInfo.deliverPrice = response.data.mer_deliver_price
      this.goodsInfo.posterId = response.data.mer_upload_user_id
      this.goodsInfo.poster = response.data.mer_upload_user_name
      this.goodsInfo.kind = this.class1[response.data.class_level_1 - 1] + '/' + this.class2[response.data.class_level_2 - 1]
      let len = response.data.img_num
      if (len >= 2) {
        this.goodsInfo.url.push(response.data.mer_image2_url)
        this.url.push(response.data.mer_image2_url)
      }
      if (len >= 3) {
        this.goodsInfo.url.push(response.data.mer_image3_url)
        this.url.push(response.data.mer_image3_url)
      }
      console.log(response.data)
    })
  },
  methods: {
    collect () {
      this.$axios.post('commodity/add_favorite_merchandise_handler/', this.$qs.stringify({
        mer_id: this.goodsInfo.id
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    addCart () {
      this.$axios.post('login0/add_cart/', this.$qs.stringify({
        mer_id: this.goodsInfo.id
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success('添加购物车成功')
        } else {
          this.$message.error('添加购物车失败')
        }
      })
    },
    toUserPage () {
      this.$router.push({name: 'userInfo', params: {userId: this.goodsInfo.posterId}})
    },
    buy () {
      console.log(this.name)
      console.log(this.price)
      console.log(this.goodsInfo.url[0])
      this.$router.push({name: 'buyPage', params: {goodsName: this.goodsInfo.name, goodsPrice: this.goodsInfo.price, goodsPhoto: this.goodsInfo.url[0], goodsId: this.goodsInfo.id}})
    }
  }
}
</script>

<style scoped>

</style>
