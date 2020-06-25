<template>
  <div class="articles-area" v-loading="loading">
    <div ref="test">
      <el-card style="width: 800px;margin-left: 50px;padding: 10px;border-radius: 10px"
               shadow="always">
        <div>
          <div style="text-align: center;">
            <h1>{{article.article_title}}</h1>
          </div>
          <div style="font-size: 15px;color: darkgray;">
            <i class="el-icon-s-custom" style="margin-right: 20px">
            <span >：{{article.author}}</span>
            </i>
            <i class="el-icon-view" style="margin-right: 20px">
              ：{{article.hits}}
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
              <el-button type="info" plain size="mini" style="width: 80px;height: 25px;" @click="type(article)">
                {{article.article_type}}
              </el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div style="background-color: rgba(87,59,78,0.2);padding: 10px">
            摘要：<span style="font-size: 15px;color: dimgrey;margin-bottom: 5px ">{{article.article_abstract}}</span>
          </div>
          <div class="markdown-body">
            <div v-html="article.article_content_html"></div>
          </div>
        </div>
      </el-card>
      <el-card shadow="always" style="width: 800px;margin-left: 50px ;padding:0 10px;">
        <div >
          <el-button style="border: 0" @click="thumb">
            <i class="iconfont icon-dianzan" style="font-size: 18px" v-show="!thumbs"/>
            <i class="iconfont icon-dianzan" style="font-size: 18px;color: red" v-show="thumbs"/>
            {{th}}
            <el-badge :value="10"></el-badge>
          </el-button>
          <el-button style="border: 0" >
            <i class="iconfont icon-liulan" style="font-size: 18px"/> 浏览
            <el-badge :value="10"></el-badge>
          </el-button>
          <el-button style="border: 0">
            <i class="iconfont icon-pinglun" style="font-size: 18px"/> 评论
            <el-badge :value="10"></el-badge>
          </el-button>
          <el-button style="border: 0" @click="collect">
            <i class="iconfont icon-shoucang-collect" style="font-size: 18px" v-show="!collects"/>
            <i class="iconfont icon-shoucang-collect" style="font-size: 18px;color: red" v-show="collects"/>
            收藏
            <el-badge :value="10"></el-badge>
          </el-button>
          <el-button style="border: 0">
            <i class="iconfont icon-arrow-" style="font-size: 18px"/> 分享
            <el-badge :value="10"></el-badge>
          </el-button>
        </div>
      </el-card>
    </div>
    <el-card shadow="always" style="width: 800px;margin-left: 50px ;padding:0 10px;">
      <div style="display: inline-block;margin-bottom: 20px" :class="navBarFixed == true ? 'navBarWrap' :''">
        <el-avatar :size="40" :src="circleUrl" style="vertical-align:middle"></el-avatar>
        <el-input
          v-model="inputValue"
          style="width: 600px;margin-left: 20px;vertical-align:middle"
          :placeholder="'回复：@'+placeholder">
        </el-input>
        <el-button
          style="vertical-align:middle;margin-left: 10px"
          @click="input"
          type="primary">提交
        </el-button>
      </div>
      <el-divider></el-divider>
      <div v-for="(item,index) in comment" :key="index">
        <div class="divinput">
          <el-avatar :size="35" :src="circleUrl" style="vertical-align:middle"></el-avatar>
          <span class="spanName">{{item.username}}</span>
          <span class="spanDate">{{item.creat_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
        </div>
        <div style="float: right">

          <el-button class="btnThumb1" size="mini" @click="handleButton1(item)">
            <i class="iconfont icon-dianzan" :style="item.state?'font-size: 18px;color:red':'font-size: 18px'" />
          </el-button>

        </div>
        <div class="divcomment1">
          <span class="spanComment1">{{item.comment}}</span>
          <div style="margin-left: 608px">
            <el-button style="border: 0;background-color: lavender" size="mini" @click="handle1(item)">
              <i class="iconfont icon-pinglun" style="font-size: 14px"/>
            </el-button>
          </div>
          <div v-for="(child,index) in item.children" :key="index">
            <div v-if="child.length<1 && child.id !==0">
              <div style="margin-top: 10px;font-size: 10px">
                <div class="divinput">
                  <el-avatar :size="25" :src="circleUrl" style="vertical-align:middle"></el-avatar>
                  <span class="spanName" style="font-size: 13px">{{child.username}}</span>
                  <span class="spanDate" style="font-size: 12px" >{{child.creat_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                </div>
                <div style="float: right">
                  <el-button class="btnThumb2" size="mini" @click="handleButton2(child)">
                    <i class="iconfont icon-dianzan" :style="child.state?'font-size: 18px;color:red':'font-size: 18px'"/>
                  </el-button>
                </div>
                <div class="divcomment2">
                  <span class="spanComment2">
                    回复<span style="color: blue">@{{child.author}}：</span>
                      {{child.comment}}
                  </span>
                  <div style="margin-left: 574px">
                    <el-button style="border: 0;background-color: lavender" size="mini" @click="handle2(child)">
                      <i class="iconfont icon-pinglun" style="font-size: 14px"/>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="index<1 && child.id !==0">
              <div style="margin-top: 10px;font-size: 10px">
                <div class="divinput">
                  <el-avatar :size="25" :src="circleUrl" style="vertical-align:middle"></el-avatar>
                  <span class="spanName" style="font-size: 13px">{{child.username}}</span>
                  <span class="spanDate" style="font-size: 12px" >{{child.creat_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                </div>
                <div style="float: right">
                  <el-button class="btnThumb2" size="mini" @click="handleButton2(child)">
                    <i class="iconfont icon-dianzan" :style="child.state?'font-size: 18px;color:red':'font-size: 18px'"/>
                  </el-button>
                </div>
                <div class="divcomment2">
                  <span class="spanComment2">
                    回复<span style="color: blue">@{{child.author}}：</span>
                      {{child.comment}}
                  </span>
                  <div style="margin-left: 574px">
                    <el-button style="border: 0;background-color: lavender" size="mini" @click="handle2(child)">
                      <i class="iconfont icon-pinglun" style="font-size: 14px"/>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-show="show === child.parent_id">
              <div style="margin-top: 10px;font-size: 10px">
                <div class="divinput">
                  <el-avatar :size="25" :src="circleUrl" style="vertical-align:middle"></el-avatar>
                  <span class="spanName" style="font-size: 13px">{{child.username}}</span>
                  <span class="spanDate" style="font-size: 12px" >{{child.creat_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                </div>
                <div style="float: right">
                  <el-button class="btnThumb2" size="mini" @click="handleButton2(child)">
                    <i class="iconfont icon-dianzan" :style="child.state?'font-size: 18px;color:red':'font-size: 18px'"/>
                  </el-button>
                </div>
                <div class="divcomment2">
                  <span class="spanComment2">
                    回复<span style="color: blue">@{{child.author}}：</span>
                      {{child.comment}}
                  </span>
                  <div style="margin-left: 574px">
                    <el-button style="border: 0;background-color: lavender" size="mini" @click="handle2(child)">
                      <i class="iconfont icon-pinglun" style="font-size: 14px"/>
                    </el-button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;color: #409EFF" v-on:click="hiden(item)">
            <span v-show="item.children.length !=0 && item.children.length >1" style="font-size: 10px">
              {{show === item.id?'收起回复':'展开剩余'+(item.children.length-1)+'条回复'}}
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'articleDetial',
  data () {
    return {
      show: '',
      comment: [], // 回复
      navBarFixed: '', // 评论框
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      article: [], // 文章
      loading: true, // 加载
      selectType: '', // article_type值
      hits: '', // 点击
      thumbs: false, // 点赞
      th: '点赞',
      collects: false, // 收藏
      inputValue: '', // 评论
      placeholder: '',
      parent_id: 0
    }
  },
  created () {
    // this.updateHits()
  },
  mounted () {
    this.loadArticle()
    this.listComment()
    setTimeout(() => {
      this.loading = false
    }, 1000)
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
  },
  methods: {
    updateHits () {
      this.$axios.put('/updateHits', {
        id: this.$route.query.id
      }).then(resp => {
        console.log(resp.data)
      }).catch(error => {
        console.log(error)
      })
    },
    loadArticle () {
      this.$axios.get('/article', {
        params: {
          id: this.$route.query.id
        }
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.article = resp.data.data
          this.placeholder = this.article.author
        }
      }).catch(error => {
        console.log(error)
      })
    },
    listComment () {
      this.$axios.get('/listComment', {
        params: {
          aid: this.$route.query.id
        }
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.comment = resp.data.data
          console.log(resp.data.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    input () {
      if (!sessionStorage.getItem('username')) {
        this.$alert('请登录后再评论！', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.$axios.post('/insertComment', {
          aid: this.$route.query.id,
          author: this.placeholder,
          comment: this.inputValue,
          parent_id: this.parent_id
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message('评论成功！')
            this.inputValue = ''
            this.listComment()
            this.parent_id = 0
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    type (article) {
      this.selectType = article.article_type
      this.$router.push({ path: '/page', query: { type: this.selectType } })
    },
    thumb () {
      if (this.thumbs) {
        this.thumbs = false
        this.th = '点赞'
      } else {
        this.thumbs = true
        this.th = '已赞'
      }
    },
    collect () {
      if (this.collects) {
        this.collects = false
      } else {
        this.collects = true
      }
    },
    watchScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      // console.log(scrollTop)
      if (scrollTop > this.$refs.test.offsetHeight) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    handleButton1 (item) {
      console.log(item)
      if (sessionStorage.getItem('username')) {
        if (item.state) {
          this.$axios.put('/updateCommentTop', {
            aid: this.$route.query.id,
            cid: item.id,
            state: false
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.listComment()
              this.$message('已取消点赞！')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$axios.post('/insertCommentTop', {
            aid: this.$route.query.id,
            cid: item.id,
            state: true
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.listComment()
              this.$message('点赞成功！')
            }
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        this.$alert('请登录后再点赞！', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    handleButton2 (child) {
      console.log(child)
      if (sessionStorage.getItem('username')) {
        if (child.state) {
          this.$axios.put('/updateCommentTop', {
            aid: this.$route.query.id,
            cid: child.id,
            state: false
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.listComment()
              this.$message('已取消点赞！')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$axios.post('/insertCommentTop', {
            aid: this.$route.query.id,
            cid: child.id,
            state: true
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.listComment()
              this.$message('点赞成功！')
            }
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        this.$alert('请登录后再点赞！', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    handle1 (item) {
      this.placeholder = item.username
      this.parent_id = item.id
    },
    handle2 (child) {
      this.placeholder = child.username
      this.parent_id = child.parent_id
    },
    hiden (item) {
      if (this.show !== item.id) {
        this.show = item.id
      } else {
        this.show = ''
      }
    }
  }
}
</script>

<style scoped>
  .navBarWrap {
    position:fixed;
    bottom:0;
    z-index:999;
  }
  .divinput {
    display: inline-block;
  }
  .spanName {
    vertical-align:middle;
    margin-left: 10px;
    font-size: 15px;
    color: dimgrey;
    display:inline-block;
  }
  .spanDate {
    vertical-align:middle;
    margin-left: 10px;
    font-size: 10px;
    color: darkgray;
    display:inline-block;
  }
  .btnThumb1{
    border: 0;
    background-color: white;
    display:inline-block;
    vertical-align:middle;
    margin-right: 49px;
  }
  .btnThumb2{
    border: 0;
    vertical-align:middle;
    background-color: lavender;
    display:inline-block;
  }
  .divcomment1 {
    margin:10px 0 10px 35px;
    width: 655px;
    padding: 20px 0 20px 20px;
    background-color: lavender
  }
  .divcomment2 {
    margin:10px 0 0 35px;
    width: 620px;
    background-color: lavender
  }
  .spanComment1{
    word-break: break-all;
    white-space: normal;
    font-size: 14px;
  }
  .spanComment2{
    word-break: break-all;
    white-space: normal
  }
</style>
