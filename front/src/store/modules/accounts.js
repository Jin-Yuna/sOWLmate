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
      console.log(userData)
      axios({
        url: `${owl.users.login()}?id=${userData.id}&password=${userData.password}`,
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
      console.log('회원가입', userData, '회원가입데이터끝')
      axios({
        url: `${owl.users.signup()}?id=${userData.id}&password=${userData.password}&nickname=${userData.nickname}&region=${userData.region}&language=${userData.lang}`,
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

    // signup(userData) {
    //   console.log(userData, '--------')
    //   console.log(userData.id)
    //   axios({
    //     url: `${owl.users.signup()}?id=${userData.id}&password=${userData.password1}&nickname=${userData.nickname}&region=${userData.region}&language=${userData.lang}`,
    //     method: 'post',
    //     // data: credentials
    //   })
    //     .then(res => {
    //       console.log(res)
    //       router.push({ name: 'HomeView' })
    //     })
    //     .catch(err => {
    //       console.error(err.response.data)
    //     })
    // },
  },
  modules: {
  }
})
