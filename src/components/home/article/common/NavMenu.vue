<template>
  <div class="navBarWrap">
    <el-menu :default-active="this.$route.path"
             router
             mode="horizontal"
             background-color="white" text-color="#222" active-text-color="red">
      <div style="text-align: center;border: none">
        <el-avatar :size="40" :src="circleUrl" style="float: left;margin-left: 20px;margin-top: 10px"/>
        <router-link to="/login"
                     style="float: left;margin-top: 20px;
                     margin-left: 8px;color: #2c3e50;
                     text-decoration: none;color: #2c3e50"
                     v-show="!showName">
          <strong>登录</strong>
        </router-link>
        <div v-show="showName">
          <el-dropdown style="float: left;margin: 20px 8px 0;color: #2c3e50" @command="handleCommond">
            <span class="el-dropdown-link">
              <strong>{{userInfo}}</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-custom" command="user">切换用户</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-platform" command="manage">后台管理</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown style="float: left;margin-top: 8px;" placement="bottom" @command="Click">
            <span class="el-dropdown-link">
              <el-badge :is-dot="message" class="item">
                <i class="el-icon-message-solid" style="font-size: 25px"/>
              </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="systemPush">
                公告<el-badge :value="msgCount" style="margin: 8px 5px 0"></el-badge>
              </el-dropdown-item>
              <el-dropdown-item command="message">
                评论
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-menu-item style="float: right" v-for="(item,i) in NavList" :key="i" :index="item.path">
          {{item.name}}
      </el-menu-item>
      <el-input placeholder="请输入内容" v-model="selArticle"
                :clearable="true"
                style="width: 300px;float: right;margin: 10px 50px"
                @keyup.enter.native="SelArticle">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'NavMenu',
  data () {
    return {
      selArticle: '',
      userInfo: '',
      showName: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      NavList: [
        { path: '/messageBord', name: '留言' },
        { path: '/about', name: '关于' },
        { path: '/page', name: '归档' },
        { path: '/index', name: '首页' }
      ],
      message: false,
      msgCount: ''
    }
  },
  mounted () {
    // this.userInfo = Cookies.get('username')
    this.userInfo = sessionStorage.getItem('username')
    console.log(this.userInfo)
    if (this.userInfo) {
      this.showName = true
      this.loadMessage()
    } else {
      this.showName = false
    }
  },
  methods: {
    handleCommond (value) {
      switch (value) {
        case 'user':
          this.$router.push({ path: '/login' })
          break
        case 'manage':
          this.$router.push({ path: '/adminIndex' })
          break
        case 'logout':
          this.$axios.get('/logout').then(resp => {
            if (resp.data.code === 200) {
              this.showName = false
              this.$store.commit('logout')
              this.$router.push({ path: '/index' })
            }
          })
          break
        default:
      }
    },
    SelArticle () {
      console.log(this.selArticle)
      this.$router.push({ path: '/index', query: { selArticle: this.selArticle } })
    },
    loadMessage () {
      this.$axios.get('/CountPush')
        .then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data.data) {
              this.message = true
              this.msgCount = resp.data.data
            }
          }
        }).catch(error => {
          console.log(error)
        })
    },
    Click (value) {
      console.log(value)
      switch (value) {
        case 'systemPush':
          this.$router.push({ path: '/SystemPush' })
          break
        case 'message':

          break
        default:
      }
    }
  }
}
</script>

<style scoped>
  .navBarWrap {
    position:fixed;
    top:0;
    z-index:1000;
    width: 100%;
    right: 1px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
