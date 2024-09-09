import React, { useState } from 'react'
import { Switch, message } from 'antd'
import type { User, UpdateUserListParams } from '../../../types/services/systemapi'
import { updateUserListApi } from '../../../services/systemapi'

interface Props {
  row: User
  refresh: () => void
}

const Status: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)

  const updateUser = async (params: UpdateUserListParams) => {
    setLoading(true)
    try {
      const res = await updateUserListApi(params)
      if (res.data.code === 200) {
        message.success('修改成功!') 
        props.refresh()
      } else {
        message.error(res.data.msg)
      }
      setLoading(false)
    } catch(e) {
      setLoading(false)
    }
  }


  return (
    <Switch
      loading={loading}
      disabled={props.row.username === 'root'}
      checkedChildren="开启"
      unCheckedChildren="关闭"
      checked={props.row.status === 1}
      onChange={(checked: boolean) => {
        updateUser({ id: props.row._id, status: checked ? 1 : 0 })
      }}
    ></Switch>
  )
}

export default Status
