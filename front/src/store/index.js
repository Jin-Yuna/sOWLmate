import { createStore } from 'vuex';
import { accounts } from '@/store/modules/accounts';
import { rooms } from '@/store/modules/rooms';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: { accounts, rooms },
  plugins: [
    createPersistedState({
      paths: ['accounts'],
    }),
  ],
});
