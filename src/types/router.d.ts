import { defineComponent } from 'vue'
import { type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router'

/**
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    frameSrc: 'url'           设置该路由的iframe地址

    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    noTagsView: true          如果设置为true，则不会出现在tag中(默认 false)
    followAuth: '/dashboard'  跟随哪个路由进行权限过滤
    canTo: true               设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
  }
**/
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string
    icon?: string
    activeMenu?: string
    hidden?: boolean
    affix?: boolean
    breadcrumb?: boolean
    frameSrc?: string
    alwaysShow?: boolean
    noCache?: boolean
    noTagsView?: boolean
    followAuth?: string
    canTo?: boolean
  }
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    path: string
    meta?: RouteMeta
    component?: Component | string | Object
    redirect?: string
    children?: AppCustomRouteRecordRaw[]
  }
  /**
   * `src/router` 文件夹里的类型声明
   */
  // interface toRouteType extends RouteLocationNormalized {
  //   meta: {
  //     roles: Array<string>
  //     keepAlive?: boolean
  //   }
  // }

  // declare interface MenuListItem {
  //   title: string // 页面名称
  //   path: string // 页面路由
  //   name: string // 组件名称
  //   affix: boolean //固定菜单
  //   hidden: boolean //隐藏菜单
  //   component: string //组件地址
  //   sortIndex: number // 排序
  //   children: MenuListItem[] //子菜单
  //   redirect?: string // 重定向路由
  //   icon?: string //组件图标
  //   activeMenu?: string //激活父菜单路由
  //   breadcrumb?: boolean
  //   frameSrc?: string
  //   parentId?: number
  //   id?: number
  // }
}
