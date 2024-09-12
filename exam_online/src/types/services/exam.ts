export interface BaseRes<T = any> {
  code: number;
  msg: string;
  data: T
}

export type ExamListParams = {
  page: number
  pagesize: number 
}


export interface QuestionItem {
  answer: string
  classify: string
  desc?: string
  options: string[]
  question: string
  type: string
  __v: number
  _id: string
}

export interface ExamListItem {
  classify: string
  createTime: number
  creator: string
  endTime: number
  examId: string
  examiner: string[]
  group: []
  name: string
  questionsList: QuestionItem[]
  startTime: number
  status: 0 | 1
  __v: number
  _id: string
}

export interface ExamListResPonse {
  total: number
  totalPage: number
  list: ExamListItem[]
}



export interface ExamInfoResponse {
  classify: string
  createTime: number
  creator: string
  name: string
  questions: QuestionItem[]
  __v: number
  _id: string
}


