// ts类型


export interface BaseRes<T = any> {
  code: number;
  msg: string;
  data: T
}


// 登录参数
export interface LoginParams {
  username: string
  password: string
  code: string
}

export interface LoginResponse {
  token: string;
}

export interface CaptchaResponse {
  code: string
}


export interface UserInfoResponse {
  age?: number
  avator?: string
  email?: string
  permission: any[]
  role: string[]
  sex?: '男' | '女'
  username: string
  _id: string  
}


