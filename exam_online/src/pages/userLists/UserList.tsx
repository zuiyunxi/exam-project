import React,{ useEffect, useState, useRef } from 'react';
import { Space, Table, Image, Button, message, Modal, Select, Form } from 'antd';
import type { TableProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import  { userListApi, updateUserListApi, createUserApi, removeUserApi, roleListApi } from '../../services/systemap'
import type { User, UserUpdataType, userUpdateInfoParams } from '../../types/services/systemapi'
import dayjs from 'dayjs';
import PassWord from './components/PassWord';
import Status from './components/Status';
import UpdateModal from './components/UpdateModal';
import Search from './components/Search';
import  type{ SearchRef, FieldType } from './components/Search'

const UserList = () => {
  const searchRef = useRef<SearchRef>(null)
  const [list, setList] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState({ page:1, pagesize:5 })
  // const [searchParams, setSearchparams] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromValue, setFromValue] = useState<User|null>(null)
  const [isRoleShow, setIsRoleShow] = useState(false)
  const [roleForm] = Form.useForm()
  const [rolelist, setRolelist] = useState<any[]>([])
  const getUserList = async () => {
    const res = await userListApi(current)
    // console.log(res.data.data.list)
    setList(res.data.data.list)
    setTotal(res.data.data.total)
  }
  const handleCancle = () => {
    setIsModalOpen(false)
  }
  const getUserUpdate = async(params:UserUpdataType) => {
    try{
      const res = await updateUserListApi(params)
      console.log(res.data)
      message.success('编辑成功')
      setIsModalOpen(false)
      getUserList()
    }catch(e) {
      message.error('编辑失败')
    }
  }
  const getCreateUser = async (params:userUpdateInfoParams) => {
    try{
      await createUserApi(params)
      message.success('添加成功')
      getUserList()
      setIsModalOpen(false)
    }catch(e){
      message.success('添加失败')
    }
  }
  const onOk = (values:User) => {
    if(fromValue){
      getUserUpdate({id:fromValue._id,...values})
    }else{
      getCreateUser(values)
    }
  }
  const getRemoveUser = async( id: string) => {
    const res = await removeUserApi({id})
    if(res.data.code !== 200){
      return message.error(res.data.msg)
    }
      message.success('删除成功')
      getUserList()
  }
  const showDeleteConfirm = (id:string) => {
    Modal.confirm({
      title: '此操作不可逆，确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        getRemoveUser(id)
      },
    });
  }
  const search = () => {
    // console.log(searchRef.current?.form.getFieldValue())
    setCurrent({...current,...searchRef.current?.form.getFieldValue()})
  }
  useEffect(() => {
    getUserList()
  },[current])
  useEffect(() => {
    if(!isModalOpen){
      setFromValue(null)
    }
  },[isModalOpen])
  useEffect(() => {
    roleListApi()
      .then(res => {
        setRolelist(res.data.data.list)
        // console.log(res.data.data.list)
      })
  },[])
  const columns: TableProps<User>['columns'] = [
    {
      width: 100,
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      fixed: 'left'
    },
    {
      width: 100,
      title: '是否启用',
      render:(_, record) => { return <Status record={record} getUserList={getUserList}/>}
    },
    {
      title: '头像',
      width:150,
      render:(text, record) => {
        return(
          record.avator ? <Image src={record.avator} width={100} /> : <p>未设置头像</p>
        )
      }
    },
    {
      title:'密码',
      dataIndex:'password',
      render: (_, record) => <PassWord pass={record.password} />
    },
    {
      title:'年龄',
      width: 100,
      render:(_,record)=>record.age?<p>{record.age}</p>: <p>--</p>
    },
    {
      title:'性别',
      width: 100,
      render:(_,record)=>record.sex?<p>{ record.sex}</p>: <p>--</p>
    },
    {
      title:'邮箱',
      width: 100,
      render:(_,record)=>record.email ?<p>{ record.email}</p>: <p>--</p>
    },
    {
      title:'上次登录时间',
      width:150,
      render:(_,record) =>{
        return (
          <p>{dayjs(record.lastOnlineTime).format('YYYY-MM-DD HH:mm:ss') }</p>
        )
      }
    },
    {
      title:'创建人',
      dataIndex:'creator'
    },
    {
      title:'操作',
      fixed:'right',
      width:250,
      render:(_,record) => {
        return (
          <Space>
            <Button type="primary" disabled={record.username === 'root'} onClick={() => {setIsRoleShow(true)
              roleForm.setFieldsValue({ role: record.role })
              setFromValue(record)
            }}>分配角色</Button>
            <Button type="link" disabled={record.username === 'root'} 
              onClick={() => {setIsModalOpen(true); setFromValue(record)}}>编辑</Button>
            <Button danger disabled={record.username === 'root'} onClick={() => {showDeleteConfirm(record._id)}}>删除</Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Search ref={searchRef}/>
      <Button type="primary" onClick={() => {setIsModalOpen(true)}}>新增</Button>
      <Button type="primary" style={{margin:'0 10px'}} onClick={() => { 
        searchRef.current?.form.resetFields()
        setCurrent({page:current.page,pagesize:current.pagesize})
      }}
        >重置</Button>
      <Button onClick={() => {search()}}>搜索</Button>
      <Table columns={columns} 
        dataSource={list}
        rowKey="_id"
        scroll={{ x: 1300}}
        pagination={{
          current:current.page,
          pageSize:current.pagesize,
          total,
          onChange(page, pageSize){
            setCurrent({page, pagesize:pageSize})
          },
          showSizeChanger: true,
          pageSizeOptions:[5,10,20]
        }}
      />
      <UpdateModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={handleCancle}
        onOk={onOk}
        fromValue={fromValue}
      />
      <Modal title="分配角色" 
        open={isRoleShow}
        onOk={async () => {
          const values = await roleForm.validateFields()
          await updateUserListApi({ id: fromValue?._id, ...values})
          getUserList()
          setIsRoleShow(false)
        }}
        onCancel={() => { setIsRoleShow(false)
           roleForm.resetFields()
           setFromValue(null)
          }}
      >
        <Form form={roleForm}>
          <Form.Item name="role" rules={[{ required: true, message: '请选择用户角色！' }]}>
            <Select
              placeholder="选择用户角色"
              mode="multiple"
              style={{ width: '100%' }}
              fieldNames={{
                label: 'name',
                value: 'value'
              }}
              options={rolelist}
          />
          </Form.Item>
          </Form>
      </Modal>
      
    </div>
  )
}

export default UserList