import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/pages/Dashboard.vue'
import Contracts from '../components/pages/Contracts.vue'
import Login from '../components/pages/Login.vue'
import Holidays from '../components/pages/Holidays.vue'
import HolidaysRequests from '../components/pages/HolidaysRequests.vue'
import HolidaysConfirmed from '../components/pages/HolidaysConfirmed.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/Contracts',
    component: Contracts,
    name: 'contracts'
  },
  {
    path: '/Login',
    component: Login,
    name: 'login'
  },
  {
    path: '/Holidays',
    component: Holidays,
    name: 'holidays'
  },
  {
    path: '/HolidaysRequests',
    component: HolidaysRequests,
    name: 'holidaysrequests'
  },
  {
    path: '/HolidaysConfirmed',
    component: HolidaysConfirmed,
    name: 'holidaysconfirmed'
  },

  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
