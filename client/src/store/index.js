import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        isLoggedIn: localStorage.getItem('logged') === 'true' || false,
        isLoggedInAsAdmin: localStorage.getItem('admin') === 'true' || false,
        username: localStorage.getItem('username') || null,
        id: localStorage.getItem('id') || null
    },

    getters: {
        token: state => {
            return state.token;
        }
    },

    mutations: {
        setUser(state, user) {
            localStorage.setItem('admin', !!user.isAdmin);
            localStorage.setItem('username', user.name);
            localStorage.setItem('logged', !user.isAdmin);
            localStorage.setItem('id', user.id);

            this.state.id = user.id;
            this.state.username = user.name;
            this.state.isLoggedIn = !user.isAdmin;
            this.state.isLoggedInAsAdmin = !!user.isAdmin;
        },

        setToken(state, token) {
            localStorage.setItem('token', token);
            state.token = token;
            Axios.defaults.headers.common['Authorization'] =
                'Bearer ' + state.token;
        },

        unsetStorage(state) {
            localStorage.removeItem('admin');
            localStorage.removeItem('username');
            localStorage.removeItem('logged');
            localStorage.removeItem('token');
            localStorage.removeItem('id');

            this.state.isLoggedIn = null;
            this.state.isLoggedInAsAdmin = null;
            this.state.username = null;
            this.state.id = null;
            this.state.token = null;
        }
    },

    actions: {
        setUser({ commit }, user) {
            commit('setUser', user);
        },
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        unsetStorage({ commit }, unset) {
            commit('unsetStorage', unset);
        }
    },

    modules: {}
});
