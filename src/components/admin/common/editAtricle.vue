<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
      <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">内容管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogManage' }">博客管理</el-breadcrumb-item>
      <el-breadcrumb-item >编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card style="margin: 20px 10px;border-radius: 20px" shadow="always">
        <div>
          <div style="width: 600px;float: left;height: 240px">
            <div>
              <span style="color: dimgrey;font-size: 16px">标题：</span>
              <el-input placeholder="请输入标题" v-model="article.article_title" style="width: 540px">
                <el-select v-model="article.article_type" slot="prepend"  placeholder="请选择博客分类" style="width: 150px">
                  <el-option label="博客日记" value="博客日记"></el-option>
                  <el-option label="每日心情" value="每日心情"></el-option>
                  <el-option label="心得体会" value="心得体会"></el-option>
                </el-select>
              </el-input>
            </div>
            <div style="text-align: center;margin: 10px 0">
              <span>摘要</span>
            </div>
            <div style="width: 580px;margin: 10px 5px">
              <el-input type="textarea" :rows="6" placeholder="请输入内容"
              v-model="article.article_abstract">
              </el-input>
            </div>
          </div>
          <div style="margin-left: 600px;height: 240px">
            <div style="margin-left: 5px">
              <span style="color: dimgrey;font-size: 16px; ">封面：</span>
              <el-input v-model="article.article_cover" autocomplete="off" placeholder="图片 URL" style="width: 380px"/>
              <div align="center">
                <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 20px"/>
              </div>
            </div>
          </div>
        </div>
        <div style="height: calc(100vh - 20px);">
            <mavon-editor v-model="article.article_content_md" ref=md style="height: 100%" @save="saveArticles"/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ImgUpload from '@/components/admin/common/imgUpload'
export default {
  name: 'editAtricle',
  components: { ImgUpload },
  data () {
    return {
      article: []
    }
  },
  mounted () {
    this.article = this.$route.query.article
  },
  methods: {
    uploadImg () {
      this.article.article_cover = this.$refs.imgUpload.url
    },
    saveArticles (value, render) {
      this.$confirm('是否保存并修改文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.put('/updateById', {
          id: this.article.id,
          article_type: this.article.article_type,
          article_title: this.article.article_title,
          article_content_md: value,
          article_content_html: render,
          article_abstract: this.article.article_abstract,
          article_cover: this.article.article_cover
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'info',
              message: '已修改成功'
            })
            this.$router.push({ path: '/adminIndex/blog/blogManage' })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
