import {
  LogoutOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import {
  Dropdown,
} from 'antd';
import React, { useState , useEffect } from 'react';
import defaultProps from './defaultProps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import { userInfoApi } from '../../services/login';
import { setUserInfo } from '../../store/modules/user';
import { message } from 'antd'


interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.user)

  
  useEffect(() => {
    userInfoApi()
      .then(res => {
        console.log(res.data.data);
        dispatch(setUserInfo(res.data.data))
      })
      .catch(e => {
        console.log(e);
        if(e.status === 401){
          message.error('用户信息失效，请重新登录')
          navigate('/login')
        } else{
          message.error('请求失败')
        }
        
      })
  } , [])


  if (typeof document === 'undefined') {
    return <div />;
  }

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          title="onlineExam"
          prefixCls="my-prefix"
          logo="https://cn.redux.js.org/img/redux.svg"
          {...defaultProps}
          location={{
            pathname: location.pathname
          }}
          token={{
            header: {
              colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
            },
          }}
          siderMenuType="group"
          menu={{
            collapsedShowGroupTitle: true,
          }}
          avatarProps={{
            src:  userInfo.avator ||'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: userInfo.username,
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          
          menuItemRender={(item, dom, props) => (
            <div
              onClick={() => {
                // setPathname(item.path || '/welcome');
                const cur = props.route?.routes.find((v : any)=> v.path === item.path)
                if(cur?.routes){
                  navigate(cur?.routes[0].path)
                }else{
                  navigate(item.path!)
                }
              }
              }
            >
              {dom}
            </div>
          )}
          fixSiderbar={true}
          layout="mix"
          splitMenus={true}
        >
          <PageContainer>
            <ProCard
              style={{
                height: '200vh',
                minHeight: 800,
              }}
            >
              {props.children}
            </ProCard>
          </PageContainer>

        </ProLayout>

      </ProConfigProvider>
    </div>
  );
};

export default Layout





// import React, { useEffect, useState } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'

// import style from './Layout.module.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { userInfoApi } from '../../services/login'
// import { setUserInfo } from '../../store/modules/user'
// import { message } from 'antd'


// interface Props {
//   children: React.ReactNode
// }

// interface Permission{
//   createTime: number
//   disabled: boolean
//   isBtn: boolean
//   name: string
//   path: string
//   pid: string
//   __v: number
//   _id: string
//   }


// const Layout: React.FC<Props> = (props) => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [navList , setNavList] = useState<Permission[]>([])

//   useEffect(() => {
//     userInfoApi()
//       .then(res => {
//         console.log(res.data);
//         dispatch(setUserInfo(res.data.data))
//         setNavList(res.data.data.permission)
//       })
//       .catch(e => {
//         console.log(e);
//         if(e.status === 401){
//           message.error('用户信息失效，请重新登录')
//           navigate('/login')
//         } else{
//           message.error('请求失败')
//         }
        
//       })
//   } , [])

//   return (
//     <div>
//       <header></header>
//       <main>
//         <div className={style.side}>
//           {/* {navList.map(item => 
//             <div><NavLink key={item._id} to={item.path}>{item.name}</NavLink></div>
//           )} */}
//           <div><NavLink to="/">首页</NavLink></div>
//           <div><NavLink to="/userManage/personal">个人信息</NavLink></div>
//           <div><NavLink to="/userManage/manage-page">用户列表</NavLink></div>
//         </div>
//       </main>
//       {props.children}
//     </div>
//   )
// }

// export default Layout