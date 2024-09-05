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
        path: '/userManage',
        name: '管理页',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/userManage/personal',
            name: '个人信息',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/manage-page',
            name: '用户列表',
            icon: <CrownFilled />,
          },
        ],
      },
    ],
  },
};