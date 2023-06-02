import { Router, createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { Layout } from '@/utils/routerHelper'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/dashboard/map',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/403',
    component: () => import('@/views/Error/403.vue'),
    name: 'noAuthirity',
    meta: {
      hidden: true,
      title: '403',
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/map',
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'map',
        component: () => import('@/views/geoGdMap/index.vue'),
        name: 'map',
        meta: {
          title: '高德地图',
          noCache: true,
          affix: false
        }
      }
    ]
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/map',
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      // {
      //   path: 'analysis',
      //   component: () => import('@/views/Dashboard/Analysis.vue'),
      //   name: 'Analysis',
      //   meta: {
      //     title: '分析页',
      //     noCache: true,
      //     affix: true
      //   }
      // },
      {
        path: 'map',
        component: () => import('@/views/geoGdMap/index.vue'),
        name: 'map',
        meta: {
          title: '高德地图',
          noCache: true,
          affix: false
        }
      }
    ]
  }
]

export const router: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

// reset router
export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'thirdLogin', 'NotFind', 'Root']
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
