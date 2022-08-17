import axios from 'axios';
import sowl from '@/api/sowl';

export const friends = {
  state: {
    preFriendsList: [],
    friendsList: [],
    sowlmateList: [],
    letterList: [],
  },
  getters: {
    preFriendsList: (state) => state.preFriendsList,
    friendsList: (state) => state.friendsList,
    sowlmateList: (state) => state.sowlmateList,
    letterList: (state) => state.letterList,
  },
  mutations: {
    SET_PRE_FRIENDS_LIST: (state, friend) => state.preFriendsList.push(friend),
    SET_FRIENDS_LIST: (state, friend) => state.friendsList.push(friend),
    SET_SOWLMATE_LIST: (state, friend) => state.sowlmateList.push(friend),
    SET_LETTER_LIST: (state, list) => (state.letterList = list),
  },
  actions: {
    totalFriendList({ commit, rootState }) {
      console.log('로그로그로그');
      const user = rootState.accounts.currentUser;
      axios({
        url: sowl.friend.friendList(),
        method: 'get',
        headers: {
          fromUserId: user,
        },
      })
        .then((response) => {
          for (const friend of response.data) {
            if (friend.intimacyEval < 50) {
              commit('SET_PRE_FRIENDS_LIST', friend);
            } else if (friend.intimacyEval < 100) {
              commit('SET_FRIENDS_LIST', friend);
            } else {
              commit('SET_SOWLMATE_LIST', friend);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    totalLetterList({ commit, rootState }) {
      const user = rootState.accounts.currentUser;
      axios({
        url: sowl.letter.letterList(),
        method: 'get',
        headers: {
          toUserId: user,
        },
      })
        .then((response) => {
          commit('SET_LETTER_LIST', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
