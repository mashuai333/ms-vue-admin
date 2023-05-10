import request from '@/config/axios'
import type { UserLogin, UserModify } from './types'

// 登录
export const userLogin = (data: UserLogin): Promise<IResponse> => {
  return request.post({ url: '/sys/user/login', data })
}

// 退出登录
export const quitLogin = (): Promise<IResponse> => {
  return request.get({ url: '/login/quit' })
}

/* 修改密码
 */
export const updatePassword = (data: UserModify): Promise<IResponse> => {
  return request.post({ url: '/sys/user/updatePassword', data })
}

// 获取统一登录地址
export const getLoginAddress = (): Promise<IResponse> => {
  return request.get({ url: '/dock/dz/getLoginAddress' })
}

// 统一身份认证登录
export const idCardLogin = (data): Promise<IResponse> => {
  return request.post({
    url: '/dock/dz/login',
    data
  })
}
