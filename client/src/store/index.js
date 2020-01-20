import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        isLoggedIn: localStorage.getItem('logged') || null,
        isLoggedInAsAdmin: localStorage.getItem('admin') || null,
        username: localStorage.getItem('username') || null
    },
    getters: {
        token: state => {
            return state.token;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;

            localStorage.setItem('admin', user.isAdmin);
            localStorage.setItem('username', user.name);
            localStorage.setItem('logged', true);
        },
        setToken(state, token) {
            if (localStorage.token !== null) {
                state.token = localStorage.token;
            }
            localStorage.setItem('token', token);
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] =
                    'Bearer ' + state.token;

                console.log(localStorage);
            }

            if (token) {
                if (state.user.isAdmin === true) {
                    state.isLoggedInAsAdmin = true;
                } else {
                    state.isLoggedIn = true;
                }
            } else {
                state.isLoggedIn = false;
                state.isLoggedInAsAdmin = false;
            }
        },
        unsetStorage(state, unset) {
            state.user = unset;

            localStorage.setItem('admin', unset);
            localStorage.setItem('username', unset);
            localStorage.setItem('logged', unset);
            localStorage.setItem('token', unset);

            localStorage.removeItem('admin');
            localStorage.removeItem('username');
            localStorage.removeItem('logged');
            localStorage.removeItem('token');
            console.log(localStorage);
            console.log(unset);
            console.log('THIU'); // id przekazac localstorage!
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
