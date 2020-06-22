<template>
  <div style="position: fixed;z-index: 1;top: 58px;left: 0;width: 200px">
    <el-menu :default-active="currentPath"
             router
             background-color="#49474E"
             text-color="#fff"
             active-text-color="#ffd04b"
             class="el-menu-vertical-demo">

      <template v-for="(item,i) in adminMenus" >
        <template v-if="item.children.length!==0">
          <!--index 没有用但是必需字段且为 string -->
          <el-submenu :key="i" :index="i + ''" style="text-align: left">
          <span slot="title" style="font-size: 15px;">
            <i :class="item.icon"></i>
           {{item.name_zh}}
          </span>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
              <i :class="child.icon"></i>
              {{ child.name_zh}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name_zh }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'SideMenu',
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    },
    currentPath () {
      return this.$route.path
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
