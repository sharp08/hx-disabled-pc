import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import BaseInfo from './views/Home/BaseInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      meta: {
        needLogin: true
      },
      children: [
        {
          path: '',
          name: "BaseInfo",
          component: BaseInfo,
        },
        {
          path: 'document',
          name: "BuildDocument",
          component: () => import(/* webpackChunkName: "BuildDocument" */ './views/Home/BuildDocument.vue'),
        },
        {
          path: 'benefit',
          name: "FarmerBenefit",
          component: () => import(/* webpackChunkName: "FarmerBenefit" */ './views/Home/FarmerBenefit.vue'),
        },
        {
          path: 'student',
          name: "DisabledStudent",
          component: () => import(/* webpackChunkName: "DisabledStudent" */ './views/Home/DisabledStudent.vue'),
        },
        {
          path: 'training',
          name: "EmploymentTraining",
          component: () => import(/* webpackChunkName: "EmploymentTraining" */ './views/Home/EmploymentTraining.vue'),
        },
        {
          path: 'rehabilitation',
          name: "Rehabilitation",
          component: () => import(/* webpackChunkName: "Rehabilitation" */ './views/Home/Rehabilitation.vue'),
        }
      ]
    }
  ]
})
