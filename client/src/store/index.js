import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        isLoggedInAsUser:
            localStorage.getItem('isLoggedInAsUser') === 'true' || false,
        isLoggedInAsAdmin:
            localStorage.getItem('isLoggedInAsAdmin') === 'true' || false,
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
            localStorage.setItem('username', user.name);
            localStorage.setItem('id', user.id);

            this.state.id = user.id;
            this.state.username = user.name;
        },

        setToken(state, token) {
            localStorage.setItem('token', token);
            this.state.token = token;
            Axios.defaults.headers.common['Authorization'] =
                'Bearer ' + this.state.token;
        },
        setRole(state, role) {
            if (role === 1) {
                localStorage.setItem('isLoggedInAsAdmin', true);

                this.state.isLoggedInAsAdmin = true;
            } else if (role === 2) {
                localStorage.setItem('isLoggedInAsUser', true);

                this.state.isLoggedInAsUser = true;
            } else {
                console.error('error with role');
            }
        },

        unsetStorage() {
            localStorage.removeItem('isLoggedInAsAdmin');
            localStorage.removeItem('isLoggedInAsUser');
            localStorage.removeItem('username');
            localStorage.removeItem('id');
            localStorage.removeItem('token');

            this.state.isLoggedInAsUser = false;
            this.state.isLoggedInAsAdmin = false;
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
        unsetStorage({ commit }) {
            commit('unsetStorage');
        },
        setRole({ commit }, role) {
            commit('setRole', role);
        }
    },

    modules: {}
});
