// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import owl from '@/api/owl'

export const accounts = ({
  state: {
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
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
    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },

    login({commit}, userData) {
      axios({
        url: owl.users.login(),
        method: 'post',
        data: userData
      })
      .then(response => {
        commit('SET_TOKEN',response.data.key)
        localStorage.setItem('token', response.data.key)
        router.push({ name: 'HomeView' })
      })
      .catch(error => {
        console.error(error)
      })
    },
    logout({ getters, dispatch }) {
      axios({
        url: owl.users.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          alert('성공적으로 logout되었습니다.')
          router.push({ name: 'HomeView' })
        })
        .error(err => {
          console.error(err.response)
        })
    },
  },
  modules: {
  }
})
