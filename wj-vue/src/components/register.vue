<template>
  <el-container class="outside-container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="register-container" label-position="left" label-width="0px">
      <h3 class="register_title">SUSTech Store Register</h3>
      <el-form-item prop="username">
        <el-input type="username" v-model="registerForm.username"
                  auto-complete="off" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registerForm.email"
                  auto-complete="off" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="pas sword">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="Password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="verifyPassword">
        <el-input type="password" v-model="registerForm.verifyPassword"
                  auto-complete="off" placeholder="verifyPassword" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="registerForm.code"
                  auto-complete="off" placeholder="code" code>
        </el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" v-on:click="register">注册</el-button>
        <el-button v-on:click="getCode">getcode</el-button>
        <el-button v-on:click="resetForm('registerForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'register',
  data () {
    // const regEmail = /^[0-9]*$/
    // const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const verifyEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your username'))
      }
      // else {
      //   if (!regEmail.test(this.registerForm.username)) {
      //     callback(new Error('Please input right email format'))
      //   }
      //   callback()
      // }
    }
    const verifyPassword1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password'))
      } else {
        if (this.registerForm.verifyPassword !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    const verifyPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password again'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('Your password are different!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        verifyPassword: '',
        code: ''
      },
      rules: {
        email: [
          { validator: verifyEmail, trigger: 'blur' }
        ],
        password: [
          { validator: verifyPassword1, trigger: 'blur' }
        ],
        verifyPassword: [
          { validator: verifyPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$axios.post('login0/register/', this.$qs.stringify({
        status: 1,
        code: this.registerForm.code,
        username: this.registerForm.username,
        user_email: this.registerForm.email,
        password: this.registerForm.password
      }))
        .then(response => {
          console.log(response.data)
          this.$message.info(response.data.message)
          if (response.data.status === '200') {
            this.$router.push('/login')
          }
        })
      // 待完成
    },
    getCode () {
      this.$axios.post('login0/new_register_email/', this.$qs.stringify({
        user_email: this.registerForm.email,
        status: 0
      })).then(response => {
        console.log(response)
        console.log(response.data.message)
        this.$message.info(response.data.message)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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

.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  height: 450px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  opacity: 0.8;
}

.register_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.button-container {
  margin: auto;
}
</style>
