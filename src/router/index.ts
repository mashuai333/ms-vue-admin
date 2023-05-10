import { Router, createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/layout/index.vue')
// const Frame = () => import('@/layout/frameView.vue')

export const constantRoutes: Array<RouteRecordRaw> = [
  // {
  //   name: 'Login',
  //   path: '/login',
  //   component: () => import('@/views/login.vue'),
  //   meta: {
  //     hidden: true
  //   }
  // },
  // {
  //   name: 'thirdLogin',
  //   path: '/thirdLogin',
  //   component: () => import('@/views/thirdLogin.vue'),
  //   meta: {
  //     hidden: true
  //   }
  // },
  {
    name: 'Root',
    path: '/',
    redirect: '/home',
    meta: {
      hidden: true
    }
  },
  {
    name: 'home',
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'home',
        meta: {
          title: '数据大屏'
        },
        component: () => import('@/views/geoGdMap/index.vue')
      }
    ]
  },
  {
    name: 'noAuthirity',
    path: '/403',
    component: () => import('@/views/403.vue'),
    meta: {
      hidden: true
    }
  },
  {
    name: 'NotFind',
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: {
      hidden: true
    }
  }
]

// export const asyncRoutes: AppCustomRouteRecordRaw[] = [
//   {
//     name: 'Root',
//     path: '/',
//     redirect: '/dataScreen',
//     meta: {
//       hidden: true
//     }
//   },
//   {
//     name: 'dataScreen',
//     path: '/dataScreen',
//     redirect: '/dataScreen/index',
//     component: Layout,
//     meta: {
//       title: '首页'
//     },
//     children: [
//       {
//         path: 'index',
//         name: 'dataScreen',
//         meta: {
//           title: '数据大屏'
//         },
//         component: () => import('@/views/dataScreen/index.vue')
//       }
//     ]
//   },
//   {
//     name: 'deviceManage',
//     path: '/deviceManage',
//     meta: {
//       title: '设备管理'
//     },
//     component: Layout,
//     children: [
//       {
//         path: '/equipStatistics',
//         name: 'equipStatistics',
//         meta: {
//           title: '设备统计'
//         },
//         component: () => import('@/views/deviceManage/equipStatistics/index.vue')
//       },
//       {
//         path: '/lineManage',
//         name: 'lineManage',
//         meta: {
//           title: '线路管理'
//         },
//         component: () => import('@/views/deviceManage/lineManage/index.vue')
//       },
//       {
//         path: '/stationManage',
//         name: 'stationManage',
//         meta: {
//           title: '车站管理'
//         },
//         component: () => import('@/views/deviceManage/stationManage/index.vue')
//       },
//       {
//         path: '/bridgeManage',
//         name: 'bridgeManage',
//         meta: {
//           title: '桥梁管理'
//         },
//         component: () => import('@/views/deviceManage/bridgeManage/index.vue')
//       },
//       {
//         path: '/equTrack',
//         name: 'equTrack',
//         meta: {
//           title: '股道管理'
//         },
//         component: () => import('@/views/deviceManage/equTrack/index.vue')
//       },
//       {
//         path: '/equSwitch',
//         name: 'equSwitch',
//         meta: {
//           title: '道岔管理'
//         },
//         component: () => import('@/views/deviceManage/equSwitch/index.vue')
//       },
//       {
//         path: '/equWeld',
//         name: 'equWeld',
//         meta: {
//           title: '焊缝管理'
//         },
//         component: () => import('@/views/deviceManage/equWeld/index.vue')
//       },
//       {
//         path: '/equTunnel',
//         name: 'equTunnel',
//         meta: {
//           title: '隧道管理'
//         },
//         component: () => import('@/views/deviceManage/equTunnel/index.vue')
//       },
//       {
//         path: '/equCulvert',
//         name: 'equCulvert',
//         meta: {
//           title: '涵洞管理'
//         },
//         component: () => import('@/views/deviceManage/equCulvert/index.vue')
//       },
//       {
//         path: '/equCurve',
//         name: 'equCurve',
//         meta: {
//           title: '曲线管理'
//         },
//         component: () => import('@/views/deviceManage/equCurve/index.vue')
//       },
//       {
//         path: '/equAffiliated',
//         name: 'equAffiliated',
//         meta: {
//           title: '附属设施'
//         },
//         component: () => import('@/views/deviceManage/equAffiliated/index.vue')
//       },
//       {
//         path: '/equMachine',
//         name: 'equMachine',
//         meta: {
//           title: '机械设备'
//         },
//         component: () => import('@/views/deviceManage/equMachine/index.vue')
//       },
//       {
//         path: '/railManage',
//         name: 'railManage',
//         meta: {
//           title: '钢轨管理'
//         },
//         component: () => import('@/views/deviceManage/railManage/index.vue')
//       },
//     ]
//   },
//   {
//     name: 'dataManage',
//     path: '/dataManage',
//     component: Layout,
//     meta: {
//       title: '数据管理'
//     },
//     children: [
//       {
//         path: '/dataManage/index',
//         name: 'baidu',
//         component: Frame,
//         meta: {
//           title: '数据管理',
//           frameSrc: 'https://www.baidu.com/'
//         }
//       }
//     ]
//   },
//   {
//     path: '/jobManage',
//     name: 'jobManage',
//     meta: {
//       title: '作业管理'
//     },
//     component: Layout,
//     children: [
//      {
//         path: '/jobStatistics',
//         name: 'jobStatistics',
//         meta: {
//           title: '作业统计'
//         },
//         component: () => import('@/views/jobManage/jobStatistics/index.vue')
//       },
//       {
//         path: '/lineBoundary',
//         name: 'lineBoundary',
//         meta: {
//           title: '线路管界'
//         },
//         component: () => import('@/views/jobManage/lineBoundary/index.vue')
//       },
//       {
//         path: '/flawDetecionPipeBoundary',
//         name: 'flawDetecionPipeBoundary',
//         meta: {
//           title: '探伤管界'
//         },
//         component: () => import('@/views/jobManage/flawDetecionPipeBoundary/index.vue')
//       },
//       {
//         path: '/lineBoundary',
//         name: 'lineBoundary',
//         meta: {
//           title: '线路管界'
//         },
//         component: () => import('@/views/jobManage/lineBoundary/index.vue')
//       },
//       {
//         path: '/flawDetecionPipeBoundary',
//         name: 'flawDetecionPipeBoundary',
//         meta: {
//           title: '探伤管界'
//         },
//         component: () => import('@/views/jobManage/flawDetecionPipeBoundary/index.vue')
//       },
//       {
//         path: '/jobManage',
//         name: 'jobManage',
//         meta: {
//           title: '探伤作业管理'
//         },
//         component: () => import('@/views/jobManage/jobManage/index.vue')
//       },
//       {
//         path: '/reportManage',
//         name: 'reportManage',
//         meta: {
//           title: '探伤报告管理'
//         },
//         component: () => import('@/views/jobManage/reportManage/index.vue')
//       },
//       {
//         path: '/reportManage/add/:reportId',
//         name: 'addReport',
//         meta: {
//           title: '探伤报告添加编辑',
//           hidden: true,
//           activeMenu: '/reportManage'
//         },
//         component: () => import('@/views/jobManage/reportManage/addReportPage.vue')
//       },
//       {
//         path: '/enterInjuryInfo',
//         name: 'enterInjuryInfo',
//         meta: {
//           title: '伤损信息管理',
//           hidden: true,
//           activeMenu: '/reportManage'
//         },
//         component: () => import('@/views/jobManage/enterInjuryInfo/index.vue')
//       },
//       {
//         path: '/reportPlayBackManage',
//         name: 'reportPlayBackManage',
//         meta: {
//           title: '探伤报告回放管理'
//         },
//         component: () => import('@/views/jobManage/reportPlayBackManage/index.vue')
//       },
//       {
//         path: '/reportPlayBackManage/detail/:reportId/:status',
//         name: 'reportPlayBackManageDetail',
//         meta: {
//           title: '报告回放详情',
//           hidden: true,
//           activeMenu: '/reportPlayBackManage'
//         },
//         component: () => import('@/views/jobManage/reportPlayBackManage/backReportDetail.vue')
//       },
//       {
//         path: '/defectInstrument',
//         name: 'defectInstrument',
//         meta: {
//           title: '探伤仪器'
//         },
//         component: () => import('@/views/jobManage/defectInstrument/index.vue')
//       },
//       {
//         path: '/defectPerson',
//         name: 'defectPerson',
//         meta: {
//           title: '探伤人员'
//         },
//         component: () => import('@/views/jobManage/defectPerson/index.vue')
//       },
//       {
//         path: '/injuryInfoManage',
//         name: 'injuryInfoManage',
//         meta: {
//           title: '伤损信息管理'
//         },
//         component: () => import('@/views/jobManage/injuryInfoManage/index.vue')
//       },
//       {
//         path: '/overdueEquip',
//         name: 'overdueEquip',
//         meta: {
//           title: '超期设备查询'
//         },
//         component: () => import('@/views/jobManage/overdueEquip/index.vue')
//       }
//     ]
//   },
//   {
//     name: 'lineEvaluation',
//     path: '/lineEvaluation',
//     redirect: '/lineEvaluation/index',
//     component: Layout,
//     meta: {},
//     children: [
//       {
//         path: 'https://fanyi.baidu.com/#zh/en/',
//         name: 'baidufy',
//         component: null,
//         meta: {
//           title: '线路评价'
//         }
//       }
//     ]
//   },
//   {
//     name: 'sysManage',
//     path: '/sysManage',
//     component: Layout,
//     meta: {
//       title: '平台管理'
//     },
//     children: [
//       {
//         path: '/sysManage/org',
//         name: 'org',
//         meta: {
//           title: '机构管理'
//         },
//         component: () => import('@/views/sysManage/org/index.vue')
//       },
//       {
//         name: 'role',
//         path: '/sysManage/role',
//         component: () => import('@/views/sysManage/role/index.vue'),
//         meta: {
//           title: '角色管理'
//         }
//       },
//       {
//         name: 'user',
//         path: '/sysManage/user',
//         component: () => import('@/views/sysManage/user/index.vue'),
//         meta: {
//           title: '用户管理'
//         }
//       },
//       {
//         name: 'menuManage',
//         path: '/sysManage/menuManage',
//         component: () => import('@/views/sysManage/menuManage/index.vue'),
//         meta: {
//           title: '菜单管理'
//         }
//       }
//     ]
//   },
//   {
//     name: 'Redirect',
//     path: '/:pathMatch(.*)*',
//     redirect: '/404',
//     meta: {
//       hidden: true
//     }
//   }
// ]

const router: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRoutes as RouteRecordRaw[],
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
