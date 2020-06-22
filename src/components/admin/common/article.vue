<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
        <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogManage' }">博客管理</el-breadcrumb-item>
        <el-breadcrumb-item >查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="padding: 10px;border-radius: 10px;margin: 20px 50px" shadow="always">
      <div>
        <div style="text-align: center;">
          <h1>{{article.article_title}}</h1>
        </div>
        <div style="font-size: 15px;color: darkgray;">
          <i class="el-icon-s-custom" style="margin-right: 20px">
            <span >：{{article.author}}</span>
          </i>
          <i class="el-icon-view" style="margin-right: 20px">
            ：1221
          </i>
          <i class="el-icon-star-off" style="margin-right: 20px">
            ：231
          </i>
          <el-tooltip placement="top">
            <div slot="content">
              发布时间：{{article.creat_time | datefmt('YYYY-MM-DD HH:mm:ss')}}<br/>
              最后修改：{{article.update_time | datefmt('YYYY-MM-DD HH:mm:ss')}}
            </div>
            <i class="el-icon-edit"  style="margin-left: 20px">
              <span>：{{article.creat_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
            </i>
          </el-tooltip>
          <span style="float: right">
            归档：
            <el-button type="info" plain size="mini" style="width: 80px;height: 25px;">
              {{article.article_type}}
            </el-button>
          </span>
        </div>
        <el-divider></el-divider>
        <div style="background-color: rgba(87,59,78,0.2);padding: 10px">
          摘要：<span style="font-size: 15px;color: dimgrey">{{article.article_abstract}}</span>
        </div>

        <div class="markdown-body">
          <div v-html="article.article_content_html"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      article: []
    }
  },
  mounted () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      this.$axios.get('/article', {
        params: {
          id: this.$route.query.id
        }
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.article = resp.data.data
          console.log(resp.data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
