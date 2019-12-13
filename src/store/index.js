import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import user from "@/store/user";
import note from "@/store/note";
import chart from "@/store/chart";
import socket from "@/store/socket";

const store = new Vuex.Store({
  modules: {
    user,
    note,
    chart,
    socket
  }
});

export default store;
