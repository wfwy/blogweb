<template>
  <el-col class="bg">
    <div class="dbg">
      <el-card class="box" shadow="always">
        <el-form>
          <h3 align="center">系统注册</h3>
          <el-form-item>
            <el-input type="text" placeholder="账号" prefix-icon="el-icon-s-custom" clearable v-model="Register.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="密码" prefix-icon="el-icon-lock" show-password v-model="Register.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      Register: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      if (this.Register.username === '' || this.Register.password === '') {
        alert('账号或密码不能为空！请输入账号密码!')
      } else {
        this.$axios.post('/register', {
          username: this.Register.username,
          password: this.Register.password
        }).then(resp => {
          console.log(resp)
          if (resp && resp.data.code === 200) {
            this.$message('注册成功！')
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>
  .bg {
    background: lavender;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .dbg{
    width: 400px;
    margin: 150px auto;
    background: #2c3e50;
    background-size: 100% 100%;
    border-radius: 30px;
  }
  .box {
    width: 400px;
    margin: 150px auto;
    background-color: darkgray;
    background-size: 100% 100%;
    border-radius: 30px;
  }
  .el-input, .el-button {
    width: 300px;
    background: #2c3e50
  }
</style>
