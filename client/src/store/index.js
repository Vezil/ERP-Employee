import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const ROLE_ADMIN = 'admin';

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
        setRole(state, roles) {
            if (!roles.length) {
                console.error('Error with rolse');

                return;
            }

            const isAdmin = roles.some(r => r.name === ROLE_ADMIN);

            if (isAdmin) {
                localStorage.setItem('isLoggedInAsAdmin', true);

                this.state.isLoggedInAsAdmin = true;
            } else {
                localStorage.setItem('isLoggedInAsUser', true);

                this.state.isLoggedInAsUser = true;
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
