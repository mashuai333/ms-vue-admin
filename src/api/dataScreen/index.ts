import request from '@/config/axios'
import axios from 'axios'
// 本地请求json 数据
export const queryLocalJson = (name: string) => {
  return axios.get(`${import.meta.env.BASE_URL}map/json/${name}.json`)
}

/* 查询线路设备情况
 */
export const queryLineEquipList = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/LineEquipmentNumber' })
}

/* 查询钢轨数据
 */
export const queryRailData = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/RaildData' })
}

/* 查询钢轨使用年限分布
 */
export const queryRailUseYear = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/yearoftherail' })
}

/* 查询轻重伤比例
 */
export const queryInjuryRadio = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/Proportionofminor' })
}

/* 查询伤损类型比例
 */
export const queryInjuryTypeRadio = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/flawTypes' })
}

/* 查询所有车站
 */
export const queryStationPosition = (): Promise<IResponse> => {
  return request.get({ url: '/equ/station/findAll4Map' })
}

/* 查询探伤工作类型
 */
export const queryFlawType = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/getStatusNum' })
}

/* 总累、年累伤损及大维修评价
 */
export const queryFlawInfo = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/flowInfoAndDxpj' })
}

/* 查询探伤工单数量
 */
export const queryOrderNum = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/getDateNum' })
}

/* 查询伤损归类
 */
export const queryInjuryType = (): Promise<IResponse> => {
  return request.get({ url: '/homepage/getRailInfoNum' })
}
