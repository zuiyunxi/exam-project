import React, { useEffect } from 'react'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';


import { loginApi , loginCaptchaApi } from '../../services/login';
import style from './Login.module.scss'
import { useNavigate } from 'react-router-dom';



type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};


const Login: React.FC = () => {
  const [imgUrl , setImgUrl] = useState('')
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();

  const onFinish = async (values: any) => {
    console.log('Received values:', values);
    // 这里可以处理表单提交逻辑，例如调用 API
    try {
      const res = await loginApi(values)
      console.log(res.data);
      if(res.data.code === 200){
        message.success('登录成功')
        localStorage.setItem('token' , res.data.data.token)
        navigate('/')
      }else if(res.data.code === 1005){
        message.error(res.data.msg)
        getCaptcha()
      }
    } catch (error) {
      message.error('请求失败')
    }
  };
  // 验证码
  const getCaptcha = async () => {
    try {
      const res = await loginCaptchaApi()
      if(res.data.code === 200){
        // message.success('请求成功')
        setImgUrl(res.data.data.code)
      }
    } catch (e) {
      message.error('请求失败，请稍后重试')
    }
  }

  useEffect(() => {
    getCaptcha()
  } , [])




  return (
    <div style={{backgroundColor: 'white', height: '100vh',}}>
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://cn.redux.js.org/img/redux.svg"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="OnlineExam"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="考试登录平台"
        onFinish={onFinish}
        initialValues={{ username: 'root', password: '123' }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div className={style.coderow}>
              <ProFormText
                name="code"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={style.code}
                    />
                  ),
                }}
                placeholder={'请输入验证码'}
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
              />
              <div className={style.pic} onClick={getCaptcha}>
                <img src={imgUrl} alt="" />
              </div>
            </div>
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  )
}

export default () => {
  return (
    <ProConfigProvider dark>
      <Login />
    </ProConfigProvider>
  );
};
