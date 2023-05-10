import request from '@/config/axios'
import type { MenuItem } from './types'
// 菜单管理
/* 查询菜单列表
 */
export const queryMenuLists = (): Promise<IResponse> => {
  return request.get({ url: '/sys/menu/findChildData' })
}

/* 添加页面
 */
export const addPageOrModule = (data: MenuItem): Promise<IResponse> => {
  return request.post({ url: '/sys/menu/addSysMenu', data })
}

/* 修改页面
 */
export const modifyPageOrModule = (data: MenuItem): Promise<IResponse> => {
  return request.post({ url: '/sys/menu/updateSysMenu', data })
}

/* 删除页面
 */
export const deletePageOrModule = (id: number): Promise<IResponse> => {
  return request.delete({ url: `/sys/menu/delMenuById/${id}` })
}

/* 查询是否是演示模式
 */
export const queryIfPresent = (): Promise<IResponse> => {
  return request.get({ url: '/sysModel/getIfPresent' })
}

/* 改变是否是演示模式
 */
export const changeIfPresent = (val: number): Promise<IResponse> => {
  return request.get({ url: `/sysModel/updateIfPresent/${val}` })
}
