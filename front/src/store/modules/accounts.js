// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import owl from '@/api/owl'

export const accounts = ({
  state: {
    token: localStorage.getItem('token') || '',
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.token = newToken
    },
    REMOVE_TOKEN(state) {
      state.token = ''
    }
  },
  actions: {
    login({commit}, userData) {
      axios({
        url: owl.users.login(),
        method: 'post',
        data: userData
      })
      .then(response => {
        commit('SET_TOKEN',response.data.key)
        localStorage.setItem('token', response.data.key)
        router.push({ name: 'home' })
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  modules: {
  }
})
