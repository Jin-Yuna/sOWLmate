// import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import sowl from '@/api/sowl'

export const accounts = ({
  state: {
    token: sessionStorage.getItem('token') || '',
    currentUser: '',
    passwordDoubleCheck: false,
    nicknameCheck: false,
    interestList: [],
    userInterests: [],
    userInfo: {},
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authHeader: state => state.token,
    currentUser: state => state.currentUser,
    isPasswordDoubleCheck: state => state.passwordDoubleCheck,
    isNicknameCheck: state => state.nicknameCheck,
    InterestList: state => state.interestList,
    userInfo: state => state.userInfo,
  },
  mutations: {
    SET_TOKEN: (state, newToken) => state.token = newToken,
    REMOVE_TOKEN: (state) => state.token = '',
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    PASSWORD_DOUBLE_CHECK: (state, checked) => state.passwordDoubleCheck = checked,
    NICKNAME_CHECK: (state, checked) => state.nicknameCheck = checked,
    GET_INTEREST_LIST: (state, list) => state.interestList = list,
    SET_USER_INTEREST: (state, interestName) => state.userInterests.push(interestName),
    GET_USER_INFO: (state, data) => state.userInfo = data,
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
        dispatch('getUserInfo')
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
    nicknameCheck({ commit }, nickname ) {
      console.log(sowl.users.nicknameCheck(nickname))
      axios({
        url: sowl.users.nicknameCheck(nickname),
        method: 'get',
      })
      .then(response => {
        console.log(response)
        if (response.data != 'exist') {
          commit('NICKNAME_CHECK', true )
        }
      })
      .catch(error => {
        console.error(error)
      }) 
    },
    getInterestList({ commit }) {
      axios({
        url: sowl.categories.interest()
      })
      .then(response => {
        commit('GET_INTEREST_LIST', response.data )
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
        axios({
          url: sowl.interests.userInterest(state.currentUser, interestName),
          method: 'post',
        })
        .then(response => {
          console.log(response)
          commit('SET_CURRENT_USER', interestName )
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    getUserInfo({ state , commit }) {
      axios({
        url: sowl.users.info(state.currentUser),
        headers: {
          'access-token' : state.token,
        }
      })
      .then(response => {
        console.log('account.js/getUserInfo', response.data.userInfo)
        commit('GET_USER_INFO', response.data.userInfo )
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 언어변경 => 제대로 요청이 가고, 응답도 잘 오는데 DB 데이터가 안 바뀜
    // 비밀번호변경도 마찬가지. 포스트맨으로 요청보내도 DB 데이터 변경 안됨
    modifyUserInfo({ state, commit }, payload ) {
      // 페이로드에 { 'nickname' : 'user1' } 이런 식으로 넘어옴
      const sub = Object.keys( payload )[0]
      axios({
        url: sowl.users.userInfoChange(state.currentUser),
        method: 'put',
        data: {
          sub : payload[sub],
        }
      })
      .then(response => {
        commit('GET_USER_INFO', response.data )
        alert('성공적으로 변경되었습니다.')
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  modules: {
  }
})
