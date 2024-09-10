import React, { useEffect, useState } from 'react'
import {  Table, Button, Drawer, Tree } from 'antd'
import type { TableProps, } from 'antd'
import { roleListApi, permissionListApi } from '../../services/systemap'
import type { RoleItem } from '../../types/services/systemapi'
import dayjs from 'dayjs'

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
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    roleListApi()
      .then(res => {
        setRoleList(res.data.data.list)
      })
    permissionListApi()
      .then(res => {
        setPermission(res.data.data.list)
      })
  }, [])

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
        }}>分配角色</Button>
      )
    }
  ]

  return (
   <>
      <Table columns={columns}  dataSource={roleList} rowKey="_id" />
      <Drawer title="分配菜单" onClose={onClose} open={open} footer={<Button type="primary">确定</Button>}>
        <Tree
          checkable
          checkStrictly
          defaultExpandAll
          onCheck={(obj:any) => {
            serCurRowPer(obj)
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