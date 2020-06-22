<template>
  <el-container>
    <el-header>
      <NavMenu></NavMenu>
    </el-header>
    <el-container>
      <el-main>
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </el-main>
      <el-aside style="width: 400px">
        <SideMenu></SideMenu>
      </el-aside>
    </el-container>

  </el-container>
</template>

<script>
import NavMenu from '@/components/home/article/common/NavMenu'
import SideMenu from '@/components/home/article/common/SideMenu'
export default {
  name: 'home',
  components: { SideMenu, NavMenu }
}
</script>

<style scoped>

</style>
