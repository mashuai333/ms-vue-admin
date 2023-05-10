export type UserLogin = {
  name: string
  passWord: string
}

export type UserType = {
  userInfo: {
    name: string
    token: string
    menuList?: string | string[]
    roleList?: string | string[]
    userCode?: string
    role?: string
    roleId?: string
    permissions?: string | string[]
    isAdmin?: boolean
  }
}

export type UserModify = {
  oldPassword: string
  newPassword: string
}
