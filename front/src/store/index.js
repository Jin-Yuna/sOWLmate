import { createStore } from 'vuex';
import { accounts } from '@/store/modules/accounts';
import { rooms } from '@/store/modules/rooms';

export default createStore({
  modules: { accounts, rooms },
});
