//验证码图片
export interface loginType {
  code:number
  msg:string
  data:{
    code:string
  }
}

//login登录接口的参数
export interface LoginParams {
  username:string
  passwore:string
  code:string
}

//login中获取的token
export interface LoginToken {
  code:number
  msg:string
  data:{
    token:string
  }
}

//登录时的用户信息
export interface UserInfo {
  code: number,
  msg: string,
  data: {
    age?:number
    avator?: string
    email?:string
    permission:any[]
    role:string[]
    sex?: '男' | '女'
    username: string
    _id: string
  }
}

export interface interfaceItem {
  age?:number
  avator?: string
  email?:string
  permission:any[]
  role:string[]
  sex?: '男' | '女'
  username: string
  _id: string
}