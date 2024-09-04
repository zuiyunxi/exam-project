import { Navigate, Link } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import UserInfo from "../pages/userInfo/UserInfo"
import UserList from "../pages/userlist/UserList"
import { Button, Result } from 'antd'
import Layout from '../components/layout/Layout'

const routes = [
  {
    path:'/',
    element:<Navigate to='/home'/>
  },
  {
    path:'/home',
    element:(<Layout>
      <Home />
    </Layout>),
    isLogin: true,
    children:[
      {
        path:'/home',
        element:<Navigate  to='/home/userList' />,
      },
      {
        path:'/home/userinfo',
        element:(
          <Layout>
            <UserInfo />
          </Layout>
        ) ,
      },
      {
        path:'/home/userlist',
        element:(
          <Layout>
            <UserList />
          </Layout>
        ),
        isLogin: true
      }
    ]
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'*',
    element:  <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={ <Link to='/home'>
          <Button>回到首页</Button>
        </Link>}
      />
  }
]


export default routes