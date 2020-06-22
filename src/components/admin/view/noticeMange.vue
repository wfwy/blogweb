<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 5px">
      <el-breadcrumb-item :to="{ path: '/adminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 20px 200px">
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']" size="mini" style="width: 320px">
      </el-date-picker>
      <div style="float: right">
      <el-input style="width: 300px;margin-right: 10px" size="mini">

      </el-input>
      <el-button type="primary" @click="select" size="mini">查询</el-button>
      </div>
    </div>
    <div style="margin: 30px 200px">
      <el-table :data="notice.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :stripe="true" @selection-change="handleSelectionChange" height="400px">
        <el-table-column type="selection" width="50"/>
        <el-table-column type="expand" width="30px">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公告内容">：
                <span>{{ props.row.message }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题(点击查看公告内容)" width="250px"/>
        <el-table-column label="创建时间" width="200px">
          <template slot-scope="scope">{{ scope.row.creat_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column prop="author" label="创建人" width="80px"/>
        <el-table-column >
          <template slot="header">
            <el-button type="primary" size="small" @click="Delete(multipleSelection)">批量操作</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  name: 'noticeMange',
  data () {
    return {
      notice: [],
      multipleSelection: '',
      total: 1,
      currentPage: 1,
      pageSize: 6,
      val: [],
      value1: '',
      startTime: '',
      endTime: ''
    }
  },
  mounted () {
    this.loadSyspush()
  },
  methods: {
    loadSyspush () {
      this.$axios.get('/selectSysPush', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.notice = resp.data.data
            this.total = this.notice.length
          }
        }).catch(error => {
          console.log(error)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 批量删除
    Delete (value) {
      console.log(value)
      value.forEach(function (item) {
        console.log(item.id)
        this.$axios.delete('/', {
          params: {
            id: item.id
          }
        }).then(resp => {

        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 选择删除
    handleDel (row) {
      console.log(row.id)
      this.$axios.delete('/', {
        params: {
          id: row.id
        }
      }).then(resp => {

      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    select () {
      const moment = require('moment')
      this.startTime = moment(this.value1[0]).format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment(this.value1[1]).format('YYYY-MM-DD HH:mm:ss')
      this.$axios.get('/selectSysPush', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.notice = resp.data.data
            this.total = this.notice.length
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
