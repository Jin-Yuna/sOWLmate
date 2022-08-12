import { createStore } from 'vuex';
import { accounts } from '@/store/modules/accounts';
import { rooms } from '@/store/modules/rooms';
import { friends } from '@/store/modules/friends';

export default createStore({
  modules: { accounts, rooms, friends },
});
