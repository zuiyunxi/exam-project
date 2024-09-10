import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import type { FormProps } from 'antd'
import { Button, Space, Form, Input, InputNumber, Select, message, Image, Upload } from 'antd'
import { updateUserApi } from '../../../services/systemap'
import { getUserInfoAction } from '../../../store/modules/user'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './Edit.module.scss'

type FieldType = {
  username: string
  age?: number
  sex?: '男' | '女'
  email?: string
  avator?: string
}

type Props = {
  onCancel: () => void
}


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// 把图片转成 base64
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img)
}

const Edit: React.FC<Props> = (props) => {
  const userInfo = useSelector((state: RootState) => state.user.info)
  const dispatch: AppDispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
    
    const res = await updateUserApi(values)
    if (res.data.code === 200) {
      message.success('修改用户信息成功')
      dispatch(getUserInfoAction())
      props.onCancel()
    } else {
      message.error(res.data.msg)
    }
  }

  const [imageUrl, setImageUrl] = useState<string>()

  // 上传图片时执行此函数
  const handleChange: UploadProps['onChange'] = (info) => {
    // 上传完成，把图片转成 base64 展示到页面
    getBase64(info.file as FileType, (url) => {
      setImageUrl(url)
      // form.setFieldValue('avator', url)
      form.setFieldValue('avator', 'https://img1.baidu.com/it/u=2407128260,532505046&fm=253&fmt=auto&app=120&f=JPEG?w=525&h=500')
    })
  }

  useEffect(() => {
    setImageUrl(userInfo.avator)
  }, [])


  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={userInfo}
      style={{ maxWidth: 500 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        wrapperCol={{ offset: 4 }}
        name="avator"
      >
        <Upload
          listType="picture-circle"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
          className={style.pictrue}
        >
          {imageUrl ?
            <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
          :
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          }
        </Upload>
      </Form.Item>

      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="年龄"
        name="age"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType>
        label="性别"
        name="sex"
      >
        <Select
          options={[
            { label: '男', value: '男' },
            { label: '女', value: '女' }
          ]}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="邮箱"
        name="email"
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button onClick={props.onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default Edit






// import React from 'react'
// import type { FormProps } from 'antd';
// import { Button, Checkbox, Form, Input, InputNumber, Select, Space } from 'antd';
// import { useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../../../store'

// interface Props{
//   onCancel: () => void
// }

// type FieldType = {
//   username: string;
//   age?: number
//   sex?: '男' | '女'
//   email?: string
//   avator?: string

// };

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };


// const Edit: React.FC<Props> = (props) => {
//   const userInfo = useSelector((state: RootState) => state.user.info)


//   return (
//     <div>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ maxWidth: 600 }}
//         initialValues={userInfo}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item<FieldType>
//           label="用户名"
//           name="username"
//           rules={[{ required: true, message: '请输入用户名' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="年龄"
//           name="age"
//         >
//           <InputNumber />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="邮箱"
//           name="email"
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="性别"
//           name="sex"
//         >
//           <Select
//             style={{ width: 120 }}
//             options={[
//               { value: '男', label: '男' },
//               { value: '女', label: '女' },
//             ]}
//           />
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Space>
//             <Button type="primary" htmlType="submit">确认修改 </Button>
//             <Button onClick={() => props.onCancel()}>取消</Button>
//           </Space>
//         </Form.Item>
//       </Form>
//     </div>
//   )
// }

// export default Edit