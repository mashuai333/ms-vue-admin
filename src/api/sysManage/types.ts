export type MenuItem = {
  title: string // 页面名称
  path: string // 页面路由
  name: string // 组件名称
  redirect: string // 重定向路由
  icon: string //组件图标
  activeMenu: string //激活父菜单路由
  affix: boolean //固定菜单
  hidden: boolean //隐藏菜单
  component: string //组件地址
  parentId: number
  sortIndex: number // 排序
  id?: number
}
