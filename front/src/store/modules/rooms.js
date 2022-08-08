import axios from 'axios';
import router from '@/router';
import sowl from '@/api/sowl';

export const rooms = {
  state: {
    room: {},
    roomInterests: [],
    roomAll: [],
    roomByInterest: [],
    roomByLanguage: [],
    roomByInterestLanguage: [],
    toUserNickname: '',
    fromUserNickname: '',
  },
  getters: {
    room: (state) => state.room,
    roomInterests: (state) => state.roomInterests,
    roomAll: (state) => state.roomAll,
    roomByInterest: (state) => state.roomByInterest,
    roomByLanguage: (state) => state.roomByLanguage,
    roomByInterestLanguage: (state) => state.roomByInterestLanguage,
    toUserNickname: (state) => state.toUserNickname,
    fromUserNickname: (state) => state.fromUserNickname,
  },
  mutations: {
    SET_ROOM: (state, room) => (state.room = room),
    ROOM_INTERESTS: (state, checked) => (state.roomInterests = checked),
    ROOM_ALL_LIST: (state, list) => (state.roomAll = list),
    ROOM_BY_INTEREST: (state, list) => (state.roomByInterest = list),
    ROOM_BY_LANGUAGE: (state, list) => (state.roomByLanguage = list),
    ROOM_BY_INTEREST_LANGUAGE: (state, list) =>
      (state.roomByInterestLanguage = list),
    TO_USER_NICKNAME: (state, data) => (state.toUserNickname = data),
    FROM_USER_NICKNAME: (state, data) => (state.fromUserNickname = data),
  },
  actions: {
    createRoom({ commit, getters }, newRoom) {
      axios({
        url: sowl.conference.conferenceCreate(),
        method: 'post',
        data: newRoom,
      })
        .then((response) => {
          commit('SET_ROOM', response.data);
          location.replace(sowl.webRTC.conferenceSend(getters.toUserNickname));
          router.push({
            name: 'RoomMainListView',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinRoom({ commit, getters }, userData) {
      axios({
        url: sowl.conference.conferenceEnter(),
        method: 'put',
        data: userData,
      })
        .then((response) => {
          commit('SET_ROOM', response.data);
          location.replace(
            sowl.webRTC.conferenceReceive(
              getters.toUserNickname,
              getters.fromUserNickname,
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllRoomList({ commit }) {
      axios({
        url: sowl.conference.conferenceList(),
        method: 'get',
      })
        .then((response) => {
          commit('ROOM_ALL_LIST', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoomList({ commit }, userData) {
      axios({
        url: sowl.conference.conferenceInterestLanguageList(
          userData.interest,
          userData.language,
        ),
        method: 'get',
      })
        .then((response) => {
          console.log('여기', response.data);
          commit('ROOM_BY_INTEREST_LANGUAGE', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
