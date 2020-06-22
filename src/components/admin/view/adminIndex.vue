<template>
  <div v-loading.body="loading">
  <el-container style="height: 100vh">
    <el-header style="padding: 0">
      <NavMenu></NavMenu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;background-color: #49474E;padding: 0 ">
        <SideMenu></SideMenu>
      </el-aside>
      <el-main style="padding: 0;background-color: white">
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import SideMenu from '@/components/admin/common/SideMenu'
import NavMenu from '@/components/admin/common/NavMenu'
export default {
  name: 'adminIndex',
  components: { NavMenu, SideMenu },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style scoped>

</style>
