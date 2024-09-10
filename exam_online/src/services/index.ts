import axios from 'axios'
import { loginType, LoginParams, LoginToken, UserInfo } from '../type/services/login';

axios.defaults.baseURL = '/api';
//登录token
export const loginApi = (params:LoginParams) => {
  return axios.post<LoginToken>('/login',  params )
}
//验证码图片
export const loginImgApi = () => {
  return axios.get<loginType>('/login/captcha')
}
//登录时的用户信息
export const userInfoApi = () => {
  return axios.get<UserInfo>('/user/info', {
    headers:{
      authorization:localStorage.getItem('token')
    }
  })
}
