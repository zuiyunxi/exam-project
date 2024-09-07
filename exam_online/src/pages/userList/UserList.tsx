import { useEffect, useState } from 'react'
import {
  userListApi,
  updateUserListApi,
  delUserListApi,
  createUserApi,
  roleListApi
} from '../../services/systemap'
import type {
  User,
  UserListParams,
  UpdateUserListParams
} from '../../types/services/systemapi'
import {
  Space,
  Table,
  Button,
  Image,
  message,
  Modal,
  Form,
  Select
} from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import Password from './components/Password'
import Status from './components/Status'
import UpdateModal from './components/UpdateModal'
import { ExclamationCircleFilled } from '@ant-design/icons'

const UserList = () => {
  const [data, setData] = useState<User[]>([])
  const [params, setParams] = useState<UserListParams>({
    page: 1,
    pagesize: 5
  })
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateRow, setUpdateRow] = useState<User | null>(null)
  const [openRole, setOpenRole] = useState(false)
  const [roleList, setRoleList] = useState<any[]>([])
  const [roleForm] = Form.useForm()

  const handleOk = async (values: User) => {
    if (updateRow) {
      updateUser({
        id: updateRow._id,
        ...values
      })
    } else {
      // 调用新增接口
      const res = await createUserApi(values)
      if (res.data.code === 200) {
        message.success('创建成功')
        setIsModalOpen(false)
        getData()
      } else {
        message.error(res.data.msg)
      }
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  const updateUser = async (params: UpdateUserListParams) => {
    const res = await updateUserListApi(params)
    if (res.data.code === 200) {
      message.success('修改成功!')
      setIsModalOpen(false)
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

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: '警告',
      icon: <ExclamationCircleFilled />,
      content: '次操作不可逆，确定要删除吗?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const res = await delUserListApi({ id })
        if (res.data.code === 200) {
          message.success('删除成功！')
          getData()
        } else {
          message.error(res.data.msg)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

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
      width: 150,
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
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (_, record) => record?.age || '--'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => record?.email || '--'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (_, record) => record?.sex || '--'
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastOnlineTime',
      width: 220,
      render: (_, record) => record.lastOnlineTime ? dayjs(record.lastOnlineTime).format('YYYY-MM-DD HH:mm:ss') : '--'
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
          <Button disabled={record.username === 'root'} type="primary" size="small" onClick={() => {
            setUpdateRow(record)
            setOpenRole(true)
            roleForm.setFieldsValue({ role: record.role })
          }}>分配角色</Button>
          <Button disabled={record.username === 'root'} type="primary" size="small" ghost onClick={() => {
            setUpdateRow(record)
            setIsModalOpen(true)
          }}>编辑</Button>
          <Button disabled={record.username === 'root'} danger size="small" onClick={() => showDeleteConfirm(record._id)}>删除</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    roleListApi()
      .then(res => {
        console.log(res.data.data.list)
        setRoleList(res.data.data.list)
      })
  }, [])


  useEffect(() => {
    getData()
  }, [params])


  useEffect(() => {
    if (!isModalOpen) {
      setUpdateRow(null)
    }
  }, [isModalOpen])

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => {
          setIsModalOpen(true)
        }}>新增</Button>
        <Button type="primary" ghost>查询</Button>
        <Button>重置</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        scroll={{ x: 1500 }}
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
      <UpdateModal
        visible={isModalOpen}
        initValue={updateRow}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <Modal
        title="分配角色"
        open={openRole}
        onOk={async () => {
          const values = await roleForm.validateFields()
          await updateUser({ id: updateRow?._id, ...values})
          setOpenRole(false)
        }}
        onCancel={() => {
          setOpenRole(false)
          setUpdateRow(null)
          roleForm.resetFields()
        }}
      >
        <Form form={roleForm}>
          <Form.Item name="role" rules={[{ required: true, message: '请选择用户角色！' }]}>
            <Select
              mode="multiple"
              fieldNames={{
                label: 'name',
                value: 'value'
              }}
              options={roleList}
              placeholder="选择用户角色"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserList