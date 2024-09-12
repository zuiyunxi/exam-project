import React, { useEffect, useState } from 'react'
import { Space, Table, Button, Drawer, Tree, message } from 'antd'
import type { TableProps, TreeDataNode, TreeProps } from 'antd'
import { roleListApi, permissionListApi, roleUpdateApi } from '../../services/systemap'
import type { RoleItem } from '../../types/services/systemapi'
import dayjs from 'dayjs'
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type CheckedPer = {
  checked: string[]
  halfChecked: string[]
}
const System = () => {
  const [roleList, setRoleList] = useState()
  const [open, setOpen] = useState(false)
  const [curRowPer, serCurRowPer] = useState<CheckedPer>({
    checked: [],
    halfChecked: []
  })
  const [permission, setPermission] = useState<any[]>([])
  const [roleId, setRoleId] = useState('')
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false)
  }
  const getRoleListApi = () => {
    roleListApi()
    .then(res => {
      setRoleList(res.data.data.list)
    })
  }
  useEffect(() => {
    getRoleListApi()
    roleListApi()
      .then(res => {
        setRoleList(res.data.data.list)
      })
    permissionListApi()
      .then(res => {
        setPermission(res.data.data.list)
      })
  }, [])
  const submit = async() => {
    const arr = curRowPer.halfChecked? curRowPer.checked.concat(curRowPer.halfChecked):curRowPer.checked
    console.log(roleId)
    const res = await roleUpdateApi(
      {id:roleId,
      permission:arr}
    )
    if(res.data.code === 200){
      message.success('编辑成功')
      setOpen(false)
      getRoleListApi()
    }else{
      message.error(res.data.msg)
    }
  }

  const columns: TableProps<RoleItem>['columns'] = [
    {
      title: '角色',
      dataIndex: 'name',
    },
    {
      title: '创建人',
      dataIndex:'creator'
    },
    {
      title: '创建时间',
      dataIndex:'createTime',
      render:(text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      render: (_, record) => (
        <Button type="primary" onClick={() => {
          showDrawer()
          const obj:CheckedPer = {
            checked:[],
            halfChecked:[]
          }
          record.permission.forEach(val => {
            const first:{children:{_id:string}[]} = permission.find(item => item._id === val)
            if(first){
              if(first.children.every(v => record.permission.includes(v._id))){
                obj.checked.push(val)
              }else{
                obj.halfChecked.push(val)
              }
            }else{
              obj.checked.push(val)
            }
          })
          serCurRowPer(obj)
          setRoleId(record._id)
        }}>分配角色</Button>
      )
    }
  ]

  return (
   <>
      <Table columns={columns}  dataSource={roleList} rowKey="_id" />
      <Drawer title="分配菜单" onClose={onClose} open={open} footer={
        <Button type="primary" onClick={() => {submit()}}>确定</Button>}
      >
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checked:any,obj:any) => {
            serCurRowPer({
              checked,
              halfChecked:obj.halfChecked
            })
          }}
          checkedKeys={curRowPer}
          treeData={permission}
          fieldNames={{
            key: '_id',
            title: 'name'
          }}
        />
      </Drawer>
   </>
  )
}

export default System