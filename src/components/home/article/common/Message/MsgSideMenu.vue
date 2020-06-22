<template>
  <div style="margin: 30px 0 0 100px ">
    <el-menu :default-active="this.$route.path"
             router
             background-color="white"
             text-color="#222"
             active-text-color="red">
      <div >
        <el-menu-item style="height: 40px;line-height: 40px" v-for="(item,i) in NavList" :key="i" :index="item.path">
          {{item.name}}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MsgSideMenu',
  data () {
    return {
      NavList: [
        { path: '/SystemPush', name: '公告' },
        { path: '/', name: '评论' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
