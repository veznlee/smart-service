import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import storage from "@/libs/local"
import {appConfig} from "@/config/index"
import {findRouterByName} from "@/libs/appUtil"

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history',
  base: process.env.BASE_URL
})
const {HOME_PAGE_NAME,LOGIN_PAGE_NAME,NOFOUND_PAGE_NAME} = {...appConfig};

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   // 不需要token和权限即可访问的界面
//   if(appConfig.NO_NEED_TOKEN_PAGES.indexOf(to.name) > -1){
//     next()
//   }else{
//     const token = storage.getLocal(appConfig.appTokenName)
//     if (!token && to.name !== LOGIN_PAGE_NAME) {
//       // 未登录且要跳转的页面不是登录页
//       next({
//         name: LOGIN_PAGE_NAME // 跳转到登录页
//       })
//     } else if(token){
//       // 不在权限配置里的页面，直接进入
//       if(appConfig.NO_NEED_PERMISSION_PAGES.indexOf(to.name) > -1){
//         next()
//       }else{
//         const menus = storage.getLocalObj('_app_permission')
//         if(menus && menus.length){
//           let route = findRouterByName(menus, to.name);
//           if(route){
//             next()
//           }else{
//             next({ replace: true, name: NOFOUND_PAGE_NAME })
//           }
//         }else{
//           next({
//             name: LOGIN_PAGE_NAME // 跳转到登录页
//           })
//         }
//       }
//     }
//   }
// })

router.afterEach(to => {
  let meta = { ...to.meta }
  if (meta.title) {
    document.title = appConfig.appTitle + '-' + to.meta.title;
  }
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
