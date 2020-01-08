import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/Home.vue'
import NewEmployee from '../components/pages/NewEmployee.vue'
import NewContract from '../components/pages/NewContract.vue'
import Login from '../components/pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/NewEmployee',
    component: NewEmployee
  },
  {
    path: '/NewContract',
    component: NewContract
  },
  {
    path: '/NewContract',
    component: NewContract
  },
  {
    path: '/Login',
    component: Login
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
