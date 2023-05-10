import request from '@/config/axios'

//查所有组织机构树
export const findChildData = (): Promise<IResponse> => {
  return request.get({
    url: '/sys/org/findChildData'
  })
}

// 织机构信息：区段-工区-班组
export const queryAreaCascader = (): Promise<IResponse> => {
  return request.get({ url: '/sys/org/findOrgs' })
}

// 织机构信息：区段-工区
export const queryAreaFactoryCascader = (): Promise<IResponse> => {
  return request.get({ url: '/sys/org/findOrgsTwoLevel' })
}

//查线路区段
export const getLineArea = (): Promise<IResponse> => {
  return request.post({
    url: '/sys/org/getOrgNames'
  })
}

//查探伤线路区段
export const getTsLineArea = (): Promise<IResponse> => {
  return request.post({
    url: '/sys/org/getOrgTcGqNames'
  })
}
// 查探伤/线路工区根据线路区段 id
export const getTsLineFactory = (id): Promise<IResponse> => {
  return request.post({
    url: `/sys/org/getOrgNamesById/${id}`
  })
}

//组织机构列表带条件查询
export const getConditionSysOrg = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/org/getConditionSysOrg',
    data
  })
}

//根据parentId查询子节点
export const findChildByID = (data): Promise<IResponse> => {
  const { parentId } = data
  return request.get({
    url: `/sys/org/findChildByID/${parentId}`
  })
}

// 根据id查询组织机构属性
export const getAttributeByLevel = (data): Promise<IResponse> => {
  const { id } = data
  return request.get({
    url: `/sys/org/getAttributeByLevel/${id}`
  })
}

//添加组织机构
export const addSysOrg = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/org/addSysOrg',
    data
  })
}

// 编辑组织机构
export const updateSysOrg = (data): Promise<IResponse> => {
  return request.post({
    url: '/sys/org/updateSysOrg',
    data
  })
}

//根据id删除织机构
export const delSysOrgById = (id): Promise<IResponse> => {
  return request.delete({
    url: `/sys/org/delSysOrgById/${id}`
  })
}
