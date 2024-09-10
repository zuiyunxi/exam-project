import axios from "axios"
import { message } from "antd"


const request = axios.create({
  baseURL: '/bwapi'
})


// 添加请求拦截器，统一给接口传入公共参数，例如token
request.interceptors.request.use(config => {
  // 统一给所有接口的请求头添加token
  config.headers.Authorization = localStorage.getItem('token')
  return config
})


// 添加响应拦截器，统一处理错误信息，例如：401、403
request.interceptors.response.use(response => {
  return response
}, error => {
  if (error.status === 401) {
    message.error('用户登录过期，请重新登录！')
    location.assign('#/login')
  } else if (error.status === 403) {
    message.error('此用户没有权限，请联系管理员！')
  }
  return Promise.reject(error)
})



export default request








