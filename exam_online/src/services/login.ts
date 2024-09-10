// 接口
import axios from "axios";
import request from "./request";
import {BaseRes, LoginParams ,LoginResponse,  CaptchaResponse, UserInfoResponse } from '../types/services/login'



axios.defaults.baseURL = '/bwapi'


export const loginApi = (params: LoginParams) => {
  return request.post<BaseRes<LoginResponse>>('/login' , params)
}

export const loginCaptchaApi = () => {
  return request.get<BaseRes<CaptchaResponse>>('/login/captcha')
}

// export const logoutApi = () => {
//   return request.post<BaseRes<LoginResponse>>('/user/logout', {
//     headers: {
//       AUTHORIZATION: localStorage.getItem('token')
//     }
//   })
// }
// user/logout




export const userInfoApi = () => {
  return request.get<BaseRes<UserInfoResponse>>('/user/info')
}


// export const profileApi = () => {
//   return request.post('/profile' , {
//     headers: {
//       AUTHORIZATION: localStorage.getItem('token')
//     }
//   })
// }


// curl --location 'http://121.89.213.194:3001/user/create' \
// --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzgyNjFiY2FiYWY5MGNhYzJlNGZhNiIsImlhdCI6MTY4MTQwMTUxMH0.-WECmINNIyG_yf6O0-FXVqxC9yOOdeUKX3-7Cim2M-Y' \
// --data '{
//     "username": "小王",
//     "password": "123",
//     "status": 1
// }'
