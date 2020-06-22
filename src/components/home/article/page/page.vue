<template>
  <div>

    <div style="margin: 0 20px">
      <el-button
        style="margin-left: 10px"
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        size="mini"
        effect="dark" v-on:click="selectArticle(item)">
       {{ item.label }}
      </el-button>
    </div>

    <el-divider></el-divider>
    <div class="div1">
      <h1 style="text-align: left;margin-left: 20px">最新文章</h1>
    </div>
    <div v-for="article in article" :key="article.title" v-loading="loading">
      <el-card class="card">
        <div>
          <div style="float: left">
            <el-button type="primary" plain size="mini" style="width: 80px;height: 25px;margin-right: 20px" @click="selectBytype(article)">
              {{article.article_type}}
            </el-button>
          </div>
          <div style="margin-left: 200px;text-align: center">
            <router-link style="text-decoration: none;color: #2c3e50;" :to="{path:'/articleDetial',query:{id: article.id}}">
              <span class="title">
                <strong>{{article.article_title}}</strong>
              </span>
            </router-link>
          </div>
        </div>

        <div class="c_a">
          <div class="cover">
            <el-image :src="article.article_cover" style="width:170px;height:120px;" fit="cover"/>
          </div>
          <div class="abstract">
            <span style="color: darkgray">{{article.article_abstract}}</span>
          </div>
        </div>

        <div style="margin-top: 10px">
          <span class="footer">
            <i class="el-icon-time"></i>:
            {{article.creat_time | datefmt('YYYY-MM-DD HH:mm:ss')}}
            <i class="el-icon-view"><span>  浏览</span></i>
          </span>
          <router-link style="text-decoration: none;color: #2c3e50" :to="{path:'/articleDetial',query:{id: article.id}}">
              <span class="spanRe">
                阅读原文>>
              </span>
          </router-link>
        </div>
      </el-card>
    </div>
    <div style="margin: 50px 400px">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next,total"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      loading: true,
      items: [
        { type: '', label: '全部', value: null },
        { type: 'success', label: '博客日记', value: '博客日记' },
        { type: 'info', label: '心得体会', value: '心得体会' },
        { type: 'danger', label: '每日心情', value: '每日心情' },
        { type: 'warning', label: '标签五', value: null }
      ],
      article: [],
      currentPage: 1,
      pageSize: 3,
      total: 1,
      selectType: ''
    }
  },
  mounted () {
    this.loadArticle()
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    loadArticle () {
      this.$axios.get('/listByName', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          type: this.$route.query.type
        }
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.article = resp.data.data.list
          this.total = resp.data.data.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
      this.loadArticle()
    },
    selectArticle (item) {
      console.log(item.value)
      this.$router.push({ path: '/page', query: { type: item.value } })
    },
    type (article) {
      this.selectType = article.article_type
      this.$router.push({ path: '/page', query: { type: this.selectType } })
    }

  }
}
</script>

<style scoped>
  .div1 {
    margin: 0px 50px;
    border-left: 3px solid slategrey
  }
  .card {
    width: 800px;
    margin:10px 50px
  }
  .type {
    float: left;
    padding: 3px
  }
  .title {
    font-size: 20px;
    margin-left: 10px;
  }
  .c_a {
    margin-top: 20px
  }
  .cover {
    float: left;
    width: 200px;
    height: 121px
  }
  .abstract{
    margin-left: 210px;
    text-align: left;
    height: 121px
  }
  .footer{
    float: left;
    margin-bottom: 10px;
    font-size: 13px;
  }
  .spanRe{
    font-size: 13px;
    margin-left: 10px;
    float: right
  }
</style>
