import { Button, Form, Input, message } from 'antd';
import style from './Login.module.scss'
import { loginApi, loginImgApi } from '../../services';
import { useEffect, useState } from 'react';
import type { LoginParams } from '../../type/services/login'
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate()
  //登录验证码图片
  const [loginImg, setLoginImg] = useState('')
  //点击登录成功后
  const onFinish = (values:LoginParams) => {
    getLoginApi(values)
  }
  //获取登录验证码图片
  const getLoginImgApi = async () => {
    try{
      const res = await loginImgApi()
      setLoginImg(res.data.data.code)
    }catch(e) {
      message.error('请求失败，请稍后重试！')
    }
    
  }
  //获取token
  const getLoginApi = async (values:LoginParams) => {
    try{
      const res = await loginApi(values)
      if(res.data.code !== 200){
        message.error(res.data.msg)
      }else if(res.data.code === 200){
        message.success('登录成功')
        localStorage.setItem('token', res.data.data.token)
        navigate('/')
      }
      console.log(res.data)
    }catch(e){
      message.error('请求失败')
    }
  }

  useEffect( () => {
    getLoginImgApi()
  },[])

  return (
    <div className={style.login}>
      <h2>考试系统登录</h2>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 400 }}
        initialValues={{ username:'', password:''}}
        onFinish={onFinish}
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

          <Form.Item 
            label="验证码： "
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input  addonAfter={ <img src={loginImg} alt="" 
              style={{width:'100px', height:'28px'}} 
              onClick={() => {getLoginImgApi()}} />}
            />
          </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login