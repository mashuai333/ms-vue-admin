import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'
/**
 * 通过递归过滤异步路由表
 * @param routes  interface menu
 */

const Layout = () => import('@/layout/index.vue')
const Frame = () => import('@/layout/frameView.vue')
const modules = import.meta.glob('../../views/**/*.vue') // 导入

function getComponentModule(path: string) {
  if (path.includes('layout/index')) {
    return Layout
  } else if (path.includes('layout/frameView')) {
    return Frame
  } else if (path) {
    return modules[`../../views/${path}.vue`]
  } else {
    return null
  }
}

function filterAsyncRoutes(routes: MenuListItem[]) {
  const newRouter = [] as AppCustomRouteRecordRaw[]
  routes.forEach((route: MenuListItem) => {
    const tmp = { ...route }
    const newRoute = {
      path: tmp.path,
      name: tmp.name,
      component: getComponentModule(tmp.component),
      meta: {
        title: tmp.title,
        icon: tmp.icon,
        activeMenu: tmp.activeMenu,
        hidden: tmp.hidden,
        affix: tmp.affix,
        breadcrumb: tmp.breadcrumb,
        frameSrc: tmp.frameSrc
      },
      children: []
    }
    if (tmp.children && tmp.children.length) {
      newRoute.children = filterAsyncRoutes(tmp.children)
    }
    newRouter.push({ ...tmp, ...newRoute })
  })
  return newRouter
}

export interface PermissionState {
  routers: AppCustomRouteRecordRaw[]
  addRouters: AppCustomRouteRecordRaw[]
  menuTabRouters: MenuListItem[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [], //菜单渲染的路由
    addRouters: [], // 动态添加的路由
    menuTabRouters: [] //登录存储的菜单
  }),
  getters: {
    getRouters(state): AppCustomRouteRecordRaw[] {
      return state.routers
    },
    getAddRouters(state): AppCustomRouteRecordRaw[] {
      return state.addRouters
    },
    getMenuTabRouters(state): MenuListItem[] {
      return state.menuTabRouters
    }
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRouters = routes
      this.routers = constantRoutes.concat(routes)
    },
    setResponseMenu(routes: RouteRecordRaw[]) {
      this.menuTabRouters = routes
    },
    generateRoutes() {
      return new Promise((resolve, reject) => {
        if (this.menuTabRouters && this.menuTabRouters.length) {
          let accessedRoutes = []
          accessedRoutes = filterAsyncRoutes(this.menuTabRouters)
          accessedRoutes.push({
            path: '/:pathMatch(.*)*',
            name: 'redirectTo404',
            redirect: '/404',
            meta: {
              hidden: true
            }
          })
          this.setRoutes(accessedRoutes)
          resolve(accessedRoutes)
        } else {
          reject()
        }
      })
    },
    resetRoutes() {
      // 路由数据重置
      this.setRoutes([])
      resetRouter()
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['menuTabRouters']
  }
})
