import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

import ExamRecord from "../pages/examRecord/examRecord";
import ExamCreate from "../pages/examCreate/ExamCreate";

import GroupList from "../pages/groupList/GroupList";
import GroupStudents from "../pages/groupStudents/GroupStudents";
import GroupClass from "../pages/groupClass/GroupClass";
import GroupDetail from "../pages/groupDetail/GroupDetail";

import UserManage from "../pages/userManage/UserManage";
import UserMenuManage from "../pages/userMenuManage/UserMenuManage";
import UserInfo from "../pages/userInfo/UserInfo";
import UserOptions from "../pages/userOptions/UserOptions";
import UserList from "../pages/userList/UserList"; 

import ItemBank from "../pages/itemBank/ItemBank";
import ItemCreate from "../pages/itemCreate/ItemCreate";

import PaperBank from "../pages/paperBank/PaperBank";
import PaperCreate from "../pages/paperCreate/PaperCreate";



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
    path: '/exam/record',
    element: (
      <Layout>
        <ExamRecord />
      </Layout>
    )
  },
  {
    path: '/exam/create',
    element: (
      <Layout>
        <ExamCreate />
      </Layout>
    )
  },


  {
    path: '/manage-group/group-list',
    element: (
      <Layout>
        <GroupList />
      </Layout>
    )
  },
  {
    path: '/manage-group/group-students',
    element: (
      <Layout>
        <GroupStudents />
      </Layout>
    )
  },
  {
    path: '/manage-group/group-class',
    element: (
      <Layout>
        <GroupClass />
      </Layout>
    )
  },
  {
    path: '/manage-group/group-detail/:id',
    element: (
      <Layout>
        <GroupDetail />
      </Layout>
    )
  },


  {
    path: '/userManage/system',
    element: (
      <Layout>
        <UserManage />
      </Layout>
    )
  },
  {
    path: '/userManage/menuManage',
    element: (
      <Layout>
        <UserMenuManage />
      </Layout>
    )
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
    path: '/userManage/userOptions',
    element: (
      <Layout>
        <UserOptions />
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
    path: '/question/item-bank',
    element: (
      <Layout>
        <ItemBank />
      </Layout>
    )
  },
  {
    path: '/question/create-item',
    element: (
      <Layout>
        <ItemCreate />
      </Layout>
    )
  },


  {
    path: '/paper/paper-bank',
    element: (
      <Layout>
        <PaperBank />
      </Layout>
    )
  },
  {
    path: '/paper/create-paper',
    element: (
      <Layout>
        <PaperCreate />
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