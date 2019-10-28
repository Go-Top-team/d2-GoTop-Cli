import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index', // 改为其他页面的name
        name: 'index',
        meta: {
          auth: true,
          title: '首页'
        },
        component: () => import('@/pages/dash/page')
      },
      // 缓存测试
      // {
      //   path: "db",
      //   name: "db",
      //   meta: {
      //     auth: true,
      //     title: "缓存"
      //   },
      //   component: () => import("@/pages/dbTest/page")
      // },
      // {
      //   path: "db2",
      //   name: "db2",
      //   meta: {
      //     auth: true,
      //     title: "缓存2"
      //   },
      //   component: () => import("@/pages/db2/page")
      // },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
