import { createStore } from 'vuex';
import { accounts } from '@/store/modules/accounts';
import { rooms } from '@/store/modules/rooms';
import { friends } from '@/store/modules/friends';
import { letters } from '@/store/modules/letters';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: { accounts, rooms, friends, letters },
  plugins: [
    createPersistedState({
      paths: ['accounts'],
    }),
  ],
});
