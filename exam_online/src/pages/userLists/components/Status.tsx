import React,{ useState } from 'react'
import { Switch, Space, message } from 'antd'
import type{ User,UserUpdataType } from '../../../types/services/systemapi'
import { updateUserListApi } from '../../../services/systemap'

interface props {
  record:User 
  getUserList:() => void
}

const Status = (props:props) => {
  const getUserUpDate = async (params:UserUpdataType) => {
    try{
      const res = await updateUserListApi(params)
      if(res.data.code !== 200){
        message.error(res.data.msg)
      }else{
        message.success('修改成功')
         props.getUserList()
      }
    }catch(e){
      message.error('修改失败')
    }
  }
  return (
    <Space>
      <Switch checked={props.record.status === 1}
      disabled={props.record.username === 'root'}
      onChange={(checked:boolean) => {
        getUserUpDate( { id: props.record._id, status: checked ? 1 : 0})
        console.log(props.record.status)
      }}/>
    </Space>
  )
}

export default Status