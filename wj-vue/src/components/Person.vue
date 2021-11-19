<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head">
        <img src="../assets/testlogo.png" class="logo" alt="">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="homePage">Home Page</el-menu-item>
          <el-menu-item index="2" v-on:click="searchPage">Search Page</el-menu-item>
          <el-submenu index="3">
            <template slot="title">用户名</template>
            <el-menu-item index="3-1" v-on:click="myPage">Personal Page</el-menu-item>
            <el-menu-item index="3-2" v-on:click="cartPage">Shopping Cart</el-menu-item>
            <el-menu-item index="3-3" v-on:click="sellPage">Selling Page</el-menu-item>
            <el-menu-item index="3-4" v-on:click="markPage">Marking Page</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" v-on:click="logOut">Log Out</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-container class="mid-content">
        <el-tabs type="border-card" class="selection">
          <el-tab-pane>
            <el-container class="pane-content">
              <el-descriptions title="用户信息" column="3" size="medium" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                  </template>
                  {{userInfo.name}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    身份
                  </template>
                  {{userInfo.userType}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-message"></i>
                    邮箱
                  </template>
                  {{userInfo.email}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    简介
                  </template>
                  {{userInfo.description}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    真实姓名
                  </template>
                  {{userInfo.realName}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    账户余额
                  </template>
                  {{userInfo.balance}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    头像
                  </template>
<!--                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"/>-->

                  <img :src="this.userInfo.photo" v-if="hasPhoto"/>
                  <i class="el-icon-s-custom" v-else></i>
                </el-descriptions-item>
              </el-descriptions>
              <el-button type="primary" @click="UserInfoFormVisible = true">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
              <el-button @click="forgetVisble=true">忘记支付密码</el-button>
              <el-button @click="goSellOrder">我卖出的商品</el-button>
              <el-button @click="goBuyOrder">我买到的商品</el-button>
              <el-button @click="goFavoriteUser">我收藏的卖家</el-button>
              <el-button @click="goFavoriteGoods">我收藏的商品</el-button>
              <el-button @click="goPostGoods">我发布的商品</el-button>
<!--              <el-button @click=""></el-button>-->
              <el-input v-model="money"></el-input>
              <el-button @click="recharge">充值</el-button>
              <el-button @click="activeSellFromVisible=true">成为卖家</el-button>
              <el-dialog :visible.sync="forgetVisible">
                验证码：<el-input v-model="changeCode"></el-input>
                新支付密码：<el-input v-model="newPayPassword"></el-input>
                <el-button @click="fogetVisible=false">取消</el-button>
                <el-button @click="sendCode">发送邮箱验证码</el-button>
                <el-button @click="confirmChange">确认修改</el-button>
              </el-dialog>
              <el-dialog title="激活卖家" :visible="activeSellFromVisible">
                <el-form ref="form" :model="activeSellFromData" label-width="80px">
                  <el-form-item label="发件人姓名">
                    <el-input v-model="activeSellFromData.name" placeholder="请输入发件人姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="发货区域">
                    <el-select v-model="activeSellFromData.region" placeholder="请选择发货区域">
                      <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="详细地址">
                    <el-input v-model="activeSellFromData.address" placeholder="请输入详细收货地址"></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码">
                    <el-input v-model="activeSellFromData.phone" placeholder="请输入电话号码"></el-input>
                  </el-form-item>
                  <el-form-item label="收款二维码">
                    <el-upload
                      action="auto"
                      :http-request="uploadQRCodeSectionFile"
                      list-type="picture-card"
                      :file-list="activeSellFromData.QRCode"
                      class = "contentImgStyle"
                      :limit="1"
                      :on-exceed="handleExceed">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                  <el-button type="primary" @click="activateSell">提交</el-button>
                </el-form>
              </el-dialog>
              <el-dialog title="编辑用户信息" :visible.sync="UserInfoFormVisible" center width="600px">
                <el-form ref="form" :model="fromData" label-width="80px">
                  <el-form-item label="身份">
                    <el-select v-model="fromData.userType" placeholder="请选择身份">
                      <el-option
                        v-for="item in userTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="真实姓名">
                    <el-input v-model="fromData.trueName" placeholder="请输入真实姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="简介">
                    <el-input v-model="fromData.description" placeholder="请输入简介"></el-input>
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-upload
                      action="auto"
                      :http-request="uploadSectionFile"
                      list-type="picture-card"
                      :file-list="fromData.photo"
                      class = "contentImgStyle"
                      :limit="1"
                      :on-exceed="handleExceed">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="UserInfoFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="submit">提交</el-button>
                </div>
              </el-dialog>
            </el-container>
            <span slot="label" class="tabs">个人信息</span>
          </el-tab-pane>
          <el-tab-pane>
            <el-container class="pane-content">
<!--              This is changing password-->
              支付密码修改：<p></p>
              旧支付密码：<el-input v-model="oldPayPassword"></el-input>
              新支付密码：<el-input v-model="newPayPassword"></el-input>
              <el-button @click="changePayPassword">确认</el-button><p></p>
              登录密码修改：<p></p>
              旧登录密码：<el-input v-model="oldLoginPassword"></el-input>
              新登录密码：<el-input v-model="newLoginPassword"></el-input>
              <el-button @click="changeLoginPassword">确认</el-button>
            </el-container>
            <span slot="label" class="tabs">更改密码</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tabs">收货地址</span>
            <el-container class="pane-content">
              <div v-if="address.length">
                <table>
                  <tr>
                    <th>ID</th>
                    <th>收件人姓名</th>
                    <th>地区</th>
                    <th>详细地址</th>
                    <th>电话号码</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in address" :key="item.name">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.region}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.phone}}</td>
                    <td><button v-on:click="deleteAddress(index)">删除</button></td>
                  </tr>
                </table>
                <el-container class="addItem">
                  <el-button type="primary" class="add-button" @click="addressFormVisible = true" round>Add</el-button>
                </el-container>
                <el-dialog title="编辑收货地址" :visible.sync="addressFormVisible" center width="600px">
                  <el-form ref="form" :model="fromData" label-width="80px">
                    <el-form-item label="收件人姓名">
                      <el-input v-model="addressFromData.name" placeholder="请输入收件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="收货区域">
                      <el-select v-model="addressFromData.region" placeholder="请选择收货区域">
                        <el-option
                          v-for="item in areaOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址">
                      <el-input v-model="addressFromData.address" placeholder="请输入详细收货地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                      <el-input v-model="addressFromData.phone" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="addressFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addAddress">提交</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-container>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tabs">发货地址</span>
            <el-container class="pane-content">
              <div v-if="sendAddress.length">
                <table>
                  <tr>
                    <th>ID</th>
                    <th>发件人姓名</th>
                    <th>地区</th>
                    <th>详细地址</th>
                    <th>电话号码</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in sendAddress" :key="item.name">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td style="width: 300px">{{item.region}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.phone}}</td>
                    <td><button v-on:click="deleteSendAddress(index)">删除</button></td>
                  </tr>
                </table>
                <el-container class="addItem">
                  <el-button type="primary" class="add-button" @click="sendAddressFormVisible = true" round>添加</el-button>
                </el-container>
                <el-dialog title="编辑发货地址" :visible.sync="sendAddressFormVisible" center width="600px">
                  <el-form ref="form" :model="sendAddressFromData" label-width="80px">
                    <el-form-item label="收件人姓名">
                      <el-input v-model="sendAddressFromData.name" placeholder="请输入收件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="收货区域">
                      <el-select v-model="sendAddressFromData.region" placeholder="请选择收货区域">
                        <el-option
                          v-for="item in areaOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址">
                      <el-input v-model="sendAddressFromData.address" placeholder="请输入详细收货地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                      <el-input v-model="sendAddressFromData.phone" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="sendAddressFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addSendAddress">提交</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>
      <el-dialog title="激活用户信息" :visible.sync="activeFromVisible" center width="600px">
        <el-form ref="form" :model="activeFromData" label-width="80px">
          <el-form-item label="真实姓名">
            <el-input v-model="activeFromData.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="activeFromData.userType" placeholder="请选择身份">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
<!--            <el-input v-model="activeFromData.userType" placeholder="请选择身份"></el-input>-->
          </el-form-item>
          <el-form-item label="支付密码">
            <el-input v-model="activeFromData.payPassword" placeholder="请输入支付密码"></el-input>
          </el-form-item>
          <el-form-item label="默认收货地址">
            <el-form-item label="收货人姓名">
              <el-input v-model="activeFromData.consigneeName" placeholder="请输入收货人姓名"></el-input>
            </el-form-item>
            <el-form-item label="收货区域">
              <el-select v-model="activeFromData.region" placeholder="请选择收货区域">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="activeFromData.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话号码">
              <el-input v-model="activeFromData.phone" placeholder="请输入收货人电话号码"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="activate">提交</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      // 展示的用户数据
      userInfo: {
        name: '',
        id: '',
        userType: '',
        email: '',
        description: '',
        realName: '',
        photo: '',
        balance: 123
      },
      // 激活卖家功能表单数据
      // TODO 需要加二维码
      activeSellFromData: {
        name: '',
        region: '',
        address: '',
        phone: '',
        QRCode: ''
      },
      UserInfoFormVisible: false,
      addressFormVisible: false,
      sendAddressFormVisible: false,
      // 信息编辑表单数据
      fromData: {
        userType: '',
        description: '',
        trueName: '',
        photo: []
      },
      uploadFile: [],
      uploadQRCodeFile: [],
      hasPhoto: false,
      address: [
        { id: 1, name: 'Name1', region: '荔园', address: 20, phone: 1123 },
        { id: 2, name: 'Name2', region: '创园', address: 80, phone: 132435 }
      ],
      sendAddress: [
        // { id: 1, name: 'Name1', region: 'a', address: 20, phone: 1123 }
      ],
      // 添加地址表单数据
      addressFromData: {
        name: '',
        region: '',
        address: '',
        phone: ''
      },
      sendAddressFromData: {
        name: '',
        region: '',
        address: '',
        phone: ''
      },
      addressId: '',
      activeFromVisible: false,
      activeFromData: {
        realName: '',
        userType: '',
        addressId: '',
        consigneeName: '',
        region: '',
        address: '',
        phone: '',
        payPassword: ''
      },
      areaOptions: [{
        value: '1',
        label: '荔园'
      }, {
        value: '2',
        label: '创园'
      }, {
        value: '3',
        label: '慧园'
      }, {
        value: '4',
        label: '欣园'
      }, {
        value: '5',
        label: '学生宿舍'
      }, {
        value: '6',
        label: '湖畔'
      }, {
        value: '7',
        label: '九华精舍'
      }, {
        value: '8',
        label: '九华精舍'
      }, {
        value: '9',
        label: '专家公寓'
      }, {
        value: '10',
        label: '风雨操场'
      }, {
        value: '11',
        label: '润扬体育馆'
      }, {
        value: '12',
        label: '工学院'
      }, {
        value: '13',
        label: '南科大中心'
      }, {
        value: '14',
        label: '第一科研楼'
      }, {
        value: '15',
        label: '第二科研楼'
      }, {
        value: '16',
        label: '第一教学楼'
      }, {
        value: '17',
        label: '第二教学楼'
      }, {
        value: '18',
        label: '台州楼'
      }, {
        value: '19',
        label: '检测中心'
      }, {
        value: '20',
        label: '行政楼'
      }, {
        value: '21',
        label: '琳恩图书馆'
      }, {
        value: '22',
        label: '1号门'
      }, {
        value: '23',
        label: '2号门'
      }, {
        value: '24',
        label: '3号门'
      }, {
        value: '25',
        label: '4号门'
      }, {
        value: '26',
        label: '5号门'
      }, {
        value: '27',
        label: '6号门'
      }, {
        value: '28',
        label: '7号门'
      }, {
        value: '29',
        label: '8号门'
      }, {
        value: '30',
        label: '其它'
      }],
      userTypeOptions: [{
        value: '1',
        label: '本科生'
      }, {
        value: '2',
        label: '研究生'
      },
      {
        value: '3',
        label: '博士生'
      }, {
        value: '4',
        label: '教职工'
      }
      ],
      userTypeList: ['本科生', '研究生', '博士生', '教职工'],
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
      money: 0,
      activeSellFromVisible: false,
      newPayPassword: '',
      newLoginPassword: '',
      oldPayPassword: '',
      oldLoginPassword: '',
      forgetVisible: false,
      changeCode: ''
    }
  },
  mounted () {
    console.log(this.$global.userStatus)
    if (this.$global.userStatus === 0) {
      this.activeFromVisible = true
    } else {
      this.$axios.post('/login0/get_user_details/', this.$qs.stringify({}))
        .then(response => {
          if (response.data.message === '用户无权访问') {
            // 用户未激活，先激活
            this.activeFromVisible = true
          } else {
            console.log(response.data)
            // message: "查询成功"
            // status: "200"
            // user_details:
            //   as_favorite_business_number: 0
            //   comment_number: 0
            //   has_header_photo: false
            //   header_photo_url: "eyJ1c2VyX2lkIjo4LCJkYXRlIjoiMjAyMS0xMS0xNyAwMDoyMToyMS4xNjgzMjUiLCJwYXRoIjoiXFxtbnRcXGNcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXEZpbmFsX1Byb2plY3QxXFxpbWFnZVN0b3JlXFwifQ:1mn1Cz:W56bxGPlO0tf4fHM1J9mMyrLELB4FnaeGanIqKW_Zt4"
            //   money: 0
            //   self_description: null
            //   sold_goods_number: 0
            //   stars_for_attitude: 5
            //   stars_for_deliver: 5
            //   stars_for_good: 5
            //   stars_for_task: 5
            //   total_start: 5
            //   uploaded_goods_number: 0
            //   user_email: "15712070462@139.com"
            //   user_id: "OA:1mn1Cz:Iwe-ZSzzf6_xCrjCXGLQa6a9qr3Wu1PGAJTmOmGBSX0"
            //   user_identify: 1
            //   user_name: "oy3"
            //   user_real_name: "欧阳晓东"
            //   user_status: 1
            this.userInfo.name = response.data.user_details.user_name
            this.userInfo.userType = this.userTypeList[response.data.user_details.user_identify - 1]
            this.userInfo.photo = response.data.user_details.header_photo_url
            this.userInfo.email = response.data.user_details.user_email
            this.userInfo.realName = response.data.user_details.user_real_name
            this.userInfo.balance = response.data.user_details.money
            this.userInfo.description = response.data.user_details.self_description
            this.hasPhoto = response.data.user_details.has_header_photo
          }
        })
      this.$axios.post('/login0/get_address_list/', this.$qs.stringify({
      })).then(response => {
        console.log(response.data.return_list)
        // 0:
        //   addr_id: "NDc:1mn1Ec:oCPKsgXubui32BJ-8oTbdAyP0Ejv2ALaQ1Fcy3lf7I0"
        //   address_type: 1 //1代表收货地址 2代表发货地址
        //   is_default: false //不用管
        //   user_addr: "101"
        //   user_id: "OA:1mn1Ec:RjHwEUdyw8RIJueIqJsPiEXEt4KBQjtTTGMS6EaZ4WE"
        //   user_name: "oyxd"
        //   user_phone: "157120676"
        //   user_region: 1
        for (let i = 0; i < response.data.return_list.length; ++i) {
          if (response.data.return_list[i].address_type === 1) {
            this.address.push({
              name: response.data.return_list[i].user_name,
              region: this.regionList[response.data.return_list[i].user_region - 1],
              id: response.data.return_list[i].addr_id,
              address: response.data.return_list[i].user_addr,
              phone: response.data.return_list[i].user_phone})
          } else {
            this.sendAddress.push({
              name: response.data.return_list[i].user_name,
              region: this.regionList[response.data.return_list[i].user_region - 1],
              id: response.data.return_list[i].addr_id,
              address: response.data.return_list[i].user_addr,
              phone: response.data.return_list[i].user_phone})
          }
        }
        console.log(this.addressList)
      })
    }
  },
  methods: {
    myPage () {
      this.$router.go(0)
    },
    homePage () {
      this.$router.push('/')
    },
    searchPage () {
      this.$router.push('/search')
    },
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/store')
    },
    markPage () {
      this.$router.push('/markPage')
    },
    logOut () {
      this.$axios.post('login0/logout/ ')
      this.$router.push('/login')
    },
    search () {
      // Todo
    },
    deleteAddress (index) {
      if (this.address.length > 1) {
        this.$axios.post('login0/delete_address/', this.$qs.stringify({
          addr_id: this.address[index].id
        })).then(response => {
          if (response.data.status === '200') {
            this.address.splice(index, 1)
            this.$message.success(response.data.message)
          } else {
            this.$message.error(response.data.message)
          }
        })
      } else {
        this.$message.error('至少需要保留一条收货地址')
      }
    },
    deleteSendAddress (index) {
      if (this.sendAddress.length > 1) {
        this.$axios.post('login0/delete_address/', this.$qs.stringify({
          addr_id: this.sendAddress[index].id
        })).then(response => {
          if (response.data.status === '200') {
            this.sendAddress.splice(index, 1)
            this.$message.success(response.data.message)
          } else {
            this.$message.error(response.data.message)
          }
        })
      } else {
        this.$message.error('至少需要保留一条发货地址')
      }
    },
    addItem () {
      // Todo
    },
    submit () {
      let infoForm = new FormData()
      infoForm.append('user_identify ', this.fromData.userType)
      infoForm.append('self_description', this.fromData.description)
      infoForm.append('real_name', this.fromData.trueName)
      infoForm.append('header_photo', this.fromData.photo)
      this.$axios({
        method: 'post',
        url: '/login0/modify_self_info/',
        data: infoForm
      }).then(response => {
        alert(response.data)
        let list = this.uploadFile[0]
        let file = list.photo
        let photoForm = new FormData()
        photoForm.append('header_photo', file)
        this.$axios({method: 'post',
          url: '/login0/upload_head_photo/',
          data: photoForm}).then(response => {
          console.log(response.data)
          this.UserInfoFormVisible = false
          this.userInfo.description = this.fromData.description
          this.userInfo.photo = this.fromData.photo
          this.userInfo.realName = this.fromData.trueName
          this.userInfo.userType = this.fromData.userType
        })
      })
    },
    handleExceed () {
      this.$message.warning('最多只能上传一张相片！')
    },
    uploadSectionFile (param) {
      const uploadFileLength = this.uploadFile.length
      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadFile[uploadFileLength] = {'photo': file}
    },
    uploadQRCodeSectionFile (param) {
      const uploadQRCodeFileLength = this.uploadQRCodeFile.length
      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadQRCodeFile[uploadQRCodeFileLength] = {'photo': file}
    },
    addAddress () {
      this.$axios.post('/login0/add_address/', this.$qs.stringify({
        user_name: this.addressFromData.name,
        user_addr: this.addressFromData.address,
        region_id: this.addressFromData.region,
        user_phone: this.addressFromData.phone,
        address_type: 1
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.addressFormVisible = false
        }
      })
    },
    addSendAddress () {
      this.$axios.post('/login0/add_address/', this.$qs.stringify({
        user_name: this.sendAddressFromData.name,
        user_addr: this.sendAddressFromData.address,
        region_id: this.sendAddressFromData.region,
        user_phone: this.sendAddressFromData.phone,
        address_type: 2
      })).then(response => {
        this.$message.info(response.data.message)
        if (response.data.status === '200') {
          this.sendAddressFormVisible = false
        }
      })
    },
    activate () {
      console.log(this.$global.userId)
      // 先激活，上传真实姓名，用户类别，支付密码，收货地址
      // TODO 支付密码需要输入两次确认
      this.$axios.post('/login0/activate/', this.$qs.stringify({
        real_name: this.activeFromData.realName,
        user_identify: this.activeFromData.userType,
        pay_password: this.activeFromData.payPassword
      })).then(response => {
        console.log(response.data)
        this.$axios.post('/login0/add_address/', this.$qs.stringify({
          current_user: this.$global.userId,
          user_name: this.activeFromData.consigneeName,
          region_id: this.activeFromData.region,
          user_addr: this.activeFromData.address,
          user_phone: this.activeFromData.phone,
          address_type: 1
        })).then(response => {
          this.$global.userState = 1
          this.activeFromVisible = false
        })
      })
    },
    goSellOrder () {
      this.$router.push('/sellorder')
    },
    goBuyOrder () {
      this.$router.push('/buyorder')
    },
    recharge () {
      console.log(this.money)
      this.$axios.post('login0/recharge/', this.$qs.stringify({
        money: this.money
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    activateSell () {
      let list = this.uploadQRCodeFile[0]
      let file = list.photo
      let photoForm = new FormData()
      photoForm.append('QR_Code', file)
      this.$axios({method: 'post',
        url: '/login0/upload_QR_code/',
        data: photoForm}).then(response => {
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success('卖家激活成功！')
          this.$axios.post('/login0/add_address/', this.$qs.stringify({
            user_name: this.activeSellFromData.name,
            region_id: this.activeSellFromData.region,
            user_addr: this.activeSellFromData.address,
            user_phone: this.activeSellFromData.phone,
            address_type: 2
          })).then(response => {
            if (response.data.status === '200') {
              this.$global.userStatus = 2
              this.activeSellFromVisible = false
            }
          })
        } else {
          this.$message.error(response.data.message)
        }
      })
      console.log('activateSell!')
    },
    goFavoriteUser () {
      // TODO 展示收藏的商家
      // this.$axios.post('login0/all_user_favorite_business/').then(response => {
      //   console.log(response.data)
      // })
      this.$router.push('/favoriteusers')
    },
    goFavoriteGoods () {
      // TODO 展示收藏的商品
      // this.$axios.post('login0/all_user_favorite_merchandise/').then(response => {
      //   console.log(response.data)
      // })
      this.$router.push('/favoritegoods')
    },
    goPostGoods () {
      this.$router.push('/sellinggoods')
      // TODO 展示发布/在售的商品
      // this.$axios.post('login0/all_user_selling_merchandise/').then(response => {
      //   console.log(response.data)
      // })
    },
    changePayPassword () {
      // 修改支付密码
      // TODO 两次确认输入
      this.$axios.post('login0/change_pay_password/', this.$qs.stringify({
        old_pay_password: this.oldPayPassword,
        new_pay_password: this.newPayPassword
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
      })
    },
    changeLoginPassword () {
      // 修改登录密码
      // TODO 两次确认输入
      this.$axios.post('login0/change_password/', this.$qs.stringify({
        old_password: this.oldLoginPassword,
        new_password: this.newLoginPassword
      })).then(response => {
        console.log(response.data)
        this.$message.info(response.data.message)
      })
    },
    sendCode () {
      this.$axios.post('login0/forget_pay_password_email/').then(response => {
        this.$message.info(response.data.message)
      })
    },
    confirmChange () {
      this.$axios.post('login0/forget_pay_password/', this.$qs.stringify({
        new_password: this.newPayPassword,
        post_code: this.changeCode
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.forgetVisible = false
        } else {
          this.$message.info(response.data.message)
        }
      })
    }
    // <el-button @click="goFavoriteUser">我收藏的卖家</el-button>
    // <el-button @click="goFavoriteGoods">我收藏的商品</el-button>
    // <el-button @click="goPostGoods">我发布的商品</el-button>
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  background:0 repeat-y url("../assets/back7.jpg");
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
  width: 1500px;
  opacity: 0.8;
}

.selection {
  display: block;
  align-items: center;
  height: 753px;
}

.tabs {
  font-size: 20px;
}

.pane-content {
  display: block;
  height: 660px;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  background: white;
  margin: 10px auto;
  opacity: 0.7;
}

table {
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  width: 100px;
  text-align: center;
}
th {
  background-color: #f7f7f7;
  color: #5c6b77;
}

.addItem {
  padding-top: 10px;
  padding-right: 10px;
  align-items: center;
  text-align: center;
  float: right;
}
</style>
