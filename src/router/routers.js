import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

export default [
  {
    path: '/',
    name: 'home',
    mata:{
      title: '首页'
    },
    component: Home,
    children:[{
      path:'provinceComplex',
      name:'provinceComplex',
      mata:{
        title:'全省服务区运营综合'
      },
      component: () => import('@/views/cockpit/provinceComplex.vue'),
    },{
      path:'districtChiefRoom',
      name:'districtChiefRoom',
      mata:{
        title:'服务区区长驾驶室'
      },
      component: () => import('@/views/cockpit/districtChiefRoom.vue'),
    }]
  },{
    path: '/about',
    name: 'about',
    mata:{
      title: '关于'
    },
    component: About
  },{
    path: '/error_404',
    name: 'error_404',
    mata:{
      title: '访问错误'
    },
    component: () => import('@/views/Error404.vue'),
  },{ 
    path:'*',
    redirect:'/error_404'
  }
]
