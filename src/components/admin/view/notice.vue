<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
      <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="width: 600px;margin: 50px auto 20px;padding: 10px;border-radius: 30px">
      <el-input placeholder="请输入公告标题" v-model="title" style="margin-bottom: 10px"></el-input>
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入公告内容"
        v-model="textarea">
      </el-input>
    </el-card>
    <div style="text-align: center">
      <el-button type="primary" size="medium" style="width: 100px" @click="notification">发表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      textarea: '',
      title: ''
    }
  },
  methods: {
    notification () {
      this.$axios.post('/SystemPush', {
        message: this.textarea,
        title: this.title
      }).then(resp => {
        console.log(resp)
        this.$message('发表成功！')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
