import React from 'react'
import type { FormProps } from 'antd';
import { Button, Modal, Checkbox, Form, Input } from 'antd';


interface Props {
  isModalOpen: boolean
  updateRow: any
  onOk: () => void
  onCancel: () => void
}


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const UpdateModal: React.FC<Props> = (props) => {
  return (
    <div>
      <Modal title="Basic Modal" open={props.isModalOpen} onOk={props.onOk} onCancel={props.onCancel}>
        {JSON.stringify(props.updateRow )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateModal