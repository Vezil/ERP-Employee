import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import dotenv from 'dotenv';
import Axios from 'axios';
import formatDate from './filters/formatDate';

dotenv.config();

if (localStorage.getItem('token')) {
    Axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token');
}

Axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

Vue.use(require('vue-moment'));

Vue.filter('formatDate', formatDate);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: function(h) {
        return h(App);
    }
}).$mount('#app');
