import Vue from 'vue'
import Router from 'vue-router'
/*import mechanismManage from '@/pages/mechanism-manage'//机构
import worksManage from '@/pages/works-manage'//内容--作品
import chartShow from '@/pages/submenu/chart-show'//作品->图表展示
import sourceManage from '@/pages/source-manage'//内容--素材
import accountManage from '@/pages/account-manage'//账户--账户
import userManage from '@/pages/user-manage'//账户--用户
import deviceManage from '@/pages/device-manage'//设备
import question from '@/pages/question'//系统-常见问题
import editionManage from '@/pages/edition-manage'//系统-版本管理
import home from '@/pages/home/home'
import login from '@/pages/login/login'*/


Vue.use(Router);


const mechanismManage = resolve => require(['@/pages/mechanism-manage'], resolve);//机构
const worksManage = resolve => require(['@/pages/works-manage'], resolve);//内容--作品
const chartShow = resolve => require(['@/pages/submenu/chart-show'], resolve);//设备->图表展示
const workChartShow = resolve => require(['@/pages/submenu/workChart-show'], resolve);//作品->图表展示
const authorDetail = resolve => require(['@/pages/submenu/author-detail'], resolve);//作品->作者信息
const sourceManage = resolve => require(['@/pages/source-manage'], resolve);//内容--素材
const accountManage = resolve => require(['@/pages/account-manage'], resolve);//账户--账户
const userManage = resolve => require(['@/pages/user-manage'], resolve);//账户--用户
const deviceManage = resolve => require(['@/pages/device-manage'], resolve);//设备
const question = resolve => require(['@/pages/question'], resolve);//系统-常见问题
const editionManage = resolve => require(['@/pages/edition-manage'], resolve);//系统-版本管理
const home = resolve => require(['@/pages/home/home'], resolve);//
const login = resolve => require(['@/pages/login/login'], resolve);//
const test = resolve => require(['@/pages/test'], resolve);//测试

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/mechanismManage',
      children:[
        {
          path: '/mechanismManage',
          name: '1',
          component: mechanismManage,
        },
        {
          path: '/accountManage',
          name: '3-1',
          component: accountManage,
        },
        {
          path: '/worksManage',
          name: '2-1',
          component: worksManage,
        },
        {
          path: '/sourceManage',
          name: '2-2',
          component: sourceManage,
        },
        {
          path: '/userManage',
          name: '3-2',
          component: userManage,
        },
        {
          path: '/deviceManage',
          name: '4',
          component: deviceManage,
        },
        {
          path: '/question',
          name: '5-1',
          component: question,
        },
        {
          path: '/editionManage',
          name: '5-2',
          component: editionManage,
        },
        {
          path: '/chartShow',
          name: 'chartShow',
          component: chartShow,
        },
        {
          path: '/workChartShow',
          name: 'workChartShow',
          component: workChartShow,
        },
        {
          path: '/authorDetail',
          name: 'authorDetail',
          component: authorDetail,
        }
      ]
    },

  ]
})
