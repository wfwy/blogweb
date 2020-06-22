<template>
    <el-container style="height: 100vh;background-color: lavender;padding: 0">
      <el-header>
        <NavMenu></NavMenu>
      </el-header>
      <el-container>
        <el-aside>
          <MsgSideMenu></MsgSideMenu>
        </el-aside>
        <el-main style="padding: 0">
          <keep-alive>
            <router-view :key="$route.fullPath"/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import MsgSideMenu from '@/components/home/article/common/Message/MsgSideMenu'
import NavMenu from '@/components/home/article/common/NavMenu'
export default {
  name: 'MsgIndex',
  components: { NavMenu, MsgSideMenu }
}
</script>

<style scoped>

</style>
