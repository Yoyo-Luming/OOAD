<template>
<!--  <el-container>-->
<!--    <user-box v-for="(item, index) of usersList" :key="index+Math.random()" :favourite_number="item.favouriteNumber" :has-photo="item.hasPhoto"-->
<!--              :rate="item.rate" :user-id="item.userId" :photo="item.photo" :name="item.name"></user-box>-->
<!--  </el-container>-->
  <table>
    <tr>
      <th>用户名</th>
      <th>用户头像</th>
      <th>收藏人数</th>
      <th>评分</th>
      <th></th>
      <th></th>
    </tr>
    <tr v-for="(item,index) in usersList" :key="index+Math.random()">
      <td>{{item.name}}</td>
      <td><img :src="item.photo" v-if="item.hasPhoto"><i class="el-icon-s-custom" v-else></i></td>
      <td>{{item.favouriteNumber}}</td>
      <td>{{item.rate}}</td>
      <td><button @click="toUserPage(index)">用户详情</button></td>
      <td><button @click="deleteFavoriteUser(index)">删除</button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'favoriteUsers',
  mounted () {
    // has_next: "False"
    // is_empty: "False"
    // message: "查询成功"
    // return_info: [{user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc", user_name: "oy",…}]
    // 0: {user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc", user_name: "oy",…}
    //   as_favorite_business_number: 1
    //   comment_number: 1
    //   has_header_photo: false
    //   header_photo_url: "http://store.sustech.xyz:8080/api/commodity/download/?key=eyJ1c2VyX2lkIjo1LCJkYXRlIjoiMjAyMS0xMS0xNyAwMzoyMjozNS44Nzc1NzkiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mn42N:02MAb6ynmGRzn_0Yjme1bL8vqZJu4Sj293SUkPTJwY4"
    //   money: 19702
    //   self_description: null
    //   sold_goods_number: 0
    //   stars_for_attitude: 4.81818181818182
    //   stars_for_deliver: 4.81818181818182
    //   stars_for_good: 4.81818181818182
    //   stars_for_task: 5
    //   total_start: 4.81818181818182
    //   uploaded_goods_number: 14
    //   user_email: "11912917@mail.sustech.edu.cn"
    //   user_id: "NQ:1mn42N:XxyV2sEumnoeWlBWSemBO7gfF8bl9CAFbujpFmMWxGc"
    //   user_identify: 2
    //   user_name: "oy"
    //   user_real_name: "欧阳"
    //   user_status: 2
    //   status: "200"
    this.$axios.post('login0/all_user_favorite_business/').then(response => {
      let len = response.data.return_info.length
      let list = response.data.return_info
      for (let i = 0; i < len; ++i) {
        this.usersList.push({
          name: list[i].user_name,
          rate: list[i].total_start,
          hasPhoto: list[i].has_header_photo,
          photo: list[i].mer_img_url,
          favouriteNumber: list[i].as_favorite_business_number,
          userId: list[i].user_id
        })
      }
      console.log(response.data)
    })
  },
  data () {
    return {
      usersList: []
    }
  },
  methods: {
    toUserPage (index) {
      this.$router.push({name: 'userInfo', params: {userId: this.usersList[index].userId}})
    },
    deleteFavoriteUser (index) {
      this.$message.info(index)
      this.$axios.post('commodity/favorite_business_cancel_handler/', this.$qs.stringify({
        favorite_bus_id: this.usersList[index].userId
      })).then(response => {
        if (response.data.status === '200') {
          this.usersList.splice(index, 1)
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
