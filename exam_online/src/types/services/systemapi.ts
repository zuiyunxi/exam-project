export type { BaseRes } from './base'

export type UserListParams = {
  page: number
  pagesize: number
}

export type User = {
  avator: string
  creator: string
  lastOnlineTime: number
  password: string
  role: string[]
  status: 0 | 1
  username: string
  _id: string
  sex: '男' | '女'
  email:string
  age:number
}

export type UserList = {
  list: User[]
  total: number
  totalPage: number
}

export type CreateUserParams=Pick<User,'username'|'password'|'status'|'age'|'email'|'sex'>
// 编辑用户的参数
export type UpdateUserListParams = { id: string } & Partial<Omit<User, 'creator'|'lastOnlineTime'|'_id'>>

export type UserUpdataType = { id: string } & Partial<Pick<User, '_id'| 'role'|'password'| 'status'>>

export type userUpdateInfoParams ={username:string} & Partial<Pick<User, 'age'|'email'|'sex'|'avator'>>

// 角色列表
export type RoleItem = {
  createTime: number
  creator: string
  disabled: boolean
  name: string
  permission: string[]
  value: string
  _id: string
}