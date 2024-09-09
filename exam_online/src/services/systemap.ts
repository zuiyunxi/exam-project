import axios from "axios";
import type{
    BaseRes,
    UserList,
    UserListParams,
    UpdateUserListParams,
    CreateUserParams

} from '../types/services/systemapi'


axios.defaults.baseURL='/bwapi'


export const userListApi=(params: UserListParams)=>{
    return axios.get<BaseRes<UserList>>('/user/list',{
        params,
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}


export const updateUserListApi=(params: UpdateUserListParams)=>{
    return axios.post<BaseRes>('/user/update',params,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

export const delUserListApi=(params:{id:string})=>{
    return axios.post<BaseRes>('/user/remove',params,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}
export const createUserApi=(params:CreateUserParams)=>{
    return axios.post<BaseRes>('/user/create',params,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}
export const roleListApi=()=>{
    return axios.get<BaseRes>('/role/list',{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}