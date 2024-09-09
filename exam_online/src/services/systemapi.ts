// 接口
import axios from "axios";

import { BaseRes,  UserList, UserListParams, UpdateUserListParams  } from "../types/services/systemapi";


axios.defaults.baseURL = '/bwapi'


export const userListApi = (params: UserListParams) => {
  return axios.get<BaseRes<UserList>>('/user/list' , {
    params,
    headers: {
      AUTHORIZATION: localStorage.getItem('token')
    }
  })
}
// /user/list

export const updateUserListApi = (params: UpdateUserListParams) => {
  return axios.post<BaseRes>('/user/update', params, {
    headers: { 
      authorization: localStorage.getItem('token')
    }
  })
}







