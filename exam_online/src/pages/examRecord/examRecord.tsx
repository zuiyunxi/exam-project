import React, { useEffect, useState } from 'react'

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Drawer } from 'antd';
import { useRef } from 'react';
import { getExamApi, getExamDetailApi } from '../../services/exam'
import type { ExamListItem , ExamInfoResponse , QuestionItem } from '../../types/services/exam';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import style from './examRecord.module.scss'

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};




const examRecord: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [params , setParams] = useState({
    page: 1,
    pagesize: 10
  })

  const [open, setOpen] = useState(false);
  const [examInfo , setExamInfo] = useState<ExamInfoResponse>({
    classify: '',
    createTime: 0,
    creator: '',
    name: '',
    questions: [],
    __v: 0,
    _id: '',
  })

  const [singleChoice , setSingleChoice] = useState<QuestionItem[]>([]) //单选
  const [judgeChoice , setJudgeChoice] = useState<QuestionItem[]>([]) //判断
  const [gapFilling , setGapFilling] = useState<QuestionItem[]>([]) //填空
  const xxSelext = ['A' , 'B' , 'C' , 'D']

  // 显示抽屉预览试卷
  const showDrawer = (id: string) => {
    console.log(id);
    setOpen(true);
    getExamDetailApi(id)
      .then(res => {
        // console.log(res.data)
        setExamInfo(res.data.data)
        let dxArr: QuestionItem[] = []
        let pdArr: QuestionItem[] = []
        let tkArr: QuestionItem[] = []
        if(examInfo.questions){
          examInfo.questions.forEach(item => {
            if(item && item.type === '1'){
              dxArr.push(item)
            }else if(item && item.type === '3'){
              pdArr.push(item)
            }else if(item){
              tkArr.push(item)
            }
          })
        }

        setSingleChoice(dxArr)
        setJudgeChoice(pdArr)
        setGapFilling(tkArr)
      })
    
  };

  //导出PDF
  const exportToPDF = () => {
    // 确保当前有选中的记录
    if (!examInfo) {
      // 可以在这里添加错误处理逻辑，如显示错误消息
      return;
    }
  
    // 获取要导出的 DOM 元素
    const element = document.getElementById('table-to-export');
    if (!element) {
      console.error('Element with ID "table-to-export" not found.');
      return; // 退出函数，因为没有找到元素
    }
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 纸大小
      pdf.save('exam-record.pdf'); // 导出 PDF 文件
    });
  };


  useEffect(() => {
    if (examInfo && examInfo.questions) {
      let dxArr: QuestionItem[] = []
      let pdArr: QuestionItem[] = []
      let tkArr: QuestionItem[] = []
      examInfo.questions.forEach(item => {
        console.log(item);
        if(item && item.type === '1'){
          dxArr.push(item)
        }else if(item && item.type === '3'){
          pdArr.push(item)
        }else if(item){
          tkArr.push(item)
        }
      })

      setSingleChoice(dxArr);
      setJudgeChoice(pdArr);
      setGapFilling(tkArr);
    }
  }, [examInfo]); // 依赖于 examInfo

  // 关闭
  const onClose = () => {
    setOpen(false);
    setSingleChoice([]);
    setJudgeChoice([]);
    setGapFilling([]);
  };

  // 分页器
  const handlePaginationChange = (page: number, pagesize: number) => {
    setParams({
      page,
      pagesize
    });
    // 调用 actionRef.current.reload() 来刷新表格数据
    actionRef.current?.reload();
  };




  const columns: ProColumns<ExamListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
      copyable: true,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_,record) => record.createTime ? dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') : '--',
      valueType: 'dateTime', // 使用 dateTime 而不是 dateRange，如果你需要时间选择
      // hideInTable: true,
      search: {
        transform: (value) => {
          return {
            createTime: value ? value.start.format('YYYY-MM-DDTHH:mm:ss') : undefined,
          };
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_,record) => record.status === 1 ? '已结束' : '未开始'
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      key: 'examiner',
      render: (_,record) => record.examiner.join(' ')
    },
    {
      title: '考试班级',
      dataIndex: 'group',
      key: 'group',
      render: (_,record) => record.group.join(' ')
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_,record) => record.startTime ? dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss') : '--',
      valueType: 'dateTime', // 使用 dateTime 而不是 dateRange，如果你需要时间选择
      // hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value ? value.start.format('YYYY-MM-DDTHH:mm:ss') : undefined
          };
        },
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (_,record) => record.endTime ? dayjs(record.endTime).format('YYYY-MM-DD HH:mm:ss') : '--',
      valueType: 'dateTime', // 使用 dateTime 而不是 dateRange，如果你需要时间选择
      // hideInTable: true,
      search: {
        transform: (value) => {
          return {
            endTime: value ? value.end.format('YYYY-MM-DDTHH:mm:ss') : undefined,
          };
        },
      },
    },
    {
      title: '设置',
      dataIndex: 'set',
      key: 'set',
      render: (_,record) => (
        <Space>
          <Button type='primary' onClick={() => showDrawer(record.examId)}>预览试卷</Button>
          <Button disabled>删除</Button>
        </Space>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_,record) => (
        <Button type='primary'>成绩分析</Button>
      )
    },
    {
      title: '默认操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          编辑
        </a>,
        <a  target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  
  return (
    <>

    <Drawer 
    title="试卷预览" 
    onClose={onClose} 
    open={open} size='large'
    extra={
      <Space>
        <Button  onClick={exportToPDF}>导出PDF</Button>
        <Button type="primary" onClick={onClose}>
          OK
        </Button>
      </Space>
    }
    >
      { examInfo 
          && 
        <div id='table-to-export' className={style.con}>
        <div id='table-to-export' className={style.title}>
          <h1>{examInfo?.name}</h1>
          <p>科目：{examInfo?.classify}</p>
        </div>

        {singleChoice.length === 0 ? <></> :
          <div id='' className={style.info}>
            <b>单选题</b>
            <ul>
              {singleChoice.map((it,idx) => 
                <li key={it.question}>
                  <p>{idx + 1}.{it.question}</p>
                  {it.options.map((v,i) => 
                    <span key={v}>{xxSelext[i]}.{v}</span>
                  )}
                </li>
              )}
            </ul>
          </div>
        }

        {judgeChoice.length === 0 ? <></> :
          <div className={style.info}>
            <b>单选题</b>
            <ul>
              {judgeChoice.map((it,idx) => 
                <li key={it.question}>
                  <p>{idx + 1}.{it.question}</p>
                  {it.options.map((v,i) => 
                    <span key={v}>{xxSelext[i]}.{v}</span>
                  )}
                </li>
              )}
            </ul>
          </div>
        }

        {gapFilling.length === 0 ? <></> :
          <div className={style.info}>
            <b>单选题</b>
            <ul>
              {gapFilling.map((it,idx) => 
                <li key={it.question}>
                  <p>{idx + 1}.{it.question}</p>
                  {it.options.map((v,i) => 
                    <span key={v}>{xxSelext[i]}.{v}</span>
                  )}
                </li>
              )}
            </ul>
          </div>
        }
      </div>
      }
      {/* {JSON.stringify(examInfo)} */}
    </Drawer>



    <ProTable<ExamListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // dataSource={data}
      scroll={{x: 2000}}
      request={async (params, sort, filter) => {
        // console.log(params, sort, filter);
        filters: true
        // await waitTime(100);
        const res = await getExamApi({
          // params
          page: params.current as number,
          pagesize: params.pageSize as number
        })
        // console.log(res.data.data.list);
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total
          
        }
      }}
      editable={{
        type: 'multiple',
      }}
      // 列设置
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="_id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        current: params.page,
        pageSize: params.pagesize,
        pageSizeOptions: ['5', '10', '15', '20'],
        onChange: handlePaginationChange,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              { label: '1st item' , key: '1' },
              { label: '2nd item' , key: '2' },
              { label: '3rd item' , key: '3' },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
    </>
  );
};


export default examRecord
