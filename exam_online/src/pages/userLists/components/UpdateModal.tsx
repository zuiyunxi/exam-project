import React, {  useEffect} from 'react'
import { Radio, Form, Input,InputNumber,Modal, Select } from 'antd';
import type { FormProps } from 'antd';
import type { User } from '../../../../type/services/systemapi';

type FieldType = {
  username: string;
  password: string;
  age:string;
  email:string;
  sex:'男'|'女'
  status:0|1
};
interface props {
  setIsModalOpen : () => void
  isModalOpen:boolean,
  onOk:(values : User) => void
  fromValue:Partial<User>|null
}

const UpdateModal:React.FC<props>= ({
  setIsModalOpen,
  isModalOpen,
  onOk,
  fromValue
}) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<User>['onFinish'] = (values) => {
    onOk(values)
  }
  useEffect(() => {
      form.setFieldsValue(fromValue)
  },[fromValue])
  useEffect(() => {
    if(!isModalOpen){
      form.resetFields()
    }
  }, [isModalOpen])
  return (
      <Modal title="编辑" open={isModalOpen} onCancel={setIsModalOpen} onOk={() => {form.submit()}}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<FieldType>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请输入性别' }]}
          >
            <Select options={[
              {label:'男', value:'男'},
              {label:'女', value:'女'}
            ]} />
          </Form.Item>
          <Form.Item<FieldType>
            label="账号状态"
            name="status"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default UpdateModal