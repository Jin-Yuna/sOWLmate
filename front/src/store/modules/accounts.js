// import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';
import sowl from '@/api/sowl';

export const accounts = {
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
    isLoggedIn: (state) => !!state.token,
    authHeader: (state) => state.token,
    currentUser: (state) => state.currentUser,
    isPasswordDoubleCheck: (state) => state.passwordDoubleCheck,
    isNicknameCheck: (state) => state.nicknameCheck,
    InterestList: (state) => state.interestList,
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_TOKEN: (state, newToken) => (state.token = newToken),
    REMOVE_TOKEN: (state) => (state.token = ''),
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    PASSWORD_DOUBLE_CHECK: (state, checked) =>
      (state.passwordDoubleCheck = checked),
    NICKNAME_CHECK: (state, checked) => (state.nicknameCheck = checked),
    GET_INTEREST_LIST: (state, list) => (state.interestList = list),
    SET_USER_INTEREST: (state, interestName) =>
      state.userInterests.push(interestName),
    GET_USER_INFO: (state, data) => (state.userInfo = data),
  },
  actions: {
    removeToken({ commit }) {
      commit('SET_TOKEN', '');
      sessionStorage.setItem('token', '');
    },
    login({ commit, dispatch }, userData) {
      axios({
        url: `${sowl.users.login()}?id=${userData.id}&password=${
          userData.password
        }`,
        method: 'post',
        // data: JSON.stringify(userData)
      })
        .then((response) => {
          commit('SET_TOKEN', response.data['access-token']);
          commit('SET_CURRENT_USER', userData.id);
          dispatch('getInterestList');
          dispatch('getUserInfo');
          sessionStorage.setItem('token', response.data['access-token']);
          router.push({ name: 'HomeView' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout({ dispatch, commit }) {
      dispatch('removeToken');
      commit('SET_CURRENT_USER', '');
      alert('성공적으로 logout되었습니다.');
      router.push({ name: 'HomeView' });
    },
    signup({ dispatch }, userData) {
      console.log('회원가입~');
      axios({
        url: `${sowl.users.users()}?id=${userData.id}&password=${
          userData.password
        }&nickname=${userData.nickname}&region=${userData.region}&language=${
          userData.lang
        }`,
        method: 'post',
        // data: JSON.stringify(userData)
      })
        .then((response) => {
          console.log(response);
          const loginData = { id: userData.id, password: userData.password };
          dispatch('login', loginData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    passwordDoubleCheck({ commit }, payload) {
      let checked = false;
      if (payload.password === payload.password2) {
        checked = true;
      }
      commit('PASSWORD_DOUBLE_CHECK', checked);
    },
    nicknameCheck({ commit }, nickname) {
      console.log(sowl.users.nicknameCheck(nickname));
      axios({
        url: sowl.users.nicknameCheck(nickname),
        method: 'get',
      })
        .then((response) => {
          console.log(response);
          if (response.data != 'exist') {
            commit('NICKNAME_CHECK', true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getInterestList({ commit }) {
      axios({
        url: sowl.categories.interest(),
      })
        .then((response) => {
          console.log(response.data);
          commit('GET_INTEREST_LIST', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    userInterestSave({ state, commit }, interestindexs) {
      // 기존에 저장된 관심사 뺴고 axios 요청
      let current = [];
      let now = [];
      for (const currentInterest of state.userInfo.interests) {
        current.push(currentInterest['title']);
      }
      for (const index of interestindexs) {
        const interestName = state.interestList[index];
        now.push(interestName);
        if (!current.includes(interestName)) {
          axios({
            url: sowl.interests.userInterest(state.currentUser, interestName),
            method: 'post',
          }).then((response) => {
            console.log('관심사저장', response);
            commit('SET_CURRENT_USER', interestName);
          });
        }
      }
      // 기존에는 있는데 넘겨준 interestindexs에 없다면 삭제 요청
      for (const currentInterest of current) {
        if (!now.includes(currentInterest)) {
          axios({
            url: sowl.interests.userInterest(
              state.currentUser,
              currentInterest,
            ),
            method: 'delete',
          })
            .then(() => {
              console.log('관심사삭제', currentInterest);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    getUserInfo({ state, commit }) {
      axios({
        url: sowl.users.info(state.currentUser),
        headers: {
          'access-token': state.token,
        },
      })
        .then((response) => {
          console.log('유저정보 state에 저장:', response.data.userInfo);
          commit('GET_USER_INFO', response.data.userInfo);
        })
        .catch((error) => {
          console.error(error);
        })
        .then((response) => {
          console.log(response.data.userInfo);
          commit('GET_USER_INFO', response.data.userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    modifyUserInfo({ state, commit }, payload) {
      // 페이로드에 { 'nickname' : 'user1' } 이런 식으로 넘어옴
      const sub = Object.keys(payload)[0];
      console.log(sub);
      // password가 안와서!!! 변경못함ㅠㅠ
      let data = {
        id: state.userInfo['id'],
      };
      data[sub] = payload[sub];
      console.log('수정데이터', data);

      axios({
        url: sowl.users.userInfoChange(state.currentUser),
        method: 'put',
        data,
      })
        .then((response) => {
          commit('GET_USER_INFO', response.data);
          alert('성공적으로 변경되었습니다.');
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
};
