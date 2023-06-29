import request from '@/config/axios'
import type { UserLoginType, UserType, UserResult, RefreshTokenResult } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserLoginType): Promise<IResponse<UserResult>> => {
  return request.post({ url: '/user/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/user/loginOut' })
}

/** 刷新token */
export const refreshTokenApi = (data?: object): Promise<IResponse<RefreshTokenResult>> => {
  return request.post({ url: '/user/refreshToken', data })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/role/list', params })
}
