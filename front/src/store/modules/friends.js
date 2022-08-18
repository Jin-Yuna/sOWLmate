import axios from 'axios';
import sowl from '@/api/sowl';
import router from '@/router';

export const friends = {
  state: {
    preFriendsList: [],
    friendsList: [],
    sowlmateList: [],
    letterList: [],
    singleLetter: null,
    penpalList: [],
  },
  getters: {
    preFriendsList: (state) => state.preFriendsList,
    friendsList: (state) => state.friendsList,
    sowlmateList: (state) => state.sowlmateList,
    letterList: (state) => state.letterList,
    singleLetter: (state) => state.singleLetter,
    penpalList: (state) => state.penpalList,
  },
  mutations: {
    SET_PRE_FRIENDS_LIST: (state, friend) => state.preFriendsList.push(friend),
    SET_FRIENDS_LIST: (state, friend) => state.friendsList.push(friend),
    SET_SOWLMATE_LIST: (state, friend) => state.sowlmateList.push(friend),
    SET_LETTER_LIST: (state, list) => (state.letterList = list),
    SET_SINGLE_LETTER: (state, list) => (state.singleLetter = list),
    Get_PENPAL_LIST: (state, list) => (state, (state.penpalList = list)),
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
      })
        .then((response) => {
          for (const friend of response.data) {
            if (friend.intimacyEval < 50) {
              commit('SET_PRE_FRIENDS_LIST', friend);
            } else if (friend.intimacyEval >= 50 && friend.intimacyEval < 100) {
              commit('SET_FRIENDS_LIST', friend);
            } else if (friend.intimacyEval === 100) {
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
    goDetail({ commit }, letterNo) {
      console.log(sowl.letter.singleLetterList());
      console.log(letterNo);
      axios({
        url: sowl.letter.singleLetterList(),
        method: 'get',
        headers: {
          letterNo: letterNo,
        },
      })
        .then((response) => {
          commit('SET_SINGLE_LETTER', response.data);
          router.push({ name: 'LetterDetailView', params: { pk: letterNo } });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPenpalList({ commit, rootState }) {
      const user = rootState.accounts.currentUser;
      axios({
        url: sowl.photoBooth.userPhotos(),
        method: 'get',
        headers: {
          userId: user,
        },
      })
        .then((response) => {
          commit('Get_PENPAL_LIST', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // createLetter({ commit }, letterData) {
    //   // 상대방 닉네임을 유저 아이디로 변환 작업 필요
    // },
  },
};
