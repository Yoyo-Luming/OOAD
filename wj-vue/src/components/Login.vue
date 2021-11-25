<template>
  <el-container class="outside-container">
    <el-container class="mid-container">
      <el-form  :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">SUSTech Store</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <div class="buttons">
            <Vcode :show="isShow" @success="success" @close="close"/>
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录
            </el-button>
            <br>
            <el-button type="primary" style="margin-top: 20px;width: 100%;background: #505458;border: none" v-on:click="forgetPassword">忘记密码
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-container class="toRegister-container">
        <div class="register">
          <span>还没有账号吗？</span>
          <br>
          <span>快加入我们！</span>
          <el-button type="info" style="width: 100%;background: #505458; margin: 50px auto;border: none" v-on:click="register">注册
          </el-button>
        </div>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form ref="form" :model="changeForm" label-width="200px" :rules="rules">
        <el-form-item label="邮箱" prop="mailBox">
          <el-input v-model="changeForm.mailBox"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="changeForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="changeCode">
          <el-input v-model="changeForm.changeCode" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="sendCode">发送验证码</el-button>
        <el-button type="success" @click="confirmChange">确认修改</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Vcode from 'vue-puzzle-vcode'

export default {
  // Done
  name: 'login',
  mounted () {
    this.$global.webSocket.close()
  },
  data () {
    const regEmail = /^([a-zA-Z0-9_-])+@((mail.sustech.edu.cn)|(sustech.edu.cn))+$/
    const verifyEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (!regEmail.test(this.registerForm.email)) {
          callback(new Error('请输入正确格式'))
        }
        callback()
      }
    }
    const verifyEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项不能为空'))
      } else {
        callback()
      }
    }
    const verifyUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const verifyPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      dialogFormVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: [],
      rules: {
        username: [
          { validator: verifyUsername, trigger: 'blur' }
        ],
        password: [
          { validator: verifyPassword, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ],
        mailBox: [
          { validator: verifyEmail, trigger: 'blur' }
        ],
        newPassword: [
          { validator: verifyEmpty, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ],
        changeCode: [
          { validator: verifyEmpty, trigger: 'blur' }
        ]
      },
      changeForm: {
        mailBox: '',
        newPassword: '',
        changeCode: ''
      },
      url: 'ws://192.168.68.223:9000/api/ws/chat/'
    }
  },
  components: {
    Vcode
  },
  methods: {
    login () {
      // console.log(this.$store.state.userName)
      // console.log(this.$global.userName)
      if (this.loginForm.username === '') {
        this.$message.error('请输入用户名！')
        return
      }
      if (this.loginForm.password === '') {
        this.$message.error('请输入登录密码！')
        return
      }
      this.isShow = true
    },
    mounted () {
    },
    success () {
      // this.$store.commit('setUserName', this.loginForm.username)
      // this.$router.push('/result')
      // this.$store.commit('setUserName', 'vuexoyxd')
      // this.$global.username = 'globaloyxd'
      // this.$store.commit('setUserId', '1111')
      // this.$store.commit('setUserStatus', 0)
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
            console.log(successResponse.data)
            if (successResponse.data.status === '200') {
              this.$store.commit('setUserName', this.loginForm.username)
              this.$store.commit('setUserId', successResponse.data.user_id)
              this.$store.commit('setUserStatus', successResponse.data.user_status)
            }
            this.$message.success(successResponse.data.message)
            this.$global.initWebSocket()
            if (this.$store.state.userStatus === 0) {
              this.$router.push('/person')
            } else {
              this.$router.push('/home')
            }
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
    forgetPassword () {
      this.dialogFormVisible = true
    },
    sendCode () {
      if (this.changeForm.mailBox === '') {
        this.$message.error('请输入验证邮箱！')
        return
      }
      this.$axios.post('login0/forget_password_email/', this.$qs.stringify({
        user_email: this.changeForm.mailBox
      })).then(response => {
        this.$message.info(response.data.message)
      })
    },
    confirmChange () {
      if (this.changeForm.newPassword === '') {
        this.$message.error('请输入新密码！')
        return
      }
      if (this.changeForm.changeCode === '') {
        this.$message.error('请输入验证码！')
        return
      }
      this.$axios.post('login0/forget_password/', this.$qs.stringify({
        new_password: this.changeForm.newPassword,
        post_code: this.changeForm.changeCode
      })).then(response => {
        if (response.data.status === '200') {
          this.$message.success(response.data.message)
          this.dialogFormVisible = false
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
  height: 450px;
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
  display: block;
  align-items: center;
  text-align: center;
  margin: auto;
  font-size: 30px;
}

.buttons {
  display: block;
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
