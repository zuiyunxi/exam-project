import React, { useEffect } from 'react'
import { 
    Button ,
    Radio,
    Select,
    InputNumber,
    Form,
    Input,
    Modal
} from 'antd'
import type { FormProps } from 'antd'

type FieldType={
    username:string,
    password:string,
    age:number,
    email:string,
    sex:0|1,
    status:0|1
}

interface Props{
    initValue?:Partial<FieldType>|null,
    visible:boolean,
    onOk:(values:FieldType)=>void,
    onCancel:()=>void

}

const UpdateModal:React.FC<Props> = ({
    initValue,
    visible,
    onOk,
    onCancel
}) => {
    const [form] = Form.useForm()

    const handleOk = () => {
        form.submit()
      };
      const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // 校验成功，通知父组件数据
        onOk(values)
      }
      useEffect(()=>{
        if(initValue){
            form.setFieldsValue({...initValue})
        }
      },[initValue])

      useEffect(()=>{
        if(!visible){
            form.resetFields()
        }
      },[visible])
    

    return (
       <Modal title={initValue?'编辑用户':'新增用户' } open={visible} onOk={handleOk} onCancel={onCancel}>
            <Form 
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            >

            <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
            >
            <Input />
            </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item<FieldType>
          label="年龄"
          name="age"
          rules={[{ required: true, message: '请输入年龄!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱!' },
            {type: 'email', message: '请输入正确的邮箱!' }

        ]}
        >
          <Input placeholder='输入邮箱'/>
        </Form.Item>

        <Form.Item<FieldType>
          label="性别"
          name="sex"
          rules={[{ required: true, message: '请输入性别!' }]}
        >
            
          <Select placeholder='输入性别'  options={[
            {value: 1, label: '男'},
            {value: 0, label: '女'}
          ]}/>
        </Form.Item>

        <Form.Item<FieldType>
          label="帐号状态"
          name="status"
          rules={[{ required: true, message: '请输入状态!' }]}
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