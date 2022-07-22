// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import sowl from '@/api/sowl'

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
      axios({
        url: `${sowl.users.login()}?id=${userData.id}&password=${userData.password}`,
        method: 'post',
        // data: JSON.stringify(userData)
      })
      .then(response => {
        commit('SET_TOKEN',response.data["access-token"])
        sessionStorage.setItem('token', response.data["access-token"])
        router.push({ name: 'HomeView' })
      })
      .catch(error => {
        console.error(error)
      })
    },

    logout({dispatch }) {
      dispatch('removeToken')
      alert('성공적으로 logout되었습니다.')
      router.push({ name: 'HomeView' })
    },
    
    signup({ dispatch }, userData) {
      console.log('회원가입~')
      axios({
        url: `${sowl.users.signup()}?id=${userData.id}&password=${userData.password}&nickname=${userData.nickname}&region=${userData.region}&language=${userData.lang}`,
        method: 'post',
        // data: JSON.stringify(userData)
      })
      .then(response => {
        console.log(response)
        const loginData = { id: userData.id, password : userData.password }
        dispatch('login', loginData)
      })
      .catch(error => {
        console.error(error)
      })
    },
  },
  modules: {
  }
})
