import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/Home.vue'
import Contracts from '../components/pages/Contracts.vue'
import Login from '../components/pages/Login.vue'
import Holidays from '../components/pages/Holidays.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
