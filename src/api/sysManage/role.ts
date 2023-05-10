import request from '@/config/axios'

// 查所有已有角色
export const findAllRoles = (): Promise<IResponse> => {
  return request.get({
    url: '/sys/role/findAll'
  })
}

//查菜单
export const RoleChildData = (): Promise<IResponse> => {
  return request.get({
    url: '/sys/menu/RoleChildData'
  })
}

//分页
export const getRoleInfo = (data): Promise<IResponse> => {
  const { page, limit } = data
  return request.post({
    url: `/sys/role/getRoleInfo/${limit}/${page}`,
    data
  })
}

//add
export const addRole = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/role/addRole',
    data
  })
}

//id
export const getRoleById = (data): Promise<IResponse> => {
  const { id } = data
  return request.get({
    url: `/sys/role/getRoleById/${id}`
  })
}

//edit
export const updateRole = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/role/updateRole',
    data
  })
}

//根据id删除
export const delRole = (id): Promise<IResponse> => {
  return request.delete({
    url: `/sys/role/delRole/${id}`
  })
}

//批量根据id删除
export const batchRemoveRole = (data): Promise<IResponse> => {
  return request.delete({
    url: '/sys/role/batchRemoveRole',
    data
  })
}
