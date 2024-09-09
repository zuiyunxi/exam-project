import React, { useEffect, useState } from 'react'

import { userListApi, updateUserListApi } from '../../services/systemapi'
import type { User, UserListParams, UpdateUserListParams } from '../../types/services/systemapi'


import { Space, Table, Button, Image, message, Modal } from 'antd'
import type { TableProps } from 'antd'

import dayjs from 'dayjs'
import Password from './compontents/Password'
import Status from './compontents/States'
import UpdateModal from './compontents/UpdateModal'




const UserList: React.FC = () => {
  const [data , setData] = useState<User[]>([])
  const [params , setParams] = useState({
    page: 1,
    pagesize: 5
  })

  const [total, setTotal] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateRow , setUpdateRow] = useState<User | null>(null)
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const updateUser = async (params: UpdateUserListParams) => {
    const res = await updateUserListApi(params)
    if (res.data.code === 200) {
      message.success('修改成功!')
      getData()
    } else {
      message.error(res.data.msg)
    }
  }

  const getData = async () => {
    const res = await userListApi(params)
    setData(res.data.data.list)
    setTotal(res.data.data.total)
  }




  const columns: TableProps<User>['columns'] = [
    {
      width: 100,
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      fixed: 'left'
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Status row={record} refresh={getData} />
        )
      }
    },
    {
      width: 200,
      title: '头像',
      dataIndex: 'avator',
      render: (_, record) => {
        return record.avator ? <Image src={record.avator} width={100} /> : <p>未设置头像</p>
      }
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (_, record) => <Password pass={record.password} />
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastOnlineTime',
      render: (_, record) => dayjs(record.lastOnlineTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '操作',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record.username === 'root'} type="primary" size="small">分配角色</Button>
          <Button disabled={record.username === 'root'} type="primary" size="small" ghost onClick={() => {
            console.log('点击编辑', record);
            setIsModalOpen(true);
            setUpdateRow(record)
          }}>编辑</Button>
          <Button disabled={record.username === 'root'} danger size="small">删除</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getData()
  }, [params])




  return (
    <div>
       <UpdateModal 
        isModalOpen={isModalOpen}
        updateRow={updateRow}
        onOk={handleOk}
        onCancel={handleCancel}
      ></UpdateModal>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        scroll={{ x: 1200 }}
        pagination={{
          current: params.page,
          pageSize: params.pagesize,
          total,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          onChange: (page, pagesize) => {
            setParams({
              page,
              pagesize
            })
          }
        }}
      />

    </div>
  )
}

export default UserList