<template>
  <div style="position:fixed;top:0; width: 100%;padding: 0;z-index: 2000 ">
    <el-menu background-color="darkgray" mode="horizontal">
      <div style="text-align: center">
        <el-menu-item>
          <span style="font-size: 30px;">后台管理</span>
          <el-dropdown style="float: right;color: #2c3e50" @command="handleCommand">
            <span class="el-dropdown-link">
              <strong>{{username}}</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-house" command="home">主页面</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-custom" command="user">切换用户</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar :size="40" :src="circleUrl" style="float: right;margin-right: 10px;margin-top: 8px"></el-avatar>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: ''
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
  },
  methods: {
    handleCommand (value) {
      switch (value) {
        case 'home':
          this.$router.$addRoutes(this.$router.options.routes)
          this.$router.push({ path: '/index' })
          break
        case 'user':
          this.$router.$addRoutes(this.$router.options.routes)
          this.$router.push({ path: '/login' })
          break
        case 'logout':
          this.$axios.get('/logout').then(resp => {
            if (resp.data.code === 200) {
              this.$store.commit('logout')
              this.$router.replace('/index')
              this.$router.$addRoutes(this.$router.options.routes)
            }
          })
          break
        default:
      }
    }
  }
}
</script>

<style scoped>

</style>
