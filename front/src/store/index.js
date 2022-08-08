import { createStore } from 'vuex';
import { accounts } from '@/store/modules/accounts';
import { conferences } from '@/store/modules/conferences';

export default createStore({
  modules: { accounts, conferences },
});
