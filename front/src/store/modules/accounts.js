// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import owl from '@/api/owl'

export const accounts = ({
  state: {
    token: sessionStorage.getItem('token') || '',
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
      sessionStorage.setItem('token', '')
    },

    login({commit}, userData) {
      console.log('userData :', userData)
      axios({
        url: owl.users.login(),
        method: 'post',
        data: JSON.stringify(userData)
      })
      .then(response => {
        console.log(response)
        commit('SET_TOKEN',response.data["access-token"])
        sessionStorage.setItem('token', response.data["access-token"])
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
