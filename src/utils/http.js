import axios from 'axios'
import { Loading, Message } from 'element-ui'
const http = axios.create({
  baseURL: 'http://localhost:8843/api', // 设置请求的base url
  timeout: 4000 // 超时时长
})
let loading
let loadingNum = 0
function startLoading () {
  if (loadingNum === 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  // 请求数量加1
  loadingNum++
}
function endLoading () {
  // 请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}
//  REQUEST 请求异常拦截
axios.interceptors.request.use(
  (config) => {
    // =========  所有请求之前都要执行的操作  ==============
    startLoading()
    return config
  },
  (error) => {
    // ==================  错误处理  ====================
    Message.error({ message: '请求超时!' })
    return Promise.resolve(error)
  }
)
//  RESPONSE 响应异常拦截
axios.interceptors.response.use(
  (response) => {
    endLoading()
    // ==============  所有请求完成后都要执行的操作  ==================
    return response
  },
  (err) => {
    endLoading()
    //= =============  错误处理  ====================
    if (err && err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'; break
        case 401: err.message = '未授权，请重新登录(401)'; break
        case 403: err.message = '拒绝访问(403)'; break
        case 404: err.message = '请求出错(404)'; break
        case 408: err.message = '请求超时(408)'; break
        case 500: err.message = '服务器错误(500)'; break
        case 501: err.message = '服务未实现(501)'; break
        case 502: err.message = '网络错误(502)'; break
        case 503: err.message = '服务不可用(503)'; break
        case 504: err.message = '网络超时(504)'; break
        case 505: err.message = 'HTTP版本不受支持(505)'; break
        default: err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    Message.error({ message: err.message })
    return Promise.resolve(err)
  }
)

export default http
