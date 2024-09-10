import React, { useState } from 'react';
import Info from './conponents/Info';
import Edit from './conponents/Edit';

const UserInfo: React.FC = () => {
  const [showInfo , setShowInfo] = useState(true)

  return (
    <div>
      { showInfo ?  
        <Info onShow={() => setShowInfo(false)}></Info>
      :
        <Edit onCancel={() => setShowInfo(true)}></Edit>
      }
    </div>
  )
}

export default UserInfo



