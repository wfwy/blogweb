<template>
   <div>
     <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
       <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">内容管理</el-breadcrumb-item>
       <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">博客编辑</el-breadcrumb-item>
       <el-breadcrumb-item >Markdown</el-breadcrumb-item>
     </el-breadcrumb>
     <el-row style="height: calc(100vh - 60px);">
       <mavon-editor v-model="article.markdown" ref=md style="height: 100%" @save="saveArticles">
       </mavon-editor>
     </el-row>
   </div>
</template>

<script>
export default {
  name: 'MarkDown',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    saveArticles (value, render) {
      this.$confirm('是否保存并发布文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/addArticle', {
          id: this.article.id,
          article_type: this.$store.state.article.type,
          article_title: this.$store.state.article.title,
          article_content_md: value,
          article_content_html: render,
          article_abstract: this.$store.state.article.abstract,
          article_cover: this.$store.state.article.cover,
          creat_time: this.creat_time,
          update_time: this.update_time
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'info',
              message: '已保存成功'
            })
            this.$router.push({ path: '/adminIndex/blog/blogEdit' })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
