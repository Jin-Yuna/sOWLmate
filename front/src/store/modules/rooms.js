import axios from 'axios';
import router from '@/router';
import sowl from '@/api/sowl';

export const rooms = {
  state: {
    room: {},
    roomInterests: [],
    roomByInterest: [],
    roomByLanguage: [],
    roomByInterestLanguage: [],
  },
  getters: {
    room: (state) => state.room,
    roomInterests: (state) => state.roomInterests,
    roomByInterest: (state) => state.roomByInterest,
    roomByLanguage: (state) => state.roomByLanguage,
    roomByInterestLanguage: (state) => state.roomByInterestLanguage,
  },
  mutations: {
    SET_ROOM: (state, room) => (state.room = room),
    ROOM_INTERESTS: (state, checked) => (state.roomInterests = checked),
    ROOM_BY_INTEREST: (state, list) => (state.roomByInterest = list),
    ROOM_BY_LANGUAGE: (state, list) => (state.roomByLanguage = list),
    ROOM_BY_INTEREST_LANGUAGE: (state, list) =>
      (state.roomByInterestLanguage = list),
  },
  actions: {
    createRoom({ commit }, newRoom) {
      console.log(newRoom);
      axios({
        url: sowl.conference.conferenceCreate(),
        method: 'post',
        data: newRoom,
      })
        .then((response) => {
          commit('SET_ROOM', response.data);
          router.push({
            name: 'RoomMainView',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoomList({ commit }, userData) {
      console.log(userData);
      axios({
        url: sowl.conference.conferenceInterestLanguageList(
          userData.interest,
          userData.language,
        ),
        method: 'get',
      })
        .then((response) => {
          console.log(response.data);
          commit('ROOM_BY_INTEREST_LANGUAGE', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
