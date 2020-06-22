<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
      <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/adminIndex/user/userManage'}">用户详情</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'authority'
}
</script>

<style scoped>

</style>
