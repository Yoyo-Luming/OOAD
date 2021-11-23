<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="right-head" v-on:click="homePage" title="前往主页" style="cursor:pointer;">
        <img src="../assets/testlogo.png" class="logo" alt="">
        <span class="title">SUSTech Store</span>
      </div>
      <div class="mid-head" style="width: 50%;">
        <el-input
          placeholder="请输入搜索信息"
          prefix-icon="el-icon-search"
          v-model="searchContent" style="width: 870px"
          @keyup.enter.native="searchTop">
        </el-input>
      </div>
      <div class="left-head">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">{{$store.state.userName}}</template>
            <el-menu-item index="1-1" v-on:click="myPage">个人主页</el-menu-item>
            <el-menu-item index="1-2" v-on:click="cartPage">购物车</el-menu-item>
            <el-menu-item index="1-3" v-on:click="sellPage">上架的商品</el-menu-item>
            <el-menu-item index="1-4" v-on:click="markPage">收藏的商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" v-on:click="logOut">注销</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-container style="display: flex;height: 100%;">
      <el-aside width="200px" style="background-color: #545c64;opacity: 0.5;">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu class="menu-buttons" index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户信息</span>
            </template>
            <el-button class="inside-button" v-on:click="UserInfoFormVisible=true">修改个人信息</el-button><br>
            <el-button class="inside-button" v-on:click="uploadHeaderPhotoVisible=true">上传头像</el-button><br>
            <el-button class="inside-button" v-on:click="LoginPassWordVisible=true">修改登录密码</el-button><br>
            <el-button class="inside-button" v-on:click="PayPassWordVisible=true">修改支付密码</el-button><br>
            <el-button class="inside-button" v-on:click="forgetVisible=true">忘记支付密码</el-button><br>
            <el-button class="inside-button" v-on:click="recharge">充值</el-button><br>
            <el-button class="inside-button" v-on:click="activeSellFromVisible=true">成为卖家</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品</span>
            </template>
            <el-button class="inside-button" v-on:click="goSellOrder">卖出的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goBuyOrder">买到的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goPostGoods">发布的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goNewGoods">上架新商品</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="3">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>收藏</span>
            </template>
            <el-button class="inside-button" v-on:click="goFavoriteGoods">收藏的商品</el-button><br>
            <el-button class="inside-button" v-on:click="goFavoriteUser">收藏的卖家</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="4">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>地址</span>
            </template>
            <el-button class="inside-button" v-on:click="addressFormVisible=true">新收货地址</el-button><br>
            <el-button class="inside-button" v-on:click="sendAddressFormVisible=true">新发货地址</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="5">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>跑腿</span>
            </template>
            <el-button class="inside-button" v-on:click="goTaskHall">任务大厅</el-button><br>
            <el-button class="inside-button" v-on:click="goReleasedTask">发布的跑腿任务</el-button><br>
            <el-button class="inside-button" v-on:click="goReceivedTask">接受的跑腿任务</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" index="6">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>通知</span>
            </template>
            <el-button class="inside-button" v-on:click="goNoticePage">通知详情</el-button><br>
          </el-submenu>
          <el-submenu class="menu-buttons" v-if="$store.state.userStatus === 3" index="7">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>管理员</span>
            </template>
            <el-button class="inside-button" v-on:click="goAdminPage">管理员页面</el-button><br>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%;padding: 0;">
        <el-container class="mid-content">
          <el-tabs type="border-card" v-model="activePane">
            <!--          pay-pane-->
            <el-tab-pane label="个人信息" class="whole-pane" name="first">
              <el-container class="user-info">
                <el-image class="big-photo" :src="userInfo.photo" fit="contain" :alt="userInfo.name"></el-image>
                <el-container class="contents">
                  <div class="user-name">用户名：{{userInfo.name}}</div>
                  <div class="user-describe">用户类型：{{userInfo.userType}}</div>
                  <div class="user-describe">用户邮箱：{{userInfo.email}}</div>
                  <div class="user-describe">用户描述：{{userInfo.description}}</div>
                  <div class="user-describe">用户真名：{{userInfo.realName}}</div>
                  <div class="user-describe">用户余额：{{userInfo.balance}}</div>
                </el-container>
              </el-container>
            </el-tab-pane>
            <!--          receive-pane-->
            <el-tab-pane label="收货地址" class="whole-pane" name="second">
              <div v-if="address.length">
                <el-container class="whole-order" v-for="(item, index) in address" :key="index">
                  <el-container class="order-name">{{item.name}}</el-container>
                  <el-container class="order-road">{{item.region}}</el-container>
                  <el-container class="order-detail">{{item.phone}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="deleteAddress">删除</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有，快去添加收货地址吧~</h2>
              </div>
            </el-tab-pane>
            <!--          evaluate-pane-->
            <el-tab-pane label="发货地址" class="whole-pane" name="third">
              <div v-if="sendAddress.length">
                <el-container class="whole-order" v-for="(item, index) in sendAddress" :key="index">
                  <el-container class="order-name">{{item.name}}</el-container>
                  <el-container class="order-road">{{item.region}}</el-container>
                  <el-container class="order-detail">{{item.phone}}</el-container>
                  <el-container class="order-pay">
                    <el-button class="last-button" v-on:click="deleteSendAddress">删除</el-button>
                  </el-container>
                </el-container>
              </div>
              <div v-else>
                <h2>这里什么也没有，快去添加发货地址吧~</h2>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-container>
      </el-main>
      <el-dialog title="编辑用户信息" :visible.sync="UserInfoFormVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" :model="fromData" label-width="200px" :rules="rules">
          <el-form-item label="身份" prop="userType">
            <el-select v-model="fromData.userType" placeholder="请选择身份">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名" prop="trueName">
            <el-input v-model="fromData.trueName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input v-model="fromData.description" placeholder="请输入简介"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="UserInfoFormVisible = false">取消</el-button>
          <el-button type="primary" @click="changUserInfo">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="上传用户头像" :visible.sync="uploadHeaderPhotoVisible">
        <el-upload
          action="auto"
          :http-request="uploadHeaderSectionFile"
          list-type="picture-card"
          class = "contentImgStyle"
          :limit="1"
          :on-exceed="handleExceed">
          <i class="el-icon-plus" ></i>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadHeaderPhotoVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadHeaderPhoto">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="激活用户信息" :visible.sync="activeFromVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" :model="activeFromData" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="activeFromData.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="userName2">
            <el-select v-model="activeFromData.userType" placeholder="请选择身份">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付密码" prop="payPassword">
            <el-input v-model="activeFromData.payPassword" placeholder="请输入支付密码"></el-input>
          </el-form-item>
          <el-form-item label="确认支付密码" prop="activeFromDataPayPassword">
            <el-input v-model="activeFromData.activeFromDataPayPassword" placeholder="请再次输入支付密码"></el-input>
          </el-form-item>
          <el-form-item label="默认收货地址">
            <el-form-item label="收货人姓名" prop="consigneeName" style="margin-top: 15px;">
              <el-input v-model="activeFromData.consigneeName" placeholder="请输入收货人姓名"></el-input>
            </el-form-item>
            <el-form-item label="收货区域" prop="region" style="margin-top: 15px;">
              <el-select v-model="activeFromData.region" placeholder="请选择收货区域">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="address" style="margin-top: 15px;">
              <el-input v-model="activeFromData.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话号码" prop="phone" style="margin-top: 15px;">
              <el-input v-model="activeFromData.phone" placeholder="请输入收货人电话号码"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="activeFromVisible=false">取消</el-button>
          <el-button type="primary" @click="activate">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑收货地址" :visible.sync="addressFormVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" :model="fromData" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="收件人姓名" prop="recName">
            <el-input v-model="addressFromData.name" placeholder="请输入收件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收货区域" prop="recRegion">
            <el-select v-model="addressFromData.region" placeholder="请选择收货区域">
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="recAddress">
            <el-input v-model="addressFromData.address" placeholder="请输入详细收货地址"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="recPhone">
            <el-input v-model="addressFromData.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addressFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addAddress">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑发货地址" :visible.sync="sendAddressFormVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" :model="sendAddressFromData" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="发件人姓名" prop="senName">
            <el-input v-model="sendAddressFromData.name" placeholder="请输入发件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="发货区域" prop="senRegion">
            <el-select v-model="sendAddressFromData.region" placeholder="请选择发货区域">
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="senAddress">
            <el-input v-model="sendAddressFromData.address" placeholder="请输入详细收货地址"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="senPhone">
            <el-input v-model="sendAddressFromData.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sendAddressFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSendAddress">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="忘记密码" :visible.sync="LoginPassWordVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="旧登录密码"  prop="oldLoginPassword">
            <el-input v-model="oldLoginPassword" placeholder="请输入旧登录密码"></el-input>
          </el-form-item>
          <el-form-item label="新登录密码" prop="newLoginPassword">
            <el-input v-model="newLoginPassword" placeholder="请输入新登录密码"></el-input>
          </el-form-item>
          <el-form-item label="新登录密码" prop="verifyNewLoginPassword">
            <el-input v-model="verifyNewLoginPassword" placeholder="请再次输入新登录密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="LoginPassWordVisible=false">取消</el-button>
          <el-button type="primary" @click="changeLoginPassword">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改支付密码" :visible.sync="PayPassWordVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="旧支付密码" prop="oldPayPassword">
            <el-input v-model="oldPayPassword" placeholder="请输入旧支付密码"></el-input>
          </el-form-item>
          <el-form-item label="新支付密码" prop="newPayPassword">
            <el-input v-model="newPayPassword" placeholder="请输入新支付密码"></el-input>
          </el-form-item>
          <el-form-item label="新支付密码" prop="verifyNewPayPassword">
            <el-input v-model="verifyNewPayPassword" placeholder="请再次输入新支付密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PayPassWordVisible=false">取消</el-button>
          <el-button type="primary" @click="changePayPassword">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="忘记支付密码" :visible.sync="forgetVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="新支付密码" prop="">
            <el-input v-model="newPayPassword" placeholder="请输入新支付密码"></el-input>
          </el-form-item>
          <el-form-item label="新支付密码" prop="verifyNewPayPassword">
            <el-input v-model="verifyNewPayPassword" placeholder="请再次输入新支付密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode">
            <el-input v-model="changeCode" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="forgetVisible=false">取消</el-button>
          <el-button type="primary" @click="sendCode">发送邮箱验证码</el-button>
          <el-button type="primary" @click="confirmChange">确认修改</el-button>
        </div>
      </el-dialog>
      <el-dialog title="激活卖家" :visible.sync="activeSellFromVisible" center width="700px" :modal-append-to-body="false">
        <el-form ref="form" :model="activeSellFromData" label-width="200px" label-position="left" :rules="rules">
          <el-form-item label="卖家" prop="sellerName">
            <el-input v-model="activeSellFromData.name" placeholder="请输入卖家姓名"></el-input>
          </el-form-item>
          <el-form-item label="发货区域" prop="sellerRegion">
            <el-select v-model="activeSellFromData.region" placeholder="请选择发货区域">
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="sellerAddress">
            <el-input v-model="activeSellFromData.address" placeholder="请输入详细收货地址"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="sellerPhone">
            <el-input v-model="activeSellFromData.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="收款二维码" prop="sellerQR">
            <el-upload
              action="auto"
              :http-request="uploadQRCodeSectionFile"
              list-type="picture-card"
              class = "contentImgStyle"
              :limit="1"
              :on-exceed="handleExceed">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="activeSellFromVisible=false">取消</el-button>
          <el-button type="primary" @click="activateSell">提交</el-button>
        </div>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Person',
  data () {
    const verifyEmpty = (rule, value, callback) => {
      if (value === '') {
        console.log(value)
        callback(new Error('此项不能为空'))
      } else {
        console.log(value)
        callback()
      }
    }
    const verifyActiveFromDataPayPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.activeFromData.payPassword) {
        callback(new Error('两次输入的密码必须相同'))
      } else {
        callback()
      }
    }
    const verifyNewPayPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newPayPassword) {
        callback(new Error('两次输入的密码必须相同'))
      } else {
        callback()
      }
    }
    const verifyNewLoginPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newLoginPassword) {
        callback(new Error('两次输入的密码必须相同'))
      } else {
        callback()
      }
    }
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
      searchContent: '',
      // 激活卖家功能表单数据
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
      uploadHeaderPhotoFile: [],
      uploadFile: [],
      uploadQRCodeFile: [],
      hasPhoto: false,
      address: [
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
        payPassword: '',
        activeFromDataPayPassword: ''
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
      money: 10000,
      activeSellFromVisible: false,
      newPayPassword: '',
      verifyNewPayPassword: '',
      newLoginPassword: '',
      verifyNewLoginPassword: '',
      oldPayPassword: '',
      oldLoginPassword: '',
      forgetVisible: false,
      uploadHeaderPhotoVisible: false,
      LoginPassWordVisible: false,
      changeCode: '',
      activePane: 'first',
      rules: {
        userType: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        trueName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        description: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        realName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        userType2: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        payPassword: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        consigneeName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        region: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        address: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        phone: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        recName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        recRegion: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        recAddress: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        recPhone: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        senName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        senRegion: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        senAddress: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        senPhone: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        oldLoginPassword: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        newLoginPassword: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        oldPayPassword: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        newPayPassword: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        checkCode: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        sellerName: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        sellerRegion: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        sellerAddress: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        sellerPhone: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        sellerQR: [
          { validator: verifyEmpty, trigger: 'blur' }
        ],
        activeFromDataPayPassword: [
          { validator: verifyActiveFromDataPayPassword, trigger: 'blur' }
        ],
        verifyNewPayPassword: [
          { validator: verifyNewPayPassword, trigger: 'blur' }
        ],
        verifyNewLoginPassword: [
          { validator: verifyNewLoginPassword, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // console.log(this.$global.userStatus)
    console.log(this.$store.state.userStatus)
    if (this.$store.state.userStatus === 0) {
      this.activeFromVisible = true
    } else {
      this.$axios.post('/login0/get_user_details/', this.$qs.stringify({}))
        .then(response => {
          if (response.data.message === '用户无权访问') {
            // 用户未激活，先激活
            this.activeFromVisible = true
          } else {
            console.log(response.data)
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
    cartPage () {
      this.$router.push('/cart')
    },
    sellPage () {
      this.$router.push('/sellinggoods')
    },
    markPage () {
      this.$router.push('/favoritegoods')
    },
    goNoticePage () {
      this.$router.push('/notice')
    },
    logOut () {
      this.$axios.post('login0/logout/')
      this.$store.commit('setLogout')
      this.$router.push('/login')
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
    changUserInfo () {
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
        console.log(response.data)
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.UserInfoFormVisible = false
        }
      })
    },
    uploadHeaderPhoto () {
      let headerForm = new FormData()
      headerForm.append('header_photo', this.uploadHeaderPhotoFile[0].photo)
      this.$axios({method: 'post', url: '/login0/upload_head_photo/', data: headerForm}).then(response => {
        if (response.data.status === '200') {
          // this.userInfo.photo =
          this.$message.success(response.data.message)
          this.uploadHeaderPhotoFile = []
        } else {
          this.$message.info(response.data.message)
        }
      })
    },
    handleExceed () {
      this.$message.warning('最多只能上传一张相片！')
    },
    uploadHeaderSectionFile (param) {
      let fileObj = param.file
      let file = new File([fileObj], new Date().getTime() + '.jpg', {
        type: 'image/jpg'
      })
      this.uploadHeaderPhotoFile.push({'photo': file})
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
        if (response.data.status === '200') {
          this.$store.commit('setUserStatus', 1)
        }
        this.$axios.post('/login0/add_address/', this.$qs.stringify({
          current_user: this.$store.state.userId,
          user_name: this.activeFromData.consigneeName,
          region_id: this.activeFromData.region,
          user_addr: this.activeFromData.address,
          user_phone: this.activeFromData.phone,
          address_type: 1
        })).then(response => {
          // this.$store.state.userStatus = 1
          if (response.data.status === '200') {
            // this.$store.commit('setUserStatus', 1)
            // this.$message.success()
            this.activeFromVisible = false
          }
        })
      })
    },
    goSellOrder () {
      this.$router.push('/sellorder')
    },
    goBuyOrder () {
      this.$router.push('/buyorder')
    },
    searchTop () {
      this.$store.commit('setToSearchPage', {
        searchContent: this.searchContent,
        labels: undefined,
        status: undefined,
        orderMethod: undefined
      })
      this.$router.push('/result')
      // this.$router.push({name: 'Result',
      //   params: {
      //     searchContent: this.searchContent,
      //     labels: undefined,
      //     status: undefined,
      //     orderMethod: undefined
      //   }
      // })
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
              // this.$global.userStatus = 2
              this.$store.commit('setUserStatus', 2)
              // this.$store.state.userStatus = 2
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
      this.$router.push('/favoriteusers')
    },
    goReleasedTask () {
      this.$router.push('/releasedtask')
    },
    goReceivedTask () {
      this.$router.push('/receivedtask')
    },
    goTaskHall () {
      this.$router.push('/taskhall')
    },
    goFavoriteGoods () {
      this.$router.push('/favoritegoods')
    },
    goPostGoods () {
      this.$router.push('/sellinggoods')
    },
    goNewGoods () {
      this.$router.push('/addgoods')
    },
    goAdminPage () {
      this.$router.push('/handleproblem')
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
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background: center repeat url("../assets/back7.jpg");
  background-size: cover;
  display: -webkit-box;
}

.el-header {
  background: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 40px;
  opacity: 0.7;
}

.right-head {
  display: flex;
  align-items: center;
}

.mid-head {
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
  width: 1200px;
}

.whole-pane {
  display: block;
}

.whole-order {
  display: flex;
  justify-content: space-evenly;
  margin-top: 5px;
  border-bottom: 2px solid #eaeaea;
}

.order-name {
  width: 150px;
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
  font-family: 黑体;
}

.order-road {
  width: 150px;
  word-wrap: anywhere;
  word-break: normal;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-detail {
  width: 150px;
  overflow: hidden;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
}

.order-pay {
  width: 150px;
  align-items: center;
  justify-content: space-evenly;
}

.last-button {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
  margin-bottom: 5px;
  justify-content: space-evenly;
}

.big-photo {
  height: 400px;
  width: 400px;
  border: 2px solid #eaeaea;
}

.user-info {
  display: flex;
}

.contents {
  display: block;
  margin-left: 200px;
  text-align: center;
  align-items: center;
}

.user-name {
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  color: #8d99ae;
}

.user-describe {
  margin-top: 30px;
  font-size: 20px;
  text-align: left;
  color: #8d99ae;
}

.menu-buttons {
  display: block;
  margin: auto;
  text-align: center;
  align-items: center;
}

.inside-button {
  margin-top: 5px;
  border: 0;
  text-align: center;
  align-items: center;
  background-color: #545c64;
  color: #ffffff;
}
</style>
