import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'
import Login from '@/pages/login/login.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // redirect: '/login'
      redirect: '/dashboard'

    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/',
      name: '自述文件',
      component: resolve => require(['../pages/home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/dashboard',
          name: "系统首页",
          component: resolve => require(['../pages/dashboard/dashboard.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/table',
          name: '基础表格',
          component: resolve => require(['../pages/baseTable/baseTable.vue'], resolve),
          meta: {
            title: '基础表格'
          }
        },
        {
          path: '/chartTable',
          name: '基础表格2',
          component: resolve => require(['../pages/baseTable/TableChart.vue'], resolve),
          meta: {
            title: '基础表格2'
          }
        },
        {
          path: '/tabs',
          name: 'tab选项卡',
          component: resolve => require(['../pages/tab/tabs.vue'], resolve),
          meta: {
            title: 'tab选项卡'
          }
        },

        {
          path: '/form',
          name: '基本表单',
          component: resolve => require(['../pages/baseForm/baseForm.vue'], resolve),
          meta: {
            title: '基本表单'
          }
        },
        {
          // 富文本编辑器组件
          path: '/fuEditor',
          name: '富文本编辑器',
          component: resolve => require(['../pages//baseForm/vueEditor.vue'], resolve),
          meta: {
            title: '富文本编辑器'
          }
        },
        {
          // markdown组件
          path: '/markdown',
          name: 'markdown编辑器',
          component: resolve => require(['../pages//baseForm/markdown.vue'], resolve),
          meta: {
            title: 'markdown编辑器'
          }
        },
        {
          // 图片上传组件
          path: '/upload',
          name: '文件上传',
          component: resolve => require(['../pages/baseForm/upload.vue'], resolve),
          meta: {
            title: '文件上传'
          }
        },
        {
          // vue-schart组件
          path: '/charts',
          name: 'schart图表',
          component: resolve => require(['../pages/baseCharts/baseCharts.vue'], resolve),
          meta: {
            title: 'schart图表'
          }
        },
        {
          // vue-schart组件
          path: '/myCharts',
          name: 'schart图表',
          component: resolve => require(['../pages/baseCharts/myCharts.vue'], resolve),
          meta: {
            title: 'schart图表'
          }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          name: '拖拽列表',
          component: resolve => require(['../pages/drag/dragList.vue'], resolve),
          meta: {
            title: '拖拽列表'
          }
        },
        {
          // 拖拽列表组件
          path: '/dragTable',
          name: '拖拽列表',
          component: resolve => require(['../pages/drag/dragTable.vue'], resolve),
          meta: {
            title: '拖拽列表02'
          }
        },
        {
          // 权限页面
          path: '/permission',
          name: '权限测试',
          component: resolve => require(['../pages/permise/permission.vue'], resolve),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        // 报表页面
        {
          path: '/reportAdd',
          name: '报表新建',
          component: resolve => require(['../pages/report/reportAdd.vue'], resolve),
          meta: {
            title: '报表新建',
          }
        },
        {
          path: '/reportView',
          name: '报表查看',
          component: resolve => require(['../pages/report/reportView.vue'], resolve),
          meta: {
            title: '报表查看',
          }
        },
        {
          path: '/themeReport',
          name: '主题报表',
          component: resolve => require(['../pages/report/themeReport.vue'], resolve),
          meta: {
            title: '主题报表',
          }
        },
        {
          path: '/mapbox',
          name: '地图可视化',
          component: resolve => require(['../pages/map/mapbox.vue'], resolve),
          meta: {
            title: '地图可视化',
          }
        },
        {
          path: '/tree',
          name: '树形结构',
          component: resolve => require(['../pages/tree/treeOne/tree.vue'], resolve),
          meta: {
            title: '树形1',
          }
        },
        {
          path: '/treetwo',
          name: '树形结构',
          component: resolve => require(['../pages/tree/treeTwo/treeTwo.vue'], resolve),
          meta: {
            title: '树形2',
          }
        },
        {
          path: '/treethree',
          name: '树形结构',
          component: resolve => require(['../pages/tree/openClose/demo.vue'], resolve),
          meta: {
            title: '树形3',
          }
        },
        {
          path: '/treechild',
          name: '树形结构',
          component: resolve => require(['../pages/tree/treeChild/treeChild.vue'], resolve),
          meta: {
            title: '树形4',
          }
        },
        {
          path: '/transferTree',
          name: '穿梭框案例',
          component: resolve => require(['../pages/transfer/transferTree.vue'], resolve),
          meta: {
            title: '树形穿梭框',
          }
        }

      ]
    },
    {
      path: '/login',
      component: resolve => require(['../pages/login/login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../pages/error/404.vue'], resolve)
    }, {
      path: '/403',
      component: resolve => require(['../pages/error/403.vue'], resolve)
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})
