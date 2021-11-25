<template>
  <el-container class="outside-container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="register-container" label-position="left" label-width="0px">
      <h3 class="register_title">SUSTech Store Register</h3>
      <el-form-item prop="username">
        <el-input type="username" v-model="registerForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registerForm.email"
                  auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="verifyPassword">
        <el-input type="password" v-model="registerForm.verifyPassword"
                  auto-complete="off" placeholder="再次输入密码" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="registerForm.code"
                  auto-complete="off" placeholder="验证码" code>
        </el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" v-on:click="register">注册</el-button>
        <el-button v-on:click="getCode">发送验证码</el-button>
        <el-button v-on:click="resetForm('registerForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  // Done
  name: 'register',
  data () {
    const regEmail = /^([a-zA-Z0-9_-])+@((mail.sustech.edu.cn)|(sustech.edu.cn))+$/
    const verifyUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      callback()
    }
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
    const verifyPassword1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.verifyPassword !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    const verifyPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码必须相同'))
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
        username: [
          { validator: verifyUsername, trigger: 'blur' }
        ],
        email: [
          { validator: verifyEmail, trigger: 'blur' }
        ],
        password: [
          { validator: verifyPassword1, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ],
        verifyPassword: [
          { validator: verifyPassword2, trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度只能6-16位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      if (this.registerForm.username === '') {
        this.$message.error('请输入用户名！')
        return
      }
      if (this.registerForm.password === '') {
        this.$message.error('请输入登密码！')
        return
      }
      if (this.registerForm.code === '') {
        this.$message.error('请输入邮箱验证码！')
        return
      }
      if (this.registerForm.password !== this.registerForm.verifyPassword) {
        this.$message.error('两次输入的密码不相同！')
        return
      }
      if (this.registerForm.password.length < 6 || this.registerForm.password.length > 12) {
        this.$message.error('密码长度必须为6-12位！')
        return
      }
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
      if (this.registerForm.email === '') {
        this.$message.error('请输入验证邮箱！')
        return
      }
      const regEmail = /^([a-zA-Z0-9_-])+@((mail.sustech.edu.cn)|(sustech.edu.cn))+$/
      if (!regEmail.test(this.registerForm.email)) {
        this.$message.error('请输入南方科技大学官方邮箱！')
        return
      }
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
