import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Space } from 'antd'


interface PassProps{
    pass:string
}
const Password : React.FC<PassProps>= ({pass}) => {
    const [show,setShow]=useState(false)
  return (
    <Space>
        {show?pass:'*****'}
        <div onClick={()=>setShow(!show)}>
            {show?<EyeInvisibleOutlined/>:<EyeOutlined/>}
        </div>
    </Space>
  )
}

export default Password