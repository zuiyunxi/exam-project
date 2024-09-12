import React, { forwardRef, useImperativeHandle } from 'react';
import type { FormInstance } from 'antd';
import { Form, Input, Select } from 'antd';
import style from './Search.module.scss'

export type FieldType = {
  username?: string
  email?: string
  status?:number
  age?:string
  sex?:string
}
export interface SearchRef {
  form: FormInstance<FieldType>
}
const Search: React.ForwardRefRenderFunction<SearchRef> = (props, ref) => {

  const [ form ] = Form.useForm()
  useImperativeHandle(ref,() => {
    return {
      form
    }
  },[form])
  return (
    <Form
      name="basic"
      form={form}
      layout="inline"
      autoComplete="off"
      className={style.searchForm}
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="邮箱"
        name="email"
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="状态"
        name="status"
      >
        <Select 
        placeholder='账号状态'
        options={[
          {value:1,label:'启用'},
          {value:0,label:'禁用'}
        ]} />
      </Form.Item>

      <Form.Item<FieldType>
        label="年龄"
        name="age"
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="性别"
        name="sex"
      >
        <Select
        placeholder="请输入性别"
        allowClear
        options={[
          {value:'男', label:'男'},
          {value:'女', label:'女'},
        ]}
        />
      </Form.Item>
    </Form>
  )
}

export default forwardRef(Search)