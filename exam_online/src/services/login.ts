// 接口
import axios from "axios";

import {BaseRes, LoginParams ,LoginResponse,  CaptchaResponse, UserInfoResponse } from '../types/services/login'



axios.defaults.baseURL = '/bwapi'


export const loginApi = (params: LoginParams) => {
  return axios.post<BaseRes<LoginResponse>>('/login' , params)
}

export const loginCaptchaApi = () => {
  return axios.get<BaseRes<CaptchaResponse>>('/login/captcha')
}


export const userInfoApi = () => {
  return axios.get<BaseRes<UserInfoResponse>>('/user/info' , {
    headers: {
      AUTHORIZATION: localStorage.getItem('token')
    }
  })
}


