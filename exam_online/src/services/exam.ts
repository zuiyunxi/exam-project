import request from "./request";
import { ExamListParams, BaseRes , ExamListResPonse , ExamInfoResponse } from '../types/services/exam'

// http://192.168.28.11:3001/examination/list?creator=root
export const getExamApi = (params: ExamListParams) => {
  return request.get<BaseRes<ExamListResPonse>>('/examination/list' , {
    params
  })
}


export const getExamDetailApi = (id: string) => {
  return request.get<BaseRes<ExamInfoResponse>>(`exam/detail?id=${id}`)
}
// exam/detail?id=644782d7823a3c5b527e9dda









export const getApi = () => {
  return request.get(`/examination/detail?id=643d09d61bab90ce83ac4a88`)
}
// /examination/detail?id=643d09d61bab90ce83ac4a88
