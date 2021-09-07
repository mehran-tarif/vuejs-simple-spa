import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    onStart(state) {
      let token = localStorage.getItem("token")
      if (token) {
        // login
      } else {
        // logout
      }
    },
    login(state, token) {
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem("token", token)
      axios.defaults.headers.common['Authorization'] = "Token " + token
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = ''
      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem("token")
    },
  },
  actions: {
    onStart (context) {
      let token = localStorage.getItem("token")
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        axios
          .get('/api/auth/users/me/')
          .then(response => {
            context.commit('login', token)
          })
          .catch(error => {
            context.commit('logout')
          })
      } else {
        context.commit('logout')
      }
    }
  },
  modules: {
  }
})
