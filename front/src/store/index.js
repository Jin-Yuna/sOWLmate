import { createStore } from "vuex";
import { accounts } from "@/store/modules/accounts";

export default createStore({
  modules: { accounts }
});