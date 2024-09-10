// import axios from "axios";
import request from "./request";
import type{
    BaseRes,
    UserList,
    UserListParams,
    UpdateUserListParams,
    CreateUserParams,
    User
} from '../types/services/systemapi'


// axios.defaults.baseURL='/bwapi'


export const userListApi=(params: UserListParams)=>{
    return request.get<BaseRes<UserList>>('/user/list',{
        params
    })
}


export const updateUserListApi=(params: UpdateUserListParams)=>{
    return request.post<BaseRes>('/user/update',params)
}

export const delUserListApi=(params:{id:string})=>{
    return request.post<BaseRes>('/user/remove',params)
}
export const createUserApi=(params:CreateUserParams)=>{
    return request.post<BaseRes>('/user/create',params)
}
export const roleListApi=()=>{
    return request.get<BaseRes>('/role/list')
}


// 修改当前用户信息
type UpdateUserParams = Partial<Pick<User, | 'age' | 'sex' | 'email' | 'avator'>> & { username: string }
export const updateUserApi = (params: UpdateUserParams) => {
  return request.post<BaseRes>('/user/update/info', params)
}

// 查询左侧菜单
export const menuListApi=()=>{
    return request.get<BaseRes>('/user/menulist')
}
