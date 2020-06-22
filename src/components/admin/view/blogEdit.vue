<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
      <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="width: 800px;margin: 30px auto">
      <el-row type="flex" justify="center">
        <el-col>
          <el-input placeholder="请输入标题" v-model="article.title">
            <el-select v-model="article.type" slot="prepend"  placeholder="请选择博客分类" style="width: 150px">
              <el-option label="博客日记" value="博客日记"></el-option>
              <el-option label="每日心情" value="每日心情"></el-option>
              <el-option label="心得体会" value="心得体会"></el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col>
          <el-divider>摘要</el-divider>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="article.abstract">
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col align="center">
          <el-divider>封面</el-divider>
          <el-input v-model="article.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 20px"></img-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-divider></el-divider>
        <div align="center">
          <el-button type="primary" v-on:click="toMarkDown">开始编辑</el-button>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ImgUpload from '@/components/admin/common/imgUpload'
export default {
  name: 'blogEdit',
  components: { ImgUpload },
  data () {
    return {
      article: {
        type: '',
        title: '',
        abstract: '',
        fileList: '',
        cover: ''
      }
    }
  },
  methods: {
    uploadImg () {
      this.article.cover = this.$refs.imgUpload.url
    },
    toMarkDown () {
      this.$confirm('请确认是否无误？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/adminIndex/blog/blogEdit/markDown')
        this.$store.commit('article', this.article)
      })
    }
  }
}
</script>

<style scoped>

</style>
