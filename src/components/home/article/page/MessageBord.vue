<template>
    <div>
      <el-card shadow="always" class="card_box">
        <!--留言板-->
        <div class="lmh">
          <h1 class="h">留言板</h1>
        </div>
        <el-divider></el-divider>
        <div>
          <el-input type="textarea" :rows="5" placeholder="请输入留言"/>
        </div>
        <div style="margin: 10px 0">
          <el-button type="primary" class="el-button1">提交</el-button>
        </div>
        <el-divider></el-divider>
        <el-divider></el-divider>
        <!--动态加载留言显示-->
        <div class="lmh1">
          <h1 class="h">留言</h1>
        </div>
        <div v-for="item in loadMsgBords" :key="item.id">
          <div>
            <div>
              <el-image v-bind:src="icon"/>
              <span class="name">{{item.username}}</span>
              <span class="date">{{item.creattime | datefmt("YY年MM月DD日 HH:mm:ss")}}</span>
            </div>
            <div style="margin: 10px 50px ">
              <span>{{item.message}}</span>
            </div>
            <div style="margin-left: 720px">
              <i class="el-icon-chat-line-square" v-on:click="Msg(item)"></i>
            </div>
          </div>
            <!-- 留言回复-->
          <div>
            <div v-for="(child,index) in item.children" :key="index">

              <div v-if="child.length < 2">
                <div style="margin-left: 40px">
                  <el-image v-bind:src="icon"/>
                  <span class="name">{{child.username}} 回复：@{{item.username}}</span>
                  <span class="date">{{child.creattime | datefmt("YY年MM月DD日 HH:mm:ss")}}</span>
                </div>
                <div style="margin: 10px 98px ">
                  <span>{{child.message}}</span>
                </div>
                <div style="margin-left: 720px">
                  <i class="el-icon-chat-line-square" v-on:click="msg(child)"></i>
                </div>
              </div>

              <div v-else-if=" index < 1">
                <div style="margin-left: 40px">
                  <el-image v-bind:src="icon"/>
                  <span class="name">{{child.username}} 回复：@{{item.username}}</span>
                  <span class="date">{{child.creattime | datefmt("YY年MM月DD日 HH:mm:ss")}}</span>
                </div>
                <div style="margin: 10px 98px ">
                  <span>{{child.message}}</span>
                </div>
                <div style="margin-left: 720px">
                  <i class="el-icon-chat-line-square" v-on:click="msg(child)"></i>
                </div>
              </div>

              <div v-else>
                <div v-show="child.parentId == showMessage">
                  <div style="margin-left: 40px">
                    <el-image v-bind:src="icon"/>
                    <span class="name">{{child.username}} 回复：@{{item.username}}</span>
                    <span class="date">{{child.creattime | datefmt("YY年MM月DD日 HH:mm:ss")}}</span>
                  </div>
                  <div style="margin: 10px 98px ">
                    <span>{{child.message}}</span>
                  </div>
                  <div style="margin-left: 720px">
                    <i class="el-icon-chat-line-square" v-on:click="msg(child)"></i>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align: center;color: #409EFF" v-on:click="hiden(item)">
              <span v-show="item.children.length !=0">{{words}}</span>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-card>
        <div class="navBarWrap" v-if="showBord">
          <el-card shadow="always" class="card_box1">
            <el-image v-bind:src="icon"/>
            <el-input type="text" :placeholder="dateInit" style="width: 600px;margin: auto 20px"></el-input>
            <el-button type="primary" v-on:click="1">发表</el-button>
          </el-card>
        </div>

    </div>
</template>

<script>
export default {
  name: 'MessageBord',
  data () {
    return {
      icon: require('@/assets/bg.jpg'),
      loadMsgBords: '',
      showBord: false,
      dateInit: '',
      itemChild: '',
      words: '展开剩余回复>>',
      showMessage: ''
    }
  },
  mounted () {
    this.loadMsgBord()
  },
  methods: {
    loadMsgBord () {
      this.$axios.get('/findMsg', {
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.loadMsgBords = resp.data.result
          console.log(resp.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    Msg (item) {
      this.itemChild = item
      if (this.showBord) {
        this.showBord = false
        this.dateInit = '回复：@' + item.username
      } else {
        this.showBord = true
        this.dateInit = '回复：@' + item.username
      }
      console.log(this.itemChild)
    },
    msg (child) {
      this.itemChild = child
      if (this.showBord) {
        this.showBord = false
        this.dateInit = '回复：@' + child.username
      } else {
        this.showBord = true
        this.dateInit = '回复：@' + child.username
      }
      console.log(this.itemChild)
    },
    hiden (item) {
      if (this.showMessage !== '') {
        this.showMessage = ''
        this.words = '展开剩余回复>>'
      } else {
        this.showMessage = item.id
        this.words = '<<收起回复'
      }
    }
  }
}
</script>

<style scoped>
 .el-image {
   width: 40px;
   height: 40px;
   border-radius:20px;
   overflow:hidden;
   vertical-align:middle
 }
  .card_box {
    width: 800px;
    margin-left: 50px;
  }
  .card_box1 {
    border-radius: 30px;
    width: 800px;
    margin-left:100px;
    padding: 20px 50px;
    background-color: beige;
  }
  .lmh {
    border-left: 3px solid rebeccapurple
  }
  .lmh1 {
    border-left: 3px solid darkorchid
  }
  .h {
    text-align: left;
    margin-left: 10px
  }
  .el-button1 {
    width: 100px;margin-left: 600px
  }
  .name {
    margin: 10px;
    font-size: 16px;
    font-weight:bold
  }
  .date{
    font-size: 10px;
    color: darkgray;
  }
 .navBarWrap {
   position:fixed;
   bottom:0;
   z-index:1000;
 }
</style>
