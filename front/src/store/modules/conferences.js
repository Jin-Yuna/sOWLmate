import axios from 'axios';
import router from '@/router';
import sowl from '@/api/sowl';

export const conferences = {
  state: {
    room: {},
  },
  getters: {
    room: (state) => state.room,
  },
  mutations: {
    SET_Room: (state, room) => (state.room = room),
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
          commit('SET_Room', response.data);
          router.push({
            name: 'RoomMainView',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
