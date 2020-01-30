import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../components/pages/Dashboard.vue';
import Contracts from '../components/pages/Contracts.vue';
import Login from '../components/pages/Login.vue';
import Holidays from '../components/pages/Holidays.vue';
import HolidaysRequests from '../components/pages/HolidaysRequests.vue';
import HolidaysConfirmed from '../components/pages/HolidaysConfirmed.vue';
import Logout from '../components/pages/Logout.vue';
import ChangePassword from '../components/pages/ChangePassword.vue';

Vue.use(VueRouter);

function verifyAdmin(to, from, next) {
    if (
        typeof localStorage.isLoggedInAsAdmin === 'undefined' ||
        localStorage.isLoggedInAsAdmin === null
    ) {
        return next('/login');
    } else return next();
}

function verifyUser(to, from, next) {
    if (
        typeof localStorage.isLoggedInAsUser === 'undefined' ||
        localStorage.isLoggedInAsUser === null
    ) {
        return next('/login');
    } else return next();
}

function verifyToken(to, from, next) {
    if (
        typeof localStorage.token === 'undefined' ||
        localStorage.token === null
    ) {
        return next('/login');
    } else return next();
}

function verifyUnlogged(to, from, next) {
    if (
        typeof localStorage.token === 'undefined' ||
        localStorage.token === null
    ) {
        return next();
    } else return next('/');
}

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
        beforeEnter: (to, from, next) => verifyAdmin(to, from, next)
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        beforeEnter: (to, from, next) => verifyUnlogged(to, from, next)
    },
    {
        path: '/holidays',
        component: Holidays,
        name: 'holidays',
        beforeEnter: (to, from, next) => verifyAdmin(to, from, next)
    },
    {
        path: '/holidaysRequests',
        component: HolidaysRequests,
        name: 'holidaysrequests',
        beforeEnter: (to, from, next) => verifyUser(to, from, next)
    },
    {
        path: '/holidaysConfirmed',
        component: HolidaysConfirmed,
        name: 'holidaysconfirmed',
        beforeEnter: (to, from, next) => verifyUser(to, from, next)
    },
    {
        path: '/changePassword',
        component: ChangePassword,
        name: 'changePassword',
        beforeEnter: (to, from, next) => verifyToken(to, from, next)
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
