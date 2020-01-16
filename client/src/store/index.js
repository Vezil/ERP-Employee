import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isLoggedIn: false,
    isLoggedInAsAdmin: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token

      if (token) {
        if (state.user.email === 'admin@wp.pl') {
          state.isLoggedInAsAdmin = true
        }
        else {
          state.isLoggedIn = true
        }
      }
      else {
        state.isLoggedIn = false
        state.isLoggedInAsAdmin = false
      }
    },

  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },

  },
  modules: {
  }
})
