// import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';
import sowl from '@/api/sowl';

export const accounts = {
  state: {
    token: sessionStorage.getItem('token') || '',
    currentUser: '',
    idCheck: false,
    idUsernameCheck: false,
    passwordDoubleCheck: false,
    nicknameCheck: false,
    languageList: [],
    interestList: [],
    regionList: [],
    userInterests: [],
    userInfo: {},
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authHeader: (state) => state.token,
    currentUser: (state) => state.currentUser,
    isIdCheck: (state) => state.idCheck,
    isIdUsernameCheck: (state) => state.idUsernameCheck,
    isPasswordDoubleCheck: (state) => state.passwordDoubleCheck,
    isNicknameCheck: (state) => state.nicknameCheck,
    languageList: (state) => state.languageList,
    regionList: (state) => state.regionList,
    InterestList: (state) => state.interestList,
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_TOKEN: (state, newToken) => (state.token = newToken),
    REMOVE_TOKEN: (state) => (state.token = ''),
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    ID_CHECK: (state, checked) => (state.idCheck = checked),
    ID_USERNAME_CHECK: (state, checked) => (state.idUsernameCheck = checked),
    PASSWORD_DOUBLE_CHECK: (state, checked) =>
      (state.passwordDoubleCheck = checked),
    NICKNAME_CHECK: (state, checked) => (state.nicknameCheck = checked),
    GET_LANGUAGE_LIST: (state, list) => (state.languageList = list),
    GET_REGION_LIST: (state, list) => (state.regionList = list),
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
        url: sowl.users.login(),
        method: 'post',
        data: userData,
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
      axios({
        url: sowl.users.signup(
          userData.id,
          userData.password,
          userData.nickname,
          userData.region,
          userData.userlang,
          userData.preferlang,
          userData.nickname,
        ),
        method: 'post',
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
    // Check
    idCheck({ commit }, id) {
      const userId = {
        userId: id,
      };
      axios({
        url: sowl.users.idCheck(),
        method: 'get',
        headers: userId,
      })
        .then((response) => {
          if (response.data != 'exist') {
            commit('ID_CHECK', true);
          } else {
            commit('ID_CHECK', false);
          }
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
    // Get List
    getLanguageList({ commit }) {
      axios({
        url: sowl.categories.language(),
      })
        .then((response) => {
          console.log(response.data);
          commit('GET_LANGUAGE_LIST', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRegionList({ commit }) {
      axios({
        url: sowl.categories.region(),
      })
        .then((response) => {
          console.log(response.data);
          commit('GET_REGION_LIST', response.data);
        })
        .catch((err) => {
          console.log(err);
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
    // Save
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
          console.log(response.data.userInfo);
          commit('GET_USER_INFO', response.data.userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Modify
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
    resetPassword({ commit }, userData) {
      axios({
        url: sowl.users.idUsernameCheck(),
        method: 'post',
        data: userData,
      })
        .then((response) => {
          console.log(response.data['check']);
          // 아이디와 닉네임이 일치할 때
          if (response.data['check']) {
            commit('ID_USERNAME_CHECK', true);
            axios({
              url: sowl.users.resetPassword(),
              method: 'post',
              data: userData,
            })
              .then((response) => {
                console.log(response);
                commit('ID_USERNAME_CHECK', true);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
