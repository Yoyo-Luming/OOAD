<template>
  <el-container>
    <el-row>
      <el-col>
        用户头像：<img :src="photo" v-if="hasPhoto"><i class="el-icon-s-custom" v-else></i>
      </el-col>
        用户名：{{userName}}
        用户评分：{{rate}}
    </el-row>
    <el-row>
      <el-button @click="collect">收藏卖家</el-button>
    </el-row>
    <el-row>
      <el-button @click="chatSeller">联系卖家</el-button>
    </el-row>
    <el-row>
      TA的宝贝：
      <goods-box v-for="(item, index) of sellingList " :key="index+Math.random()" :name="item.name" :price="item.price" :photo="item.photo" :favourite_number="item.favourite_number" :mer_id="item.mer_id"></goods-box>
    </el-row>

  </el-container>
</template>

<script>
import GoodsBox from '../goodsBox'
// 用户信息展示：头像、昵称、评分、已上传商品列表、收藏卖家
export default {
  name: 'userInfo',
  components: {GoodsBox},
  data () {
    return {
      userId: '',
      userName: '',
      photo: '',
      rate: '',
      upload_number: '',
      sellingList: [],
      hasPhoto: false
    }
  },
  mounted () {
    this.userId = this.$route.params.userId
    console.log(this.userId)
    this.$axios.post('login0/user_page/', this.$qs.stringify({
      user_id: this.userId
    })).then(response => {
      console.log(response.data)
      let info = response.data.base_info
      this.hasPhoto = info.has_header_photo
      if (this.hasPhoto) {
        this.photo = info.header_photo_url
      }
      this.rate = info.total_star
      this.userName = info.user_name
      let goodsList = response.data.selling_list
      let len = goodsList.length
      for (let i = 0; i < len; ++i) {
        this.sellingList.push({
          name: goodsList[i].mer_name,
          price: goodsList[i].mer_price,
          photo: goodsList[i].mer_img_url,
          favourite_number: goodsList[i].favourite_number,
          mer_id: goodsList[i].mer_id
        })
      }
    })
  },
  methods: {
    collect () {
      // console.log('collect!')
      this.$axios.post('/commodity/add_favorite_business_handler/', this.$qs.stringify({
        mer_upload_user_id: this.userId
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    chatSeller () {
      // this.$message.info('chatSeller')
      this.$axios.post('dialogue/start_dialogue/', this.$qs.stringify({
        business_id: this.userId
      })).then(response => {
        console.log(response.data)
        if (response.data.status === '200' || response.data.status === '201') {
          this.$router.push({name: 'chatPage', params: {name: this.userName, id: this.userId, dialogueId: response.data.dialogue_id}})
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
