<template>
  <div style="margin: 30px 200px 0 0;background-color: white;height: calc(100% - 60px) ">
      <div style="margin: 5px 30px">
        <el-tabs v-model="activeName" @tab-click="handleClick ">
          <el-tab-pane label="未读通知" name="first">
            <el-collapse v-model="unRead" accordion @change="handleChange1"
                         v-for="item in notification" :key="item.id">
              <el-collapse-item :title="item.title" :name="item.id">
                <div>{{item.message}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="已读通知" name="second">
            <el-collapse v-model="Read" accordion @change="handleChange2"
                         v-for="item in notification" :key="item.id">
              <el-collapse-item :title="item.title" :name="item.id">
                <div>{{item.message}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SystemPush',
  data () {
    return {
      activeName: 'first',
      unRead: '',
      notification: '',
      Read: ''
    }
  },
  mounted () {
    this.loadUnread()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(tab.name)
      switch (tab.name) {
        case 'first':
          this.loadUnread()
          break
        case 'second':
          this.loadRead()
          break
        default:
      }
    },
    handleChange1 (value) {
      this.unRead = value
      console.log(value)
      this.$axios.put('/unReadUpdate', {
        nid: this.unRead
      }).then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
    },
    handleChange2 (value) {
      this.Read = value
      console.log(value)
    },
    loadUnread () {
      this.$axios.get('/unreadSysPush')
        .then(resp => {
          console.log(resp)
          if (resp && resp.status === 200) {
            this.title = '测试'
            this.notification = resp.data.data
          }
        }).catch(error => {
          console.log(error)
        })
    },
    loadRead () {
      this.$axios.get('/readSysPush')
        .then(resp => {
          console.log(resp)
          if (resp && resp.status === 200) {
            this.title = '测试'
            this.notification = resp.data.data
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
