import React,{ useEffect } from 'react'
import { userInfoApi } from '../../services'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../store/modules/user'

interface props{
  children:React.ReactNode
}

const Layout = (props:props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = async () => {
       userInfoApi()
      .then(res => {
        dispatch(setUserInfo(res.data.data))
        console.log(res.data.data)
      })
      .catch(e => {
        if (e.status === 401) {
          message.error('用户信息失效，请重新登录')
          navigate('/login')
        } else {
          message.error('请求失败')
        }
      })
      
  }
  useEffect(() => {
    user()
  }, [])
  return props.children
}

export default Layout