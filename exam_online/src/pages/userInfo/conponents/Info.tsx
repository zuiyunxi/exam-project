import React, { useState } from 'react';
import { Descriptions, Button, Avatar } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';
 import type { RootState } from '../../../store';

interface Props {
  onShow: () => void
}

const Info: React.FC<Props> = (props) => {
  const userInfo = useSelector((state: RootState) => state.user.info)
  

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: userInfo.username
    },
    {
      key: '2',
      label: '年龄',
      children: userInfo.age
    },
    {
      key: '3',
      label: '性别',
      children: userInfo.sex
    },
    {
      key: '4',
      label: '邮箱',
      children: userInfo.email
    },
    {
      key: '5',
      label: '上次登录时间',
      children: '--',
    },
  ];

  return (
    <div>
      <Descriptions 
        title={<Avatar size={100} src={userInfo.avator} />} 
        items={items} 
      />
      <Button type='primary' onClick={props.onShow}>修改信息</Button>
    </div>
  )
}

export default Info