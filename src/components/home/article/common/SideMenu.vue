<template>
  <div>
    <div>
      <div style="margin-top: 50px; border-left: 3px solid brown">
        <h1 style="margin-left: 20px">归档</h1>
      </div>
      <el-card shadow="always" style="margin: 0 10px;width: 350px">
        <div style="margin: 0 10px">
          <el-button
            style="margin:10px 8px"
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            size="mini"
            effect="dark" v-on:click="selectArticle(item)">
            {{ item.label }}
          </el-button>
        </div>
      </el-card>
      <div style="margin-top: 20px; border-left: 3px solid brown">
        <h1 style="margin-left: 20px">热门文章</h1>
      </div>
      <el-card shadow="always" style="margin: 0 10px;width: 350px" v-loading="loading">
        <div v-for="item in newArticle" :key="item.title">
          <div style="text-align: center;margin-bottom: 10px">
            <router-link style="text-decoration: none;color: #2c3e50" :to="{path:'/articleDetial',query:{id: item.id}}">
              <span style="font-size: 15px"><strong>{{item.article_title}}</strong></span>
            </router-link>
          </div>
          <div>
            <div class="cover">
              <el-image :src="item.article_cover" style="width:85px;height:61px;" fit="cover"/>
            </div>
            <div class="abstract">
              <span style="color: darkgray; font-size: 1px">{{item.article_abstract | ellipsis}}</span>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
      <div style="margin-top: 20px; border-left: 3px solid brown">
        <h1 style="margin-left: 20px">最新文章</h1>
      </div>
      <el-card shadow="always" style="margin: 0 10px;width: 350px" v-loading="loading">
        <div v-for="item in newArticle" :key="item.title">
          <div style="text-align: center;margin-bottom: 10px">
            <router-link style="text-decoration: none;color: #2c3e50" :to="{path:'/articleDetial',query:{id: item.id}}">
              <span style="font-size: 15px"><strong>{{item.article_title}}</strong></span>
            </router-link>
          </div>
          <div>
            <div class="cover">
              <el-image :src="item.article_cover" style="width:85px;height:61px;" fit="cover"/>
            </div>
            <div class="abstract">
              <span style="color: darkgray; font-size: 1px">{{item.article_abstract | ellipsis}}</span>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      newArticle: '',
      loading: true,
      items: [
        { type: 'success', label: '博客日记', value: '博客日记' },
        { type: 'info', label: '心得体会', value: '心得体会' },
        { type: 'danger', label: '每日心情', value: '每日心情' },
        { type: 'warning', label: '标签五', value: null }
      ]
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 50) {
        return value.slice(0, 50) + '...'
      }
      return value
    }
  },
  mounted () {
    this.loadArticle()
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    loadArticle () {
      this.$axios.get('/listNewArticle'
      ).then(resp => {
        if (resp && resp.status === 200) {
          this.newArticle = resp.data.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    selectArticle (item) {
      this.$router.push({ path: '/page', query: { type: item.value } })
    }
  }
}
</script>

<style scoped>
  .cover {
    float: left;
    width: 100px;
    height: 61px
  }
  .abstract{
    margin-left: 105px;
    text-align: left;
    height: 61px
  }
</style>
