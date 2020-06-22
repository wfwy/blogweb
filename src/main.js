import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
import 'default-passive-events'
import store from './store'
import axios from './utils/http'
import { get, post, put, del } from '@/utils/axios'
import moment from 'moment'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 完整引入element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(MavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.put = put
Vue.prototype.del = del
// 前端每次发送请求时就会带上 sessionId
axios.defaults.withCredentials = true
// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input, fmtstring) { // 当input为时间戳时，需转为Number类型
  // 使用moment.js这个日期格式化类库实现日期的格式化功能
  return moment(input).utcOffset(0).format(fmtstring)
})

// 将服务器返回的 JSON 转为 router 需要的格式
const formatRouters = (routes) => {
  const fmtRouters = []
  routes.forEach(route => {
    if (route.children && route.children instanceof Array) {
      route.children = formatRouters(route.children)
    }
    const fmtRouter = {
      path: route.path,
      component: resolve => {
        require(['@/components/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      name_zh: route.name_zh,
      icon: route.icon,
      children: route.children
    }
    fmtRouters.push(fmtRouter)
  })
  return fmtRouters
}
// 路由重复添加警告[vue-router] Duplicate named routes definition
/*
const addRoute = (parm) => {
  router.matcher = new VueRouter({ mode: 'history' }).matcher
  router.addRoutes(parm)
}
*/

const initAdminMenu = (router, store) => {
  axios.get('/admin/menu').then(resp => {
    if (resp && resp.status === 200) {
      const fmtRouters = formatRouters(resp.data.data)
      store.commit('initAdminMenu', fmtRouters)
      router.$addRoutes(fmtRouters)
    }
  })
}
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('username') && to.path.startsWith('/adminIndex')) {
    axios.get('/authentication').then(resp => {
      if (resp && resp.data.code === 200) {
        initAdminMenu(router, store)
      } else {
        Vue.prototype.$confirm(resp.data.message, '提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }).catch(() => {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('username')) {
      axios.get('/authentication').then(resp => {
        if (resp) next()
      })
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
