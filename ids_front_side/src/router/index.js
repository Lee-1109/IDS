import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
//这里的路径是前端项目路径 与后端api无关
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/ids_login/index'),
    hidden: true
  },

  {//404页面
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {//侧边栏主页模块
    path: '/',
    component: Layout,
    redirect: '/mainPage',
    children: [{ 
      path: 'mainPage',
      name: 'mainPage',
      component: () => import('@/views/ids_main_page/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {//侧边栏攻击情况查看
    path: '/attack',
    component: Layout,
    redirect: '/attack/table',
    name: 'Example',
    meta: { title: '攻击情况查看', icon: 'attack' },
    children: [
      {
        path: '/attack/charts',
        // name: 'Table',
        name: 'attackCharts',
        component: () => import('@/views/ids_attack/attack_charts/index'),
        meta: { title: '图表查看', icon: 'attack' }
      },
      {
        path: '/attack/tree',
        // name: 'Tree',
        name: 'attackTree',
        component: () => import('@/views/ids_attack/attack_trees/index'),
        meta: { title: '树查看', icon: 'tree' }
      }
    ]
  },//

  {//侧边栏管理员管理    信息管理
    path: '/ids_admin',
    component: Layout,
    redirect: '/ids_admin/information',
    // name: 'Nested',
    name: 'MainPage',
    meta: {
      title: '管理员管理',
      icon: 'nested'
    },
    children: [
      {//权限管理
        path: '/ids_admin/authority',
        component: () => import('@/views/ids_admin/authority/index'), // Parent router-view  父容器
        redirect: '/ids_admin/authority/manage',
        // name: 'Menu1',
        name: 'Menu1',
        meta: { title: '管理员权限相关', icon:'authority' },
        children: [
          {
            path: '/authority/auth_manage',//这个路径是显示在浏览器路径栏的
            component: () => import('@/views/ids_admin/authority/authority_manage/index'),
            meta: { title: '授权管理',icon:'auth_change' }
          },
          {
            path: '/ids_admin/auth_alter_history',
            component: () => import('@/views/ids_admin/authority/authority_alter_history/index'),
            meta: { title: '权限变更日志' ,icon:'auth_log' }
          },
        
        ]
      },
      {//信息管理
        path: 'information',
        component: () => import('@/views/ids_admin/information/index'),
        // name: 'Menu2',
        name: 'information',
        meta: { title: '管理员信息管理', icon:'admin_manage' }
      },
      {//管理员登录历史
        path: 'history',
        component: () => import('@/views/ids_admin/history/index'),
        name: 'history',
        meta: { title: '管理员登录日志', icon:'admin_log'}
      }
    ]
  },


  {//网络接口部分信息
    path: '/newWorkInterFace',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'netWorkInterface',
        component: () => import('@/views/ids_network/index'),
        meta: { title: '网络监测', icon: 'network' }
      }
    ]
  },
  {//侧边栏个人信息修改
    path: '/form',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '个人信息修改', icon: 'form' }
      }
    ]
  },
  {//侧边栏外部链接
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.nchu.edu.cn/',
        meta: { title: '南昌航空大学官网', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
