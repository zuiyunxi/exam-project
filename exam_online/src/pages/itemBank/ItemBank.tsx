import React, { useEffect, useState } from 'react';
import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { questionListApi } from '../../services/systemap';
import type { questionListParams } from '../../types/services/questionBank'

const ItemBank = () => {
  const [questionList, setQuestionList] = useState()
  const getQuestionList = async() => {
    const res = await questionListApi()
    console.log(res.data.data.list)
    setQuestionList(res.data.data.list)
  }
  console.log(Date.now())
  useEffect(() => {
    getQuestionList()
  },[])
  const columns: TableProps<questionListParams>['columns'] = [
    {
      title: '试题列表',
      dataIndex: 'question',
      ellipsis:true,
      width:250
    },
    {
      title: '分类',
      dataIndex: 'type',
    },
    {
      title:'题型',
      dataIndex:'classify'
    },
    {
      title:'创建时间',
      render:(text) => {return <p>2024-09-11 20:45:09</p>}
    },
    {
      title:'操作',
      render:(text, record) => {
        return(
          <>
            <Button type="primary" style={{marginRight:10}}>编辑</Button>
            <Button danger>删除</Button>
          </>
        )
      }
    }
  ]
  return (<Table columns={columns} 
            dataSource={questionList} 
            rowKey={'_id'} 
            bordered 
            // pagination={ }
            />)
}

export default ItemBank