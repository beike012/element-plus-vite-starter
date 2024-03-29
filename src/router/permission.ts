/**
 * 路由守卫，权限控制
 */
import { RouteLocationNormalized } from 'vue-router'
import router from './index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { store as localStore } from "~/utils";
// 不重定向白名单
const whiteList = ['/login', '/404', '/401']

async function routerEachMethed(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) {
  if (whiteList.indexOf(to.path) > -1) {
    return next()
  }
  NProgress.start()
  const TOKEN = localStore.get(import.meta.env.VITE_TOKEN_NAME)
  if (TOKEN) {
    next()
    // console.log('=================================== 路由权限', store.getters.permission_routers)
    // if (store.getters.permission_routers.length === 0) {
    //   try {
    //     // 拉取用户信息
    //     const { moduleVOs } = await store.dispatch('GetInfo')
    //     // 开发环境越过
    //     if (!moduleVOs || (Array.isArray(moduleVOs) && !moduleVOs.length) && !isDev) {
    //       Message({
    //         message: '该用户没有账户权限，请联系系统管理员添加权限',
    //         type: 'warning'
    //       })
    //     }
    //     // 根据菜单权限生成可访问的路由表
    //     const { accessedRouters } = await store.dispatch('GenerateRoutes', moduleVOs)
    //     // 动态添加可访问路由表
    //     router.addRoutes(location as any)
    //     next({ ...to, replace: true })
    //   } catch (error) {
    //     next('/login')
    //   }
    // } else {
    //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
    //   if (!store.getters.allRouters.some((item: Route) => item.path === to.path)) {
    //     return next({ name: '404', replace: true })
    //   }
    //   next()
    // }
  } else {
    next('/login')
  }
}
router.beforeEach(routerEachMethed)

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  NProgress.done()
  to.meta.title && (document.title = to.meta.title as string)
})
