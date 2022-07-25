// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import sowl from '@/api/sowl'

export const accounts = ({
  state: {
    token: sessionStorage.getItem('token') || '',
    currentUser: '',
    passwordDoubleCheck: false,
    interestList: [],
    userInterests: [],
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
    currentUser: state => state.currentUser,
    isPasswordDoubleCheck: state => state.passwordDoubleCheck,
    InterestList: state => state.interestList,
  },
  mutations: {
    SET_TOKEN: (state, newToken) => state.token = newToken,
    REMOVE_TOKEN: (state) => state.token = '',
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    PASSWORD_DOUBLE_CHECK: (state, checked) => state.passwordDoubleCheck = checked,
    GET_INTEREST_LIST: (state, list) => state.interestList = list,
    SET_USER_INTEREST: (state, interestName) => state.userInterests.push(interestName)
  },
  actions: {
    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      sessionStorage.setItem('token', '')
    },
    login({ commit, dispatch }, userData) {
      axios({
        url: `${sowl.users.login()}?id=${userData.id}&password=${userData.password}`,
        method: 'post',
        // data: JSON.stringify(userData)
      })
      .then(response => {
        commit('SET_TOKEN',response.data["access-token"])
        commit('SET_CURRENT_USER', userData.id )
        dispatch('getInterestList')
        sessionStorage.setItem('token', response.data["access-token"])
        router.push({ name: 'HomeView' })
      })
      .catch(error => {
        console.error(error)
      })
    },
    logout({ dispatch, commit }) {
      dispatch('removeToken')
      commit('SET_CURRENT_USER', '' )
      alert('성공적으로 logout되었습니다.')
      router.push({ name: 'HomeView' })
    },  
    signup({ dispatch }, userData) {
      console.log('회원가입~')
      axios({
        url: `${sowl.users.users()}?id=${userData.id}&password=${userData.password}&nickname=${userData.nickname}&region=${userData.region}&language=${userData.lang}`,
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
    passwordDoubleCheck({ commit }, payload ) {
      let checked = false
      if (payload.password === payload.password2) {
        checked = true
      }
        commit('PASSWORD_DOUBLE_CHECK', checked )
    },
    getInterestList({ commit }) {
      axios({
        url: sowl.interests.interestList()
      })
      .then(response => {
        console.log(response.data)
        const temp_list = ['Music', 'Drama', 'Animal', 'Cat', 'Dog']
        commit('GET_INTEREST_LIST', temp_list )
      })
      .catch(error => {
        console.log(error)
      })
    },
    userInterestSave({ state, commit }, interestindexs) {
      console.log('interestindexs', interestindexs)
      // todo : 이미 있던 interest는 제외하고 보내는 if문 추가
      // 현재 뭔가 저장되긴 함...
      for ( const index of interestindexs ) {
        const interestName = state.interestList[index]
        console.log(interestName, '----------')
        axios({
          url: sowl.interests.userInterest(state.currentUser, interestName),
          method: 'post',
        })
        console.log(sowl.interests.userInterest(state.currentUser, interestName))
        .then(response => {
          console.log(response)
          console.log(state.userInterests)
          commit('SET_CURRENT_USER', interestName )
        })
        .catch(error => {
          console.log(error)
        })
      }
    }


    // 현재 비밀번호를 잘 입력했는지 확인하는 api 필요함~
  },
  modules: {
  }
})
