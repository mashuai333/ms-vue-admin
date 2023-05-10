import request from '@/config/axios'

// 查all
export const findAll = (data): Promise<IResponse> => {
  return request.get({
    url: '/sys/user/findAll',
    data
  })
}
export const getUserOrgName = (): Promise<IResponse> => {
  return request.get({
    url: '/sys/user/getUserOrgName'
  })
}

//分页
export const getUserInfo = (data): Promise<IResponse> => {
  const { page, limit } = data
  return request.post({
    url: `/sys/user/getUserInfo/${limit}/${page}`,
    data
  })
}

//add
export const addUser = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/user/addUser',
    data
  })
}

//id
export const resetPassword = (id): Promise<IResponse> => {
  return request.get({
    url: `/sys/user/resetPassword/${id}`
  })
}
//id
export const getUserById = (data): Promise<IResponse> => {
  const { id } = data
  return request.get({
    url: `/sys/user/getUserById/${id}`
  })
}
// false
export const changeState = (data): Promise<IResponse> => {
  const { id, state } = data
  return request.get({
    url: `/sys/user/changeState/${id}/${state}`
  })
}

//edit
export const updateUserInfo = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/user/updateUserInfo',
    data
  })
}

//根据id删除
export const delUserInfo = (id): Promise<IResponse> => {
  return request.delete({
    url: `/sys/user/delUserInfo/${id}`
  })
}

//批量根据id删除
export const batchRemovedUserInfo = (data): Promise<IResponse> => {
  return request.delete({
    url: '/sys/user/batchRemovedUserInfo',
    data
  })
}
