import axios from 'axios';
import sowl from '@/api/sowl';

export const friends = {
  state: {
    preFriendsList: [],
    friendsList: [],
    sowlmateList: [],
  },
  getters: {
    preFriendsList: (state) => state.preFriendsList,
    friendsList: (state) => state.friendsList,
    sowlmateList: (state) => state.sowlmateList,
  },
  mutations: {
    SET_PRE_FRIENDS_LIST: (state, friend) => state.preFriendsList.push(friend),
    SET_FRIENDS_LIST: (state, friend) => state.friendsList.push(friend),
    SET_SOWLMATE_LIST: (state, friend) => state.sowlmateList.push(friend),
  },
  actions: {
    totalFriendList({ commit, rootState }) {
      const user = rootState.accounts.currentUser;
      axios({
        url: sowl.friend.friendList(),
        method: 'get',
        headers: {
          fromUserId: user,
        },
      }).then((response) => {
        console.log(
          '임시로 모든 친구에 임시친구 넣어둠!!!!!! 나중에 고쳐야함!!!! -store/friends.js',
        );
        for (const friend of response.data) {
          if (friend.intimacyEval < 50) {
            commit('SET_PRE_FRIENDS_LIST', friend);
            // 아래 두개의 commit 지울 것!!!!!!!!
            commit('SET_FRIENDS_LIST', friend);
            commit('SET_SOWLMATE_LIST', friend);
          } else if (friend.intimacyEval < 100) {
            commit('SET_FRIENDS_LIST', friend);
          } else {
            commit('SET_SOWLMATE_LIST', friend);
          }
        }
      });
    },
  },
};
