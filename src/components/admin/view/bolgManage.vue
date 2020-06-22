<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
        <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminIndex/blog/blogEdit' }">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="text-align: center">
      <el-input placeholder="请输入标题" v-model="title" :clearable="true" style="width: 610px;margin-right: 20px">
        <el-select v-model="type" slot="prepend"  placeholder="请选择博客分类" style="width: 150px" :clearable="true">
          <el-option label="博客日记" value="博客日记"></el-option>
          <el-option label="每日心情" value="每日心情"></el-option>
          <el-option label="心得体会" value="心得体会"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="select">搜索</el-button>
    </div>
    <el-card style="margin: 20px 35px;border-radius: 20px;height: 420px;width: 1080px" shadow="always">
      <el-table :data="Blog.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="font-size: 10px" :stripe="true" v-loading="loading" height="400px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="摘要">
                <span>{{ props.row.article_abstract }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="article_type" width="80px"/>
        <el-table-column label="标题" prop="article_title" width="100px" :show-overflow-tooltip="true"/>
        <el-table-column label="封面图标" prop="article_cover" width="100px" :show-overflow-tooltip="true"/>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">{{ scope.row.creat_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="150px">
          <template slot-scope="scope">{{ scope.row.update_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column label="作者" prop="author" width="80px" />
        <el-table-column label="操作" >
          <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-view" @click="handleLook(scope.row)">查看</el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit"  @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="position: absolute;bottom: 30px;left: 50%;margin-left: -50px;">
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
  name: 'BlogManageMent',
  data () {
    return {
      Blog: [],
      total: 1,
      currentPage: 1,
      pageSize: 6,
      loading: true,
      type: '',
      title: ''
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
      this.$axios.get('/listArticles', {
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.Blog = resp.data.data
          this.total = this.Blog.length
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange: function (currentPage) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.currentPage = currentPage
    },
    select () {
      console.log(this.title + this.type)
      this.$axios.get('/selectArticle', {
        params: {
          article_type: this.type,
          article_title: this.title
        }
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.Blog = resp.data.data
          this.total = this.Blog.length
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleLook (row) {
      console.log(row.id)
      this.$router.push({ path: '/adminIndex/blog/blogManage/article', query: { id: row.id } })
    },
    handleEdit (row) {
      this.$confirm('确定要编辑？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/adminIndex/blog/blogManage/editArticle', query: { article: row } })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消编辑'
        })
      })
    },
    handleDel (row) {
      this.$confirm('确定要删除？此操作不可恢复！！!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/delByid', {
          params: {
            id: row.id
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'warning',
              message: '删除成功'
            })
            this.loadArticle()
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
