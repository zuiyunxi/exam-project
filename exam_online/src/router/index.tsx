import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import UserInfo from "../pages/userInfo/UserInfo";
import UserList from "../pages/userList/UserList";
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";


const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/userManage/personal',
    element: (
      <Layout>
        <UserInfo />
      </Layout>
    )
  },
  {
    path: '/userManage/manage-page',
    element: (
      <Layout>
        <UserList />
      </Layout>
    )
  },
  {
    path: '*',
    element: <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={(
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      )}
    />
  }
]

export default routes

