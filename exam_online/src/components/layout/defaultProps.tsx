import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <SmileFilled />,
        routes: [
          {
            path: '/',
            name: '首页信息',
            icon: <CrownFilled />,
          }
        ],
      },
      {
        path: '/exam',
        name: '考试管理',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/exam/record',
            name: '考试记录',
            icon: <CrownFilled />,
          },
          {
            path: '/exam/create',
            name: '创建考试',
            icon: <CrownFilled />,
          },
        ],
      },
      {
        path: '/manage-group',
        name: '班级管理',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/manage-group/group-list',
            name: '班级列表',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-students',
            name: '学生列表',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-class',
            name: '班级列表',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-detail/:id',
            name: ':id',
            icon: <CrownFilled />,
          },
        ],
      },



      {
        path: '/userManage',
        name: '系统管理',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/userManage/system',
            name: '角色管理',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/menuManage',
            name: '权限管理',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/personal',
            name: '个人信息',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/userOptions',
            name: '用户',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/manage-page',
            name: '用户列表',
            icon: <CrownFilled />,
          },
        ],
      },
      {
        path: '/paper',
        name: '试卷管理',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/paper/paper-bank',
            name: '试卷库',
            icon: <CrownFilled />,
          },
          {
            path: '/paper/create-paper',
            name: '添加试卷',
            icon: <CrownFilled />,
          },
        ],
      },



    ],
  },
};