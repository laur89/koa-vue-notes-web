import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import user from "@/store/user";
import note from "@/store/note";
import chart from "@/store/chart";
import socket from "@/store/socket";
import common from "@/store/common";

const store = new Vuex.Store({
  modules: {
    user,
    note,
    chart,
    socket,
    common,
  }
});

export default store;
