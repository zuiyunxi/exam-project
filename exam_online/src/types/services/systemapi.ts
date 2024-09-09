// ts类型


export interface BaseRes<T = any> {
  code: number;
  msg: string;
  data: T
}

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
  __v: number
  _id: string
}


export type UserList = {
  list: User[];
  total: number;
  totalPage: number
}


export type UpdateUserListParams = { id: string } & Partial<Pick<User, 'username' | 'password' | 'role' | 'status'>>


