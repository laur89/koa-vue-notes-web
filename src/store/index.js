import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import user from "@/store/user";
import note from "@/store/note";
import chart from "@/store/chart";

const store = new Vuex.Store({
  modules: {
    user,
    note,
    chart
  }
});

export default store;
