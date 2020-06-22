import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home/home'
import index from '@/components/home/article/page/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/components/home/article/page/about')
      },
      {
        path: '/messageBord',
        name: 'MessageBord',
        component: () => import('@/components/home/article/page/MessageBord')
      },
      {
        path: '/page',
        name: 'page',
        component: () => import('@/components/home/article/page/page')
      },
      {
        path: '/articleDetial',
        name: 'articleDetial',
        component: () => import('@/components/home/article/page/articleDetial')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/Register')
  },
  {
    path: '/MsgIndex',
    name: 'MsgIndex',
    component: () => import('@/components/home/article/common/Message/MsgIndex'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/SystemPush',
        name: 'SystemPush',
        component: () => import('@/components/home/article/page/Message/SystemPush'),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/imgUpload',
    name: 'imgUpload',
    component: () => import('@/components/admin/common/imgUpload'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import('@/components/common/Message'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/test',
    component: () => import('@/components/test/test')
  }
]

export const asyncRouterMap = [
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('@/components/admin/view/adminIndex'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/adminIndex/blog/blogEdit/markDown',
        name: 'markdown',
        component: () => import('@/components/admin/common/MarkDown'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/adminIndex/blog/blogManage/article',
        name: 'article',
        component: () => import('@/components/admin/common/article'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/adminIndex/blog/blogManage/editArticle',
        name: 'editArticle',
        component: () => import('@/components/admin/common/editAtricle'),
        meta: {
          requireAuth: true
        }
      }
    ]
  }
]
// 重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.$addRoutes = (params) => {
  router.matcher = new VueRouter({ // 重置路由规则
    mode: 'history',
    base: process.env.BASE_URL,
    routes: asyncRouterMap
  }).matcher
  router.addRoutes(params) // 添加路由
}
export default router
