<template>
  <el-container class="outside-container">
<!--    <img src="http://10.17.102.0:8080/api/commodity/download/?key=eyJtZXJfaWQiOjMzLCJkYXRlIjoiMjAyMS0xMC0wMyAyMjo0NDozOC4xMDkyNjEiLCJwYXRoIjoiQzpcXHB5Y2hhcm1cXE9PQURcXEZpbmFsX3Byb2plY3RcXFRyeTJcXGltYWdlU3RvcmVcXHVzZXJfMVxcdXBsb2FkX21lcmNoYW5kaXNlXzFfdGltZV8yMDIxLTEwLTAzXzIxNDEzNC40Mzk4MjBfaW1hZ2VfcGlja2VyMjQ5MzcwMjE1MDg3NjYwMzE3OS5qcGcifQ:1mX2jG:zT3-Mh3tw9hk_2zyomlX1YI3Q8oA7vEFNaNLE1dWnKg">-->
    <el-container class="mid-container">
      <el-form  :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">SUSTech Store</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="Password" show-password></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <div>
            <Vcode :show="isShow" @success="success" @close="close"/>
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录
            </el-button>
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="forgetVisible=true">忘记密码
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-container class="toRegister-container">
        <div class="register">
          <span>Haven't got an account?</span>
          <br>
          <span>Join us right now!</span>
          <el-button type="info" style="width: 100%;background: #505458; margin: 50px auto;border: none" v-on:click="register">注册
          </el-button>
        </div>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="forgetVisible">
      邮箱：<el-input v-model="mailBox">邮箱</el-input>
      验证码：<el-input v-model="changeCode"></el-input>
      新登录密码：<el-input v-model="newPassword"></el-input>
      <el-button @click="fogetVisible=false">取消</el-button>
      <el-button @click="sendCode">发送邮箱验证码</el-button>
      <el-button @click="confirmChange">确认修改</el-button>
    </el-dialog>
  </el-container>
</template>

<script>
import Vcode from 'vue-puzzle-vcode'

export default {
  name: 'login',
  data () {
    const verifyPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password'))
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: [],
      rules: {
        password: [
          { validator: verifyPassword, trigger: 'blur' }
        ]
      },
      url: 'ws://192.168.68.223:9000/api/ws/chat/',
      forgetVisible: false,
      changeCode: '',
      newPassword: '',
      mailBox: ''
    }
  },
  components: {
    Vcode
  },
  methods: {
    login () {
      this.isShow = true
    },
    mounted () {
    },
    success () {
      this.isShow = false
      this.$axios
        .post('login0/pc_login/', this.$qs.stringify({
          user_email: this.loginForm.username,
          password: this.loginForm.password
        }))
        .then(successResponse => {
          console.log(successResponse.data)
          // 错误情况:
          // message: "密码不正确"
          // status: "401"
          // 登录成功: 返回 user_id user_status:0未激活 1激活买家 2激活卖家
          // message: "用户 oy2 登陆成功"
          // status: "200"
          // user_id: "Ng:1mn0EW:E9Q8FzjTM4_hxAT0_tgLYWz-l3F_ddIeHQ2mwxAE-kQ"
          // user_status: 2
          if (successResponse.data.status === '200' || successResponse.data.status === '300') {
            this.$global.setUser(this.loginForm.username)
            this.$global.setUserId(successResponse.data.user_id)
            this.$message.success(successResponse.data.message)
            this.$global.userState = successResponse.data.user_status
            this.$global.initWebSocket()
            this.$router.push('/result')
          } else {
            this.$message.error(successResponse.data.message)
          }
        })
        // .catch(failResponse => {
        //   console.log(1)
        //   alert(failResponse)
        // })
    },
    close () {
      this.isShow = false
    },
    register () {
      this.$router.push('/register')
    },
    sendCode () {
      this.$axios.post('login0/forget_password_email/', this.$qs.stringify({
        user_email: this.mailBox
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    confirmChange () {
      this.$axios.post('login0/forget_password/', this.$qs.stringify({
        new_password: this.newPassword,
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

<style>
.outside-container {
  background:url("../assets/back4.jpg");
  width:100%;
  height:100%;
  padding: 0;
  position:fixed;
  background-size:100% 100%;
}

.mid-container {
  width: 400px;
  height: 500px;
  display: block;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  height: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  opacity: 0.8;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.toRegister-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 420px;
  height: 250px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  opacity: 0.8;
}

.register {
  font-size: 30px;
}
</style>

<!--<template>-->
<!--  <el-card>-->
<!--    用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>-->
<!--    <br><br>-->
<!--    密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>-->
<!--    <br><br>-->
<!--    <el-image style="width: 150px; height: 30px" :src = "imgCode"></el-image>-->
<!--&lt;!&ndash;    <img :src="'data:image/png;base64,' + imgCode" alt="验证码"/>&ndash;&gt;-->
<!--&lt;!&ndash;    <img :src="imgCode" alt="验证码"/>&ndash;&gt;-->
<!--&lt;!&ndash;    <el-image s></el-image>&ndash;&gt;-->
<!--    <br><br>-->
<!--    验证码： <input type="text" v-model="loginForm.answer" placeholder="请输入验证码"/>-->
<!--    <br><br>-->
<!--    <button v-on:click="login">登录</button>-->
<!--    <br><br>-->
<!--    <button v-on:click="getImg">获取验证码</button>-->
<!--  </el-card>-->
<!--</template>-->
<!--<script>-->

<!--export default {-->
<!--  name: 'Login',-->
<!--  data () {-->
<!--    return {-->
<!--      loginForm: {-->
<!--        username: '',-->
<!--        password: '',-->
<!--        answer: ''-->
<!--      },-->
<!--      responseResult: [],-->
<!--      imgCode: ''-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    login () {-->
<!--      this.$axios.post('/login0/pc_login/', this.$qs.stringify({-->
<!--        username: this.loginForm.username,-->
<!--        password: this.loginForm.password,-->
<!--        answer: this.loginForm.answer-->
<!--      }))-->
<!--        .then(response => {-->
<!--          alert(response.data.c_time)-->
<!--        })-->
<!--        .catch(failResponse => {-->
<!--          alert('1')-->
<!--        })-->
<!--    },-->
<!--    getImg () {-->
<!--      // this.$axios.get('/login/login/', {-->
<!--      //   responseType: 'arraybuffer'-->
<!--      // }).then(response => {-->
<!--      //   console.log(response.data.img)-->
<!--      //   // let str = response.data.img.toString()-->
<!--      //   return 'data:image/png;base64,' + btoa(-->
<!--      //     new Uint8Array(response.data.img)-->
<!--      //       .reduce((data, byte) => data + String.fromCharCode(byte), '')-->
<!--      //   )-->
<!--      // }).then(data => {-->
<!--      //   console.log(2)-->
<!--      //   this.imgCode = data-->
<!--      // })-->
<!--      // console.log(3)-->
<!--      // console.log(this.imgCode)-->
<!--      this.$axios.get('/login0/pc_login/').then(response => {-->
<!--        let str = response.data.img.toString()-->
<!--        str = str.trim()-->
<!--        // str = str.substr(2, str.length - 1)-->
<!--        str = 'data:image/png;base64,' + str.substr(2, str.length)-->
<!--        console.log(str)-->
<!--        let blob = new Blob([str], {type: 'image/png'})-->
<!--        console.log(blob)-->
<!--        let url = window.URL.createObjectURL(blob)-->
<!--        console.log(url)-->
<!--        this.imgCode = str-->
<!--        // this.imgCode = str-->
<!--        // this.imgCode = window.URL.createObjectURL(new Blob([str]))-->
<!--        // this.imgCode = str-->
<!--        // this.imgCode = window.URL.createObjectURL(str)-->
<!--        // this.imgCode = window.URL.createObjectURL(new Blob([str], {type: 'image/png'}))-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
