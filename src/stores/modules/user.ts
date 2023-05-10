import { defineStore } from 'pinia'
import { userLogin, getLoginAddress, idCardLogin } from '@/api/login'
import myCookies from '@/utils/customCookies'
import { usePermissionStore } from '@/stores/modules/permission'
import { UserLogin } from '@/api/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: myCookies.get('token'),
    userName: myCookies.get('userName') || '-',
    roles: [], //角色列表
    isThirdLogin: false, // 是否是第三方登录
    thirdLoginUrl: '' // 第三方登录地址
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserName(name: string) {
      this.userName = name
    },
    /** 存储角色 */
    setRoles(roles: Array<string>) {
      this.roles = roles
    },
    setThirdLogin(bool: boolean) {
      this.isThirdLogin = bool
    },
    setThirdLoginUrl(url: string) {
      this.thirdLoginUrl = url
    },
    // 获取统一登录地址
    getUnifyLoginAddress() {
      return new Promise((resolve, reject) => {
        getLoginAddress()
          .then(res => {
            this.setThirdLoginUrl(res.address)
            resolve(res.address)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 第三方用户回调登录
    thirdLogin(params) {
      return new Promise((resolve, reject) => {
        idCardLogin(params)
          .then(res => {
            if (typeof res == 'string') {
              resolve(res)
            } else {
              this.setToken(res.userInfo.token)
              this.setUserName(res.userInfo.caption)
              this.setRoles(res.userInfo.roleList)
              this.setThirdLogin(true)
              // 设置菜单
              const permissionStore = usePermissionStore()
              permissionStore.setResponseMenu(res.userInfo.menuList)

              myCookies.set('token', res.userInfo.token)
              myCookies.set('userName', res.userInfo.caption)
              resolve(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 用户登录
    login(params: UserLogin) {
      return new Promise((resolve, reject) => {
        userLogin(params)
          .then(res => {
            if (typeof res == 'string') {
              resolve(res)
            } else {
              this.setToken(res.userInfo.token)
              this.setUserName(res.userInfo.caption)
              this.setRoles(res.userInfo.roleList)
              this.setThirdLogin(false)

              // 设置菜单
              const permissionStore = usePermissionStore()
              permissionStore.setResponseMenu(res.userInfo.menuList)

              myCookies.set('token', res.userInfo.token)
              myCookies.set('userName', res.userInfo.caption)
              resolve(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 用户登出
    logout() {
      return new Promise<void>(resolve => {
        // quitLogin()
        //   .then(() => {
        this.resetCookies()
        const permissionStore = usePermissionStore()
        permissionStore.resetRoutes()
        resolve()
        // })
        // .catch((error) => {
        //   reject(error);
        // });
      })
    },
    // 移除Cookies 存的值
    resetCookies() {
      return new Promise<void>(resolve => {
        this.$reset()
        myCookies.remove('token')
        myCookies.remove('userName')
        // myCookies.remove("userCode");
        // myCookies.remove("isAdmin");
        resolve()
      })
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['roles', 'isThirdLogin']
  }
})
