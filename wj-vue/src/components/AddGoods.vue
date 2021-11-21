<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
<!--        <img src="../assets/testlogo.png" class="logo" alt="">-->
        <span>SUSTech Store</span>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="2-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="2-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="2-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="2-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" v-on:click="logOut">注销</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-container class="mid-content">
        <el-container class="pane-content">
          <el-form ref="form" :model="form" label-width="200px" label-position="right" style="width: 80%">
            <el-form-item label="商品名称">
              <el-input v-model="form.goods_title" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader  :options="options"
                            :props="{ checkStrictly: true }"
                            v-model="form.goods_kind"
                            clearable></el-cascader>
            </el-form-item>
            <el-form-item label="使用程度">
              <el-select v-model="form.goods_status" placeholder="请选择">
                <el-option
                  v-for="item in newOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input v-model="form.goods_description" placeholder="请输入商品分类"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                action="auto"
                :http-request="uploadSectionFile"
                list-type="picture-card"
                :file-list="form.fileList"
                class = "contentImgStyle"
                :limit="3"
                :on-exceed="handleExceed">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="发货地址">
              <el-select v-model="form.goods_address_id" placeholder="请选择">
                <el-option
                  v-for="item in addressList"
                  :label="item.name + item.region+item.address+item.phone"
                  :key="item.id"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮费">
              <el-input v-model="form.goods_postage"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit2">确认添加</el-button>
              <el-button type="success">重置</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
  <!--  <el-container class="home-container">-->
  <!--    <el-header class="el-header">-->
  <!--      <div class="right-head">-->
  <!--        <img src="../assets/testlogo.png" class="logo" alt="">-->
  <!--        <span class="title">SUSTech Store</span>-->
  <!--      </div>-->
  <!--      <div class="left-head">-->
  <!--        <el-menu-->
  <!--          class="el-menu-demo"-->
  <!--          mode="horizontal"-->
  <!--          background-color="#ffc8dd"-->
  <!--          text-color="#ff5d8f"-->
  <!--          active-text-color="#ffd04b">-->
  <!--          <el-menu-item index="1" v-on:click="homePage">Home Page</el-menu-item>-->
  <!--          <el-menu-item index="2" v-on:click="searchPage">Search Page</el-menu-item>-->
  <!--          <el-submenu index="3">-->
  <!--            <template slot="title">用户名</template>-->
  <!--            <el-menu-item index="3-1" v-on:click="myPage">Personal Page</el-menu-item>-->
  <!--            <el-menu-item index="3-2" v-on:click="cartPage">Shopping Cart</el-menu-item>-->
  <!--            <el-menu-item index="3-3" v-on:click="sellPage">Selling Page</el-menu-item>-->
  <!--            <el-menu-item index="3-4" v-on:click="markPage">Marking Page</el-menu-item>-->
  <!--          </el-submenu>-->
  <!--          <el-menu-item index="4" v-on:click="logOut">Log Out</el-menu-item>-->
  <!--        </el-menu>-->
  <!--      </div>-->
  <!--    </el-header>-->
  <!--    <el-main>-->
  <!--      <el-container class="mid-content">-->
  <!--    <el-form ref="form" :model="form" label-width="80px">-->
  <!--      <el-form-item label="商品名称">-->
  <!--        <el-input v-model="form.goods_title" placeholder="请输入商品名称"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="商品价格">-->
  <!--        <el-input v-model="form.goods_price" placeholder="请输入商品价格"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="商品分类">-->
  <!--        <el-cascader  :options="options"-->
  <!--                      :props="{ checkStrictly: true }"-->
  <!--                      v-model="form.goods_kind"-->
  <!--                      clearable></el-cascader>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="使用程度">-->
  <!--        <el-select v-model="form.goods_status" placeholder="请选择">-->
  <!--          <el-option-->
  <!--            v-for="item in newOptions"-->
  <!--            :key="item.value"-->
  <!--            :label="item.label"-->
  <!--            :value="item.value">-->
  <!--          </el-option>-->
  <!--        </el-select>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="商品描述">-->
  <!--        <el-input v-model="form.goods_description" placeholder="请输入商品分类"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="商品图片">-->
  <!--      <el-upload-->
  <!--        action="auto"-->
  <!--        :http-request="uploadSectionFile"-->
  <!--        list-type="picture-card"-->
  <!--        :file-list="form.fileList"-->
  <!--        class = "contentImgStyle"-->
  <!--        :limit="3"-->
  <!--        :on-exceed="handleExceed">-->
  <!--        <i class="el-icon-plus"></i>-->
  <!--      </el-upload>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="发货地址">-->
  <!--        <el-select v-model="form.goods_address_id" placeholder="请选择">-->
  <!--          <el-option-->
  <!--            v-for="item in addressList"-->
  <!--            :label="item.name + item.region+item.address+item.phone"-->
  <!--            :key="item.id"-->
  <!--            :value="item.id"-->
  <!--          >-->
  <!--          </el-option>-->
  <!--        </el-select>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="邮费">-->
  <!--        <el-input v-model="form.goods_postage"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item>-->
  <!--        <el-button type="primary" @click="submit2">确认添加</el-button>-->
  <!--        <el-button type="success">重置</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--      </el-container>-->
  <!--    </el-main>-->
  <!--  </el-container>-->
</template>

<script>

export default {
  // TODO need check
  name: 'AddGoods',
  mounted () {
    this.$axios.post('/login0/get_address_list/', this.$qs.stringify({

    })).then(response => {
      console.log(response.data)
      // console.log(response.data.return_list)
      for (let i = 0; i < response.data.return_list.length; ++i) {
        if (response.data.return_list[i].address_type === 2) {
          this.addressList.push({
            name: response.data.return_list[i].user_name,
            region: this.regionList[response.data.return_list[i].user_region - 1],
            id: response.data.return_list[i].addr_id,
            address: response.data.return_list[i].user_addr,
            phone: response.data.return_list[i].user_phone})
        }
      }
      console.log(this.addressList)
    })
  },
  data () {
    return {
      form: {
        goods_title: '',
        goods_price: '',
        goods_status: '',
        goods_kind: '',
        goods_description: '',
        goods_address_id: '',
        goods_postage: '',
        fileList: []
      },
      addressList: [],
      regionList: [ '荔园',
        '创园',
        '慧园',
        '欣园',
        '学生宿舍',
        '湖畔',
        '九华精舍',
        '教师公寓',
        '专家公寓',
        '风雨操场',
        '润扬体育馆',
        '工学院',
        '南科大中心',
        '第一科研楼',
        '第二科研楼',
        '第一教学楼',
        '第二教学楼',
        '台州楼',
        '检测中心',
        '行政楼',
        '琳恩图书馆',
        '1号门',
        '2号门',
        '3号门',
        '4号门',
        '5号门',
        '6号门',
        '7号门',
        '8号门',
        '其它'],
      uploadFile: [],
      options: [{
        value: 1,
        label: '运动户外',
        children: [{
          value: 1,
          label: '运动服'
        }, {
          value: 2,
          label: '运动鞋'
        }]
      }, {
        value: 2,
        label: '生活用品',
        children: [{
          value: 3,
          label: '五金用品'
        }, {
          value: 4,
          label: '办公用品'
        }, {
          value: 5,
          label: '办公设备'
        }]
      }, {
        value: 3,
        label: '电器',
        children: [{
          value: 6,
          label: '大家电'
        }, {
          value: 7,
          label: '厨房电器'
        }, {
          value: 8,
          label: '生活电器'
        }]
      }, {
        value: 4,
        label: '数码',
        children: [{
          value: 9,
          label: '电脑'
        }, {
          value: 10,
          label: '电脑配件'
        }, {
          value: 11,
          label: '智能设备'
        }, {
          value: 12,
          label: '手机'
        }, {
          value: 13,
          label: '相机'
        }]
      }, {
        value: 5,
        label: '服装',
        children: [{
          value: 14,
          label: '上衣'
        }, {
          value: 15,
          label: '外套'
        }]
      }, {
        value: 6,
        label: '美妆',
        children: [{
          value: 16,
          label: '美容护肤'
        }, {
          value: 17,
          label: '彩妆'
        }, {
          value: 18,
          label: '香水'
        }]
      }, {
        value: 7,
        label: '家具',
        children: [{
          value: 19,
          label: '家具饰品'
        }, {
          value: 20,
          label: '住宅家具'
        }]
      }, {
        value: 8,
        label: '玩具',
        children: [{
          value: 21,
          label: '模型'
        }, {
          value: 22,
          label: '手办'
        }]
      }],
      newOptions: [
        {
          value: 1,
          label: '全新'
        }, {
          value: 2,
          label: '几乎全新'
        }, {
          value: 3,
          label: '轻微使用痕迹'
        }, {
          value: 4,
          label: '明显使用痕迹'
        }
      ]
    }
  },
  methods: {

    handleExceed () {
      this.$message.warning('最多只能上传三张相片！')
    },
    uploadSectionFile (param) {
      const uploadFileLength = this.uploadFile.length
      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadFile[uploadFileLength] = {'imgFile': file}
    },
    submit2 () {
      // console.log(this.goods_kind.length)
      // console.log(this.form.goods_kind[0])
      // console.log(this.form.goods_kind[1])
      // console.log(this.form.goods_status)
      console.log(this.form.goods_address_id)
      let param = new FormData() // FormData 对象
      let list = this.uploadFile[0]
      let file = list.imgFile
      param.append('image1', file) // 文件对象
      param.append('mer_name', this.form.goods_title) // 1
      param.append('mer_description', this.form.goods_description) // 2
      param.append('mer_price', this.form.goods_price) // 3
      param.append('class1_id', this.form.goods_kind[0]) // 4
      param.append('class2_id', this.form.goods_kind[1]) // 5
      param.append('fineness_id', this.form.goods_status) // 6
      param.append('deliver_price', this.form.goods_postage)
      param.append('send_address_id', this.form.goods_address_id)
      // 邮费 deliver_price 发货地址 send_address_id
      if (this.uploadFile.length >= 2) {
        let list2 = this.uploadFile[1]
        let file2 = list2.imgFile
        param.append('image2', file2)
      } else {
        param.append('image2', '')
      }
      if (this.uploadFile.length >= 3) {
        let list3 = this.uploadFile[2]
        let file3 = list3.imgFile
        param.append('image3', file3)
      } else {
        param.append('image3', '')
      }
      this.$axios({
        method: 'post',
        url: '/login0/upload_commodity/',
        data: param
      }).then(function (response) {
        alert(response.data.message)
      }).catch(error => {
        alert(error)
      })
    },
    myPage () {
      this.$router.push('/person')
    },
    homePage () {
      this.$router.push('/')
    },
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/sellinggoods')
    },
    markPage () {
      this.$router.push('/favoritegoods')
    },
    logOut () {
      this.$axios.post('login0/logout/ ')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center no-repeat url("../assets/back7.jpg");
  background-size: cover;
  display: block;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.5;
}

.right-head {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.left-head {
  display: flex;
  align-items: center;
}

.mid-content {
  display: block;
  margin: 60px auto;
  height: 100%;
  width: 90%;
}

.pane-content {
  display: block;
  height: 100%;
  width: 1000px;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}
</style>
