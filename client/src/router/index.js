import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../components/pages/Dashboard.vue';
import Contracts from '../components/pages/Contracts.vue';
import Login from '../components/pages/Login.vue';
import Holidays from '../components/pages/Holidays.vue';
import HolidaysRequests from '../components/pages/HolidaysRequests.vue';
import HolidaysConfirmed from '../components/pages/HolidaysConfirmed.vue';
import Logout from '../components/pages/Logout.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/contracts',
        component: Contracts,
        name: 'contracts',
        beforeEnter: (to, from, next) => {
            if (
                typeof localStorage.isLoggedInAsAdmin === 'undefined' ||
                localStorage.isLoggedInAsAdmin === null
            ) {
                return next('/login');
            } else return next();
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        beforeEnter: (to, from, next) => {
            if (
                typeof localStorage.token === 'undefined' ||
                localStorage.token === null
            ) {
                return next();
            } else return next('/');
        }
    },
    {
        path: '/holidays',
        component: Holidays,
        name: 'holidays',
        beforeEnter: (to, from, next) => {
            if (
                typeof localStorage.isLoggedInAsAdmin === 'undefined' ||
                localStorage.isLoggedInAsAdmin === null
            ) {
                return next('/login');
            } else return next();
        }
    },
    {
        path: '/holidaysRequests',
        component: HolidaysRequests,
        name: 'holidaysrequests',
        beforeEnter: (to, from, next) => {
            if (
                typeof localStorage.isLoggedInAsUser === 'undefined' ||
                localStorage.isLoggedInAsUser === null
            ) {
                return next('/login');
            } else return next();
        }
    },
    {
        path: '/holidaysConfirmed',
        component: HolidaysConfirmed,
        name: 'holidaysconfirmed',
        beforeEnter: (to, from, next) => {
            if (
                typeof localStorage.isLoggedInAsUser === 'undefined' ||
                localStorage.isLoggedInAsUser === null
            ) {
                return next('/Login');
            } else return next();
        }
    },
    {
        path: '/logout',
        component: Logout,
        name: 'logout'
    },
    {
        path: '*',
        redirect: '/login'
    }
];

const router = new VueRouter({
    routes
});

export default router;
