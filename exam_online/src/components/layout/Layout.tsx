import {
  LogoutOutlined,
  CrownFilled,
  SmileFilled,
  UserOutlined
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import {
  Dropdown,
  Spin
} from 'antd';
import React, { useState , useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import { getUserInfoAction } from '../../store/modules/user'
// import { setUserInfo } from '../../store/modules/user';
import { message } from 'antd'
// import { logoutApi } from '../../services/login';
import type { MenuProps } from 'antd';
import { menuListApi } from '../../services/systemap';



interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.user.info)
  const loading = useSelector((state: RootState) => state.user.loading)
  const [menuList , setMenuList] = useState([])

  // 点击退出登录
  const onClick: MenuProps['onClick'] = () => {
    localStorage.removeItem('token')
    navigate('/login')
  };
  
  // useEffect(() => {
  //   userInfoApi()
  //     .then(res => {
  //       // console.log(res.data.data);
  //       dispatch(setUserInfo(res.data.data))
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       if(e.status === 401){
  //         message.error('用户信息失效，请重新登录')
  //         navigate('/login')
  //       } else{
  //         message.error('请求失败')
  //       }
        
  //     })
  // } , [])


  // if (typeof document === 'undefined') {
  //   return <div />;
  // }

  useEffect(() => {
    // 发送异步action
    dispatch(getUserInfoAction())

    menuListApi()
      .then(res => {
        console.log(res.data.data.list);
        setMenuList(res.data.data.list.map(item => {
          return {
            ...item,
            routes: item.children
          }
        }))
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  if (loading) return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" />
    </div>
  )

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
          // {...defaultProps}
          // 权限
          route={{
            path: '/',
            routes: [
              {
                path: '/',
                name: '首页',
                icon: <SmileFilled />,
              },
              ...menuList
            ]
          }}


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
                        key: 'userInfo',
                        icon: <UserOutlined />,
                        label: <Link to="/userManage/personal">个人信息</Link>
                      },
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                      },
                    ],
                    onClick: ({ key }) => {
                      if (key === 'logout') {
                        localStorage.removeItem('token')
                        navigate('/login')
                      }
                    }
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    {dom}
                  </a>
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
                } else {
                  navigate(item.path!)
                }
              }}
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